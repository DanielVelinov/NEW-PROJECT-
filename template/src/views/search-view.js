import { CONTAINER_SELECTOR } from "../common/constants.js";
import { q } from "../events/helpers.js";

export const toUploadView = () => {
    console.log('Rendering upload view')
    q(CONTAINER_SELECTOR).innerHTML = `
      <div id="upload-section">
        <h2>Upload a GIF</h2>
        <input type="file" id="gif-file" accept="image/gif">
        <button id="upload-button">Upload</button>
        <div id="upload-status"></div>
      </div>
    `;

    document.getElementById('upload-button').addEventListener('click', function (event) {
        event.preventDefault();
        handleUpload();
    });
};