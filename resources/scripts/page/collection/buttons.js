document.addEventListener('DOMContentLoaded', function () {

  function getData() {
    return {
      cardsAll: Array.from(document.querySelectorAll('.collection_cards .card')),
      cardsVisible: Array.from(document.querySelectorAll('.collection_cards .card:not(.hidden)')),
      cardsHidden: Array.from(document.querySelectorAll('.collection_cards .card.hidden')),
      limit: +document.querySelector('.collection_cards').dataset.limit,
      all: +document.querySelector('.collection_cards').dataset.all,
    };
  }

  document.addEventListener('click', async function (e) {
    const button = e.target.closest('.collection_buttons .btn-more');

    if (!button) return true;

    const {cardsAll, cardsVisible, cardsHidden, limit, all} = getData();

    if (cardsVisible.length === all) return true;

    if (0 < cardsHidden.length) {
      document.querySelector('.collection_buttons .btn-less').classList.remove('hidden');

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

    const response = await fetch('/ajax/collection_ajax.php', {method: 'POST', body: data});

    let results = [
      {
        title: 'Cotton White',
        text: '<p>1.1. Чистые цвета и уникальные оттенки: от белоснежного до глубокого черного. Без включений и блеска.</p><p>Наиболее востребованы для частных интерьеров.</p>',
        link: 'product.html',
        images: [
          'images/content-collection-1.jpg',
          'images/content-collection-11.jpg',
          'images/content-collection-12.jpg',
        ],
        props: [
          'длина (мм): 3111',
          'толщина (мм): 10',
          'вес плиты (кг): 11,1',
          'ширина (мм): 110',
          'площадь (м2): 1,1',
        ],
      },
      {
        title: 'Impala Black',
        text: '<p>2.1. Чистые цвета и уникальные оттенки: от белоснежного до глубокого черного.</p><p>Без включений и блеска.</p><p>Наиболее востребованы для частных интерьеров.</p>',
        link: 'product.html',
        images: [
          'images/content-collection-2.jpg',
          'images/content-collection-13.jpg',
          'images/content-collection-14.jpg',
        ],
        props: [
          'длина (мм): 3222',
          'толщина (мм): 2',
          'вес плиты (кг): 22,2',
          'ширина (мм): 220',
          'площадь (м2): 2,2',
        ],
      },
    ];

    if (response.status === 200) {
      results = await response.json();
    }

    console.log('collection ajax', results);

    if (all === cardsAll.length + results.length) button.classList.add('hidden');

    document.querySelector('.collection_buttons .btn-less').classList.remove('hidden');

    const cards = document.querySelector('.collection_cards');

    for (let result of results) {
      const card = cards.querySelector('.card').cloneNode(true);

      card.querySelector('.images').innerHTML = '';
      for (let image of result.images) {
        card.querySelector('.images').insertAdjacentHTML('beforeend', `<li>${image}</li>`);
      }

      card.querySelector('.properties').innerHTML = '';
      for (let prop of result.props) {
        card.querySelector('.properties').insertAdjacentHTML('beforeend', `<li>${prop}</li>`);
      }

      card.querySelector('.title').textContent = result.title;
      card.querySelector('.text').innerHTML = result.text;
      card.querySelector('.btn-link').href = result.link;
      card.querySelector('.img').src = result.images[0];
      card.querySelector('.img').alt = result.title;

      cards.append(card);
    }
  });

  document.addEventListener('click', function (e) {
    const button = e.target.closest('.collection_buttons .btn-less');

    if (!button) return true;

    const {cardsVisible, limit} = getData();

    if (limit === cardsVisible.length) return true;

    document.querySelector('.collection_buttons .btn-more').classList.remove('hidden');

    if (limit >= cardsVisible.length - limit) button.classList.add('hidden');

    const n = limit > cardsVisible.length - limit ? cardsVisible.length - limit : limit;

    for (let i = 0; i < n; i++) {
      cardsVisible.pop().classList.add('hidden');
    }
  });

});