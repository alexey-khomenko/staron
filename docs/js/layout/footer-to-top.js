document.addEventListener('DOMContentLoaded', function () {

  window.addEventListener('scroll', function () {
    const btn = document.querySelector('.footer-to-top');

    const windowHeight = +document.documentElement.clientHeight;
    const documentHeight = +document.querySelector('.page-wrapper').offsetHeight;
    const footerHeight = +document.querySelector('.footer').offsetHeight;

    const scrolled = +window.pageYOffset;
    const coordsFixed = windowHeight / 1.5;
    const coordsAbsolute = documentHeight - footerHeight - windowHeight;

    if (coordsFixed > coordsAbsolute) {
      btn.classList.remove('absolute');
      btn.classList.remove('fixed');

      return true;
    }

    if (scrolled > coordsAbsolute) {
      btn.classList.remove('fixed');
      btn.classList.add('absolute');

      return true;
    }

    if (scrolled > coordsFixed) {
      btn.classList.remove('absolute');
      btn.classList.add('fixed');

      return true;
    }

    btn.classList.remove('absolute');
    btn.classList.remove('fixed');
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.footer-to-top .button')) return true;

    document.querySelector('.main').scrollIntoView({behavior: 'smooth'});
  });

});