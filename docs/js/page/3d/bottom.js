document.addEventListener('DOMContentLoaded', function () {

  const selectCollection = document.querySelector('.visualisation-3d.bottom .select-collection');
  const selectColor = document.querySelector('.visualisation-3d.bottom .select-color');
  const selectProduct = document.querySelector('.visualisation-3d.bottom .select-product');
  const img3d = document.querySelector('.visualisation-3d .wrapper-3d img');
  const prodLink = document.querySelector('.visualisation-3d .to-product');

  async function setProducts() {
    const type = document.querySelector('.visualisation-3d.top .card.active span').textContent;
    const color = selectColor.querySelector('.select-title-value').textContent;
    const collection = selectCollection.querySelector('.select-title-value').textContent;

    const data = new FormData();
    data.set('type', type);
    data.set('color', color);
    data.set('collection', collection);
    const response = await fetch('/ajax/3d_products_ajax.php', {method: 'POST', body: data});

    let results = [
      {
        src: 'images/content-catalog-1.jpg',
        title: 'product name 1',
        srcLarge: 'images/3d-interior-1.jpg',
        productLink: 'product.html',
      },
      {
        src: 'images/content-catalog-2.jpg',
        title: 'product name 2',
        srcLarge: 'images/3d-interior-2.jpg',
        productLink: 'product.html',
      },
      {
        src: 'images/content-catalog-3.jpg',
        title: 'product name 3',
        srcLarge: 'images/3d-interior-3.jpg',
        productLink: 'product.html',
      },
      {
        src: 'images/content-catalog-4.jpg',
        title: 'product name 4',
        srcLarge: 'images/3d-interior-4.jpg',
        productLink: 'product.html',
      },
      {
        src: 'images/content-catalog-5.jpg',
        title: 'product name 5',
        srcLarge: 'images/3d-interior-1.jpg',
        productLink: 'product.html',
      },
      {
        src: 'images/content-catalog-6.jpg',
        title: 'product name 6',
        srcLarge: 'images/3d-interior-2.jpg',
        productLink: 'product.html',
      },
      {
        src: 'images/content-catalog-7.jpg',
        title: 'product name 7',
        srcLarge: 'images/3d-interior-3.jpg',
        productLink: 'product.html',
      },
      {
        src: 'images/content-catalog-8.jpg',
        title: 'product name 8',
        srcLarge: 'images/3d-interior-4.jpg',
        productLink: 'product.html',
      },
    ];

    if (response.status === 200) {
      results = await response.json();
    }

    let tmp = '';
    for (let product of results) {
      tmp += `<div class="product" data-title="${product.title}" data-src-large="${product.srcLarge}" data-product-link="${product.productLink}">`;
      tmp += `<img alt="" src="${product.src}"/>`;
      tmp += `</div>`;
    }

    selectProduct.querySelector('.products').innerHTML = tmp;
  }

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

    window.resetSelectCollection();
    window.resetSelectProduct();

    selectColor.querySelector('.select-placeholder').classList.add('hidden');
    selectColor.querySelector('.select-title-color').style.backgroundColor = newColor.style.backgroundColor;
    selectColor.querySelector('.select-title-value').textContent = newColor.dataset.title;
    selectColor.querySelector('.select-title').classList.remove('hidden');

    selectCollection.querySelector('.summary').classList.remove('disabled');
  });

  document.addEventListener('click', async function (e) {
    const newCollection = e.target.closest('.visualisation-3d.bottom .select-collection .collection:not(.active)');

    if (!newCollection) return true;

    const oldCollection = selectCollection.querySelector('.collection.active');

    newCollection.classList.add('active');
    newCollection.closest('.select').open = false;

    if (oldCollection) oldCollection.classList.remove('active');

    window.resetSelectProduct();

    selectCollection.querySelector('.select-placeholder').classList.add('hidden');
    selectCollection.querySelector('.select-title-value').textContent = newCollection.textContent;
    selectCollection.querySelector('.select-title').classList.remove('hidden');

    await setProducts();

    selectProduct.querySelector('.summary').classList.remove('disabled');
  });

  document.addEventListener('click', function (e) {
    const newProduct = e.target.closest('.visualisation-3d.bottom .select-product .product:not(.active)');

    if (!newProduct) return true;

    const oldProduct = selectProduct.querySelector('.product.active');
    if (oldProduct) oldProduct.classList.remove('active');

    newProduct.classList.add('active');
    newProduct.closest('.select').open = false;

    img3d.src = newProduct.dataset.srcLarge;
    prodLink.href = newProduct.dataset.productLink;

    selectProduct.querySelector('.select-placeholder').classList.add('hidden');
    selectProduct.querySelector('.select-title-color').src = newProduct.querySelector('img').src;
    selectProduct.querySelector('.select-title-value').textContent = newProduct.dataset.title;
    selectProduct.querySelector('.select-title').classList.remove('hidden');
  });

});