
/*
ride has image, name, location (just have it be near various restaurants
   and link to zampanini) and then a teaser description

*/

let coasterImages = [];
/*
examples of teasers: 

"Children aged four to one hundred and four will be enchanted as this state of the art dark ride showcases five iconic scenes from House of Notes, including the Endless Opera!'

"This award winning dark ride shows the emmy nominated scene where Mike canibalizes the Mayor in order to win over Steve as a partner  in the three legged race."

"Join us in celebrating our newly opened House of Notes Experience with a brand new dark ride!  Award winning Abhorrineer Devona Avamund  takes us on a dark descent into obsession and hot tunes!"

"Abhorrineer Devona Avamund had this to say about her newest masterpiece: "Um... Well... You see my friend Ria, uh, I guess you don't need to know her last name, not that I'm HIDING it but its not important, and neville says I don't have to say anything if its not important, anyways she said that she was really into this new book she found but for some reason there wasn't a musical inside it even though it SAID it was and I got so so scared thinking about what it might be and then WANDA, uh, that's the CEBro of Eyedol Games texted me asking when my next assignment would be ready and i kind of PANICKED and uh, so I made this. "

*/


//she physically cannot shut up and wants to be out of this situation so so bad
//why are you asking her how she made these
//oh god what if she gets it wrong
const devonaQuotes = [
  "Um... Well... You see my friend Ria, uh, I guess you don't need to know her last name, not that I'm HIDING it but its not important, and neville says I don't have to say anything if its not important, anyways she said that she was really into this new book she found but for some reason there wasn't a musical inside it even though it SAID it was and I got so so scared thinking about what it might be and then WANDA, uh, that's the CEBro of Eyedol Games texted me asking when my next assignment would be ready and i kind of PANICKED and uh, so I made this.",
];

const initCoasters = async () => {
  const loc = 'http://eyedolgames.com/ZWorld/images/attractions/Coasters/'
  let tmp = await getImages(loc);
  coasterImages = tmp.map((item) => loc + item);
}

//used for blurbs, no detail section because thats for the next page
const randomCoaster = (rand) => {
  const themes = [];
  let number_themes = rand.getRandomNumberBetween(1, 3);
  for (let i = 0; i < number_themes; i++) {
    themes.push(rand.pickFrom(Object.values(all_themes)));
  }
  //no procedural obsessions for now
  const obsession = rand.pickFrom(Object.values(all_obsessions)); //think of it like brand tie ins

  //you can put "the" in front of these
  const excitingWords = ["Ride", "Coaster", "Demon", "Titan", "Twister", "One", "Scream", "Revenge", "Horridor", "Labyrinth", "Scream Machine", "Maze", "Scorcher", "Dive", "Fury", "Blitz", "Escape", "Ride", "Blaster", "Experience", "Train", "Scream", "Mountain", "Coaster", "Flight", "Cyclone"]
  const sizeWords = ["Never Ending", "Endless", "Eternal", "Big", "Huge", "Big", "Massive", "Little", "Giant", "Gigantic"];


  const chosenAdj = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)
  const chosenPerson = rand.pickFrom(themes).pickPossibilityFor(PERSON, rand)
  const chosenObject = rand.pickFrom(themes).pickPossibilityFor(OBJECT, rand)
  const chosenLocation = rand.pickFrom(themes).pickPossibilityFor(LOCATION, rand)

  const noun = rand.pickFrom([chosenPerson, chosenLocation, chosenObject]);

  const nameTemplates = [
    `${noun}`,
    `The ${noun}`,
    `The ${rand.pickFrom(sizeWords)} ${noun}`,
    `${rand.pickFrom(excitingWords)} ${noun}`,
    `${noun}: The ${rand.pickFrom(excitingWords)} `,
    `${noun} ${rand.pickFrom(excitingWords)}`,
    `${obsession.name}: The ${rand.pickFrom(excitingWords)}`,
    `${obsession.name}: The ${chosenAdj} ${rand.pickFrom(excitingWords)}`,

    `${chosenAdj} ${rand.pickFrom(excitingWords)}`,
    `The ${chosenAdj} ${rand.pickFrom(excitingWords)}`,
  ];
  const foodThemes = [...themes, all_themes[rand.pickFrom(food_keys)]]
  const restaurantName = getRestaurantName(rand, foodThemes.map((t) => t.key), true)
  const restaurantUrl = `http://eyedolgames.com/Zampanini/?name=${encodeURI(restaurantName).replace(/'/g, "%27")}&themes=${encodeURI(foodThemes.map((t) => t.key))}&feeUnder=${rand.getRandomNumberBetween(1, 113)}`;
  const nearbyAttractions = `${rand.getRandomNumberBetween(2, 13)} ${rand.pickFrom(["Miles", "Blocks", "Feet", "Meters", "Kilometers", "Jumps", "Turns"])} from: <a target='_blank' href='${restaurantUrl}'>${restaurantName}</a>`;

  const chosenName = titleCase(rand.pickFrom(nameTemplates));


  const teaserTemplates = [`Before Eyedol Games' Acquisition, the top manufacturing company Idlev was making coasters at break neck speed. It was no surprise they'd be a leader in innovation for new ways of manufacturing death defying experiences.<br><br>${chosenName} was their first attempt. `,
  `Abhorrineer Devona Avamund had this to say about her newest masterpiece: ${rand.pickFrom(devonaQuotes)}`,
  `Fly like a ${noun}, we provide the wings.`,
  `Scream for ${rand.pickFrom([, "chills and thrills", chosenName, "ice cream", "it", "this living legend", "all who are born die", "there is no justice in life"])}.`,
  `Take a ${rand.pickFrom(["Delerious Drop", "Frightning Fall", "Perilous Plunge"])} into ${rand.pickFrom(["Extreme Exhilaration", "Freaky Fun", "Panicky Pleasure"])}! (Additional Fee Required)`,
  `Looking for some new ${rand.pickFrom(["excitement", "thrills", "chills", "experiences"])}? This track let's you get an immersive experience like never before. Let your body betray you as your flesh turns to cold metal, your eyes replaced by headlights, your mouth transfixed in horror and engraved in cheap glossy plastic. Let their joyful screams become your prison.`,
  `Are you ${rand.pickFrom(["kind", "brave", "bad", "scared", "epic"])} enough to ${rand.pickFrom(["placate", "murder", "battle", "kill", "fight", "survive"])} ${chosenName}?`,
  `A ${rand.getRandomNumberBetween(2, 217)} ${rand.pickFrom(["foot", "mile", "inch", "meter", "yard"])} vertical lift is nothing compared to the beyond vertical drop on this ${rand.pickFrom(["wood", "steel", "metal", "plastic", "aluminum", "tin", "lead"])} ${rand.pickFrom(["tyrant", "champion", "king", "lord", "mosnter"])}.`,
  `${rand.pickFrom(["Sleeker", "Faster", "Smarter", "Higher", "More Terrifying"])} and ${rand.pickFrom(["Smoother", "Wetter", "Tastier", "More Rigid"])} than ever before! Like a Shark!`,
    "Join us in celebrating our newly opened House of Notes Experience with a brand new coaster!  Award winning Abhorrineer Devona Avamund  takes us on a dark descent into obsession and hot tunes!",
  `Children aged four to one hundred and four will be enchanted as this state of the art coaster showcases ${rand.pickFrom(["space", "sanity", "death", "dad"])} defying loops!`,
  `If you have a fear of ${rand.pickFrom(["relaxing", "heights", "heights", "falling", "drops", "gravity", "loops", "spirals", "trains", "roller coasters", "spiders", "teacups", noun + "s"])}, consider yourself warned.`,
  `${chosenName} is our first attempt at a new process we call 'harvesting'. Essentially, when old coasters are set to retire, whatever is still operational is salvaged and refitted in order to save massively on costs of manufacturing. Our designers take these stray pieces and fit them into new coasters.`];


  const desc = rand.pickFrom(teaserTemplates);
  return new TeaserRide("Coaster", chosenName, rand.pickFrom(coasterImages), themes, obsession,nearbyAttractions, desc)
}

const createDetailsRideFromParams = (rideType, name, image, themes,obsession) => {
  const chosenAdj = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)
  const chosenInsult = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)
  const chosenCompliment = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)

  const adj = rand.pickFrom([chosenAdj, chosenInsult, chosenCompliment])

  const chosenPerson = rand.pickFrom(themes).pickPossibilityFor(PERSON, rand)
  const chosenObject = rand.pickFrom(themes).pickPossibilityFor(OBJECT, rand)
  const chosenLocation = rand.pickFrom(themes).pickPossibilityFor(LOCATION, rand)

  const noun = rand.pickFrom([chosenPerson, chosenLocation, chosenObject]);

  const desc = "TODO";
  const intros = ["Have you already ridden this one?", "You should ride this one.", "This one reminds me of you.", "This one would be perfect for you.", "You would not like this one.", "This one might be too scary for you."];
  const clarifications = [`It has so many ${noun}s.`, `It is very ${adj}.`];
  adj
  const quips = [rand.pickFrom(intros), rand.pickFrom(clarifications)];

  return new DetailsRide(rideType, name, image, themes, obsession, desc, quips);

}

class DetailsRide {
  imageSrc;
  name;
  themes;
  description;
  element;
  obsession;
  truthQuips = [];
  rideType;

  constructor(rideType, name, image, themes, obsession, description, truthQuips) {
    this.name = name;
    this.rideType = rideType;
    this.obsession  = obsession;
    this.imageSrc = image;
    this.themes = themes;
    this.description = description;
    this.truthQuips = truthQuips;
    this.generateElement();
  }

  generateElement = () => {
    this.element = createElementWithClass("div", "details-container");
    const imgEle = createElementWithClassAndParent("img", this.element, "huge-img");
    imgEle.src = this.imageSrc;
    const content = createElementWithClassAndParent("div", this.element, "details-content");
    const left = createElementWithClassAndParent("div", content, "details-left");
    const right = createElementWithClassAndParent("div", content, "details-right");

    this.generatePostShow(left);

    this.generateGuestPolicies(left);


    this.generateInfoBox(right);
    this.generateQuickTips(right);



    return this.element;
  }



  //not terriblyprocedural, useful for all rides
  generateQuickTips = (ele) => {
    const infoBox = createElementWithClassAndParent("div", ele, "info-box");

    const tip = createElementWithClassAndParent("div", infoBox, "quick-tips");
    tip.innerText = "Quick Tips";

    const tips = [`Please allocate ${rand.getRandomNumberBetween(2, 217)} hours to navigate the queue for this ride.`,
      "Water will be provided periodically in queue. No outside food or drink is permitted.","Guests are encouraged to remain in queue.",
      "Please let Guest Services know if any mobility aids are required."]
    for (let tip of tips) {
      const ele = createElementWithClassAndParent("div", infoBox, "info-box-content");
      ele.innerText = tip;
    }

  }

  generatePostShow = (ele)=>{
    const label = createElementWithClassAndParent("div", ele, "info-box-label");
    label.innerText = "Post Show.";
    const themes = this.themes;
    const chosenAdj = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)
    const chosenInsult = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)
    const chosenCompliment = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)

    const adj = rand.pickFrom([chosenAdj, chosenInsult, chosenCompliment])

    const chosenPerson = rand.pickFrom(themes).pickPossibilityFor(PERSON, rand)
    const chosenObject = rand.pickFrom(themes).pickPossibilityFor(OBJECT, rand)
    const chosenLocation = rand.pickFrom(themes).pickPossibilityFor(LOCATION, rand)

    const noun = rand.pickFrom([chosenPerson, chosenLocation, chosenObject]);

    const container = createElementWithClassAndParent("div", ele,"section");

    //JR NOTE: TODO add possibilities for different ride types

    const startStartPossibilities = [`After exiting the ride`,`Upon completion of the experience`,`When you escape`]

    const startPossibilities = [`you will finally understand what it feels like to be ${this.obsession.randomBlorbo(rand)}!`,`you will be given a complementary ${noun}.`, `you will be sent through a decontamination process.`,`you will be given a nice cake.`,`you will be baked and then there will be cake.`]
    const midPossibilities1 = [`The exit maze`,`The exit queue`,`Your exist path`]
    const midPossibilities2 = [`will take aproximately ${rand.getRandomNumberBetween(1,13)} ${rand.pickFrom(["hours","minutes"])}.`,`will reveal how ${chosenCompliment} you truly are.`,`will be extremely ${adj}.`]


    const endPossibilities = [`It's okay to be scared.`,`A ${chosenPerson} will guide you safely out. Trust them.`,`Once you reach the ${chosenLocation} you will be free.`]


    container.innerText = `${rand.pickFrom(startStartPossibilities)}, ${rand.pickFrom(startPossibilities)} ${rand.pickFrom(midPossibilities1)} ${rand.pickFrom(midPossibilities2)} ${rand.pickFrom(endPossibilities)}`;

   
  }

  generateGuestPolicies = (ele)=>{
    const label = createElementWithClassAndParent("div", ele, "info-box-label");
    label.innerText = "Guest Policies";

    const lossPassExplanations = ["It doesn't matter where you get Lost, so long as you do&#x2122;!","Can you get to the end of the maze before your friends?","CrypticCurrency thrives on YOUR obsessions!","Virtual maze progress can be traded for physical maze progres, reducing your wait times!","Do the things YOU enjoy and in exchange you will earn TOKENS to make progress through our LossPass system to get the content you crave in a fair and timely fashion!","Earn TOKENS through Engagement with main branch Zampanio properties!"];
    const safetyExplanationsMaze = ["mortality is disabled within the Maze Queuing System.","no one can die within the Maze Queuing System ","the Maze Queuing System will maintain absolutely your state upon entry until such a time as you leave","the Eight Divines cannot protect you within the Maze Queuing System","we here at EyedolGames have harvested the latent energy of a Forgotten God to provide you with Neverending Life so long as you walk the halls of the Maze Queuing System!","Nidhogg's Unending Life is kept confined to all Mazes, including our Maze Queuing System! Enjoy complementary immortality while in our halls!"]

    const items = [`Eligible for ZWorld Loss Pass System where queue times may be reduced via Proof Of Engagement.  ${rand.pickFrom(lossPassExplanations)}`,
    `For your safety, ${rand.pickFrom(safetyExplanationsMaze)} ZWorld prides itself on industry leading accessibility. `,`Rides and other attractions may provide a risk of death, mutilation or other damage. ZWorld takes no liability for injuries occurred outside of the Maze Queuing&#x2122; system.`]
    
    const container = createElementWithClassAndParent("ul", ele);

    for(let item of items){
      const doop = createElementWithClassAndParent("li", container);
      doop.innerHTML = item;
    }
  }

  generateInfoBox = (ele) => {
    const themes = this.themes;
    const infoBox = createElementWithClassAndParent("div", ele, "info-box");
    const locationRiddleLabel = createElementWithClassAndParent("div", infoBox, "info-box-label");
    locationRiddleLabel.innerText = "Location Riddle:"
    const locationRiddle = createElementWithClassAndParent("div", infoBox, "info-box-content");

    const chosenAdj = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)
    const chosenInsult = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)
    const chosenCompliment = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)

    const adj = rand.pickFrom([chosenAdj, chosenInsult, chosenCompliment])

    const chosenPerson = rand.pickFrom(themes).pickPossibilityFor(PERSON, rand)
    const chosenObject = rand.pickFrom(themes).pickPossibilityFor(OBJECT, rand)
    const chosenLocation = rand.pickFrom(themes).pickPossibilityFor(LOCATION, rand)

    const noun = rand.pickFrom([chosenPerson, chosenLocation, chosenObject]);
    let shittyRiddleTemplates = [
      `Go just past the ${adj} ${chosenLocation}.  When you see the ${chosenInsult} ${noun} you'll know you're close.`,
      `First, you need to be carring a ${chosenObject}. A suspicious ${chosenPerson} will approach you. Do what they say. `,
      `Believe in the heart of the cards.`];
    locationRiddle.innerText = rand.pickFrom(shittyRiddleTemplates);

    const heightLabel = createElementWithClassAndParent("div", infoBox, "info-box-label");
    heightLabel.innerText = "Height Requirement:"
    const height = createElementWithClassAndParent("div", infoBox, "info-box-content");
    height.innerText = `${rand.getRandomNumberBetween(3, 113)} ${rand.pickFrom(["feet", "centimeters", "meters", "inches", "millimeters"])} or ${rand.pickFrom(["taller", "bigger", "smaller", "shorter"])}`;



    const categoryLabel = createElementWithClassAndParent("div", infoBox, "info-box-label");
    categoryLabel.innerText = "Category:"
    const category = createElementWithClassAndParent("div", infoBox, "info-box-content");
    category.innerText = `${this.rideType}, ${this.themes.map((t) => titleCase(t.key)).join(", ")}`;


    //wanda is EXTREMELY disability friendly
    //everyone should get to be lost
    //not just the abled bodied
    const wheelchairLabel = createElementWithClassAndParent("div", infoBox, "info-box-label");
    wheelchairLabel.innerText = "Wheelchair Accessible:"
    const wheelchair = createElementWithClassAndParent("div", infoBox, "info-box-content");
    wheelchair.innerText = `Yes.`;

  }
}

class TeaserRide {
  imageSrc;
  name;
  themes;
  rideType;
  nearbyAttractions; //this is html and has a link
  teaserDescription;
  element;
  obsession;

  constructor(rideType, name, image, themes,obsession, nearbyAttractions, teaserDescription, bigDescription) {
    this.name = name;
    this.rideType = rideType;
    this.obsession = obsession;
    this.imageSrc = image;
    this.themes = themes;
    this.nearbyAttractions = nearbyAttractions;
    this.teaserDescription = teaserDescription;
    this.generateElement();
  }

  generateElement = () => {
    this.element = createElementWithClass("div", "ride-container");
    const img = createElementWithClassAndParent("img", this.element);
    img.src = this.imageSrc;
    const summary = createElementWithClassAndParent("div", this.element, "ride-summary");
    const title = createElementWithClassAndParent("div", summary, "ride-title");
    title.innerText = ">" + this.name;

    const attractions = createElementWithClassAndParent("div", summary, "nearby-attractions");
    attractions.innerHTML = this.nearbyAttractions;

    const desc = createElementWithClassAndParent("div", summary, "teaser-desc");
    desc.innerHTML = this.teaserDescription;

    return this.element;
  }


}