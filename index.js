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

app.engine("handlebars", engine({
  helpers: {
    markdown: md => marked(md),
  },
}));
app.set("view engine", "handlebars");
app.set("views", "./templates");

app.get("/", async (req, res) => {
  const movies = await loadMovies();
  res.render("home", { movies });
});

app.get("/aboutus", async (req, res) => {
  const movies = await loadMovies();
  res.render("aboutus", { movies });
});

app.get("/home", async (req, res) => {
  const movies = await loadMovies();
  res.render("home", { movies });
});


app.get("/movies/:movieId", async (req, res) => {
  const movie = await loadMovie(req.params.movieId);
  if (movie) {
    res.render("movie", { movie });
  } else {
    res.status(404).render("404");
  }
});

app.use("/static", express.static("./static"));

app.listen(5080);
