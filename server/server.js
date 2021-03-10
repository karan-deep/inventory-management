const fs = require("fs");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./server/database.json");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const key = "secret";

const expiresIn = "2h";

function createToken(payload) {
  return jwt.sign(payload, key, { expiresIn });
}
