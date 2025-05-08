function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalOnEsc);
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalOnEsc);
}

function closeModalOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

function closeModalOnOverlay(evt) {
  if (evt.target === evt.currentTarget) closeModal(evt.currentTarget);
}

module.exports = {openModal, closeModal, closeModalOnEsc, closeModalOnOverlay}