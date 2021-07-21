import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const status = useSelector((state) => state.auth.loginStatus);
  //const status = false;
  return (
    <Route
      {...rest}
      render={(props) =>
        status && restricted ? (
          <Redirect to="/postcensorship" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;