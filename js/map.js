'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mainPinElement = mapElement.querySelector('.map__pin--main');
  var formElement = document.querySelector('.ad-form');
  var formFieldsetElements = formElement.querySelectorAll('fieldset');
  var mapFilterElements = document.querySelector('.map__filters');
  var mapFiltersElements = mapFilterElements.childNodes;
  var mapFiltersContainerElement = mapElement.querySelector('.map__filters-container');
  var addressInputElement = formElement.querySelector('#address');
  var mainPinDefaultCoordinates = null;

  var getMainPinDefaultCoordinates = function () {
    mainPinDefaultCoordinates = {
      x: mainPinElement.style.left,
      y: mainPinElement.style.top
    };
  };

  var setMainPinDefaultCoordinates = function () {
    mainPinElement.style.left = mainPinDefaultCoordinates.x;
    mainPinElement.style.top = mainPinDefaultCoordinates.y;
  };


  var pinMoveHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPinElement.style.top = (mainPinElement.offsetTop - shift.y) + 'px';
      mainPinElement.style.left = (mainPinElement.offsetLeft - shift.x) + 'px';


      if (mainPinElement.offsetLeft > mapElement.offsetWidth - mainPinElement.offsetWidth) {
        mainPinElement.style.left = (mapElement.offsetWidth - mainPinElement.offsetWidth) + 'px';
      } else if (mainPinElement.offsetTop > mapElement.offsetHeight - mainPinElement.offsetHeight) {
        mainPinElement.style.top = (mapElement.offsetHeight - mainPinElement.offsetHeight) + 'px';
      } else if (mainPinElement.offsetTop < mapElement.offsetTop) {
        mainPinElement.style.top = mapElement.offsetTop + 'px';
      } else if (mainPinElement.offsetLeft < mapElement.offsetTop) {
        mainPinElement.style.left = mapElement.offsetTop + 'px';
      }
    };

    var mouseUpHandler = function (evtUp) {
      evtUp.preventDefault();

      addressInputElement.value = window.util.getAddress(mainPinElement);

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var successHandler = function (data) {
    window.data.cacheRentObjects = data;
    var filteredData = window.filter.advertisement(data);

    window.pin.render(filteredData);
    window.util.enableElements(mapFiltersElements);
    mapFiltersContainerElement.classList.remove('hidden');
  };

  var showMap = function () {
    window.backend.load(successHandler, window.message.error);

    formElement.classList.remove('ad-form--disabled');
    window.util.enableElements(formFieldsetElements);


    mapElement.classList.remove('map--faded');
    mainPinElement.removeEventListener('mousedown', showMapHandler);
    mainPinElement.removeEventListener('keydown', showMapHandler);
  };

  var showMapHandler = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      showMap();

      window.form.setHandlers();
    }
  };

  var getInitialState = function () {
    mainPinElement.removeEventListener('mousedown', pinMoveHandler);
    setMainPinDefaultCoordinates();
    window.util.disableElements(formFieldsetElements);
    window.util.disableElements(mapFiltersElements);
    formElement.classList.add('ad-form--disabled');
    mapElement.classList.add('map--faded');
    mapFiltersContainerElement.classList.add('hidden');

    mainPinElement.addEventListener('mousedown', showMapHandler);
    mainPinElement.addEventListener('keydown', showMapHandler);
    mainPinElement.addEventListener('mousedown', pinMoveHandler);
  };

  window.map = {
    getInitialState: getInitialState,
    getMainPinDefaultCoordinates: getMainPinDefaultCoordinates
  };

})();
