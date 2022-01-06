document.addEventListener('DOMContentLoaded', function () {

  window.Inputmask({mask: '+7 (999) 999-99-99'}).mask('#cart-tel');

  let link = null;

  document.addEventListener('submit', async function (e) {
    if (!e.target.closest('.cart.info .form')) return true;

    e.preventDefault();

    // todo
    const wantEl = document.querySelectorAll('.cart.info .checkboxes-top input:checked');
    const nameEl = document.querySelector('#cart-name');
    const telEl = document.querySelector('#cart-tel');
    const emailEl = document.querySelector('#cart-email');
    const organizationEl = document.querySelector('#cart-organization');
    const interestedEl = document.querySelectorAll('.cart.info .checkboxes-bottom input:checked');
    const messageEl = document.querySelector('#cart-message');


    const want = [];
    for (let el of wantEl) {
      want.push(el.value.trim());
    }

    const name = nameEl.value.trim();
    const tel = telEl.inputmask.unmaskedvalue();
    const email = emailEl.value.trim();
    const organization = organizationEl.value.trim();

    const interested = [];
    for (let el of interestedEl) {
      interested.push(el.value.trim());
    }

    const message = messageEl.value.trim();


    if (!document.querySelector('#cart-agree:checked')) return true;

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

    const data = new FormData();
    data.set('want', JSON.stringify(want));
    data.set('name', name);
    data.set('tel', tel);
    data.set('email', email);
    data.set('organization', organization);
    data.set('interested', JSON.stringify(interested));
    data.set('message', message);
    const response = await fetch('/ajax/cart_order_ajax.php', {method: 'POST', body: data});

    let results = {
      link: '/catalog.html',
    };

    if (response.status === 200) {
      results = await response.json();
    }

    console.log('order in cart', results);

    link = results.link;

    window.openModal('order_modal');
  });

  document.addEventListener('focusin', function (e) {
    const tel = e.target.closest('#cart-tel');
    if (tel) tel.closest('.field').classList.remove('error');

    const email = e.target.closest('#cart-email');
    if (email) email.closest('.field').classList.remove('error');
  });

  document.addEventListener('closeModal', function (e) {
    if (!e.detail.classList.contains('order_modal')) return true;

    if (link) location.assign(link);
  });

});