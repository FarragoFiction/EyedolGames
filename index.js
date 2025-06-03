let linkCount = 0;
const loadSearchResults = () => {
  initThemes();
  const oldContainer = document.querySelector("#search-input-container")
  oldContainer.style.display = "none";

  const container = document.querySelector("#search-results")
  container.style.display = "block"
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
  const rand = new SeededRandom(linkCount + stringtoseed(new Date().toString()))
  const generators = [zampaniniLink, jackElopeLink, personalityLink, zWorldLink,quotidianAdoption,genericSite]
  pickFrom(generators)(parent,rand);
}


/*
  slightly larger, bold, underlined website title. blue. anchor.
  black regular default font description
  exact same font  in default green for what url you're going to go to in full
*/
const renderLink = (parent, title, description, url) => {
  linkCount++;
  console.log("JR NOTE: render link", { parent, title, description, url })
  const container = createElementWithClassAndParent("div", parent, "link-container")
  const titleEle = createElementWithClassAndParent("a", container, "title")
  titleEle.innerText = title;
  titleEle.href = url;
  titleEle.target = "_blank"
  const descriptionEle = createElementWithClassAndParent("div", container, "desc");
  descriptionEle.innerHTML = description;
  const urlEle = createElementWithClassAndParent("div", container, "url")
  urlEle.innerText = url;

}

const getRandomTheme = ()=>{
  return pickFrom(Object.values(all_themes));
}

const scrapeImportantWordsFromTheme = (rand,chosenTheme)=>{
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

//http://eyedolgames.com/Zampanini/?name=Baker's+Restaurant&themes=Bakery&feeUnder=21
const zampaniniLink = (parent,rand) => {
  const theme = getRandomTheme();
  let isBroken = true;
  if(food_keys.includes(theme.key)){
    isBroken =false;
  }
  let title = getRestaurantName(rand, [theme.key],Math.random()>0.75)
  const madLibs = scrapeImportantWordsFromTheme(rand, theme);
  const descriptionTemplates = [
    `It's a perfectly normal food website!`,
    `Try the ${madLibs.object}!`,
    `Food for you!`,
    `Flavorful ${madLibs.object}, directly to your door.`,
    `Try the ${madLibs.adj} ${madLibs.object}!`,
    `Home of the ${madLibs.object}!`,
    `The food is definitely ${madLibs.adj}!`,
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
    `Hosted by Zampanini!`,
    "Always Local. Always.",
    `Preferred by every ${madLibs.person}.`,
    `The food is definitely ${madLibs.adj}!`,
    " Give in to your cravings tonight!"]
    const descriptionTemplatesEnding = [
      `(Make sure not to eat the ${madLibs.object})`,`(Fees and conditions may apply)`,"(Always tip your driver)",
      "(Be sure to tip your driver)"]

  let description = pickFrom(descriptionTemplates);
  for(let i =0; i<getRandomNumberBetween(0,5); i++){
    description += " " + pickFrom(descriptionTemplates);
  }

  if(Math.random()>0.75){
    description += " "  +pickFrom(descriptionTemplatesEnding);
  }

  if(isBroken){
    description += "<div class='corruption'>[WARNING: CORRUPTION DETECTED]</div>"
  }

  let url = `http://eyedolgames.com/Zampanini/?name=${title}&themes=${theme.key}&feeUnder=${getRandomNumberBetween(1,4556)}`
  renderLink(parent, title, description, url);
}

//http://eyedolgames.com/JackElope/?seed=1764600067&name=Marcoccio&image=BigNormalPile%2F00000-20230306085907-img.png&matchPercent=99&loc=Naples%2C+Italy&secrets=%5B8%2C13%5D
const jackElopeLink = (parent) => {
  let title = "Jack Elope";
  let description = "It's a perfectly normal dating website! Find true love tonight! (Fees and conditions may apply)";
  let url = "http://eyedolgames.com/JackElope/?seed=1764600067&name=Marcoccio&image=BigNormalPile%2F00000-20230306085907-img.png&matchPercent=99&loc=Naples%2C+Italy&secrets=%5B8%2C13%5D"
  renderLink(parent, title, description, url);
}

const personalityLink = (parent) => {
  let title = "Personality Quiz";
  let description = "It's a perfectly normal personality quiz! Find out who you are tonight! (Fees and conditions may apply)";
  let url = "http://eyedolgames.com/PersonalityQuiz/?seed=600291&your_themes=science%2Cburied%2Cart&your_rivals_themes=freedom%2Ctwisting%2Cwaste"
  renderLink(parent, title, description, url);
}


const zWorldLink = (parent) => {
  let title = "Cool Theme Park Ride";
  let description = "It's a perfectly normal theme park ride! Be thrilled tonight! (Fees and conditions may apply)";
  let url = "http://eyedolgames.com/ZWorld/?rideType=Water%20Park&name=Animorphs:%20The%20Rush&image=/Water_park/00136-20230619123540-img.png&themes=ocean&obsession=Animorphs"
  renderLink(parent, title, description, url);
}

const quotidianAdoption = (parent) => {
  let title = "Find a Pet";
  let description = "It's a perfectly normal pet adoption website! Find a companion tonight! (Fees and conditions may apply)";
  let url = "http://eyedolgames.com/QuotidianAdoption/?name=Jiggy&age=6%20months%20old&breed=Tumblr&img_src=crow_7.png"
  renderLink(parent, title, description, url);
}


const genericSite = (parent) => {
  let title = "This Is A Website";
  let description = "It's a perfectly website! See a website Tonight! (Fees and conditions may apply)";
  let url = "http://eyedolgames.com/GenericMimicSite/?name=Generic%20Name%2088&tinyDescription1=Generic%20Desc%201&tinyDescription2=Generic%20Desc%202&img_src=crow_10.png"
  renderLink(parent, title, description, url);
}



const getRestaurantName = (rand, theme_keys, weird) => {

  const quick = (key, cap) => {
    return pickARandomThemeFromListAndGrabKey(rand, theme_keys, key, cap)
  };

  const firstName = ()=>rand.pickFrom(first_names);
  const lastName = ()=>rand.pickFrom(last_names);
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
    `${rand.pickFrom(['Mr','Miss','Mrs',"Mx","Master","Mistress","Lord","Lady"])}  ${quick(OBJECT, true)}`,
    `${rand.pickFrom(['Mr','Miss','Mrs',"Mx","Master","Mistress"])} ${quick(ADJ, true)} ${quick(OBJECT, true)}`,
    ` ${quick(OBJECT, true)} ${rand.pickFrom(["Master","Mistress","Lord","Lady"])}`,

    `${quick(ADJ, true)} ${quick(OBJECT, true)}`,
    `${quick(ADJ, true)} ${quick(OBJECT, true)}`,

    `${quick(COMPLIMENT, true)} ${quick(OBJECT, true)}`,
    `${quick( PERSON, true)}'s ${quick(OBJECT, true)}`,
    `${quick( PERSON, true)}'s ${quick(OBJECT, true)}s`,
    `${quick( PERSON, true)}'s ${quick(OBJECT, true)}s`,

    `${quick( PERSON, true)}'s ${quick(LOCATION, true)}`,
    `${quick( PERSON, true)}'s ${quick(LOCATION, true)}`,
    `${quick( PERSON, true)}'s ${quick(LOCATION, true)}`,
    `${quick( PERSON, true)}'s ${quick(LOCATION, true)}`,

    `${quick( ADJ, true)} ${quick(LOCATION, true)}`,
    `The ${quick( ADJ, true)} ${quick(LOCATION, true)}`,
    `The ${quick(COMPLIMENT, true)} ${quick(OBJECT, true)}`,
    `The ${rand.pickFrom(goodwords)} ${quick(OBJECT, true)}`,

    `${quick(ADJ, true)} ${quick( OBJECT, true)} ${quick(LOCATION, true)}`,
    `${quick(COMPLIMENT, true)} ${quick(OBJECT, true)} ${quick(LOCATION, true)}`,
    `${firstName()}'s ${quick( OBJECT, true)} ${quick(LOCATION, true)}`,
    `${firstName()}'s ${quick( OBJECT, true)}`,
    `${lastName()}'s ${quick( OBJECT, true)} ${quick(LOCATION, true)}`,
    `${lastName()}'s ${quick( OBJECT, true)}`,
    `${lastName()}'s`,

    `${lastName()}'s ${quick(COMPLIMENT, true)} ${quick( OBJECT, true)}`,
    `${firstName()}'s ${quick(COMPLIMENT, true)} ${quick( OBJECT, true)}`,
    `${lastName()}'s ${quick(ADJ, true)} ${quick( OBJECT, true)}`,
    `${firstName()}'s ${quick(ADJ, true)} ${quick( OBJECT, true)}`,

    `${quick(OBJECT, true)} ${quick(LOCATION, true)}`
  ];

  if (weird) {
    possibilities.push(`${pickARandomThemeFromListAndGrabKey(rand, theme_keys, INSULT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,)
    possibilities.push(`${pickARandomThemeFromListAndGrabKey(rand, theme_keys, INSULT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, LOCATION, true)}`,)
  }
  return rand.pickFrom(possibilities);
}

