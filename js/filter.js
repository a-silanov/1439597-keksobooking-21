'use strict';

(function () {
  var filterFormElement = document.querySelector('.map__filters');
  var typeFilterElement = filterFormElement.querySelector('#housing-type');
  var priceFilterElement = filterFormElement.querySelector('#housing-price');
  var roomsFilterElement = filterFormElement.querySelector('#housing-rooms');
  var guestsFilterElement = filterFormElement.querySelector('#housing-guests');

  var featuresFieldElement = filterFormElement.querySelector('#housing-features');
  var wifiFilterElement = featuresFieldElement.querySelector('#filter-wifi');
  var dishwasherFilterElement = featuresFieldElement.querySelector('#filter-dishwasher');
  var parkingFilterElement = featuresFieldElement.querySelector('#filter-parking');
  var washerFilterElement = featuresFieldElement.querySelector('#filter-washer');
  var elevatorFilterElement = featuresFieldElement.querySelector('#filter-elevator');
  var conditionerFilterElement = featuresFieldElement.querySelector('#filter-conditioner');
  var lastTimeout;

  var isFeaturesMatched = function (arr, filterValue) {
    var reply = false;

    reply = arr.some(function (element) {
      return element === filterValue;
    });

    return reply;
  };

  var filterAdvertisement = function (arr) {
    var filteredArray = arr;

    if (typeFilterElement.value !== 'any') {
      filteredArray = filteredArray.filter(function (element) {
        return element.offer.type === typeFilterElement.value;
      });
    }

    if (priceFilterElement.value === 'low') {
      filteredArray = filteredArray.filter(function (element) {
        return element.offer.price < 10000;
      });
    } else if (priceFilterElement.value === 'middle') {
      filteredArray = filteredArray.filter(function (element) {
        return element.offer.price >= 10000 && element.offer.price < 50000;
      });
    } else if (priceFilterElement.value === 'high') {
      filteredArray = filteredArray.filter(function (element) {
        return element.offer.price >= 50000;
      });
    }

    if (roomsFilterElement.value !== 'any') {
      filteredArray = filteredArray.filter(function (element) {
        return Number(element.offer.rooms) === Number(roomsFilterElement.value);
      });
    }

    if (guestsFilterElement.value !== 'any') {
      filteredArray = filteredArray.filter(function (element) {
        return Number(element.offer.capacity) === Number(guestsFilterElement.value);
      });
    }

    if (wifiFilterElement.checked) {
      filteredArray = filteredArray.filter(function (element) {
        return isFeaturesMatched(element.offer.features, wifiFilterElement.value);
      });
    }

    if (dishwasherFilterElement.checked) {
      filteredArray = filteredArray.filter(function (element) {
        return isFeaturesMatched(element.offer.features, dishwasherFilterElement.value);
      });
    }

    if (parkingFilterElement.checked) {
      filteredArray = filteredArray.filter(function (element) {
        return isFeaturesMatched(element.offer.features, parkingFilterElement.value);
      });
    }

    if (washerFilterElement.checked) {
      filteredArray = filteredArray.filter(function (element) {
        return isFeaturesMatched(element.offer.features, washerFilterElement.value);
      });
    }

    if (elevatorFilterElement.checked) {
      filteredArray = filteredArray.filter(function (element) {
        return isFeaturesMatched(element.offer.features, elevatorFilterElement.value);
      });
    }

    if (conditionerFilterElement.checked) {
      filteredArray = filteredArray.filter(function (element) {
        return isFeaturesMatched(element.offer.features, conditionerFilterElement.value);
      });
    }

    return filteredArray;
  };

  filterFormElement.addEventListener('change', function () {
    window.card.close();
    window.pin.delete();
    var filteredObjects = filterAdvertisement(window.data.cacheRentObjects);

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.pin.render(filteredObjects);
    }, 500);
  });

  window.filter = {
    use: filterAdvertisement
  };
})();
