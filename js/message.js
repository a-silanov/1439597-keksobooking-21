'use strict';

(function () {
  var errorModalElement = document.querySelector('#error').content.querySelector('.error');
  var messageElement = errorModalElement.querySelector('.error__message');
  var errorButtonElement = errorModalElement.querySelector('.error__button');
  var successModalElement = document.querySelector('#success').content.querySelector('.success');

  var hideErrorModalHandler = function () {
    errorModalElement.remove();
    document.removeEventListener('mousedown', hideErrorModalHandler);
    errorButtonElement.removeEventListener('click', hideErrorModalHandler);
    document.removeEventListener('keydown', keydownErrorHandler);
  };

  var hideSuccessModalHandler = function () {
    successModalElement.remove();
    document.removeEventListener('mousedown', hideSuccessModalHandler);
    document.removeEventListener('keydown', keydownSuccessHandler);
  };

  var keydownErrorHandler = function (evt) {
    if (evt.key === 'Escape') {
      hideErrorModalHandler();
    }
  };

  var keydownSuccessHandler = function (evt) {
    if (evt.key === 'Escape') {
      hideSuccessModalHandler();
    }
  };

  var showError = function (errorMassage) {
    messageElement.textContent = errorMassage;
    document.querySelector('main').insertAdjacentElement('afterbegin', errorModalElement);
    document.addEventListener('mousedown', hideErrorModalHandler);
    errorButtonElement.addEventListener('click', hideErrorModalHandler);
    document.addEventListener('keydown', keydownErrorHandler);
  };

  var showSuccess = function () {
    document.querySelector('main').insertAdjacentElement('afterbegin', successModalElement);
    document.addEventListener('mousedown', hideSuccessModalHandler);
    document.addEventListener('keydown', keydownSuccessHandler);
  };

  window.message = {
    error: showError,
    success: showSuccess
  };
})();
