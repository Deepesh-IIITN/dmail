import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Sendmail = () => {
  const userData = useSelector((store) => store.userCheck);

  const [formData, setformdata] = useState({
    mail: "",
    subject: "",
    body: "",
    schedule: "0",
  });
  console.log(formData);
  const setData = (e) => {
    setformdata({ ...formData, [e.target.name]: e.target.value });
  };
  const handleData = (e) => {
    setformdata({ ...formData, body: e });
  };
  const postData = async (e) => {
    e.preventDefault();
    try {
      const { mail, subject, body, schedule } = formData;

      const res = await fetch("/sendMail", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: userData.name,
          mail,
          subject,
          body,
          schedule,
          user_mail: userData.email,
        }),
      });
      const data = await res.json();

      if (res.status === 201) {
        setformdata({
          ...formData,
          mail: "",
          subject: "",
          body: "",
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
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.dark("Something went wrong", {
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
      <button
        type="button"
        className="send-mail-btn"
        data-toggle="modal"
        data-target="#sendMail"
      >
        <span className="plus">+</span> Send mail
      </button>
      <div
        className="modal fade"
        id="sendMail"
        tabindex="-1"
        role="dialog"
        aria-labelledby="sendMailLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="sendMailLabel">
                New Message
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form method="POST">
              <div className="modal-body">
                <div className="form-group">
                  <label for="recipients">
                    Recipient <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="recipients"
                    name="mail"
                    placeholder="example@gmail.com"
                    required="required"
                    value={formData.mail}
                    onChange={setData}
                  />
                </div>
                {/* <div className="form-group">
                  <label for="cc">CC</label>
                  <input
                    type="email"
                    className="form-control"
                    id="cc"
                    placeholder="example@gmail.com"
                  />
                </div> */}
                <div className="form-group">
                  <label for="subject">
                    Subject <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    required="required"
                    onChange={setData}
                    value={formData.subject}
                  />
                </div>

                {/* <div className="form-group">
                  <label for="exampleFormControlTextarea1">
                    Body <span style={{ color: "red" }}>*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="body"
                    required="required"
                    value={formData.body}
                    onChange={setData}
                  ></textarea>
                </div> */}
                <label for="exampleFormControlTextarea1">
                  Body <span style={{ color: "red" }}>*</span>
                </label>
                <ReactQuill
                  name="body"
                  placeholder="Write Here"
                  modules={Sendmail.modules}
                  formats={Sendmail.format}
                  onChange={handleData}
                  value={formData.body}
                />
              </div>
              <hr />
              <div className="px-3 pb-3">
                <label>Schedule Selector</label>
                <br />
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="schedule"
                    id="option0"
                    value="0"
                    checked={true}
                    onChange={setData}
                  />
                  <label className="form-check-label" for="option0">
                    Never
                  </label>
                </div>
                {/* <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="schedule"
                    id="option1"
                    value="option1"
                  />
                  <label className="form-check-label" for="option1">
                    Yearly
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="schedule"
                    id="option2"
                    value="option2"
                  />
                  <label className="form-check-label" for="option2">
                    Monthly
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="schedule"
                    id="option3"
                    value="option3"
                  />
                  <label className="form-check-label" for="option3">
                    Weekly
                  </label>
                </div> */}
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="schedule"
                    id="option4"
                    value="1"
                    onChange={setData}
                  />
                  <label className="form-check-label" for="option4">
                    20-30 Seconds
                  </label>
                </div>
              </div>
              {/* <div className="pl-4 py-3">
                <TextField
                  id="time"
                  label="Set Time"
                  type="time"
                  name="time"
                  defaultValue="07:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </div> */}

              <div className="modal-footer">
                <button
                  type="submit"
                  onClick={postData}
                  className="btn btn-primary"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer limit={1} />
    </>
  );
};

export default Sendmail;

Sendmail.modules = {
  toolbar: [["bold", "italic"], [{ font: [] }]],
};
Sendmail.formats = ["header", "font", "size", "bold", "italic"];
