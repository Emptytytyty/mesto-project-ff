const cohortId = 'wff-cohort-39';
const authorizationToken = '9d29cde5-0e1d-4122-9a30-6c4600aaebc9';
const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: authorizationToken,
    'Content-Type': 'application/json'
  }
}
const getProfile = () => {
  return  fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`ERROR: ${res.status}`)
  })
  .catch(err => {
    console.log(err)
  })
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`ERROR: ${res.status}`)
  })
  .catch(err => {
    console.log(err);
  })
}

const patchProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  }).then(res => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`ERROR: ${res.status}`)
  })
  .catch(err => {
    console.log(err);
  })
}

const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  }).then(res => {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`post card error: ${res.status}`)
  }).catch(err => {
    console.log(err)
  })
}

const deleteCardFetch = (card) => {
  const cardId = card.dataset.cardId;
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .catch(err => {
    console.log(err);
  })
}

const likeCardFetch = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).catch(err => {
    console.log(err);
  })
}

const unlikeCardFetch = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).catch(err => {
    console.log(err);
  })
}

const checkIsImage = (url) => {
  return fetch(url, {
    method: 'HEAD',
  })
  .then(res => {
    if (res.ok) {
      const mimeType = res.headers.get('Content-Type');
      if (mimeType.split('/')[0] === 'image') return res
    }

    return Promise.reject(`Entered invalid url`)
  })
}

const patchProfileImage = (avatar) => {
  return checkIsImage(avatar).then(() => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({avatar})
    })
    .catch(err => {
      console.log(`Change profile Image error: ${err}`)
    })
  })
}

module.exports = { getProfile, getInitialCards, patchProfile, postCard, deleteCardFetch, likeCardFetch, unlikeCardFetch, patchProfileImage}