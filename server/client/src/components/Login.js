import { React, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import GoogleLogin from "react-google-login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
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

const Login = () => {
  const history = useHistory();
  const userData = useSelector((store) => store.userCheck);

  if (userData.userVerify) {
    history.push("/");
  }

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [formData, getData] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    getData({ ...formData, [e.target.name]: e.target.value });
  };

  //login

  const submitData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { email, password } = formData;

      const res = await fetch("/usersLogin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      if (res.status === 201) {
        setLoading(false);
        getData({
          ...formData,
          name: "",
          email: "",
        });

        history.push("/allmails");
        window.location.reload();
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

  // login with the google
  const responseSuccessGoogle = async (response) => {
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
        history.push("/allmails");
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

  return (
    <>
      <Navbar />
      <div>
        <div className="container mt-5">
          <div className="row d-flex justify-content-center align-items-centece r">
            <div className="col-lg-4 col-md-6 col-sm-8 col-11 signup-box">
              <div className="row">
                <div className="mx-auto p-4">
                  <h3 className="text-center">Login</h3>
                  <hr />
                  <form method="POST" autoComplete="off">
                    <div className="form-group">
                      <label for="email">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={inputHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label for="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={inputHandler}
                        value={formData.password}
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
                          // onFailure={responseErrorGoogle}
                          cookiePolicy={"single_host_origin"}
                          className="google_btn"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <hr />
                    <p className="px-4">
                      New User? <NavLink to="/signup">Create</NavLink> An
                      Account
                    </p>
                    <p>
                      <NavLink to="/login">Forgot Password</NavLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer limit={1} />
    </>
  );
};

export default Login;
