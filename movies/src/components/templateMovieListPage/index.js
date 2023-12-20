import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import PaginatedMovies from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortFilter, setSortFilter] = useState("");
  const [sortType, setSortType] = useState("0");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      let tmp = m.title ? m.title : m.name;
      return tmp.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .sort((m1, m2) => (
      (m1[sortType] < m2[sortType]) ? 1 : (m1[sortType] > m2[sortType]) ? -1 : 0
    ))
    // eslint-disable-next-line
    .sort((m1, m2) => {
      if (sortType === "title") {
        return m1.title.localeCompare(m2.title); 
      }
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "sort") {
      setSortFilter(value);
      if (value ==="Latest") setSortType("latest");
      else if (value === "Rating") setSortType("vote_average");
      else if (value === "Alphabetical") setSortType("title");
    }
    else setGenreFilter(value);
  };

  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            sortFilter={sortFilter}
          />
        </Grid>
        <PaginatedMovies action={action} movies={displayedMovies} moviesPerPage={7}></PaginatedMovies>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;