import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmail = () => {
  const history = useHistory();
  const { search } = useLocation();
  const urlCode = new URLSearchParams(search);
  const code = urlCode.get("code");
  const email = urlCode.get("email");

  const verifyEmail = async () => {
    try {
      console.log(code);
      const response = await fetch("/verifyEmailUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          email: email,
        }),
      });

      const Data = await response.json();

      if (response.status === 201) {
        toast.dark(`${Data.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        toast.clearWaitingQueue();

        setTimeout(() => {
          history.push("/login");
        }, 2000);
      }
    } catch (err) {
      toast.dark("Email is not verified Try again", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      toast.clearWaitingQueue();

      setTimeout(() => {
        history.push("/signup");
      }, 2000);
    }
  };

  useEffect(() => {
    verifyEmail();
  });
  return (
    <>
      <ToastContainer />
    </>
  );
};

export default VerifyEmail;
