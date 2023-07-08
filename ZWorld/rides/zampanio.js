const ZAMPANIORIDE = "Zampanio"

class TeaserZampanio extends TeaserRide {
  rideType = ZAMPANIORIDE;

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



    const nameTemplates = [
      `Zampanio`,
      `The ${rand.pickFrom(sizeWords)} Zampanio`,
      `${rand.pickFrom(excitingWords)} Zampanio`,
      `Zampanio: The ${rand.pickFrom(excitingWords)} `,
      `Zampanio ${rand.pickFrom(excitingWords)}`,
    ];
    const foodThemes = [all_themes[TWISTING], all_themes[SPACE], all_themes[KNOWING]]
    const restaurantName = "Zampanio Kitchen"
    const restaurantUrl = `http://eyedolgames.com/Zampanini/?name=${encodeURI(restaurantName).replace(/'/g, "%27")}&themes=${encodeURI(foodThemes.map((t) => t.key))}&feeUnder=${rand.getRandomNumberBetween(1, 113)}`;
    const nearbyAttractions = `${rand.getRandomNumberBetween(2, 13)} ${rand.pickFrom(["Eternities"])} from: <a target='_blank' href='${restaurantUrl}'>${restaurantName}</a>`;

    const chosenName = titleCase(rand.pickFrom(nameTemplates));


    const teaserTemplates = ["Obsession is a dangerous thing. Take a break. Drink some water. Leave. Don't let the obsession root into you."]; //not that warning yall ever does anything
    const desc = rand.pickFrom(teaserTemplates);
    super(chosenName, rand.pickFrom(coasterImages), themes, obsession, nearbyAttractions, desc)
  }
}

class DetailsZampanio extends DetailsRide {
  rideType = ZAMPANIORIDE;


  generateDescription = (ele) => {
    const fearLevel = 13;
    const confusionLevel = 13;

    this.generateFlavor(ele, fearLevel, confusionLevel)



    const intro = createElementWithClassAndParent("div", ele, "section");




    intro.innerText = "A part of you will remain here for eternity. You shed past selves the way you shed dead skin flakes. A trail left behind of selves that are no longer quite you. The longer you are here the more of Zampanio will leak into the hole that remains. You should leave."
    intro.title = "Or. Consider: Stay. Stay just a while. What could it hurt. Dig just a little deeper. Scratch just a bit more beneath the surface. There are unlimited psychological benefits to having soething to drive you.  It feels good, does it not? Stay with me."





    this.generateWarnings(ele, fearLevel, confusionLevel)

    const label = createElementWithClassAndParent("div", ele, "info-box-label");
    label.innerText = "By the Numbers: ";

    const ul = createElementWithClassAndParent("ul", ele);
    ul.style.marginBottom = "50px";



    let time = 0;
    const doop = createElementWithClassAndParent("li", ul);
    
    const doop2 = createElementWithClassAndParent("li", ul);
    doop2.innerHTML = `Time Remaining: ???`;
    doop2.id='time-remaining';

    const updateTime = (time) => {
      doop.innerHTML = `Seconds Here: ${time}`;
    }
    updateTime(time);

    setInterval(() => {
      time++;
      updateTime(time)
    },1000)



  }

}