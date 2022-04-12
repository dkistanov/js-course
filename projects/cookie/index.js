// eslint-disable-next-line no-undef
ymaps.load().then((maps) => {
  let newMap = null;
  const newGeoObjects = [];
  // eslint-disable-next-line no-undef
  const myClusterer = new ymaps.Clusterer();
  const arrayForStorage = JSON.parse(localStorage.getItem('placemarks')) || [];
  let newObject;
  newMap = new maps.Map('map', {
    center: [55.76, 37.64],
    zoom: 11,
  });
  newMap.geoObjects.add(myClusterer);
  if (arrayForStorage.length) {
    createPlacemarkFromStorage(arrayForStorage);
  }
  newMap.events.add('click', function (e) {
    const coords = e.get('coords');
    const lastObj = newGeoObjects.length;
    newGeoObjects[lastObj] = createPlacemark(coords);
    myClusterer.add(newGeoObjects);
    newGeoObjects[lastObj].balloon.open();

    newObject = {
      geometry: {
        type: 'Point',
        coordinates: newGeoObjects[lastObj].geometry.getCoordinates(),
      },
      properties: newGeoObjects[lastObj].properties.getAll(),
    };
    arrayForStorage.push(newObject);
    localStorage['placemarks'] = JSON.stringify(arrayForStorage);
  });
  function createPlacemark(coords) {
    // eslint-disable-next-line no-undef
    const newPlacemark = new ymaps.GeoObject({
      geometry: {
        type: 'Point',
        coordinates: coords,
      },
      properties: {
        balloonContent: [
          '<div class="balloon__wrapper"><div class="balloon__title">Отзыв:</div>',
          '<form> <input placeholder="Укажите ваше имя"/> <input placeholder="Укажите место"/> <textarea placeholder="Оставить отзыв"></textarea>',
          '<button>Добавить</button></form></div>',
        ].join(''),
      },
    });
    return newPlacemark;
  }
  function createPlacemarkFromStorage(marks) {
    marks.forEach((mark) => {
      // eslint-disable-next-line no-undef
      newGeoObjects.push(new ymaps.GeoObject(mark));
    });
    myClusterer.add(newGeoObjects);
  }
});
