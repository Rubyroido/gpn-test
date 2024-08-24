const URL = 'http://localhost:3000/';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

function getData(offset, limit) {
  return fetch(`${URL}?offset=${offset}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      return checkResponse(res)
    })
}

export { getData };