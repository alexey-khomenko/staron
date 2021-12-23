window.openHeaderLargeMenu = function () {
  document.querySelector('.header-large_menu').classList.remove('hidden');
  document.querySelector('.header .button.hamburger').classList.add('active');

  if (window.isTablet()) window.closeBody();
};

window.closeHeaderLargeMenu = function () {
  document.querySelector('.header-large_menu').classList.add('hidden');
  document.querySelector('.header .button.hamburger').classList.remove('active');

  if (document.querySelector('.modal-popup.opened')) return true;

  window.openBody();
};

document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.header-large_menu-close')) return true;

    window.closeHeaderLargeMenu();
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.header-large_menu')) return true;
    if (e.target.closest('.header .button.hamburger')) return true;

    if (window.isTablet()) return true;

    window.closeHeaderLargeMenu();
  });

});