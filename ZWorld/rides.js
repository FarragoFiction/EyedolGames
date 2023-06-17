
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

const initCoasters = async ()=>{
  const loc = 'http://eyedolgames.com/ZWorld/images/attractions/Coasters/'
  let tmp = await getImages(loc);
  coasterImages = tmp.map((item) => loc  + item);
}

const randomCoaster = (rand)=>{
    const themes = [];
    let number_themes = rand.getRandomNumberBetween(1,3);
    for(let i = 0; i<number_themes; i++){
      themes.push(rand.pickFrom(Object.values(all_themes)));
    }
    //no procedural obsessions for now
    const obsession = rand.pickFrom(Object.values(all_obsessions)); //think of it like brand tie ins

    //you can put "the" in front of these
    const excitingWords = ["Ride","Coaster","Demon","Titan","Twister","One","Scream","Revenge","Horridor","Labyrinth","Scream Machine","Maze","Scorcher","Dive","Fury","Blitz","Escape","Ride","Blaster","Experience","Train","Scream","Mountain","Coaster","Flight","Cyclone"]
    const sizeWords = ["Never Ending","Endless","Eternal","Big","Huge","Big","Massive","Little","Giant","Gigantic"];


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
    const restaurantName = getRestaurantName(rand, foodThemes.map((t)=>t.key), true)
    const restaurantUrl = `http://eyedolgames.com/Zampanini/?name=${encodeURI(restaurantName).replace(/'/g, "%27")}&themes=${encodeURI(foodThemes.map((t)=>t.key))}&feeUnder=${rand.getRandomNumberBetween(1,113)}`;
    const nearbyAttractions = `${rand.getRandomNumberBetween(2,13)} ${rand.pickFrom(["Miles","Blocks","Feet","Meters","Kilometers","Jumps","Turns"])} from: <a target='_blank' href='${restaurantUrl}'>${restaurantName}</a>`;
    
    const desc = "lorem ipsum baby"
    return new Ride(titleCase(rand.pickFrom(nameTemplates)), rand.pickFrom(coasterImages),nearbyAttractions,desc)
}

class Ride{
  imageSrc;
  name;
  nearbyAttractions; //this is html and has a link
  teaserDescription;
  element;

  constructor(name,image, nearbyAttractions, teaserDescription){
    this.name = name;
    this.imageSrc = image;
    this.nearbyAttractions = nearbyAttractions;
    this.teaserDescription = teaserDescription;
    this.generateElement();
  }

  generateElement = ()=>{
    this.element = createElementWithClass("div","ride-container");
    const img  = createElementWithClassAndParent("img",this.element);
    img.src = this.imageSrc;
    const summary  = createElementWithClassAndParent("div",this.element,"ride-summary");
    const title  = createElementWithClassAndParent("div",summary,"ride-title");
    title.innerText = ">"+ this.name;

    const attractions  = createElementWithClassAndParent("div",summary,"nearby-attractions");
    attractions.innerHTML = this.nearbyAttractions;

    const desc  = createElementWithClassAndParent("div",summary,"teaser-desc");
    desc.innerHTML = this.teaserDescription;

    return this.element;
  }


}