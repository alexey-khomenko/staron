document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    const button = e.target.closest('.catalog_filter .btn-filter-title');

    if (!button) return true;

    document.querySelector('.catalog_filter .body-wrapper').classList.toggle('md-hidden');
    document.querySelector('.catalog_filter .filter_reset').classList.toggle('md-hidden');
  });

});