document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', async function (e) {
    const button = e.target.closest('.search.results .show-more');

    if (!button) return true;

    const nav = document.querySelector('.search.results .nav');
    const params = (new URL(document.location)).searchParams;

    const q = params.get('q');
    const total = +nav.dataset.foundTotal;
    const loaded = +nav.querySelectorAll('.a').length;

    if (total <= loaded) {
      button.classList.add('hidden');
      return true;
    }

    const data = new FormData();
    data.set('loaded', String(loaded));
    data.set('total', String(total));
    data.set('q', q);
    const response = await fetch('/ajax/search_ajax.php', {method: 'POST', body: data});

    let results = [{
      image: 'images/content-search-results-1.jpg',
      title: 'Natural Bridge V111',
      subtitle: 'Коллекция METALLIC',
      text: 'Листы искусственного камня',
      link: 'collection.html',
    }];

    if (response.status === 200) {
      results = await response.json();
    }

    console.log('search results', results);

    for (let result of results) {
      const card = nav.querySelector('.a').cloneNode(true);

      card.href = result.link;
      card.querySelector('.l').src = result.image;
      card.querySelector('.title').textContent = result.title;
      card.querySelector('.subtitle').textContent = result.subtitle;
      card.querySelector('.text').textContent = result.text;

      nav.append(card);
    }

    if (total <= loaded + results.length) button.classList.add('hidden');
  });

});