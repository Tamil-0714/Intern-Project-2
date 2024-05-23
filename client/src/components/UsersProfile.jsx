import React, { useState, useEffect } from "react";
// import { FileUploader } from "react-drag-drop-files";
import ReactLoading from "react-loading";
import { useDropzone } from "react-dropzone";
import UserProfile from "./UserProfile";
import "../style/usersProfile.css";
import Files from "./Files";
import Search_a_Name from "./Search_a_Name";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { BASE_API_URL } from "../assests";
import axios from "axios";
library.add(faXmark, faPlusCircle);

const UsersProfile = ({ _users }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(_users);
  }, [_users]);
  const [fileData, setFileData] = useState([]);
  const [loaclName, setLoaclName] = useState("");
  const [localUserId, setLocalUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [localTime, setLocalTime] = useState("");
  const [localImg, setLocalImg] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const handleLocals = (name, time, img, userId) => {
    setLocalUserId(userId);
    setLoaclName(name);
    setLocalTime(time);
    setLocalImg(img);
  };
  useEffect(() => {
    console.log("localUserId updated:", localUserId);
  }, [localUserId]);
  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    await uploadFile(file);
  };
  const fetchUserFiles = async (userId) => {
    const formData = {
      userId: userId,
      sessionId: localStorage.getItem("sessionId"),
    };
    setIsLoading(true)
    const file = await axios.post(`${BASE_API_URL}/files`, formData);
    setFileData(file.data);
    setIsLoading(false);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "application/vnd.ms-powerpoint": [],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [],
      "application/vnd.ms-excel": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const uploadFile = async (file) => {
    if (localUserId) {
      const formData = new FormData();
      formData.append("sessionId", localStorage.getItem("sessionId") || "");
      formData.append("userId", localUserId);
      formData.append("file", file);
      console.log("file uploading ....");
      // console.log(formData);
      try {
        const response = await axios.post(`${BASE_API_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          validateStatus: function (status) {
            return status >= 200 && status < 500; // Accept only status codes between 200 and 499
          },
        });
        if (response.status >= 200 && response.status < 300) {
          const result = response.data;
          console.log(result);
          setFileUploading(false);

          await fetchUserFiles(result.userId);
        } else {
          console.error("Error uploading file:", response.status);
          localStorage.removeItem("sessionId");
          location.reload();
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className="outer-user-container">
      <div className="serarch-wrapper">
        <Search_a_Name
          name={loaclName}
          time={localTime}
          img={localImg}
          setUsers={setUsers}
          users={_users}
        />
        {localImg && (
          <div className="plus-icon">
            <FontAwesomeIcon
              icon={faPlusCircle}
              size="3x"
              onClick={() => {
                setFileUploading(true);
              }}
              className="btn-open btn"
              style={{ color: "#000000" }}
            />
          </div>
        )}
        {fileUploading && (
          <div className="file-uploder-hidder">
            <div className="close-icon">
              <FontAwesomeIcon
                icon={faXmark}
                size="3x"
                // onClick={setFileUploading(false)}
                onClick={() => {
                  setFileUploading(false);
                }}
                className="btn-close btn"
                style={{ color: "#000000" }}
              />
            </div>
            <section className="file-uploading-container">
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
              <aside className="uploaded-files">
                <h4>Files</h4>
                <ul>{files}</ul>
              </aside>
            </section>
          </div>
        )}
      </div>
      <div className="users-container">
        <div className="user-indu-data" key={Math.random() * 100}>
          {users.length > 0 &&
            users.map((user, index) => {
              return (
                <>
                  <UserProfile
                    key={user.userId}
                    userId={user.userId}
                    setFileData={setFileData}
                    setIsLoading={setIsLoading}
                    profile={user.profileLink}
                    handleLocals={handleLocals}
                    name={user.userName}
                    time={user.activeTime}
                    isActive={JSON.parse(user.isActive)}
                  />
                </>
              );
            })}
        </div>
        {!localUserId ? (
          <></>
        ) : (
          <div className="files-component-container">
            {/* {
            if(fileData.length > 0 && !fileUploading){}
          } */}

            {isLoading ? (
              <div className="files-loading">
                <ReactLoading
                  type="spokes"
                  color="#000ff02"
                  height={70}
                  width={80}
                />
              </div>
            ) : (
              <Files
                userId={localUserId}
                fileData={fileData}
                fetchUserFiles={fetchUserFiles}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersProfile;

/**
 [
    {
        "userId": "firstUser",
        "userName": "Tamil",
        "password": "$2a$12$zl/FkHELp6jf.z62warYxuo6MEz4Zfjb5U8a3BmSi33lOBdxVnery",
        "profileLink": "no link",
        "activeTime": "5 hours ago",
        "isActive": "false"
    },
    {
        "userId": "nice",
        "userName": "password",
        "password": "$2a$12$Zt2hqU2bvovlQM5XTO1xMexHBB3JaHz6a4ZvzOy0gltRiOfLE9nzq",
        "profileLink": "no link 7",
        "activeTime": "Yesterday",
        "isActive": "true"
    },
    {
        "userId": "someUser",
        "userName": "Enn peru",
        "password": "$2a$12$mFSmHNKwUbYAQ..sr7m6T.VXae.0de5my864JCgWJxnMXBhiA2H/a",
        "profileLink": "no link 1",
        "activeTime": "9 hours ago",
        "isActive": "true"
    }
]
 */
