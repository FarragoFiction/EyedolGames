const CAROUSEL = "Carousel"

class TeaserMerry extends TeaserRide {
  rideType = CAROUSEL;

  constructor(rand) {
    const themes = [];
    let number_themes = rand.getRandomNumberBetween(1, 3);
    for (let i = 0; i < number_themes; i++) {
      themes.push(rand.pickFrom(Object.values(all_themes)));
    }
    //no procedural obsessions for now
    const obsession = rand.pickFrom(Object.values(all_obsessions)); //think of it like brand tie ins

    //you can put "the" in front of these
    const excitingWords = ["Demon", "Titan", "One", "Scream", "Revenge", "Scream Machine", "Scorcher","Tornado", "Fury", "Twister", "Ride", "Scream", "Cyclone", "Merry-Go-Round",'Carousel']
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


    const teaserTemplates = [`Before Eyedol Games' Acquisition, the top manufacturing company Idlev was making coasters at break neck speed. It was no surprise they'd be a leader in innovation for new ways of manufacturing death defying experiences.<br><br>${chosenName} was their first attempt. `,
    `Fly like a ${noun}, we provide the wings.`,
    `Scream for ${rand.pickFrom([, "chills and thrills", chosenName, "ice cream", "it", "this living legend", "all who are born die", "there is no justice in life"])}.`,
    `Take a ${rand.pickFrom(["Fabulous Flight", "Awesome Ascension", "Twisting Twirl"])} into ${rand.pickFrom(["Extreme Exhilaration", "Freaky Fun", "Panicky Pleasure"])}! (Additional Fee Required)`,
    `Are you ${rand.pickFrom(["kind", "brave", "bad", "scared", "epic"])} enough to ${rand.pickFrom(["placate", "murder", "battle", "kill", "fight", "survive"])} ${chosenName}?`,
      "Join us in celebrating our newly opened House of Notes Experience with a brand new coaster!  Award winning Abhorrineer Devona Avamund  takes us on a dark descent into obsession and hot tunes!",
    `Children aged four to one hundred and four will be enchanted as this state of the art merry-go-round showcases ${rand.pickFrom(["space", "sanity", "death", "dad"])} defying spins!`,
    `If you have a fear of ${rand.pickFrom(["relaxing", "heights", "heights", "falling", "drops", "gravity", "loops", "spirals", "playgrounds", "children", "spiders", "teacups", noun + "s"])}, consider yourself warned.`,
    `${chosenName} is our first attempt at a new process we call 'harvesting'. Essentially, when old coasters are set to retire, whatever is still operational is salvaged and refitted in order to save massively on costs of manufacturing. Our designers take these stray pieces and fit them into new coasters.`];


    const desc = rand.pickFrom(teaserTemplates);
    super(chosenName, rand.pickFrom(merryImages), themes, obsession, nearbyAttractions, desc)
  }
}

class DetailsMerry extends DetailsRide {
  rideType = CAROUSEL;


  generateDescription = (ele) => {
    const fearLevel = rand.getRandomNumberBetween(1, 3)
    const confusionLevel = rand.getRandomNumberBetween(1, 3)

    this.generateFlavor(ele, fearLevel, confusionLevel)



    const intro = createElementWithClassAndParent("div", ele, "section");

    const topSpeed = `${rand.getRandomNumberBetween(10, 100)} ${rand.pickFrom(["rotations", "revolutions", "turns", "loops"])} per ${rand.pickFrom(["minute", "hour", "minute", "hour", "hour", "hour", "minute", "second", "hour"])}`;

    const introParts = [`Have a seat and prepare to learn the true meaning of ${rand.pickFrom(["rotations","looping","revolutions"])}. Don't be fooled by the  initial peace, soon you'll be  wirling at ${topSpeed}!`]


    if (topSpeed.includes("hour") || topSpeed.includes("day")) {
      introParts.push("Perfect for children!");
    } else {
      introParts.push(`Local Archivists agree: it's surprisingly thrilling!`); //https://snarp.github.io/magnus_archives_transcripts/episode/165.html
    }

    intro.innerText = introParts.join(" ");

    this.generateWarnings(ele, fearLevel, confusionLevel)

    const label = createElementWithClassAndParent("div", ele, "info-box-label");
    label.innerText = "By the Numbers: ";

    const ul = createElementWithClassAndParent("ul", ele);
    ul.style.marginBottom = "50px";

    const facts = {
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