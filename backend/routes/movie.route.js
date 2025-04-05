import express from 'express';
import { getByCategory, getDetails, getSimilar, getTrailers, getTrending } from '../controllers/movieAndTv.controller.js'

const router = express.Router();

router.get('/trending', (req, res) => getTrending(req, res, "movie"))
router.get('/trailers/:id', (req, res) => getTrailers(req, res, "movie"))
router.get('/details/:id', (req, res) => getDetails(req, res, "movie"))
router.get('/similar/:id', (req, res) => getSimilar(req, res, "movie"))
router.get('/:category', (req, res) => getByCategory(req, res, "movie"))


export default router;