document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('submit', function (e) {
    if (!e.target.closest('.header-large_menu .form.search')) return true;

    e.preventDefault();

    const searchEl = document.querySelector('.header-large_menu .form.search input');
    const search = searchEl.value.trim();

    console.log('search form', search);
  });

});