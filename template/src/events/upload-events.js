import { uploadGif } from "../requests/request-service.js";
import { apiKey } from "../common/constants.js";

export const handleUpload = async () => {
    const fileInput = document.getElementById('gif-file');
    const status = document.getElementById('upload-status');

    if (fileInput.files.length === 0) {
        status.textContent = 'No file selected';
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('api_key', apiKey);

    try {
        const response = await uploadGif(formData);
        status.textContent = response.data ? 'Upload successful!' : 'Upload failed!';
    } catch (error) {
        status.textContent = `Error: ${error.message}`;
    }
};
