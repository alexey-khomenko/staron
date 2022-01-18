document.addEventListener('DOMContentLoaded', function () {

  function changeModal (card) {
    const imagesObj = document.querySelector('.modal-popup.collection_modal .images');

    imagesObj.querySelector('.img-small.active').classList.remove('active');
    imagesObj.querySelector('.img-0').classList.add('active');

    const img0 = imagesObj.querySelector('.img-0 img');
    const img1 = imagesObj.querySelector('.img-1 img');
    const img2 = imagesObj.querySelector('.img-2 img');
    const imgBig = imagesObj.querySelector('.img-big img');

    const images = Array.from(card.querySelectorAll('.images li')).map((i) => (i.textContent).trim());

    img0.src = images[0];
    imgBig.src = images[0];

    if (images.length < 3) {
      img2.closest('.img-small').classList.add('hidden');
    }
    else {
      img2.src = images[2];
      img2.closest('.img-small').classList.remove('hidden');
    }

    if (images.length < 2) {
      img1.closest('.img-small').classList.add('hidden');
    }
    else {
      img1.src = images[1];
      img1.closest('.img-small').classList.remove('hidden');
    }


    const textsObj = document.querySelector('.modal-popup.collection_modal .texts');

    textsObj.querySelector('.collection-title').textContent = card.closest('.collection_cards').dataset.title;
    textsObj.querySelector('.product-title').textContent = card.querySelector('.title').textContent;
    textsObj.querySelector('.text').innerHTML = card.querySelector('.text').textContent;
    textsObj.querySelector('.btn-link').href = card.querySelector('.btn-link').href;

    const props = textsObj.querySelector('.properties');
    props.innerHTML = '';

    const properties = Array.from(card.querySelectorAll('.properties li')).map((i) => (i.textContent).trim());

    for (let prop of properties) {
      props.insertAdjacentHTML('beforeend', `<div>${prop}</div>`);
    }

    const cards = Array.from(document.querySelectorAll('.collection_cards .card'));
    const next = cards.length > cards.indexOf(card) + 1 ? cards.indexOf(card) + 1 : 0;
    textsObj.querySelector('.btn-next').dataset.next = String(next);
  }

  document.addEventListener('click', function (e) {
    const button = e.target.closest('.collection-wrapper .collection_cards .btn-popup');

    if (!button) return true;

    changeModal(button.closest('.card'));

    window.openModal('collection_modal');
  });

  document.addEventListener('click', function (e) {
    const button = e.target.closest('.modal-popup.collection_modal .btn-next');

    if (!button) return true;

    const next = +button.dataset.next;
    const cards = Array.from(document.querySelectorAll('.collection_cards .card'));

    changeModal(cards[next]);
  });

  document.addEventListener('click', function (e) {
    const image = e.target.closest('.modal-popup.collection_modal .img-small:not(.active)');

    if (!image) return true;

    document.querySelector('.modal-popup.collection_modal .img-small.active').classList.remove('active');
    document.querySelector('.modal-popup.collection_modal .images .img-big img').src = image.querySelector('img').src;
    image.classList.add('active');
  });

});