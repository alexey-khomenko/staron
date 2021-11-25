window.openModal = function (name) {
  const modal = document.querySelector(`.modal-popup.${name}`);
  const backdrop = document.querySelector('.modal-backdrop');
  const body = document.querySelector('.body');

  const widthInner = +body.offsetWidth;
  body.classList.add('closed');
  const widthOuter = +body.offsetWidth;
  body.style.paddingRight = Math.round(widthOuter - widthInner) + 'px';

  modal.classList.add('opened');
  backdrop.classList.add('opened');
};

window.closeModal = function () {
  const modal = document.querySelector('.modal-popup.opened');
  const backdrop = document.querySelector('.modal-backdrop');
  const body = document.querySelector('.body');

  body.style.paddingRight = '0';
  body.classList.remove('closed');

  modal.classList.remove('opened');
  backdrop.classList.remove('opened');
};

document.addEventListener('DOMContentLoaded', function () {

  document.querySelector('.modal-backdrop').addEventListener('click', function (e) {
    if (e.target.closest('.modal-popup')) return true;

    window.closeModal();
  });

});