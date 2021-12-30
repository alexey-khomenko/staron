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

  document.addEventListener('click', async function (e) {
    const button = e.target.closest('.catalog_buttons .btn-more');

    if (!button) return true;

    const {cardsAll, cardsVisible, cardsHidden, limit, all} = getData();

    if (cardsVisible.length === all) return true;

    if (0 < cardsHidden.length) {
      document.querySelector('.catalog_buttons .btn-less').classList.remove('hidden');

      if (all <= cardsVisible.length + limit) button.classList.add('hidden');

      const n = limit > cardsHidden.length ? cardsHidden.length : limit;

      for (let i = 0; i < n; i++) {
        cardsHidden.shift().classList.remove('hidden');
      }

      return true;
    }

    const data = new FormData();
    data.set('page', window.location.href);
    data.set('from', String(cardsAll.length));
    data.set('limit', String(limit));

    const response = await fetch('/ajax/catalog_ajax.php', {method: 'POST', body: data});

    let results = [
      {
        title: 'Supreme',
        image: 'images/content-catalog-1.jpg',
        link: 'collection.html',
      },
      {
        title: 'Aspen',
        image: 'images/content-catalog-2.jpg',
        link: 'collection.html',
      },
    ];

    if (response.status === 200) {
      results = await response.json();
    }

    console.log('catalog ajax', results);

    if (all === cardsAll.length + results.length) button.classList.add('hidden');

    document.querySelector('.catalog_buttons .btn-less').classList.remove('hidden');

    const cards = document.querySelector('.catalog_cards');

    for (let result of results) {
      const card = cards.querySelector('.card').cloneNode(true);

      card.href= result.link;
      card.querySelector('.title').textContent = result.title;
      card.querySelector('.img').src = result.image;
      card.querySelector('.img').alt = result.title;

      cards.append(card);
    }
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