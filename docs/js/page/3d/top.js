document.addEventListener('DOMContentLoaded', function () {
  function setActiveCard(newCard) {
    if (!newCard) return true;

    const oldCard = newCard.closest('.cards').querySelector('.card.active');

    newCard.classList.add('active');

    document.querySelector('.visualisation-3d .wrapper-3d img').src = newCard.dataset.srcLarge;
    document.querySelector('.visualisation-3d .to-product').href = newCard.dataset.productLink;

    if (oldCard) oldCard.classList.remove('active');
  }

  const cards = document.querySelectorAll('.visualisation-3d.top .card');
  setActiveCard(cards[0]);

  document.addEventListener('click', function (e) {
    const newCard = e.target.closest('.visualisation-3d.top .card:not(.active)');
    setActiveCard(newCard);
  });
});