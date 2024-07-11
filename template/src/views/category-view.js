import { apiKey } from "../common/constants.js";

export async function toCategoriesView() {
    const url = `https://api.giphy.com/v1/gifs/categories?api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const categoriesContainer = document.createElement('div');
    categoriesContainer.id = 'categories';
    categoriesContainer.innerHTML = `
        <h1>Categories</h1>
        <div class="content">
            ${data.data.map(category => `
                <div class="category">
                    <img src="${category.gif.images.fixed_height.url}" alt="${category.name}">
                    <p>${category.name}</p>
                </div>
            `).join('')}
        </div>
    `;

    return categoriesContainer.outerHTML;
}