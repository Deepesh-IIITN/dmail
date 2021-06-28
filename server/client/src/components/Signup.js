import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Navbar from "./Navbar";
import GoogleLogin from "react-google-login";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: "rgb(65, 112, 65)",
    width: "100%",
    height: "2.5rem",
    color: "snow",
    "&:hover": {
      backgroundColor: "rgb(65, 112, 65)",
    },
    "&:focus": {
      backgroundColor: "rgb(65, 112, 65)",
    },
  },
  wrapper: {
    margin: "4px",
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -15,
    marginLeft: -12,
    "&:i": {
      color: "rgb(0, 0, 0)",
    },
  },
}));

//component Signup
const Signup = () => {
  const history = useHistory();
  const userData = useSelector((store) => store.userCheck);

  if (userData.userVerify) {
    history.push("/");
  }

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [formData, getData] = useState({
    Name: "",
    Email: "",
    Password: "",
    cPassword: "",
  });

  const handleInput = (e) => {
    getData({ ...formData, [e.target.name]: e.target.value });
  };

  //send data in backEnds

  const submitData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { Name, Email, Password, cPassword } = formData;

      const res = await fetch("/usersRegistration", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          Name,
          Email,
          Password,
          cPassword,
        }),
      });
      const data = await res.json();

      if (res.status === 201) {
        setLoading(false);
        getData({
          ...formData,
          Name: "",
          Email: "",
          Password: "",
          cPassword: "",
        });

        toast.dark(`${data.message}`, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        toast.clearWaitingQueue();
      } else if (res.status === 422) {
        setLoading(false);
        toast.dark(`${data.error}`, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        toast.clearWaitingQueue();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.dark("Invalid Credential Details", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      toast.clearWaitingQueue();
    }
  };

  // login google

  const responseErrorGoogle = (error) => {
    console.log(error);
  };

  const responseSuccessGoogle = async (response) => {
    console.log(response);
    try {
      const res = await fetch("/googleApiLogin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          tokenId: response.tokenId,
        }),
      });

      const Data = await res.json();

      if (res.status === 201) {
        history.push("/");
        window.location.reload();
      } else if (res.status === 422) {
        toast.dark(`${Data.error}`, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        toast.clearWaitingQueue();
      }
    } catch (err) {
      console.log(err);
      toast.dark("Invalid Credential Details", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      toast.clearWaitingQueue();
    }
  };

  // const responseErrorGoogle =  (err) =>{
  //   console.log(err);
  // }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-8 col-11  signup-box">
            <div className="row">
              <div className="mx-auto p-4">
                <h3 className="text-center">Signup</h3>
                <hr />
                <form method="POST">
                  <div className="form-group">
                    {/* <label for="name">Full Name</label> */}
                    <input
                      type="text"
                      value={formData.Name}
                      className="form-control"
                      id="name"
                      name="Name"
                      placeholder="Enter name"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-group">
                    {/* <label for="email">Email address</label> */}
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={formData.Email}
                      name="Email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-group">
                    {/* <label for="password">Password</label> */}
                    <input
                      type="password"
                      className="form-control"
                      name="Password"
                      value={formData.Password}
                      id="password"
                      placeholder="Password"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-group">
                    {/* <label for="cPassword">Confirm Password</label> */}
                    <input
                      type="password"
                      className="form-control"
                      name="cPassword"
                      value={formData.cPassword}
                      id="cPassword"
                      placeholder="Confirm Password"
                      onChange={handleInput}
                    />
                  </div>

                  <div className={classes.wrapper}>
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={submitData}
                      disabled={loading}
                      className={classes.btn}
                    >
                      Submit
                    </Button>
                    {loading && (
                      <Box className={classes.buttonProgress}>
                        <i className="zmdi zmdi-rotate-right zmdi-hc-spin zmdi-hc-2x" />
                      </Box>
                    )}
                  </div>
                  <ToastContainer limit={1} />
                </form>

                <div className="text-center">
                  <hr />
                  <p>OR</p>
                  <div className="px-5">
                    <div className="google-icon">
                      <GoogleLogin
                        clientId="436275991144-ifip93e24gdjsd9nual5vp9iem9gedkj.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={"single_host_origin"}
                        className="google_btn"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-12 text-center">
                  <hr />
                  <p>
                    Already Have an Account?{" "}
                    <NavLink to="/login">Login</NavLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
