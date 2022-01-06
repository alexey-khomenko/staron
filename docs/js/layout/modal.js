window.openModal = function (name) {
  const modal = document.querySelector(`.modal-popup.${name}`);
  const backdrop = document.querySelector('.modal-backdrop');

  modal.classList.add('opened');
  backdrop.classList.add('opened');
  backdrop.style.paddingRight = window.closeBody();
};

window.closeModal = function () {
  const modal = document.querySelector('.modal-popup.opened');
  const backdrop = document.querySelector('.modal-backdrop');

  modal.classList.remove('opened');
  backdrop.classList.remove('opened');
  backdrop.style.paddingRight = window.openBody();

  document.dispatchEvent(new CustomEvent('closeModal', {
    detail: {classList: modal.classList},
  }));
};

document.addEventListener('DOMContentLoaded', function () {

  document.querySelector('.modal-backdrop').addEventListener('click', function (e) {
    if (e.target.closest('.modal-popup')) return true;

    window.closeModal();
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.modal-popup .close')) return true;

    window.closeModal();
  });

});