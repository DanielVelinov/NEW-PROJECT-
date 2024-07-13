import { apiKey } from '../common/constants.js';
import { getCategories, getGetGifsGeneralInfo, getGifById, getCategory, searchGifs } from '../data/gifs.js';

export const loadCategories = async () => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/categories?api_key=${apiKey}`);
    const category = await response.json();

    return category;
};

export const loadCategory = async (id = null) => {
    //   const response = await fetch(`https://api.giphy.com/v1/gifs/categories?api_key=${apiKey}`);
    //     const category = await response.json();

    //   return category;
}

// export const loadMovies = (categoryId = null) => {
//   TODO // missing implementation
// };

// export const loadSingleMovie = (id) => {
//   TODO // missing implementation
// };

export const loadSearchGifs = async (searchTerm = '') => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURI(searchTerm)}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);
    const gifSearch = await response.json();

    return gifSearch;
};

const fetchGif = async (id = null) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}`);
    const gifById = await response.json();

    return gifById;
};