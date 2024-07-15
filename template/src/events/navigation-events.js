import { loadTrending, loadSingleGif, loadRandomGifs } from '../requests/request-service.js';
import { toTrendingView } from '../views/trending-view.js';
import { toUploadView } from '../views/upload-view.js';
import { toFavoritesView, toRandomGifsView } from '../views/favorites-view.js';
import { toAboutView } from '../views/about-view.js';
import { getFavorites } from '../data/favorites.js';
import { CONTAINER_SELECTOR, TRENDING, FAVORITES, ABOUT, UPLOAD } from '../common/constants.js';
import { q, setActiveNav } from './helpers.js';

// public API
export const loadPage = (page = '') => {
  const trendingText = q('#trending-text');
  const favoritesText = q('#favorites-text');
  const searchText = q('#search-text');
  const uploadText = q('#upload-text');
  const aboutText = q('#about-text');

  if (trendingText) trendingText.style.color = 'transparent';
  if (favoritesText) favoritesText.style.color = 'transparent';
  if (searchText) searchText.style.color = 'transparent';
  if (uploadText) uploadText.style.color = 'transparent';
  if (aboutText) aboutText.style.color = 'transparent';

  switch (page) {
    case TRENDING:
      setActiveNav(TRENDING);
      return renderTrending();

    case FAVORITES:
      setActiveNav(FAVORITES);
      return renderFavorites();

    case ABOUT:
      setActiveNav(ABOUT);
      return renderAbout();

    case UPLOAD:
      setActiveNav(UPLOAD);
      return renderUpload();

    default:
      return null;
  }
};

// export const renderFavorites = async () => {
//     const favoriteGifs = getFavorites();
//     if (favoriteGifs.length === 0) {
//         const randomGifs = await loadRandomGifs(); // Fetch a random GIF
//         q(CONTAINER_SELECTOR).innerHTML = toRandomGifsView(randomGifs);
//     } else {
//         q(CONTAINER_SELECTOR).innerHTML = toFavoritesView(favoriteGifs);
//     }
//     const favoritesText = q('#favorites-text');
//     if (favoritesText) favoritesText.style.color = 'rgba(70, 74, 103)';
// };

export const renderFavorites = async () => {
  const favoriteGifs = getFavorites();
  if (favoriteGifs.length === 0) {
    const randomGifs = await loadRandomGifs(); // Fetch a random GIF
    q(CONTAINER_SELECTOR).innerHTML = toRandomGifsView(randomGifs);
  } else {
    q(CONTAINER_SELECTOR).innerHTML = toFavoritesView(favoriteGifs);
  }
  const favoritesText = q('#favorites-text');
  if (favoritesText) favoritesText.style.color = 'rgba(70, 74, 103)';
};


export const renderTrending = async () => {
  try {
    const trendingGifs = await loadTrending();
    if (Array.isArray(trendingGifs.data)) {
      q(CONTAINER_SELECTOR).innerHTML = toTrendingView(trendingGifs.data);
      const trendingText = q('#trending-text');
      if (trendingText) trendingText.style.color = 'rgba(70, 74, 103)';
    } else {
      console.error('Expected an array but got', trendingGifs.data);
    }
  } catch (error) {
    console.error('Error loading trending GIFs:', error.message);
  }
};

export const renderAbout = async () => {
  toAboutView();
  const aboutText = q('#about-text');
  if (aboutText) aboutText.style.color = 'rgba(70, 74, 103)';
};

export const renderUpload = async () => {
  q(CONTAINER_SELECTOR).innerHTML = toUploadView();
  const uploadText = q('#upload-text');
  if (uploadText) uploadText.style.color = 'rgba(70, 74, 103)';
};
