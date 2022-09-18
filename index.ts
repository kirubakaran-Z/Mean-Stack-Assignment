//importing required npm packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//declaring express and body pharser for api
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));
//set views
app.set("views", "./public");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("./index.html");
});
//start listen to port
const server = app.listen(process.env.port || 80, () => {
  console.log("listening on port %s...", server.address().port);
});

//sample users for login
let users = [
  { email: "kirubadurai0@gmail.com", password: "9047774750" },
  { email: "Admin@admin.com", password: "Admin12345" },
  { email: "User@user.com", password: "User12345" },
];

let response = {
  statusCode: 200,
  Message: "",
  authpass: false,
};
//listening for login request
app.post("/api/login", (req, res) => {
  let userExist = false;
  users.forEach((user) => {
    if (req.body.email.toUpperCase() === user.email.toUpperCase()) {
      userExist = true;
      if (req.body.password === user.password) {
        let output = response;
        output.Message = "LogIN Success";
        output.authpass = true;
        res.send(output);
      } else {
        let output = response;
        output.Message = "Incorrect Password";
        res.send(output);
      }
    }
  });
  if (!userExist) {
    let output = response;
    output.Message = "User dose not exist";
    res.send(output);
  }
  console.log(req.body);
});
