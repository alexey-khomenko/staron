document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    const newBtn = e.target.closest('.benefits-tabs-head .secondary');

    if (!newBtn) return true;

    const oldBtn = document.querySelector('.benefits-tabs-head .default');
    const oldTab = document.querySelector(`.benefits-tabs-body-${oldBtn.dataset.tab}`);
    const newTab = document.querySelector(`.benefits-tabs-body-${newBtn.dataset.tab}`);

    oldBtn.classList.remove('default');
    oldBtn.classList.add('secondary');
    oldTab.classList.add('hidden');

    newBtn.classList.remove('secondary');
    newBtn.classList.add('default');
    newTab.classList.remove('hidden');
  });

});