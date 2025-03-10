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
