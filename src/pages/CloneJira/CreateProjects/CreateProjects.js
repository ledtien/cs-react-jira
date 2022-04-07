import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as yup from "yup";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  CREATE_PROJECT_SAGA,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../../redux/contants/CloneJira/Jira";

function CreateProjects(props) {
  //goi api
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryJiraReducer.arrProjectCategory
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
  }, []);

  //
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  // tiynmce-react
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      console.log(editorRef.current);
    }
  };
  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  return (
    <div className="container m-5">
      <h3>Create Project</h3>
      <form
        className="container"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <div className="form-group">
          <p>Name</p>
          <input type="text" className="form-control" name="projectName" />
        </div>
        <div className="form-group">
          <p>Description</p>
          {/* <input type="text" className="form-control" name="description" /> */}
          <Editor
            apiKey="i5afrb8wupw9xgy3yaw6qnofwljusx4jhlhe0o861cr3f2e0"
            name="description"
            onInit={(evt, editor) => (editorRef.current = editor)}
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
        <div className="form-group">
          <p>Type</p>
          <select
            name="categoryId"
            className="form-control"
            onChange={handleChange}
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Create Project
        </button>
      </form>
    </div>
  );
}

const CreateProjectFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    projectName: "",
    description: "",
    categoryId: props.arrProjectCategory[0]?.id,
  }),

  validationSchema: yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({ type: CREATE_PROJECT_SAGA, newProject: values });
  },

  displayName: "CreateProject",
})(CreateProjects);

const mapStateToProps = (state) => {
  return {
    arrProjectCategory: state.ProjectCategoryJiraReducer.arrProjectCategory,
  };
};

export default connect(mapStateToProps)(CreateProjectFormik);
