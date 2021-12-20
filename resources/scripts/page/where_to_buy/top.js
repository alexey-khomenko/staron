document.addEventListener('DOMContentLoaded', function () {

  const MAX_MOBILE_CARDS = +document.querySelector('.where_to_buy.bottom .dealers').dataset.maxMobileCards;
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

//----------------------------------------------------------------------------------------------------------------------

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

//----------------------------------------------------------------------------------------------------------------------

  document.addEventListener('submit', function (e) {
    if (!e.target.closest('.where_to_buy.form')) return true;

    e.preventDefault();

    const city = document.querySelector('#where_to_buy-city').value.trim().toLowerCase();
    const type = document.querySelector('#where_to_buy-type').value.trim().toLowerCase();

    for (let dealer of document.querySelectorAll('.where_to_buy.bottom .dealer')) {

      if (CITY_MIN_LENGTH <= city.length && 0 < type.length) {
        if (dealer.dataset.city.toLowerCase().includes(city) && dealer.dataset.productTypes.toLowerCase().includes(type)) {
          dealer.classList.remove('hidden');
        }
        else {
          dealer.classList.add('hidden');
        }
      }
      else if (CITY_MIN_LENGTH <= city.length) {
        if (dealer.dataset.city.toLowerCase().includes(city)) {
          dealer.classList.remove('hidden');
        }
        else {
          dealer.classList.add('hidden');
        }
      }
      else if (0 < type.length) {
        if (dealer.dataset.productTypes.toLowerCase().includes(type)) {
          dealer.classList.remove('hidden');
        }
        else {
          dealer.classList.add('hidden');
        }
      }
      else {
        dealer.classList.remove('hidden');
      }

    }

    const notHidden = document.querySelectorAll('.where_to_buy.bottom .dealer:not(.hidden)');

    for (let i = 0, n = notHidden.length; i < n; i++) {
      if (i < MAX_MOBILE_CARDS) {
        notHidden[i].classList.remove('dealer_hidden');
      }
      else {
        notHidden[i].classList.add('dealer_hidden');
      }
    }

    document.querySelector('.where_to_buy.bottom .found span').textContent = String(notHidden.length);

    document.querySelector('.where_to_buy.bottom .dealers_less').classList.add('hidden');

    if (0 < document.querySelectorAll('.where_to_buy.bottom .dealer.dealer_hidden:not(.hidden)').length) {
      document.querySelector('.where_to_buy.bottom .dealers_more').classList.remove('hidden');
    }
    else {
      document.querySelector('.where_to_buy.bottom .dealers_more').classList.add('hidden');
    }

    window.renderWhereToBuyMap();
  });

//----------------------------------------------------------------------------------------------------------------------

  document.addEventListener('click', function (e) {
    const button = e.target.closest('.where_to_buy.bottom .dealers_more');

    if (!button) return true;

    const dealers = Array.from(document.querySelectorAll('.where_to_buy.bottom .dealer.dealer_hidden:not(.hidden)'));

    for (let i = 0, n = MAX_MOBILE_CARDS; i < n; i++) {
      if (0 < dealers.length) dealers.shift().classList.remove('dealer_hidden');
    }

    document.querySelector('.where_to_buy.bottom .dealers_less').classList.remove('hidden');

    if (0 === dealers.length) {
      document.querySelector('.where_to_buy.bottom .dealers_more').classList.add('hidden');
    }
  });

  document.addEventListener('click', function (e) {
    const button = e.target.closest('.where_to_buy.bottom .dealers_less');

    if (!button) return true;

    const dealers = Array.from(document.querySelectorAll('.where_to_buy.bottom .dealer:not(.hidden):not(.dealer_hidden)'));

    for (let i = 0, n = MAX_MOBILE_CARDS; i < n; i++) {
      if (MAX_MOBILE_CARDS < dealers.length) dealers.pop().classList.add('dealer_hidden');
    }

    document.querySelector('.where_to_buy.bottom .dealers_more').classList.remove('hidden');

    if (MAX_MOBILE_CARDS === dealers.length) {
      document.querySelector('.where_to_buy.bottom .dealers_less').classList.add('hidden');
    }
  });

});