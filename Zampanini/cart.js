const cart_key = "ZAMPANINI_CART"
const cart_toggle_key = "ZAMPANINI_CART_TOGGLE"

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
}

const openCart = ()=>{
  localStorage.setItem(cart_toggle_key, true);
  console.log("JR NOTE: todo open cart")

}

const closeCart = ()=>{
  localStorage.setItem(cart_toggle_key, false);
  console.log("JR NOTE: todo close cart")

}