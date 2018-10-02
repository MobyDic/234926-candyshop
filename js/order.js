'use strict';

(function () {
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

  // валидация карты

  var CARD_VALIDATION_OK_MESSAGE = 'Одобрен';
  var CARD_VALIDATION_ERROR_MESSAGE = 'Неизвестен';
  var CARD_NUMBER_ERROR_MESSAGE = 'Неправильный номер банковской карты';

  var checkCardData = function (cardDataFields, paymentCardNumber) {
    var result = {
      customCardValidityMessage: '',
      isValid: true,
      message: CARD_VALIDATION_OK_MESSAGE
    };

    for (var i = 0; i < cardDataFields.length; i++) {
      if (!cardDataFields[i].checkValidity()) {
        result.isValid = false;
        result.message = CARD_VALIDATION_ERROR_MESSAGE;
        break;
      }
    }

    if (result.isValid) {
      result.isValid = checkLuhn(paymentCardNumber.value);
      if (!result.isValid) {

        result.message = CARD_NUMBER_ERROR_MESSAGE;
      }
    }

    return result;
  };

  function checkLuhn(number) {

    var numberArr = number.split('');

    var sumOfNumbers = numberArr.map(function (item, i) {
      var currentItem = (i % 2 === 0) ? +item * 2 : +item;
      return (currentItem >= 10) ? currentItem - 9 : currentItem;
    }).reduce(function (sum, item) {
      return sum + item;
    }, 0);
    return sumOfNumbers % 10 === 0;
  }

  var paymentInputs = document.querySelector('.payment__inputs');
  var paymentCardNumber = paymentInputs.querySelector('#payment__card-number');
  var paymentCardStatus = paymentInputs.querySelector('.payment__card-status');


  paymentInputs.addEventListener('input', function () {
    paymentCardStatus.innerText = checkCardData(paymentInputs, paymentCardNumber).message;
  });

})();
