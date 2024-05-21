import React, { useState } from "react";
import "../style/userProfile.css";
import axios from "axios";
import { BASE_API_URL } from "../assests";
const UserProfile = ({
  profile,
  name,
  time,
  isActive,
  userId,
  setFileData,
  handleLocals
}) => {
  const [isSelected, setIsSelected] = useState(false)
  // const [fileData, setFileData] = useState([]);
  const fetchUserFiles = async (userId) => {
    const formData = {
      userId: userId,
      sessionId: localStorage.getItem("sessionId"),
    };
    const file = await axios.post(`${BASE_API_URL}/files`, formData);
    setFileData(file.data);
  };
  return (
    <div
      className={
        isSelected
          ? "user-profile-container selected-user"
          : "user-profile-container"
      }
      onClick={async () => {
        // console.log(userId);
        handleLocals(name,time,profile,userId)
        await fetchUserFiles(userId);
        setIsSelected(!isSelected)
      }}
    >
      {/* <Files/> */}
      
      <div className="user-profile-pic">
        <img src={profile} alt="" />
      </div>
      <div className="user-name-time-container">
        <div className="user-name"><h3>{name}</h3></div>
        <div className="user-time">{time}</div>
        <p className="user-msg">Some text to describe some dummy message and fuck you .......</p>
      </div>
      <div className="read-unread-tag">
        <div
          className={isActive ? "active-inactive active" : "active-inactive"}
        ></div>
      </div>
    </div>
  );
};

export default UserProfile;
