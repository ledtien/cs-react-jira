import {
  GET_ALL_PROJECTS,
  GET_ALL_PROJECT_ACTION,
  GET_PROJECT_DETAIL,
} from "../contants/CloneJira/Jira";

const initialState = {
  projectList: [],
  projectDetail: {},
  arrProject: [],
};

export const ProjectJiraReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECTS: {
      state.projectList = action.projectList;
      return { ...state };
    }

    case GET_PROJECT_DETAIL: {
      state.projectDetail = action.projectDetail;
      return { ...state };
    }

    case GET_ALL_PROJECT_ACTION: {
      return { ...state, arrProject: action.arrProject };
    }
    default:
      return state;
  }
};
