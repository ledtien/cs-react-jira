import React from "react";
import { useDispatch } from "react-redux";
import {
  GET_TASK_DETAIL_SAGA,
  UPDATE_TASK_STATUS_SAGA,
} from "../../../redux/contants/CloneJira/TaskConstant";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function ContentMain(props) {
  const { projectDetail } = props;

  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    console.log(result);
    const { destination, source } = result;
    const { projectId, taskId } = JSON.parse(result.draggableId);
    //update status
    if (!destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    dispatch({
      type: UPDATE_TASK_STATUS_SAGA,
      updateStatus: {
        taskId: taskId,
        statusId: destination.droppableId,
        projectId: projectId,
      },
    });
  };
  const renderCardTaskList = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {projectDetail.lstTask?.map((task, index) => {
          return (
            <Droppable droppableId={task.statusId} key={index}>
              {(provided) => {
                return (
                  <div
                    className="card pb-2"
                    style={{ width: "17rem", height: "auto" }}
                    key={index}
                  >
                    <div className="card-header">{task.statusName}</div>
                    <ul
                      className="list-group list-group-flush"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{ height: "100%" }}
                    >
                      {task.lstTaskDeTail?.map((detail, index) => {
                        return (
                          <Draggable
                            key={detail.taskId.toString()}
                            index={index}
                            draggableId={JSON.stringify({
                              projectId: detail.projectId,
                              taskId: detail.taskId,
                            })}
                          >
                            {(provided) => {
                              return (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="list-group-item"
                                  data-toggle="modal"
                                  data-target="#infoModal"
                                  key={index}
                                  onClick={() => {
                                    dispatch({
                                      type: GET_TASK_DETAIL_SAGA,
                                      taskId: detail.taskId,
                                    });
                                  }}
                                >
                                  <p>{detail.taskName}</p>
                                  <div
                                    className="block"
                                    style={{ display: "flex" }}
                                  >
                                    <div className="block-left">
                                      <p className="text-danger">
                                        {detail.priorityTask.priority}
                                      </p>
                                    </div>
                                    <div className="block-right">
                                      <div
                                        className="avatar-group"
                                        style={{ display: "flex" }}
                                      >
                                        {detail.assigness.map(
                                          (member, index) => {
                                            return (
                                              <div
                                                className="avatar"
                                                key={index}
                                              >
                                                <img
                                                  src={member.avatar}
                                                  alt={member.id}
                                                />
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            }}
                          </Draggable>
                        );
                      })}

                      {/* <li className="list-group-item">
              <p>
                Each issue has a single reporter but can have multiple assignees
              </p>
              <div className="block" style={{ display: "flex" }}>
                <div className="block-left">
                  <i className="fa fa-check-square" />
                  <i className="fa fa-arrow-up" />
                </div>
                <div className="block-right">
                  <div className="avatar-group" style={{ display: "flex" }}>
                    <div className="avatar">
                      <img
                        src={require("../../../assets/img/download (1).jfif")}
                        alt="1"
                      />
                    </div>
                    <div className="avatar">
                      <img
                        src={require("../../../assets/img/download (2).jfif")}
                        alt="2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item">Vestibulum at eros</li> */}
                      {provided.placeholder}
                    </ul>
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
  };

  return (
    <>
      <div className="content" style={{ display: "flex" }}>
        {renderCardTaskList()}
        {/* <div className="card" style={{ width: "17rem", height: "25rem" }}>
          <div className="card-header">SELECTED FOR DEVELOPMENT 2</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
          </ul>
        </div>
        <div className="card" style={{ width: "17rem", height: "25rem" }}>
          <div className="card-header">IN PROGRESS 2</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
          </ul>
        </div>
        <div className="card" style={{ width: "17rem", height: "25rem" }}>
          <div className="card-header">DONE 3</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
        </div> */}
      </div>
    </>
  );
}
