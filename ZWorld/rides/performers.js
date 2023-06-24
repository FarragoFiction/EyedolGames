const LIVESHOW = "Live Show";
class TeaserLiveshow extends TeaserRide {
  rideType = LIVESHOW;

  constructor(rand) {
    const themes = [all_themes[CLOWNS]];
    let number_themes = rand.getRandomNumberBetween(0, 2);
    for (let i = 0; i < number_themes; i++) {
      themes.push(rand.pickFrom(Object.values(all_themes)));
    }
    //no procedural obsessions for now
    const obsession = rand.pickFrom(Object.values(all_obsessions)); //think of it like brand tie ins

    //you can put "the" in front of these
    const excitingWords = ["Extravaganza","Experience","Show","Performance","Stageshow","Liveshow","Circus","Circus","Circus","Circus","Big Top","Spectacle","Carnival","Festival"]
    const sizeWords = ["Never Ending", "Endless", "Eternal", "Big", "Huge", "Big", "Massive", "Little", "Giant", "Gigantic"];


    const chosenAdj = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)
    const chosenPerson = rand.pickFrom(themes).pickPossibilityFor(PERSON, rand)
    const chosenObject = rand.pickFrom(themes).pickPossibilityFor(OBJECT, rand)
    const chosenLocation = rand.pickFrom(themes).pickPossibilityFor(LOCATION, rand)

    const noun = rand.pickFrom([chosenPerson, chosenLocation, chosenObject]);

    const nameTemplates = [
      `${noun} ${rand.pickFrom(excitingWords)} `,
      `The ${noun} ${rand.pickFrom(excitingWords)} `,
      `The ${rand.pickFrom(sizeWords)} ${noun} ${rand.pickFrom(excitingWords)} `,
      `${noun} ${rand.pickFrom(excitingWords)}  `,
      `${noun}: The ${rand.pickFrom(excitingWords)} `,
      `${noun} ${rand.pickFrom(excitingWords)}`,
      `${obsession.name}: The ${rand.pickFrom(excitingWords)}`,
      `${obsession.name}: The ${chosenAdj} ${rand.pickFrom(excitingWords)}`,

      `${chosenAdj} ${rand.pickFrom(excitingWords)}`,
      `${chosenAdj} ${rand.pickFrom(excitingWords)}`,
      `The ${chosenAdj} ${rand.pickFrom(excitingWords)}`,
    ];
    const foodThemes = [...themes, all_themes[rand.pickFrom(food_keys)]]
    const restaurantName = getRestaurantName(rand, foodThemes.map((t) => t.key), true)
    const restaurantUrl = `http://eyedolgames.com/Zampanini/?name=${encodeURI(restaurantName).replace(/'/g, "%27")}&themes=${encodeURI(foodThemes.map((t) => t.key))}&feeUnder=${rand.getRandomNumberBetween(1, 113)}`;
    const nearbyAttractions = `${rand.getRandomNumberBetween(2, 13)} ${rand.pickFrom(["Miles", "Blocks", "Feet", "Meters", "Kilometers", "Jumps", "Turns"])} from: <a target='_blank' href='${restaurantUrl}'>${restaurantName}</a>`;

    const chosenName = titleCase(rand.pickFrom(nameTemplates));


    const teaserTemplates = [`Children of all ages should feast their eyes on this amazing feat of human flexibility! `,
    `Abhorrineer Devona Avamund had this to say about her newest masterpiece: ${rand.pickFrom(devonaQuotes)}`,
    `Scream for ${rand.pickFrom([, "chills and thrills", chosenName, "ice cream", "it", "this living legend", "all who are born die", "there is no justice in life"])}.`,
    `Looking for some new ${rand.pickFrom(["excitement", "thrills", "chills", "experiences"])}? Watch us.`,
    `Are you ${rand.pickFrom(["kind", "brave", "bad", "scared", "epic"])} enough to ${rand.pickFrom(["witness", "see", "watch", "pay witness to", "observe", "survive"])} ${chosenName}?`,
      "Join us in celebrating our newly opened House of Notes Experience with a brand new liveshow!  Award winning Abhorrineer Devona Avamund  takes us on a dark descent into obsession and hot tunes!",
    `Children aged four to one hundred and four will be enchanted as this state of the art liveshow showcases ${rand.pickFrom(["space", "sanity", "death", "dad"])} defying turns!`,
    `If you have a fear of ${rand.pickFrom(["clowns", "contortionists", "acrobats", "circuses",  "spiders", "teacups", noun + "s"])}, consider yourself warned.`,
  ];

    const desc = rand.pickFrom(teaserTemplates);
    super(chosenName, rand.pickFrom(performerImages), themes, obsession, nearbyAttractions, desc)
  }
}

class DetailsLiveshow extends DetailsRide {
  rideType = LIVESHOW;


  generateDescription = (ele) => {
    const fearLevel = rand.getRandomNumberBetween(1, 3)
    const confusionLevel = rand.getRandomNumberBetween(1, 3)

    this.generateFlavor(ele, fearLevel, confusionLevel)



    const intro = createElementWithClassAndParent("div", ele, "section");

    const numberPerformers = rand.getRandomNumberBetween(1,113);
    const runtime = `${rand.getRandomNumberBetween(1,113)} ${rand.pickFrom(["minutes","seconds","hours"])}`;


    const introParts = [`Join ${numberPerformers} trained performers as we amaze and delight you for ${runtime}! You will never forget ${this.name}! Or else!`]

  

    if (runtime.includes("minutes") || runtime.includes("seconds")) {
      introParts.push("Perfect for short attention spans!");
    } else {
      introParts.push(`Make sure to buy a drink from our many award winning restaurants before joining!`);
    }

    if (numberPerformers<4) {
      introParts.push("Avant garde!");
    } else {
      introParts.push(`Audience may experience loud noises.`);
    }

    intro.innerText = introParts.join(" ");



    this.generateWarnings(ele, fearLevel, confusionLevel)

    const label = createElementWithClassAndParent("div", ele, "info-box-label");
    label.innerText = "By the Numbers: ";

    const ul = createElementWithClassAndParent("ul", ele);
    ul.style.marginBottom = "50px";

    const facts = {
      "# Performers": numberPerformers,
      "Runtime": runtime,
      "Fear Level": fearLevel,
      "Confusion Level": confusionLevel
    }

    for (let key of Object.keys(facts)) {
      const doop = createElementWithClassAndParent("li", ul);
      doop.innerHTML = `${key}: ${facts[key]}`;
    }



  }


}