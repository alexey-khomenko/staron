window.openBody = function () {
  const body = document.querySelector('body.body');

  body.classList.remove('closed');

  const offset = '0';
  body.style.paddingRight = offset;
  document.querySelector('header.header').style.marginRight = offset;

  return offset;
};

window.closeBody = function () {
  const body = document.querySelector('body.body');

  const widthInner = +body.offsetWidth;
  body.classList.add('closed');
  const widthOuter = +body.offsetWidth;

  const offset = Math.round(widthOuter - widthInner) + 'px';
  body.style.paddingRight = offset;
  document.querySelector('header.header').style.marginRight = offset;

  return offset;
};

window.isTablet = () => 0 === +document.querySelector('.header .link.phone span').clientWidth;

window.isTouch = () => 'ontouchstart' in window || window?.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator?.msMaxTouchPoints > 0;