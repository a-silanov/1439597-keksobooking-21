'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
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

  var setFormHandlers = function () {
    addressInput.value = window.util.getAddress(mainPin);

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
  };

  window.form = {
    setHandlers: setFormHandlers
  };
})();
