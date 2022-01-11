document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.news.top .details-head');

    if (!btn) return true;

    btn.classList.toggle('secondary');
    btn.classList.toggle('default');
  });



});