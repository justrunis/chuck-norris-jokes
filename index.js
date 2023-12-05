import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.chucknorris.io/jokes";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

async function getRandomJoke(){
  try {
    const result = await axios.get(API_URL + "/random");
    const joke = result.data.value;
    res.render("index.ejs", {joke});
} catch (error) {
    res.render("index.ejs", { joke: "Error fetching Chuck Norris joke" });
}
}

app.get('/', async (req, res) => {
  getRandomJoke();
});

app.post('/category', async (req, res) => {
  const selectedCategory = req.body.value;
  console.log(selectedCategory);
  if(selectedCategory === ""){
    getRandomJoke();
  }

  try {
    const result = await axios.get(API_URL + `/random?category=${selectedCategory}`);
    const joke = result.data.value;
    res.render("index.ejs", {joke});
  } catch (error) {
      res.render("index.ejs", { joke: "Error fetching Chuck Norris joke" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});