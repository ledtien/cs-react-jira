import React from "react";
import { Route } from "react-router-dom";
import Header from "../components/Home/Header/Header";

export const HomeTemPlate = (props) => {
  let { Component, ...restRoute } = props;
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <>
            <Header />
            <Component {...propsRoute} />
          </>
        );
      }}
    />
  );
};
