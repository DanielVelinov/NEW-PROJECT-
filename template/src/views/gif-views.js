export const toGifDetailedView = (gif) => `
<div class="gif-detailed">
    <button id="close-gif-info">Close</button>
    <img src="${gif.images.downsized_medium.url}" alt="${gif.title}">
    <h3>${gif.title}</h3>
    <p>Uploaded by: ${gif.username}</p>
    <p>Rating: ${gif.rating}</p>
</div>
`;
