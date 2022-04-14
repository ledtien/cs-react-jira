import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_PROJECT_CATEGORY_SAGA,
  SUBMIT_EDIT_FORM,
  UPDATE_PROJECT_SAGA,
} from "../../../../redux/contants/CloneJira/Jira";
import { withFormik } from "formik";
import * as yup from "yup";

function FormEditProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryJiraReducer.arrProjectCategory
  );
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
  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
    dispatch({ type: SUBMIT_EDIT_FORM, submitFunction: handleSubmit });
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <h6>ID</h6>
            <input
              value={values.id}
              className="form-control"
              name="id"
              disabled
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <h6>Project name</h6>
            <input
              value={values.projectName}
              className="form-control"
              name="projectName"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <h6>Project category</h6>
            <select
              name="categoryId"
              value={values.categoryId}
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
        </div>
        <div className="col-12">
          <h6>Description</h6>
          <Editor
            apiKey="i5afrb8wupw9xgy3yaw6qnofwljusx4jhlhe0o861cr3f2e0"
            name="descriptionForm"
            initialValue={values.description}
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
      </div>
    </form>
  );
}

const FormEditProjectFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },
  validationSchema: yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({ type: UPDATE_PROJECT_SAGA, projectUpdate: values });
  },

  displayName: "CreateProject",
})(FormEditProject);

const mapStateToProps = (state) => {
  return {
    projectEdit: state.FormProjectReducer.projectEdit,
  };
};

export default connect(mapStateToProps)(FormEditProjectFormik);
