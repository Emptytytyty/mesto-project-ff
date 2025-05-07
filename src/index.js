require('./pages/index.css');
import  initialCards  from './cards';
import { createCard, deleteCard, likeCard } from './components/card';
import { openModal, closeModal, closeModalOnOverlay} from './components/modal';

function openImageModal(cardName, cardImageLink) {
  popupCaption.textContent = cardName;
  popupImage.src = cardImageLink;
  openModal(imageModal);
}

function changeProfileOnsubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;
  closeModal(editModal);
}

function addCardOnSubmit(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const imageLink = cardImageInput.value;
  const cardToAdd = createCard({name, imageLink, deleteCallback: deleteCard, likeCallback: likeCard, imageCallback: openImageModal});

  cardList.prepend(cardToAdd);
  evt.target.reset();
  closeModal(cardModal);
}

const cardList = document.querySelector('.places__list');

initialCards.forEach(item => {
  const name = item.name;
  const imageLink = item.link;
  const cardToAdd = createCard({name, imageLink, deleteCallback: deleteCard, likeCallback: likeCard, imageCallback: openImageModal});
  cardList.append(cardToAdd);
})

const cardNameInput = document.querySelector('.popup__input_type_card-name'); 
const cardImageInput = document.querySelector('.popup__input_type_url');

const editModal = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');

const profileNameInput = editModal.querySelector('.popup__input_type_name');
const profileJobInput = editModal.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

editButton.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileDescription.textContent;
  openModal(editModal);
})

const cardModal = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');

addButton.addEventListener('click', () => {
  openModal(cardModal);
})

const imageModal = document.querySelector('.popup_type_image');
const popupImage = imageModal.querySelector('.popup__image');
const popupCaption = imageModal.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');

popups.forEach(popup => {
  const button = popup.querySelector('.popup__close');
  
  popup.addEventListener('click', closeModalOnOverlay);
  button.addEventListener('click', () => {
    closeModal(popup);
  })

  popup.classList.add('popup_is-animated');
})

const formElementEdit = document.querySelector('.popup_type_edit .popup__form');
formElementEdit.addEventListener('submit', changeProfileOnsubmit);

const formElementNewCard = document.querySelector('.popup_type_new-card .popup__form');
formElementNewCard.addEventListener('submit', addCardOnSubmit);
