'use strict';

(function () {
  var buyForm = document.querySelector('.buy form');

  function submitHandler(evt) {
    window.backend.upload(new FormData(buyForm), onSuccesUpload, onErrorUpload);
    evt.preventDefault();
  }

  function onSuccesUpload(message) {
    window.notification.showMessage('success', message);
  }

  var onErrorUpload = function (message) {
    window.notification.showMessage('error', message);
  };

  buyForm.addEventListener('submit', submitHandler);

})();
