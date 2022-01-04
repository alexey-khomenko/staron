document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', async function (e) {
    const submit = e.target.closest('.product.info .btn-order');

    if (!submit) return true;

    const id = submit.dataset.productId;
    const glue500 = !!document.querySelector('#glue-500:checked') ? '1' : '0';
    const glue700 = !!document.querySelector('#glue-700:checked') ? '1' : '0';

    const quantity = document.querySelector('.product.info .quantity-number').textContent;

    const data = new FormData();
    data.set('id', id);
    data.set('glue500', glue500);
    data.set('glue700', glue700);
    data.set('quantity', quantity);
    const response = await fetch('/ajax/to_cart_ajax.php', {method: 'POST', body: data});

    let results = {
      status: '+',
      demo: '+',
    };

    if (response.status === 200) {
      results = await response.json();
    }

    console.log('to cart in product', results);
  });

  function getPercent({min, max, current}) {
    return 100 * (current - min) / (max - min);
  }

  function getNumberLimit(wrap) {
    const progressNumbers = Array.from(wrap.querySelectorAll('.progress-numbers .progress-number'));

    return {
      NUMBER_MIN: +progressNumbers.shift().dataset.number,
      NUMBER_MAX: +progressNumbers.pop().dataset.number,
    };
  }

  function getNumberNew(wrap, width) {
    const {NUMBER_MIN, NUMBER_MAX} = getNumberLimit(wrap);
    const {WIDTH_MIN, WIDTH_MAX} = getWidthLimit(wrap);

    const percent = getPercent({min: WIDTH_MIN, max: WIDTH_MAX, current: width});

    return Math.round(percent * (NUMBER_MAX - NUMBER_MIN) / 100 + NUMBER_MIN);
  }

  function validateNumber(wrap, number) {
    const {NUMBER_MIN, NUMBER_MAX} = getNumberLimit(wrap);

    if (NUMBER_MIN > number) return NUMBER_MIN;
    if (NUMBER_MAX < number) return NUMBER_MAX;

    return number;
  }

  function getWidthLimit(wrap) {
    const progress = wrap.querySelector('.quantity-progress');
    const point = wrap.querySelector('.progress-point');

    return {
      WIDTH_MIN: Math.round(+point.offsetWidth / 2),
      WIDTH_MAX: Math.round(+progress.offsetWidth - +point.offsetWidth / 2),
    };
  }

  function getWidthNew(wrap, number) {
    const {NUMBER_MIN, NUMBER_MAX} = getNumberLimit(wrap);
    const {WIDTH_MIN, WIDTH_MAX} = getWidthLimit(wrap);

    const percent = getPercent({min: NUMBER_MIN, max: NUMBER_MAX, current: number});

    return Math.round(percent * (WIDTH_MAX - WIDTH_MIN) / 100 + WIDTH_MIN);
  }

  function validateWidth(wrap, width) {
    const {WIDTH_MIN, WIDTH_MAX} = getWidthLimit(wrap);

    if (WIDTH_MIN > width) return WIDTH_MIN;
    if (WIDTH_MAX < width) return WIDTH_MAX;

    return width;
  }

  function setQuantityNumber(wrap, number) {
    wrap.querySelector('.quantity-number').textContent = number;
  }

  function setProgressNumber(wrap, number) {
    const {NUMBER_MIN, NUMBER_MAX} = getNumberLimit(wrap);

    const progressNumbers = wrap.querySelector('.progress-numbers');
    const oldNumberObj = progressNumbers.querySelector('.progress-number.active');

    const oldNumber = +oldNumberObj.dataset.number;
    let newNumber = NUMBER_MIN;

    if (NUMBER_MAX / 4 <= number) newNumber = Math.round(NUMBER_MAX / 2);
    if (NUMBER_MAX / 4 * 3 <= number) newNumber = NUMBER_MAX;

    if (oldNumber === newNumber) return;

    const newNumberObj = progressNumbers.querySelector(`.progress-number[data-number="${newNumber}"]`);

    oldNumberObj.classList.remove('active');
    newNumberObj.classList.add('active');
  }

  function setProgressPoint(wrap, width) {
    wrap.querySelector('.progress-point').style.left = width + 'px';
    wrap.querySelector('.progress-line').style.width = width + 'px';
  }

  document.addEventListener('click', function (e) {
    const minus = e.target.closest('.product .quantity-minus');

    if (!minus) return true;

    const wrap = minus.closest('.quantity-wrapper');
    let number = +wrap.querySelector('.quantity-number').textContent - 1;
    number = validateNumber(wrap, number);

    const width = getWidthNew(wrap, number);

    setProgressPoint(wrap, width);
    setQuantityNumber(wrap, number);
    setProgressNumber(wrap, number);
  });

  document.addEventListener('click', function (e) {
    const plus = e.target.closest('.product .quantity-plus');

    if (!plus) return true;

    const wrap = plus.closest('.quantity-wrapper');
    let number = +wrap.querySelector('.quantity-number').textContent + 1;
    number = validateNumber(wrap, number);

    const width = getWidthNew(wrap, number);

    setProgressPoint(wrap, width);
    setQuantityNumber(wrap, number);
    setProgressNumber(wrap, number);
  });

  for (let point of document.querySelectorAll('.product .progress-point')) {
    let shiftX;

    function onPointerMoveHandler(e) {
      const wrap = e.target.closest('.quantity-wrapper');
      const progress = wrap.querySelector('.quantity-progress');
      let width = e.clientX - progress.getBoundingClientRect().left - shiftX;
      width = validateWidth(wrap, width);

      const number = getNumberNew(wrap, width);

      setProgressPoint(wrap, width);
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