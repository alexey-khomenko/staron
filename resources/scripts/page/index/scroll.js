document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.scroll-btn')) return true;

    document.querySelector('.benefits').scrollIntoView({behavior: 'smooth'});
  });

});