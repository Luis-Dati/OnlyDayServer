var express = require("express");
var cors = require("cors");
var bodyparser = require("body-parser");
var app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

var mysql = require("mysql2");
var pool = mysql.createPool({
  host: "sql.freedb.tech",
  user: "freedb_Lonelyboiz",
  password: "5w36xvm#ZFHwTbD",
  database: "freedb_RespondData",
  port: 3306,
  connectionLimit: 20,
  waitForConnections: true,
  queueLimit: 0,
});

app.listen(3000, () =>
  console.log("Node server running @ http://localhost:3000"),
);

app.get("/", (req, res) => {
  res.send("Hello World 1.2");
});

app.get("/respone", (req, res) => {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.log(err);
    }

    conn.query("select * from Respone", (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send(result);
    });

    pool.releaseConnection(conn);
  });
});

app.post("/respone", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
    }

    const params = req.body;

    conn.query("INSERT INTO Respone SET ?", params, (err, result) => {
      if (!err) {
        res.send("Inserted item!");
      } else {
        console.log(err);
      }
    });
    pool.releaseConnection(conn);
  });
});
