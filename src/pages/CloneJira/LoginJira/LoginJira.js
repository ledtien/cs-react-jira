import { Input, Tooltip, Button } from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { withFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { connect } from "react-redux";
import { USER_SIGN_IN_API } from "../../../redux/contants/CloneJira/Jira";
import { jiraSignInAction } from "../../../redux/actions/JIraAction";

function LoginJira(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  return (
    <form
      onSubmit={handleSubmit}
      className="container"
      style={{ height: window.innerHeight, maxWidth: "400px" }}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center">Login Jira</h3>
        <Input
          onChange={handleChange}
          name="email"
          className="mt-3"
          placeholder="Enter your Email"
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Email">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
        <p className="text-danger">{errors.email}</p>
        <Input.Password
          onChange={handleChange}
          name="password"
          placeholder="Enter your password"
          prefix={<LockOutlined />}
          className="mt-3"
        />
        <p className="text-danger">{errors.password}</p>
        <Button
          htmlType="submit"
          className="mt-3"
          style={{ backgroundColor: "rgb(102,117,223)", color: "white" }}
          size={"medium"}
          block
        >
          Log-in
        </Button>
        <div className="social text-center mt-3">
          <Button
            className="mr-2"
            style={{ backgroundColor: "rgb(59,89,152)" }}
            type="primary"
            shape="circle"
            icon={<FacebookOutlined />}
            size="small"
          />
          <Button
            type="primary"
            shape="circle"
            icon={<TwitterOutlined />}
            size="small"
          />
        </div>
      </div>
    </form>
  );
}

const LoginJiraFormik = withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),
  validationSchema: yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .min(4, "Should be 4 characters minium")
      .max(32, "Password too long - Should be 32 characters maximum"),
  }),
  handleChange: (value) => {
    console.log(value);
  },

  handleSubmit: (values, { props, setSubmitting }) => {
    // let action = {
    //   type: USER_SIGN_IN_API,
    //   userLogin: { email: values.email, password: values.password },
    // };

    props.dispatch(jiraSignInAction(values.email, values.password));
    // console.log(values);
    // console.log(props);
  },

  displayName: "Jira",
})(LoginJira);

export default connect()(LoginJiraFormik);
