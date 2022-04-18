import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  GET_TASK_DETAIL,
  REMOVE_USER_ASSIGN,
} from "../contants/CloneJira/TaskConstant";

const initialState = {
  taskDetail: {
    priorityTask: {
      priorityId: 1,
      priority: "High",
    },
    taskTypeDetail: {
      id: 1,
      taskType: "bug",
    },
    assigness: [
      {
        id: 1152,
        avatar: "https://ui-avatars.com/api/?name=HoangLam",
        name: "HoangLam",
        alias: "hoanglam",
      },
      {
        id: 1038,
        avatar: "https://ui-avatars.com/api/?name=hyhy",
        name: "hyhy",
        alias: "thuyet",
      },
    ],
    lstComment: [],
    taskId: 3749,
    taskName: "tienlwerlwer",
    alias: "tienlwerlwer",
    description:
      "<p><strong>This is the initial content of the editor.</strong></p>",
    statusId: 1,
    originalEstimate: 11,
    timeTrackingSpent: 11,
    timeTrackingRemaining: 11,
    typeId: 1,
    priorityId: 1,
    projectId: 4303,
  },
};

export const TaskDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DETAIL: {
      return { ...state, taskDetail: action.taskDetail };
    }

    case CHANGE_TASK_MODAL: {
      let { name, value } = action;
    }

    case CHANGE_ASSIGNESS: {
      state.taskDetail.assigness = [
        ...state.taskDetail.assigness,
        action.userSelected,
      ];
      return { ...state };
    }

    case REMOVE_USER_ASSIGN: {
      state.taskDetail.assigness = [
        ...state.taskDetail.assigness.filter(
          (user) => user.id !== action.userId
        ),
      ];
      return { ...state };
    }
    default:
      return state;
  }
};
