import { Button, Card, Drawer, Dropdown } from "antd";
import {
  Bell,
  BellOff,
  CircleHelp,
  EllipsisVertical,
  Plus,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

const ListDropdown = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const item1 = [
    {
      key: "1",
      label: "Folder",
    },
    {
      key: "2",
      label: "Favorites",
    },
    {
      key: "3",
      label: <NavLink to="/dashboard/calendar">Calendar</NavLink>,
    },
    {
      key: "4",
      label: "Feedback",
    },
  ];

  const item2 = [
    {
      key: "5",
      icon: <Plus size={16} />,
      label: <NavLink to="/dashboard/start-campaign">Create Campaign</NavLink>,
    },
    {
      key: "6",
      icon: <Plus size={16} />,
      label: <NavLink to="/dashboard/add-contact">Add Contact</NavLink>,
    },
    {
      key: "7",
      icon: <Plus size={16} />,
      label: <NavLink to="/dashboard/add-client">Add Client</NavLink>,
    },
  ];

  return (
    <div className="text-white space-x-3">
      <Dropdown
        menu={{
          items: item2,
        }}
        placement="bottomLeft"
        arrow
      >
        <Button variant="solid" color="primary">
          <Plus size={16} />
        </Button>
      </Dropdown>
      <button onClick={showDrawer}>
        <Bell />
      </button>
      <button>
        <CircleHelp />
      </button>
      <button>
        <Settings />
      </button>
      <Dropdown
        menu={{
          items: item1,
        }}
        placement="bottomRight"
        arrow
      >
        <button>
          <EllipsisVertical />
        </button>
      </Dropdown>
      <Drawer
        title="Notifications"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <Card className="flex flex-col items-center justify-center p-6 rounded-lg shadow-md border border-gray-200 bg-white">
          <BellOff className="text-gray-400" size={48} />
          <p className="text-gray-500 mt-2">No Notifications</p>
        </Card>
      </Drawer>
    </div>
  );
};

export default ListDropdown;
