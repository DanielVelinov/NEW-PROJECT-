export const toUploadView = () => `
  <div id="upload-section">
    <h2>Add something new...</h2>
    <label for="images" class="drop-container" id="dropcontainer">
  <span class="drop-title">Upload gif here </span>
  <input type="file" id="gif-file" accept="image/gif" required></input>
  </label>
    <button id="upload-button" class="upload-button">Upload</button>
    <div id="upload-status"></div>
  </div>
`;