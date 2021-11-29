window.openBody = function () {
  const body = document.querySelector('body.body');

  body.classList.remove('closed');

  const offset = '0';
  body.style.paddingRight = offset;

  return offset;
};

window.closeBody = function () {
  const body = document.querySelector('body.body');

  const widthInner = +body.offsetWidth;
  body.classList.add('closed');
  const widthOuter = +body.offsetWidth;

  const offset = Math.round(widthOuter - widthInner) + 'px';
  body.style.paddingRight = offset;

  return offset;
};

window.isTablet = function () {
  return 0 === +document.querySelector('.header .link.phone span').clientWidth;
};