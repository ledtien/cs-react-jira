import { EDIT_PROJECT_JIRA } from "../contants/CloneJira/Jira";

const initialState = {
  projectEdit: {
    // id: 0,
    // projectName: "string",
    // creator: "string",
    // description: "string",
    // categoryId: "2",
  },
};

export const FormProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROJECT_JIRA: {
      state.projectEdit = action.projectEdit;
      return { ...state };
    }

    default:
      return state;
  }
};
