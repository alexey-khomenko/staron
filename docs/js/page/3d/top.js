document.addEventListener('DOMContentLoaded', function () {

  const selectCollection = document.querySelector('.visualisation-3d.bottom .select-collection');
  const selectColor = document.querySelector('.visualisation-3d.bottom .select-color');
  const selectProduct = document.querySelector('.visualisation-3d.bottom .select-product');
  const img3d = document.querySelector('.visualisation-3d .wrapper-3d img');
  const prodLink = document.querySelector('.visualisation-3d .to-product');

  function run(newCard) {
    if (!newCard) return true;

    setActiveCard(newCard);
    window.resetSelectColor();
    setSelectColor(newCard);
    window.resetSelectCollection();
    window.resetSelectProduct();
  }

  function setActiveCard(newCard) {
    const oldCard = newCard.closest('.cards').querySelector('.card.active');
    if (oldCard) oldCard.classList.remove('active');

    newCard.classList.add('active');

    img3d.src = newCard.dataset.srcLarge;
    prodLink.href = newCard.dataset.productLink;
  }

  function setSelectColor(newCard) {
    const interiorType = newCard.dataset.interiorType;

    selectColor.querySelector(`.colors[data-interior-type="${interiorType}"]`).classList.remove('hidden');
  }

  window.resetSelectColor = function () {
    selectColor.querySelector('.select-placeholder').classList.remove('hidden');
    selectColor.querySelector('.select-title').classList.add('hidden');

    const activeColor = selectColor.querySelector('.color.active');
    if (activeColor) activeColor.classList.remove('active');

    const activeColors = selectColor.querySelector('.colors:not(.hidden)');
    if (activeColors) activeColors.classList.add('hidden');
  };

  window.resetSelectCollection = function () {
    selectCollection.querySelector('.summary').classList.add('disabled');
    selectCollection.querySelector('.select-placeholder').classList.remove('hidden');
    selectCollection.querySelector('.select-title').classList.add('hidden');

    const activeCollection = selectCollection.querySelector('.collection.active');
    if (activeCollection) activeCollection.classList.remove('active');
  };

  window.resetSelectProduct = function () {
    selectProduct.querySelector('.summary').classList.add('disabled');
    selectProduct.querySelector('.select-placeholder').classList.remove('hidden');
    selectProduct.querySelector('.select-title').classList.add('hidden');
    selectProduct.querySelector('.products').innerHTML = '';
  };

  run(document.querySelector('.visualisation-3d.top .card'));

  document.addEventListener('click', function (e) {
    const newCard = e.target.closest('.visualisation-3d.top .card:not(.active)');
    run(newCard);
  });

});