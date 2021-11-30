document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    if (e.target.closest('.header .details.lang')) return true;

    document.querySelector('.header .details.lang').open = false;
  });

});