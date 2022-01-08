const coords = [
  [
    52.37154,
    4.889976
  ],
  [
    52.370540000000005,
    4.9099759999999995
  ],
  [
    52.36354,
    4.911976
  ],
  [
    52.388540000000006,
    4.899976
  ],
  [
    52.397540000000006,
    4.9099759999999995
  ],
  [
    52.35754,
    4.9179759999999995
  ],
  [
    52.389540000000004,
    4.883976
  ],
  [
    52.385540000000006,
    4.886976
  ],
  [
    52.37454,
    4.881976
  ],
  [
    52.361540000000005,
    4.883976
  ],
  [
    52.35054,
    4.908976
  ],
  [
    52.36954000000001,
    4.914976
  ],
  [
    52.36854,
    4.887976
  ],
  [
    52.364540000000005,
    4.9019759999999994
  ],
  [
    52.37854,
    4.894976
  ],
  [
    52.385540000000006,
    4.902976
  ],
  [
    52.367540000000005,
    4.883976
  ],
  [
    52.36354,
    4.889976
  ],
  [
    50.835556999999994,
    4.354697
  ],
  [
    50.862556999999995,
    4.375697
  ],
  [
    50.849557,
    4.374696999999999
  ],
  [
    50.839557,
    4.346697
  ],
  [
    50.833557,
    4.374696999999999
  ],
  [
    50.867557,
    4.371696999999999
  ],
  [
    50.860557,
    4.376697
  ],
  [
    50.867557,
    4.339697
  ],
  [
    50.869557,
    4.332697
  ],
  [
    50.844556999999995,
    4.346697
  ],
  [
    50.827557,
    4.336697
  ],
  [
    50.822556999999996,
    4.347697
  ],
  [
    50.837557,
    4.339697
  ],
  [
    50.865556999999995,
    4.371696999999999
  ],
  [
    50.854557,
    4.364697
  ],
  [
    50.867557,
    4.357697
  ],
  [
    50.842557,
    4.3536969999999995
  ],
];

const titles = [
  'The 5 rooms Penthouse - A Magical Place',
  'Penthouse, 5 rooms + balconies',
  'Nice, cozy, big apartment',
  'Beautiful & luxurious apartment at great location',
  'Perfectly located flat',
  'Amazing Central Flat',
  'Wood and stone place',
  'Room with extraordinary view',
];

const flatTypes = ['penthouse', 'apartment', 'flat', 'room'];

const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};

const getCityId = (idx) => {
  if (idx >= 0 && idx < 18) {
    return 'amsterdam';
  } else if (idx >= 18 && idx < 35) {
    return 'brussels';
  }
};

const getTitleByType = (flatType) => {
  const flatTitle = titles.slice();

  if (flatType === 'penthouse') {
    flatTitle = titles.slice(0, 2);
  } else if (flatType === 'apartment') {
    flatTitle = titles.slice(2, 4);
  } else if (flatType === 'flat') {
    flatTitle = titles.slice(4, 6);
  } else if (flatType === 'room') {
    flatTitle = titles.slice(6, 8);
  }

  return `${flatTitle[randomInteger(1, 2) - 1]}`;
}

const getPrice = (flatType) => {
  const price = 100;

  if (flatType === 'penthouse') {
    price = randomInteger(1000, 1500);
  } else if (flatType === 'apartment') {
    price = randomInteger(700, 100);
  } else if (flatType === 'flat') {
    price = randomInteger(350, 700);
  } else if (flatType === 'room') {
    price = randomInteger(100, 350);
  }

  return price;
}

const getTmp = (idx) => {
  const flatType = `${flatTypes[randomInteger(1, flatTypes.length) - 1]}`;
  const cityId = getCityId(idx);

  return `{
    "bedrooms": ${randomInteger(1, 4)},
    "city": {
      "id": ${cityId},
      "name": ${cityId.charAt(0).toUpperCase()}
    },
    "coordinates": [${coords[idx]}],
    "description": "Cupidatat velit cupidatat ipsum elit Lorem duis esse cupidatat do amet ea veniam dolore ullamco. Officia irure Lorem labore aliquip sit nulla cillum cupidatat. Nisi exercitation consectetur consequat ex mollit.",
    "id": ${idx + 1},
    "image": "./img/apartment-0${randomInteger(1, 6)}.jpg",
    "photos": [
      "./img/apartment-05.jpg",
      "./img/apartment-01.jpg",
      "./img/apartment-02.jpg",
      "./img/apartment-03.jpg",
      "./img/apartment-04.jpg",
      "./img/apartment-06.jpg"
    ],
    "price": ${getPrice(flatType)},
    "rating": ${randomInteger(1, 4)}.${randomInteger(1, 9)},
    "title": "${getTitleByType(flatType)}",
    "type": "${flatType}",
    "wifi": ${Math.random() < 0.5},
    "zoom": 16
  },`;
};

const arr = coords.map((_val, idx) => getTmp(idx));

console.log(arr.join(''));
