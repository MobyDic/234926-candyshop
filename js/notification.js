'use strict';

(function () {
  var modals = document.querySelectorAll('.modal');
  var modalError = modals[0];
  var modalErrorMessage = modalError.querySelector('.modal__message');
  var modalSuccess = modals[1];

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === 27) {
      modalSuccess.classList.add('modal--hidden');
      document.removeEventListener('keydown', onSuccessEscPress);
    }
  };

  var onErrorEscPress = function (evt) {
    if (evt.keyCode === 27) {
      modalError.classList.add('modal--hidden');
      document.removeEventListener('keydown', onErrorEscPress);
    }
  };

  var showMessage = function (result, message) {
    if (result === 'success') {
      modalSuccess.classList.remove('modal--hidden');
      document.addEventListener('keydown', onSuccessEscPress);
    } else if (result === 'error') {
      modalError.classList.remove('modal--hidden');
      modalErrorMessage.textContent = message;
      document.addEventListener('keydown', onErrorEscPress);
    }
  };

  modals.forEach(function (modalWindow) {
    modalWindow.querySelector('.modal__close').addEventListener('click', function () {
      modalWindow.classList.add('modal--hidden');
    });
  });

  window.notification = {
    showMessage: showMessage
  };


})();
