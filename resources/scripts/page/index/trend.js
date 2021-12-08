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

    tab.querySelector(`.spec-item-length:not(.hidden)`)?.classList.add('hidden');
    tab.querySelector(`.spec-item-length[data-id="${id}"]`).classList.remove('hidden');

    tab.querySelector(`.spec-item-width:not(.hidden)`)?.classList.add('hidden');
    tab.querySelector(`.spec-item-width[data-id="${id}"]`).classList.remove('hidden');

    tab.querySelector(`.spec-item-thickness:not(.hidden)`)?.classList.add('hidden');
    tab.querySelector(`.spec-item-thickness[data-id="${id}"]`).classList.remove('hidden');

    tab.querySelector(`.spec-item-square:not(.hidden)`)?.classList.add('hidden');
    tab.querySelector(`.spec-item-square[data-id="${id}"]`).classList.remove('hidden');

    tab.querySelector(`.spec-item-weight:not(.hidden)`)?.classList.add('hidden');
    tab.querySelector(`.spec-item-weight[data-id="${id}"]`).classList.remove('hidden');

    tab.querySelector(`.target-tile:not(.hidden)`)?.classList.add('hidden');
    tab.querySelector(`.target-tile[data-id="${id}"]`).classList.remove('hidden');

    tab.querySelector(`.target-tile:not(.hidden)`)?.classList.add('hidden');
    tab.querySelector(`.target-tile[data-id="${id}"]`).classList.remove('hidden');

    tab.querySelector(`.collection-title:not(.hidden)`)?.classList.add('hidden');
    tab.querySelector(`.collection-title[data-id="${id}"]`).classList.remove('hidden');

    tab.querySelector(`.product-title:not(.hidden)`)?.classList.add('hidden');
    tab.querySelector(`.product-title[data-id="${id}"]`).classList.remove('hidden');

    tab.querySelector(`.text-wrap:not(.hidden)`)?.classList.add('hidden');
    tab.querySelector(`.text-wrap[data-id="${id}"]`).classList.remove('hidden');

    tab.querySelector(`.go-to-product:not(.hidden)`)?.classList.add('hidden');
    tab.querySelector(`.go-to-product[data-id="${id}"]`).classList.remove('hidden');
  });

  for (let tab of document.querySelectorAll('.trend-tabs-body')) {
    tab.querySelector('.tile').click();
  }

});