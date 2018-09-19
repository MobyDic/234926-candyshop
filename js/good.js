'use strict';

var NAMES_GOODS = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var PATH_PICTURES = './img/cards/';
var PICTURES_GOODS = ['gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg', 'gum-portwine.jpg', 'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg', 'ice-italian.jpg', 'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg', 'marmalade-corn.jpg', 'marmalade-new-year.jpg', 'marmalade-sour.jpg', 'marshmallow-bacon.jpg', 'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg', 'marshmallow-spicy.jpg', 'marshmallow-wine.jpg', 'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg', 'soda-garlic.jpg', 'soda-peanut-grapes.jpg', 'soda-russian.jpg'];
var CONTENT_GOODS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
var CATALOG_GOODS = 26;
var BASKET_GOODS = 3;
var RAITING_START = ['one', 'two', 'three', 'four', 'five'];

function getTestGood() {

  var good = {};

  good.names = NAMES_GOODS[getRandomNumber(NAMES_GOODS.length)];
  good.picture = PATH_PICTURES + PICTURES_GOODS[getRandomNumber(PICTURES_GOODS.length)];
  good.amount = getRandomNumber(20, 1);
  good.price = getRandomNumber(1500, 300);
  good.weigth = getRandomNumber(300, 150);
  good.rating = {
    value: getRandomNumber(5, 1),
    number: getRandomNumber(900, 10)
  };
  good.nutritionFacts = {
    sugar: !!Math.round(Math.random()),
    energy: getRandomNumber(500, 70),
    contents: getRandomContent(CONTENT_GOODS)
  };
  return good;
}

function getRandomNumber(maxNum, minNum) {
  var step = minNum || 0;
  return Math.floor(Math.random() * (maxNum - step)) + step;
}

function getRandomContent() {

  var maxIngridient = 10;
  var currentIngridient = Math.ceil(Math.random() * maxIngridient);
  var randomContent = '';
  for (var i = 0; i <= currentIngridient; i++) {
    randomContent += CONTENT_GOODS[getRandomNumber(CONTENT_GOODS.length, 0)];
    if (i < currentIngridient) {
      randomContent += ', ';
    }
  }
  return randomContent;
}

function generateGoodsArray() {

  var goodsArr = [];

  for (var i = 0; i < CATALOG_GOODS; i++) {
    goodsArr.push(getTestGood());
  }
  return goodsArr;
}

var catalogCards = document.querySelector('.catalog__cards');
var catalogLoad = catalogCards.querySelector('.catalog__load');

catalogCards.classList.remove('catalog_cards--load');
catalogLoad.classList.add('visually-hidden');

function makeCatalogElements(i) {

  var catalogCardTamplate = document.querySelector('#card').content.querySelector('.catalog__card');

  var cardElement = catalogCardTamplate.cloneNode(true);

  cardElement.querySelector('.card__title').innerText = generateGoodsArray()[i].names;
  cardElement.querySelector('.card__img').src = generateGoodsArray()[i].picture;
  cardElement.querySelector('.card__price').innerHTML = generateGoodsArray()[i].price + '<span class="card__currency">₽</span><span class="card__weight">/ ' + generateGoodsArray()[i].weigth + ' Г</span>';

  cardElement.classList.remove('card--in-stock');
  if (generateGoodsArray()[i].amount > 5) {
    cardElement.classList.add('card--in-stock');
  } else {
    if (generateGoodsArray()[i].amount >= 1 && generateGoodsArray()[i].amount <= 5) {
      cardElement.classList.add('card--little');
    } else {
      cardElement.classList.add('card--soon');
    }
  }

  var starRaiting = cardElement.querySelector('.stars__rating');
  starRaiting.classList.remove('stars__rating--five');
  starRaiting.classList.add('stars__rating--' + RAITING_START[generateGoodsArray()[i].rating.value]);


  cardElement.querySelector('.star__count').innerText = generateGoodsArray()[i].rating.number;
  cardElement.querySelector('.card__characteristic').innerText = (generateGoodsArray()[i].nutritionFacts.sugar) ? 'С сахаром' : 'Без сахара';
  cardElement.querySelector('.card__composition-list').innerText = generateGoodsArray()[i].nutritionFacts.contents;

  return cardElement;
}

var goodCards = document.querySelector('.goods__cards');
goodCards.classList.remove('goods__cards--empty');

var goodCardsEmpty = goodCards.querySelector('.goods__card-empty');
goodCardsEmpty.classList.add('visually-hidden');

function makeBasketElements(i) {
  var catalogCardTamplate = document.querySelector('#card-order').content.querySelector('.goods_card');

  var cardElement = catalogCardTamplate.cloneNode(true);
  cardElement.querySelector('.card-order__title').innerText = generateGoodsArray()[i].names;
  cardElement.querySelector('.card-order__img').src = generateGoodsArray()[i].picture;
  cardElement.querySelector('.card-order__price').innerText = generateGoodsArray()[i].price + ' ₽';

  return cardElement;

}

function showElements(element, catalog, count) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < count; i++) {
    fragment.appendChild(element(i));
  }
  catalog.appendChild(fragment);
}

showElements(makeCatalogElements, catalogCards, CATALOG_GOODS);
showElements(makeBasketElements, goodCards, BASKET_GOODS);
