import { fetchFromTMDB } from '../services/tmdb.service.js'

export const getTrending = async (req, res, type) => {
    try {
        
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/${type}/day?language=en-US`);
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        
        res.status(200).json({success: true, content: randomMovie});
    } catch (error) {
        console.log("Failed to fetch trending movie:", error.message);
        res.status(500).json({success: false, error: 'Internal server error'});
    }
}

export const getTrailers = async (req, res, type) => {
    const { id } = req.params;

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`);
        res.status(200).json({success: true, trailers: data.results})
    } catch (error) {
        if(error.response.status === 404) {
            return res.status(404).json({success: false, error: 'Movie not found'});
        }

        res.status(500).json({success: false, error: 'Internal server error'});
    }
}

export const getDetails = async (req, res, type) => {
    const { id } = req.params;

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`);
        res.status(200).json({success: true, content: data})
    } catch (error) {
        if(error.response.status === 404) {
            return res.status(404).json({success: false, error: 'Movie not found'});
        }

        res.status(500).json({success: false, error: 'Internal server error'});
    }
}

export const getSimilar = async (req, res, type) => {
    const { id } = req.params;

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success: true, similar: data.results})
    } catch (error) {
        res.status(500).json({success: false, error: 'Internal server error'});
    }
}

export const getByCategory = async (req, res, type) => {
    const { category } = req.params;

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/${type}/${category}?language=en-US&page=1`);
        res.status(200).json({success: true, content: data.results})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, error: 'Internal server error'});
    }
}