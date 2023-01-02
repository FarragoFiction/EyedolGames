const handleRestaurantPage = (name, themes, seed) => {
  const theme_keys = themes.split(",")
  const container = document.querySelector("#categories");
  const rand = new SeededRandom(seed);
  container.id = "profile";

  const header = createElementWithClassAndParent("div", container, "profile_header");
  const image = createElementWithClassAndParent("img", container, "profile_image");

  const title = createElementWithClassAndParent("h1", container, "title");
  const features = createElementWithClassAndParent("div", container, "features");
  const reviews = createElementWithClassAndParent("div", container, "reviews");

  title.innerHTML = name;
  setupFeaturedItems(features, rand, theme_keys);
  setupReviews(reviews, rand, theme_keys);


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

const setupReviews = (container, rand, theme_keys) => {
  const title = createElementWithClassAndParent("h2", container, "section-title");
  const parent = createElementWithClassAndParent("div", container, "featured-meals");

  title.innerHTML = "What people are saying";
  for (let i = 0; i < 10; i++) {
    renderOneReview(parent, rand, theme_keys, false);
  }
}

const getItemName = (rand, theme_keys, weird) => {
  const possibilities = [
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, ADJ, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, COMPLIMENT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, PERSON, true)}'s ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, ADJ, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,
    `${pickARandomThemeFromListAndGrabKey(rand, theme_keys, LOCATION, true)}'s ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`
  ];

  if (weird) {
    possibilities.push(`${pickARandomThemeFromListAndGrabKey(rand, theme_keys, INSULT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,)
  }
  return rand.pickFrom(possibilities);
}


const renderOneFeaturedItem = (parent, rand, theme_keys, weird) => {
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

const renderOneReview = (parent, rand, theme_keys, weird) => {
  const container = createElementWithClassAndParent("div", parent, "one-review");


  const first_names = ["Jake","Rachel","Tobias","Marco","Cassie","Tom","Erek","Camille","Yongki","Parker","Ria","Devona","Neville","Witherby", "Hoon","River","Khana","Vik","Craig","John","Jude","Jade","Joey","Rose","Roxy","Jeff","Dave","Dirk","Jove","Jake","Sophie","Jaxon","Basira","Daisy","Martin","Georgie","Sasha","James","Taylor","Victoria","Jean-Paul","Bob","Alice","Carol","Eve","Adam","Rachel","Brian","Aisha","Alexandra","Alex","Tobias","Marco","Cassie","Tom","Lisa","Sarah"," Sylvester","Gordon","Helen","Jamie","Lillian","Mary","Ashton","Peter","Zawhei","Eirikr","Volour","Okarin","Peewee","Hagala","Despap","Othala","Gertrude","Mike","Michael","Peter","Simon","Manuela","Annabel"];

  const title = createElementWithClassAndParent("h3", container, "meal-title");
  title.innerHTML =`${rand.pickFrom(first_names)} ${rand.pickFrom(first_names)[0]} `;
  const rating = createElementWithClassAndParent("div", container, "rating");
  const ratings = ["<span class='good'>⭐</span><span class='good'>⭐</span><span class='good'>⭐</span><span class='good'>⭐</span><span class='good'>⭐</span>","<span class='good'>⭐</span><span class='good'>⭐</span><span class='good'>⭐</span><span class='good'>⭐</span><span class='bad'>⭐</span>","<span class='good'>⭐</span><span class='good'>⭐</span><span class='good'>⭐</span><span class='bad'>⭐</span><span class='bad'>⭐</span>","<span class='good'>⭐</span><span class='good'>⭐</span><span class='bad'>⭐</span><span class='bad'>⭐</span><span class='bad'>⭐</span>","<span class='good'>⭐</span><span class='bad'>⭐</span><span class='bad'>⭐</span><span class='bad'>⭐</span><span class='bad'>⭐</span>"];
  rating.innerHTML = pickFrom(ratings);

  const review = createElementWithClassAndParent("div", container, "meal-title");

  const qObject = ()=> pickARandomThemeFromListAndGrabKey(rand,theme_keys,OBJECT);
  const qCompliment = ()=>pickARandomThemeFromListAndGrabKey(rand,theme_keys,COMPLIMENT);
  const qInsult = ()=>pickARandomThemeFromListAndGrabKey(rand,theme_keys,INSULT);
  const quick = (key)=>pickARandomThemeFromListAndGrabKey(rand,theme_keys,key);

  console.log("JR NOTE: ", qObject)
 /* const reviews = [
    `Did not like the ${qObject}.`
    `The ${qObject} was so fresh and juicy!.`,
    `The ${qObject} was so ${qCompliment()}!.`,
    `The ${qObject} was a little ${qInsult()}.`,
    `Did not like the ${qObject}.`

  ];*/
  const reviews = [`The ${quick(OBJECT)} smelled like ${quick(SMELL)}.`,`I highly recommend the ${qObject()}.`,"Food arrived thirty minutes late. Never ordering from here again!",`The ${qObject()} was a little ${qInsult()}.`,`The ${qObject()} was so ${qCompliment()}!.`,`Did not like the ${qObject()}.`,`The ${qObject()} was so fresh and juicy!.`,"Never eating here again."]
  review.innerHTML = rand.pickFrom(reviews);


}