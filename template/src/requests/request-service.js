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

// export const loadSearchMovies = (searchTerm = '') => {
//   TODO // missing implementation
// };
