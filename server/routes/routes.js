const path = require("path");
const bcrypt = require("bcrypt");
const fs = require("fs");
const {
  fetchUser,
  updateSessionId,
  fetchUserWithSession,
  gatherUsers,
  getFilesInfo,
  insertFilesInfo,
  deleteFilesInfo,
} = require("../DB/DB");
const {
  validateSession,
  generateSession,
  readFileAsBlob,
  removeUnauthorisedFile,
  deleteFile,
} = require("../functions/functions");
// const { upload } = require("../multerFuncs/mult");

const files = async (req, res) => {
  const { userId, sessionId } = req.body;
  if (await validateSession(sessionId)) {
    try {
      const files = await getFilesInfo(userId);
      const filesPromises = files.map(async (file, i) => {
        const filePath = file.fileLink;
        const { name: fileName, ext: fileExtension } = path.parse(filePath);
        const fileBlob = await readFileAsBlob(filePath);
        const fileBase64 = fileBlob.toString("base64");
        return {
          fileName,
          fileExtension: fileExtension.slice(1),
          fileBase64,
        };
      });
      const resFile = await Promise.all(filesPromises);
      res.json(resFile);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};

const adminCred = async (req, res) => {
  const { userName, password, sessionId } = req.body;
  if (!sessionId) {
    const thisSessionId = generateSession();
    const user = await fetchUser(userName);
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result !== undefined && result === true) {
          const sessonUpdateRes = await updateSessionId(
            thisSessionId,
            user[0].userName
          );

          if (sessonUpdateRes.affectedRows === 1) {
            res.send({ sessionId: thisSessionId });
          } else {
            res.send({ sessionId: false });
          }
        } else {
          res.send({ sessionId: false });
        }
      });
    } else {
      res.send({ sessionId: false });
    }
  } else {
    res.send({ isOk: await validateSession(sessionId) });
  }
};

const users = async (req, res) => {
  if (await validateSession(req.body.sessionId)) {
    const users = await gatherUsers();
    const pathArr = __dirname.split("/");
    pathArr.pop();
    const fileOrigin = pathArr.join("/");
    const usersWithImages = await Promise.all(
      users.map(async (user) => {
        const imgPath = path.join(fileOrigin, user.profileLink);
        const imgBuffer = await fs.promises.readFile(imgPath);
        const base64Image = imgBuffer.toString("base64");
        return {
          ...user,
          profileLink: `data:image/jpeg;base64,${base64Image}`,
        };
      })
    );
    res.json(usersWithImages);
  }
};
const uploadRoute = async (req, res) => {
  console.log("fileinto", req.file);
  console.log("userId", req.body.userId);
  if (!req.file) {
    return res.status(201).json({ message: "file not created" });
  }
  await insertFilesInfo(
    req.body.userId,
    req.file.path.split("/").slice(-3).join("/")
  );
  res.status(200).json({ message: "File uploaded successfully", userId:req.body.userId });
};


const fileDeleteRoute = async(req,res) =>{
  console.log(req.body);
  const {userId,fileName} = req.body;
  console.log("this file path",fileName);
  if(await validateSession(req.body.sessionId)){
    await deleteFilesInfo(userId, `userDocuments/${userId}/${fileName}`)
    const pathArr = __dirname.split("/");
    pathArr.pop();
    const fileOrigin = pathArr.join("/");
    const finalPath = path.join(fileOrigin,`userDocuments/${userId}/${fileName}`)
    deleteFile(finalPath)
    res.status(200).json({"message":"file deleted"})
  }
}

module.exports = { files, adminCred, users, uploadRoute,fileDeleteRoute };

// async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ message: err.message });
//     }
//     const { sessionId } = req.body;
//     console.log("this ession",sessionId);
//     console.log("this ession tf",await validateSession(sessionId));
//     if (await validateSession(sessionId)) {
//       res.json({
//         fileName: req.file.filename,
//         filePath: `/uploads/${req.file.filename}`,
//       });
//     } else {
//       return res.status(401).json({ message: "Invalid sessionId" });
//     }
//   });
// }
