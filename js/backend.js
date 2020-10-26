'use strict';

(function () {
  var loadURL = 'https://js.dump.academy/keksobooking/data';
  var saveURL = 'https://js.dump.academy/keksobooking';
  var serverMessages = {
    connectionError: 'Произошла ошибка соединения',
    timeoutError: 'Запрос не успел выполниться за ',
    timeoutErrorUnits: 'мс',
    replyStatus: 'Статус ответа: '
  };

  var load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';


    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successHandler(xhr.response);
      } else {
        errorHandler(serverMessages.replyStatus + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler(serverMessages.connectionError);
    });
    xhr.addEventListener('timeout', function () {
      errorHandler(serverMessages.timeoutError + xhr.timeout + serverMessages.timeoutErrorUnits);
    });

    xhr.timeout = 10000;

    xhr.open('GET', loadURL);
    xhr.send();
  };

  var save = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successHandler(xhr.response);
      } else {
        errorHandler(serverMessages.replyStatus + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler(serverMessages.connectionError);
    });
    xhr.addEventListener('timeout', function () {
      errorHandler(serverMessages.timeoutError + xhr.timeout + serverMessages.timeoutErrorUnits);
    });

    xhr.timeout = 10000;

    xhr.open('POST', saveURL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
