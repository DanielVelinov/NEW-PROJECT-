// src/events/helpers.js
import { getFavorites } from '../data/favorites.js';
import { FULL_HEART, EMPTY_HEART } from '../common/constants.js';

export const q = (selector) => document.querySelector(selector);

export const setActiveNav = (page) => {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === page) {
      link.classList.add('active');
    }
  });
};

export const renderFavoriteStatus = (gifId) => {
  const favorites = getFavorites();
  return favorites.find(fav => fav.id === gifId) ? FULL_HEART : EMPTY_HEART;
};

