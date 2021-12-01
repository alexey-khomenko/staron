document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    if (e.target.closest('.header .details.lang')) return true;

    const languages = document.querySelectorAll('.header .details[open].lang');

    for (let lang of languages) {
      lang.open = false;
    }
  });

});