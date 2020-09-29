'use strict';

var rentObjectType = ['palace', 'flat', 'house', 'bungalo'];
var rentObjectCheckTime = ['12:00', '13:00', '14:00'];
var rentObjectFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var ROOMS = 10;
var GUESTS = 5;
var countRentObjects = 8;

var showMap = function () {
  map.classList.remove('map--faded');
};

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
};

var getCurrentObjectFeatures = function (ObjectFeatures) {
  var currentObjectFeatures = [];

  for (var i = 0; i < ObjectFeatures.length; i++) {
    var sendIndex = getRandomInt(2);

    if (sendIndex === 1) {
      currentObjectFeatures.push(ObjectFeatures[i]);
    }
  }

  if (currentObjectFeatures.length === 0) {
    currentObjectFeatures.push(getRandomInt(ObjectFeatures.length));
  }

  return currentObjectFeatures;
};


var getCurrentObjectPhotos = function (count) {
  var currentObjectPhotos = [];

  for (var i = 0; i < getRandomInt(count); i++) {
    currentObjectPhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg');
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
      type: rentObjectType[getRandomInt(rentObjectType.length)],
      rooms: getRandomInt(ROOMS),
      guests: getRandomInt(GUESTS),
      checkin: rentObjectCheckTime[getRandomInt(rentObjectCheckTime.length)],
      checkout: rentObjectCheckTime[getRandomInt(rentObjectCheckTime.length)],
      features: getCurrentObjectFeatures(rentObjectFeatures),
      description: 'Very good place',
      photos: getCurrentObjectPhotos(5)
    };

    rentObjects[i].location = {
      x: getRandomInt(map.offsetWidth),
      y: getRandomInt(map.offsetHeight)
    };

    if (rentObjects[i].location.y < 175) {
      rentObjects[i].location.y = 175;
    }
  }

  return rentObjects;
};

var showPins = function () {
  var fragment = document.createDocumentFragment();
  var rentObjects = getRentObjects(countRentObjects);

  for (var i = 0; i < rentObjects.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');

    pinElement.style = 'left: ' + (rentObjects[i].location.x - 50) + 'px; top:' + (rentObjects[i].location.y - 70) + 'px;';
    pinImage.src = rentObjects[i].author.avatar;
    pinImage.alt = rentObjects[i].offer.title;

    fragment.appendChild(pinElement);
  }

  mapPins.appendChild(fragment);
};

showPins();
showMap();
