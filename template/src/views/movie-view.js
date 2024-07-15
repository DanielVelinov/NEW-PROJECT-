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
