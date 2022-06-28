console.log("Molo ndiyi server");

const express = require("express");
const fs = require("fs");
const https = require("https");
const path = require("path");
const Mailchimp = require("mailchimp-api-v3");

require("dotenv").config({
  path: __dirname + "/variables.env",
});

const mc_api_key = process.env.MAILCHIMP_API_KEY;
const list_id = process.env.LIST_ID;

const app = express();
const mailchimp = new Mailchimp(mc_api_key);

app.get("/api/membersAdd", (req, res) => {
  mailchimp
    .post(`/lists/${list_id}/members`, {
      email_address: req.query.email,
      status: "subscribed",
    })
    .then((result) => {
      res.send(result);
      console.log(results);
    })
    .catch((err) => {
      res.send(err);
      // console.log(err);
    });
});

app.get("/api/unitMembersAdd", (req, res) => {
  console.log(res);
  mailchimp
    .post(`/lists/${list_id}/members`, {
      email_address: req.query.email,
      status: "subscribed",
      merge_fields: {
        FNAME: req.query.name,
        ADDRESS: req.query.residentialAddress,
        PHONE: req.query.number,
        SLTFACILIT: req.query.selectedFacility,
        SLTBEDROOM: req.query.selectedRoom,
        RENTBUY: req.query.selectedValue,
        MESSAGE: req.query.message,
      },
    })
    .then((result) => {
      res.send(result);
      console.log(results);
    })
    .catch((err) => {
      res.send(err);
      // console.log(err);
    });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

const port = process.env.PORT || 9001;

// const httpsOptions = {
//   // cert: fs.readFileSync(path.join(_diname, "ssl", "server.crt")),
//   // key: fs.readFileSync(path.join(_diname, "ssl", "server.key")),
// };

// https.createServer(httpsOptions, app).listen(port, function () {
//   console.log(`Server isebenza kwi Port ${port} `);
// });

app.listen(port);
console.log(`Server isebenza kwi Port ${port} `);
