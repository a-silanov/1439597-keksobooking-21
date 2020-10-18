'use strict';

var rentObjectType = ['palace', 'flat', 'house', 'bungalo'];
var rentObjectCheckTime = ['12:00', '13:00', '14:00'];
var rentObjectFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var ROOMS = 10;
var GUESTS = 5;
var countPhotos = 5;
var countRentObjects = 8;
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 80;
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var form = document.querySelector('.ad-form');
var formFieldsets = form.querySelectorAll('fieldset');
var addressInput = form.querySelector('#address');
var titleInput = form.querySelector('#title');
var priceInput = form.querySelector('#price');
var typeInput = form.querySelector('#type');
var timeInInput = form.querySelector('#timein');
var timeOutInput = form.querySelector('#timeout');
var roomsInput = form.querySelector('#room_number');
var guestsInput = form.querySelector('#capacity');
var avatarInput = form.querySelector('#avatar');
var roomPictureInput = form.querySelector('#images');
var mapFilters = document.querySelector('.map__filters');
var mapFiltersElements = mapFilters.childNodes;
var mainPin = map.querySelector('.map__pin--main');

var showMap = function () {
  showPins();

  form.classList.remove('ad-form--disabled');
  enableElements(formFieldsets);

  enableElements(mapFiltersElements);

  map.classList.remove('map--faded');
  mainPin.removeEventListener('mousedown', showMapHandler);
};

var disableElements = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].nodeName !== '#text') {
      arr[i].setAttribute('disabled', true);
    }
  }
};

var showMapHandler = function (evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    showMap();

    addressInput.value = getAddress(mainPin);

    titleInput.addEventListener('invalid', elementLengthValidationHandler);
    titleInput.addEventListener('input', elementInputCheckHandler);
    priceInput.addEventListener('invalid', priceMaxMinValidationHandler);
    priceInput.addEventListener('input', elementMaxMinInputCheckHandler);
    typeInput.addEventListener('change', selectChangeHandler);
    timeOutInput.addEventListener('change', timeCheckHandler);
    timeInInput.addEventListener('change', timeCheckHandler);
    roomsInput.addEventListener('change', compareRoomsGuestsHandler);
    guestsInput.addEventListener('change', compareRoomsGuestsHandler);
    avatarInput.addEventListener('input', checkFileTypeHandler);
    roomPictureInput.addEventListener('input', checkFileTypeHandler);
  }
};

var getAddress = function (element) {
  var elementPositionX = element.style.left;
  var elementPositionY = element.style.top;
  var addressX = '';
  var addressY = '';

  for (var i = 0; i < elementPositionX.length - 2; i++) {
    addressX += elementPositionX[i];
  }

  addressX = Number(addressX) + MAIN_PIN_WIDTH / 2;

  for (var j = 0; j < elementPositionY.length - 2; j++) {
    addressY += Number(elementPositionY[j]);
  }

  addressY = Number(addressY) + MAIN_PIN_HEIGHT;

  return addressX + ' ' + addressY;
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

var getCurrentObjectFeatures = function (ObjectFeatures) {
  var currentObjectFeatures = [];

  for (var i = 0; i < ObjectFeatures.length; i++) {
    currentObjectFeatures.push(ObjectFeatures[i]);
  }

  return getRandomSlicedArray(currentObjectFeatures);
};

var getCurrentObjectPhotos = function (count) {
  var currentObjectPhotos = [];

  for (var k = 0; k < getRandomInt(count); k++) {
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
      type: rentObjectType[getRandomInt(rentObjectType.length)],
      rooms: getRandomInt(ROOMS),
      guests: getRandomInt(GUESTS),
      checkin: rentObjectCheckTime[getRandomInt(rentObjectCheckTime.length)],
      checkout: rentObjectCheckTime[getRandomInt(rentObjectCheckTime.length)],
      features: getCurrentObjectFeatures(rentObjectFeatures),
      description: 'Very good place',
      photos: getCurrentObjectPhotos(countPhotos)
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
    var rentObject = rentObjects[i];
    var pinElement = pinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');

    pinElement.style = 'left: ' + (rentObject.location.x - 50) + 'px; top:' + (rentObject.location.y - 70) + 'px;';
    pinImage.src = rentObject.author.avatar;
    pinImage.alt = rentObject.offer.title;

    pinElement.addEventListener('click', showCardHandler(rentObject));

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

  featureTemplate.classList.remove('popup__feature--wifi');

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

var createCard = function (cardObject) {
  var fragment = document.createDocumentFragment();
  var currentCard = cardTemplate.cloneNode(true);
  currentCard.querySelector('.popup__title').textContent = cardObject.offer.title;
  currentCard.querySelector('.popup__text--address').textContent = cardObject.offer.address;
  currentCard.querySelector('.popup__text--price').textContent = cardObject.offer.price + '₽/ночь';
  currentCard.querySelector('.popup__type').textContent = getOfferType(cardObject);
  currentCard.querySelector('.popup__text--capacity').textContent = cardObject.offer.rooms + ' комнаты для ' + cardObject.offer.guests + ' гостей';
  currentCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardObject.offer.checkin + ', выезд до ' + cardObject.offer.checkout;
  getCurrentObjectFeaturesList(cardObject.offer.features, currentCard);
  currentCard.querySelector('.popup__description').textContent = cardObject.offer.description;
  renderPhotos(cardObject.offer.photos, currentCard);
  currentCard.querySelector('.popup__avatar').src = cardObject.author.avatar;

  fragment.appendChild(currentCard);

  map.insertBefore(fragment, map.querySelector('.map__filters-container'));
  window.addEventListener('keydown', closePopupByKeyHandler);
  map.querySelector('.popup__close').addEventListener('click', closePopupHandler);
};

var showCardHandler = function (cardObject) {
  return function () {
    closePopupHandler();
    createCard(cardObject);
  };
};

var closePopupByKeyHandler = function (evt) {
  if (evt.key === 'Escape') {
    closePopupHandler();
  }
};

var closePopupHandler = function () {
  var currentPopup = map.querySelector('.map__card');

  if (currentPopup) {
    document.querySelector('.popup__close').removeEventListener('click', closePopupHandler);
    window.removeEventListener('keydown', closePopupByKeyHandler);
    currentPopup.remove();
  }
};

var elementLengthValidationHandler = function (evt) {
  var target = evt.target;

  if (target.validity.tooShort) {
    target.setCustomValidity('Это поле должно состоять минимум из ' + target.minLength + ' символов.');
  } else if (target.validity.tooLong) {
    target.setCustomValidity('Это поле должно состоять максимум из ' + target.maxLength + ' символов.');
  } else if (target.validity.valueMissing) {
    target.setCustomValidity('Обязательное поле');
  } else {
    target.setCustomValidity('');
  }
};

var elementInputCheckHandler = function (evt) {
  var target = evt.target;

  if (target.value.length < target.minLength) {
    target.setCustomValidity('Это поле должно состоять минимум из ' + target.minLength + ' символов.');
  } else {
    target.setCustomValidity('');
  }
};

var priceMaxMinValidationHandler = function () {
  var price = Number(priceInput.value);
  var priceMin = Number(priceInput.min);
  var priceMax = Number(priceInput.max);

  if (priceInput.value === '') {
    priceInput.setCustomValidity('Обязательное поле');
  } else if (price < priceMin) {
    priceInput.setCustomValidity('Значение этого поля не должно быть выше чем ' + priceInput.min);
  } else if (price > priceMax) {
    priceInput.setCustomValidity('Значение этого поля не должно быть ниже чем ' + priceInput.max);
  } else {
    priceInput.setCustomValidity('');
  }
};

var elementMaxMinInputCheckHandler = function (evt) {
  var target = evt.target;

  if (target.value === '') {
    target.setCustomValidity('Обязательное поле');
  } else if (target.value > target.min || target.value < target.max) {
    target.setCustomValidity('');
  }
};

var selectChangeHandler = function (evt) {
  var target = evt.target;

  if (target.value === 'bungalo') {
    priceInput.min = 0;
  } else if (target.value === 'flat') {
    priceInput.min = 1000;
  } else if (target.value === 'house') {
    priceInput.min = 5000;
  } else if (target.value === 'palace') {
    priceInput.min = 10000;
  }

  priceInput.placeholder = priceInput.min;
};

var timeCheckHandler = function (evt) {
  var chosenInput = (evt.target === timeInInput) ? timeInInput : timeOutInput;
  var remainingInput = (evt.target === timeInInput) ? timeOutInput : timeInInput;

  if (chosenInput.value === '12:00') {
    remainingInput.value = chosenInput.value;
  } else if (chosenInput.value === '13:00') {
    remainingInput.value = chosenInput.value;
  } else if (chosenInput.value === '14:00') {
    remainingInput.value = chosenInput.value;
  }
};

var compareRoomsGuestsHandler = function () {
  var errorMassage = '';
  var rooms = Number(roomsInput.value);
  var guests = Number(guestsInput.value);

  if (rooms < guests) {
    errorMassage = 'Количество комнат должно быть больше или равно количеству гостей';
  } else if (rooms === 100 && guests !== 0) {
    errorMassage = 'Столько комнат - не для гостей';
  }

  roomsInput.setCustomValidity(errorMassage);
};

var checkFileTypeHandler = function (evt) {
  var target = evt.target;
  var fileType = '';

  for (var i = target.value.length - 4; i < target.value.length; i++) {
    fileType += target.value[i];
  }

  if (fileType !== '.png' || fileType !== '.jpg') {
    target.setCustomValidity('Выберите файлы изображений с разрешением ".png" или ".jpg"');
  }
};

var getInitialState = function () {
  disableElements(formFieldsets);
  disableElements(mapFiltersElements);

  mainPin.addEventListener('mousedown', showMapHandler);
  mainPin.addEventListener('keydown', showMapHandler);

};

getInitialState();
