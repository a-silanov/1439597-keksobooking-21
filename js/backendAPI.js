'use strict';

const StatusCode = {
  OK: 200,
  BAD_REQUEST: 400
};

const TIMEOUT_IN_MS = 10000;
const RESPONSE_TYPE = `json`;
const KEKSOBOOKING_URL = `https://21.javascript.pages.academy/keksobooking`;

const getRequest = (onSuccess, onError) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = RESPONSE_TYPE;
  xhr.timeout = TIMEOUT_IN_MS;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else if (xhr.status === StatusCode.BAD_REQUEST) {
      onError(`Статус ответа: ` + xhr.status + ` ` + JSON.stringify(xhr.response));
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  return xhr;
};

const uploadToServer = (data, onSuccess, onError) => {
  const xhr = getRequest(onSuccess, onError);
  xhr.open(`POST`, KEKSOBOOKING_URL);
  xhr.send(data);
};

const loadFromServer = (onSuccess, onError) => {
  const dataURL = KEKSOBOOKING_URL + `/data`;
  const xhr = getRequest(onSuccess, onError);
  xhr.open(`GET`, dataURL);
  xhr.send();
};

window.backendAPI = {
  load: loadFromServer,
  save: uploadToServer
};
