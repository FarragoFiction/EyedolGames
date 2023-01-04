

window.onload = () => {

  initThemes();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let themes = urlParams.get('themes');
  let seed = urlParams.get('seed');
  let name = urlParams.get('name');
  let fee = parseInt(urlParams.get('feeUnder'));

  if (name !== null || themes !== null || seed !== null) {
    handleRestaurantPage(name, themes, seed,fee);
  } else {
    handleCategories();
  }
  initCart();



}



