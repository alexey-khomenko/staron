document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    const button = e.target.closest('.collection_filter .btn-filter-title');

    if (!button) return true;

    document.querySelector('.collection_filter .body-wrapper').classList.toggle('md-hidden');
    document.querySelector('.collection_filter .filter_reset').classList.toggle('md-hidden');
  });

});