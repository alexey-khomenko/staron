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

  document.addEventListener('click', async function (e) {
    const btn = e.target.closest('.cart.order .position-delete');

    if (!btn) return true;

    const position = btn.closest('.position');
    const id = position.dataset.productId;

    const data = new FormData();
    data.set('productId', id);
    const response = await fetch('/ajax/cart_position_delete_ajax.php', {method: 'POST', body: data});

    let results = {
      status: '+',
      demo: '+',
    };

    if (response.status === 200) {
      results = await response.json();
    }

    console.log('delete position in cart', results);

    position.remove();

    if (0 === document.querySelectorAll('.position').length) {
      const link = document.querySelector('.cart.container').dataset.catalogLink;
      location.assign(link);
    }
  });

  async function updatePosition(position) {
    const id = position.dataset.productId;
    const glue500 = !!position.querySelector('.glue-500:checked') ? '1' : '0';
    const glue700 = !!position.querySelector('.glue-700:checked') ? '1' : '0';
    const quantity = position.querySelector('.quantity-number').textContent;

    const data = new FormData();
    data.set('productId', id);
    data.set('glue700', glue700);
    data.set('glue500', glue500);
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

  document.addEventListener('change', async function (e) {
    const glue500 = e.target.closest('.cart.order .position .glue-500');
    const glue700 = e.target.closest('.cart.order .position .glue-700');
    const glue = glue500 || glue700;

    if (!glue) return true;

    await updatePosition(glue.closest('.position'));
  });

  document.addEventListener('click', async function (e) {
    const minus = e.target.closest('.cart.order .position .quantity-minus');
    const plus = e.target.closest('.cart.order .position .quantity-plus');
    const btn = minus || plus;

    if (!btn) return true;

    const position = btn.closest('.position');
    const quantityEl = position.querySelector('.quantity-number');
    let quantity = +quantityEl.textContent;

    if (1 >= quantity && minus) return true;

    quantityEl.textContent = String(plus ? ++quantity : --quantity);

    await updatePosition(position);
  });

});