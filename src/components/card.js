const cardTemplate = document.querySelector('#card-template').content;

const createCard = ( { name, imageLink, deleteCallback, likeCallback, imageCallback, likes, cardId}) => {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage =  newCard.querySelector('.card__image');
  const cardTitle =  newCard.querySelector('.card__title');
  const likesCounter = newCard.querySelector('.card__likes-counter');

  if (likes) {
    likesCounter.textContent = likes.length;
  }
  cardTitle.textContent = name;
  cardImage.src = imageLink;
  cardImage.alt = name;

  const cardDeleteButton = newCard.querySelector('.card__delete-button');
  
  if (!deleteCallback) {
    cardDeleteButton.style.display = 'none';
  } else {
    cardDeleteButton.addEventListener('click', () => deleteCallback(newCard, cardId));
  }

  const cardLikeButton = newCard.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', () => likeCallback(cardLikeButton, cardId));

  cardImage.addEventListener('click', () => imageCallback(name, imageLink));

  return newCard;
};

const deleteCard = (card) => {
  card.remove();
  if (card.onDelete) { // Обработка колбека (если такой есть) после удаления карточки
    card.onDelete()
  }
}

const likeCard = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
}

module.exports = {deleteCard, createCard, likeCard};