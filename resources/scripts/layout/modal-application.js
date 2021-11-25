document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.button.application')) return true;

    window.openModal('application');
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.modal-popup .button.close')) return true;

    window.closeModal();
  });

  document.addEventListener('submit', function (e) {
    if (!e.target.closest('.form.application')) return true;

    e.preventDefault();

    console.log('.form.application submit');
  });


});