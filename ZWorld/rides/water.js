const WATER = "Water Park"

//https://www.tumblr.com/starfleetrambo/720526089261301760/beaft-wheresanegg-blog-ive-seen-a-lot-of?source=share


class TeaserWater extends TeaserRide {
  rideType = WATER;

  constructor(rand) {
    const themes = [all_themes[OCEAN]];

    let number_themes = rand.getRandomNumberBetween(0, 2);
    for (let i = 0; i < number_themes; i++) {
      themes.push(rand.pickFrom(Object.values(all_themes)));
    }
    //no procedural obsessions for now
    const obsession = rand.pickFrom(Object.values(all_obsessions)); //think of it like brand tie ins

    //you can put "the" in front of these
    const excitingWords = ["Slide","Cannonball","Splash","Ocean","Sea", "Dipper", "Raft", "Scream", "Falls", "Scorcher", "Dive", "Fury", "Blitz", "Scream", "Slide", "Rush","River"]
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
      `${chosenAdj} ${rand.pickFrom(excitingWords)}`,
      `The ${chosenAdj} ${rand.pickFrom(excitingWords)}`,
    ];
    const foodThemes = [...themes, all_themes[rand.pickFrom(food_keys)]]
    const restaurantName = getRestaurantName(rand, foodThemes.map((t) => t.key), true)
    const restaurantUrl = `http://eyedolgames.com/Zampanini/?name=${encodeURI(restaurantName).replace(/'/g, "%27")}&themes=${encodeURI(foodThemes.map((t) => t.key))}&feeUnder=${rand.getRandomNumberBetween(1, 113)}`;
    const nearbyAttractions = `${rand.getRandomNumberBetween(2, 13)} ${rand.pickFrom(["Miles", "Blocks", "Feet", "Meters", "Kilometers", "Jumps", "Turns"])} from: <a target='_blank' href='${restaurantUrl}'>${restaurantName}</a>`;

    const chosenName = titleCase(rand.pickFrom(nameTemplates));


    const teaserTemplates = [`Get wet! Go fast!`,
    `Abhorrineer Devona Avamund had this to say about her newest masterpiece: '${rand.pickFrom(devonaQuotes)}'`,
    `Swim like a ${noun}, we provide the innertube.`,
    `No lifeguards on staff.`,
    `Scream for ${rand.pickFrom([, "chills and thrills", chosenName, "ice cream", "it", "this living legend", "all who are born die", "there is no justice in life"])}.`,
    `Take a ${rand.pickFrom(["Daring Dive", "Stunning Swim", "Spiffy Splash"])} into ${rand.pickFrom(["Extreme Exhilaration", "Wacky Wetness", "Panicky Pleasure"])}! (Additional Fee Required)`,
    `Are you ${rand.pickFrom(["kind", "brave", "bad", "scared", "epic"])} enough to ${rand.pickFrom(["placate", "murder", "battle", "kill", "fight", "survive"])} ${chosenName}?`,
      "Join us in celebrating our newly opened House of Notes Experience with a brand new coaster!  Award winning Abhorrineer Devona Avamund  takes us on a dark descent into obsession and hot tunes!",
    `Children aged four to one hundred and four will be enchanted as this state of the art waterslide showcases ${rand.pickFrom(["space", "sanity", "death", "dad"])} defying spins!`,
    `If you have a fear of ${rand.pickFrom(["relaxing", "heights", "heights", "falling", "drops", "drowning", "pirates", "spirals", "water", "the ocean", "spiders", "teacups", noun + "s"])}, consider yourself warned.`,
    `Zoom!`];


    const desc = rand.pickFrom(teaserTemplates);
    super(chosenName, rand.pickFrom(waterImages), themes, obsession, nearbyAttractions, desc)
  }
}

class DetailsWater extends DetailsRide {
  rideType = WATER;


  generateDescription = (ele) => {
    const fearLevel = rand.getRandomNumberBetween(1, 3)
    const confusionLevel = rand.getRandomNumberBetween(1, 3)

    this.generateFlavor(ele, fearLevel, confusionLevel)



    const intro = createElementWithClassAndParent("div", ele, "section");

    const topSpeed = `${rand.getRandomNumberBetween(10,100)} ${rand.pickFrom(["inches","meters","miles","yards","kilometers","feet"])} per ${rand.pickFrom(["minute","second","hour","minute","second","hour","hour","hour","minute","second","hour","day"])}`;
    const maxHeight = `${rand.getRandomNumberBetween(1, 100)} ${rand.pickFrom(["inches", "meters", "miles", "yards", "kilometers", "feet"])}`;

    const introParts = [`Have a seat and prepare to soar ${maxHeight} above the ground. Take the plunge at ${topSpeed}!`]

    if (maxHeight.includes("miles") || maxHeight.includes("kilometers")) {
      introParts.push("You can see the entire park from its summit!");
    } else {
      introParts.push("No need to worry about heights with this one!");
    }

    if (topSpeed.includes("hour") || topSpeed.includes("day")) {
      introParts.push("Perfect for children!");
    } else {
      introParts.push(`This machine kills children!`);
    }

    intro.innerText = introParts.join(" ");

    this.generateWarnings(ele, fearLevel, confusionLevel)

    const label = createElementWithClassAndParent("div", ele, "info-box-label");
    label.innerText = "By the Numbers: ";

    const ul = createElementWithClassAndParent("ul", ele);
    ul.style.marginBottom = "50px";

    const facts = {
      "Maximum Height": maxHeight,
      "Top Speed": topSpeed,
      "Fear Level": fearLevel,
      "Confusion Level": confusionLevel
    }

    for (let key of Object.keys(facts)) {
      const doop = createElementWithClassAndParent("li", ul);
      doop.innerHTML = `${key}: ${facts[key]}`;
    }

  }

}