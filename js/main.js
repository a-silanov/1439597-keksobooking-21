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
var BASE_IMAGE_URL = ('http://o0.github.io/assets/images/tokyo/hotel');
var countCards = 1;
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var showMap = function () {
  map.classList.remove('map--faded');
};

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
};

var getCurrentObjectFeatures = function (objectFeatures) {
  var currentObjectFeatures = [];

  for (var i = 0; i < objectFeatures.length; i++) {
    var sendIndex = getRandomInt(2);

    if (sendIndex === 1) {
      currentObjectFeatures.push(objectFeatures[i]);
    }
  }

  if (currentObjectFeatures.length === 0) {
    currentObjectFeatures.push(getRandomInt(objectFeatures.length));
  }

  return currentObjectFeatures;
};


var getCurrentObjectPhotos = function (count) {
  var currentObjectPhotos = [];

  for (var i = 0; i < getRandomInt(count); i++) {
    currentObjectPhotos.push(BASE_IMAGE_URL + (i + 1) + '.jpg');
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

var renderPhotos = function (imgArray, currentCard) {
  var photoWrapper = currentCard.querySelector('.popup__photos');
  var photoTemplate = photoWrapper.querySelector('.popup__photo');

  while (photoWrapper.firstChild) {
    photoWrapper.removeChild(photoWrapper.firstChild);
  }

  for (var i = 0; i < imgArray.length; i++) {
    var currentImg = photoTemplate.cloneNode(true);

    currentImg.src = imgArray[i];

    photoWrapper.appendChild(currentImg);
  }
};

var getCurrentObjectFeaturesList = function (featuresArray, currentCard) {
  var featuresList = currentCard.querySelector('.popup__features');
  var featureTemplate = featuresList.querySelector('.popup__feature');

  featureTemplate.classList.remove('popup__feature--wifi'); // НУжно ли делать более универсально?

  while (featuresList.firstChild) {
    featuresList.removeChild(featuresList.firstChild);
  }

  for (var i = 0; i < featuresArray.length; i++) {
    var currentFeature = featureTemplate.cloneNode(true);
    var featureClass = 'popup__feature--' + featuresArray[i];

    currentFeature.classList.add(featureClass);
    currentFeature.textContent = featuresArray[i];

    featuresList.appendChild(currentFeature);
  }
};

var getOfferType = function (card) {
  var objectType = '';

  if (card.offer.type === 'flat') {
    objectType = 'Квартира';
  } else if (card.offer.type === 'bungalo') {
    objectType = 'Бунгало';
  } else if (card.offer.type === 'house') {
    objectType = 'Дом';
  } else if (card.offer.type === 'palace') {
    objectType = 'Дворец';
  }

  return objectType;
};

var createCard = function (count) {
  var fragment = document.createDocumentFragment();
  var rentObjects = getRentObjects(count);

  for (var i = 0; i < rentObjects.length; i++) {
    var currentCard = cardTemplate.cloneNode(true);

    currentCard.querySelector('.popup__title').textContent = rentObjects[i].offer.title;
    currentCard.querySelector('.popup__text--address').textContent = rentObjects[i].offer.address;
    currentCard.querySelector('.popup__text--price').textContent = rentObjects[i].offer.price + '₽/ночь';
    currentCard.querySelector('.popup__type').textContent = getOfferType(rentObjects[i]);
    currentCard.querySelector('.popup__text--capacity').textContent = rentObjects[i].offer.rooms + ' комнаты для ' + rentObjects[i].offer.guests + ' гостей';
    currentCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + rentObjects[i].offer.checkin + ', выезд до ' + rentObjects[i].offer.checkout;
    getCurrentObjectFeaturesList(rentObjects[i].offer.features, currentCard);
    currentCard.querySelector('.popup__description').textContent = rentObjects[i].offer.description;
    renderPhotos(rentObjects[i].offer.photos, currentCard);
    currentCard.querySelector('.popup__avatar').src = rentObjects[i].author.avatar;

    fragment.appendChild(currentCard);
  }

  map.insertBefore(fragment, map.querySelector('.map__filters-container'));
};

showPins();
showMap();
createCard(countCards);
