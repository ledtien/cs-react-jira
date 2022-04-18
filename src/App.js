import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/Loading/LoadingComponent";
import DrawerJira from "./HOC/JiraHOC/DrawerJira";
import AboutPage from "./pages/About/AboutPage";
import CreateProjects from "./pages/CloneJira/CreateProjects/CreateProjects";
import DetailJira from "./pages/CloneJira/indexJira";
import LoginJira from "./pages/CloneJira/LoginJira/LoginJira";
import ProjectDetail from "./pages/CloneJira/ProjectDetail/ProjectDetail";
import ProjectManagement from "./pages/CloneJira/ProjectManagement/ProjectManagement";
import ContactPage from "./pages/Contact/ContactPage";
import DragAndDrop from "./pages/DemoDragAndDrop/DragAndDrop";
import HomePage from "./pages/Home/HomePage";
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
      <DrawerJira />
      <LoadingComponent />
      <Switch>
        {/* <HomeTemPlate path="/" Component={HomePage} exact /> */}
        {/* <HomeTemPlate path="/contact" Component={ContactPage} exact />
        <HomeTemPlate path="/about" Component={AboutPage} exact /> */}
        {/* <HomeTemPlate path="/profile" Component={Profile} exact /> */}
        {/* <JiraTemplate path="/jira" exact Component={indexJira} /> */}
        <UserLoginTemplate exact path="/login" Component={LoginJira} />
        <UserLoginTemplate exact path="/drag" Component={DragAndDrop} />
        <JiraTemplate path="/create-project" exact Component={CreateProjects} />
        <JiraTemplate path="/" exact Component={ProjectManagement} />
        <JiraTemplate
          path="/project-detail/:projectId"
          exact
          Component={DetailJira}
        />
      </Switch>
    </>
  );
}

export default App;
