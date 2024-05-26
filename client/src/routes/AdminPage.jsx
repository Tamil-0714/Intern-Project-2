import React, { useEffect, useState } from "react";
import ErrorRoute from "./ErrorRoute";
import axios from "axios";
import { BASE_API_URL } from "../assests";
import UsersProfile from "../components/UsersProfile";
import ReactLoading from "react-loading";

import "../style/adminPage.css";
import NewUser from "../components/NewUser";

const AdminPage = () => {
  const [sessionId, setSessionId] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function verifySession() {
      const localSessionId = localStorage.getItem("sessionId");
      if (
        !localSessionId ||
        localSessionId == "false" ||
        localSessionId === null
      ) {
        location.href = "/admin";
      } else {
        const result = await validateSession(localSessionId);
        if (!result) {
          setSessionId(false);
          localStorage.removeItem("sessionId");
          location.href = "/admin";
        } else {
          setSessionId(localSessionId);
          setIsLoading(true);
          const users = await gatherUsersData(localSessionId);
          setIsLoading(false);
        }
      }
    }
    verifySession();
  }, []);

  async function validateSession(s) {
    const formData = {
      userName: false,
      password: false,
      sessionId: s,
    };
    // console.log(formData);
    const res = await axios.post(`${BASE_API_URL}/adminCred`, formData);
    return res.data.isOk;
  }
  async function gatherUsersData(s) {
    const formData = { sessionId: s };
    const res = await axios.post(`${BASE_API_URL}/users`, formData);
    setUsers(res.data);
    return res.data;
  }
  return !sessionId ? (
    // <ErrorRoute />
    <div className="initilal-loader">
      <ReactLoading type="bars" color="#000" height={123} width={123} />
    </div>
  ) : (
    <div className="admin-page-container ">
      <div className="left-container">
        <button className="log-out-btn"
          onClick={() => {
            localStorage.removeItem("sessionId");
            location.href = "/admin";
          }}
        >
          Log out
        </button>
        <NewUser gatherUsersData={gatherUsersData}/>
      </div>
      <div className="right-container">
        {isLoading ? (
          <div className="users-loading"><ReactLoading type="cylon" color="#baff82" height={123} width={123} /></div>
        ) : (
          <UsersProfile _users={users} />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
