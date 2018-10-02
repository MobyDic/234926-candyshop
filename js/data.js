'use strict';

(function () {

  var NAMES_GOODS = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
  var PATH_PICTURES = './img/cards/';
  var PICTURES_GOODS = ['gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg', 'gum-portwine.jpg', 'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg', 'ice-italian.jpg', 'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg', 'marmalade-corn.jpg', 'marmalade-new-year.jpg', 'marmalade-sour.jpg', 'marshmallow-bacon.jpg', 'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg', 'marshmallow-spicy.jpg', 'marshmallow-wine.jpg', 'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg', 'soda-garlic.jpg', 'soda-peanut-grapes.jpg', 'soda-russian.jpg'];
  var CONTENT_GOODS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
  var CATALOG_GOODS = 26;

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

  var goodsArray = [];

  function generateGoodsArray() {

    for (var i = 0; i < CATALOG_GOODS; i++) {
      goodsArray.push(getTestGood());
    }
    return goodsArray;
  }

  generateGoodsArray();

  window.data = {
    goodsArray: goodsArray,
    CATALOG_GOODS: CATALOG_GOODS
  };

})();
