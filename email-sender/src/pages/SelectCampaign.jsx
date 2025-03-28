import { Form, Input, Select, Button, Modal } from "antd";
import {
  Megaphone,
  Newspaper,
  ClipboardList,
  Hand,
  Calendar,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
<<<<<<< HEAD
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setCampaignId } from "../store/store";
=======
>>>>>>> parent of 36f1135 (rich text editor added)
const { Option } = Select;
const SelectCampaign = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleModal = (open) => {
    setIsModalOpen(open);
  };

  const campaigns = [
    {
      title: "Regular Emails",
      description:
        "Daily communications, personal correspondence, and general business messaging",
      icon: <Mail className="w-8 h-8 text-teal-600" />,
      bgColor: "bg-teal-100",
      borderColor: "hover:border-teal-500",
      buttonBg: "bg-teal-600",
      buttonHoverBg: "hover:bg-teal-700",
      textColor: "text-white",
    },
    {
      title: "Promotional Campaigns",
      description:
        "Boost sales with special offers, product launches, and seasonal promotions",
      icon: <Megaphone className="w-8 h-8 text-blue-600" />,
      bgColor: "bg-blue-100",
      borderColor: "hover:border-blue-500",
      buttonBg: "bg-blue-600",
      buttonHoverBg: "hover:bg-blue-700",
      textColor: "text-white",
    },
    {
      title: "Newsletter Updates",
      description:
        "Engage subscribers with curated content, company news, and valuable insights",
      icon: <Newspaper className="w-8 h-8 text-green-600" />,
      bgColor: "bg-green-100",
      borderColor: "hover:border-green-500",
      buttonBg: "bg-green-600",
      buttonHoverBg: "hover:bg-green-700",
      textColor: "text-white",
    },
    {
      title: "Transactional Emails",
      description:
        "Order confirmations, shipping updates, and payment receipts",
      icon: <ClipboardList className="w-8 h-8 text-purple-600" />,
      bgColor: "bg-purple-100",
      borderColor: "hover:border-purple-500",
      buttonBg: "bg-purple-600",
      buttonHoverBg: "hover:bg-purple-700",
      textColor: "text-white",
    },
    {
      title: "Welcome Series",
      description:
        "Onboard new users with guided email sequences and product education",
      icon: <Hand className="w-8 h-8 text-orange-600" />,
      bgColor: "bg-orange-100",
      borderColor: "hover:border-orange-500",
      buttonBg: "bg-orange-600",
      buttonHoverBg: "hover:bg-orange-700",
      textColor: "text-white",
    },
    {
      title: "Event Invitations",
      description:
        "Promote webinars, conferences, and special events with RSVP tracking",
      icon: <Calendar className="w-8 h-8 text-red-600" />,
      bgColor: "bg-red-100",
      borderColor: "hover:border-red-500",
      buttonBg: "bg-red-600",
      buttonHoverBg: "hover:bg-red-700",
      textColor: "text-white",
    },
  ];

  const [form] = Form.useForm();

<<<<<<< HEAD
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/campaign",
        values
      ); // Adjust URL based on your server
      // console.log("Campaign created:", response.data);
      dispatch(setCampaignId(response.data.id));

      toggleModal(false);

      Swal.fire({
        title: "Campaign Created Successfully",
        icon: "success",
        confirmButtonText: "Close",
      });

      navigate("/dashboard/regular-email");
    } catch (error) {
      console.error(
        "Error creating campaign:",
        error.response?.data || error.message
      );
      // Optionally show an error message in the UI
      form.setFields([
        {
          name: "campaignName",
          errors: [error.response?.data?.error || "Failed to create campaign"],
        },
      ]);
    }
=======
  const onFinish = (values) => {
    console.log("Form values:", values);
    // Handle form submission here (e.g., API call)
    navigate("/dashboard/regular-email");
>>>>>>> parent of 36f1135 (rich text editor added)
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Choose Your Campaign Type
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              onClick={() => toggleModal(true)}
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
        onOk={() => toggleModal(0, false)}
        onCancel={() => toggleModal(0, false)}
        footer={false}
        closable={true}
        className="w-full max-w-md mx-auto"
      >
        <Form
          form={form}
          name="create_campaign"
          onFinish={onFinish}
          layout="vertical"
          className="space-y-6"
        >
          {/* Campaign Name Input */}
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

          {/* Assign Topic Select */}
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

          {/* Helper Text with Link */}
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

          {/* Save and Proceed Button */}
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
    </div>
  );
};

export default SelectCampaign;
