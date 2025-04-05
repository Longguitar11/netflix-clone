import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { NODE_ENV, PORT } from './config/env.js';
import connectDB from './config/db.js';
import authRoute from './routes/auth.route.js';
import movieRoute from './routes/movie.route.js';
import tvRoute from './routes/tv.route.js';
import searchRoute from './routes/search.route.js';
import { protectRoute } from './middlewares/protectRoute.middleware.js';
import { clear } from 'console';

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/movie', protectRoute, movieRoute)
app.use('/api/v1/tv', protectRoute, tvRoute)
app.use('/api/v1/search', protectRoute, searchRoute)

if (NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
    connectDB();
})