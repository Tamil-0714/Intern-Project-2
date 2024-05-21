import React from "react";
import File from "./File.jsx";
import "../style/files.css";


const Files = ({ userId, fileData,fetchUserFiles }) => {
  // console.log("ck usr id",userId);
  return (
    <div className="files-container">
      {/* <File
        fileBase64={fileDatum.fileBase64}
        fileExtension={fileDatum.fileExtension}
        fileName={fileDatum.fileName}
      /> */}
      {fileData.map((fileDatum, i) => {
        return (
          <File
            key={i}
            fetchUserFiles={fetchUserFiles}
            userId={userId}
            fileBase64={fileDatum.fileBase64}
            fileExtension={fileDatum.fileExtension}
            fileName={fileDatum.fileName}
          />
        );
      })}
      {/* <File /> */}
    </div>
  );
};

export default Files;
