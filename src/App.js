import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/Loading/LoadingComponent";
import Header from "./components/Home/Header/Header";
import AboutPage from "./pages/About/AboutPage";
import CreateProjects from "./pages/CloneJira/CreateProjects/CreateProjects";
import indexJira from "./pages/CloneJira/indexJira";
import LoginJira from "./pages/CloneJira/LoginJira/LoginJira";
import ProjectManagement from "./pages/CloneJira/ProjectManagement/ProjectManagement";
import ContactPage from "./pages/Contact/ContactPage";
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import { HomeTemPlate } from "./templates/HomeTemplate";
import { JiraTemplate } from "./templates/JiraTemplate";
import { UserLoginTemplate } from "./templates/UserLoginTemplate";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "ADD_HISTORY", history });
  }, []);

  return (
    <>
      <LoadingComponent />
      <Switch>
        <HomeTemPlate path="/" Component={HomePage} exact />
        <HomeTemPlate path="/contact" Component={ContactPage} exact />
        <HomeTemPlate path="/about" Component={AboutPage} exact />
        <UserLoginTemplate exact path="/login" Component={LoginJira} />
        <HomeTemPlate path="/profile" Component={Profile} exact />
        <JiraTemplate path="/jira" exact Component={indexJira} />
        <JiraTemplate
          path="/create-project"
          exact
          Component={CreateProjects}
        />
        <JiraTemplate path="/projects" exact Component={ProjectManagement} />
      </Switch>
    </>
  );
}

export default App;
