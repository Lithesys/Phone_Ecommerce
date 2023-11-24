import React from "react";
import ProfileForm from "../components/Form/Profile/ProfileForm";
import AddressForm from "../components/Form/Address/AddressForm";
import ChangePassform from "../components/Form/ChangePass/ChangePassForm";
import UserNav from "../components/Header/usernav";
import "./Css/user.css";

function SiteUser({ extraProps = "profile" }) {
  return (
    <div className="siteuser siteuser__nav">
      <UserNav></UserNav>
      <div className="siteuser__forms">
        {extraProps === "profile" ? (
          <ProfileForm></ProfileForm>
        ) : extraProps === "address" ? (
          <AddressForm></AddressForm>
        ) : extraProps === "change-pass" ? (
          <ChangePassform></ChangePassform>
        ) : null}
      </div>
    </div>
  );
}
export default SiteUser;
