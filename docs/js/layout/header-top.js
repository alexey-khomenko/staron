document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    const hamburger = e.target.closest('.header .button.hamburger');

    if (!hamburger) return true;

    hamburger.classList.toggle('active');
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.header .details.lang')) return true;

    document.querySelector('.header .details.lang').open = false;
  });

});