const cart_key = "ZAMPANINI_CART"
const cart_toggle_key = "ZAMPANINI_CART_TOGGLE"

const initCart = ()=>{
  console.log("JR NOTE: init cart")
  syncCartNumber();
  syncCartToggle();
  const button = document.querySelector("#cart-icon");
  button.onclick = ()=>{
    toggleCart();
  }

  const entries = getCartFromLocalStorage();

}

const syncCartNumber = ()=>{
  const entries = getCartFromLocalStorage();
  const ele = document.querySelector("#cart-count");
  ele.innerText = entries.length;
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
  entries.push({item_name, price, restaurant_name})

  localStorage.setItem(cart_key, JSON.stringify(entries));
  openCart();
  syncCartNumber();
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
  console.log("JR NOTE: open is", open)
  if(!open){
    openCart();
  }else{
    closeCart();
  }

}

const openCart = ()=>{
  localStorage.setItem(cart_toggle_key, JSON.stringify(true));
  const cart = document.querySelector("#cart");
  cart.style.display = "block";
  console.log("JR NOTE: todo open cart")

}

const closeCart = ()=>{
  localStorage.setItem(cart_toggle_key, JSON.stringify(false));
  cart.style.display = "none";
  console.log("JR NOTE: todo close cart")

}