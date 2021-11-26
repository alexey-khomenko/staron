document.addEventListener('DOMContentLoaded', function () {

  window.Inputmask({mask: '+7 (999) 999-99-99'}).mask('#application-tel');

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

    const tel = document.querySelector('#application-tel').inputmask.unmaskedvalue();

    console.log(tel);
  });

  document.addEventListener('click', function (e) {
    const select = e.target.closest('.modal-popup .form.application .select');

    if (!select) return true;

    // todo details
    select.classList.toggle('active');
  });

  document.addEventListener('click', function (e) {
    const select = e.target.closest('.modal-popup .form.application .select');
    const option = e.target.closest('.modal-popup .form.application .select .option:not(.active)');

    if (!option) return true;

    const oldActive = select.querySelector('.option.active');

    if (oldActive) oldActive.classList.remove('active');

    option.classList.add('active');

    document.querySelector('#application-country').value = option.querySelector('span').textContent;

    // todo country-id
  });

});