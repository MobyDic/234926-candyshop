'use strict';

(function () {
  var RAITING_START = ['one', 'two', 'three', 'four', 'five'];
  var goodsBasketArray = [];
  var data = window.data;

  var headerBasket = document.querySelector('.main-header__basket');
  var catalogCards = document.querySelector('.catalog__cards');
  var catalogLoad = catalogCards.querySelector('.catalog__load');

  function makeCatalogElements(i) {

    var catalogCardTamplate = document.querySelector('#card').content.querySelector('.catalog__card');

    var cardElement = catalogCardTamplate.cloneNode(true);

    cardElement.querySelector('.card__title').innerText = data.goodsArray[i].names;
    cardElement.querySelector('.card__img').src = data.goodsArray[i].picture;
    cardElement.querySelector('.card__price').innerHTML = data.goodsArray[i].price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + data.goodsArray[i].weigth + ' Г</span>';

    cardElement.classList.remove('card--in-stock');
    if (data.goodsArray[i].amount > 5) {
      cardElement.classList.add('card--in-stock');
    } else {
      if (data.goodsArray[i].amount >= 1 && data.goodsArray[i].amount <= 5) {
        cardElement.classList.add('card--little');
      } else {
        cardElement.classList.add('card--soon');
      }
    }

    var starRaiting = cardElement.querySelector('.stars__rating');
    starRaiting.classList.remove('stars__rating--five');
    starRaiting.classList.add('stars__rating--' + RAITING_START[data.goodsArray[i].rating.value]);


    cardElement.querySelector('.star__count').innerText = data.goodsArray[i].rating.number;
    cardElement.querySelector('.card__characteristic').innerText = (data.goodsArray[i].nutritionFacts.sugar) ? 'С сахаром' : 'Без сахара';
    cardElement.querySelector('.card__composition-list').innerText = data.goodsArray[i].nutritionFacts.contents;
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
      names: data.goodsArray[index].names,
      picture: data.goodsArray[index].picture,
      price: data.goodsArray[index].price
    };

    var indexExistGood = goodsBasketArray.findIndex(function (item) {
      return item.id === index;
    });

    if (indexExistGood >= 0) {
      goodsBasketArray[indexExistGood].orderedAmount++;
      goodCards.querySelector('.card-order__count[id="' + index + '"]').value++;
    } else {

      cardElement = catalogCardTamplate.cloneNode(true);
      cardElement.querySelector('.card-order__title').innerText = data.goodsArray[index].names;
      cardElement.querySelector('.card-order__img').src = data.goodsArray[index].picture;
      cardElement.querySelector('.card-order__price').innerText = data.goodsArray[index].price + ' ₽';
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

  showElements(makeCatalogElements, catalogCards, 0, data.CATALOG_GOODS);

  // обработчик добавление товаров в корзину и избранное


  catalogCards.classList.remove('catalog_cards--load');
  catalogLoad.classList.add('visually-hidden');
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

      if (data.goodsArray[goodsArrayIndex].amount > 0) {
        data.goodsArray[goodsArrayIndex].amount--;
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

      if (data.goodsArray[goodsArrayIndex].amount > 0) {
        data.goodsArray[goodsArrayIndex].amount--;

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

        data.goodsArray[goodsArrayIndex].amount++;

        targetValue = --evt.target.parentElement.querySelector('.card-order__count').value;

        var indexGoods = findIndexGoods(evt.target);

        goodsBasketArray[indexGoods].orderedAmount = targetValue;

        showHeaderBasket();
      }
    }
  }

})();
