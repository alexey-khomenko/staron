document.addEventListener('DOMContentLoaded', function () {

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

    console.log(collection);
    console.log(title);
    console.log(text);
    console.log(link);
    console.log(properties);

    const img0 = document.querySelector('.modal-popup.collection_modal .images .img-0');
    const img1 = document.querySelector('.modal-popup.collection_modal .images .img-1');
    const img2 = document.querySelector('.modal-popup.collection_modal .images .img-2');
    const imgBig = document.querySelector('.modal-popup.collection_modal .images .img-big');

    img0.src = images[0];
    img1.src = images[1];
    img2.src = images[2];
    imgBig.src = images[0];

    window.openModal('collection_modal');
  });

});