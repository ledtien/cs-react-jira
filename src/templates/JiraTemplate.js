import React from "react";
import { Route } from "react-router-dom";
import Header from "../components/Home/Header/Header";
import HeaderMain from "../components/Jira/Main/HeaderMain";
import InfoMain from "../components/Jira/Main/InfoMain";
import ContentMain from "../components/Jira/Main/ContentMain";
import MenuJira from "../components/Jira/MenuJira";
import SideBarJira from "../components/Jira/SideBarJira";
import "../index.css";
import ModalJira from "../components/Jira/ModalJira/ModalJira";

export const JiraTemplate = (props) => {
  let { Component, ...restRoute } = props;
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <>
            <div className="jira">
              <SideBarJira />
              {/* Menu */}
              <MenuJira />
              {/* Main */}
              <Component {...propsRoute} />
            </div>
            {/* <!-- Search Modal --> */}
            <ModalJira />
          </>
        );
      }}
    />
  );
};
