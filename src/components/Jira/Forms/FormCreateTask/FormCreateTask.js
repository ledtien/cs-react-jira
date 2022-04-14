import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Select, Slider } from "antd";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  GET_ALL_PROJECTS_SAGA_LIST,
  GET_USER_SAGA,
  SET_SUBMIT_CREATE_TASK,
} from "../../../../redux/contants/CloneJira/Jira";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../../redux/contants/CloneJira/TaskTypeConstant";
import { GET_ALL_PRIORITY_SAGA } from "../../../../redux/contants/CloneJira/PriorityConstant";
import { withFormik } from "formik";
import * as yup from "yup";
import { CREATE_TASK_SAGA } from "../../../../redux/contants/CloneJira/TaskConstant";
import { GET_ALL_STATUS_SAGA } from "../../../../redux/contants/CloneJira/StatusConstant";
import { PresetColorTypes } from "antd/lib/_util/colors";
import {
  GET_USER_BY_PROJECT,
  GET_USER_BY_PROJECT_SAGA,
} from "../../../../redux/contants/CloneJira/UserConstant";

function FormCreateTask(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  const dispatch = useDispatch();
  const { arrProject } = useSelector((state) => state.ProjectJiraReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrUser } = useSelector((state) => state.UserJiraReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  console.log(arrStatus);

  const children = [];
  // const { Option } = Select;
  // for (let i = 10; i < 36; i++) {
  //   children.push(
  //     <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
  //   );
  // }

  const userOption = arrUser.map((user, index) => {
    return { value: user.userId, label: user.name };
  });
  console.log(userOption);

  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECTS_SAGA_LIST });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_USER_SAGA, keyWord: "" });

    dispatch({ type: SET_SUBMIT_CREATE_TASK, submitFunction: handleSubmit });
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const handleChangeSelect = (value) => {
    console.log(`selected ${value}`);
    setFieldValue("listUserAsign", value);
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <p>Project</p>
        <select
          name="projectId"
          className="form-control"
          onChange={(e) => {
            dispatch({
              type: GET_USER_BY_PROJECT_SAGA,
              projectId: e.target.value,
            });
            setFieldValue("projectId", e.target.value);
          }}
        >
          {arrProject?.map((project, index) => {
            return (
              <option value={project.id} key={index}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <p>Task name</p>
        <input
          name="taskName"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <p>Status ID</p>
        <select
          name="statusId"
          className="form-control"
          onChange={handleChange}
        >
          {arrStatus?.map((status, index) => {
            return (
              <option value={status.statusId} key={index}>
                {status.statusName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Task type</p>
            <select
              name="typeId"
              className="form-control"
              onChange={handleChange}
            >
              {arrTaskType?.map((task, index) => {
                return (
                  <option value={task.id} key={index}>
                    {task.taskType}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6">
            <p>Priority</p>
            <select
              name="priorityId"
              className="form-control"
              onChange={handleChange}
            >
              {arrPriority?.map((priority, index) => {
                return (
                  <option value={priority.priorityId} key={index}>
                    {priority.priority}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p>Description</p>
        <Editor
          apiKey="i5afrb8wupw9xgy3yaw6qnofwljusx4jhlhe0o861cr3f2e0"
          name="description"
          // onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
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
          onEditorChange={handleEditorChange}
        />
      </div>
      <hr />
      <div className="form-group">
        <p>Assignees</p>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          options={userOption}
          optionFilterProp="label"
          onChange={handleChangeSelect}
          onSelect={(value) => {
            console.log(value);
          }}
        >
          {children}
        </Select>
      </div>
      <div className="form-group mt-5">
        <p>Original Estimate</p>
        <input
          onChange={handleChange}
          type="number"
          min="0"
          name="originalEstimate"
          className="form-control"
          defaultValue="0"
        />
      </div>
      <div className="form-group mt-3">
        <p>Time Tracking</p>
        <Slider
          defaultValue={30}
          value={timeTracking.timeTrackingSpent}
          max={
            Number(timeTracking.timeTrackingSpent) +
            Number(timeTracking.timeTrackingRemaining)
          }
        />
        <div className="row mb-4">
          <div className="col-6 text-left font-weight-bold">
            {timeTracking.timeTrackingSpent}h logged
          </div>
          <div className="col-6 text-right font-weight-bold">
            {timeTracking.timeTrackingRemaining}h logged
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <p>Time spent (hours)</p>
            <input
              type="number"
              defaultValue="0"
              min="0"
              name="timeTrackingSpent"
              className="form-control"
              onChange={(e) => {
                setTimeTracking({
                  ...timeTracking,
                  timeTrackingSpent: e.target.value,
                });
                setFieldValue("timeTrackingSpent", e.target.value);
              }}
            />
          </div>
          <div className="col-6">
            <p>Time remaining (hours)</p>
            <input
              type="number"
              defaultValue="0"
              min="0"
              name="timeTrackingRemaining"
              className="form-control"
              onChange={(e) => {
                setTimeTracking({
                  ...timeTracking,
                  timeTrackingRemaining: e.target.value,
                });
                setFieldValue("timeTrackingRemaining", e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

const FormCreateTaskFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    // if (props.arrProject.length > 0) {
    //   props.dispatch({
    //     type: GET_USER_BY_PROJECT_SAGA,
    //     projectId: props.arrProject[0]?.id,
    //   });
    // }
    return {
      taskName: "",
      description: "",
      statusId: props.arrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: props.arrProject[0]?.id,
      priorityId: props.arrPriority[0]?.priorityId,
      listUserAsign: [],
      typeId: props.arrTaskType[0]?.id,
    };
  },

  validationSchema: yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("values", values);
    props.dispatch({ type: CREATE_TASK_SAGA, taskObject: values });
  },

  displayName: "FormCreateTask",
})(FormCreateTask);

const mapStateToProps = (state) => {
  return {
    arrProject: state.ProjectJiraReducer.arrProject,
    arrTaskType: state.TaskTypeReducer.arrTaskType,
    arrPriority: state.PriorityReducer.arrPriority,
    arrStatus: state.StatusReducer.arrStatus,
  };
};

export default connect(mapStateToProps)(FormCreateTaskFormik);
