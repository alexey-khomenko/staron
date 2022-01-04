document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    const newBtn = e.target.closest('.trend-tabs-head .tabs-button:not(.active)');

    if (!newBtn) return true;

    const oldBtn = document.querySelector('.trend-tabs-head .tabs-button.active');
    const oldTab = document.querySelector(`.trend-tabs-body-${oldBtn.dataset.tab}`);
    const newTab = document.querySelector(`.trend-tabs-body-${newBtn.dataset.tab}`);

    oldBtn.classList.remove('active');
    oldTab.classList.add('hidden');

    newBtn.classList.add('active');
    newTab.classList.remove('hidden');
  });

  document.addEventListener('click', function (e) {
    const tile = e.target.closest('.trend .tile');
    if (!tile) return true;

    const tab = tile.closest('.trend-tabs-body');
    const id = tile.dataset.id;

    tab.querySelector('.overlay:not(.hidden)')?.classList.add('hidden');
    tile.querySelector('.overlay').classList.remove('hidden');

    tab.querySelector('.spec-item-length').textContent = tile.dataset.length;
    tab.querySelector('.spec-item-width').textContent = tile.dataset.width;
    tab.querySelector('.spec-item-thickness').textContent = tile.dataset.thickness;
    tab.querySelector('.spec-item-square').textContent = tile.dataset.square;
    tab.querySelector('.spec-item-weight').textContent = tile.dataset.weight;

    tab.querySelector('.target-tile').src = tile.dataset.tile;

    tab.querySelector('.collection-title').textContent = tile.dataset.collection;
    tab.querySelector('.product-title').textContent = tile.dataset.product;

    tab.querySelector(`.text-wrapper:not(.hidden)`)?.classList.add('hidden');
    tab.querySelector(`.text-wrapper[data-id="${id}"]`).classList.remove('hidden');

    tab.querySelector('.go-to-product').href = tile.dataset.link;
  });

  for (let tab of document.querySelectorAll('.trend-tabs-body')) {
    tab.querySelector('.tile').click();
  }

  document.addEventListener('click', async function (e) {
    const btn = e.target.closest('.add-to-order');
    if (!btn) return true;

    const wrap = btn.closest('.trend-tabs-body');
    const id = wrap.querySelector('.text-wrapper:not(.hidden)').dataset.id;
    const quantity = wrap.querySelector('.quantity-number').textContent;

    const data = new FormData();
    data.set('id', id);
    data.set('quantity', quantity);
    const response = await fetch('/ajax/to_cart_ajax.php', {method: 'POST', body: data});

    let results = {
      status: '+',
      demo: '+',
    };

    if (response.status === 200) {
      results = await response.json();
    }

    console.log('to cart in home trend', results);
  });
});