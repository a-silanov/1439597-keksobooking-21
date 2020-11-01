'use strict';

(function () {
  var mapPinElements = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElements = [];

  var renderPins = function (filteredObjects) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < filteredObjects.length; i++) {
      var rentObject = filteredObjects[i];
      var pinElement = pinTemplate.cloneNode(true);
      var pinImage = pinElement.querySelector('img');

      pinElement.style = 'left: ' + (rentObject.location.x - 50) + 'px; top:' + (rentObject.location.y - 70) + 'px;';
      pinImage.src = rentObject.author.avatar;
      pinImage.alt = rentObject.offer.title;

      pinElement.addEventListener('click', window.card.show(rentObject));

      pinElements.push(pinElement);
      if (fragment.children.length < window.data.MAX_PINS_QUANTITY) {
        fragment.appendChild(pinElement);
      }
    }

    mapPinElements.appendChild(fragment);
  };

  var deletePins = function () {
    pinElements.forEach(function (pinElement) {
      pinElement.remove();
    });
  };

  window.pin = {
    render: renderPins,
    delete: deletePins
  };
})();
