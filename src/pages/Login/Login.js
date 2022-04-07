import React, { useState } from "react";

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({ userName: "", password: "" });

  console.log(userLogin);
  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (userLogin.userName === "tienle" && userLogin.password === "tienle") {
      props.history.goBack();
      localStorage.setItem("userLogin", JSON.stringify(userLogin));
    } else {
      alert("Fail");
    }
  };
  return (
    <div>
      <form className="container" action="" onSubmit={handleLogin}>
        <h3>Log in</h3>
        <div className="form-group">
          <p>Username</p>
          <input
            type="text"
            name="userName"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <p>Password</p>
          <input
            name="password"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary">Log-in</button>
      </form>
    </div>
  );
}
