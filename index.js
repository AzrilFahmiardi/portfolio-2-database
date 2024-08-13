import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
let isSend = false;

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "azril",
  host: "dpg-cqtmbpij1k6c738p6rsg-a",
  database: "portfolio_db_4dz7",
  password: "OUW21SPus4JzWmg1IAv3fbqKK2YsxNbZ",
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/sendForm", async (req, res) => {
  const { name, email, message } = req.body;
  const date = new Date();
  console.log(req.body);
  db.connect();
  await db.query("INSERT INTO form (name, email, message, date) VALUES ($1, $2, $3, $4)", [name, email, message, date]);
  db.end();
  res.render("index.ejs");
});

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
