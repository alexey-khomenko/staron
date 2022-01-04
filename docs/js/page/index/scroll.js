document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.scroll-btn')) return true;

    const topOffset = document.querySelector('.header').offsetHeight;
    const elementPosition =  document.querySelector('.benefits').getBoundingClientRect().top;

    window.scrollBy({top: elementPosition - topOffset, behavior: 'smooth'});
  });

});