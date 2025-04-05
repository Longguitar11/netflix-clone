import { config } from 'dotenv';

config();

export const { PORT, MONGO_URI, JWT_SECRET, NODE_ENV, TMDB_API_KEY } = process.env