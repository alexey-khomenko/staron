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
    if (e.target.closest('.header .details.lang')) return true;

    document.querySelector('.header .details.lang').open = false;
  });

  document.addEventListener('click', function (e) {
    const searchBtn = e.target.closest('.header .link.search');

    if (!searchBtn) return true;

    if (window.isTablet()) {
      window.openHeaderLargeMenu();
      return true;
    }

    searchBtn.classList.add('hidden');
    document.querySelector('.header .form.search').classList.remove('hidden');
    document.querySelector('.header .form.search input').focus();
  });

  document.addEventListener('submit', function (e) {
    if (!e.target.closest('.header .form.search')) return true;

    e.preventDefault();

    const searchEl = document.querySelector('.header .form.search input');
    const search = searchEl.value.trim();

    console.log(search);
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.header .form.search')) return true;
    if (e.target.closest('.header .link.search')) return true;

    const searchEl = document.querySelector('.header .form.search input');
    const search = searchEl.value.trim();

    if (0 < search.length) return true;

    document.querySelector('.header .link.search').classList.remove('hidden');
    document.querySelector('.header .form.search').classList.add('hidden');
  });

});