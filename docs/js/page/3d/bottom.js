document.addEventListener('DOMContentLoaded', function () {
  const selects = document.querySelector('.visualisation-3d.bottom .selects');

  document.addEventListener('click', function (e) {
    const placeHolder = e.target.closest('.visualisation-3d.bottom .select-placeholder-opened');

    if (!placeHolder) return true;

    placeHolder.closest('.select').classList.remove('active');
  });

  document.addEventListener('click', function (e) {
    const placeHolder = e.target.closest('.visualisation-3d.bottom .select-placeholder-closed');

    if (!placeHolder) return true;

    const newSelect = placeHolder.closest('.select');
    const oldSelect = selects.querySelector('.select.active');

    newSelect.classList.add('active');

    if (oldSelect) oldSelect.classList.remove('active');
  });

  document.addEventListener('click', function (e) {
    const select = e.target.closest('.visualisation-3d.bottom .select');

    if (select) return true;

    const oldSelect = selects.querySelector('.select.active');

    if (oldSelect) oldSelect.classList.remove('active');
  });

});