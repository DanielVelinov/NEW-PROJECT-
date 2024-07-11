import { CONTAINER_SELECTOR, TRENDING } from '../common/constants.js';
import { loadCategories } from '../requests/request-service.js';
import { toCategoriesView } from '../views/category-view.js';
import { toTrendingView } from '../views/home-view.js';
import { toGifFromCategoryView } from '../views/movie-views.js';
import { q, setActiveNav } from './helpers.js';

// public API
export const loadPage = (page = '') => {

  switch (page) {

    case TRENDING:
      setActiveNav(TRENDING);
      return renderHome();

    // missing partial implementation

    /* if the app supports error logging, use default to log mapping errors */
    default: return null;
  }

};

export const renderGifDetails = (id = null) => {
  // missing implementation
};

export const renderCategory = (categoryId = null) => {
  // missing partial implementation

  q(CONTAINER_SELECTOR).innerHTML = toGifFromCategoryView(category, gifs);
};

// private functions

const renderTrending = () => {
  q(CONTAINER_SELECTOR).innerHTML = toTrendingView();
};

const renderCategories = async () => {
  const categories = await loadCategories();

  q(CONTAINER_SELECTOR).innerHTML = toCategoriesView(categories);
};

const renderFavorites = () => {
  // missing implementation
};

const renderAbout = () => {
  // missing implementation
};
