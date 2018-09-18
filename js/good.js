'use strict';

function getTestProducts(){

  var namesList = ['Чесночные сливки','Огуречный педант','Молочная хрюша','Грибной шейк','Баклажановое безумие','Паприколу итальяно','Нинзя-удар васаби','Хитрый баклажан','Горчичный вызов','Кедровая липучка','Корманный портвейн','Чилийский задира','Беконовый взрыв','Арахис vs виноград','Сельдерейная душа','Початок в бутылке','Чернющий мистер чеснок','Раша федераша','Кислая мина','Кукурузное утро','Икорный фуршет','Новогоднее настроение','С пивком потянет','Мисс креветка','Бесконечный взрыв','Невинные винные','Бельгийское пенное','Острый язычок'];
  var PATH = './img/cards/';
  var picturesList = [
  'gum-cedar.jpg',
  'gum-chile.jpg',
  'gum-eggplant.jpg',
  'gum-mustard.jpg',
  'gum-portwine.jpg',
  'gum-wasabi.jpg',
  'ice-cucumber.jpg',
  'ice-eggplant.jpg',
  'ice-garlic.jpg',
  'ice-italian.jpg',
  'ice-mushroom.jpg',
  'ice-pig.jpg',
  'marmalade-beer.jpg',
  'marmalade-caviar.jpg',
  'marmalade-corn.jpg',
  'marmalade-new-year.jpg',
  'marmalade-sour.jpg',
  'marshmallow-bacon.jpg',
  'marshmallow-beer.jpg',
  'marshmallow-shrimp.jpg',
  'marshmallow-spicy.jpg',
  'marshmallow-wine.jpg',
  'soda-bacon.jpg',
  'soda-celery.jpg',
  'soda-cob.jpg',
  'soda-garlic.jpg',
  'soda-peanut-grapes.jpg',
  'soda-russian.jpg'];

var contentList = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'];

  var product = {};

  product.names = namesList[getRandomNumber(namesList.length,0)];
  product.picture = PATH + picturesList[getRandomNumber(picturesList.length,0)];
  product.price = getRandomNumber(1500, 300);
  product.wegith = getRandomNumber(300, 150);
  product.rating = {
    value: getRandomNumber(5, 1),
    number: getRandomNumber(900, 10)
  };
  product.nutritionFacts = {
    sugar: !!getRandomNumber(2, 0),
    energy: getRandomNumber(500, 70),
    contents: getRandomContent(contentList)
  };
  return product;

}

function getRandomNumber(maxNum, minNum) {
  return Math.floor(Math.random() * (maxNum - minNum)) + minNum
}

function getRandomContent(contentList){

  var maxIngridient = 10;
  var currentIngridient = Math.ceil(Math.random() * maxIngridient);
  var randomContent = '';
  for (var i = 0; i <= currentIngridient; i++) {
    randomContent += contentList[getRandomNumber(contentList.length, 0)];
    if (i < currentIngridient) {
      randomContent +=', ';
    }
  }
  return randomContent;
}

function getProductsArray() {
    var MAX_PRODUCTS = 26;

    var productsArr = [];

    for (var i = 0; i < MAX_PRODUCTS; i++) {
      productsArr.push(getTestProducts());
    }

    return productsArr;
}

var catalogCards = document.querySelector('.catalog__cards');
var catalogLoad = catalogCards.querySelector('.catalog__load')

catalogCards.classList.remove('catalog_cards--load');
catalogLoad.classList.add('visually-hidden');

function makeTemplateElements(amount) {
  var catalogCardTamplate = document.querySelector('#card').content.querySelector('.catalog__card');
  var cardElement = catalogCardTamplate.cloneNode(true);

  for (var i=0; i<amount; i++) {
    catalogCards.appendChild(cardElement);
  }

}

makeTemplateElements(5);
