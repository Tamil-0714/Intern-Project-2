const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

const { upload } = require("./multerFuncs/mult");
const { files, adminCred, users, uploadRoute, fileDeleteRoute, newUserRoute } = require("./routes/routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/adminCred", adminCred);
app.post("/users", users);
app.post("/files", files);
const asyncMulterMiddleware = (req, res, next) => {
  return upload.single('file')(req, res, function (err) {
    if (err) {
      return res.status(401).json({ message: err.message });
    }
    next();
  });
};
app.post("/upload", asyncMulterMiddleware, uploadRoute);
app.post("/deleteFile",fileDeleteRoute)
app.post("/newUser", newUserRoute)

app.listen(PORT, () => {
  console.log(`app running on http://localhost:${PORT}`);
});
