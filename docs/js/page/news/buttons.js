document.addEventListener('DOMContentLoaded', function () {

  function getData(content) {
    return {
      cardsAll: Array.from(document.querySelectorAll(`${content} .card`)),
      cardsVisible: Array.from(document.querySelectorAll(`${content} .card:not(.hidden)`)),
      cardsHidden: Array.from(document.querySelectorAll(`${content} .card.hidden`)),
      limit: +document.querySelector(content).dataset.limit,
      all: +document.querySelector(content).dataset.all,
    };
  }

  document.addEventListener('click', async function (e) {
    const buttons = '.news.buttons';
    const content = '.news.content';
    const ajaxLink = '/ajax/news_ajax.php';
    let results = [
      {
        image: 'images/content-news-1.jpg',
        type: 'Мероприятия',
        title: '2 марта в нашем учебном центре прошел учебный семинар для обработчиков акрилового камня',
        date: '6 сентября 2021',
        time: '2 мин',
        link: 'new.html',
      },
      {
        image: 'images/content-news-2.jpg',
        type: 'Видео',
        title: 'Обработка поверхностей Staron. Как создавать бесшовные стыки',
        date: '6 сентября 2021',
        time: '2 мин',
        link: 'new.html',
      },
    ];

    const btnMore = e.target.closest(`${buttons} .btn-more`);

    if (!btnMore) return true;

    const btnLess = document.querySelector(`${buttons} .btn-less`);

    const {cardsAll, cardsVisible, cardsHidden, limit, all} = getData(content);

    if (cardsVisible.length === all) return true;

    if (0 < cardsHidden.length) {
      btnLess.classList.remove('hidden');

      if (all <= cardsVisible.length + limit) btnMore.classList.add('hidden');

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

    const response = await fetch(ajaxLink, {method: 'POST', body: data});

    if (response.status === 200) {
      results = await response.json();
    }

    console.log(`${content} ajax`, results);

    if (all === cardsAll.length + results.length) btnMore.classList.add('hidden');

    btnLess.classList.remove('hidden');

    const cards = document.querySelector(content);

    for (let result of results) {
      const card = cards.querySelector('.card').cloneNode(true);

      card.href = result.link;
      card.querySelector('img').src = result.image;
      card.querySelector('.type').innerHTML = result.text;
      card.querySelector('.title').textContent = result.title;
      card.querySelector('.date').textContent = result.date;
      card.querySelector('.time').textContent = result.time;

      cards.append(card);
    }
  });

  document.addEventListener('click', function (e) {
    const buttons = '.news.buttons';
    const content = '.news.content';

    const btnLess = e.target.closest(`${buttons} .btn-less`);

    if (!btnLess) return true;

    const btnMore = document.querySelector(`${buttons} .btn-more`);

    const {cardsVisible, limit} = getData(content);

    if (limit === cardsVisible.length) return true;

    btnMore.classList.remove('hidden');

    if (limit >= cardsVisible.length - limit) btnLess.classList.add('hidden');

    const n = limit > cardsVisible.length - limit ? cardsVisible.length - limit : limit;

    for (let i = 0; i < n; i++) {
      cardsVisible.pop().classList.add('hidden');
    }
  });

});