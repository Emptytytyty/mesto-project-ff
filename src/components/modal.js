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
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.target === openedPopup) {
    closeModal(openedPopup);
  }
}

module.exports = {openModal, closeModal, closeModalOnEsc, closeModalOnOverlay}