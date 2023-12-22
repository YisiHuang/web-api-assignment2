# Assignment 2 - Web API.

Name: Yisi Huang

## Features.
 
 + React Movies App fully integrated, all fetches from frontend app have gone to the movies API. 
 + Login and Signup authentication
    - After successful signup, it will jump to login page and wait to login
    - Before successfully login, the home page, favorites page, must watch page and trending page are invisible
 + Movie Credits and Person Details endpoints integrated with Mongodb
 + Modify favorites function
    - User-specific data favorites is displayed
 + Add genres schema, person mongodb schema, credits mongodb schema
 + Fully integrated
    - Add discover, movie reviews, movie images, movie details, trending, top rated, now playing endpoints in movies api
    - Modify genres endpoint in genres api
    - Add users, post users, put users, user favorites, post user favorites in users api
    - Add movie credits and person details in people api

## Setup requirements.

Outline any non-standard setup steps necessary to run app locally after cloning the repo.

```
npm install
npm start //For movies repo
npm run dev //For movies-api repo
```

## API Configuration

I create an `.env` file in movies-api.

______________________
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=YourMongoURL
TMDB_KEY=YourTMDBKey
SECRET=YourJWTSecret
______________________

## API Design
An overview of your web API design. 

movies:
- /api/movies | GET | Get movies from tmdb 
- /api/movies | POST | Add movie into movie list
- /api/movies/tmdb/movie/:id/reviews | GET | Get movie reviews
- /api/movies/tmdb/movie/:id/reviews | POST | Add a movie review
- /api/movies/:id | GET | Get movie details
- /api/movies/tmdb/movie/:id/images | GET | Get movie images
- /api/movies/tmdb/discover | GET | Get movies
- /api/movies/tmdb/upcoming | GET | Get upcoming movies
- /api/movies/tmdb/topRated | GET | Get top rated
- /api/movies/tmdb/nowPlaying | GET | Get now playing movies
- /api/movies/tmdb/trending | GET | Get trending movies

genres:
- /api/genres/tmdb/genres | GET | Get movie genres
- /api/genres/tmdb/genres | POST | Add movie genres

users:
- /api/users | GET | Get user information
- /api/users | POST | Add new user
- /api/users/:id | PUT | Update users information
- /api/user/:username/favorites | GET | Get user's favorites movies
- /api/user/:username/favorites | POST | Add users new favorite movies

people:
- /api/people/movie/:id/credits | GET | Get movie credits
- /api/people/:id | GET | Get people details of movies

I have my API design on [Swaggerhub](https://app.swaggerhub.com/apis/20095257/web-api-assignment2/1.0.0/).

## Security and Authentication

Use JWT to authentication, home page, must watch page, now playing page and favorites page are protected. If we haven't login, all of these pages are invisible. All these pages can be seen after successfully login.

## Integrating with React App

All of the views use Web API instead of the TMDB API. 
Here is movie credits example of integrate:
Firstly, I transfer credits api from frontend to backend:
```
export const getMovieCredits = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}`
    )
    .then((res) => res.json())
      .then((json) => {
        return json;
      });
  };
```
Next, I add router in movies api:
```
router.get('/movie/:id/credits', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const credits = await getMovieCredits(id);
    if (credits) {
        try {
            let creditsStored = await creditsModel.findByMovieDBId(id);
            if (creditsStored) {
                console.info(`movie credit details already stored.`);
            }
            else {
                creditsStored = await creditsModel.create(credits);
                console.info(`movie credit details successfully stored.`);
            }
            res.status(200).json(credits);
          } catch (err) {
            console.error(`failed to handle movie credit details data: ${err}`);
          }
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));
```
Last, I need to change the api in frontend to fetch:
```
export const getMovieCredits = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`http://localhost:8080/api/people/movie/${id}/credits`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get'}).then(res => res.json())
  };
```
It can be succesfully integrated.

## Independent learning (if relevant)

I learn login and sign up authentication, and protect password of users.