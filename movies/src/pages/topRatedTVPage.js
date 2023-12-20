import React from "react";
import { getTopRatedTV } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';

const TopTatedTVPage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('top_rated_tv', getTopRatedTV)


  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  return (
    <PageTemplate
      title="Top Rate TV"
      movies={movies}
    />
  );
};
export default TopTatedTVPage;