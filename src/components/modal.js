function openModal(modal) {
  modal.classList.add('popup_is-opened');
  modal.setAttribute('tabindex', -1);
  modal.focus();
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
}
function closeModalOnEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal(this);
    this.removeEventListener('keydown', closeModalOnEsc);
    this.removeEventListener('click', closeModalOnOverlay);
  }
}

function closeModalOnOverlay(evt) {
  if (evt.target === this) {
    closeModal(this);
    this.removeEventListener('keydown', closeModalOnEsc);
    this.removeEventListener('click', closeModalOnOverlay);
  }
}

module.exports = {openModal, closeModal, closeModalOnEsc, closeModalOnOverlay}