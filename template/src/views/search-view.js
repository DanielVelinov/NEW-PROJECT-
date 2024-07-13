export const toUploadView = () => {
    document.querySelector(CONTAINER_SELECTOR).innerHTML = `
      <div id="upload-section">
        <h2>Upload a GIF</h2>
        <input type="file" id="gif-file" accept="image/gif">
        <button id="upload-button">Upload</button>
        <div id="upload-status"></div>
      </div>
    `;
};