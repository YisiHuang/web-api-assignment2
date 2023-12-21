import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import movieModel from '../movies/movieModel';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

async function registerUser(req, res) {
    // Add input validation logic here
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

router.post('/:userName/favorites', asyncHandler(async (req, res) => {

    const newFavorite = req.body.newFavorite;
    const userName = req.params.userName;
  
    const user = await User.findByUserName(userName);
  
    if (user.favorites.includes(newFavorite)) {
  
  
        res.status(201).json({code: 201, msg: 'Already exists in favorites.'})
    } else {
        await user.favorites.push(newFavorite);
        await user.save();
        console.log(user) 
        res.status(201).json(user); 
    }
  }));
  
router.post('/:username/movie/:id/favorites', asyncHandler(async (req, res) => {
    const newFavorite = req.body.newFavorite;
    const userName = req.params.username;
    const user = await User.findByUserName(userName);
    const index = user.favorites.indexOf(newFavorite)
    await user.favorites.splice(index, 1);
    await user.save(); 
    return res.status(201).json(user); 
  }));
  
  
router.get('/:userName/favorites', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    const users = await User.find();
    console.log(users)
    const user = await User.findByUserName(userName);
  
    res.status(200).json(user.favorites);
  
  }));

export default router;