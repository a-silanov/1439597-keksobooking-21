'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var formElement = document.querySelector('.ad-form');
  var titleInputElement = formElement.querySelector('#title');
  var priceInputElement = formElement.querySelector('#price');
  var typeInputElement = formElement.querySelector('#type');
  var timeInInputElement = formElement.querySelector('#timein');
  var timeOutInputElement = formElement.querySelector('#timeout');
  var roomsInputElement = formElement.querySelector('#room_number');
  var guestsInputElement = formElement.querySelector('#capacity');
  var avatarInputElement = formElement.querySelector('#avatar');
  var avatarImageElement = formElement.querySelector('.ad-form-header__preview').querySelector('img');
  var roomPictureInputElement = formElement.querySelector('#images');
  var roomPictureElement = formElement.querySelector('.ad-form__photo');
  var resetButtonElement = formElement.querySelector('.ad-form__reset');
  var descriptionInputElement = formElement.querySelector('#description');

  var resetForm = function () {
    var empty = '';

    titleInputElement.value = empty;
    priceInputElement.value = empty;
    descriptionInputElement.value = empty;
  };

  var checkEndOfFile = function (fileName) {
    return FILE_TYPES.some(function (element) {
      return fileName.endsWith(element);
    });
  };

  var showAvatarHandler = function () {
    var file = avatarInputElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = checkEndOfFile(fileName);

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarImageElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var showRoomPicsHandler = function () {
    var file = roomPictureInputElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = checkEndOfFile(fileName);

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var roomPic = document.createElement('img');

        roomPic.width = '70';
        roomPic.height = '70';
        roomPic.src = reader.result;

        roomPictureElement.appendChild(roomPic);
      });

      reader.readAsDataURL(file);
    }
  };

  var formResetHandler = function (evt) {
    evt.preventDefault();
    resetForm();
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
    var price = Number(priceInputElement.value);
    var priceMin = Number(priceInputElement.min);
    var priceMax = Number(priceInputElement.max);

    if (priceInputElement.value === '') {
      priceInputElement.setCustomValidity('Обязательное поле');
    } else if (price < priceMin) {
      priceInputElement.setCustomValidity('Значение этого поля не должно быть выше чем ' + priceInputElement.min);
    } else if (price > priceMax) {
      priceInputElement.setCustomValidity('Значение этого поля не должно быть ниже чем ' + priceInputElement.max);
    } else {
      priceInputElement.setCustomValidity('');
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
      priceInputElement.min = 0;
    } else if (target.value === 'flat') {
      priceInputElement.min = 1000;
    } else if (target.value === 'house') {
      priceInputElement.min = 5000;
    } else if (target.value === 'palace') {
      priceInputElement.min = 10000;
    }

    priceInputElement.placeholder = priceInputElement.min;
  };

  var timeCheckHandler = function (evt) {
    var chosenInput = (evt.target === timeInInputElement) ? timeInInputElement : timeOutInputElement;
    var remainingInput = (evt.target === timeInInputElement) ? timeOutInputElement : timeInInputElement;

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
    var rooms = Number(roomsInputElement.value);
    var guests = Number(guestsInputElement.value);

    if (rooms < guests) {
      errorMassage = 'Количество комнат должно быть больше или равно количеству гостей';
    } else if (rooms === 100 && guests !== 0) {
      errorMassage = 'Столько комнат - не для гостей';
    }

    roomsInputElement.setCustomValidity(errorMassage);
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

  var submitFormHandler = function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(formElement), function () {
      window.message.success();
      window.pin.delete();
      window.card.close();
      window.form.reset();
      window.map.getInitialState();
    }, window.message.error);
  };

  var setFormHandlers = function () {
    titleInputElement.addEventListener('invalid', elementLengthValidationHandler);
    titleInputElement.addEventListener('input', elementInputCheckHandler);
    priceInputElement.addEventListener('invalid', priceMaxMinValidationHandler);
    priceInputElement.addEventListener('input', elementMaxMinInputCheckHandler);
    typeInputElement.addEventListener('change', selectChangeHandler);
    timeOutInputElement.addEventListener('change', timeCheckHandler);
    timeInInputElement.addEventListener('change', timeCheckHandler);
    roomsInputElement.addEventListener('change', compareRoomsGuestsHandler);
    guestsInputElement.addEventListener('change', compareRoomsGuestsHandler);
    avatarInputElement.addEventListener('input', checkFileTypeHandler);
    avatarInputElement.addEventListener('change', showAvatarHandler);
    roomPictureInputElement.addEventListener('input', checkFileTypeHandler);
    roomPictureInputElement.addEventListener('change', showRoomPicsHandler);
    formElement.addEventListener('submit', submitFormHandler, window.message.error);
    resetButtonElement.addEventListener('click', formResetHandler);
  };

  window.form = {
    setHandlers: setFormHandlers,
    reset: resetForm
  };
})();
