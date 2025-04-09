// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(cardName, cardImageLink, deleteCallback) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage =  newCard.querySelector('.card__image');
  const cardTitle =  newCard.querySelector('.card__title');

  cardTitle.textContent = cardName;
  cardImage.src = cardImageLink;
  cardImage.alt = cardName;

  const cardDeleteButton = newCard.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', deleteCallback);

  return newCard;
};

// @todo: Функция удаления карточки
function deleteCard () {
  this.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
  const cardToAdd = createCard(item.name, item.link, deleteCard);
  document.querySelector('.places__list').append(cardToAdd);
})