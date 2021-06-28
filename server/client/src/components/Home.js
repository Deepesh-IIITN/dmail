import React from "react";
import Sendmail from "./Sendmail";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { Markup } from "interweave";

const Home = () => {
  const history = useHistory();
  const userData = useSelector((store) => store.userCheck);

  if (!userData.userVerify) {
    history.push("/");
  }

  const jump = (a) => {
    history.push("/mail?id=" + a);
  };

  var dateFormat = require("dateformat");

  function compare(a, b) {
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
  }
  userData.receivedmails.sort(compare);
  userData.receivedmails.reverse();

  return (
    <>
      <Navbar />
      <div className="Home-page mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 mx-auto">
              <div className="all-mails-header">
                <span className="all-mail">INBOX</span>
                <Sendmail />
                {/* <button className="send-mail-btn">
                  <span className="plus">+</span> Send mail
                </button> */}
              </div>
              <div className="allMail">
                {userData.receivedmails.length === 0 ? (
                  <>
                    <p className="text-center" style={{ color: "red" }}>
                      No mail received Yet
                    </p>
                  </>
                ) : (
                  userData.receivedmails.map((x, i) => {
                    return (
                      <div
                        key={x._id}
                        className="mail"
                        onClick={() => {
                          jump(i);
                        }}
                      >
                        <p>
                          <div>
                            From: <span className="mail-sender">{x.from}</span>
                            <span className="time">{dateFormat(x.time)}</span>
                          </div>
                          <div class="mail-subject">
                            <span>{x.subject}</span>
                          </div>

                          <div class="mail-body">
                            <span>
                              <Markup content={x.body} />
                            </span>
                          </div>
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
