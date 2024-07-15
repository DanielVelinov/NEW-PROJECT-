import { toGIFsView } from "../views/movie-view.js";
import { CONTAINER_SELECTOR } from "../common/constants.js";
import { searchGifs } from "../requests/request-service.js";

export const renderSearchItems = async (searchTerm) => {
  const searchInput = document.getElementById('search');

  if (searchTerm) {
    const gifs = await searchGifs(searchTerm);
    document.querySelector(CONTAINER_SELECTOR).innerHTML = toGIFsView(gifs.data);
  }

  searchInput.value = '';
};
