<<<<<<< HEAD
import { NavLink, useLocation } from "react-router";
=======
>>>>>>> parent of 36f1135 (rich text editor added)
import EmailCampaignForm from "../components/form/EmailCampaignForm";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const MailPage = () => {
<<<<<<< HEAD
  const location = useLocation();

  const path = location.pathname.split("/dashboard/")[1];

  if (!path) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="">
      <div className="text-lg m-8 flex justify-between">
        <div className="">
          <NavLink to="/dashboard/allCampaign">
            <ArrowLeftOutlined />
            Back to Previous Page
          </NavLink>
        </div>
        <div className="">
          <NavLink to="/dashboard/pre-designed-template-options">
            Use Pre Designed Templates
            <ArrowRightOutlined />
          </NavLink>
        </div>
      </div>
      <EmailCampaignForm path={path} />
=======
  return (
    <div className="">
      <EmailCampaignForm />
>>>>>>> parent of 36f1135 (rich text editor added)
    </div>
  );
};

export default MailPage;
