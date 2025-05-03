require('./pages/index.css');
import { initialCards, createCard, deleteCard, likeCard } from './components/card';
import { openModal, closeModal, closeModalOnEsc, closeModalOnOverlay} from './components/modal';

function openImageModal(evt) {
  const card = evt.target.closest('.card');
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const popupImage = imageModal.querySelector('.popup__image');
  const popupCaption = imageModal.querySelector('.popup__caption');

  popupImage.src = cardImage.src;
  popupCaption.textContent = cardTitle.textContent;
  imageModal.addEventListener('keydown', closeModalOnEsc);
  imageModal.addEventListener('click', closeModalOnOverlay);
  openModal(imageModal);
}

function changeProfileOnsubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editModal);
}

function addCardOnSubmit(evt) {
  evt.preventDefault();
  const cardName = document.querySelector('.popup__input_type_card-name').value;
  const url = document.querySelector('.popup__input_type_url').value;
  const cardToAdd = createCard(cardName, url, deleteCard, likeCard, openImageModal);

  cardList.prepend(cardToAdd);
  evt.target.reset();
  closeModal(cardModal);
}

const cardList = document.querySelector('.places__list');

initialCards.forEach(item => {
  const cardToAdd = createCard(item.name, item.link, deleteCard, likeCard, openImageModal);
  cardList.append(cardToAdd);
})

const editModal = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');

const nameInput = editModal.querySelector('.popup__input_type_name');
const jobInput = editModal.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  editModal.addEventListener('keydown', closeModalOnEsc);
  editModal.addEventListener('click', closeModalOnOverlay);
  openModal(editModal);
})

const cardModal = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');

addButton.addEventListener('click', () => {
  cardModal.addEventListener('keydown', closeModalOnEsc);
  cardModal.addEventListener('click', closeModalOnOverlay);
  openModal(cardModal);
})

const imageModal = document.querySelector('.popup_type_image');

const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const parent = button.closest('.popup');
    closeModal(parent);
  })
})

const formElementEdit = document.querySelector('.popup_type_edit .popup__form');
formElementEdit.addEventListener('submit', changeProfileOnsubmit);

const formElementNewCard = document.querySelector('.popup_type_new-card .popup__form');
formElementNewCard.addEventListener('submit', addCardOnSubmit)

const popus = document.querySelectorAll('.popup');
popus.forEach(popup => {
  popup.classList.add('popup_is-animated');
})