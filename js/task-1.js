import galleryItems from './gallery-items.js';

const galleryListRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const modalCloseBtnRef = document.querySelector(
  '[data-action="close-lightbox"]',
);
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');

const galleryCardsMarkup = createGalleryCardsMarkup(galleryItems);
galleryListRef.insertAdjacentHTML('beforeend', galleryCardsMarkup);

function createGalleryCardsMarkup(items) {
  return items
    .map(({ preview, original, description }, index) => {
      return `
        <li class="gallery__item">
        <a class="gallery__link"
        href="${original}"
        >
        <img
            data-index="${index}"
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
  if (e.target.tagName !== 'IMG') {
    return;
  }
  console.log(e.target);
  onOpenModal(e);
}

function onOpenModal(e) {
  window.addEventListener('keydown', onEscCloseModal);
  galleryListRef.addEventListener('keydown', onClickImageSlider);

  lightboxRef.classList.add('is-open');
  setImageAttribute(e);
}

function setImageAttribute(e) {
  lightboxImageRef.src = e.target.dataset.source;
  lightboxImageRef.alt = e.target.alt;
  lightboxImageRef.setAttribute('data-index', e.target.dataset.index);
}

lightboxRef.addEventListener('click', onOverlayAndBtnClick);

function onCloseModal() {
  window.removeEventListener('keydown', onEscCloseModal);
  galleryListRef.removeEventListener('keydown', onClickImageSlider);
  lightboxRef.classList.remove('is-open');
  unsetImageAttributes();
}

function unsetImageAttributes() {
  lightboxImageRef.src = '';
  lightboxImageRef.alt = '';
}

function onOverlayAndBtnClick(e) {
  if (e.target === lightboxOverlayRef || e.target === modalCloseBtnRef) {
    onCloseModal();
  }
}

function onEscCloseModal(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

function onClickImageSlider(e, index) {
  if (e.code === 'ArrowRight') {
    console.log(
      e.target.parentNode.nextElementSibling.childNodes[1].childNodes[1],
    );
    setNextImageAttribute(e);
  } else if (e.code === 'ArrowLeft') {
    console.log(
      e.target.parentNode.previousElementSibling.childNodes[1].childNodes[1],
    );
    setPreviousImageAttribute(e);
  }
}

// function setNextImageAttribute(e) {
//   lightboxImageRef.src =
//     e.target.parentNode.nextElementSibling.childNodes[1].childNodes[1].dataset.source;
//   lightboxImageRef.alt =
//     e.target.parentNode.nextElementSibling.childNodes[1].childNodes[1].alt;
// }

// function setPreviousImageAttribute(e) {
//   lightboxImageRef.src =
//     e.target.parentNode.previousElementSibling.childNodes[1].childNodes[1].dataset.source;
//   lightboxImageRef.alt =
//     e.target.parentNode.previousElementSibling.childNodes[1].childNodes[1].alt;
// }

// [...galleryListRef.children].forEach((child, index) => {
//   console.log(child.querySelector('.gallery__image'), index);
//   lightboxImageRef.src.indexOf(child.querySelector('.gallery__image').src);
// });
