document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('submit', function (e) {
    if (!e.target.closest('.header-large_menu .form.search')) return true;

    e.preventDefault();

    const searchEl = document.querySelector('.header-large_menu .form.search input');
    const search = searchEl.value.trim();

    if (search.length < 2) return true;

    const query = encodeURIComponent(search);
    const link = `${searchEl.closest('form').dataset.searchPage}?q=${query}`;

    document.location.assign(link);
  });

});