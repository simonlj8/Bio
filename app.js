import express from "express";
import { engine } from "express-handlebars";
import { marked } from "marked";
import { loadMovie, loadAllMovies } from "./src/movies.js";

const app = express();  

app.engine("handlebars", engine({
  helpers: {
    markdown: md => marked(md),
  },
}));

app.set("view engine", "handlebars");
app.set("views", "./views");
app.get("/", async (req, res) => {   
  res.render("index");
});

app.get("/aboutus", async (req, res) => {
  res.render("./partials/aboutus")
});

app.get("/movies", async (req, res) => {
  const movies = await loadAllMovies()
  res.render("./partials/movies", { movies });
});

app.get("/movies/:movieId", async (req, res) => {
  const movie = await loadMovie(req.params.movieId);
  if (movie) {
    res.render("./partials/movie", { movie });
  } else {
    res.status(404).render("./partials/404");
  }
});

app.use("/", express.static("./static"));

export default app;
