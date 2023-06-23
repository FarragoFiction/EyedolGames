let coasterImages = [];
let trainImages = [];

const devonaQuotes = [
  "Um... Well... You see my friend Ria, uh, I guess you don't need to know her last name, not that I'm HIDING it but its not important, and neville says I don't have to say anything if its not important, anyways she said that she was really into this new book she found but for some reason there wasn't a musical inside it even though it SAID it was and I got so so scared thinking about what it might be and then WANDA, uh, that's the CEBro of Eyedol Games texted me asking when my next assignment would be ready and i kind of PANICKED and uh, so I made this.",
];

const initCoasters = async () => {
  let loc = 'http://eyedolgames.com/ZWorld/images/attractions/Coasters/'
  let tmp = await getImages(loc);
  coasterImages = tmp.map((item) => loc + item);

  loc = 'http://eyedolgames.com/ZWorld/images/attractions/Trains/'
  tmp = await getImages(loc);
  trainImages = tmp.map((item) => loc + item);
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
  if(rideType ===TRAIN ){
    return new DetailsTrain(name, image, themes, obsession, desc, quips);
  }else if (rideType === COASTER){
    return new DetailsCoaster(name, image, themes, obsession, desc, quips);
  }


}

class TeaserRide {
  imageSrc;
  name;
  themes;
  nearbyAttractions; //this is html and has a link
  teaserDescription;
  element;
  obsession;
  rideType = "???"


  constructor(name, image, themes, obsession, nearbyAttractions, teaserDescription, bigDescription) {
    this.name = name;
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

class DetailsRide {
  imageSrc;
  name;
  themes;
  description;
  element;
  obsession;
  truthQuips = [];
  rideType = "???"

  constructor(name, image, themes, obsession, description, truthQuips) {
    this.name = name;
    this.obsession = obsession;
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

    this.generateDescription(left);

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
      if(tip.includes('mobility aids')){
        ele.onmouseenter = async ()=>{
          await textVoiceSim.speak(`Eyedol Games prides itself on its accessibility!`.split(" "), null, true)
        }
      }else if(tip.includes("Please allocate")){
        ele.onmouseenter = async ()=>{
          await textVoiceSim.speak(`In-Queue entertainment will be provided, free of charge!`.split(" "), null, true)
          await sleep(1000);
          await textVoiceSim.speak("Assuming you find my horridors entertaining.".split(","), null, false);
        }
      }else if(tip.includes("Water will be provided")){
        ele.onmouseenter = async ()=>{
          await textVoiceSim.speak(`Humans will die in just three days without water!`.split(" "), null, true)
          await sleep(1000);
          await textVoiceSim.speak(`You can go much, much longer without food!`.split(" "), null, true)

        }
      }else if(tip.includes("Guests are encouraged")){
        ele.onmouseenter = async ()=>{
          await textVoiceSim.speak(`Eyedol Games accepts no liability from injuries incurred attempting to leave the queue.`.split(" "), null, true)
          await sleep(1000);
          await textVoiceSim.speak("Philistines. You will navigate my maze and you will like it.".split(","), null, false);
        }
      }
    }

  }

  generateDescription = (ele)=>{
    const container = createElementWithClassAndParent("div", ele,"section");
    container.innerText = "TODO";

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

    const items = [`Eligible for ZWorld LossPass System where queue times may be reduced via Proof Of Engagement.  ${rand.pickFrom(lossPassExplanations)}`,
    `For your safety, ${rand.pickFrom(safetyExplanationsMaze)} ZWorld prides itself on industry leading accessibility. `,`Rides and other attractions may provide a risk of death, mutilation or other damage. ZWorld takes no liability for injuries occurred outside of the Maze Queuing&#x2122; system.`]
    
    const container = createElementWithClassAndParent("ul", ele);

    for(let item of items){
      const doop = createElementWithClassAndParent("li", container);
      doop.innerHTML = item;

      if(item.includes("LossPass")){
        doop.onmouseenter = async ()=>{
          await textVoiceSim.speak(`LossPass, for when you just can't wait!`.split(" "), null, true)
          await sleep(3000);
          await textVoiceSim.speak("Do not DREAM of skipping my maze.".split(","), null, false);
        }
      }else if (item.includes("For your safety")){
        doop.onmouseenter = async ()=>{
          await textVoiceSim.speak(`Just try to find such service at our rival park, River Expanse!`.split(" "), null, true)
        }
      }else if (item.includes("Rides and other attractions")){
        doop.onmouseenter = async ()=>{
          await textVoiceSim.speak(`I would recommend remaining in the Maze Queueing System&#x2122; as long as possible!`.split(" "), null, true)
          await sleep(1000);
          await textVoiceSim.speak("You ingrate.".split(","), null, false);

        }
      }
      
    }
  }

  generateInfoBox = (ele) => {
    const themes = this.themes;
    const infoBox = createElementWithClassAndParent("div", ele, "info-box");
    const locationRiddleLabel = createElementWithClassAndParent("div", infoBox, "info-box-label");
    locationRiddleLabel.innerText = "Location Riddle:"
    const locationRiddle = createElementWithClassAndParent("div", infoBox, "info-box-content");

    locationRiddle.onmouseenter = async ()=>{
      await textVoiceSim.speak("A designated Puzzle Assistant will be assigned to you once you enter the park!".split(" "), null, true)
      await sleep(1000);
      await textVoiceSim.speak("If you are too stupid to figure it out on your own.".split(","), null, false);
    }

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
      `First, you need to be carrying a ${chosenObject}. A suspicious ${chosenPerson} will approach you. Do what they say. `,
      `Believe in the heart of the cards.`];
    locationRiddle.innerText = rand.pickFrom(shittyRiddleTemplates);

    const heightLabel = createElementWithClassAndParent("div", infoBox, "info-box-label");
    heightLabel.innerText = "Height Requirement:"

    const height = createElementWithClassAndParent("div", infoBox, "info-box-content");
    height.innerText = `${rand.getRandomNumberBetween(3, 113)} ${rand.pickFrom(["feet", "centimeters", "meters", "inches", "millimeters"])} or ${rand.pickFrom(["taller", "bigger", "smaller", "shorter"])}`;

    height.onmouseenter = async ()=>{
      await textVoiceSim.speak("Should you wish to meet height requirements, Guest Services can assist you!".split(" "), null, true)
      await sleep(1000);
      await textVoiceSim.speak("Who would be stupid enough to agree to let us change their height?".split(","), null, false);
    }


    const categoryLabel = createElementWithClassAndParent("div", infoBox, "info-box-label");
    categoryLabel.innerText = "Category:"
    const category = createElementWithClassAndParent("div", infoBox, "info-box-content");
    category.innerText = `${this.rideType}, ${this.themes.map((t) => titleCase(t.key)).join(", ")}`;

    category.onmouseenter = async ()=>{
      await textVoiceSim.speak(`${titleCase(rand.pickFrom(this.themes).key)} has been especially popular this season.`.split(" "), null, true)
    }
    //wanda is EXTREMELY disability friendly
    //everyone should get to be lost
    //not just the abled bodied
    const wheelchairLabel = createElementWithClassAndParent("div", infoBox, "info-box-label");
    wheelchairLabel.innerText = "Wheelchair Accessible:"
    const wheelchair = createElementWithClassAndParent("div", infoBox, "info-box-content");
    wheelchair.innerText = `Yes.`;

    wheelchair.onmouseenter = async ()=>{
      await textVoiceSim.speak(`Eyedol Games prides itself on its accessibility!`.split(" "), null, true)
    }

  }

}