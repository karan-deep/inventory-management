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

function verifyToken(token) {
  return jwt.verify(token, key, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

async function isAuthenticated(email, password) {
  const db = JSON.parse(fs.readFileSync("./server/database.json", "UTF-8"));
  const user = db.users.find((user) => user.email === email);
  if (!user) {
    return false;
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return false;
  }
  return true;
}

server.post("/auth/register", async (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync("./server/database.json", "UTF-8"));
    const { email, password } = req.body;
    if (db.users.find((user) => user.email === email)) {
      res.status(400).json({ message: "Email already exist." });
      return;
    }
    let last_id = db.users[db.users.length - 1].id;
    let hashPassword = await bcrypt.hash(password, 10);
    db.users.push({
      id: last_id + 1,
      email: email,
      password: hashPassword,
    });
    fs.writeFile(
      "./server/database.json",
      JSON.stringify(db),
      (err, result) => {
        if (err) {
          res.status(400).json({ message: err });
          return;
        }
      }
    );
    res.json();
  } catch (e) {
    console.log(e);
  }
});

server.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const authenticated = await isAuthenticated(email, password);
    if (!authenticated) {
      res.status(400).json({ message: "Invalid login credentials" });
      return;
    }
    const token = createToken({ email, password });
    res.status(200).json({ token });
  } catch (e) {
    console.log(e);
  }
});

