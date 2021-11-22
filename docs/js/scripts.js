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

  // todo data-selector
  document.querySelector('.lang-wrapper').addEventListener('pointerenter', function () {
    document.querySelector('.lang-wrapper').classList.add('active');

    console.log('open dropdown');
  });

  document.addEventListener('pointerover', function (e) {
    if (e.target.closest('.lang-wrapper')) return true;

    document.querySelector('.lang-wrapper').classList.remove('active');

    console.log('close dropdown');
  });

});