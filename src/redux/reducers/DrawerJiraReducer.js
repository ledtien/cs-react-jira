import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_FORM_CREATE_TASK,
  OPEN_FORM_EDIT_PROJECT,
  SET_SUBMIT_CREATE_TASK,
  SUBMIT_EDIT_FORM,
} from "../contants/CloneJira/Jira";

const initialState = {
  title: "",
  visible: false,
  ComponentDrawerContent: <p>Default Content</p>,
  callBackSubmit: (props) => {},
};

export const DrawerJiraReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, visible: true };

    case CLOSE_DRAWER:
      return { ...state, visible: false };

    case OPEN_FORM_EDIT_PROJECT: {
      return {
        ...state,
        title: action.title,
        visible: true,
        ComponentDrawerContent: action.Component,
      };
    }

    case SUBMIT_EDIT_FORM: {
      return { ...state, callBackSubmit: action.submitFunction };
    }

    case OPEN_FORM_CREATE_TASK: {
      return {
        ...state,
        visible: true,
        title: action.title,
        ComponentDrawerContent: action.Component,
      };
    }

    case SET_SUBMIT_CREATE_TASK: {
      return { ...state, callBackSubmit: action.submitFunction };
    }
    default:
      return state;
  }
};
