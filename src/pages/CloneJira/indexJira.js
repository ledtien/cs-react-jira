import React, { useEffect } from "react";
import ContentMain from "../../components/Jira/Main/ContentMain";
import HeaderMain from "../../components/Jira/Main/HeaderMain";
import InfoMain from "../../components/Jira/Main/InfoMain";
import { useSelector, useDispatch } from "react-redux";
import { GET_PROJECT_DETAIL_SAGA } from "../../redux/contants/CloneJira/Jira";

export default function DetailJira(props) {
  let { projectDetail } = useSelector((state) => state.ProjectJiraReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    let { projectId } = props.match.params;
    dispatch({ type: GET_PROJECT_DETAIL_SAGA, projectId: projectId });
  }, []);

  return (
    <>
      <div className="main">
        <HeaderMain projectDetail={projectDetail} />
        <h3>{projectDetail.projectName}</h3>
        <InfoMain
          members={projectDetail.members}
          projectDetail={projectDetail}
        />
        <ContentMain projectDetail={projectDetail} />
      </div>
    </>
  );
}
