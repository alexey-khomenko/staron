document.addEventListener('DOMContentLoaded', function () {

  let link = null;

  document.addEventListener('submit', async function (e) {
    if (!e.target.closest('.cart.info .form')) return true;

    e.preventDefault();

    console.log('todo order submit');

    const response = await fetch('/ajax/cart_order_ajax.php', {method: 'POST'});

    let results = {
      link: '/catalog.html',
    };

    if (response.status === 200) {
      results = await response.json();
    }

    console.log('order in cart', results);

    link = results.link;

    // todo
    //window.openModal('order_modal');
  });

  document.addEventListener('closeModal', function (e) {
    if (!e.detail.classList.contains('order_modal')) return true;

    location.assign(link);
  });

});