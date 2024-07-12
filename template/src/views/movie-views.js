// import { renderFavoriteStatus } from '../events/favorites-events.js';

// export const toGifFromCategoryView = (category, gifs) => `
// <div id="gifs">
//   <h1>${category.name} gifs:</h1>
//   <div class="content">
//     ${gifs.map(toGifsSimple).join('\n')}
//   </div>
// </div>
// `;

// export const toSingleGifView = (gif) => `
// <!-- your template here, you can use toGifDetailed(gif) -->
// `;

// export const toGifsSimple = (gif) => `
// <!-- your template here -->
// `;

// const toGifDetailed = (gif) => `
// <!-- your template here -->
// `;
// TODO

export const toGIFsView = (gifs) => `
    <div id="search-results">
        <h1>Search Results</h1>
        <div class="content">
            ${gifs.map(gif => `
                <div class="gif">
                    <img src="${gif.images.fixed_height.url}" alt="${gif.title}">
                </div>
            `).join('')}
        </div>
    </div>
`;
