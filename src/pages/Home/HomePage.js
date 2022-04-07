import React from "react";
import { useSelector } from "react-redux";

export default function HomePage(props) {
  let userLogin = useSelector((state) => state.UserJiraReducer.userLogin);
  return (
    <div>
      {userLogin.email}
      <img src={userLogin.avatar} alt="" />
    </div>
  );
}
