const cart_key = "ZAMPANINI_CART"
const cart_toggle_key = "ZAMPANINI_CART_TOGGLE"

const initCart = ()=>{
  syncCartNumber();
  syncCartToggle();
  const button = document.querySelector("#cart-icon");
  button.onclick = ()=>{
    toggleCart();
  }



  window.onclick = (e)=>{
    if(!e.target.className.includes("one-featured-meal") && !e.target.className.includes("one-food-item") && !e.target.id.includes("cart") && !e.target.className.includes("cart")){
      closeCart();
    }
  }

  const entries = getCartFromLocalStorage();

  const checkout = document.querySelector("#cart-total");
  checkout.onclick = ()=>{
    localStorage.removeItem(cart_key);
    closeCart();

    window.location.href =`/News?referer=Zampanini&referer_details=${encodeURIComponent(JSON.stringify(window.location.search))}&details=${encodeURIComponent(JSON.stringify(entries[0]))}`;
  }
  const cart = document.querySelector("#cart");
  cart.innerHTML = "";
  for(let entry of entries){
    renderOneCartEntry(entry);
  }

}

const renderOneCartEntry = (entry)=>{
  const cart = document.querySelector("#cart");
  const container = createElementWithClassAndParent("div", cart, "one-cart-item");
  const title = createElementWithClassAndParent("h3", container, "cart-item-title");
  title.innerText = entry.item_name;
  const price = createElementWithClassAndParent("div", container, "cart-item-price");
  price.innerText = entry.price;

  const restaurant = createElementWithClassAndParent("div", title, "cart-item-restaurant");
  restaurant.innerText = entry.restaurant_name;

}

const syncCartNumber = ()=>{
  const entries = getCartFromLocalStorage();
  const ele = document.querySelector("#cart-count");
  ele.innerText = entries.length;
  syncCartTotal();
}

const syncCartTotal = ()=>{
  const entries = getCartFromLocalStorage();
  const ele = document.querySelector("#cart-total");
  ele.innerText = "Checkout: $" + (entries.reduce((a,b)=>{return a + parseFloat(b.price)},0)).toFixed(2)
}

const getCartFromLocalStorage = ()=>{
  let entries = JSON.parse(localStorage.getItem(cart_key));
  if(!entries){
    return [];
  }
  return entries;
}

const addNewItemToCart = (item_name, price, restaurant_name)=>{
  const entries = getCartFromLocalStorage();
  entries.unshift({item_name, price, restaurant_name})

  localStorage.setItem(cart_key, JSON.stringify(entries));
  renderOneCartEntry({item_name, price, restaurant_name})
  openCart();
  initCart();
}

const syncCartToggle = ()=>{
  const open = JSON.parse(localStorage.getItem(cart_toggle_key));
  if(open){
    openCart();
  }else{
    closeCart();
  }

}

const toggleCart = ()=>{
  const open = JSON.parse(localStorage.getItem(cart_toggle_key));
  if(!open){
    openCart();
  }else{
    closeCart();
  }

}

const openCart = ()=>{
  localStorage.setItem(cart_toggle_key, JSON.stringify(true));
  const cart = document.querySelector("#cart-container");
  cart.style.display = "block";

}

const closeCart = ()=>{

  localStorage.setItem(cart_toggle_key, JSON.stringify(false));
  const cart = document.querySelector("#cart-container");
  cart.style.display = "none";
}