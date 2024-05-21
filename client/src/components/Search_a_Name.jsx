import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faXmark, faSearch);
import "../style/serachName.css";
const Search_a_Name = ({ name, time, img, setUsers, users }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filterUsers = () => {
    const query = searchQuery.toLowerCase();
  
    if (query.length === 0) {
      setUsers(users)
    }
    const filteredUsers = users.filter(user=>{
      return(
        user.userId.toLowerCase().includes(query) ||
        user.userName.toLowerCase().includes(query) 
      )
    })
    setUsers(filteredUsers)
  };

  return (
    <div className="search-name-container">
      <div className="search-container">
        <div className="search-icon">
          <FontAwesomeIcon
            icon={faXmark}
            size="1x"
            className="btn-x btn"
            style={{ color: "#000000" }}
          />
        </div>
        <div className="search-bar">
          <input
            type="text"
            name="search-value"
            id=""
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
        <div className="clear-icon">
          <FontAwesomeIcon
            icon={faSearch}
            size="1x"
            className="btn-search btn"
            style={{ color: "#000000" }}
            onClick={filterUsers}
          />
        </div>
      </div>
      {img && <div className="name-container">
        <div className="side-profile-img">
          {img && <img src={img} alt="" />}
        </div>
        <div className="side-name-time">
          <div className="side-user-name">
            <h3>{name}</h3>
          </div>
          <div className="side-user-time">{time}</div>
        </div>
      </div>}
    </div>
  );
};

export default Search_a_Name;
