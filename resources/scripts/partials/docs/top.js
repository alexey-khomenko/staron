document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.docs.top .btn')) return true;

    window.openModal('docs');
  });

});