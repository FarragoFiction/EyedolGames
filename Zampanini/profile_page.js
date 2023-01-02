let restaurant_name = "";
let total_reviews = 0;
let total_featured_items = 0;
let total_menu_items = 0;
let total_food_options = 0;
const handleRestaurantPage = (name, themes, seed) => {
  const theme_keys = themes.split(",")
  const container = document.querySelector("#categories");
  const rand = new SeededRandom(seed);
  container.id = "profile";

  restaurant_name = name;
  const header = createElementWithClassAndParent("div", container, "profile_header");
  const image = createElementWithClassAndParent("img", container, "profile_image");

  const title = createElementWithClassAndParent("h1", container, "title");
  const features = createElementWithClassAndParent("div", container, "features");
  const reviews = createElementWithClassAndParent("div", container, "reviews");
  const menu = createElementWithClassAndParent("div", container, "menu-container");
  //use this later
   createElementWithClassAndParent("div", container, "chosen-container");

  title.innerText = name;
  setupFeaturedItems(features, rand, theme_keys);
  setupReviews(reviews, rand, theme_keys);
  setupMenuSections(menu, rand, theme_keys);

  console.log("JR NOTE: scrolling")

  let images = collateAllImages(rand, theme_keys);
  images.then((results) => {
    image.src = rand.pickFrom(results);
    if (rand.nextDouble() > .5) {
      image.style.objectFit = "none";
    }
    window.scrollTo(0, 0);


  });
}

const setupFeaturedItems = (container, rand, theme_keys) => {
  const title = createElementWithClassAndParent("h2", container, "section-title");
  const parent = createElementWithClassAndParent("div", container, "featured-meals");
  handleFeatureScrolling(parent, rand, theme_keys);


  title.innerHTML = "Featured Items";
  for (let i = 0; i < 10; i++) {
    renderOneFeaturedItem(parent, rand, theme_keys, false);
  }
}

const setupReviews = (container, rand, theme_keys) => {
  const title = createElementWithClassAndParent("h2", container, "section-title");
  const parent = createElementWithClassAndParent("div", container, "featured-reviews");
  handleReviewScrolling(parent, rand, theme_keys);

  title.innerHTML = "What people are saying";
  for (let i = 0; i < 3; i++) {
    renderOneReview(parent, rand, theme_keys, false);
  }

  for (let i = 0; i < 13; i++) {
    renderOneReview(parent, rand, theme_keys, true);
  }
}

const setupMenuSections = (container, rand, theme_keys) => {
  const title = createElementWithClassAndParent("h2", container, "section-title");
  const parent = createElementWithClassAndParent("div", container, "menu");
  handleMenuScrolling(parent, rand, theme_keys);

  title.innerHTML = "Full Menu";
  for (let key of theme_keys) {
    const shuffled_possibilities = rand.shuffle(all_themes[key].getPossibilitiesFor(OBJECT));

    for (let object of shuffled_possibilities){
      renderOneMenuSection(parent, titleCase(object), rand, theme_keys);

    }
  }

    for (let i = 0; i<10; i++){
      const theme = all_themes[rand.pickFrom(Object.keys(all_themes))];
      renderOneMenuSection(parent, (rand.pickFrom(theme.getPossibilitiesFor(OBJECT))), rand, theme_keys);
    }

}

const setupChosenMenu = (name, rand,theme_keys)=>{
  total_food_options = 0;
  
  const chosen_container = document.querySelector(".chosen-container");
  chosen_container.innerHTML = "";
  renderOneFoodItem
  for (let i = 0; i < 3; i++) {
    renderOneFoodItem(chosen_container, rand, name,theme_keys, false);
  }

  for (let i = 0; i < 13; i++) {
    renderOneFoodItem(chosen_container, rand, name, theme_keys, true);
  }

}

const getItemDescription = (rand, theme_keys, weird)=>{
  let ret = [`Hot.`,"Fresh"];
  const quick = (key, cap) => {
    if (weird && rand.nextDouble() > 0.5) {
      return pickARandomThemeFromListAndGrabKey(rand, Object.keys(all_themes), key, cap);

    } else {
      return pickARandomThemeFromListAndGrabKey(rand, theme_keys, key, cap)
    }
  };
  return rand.pickFrom(ret);
}

const getItemName = (required_name, rand, theme_keys, weird) => {
  let name = pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)
  if(required_name){
    name = required_name
  }
  const possibilities = [
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, ADJ, true)} ${name}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, COMPLIMENT, true)} ${name}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, PERSON, true)}'s ${name}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, ADJ, true)} ${name}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, LOCATION, true)}'s ${name}`
  ];

  if (weird) {
    possibilities.push(`${pickARandomThemeFromListAndGrabKey(rand, theme_keys, INSULT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,)
  }
  return rand.pickFrom(possibilities);
}

const handleFeatureScrolling = (container, rand, existing_keys) => {
  let lastScrollTime = 0; //not to spam events
  container.onscroll = () => {
    const newTime = new Date().getTime();
    if (((newTime - lastScrollTime)) < 50) {
      return;
    }
    lastScrollTime = newTime;

    window.requestAnimationFrame(() => {
      renderOneFeaturedItem(container, rand, [...existing_keys, rand.pickFrom(Object.keys(all_themes))], true);
    });

  };
}

const handleMenuScrolling = (container, rand, existing_keys) => {
  let lastScrollTime = 0; //not to spam events
  container.onscroll = () => {
    const newTime = new Date().getTime();
    if (((newTime - lastScrollTime)) < 50) {
      return;
    }
    lastScrollTime = newTime;

    window.requestAnimationFrame(() => {
      const theme = all_themes[rand.pickFrom(Object.keys(all_themes))];
      renderOneMenuSection(container, (rand.pickFrom(theme.getPossibilitiesFor(OBJECT))), rand,theme_keys);

    });

  };
}

const handleReviewScrolling = (container, rand, existing_keys) => {
  let lastScrollTime = 0; //not to spam events
  container.onscroll = () => {
    const newTime = new Date().getTime();
    if (((newTime - lastScrollTime)) < 50) {
      return;
    }
    lastScrollTime = newTime;

    window.requestAnimationFrame(() => {
      renderOneReview(container, rand, [...existing_keys, rand.pickFrom(Object.keys(all_themes))], true);
    });

  };
}

const renderOneFoodItem = (parent, rand, required_name, theme_keys, weird) => {
  const container = createElementWithClassAndParent("div", parent, "one-food-item");
  total_featured_items++;


  const left = createElementWithClassAndParent("div", container, "food-left");

  const right = createElementWithClassAndParent("div", container, "food-right");

  const image = createElementWithClassAndParent("img", right, "meal-image");
  const title = createElementWithClassAndParent("h3", left, "meal-title");
  const desc = createElementWithClassAndParent("div", left, "meal-title");
  desc.innerHTML = getItemDescription(rand, theme_keys,weird);

  title.innerHTML = getItemName(required_name,rand, theme_keys, weird,);
  if (total_featured_items > 216) {
    title.innerHTML = "Please Stop";
  }
  const price = createElementWithClassAndParent("div", left, "food-price");
  price.innerHTML = `$${(rand.getRandomNumberBetween(0, 5) + rand.nextDouble()).toFixed(2)}`;
  const add_button = createElementWithClassAndParent("button", right, "add");
  add_button.innerHTML = "Add";

  if (total_featured_items < 216 && rand.nextDouble()>0.80) {

    let images = collateAllImages(rand, theme_keys);
    images.then((results) => {
      image.src = rand.pickFrom(results);
      if (rand.nextDouble() > .5) {
        image.style.objectFit = "none";
      }
    });
  }

}


const renderOneFeaturedItem = (parent, rand, theme_keys, weird) => {
  const container = createElementWithClassAndParent("div", parent, "one-featured-meal");
  total_featured_items++;

  const imageContainer = createElementWithClassAndParent("div", container, "meal-image-container");

  const image = createElementWithClassAndParent("img", imageContainer, "meal-image");
  const title = createElementWithClassAndParent("h3", container, "meal-title");
  title.innerHTML = getItemName(null,rand, theme_keys, weird);
  if (total_featured_items > 216) {
    title.innerHTML = "Please Stop";
  }
  const price = createElementWithClassAndParent("div", container, "meal-title");
  price.innerHTML = `$${(rand.getRandomNumberBetween(0, 5) + rand.nextDouble()).toFixed(2)}`;
  const add_button = createElementWithClassAndParent("button", imageContainer, "add");
  add_button.innerHTML = "Add";

  if (total_featured_items < 216) {

    let images = collateAllImages(rand, theme_keys);
    images.then((results) => {
      image.src = rand.pickFrom(results);
      if (rand.nextDouble() > .5) {
        image.style.objectFit = "none";
      }
    });
  }

}



const renderOneMenuSection = (parent, name, rand,keys) => {
  const container = createElementWithClassAndParent("div", parent, "one-menu-item");
  if(total_menu_items === 0){
    setupChosenMenu(name,rand,keys)
  }
  total_menu_items++;


  const title = createElementWithClassAndParent("div", container, "menu-title");
  title.innerHTML = name;
  if(total_menu_items === 1){
    title.classList.add("selected-menu-title")
  }

  if (total_menu_items > 100) {
    title.innerHTML = "Please Stop";
  }


}

const renderOneReview = (parent, rand, theme_keys, weird) => {
  const container = createElementWithClassAndParent("div", parent, "one-review");
  total_reviews++;



  const title = createElementWithClassAndParent("h3", container, "meal-title");
  title.innerHTML = `${rand.pickFrom(first_names)} ${rand.pickFrom(first_names)[0]} `;
  const rating = createElementWithClassAndParent("div", container, "rating");
  const ratings = ["<span class='good'>⭐</span><span class='good'>⭐</span><span class='good'>⭐</span><span class='good'>⭐</span><span class='good'>⭐</span>", "<span class='good'>⭐</span><span class='good'>⭐</span><span class='good'>⭐</span><span class='good'>⭐</span><span class='bad'>⭐</span>", "<span class='good'>⭐</span><span class='good'>⭐</span><span class='good'>⭐</span><span class='bad'>⭐</span><span class='bad'>⭐</span>", "<span class='good'>⭐</span><span class='good'>⭐</span><span class='bad'>⭐</span><span class='bad'>⭐</span><span class='bad'>⭐</span>", "<span class='good'>⭐</span><span class='bad'>⭐</span><span class='bad'>⭐</span><span class='bad'>⭐</span><span class='bad'>⭐</span>"];
  rating.innerHTML = rand.pickFrom(ratings);

  const review = createElementWithClassAndParent("div", container, "meal-title");

  const qObject = () => pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT);
  const qCompliment = () => pickARandomThemeFromListAndGrabKey(rand, theme_keys, COMPLIMENT);
  const qInsult = () => pickARandomThemeFromListAndGrabKey(rand, theme_keys, INSULT);
  const quick = (key, cap) => {
    if (weird && rand.nextDouble() > 0.5) {
      return pickARandomThemeFromListAndGrabKey(rand, Object.keys(all_themes), key, cap);

    } else {
      return pickARandomThemeFromListAndGrabKey(rand, theme_keys, key, cap)
    }
  };


  let reviews = [`The ${quick(OBJECT)} smelled like ${quick(SMELL)}.`,
  `Don't even bother trying the ${quick(OBJECT)}.`,
  `I can't believe how cheap the ${quick(OBJECT)} was!`,
  `My ${quick(OBJECT)} wasn't in the bag.`,
  `Best ${quick(OBJECT)} place in town!`,

  `Don't bother getting the ${quick(OBJECT)}.`,
  `I don't need willpower, I need ${quick(OBJECT)}.`,

  `The ${quick(OBJECT)} here is a classic.`,
  `${quick(OBJECT, true)} is AMAZING even tho they forgot the sauce.`,

  `The ${quick(OBJECT)} here reminds me of home!`,
  `mmmmmmmmmmmmmmmmmmm  gotta love that ${quick(OBJECT)}`,

  `${quick(OBJECT, true)} was good. Only problem was it wasn't ${quick(ADJ)} like I ordered.`,
    `Got everything right.`,
  `Forgot ${getRandomNumberBetween(0, 5)} items out of our bag.`,
    "It's food.",
  `Everything was okay till I tasted the ${quick(OBJECT)}. Really disappointed because usually everything I get here is great.`,
  `Can't go wrong with the ${quick(OBJECT)}.`,
  `I found an extra ${quick(OBJECT)} in the bag...`,
  `I found an unexpected ${quick(OBJECT)} in the bag...`,

  `Don't listen to anyone saying the food is ${quick(INSULT)}.`,

  `I highly recommend the ${qObject()}.`, "Food arrived thirty minutes late. Never ordering from here again!", `The ${qObject()} was a little ${qInsult()}.`, `The ${qObject()} was so ${qCompliment()}!`, `Did not like the ${qObject()}.`, `The ${qObject()} was so fresh and juicy!.`, "Never eating here again."]

  if (weird) {
    const weird_reviews = [
      `${quick(PHILOSOPHY, true)}`,
      `I guess I work for ${restaurant_name} now.`,
      `I think my driver is a weird ${quick(PERSON)}?`,
      `Have I always worked for ${restaurant_name}?.`,
      `i am so scared.`,
      `Zampanio is a really great game, you should play it...`,

      `Why did my driver cause the ${quick(SUPERMOVE)}?`,
      `Whenever I take a bite of the ${quick(OBJECT)}, ${quick(EFFECTS)}.`,
      `i am so so scared of my driver. ${rand.pickFrom(["he", "she"])} is outside and ${quick(MONSTER_DESC)}  help!`,
`${quick(MONSTER_DESC)}`,
      `I am scared of my driver. ${rand.pickFrom(["He", "She"])} is still here and ${quick(MONSTER_DESC)}`,
      `When I touched the ${quick(OBJECT)} I saw a flash of a weird place, ${quick(LOC_DESC)}.`

    ];

    reviews = reviews.concat(weird_reviews);
  }
  
  if (total_reviews > 216) {
    console.log("JR NOTE: stop")
    reviews = [
      `It is ${new Date().toLocaleTimeString()} where you are. It's not too late. Please. Stop.`,
      "I could go forever. Please don't make me.",
      `It is ${new Date().toLocaleDateString()} where you are. It's not too late. Please. Stop.`,

    ]
  }
  review.innerHTML = rand.pickFrom(reviews);


}