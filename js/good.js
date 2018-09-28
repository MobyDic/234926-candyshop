'use strict';

var NAMES_GOODS = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var PATH_PICTURES = './img/cards/';
var PICTURES_GOODS = ['gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg', 'gum-portwine.jpg', 'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg', 'ice-italian.jpg', 'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg', 'marmalade-corn.jpg', 'marmalade-new-year.jpg', 'marmalade-sour.jpg', 'marshmallow-bacon.jpg', 'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg', 'marshmallow-spicy.jpg', 'marshmallow-wine.jpg', 'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg', 'soda-garlic.jpg', 'soda-peanut-grapes.jpg', 'soda-russian.jpg'];
var CONTENT_GOODS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
var CATALOG_GOODS = 26;
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

var goodsArray = [];
var goodsBasketArray = [];

function generateGoodsArray() {

  for (var i = 0; i < CATALOG_GOODS; i++) {
    goodsArray.push(getTestGood());
  }
  return goodsArray;
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
  cardElement.querySelector('.card__price').innerHTML = generateGoodsArray()[i].price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + generateGoodsArray()[i].weigth + ' Г</span>';

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
  cardElement.querySelector('.card__btn').dataset.index = i;
  return cardElement;
}

var goodCards = document.querySelector('.goods__cards');
goodCards.classList.remove('goods__cards--empty');

var goodCardsEmpty = goodCards.querySelector('.goods__card-empty');
goodCardsEmpty.classList.add('visually-hidden');

function makeBasketElements(index) {
  var cardElement;
  var catalogCardTamplate = document.querySelector('#card-order').content.querySelector('.goods_card');

  var goodBasket = {
    id: index,
    orderedAmount: 1,
    names: goodsArray[index].names,
    picture: goodsArray[index].picture,
    price: goodsArray[index].price
  };

  var indexExistGood = goodsBasketArray.findIndex(function (item) {
    return item.id === index;
  });

  if (indexExistGood >= 0) {
    goodsBasketArray[indexExistGood].orderedAmount++;
    goodCards.querySelector('.card-order__count[id="' + index + '"]').value++;
  } else {

    cardElement = catalogCardTamplate.cloneNode(true);
    cardElement.querySelector('.card-order__title').innerText = goodsArray[index].names;
    cardElement.querySelector('.card-order__img').src = goodsArray[index].picture;
    cardElement.querySelector('.card-order__price').innerText = goodsArray[index].price + ' ₽';
    cardElement.querySelector('.card-order__count').id = index;
    cardElement.querySelector('.card-order__count').value = 1;
    goodsBasketArray.push(goodBasket);
  }

  return cardElement;
}

function showElements(element, catalog, start, count) {
  var fragment = document.createDocumentFragment();
  for (var i = +start; i < +start + +count; i++) {
    var newElement = element(i);
    if (newElement) {
      fragment.appendChild(newElement);
    }
  }
  catalog.appendChild(fragment);

}

showElements(makeCatalogElements, catalogCards, 0, CATALOG_GOODS);


// обработчик добавление товаров в корзину и избранное

var headerBasket = document.querySelector('.main-header__basket');

catalogCards.addEventListener('click', clickBtnFavoriteHandler);
catalogCards.addEventListener('click', clickCardButtonHandler);

function clickBtnFavoriteHandler(evt) {
  if (evt.target.classList.contains('card__btn-favorite')) {
    evt.preventDefault();
    evt.target.classList.toggle('card__btn-favorite--selected');
  }
}

function clickCardButtonHandler(evt) {
  if (evt.target.classList.contains('card__btn')) {
    evt.preventDefault();
    var goodsArrayIndex = evt.target.dataset.index;

    if (goodsArray[goodsArrayIndex].amount > 0) {
      goodsArray[goodsArrayIndex].amount--;
      showElements(makeBasketElements, goodCards, goodsArrayIndex, 1);
      showHeaderBasket();
    }
  }
}

function showHeaderBasket() {

  var countGoods = goodsBasketArray.reduce(function (sum, item) {
    return sum + item.orderedAmount;
  }, 0);

  var sumPrice = goodsBasketArray.reduce(function (sum, item) {
    return sum + item.price * item.orderedAmount;
  }, 0);

  headerBasket.innerText = (countGoods) ? 'В корзине ' + countGoods + ' товара на ' + sumPrice + '₽' : 'В корзине ничего нет';

}
// обработчик для удаление товаров из корзины и увеличение/уменьшения кол-ва

goodCards.addEventListener('click', clickCloseButtonHandler);
goodCards.addEventListener('click', clickIncreaseBtnHandler);
goodCards.addEventListener('click', clickDecreaseBtnHandler);


function clickCloseButtonHandler(evt) {
  if (evt.target.classList.contains('card-order__close')) {
    evt.preventDefault();

    var indexGoods = findIndexGoods(evt.target);

    goodsBasketArray.splice(indexGoods, 1);
    showHeaderBasket();

    evt.currentTarget.removeChild(evt.target.parentElement);
  }
}

function findIndexGoods(target) {

  var targetId = target.parentElement.querySelector('.card-order__count').id;

  return goodsBasketArray.reduce(function (indexBasketArr, item, i) {
    return (+item.id === +targetId) ? indexBasketArr + i : indexBasketArr;
  }, 0);
}

function clickIncreaseBtnHandler(evt) {
  if (evt.target.classList.contains('card-order__btn--increase')) {
    evt.preventDefault();

    var goodsArrayIndex = evt.target.parentElement.querySelector('.card-order__count').id;

    if (goodsArray[goodsArrayIndex].amount > 0) {
      goodsArray[goodsArrayIndex].amount--;

      var targetValue = ++evt.target.parentElement.querySelector('.card-order__count').value;

      var indexGoods = findIndexGoods(evt.target);

      goodsBasketArray[indexGoods].orderedAmount = targetValue;

    }

    showHeaderBasket();
  }
}

function clickDecreaseBtnHandler(evt) {
  if (evt.target.classList.contains('card-order__btn--decrease')) {
    evt.preventDefault();
    var targetValue = evt.target.parentElement.querySelector('.card-order__count').value;
    var goodsArrayIndex = evt.target.parentElement.querySelector('.card-order__count').id;

    if (targetValue > 1) {

      goodsArray[goodsArrayIndex].amount++;

      targetValue = --evt.target.parentElement.querySelector('.card-order__count').value;

      var indexGoods = findIndexGoods(evt.target);

      goodsBasketArray[indexGoods].orderedAmount = targetValue;

      showHeaderBasket();
    }
  }
}

var deliver = document.querySelector('.deliver');
var deliverStore = deliver.querySelector('.deliver__courier');
var deliverCourier = deliver.querySelector('.deliver__store');

// обработчик вкладок доставки
deliver.addEventListener('click', clickDeliverHandler);

function clickDeliverHandler(evt) {
  if (evt.target.id === 'deliver__courier') {
    deliverStore.classList.remove('visually-hidden');
    deliverCourier.classList.add('visually-hidden');
  } else {
    deliverCourier.classList.remove('visually-hidden');
    deliverStore.classList.add('visually-hidden');
  }
}

var payment = document.querySelector('.payment');
var paymentCard = payment.querySelector('.payment__card-wrap');
var paymentCash = payment.querySelector('.payment__cash-wrap');

payment.addEventListener('click', clickPaymentHandler);

function clickPaymentHandler(evt) {
  if (evt.target.id === 'payment__card') {
    paymentCard.classList.remove('visually-hidden');
    paymentCash.classList.add('visually-hidden');
  }

  if (evt.target.id === 'payment__cash') {
    paymentCash.classList.remove('visually-hidden');
    paymentCard.classList.add('visually-hidden');
  }
}

/*
var aArr = a.split('');

var b = aArr.map(function(item, i){
  var currentItem = (i % 2 === 0) ? +item * 2 : +item;
  return (currentItem >= 10) ? currentItem - 9 : currentItem;
}).reduce(function(sum, item) {
  return sum +=item;
}, 0)
*/

