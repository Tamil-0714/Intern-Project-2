const { fetchUserWithSession } = require("../DB/DB");
const fs = require("fs");
const path = require("path");

const validateSession = async (s) => {
  const result = await fetchUserWithSession(s);
  if (result.length > 0) return true;
  return false;
};

const generateSession = () => {
  const str = "#XxYyZzJjIiLlUu123*54!^Tt";
  let usrky = ``;
  for (let i = 0; i < 16; i++) {
    usrky += str[Math.floor(Math.random() * str.length)];
  }
  return usrky;
};
const readFileAsBlob = (filePath) => {
  const pathArr = __dirname.split("/");
  pathArr.pop();
  const fileOrigin = pathArr.join("/");
  return fs.promises.readFile(path.join(fileOrigin, filePath));
};

// const removeUnauthorisedFile = async (usrDir) => {
//   const pathArr = __dirname.split("/");
//   pathArr.pop();
//   const fileOrigin = pathArr.join("/");
//   const finalPath = path.join(fileOrigin,"userDocuments",usrDir)
//   console.log(finalPath);
//   fs.readdir(finalPath, (err, files) => {
//     if (err) {
//       return console.error("Unable to scan directory:", err);
//     }

//     let lastCreatedFile;
//     let lastCreatedTime = 0;

//     files.forEach((file) => {
//       const filePath = path.join(finalPath, file);
//       const fileStats = fs.statSync(filePath);
//       if (fileStats.isFile() && fileStats.mtimeMs > lastCreatedTime) {
//         lastCreatedTime = fileStats.birthtimeMs;
//         lastCreatedFile = file;
//       }
//     });

//     if (lastCreatedFile) {
//       console.log("Last created file:", lastCreatedFile);
//       const lastCreatedFilePath = path.join(finalPath, lastCreatedFile);
//       deleteFile(lastCreatedFilePath);
//     } else {
//       console.log("No files found in directory");
//     }
//   });
// };

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      return console.error('Error deleting file:', err);
    }
    console.log('File deleted successfully:', filePath);
  });
}

module.exports = {
  validateSession,
  generateSession,
  readFileAsBlob,
  // removeUnauthorisedFile,
  deleteFile  
};
