import React from "react";
import Navbar from "./Navbar";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Index = () => {
  const history = useHistory();
  const userData = useSelector((store) => store.userCheck);

  if (userData.userVerify) {
    history.push("/allmails");
  }
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="container pt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="text-center mt-5">
                <h1 className="pt-5">"Welcome to dmail.com"</h1>
                <h3>Here you send mail to everyone</h3>
                <NavLink className="btn btn-success" to="/login">
                  Login
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
