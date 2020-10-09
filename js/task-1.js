import galleryItems from './gallery-items.js';

const galleryListRef = document.querySelector('.js-gallery');
const galleryCardsMarkup = createGalleryCardsMarkup(galleryItems);
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');

galleryListRef.insertAdjacentHTML('beforeend', galleryCardsMarkup);

function createGalleryCardsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
        <a class="gallery__link"
        href="${original}"
        >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li>
`;
    })
    .join('');
}

galleryListRef.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(e) {
  e.preventDefault();
  onOpenModal(e);
}

function onOpenModal(e) {
  window.addEventListener('keydown', onEscCloseModal);
  lightboxRef.classList.add('is-open');
  lightboxImageRef.src = e.target.dataset.source;
  lightboxImageRef.alt = e.target.alt;
}

lightboxRef.addEventListener('click', onOverlayClickCloseModal);

function onCloseModal() {
  window.removeEventListener('keydown', onEscCloseModal);
  lightboxRef.classList.remove('is-open');
  lightboxImageRef.src = '';
  lightboxImageRef.alt = '';
}

function onOverlayClickCloseModal(e) {
  if (e.target !== lightboxImageRef) {
    onCloseModal();
  }
}

function onEscCloseModal(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}
