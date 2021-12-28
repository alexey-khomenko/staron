document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    const image = e.target.closest('.modal-popup.collection_modal .img-small:not(.active)');

    if (!image) return true;

    document.querySelector('.modal-popup.collection_modal .img-small.active').classList.remove('active');
    document.querySelector('.modal-popup.collection_modal .images .img-big img').src = image.querySelector('img').src;
    image.classList.add('active');
  });

  document.addEventListener('click', function (e) {
    const button = e.target.closest('.collection-wrapper .collection_cards .btn-popup');

    if (!button) return true;

    const card = button.closest('.card');

    const collection = card.closest('.collection_cards').dataset.collectionTitle;
    const title = card.querySelector('.title').textContent;
    const text = card.querySelector('.text').textContent;
    const link = card.querySelector('.btn-link').href;

    const images = Array.from(card.querySelectorAll('.images li')).map((i) => (i.textContent).trim());
    const properties = Array.from(card.querySelectorAll('.properties li')).map((i) => (i.textContent).trim());

    const img0 = document.querySelector('.modal-popup.collection_modal .images .img-0 img');
    const img1 = document.querySelector('.modal-popup.collection_modal .images .img-1 img');
    const img2 = document.querySelector('.modal-popup.collection_modal .images .img-2 img ');
    const imgBig = document.querySelector('.modal-popup.collection_modal .images .img-big img');

    img0.src = images[0];
    img1.src = images[1];
    img2.src = images[2];
    imgBig.src = images[0];

    document.querySelector('.modal-popup.collection_modal .texts .text').innerHTML = text;
    document.querySelector('.modal-popup.collection_modal .texts .collection-title').textContent = collection;
    document.querySelector('.modal-popup.collection_modal .texts .product-title').textContent = title;

    console.log(properties);
    console.log(link);

    window.openModal('collection_modal');
  });

});