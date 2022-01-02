document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    const image = e.target.closest('.product.images .img-small:not(.active)');

    if (!image) return true;

    document.querySelector('.product.images .img-small.active').classList.remove('active');
    document.querySelector('.product.images .img-big img').src = image.querySelector('img').src;
    image.classList.add('active');
  });

});