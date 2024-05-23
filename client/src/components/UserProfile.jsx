import React, { useEffect, useState } from "react";
import "../style/userProfile.css";
import axios from "axios";
import { BASE_API_URL } from "../assests";
import "animate.css";
// import "animate.css/animate.compat.css";
import ScrollAnimation from "react-animate-on-scroll";
const UserProfile = ({
  profile,
  name,
  time,
  isActive,
  userId,
  setFileData,
  handleLocals,
  setIsLoading,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [animationClass, setAnimationClass] = useState("animate__animated animate__tada ");
  // const [animationDuration, setAnimationDuration] = useState('2s');
  useEffect(()=>{
    const timer = setTimeout(() => {
      // setAnimationClass('no-animation');
      // setAnimationDuration('animation-duration-0'); 
      document.documentElement.style.setProperty('--animate-duration', '0s');
      // document.querySelector(".animate__animated.animate__backInDown").style.setProperty('--animate-duration', '0s');
    },1200);
    return () => clearTimeout(timer);
  },[])
  const fetchUserFiles = async (userId) => {
    const formData = {
      userId: userId,
      sessionId: localStorage.getItem("sessionId"),
    };
    setIsLoading(true);
    const file = await axios.post(`${BASE_API_URL}/files`, formData);
    setFileData(file.data);
    setIsLoading(false);
  };
  return (
    <>
      {/* <ScrollAnimation
        animateIn={animation}
        afterAnimatedIn={function afterAnimatedIn(v) {
          var t = "Animate In finished.\n";
          t += "v.onScreen: " + v.onScreen + "\n";
          t += "v.inViewport: " + v.inViewport;
          alert(t);
        }}
      > */}
        <div
          className={
            isSelected
              ?`user-profile-container selected-user ${animationClass}`
              : `user-profile-container ${animationClass}`
          }
          // style={{ animationDuration: animeDuration}}
          onClick={async () => {
            // console.log(userId);
            handleLocals(name, time, profile, userId);
            await fetchUserFiles(userId);
            setIsSelected(!isSelected);
          }}
        >
          {/* <Files/> */}

          <div className="user-profile-pic">
            <img src={profile} alt="" />
          </div>
          <div className="user-name-time-container">
            <div className="user-name">
              <h3>{name}</h3>
            </div>
            <div className="user-time">{time}</div>
            <p className="user-msg">
              Some text to describe some dummy message and fuck you .......
            </p>
          </div>
          <div className="read-unread-tag">
            <div
              className={
                isActive ? "active-inactive active" : "active-inactive"
              }
            ></div>
          </div>
        </div>
      {/* </ScrollAnimation> */}
      {" "}
    </>
  );
};

export default UserProfile;
