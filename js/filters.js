'use strict';

const MAX_PINS_COUNT = 5;
const ANY_VALUE = `any`;
const LOW_PRICE_LIMIT = 10000;
const HIGH_PRICE_LIMIT = 50000;

const PriceType = {
  LOW: `low`,
  MIDDLE: `middle`,
  HIGH: `high`
};

const mapFilters = document.querySelector(`.map__filters`);
const mapFiltersFieldsets = mapFilters.querySelectorAll(`fieldset`);
const mapFilterSelects = mapFilters.querySelectorAll(`.map__filter`);

const inputHousingType = mapFilters.querySelector(`select[name="housing-type"]`);
const inputHousingPrice = mapFilters.querySelector(`select[name="housing-price"]`);
const inputHousingRooms = mapFilters.querySelector(`select[name="housing-rooms"]`);
const inputHousingGuests = mapFilters.querySelector(`select[name="housing-guests"]`);
const fieldsetMapFeatures = mapFilters.querySelector(`.map__features`);
const inputWifi = fieldsetMapFeatures.querySelector(`#filter-wifi`);
const inputDishwasher = fieldsetMapFeatures.querySelector(`#filter-dishwasher`);
const inputParking = fieldsetMapFeatures.querySelector(`#filter-parking`);
const inputWasher = fieldsetMapFeatures.querySelector(`#filter-washer`);
const inputElevator = fieldsetMapFeatures.querySelector(`#filter-elevator`);
const inputConditioner = fieldsetMapFeatures.querySelector(`#filter-conditioner`);

const getOnlyWithOffer = (pins) => {
  return pins.filter((pin) => ((pin.offer !== undefined) && (pin.offer !== null)));
};

const getTop5Pins = (arr) => {
  let result = [];
  let count = arr.length <= MAX_PINS_COUNT ? arr.length : MAX_PINS_COUNT;

  for (let i = 0; i < count; i++) {
    result.push(arr[i]);
  }

  return result;
};

const getHousingTypeFiltered = (pins) => {
  const samePins = pins.filter((pin) => {
    return pin.offer.type === inputHousingType.value;
  });

  return (inputHousingType.value === ANY_VALUE) ? pins : samePins;
};

const getHousingPriceFiltred = (pins) => {
  const samePins = pins.filter((pin) => {
    switch (inputHousingPrice.value) {
      case PriceType.LOW:
        return (pin.offer.price < LOW_PRICE_LIMIT);
      case PriceType.MIDDLE:
        return (pin.offer.price >= LOW_PRICE_LIMIT) && (pin.offer.price <= HIGH_PRICE_LIMIT);
      case PriceType.HIGH:
        return (pin.offer.price > HIGH_PRICE_LIMIT);
      default:
        return false;
    }
  });

  return (inputHousingPrice.value === ANY_VALUE) ? pins : samePins;
};

const getHousingRoomsFiltred = (pins) => {
  const samePins = pins.filter((pin) => {
    return (pin.offer.rooms.toString() === inputHousingRooms.value);
  });

  return (inputHousingRooms.value === ANY_VALUE) ? pins : samePins;
};

const getHousingGuestFiltred = (pins) => {
  const samePins = pins.filter((pin) => {
    return (pin.offer.guests.toString() === inputHousingGuests.value);
  });

  return (inputHousingGuests.value === ANY_VALUE) ? pins : samePins;
};
const getEnabledFeatures = () => {
  let enabledFeatures = [];

  if (inputWifi.checked) {
    enabledFeatures.push(window.globals.Features.WIFI);
  }
  if (inputDishwasher.checked) {
    enabledFeatures.push(window.globals.Features.DISHWASHER);
  }
  if (inputParking.checked) {
    enabledFeatures.push(window.globals.Features.PARKING);
  }
  if (inputWasher.checked) {
    enabledFeatures.push(window.globals.Features.WASHER);
  }
  if (inputConditioner.checked) {
    enabledFeatures.push(window.globals.Features.CONDITIONER);
  }
  if (inputElevator.checked) {
    enabledFeatures.push(window.globals.Features.ELEVATOR);
  }

  return enabledFeatures;
};

const getHousingFeaturesFiltred = (pins) => {
  const enabledFeatures = getEnabledFeatures();

  const samePins = pins.filter((pin) => {
    let allFeaturesExist = true;

    enabledFeatures.forEach((item) => {
      if (pin.offer.features.indexOf(item) === -1) {
        allFeaturesExist = false;

        return;
      }
    });

    return allFeaturesExist;
  });

  return samePins;
};

const filterPins = () => {
  let filtredPins = getHousingTypeFiltered(window.map.pins);
  filtredPins = getHousingPriceFiltred(filtredPins);
  filtredPins = getHousingRoomsFiltred(filtredPins);
  filtredPins = getHousingGuestFiltred(filtredPins);
  filtredPins = getHousingFeaturesFiltred(filtredPins);

  const top5Pins = getTop5Pins(filtredPins);
  window.map.updateData(top5Pins);
  window.map.closeCard();
};

const applyFilter = () => {
  window.debounce(filterPins);
};

const setInnactiveState = () => {
  mapFilters.classList.add(`map__filters--disabled`);
  window.utils.disableArrayElements(mapFiltersFieldsets, true);
  window.utils.disableArrayElements(mapFilterSelects, true);
  mapFilters.reset();
};

const setActiveState = () => {
  mapFilters.classList.remove(`map__filters--disabled`);
  window.utils.disableArrayElements(mapFiltersFieldsets, false);
  window.utils.disableArrayElements(mapFilterSelects, false);

  inputHousingType.addEventListener(`change`, applyFilter);
  inputHousingPrice.addEventListener(`change`, applyFilter);
  inputHousingRooms.addEventListener(`change`, applyFilter);
  inputHousingGuests.addEventListener(`change`, applyFilter);
  fieldsetMapFeatures.addEventListener(`change`, applyFilter);
};

window.filters = {
  getOnlyWithOffer,
  getTop5Pins,
  setInnactive: setInnactiveState,
  setActive: setActiveState
};
