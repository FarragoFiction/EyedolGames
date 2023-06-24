const COASTER = "Coaster"

class TeaserCoaster extends TeaserRide {
  rideType = COASTER;

  constructor(rand) {
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
      `${chosenAdj} ${rand.pickFrom(excitingWords)}`,
      `The ${chosenAdj} ${rand.pickFrom(excitingWords)}`,
    ];
    const foodThemes = [...themes, all_themes[rand.pickFrom(food_keys)]]
    const restaurantName = getRestaurantName(rand, foodThemes.map((t) => t.key), true)
    const restaurantUrl = `http://eyedolgames.com/Zampanini/?name=${encodeURI(restaurantName).replace(/'/g, "%27")}&themes=${encodeURI(foodThemes.map((t) => t.key))}&feeUnder=${rand.getRandomNumberBetween(1, 113)}`;
    const nearbyAttractions = `${rand.getRandomNumberBetween(2, 13)} ${rand.pickFrom(["Miles", "Blocks", "Feet", "Meters", "Kilometers", "Jumps", "Turns"])} from: <a target='_blank' href='${restaurantUrl}'>${restaurantName}</a>`;

    const chosenName = titleCase(rand.pickFrom(nameTemplates));


    const teaserTemplates = [`Before Eyedol Games' Acquisition, the top manufacturing company Idlev was making coasters at break neck speed. It was no surprise they'd be a leader in innovation for new ways of manufacturing death defying experiences.<br><br>${chosenName} was their first attempt. `,
    `Abhorrineer Devona Avamund had this to say about her newest masterpiece: '${rand.pickFrom(devonaQuotes)}'`,
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
    super(chosenName, rand.pickFrom(coasterImages), themes, obsession, nearbyAttractions, desc)
  }
}

class DetailsCoaster extends DetailsRide{
  rideType = COASTER;


  generateDescription = (ele)=>{    
    const fearLevel = rand.getRandomNumberBetween(1,3)
    const confusionLevel = rand.getRandomNumberBetween(1,3)

    this.generateFlavor(ele, fearLevel, confusionLevel)



    const intro = createElementWithClassAndParent("div", ele,"section");

    const topSpeed = `${rand.getRandomNumberBetween(10,100)} ${rand.pickFrom(["inches","meters","miles","yards","kilometers","feet"])} per ${rand.pickFrom(["minute","second","hour","minute","second","hour","hour","hour","minute","second","hour","week"])}`;
    const maxHeight = `${rand.getRandomNumberBetween(1,100)} ${rand.pickFrom(["inches","meters","miles","yards","kilometers","feet"])}`;

    const trackLength = `${rand.getRandomNumberBetween(1,100)} ${rand.pickFrom(["inches","meters","miles","yards","kilometers","feet"])}`;
    const numberLoops = rand.getRandomNumberBetween(1,216);
    let numberGs = rand.getRandomNumberBetween(1,12);
    if(numberGs === 1 & rand.nextDouble() <0.5){
      numberGs = rand.nextDouble().toFixed(2);
    }

    const introParts = [`${rand.pickFrom(["Standing","Clocking in","Towering"])} at ${maxHeight} tall and with a maximum speed of ${topSpeed}, ${this.name} is THE thrill ride.`]

    if(maxHeight.includes("miles") || maxHeight.includes("kilometers")){
      introParts.push("You can see the entire park from its summit!");
    }else{
      introParts.push("No need to worry about heights with this one!");
    }

    if(topSpeed.includes("week") || topSpeed.includes("day") ){
      introParts.push("Perfect for children!");
    }else{
      introParts.push(`${rand.pickFrom(["Thrill","Marvel","Wonder","Tremble"])} at the speed!`);
    }

    intro.innerText = introParts.join(" ");

    const intro2 = createElementWithClassAndParent("div", ele,"section");
    const introParts2 = [`Guests experience the raw force of ${numberGs}Gs over ${trackLength} of track!`]
    
    if(numberGs<6){
      introParts2.push("Perfect for children!");
    }else{
      introParts2.push("Acceleration like never before!");
    }

    if(trackLength.includes("miles") || trackLength.includes("kilometers")){
      introParts2.push(`You'll have plenty of time to ${rand.pickFrom(["marvel at","gaze at","memorize"])} the countryside!`);
    }else{
      introParts2.push("It'll be over before you know it!");
    }

    intro2.innerText = introParts2.join(" ");



   this.generateWarnings(ele, fearLevel, confusionLevel)

    const label = createElementWithClassAndParent("div", ele, "info-box-label");
    label.innerText = "By the Numbers: ";

    const ul = createElementWithClassAndParent("ul", ele);
    ul.style.marginBottom="50px";

    const facts = {
      "Maximum Height": maxHeight,
      "Top Speed": topSpeed,
      "Track Length": trackLength,
      "Number of Loops": numberLoops,
      "Number G's": numberGs,
      "Fear Level": fearLevel,
      "Confusion Level": confusionLevel
    }

    for(let key of Object.keys(facts)){
      const doop = createElementWithClassAndParent("li", ul);
      doop.innerHTML = `${key}: ${facts[key]}`;
    }

  }
  
}