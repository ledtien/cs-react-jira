import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_FORM_CREATE_TASK } from "../../redux/contants/CloneJira/Jira";
import FormCreateTask from "./Forms/FormCreateTask/FormCreateTask";

export default function SideBarJira() {
  const dispatch = useDispatch();

  const { Sider } = Layout;
  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  return (
    <>
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <div
          onClick={toggle}
          style={{
            textAlign: "right",
            color: "white",
            cursor: "pointer",
            paddingRight: "8px",
            fontSize: "18px",
          }}
        >
          {state.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<PlusCircleOutlined />}
            onClick={() => {
              dispatch({
                type: OPEN_FORM_CREATE_TASK,
                Component: <FormCreateTask />,
                title: "Create task",
              });
            }}
          >
            Create task
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined />}>
            Search
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}
