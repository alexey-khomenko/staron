document.addEventListener('DOMContentLoaded', function () {

  function getData() {
    return {
      cardsAll: Array.from(document.querySelectorAll('.news.content .card')),
      cardsVisible: Array.from(document.querySelectorAll('.news.content .card:not(.hidden)')),
      cardsHidden: Array.from(document.querySelectorAll('.news.content .card.hidden')),
      limit: +document.querySelector('.news.content').dataset.limit,
      all: +document.querySelector('.news.content').dataset.all,
    };
  }

  document.addEventListener('click', async function (e) {
    const btnMore = e.target.closest('.news.buttons .btn-more');

    if (!btnMore) return true;

    const btnLess = document.querySelector('.news.buttons .btn-less');

    // todo

    btnMore.classList.toggle('hidden');
    btnLess.classList.toggle('hidden');
  });

  document.addEventListener('click', function (e) {
    const btnLess = e.target.closest('.news.buttons .btn-less');

    if (!btnLess) return true;

    const btnMore = document.querySelector('.news.buttons .btn-more');

    // todo

    btnLess.classList.toggle('hidden');
    btnMore.classList.toggle('hidden');
  });

});