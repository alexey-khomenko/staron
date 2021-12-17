document.addEventListener('DOMContentLoaded', function () {

document.addEventListener('submit', function (e) {
  const form = e.target.closest('.where_to_buy.form');

  if (!form) return true;

  e.preventDefault();

  console.log('filter');
});

});