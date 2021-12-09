document.addEventListener('DOMContentLoaded', function () {

  const QUANTITY_NUMBER_MIN = 1;
  const QUANTITY_NUMBER_MAX = 100;

  function isNumberWrong(number) {
    if (QUANTITY_NUMBER_MIN > number) return true;

    return QUANTITY_NUMBER_MAX < number;
  }

  function setQuantityNumber(wrap, number) {
    if (isNumberWrong(number)) return;

    wrap.querySelector('.quantity-number').textContent = number;
  }

  function setProgressPoint(wrap, number) {
    if (isNumberWrong(number)) return;

    const line = wrap.querySelector('.progress-line');
    const point = wrap.querySelector('.progress-point');

    const widthAll = Math.round(wrap.querySelector('.quantity-progress').offsetWidth);
    const widthMin = Math.round(+point.offsetWidth / 2);
    const widthMax = Math.round(widthAll - widthMin);

    const widthNew = Math.round((widthMax - widthMin) * number / QUANTITY_NUMBER_MAX + widthMin);

    line.style.width = widthNew + 'px';
    point.style.left = widthNew + 'px';
  }

  function setProgressNumber(wrap, number) {
    if (isNumberWrong(number)) return;

    const progressNumbers = wrap.querySelector('.progress-numbers');
    const oldNumberObj = progressNumbers.querySelector('.progress-number.active');

    const oldNumber = +oldNumberObj.dataset.number;
    let newNumber = QUANTITY_NUMBER_MIN;

    if (QUANTITY_NUMBER_MAX / 4 <= number) newNumber = QUANTITY_NUMBER_MAX / 2;
    if (QUANTITY_NUMBER_MAX / 4 * 3 <= number) newNumber = QUANTITY_NUMBER_MAX;

    if (oldNumber === newNumber) return;

    const newNumberObj = progressNumbers.querySelector(`.progress-number[data-number="${newNumber}"]`);

    oldNumberObj.classList.remove('active');
    newNumberObj.classList.add('active');
  }

  document.addEventListener('click', function (e) {
    const minus = e.target.closest('.trend .quantity-minus');

    if (!minus) return true;

    const wrap = minus.closest('.quantity-wrapper');
    const number = +wrap.querySelector('.quantity-number').textContent - 1;

    setQuantityNumber(wrap, number);
    setProgressPoint(wrap, number);
    setProgressNumber(wrap, number);
  });

  document.addEventListener('click', function (e) {
    const plus = e.target.closest('.trend .quantity-plus');

    if (!plus) return true;

    const wrap = plus.closest('.quantity-wrapper');
    const number = +wrap.querySelector('.quantity-number').textContent + 1;

    setQuantityNumber(wrap, number);
    setProgressPoint(wrap, number);
    setProgressNumber(wrap, number);
  });


  const progressPoints = document.querySelectorAll('.trend .progress-point');

  for (let point of progressPoints) {
    let shiftX;

    function onPointerMoveHandler(e) {
      const progress = point.closest('.quantity-progress');
      const line = progress.querySelector('.progress-line');

      const widthAll = Math.round(+progress.offsetWidth);
      const widthMin = Math.round(+point.offsetWidth / 2);
      const widthMax = Math.round(widthAll - widthMin);

      let widthNew = e.clientX - progress.getBoundingClientRect().left - shiftX;

      if (widthMin > widthNew) widthNew = widthMin + 2;
      if (widthMax < widthNew) widthNew = widthMax;

      point.style.left = widthNew + 'px';
      line.style.width = widthNew + 'px';

      let number = Math.round((widthNew - widthMin) * QUANTITY_NUMBER_MAX / (widthMax - widthMin));

      if (0 === number) number = 1;

      const wrap = point.closest('.quantity-wrapper');

      setQuantityNumber(wrap, number);
      setProgressNumber(wrap, number);
    }

    point.onpointerdown = (e) => {
      e.preventDefault();

      shiftX = e.clientX - point.getBoundingClientRect().left;

      point.addEventListener('pointermove', onPointerMoveHandler);
      point.setPointerCapture(e.pointerId);
    };

    point.onpointerup = () => {
      point.removeEventListener('pointermove', onPointerMoveHandler);
    };

    point.ondragstart = () => false;
  }
});