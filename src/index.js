require('./pages/index.css');
import { createCard, deleteCard, likeCard } from './components/card';
import { openModal, closeModal, closeModalOnOverlay} from './components/modal';
import {enableValidation, clearValidation} from './validation';
import { getProfile, getInitialCards, patchProfile, postCard, deleteCardFetch, likeCardFetch, unlikeCardFetch, patchProfileImage, errorHandler } from './api';
import { data } from 'autoprefixer';

const openImageModal = (cardName, cardImageLink) => {
  popupCaption.textContent = cardName;
  popupImage.src = cardImageLink;
  popupImage.alt = cardName;
  openModal(imageModal);
}

const toggleButtonState = (submitButton, loadText, readyText) => {
  if (submitButton.textContent === readyText) {
    submitButton.textContent = loadText;
  } else {
    submitButton.textContent = readyText;
  }
}

const changeProfileOnsubmit = (evt) => {
  evt.preventDefault();
  const name = profileNameInput.value;
  const descriprtion = profileJobInput.value;
  toggleButtonState(profileSubmitButton, 'Сохранение...', 'Сохранить');
  
  patchProfile(name, descriprtion)
  .then(data => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editModal);
  })
  .catch(err => errorHandler(err))
  .finally(() => toggleButtonState(profileSubmitButton, 'Сохранение...', 'Сохранить'))
}

const changeProfileImageOnSubmit = (evt) => {
  evt.preventDefault();
  toggleButtonState(editImageSubmitButton, 'Сохранение...', 'Сохранить');
  
  const avatar = profileImageInput.value;
  patchProfileImage(avatar)
  .then(() => {
    return getProfile()
  })
  .then(data => {
    profileImage.style['background-image'] = `url(${data.avatar})`;
    closeModal(editImageModal);
    formElementEditImage.reset();
  })
  .catch(err => errorHandler(err))
  .finally(() => toggleButtonState(editImageSubmitButton, 'Сохранение...', 'Сохранить'))
}

const addCardOnSubmit = (evt) => {
  evt.preventDefault();
  const name = cardNameInput.value;
  const imageLink = cardImageInput.value;
  toggleButtonState(cardSubmitButton, 'Сохранение...', 'Сохранить');
  
  postCard(name, imageLink)
  .then(data => {
    if (data) {
      const cardToAdd = createCard({name: data.name, imageLink: data.link, deleteCallback: deleteCardCallback, likeCallback: toggleLikeCallback, imageCallback: openImageModal, likes: data.likes, cardId: data['_id']});
      cardList.prepend(cardToAdd);
      evt.target.reset();
      closeModal(cardModal);
    }
  })
  .catch(err => errorHandler(err))
  .finally(() => toggleButtonState(cardSubmitButton, 'Сохранение...', 'Сохранить'))
}

const deleteCardCallback = (card, cardId) => {
  deleteCardFetch(cardId)
  .then(deleteCard(card))
  .catch(err => errorHandler(err))
}

const toggleLikeCallback = (cardLikeButton, cardId) => {
  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    unlikeCardCallback(cardLikeButton, cardId);
  } else {
    likeCardCallback(cardLikeButton, cardId);
  }
}

const likeCardCallback = (cardLikeButton, cardId) => {
  const card = cardLikeButton.closest('.card');
  likeCardFetch(cardId)
  .then(data => {
    const likesCounter = card.querySelector('.card__likes-counter');
    likeCard(cardLikeButton)
    likesCounter.textContent = data.likes.length;
  })
  .catch(err => errorHandler(err))
}

const unlikeCardCallback = (cardLikeButton, cardId) => {
  const card = cardLikeButton.closest('.card');
  unlikeCardFetch(cardId)
  .then(data => {
    const likesCounter = card.querySelector('.card__likes-counter');
    likeCard(cardLikeButton)
    likesCounter.textContent = data.likes.length;
  })
  .catch(err => errorHandler(err))
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_has-error',
  errorClass: 'popup__error',
  errorClassVisible: 'popup__error_visible'
}

const formElementEdit = document.querySelector('.popup_type_edit .popup__form');
const formElementNewCard = document.querySelector('.popup_type_new-card .popup__form');
const formElementEditImage = document.querySelector('.popup_type_edit-image .popup__form');

const cardList = document.querySelector('.places__list');
const profile = getProfile();
let myId;
const initialCards = getInitialCards();

const cardNameInput = document.querySelector('.popup__input_type_card-name'); 
const cardImageInput = document.querySelector('.popup__input_type_url');


const editModal = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');

const profileNameInput = editModal.querySelector('.popup__input_type_name');
const profileJobInput = editModal.querySelector('.popup__input_type_description');
const profileSubmitButton = editModal.querySelector('.popup__button');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

Promise.all([profile, initialCards])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style['background-image'] = `url(${userData.avatar})`;
    myId = userData['_id'];

  cards.forEach(item => {
    const name = item.name;
    const imageLink = item.link;
    const ownerId = item.owner['_id'];
    const cardToAdd = createCard({name, imageLink, deleteCallback: ownerId === myId ? deleteCardCallback : false, likeCallback: toggleLikeCallback, imageCallback: openImageModal, likes: item.likes, cardId: item['_id']});
    
    if (item.likes.some(like => {                          //Проверяем лайкали мы эту карточку ранее, если да перекрашиваем кнопку лайка
      return like['_id'] === myId;
    })) {
      const cardLikeButton = cardToAdd.querySelector('.card__like-button');
      likeCard(cardLikeButton);
    }

  cardList.append(cardToAdd);
  })
})
.catch(err => errorHandler(err))

editButton.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileDescription.textContent;
  clearValidation(formElementEdit, validationConfig);
  openModal(editModal);
})

const cardModal = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const cardSubmitButton = cardModal.querySelector('.popup__button');

addButton.addEventListener('click', () => {
  formElementNewCard.reset();
  clearValidation(formElementNewCard, validationConfig);
  openModal(cardModal);
});


const imageModal = document.querySelector('.popup_type_image');
const popupImage = imageModal.querySelector('.popup__image');
const popupCaption = imageModal.querySelector('.popup__caption');

const editImageModal = document.querySelector('.popup_type_edit-image');
const profileImageInput = editImageModal.querySelector('.popup__input_type_image');
const editImageSubmitButton = editImageModal.querySelector('.popup__button');
profileImage.addEventListener('click', () => {
  formElementEditImage.reset();
  clearValidation(formElementEditImage, validationConfig);
  openModal(editImageModal);
});

const popups = document.querySelectorAll('.popup');

popups.forEach(popup => {
  const button = popup.querySelector('.popup__close');
  
  popup.addEventListener('click', closeModalOnOverlay);
  button.addEventListener('click', () => {
    closeModal(popup);
  })
  
  popup.classList.add('popup_is-animated');
})

formElementEdit.addEventListener('submit', changeProfileOnsubmit);
formElementNewCard.addEventListener('submit', addCardOnSubmit);
formElementEditImage.addEventListener('submit', changeProfileImageOnSubmit);

enableValidation(validationConfig);
