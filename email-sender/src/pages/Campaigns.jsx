import { Button, Table } from "antd";
import { useState } from "react";
import { NavLink } from "react-router";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
];
const Campaigns = () => {
  const [campaigns, setCampaigns] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
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
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="my-8 flex justify-end">
        <NavLink to="/dashboard/choose-campaign">
          <Button type="primary">Create Campaign</Button>
        </NavLink>
      </div>
      <div className="">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={campaigns}
        />
      </div>
    </div>
  );
};

export default Campaigns;
