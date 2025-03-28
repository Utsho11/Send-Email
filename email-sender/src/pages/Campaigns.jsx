<<<<<<< HEAD
import { Button, Table, message } from "antd"; // Added message import for notifications
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
=======
import { Button, Table } from "antd";
import { useState } from "react";
import { NavLink } from "react-router";
>>>>>>> parent of 36f1135 (rich text editor added)

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
];
const Campaigns = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCampaigns = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/campaign");
        const result = await response.json();
        setLoading(false);

        if (!result.success) {
          console.error("Failed to fetch campaigns:", result.message);
          message.error("Failed to load campaigns");
        } else {
          const formattedCampaigns = result.data.map((campaign) => ({
            key: campaign.id,
            ...campaign,
          }));
          setCampaigns(formattedCampaigns);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching campaigns:", error);
        message.error("Error loading campaigns");
      }
    };

    loadCampaigns();
  }, []);

  // Add delete functionality
  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select at least one campaign to delete");
      return;
    }

    setLoading(true);
    try {
      // Delete each selected campaign
      const deletePromises = selectedRowKeys.map((id) =>
        fetch(`http://localhost:5000/campaign/${id}`, {
          method: "DELETE",
        }).then((res) => res.json())
      );

      const results = await Promise.all(deletePromises);

      // Check if all deletions were successful
      const allSuccessful = results.every((result) => result.success);

      if (allSuccessful) {
        // Update the campaigns list by removing deleted items
        setCampaigns((prev) =>
          prev.filter((campaign) => !selectedRowKeys.includes(campaign.key))
        );
        setSelectedRowKeys([]); // Clear selection
        message.success("Campaigns deleted successfully");
      } else {
        message.error("Some campaigns failed to delete");
      }
    } catch (error) {
      console.error("Error deleting campaigns:", error);
      message.error("Error deleting campaigns");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Campaign Name",
      dataIndex: "campaignName",
      key: "campaignName",
      render: (text, record) => (
        <span
          className="text-black hover:text-blue-500 hover:underline cursor-pointer"
          onClick={() =>
            navigate("/dashboard/regular-email", {
              state: { campaignId: record.id },
            })
          }
        >
          {text}
        </span>
      ),
    },
    {
      title: "Campaign Topic",
      dataIndex: "topic",
      key: "topic",
    },
  ];

=======
  const [campaigns, setCampaigns] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
>>>>>>> parent of 36f1135 (rich text editor added)
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          const newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 === 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          const newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 !== 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <div className="container mx-auto mt-8">
<<<<<<< HEAD
      <div className="my-8 flex justify-end gap-4">
        <Button
          danger
          onClick={handleDelete}
          disabled={selectedRowKeys.length === 0}
          loading={loading}
        >
          Delete Selected
        </Button>
        <NavLink to="/dashboard/select-campaign">
=======
      <div className="my-8 flex justify-end">
        <NavLink to="/dashboard/choose-campaign">
>>>>>>> parent of 36f1135 (rich text editor added)
          <Button type="primary">Create Campaign</Button>
        </NavLink>
      </div>
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
<<<<<<< HEAD
          loading={loading}
=======
>>>>>>> parent of 36f1135 (rich text editor added)
          dataSource={campaigns}
        />
      </div>
    </div>
  );
};

export default Campaigns;
