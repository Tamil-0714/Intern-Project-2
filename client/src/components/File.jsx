import React from "react";
import "../style/file.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCommentDots,
  faFileArrowDown,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_API_URL } from "../assests";
library.add(faCommentDots, faFileArrowDown, faTrash);

const File = ({ fileBase64,userId, fileExtension, fileName,fetchUserFiles }) => {
  
  const handleFileDownload = async () => {
    
    console.log("file downloaded");
    const byteCharacters = atob(fileBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: `application/${fileExtension}`,
    });

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.${fileExtension}`;
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };
  const handleDeleteFile = async ()=>{
    const formData = {
      userId:userId,
      sessionId:localStorage.getItem("sessionId") || "",
      fileName:fileName+'.'+fileExtension
    }
    const res = await axios.post(`${BASE_API_URL}/deleteFile`,formData)
    console.log(res.data);
    if(res.data.message === 'file deleted'){
      await fetchUserFiles(userId)
    }
  }
  return (
    <div className="file-container">
        <div className="doc-icon">
        <FontAwesomeIcon
          icon={faTrash}
          size="3x"
          className="btn-msg btn"
          style={{ color: "#000000" }}
          onClick={handleDeleteFile}
        />
        </div>
      <div className="file-name-extension">
        <span className="file-name">{fileName}</span>
        <span className="extension">{"." + fileExtension}</span>
      </div>
      <div className="file-btn-container">
        
        <FontAwesomeIcon
          icon={faFileArrowDown}
          size="3x"
          className="btn btn-download"
          onClick={handleFileDownload}
          style={{ color: "#169198" }}
        />
      </div>
    </div>
  );
};

export default File;
