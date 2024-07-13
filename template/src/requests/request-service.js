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

export const fetchGif = async (id = null) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}`);
    const gifById = await response.json();

    return gifById;
};

export const handleUpload = async () => {
    const fileInput = document.getElementById('gif-file');
    const statusDiv = document.getElementById('upload-status');

    if (fileInput.files.length === 0) {
        statusDiv.textContent = 'Please select a GIF file to upload.';
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);

    try {
        const response = await fetch('https://upload.giphy.com/v1/gifs', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if (response.ok) {
            statusDiv.textContent = 'GIF uploaded successfully!';
        } else {
            statusDiv.textContent = `Upload failed: ${result.message}`;
        }
    } catch (error) {
        statusDiv.textContent = `Upload failed: ${error.message}`;
    }
};