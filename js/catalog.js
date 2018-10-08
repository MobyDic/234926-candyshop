'use strict';

(function () {
  var RAITING_START = ['one', 'two', 'three', 'four', 'five'];
  // var goodsArray = [];
  var catalogCards = document.querySelector('.catalog__cards');
  var catalogLoad = catalogCards.querySelector('.catalog__load');

  function makeCatalogElements(element, index) {

    var catalogCardTamplate = document.querySelector('#card').content.querySelector('.catalog__card');

    var cardElement = catalogCardTamplate.cloneNode(true);

    cardElement.querySelector('.card__title').innerText = element.name;
    cardElement.querySelector('.card__img').src = 'img/cards/' + element.picture;
    cardElement.querySelector('.card__price').innerHTML = element.price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + element.weight + ' Г</span>';

    cardElement.classList.remove('card--in-stock');
    if (element.amount > 5) {
      cardElement.classList.add('card--in-stock');
    } else {
      if (element.amount >= 1 && element.amount <= 5) {
        cardElement.classList.add('card--little');
      } else {
        cardElement.classList.add('card--soon');
      }
    }

    var starRaiting = cardElement.querySelector('.stars__rating');
    starRaiting.classList.remove('stars__rating--five');
    starRaiting.classList.add('stars__rating--' + RAITING_START[element.rating.value]);


    cardElement.querySelector('.star__count').innerText = element.rating.number;
    cardElement.querySelector('.card__characteristic').innerText = (element.nutritionFacts.sugar) ? 'С сахаром' : 'Без сахара';
    cardElement.querySelector('.card__composition-list').innerText = element.nutritionFacts.contents;
    cardElement.querySelector('.card__btn').dataset.index = index;
    return cardElement;
  }

  var goodCards = document.querySelector('.goods__cards');
  goodCards.classList.remove('goods__cards--empty');

  var goodCardsEmpty = goodCards.querySelector('.goods__card-empty');
  goodCardsEmpty.classList.add('visually-hidden');

  function showElements(goodsArray) {
    catalogCards.classList.remove('catalog_cards--load');
    catalogLoad.classList.add('visually-hidden');

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < goodsArray.length; i++) {

      var newElement = makeCatalogElements(goodsArray[i], i);
      if (newElement) {
        fragment.appendChild(newElement);
      }
    }
    catalogCards.appendChild(fragment);
    window.goodsArray = goodsArray;
  }

  // добавление товаров в корзину и избранное

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

      if (window.goodsArray[goodsArrayIndex].amount > 0) {
        window.goodsArray[goodsArrayIndex].amount--;

        showBasketElements(goodCards, goodsArrayIndex);

        showHeaderBasket();
      }
    }
  }

  var onError = function (message) {
    window.notification.showMessage('error', message);
    catalogLoad.innerText = message;
  };

  window.backend.load(showElements, onError);

  // корзина

  var goodsBasketArray = [];

  var headerBasket = document.querySelector('.main-header__basket');

  function makeBasketElements(index) {
    var cardElement;
    var catalogCardTamplate = document.querySelector('#card-order').content.querySelector('.goods_card');

    var goodBasket = {
      id: index,
      orderedAmount: 1,
      name: window.goodsArray[index].name,
      picture: window.goodsArray[index].picture,
      price: window.goodsArray[index].price
    };

    var indexExistGood = goodsBasketArray.findIndex(function (item) {
      return item.id === index;
    });

    if (indexExistGood >= 0) {
      goodsBasketArray[indexExistGood].orderedAmount++;
      goodCards.querySelector('.card-order__count[id="' + index + '"]').value++;
    } else {

      cardElement = catalogCardTamplate.cloneNode(true);
      cardElement.querySelector('.card-order__title').innerText = window.goodsArray[index].name;
      cardElement.querySelector('.card-order__img').src = 'img/cards/' + window.goodsArray[index].picture;
      cardElement.querySelector('.card-order__price').innerText = window.goodsArray[index].price + ' ₽';
      cardElement.querySelector('.card-order__count').id = index;
      cardElement.querySelector('.card-order__count').value = 1;
      goodsBasketArray.push(goodBasket);
    }

    return cardElement;
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

  function showBasketElements(catalog, index) {

    var fragment = document.createDocumentFragment();
    var newElement = makeBasketElements(index);
    if (newElement) {
      fragment.appendChild(newElement);
    }
    catalog.appendChild(fragment);

  }
  // обработчик для удаление товаров из корзины и увеличение/уменьшения кол-ва

  goodCards.addEventListener('click', clickCloseButtonHandler);
  goodCards.addEventListener('click', clickIncreaseBtnHandler);
  goodCards.addEventListener('click', clickDecreaseBtnHandler);


  function clickCloseButtonHandler(evt) {
    if (evt.target.classList.contains('card-order__close')) {
      evt.preventDefault();

      var indexGoods = findIndexGoods(evt.target);
      var valueGoods = evt.target.parentElement.querySelector('.card-order__count').value;
      var indexCatalog = goodsBasketArray[indexGoods].id;

      goodsBasketArray.splice(indexGoods, 1);
      window.goodsArray[indexCatalog].amount = valueGoods;
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

      if (window.goodsArray[goodsArrayIndex].amount > 0) {
        window.goodsArray[goodsArrayIndex].amount--;

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

        window.goodsArray[goodsArrayIndex].amount++;

        targetValue = --evt.target.parentElement.querySelector('.card-order__count').value;

        var indexGoods = findIndexGoods(evt.target);

        goodsBasketArray[indexGoods].orderedAmount = targetValue;

        showHeaderBasket();
      }
    }
  }

})();
