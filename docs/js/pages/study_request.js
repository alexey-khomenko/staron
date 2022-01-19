document.addEventListener('DOMContentLoaded', function () {

  window.Inputmask({mask: '+7 (999) 999-99-99'}).mask('#study_request-tel');

  document.addEventListener('submit', async function (e) {
    if (!e.target.closest('.study_request .study_request_form')) return true;

    e.preventDefault();

    const nameEl = document.querySelector('#study_request-name');
    const lastNameEl = document.querySelector('#study_request-last_name');
    const telEl = document.querySelector('#study_request-tel');
    const emailEl = document.querySelector('#study_request-email');
    const organizationEl = document.querySelector('#study_request-organization');

    const name = nameEl.value.trim();
    const lastName = lastNameEl.value.trim();
    const tel = telEl.inputmask.unmaskedvalue();
    const email = emailEl.value.trim();
    const organization = organizationEl.value.trim();


    let error = false;

    if (10 !== tel.length) {
      telEl.closest('.field').classList.add('error');
      error = true;
    }

    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(email)) {
      emailEl.closest('.field').classList.add('error');
      error = true;
    }

    if (error) return true;

    if (!document.querySelector('#study_request-agree:checked')) return true;

    const data = new FormData();
    data.set('name', name);
    data.set('lastName', lastName);
    data.set('tel', tel);
    data.set('email', email);
    data.set('organization', organization);
    const response = await fetch('/ajax/study_request_ajax.php', {method: 'POST', body: data});

    let results = {
      status: '+',
      demo: '+',
    };

    if (response.status === 200) {
      results = await response.json();
    }

    document.querySelector('.study_request_form .checkbox-label').click();

    window.openModal('study_request_modal');

    console.log('study_request form', results);
  });

  document.addEventListener('focusin', function (e) {
    const tel = e.target.closest('#study_request-tel');
    if (tel) tel.closest('.field').classList.remove('error');

    const email = e.target.closest('#study_request-email');
    if (email) email.closest('.field').classList.remove('error');
  });

  document.addEventListener('closeModal', function (e) {
    if (!e.detail.classList.contains('study_request_modal')) return true;

    const link = document.querySelector('.study_request_modal a.button.default').href;
    location.assign(link);
  });

});