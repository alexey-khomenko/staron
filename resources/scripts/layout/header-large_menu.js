document.addEventListener('DOMContentLoaded', function () {

  function getChild(el) {
    const column = el.dataset.column;
    const ul = el.dataset.ul;
    const li = el.dataset.li;

    return document.querySelector(`.header-large_menu-body ul[data-parent="${column}.${ul}.${li}"]`);
  }

  function getColumnNumber(el) {
    if (el.closest('.column').classList.contains('column-2')) return 2;
    else if (el.closest('.column').classList.contains('column-3')) return 3;

    return 1;
  }

  function DesktopHandler(e) {
    if (window.isTablet()) return true;

    const liElem = e.target.closest('li');
    const column = getColumnNumber(liElem);
    const child = getChild(liElem);

    if (child) {
      if (window.isTouch() && 'A' === e.target.tagName) e.preventDefault();

      liElem.closest('.column').querySelector('li.active')?.classList.remove('active');
      child.closest('.column').querySelector('ul:not(.hidden)')?.classList.add('hidden');

      if (1 === +column) {
        document.querySelector('.header-large_menu-body .column-2 li.active')?.classList.remove('active');
        document.querySelector('.header-large_menu-body .column-3 ul:not(.hidden)')?.classList.add('hidden');
      }

      liElem.classList.add('active');
      child.classList.remove('hidden');
    }
    else {
      for (let i = +column + 1; i <= 3; i++) {
        document.querySelector(`.header-large_menu-body .column-${i - 1} li.active`)?.classList.remove('active');
        document.querySelector(`.header-large_menu-body .column-${i} ul:not(.hidden)`)?.classList.add('hidden');
      }
    }
  }

  for (let item of document.querySelectorAll('.header-large_menu-body .column li')) {
    item.addEventListener('mouseenter', function (e) {
      if (!window.isTouch()) DesktopHandler(e);
    });

    item.addEventListener('click', function (e) {
      if (window.isTouch()) DesktopHandler(e);
    });
  }

  document.querySelector('.header-large_menu-body').addEventListener('mouseleave', function () {
    if (window.isTouch()) return true;
    if (window.isTablet()) return true;

    for (let li of document.querySelectorAll('.column li.active')) {
      li.classList.remove('active');
    }

    for (let ul of document.querySelectorAll('.column:not(.column-1) ul:not(.hidden)')) {
      ul.classList.add('hidden');
    }
  });

  document.querySelector('.header-large_menu-body').addEventListener('click', function (e) {
    if (!window.isTablet()) return true;

    const liElem = e.target.closest('li');

    if (!liElem) return true;

    const column = getColumnNumber(liElem);
    const child = getChild(liElem);

    if (child) {
      if ('A' === e.target.tagName) e.preventDefault();

      if (1 === +column) {
        document.querySelector('.header-large_menu-tablet').classList.add('hidden');
        liElem.closest('ul').classList.add('hidden');
      }
      else {
        liElem.closest('.column').querySelector('.tablet-sub-menu-head').classList.add('hidden');
        liElem.closest('ul').classList.add('hidden');
      }

      const head = child.closest('.column').querySelector('.tablet-sub-menu-head');
      head.querySelector('span').textContent = liElem.querySelector('a').textContent;
      head.classList.remove('hidden');

      child.classList.remove('hidden');
    }
  });

  document.querySelector('.header-large_menu-body').addEventListener('click', function (e) {
    const head = e.target.closest('.tablet-sub-menu-head');
    const span = e.target.closest('.tablet-sub-menu-head span');
    const svg = e.target.closest('.tablet-sub-menu-head svg');

    if (!span && !svg) return true;

    const list = head.closest('.column').querySelector('ul:not(.hidden)');
    const [column, ul] = list.dataset.parent.split('.');

    head.classList.add('hidden');
    list.classList.add('hidden');

    if (1 === +column) {
      document.querySelector('.header-large_menu-tablet').classList.remove('hidden');
      document.querySelector('.header-large_menu-body .column-1 ul').classList.remove('hidden');
    }
    else {
      document.querySelector(`.header-large_menu-body .column-${column} .tablet-sub-menu-head`).classList.remove('hidden');
      document.querySelector(`.header-large_menu-body .column-${column} .ul-${ul}`).classList.remove('hidden');
    }
  });

});