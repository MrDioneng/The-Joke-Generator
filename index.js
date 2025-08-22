import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
const API_URL = "https://v2.jokeapi.dev/joke/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Tambok si et" });
});

app.post("/getJoke", async (req, res) => {
  const categories = [].concat(req.body.categories || []).join(",");
  const flags = [].concat(req.body.flag || []).join(",");
  let final = `${API_URL}${categories}?blacklistFlags=${flags}&type=twopart`;
  const contain = req.body.keywords;

  if (contain) {
    final += "&contains=" + contain;
  } else {
    final;
  }

  try {
    const response = await axios.get(final);
    const data = response.data;

    res.render("index.ejs", {
      setup: `<p>${data.setup}</p>`,
      delivery: `<p>${data.delivery}</p>`,
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
