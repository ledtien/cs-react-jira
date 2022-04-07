import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { Image, Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  }, []);

  let { Component, ...restRoute } = props;
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <Layout>
            <Sider
              width={size.width / 2}
              style={{
                height: size.height,
                backgroundImage: "url(https://picsum.photos/1000)",
                backgroundSize: "cover",
              }}
            ></Sider>
            <Layout>
              <Component {...propsRoute} />
            </Layout>
          </Layout>
        );
      }}
    />
  );
};
