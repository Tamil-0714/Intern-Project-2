const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { validateSession } = require("../functions/functions");

const pathArr = __dirname.split("/");
pathArr.pop();
const filePath = pathArr.join("/");

// const upload = () => {
//   return (fileUpload = multer({
//     storage: multer.diskStorage({
//       destination: (req, file, cb) => {
//         const { userId } = req.body;
//         const uploadDirectory = path.join(filePath, "userDocuments", userId);
//         if (!fs.existsSync(uploadDirectory)) {
//           fs.mkdirSync(uploadDirectory);
//         }
//         cb(null, uploadDirectory);
//       },
//       filename: (req, file, cb) => {
//         cb(null, file.originalname);
//       },
//     }),
//     limits: { fileSize: 10 * 1024 * 1024 },
//     fileFilter: (req, file, cb) => {
//       const allowedTypes = [
//         "application/pdf",
//         "application/vnd.ms-powerpoint",
//         "application/vnd.openxmlformats-officedocument.presentationml.presentation",
//         "application/vnd.ms-excel",
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ];

//       if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//       } else {
//         cb(new Error("Invalid file type"), false);
//       }
//     },
//   }));
// };

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { userId } = req.body;
    const { sessionId } = req.body;
    if(!await validateSession(sessionId)){
      cb(new Error('Invalid session'), null);
      return;
    }
    const uploadDirectory = path.join(filePath, "userDocuments", userId);
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
    // cb(null, `"${Math.random()*999}"_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});

module.exports = { upload };
