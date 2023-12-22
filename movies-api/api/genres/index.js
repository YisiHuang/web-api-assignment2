import express from 'express';
import { getGenres } from '../tmdb/tmdb-api';
import asyncHandler from 'express-async-handler';

const router = express.Router(); 

// Get all genres
router.get('/tmdb/genres', asyncHandler( async(req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.post('/tmdb/genres', asyncHandler(async (req, res) => {
    if (req.query.action === 'register') {  
        await Genre(req.body).save()
        res.status(201).json({
            code: 201,
            msg: 'Successful created new genres.',
        });
    }
    else {  
        const genres = await Genre.findOne(req.body);
        if (!genres) {
            return res.status(401).json({ code: 401, msg: 'Authentication failed' })
        } else {
            return res.status(200).json({ code: 200, msg: "Authentication Successful", token: 'TEMPORARY_TOKEN' })
        }
    }
}));

export default router;