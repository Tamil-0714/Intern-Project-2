import axios from "axios";
import React, { useState } from "react";
import { BASE_API_URL } from "../assests";

const NewUser = () => {
  const [userId, setUserId] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserIdChange = (e) => {
    const _ = e.target.value.trim();
    setUserId(_);
  };
  const handleUserNameChange = (e) => {
    setuserName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    const _ = e.target.value.trim();
    setPassword(_);
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
  };

  return (
    <div className="new-user-creator-container">
      <div className="form-container">
        <form action="#" onSubmit={handleFormSubmit}>
          <div className="user-id">
            <input
              type="text"
              name="userId"
              onChange={handleUserIdChange}
              value={userId}
              placeholder="user Id"
            />
          </div>
          <div className="user-name">
            <input
              type="text"
              name="UserName"
              onChange={handleUserNameChange}
              value={userName}
              placeholder="user Name"
            />
          </div>
          <div className="user-pass">
            <input
              type="password"
              name="userPassword"
              onChange={handlePasswordChange}
              value={password}
              placeholder="Passoword"
            />
          </div>
          <div className="btns new-user-btn">
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
