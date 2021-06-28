import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div>
        <div className="container">
          <div className="row text-center d-flex justify-content-center">
            <div className="col-lg-7 col-md-9">
              <div className="error-box">
                <h1 className="error404">404</h1>
                <h1>We are sorry, page not found!</h1>
                <p className="">
                  The page you are looking for might have been removed or is
                  temporarily unavailable or had its name changed.
                </p>
                <NavLink className="btn btn-success" to="/">
                  Back To Homepage
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
