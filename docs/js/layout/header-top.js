document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    const hamburger = e.target.closest('.header .button.hamburger');

    if (!hamburger) return true;

    if (hamburger.classList.contains('active')) {
      window.closeHeaderLargeMenu();
    }
    else {
      window.openHeaderLargeMenu();
    }
  });

  document.addEventListener('click', function (e) {
    const searchBtn = e.target.closest('.header-top .link.search');

    if (!searchBtn) return true;

    if (window.isTablet()) {
      window.openHeaderLargeMenu();
      document.querySelector('.header-large_menu .form.search input').focus();

      return true;
    }

    searchBtn.classList.add('hidden');
    document.querySelector('.header-top .form.search').classList.remove('hidden');
    document.querySelector('.header-top .form.search input').focus();
  });

  document.addEventListener('submit', function (e) {
    if (!e.target.closest('.header-top .form.search')) return true;

    e.preventDefault();

    const searchEl = document.querySelector('.header-top .form.search input');
    const search = searchEl.value.trim();

    if (search.length < 2) return true;

    const query = encodeURIComponent(search);
    const link = `${searchEl.closest('form').dataset.searchPage}?q=${query}`;

    document.location.assign(link);
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.header-top .form.search')) return true;
    if (e.target.closest('.header-top .link.search')) return true;

    const searchEl = document.querySelector('.header-top .form.search input');
    const search = searchEl.value.trim();

    if (0 < search.length) return true;

    document.querySelector('.header-top .link.search').classList.remove('hidden');
    document.querySelector('.header-top .form.search').classList.add('hidden');
  });

});