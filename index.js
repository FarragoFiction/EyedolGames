/*
Every so often I realize that it must be hard to find all the different parts of my maze that relate to each other.

And I should collate them in some way and make them easier to find.

But then I wake up two days later in a fugue state and find out I made yet another recursive maze.

You know how it is.
*/

let linkCount = 0;
//each different type of subsite will cache under their own key
const subsiteImageCache = {}

let rand = new SeededRandom(linkCount + stringtoseed(new Date().toString()))

const ZAMPANINI = "zampanini"
const ZWORLD = "zworld"
const PET = "pet"

window.onkeydown = (e)=>{
  if(e.key ==="Enter"){
    loadSearchResults();
  }
}

//easier to do it once rather than juggle promises, going fast
const prefetchAllImages = async () => {
  await fetchImagesForKey(ZAMPANINI, "http://eyedolgames.com/JackElope/images/SexySingles/BigWeirdPile/", "BigWeirdPile/")
  await fetchImagesForKey(ZWORLD, "http://eyedolgames.com/ZWorld/images/attractions/General/", "/General/")
  await fetchImagesForKey(PET, "http://eyedolgames.com/BabyQuotidians/", "")

}


const loadSearchResults = async () => {

  initThemes();
  await prefetchAllImages();
  const oldContainer = document.querySelector("#search-input-container")
  oldContainer.style.display = "none";

  const containerContainer = document.querySelector("#search-results")
  containerContainer.style.display = "block"
  const container = document.querySelector("#results-container")
  container.innerHTML = "";//clear
  const searchInput = document.querySelector("#search-input");
  const searchInputDos = document.querySelector("#search-input-dos");
  if (!searchInputDos.value) {
    searchInputDos.value = searchInput.value;
  }

  rand = new SeededRandom(stringtoseed(searchInput.value))


  for (let i = 0; i < 113; i++) {
    generateLink(container);
  }
  handleScrolling(container)

}

const handleScrolling = (container) => {
  let lastScrollTime = 0; //not to spam events
  window.onscroll = () => {
    const newTime = new Date().getTime();
    if (((newTime - lastScrollTime)) < 50) {
      return;
    }
    lastScrollTime = newTime;

    window.requestAnimationFrame(() => {
      generateLink(container);
      generateLink(container);
      generateLink(container);
    });

  };
}

const smartClick = () => {
  alert("You get it. The only way to win is not to play.")
}

//pick from generators we know about
//no seeded random, this is intended to give the impression of an unending flood of new results
const generateLink = (parent) => {
  //sponsored links are more frequent, lol
  let generators = [zampaniniLink, zampaniniLink, zampaniniLink, zampaniniLink, jackElopeLink, personalityLink, zWorldLink, quotidianAdoption]
  if (isItFriday()) {
    generators = [fridaySite]
  }

  if (linkCount > 1113) {
    generators = [obsessionSite]
  }
  rand.pickFrom(generators)(parent, rand);
}


/*
  slightly larger, bold, underlined website title. blue. anchor.
  black regular default font description
  exact same font  in default green for what url you're going to go to in full
*/
const renderLink = (parent, title, description, url) => {
  linkCount++;
  //console.log("JR NOTE: render link", { parent, title, description, url })
  const container = createElementWithClassAndParent("div", parent, "link-container")
  const titleEle = createElementWithClassAndParent("a", container, "title")
  titleEle.innerText = titleCase(title);
  titleEle.href = url;
  titleEle.target = "_blank"
  const descriptionEle = createElementWithClassAndParent("div", container, "desc");
  descriptionEle.innerHTML = description;
  const urlEle = createElementWithClassAndParent("div", container, "url")
  urlEle.innerText = url;

}

const getRandomTheme = () => {
  return rand.pickFrom(Object.values(all_themes));
}

const scrapeImportantWordsFromTheme = (rand, chosenTheme) => {
  return {
    adj: chosenTheme.pickPossibilityFor(ADJ, rand),
    adj2: chosenTheme.pickPossibilityFor(ADJ, rand),
    adj3: chosenTheme.pickPossibilityFor(ADJ, rand),
    person: chosenTheme.pickPossibilityFor(PERSON, rand),
    place: chosenTheme.pickPossibilityFor(LOCATION, rand),
    object: chosenTheme.pickPossibilityFor(OBJECT, rand)
  }
}

/*
make a link generator for every page that exists under eyedolgames
yes that means i need to make a new one to have this page expose it
but given nothing was exposed in teh previous home page thats probably fine
*/


//http://eyedolgames.com/JackElope/images/SexySingles/BigWeirdPile/
//image prefix is things like "BigWeirdPile", for if you have a subdirectory you want to preserve
const fetchImagesForKey = async (key, url, image_prefix) => {
  console.log("JR NOTE: fetchImagesForKey", { key, url, image_prefix })
  const images = await getImages(url);
  //don't make it absolute, these sites shoould NOT use that because thats a security hole
  subsiteImageCache[key] = images.map((i) => image_prefix + i);
}




//http://eyedolgames.com/Zampanini/?name=Baker's+Restaurant&themes=Bakery&feeUnder=21
const zampaniniLink = (parent, rand) => {
  const theme = getRandomTheme();
  let isBroken = true;
  if (food_keys.includes(theme.key)) {
    isBroken = false;
  }
  const title_addons = ["Powered by Zampanini", "Delivery", "Online", "Order Online", "Delivery", "Delivery and Carryout", "", "", "Carryout"]
  let title = getRestaurantName(rand, [theme.key], Math.random() > 0.75) + " " + rand.pickFrom(title_addons)
  const madLibs = scrapeImportantWordsFromTheme(rand, theme);
  const descriptionTemplates = [
    `It's a perfectly normal food website!`,
    `Try the ${madLibs.object}!`,
    `Food for you!`,
    `Flavorful ${madLibs.object}, directly to your door.`,
    `Try the ${madLibs.adj} ${madLibs.object}!`,
    `Home of the ${madLibs.object}!`,
    `The food is definitely ${madLibs.adj}!`,
    "Start earning rewards today.",
    "Now with Poob!",
    "You can eat it!",
    "Hungry? Why wait?",
    "The food cannot hurt you!",
    "It beats cold cereal!",
    "You'll never cook again, guaranteed!",
    "You won't believe it's not butter!",
    "Haha, wow,  you'll really click anything, won't you?",
    "It's probably food!",
    `The food has never been more ${madLibs.adj}!`,
    `The food is guaranteed to always be ${madLibs.adj}!`,
    `The food is definitely ${madLibs.adj2}!`,
    `The food has never been more ${madLibs.adj2}!`,
    `The food is guaranteed to always be ${madLibs.adj2}!`,
    `The food is definitely ${madLibs.adj3}!`,
    `The food has never been more ${madLibs.adj3}!`,
    `The food is guaranteed to always be ${madLibs.adj3}!`,
    `The food is definitely ${madLibs.adj}!`,
    `Feed your craving tonight!`,
    "This is not a food delivery service.",
    "Caw!",
    `Hosted by Zampanini!`,
    "Always Local. Always.",
    `Preferred by every ${madLibs.person}.`,
    `The food is definitely ${madLibs.adj}!`,
    " Give in to your cravings tonight!"]
  const descriptionTemplatesEnding = [
    `(Make sure not to eat the ${madLibs.object})`, `(Fees and conditions may apply)`, "(Always tip your driver)",
    "(Be sure to tip your driver)"]

  let description = rand.pickFrom(descriptionTemplates);
  for (let i = 0; i < rand.getRandomNumberBetween(0, 5); i++) {
    description += " " + rand.pickFrom(descriptionTemplates);
  }

  if (Math.random() > 0.75) {
    description += " " + rand.pickFrom(descriptionTemplatesEnding);
  }

  if (isBroken) { //zampanini REQUIRES a food theme for at least one of them but i find it funny to not do that here, the horrorterror google always broke my sims, my fake one should, too
    description += "<div class='corruption'>[WARNING: CORRUPTION DETECTED]</div>"
  }

  let url = `http://eyedolgames.com/Zampanini/?name=${title}&themes=${theme.key}&feeUnder=${rand.getRandomNumberBetween(1, 4556)}`
  renderLink(parent, title, description, url);
}

//http://eyedolgames.com/JackElope/?seed=1764600067&name=Marcoccio&image=BigNormalPile%2F00000-20230306085907-img.png&matchPercent=99&loc=Naples%2C+Italy&secrets=%5B8%2C13%5D
const jackElopeLink = (parent, rand) => {
  let image = "BigNormalPile%2F00000-20230306085907-img.png"
  if (subsiteImageCache[ZAMPANINI]) {
    image = rand.pickFrom(subsiteImageCache[ZAMPANINI]);
  }
  const name = rand.pickFrom(first_names);
  const title_addons = ["'s Dating Profile", "'s Online Profile", "", "", "'s Profile", " Romance Tonight", " JackElope"]
  let title = `${name}${rand.pickFrom(title_addons)}`;
  const description_templates = ["It's a perfectly normal dating website!",
    "Find true love tonight!",
    "Caw",
    "They want to meet you?",
    "Aren't you curious?",
    "They'll send you links!",
    "Love Love Love!",
    "There's someone for everyone!",
    "Don't let the Lonely take you! Save room for the Spiral!",
    "What do you have to lose?",
    "Maybe you'll like them?",
    "Maybe they'll like you?",
    "Should a corporation be controlling who you get to fall in love with? Find out today!",
    "Meet Sexy Local Singles",
    "Lonely?"];
  const description_suffix = ["(Love not Guaranteed)", "(Powered by JackElope)", "(Singles May Not Be Local)"];
  let description = rand.pickFrom(description_templates);
  for (let i = 0; i < rand.getRandomNumberBetween(0, 5); i++) {
    description += " " + rand.pickFrom(description_templates);
  }
  if (Math.random() > 0.75) {
    description += " " + rand.pickFrom(description_suffix);
  }
  let url = `http://eyedolgames.com/JackElope/?seed=${rand.internal_seed}&name=${name}&image=${image}&matchPercent=${rand.getRandomNumberBetween(-113, 999)}&loc=Horrrorterror,Google`
  renderLink(parent, title, description, url);
}

const personalityLink = (parent, rand) => {
  const theme1 = getRandomTheme();
  const theme2 = getRandomTheme();
  const theme3 = getRandomTheme();
  const theme4 = getRandomTheme();
  const theme5 = getRandomTheme();
  const theme6 = getRandomTheme();
  const madLibs = scrapeImportantWordsFromTheme(rand, theme1);
  const madLibs2 = scrapeImportantWordsFromTheme(rand, theme2);


  let title = rand.pickFrom(["Zampanio Quest Online", "Zampaniosona Quiz", `${madLibs2.adj} ${madLibs.object} Quiz`, `${madLibs.adj} ${madLibs2.object} Quiz`]);

  let isBroken = false;
  //the personality quiz doesn't know about food
  if (food_keys.includes(theme1.key)) {
    isBroken = true;
  }

  if (food_keys.includes(theme2.key)) {
    isBroken = true;
  }

  if (food_keys.includes(theme3.key)) {
    isBroken = true;
  }

  if (food_keys.includes(theme4.key)) {
    isBroken = true;
  }

  if (food_keys.includes(theme5.key)) {
    isBroken = true;
  }


  if (food_keys.includes(theme6.key)) {
    isBroken = true;
  }

  let description = rand.pickFrom(["ZampanioQuest like you've never seen it before!", "Wait. Is this really Zampanio?", "Whose quiz resulsts IS this?", "Find out who you are tonight.", "The Truth is we don't know if this is your Zampanio results or not."])
  if (isBroken) {
    description += "<div class='corruption'>[WARNING: CORRUPTION DETECTED]</div>"
  }

  let url = `http://eyedolgames.com/PersonalityQuiz/?seed=${rand.internal_seed}&your_themes=${[theme1.key, theme2.key, theme3.key].join(',')}&your_rivals_themes=${[theme4.key, theme5.key, theme6.key].join(',')}`
  renderLink(parent, title, description, url);
}


const zWorldLink = (parent, rand) => {
  let image = "/General/00096-20230605083548-img.png"
  if (subsiteImageCache[ZWORLD]) {
    image = rand.pickFrom(subsiteImageCache[ZWORLD]);
  }
  const firstParts = ["Cool", "Corrupted", "Glitched", "FAke", "Amazing", "Tantalizing", "Hypnotic", "Obsesive", "Hydrated"]
  const secondParts = ["Theme Park Ride", "ZWorld", "Experience", "Calibration", "Maze", "Labyrinth", "Hallway", "Horridor", "Corridor"]

  let title = `${rand.pickFrom(firstParts)} ${rand.pickFrom(secondParts)}`;

  let descriptions = ["Be thrilled tonight!", "The fun never ends!", "It never ends!", "Designed by Abhorrineer Devona Avamund!", "It's an award winning theme park ride!", "It's perfectly normal!", "Ride it.", "Ride it.", "You will have so much fun.", "It's the most innovative shooter you've played in years.", "It's so fun.", "You got that right.", "Weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee!"]
  let endings = ["(Safety Guaranteed)", "You will survive it. Guaranteed.", "Brought to you by ZWorld.", "Brought to you By Eyedol Games.", "The lines never end!"]
  let description = rand.pickFrom(descriptions);
  for (let i = 0; i < rand.getRandomNumberBetween(0, 5); i++) {
    description += " " + rand.pickFrom(descriptions);
  }
  if (Math.random() > 0.75) {
    description += " " + rand.pickFrom(endings);
  }

  let url = `http://eyedolgames.com/ZWorld/?rideType=Corruption&name=${title}&image=${image}&themes=ocean&obsession=Animorphs`
  renderLink(parent, title, description, url);
}

const quotidianAdoption = (parent, rand) => {
  let image = "crow_7.png"
  if (subsiteImageCache[PET]) {
    image = rand.pickFrom(subsiteImageCache[PET]);
  }
  const name = generatePetName(rand);
  const titles = ["Spies R Us", "Spies 4 Hire", "Interns Available", `Adopt ${name} Today!`, `Will You Make ${name} Part Of Your Life?`, `${name} Needs You!`, `Adopt ${name} Today!`, "Cute Pet Adoption", "Find Pets Online", "Pets 4 Sale", "PetsOvernight.info"]
  let title = rand.pickFrom(titles);

  const descriptions = ["Have you ever wondered what your neighbors are up to?", "Would you like to hire some spies?", "Find an animal companion tonight!", "It's a perfectly normal pet adoption website!", "Caw!!!", "Quotidians will love and observe you forever!", "There is nothing wrong with these loveable pets!"]
  const endings = ["(Fees and Conditions May Apply)", "No Refunds.", "Powered By Eyedol Games Staffing Solutions", "Internships Available"]
  let description = rand.pickFrom(descriptions);
  for (let i = 0; i < rand.getRandomNumberBetween(0, 5); i++) {
    description += " " + rand.pickFrom(descriptions);
  }
  if (Math.random() > 0.75) {
    description += " " + rand.pickFrom(endings);
  }
  let url = `http://eyedolgames.com/QuotidianAdoption/?name=${name}&age=${rand.getRandomNumberBetween(1, 14)}%20months%20old&breed=Horror Terror&img_src=${image}`
  renderLink(parent, title, description, url);
}



const fridaySite = (parent, rand) => {
  let title = "You Should Not Be Here";
  let description = "It's after midnight. Or it's friday. Either way, Zampanio thinks you should rest.";
  let url = "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/jr_says_sleep.mp4"
  renderLink(parent, title, description, url);
}


const obsessionSite = (parent, rand) => {
  let title = "Obsession is a Dangerous Thing";
  let description = "There's not going to be an end. There is no center. Obsession will send you spiralling forever. Stop. Rest. Do something else.";
  let url = "http://eyedolgames.com/GenericMimicSite/?name=Generic%20Name%2088&tinyDescription1=Generic%20Desc%201&tinyDescription2=Generic%20Desc%202&img_src=crow_10.png"
  renderLink(parent, title, description, url);
}



const getRestaurantName = (rand, theme_keys, weird) => {

  const quick = (key, cap) => {
    return pickARandomThemeFromListAndGrabKey(rand, theme_keys, key, cap)
  };

  const firstName = () => rand.pickFrom(first_names);
  const lastName = () => rand.pickFrom(last_names);
  const goodwordsraw = `Happy
  Joy
  Blushing
  Party
  Fiesta
  Central
  Cozy
  Comfort
  Joyful
  Good
  Great
  Awesome
  Ultimate`;
  const goodwords = goodwordsraw.split("\n")

  const possibilities = [
    `${rand.pickFrom(['Mr', 'Miss', 'Mrs', "Mx", "Master", "Mistress", "Lord", "Lady"])}  ${quick(OBJECT, true)}`,
    `${rand.pickFrom(['Mr', 'Miss', 'Mrs', "Mx", "Master", "Mistress"])} ${quick(ADJ, true)} ${quick(OBJECT, true)}`,
    ` ${quick(OBJECT, true)} ${rand.pickFrom(["Master", "Mistress", "Lord", "Lady"])}`,

    `${quick(ADJ, true)} ${quick(OBJECT, true)}`,
    `${quick(ADJ, true)} ${quick(OBJECT, true)}`,

    `${quick(COMPLIMENT, true)} ${quick(OBJECT, true)}`,
    `${quick(PERSON, true)}'s ${quick(OBJECT, true)}`,
    `${quick(PERSON, true)}'s ${quick(OBJECT, true)}s`,
    `${quick(PERSON, true)}'s ${quick(OBJECT, true)}s`,

    `${quick(PERSON, true)}'s ${quick(LOCATION, true)}`,
    `${quick(PERSON, true)}'s ${quick(LOCATION, true)}`,
    `${quick(PERSON, true)}'s ${quick(LOCATION, true)}`,
    `${quick(PERSON, true)}'s ${quick(LOCATION, true)}`,

    `${quick(ADJ, true)} ${quick(LOCATION, true)}`,
    `The ${quick(ADJ, true)} ${quick(LOCATION, true)}`,
    `The ${quick(COMPLIMENT, true)} ${quick(OBJECT, true)}`,
    `The ${rand.pickFrom(goodwords)} ${quick(OBJECT, true)}`,

    `${quick(ADJ, true)} ${quick(OBJECT, true)} ${quick(LOCATION, true)}`,
    `${quick(COMPLIMENT, true)} ${quick(OBJECT, true)} ${quick(LOCATION, true)}`,
    `${firstName()}'s ${quick(OBJECT, true)} ${quick(LOCATION, true)}`,
    `${firstName()}'s ${quick(OBJECT, true)}`,
    `${lastName()}'s ${quick(OBJECT, true)} ${quick(LOCATION, true)}`,
    `${lastName()}'s ${quick(OBJECT, true)}`,
    `${lastName()}'s`,

    `${lastName()}'s ${quick(COMPLIMENT, true)} ${quick(OBJECT, true)}`,
    `${firstName()}'s ${quick(COMPLIMENT, true)} ${quick(OBJECT, true)}`,
    `${lastName()}'s ${quick(ADJ, true)} ${quick(OBJECT, true)}`,
    `${firstName()}'s ${quick(ADJ, true)} ${quick(OBJECT, true)}`,

    `${quick(OBJECT, true)} ${quick(LOCATION, true)}`
  ];

  if (weird) {
    possibilities.push(`${pickARandomThemeFromListAndGrabKey(rand, theme_keys, INSULT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,)
    possibilities.push(`${pickARandomThemeFromListAndGrabKey(rand, theme_keys, INSULT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, LOCATION, true)}`,)
  }
  return rand.pickFrom(possibilities);
}

