import { EMPTY_HEART, FULL_HEART } from '../common/constants.js';
import {
    addFavorite,
    getFavorites,
    removeFavorite,
} from '../data/favorites.js';
import { q } from './helpers.js';

export const toggleFavoriteStatus = async (gifId) => {
    const favorites = await getFavorites();
    const heartSpan = q(`span[data-gif-id="${gifId}"]`);

    if (favorites.includes(gifId)) {
        await removeFavorite(gifId);
        heartSpan.classList.remove('active');
        heartSpan.innerHTML = EMPTY_HEART;
    } else {
        await addFavorite(gifId);
        heartSpan.classList.add('active');
        heartSpan.innerHTML = FULL_HEART;
    }
};

export const renderFavoriteStatus = async (gifId) => {
    const favorites = await getFavorites();
    return favorites.includes(gifId)
        ? `<span class="favorite active" data-gif-id="${gifId}">${FULL_HEART}</span>`
        : `<span class="favorite" data-gif-id="${gifId}">${EMPTY_HEART}</span>`;
};