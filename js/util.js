'use strict';

(function () {
  var disableElements = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].nodeName !== '#text') {
        arr[i].setAttribute('disabled', true);
      }
    }
  };

  var enableElements = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].nodeName !== '#text') {
        arr[i].removeAttribute('disabled');
      }
    }
  };

  var getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  var getRandomSlicedArray = function (arr) {
    return arr.slice(0, getRandomInt(arr.length) + 1);
  };

  var getAddress = function (element) {
    var elementPositionX = element.style.left;
    var elementPositionY = element.style.top;
    var addressX = '';
    var addressY = '';

    for (var i = 0; i < elementPositionX.length - 2; i++) {
      addressX += elementPositionX[i];
    }

    addressX = Number(addressX) + window.data.MAIN_PIN_WIDTH / 2;

    for (var j = 0; j < elementPositionY.length - 2; j++) {
      addressY += Number(elementPositionY[j]);
    }

    addressY = Number(addressY) + window.data.MAIN_PIN_HEIGHT;

    return addressX + ' ' + addressY;
  };

  window.util = {
    disableElements: disableElements,
    enableElements: enableElements,
    getRandomInt: getRandomInt,
    getRandomSlicedArray: getRandomSlicedArray,
    getAddress: getAddress
  };
})();
