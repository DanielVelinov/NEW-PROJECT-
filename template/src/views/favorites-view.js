import { getFavorites } from "../data/favorites.js";
import { renderFavoriteStatus, toggleFavoriteStatus } from "../events/favorites-events.js";

export async function showFavorites() {
    const favorites = getFavorites();
    const container = document.getElementById('container');
    container.innerHTML = '';

    if (favorites.length === 0) {
        container.innerHTML = '<p>No favorites yet. Add some GIFs to favorites to see them here.</p>';
        return;
    }

    favorites.forEach(gif => {
        const gifDiv = document.createElement('div');
        gifDiv.classList.add('gif');
        gifDiv.innerHTML = `
    <img src="${gif.images.fixed_height.url}" alt="${gif.title}">
    ${renderFavoriteStatus(gif)}
    `;
        container.appendChild(gifDiv);

        gifDiv.querySelector('.favorite').addEventListener('click', () => {
            toggleFavoriteStatus(gif);
            showFavorites(); // Refresh the favorites view after removing a favorite
        });
    });
}