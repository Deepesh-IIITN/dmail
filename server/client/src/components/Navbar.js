import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userData = useSelector((store) => store.userCheck);

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            D-mail
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink exact className="nav-link" to="/">
                  Home{" "}
                </NavLink>
              </li>

              {userData.userVerify ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/history">
                    {" "}
                    History{" "}
                  </NavLink>
                </li>
              ) : (
                ""
              )}

              {userData.userVerify ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    {" "}
                    Logout{" "}
                  </NavLink>
                </li>
              ) : (
                ""
              )}

              {userData.userVerify ? (
                ""
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      {" "}
                      Login{" "}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      {" "}
                      Signup{" "}
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
