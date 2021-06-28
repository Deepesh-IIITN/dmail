import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "./components/Index";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import History from "./components/History";
import ErrorPage from "./components/ErrorPage";
import Logout from "./components/Logout";
import VerifyEmail from "./components/VerifyEmail";
import Mail from "./components/Mail";
import Sentmail from "./components/Sentmail";
import store from "./store";
import { Provider, useDispatch } from "react-redux";

const Routers = () => {
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      const response = await fetch("/checkUser", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const Data = await response.json();

      if (response.status === 201) {
        dispatch({ type: "CHECK_USER", payload: response, Data: Data });
      }
    } catch (err) {
      dispatch({ type: "CHECK_USER", payload: err, Data: "" });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Route exact path="/" component={Index} />
      <Route exact path="/allmails" component={Home} />
      <Route exact path="/history" component={History} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/verify_email" component={VerifyEmail} />
      <Route exact path="/mail" component={Mail} />
      <Route exact path="/sentmail" component={Sentmail} />
      <Route components={ErrorPage} />
    </>
  );
};

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Switch>
          <Routers />
        </Switch>
      </Provider>
    </>
  );
};

export default App;
