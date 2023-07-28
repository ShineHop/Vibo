const express = require('express');
const app = express();
//const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require('cors');
//app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
//app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const itemdb = mysql.createConnection({
    user:"root",
    host : "localhost",
    password:"0000",
    database:"itemdb"
});

itemdb.connect();


app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM itemdb';
    itemdb.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  });
  app.get('/api/user/:userID/likes', (req, res) => {
    const { userID } = req.params;
    const query = `SELECT * FROM likedb WHERE UID = ?`;

    itemdb.query(query, [userID], (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Error querying database' });
    } else {
      res.json(results);   } 

  });})

  


  // 서버 시작
  const port = 3001;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
//connection.end();
