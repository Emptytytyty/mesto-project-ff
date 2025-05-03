const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardName, cardImageLink, deleteCallback, likeCallback, imageCallback) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage =  newCard.querySelector('.card__image');
  const cardTitle =  newCard.querySelector('.card__title');

  cardTitle.textContent = cardName;
  cardImage.src = cardImageLink;
  cardImage.alt = cardName;

  const cardDeleteButton = newCard.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', deleteCallback);

  const cardLikeButton = newCard.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', likeCallback);

  cardImage.addEventListener('click', imageCallback)

  return newCard;
};

function deleteCard () {
  const card = this.closest('.card')
  card.remove();
}

function likeCard () {
  this.classList.toggle('card__like-button_is-active');
}

module.exports = {deleteCard, createCard, initialCards, likeCard};