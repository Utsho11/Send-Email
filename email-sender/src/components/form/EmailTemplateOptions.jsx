<<<<<<< HEAD
import { Form, Input, Select, Button, Modal } from "antd";
import { Mail, LayoutTemplate } from "lucide-react";
import { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import TemplatePreview from "../module/TemplatePreview";
import { useDispatch, useSelector } from "react-redux";
import { setCampaignId } from "../../store/store";

const { Option } = Select;

const EmailTemplateOptions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState(""); // New state for path
  const navigate = useNavigate();
  const campaignState = useSelector((state) => state.campaign);
  const dispatch = useDispatch();

  const { templateId } = campaignState;
=======
import { useRef, useState } from "react";
import EmailEditor from "react-email-editor";
>>>>>>> parent of 36f1135 (rich text editor added)

const EmailTemplateOptions = () => {
  const emailEditorRef = useRef(null);
  const [editorVisible, setEditorVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // Function to load the Unlayer editor
  const onLoadEditor = () => {
    emailEditorRef.current?.editor.loadDesign({});
  };

<<<<<<< HEAD
  const campaigns = [
    {
      title: "Basic Templates Editor",
      description:
        "Simple, customizable templates for daily communications, personal correspondence, and general business messaging",
      icon: <Mail className="w-8 h-8 text-teal-600" />,
      bgColor: "bg-teal-100",
      borderColor: "hover:border-teal-500",
      buttonBg: "bg-teal-600",
      buttonHoverBg: "hover:bg-teal-700",
      textColor: "text-white",
      path: "email-template-editor",
    },
    {
      title: "Pre-Designed Templates",
      description:
        "Professionally crafted templates for special offers, product launches, and seasonal promotions",
      icon: <LayoutTemplate className="w-8 h-8 text-blue-600" />,
      bgColor: "bg-blue-100",
      borderColor: "hover:border-blue-500",
      buttonBg: "bg-blue-600",
      buttonHoverBg: "hover:bg-blue-700",
      textColor: "text-white",
      path: "pre-designed-template",
    },
  ];
=======
  // Function to export the HTML from the editor
  const exportHtml = () => {
    emailEditorRef.current?.editor.exportHtml((data) => {
      const { html } = data;
      console.log("Exported HTML:", html);
      // You can save or send this HTML as needed
    });
  };
>>>>>>> parent of 36f1135 (rich text editor added)

  // Handle clicking on a template option
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setEditorVisible(true);

<<<<<<< HEAD
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/campaign",
        values
      );
      console.log("Campaign created:", response.data);
      toggleModal(false);
      Swal.fire({
        title: "Campaign Created Successfully",
        icon: "success",
        confirmButtonText: "Close",
      });

      dispatch(setCampaignId(response.data.id));

      // Use the selectedPath from state
      templateId
        ? navigate("/template-editor")
        : navigate(`/dashboard/${selectedPath}`);
    } catch (error) {
      console.error(
        "Error creating campaign:",
        error.response?.data || error.message
      );
      form.setFields([
        {
          name: "campaignName",
          errors: [error.response?.data?.error || "Failed to create campaign"],
=======
    if (option === "Pre-designed Templates") {
      emailEditorRef.current?.editor.loadDesign({
        body: {
          rows: [
            {
              cells: [1],
              columns: [
                {
                  contents: [
                    {
                      type: "text",
                      values: {
                        text: "<h1>Welcome to Our Newsletter</h1>",
                      },
                    },
                  ],
                },
              ],
            },
          ],
>>>>>>> parent of 36f1135 (rich text editor added)
        },
      });
    } else if (option === "Basic Templates") {
      emailEditorRef.current?.editor.loadDesign({
        body: {
          rows: [
            {
              cells: [1],
              columns: [
                {
                  contents: [
                    {
                      type: "text",
                      values: {
                        text: "<p>Add your content here...</p>",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      });
    } else {
      emailEditorRef.current?.editor.loadDesign({});
    }
  };

  // Handle button click to set path and open modal
  const handleCreateClick = (path) => {
    setSelectedPath(path); // Store the path
    toggleModal(true); // Open the modal
  };

  return (
<<<<<<< HEAD
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Choose Your Template Type
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <div
            key={campaign.title}
            className={`group flex flex-col items-center p-6 bg-white rounded-xl border border-gray-200 ${campaign.borderColor} transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 relative min-h-[250px]`}
          >
            <div className={`p-3 ${campaign.bgColor} rounded-full mb-4`}>
              {campaign.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {campaign.title}
            </h3>
            <p className="text-gray-600 text-center mb-4 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
              {campaign.description}
            </p>
            <Button
              onClick={() => handleCreateClick(campaign.path)} // Pass the path here
              className={`absolute bottom-6 ${campaign.buttonBg} ${campaign.buttonHoverBg} ${campaign.textColor} font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}
              type="primary"
            >
              Create New
            </Button>
          </div>
        ))}
      </div>

      <Modal
        title="Create Campaign"
        open={isModalOpen}
        onOk={() => toggleModal(false)}
        onCancel={() => toggleModal(false)}
        footer={false}
        closable={true}
        className="w-full max-w-md mx-auto"
      >
        <Form
          form={form}
          name="create_campaign"
          onFinish={onFinish} // No need to pass path here anymore
          layout="vertical"
          className="space-y-6"
        >
          <Form.Item
            name="campaignName"
            label="Campaign Name *"
            rules={[
              { required: true, message: "Please enter a campaign name!" },
            ]}
            className="mb-4"
          >
            <Input
              placeholder="Enter campaign name"
              className="w-full border-gray-300 rounded-md focus:border-gray-400 focus:ring-0"
            />
          </Form.Item>

          <Form.Item
            name="topic"
            label="Assign Topic *"
            rules={[{ required: true, message: "Please select a topic!" }]}
            className="mb-4"
          >
            <Select
              placeholder="Select a topic"
              className="w-full border-gray-300 rounded-md"
            >
              <Option value="marketing">Marketing</Option>
              <Option value="sales">Sales</Option>
              <Option value="product">Product</Option>
              <Option value="events">Events</Option>
            </Select>
          </Form.Item>

          <div className="mb-6 text-blue-500 flex items-center gap-1">
            <InfoCircleOutlined />
            <span>
              Categorize your contacts under different topics to send them the
              right emails.{" "}
              <a href="#" className="underline">
                Learn More
              </a>
            </span>
          </div>

          <Form.Item className="text-right">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full px-6 py-2"
            >
              Save and Proceed
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="">
        <TemplatePreview
          handleCreateClick={handleCreateClick}
          // onFinish={onFinish}
        />
      </div>
=======
    <div className="p-6 font-sans">
      {/* Top Section: Pre-designed and Basic Templates */}
      <div className="flex justify-around mb-10">
        <div
          className="w-80 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
          onClick={() => handleOptionClick("Pre-designed Templates")}
        >
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-lg font-semibold mb-2">Pre-designed Templates</h3>
          <p className="text-gray-600 text-sm">
            Use our pre-designed templates, personalize the content, and send
            emails quickly.
          </p>
        </div>
        <div
          className="w-80 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
          onClick={() => handleOptionClick("Basic Templates")}
        >
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-semibold mb-2">Basic Templates</h3>
          <p className="text-gray-600 text-sm">
            Pick one of our plain and simple layouts and add just text and
            images to your content.
          </p>
        </div>
      </div>

      {/* Bottom Section: Other Options */}
      <div className="flex justify-around flex-wrap gap-6">
        <div
          className="w-48 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
          onClick={() => handleOptionClick("HTML Code Editor")}
        >
          <div className="text-3xl mb-2">💻</div>
          <h4 className="text-base font-medium mb-1">HTML Code Editor</h4>
          <p className="text-gray-600 text-xs">
            Create your campaign content by manually adding HTML codes.
          </p>
        </div>
        <div
          className="w-48 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
          onClick={() => handleOptionClick("Plain Text Editor")}
        >
          <div className="text-3xl mb-2">📜</div>
          <h4 className="text-base font-medium mb-1">Plain Text Editor</h4>
          <p className="text-gray-600 text-xs">
            Create and send a simple email without any image or logo.
          </p>
        </div>
        <div
          className="w-48 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
          onClick={() => handleOptionClick("Import/Upload HTML")}
        >
          <div className="text-3xl mb-2">☁️</div>
          <h4 className="text-base font-medium mb-1">Import/Upload HTML</h4>
          <p className="text-gray-600 text-xs">
            Import/upload your HTML and CSS files, and use them for your
            content.
          </p>
        </div>
        <div
          className="w-48 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
          onClick={() => handleOptionClick("Recently Sent")}
        >
          <div className="text-3xl mb-2">⏳</div>
          <h4 className="text-base font-medium mb-1">Recently Sent</h4>
          <p className="text-gray-600 text-xs">
            Use the template from a recently sent campaign.
          </p>
        </div>
      </div>

      {/* Unlayer Email Editor */}
      {editorVisible && (
        <div className="mt-10">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">Editing: {selectedOption}</h2>
            <button
              onClick={exportHtml}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Export HTML
            </button>
          </div>
          <EmailEditor
            ref={emailEditorRef}
            onLoad={onLoadEditor}
            style={{ height: "600px" }}
            options={{
              appearance: {
                theme: "light",
              },
            }}
          />
        </div>
      )}
>>>>>>> parent of 36f1135 (rich text editor added)
    </div>
  );
};

export default EmailTemplateOptions;
