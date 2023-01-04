const cart_key = "ZAMPANINI_CART"
const cart_toggle_key = "ZAMPANINI_CART_TOGGLE"

let anyFees =true; 


const initCart = () => {
  anyFees = false;
  syncCartNumber();
  syncCartToggle();
  const button = document.querySelector("#cart-icon");
  button.onclick = () => {
    toggleCart();
  }



  window.onclick = (e) => {
    if (!e.target.className.includes("one-featured-meal") && !e.target.className.includes("one-food-item") && !e.target.id.includes("cart") && !e.target.className.includes("cart")) {
      closeCart();
    }
  }

  const entries = getCartFromLocalStorage();

  const checkout = document.querySelector("#cart-total");
  checkout.onclick = () => {
    localStorage.removeItem(cart_key);
    closeCart();

    window.location.href = `/News?referer=Zampanini&referer_details=${encodeURIComponent(JSON.stringify(window.location.search))}&details=${encodeURIComponent(JSON.stringify(entries[0]))}`;
  }
  const cart = document.querySelector("#cart");
  cart.innerHTML = "";

  const subTotal = createElementWithClassAndParent("h2", cart, "h2");
  subTotal.innerText = "Subtotal:";
  const restaurantContainer = createElementWithClassAndParent("div", cart, "cart-restaurant-container");

  const itemsHeader = createElementWithClassAndParent("h2", cart, "h2");
  itemsHeader.innerText = "Items:";

  handleCollatingRestaurants(entries, restaurantContainer);
  const warning = document.querySelector("#warning");
  if(anyFees){
    warning.style.display = "block";
  }else{
    warning.style.display = "none";

  }

  for (let entry of entries) {
    renderOneCartEntry(entry);
  }

}

//make a hash map of restaurant names and keep track of how much money you've spent at each and how that compares to the fee you need to surpass.
const handleCollatingRestaurants = (entries, container) => {
  let dictionary = {};
  for (let entry of entries) {
    if (dictionary[entry.restaurant_name]) {
      const old_price = dictionary[entry.restaurant_name].subTotal;
      dictionary[entry.restaurant_name] = { name: entry.restaurant_name, subTotal: old_price + parseFloat(entry.price), feeUnder: entry.feeUnder }

    } else {
      dictionary[entry.restaurant_name] = { name: entry.restaurant_name, subTotal: parseFloat(entry.price), feeUnder: entry.feeUnder }
    }
  }

  for (let key of Object.keys(dictionary)) {
    renderOneCartRestaurant(key, dictionary[key].subTotal.toFixed(2), dictionary[key].feeUnder, container)
  }
}

const renderOneCartRestaurant = (name, subtotal, feeUnder, parent) => {
  const container = createElementWithClassAndParent("div", parent, "one-cart-item");
  const title = createElementWithClassAndParent("h3", container, "cart-item-title");
  title.innerText = name+":";
  const priceContainer = createElementWithClassAndParent("div", container, "cart-item-price");


  const warning = createElementWithClassAndParent("span", priceContainer);
  warning.innerText = (subtotal>feeUnder? "":"⚠️")
  warning.style.fontSize="10px;"

  const price = createElementWithClassAndParent("span", priceContainer);
  price.innerText = "$"+subtotal;

  const restaurant = createElementWithClassAndParent("div", title, "cart-item-restaurant");
  restaurant.innerText = "(No Fee Over: $" + (feeUnder ? feeUnder : 0) + ")";
  if(subtotal<feeUnder){
    anyFees = true;
  }

}

const renderOneCartEntry = (entry) => {
  const cart = document.querySelector("#cart");
  const container = createElementWithClassAndParent("div", cart, "one-cart-item");
  const title = createElementWithClassAndParent("h3", container, "cart-item-title");
  title.innerText = entry.item_name;
  const price = createElementWithClassAndParent("div", container, "cart-item-price");
  price.innerText = "$"+entry.price;

  const restaurant = createElementWithClassAndParent("div", title, "cart-item-restaurant");
  restaurant.innerText = entry.restaurant_name + " (No Fee Over: $" + (entry.feeUnder ? entry.feeUnder : 0) + ")";

}

const syncCartNumber = () => {
  const entries = getCartFromLocalStorage();
  const ele = document.querySelector("#cart-count");
  ele.innerText = entries.length;
  syncCartTotal();
}

const syncCartTotal = () => {
  const entries = getCartFromLocalStorage();
  const ele = document.querySelector("#cart-total");
  ele.innerText = "Checkout: $" + (entries.reduce((a, b) => { return a + parseFloat(b.price) }, 0)).toFixed(2)
}

const getCartFromLocalStorage = () => {
  let entries = JSON.parse(localStorage.getItem(cart_key));
  if (!entries) {
    return [];
  }
  return entries;
}

const addNewItemToCart = (item_name, price, restaurant_name, feeUnder) => {
  const entries = getCartFromLocalStorage();
  entries.unshift({ item_name, price, restaurant_name, feeUnder })

  localStorage.setItem(cart_key, JSON.stringify(entries));
  renderOneCartEntry({ item_name, price, restaurant_name, feeUnder })
  openCart();
  initCart();
}

const syncCartToggle = () => {
  const open = JSON.parse(localStorage.getItem(cart_toggle_key));
  if (open) {
    openCart();
  } else {
    closeCart();
  }

}

const toggleCart = () => {
  const open = JSON.parse(localStorage.getItem(cart_toggle_key));
  if (!open) {
    openCart();
  } else {
    closeCart();
  }

}

const openCart = () => {
  localStorage.setItem(cart_toggle_key, JSON.stringify(true));
  const cart = document.querySelector("#cart-container");
  cart.style.display = "block";

}

const closeCart = () => {

  localStorage.setItem(cart_toggle_key, JSON.stringify(false));
  const cart = document.querySelector("#cart-container");
  cart.style.display = "none";
}