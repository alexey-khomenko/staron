document.addEventListener('DOMContentLoaded', function () {

  const selectCollection =  document.querySelector('.visualisation-3d.bottom .select-collection');
  const selectColor = document.querySelector('.visualisation-3d.bottom .select-color');
  const selectProduct = document.querySelector('.visualisation-3d.bottom .select-product');
  const img3d = document.querySelector('.visualisation-3d .wrapper-3d img');
  const prodLink = document.querySelector('.visualisation-3d .to-product');

  document.addEventListener('click', function (e) {
    const select = e.target.closest('.visualisation-3d.bottom .select');

    if (!select) return true;

    const oldSelect = document.querySelector('.visualisation-3d.bottom .select[open]');

    if (oldSelect && select !== oldSelect) oldSelect.open = false;
  });

  document.addEventListener('click', function (e) {
    const select = e.target.closest('.visualisation-3d.bottom .select');

    if (select) return true;

    const oldSelect = document.querySelector('.visualisation-3d.bottom .select[open]');

    if (oldSelect) oldSelect.open = false;
  });

  document.addEventListener('click', function (e) {
    const summary = e.target.closest('.visualisation-3d.bottom .select .summary.disabled');

    if (!summary) return true;

    e.preventDefault();
  });

  document.addEventListener('click', function (e) {
    const newColor = e.target.closest('.visualisation-3d.bottom .select-color .color:not(.active)');

    if (!newColor) return true;

    const oldColor = selectColor.querySelector('.color.active');

    newColor.classList.add('active');
    newColor.closest('.select').open = false;

    if (oldColor) oldColor.classList.remove('active');

    img3d.src = newColor.dataset.srcLarge;

    // todo set summary

    window.resetSelectCollection();
    window.resetSelectProduct();

    selectColor.querySelector('.select-placeholder').classList.add('hidden');
    selectColor.querySelector('.select-title').textContent = newColor.dataset.title;
    selectColor.querySelector('.select-title').classList.remove('hidden');

    selectCollection.querySelector('.summary').classList.remove('disabled');
  });

  document.addEventListener('click', function (e) {
    const newCollection = e.target.closest('.visualisation-3d.bottom .select-collection .collection:not(.active)');

    if (!newCollection) return true;

    const oldCollection = selectCollection.querySelector('.collection.active');

    newCollection.classList.add('active');
    newCollection.closest('.select').open = false;

    if (oldCollection) oldCollection.classList.remove('active');

    // todo set summary

    window.resetSelectProduct();

    selectCollection.querySelector('.select-placeholder').classList.add('hidden');
    selectCollection.querySelector('.select-title').textContent = newCollection.textContent;
    selectCollection.querySelector('.select-title').classList.remove('hidden');

    // todo ajax

    selectProduct.querySelector('.summary').classList.remove('disabled');
  });

});