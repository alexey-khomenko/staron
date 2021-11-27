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

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.form.application .select summary input[readonly]')) return true;

    const details = document.querySelector('.form.application .select');

    details.open = !details.open;
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.form.application .select')) return true;

    document.querySelector('.form.application .select').open = false;
  });

  document.addEventListener('click', function (e) {
    const select = e.target.closest('.form.application .select');
    const option = e.target.closest('.form.application .select .option:not(.active)');

    if (!option) return true;

    const oldActive = select.querySelector('.option.active');

    if (oldActive) oldActive.classList.remove('active');

    option.classList.add('active');
    select.open = false;

    document.querySelector('#application-country').value = option.querySelector('span').textContent;
    document.querySelector('#application-country-id').value = option.dataset.value;
  });

  document.addEventListener('submit', function (e) {
    if (!e.target.closest('.form.application')) return true;

    e.preventDefault();

    console.log('.form.application submit');

    const tel = document.querySelector('#application-tel').inputmask.unmaskedvalue();

    console.log(tel);
  });

});