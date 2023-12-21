import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { getFavorites, addFavorite, deleteFavorite } from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const userContext = useContext(AuthContext)
  const username = userContext.userName
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} )
  const [toWatch, setToWatch] = useState( [] )

  const getUserFavorites = (username) =>{
    getFavorites(username).then((response =>{
      if (response) setFavorites (response);
    }))
}

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
      addFavorite(userContext.userName, movie.id);
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  
  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addToWatch = (movie) => {
    let newToWatch = [];
    if (!toWatch.includes(movie.id)){
      newToWatch = [...toWatch, movie.id];
    }
    else{
      newToWatch = [...toWatch];
    }
    setToWatch(newToWatch)
  };

  const removeFromToWatch = (movie) => {
    setToWatch( toWatch.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);

  const removeFavorite = (username, movie) => {
    let newFavorites = [];
    deleteFavorite(username, movie);
    newFavorites = getFavorites(username, movie)
    setFavorites(newFavorites)
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        toWatch,
        getUserFavorites,
        addToFavorites,
        addToWatch,
        removeFromFavorites,
        removeFavorite,
        removeFromToWatch,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;