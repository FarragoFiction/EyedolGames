

window.onload = () => {

  initThemes();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let themes = urlParams.get('themes');
  let name = urlParams.get('name');
  let fee = parseInt(urlParams.get('feeUnder'));

  if (name !== null || themes !== null) {
    handleRestaurantPage(name, themes, stringtoseed(name),fee);
  } else {
    handleCategories();
  }
  initCart();



}



