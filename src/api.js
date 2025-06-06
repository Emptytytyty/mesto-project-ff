const cohortId = 'wff-cohort-39';
const authorizationToken = '9d29cde5-0e1d-4122-9a30-6c4600aaebc9';
const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: authorizationToken,
    'Content-Type': 'application/json'
  }
}

const getResponseData = (res) => {
  if (res.ok) {
    return res.json()
  }

  return Promise.reject(`ERROR: ${res.status}`)
}

const errorHandler = (err) => {
  console.log(`Error: ${err}`)
}

const getProfile = () => {
  return  fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => getResponseData(res))
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => getResponseData(res))
}

const patchProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => getResponseData(res))
}

const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => getResponseData(res))
}

const deleteCardFetch = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
}

const likeCardFetch = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => getResponseData(res))
}

const unlikeCardFetch = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => getResponseData(res))
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
  return checkIsImage(avatar)
  .then(() => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({avatar})
    })
  })
}

module.exports = { getProfile, getInitialCards, patchProfile, postCard, deleteCardFetch, likeCardFetch, unlikeCardFetch, patchProfileImage, errorHandler}