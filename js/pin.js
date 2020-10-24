'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var successHandler = function (rentObjects) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < rentObjects.length; i++) {
      var rentObject = rentObjects[i];
      var pinElement = pinTemplate.cloneNode(true);
      var pinImage = pinElement.querySelector('img');

      pinElement.style = 'left: ' + (rentObject.location.x - 50) + 'px; top:' + (rentObject.location.y - 70) + 'px;';
      pinImage.src = rentObject.author.avatar;
      pinImage.alt = rentObject.offer.title;

      pinElement.addEventListener('click', window.card.show(rentObject));

      fragment.appendChild(pinElement);
    }

    mapPins.appendChild(fragment);
  };
  var errorHandler = function (errorMassage) {
    var node = document.createElement('div');
    node.style = 'z-index = 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.color = 'white';

    node.textContent = errorMassage;
    document.querySelector('.map').insertAdjacentElement('afterbegin', node);
  };

  var showPins = function () {

    window.backend.load(successHandler, errorHandler);

  };

  window.pin = {
    show: showPins
  };
})();
