document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    const img = e.target.closest('.gallery.content .card');

    if (!img) return true;

    const src = img.dataset.srcLarge;

    window.openModal('gallery');

    document.querySelector('.modal-popup.gallery .body img').src = src;
  });

});