document.addEventListener('DOMContentLoaded', function () {

  function DesktopHandler (e) {
    if (window.isTablet()) return true;

    const liElem = e.target.closest('li');

    const column = liElem.dataset.column;
    const ul = liElem.dataset.ul;
    const li = liElem.dataset.li;

    let columnNumber = 1;

    if (liElem.closest('.column').classList.contains('column-2')) columnNumber = 2;
    else if (liElem.closest('.column').classList.contains('column-3')) columnNumber = 3;

    const child = document.querySelector(`.header-large_menu-body ul[data-parent="${column}.${ul}.${li}"]`);

    if (child) {
      if (isTouch() && 'A' === e.target.tagName) e.preventDefault();

      liElem.closest('.column').querySelector('li.active')?.classList.remove('active');
      child.closest('.column').querySelector('ul.open')?.classList.remove('open');

      if (1 === columnNumber) {
        document.querySelector('.header-large_menu-body .column-2 li.active')?.classList.remove('active');
        document.querySelector('.header-large_menu-body .column-3 ul.open')?.classList.remove('open');
      }

      liElem.classList.add('active');
      child.classList.add('open');
    }
    else {
      for (let i = columnNumber + 1; i <= 3; i++) {
        document.querySelector(`.header-large_menu-body .column-${i - 1} li.active`)?.classList.remove('active');
        document.querySelector(`.header-large_menu-body .column-${i} ul.open`)?.classList.remove('open');
      }
    }
  }

  const isTouch = () => 'ontouchstart' in window || window?.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0;

  for (let item of document.querySelectorAll('.header-large_menu-body .column li')) {
    item.addEventListener('mouseenter', function (e) {
      if (!isTouch()) DesktopHandler(e);
    });

    item.addEventListener('click', function (e) {
      if (isTouch()) DesktopHandler(e);
    });
  }

  document.querySelector('.header-large_menu-body').addEventListener('mouseleave', function () {
    if (isTouch()) return true;
    if (window.isTablet()) return true;

    for (let li of document.querySelectorAll(`.column li.active`)) {
      li.classList.remove('active');
    }

    for (let ul of document.querySelectorAll(`.column ul.open`)) {
      ul.classList.remove('open');
    }
  });

  document.querySelector('.header-large_menu-body').addEventListener('click', function (e) {
    if (!window.isTablet()) return true;

    const liElem = e.target.closest('li');

    if (!liElem) return true;

    const column = liElem.dataset.column;
    const ul = liElem.dataset.ul;
    const li = liElem.dataset.li;

    let columnNumber = 1;

    if (liElem.closest('.column').classList.contains('column-2')) columnNumber = 2;
    else if (liElem.closest('.column').classList.contains('column-3')) columnNumber = 3;

    const child = document.querySelector(`.header-large_menu-body ul[data-parent="${column}.${ul}.${li}"]`);

    if (child) {
      if ('A' === e.target.tagName) e.preventDefault();

      if (1 === columnNumber) {
        document.querySelector('.header-large_menu-tablet').classList.add('hidden');
        liElem.closest('ul').classList.add('hidden');
      }
      else {
        liElem.closest('.column').querySelector('.tablet-sub-menu-head').classList.add('hidden');
        liElem.closest('ul').classList.remove('open');
      }

      const head = child.closest('.column').querySelector('.tablet-sub-menu-head');
      head.querySelector('span').textContent = liElem.querySelector('a').textContent;
      head.classList.remove('hidden');

      child.classList.add('open');
    }
  });

});