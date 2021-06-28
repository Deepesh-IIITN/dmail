import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  const uerLogout = async () => {
    try {
      const res = await fetch("/logoutUserData", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      await res.json();

      if (res.status === 201) {
        history.push("/");
        window.location.reload();
      }
    } catch (err) {
      history.push("/");
      window.location.reload();
    }
  };

  useEffect(() => {
    uerLogout();
  }, []);

  return (
    <div>
      <p>please Wait...</p>
    </div>
  );
};

export default Logout;
