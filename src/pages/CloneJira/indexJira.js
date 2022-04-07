import React from "react";
import ContentMain from "../../components/Jira/Main/ContentMain";
import HeaderMain from "../../components/Jira/Main/HeaderMain";
import InfoMain from "../../components/Jira/Main/InfoMain";

export default function indexJira() {
  return (
    <>
      <div className="main">
        <HeaderMain />
        <h3>Cyber Board</h3>
        <InfoMain />
        <ContentMain />
      </div>
    </>
  );
}
