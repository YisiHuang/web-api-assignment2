import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies, getMovies, getMovie, getMovieReviews, getMovieImages, getTrendingMovies, getNowPlaying, getTopRatedTV
  } from '../tmdb/tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/trending', asyncHandler(async (req, res) => {
    const trendingMovies = await getTrendingMovies();
    res.status(200).json(trendingMovies);
}));

router.get('/tmdb/nowPlaying', asyncHandler(async (req, res) => {
    const nowPlayingMovies = await getNowPlaying();
    res.status(200).json(nowPlayingMovies);
}));

router.get('/tmdb/discover', asyncHandler( async(req, res) => {
    const Movies = await getMovies();
    res.status(200).json(Movies);
}));

router.get('/tmdb/movie/:id', asyncHandler(async(req, res) => {
    const id = req.params.id;
    const Movie = await getMovie(id);
    res.status(200).json(Movie);
}));

router.get('/tmdb/movie/:id/reviews', asyncHandler(async(req, res) => {
    const id = req.params.id;
    const reviews = await getMovieReviews(id);
    res.status(200).json(reviews);
}));

router.post('/tmdb/movie/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);

    if (movieReviews.id == id) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.id = uniqid();
        movieReviews.results.push(req.body); //push the new review onto the list
        res.status(201).json(req.body);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

router.get('/tmdb/movie/:id/images', asyncHandler(async(req, res) => {
    const id = req.params.id;
    const images = await getMovieImages(id);
    res.status(200).json(images);
}));

router.get('/tmdb/topRated', asyncHandler(async (req, res) => {
    const topRatedTV = await getTopRatedTV();
    res.status(200).json(topRatedTV);
}));

export default router;