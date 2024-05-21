const fs = require("fs");
const path = require("path");

// const express = require("express");
// const app = express();

// app.use(express.json())

const pathArr = __dirname.split("/");
pathArr.pop();
const fileOrigin = pathArr.join("/");

exports.checkFileExists = async (req, res, next) => {
    console.log(fileOrigin);
    console.log("req body rom middleware",req.body); 
  const filePath = path.join(fileOrigin,"userDocuments", req.body.userId); 
  try {
    await fs.access(filePath);
    return res.status(400).json({ message: "File already exists" });
  } catch (error) {
    next();
  }
};
