


const handleRestaurants = (keys)=>{
    const resteraunts = document.querySelector("#resteraunts");
    resteraunts.innerHTML = "";
    const rand = new SeededRandom(Object.keys(all_themes).indexOf(keys[0]));
    if(resteraunts){
      for(let i =0; i<3; i++){
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

const collateAllImages = async (rand, base_keys)=>{
  console.log("JR NOTE: base keys are", base_keys)
  let ret =[];
  let i = 0;
  while(i< base_keys.length){
    let key = base_keys[i];
    console.log("JR NOTE: key is",key)
    let images = await all_themes[key].getImages();
    console.log("JR NOTE: got images", images, "for key", base_keys[i])
    ret = ret.concat(images);
    i++
  }

  return ret;
}

const renderRestaurantForThemes =  async (rand,container, base_keys,weird)=>{
  let theme_keys = [...base_keys];

  if(food_keys.indexOf(theme_keys[0])== -1){
    theme_keys.push(rand.pickFrom(food_keys)); //add some food in here man
  }else if(weird){

    theme_keys.push(rand.pickFrom(Object.keys(all_themes))); //add some weird in here, man

  }
  const ele = createElementWithClassAndParent("div",container, "single-rest");
  //let image = "http://eyedolgames.com/Zampanini/images/Diner/00086-img_20221231213043.png"; //placeholder
  let images =  collateAllImages(rand, theme_keys);
  images.then((results)=>{
    console.log("JR NOTE: results", results)
   //let image = "http://eyedolgames.com/Zampanini/images/Diner/00086-img_20221231213043.png"; //placeholder
   preview.src = rand.pickFrom(results);
   if(rand.nextDouble()>.5){
    preview.style.objectFit = "none";
   }
})

  let prices = ["💰💰💰","💰💰","💰💰","💰"];
  const label = getRestaurantName(rand, theme_keys)

  const preview = createElementWithClassAndParent("img",ele, "preview");
  const rest = createElementWithClassAndParent("div",ele, "rest-name");
  rest.innerHTML = titleCase(label);
  const facts = createElementWithClassAndParent("div",ele, "facts");
  const left = createElementWithClassAndParent("div",facts, "left");
  left.innerHTML = `   ${rand.pickFrom(prices)} ${theme_keys.map((item)=>titleCase(item)).join(",")}
  <Br>
  ${(rand.getRandomNumberBetween(0,5) + rand.nextDouble()).toFixed(1)} ⭐`;
  const right = createElementWithClassAndParent("div",facts, "right");
  right.innerHTML = `    ${rand.getRandomNumberBetween(0,85)} Miles or ${rand.getRandomNumberBetween(0,90)} minutes
  <Br>
  $0 delivery fee over $${rand.getRandomNumberBetween(1,85)}`;


  /*
  ele.innerHTML = `
    <img class="preview" src ="${rand.pickFrom(images)}">
    <div class="rest-name">
    ${titleCase(label)}
    </div>
    <div class="facts">
    <div class = "left">
    ${rand.pickFrom(prices)} ${theme_keys.map((item)=>titleCase(item)).join(",")}
    <Br>
    ${(rand.getRandomNumberBetween(0,5) + rand.nextDouble()).toFixed(1)} ⭐
    </div>
    <div class = "right">
    ${rand.getRandomNumberBetween(0,85)} Miles or ${rand.getRandomNumberBetween(0,90)} minutes
    <Br>
    $0 delivery fee over $${rand.getRandomNumberBetween(1,85)}
    </div>
    </div>
  `;*/

  ele.onclick  = ()=>{
    window.alert("TODO: refresh page with themes");
  }
}

