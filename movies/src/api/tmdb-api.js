export const login = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};

export const signup = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users?action=register', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};

export const getMovies = async () => {
  return fetch("http://localhost:8080/api/movies/tmdb/discover", {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'get'}).then(res => res.json())
};

export const getMovie = (args) => {
  // console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
          `http://localhost:8080/api/movies/tmdb/movie/${id}`, {
              headers: {
                  'Authorization': window.localStorage.getItem('token')
              }
          }
      ).then((response) => {
          if (!response.ok) {
              throw new Error(response.json().message);
          }
          return response.json();
      })
      .catch((error) => {
          throw error
      });
};

  export const getGenres = async () => {
    return fetch("http://localhost:8080/api/genres/tmdb/genres", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'}).then(res => res.json())
  };

  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
            `http://localhost:8080/api/movies/tmdb/movie/${id}/images`, {
                headers: {
                    'Authorization': window.localStorage.getItem('token')
                }
            }
        ).then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();

        })
        .catch((error) => {
            throw error
        });
};

  export const getMovieReviews = (id) => {
    return fetch(
            `http://localhost:8080/api/movies/tmdb/movie/${id}/reviews`, {
                headers: {
                    'Authorization': window.localStorage.getItem('token')
                }
            }
        )
        .then((res) => res.json())
        .then((json) => {
            return json;
        });
  };

  export const getUpcomingMovies = () => {
    return fetch(
        `http://localhost:8080/api/movies/tmdb/upcoming`, {
          headers: {
            'Authorization': window.localStorage.getItem('token')
          }
        }
    ).then( (response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();

    }).catch((error) => {
            throw error
        });
        
};

  export const getTrendingMovies = () => {
    return fetch(
        `http://localhost:8080/api/movies/tmdb/trending`, {
          headers: {
            'Authorization': window.localStorage.getItem('token')
          }
        }
    ).then( (response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();

    }).catch((error) => {
            throw error
        });
        
};

export const getNowPlaying = () => {
  return fetch(
      `http://localhost:8080/api/movies/tmdb/nowPlaying`, {
        headers: {
          'Authorization': window.localStorage.getItem('token')
        }
      }
  ).then( (response) => {
      if (!response.ok) {
          throw new Error(response.json().message);
      }
      return response.json();

  }).catch((error) => {
          throw error
      });
      
};

  export const getMovieCredits = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    console.log('https://api.themoviedb.org/3/movie/' +id + '/credits?api_key=' + process.env.REACT_APP_TMDB_KEY);
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
    .then((res) => res.json())
      .then((json) => {
        console.log(json);
        return json;
      });
  };

  export const getPersonDetails = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        return json;
    });
  };

  export const getTopRatedTV = () => {
    return fetch(
        `http://localhost:8080/api/movies/tmdb/topRated`, {
          headers: {
            'Authorization': window.localStorage.getItem('token')
          }
        }
    ).then( (response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
  
    }).catch((error) => {
            throw error
        });
        
  };