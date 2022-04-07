import React from "react";
import { useSelector } from "react-redux";
import styleLoading from "./LoadingComponent.module.css";

export default function LoadingComponent() {
  const { isLoading } = useSelector((state) => state.loadingReducer);
  if (isLoading) {
    return (
      <div className={styleLoading.bgLoading}>
        <img
          src={require("../../../assets/img/imgLoading/Loading.gif")}
          alt="Loading"
        />
      </div>
    );
  } else {
    return "";
  }
}
