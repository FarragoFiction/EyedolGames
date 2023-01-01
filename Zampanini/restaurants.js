

const handleRestaurants = (core_theme_key)=>{
    const resteraunts = document.querySelector("#resteraunts");
    resteraunts.innerHTML = "";
    const rand = new SeededRandom(Object.keys(all_themes).indexOf(core_theme_key));
    if(resteraunts){
      for(let i =0; i<25; i++){
        renderRestaurantForThemes(rand,resteraunts,[core_theme_key]);
      }
    }
}

const getRestaurantName = (rand,theme_keys)=>{
  const possibilities = [
    `${pickARandomThemeFromListAndGrabKey(rand,theme_keys, ADJ, true)} ${pickARandomThemeFromListAndGrabKey(rand,theme_keys, OBJECT, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand,theme_keys, COMPLIMENT, true)} ${pickARandomThemeFromListAndGrabKey(rand,theme_keys, OBJECT, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand,theme_keys, INSULT, true)} ${pickARandomThemeFromListAndGrabKey(rand,theme_keys, OBJECT, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand,theme_keys, PERSON, true)}'s ${pickARandomThemeFromListAndGrabKey(rand,theme_keys, OBJECT, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand,theme_keys, ADJ, true)} ${pickARandomThemeFromListAndGrabKey(rand,theme_keys, LOCATION, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand,theme_keys, ADJ, true)} ${pickARandomThemeFromListAndGrabKey(rand,theme_keys, OBJECT, true)} ${pickARandomThemeFromListAndGrabKey(rand,theme_keys, LOCATION, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand,theme_keys, INSULT, true)} ${pickARandomThemeFromListAndGrabKey(rand,theme_keys, OBJECT, true)} ${pickARandomThemeFromListAndGrabKey(rand,theme_keys, LOCATION, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand,theme_keys, COMPLIMENT, true)} ${pickARandomThemeFromListAndGrabKey(rand,theme_keys, OBJECT, true)} ${pickARandomThemeFromListAndGrabKey(rand,theme_keys, LOCATION, true)}`,

    `${pickARandomThemeFromListAndGrabKey(rand,theme_keys, OBJECT, true)} ${pickARandomThemeFromListAndGrabKey(rand,theme_keys, LOCATION, true)}`
  ];
  return rand.pickFrom(possibilities);
}

const renderRestaurantForThemes = (rand,container, theme_keys)=>{
  const ele = createElementWithClassAndParent("div",container, "single-rest");
  let image = "http://eyedolgames.com/Zampanini/images/Diner/00086-img_20221231213043.png"; //placeholder

  const label = getRestaurantName(rand, theme_keys)
  ele.innerHTML = `
    <img class="preview" src ="${image}">
    <div class="rest-name">
    ${titleCase(label)}
    </div>
  `;

  ele.onclick  = ()=>{
    window.alert("TODO: refresh page with themes");
  }
}

