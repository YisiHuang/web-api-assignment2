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

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

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

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.

## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.

## Independent learning (if relevant)

Briefly explain any non-standard features developed for the app.   