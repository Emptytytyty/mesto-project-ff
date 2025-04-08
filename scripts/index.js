// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(cardName, cardImageLink, deleteCallback) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__title').textContent = cardName;
  newCard.querySelector('.card__image').src = cardImageLink;

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