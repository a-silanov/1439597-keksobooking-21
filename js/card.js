'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderPhotos = function (imgArray, currentCard) {
    var photoWrapper = currentCard.querySelector('.popup__photos');
    var photoTemplate = photoWrapper.querySelector('.popup__photo');

    window.util.removeChildElements(photoWrapper);

    for (var i = 0; i < imgArray.length; i++) {
      var currentImg = photoTemplate.cloneNode(true);

      currentImg.src = imgArray[i];

      photoWrapper.appendChild(currentImg);
    }
  };

  var renderFeaturesList = function (featuresArray, currentCard) {
    var featuresListElement = currentCard.querySelector('.popup__features');
    var featureTemplate = featuresListElement.querySelector('.popup__feature');

    featureTemplate.classList.remove('popup__feature--wifi');

    window.util.removeChildElements(featuresListElement);

    for (var i = 0; i < featuresArray.length; i++) {
      var currentFeature = featureTemplate.cloneNode(true);
      var featureClass = 'popup__feature--' + featuresArray[i];

      currentFeature.classList.add(featureClass);
      currentFeature.textContent = featuresArray[i];

      featuresListElement.appendChild(currentFeature);
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
    currentCard.querySelector('.popup__description').textContent = cardObject.offer.description;
    currentCard.querySelector('.popup__avatar').src = cardObject.author.avatar;
    renderPhotos(cardObject.offer.photos, currentCard);
    renderFeaturesList(cardObject.offer.features, currentCard);

    fragment.appendChild(currentCard);

    mapElement.insertBefore(fragment, mapElement.querySelector('.map__filters-container'));
    window.addEventListener('keydown', closePopupByKeyHandler);
    mapElement.querySelector('.popup__close').addEventListener('click', closePopupHandler);
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
    var currentPopupElement = mapElement.querySelector('.map__card');

    if (currentPopupElement) {
      document.querySelector('.popup__close').removeEventListener('click', closePopupHandler);
      window.removeEventListener('keydown', closePopupByKeyHandler);
      currentPopupElement.remove();
    }
  };

  window.card = {
    show: showCardHandler,
    close: closePopupHandler
  };
})();
