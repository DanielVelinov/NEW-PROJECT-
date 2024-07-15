import { addFavorite, getFavorites, removeFavorite } from '../data/favorites.js';
import { loadSingleGif } from '../requests/request-service.js';
import { renderFavorites } from './navigation-events.js';
import { FULL_HEART, EMPTY_HEART } from '../common/constants.js';

export const toggleFavoriteStatus = async (gifId) => {
    if (!gifId) {
        console.error('Invalid GIF ID:', gifId);
        return;
    }

    let favorites = getFavorites();
    const button = document.querySelector(`[data-gif-id="${gifId}"]`);

    if (favorites.find(fav => fav.id === gifId)) {
        removeFavorite(gifId);
        if (button) {
            button.innerHTML = EMPTY_HEART;
            button.classList.remove('remove-from-favorites');
            button.classList.add('add-to-favorites');
        }
        const favoritesNavLink = document.querySelector('a.nav-link[data-page="favorites"]');
        if (favoritesNavLink && favoritesNavLink.classList.contains('active')) {
            renderFavorites();
        }
    } else {
        const gif = await loadSingleGif(gifId);
        if (gif && gif.images && gif.images.downsized_medium && gif.images.downsized_medium.url) {
            addFavorite(gif);
            if (button) {
                button.innerHTML = FULL_HEART;
                button.classList.remove('add-to-favorites');
                button.classList.add('remove-from-favorites');
            }
        } else {
            console.error('Invalid GIF object:', gif);
        }
    }
};