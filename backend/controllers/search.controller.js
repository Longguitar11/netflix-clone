import { User } from "../models/user.model.js"
import { fetchFromTMDB } from "../services/tmdb.service.js"

export const searchPerson = async (req, res) => {
    const { query } = req.params

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)

        if (data.results.length === 0) return res.status(404).send(null)

        const user = await User.findById(req.user._id)

        // Check if the person isn't in the search history, then add it
        if (!user.searchHistory.some(item => item.id === data.results[0].id)) {
            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory: {
                        id: data.results[0].id,
                        image: data.results[0].profile_path,
                        title: data.results[0].name,
                        type: 'person',
                        createdAt: new Date()
                    }
                }
            })
        }

        res.status(200).json({ success: true, content: data.results })
    } catch (error) {
        console.log("Failed to search person:", error.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

export const searchMovie = async (req, res) => {
    const { query } = req.params

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)

        if (data.results.length === 0) return res.status(404).send(null)

        const user = await User.findById(req.user._id)

        if (!user.searchHistory.some(item => item.id === data.results[0].id)) {
            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory: {
                        id: data.results[0].id,
                        image: data.results[0].poster_path,
                        title: data.results[0].title,
                        type: 'movie',
                        createdAt: new Date()
                    }
                }
            })
        }

        res.status(200).json({ success: true, content: data.results })
    } catch (error) {
        console.log("Failed to search movie:", error.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

export const searchTv = async (req, res) => {
    const { query } = req.params

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)

        if (data.results.length === 0) return res.status(404).send(null)

        const user = await User.findById(req.user._id)

        if (!user.searchHistory.some(item => item.id === data.results[0].id)) {
            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory: {
                        id: data.results[0].id,
                        image: data.results[0].poster_path,
                        title: data.results[0].name,
                        type: 'tv',
                        createdAt: new Date()
                    }
                }
            })
        }

        res.status(200).json({ success: true, content: data.results })
    } catch (error) {
        console.log("Failed to search tv:", error.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

export const getSearchHistory = async (req, res) => {
    try {
        res.status(200).json({ success: true, content: req.user.searchHistory })
    } catch (error) {
        console.log("Failed to get search history:", error.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

export const removeItemFromSearchHistory = async (req, res) => {
    const { id } = req.params

    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: parseInt(id) }
            }
        });

        res.status(200).json({ success: true, message: "Remove an item from history successfully" });
    } catch (error) {
        console.log("Failed to remove item from search history:", error.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}


