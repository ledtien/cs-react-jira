import { notification } from "antd";

export const showNotification = (type, message, description = "") => {
  notification[type]({
    message: message,
    description: description,
  });
};
