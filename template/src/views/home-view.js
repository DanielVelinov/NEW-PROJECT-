import { apiKey } from "../common/constants.js";
import { toggleFavoriteStatus } from "../events/favorites-events.js";

export async function fetchGIFs(url, containerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with id '${containerId}' not found`);
        }
        container.innerHTML = '';

        data.data.forEach(gif => {
            const gifDiv = document.createElement('div');
            gifDiv.classList.add('gif');
            gifDiv.innerHTML = `
                <img src="${gif.images.fixed_height.url}" alt="${gif.title}">
                ${renderFavoriteStatus(gif)}
            `;
            container.appendChild(gifDiv);

            const favoriteButton = gifDiv.querySelector('.favorite');
            if (favoriteButton) {
                favoriteButton.addEventListener('click', () => {
                    toggleFavoriteStatus(gif);
                });
            }
        });
    } catch (error) {
        console.error('Error fetching GIFs:', error);
    }
}

export async function fetchTrendingGIFs() {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10`;
    await fetchGIFs(url, 'container');
}