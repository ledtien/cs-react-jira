import React from "react";
import parse from "html-react-parser";

export default function InfoMain(props) {
  const renderMembers = () => {
    return props.members?.map((member, index) => {
      return (
        <div className="avatar" key={index}>
          <img src={member.avatar} alt={member.avatar} />
        </div>
      );
    });
  };

  return (
    <>
      <div>{parse(`${props.projectDetail.description}`)}</div>
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          {renderMembers()}
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
}
