
import { FULL_HEART, EMPTY_HEART } from "../common/constants.js";
import { renderFavoriteStatus } from "../events/helpers.js";

export const toGIFsView = (gifs) => `
    <div id="search-results">
        <h1>Search Results</h1>
        <div class="content">
            ${gifs.map(gif => `
                <div class="gif">
                <div class="separate-gifs">
                    <img src="${gif.images.fixed_height.url}" alt="${gif.title}">
                    <div class="overlay"></div>
                    </div>
        <div class="buttons">
            <button class="view-trending-btn" data-trending-id="${gif.id}">View info</button>
            <button class="${renderFavoriteStatus(gif.id) === FULL_HEART ? 'remove-from-favorites' : 'add-to-favorites'}" data-gif-id="${gif.id}">${renderFavoriteStatus(gif.id)}</button>
        </div>
                </div>
            `).join('')}
        </div>
    </div>
`;
