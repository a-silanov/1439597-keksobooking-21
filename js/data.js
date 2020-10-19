'use strict';

(function () {
  var rentObjectType = ['palace', 'flat', 'house', 'bungalo'];
  var rentObjectCheckTime = ['12:00', '13:00', '14:00'];
  var rentObjectFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var ROOMS = 10;
  var GUESTS = 5;
  var countPhotos = 5;
  var countRentObjects = 8;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 80;
  var map = document.querySelector('.map');

  var getCurrentObjectFeatures = function (ObjectFeatures) {
    var currentObjectFeatures = [];

    for (var i = 0; i < ObjectFeatures.length; i++) {
      currentObjectFeatures.push(ObjectFeatures[i]);
    }

    return window.util.getRandomSlicedArray(currentObjectFeatures);
  };

  var getCurrentObjectPhotos = function (count) {
    var currentObjectPhotos = [];

    for (var k = 0; k < window.util.getRandomInt(count); k++) {
      currentObjectPhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + (k + 1) + '.jpg');
    }

    return currentObjectPhotos;
  };

  var getRentObjects = function (count) {
    var rentObjects = [];

    for (var i = 0; i < count; i++) {
      rentObjects[i] = {};

      rentObjects[i].author = {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      };

      rentObjects[i].offer = {
        title: 'Apartment #' + (i + 1),
        address: ((i + 1) * 100) + ', ' + ((i + 1) * 50),
        price: Math.floor(10000 / (i + 1)),
        type: rentObjectType[window.util.getRandomInt(rentObjectType.length)],
        rooms: window.util.getRandomInt(ROOMS),
        guests: window.util.getRandomInt(GUESTS),
        checkin: rentObjectCheckTime[window.util.getRandomInt(rentObjectCheckTime.length)],
        checkout: rentObjectCheckTime[window.util.getRandomInt(rentObjectCheckTime.length)],
        features: getCurrentObjectFeatures(rentObjectFeatures),
        description: 'Very good place',
        photos: getCurrentObjectPhotos(countPhotos)
      };

      rentObjects[i].location = {
        x: window.util.getRandomInt(map.offsetWidth),
        y: window.util.getRandomInt(map.offsetHeight)
      };

      if (rentObjects[i].location.y < 175) {
        rentObjects[i].location.y = 175;
      }
    }

    return rentObjects;
  };

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
    getRentObjects: getRentObjects
  };
})();
