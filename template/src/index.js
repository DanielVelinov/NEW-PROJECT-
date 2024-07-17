import { TRENDING, FAVORITES, ABOUT, UPLOAD } from './common/constants.js';
import { toggleFavoriteStatus } from './events/favorites-events.js';
import { q } from './events/helpers.js';
import { loadPage, renderTrending } from './events/navigation-events.js';
import { renderSearchItems } from './events/search-events.js';
import { handleUpload } from './events/upload-events.js';
import { loadSingleGif } from './requests/request-service.js';
import { toGifDetailedView } from './views/gif-views.js';
import { displayUploadedGifs } from './requests/request-service.js';

document.addEventListener('click', async e => {
    if (e.target.classList.contains('view-trending-btn')) {
        const gifId = e.target.getAttribute('data-trending-id');
        const gif = await loadSingleGif(gifId);

        const overlay = document.createElement('div');
        overlay.id = 'gif-overlay';
        overlay.innerHTML = toGifDetailedView(gif);
        document.body.appendChild(overlay);

        const closeOverlay = () => {
            overlay.remove();
            document.removeEventListener('keydown', onKeyDown);
            overlay.removeEventListener('click', onOverlayClick);
        };

        const onOverlayClick = (event) => {
            if (event.target === overlay || event.target.id === 'close-gif-info') {
                closeOverlay();
            }
        };
        overlay.addEventListener('click', onOverlayClick);

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeOverlay();
            }
        };
        document.addEventListener('keydown', onKeyDown);
    }

    if (e.target.classList.contains('nav-link')) {
        loadPage(e.target.getAttribute('data-page'));
    }

    if (e.target.classList.contains('add-to-favorites') || e.target.classList.contains('remove-from-favorites')) {
        const gifId = e.target.getAttribute('data-gif-id');
        if (gifId) {
            await toggleFavoriteStatus(gifId);
        } else {
            console.error('GIF ID is undefined:', e.target);
        }
    }

    if (e.target.id === 'upload-button') {
        handleUpload();
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    loadPage(TRENDING); 
    displayUploadedGifs();

    const uploadButton = document.getElementById('upload-button');
    if (uploadButton) {
        uploadButton.addEventListener('click', handleUpload);
    }

    document.getElementById('search').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const searchTerm = event.target.value.trim();
            renderSearchItems(searchTerm);
        }
    });

    const setupGifInfoHover = (selector, dataAttribute) => {
        const viewButtons = document.querySelectorAll(selector);
        viewButtons.forEach(button => {
            button.addEventListener('mouseover', () => {
                const gifId = button.getAttribute(dataAttribute);
                const gifInfoDiv = document.getElementById(`${dataAttribute.slice(5)}-gif-info-${gifId}`);
                gifInfoDiv.style.display = 'block';
            });

            button.addEventListener('mouseout', () => {
                const gifId = button.getAttribute(dataAttribute);
                const gifInfoDiv = document.getElementById(`${dataAttribute.slice(5)}-gif-info-${gifId}`);
                gifInfoDiv.style.display = 'none';
            });
        });
    };

    setupGifInfoHover('.view-trending-btn', 'data-trending-id');
    setupGifInfoHover('.view-favorites-btn', 'data-favorites-id');
    setupGifInfoHover('.view-search-btn', 'data-search-id');
});
