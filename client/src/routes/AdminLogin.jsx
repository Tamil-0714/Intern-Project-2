import React, { useEffect, useState } from "react";
import "../style/adminLogin.css";
import { BASE_API_URL } from "../assests";
import axios from "axios";

const AdminLogin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPasword] = useState("");
  const [isShow, setIsShow] = useState(true);
  const [sessionId, setSessionId] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [cursorStyle, setCursorStyle] = useState("pointer");
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const localSessionId = localStorage.getItem("sessionId");
    if (
      localSessionId &&
      localSessionId != "false" &&
      localSessionId !== null
    ) {
      location.href = "/adminPage";
    }
  }, []);

  const handleReSet = () => {
    setPasword("");
    setUserName("");
  };
  const handleUserNameChange = (e) => {
    const uName = e.target.value.trim();
    setUserName(uName);
  };
  const handlePasswordChange = (e) => {
    const pass = e.target.value.trim();
    setPasword(pass);
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (userName.trim() && password.trim()) {
      const formData = {
        userName: userName,
        password: password,
        sessionId: false,
      };
      setIsButtonDisabled(true);
      setIsError(false);
      setCursorStyle("not-allowed");
      const res = await axios.post(`${BASE_API_URL}/adminCred`, formData);
      // console.log(res.data);
      if (!res.data.sessionId) {
        setIsButtonDisabled(false);
        setCursorStyle("pointer");
        setIsError(true);
      }
      handleClientSession(res.data);
    }
  };
  const handleClientSession = (sessionOBJ) => {
    if (sessionOBJ.sessionId !== false) {
      localStorage.setItem("sessionId", sessionOBJ.sessionId);
    } else {
      localStorage.setItem("sessionId", false);
    }
    setSessionId(sessionOBJ.sessionId);
  };
  useEffect(() => {
    if (sessionId) {
      location.href = "/adminPage";
    }
  }, [sessionId]);

  return (
    <div className="wrapper">
      <div className="admin-login-container">
        <h3 className="headder-element">Admin Login</h3>
        <form
          action="passwordVerification"
          method="post"
          onSubmit={(e) => handleFormSubmission(e)}
        >
          <div className="input-fields-container">
            <input
              type="text"
              placeholder="User Name"
              className={isError ? "userName error" : "userName"}
              name="pass"
              value={userName}
              onChange={(e) => handleUserNameChange(e)}
            />
            <input
              type={isShow ? "password" : "text"}
              placeholder="Password"
              className={isError ? "pass error" : "pass"}
              name="pass"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
            />
            <button
              className="show-hide"
              type="button"
              onClick={() => {
                setIsShow(!isShow);
              }}
            >
              {isShow ? "Show" : "Hide"}
            </button>
          </div>
          <div className="btn-container">
            <button
              type="reset"
              className={
                isButtonDisabled ? "btn btn-reset dis-hover" : "btn btn-reset"
              }
              onClick={handleReSet}
              disabled={isButtonDisabled}
              style={{ cursor: cursorStyle }}
            >
              Reset
            </button>
            <button
              className={
                isButtonDisabled ? "btn btn-login dis-hover" : "btn btn-login"
              }
              type="submit"
              disabled={isButtonDisabled}
              style={{ cursor: cursorStyle }}
            >
              {isButtonDisabled ? "Logging in... Loading" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
