'use strict';

(function () {
  var rentObjectType = ['palace', 'flat', 'house', 'bungalo'];
  var rentObjectCheckTime = ['12:00', '13:00', '14:00'];
  var rentObjectFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ROOMS = 10;
  var GUESTS = 5;
  var countPhotos = 5;
  var countRentObjects = 8;
  var MAX_PINS_QUANTITY = 5;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 80;
  var cacheRentObjects = null;

  window.data = {
    rentObjectType: rentObjectType,
    rentObjectCheckTime: rentObjectCheckTime,
    rentObjectFeatures: rentObjectFeatures,
    ROOMS: ROOMS,
    GUESTS: GUESTS,
    countPhotos: countPhotos,
    countRentObjects: countRentObjects,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAX_PINS_QUANTITY: MAX_PINS_QUANTITY,
    cacheRentObjects: cacheRentObjects
  };
})();
