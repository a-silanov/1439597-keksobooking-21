'use strict';

(function () {
  var errorModal = document.querySelector('#error').content.querySelector('.error');
  var message = errorModal.querySelector('.error__message');
  var errorButton = errorModal.querySelector('.error__button');
  var successModal = document.querySelector('#success').content.querySelector('.success');

  var hideErrorModalHandler = function () {
    errorModal.remove();
    document.removeEventListener('mousedown', hideErrorModalHandler);
    errorButton.removeEventListener('click', hideErrorModalHandler);
  };

  var hideSuccessModalHandler = function () {
    successModal.remove();
    document.removeEventListener('mousedown', hideSuccessModalHandler);
  };

  var error = function (errorMassage) {
    message.textContent = errorMassage;
    document.querySelector('main').insertAdjacentElement('afterbegin', errorModal);
    document.addEventListener('mousedown', hideErrorModalHandler);
    errorButton.addEventListener('click', hideErrorModalHandler);
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        hideErrorModalHandler();
      }
    });
  };

  var success = function () {
    document.querySelector('main').insertAdjacentElement('afterbegin', successModal);
    document.addEventListener('mousedown', hideSuccessModalHandler);
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        hideSuccessModalHandler();
      }
    });
  };

  window.message = {
    error: error,
    success: success
  };
})();
