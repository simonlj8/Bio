import fetch from "node-fetch";

const movieApi = 'https://lernia-kino-cms.herokuapp.com/api';

export async function loadAllMovies() {
  const res = await fetch(movieApi + '/movies');
  const payload = await res.json();
  return payload.data;
}

export async function loadMovie(id) {
  const res = await fetch(movieApi + '/movies/' + id);
  const payload = await res.json();
  return payload.data;
}
