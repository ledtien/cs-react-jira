import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  Table,
  Button,
  Space,
  Tag,
  Popconfirm,
  message,
  Avatar,
  Popover,
  AutoComplete,
} from "antd";
import parse from "html-react-parser";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_USER_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  DELETE_USER_FROM_PROJECT_SAGA,
  EDIT_PROJECT_JIRA,
  GET_ALL_PROJECTS_SAGA,
  GET_USER_SAGA,
  OPEN_DRAWER,
  OPEN_FORM_EDIT_PROJECT,
} from "../../../redux/contants/CloneJira/Jira";
import FormEditProject from "../../../components/Jira/Forms/FormEditProject/FormEditProject";

function confirm(e) {
  console.log(e);
  message.success("Click on Yes");
}

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

export default function ProjectManagement() {
  const searchRef = useRef(null);

  const projectList = useSelector(
    (state) => state.ProjectJiraReducer.projectList
  );

  const [value, setValue] = useState(""); //su dung cho value cua autocompleted

  const { userSearch } = useSelector((state) => state.UserJiraReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECTS_SAGA });
  }, []);

  const [state, setState] = useState({ filteredInfo: null, sortedInfo: null });

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id", //thuoc tinh name:'',
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      sortDirections: ["descend"],
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      render: (text, record, index) => {
        return <NavLink to={`/project-detail/${record.id}`}>{text}</NavLink>;
      },
      sorter: (item2, item1) => {
        let project1 = item1.projectName.trim().toLowerCase();
        let project2 = item2.projectName.trim().toLowerCase();
        if (project2 < project1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item2, item1) => {
        let category1 = item1.categoryName.trim().toLowerCase();
        let category2 = item2.categoryName.trim().toLowerCase();
        if (category2 < category1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Creator",
      // dataIndex: "creator",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="volcano">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator.name.trim().toLowerCase();
        let creator2 = item2.creator.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text, record, index) => {
    //     let jsxContent = parse(text);
    //     return <div key={index}>{jsxContent}</div>;
    //   },
    // },
    {
      title: "Members",
      key: "members",
      render: (text, record, index) => {
        return (
          <>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="top"
                  title="Members"
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Avatar</th>
                            <th>name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((member, index) => {
                            return (
                              <tr key={index}>
                                <td>{member.userId}</td>
                                <td>
                                  <img
                                    src={member.avatar}
                                    alt={index}
                                    width="30"
                                    height="30"
                                    style={{ borderRadius: "50%" }}
                                  />
                                </td>
                                <td>{member.name}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      dispatch({
                                        type: DELETE_USER_FROM_PROJECT_SAGA,
                                        userProject: {
                                          userId: member.userId,
                                          projectId: record.id,
                                        },
                                      });
                                    }}
                                    className="btn btn-danger"
                                    style={{ fontSize: "30" }}
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar src={member.avatar} key={index} />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            <Popover
              placement="topLeft"
              title={"Add member"}
              content={() => {
                return (
                  <AutoComplete
                    onSearch={(value) => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }

                      searchRef.current = setTimeout(() => {
                        dispatch({ type: GET_USER_SAGA, keyWord: value });
                      }, 300);
                    }}
                    options={userSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value}
                    onSelect={(valueSelect, option) => {
                      setValue(option.label); //set gia tri cho the search
                      dispatch({
                        type: ADD_USER_PROJECT_SAGA,
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    style={{ width: "100%" }}
                    placeholder="input here"
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: "50%" }}>+</Button>
            </Popover>
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch({
                  type: OPEN_FORM_EDIT_PROJECT,
                  Component: <FormEditProject />,
                  title: "Edit Project",
                });
                dispatch({
                  type: EDIT_PROJECT_JIRA,
                  projectEdit: record,
                });
              }}
            >
              <EditOutlined style={{ fontSize: 17 }} />
            </button>
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={() => {
                dispatch({ type: DELETE_PROJECT_SAGA, projectId: record.id });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">
                <DeleteOutlined style={{ fontSize: 17 }} />
              </button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <div className="container-fluid mt-5">
      <h3>Projects Management</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}
