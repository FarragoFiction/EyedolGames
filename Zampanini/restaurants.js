

const handleRestaurants = (keys)=>{
    const resteraunts = document.querySelector("#resteraunts");
    resteraunts.innerHTML = "";
    const rand = new SeededRandom(Object.keys(all_themes).indexOf(keys[0]));
    if(resteraunts){
      for(let i =0; i<10; i++){
        renderRestaurantForThemes(rand,resteraunts,keys);
      }
      for(let i =0; i<10; i++){
        renderRestaurantForThemes(rand,resteraunts,keys,true);
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

const renderRestaurantForThemes = (rand,container, base_keys,weird)=>{
  let theme_keys = [...base_keys];
  console.log("JR NOTE:renderRestaurantForThemes ",{rand,container, theme_keys,weird})

  if(food_keys.indexOf(theme_keys[0])== -1){
    console.log("JR NOTE: food time")
    theme_keys.push(pickFrom(food_keys)); //add some food in here man
  }else if(weird){
    console.log("JR NOTE: foweirdod time")

    theme_keys.push(pickFrom(Object.keys(all_themes))); //add some weird in here, man

  }
  const ele = createElementWithClassAndParent("div",container, "single-rest");
  let image = "http://eyedolgames.com/Zampanini/images/Diner/00086-img_20221231213043.png"; //placeholder

  const price = rand.pickFrom(["!!!","!!","!!","!!"])
  const label = getRestaurantName(rand, theme_keys)
  ele.innerHTML = `
    <img class="preview" src ="${image}">
    <div class="rest-name">
    ${titleCase(label)}
    </div>
    <div class="facts">
    ${pickFrom(price)} ${theme_keys.map((item)=>titleCase(item)).join(",")}
    <Br>
    ${(rand.getRandomNumberBetween(0,5) + rand.nextDouble()).toFixed(1)} ⭐
    </div>
  `;

  ele.onclick  = ()=>{
    window.alert("TODO: refresh page with themes");
  }
}

