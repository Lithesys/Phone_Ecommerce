import React from "react";
import icon from "../Icon";
import "../LoginForm/login.css";
import { NavLink } from "react-router-dom";

function SignupForm() {
  return (
    <form className="form">
      <div className="form-name">
        <NavLink to="/login" className="icon__arrowback">
          <icon.IoArrowBack />
        </NavLink>
        <h1>ĐẶT LẠI MẬT KHẨU</h1>
      </div>
      <div className="flex-column">
        <label>Số điện thoại </label>
      </div>
      <div className="inputForm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          height="20"
          width="20">
          <path d="M27.308,20.649l-2.2-2.2a3.521,3.521,0,0,0-4.938-.021,2.152,2.152,0,0,1-2.729.267A15.026,15.026,0,0,1,13.3,14.562a2.181,2.181,0,0,1,.284-2.739A3.521,3.521,0,0,0,13.553,6.9l-2.2-2.2a3.514,3.514,0,0,0-4.961,0l-.633.634c-3.3,3.3-3.053,10.238,3.813,17.1,4.14,4.141,8.307,5.875,11.686,5.875a7.5,7.5,0,0,0,5.418-2.061l.634-.634A3.513,3.513,0,0,0,27.308,20.649ZM25.894,24.2l-.634.634c-2.6,2.6-8.339,2.125-14.276-3.813S4.571,9.34,7.171,6.74L7.8,6.107a1.511,1.511,0,0,1,2.133,0l2.2,2.2a1.511,1.511,0,0,1,.021,2.11,4.181,4.181,0,0,0-.531,5.239,17.01,17.01,0,0,0,4.713,4.706,4.179,4.179,0,0,0,5.231-.517,1.512,1.512,0,0,1,2.118.013l2.2,2.2A1.51,1.51,0,0,1,25.894,24.2Z"></path>
        </svg>
        <input type="text" className="input" placeholder="Số điện thoại" />
      </div>
      <button className="button-submit">Tiếp theo</button>
    </form>
  );
}

export default SignupForm;
