document.addEventListener('DOMContentLoaded', function () {

  function getData() {
    return {
      cardsAll: Array.from(document.querySelectorAll('.catalog_cards .card')),
      cardsVisible: Array.from(document.querySelectorAll('.catalog_cards .card:not(.hidden)')),
      cardsHidden: Array.from(document.querySelectorAll('.catalog_cards .card.hidden')),
      limit: +document.querySelector('.catalog_cards').dataset.limit,
      all: +document.querySelector('.catalog_cards').dataset.all,
    };
  }

  document.addEventListener('click', function (e) {
    const button = e.target.closest('.catalog_buttons .btn-more');

    if (!button) return true;

    const {cardsAll, cardsVisible, cardsHidden, limit, all} = getData();

    console.log('more', cardsAll.length, cardsVisible.length, cardsHidden.length, limit, all);

    if (cardsVisible.length === cardsAll.length) return true;

    if (0 < cardsHidden.length) {
      document.querySelector('.catalog_buttons .btn-less').classList.remove('hidden');

      if (all === cardsVisible.length + limit) button.classList.add('hidden');

      const n = limit > cardsHidden.length ? cardsHidden.length : limit;

      for (let i = 0; i < n; i++) {
        cardsHidden.shift().classList.remove('hidden');
      }

      return true;
    }

    // todo запрос на получение новых карточек
  });

  document.addEventListener('click', function (e) {
    const button = e.target.closest('.catalog_buttons .btn-less');

    if (!button) return true;

    const {cardsVisible, limit} = getData();

    if (limit === cardsVisible.length) return true;

    document.querySelector('.catalog_buttons .btn-more').classList.remove('hidden');

    if (limit >= cardsVisible.length - limit) button.classList.add('hidden');

    const n = limit > cardsVisible.length - limit ? cardsVisible.length - limit : limit;

    for (let i = 0; i < n; i++) {
      cardsVisible.pop().classList.add('hidden');
    }
  });

});