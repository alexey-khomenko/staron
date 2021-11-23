document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    const hamburger = e.target.closest('[data-selector="hamburger"]');

    if (!hamburger) return true;

    hamburger.classList.toggle('active');
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-selector="lang"] summary')) return true;

    e.preventDefault();
  });

  document.querySelector('[data-selector="lang"]').addEventListener('pointerenter', function () {
    document.querySelector('[data-selector="lang"]').open = true;
  });

  document.addEventListener('pointerover', function (e) {
    if (e.target.closest('[data-selector="lang"]')) return true;

    document.querySelector('[data-selector="lang"]').open = false;
  });


  function openModal(name) {
    const modal = document.querySelector(`.modal-popup.${name}`);
    const backdrop = document.querySelector('.modal-backdrop');
    const body = document.querySelector('.body');

    const widthInner = +body.offsetWidth;
    body.classList.add('closed');
    const widthOuter = +body.offsetWidth;
    body.style.paddingRight = Math.round(widthOuter - widthInner) + 'px';

    modal.classList.add('opened');
    backdrop.classList.add('opened');
  }

  function closeModal() {
    const modal = document.querySelector('.modal-popup.opened');
    const backdrop = document.querySelector('.modal-backdrop');
    const body = document.querySelector('.body');

    body.style.paddingRight = '0';
    body.classList.remove('closed');

    modal.classList.remove('opened');
    backdrop.classList.remove('opened');
  }

  document.querySelector('.modal-backdrop').addEventListener('click', function (e) {
    if (e.target.closest('.modal-popup')) return true;

    closeModal();
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.button.application')) return true;

    openModal('application');
  });

});