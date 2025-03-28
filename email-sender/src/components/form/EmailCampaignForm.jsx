<<<<<<< HEAD
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Row, Col, Modal } from "antd";
import { useEffect, useState } from "react";
import { resetCampaign, updateField } from "../../store/store";
import { MailIcon, Edit, User, Users } from "lucide-react";
import { fetchData } from "../../utils/fetchData";
import Swal from "sweetalert2";
import axios from "axios";
import FieldItem from "../modal/FieldItem";
import ContentSection from "../modal/ContentSection";
import RecipientModalContent from "../modal/RecipientModal";
import SenderModalContent from "../modal/SenderModal";
import SimpleInputModalContent from "../modal/SimpleInputModal";

const EmailCampaignForm = ({ path }) => {
  const dispatch = useDispatch();
  const [campaign, setCampaign] = useState([]);
  const [contactList, setContactList] = useState([]);
  const campaignState = useSelector((state) => state.campaign);
  const { subject, sender, recipients, content, campaignId } = campaignState;
  const [modalField, setModalField] = useState(null);
  const [clients, setClients] = useState([]);

  console.log(campaignId);

  const openModal = (field) => setModalField(field);
  const closeModal = () => setModalField(null);

  let editorPath = "";

  switch (path) {
    case "regular-email":
      editorPath = "text-editor";
      break;
    case "email-template-editor":
      editorPath = "template-editor";
      break;

    default:
      break;
  }

  // console.log({ campaignId });

  useEffect(() => {
    const loadCampaigns = async () => {
      const result = await fetchData(
        `http://localhost:5000/campaign/${campaignId}`
      );
      if (result.error) {
        console.error("Failed to fetch campaigns:", result.error);
      } else {
        setCampaign(result.data.data);
      }
    };
    loadCampaigns();
  }, [campaignId]);

  console.log(campaign);

  useEffect(() => {
    const loadClient = async () => {
      const result = await fetchData(`http://localhost:5000/clients`);
      if (result.error) {
        console.error("Failed to fetch contactLists:", result.error);
      } else {
        setClients(result.data);
      }
    };
    loadClient();
  }, []);

  useEffect(() => {
    const loadContactLists = async () => {
      const result = await fetchData(`http://localhost:5000/contact-lists`);
      if (result.error) {
        console.error("Failed to fetch contactLists:", result.error);
      } else {
        setContactList(result.data.data);
      }
    };
    loadContactLists();
  }, []);

  const handleSave = (value) => {
    dispatch(updateField({ field: modalField, value }));
    closeModal();
  };

  const handleSendEmail = async () => {
    const emailData = {
      topic: campaign.topic || "No Topic",
      subject: subject || "No Subject",
      sender: sender || "No Sender",
      recipients: recipients || "No Recipients",
      content: content || "No Content",
      campaignId: campaignId || "No Campaign ID",
    };

    const requiredFields = [
      "topic",
      "subject",
      "sender",
      "recipients",
      "content",
      "campaignId",
    ];
    const missingFields = requiredFields.filter(
      (field) =>
        !emailData[field] ||
        emailData[field] ===
          `No ${field.charAt(0).toUpperCase() + field.slice(1)}` ||
        (field === "recipients" &&
          (!Array.isArray(emailData[field]) || emailData[field].length === 0))
    );

    if (missingFields.length > 0) {
      await Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: `Please fill in the following fields: ${missingFields
          .map((field) => field.charAt(0).toUpperCase() + field.slice(1))
          .join(", ")}`,
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/send-email", emailData, {
        headers: { "Content-Type": "application/json" },
      });
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Email sent successfully!",
        confirmButtonText: "OK",
      });

      dispatch(resetCampaign());
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Unknown error";
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to send email: ${errorMessage}`,
        confirmButtonText: "OK",
      });
    }
=======
import { useState } from "react";
import { Button, Input, Card, Row, Col, Typography, Modal } from "antd";
import { NavLink } from "react-router";
const { Title, Text } = Typography;

const EmailCampaignForm = () => {
  const [topic, setTopic] = useState("Marketing");
  const [subject, setSubject] = useState("");
  const [sender, setSender] = useState("");
  const [recipients, setRecipients] = useState("");
  const [isTopicModalVisible, setIsTopicModalVisible] = useState(false);
  const [isSubjectModalVisible, setIsSubjectModalVisible] = useState(false);
  const [isSenderModalVisible, setIsSenderModalVisible] = useState(false);
  const [isRecipientsModalVisible, setIsRecipientsModalVisible] =
    useState(false);

  const handleTopicOk = (value) => {
    setTopic(value);
    setIsTopicModalVisible(false);
  };

  const handleSubjectOk = (value) => {
    setSubject(value);
    setIsSubjectModalVisible(false);
>>>>>>> parent of 36f1135 (rich text editor added)
  };

  const handleSenderOk = (value) => {
    setSender(value);
    setIsSenderModalVisible(false);
  };

  const handleRecipientsOk = (value) => {
    setRecipients(value);
    setIsRecipientsModalVisible(false);
  };

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Card
        style={{ maxWidth: "800px", margin: "0 auto", borderRadius: "8px" }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
<<<<<<< HEAD
            <ContentSection content={content} path={editorPath} />
=======
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Title level={4}>TOPIC</Title>
              <Button
                type="primary"
                size="small"
                onClick={() => setIsTopicModalVisible(true)}
                style={{ background: "#1890ff", borderColor: "#1890ff" }}
              >
                Edit Topic
              </Button>
            </div>
            <Text>{topic}</Text>
          </Col>

          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Title level={4}>SUBJECT</Title>
              <Text>Give a suitable subject line to this campaign.</Text>
            </div>
            <Button
              type="primary"
              size="middle"
              onClick={() => setIsSubjectModalVisible(true)}
              style={{
                marginTop: "8px",
                background: "#1890ff",
                borderColor: "#1890ff",
              }}
            >
              Add Subject
            </Button>
          </Col>

          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="">
              <Title level={4}>SENDER</Title>
              <Text>Who is sending this email campaign?</Text>
            </div>
            <Button
              type="primary"
              size="middle"
              onClick={() => setIsSenderModalVisible(true)}
              style={{
                marginTop: "8px",
                background: "#1890ff",
                borderColor: "#1890ff",
              }}
            >
              Add Sender Details
            </Button>
          </Col>

          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="">
              <Title level={4}>RECIPIENT</Title>
              <Text>
                Choose the contact lists or segments you wish to send your email
                campaign to.
              </Text>
            </div>
            <Button
              type="primary"
              size="middle"
              onClick={() => setIsRecipientsModalVisible(true)}
              style={{
                marginTop: "8px",
                background: "#1890ff",
                borderColor: "#1890ff",
              }}
            >
              Add Recipients
            </Button>
          </Col>

          <Col span={24}>
            <Title level={4}>CONTENT</Title>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  background: "#e6f7ff",
                  border: "1px dashed #91d5ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                }}
              >
                <img
                  src="/content.png" // Replace with your actual thumbnail image URL
                  alt="Content Thumbnail"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Text>Create the content of your campaign.</Text>
              <NavLink to="/dashboard/template-options">
                <Button
                  type="primary"
                  size="middle"
                  style={{
                    marginTop: "8px",
                    background: "#1890ff",
                    borderColor: "#1890ff",
                  }}
                >
                  Create Content
                </Button>
              </NavLink>
            </div>
          </Col>

          <Col span={24}>
            <Button
              type="link"
              style={{ color: "#1890ff", padding: 0 }}
              onClick={() => alert("Advanced options clicked!")}
            >
              View advanced options
            </Button>
>>>>>>> parent of 36f1135 (rich text editor added)
          </Col>
        </Row>
      </Card>

      {/* Modals for Input */}
      <Modal
        title="Edit Topic"
        open={isTopicModalVisible}
        onOk={() => handleTopicOk(document.getElementById("topicInput").value)}
        onCancel={() => setIsTopicModalVisible(false)}
      >
        <Input
          id="topicInput"
          placeholder="Enter new topic"
          defaultValue={topic}
        />
      </Modal>

      <Modal
        title="Add Subject"
        open={isSubjectModalVisible}
        onOk={() =>
          handleSubjectOk(document.getElementById("subjectInput").value)
        }
        onCancel={() => setIsSubjectModalVisible(false)}
      >
        <Input
          id="subjectInput"
          placeholder="Enter subject line"
          defaultValue={subject}
        />
      </Modal>

      <Modal
        title="Add Sender Details"
        open={isSenderModalVisible}
        onOk={() =>
          handleSenderOk(document.getElementById("senderInput").value)
        }
        onCancel={() => setIsSenderModalVisible(false)}
      >
        <Input
          id="senderInput"
          placeholder="Enter sender details"
          defaultValue={sender}
        />
      </Modal>

      <Modal
        title="Add Recipients"
        open={isRecipientsModalVisible}
        onOk={() =>
          handleRecipientsOk(document.getElementById("recipientsInput").value)
        }
        onCancel={() => setIsRecipientsModalVisible(false)}
      >
        <Input
          id="recipientsInput"
          placeholder="Enter recipient lists or segments"
          defaultValue={recipients}
        />
      </Modal>
    </div>
  );
};

export default EmailCampaignForm;
