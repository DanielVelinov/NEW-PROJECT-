export const toUploadView = () => `
  <div id="upload-section">
    <h2>Add something new...</h2>
    <label for="images" class="drop-container" id="dropcontainer">
  <span class="drop-title">Upload gif here </span>
  <input type="file" id="gif-file" accept="image/gif" required></input>
  </label>
    <button id="upload-button" class="upload-button">Upload</button>
    <div id="upload-status"></div>
    <div id="upload-section">
    <!-- Existing content for uploading GIFs -->
    <div id="uploaded-gifs-section">
      <h2>Your Uploaded GIFs</h2>
      <div id="uploaded-gifs"></div>
    </div>
  </div>
  </div>
`;