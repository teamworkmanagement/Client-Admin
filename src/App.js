import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import authApi from "./api/authApi";
import { setValueAuth } from "./authSlice";
//import { islogin } from "./authSlice";
//import { islogin } from "./appSlice";
import PublicRoute from "./routes/PublicRoute";
import "./scss/style.scss";
import Login from "./views/pages/login/Login";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages

const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

function App() {

  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus)


  useEffect(() => {
    const cloneStatus = !!loginStatus;

    console.log(cloneStatus);

    if (!cloneStatus) {
      console.log("check login");
      authApi.isLogin().then(res => {
        dispatch(setValueAuth(true));
      }).catch(err => {
        console.log(err);
        dispatch(setValueAuth(false));
      })
    }
  }, []);

  return (
    <BrowserRouter
      getUserConfirmation={(message, callback) => {
        // this is the default behavior
        const allowTransition = window.confirm(message);
        callback(allowTransition);
      }}
    >
      <React.Suspense fallback={loading}>
        <Switch>
          <PublicRoute
            restricted={true}
            component={Login}
            path="/login"
            exact
          />

          <Route
            path="/"
            name="Home"
            render={(props) => <TheLayout {...props} />}
          />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
