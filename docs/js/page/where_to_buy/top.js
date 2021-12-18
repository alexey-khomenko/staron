document.addEventListener('DOMContentLoaded', function () {

  const CITY_MIN_LENGTH = 2;

  function showCityOptions() {
    document.querySelector('.where_to_buy.form .city-wrapper .options').classList.remove('hidden');
  }

  function hideCityOptions() {
    document.querySelector('.where_to_buy.form .city-wrapper .options').classList.add('hidden');
  }

  function filterCityOptions(value) {
    for (let option of document.querySelectorAll('.where_to_buy.form .city-wrapper .option')) {
      if (option.dataset.value.toLowerCase().includes(value)) {
        option.classList.remove('hidden');
      }
      else {
        option.classList.add('hidden');
      }
    }
  }

  document.querySelector('#where_to_buy-city').addEventListener('focus', function (e) {
    const value = e.target.value.trim().toLowerCase();

    if (value.length < CITY_MIN_LENGTH) {
      hideCityOptions();
      return true;
    }

    showCityOptions();
    filterCityOptions(value);
  });

  document.querySelector('#where_to_buy-city').addEventListener('input', function (e) {
    const value = e.target.value.trim().toLowerCase();

    if (value.length < CITY_MIN_LENGTH) {
      hideCityOptions();
      return true;
    }

    showCityOptions();
    filterCityOptions(value);
  });

  document.addEventListener('click', function (e) {
    const cityWrapper = e.target.closest('.where_to_buy.form .city-wrapper');

    if (cityWrapper) return true;

    hideCityOptions();
  });

  document.addEventListener('click', function (e) {
    const option = e.target.closest('.where_to_buy.form .city-wrapper .option');

    if (!option) return true;

    document.querySelector('#where_to_buy-city').value = option.dataset.value;
    hideCityOptions();
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.where_to_buy.form .select summary input[readonly]')) return true;

    const details = document.querySelector('.where_to_buy.form .select');

    details.open = !details.open;
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.where_to_buy.form .select')) return true;

    document.querySelector('.where_to_buy.form .select').open = false;
  });

  document.addEventListener('click', function (e) {
    const select = e.target.closest('.where_to_buy.form .select');
    const option = e.target.closest('.where_to_buy.form .select .option:not(.active)');

    if (!option) return true;

    const oldActive = select.querySelector('.option.active');

    if (oldActive) oldActive.classList.remove('active');

    option.classList.add('active');
    select.open = false;

    document.querySelector('#where_to_buy-type').value = option.dataset.value;
  });

  // todo disabled submit

  document.addEventListener('submit', function (e) {
    const form = e.target.closest('.where_to_buy.form');

    if (!form) return true;

    e.preventDefault();

    console.log('todo filter tiles');
  });

});