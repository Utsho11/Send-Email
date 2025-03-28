const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const admin = require("firebase-admin");
const cors = require("cors");
const dotenv = require("dotenv");
const Papa = require("papaparse");
const nodemailer = require("nodemailer");

dotenv.config();

const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({ dest: "uploads/" });
// Create a new document in Firestore

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "utshoroy521@gmail.com", // Your email
    pass: "tvce cpvy oolg irzb", // App password (not real password)
  },
});

app.post("/clients", async (req, res) => {
  try {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "postalCode",
      "companyName",
      "industry",
      "companyDescription",
      "position",
      "website",
      "employees",
      "investment",
      "revenue",
      "fundingStage",
    ];

    // Validate required fields
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length) {
      return res
        .status(400)
        .json({ error: `Missing fields: ${missingFields.join(", ")}` });
    }

    // Create client object
    const clientData = {
      ...req.body,
      createdAt: new Date(),
    };

    // Add to Firestore
    const userRef = db.collection("clients").doc();
    await userRef.set(clientData);

    res
      .status(201)
      .json({ id: userRef.id, message: "Client added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/contact-lists", async (req, res) => {
  try {
    const { listName } = req.body;

    // Validate input
    if (!listName || typeof listName !== "string") {
      return res.status(400).json({
        success: false,
        message: "listName is required and must be a string",
      });
    }

    // Check if listName already exists
    const querySnapshot = await db
      .collection("contactLists")
      .where("listName", "==", listName)
      .get();

    if (!querySnapshot.empty) {
      return res.status(409).json({
        success: false,
        message: `A contact list with the name "${listName}" already exists`,
      });
    }

    // Save to Firestore if unique
    const docRef = await db.collection("contactLists").add({
      listName: listName,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Contact list created successfully",
      id: docRef.id,
    });
  } catch (error) {
    console.error("Error saving listName:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save contact list",
      error: error.message,
    });
  }
});

app.post("/investors", async (req, res) => {
  try {
    // Get the array of investor data from request body
    const investorData = req.body;

    // Validate input
    if (!Array.isArray(investorData) || investorData.length === 0) {
      return res.status(400).json({
        error: "Invalid request: Array of investor data is required",
      });
    }

    // Array to store created document IDs
    const createdIds = [];

    // Write each investor as a separate document
    for (const investor of investorData) {
      // Validate each investor object
      if (!investor.partnerEmail || !investor.listId) {
        return res.status(400).json({
          error: "Each investor must have partnerEmail and listId",
        });
      }

      const investorRef = db.collection("investors").doc();
      await investorRef.set(investor);
      createdIds.push(investorRef.id);
    }

    // Send success response
    res.status(201).json({
      ids: createdIds,
      message: `Successfully added ${createdIds.length} investors`,
    });
  } catch (error) {
    console.error("Error adding investors:", error);
    res.status(500).json({
      error: "Failed to add investors",
      details: error.message,
    });
  }
});

app.post("/upload-csv", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  console.log(req.body.listid);

  try {
    // Read file contents
    const fileContent = await fs.promises.readFile(req.file.path, "utf-8");

    // Parse CSV using PapaParse
    const { data, errors } = Papa.parse(fileContent, {
      header: true, // Parse first row as headers
      skipEmptyLines: true,
    });

    if (errors.length > 0) {
      return res
        .status(400)
        .json({ error: "Invalid CSV format", details: errors });
    }

    // Remove temp file
    fs.unlinkSync(req.file.path);

    // Store in Firestore
    const listRef = db.collection("investorLists").doc();
    await listRef.set({ listName: req.body.listName, contacts: data });

    res
      .status(201)
      .json({ id: listRef.id, message: "CSV uploaded successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users from Firestore
app.get("/clients", async (req, res) => {
  try {
    const { email } = req.query;

    let query = db.collection("clients");

    if (email) {
      query = query.where("email", "==", email);
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      return res.json([]);
    }

    const clients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/contact-lists", async (req, res) => {
  try {
    const snapshot = await db.collection("contactLists").get();

    if (snapshot.empty) {
      return res.status(404).json({
        success: false,
        message: "No contact lists found",
      });
    }

    // Map documents to include ID and data
    const contactLists = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      success: true,
      data: contactLists,
    });
  } catch (error) {
    console.error("Error fetching contact lists:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact lists",
      error: error.message,
    });
  }
});

app.get("/investors", async (req, res) => {
  try {
    // Get all documents from the investors collection
    const investorSnapshot = await db.collection("investors").get();

    if (investorSnapshot.empty) {
      return res.status(404).json({
        message: "No investors found",
        totalCount: 0,
        data: [],
      });
    }

    // Map the documents to an array of investor objects
    const investors = investorSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      message: "Successfully retrieved all investors",
      totalCount: investors.length,
      data: investors,
    });
  } catch (error) {
    console.error("Error retrieving investors:", error);
    res.status(500).json({
      error: "Failed to retrieve investors",
      details: error.message,
    });
  }
});

app.get("/stats", async (req, res) => {
  try {
    // Fetch the total number of clients
    const clientsSnapshot = await db.collection("clients").get();
    const clientCount = clientsSnapshot.size;

    // Fetch the total number of investor lists
    const investorListsSnapshot = await db.collection("investors").get();
    const investorListCount = investorListsSnapshot.size;

    const contactListsSnapshot = await db.collection("contactLists").get();
    const contactListCount = contactListsSnapshot.size;

    res.json({
      clients: clientCount,
      investorLists: investorListCount,
      totalContacts: contactListCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT endpoint to update an investor
app.put("/investors/:id", async (req, res) => {
  try {
    const investorId = req.params.id;
    const updateData = req.body;

    // Validate ID
    if (!investorId) {
      return res.status(400).json({
        error: "Investor ID is required",
      });
    }

    // Validate update data
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        error: "Update data is required",
      });
    }

    // Check for required fields if they're being updated
    if (updateData.partnerEmail === "" || updateData.listId === "") {
      return res.status(400).json({
        error: "partnerEmail and listId cannot be empty",
      });
    }

    // Reference to the investor document
    const investorRef = db.collection("investors").doc(investorId);

    // Check if document exists
    const doc = await investorRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        error: "Investor not found",
      });
    }

    // Update the document
    await investorRef.update(updateData);

    res.status(200).json({
      message: `Successfully updated investor with ID: ${investorId}`,
      updatedFields: Object.keys(updateData),
    });
  } catch (error) {
    console.error("Error updating investor:", error);
    res.status(500).json({
      error: "Failed to update investor",
      details: error.message,
    });
  }
});

// DELETE API to remove a contact list and its related investor lists
app.delete("/contact-lists/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate input
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Contact list ID is required",
      });
    }

    // Reference to the contact list document
    const contactListRef = db.collection("contactLists").doc(id);

    // Check if the contact list exists
    const contactListDoc = await contactListRef.get();
    if (!contactListDoc.exists) {
      return res.status(404).json({
        success: false,
        message: `Contact list with ID ${id} not found`,
      });
    }

    // Start a batch for atomic operations
    const batch = db.batch();

    // Add the contact list deletion to the batch
    batch.delete(contactListRef);

    // Find and delete all investor lists referencing this contact list
    const investorListsSnapshot = await db
      .collection("investorLists")
      .where("listRef", "==", contactListRef)
      .get();

    if (!investorListsSnapshot.empty) {
      investorListsSnapshot.forEach((doc) => {
        batch.delete(doc.ref); // Add each investor list deletion to the batch
      });
    }

    // Commit the batch operation
    await batch.commit();

    res.status(200).json({
      success: true,
      message: `Contact list ${id} and ${investorListsSnapshot.size} related investor lists deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting contact list:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete contact list",
      error: error.message,
    });
  }
});

app.delete("/clients/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Reference to the document
    const userRef = db.collection("clients").doc(id);

    // Check if the document exists
    const doc = await userRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Delete the document
    await userRef.delete();

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE endpoint to remove an investor
app.delete("/investors/:id", async (req, res) => {
  try {
    const investorId = req.params.id;

    // Validate ID
    if (!investorId) {
      return res.status(400).json({
        error: "Investor ID is required",
      });
    }

    // Reference to the investor document
    const investorRef = db.collection("investors").doc(investorId);

    // Check if document exists
    const doc = await investorRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        error: "Investor not found",
      });
    }

    // Delete the document
    await investorRef.delete();

    res.status(200).json({
      message: `Successfully deleted investor with ID: ${investorId}`,
    });
  } catch (error) {
    console.error("Error deleting investor:", error);
    res.status(500).json({
      error: "Failed to delete investor",
      details: error.message,
    });
  }
});

<<<<<<< HEAD
app.delete("/campaign/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = db.collection("campaignLists").doc(id);

    // Check if document exists before deleting
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    // Delete the document
    await docRef.delete();

    res.status(200).json({
      success: true,
      message: "Campaign deleted successfully",
      data: { id },
    });
  } catch (error) {
    console.error("Error deleting campaign:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete campaign",
      error: error.message,
    });
  }
});

// API to send email
// app.post("/send-email", async (req, res) => {
//   try {
//     const { topic, subject, sender, recipients, content, campaignId } =
//       req.body;
=======
// send mail api
// Function to fetch emails from Firestore contact lists
const getEmailsFromContactLists = async (contactListIds) => {
  const emails = new Set(); // To avoid duplicates
>>>>>>> parent of 36f1135 (rich text editor added)

  for (const id of contactListIds) {
    const listRef = db.collection("investorLists").doc(id);
    const doc = await listRef.get();

    if (doc.exists) {
      const { contacts } = doc.data(); // `contacts` is an array of objects [{ email: "abc@example.com" }, ...]
      contacts.forEach((contact) => {
        if (contact.email) emails.add(contact.email); // Extract email
      });
    }
  }

  return Array.from(emails); // Convert Set to Array
};

// API to send email
app.post("/send-email", async (req, res) => {
  try {
    const { subject, senderName, senderEmail, contactLists, content } =
      req.body;

    // Validate required fields
    if (!subject || !senderName || !senderEmail || !contactLists || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Fetch emails from Firestore
    const recipients = await getEmailsFromContactLists(contactLists);
    if (recipients.length === 0) {
      return res.status(404).json({ error: "No valid contacts found" });
    }

    console.log(recipients);

    // Send email
    const mailOptions = {
      from: `${senderName} <${senderEmail}>`,
      to: recipients.join(","), // List of email addresses
      subject,
      text: content,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Email sent successfully!", recipients });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
