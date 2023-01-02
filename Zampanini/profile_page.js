const handleRestaurantPage = (name, themes, seed) => {
  const theme_keys = themes.split(",")
  const container = document.querySelector("#categories");
  const rand = new SeededRandom(seed);
  container.id = "profile";

  const header = createElementWithClassAndParent("div", container, "profile_header");
  const image = createElementWithClassAndParent("img", container, "profile_image");

  const title = createElementWithClassAndParent("h1", container, "title");
  const features = createElementWithClassAndParent("div", container, "features");

  title.innerHTML = name;
  setupFeaturedItems(features, rand, theme_keys);


  let images = collateAllImages(rand, theme_keys);
  images.then((results) => {
    image.src = rand.pickFrom(results);
    if (rand.nextDouble() > .5) {
      image.style.objectFit = "none";
    }
  });
}

const setupFeaturedItems = (container, rand, theme_keys) => {
  const title = createElementWithClassAndParent("h2", container, "section-title");
  const parent = createElementWithClassAndParent("div", container, "featured-meals");

  title.innerHTML = "Featured Items";
  for (let i = 0; i < 10; i++) {
    renderOneFeaturedItem(parent, rand, theme_keys, false);
  }
}

const getItemName = (rand, theme_keys, weird) => {
  const possibilities = [
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, ADJ, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, COMPLIMENT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, PERSON, true)}'s ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, ADJ, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, ADJ, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, LOCATION, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, COMPLIMENT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, LOCATION, true)}`,

    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, LOCATION, true)}'s ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`
  ];

  if (weird) {
    possibilities.push(`${pickARandomThemeFromListAndGrabKey(rand, theme_keys, INSULT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,)
    possibilities.push(`${pickARandomThemeFromListAndGrabKey(rand, theme_keys, INSULT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, LOCATION, true)}`,)
  }
  return rand.pickFrom(possibilities);
}


const renderOneFeaturedItem = (parent, rand, theme_keys, weird) => {
  console.log("JR NOTE: theme keys are", theme_keys)
  const container = createElementWithClassAndParent("div", parent, "one-featured-meal");


  const imageContainer = createElementWithClassAndParent("div", container, "meal-image-container");

  const image = createElementWithClassAndParent("img", imageContainer, "meal-image");
  const title = createElementWithClassAndParent("h3", container, "meal-title");
  title.innerHTML = getItemName(rand, theme_keys, weird);
  const price = createElementWithClassAndParent("div", container, "meal-title");
  price.innerHTML = `$${(rand.getRandomNumberBetween(0,5) + rand.nextDouble()).toFixed(2)}`;
  const add_button = createElementWithClassAndParent("button", imageContainer, "add");
  add_button.innerHTML = "Add";

  let images = collateAllImages(rand, theme_keys);
  images.then((results) => {
    image.src = rand.pickFrom(results);
    if (rand.nextDouble() > .5) {
      image.style.objectFit = "none";
    }
  });

}