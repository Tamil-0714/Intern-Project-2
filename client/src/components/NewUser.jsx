import axios from "axios";
import React, { useState } from "react";
import { BASE_API_URL } from "../assests";
import "../style/newUser.css";

const NewUser = ({gatherUsersData}) => {
  const [userId, setUserId] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [isDupUsr, setIsDupUsr] = useState(false);
  const [isShow, setIsShow] = useState(true);
  function validateUserId(userId) {
    if (userId === "") return true;
    const regex = /^[a-zA-Z_]+$/;
    return regex.test(userId);
  }

  const handleUserIdChange = (e) => {
    const _ = e.target.value.trim();
    if (validateUserId(_)) {
      setIsDupUsr(false);
      setUserId(_);
    }
  };
  const handleUserNameChange = (e) => {
    setuserName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    const _ = e.target.value.trim();
    setPassword(_);
  };
  const handleReset = () => {
    setUserId("");
    setPassword("");
    setIsDupUsr(false);
    setuserName("");
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(userId);
    console.log(userName);
    console.log(password);
    const formData = {
      sessionId: localStorage.getItem("sessionId") || "",
      userId: userId,
      userName: userName,
      password: password,
    };
    const res = await axios.post(`${BASE_API_URL}/newUser`, formData, {
      validateStatus: function (status) {
        return status >= 200 && status < 500; // Accept only status codes between 200 and 499
      },
    });
    console.log(res.data);
    if (res.data.message === "ER_DUP_ENTRY") setIsDupUsr(true);
    if (res.data.message === "user created") {
      await gatherUsersData(localStorage.getItem("sessionId") || "");
      handleReset();
    }
  };

  return (
    <div className="new-user-creator-container">
      <div className="heading">
        <h3>New User creation</h3>
      </div>
      <div className="form-container">
        <form action="#" onSubmit={handleFormSubmit} className="new-user-form">
          <div className="user-id">
            <input
              type="text"
              name="userId"
              onChange={handleUserIdChange}
              value={userId}
              placeholder="user Id"
              autoComplete="off"
            />
            {isDupUsr && (
              <span style={{ color: "red" }} className="dup-err">
                UserId:{" "}
                <span className="spanId" style={{ color: "orange" }}>
                  {userId}
                </span>{" "}
                is unavailable{" "}
              </span>
            )}
          </div>
          <div className="user-name">
            <input
              type="text"
              name="UserName"
              onChange={handleUserNameChange}
              value={userName}
              placeholder="user Name"
              autoComplete="off"
            />
          </div>
          <div className="user-pass">
            <input
              type={isShow ? "password" : "text"}
              name="userPassword"
              onChange={handlePasswordChange}
              value={password}
              placeholder="Passoword"
              id="password"
            />
            <button
              className="show-hide-new-user"
              type="button"
              onClick={() => {
                setIsShow(!isShow);
              }}
            >
              {isShow ? "Show" : "Hide"}
            </button>
          </div>
          <div className="btns new-user-btn">
            <div className="reset">
              <button type="button" onClick={handleReset}>
                reset
              </button>
            </div>
            <div className="submit">
              <button type="submit">Done.!</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
