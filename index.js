import express from "express";
import { engine } from "express-handlebars";
import { marked } from "marked";
import { loadMovie, loadMovies } from "./src/movies.js";
import fs from "fs/promises";

/*const app = express();




app.get('/', async (request, response) => {
const fileBuf = await fs.readFile('index.html');
response.type('html');
response.send(fileBuf);

});


app.get('/*', async (request, response) => {
    try {
    const fileName = request.path;
    const fileBuf = await fs.readFile(`./${fileName}`);
    const type = fileName.split('.')[1];
    response.type(type);
    response.send(fileBuf);
    } catch (err) {
        response.status(404).end();
    }
});

app.listen(5080);
*/
const app = express();

async function loadHeader() {
  const headerBuf = await fs.readFile("./templates/header.html");
  const headerText = headerBuf.toString();
  return headerText;
}

async function loadFooter() {
  const headerBuf = await fs.readFile("./templates/footer.html");
  const headerText = headerBuf.toString();
  return headerText;
}

app.get("/", async (req, res) => {
  try {
      const headerText = await loadHeader();
      const footerText = await loadFooter();
      const htmlBuf = await fs.readFile("./templates/index.html");
      const htmlText = htmlBuf.toString().replace("%header%", headerText).replace("%footer%", footerText);
      res.send(htmlText);
  } catch (err) {
      res.status(404).end();
  }
});

app.get("/aboutus", async (req, res) => {
  try {
      const headerText = await loadHeader();
      const footerText = await loadFooter();
      const htmlBuf = await fs.readFile("./templates/aboutus.html");
      const htmlText = htmlBuf.toString().replace("%header%", headerText).replace("%footer%", footerText);;
      res.send(htmlText);
  } catch (err) {
      res.status(404).end();
  }
});


app.get("/movies", async (req, res) => {
  try {
      const headerText = await loadHeader();
      const footerText = await loadFooter();
      const htmlBuf = await fs.readFile("./templates/movies.html");
      const htmlText = htmlBuf.toString().replace("%header%", headerText).replace("%footer%", footerText);;
      res.send(htmlText);
  } catch (err) {
      res.status(404).end();
  }
});





app.get("/*", async (req, res) => {
  try {
      const fileName = req.path;
      const fileType = fileName.split(".")[1];
      const fileBuf = await fs.readFile(`./${fileName}`);
      res.type(fileType);
      res.send(fileBuf);
  } catch (err) {
      res.status(404).end();
  }
});

app.use("/*", (req, res) => {
  res.status(405).end();
});

app.listen(5080);
