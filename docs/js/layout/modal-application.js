document.addEventListener('DOMContentLoaded', function () {

  window.Inputmask({mask: '+7 (999) 999-99-99'}).mask('#application-tel');

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.button.application')) return true;

    window.openModal('application');
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

    const country = document.querySelector('#application-country');

    country.classList.remove('error');
    country.value = option.dataset.value;
  });


  document.addEventListener('submit', async function (e) {
    if (!e.target.closest('.form.application')) return true;

    e.preventDefault();

    const nameEl = document.querySelector('#application-name');
    const telEl = document.querySelector('#application-tel');
    const emailEl = document.querySelector('#application-email');
    const wantEl = document.querySelectorAll('.form.application .checkboxes input:checked');
    const countryEl = document.querySelector('#application-country');
    const messageEl = document.querySelector('#application-message');

    const name = nameEl.value.trim();
    const tel = telEl.inputmask.unmaskedvalue();
    const email = emailEl.value.trim();

    const country = countryEl.value.trim();
    const message = messageEl.value.trim();

    let error = false;

    if (3 > name.length) {
      nameEl.classList.add('error');
      error = true;
    }

    if (10 !== tel.length) {
      telEl.classList.add('error');
      error = true;
    }

    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(email)) {
      emailEl.classList.add('error');
      error = true;
    }

    if (1 > country.length) {
      countryEl.classList.add('error');
      error = true;
    }

    const want = [];

    for (let el of wantEl) {
      want.push(el.value.trim());
    }

    if (error) return true;

    if (!document.querySelector('#application-agree:checked')) return true;

    const data = new FormData();
    data.set('name', name);
    data.set('tel', tel);
    data.set('email', email);
    data.set('want', JSON.stringify(want));
    data.set('country', country);
    data.set('message', message);
    const response = await fetch('/ajax/application_ajax.php', {method: 'POST', body: data});

    let results = {
      status: '+',
      demo: '+',
    };

    if (response.status === 200) {
      results = await response.json();
    }

    console.log('application form', results);

    window.closeModal();
    window.openModal('application_success');
  });

  document.addEventListener('focusin', function (e) {
    const name = e.target.closest('#application-name');
    if (name) name.classList.remove('error');

    const tel = e.target.closest('#application-tel');
    if (tel) tel.classList.remove('error');

    const email = e.target.closest('#application-email');
    if (email) email.classList.remove('error');
  });

});