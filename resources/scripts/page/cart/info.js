document.addEventListener('DOMContentLoaded', function () {

  window.Inputmask({mask: '+7 (999) 999-99-99'}).mask('#cart-tel');

  document.addEventListener('submit', async function (e) {
    if (!e.target.closest('.cart.info .form')) return true;

    e.preventDefault();

    const nameEl = document.querySelector('#cart-name');
    const telEl = document.querySelector('#cart-tel');
    const emailEl = document.querySelector('#cart-email');
    const organizationEl = document.querySelector('#cart-organization');
    const messageEl = document.querySelector('#cart-message');
    const classesEl = document.querySelectorAll('.cart.info .checkboxes-top input:checked');
    const interestedEl = document.querySelectorAll('.cart.info .checkboxes-bottom input:checked');


    const name = nameEl.value.trim();
    const tel = telEl.inputmask.unmaskedvalue();
    const email = emailEl.value.trim();
    const organization = organizationEl.value.trim();
    const message = messageEl.value.trim();

    const classes = [];
    for (let el of classesEl) {
      classes.push(el.value.trim());
    }

    const interested = [];
    for (let el of interestedEl) {
      interested.push(el.value.trim());
    }


    let error = false;

    if (0 < name.length) {
      nameEl.closest('.field').classList.add('success');
    }

    if (10 !== tel.length) {
      telEl.closest('.field').classList.add('error');
      error = true;
    }
    else {
      telEl.closest('.field').classList.add('success');
    }

    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(email)) {
      emailEl.closest('.field').classList.add('error');
      error = true;
    }
    else {
      emailEl.closest('.field').classList.add('success');
    }

    if (0 < organization.length) {
      organizationEl.closest('.field').classList.add('success');
    }

    if (error) return true;

    if (!document.querySelector('#cart-agree:checked')) return true;

    const data = new FormData();
    data.set('name', name);
    data.set('tel', tel);
    data.set('email', email);
    data.set('organization', organization);
    data.set('message', message);
    data.set('classes', JSON.stringify(classes));
    data.set('interested', JSON.stringify(interested));
    const response = await fetch('/ajax/cart_order_ajax.php', {method: 'POST', body: data});

    let results = {
      status: '+',
      demo: '+',
    };

    if (response.status === 200) {
      results = await response.json();
    }

    console.log('order in cart', results);

    window.openModal('order_modal');
  });

  document.addEventListener('focusin', function (e) {
    const name = e.target.closest('#cart-name');
    if (name) {
      name.closest('.field').classList.remove('error');
      name.closest('.field').classList.remove('success');
    }

    const tel = e.target.closest('#cart-tel');
    if (tel) {
      tel.closest('.field').classList.remove('error');
      tel.closest('.field').classList.remove('success');
    }

    const email = e.target.closest('#cart-email');
    if (email) {
      email.closest('.field').classList.remove('error');
      email.closest('.field').classList.remove('success');
    }

    const organization = e.target.closest('#cart-organization');
    if (organization) {
      organization.closest('.field').classList.remove('error');
      organization.closest('.field').classList.remove('success');
    }
  });

  document.addEventListener('closeModal', function (e) {
    if (!e.detail.classList.contains('order_modal')) return true;

    const link = document.querySelector('.cart.container').dataset.catalogLink;
    location.assign(link);
  });

});