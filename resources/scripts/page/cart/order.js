document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', async function (e) {
    if (!e.target.closest('.cart.order .to-clear')) return true;

    const response = await fetch('/ajax/clear_cart_ajax.php', {method: 'POST'});

    let results = {
      link: '/catalog.html',
    };

    if (response.status === 200) {
      results = await response.json();
    }

    console.log('clear cart', results);

    location.assign(results.link);
  });

  // todo del from cart

  async function updatePosition (position) {
    const id = position.dataset.productId;
    const glue500 = !!position.querySelector('.glue-500:checked') ? '1' : '0';
    const glue700 = !!position.querySelector('.glue-700:checked') ? '1' : '0';

    const quantity = position.querySelector('.quantity-number').textContent;

    const data = new FormData();
    data.set('id', id);
    data.set('glue500', glue500);
    data.set('glue700', glue700);
    data.set('quantity', quantity);
    const response = await fetch('/ajax/to_cart_ajax.php', {method: 'POST', body: data});

    let results = {
      status: '+',
      demo: '+',
    };

    if (response.status === 200) {
      results = await response.json();
    }

    console.log('update position in cart', results);
  }

  // todo click minus
  // todo click plus
  // todo click glue-500
  // todo click glue-700

});