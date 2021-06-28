import React from "react";
import { useLocation } from "react-router-dom";
import Sendmail from "./Sendmail";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { Markup } from "interweave";

var dateFormat = require("dateformat");

const Sentmail = (props) => {
  const userData = useSelector((store) => store.userCheck);

  const { search } = useLocation();
  const urlCode = new URLSearchParams(search);
  const id = urlCode.get("id");

  return (
    <>
      <>
        <Navbar />
        <div className="Home-page mt-5">
          <div className="container">
            <div className="row ">
              <div className="col-lg-8 col-12 mx-auto">
                <div className="all-mails-header">
                  <span className="all-mail">Sent Mail</span>
                  <Sendmail />
                </div>
                {userData.sentmails.length === 0 ? (
                  ""
                ) : (
                  <div className="one-mail">
                    <div>
                      <div>
                        <span className="one-mail-sender">
                          To: {userData.sentmails[id].to}
                        </span>
                        <br />
                        <span className="one-mail-sender-mail">
                          ({userData.sentmails[id].email})
                        </span>
                        <span className="one-mail-time">
                          {dateFormat(userData.sentmails[id].time)}
                        </span>
                      </div>
                      <hr />
                      <div>
                        <p className="mt-3 one-mail-subject">
                          Subject:- {userData.sentmails[id].subject}
                        </p>
                        <p className="one-mail-body">
                          <b>Body:-</b>{" "}
                          <Markup content={userData.sentmails[id].body} />
                        </p>
                      </div>

                      <hr />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Sentmail;
