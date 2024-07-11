import { toGIFsView } from "../views/movie-views.js";
import { CONTAINER_SELECTOR } from "../common/constants.js";
import { q } from "./helpers.js";

export const renderSearchItems = async (searchTerm) => {
  const searchInput = document.getElementById('search');
  const query = searchInput.value.trim();

  if (query) {
    const gifs = await loadSearchMovies(query);
    q(CONTAINER_SELECTOR).innerHTML = toGIFsView(gifs.data);
    searchInput.value = '';
  }
};
