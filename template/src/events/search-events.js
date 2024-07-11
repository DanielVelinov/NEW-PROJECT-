import { toGIFsView } from "../views/movie-views.js";
import { CONTAINER_SELECTOR } from "../common/constants.js";
import { q } from "./helpers.js";
import { loadSearchGifs } from "../requests/request-service.js";

export const renderSearchItems = async (searchTerm) => {
  const searchInput = document.getElementById('search');

  if (searchTerm) {
    const gifs = await loadSearchGifs(searchTerm);
    q(CONTAINER_SELECTOR).innerHTML = toGIFsView(gifs.data);
  }

  searchInput.value = '';
};
