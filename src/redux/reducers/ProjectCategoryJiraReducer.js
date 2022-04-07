import { GET_ALL_PROJECT_CATEGORY } from "../contants/CloneJira/Jira";

const initialState = {
  arrProjectCategory: [],
};

export const ProjectCategoryJiraReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_CATEGORY: {
      state.arrProjectCategory = action.data.content;
      return { ...state };
    }
    default:
      return state;
  }
};
