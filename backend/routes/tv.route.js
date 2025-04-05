import express from 'express';
import { getByCategory, getDetails, getSimilar, getTrailers, getTrending } from '../controllers/movieAndTv.controller.js'
const router = express.Router();

router.get('/trending', (req, res) => getTrending(req, res, "tv"))
router.get('/trailers/:id', (req, res) => getTrailers(req, res, "tv"))
router.get('/details/:id', (req, res) => getDetails(req, res, "tv"))
router.get('/similar/:id', (req, res) => getSimilar(req, res, "tv"))
router.get('/:category', (req, res) => getByCategory(req, res, "tv"))


export default router;