import { TRENDING, FAVORITES, ABOUT, UPLOAD } from './common/constants.js';
import { toggleFavoriteStatus } from './events/favorites-events.js';
import { q } from './events/helpers.js';
import { loadPage, renderTrending } from './events/navigation-events.js';
import { renderSearchItems } from './events/search-events.js';
import { handleUpload } from './events/upload-events.js';
import { loadSingleGif } from './requests/request-service.js';
import { toGifDetailedView } from './views/gif-views.js';



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

    
        document.getElementById('close-gif-info').addEventListener('click', closeOverlay);

    
        const onOverlayClick = (event) => {
            if (event.target === overlay) {
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

    
    if (e.target.id === 'close-gif-info') {
        const overlay = document.getElementById('gif-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
});




document.addEventListener('DOMContentLoaded', async () => {
    document.addEventListener('click', async e => {
        if (e.target.classList.contains('nav-link')) {
            loadPage(e.target.getAttribute('data-page'));
        }

        if (e.target.classList.contains('view-trending-btn')) {
            const gifId = e.target.getAttribute('data-trending-id');
            const gif = await loadSingleGif(gifId);

            
            const overlay = document.createElement('div');
            overlay.id = 'gif-overlay';
            overlay.innerHTML = toGifDetailedView(gif);
            document.body.appendChild(overlay);

            
            document.getElementById('close-gif-info').addEventListener('click', () => {
                overlay.remove();
            });
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


    loadPage(TRENDING); 
});

document.getElementById('search').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const searchTerm = event.target.value.trim();
        renderSearchItems(searchTerm);
    }
});