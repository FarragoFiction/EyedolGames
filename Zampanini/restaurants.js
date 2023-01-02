
let num_restaurants = 0;

const handleRestaurants = (keys, seed) => {
  console.log("JR NOTE: what", seed);

  const resteraunts = document.querySelector("#resteraunts");
  resteraunts.innerHTML = "";
  const rand = new SeededRandom(seed);
  if (resteraunts) {
    console.log("JR NOTE: what");

    handleRestaurantScrolling(rand, keys);

    for (let i = 0; i < 10; i++) {
      renderRestaurantForThemes(rand, resteraunts, keys);
    }
    for (let i = 0; i < 10; i++) {
      renderRestaurantForThemes(rand, resteraunts, keys, true);
    }
  }
}


const handleRestaurantScrolling = (rand, keys) => {
  console.log("JR NOTE: handleRestaurantScrolling");
  let lastScrollTime = 0; //not to spam events
  window.onscroll = () => {
    const newTime = new Date().getTime();
    if (((newTime - lastScrollTime)) < 50) {
      return;
    }
    lastScrollTime = newTime;

    window.requestAnimationFrame(() => {
      console.log("JR NOTE: sroll");

      renderRestaurantForThemes(rand, resteraunts, keys, true);
    });

  };
}

const getRestaurantName = (rand, theme_keys, weird) => {
  const possibilities = [
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, ADJ, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, COMPLIMENT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, PERSON, true)}'s ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, ADJ, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, LOCATION, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, ADJ, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, LOCATION, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, COMPLIMENT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, LOCATION, true)}`,

    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, LOCATION, true)}`
  ];

  if (weird) {
    possibilities.push(`${pickARandomThemeFromListAndGrabKey(rand, theme_keys, INSULT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,)
    possibilities.push(`${pickARandomThemeFromListAndGrabKey(rand, theme_keys, INSULT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, LOCATION, true)}`,)
  }
  return rand.pickFrom(possibilities);
}

const collateAllImages = async (rand, base_keys) => {
  let ret = [];
  let i = 0;
  while (i < base_keys.length) {
    let key = base_keys[i];
    let images = await all_themes[key].getImages();
    ret = ret.concat(images);
    i++
  }

  return ret;
}

const renderRestaurantForThemes = async (rand, container, base_keys, weird) => {
  let theme_keys = [...base_keys];
  num_restaurants++;
  const max = 150;

  //if theres no food theme, or you know, if you're feeling frisky
  if (food_keys.indexOf(theme_keys[0]) == -1 || rand.nextDouble() > 0.5) {
    theme_keys.push(rand.pickFrom(food_keys)); //add some food in here man
  }
  //weird gets extra shit tacked on
  if (weird) {
    theme_keys.push(rand.pickFrom(Object.keys(all_themes))); //add some weird in here, man

  }
  const ele = createElementWithClassAndParent("div", container, "single-rest");
  //let image = "http://eyedolgames.com/Zampanini/images/Diner/00086-img_20221231213043.png"; //placeholder

  if (num_restaurants < max) {

    let images = collateAllImages(rand, theme_keys);
    images.then((results) => {
      //let image = "http://eyedolgames.com/Zampanini/images/Diner/00086-img_20221231213043.png"; //placeholder
      preview.src = rand.pickFrom(results);
      if (rand.nextDouble() > .5) {
        preview.style.objectFit = "none";
      }
    })
  }

  let prices = ["💰💰💰", "💰💰", "💰💰", "💰"];
  let label = getRestaurantName(rand, theme_keys, weird)
  if (num_restaurants > max) {
    label = "STOP"
  }

  const preview = createElementWithClassAndParent("img", ele, "preview");
  const rest = createElementWithClassAndParent("div", ele, "rest-name");
  rest.innerHTML = titleCase(label);
  const facts = createElementWithClassAndParent("div", ele, "facts");
  const left = createElementWithClassAndParent("div", facts, "left");
  left.innerHTML = `   <span class="price"s>${rand.pickFrom(prices)}</span> <span class="genre">${theme_keys.map((item) => titleCase(item)).join(", ")}</span>
  <Br>
  ${(rand.getRandomNumberBetween(0, 5) + rand.nextDouble()).toFixed(1)} ⭐`;
  const right = createElementWithClassAndParent("div", facts, "right");
  right.innerHTML = `    ${rand.getRandomNumberBetween(0, 85)} Miles or ${rand.getRandomNumberBetween(0, 90)} minutes
  <Br>
  $0 delivery fee over $${rand.getRandomNumberBetween(1, 85)}`;


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

  ele.onclick = () => {
    updateURLParams(`name=${label}&themes=${theme_keys}&seed=${rand.getRandomNumberBetween(0, 99999999)}`);
    window.location.reload();
  }
}

