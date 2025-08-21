import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
const API_URL = "https://v2.jokeapi.dev/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
 res.render("index.ejs", { content: "Tambok si et" })
});



app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});