document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    const hamburger = e.target.closest('[data-selector="hamburger"]');

    if (!hamburger) return true;

    hamburger.classList.toggle('active');
  });

  document.addEventListener('click', function (e) {
    const application = e.target.closest('[data-selector="application"]');

    if (!application) return true;

    console.log('open modal application');
  });

  document.querySelector('[data-selector="lang"]').addEventListener('pointerenter', function () {
    document.querySelector('[data-selector="lang"]').classList.add('active');
  });

  document.addEventListener('pointerover', function (e) {
    if (e.target.closest('[data-selector="lang"]')) return true;

    document.querySelector('[data-selector="lang"]').classList.remove('active');
  });

});