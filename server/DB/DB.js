const mysql = require("mysql2");

function connectDB() {
  const pool = mysql.createPool({
    host: "localhost",
    user: "tamil",
    password: "For_My_196",
    database: "OrangeInfoCom",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  return pool.promise();
}

// async function queryDB(query) {
//   try {
//     const connection = await connectDB();
//     const [rows] = await connection.query(query);
//     connection.releaseConnection();
//     return rows;
//   } catch (error) {
//     console.error(error);
//   }
// }

async function queryDB(sql, params) {
  try {
    const connection = await connectDB();
    const [rows] = await connection.query(sql, params);
    connection.releaseConnection();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchUser(id) {
  try {
    const query = "SELECT * FROM admin WHERE userName = ?";
    const params = [id];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function fetchUserWithSession(session) {
  try {
    const query = "SELECT * FROM admin WHERE sessionId = ?";
    const params = [session];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateSessionId(sessionId, id) {
  try {
    const query = `UPDATE admin SET sessionId = ? WHERE userName = ?`;
    const params = [sessionId, id];
    const rows = await queryDB(query, params);
    return rows;
  } catch (error) {
    console.error(error);
  }
}
async function gatherUsers(){
  try {
    const query = 'SELECT * FROM users'
    const params = null
    const rows = await queryDB(query,params)
    return rows
  } catch (error) {
    console.error(error);
  }
}
async function getFilesInfo(userId){
  try {
    const query = 'SELECT * FROM files WHERE userId= ?'
    const params = [userId]
    const rows = await queryDB(query,params)
    return rows
  } catch (error) {
    console.error(error);
  }
}
async function insertFilesInfo(userId,filePath){
  try {
    const query = 'insert into files(fileLink,userId) values(?,?)'
    const params = [filePath,userId]
    const rows = await queryDB(query,params)
    return rows
  } catch (error) {
    console.error(error);
  }
}
async function deleteFilesInfo(userId,filePath){
  try {
    const query = 'delete from files where fileLink=? and userId=?'
    const params = [filePath,userId]
    const rows = await queryDB(query,params)
    return rows
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  fetchUser,
  updateSessionId,
  fetchUserWithSession,
  gatherUsers,
  getFilesInfo,
  insertFilesInfo,
  deleteFilesInfo
};
