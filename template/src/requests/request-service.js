import { apiKey } from '../common/constants.js';

export const loadTrending = async () => {
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=g`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching trending GIFs:', error);
        return { data: [] }; // Return an empty array if there's an error
    }
};

export const loadSingleGif = async (id) => {
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error loading single GIF:', error);
        return null;
    }
};

export const searchGifs = async (searchTerm = '') => {
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching GIFs:', error);
        return { data: [] }; // Return an empty array if there's an error
    }
};

export const uploadGif = async (formData) => {
    try {
        const response = await fetch('https://upload.giphy.com/v1/gifs', {
            method: 'POST',
            body: formData
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching upload API:', error.message);
        alert('Error fetching upload API:', error.message);
        return null;
    }
};

export const loadRandomGifs = async (limit = 1) => {
    try {
        const randomGifPromises = Array.from({ length: limit }, () =>
            fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&rating=g`).then(response => response.json())
        );

        const randomGifResponses = await Promise.all(randomGifPromises);
        return randomGifResponses.map(response => response.data);
    } catch (error) {
        console.error('Error fetching random GIFs:', error);
        return []; // Return an empty array if there's an error
    }
};

export const fetchUploadedGifs = async (gifIds) => {
    const ids = gifIds.join(',');
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${ids}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching GIFs:', error.message);
        return null;
    }
};


export const displayUploadedGifs = async () => {
    const uploadedGifsContainer = document.getElementById('uploaded-gifs');
    if (!uploadedGifsContainer) return;

    const uploadedGifs = JSON.parse(localStorage.getItem('uploadedGifs')) || [];

    if (uploadedGifs.length === 0) {
        uploadedGifsContainer.innerHTML = '<p>No GIFs uploaded yet.</p>';
        return;
    }

    const response = await fetchUploadedGifs(uploadedGifs);
    if (response && response.data) {
        uploadedGifsContainer.innerHTML = '';
        response.data.forEach(gif => {
            const img = document.createElement('img');
            img.src = gif.images.fixed_width.url;
            img.classList.add('uploaded-gif');
            uploadedGifsContainer.appendChild(img);
        });
    } else {
        uploadedGifsContainer.innerHTML = '<p>Error loading GIFs.</p>';
    }
};