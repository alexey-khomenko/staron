window.renderWhereToBuyMap = function () {
  console.log('todo render map...');
}

document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener('click', function (e) {
    const dealer = e.target.closest('.where_to_buy.bottom .dealer');
    const dealerActive = document.querySelector('.where_to_buy.bottom .dealer.active');
    const tabHead = e.target.closest('.where_to_buy.bottom .where_to_buy-tabs-head');

    if (!dealer) {
      if (dealerActive && !tabHead) {
        dealerActive.classList.remove('active');
        window.renderWhereToBuyMap();
      }

      return true;
    }

    if (dealer === dealerActive) return true;

    dealerActive?.classList.remove('active');
    dealer.classList.add('active');
    window.renderWhereToBuyMap();
  });

  document.addEventListener('click', function (e) {
    const button = e.target.closest('.where_to_buy.bottom .where_to_buy-tabs-head .btn');
    const buttonActive = document.querySelector('.where_to_buy.bottom .where_to_buy-tabs-head .btn.active');

    if (!button) return true;

    if (button === buttonActive) return true;

    buttonActive?.classList.remove('active');
    button.classList.add('active');

    const tabs = document.querySelectorAll('.where_to_buy-tabs-body .tabs_body');

    for (let tab of tabs) {
      if (tab.classList.contains(button.dataset.tab)) {
        tab.classList.remove('tab_hidden');
      }
      else {
        tab.classList.add('tab_hidden');
      }
    }
  });

});