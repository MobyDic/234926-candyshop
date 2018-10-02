'use strict';

(function () {
  // движение ползунков диапазона цен

  var rangeBtnLeft = document.querySelector('.range__btn--left');
  var rangeBtnRight = document.querySelector('.range__btn--right');
  var rangeFilter = document.querySelector('.range__filter');
  var rangeFilterLine = document.querySelector('.range__fill-line');
  var rangePriceMin = document.querySelector('.range__price--min');
  var rangePriceMax = document.querySelector('.range__price--max');

  rangeBtnLeft.addEventListener('mousedown', mousedownLeftBtnHandler);
  rangeBtnRight.addEventListener('mousedown', mousedownRightBtnHandler);

  var filterLength = rangeFilter.offsetWidth;
  viewRange(rangeBtnLeft.offsetLeft, rangePriceMin);
  viewRange(rangeBtnRight.offsetLeft, rangePriceMax);


  function mousedownLeftBtnHandler(evt) {
    evt.preventDefault();

    var startCoord = evt.clientX;

    function mousemoveLeftBtnHandler(moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoord - moveEvt.clientX;

      startCoord = moveEvt.clientX;
      var newBtnCoord = rangeBtnLeft.offsetLeft - shift;
      var newLineCoord = rangeFilterLine.offsetLeft - shift;

      if (newBtnCoord >= 0 && newBtnCoord < rangeBtnRight.offsetLeft) {

        rangeBtnLeft.style.left = newBtnCoord + 'px';
        viewRange(newBtnCoord, rangePriceMin);
      }

      rangeFilterLine.style.left = (newLineCoord >= 0 && newLineCoord < rangeBtnRight.offsetLeft) ? newLineCoord + 'px' : newLineCoord.offsetLeft + 'px';

    }

    function mouseupLeftBtnHandler(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mousemoveLeftBtnHandler);
      document.removeEventListener('mouseup', mouseupLeftBtnHandler);

    }

    document.addEventListener('mousemove', mousemoveLeftBtnHandler);
    document.addEventListener('mouseup', mouseupLeftBtnHandler);

  }

  function viewRange(coord, element) {
    var maxPrice = Math.max.apply(null, window.data.goodsArray.map(function (item) {
      return item.price;
    }));
    var price = Math.round(coord * maxPrice / filterLength);
    element.textContent = price;
  }

  function mousedownRightBtnHandler(evt) {
    evt.preventDefault();

    var startCoord = evt.clientX;

    function mousemoveRightBtnHandler(moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoord - moveEvt.clientX;

      startCoord = moveEvt.clientX;
      var newBtnCoord = rangeBtnRight.offsetLeft - shift;

      if (newBtnCoord <= filterLength && newBtnCoord >= rangeBtnLeft.offsetLeft) {

        rangeBtnRight.style.left = newBtnCoord + 'px';
        viewRange(newBtnCoord, rangePriceMax);
      }

      rangeFilterLine.style.right = filterLength - rangeBtnRight.offsetLeft + 'px';

    }

    function mouseupRightBtnHandler(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mousemoveRightBtnHandler);
      document.removeEventListener('mouseup', mouseupRightBtnHandler);

    }

    document.addEventListener('mousemove', mousemoveRightBtnHandler);
    document.addEventListener('mouseup', mouseupRightBtnHandler);

  }
})();
