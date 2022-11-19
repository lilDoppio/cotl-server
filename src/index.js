const {Blob} = require('buffer');
const express = require("express");
const fs = require("fs");
const initOptions = {};
const pgp = require("pg-promise")(initOptions);

const app = express();
const db = pgp("postgres://postgres:Fuckonly4cash@localhost:5432/cotl");

const port = 3000;

app.use(express.static('public'));

// fs.readFile("src/favicon.png", (err, imgDate) => {
//   db.none("INSERT INTO test (text, label, img) VALUES ($1, $2, $3)", [
//     "text",
//     "label",
//     imgDate,
//   ])
//     .then((data) => {
//       console.log("DATA:", data);
//     })
//     .catch((error) => {
//       console.log("ERROR:", error);
//     });
// });

app.get("/", (req, res) => {
  db.any('SELECT * FROM sound')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/:id", (req, res) => {
  db.any('SELECT * FROM sounds WHERE id = ($1)', [parseInt(req.params.id)])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/lolkek", (req, res) => {
  res.send("Got a POST request /lolkek");
});

app.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});
