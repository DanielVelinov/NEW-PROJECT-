import { apiKey, FULL_HEART, EMPTY_HEART } from "../common/constants.js";
import { renderFavoriteStatus } from "../events/favorites-events.js";

async function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

async function saveToFavorites(gif) {
    const favorites = await getFavorites();
    favorites.push(gif);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

async function removeFromFavorites(gifId) {
    let favorites = await getFavorites();
    favorites = favorites.filter(fav => fav.id !== gifId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

async function isFavorite(gifId) {
    const favorites = await getFavorites();
    return favorites.some(fav => fav.id === gifId);
}

export async function fetchGIFs(url, containerId) {
    const response = await fetch(url);
    const data = await response.json();
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    for (const gif of data.data) {
        const isFav = await isFavorite(gif.id);
        const gifDiv = document.createElement('div');
        gifDiv.classList.add('gif');
        gifDiv.innerHTML = `
            <div class="gif-container">
                <img src="${gif.images.fixed_height.url}" alt="${gif.title}">
                <div class="fav-btn">
                    <span class="favme ${isFav ? 'active' : ''}" data-id="${gif.id}">
                        ${isFav ? FULL_HEART : EMPTY_HEART}
                    </span>
                </div>
            </div>
        `;
        container.appendChild(gifDiv);

        gifDiv.querySelector('.favme').addEventListener('click', function () {
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.textContent = FULL_HEART;
                saveToFavorites(gif);
            } else {
                this.textContent = EMPTY_HEART;
                removeFromFavorites(gif.id);
            }
        });
    }
}

export async function fetchTrendingGIFs() {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10`;
    fetchGIFs(url, 'container');
}