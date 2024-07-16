import { uploadGif } from "../requests/request-service.js";
import { apiKey } from "../common/constants.js";
import { displayUploadedGifs } from "../requests/request-service.js";

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
        if (response && response.data) {
            status.textContent = 'Upload successful!';
            saveUploadedGifId(response.data.id);
            displayUploadedGifs();
        } else {
            status.textContent = 'Upload failed!';
        }
    } catch (error) {
        status.textContent = `Error: ${error.message}`;
    }
};

export const saveUploadedGifId = (id) => {
    const uploadedGifs = JSON.parse(localStorage.getItem('uploadedGifs')) || [];
    uploadedGifs.push(id);
    localStorage.setItem('uploadedGifs', JSON.stringify(uploadedGifs));
};
