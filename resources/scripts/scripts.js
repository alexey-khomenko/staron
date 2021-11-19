document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    const hamburger = e.target.closest('[data-selector="hamburger"]');

    if (!hamburger) return true;

    hamburger.classList.toggle('active');
  });

  document.addEventListener('click', function (e) {
    const lang = e.target.closest('[data-selector="lang"]');

    if (!lang) return true;

    lang.classList.toggle('active');
  });

  document.addEventListener('click', function (e) {
    const application = e.target.closest('[data-selector="application"]');

    if (!application) return true;

    console.log('open modal application');
  });

});