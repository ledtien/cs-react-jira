import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { GET_ALL_STATUS_SAGA } from "../../../redux/contants/CloneJira/StatusConstant";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/contants/CloneJira/PriorityConstant";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../redux/contants/CloneJira/TaskTypeConstant";
import { GET_PROJECT_DETAIL_SAGA } from "../../../redux/contants/CloneJira/Jira";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGN,
  UPDATE_TASK_STATUS_SAGA,
} from "../../../redux/contants/CloneJira/TaskConstant";
import { Editor } from "@tinymce/tinymce-react";

export default function ModalJira() {
  let { taskDetail } = useSelector((state) => state.TaskDetailReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  let { projectDetail } = useSelector((state) => state.ProjectJiraReducer);

  const [isVisible, setIsVisible] = useState(false);
  const [editContent, setEditContent] = useState(taskDetail.description);
  const [historyEditContent, setHistoryEditContent] = useState(
    taskDetail.description
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: HANDLE_CHANGE_POST_API_SAGA,
      actionType: CHANGE_TASK_MODAL,
      name,
      value,
    });
    // dispatch({
    //   type: CHANGE_TASK_MODAL,
    //   name,
    //   value,
    // });
  };
  const renderTimeTracking = () => {
    const max =
      Number(taskDetail.timeTrackingSpent) +
      Number(taskDetail.timeTrackingRemaining);

    let timePercent = Math.round(
      (Number(taskDetail.timeTrackingSpent) / max) * 100
    );
    return (
      <>
        <div className="time-tracking">
          <h6>TIME TRACKING</h6>
          <div style={{ display: "flex" }}>
            <i className="fa fa-clock" />
            <div style={{ width: "100%" }}>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${timePercent}%` }}
                  aria-valuenow={Number(taskDetail.timeTrackingSpent)}
                  aria-valuemin={0}
                  aria-valuemax={max}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p className="logged">{`${Number(
                  taskDetail.timeTrackingSpent
                )}h logged`}</p>
                <p className="estimate-time">{`${Number(
                  taskDetail.timeTrackingRemaining
                )}h remaining`}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              name="timeTrackingSpent"
              className="form-control"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="col-6">
            <input
              name="timeTrackingRemaining"
              className="form-control"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="searchModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-search">
          <div className="modal-content">
            <div className="modal-header">
              <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>RECENT ISSUES</p>
              <div style={{ display: "flex" }}>
                <div className="icon">
                  <i className="fa fa-bookmark" />
                </div>
                <div>
                  <p>cyberlearn</p>
                  <p>BUG-238066</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Info Modal --> */}
      <div
        className="modal fade"
        id="infoModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="infoModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-info">
          <div className="modal-content">
            <div className="modal-header">
              <div className="task-title">
                <i className="fa fa-bookmark" />
                <select
                  name="typeId"
                  value={taskDetail.typeId}
                  onChange={handleChange}
                >
                  {arrTaskType.map((task, index) => {
                    return (
                      <option value={task.id} key={index}>
                        {task.taskType}
                      </option>
                    );
                  })}
                </select>
                <span>{taskDetail.taskName}</span>
              </div>
              <div style={{ display: "flex" }} className="task-click">
                <div>
                  <i className="fab fa-telegram-plane" />
                  <span style={{ paddingRight: 20 }}>Give feedback</span>
                </div>
                <div>
                  <i className="fa fa-link" />
                  <span style={{ paddingRight: 20 }}>Copy link</span>
                </div>
                <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-8">
                    <p className="issue">
                      This is an issue of type:{" "}
                      {taskDetail.taskTypeDetail?.taskType}.
                    </p>
                    <div className="description">
                      <h5>Description:</h5>
                      <div>
                        {isVisible ? (
                          <div>
                            <Editor
                              apiKey="i5afrb8wupw9xgy3yaw6qnofwljusx4jhlhe0o861cr3f2e0"
                              name="description"
                              // onInit={(evt, editor) => (editorRef.current = editor)}
                              initialValue={taskDetail.description}
                              init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                  "advlist autolink lists link image charmap print preview anchor",
                                  "searchreplace visualblocks code fullscreen",
                                  "insertdatetime media table paste code help wordcount",
                                ],
                                toolbar:
                                  "undo redo | formatselect | " +
                                  "bold italic backcolor | alignleft aligncenter " +
                                  "alignright alignjustify | bullist numlist outdent indent | " +
                                  "removeformat | help",
                                content_style:
                                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                              }}
                              onEditorChange={(content, editor) => {
                                setEditContent(content);
                              }}
                            />
                            <button
                              className="btn btn-primary m-2"
                              onClick={() => {
                                dispatch({
                                  type: HANDLE_CHANGE_POST_API_SAGA,
                                  actionType: CHANGE_TASK_MODAL,
                                  name: "description",
                                  value: editContent,
                                });
                                // dispatch({
                                //   type: CHANGE_TASK_MODAL,
                                //   name: "description",
                                //   value: editContent,
                                // });

                                setIsVisible(false);
                              }}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-danger m-2"
                              onClick={() => {
                                dispatch({
                                  type: HANDLE_CHANGE_POST_API_SAGA,
                                  actionType: CHANGE_TASK_MODAL,
                                  name: "description",
                                  value: historyEditContent,
                                });
                                // dispatch({
                                //   type: CHANGE_TASK_MODAL,
                                //   name: "description",
                                //   value: historyEditContent,
                                // });
                                setIsVisible(false);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setHistoryEditContent(taskDetail.description);
                              setIsVisible(true);
                            }}
                          >
                            {parse(`${taskDetail.description}`)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ fontWeight: 500, marginBottom: 10 }}>
                      Jira Software (software projects) issue types:
                    </div>
                    <div className="title">
                      <div className="title-item">
                        <h3>
                          BUG <i className="fa fa-bug" />
                        </h3>
                        <p>
                          A bug is a problem which impairs or prevents the
                          function of a product.
                        </p>
                      </div>
                      <div className="title-item">
                        <h3>
                          STORY <i className="fa fa-book-reader" />
                        </h3>
                        <p>
                          A user story is the smallest unit of work that needs
                          to be done.
                        </p>
                      </div>
                      <div className="title-item">
                        <h3>
                          TASK <i className="fa fa-tasks" />
                        </h3>
                        <p>A task represents work that needs to be done</p>
                      </div>
                    </div>
                    <div className="comment">
                      <h6>Comment</h6>
                      <div
                        className="block-comment"
                        style={{ display: "flex" }}
                      >
                        <div className="avatar">
                          <img src="./assets/img/download (1).jfif" alt="1" />
                        </div>
                        <div className="input-comment">
                          <input type="text" placeholder="Add a comment ..." />
                          <p>
                            <span style={{ fontWeight: 500, color: "gray" }}>
                              Protip:
                            </span>
                            <span>
                              press
                              <span
                                style={{
                                  fontWeight: "bold",
                                  background: "#ecedf0",
                                  color: "#b4bac6",
                                }}
                              >
                                M
                              </span>
                              to comment
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="lastest-comment">
                        <div className="comment-item">
                          <div
                            className="display-comment"
                            style={{ display: "flex" }}
                          >
                            <div className="avatar">
                              <img
                                src={require("../../../assets/img/download (1).jfif")}
                                alt="1"
                              />
                            </div>
                            <div>
                              <p style={{ marginBottom: 5 }}>
                                Lord Gaben <span>a month ago</span>
                              </p>
                              <p style={{ marginBottom: 5 }}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Repellendus tempora ex
                                voluptatum saepe ab officiis alias totam ad
                                accusamus molestiae?
                              </p>
                              <div>
                                <span style={{ color: "#929398" }}>Edit</span>•
                                <span style={{ color: "#929398" }}>Delete</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="status">
                      <h6>STATUS</h6>
                      <select
                        className="custom-select"
                        value={taskDetail.statusId}
                        name="statusId"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        // onChange={(e) => {
                        //   const action = {
                        //     type: UPDATE_TASK_STATUS_SAGA,
                        //     updateStatus: {
                        //       taskId: taskDetail.taskId,
                        //       statusId: e.target.value,
                        //       projectId: taskDetail.projectId,
                        //     },
                        //   };
                        //   dispatch(action);
                        // }}
                      >
                        {arrStatus.map((status, index) => {
                          return (
                            <option value={status.statusId} key={index}>
                              {status.statusName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="assignees">
                      <h6>ASSIGNEES</h6>
                      <div className="row">
                        {taskDetail.assigness.map((user, index) => {
                          return (
                            <div className="col-3 mb-2 mt-2" key={index}>
                              <div className="avatar">
                                <img src={user.avatar} alt={user.id} />
                              </div>
                              <p className="name">
                                {user.name}
                                <i
                                  onClick={() => {
                                    dispatch({
                                      type: HANDLE_CHANGE_POST_API_SAGA,
                                      actionType: REMOVE_USER_ASSIGN,
                                      userId: user.id,
                                    });
                                    // dispatch({
                                    //   type: REMOVE_USER_ASSIGN,
                                    //   userId: user.id,
                                    // });
                                  }}
                                  className="fa fa-times"
                                  style={{ marginLeft: 5, cursor: "pointer" }}
                                />
                              </p>
                            </div>
                          );
                        })}
                        <div
                          className="col-6 mb-3"
                          style={{
                            alignItems: "center",
                          }}
                        >
                          <select
                            name="listUser"
                            className="form-control"
                            value="Add more"
                            onChange={(e) => {
                              let { value } = e.target;
                              const userSelect = projectDetail.members.find(
                                (mem) => mem.userId == value
                              );
                              const userSelected = {
                                ...userSelect,
                                id: userSelect.userId,
                              };
                              dispatch({
                                type: HANDLE_CHANGE_POST_API_SAGA,
                                actionType: CHANGE_ASSIGNESS,
                                userSelected,
                              });

                              // dispatch({
                              //   type: CHANGE_ASSIGNESS,
                              //   userSelected: userSelected,
                              // });
                            }}
                          >
                            <option value="0">Add more</option>
                            {projectDetail.members
                              ?.filter((member) => {
                                let index = taskDetail.assigness?.findIndex(
                                  (mem) => mem.id == member.userId
                                );
                                if (index !== -1) {
                                  return false;
                                }
                                return true;
                              })
                              .map((member, index) => {
                                return (
                                  <>
                                    <option value={member.userId} key={index}>
                                      {member.name}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* <div className="reporter">
                      <h6>REPORTER</h6>
                      <div style={{ display: "flex" }} className="item">
                        <div className="avatar">
                          <img
                            src={require("../../../assets/img/download (1).jfif")}
                            alt="1"
                          />
                        </div>
                        <p className="name">
                          Pickle Rick
                          <i
                            className="fa fa-times"
                            style={{ marginLeft: 5 }}
                          />
                        </p>
                      </div>
                    </div> */}
                    <div className="priority" style={{ marginBottom: 20 }}>
                      <h6>PRIORITY</h6>
                      <select
                        name="priorityId"
                        defaultValue={taskDetail.priorityId}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        {arrPriority.map((priority, index) => {
                          return (
                            <option value={priority.priorityId} key={index}>
                              {priority.priority}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="estimate">
                      <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                      <input
                        name="originalEstimate"
                        type="number"
                        className="estimate-hours"
                        defaultValue={taskDetail.originalEstimate}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                    {renderTimeTracking()}
                    <div style={{ color: "#929398" }}>
                      Create at a month ago
                    </div>
                    <div style={{ color: "#929398" }}>
                      Update at a few seconds ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
