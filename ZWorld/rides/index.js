let coasterImages = [];
let trainImages = [];
let performerImages = [];
let chairImages = [];
let merryImages = [];
let wheelImages = [];
let zipLineImages = [];
let waterImages = [];
let totalGeneratedRides = 0;
let depth = 0;

/*
extremely important that NONE of these are tied to the theme. devona is just panic talking about random things she's afraid of that are unrelated to the ride because she can't remember MAKING the ride because she's made too many rides (classic bard of light problems)

not that i would know that

i am NOT a bard of light, i just believe in their beliefs

ngl eventually i just had her start describing the Artificats from OG Zampanio but badly and with misunderstandings

she describes them mostly as dreams or imaginations but she knows they're real, even if some of them she physically can't communicate about
*/
let devonaQuotes = [
  "What if your eyes were like, injected with cement. The kind, uh, that sets quickly? But heats up really really fast? What would you see? What would you feel? How long would it take before you went blind? That's uh. That's what this ride is about.",
  "I don't... Okay um. This ride, uh, this ride is about INFORMATION? Like what if you could write something down somewhere and uh. Forget about. Just uh. Like a message in a bottle. And when you wrote it down just. Everyone knew? Everyone forever?  Like you could invent whole things to be common knowledge?  But if you destroyed the knowledge. Uh, like maybe filling the bottle with sea water and disolving the paper and ink, uh, then everyone would forget it too? Oh! How would you even know if you forgot a whole concept? What if there's whole colors we SHOULD be able to see but can't because its' gone?",
  "I don't. Uh. This one. Uh. Well. Um. What if there were. Uh. Have I already talked about those theater masks? What if there was one of them and uh. What if.   What if there was a copy of you and the copy was just like you but maybe they were better than you and everyone thought so and if someone wore the mask they could get that better you to do anything they wanted and they used it to replace you except no one was sad because now they get a BETTER version of you and you're not even mourned because nothing of worth was lost?",
  "What if there were this mirror, right? I mean, I guess that's kind of stupid, wait, my therapist says I should stop calling myself stupid, I guess its kind of uh. um. UNEXPECTED that the mirror is scary?  But they ARE!  If you're in a dark room and then you suddenly seem someone but you thought you were alone that is SCARY even if turns out to be a mirror and you feel relieved but THEN you start worrying that maybe its not a NORMAL mirror that maybe its DANGEROUS and not a normal kind of danger where it'll send you to another universe because if it were THAT it already would have happened so instead its a more SUBTLE danger like maybe if you get reflected by it suddenly you can never been seen again or even WORSE suddenly everyone is looking at you?",
  "This ride is uh, probably about this weird coin I dreamed about?  It had like, one of those theater masks on one side, the kind where they can be happy or sad and that's supposed to warn you about whats in the play except these days everyone just shows BOTH Of them to just mean 'theater' instead of telling anyone whats inside and then its entirely useless just because they showed you too much but on the OTHER side of this coin was the number 7 and uh, the coin would make it so you were supposed to be wherever you were and no one would yell at you or tell you you had to leave and sometimes I wish I had that coin but also uh. Oh. Um. Nevermind.",
  "I don't uh. I don't like this one. Uh. I had a nightmare about, uh, well, about nothing? Kind of? About this uh, what do you call those things that like, old timey sea captains would use to navigate the ocean? All brass and with knobs? One of those. And if you messed with the knobs you just. You could make anything you wanted unperceptible?  And I thought oh that would be actually kind of nice, I would love to not be perceived but uh, then I thought about what if something SCARY had it and oh no no no I do not want to worry about unperceptible monsters running around. how would you even contain them? And we'd HAVE to contain them, uh, Camille, she's uh, my boss, she'd say we had to.",
  "Oh, yeah, uh, this one is, uh, very familiar to me. Very personal?  I definitely remember making it! Uh. This one is about uh, have you ever thought about how WEIRD books are? They're filled with all these words and you don't get to know what they are until they're already in your head and what if they aren't words you WANTED in your head? What if they're BAD words? And uh. So I thought about a book where it could put anything it wanted into your head, but if you, uh, if you destroyed it then maybe no one could think about YOU instead? You try to stop the book but instead it stops you. ",
  "Oh Um! No! I don't, Uh, I don't actually do that. Haha! Not seeing anyone! Don't want to! Uh. Yeah. Um.  Please. Uh. Please don't be angry?",
  "Well, um, this one, uh, this one is probably about my brother Neville, uh, and how much he means to me, and really all my friends, are so important, and if I didn't have them I think I'd just die, so I thought about what if there was, what if you could put on some clothing and suddenly no one recognized you and they didn't care about you anymore and nothing you did could make them remember you were friends or that you had all this history together anymore and how alone you would feel and what if stoped you from making NEW friends. And THEN I started worrying about the opposite, if you could put on one of those fancy outfits like the models or the mannequins wear and instantly be anyone's closest friend and how would you even know if YOUR closest friend was someone like that?",
  "Oh um..   I think this ride was about... One time I heard that if a blade is SHARP enough, it could cut you and you wouldn't even feel it, you'd just look down and you'd be bleeding and that was so so scary but all I could think about is what would happen if there was a blade that did it no matter HOW sharp it was, no matter how much it ripped and tore into you. If you could never ever know you got cut you could just bleed to death or get a fatal infection from ANYTHING. I didn't sleep that night because how would you even TELL if you'd already been cut?",
  "Um. I think this ride was about that time I saw an AUTOGRAPH BOOK And I realized that if you wrote your name in it it would be in there FOREVER and anyone who went to write their name in it would SEE IT unless I guess it was the next page and then I thought who wanted to be seen FOREVER like that and wouldn't it be much better if instead once you wrote in it you could never been seen again? But then I realized it wouldn't be YOU you it would just be your name and what would even be the point of just hiding your name?",
  "Oh! Huh! That ride? Yeah, I totally remember that Ride! That one I remember dreaming about when I was playing this game and in the game there were these CURTAINS not like for a house, where they could be blue and maybe that would MEAN something, but for a STAGE except I was on the OTHERSIDE of the stage and there were these lights underneath them and all I could think it any second they would RAISE up and there would be PEOPLE on the other side and they would be EXPECTING something from me but i had NO IDEA what they were expecting and they would cough and shuffle around a bit except none of these things were actually happening I was just looking at these closed curtains and IMAGINING it.",
  "Oh? That ride? Haha! Yeah! THAT ride! I made it because uh. Because I ate a tortilla chip once and the sharp part jabbed into the roof of my mouth and uh I was scared that maybe it hit my brain and it DIDN'T but then all I could think about that night was what if there were KNIVES in my chips?",
  "Um... Well... You see my friend Ria, uh, I guess you don't need to know her last name, not that I'm HIDING it but its not important, and neville says I don't have to say anything if its not important, anyways she said that she was really into this new book she found but for some reason there wasn't a musical inside it even though it SAID it was and I got so so scared thinking about what it might be and then WANDA, uh, that's the CEBro of Eyedol Games texted me asking when my next assignment would be ready and i kind of PANICKED and uh, so I made this.",
];

let devonaQuirk = new Quirk(new SeededRandom(13), DEVONACAPS, PERFECTPUNC, [], 2);

devonaQuotes = devonaQuotes.map((i) => devonaQuirk.apply(i));

const initRides = async () => {
  let loc = 'http://eyedolgames.com/ZWorld/images/attractions/Coasters/'
  let tmp = await getImages(loc);
  coasterImages = tmp.map((item) => loc + item);

  loc = 'http://eyedolgames.com/ZWorld/images/attractions/Trains/'
  tmp = await getImages(loc);
  trainImages = tmp.map((item) => loc + item);

  loc = 'http://eyedolgames.com/ZWorld/images/attractions/Chairs/'
  tmp = await getImages(loc);
  chairImages = tmp.map((item) => loc + item);

  loc = 'http://eyedolgames.com/ZWorld/images/attractions/Ferris/'
  tmp = await getImages(loc);
  wheelImages = tmp.map((item) => loc + item);

  loc = 'http://eyedolgames.com/ZWorld/images/attractions/Ziplines/'
  tmp = await getImages(loc);
  zipLineImages = tmp.map((item) => loc + item);

  loc = 'http://eyedolgames.com/ZWorld/images/attractions/Water_park/'
  tmp = await getImages(loc);
  waterImages = tmp.map((item) => loc + item);


  loc = 'http://eyedolgames.com/ZWorld/images/attractions/Carousels/'
  tmp = await getImages(loc);
  merryImages = tmp.map((item) => loc + item);
  //fun fact, these were generated by an ai (like all these images) but with a TWIST
  //the seed i fed to the ai was pictures of my own grandfather, who was a circus performer in like, the 1920s. 
  //grandma was a clown, but i couldn't find any pictures of her
  //its really weird... connecting to this part of my heritage (cultural, not blood, since i'm adopted)
  //because i had to root around in my mom's facebook
  //since she and i have had a falling out i couldn't ask her directly
  //but its nice? nice to connect to this even if it would be damaging to me to connect to her?
  loc = 'http://eyedolgames.com/ZWorld/images/attractions/Performers/'
  tmp = await getImages(loc);
  performerImages = tmp.map((item) => loc + item);
}


const createDetailsRideFromParams = (rideType, name, image, themes, obsession) => {
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

  console.log("JR NOTE: obsesssion is", obsession, all_obsessions[COFFEESHOPAU].name)
  if (obsession.name === all_obsessions[COFFEESHOPAU].name) {
    console.log("JR NOTE: :) :) :)")
    return new DetailsLore(name, image, themes, obsession, desc, quips);
  }
  if (rideType === TRAIN) {
    return new DetailsTrain(name, image, themes, obsession, desc, quips);
  } else if (rideType === COASTER) {
    return new DetailsCoaster(name, image, themes, obsession, desc, quips);
  } else if (rideType === LIVESHOW) {
    return new DetailsLiveshow(name, image, themes, obsession, desc, quips)
  } else if (rideType === CHAIR) {
    return new DetailsSwing(name, image, themes, obsession, desc, quips)
  } else if (rideType === CAROUSEL) {
    return new DetailsMerry(name, image, themes, obsession, desc, quips)
  } else if (rideType === WHEEL) {
    return new DetailsWheel(name, image, themes, obsession, desc, quips)
  } else if (rideType === ZIPLINE) {
    return new DetailsZip(name, image, themes, obsession, desc, quips)
  } else if (rideType === WATER) {
    return new DetailsWater(name, image, themes, obsession, desc, quips)
  } else {
    return new DetailsZampanio(name, image, themes, obsession, desc, quips)

  }


}

/*
if i were doing this knowing what i've realized about my data instead of object oriented i'd make it modular

where a ride can have various TRAITS such as "high" or "fast"
that decide how it describes itself, but here we are
*/

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
    totalGeneratedRides++;
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
    imgEle.onmouseenter = async () => {
      await textVoiceSim.speak("What an exciting picture!".split(" "), null, true)
      await sleep(1000);
      await textVoiceSim.speak("Can you really not tell it's AI?".split(","), null, false);
    }
    const content = createElementWithClassAndParent("div", this.element, "details-content");
    const left = createElementWithClassAndParent("div", content, "details-left");
    const right = createElementWithClassAndParent("div", content, "details-right");

    left.onmouseenter = async () => {
      await textVoiceSim.speak("Boy, how exciting!".split(" "), null, true)
      await sleep(1000);
      await textVoiceSim.speak("What a load of hot garbage. None of that even makes sense.".split(","), null, false);
    }

    this.generateDescription(left);

    this.generatePostShow(left);

    this.generateGuestPolicies(left);

    this.generateGuidelines(right);
    this.generateInfoBox(right);
    this.generateQuickTips(right);

    return this.element;
  }

  //https://www.tumblr.com/dashboard?max_post_id=788156835193602048 guess what i saw today
  //or rather a few days ago
  //now its july 4th 2025 and i want to upgrade zworld to have a little neat extra feature
  //thats what i like about zampanio
  //the end is never the end
  //i can take anything ive made for the fandom
  //and just
  //quietly update it
  //and no one finds that weird
  /*
    * generate 13 procedural rules


  then at the bottom, have two choices you can make, also procedural
  like
  "Rules If You Have Ridden ${RIDENAME} Before" vs "Rules If This Is Your First Time"
  */
  //remember kids, there is no meaning, there is no center
  //stop digging
  //by which i mean
  //i think its amusing to make truly meaningless versions of these spooky rule stories
  generateGuidelines = (ele) => {
    const truthBox = document.querySelector("#truth-box")
    truthBox.style.left = "35px"; //turth is blocking my guidelines, sorry truth
    const infoBox = createElementWithClassAndParent("div", ele, "info-box");
    const tip = createElementWithClassAndParent("div", infoBox, "quick-tips");
    tip.innerText = "Guest Guidelines*";
    //its rand, not this.rand
    const ordered_list = createElementWithClassAndParent("ol", infoBox);
    const instructions = createElementWithClassAndParent("div", infoBox, "rule-instructions");
    instructions.innerHTML = `* Further rules may apply. If either category applies to you, click for additional rules.`;

    const buttonContainer = createElementWithClassAndParent("div", infoBox, "button-box");
    //lets keep track of the categories they are picking
    const guestCategories = [];
    const generateRules = () => {
      depth++;

      //JR NOTE: Todo generate proecural rules, pass in my themes and ride name
      ordered_list.innerHTML = "";
      tip.scrollIntoView()
      const amount = rand.getRandomNumberBetween(3, 13);
      for (let i = 0; i < amount; i++) {
        const ele = createElementWithClassAndParent("li", ordered_list, "info-box-content");
        ele.innerText = generateSingleRule(guestCategories, depth, rand, this.name, this.themes);
        if (ele.innerText.includes("Red Color") || ele.innerText.includes("Rule Color") || ele.innerText.includes("Green") || (ele.innerText.includes("Truth")) || rand.nextDouble() > 0.95) {
          ele.style.color = "red"; //any rule telling you  a rule is the truth is a lie
          //but there are no green rules because there are no truths
        } else if (rand.nextDouble() > 0.95) {
          ele.style.fontWeight = "bolder"; //just random emphasis cuz it amuses me
        } else if (rand.nextDouble() > 0.95) {
          ele.style.fontStyle = "italic"; //just random emphasis cuz it amuses me
        } else if (rand.nextDouble() > 0.95) {
          ele.style.textDecoration = "line-through"; //just random emphasis cuz it amuses me
        }
      }
      generateOptions();
    }

    const generateOptions = () => {
      console.log(`Truth: %cSomehow I doubt all this applies to you: ${guestCategories.join(",")}`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");

      buttonContainer.innerHTML = "";
      //JR NOTE: Todo generate proecural pairs of options, pass in my themes and ride name
      const leftButton = createElementWithClassAndParent("button", buttonContainer);
      const rightButton = createElementWithClassAndParent("button", buttonContainer);

      const r = rand.getRandomNumberBetween(0, 255);
      const g = rand.getRandomNumberBetween(0, 255);
      const b = rand.getRandomNumberBetween(0, 255);

      //inverse
      const r2 = 255 - r;
      const g2 = 255 - g;
      const b2 = 255 - b;

      const ruleNames = generateRuleOptions(depth, rand, this.name, this.themes);

      leftButton.innerText = ruleNames[0];
      leftButton.style.background = `rgb(${r},${g},${b})`;
      leftButton.style.color = `rgb(${r2},${g2},${b2})`;
      //it almost doens't matter what you click :)
      leftButton.onclick = () => {
        if (guestCategories.includes(rightButton.innerText)) {
          alert(`That does not make sense. You already said you were ${rightButton.innerText}. ...You would not lie to me, now would you? Pick. That.`)
          return;
        }
        guestCategories.push(leftButton.innerText);
        rand.getRandomNumberBetween(0, 1); //not used, but this increases the seed so it is slightly differnet if you click left vs right
        generateRules();
      }

      rightButton.innerText = ruleNames[1];
      rightButton.style.background = `rgb(${r2},${g2},${b2})`;
      rightButton.style.color = `rgb(${r},${g},${b})`;
      //it almost doens't matter what you click :)
      rightButton.onclick = () => {
        if (guestCategories.includes(leftButton.innerText)) {
          alert(`That does not make sense. You already said you were ${leftButton.innerText}. ...You would not lie to me, now would you? Pick. That.`)
          return;
        }
        guestCategories.push(rightButton.innerText);
        generateRules();
      }
    }


    generateRules();















  }

  //not terriblyprocedural, useful for all rides
  generateQuickTips = (ele) => {
    const infoBox = createElementWithClassAndParent("div", ele, "info-box");

    const tip = createElementWithClassAndParent("div", infoBox, "quick-tips");
    tip.innerText = "Quick Tips";

    if (this.rideType === ZAMPANIORIDE) {
      const ele = createElementWithClassAndParent("div", infoBox, "info-box-content");
      ele.innerText = "It's not yet too late to leave.";
      return;
    }

    const tips = [`Please allocate ${rand.getRandomNumberBetween(2, 217)} hours to navigate the queue for this ride.`,
      "Water will be provided periodically in queue. No outside food or drink is permitted.", "Guests are encouraged to remain in queue.",
      "Please let Guest Services know if any mobility aids are required."]
    for (let tip of tips) {
      const ele = createElementWithClassAndParent("div", infoBox, "info-box-content");
      ele.innerText = tip;
      if (tip.includes('mobility aids')) {
        ele.onmouseenter = async () => {
          await textVoiceSim.speak(`Eyedol Games prides itself on its accessibility!`.split(" "), null, true)
        }
      } else if (tip.includes("Please allocate")) {
        ele.onmouseenter = async () => {
          await textVoiceSim.speak(`In-Queue entertainment will be provided, free of charge!`.split(" "), null, true)
          await sleep(1000);
          await textVoiceSim.speak("Assuming you find my horridors entertaining.".split(","), null, false);
        }
      } else if (tip.includes("Water will be provided")) {
        ele.onmouseenter = async () => {
          await textVoiceSim.speak(`Humans will die in just three days without water!`.split(" "), null, true)
          await sleep(1000);
          await textVoiceSim.speak(`You can go much, much longer without food!`.split(" "), null, true)

        }
      } else if (tip.includes("Guests are encouraged")) {
        ele.onmouseenter = async () => {
          await textVoiceSim.speak(`Eyedol Games accepts no liability from injuries incurred attempting to leave the queue.`.split(" "), null, true)
          await sleep(1000);
          await textVoiceSim.speak("Philistines. You will navigate my maze and you will like it.".split(","), null, false);
        }
      }
    }

  }

  generateDescription = (ele) => {
    const container = createElementWithClassAndParent("div", ele, "section");
    container.innerText = "TODO";

  }

  generateWarnings = (ele, fearLevel, confusionLevel) => {
    const container1 = createElementWithClassAndParent("div", ele, "section");

    if (fearLevel <= 1) {
      container1.innerText = "This experience is suitable for young children or guests with difficulty with terrifying content.";
    } else if (fearLevel <= 2) {
      container1.innerText = `Experience ${rand.pickFrom(["scares", "thrills", "chills", "horror", "nightmares"])} like never before!`;

    } else if (fearLevel <= 3) {
      container1.innerText = `This ride has been designed personally by our lead Abhorrineer, Devona Avamund who had this to say: '${rand.pickFrom(devonaQuotes)}'! EyedolGames and ZWorld can not be held responsible for long term negative effects.`;
    } else if (fearLevel > 3) {
      container1.innerText = "You should not experience this ride.";
    }

    const container2 = createElementWithClassAndParent("div", ele, "section");

    if (confusionLevel <= 1) {
      container2.innerText = "This experience is suitable for all ages.";
    } else if (confusionLevel <= 2) {
      container2.innerText = "We are legally obliged to state the following: The Surgeon General Warns That Without Breaks This Experience May Harm Children, Adolescents And Those With Addictive Personalities. "; //you'll get obsessed

    } else if (confusionLevel <= 3) {
      container2.innerText = "We're so glad you've decided to join our Family :)"; //you work here now

    } else if (confusionLevel > 3) {
      container2.innerText = ":) :) :)";
    }
  }

  generateFlavor = (ele, fearLevel, confusionLevel) => {
    if (fearLevel > 3 && confusionLevel > 3) { }
    const themes = this.themes;
    const flavor = createElementWithClassAndParent("div", ele, "section");
    if (fearLevel > 3 && confusionLevel > 3) {
      flavor.innerText = "Obsession is a dangerous thing. Leave."
      return;
    }
    const chosenLocDesc = rand.pickFrom(themes).pickPossibilityFor(LOC_DESC, rand)

    const chosenSmell = rand.pickFrom(themes).pickPossibilityFor(SMELL, rand)
    const chosenFlavor = rand.pickFrom(themes).pickPossibilityFor(TASTE, rand)
    const chosenSound = rand.pickFrom(themes).pickPossibilityFor(SOUND, rand)
    const chosenTexture = rand.pickFrom(themes).pickPossibilityFor(FEELING, rand)
    const monsterDesc = rand.pickFrom(themes).pickPossibilityFor(MONSTER_DESC, rand)
    const chosenPhilo = rand.pickFrom(themes).pickPossibilityFor(PHILOSOPHY, rand)


    const flavorTemplates = [`There are ${chosenLocDesc} at the entrance.`, `You will realize all too soon that the walls are made of ${chosenTexture}.`, `The sound of ${chosenSound} greets guests as they enter the queue. It will not end.`, `The smell of ${chosenSmell} is thick in the air. It coats the back of your throat, reminding you almost of ${chosenFlavor}. Are you prepared to face ${this.name}?`];
    if (fearLevel > 2) {
      flavorTemplates.push[`There is something watching you from within the ride. ${monsterDesc}`];
    }

    if (confusionLevel > 2) {
      flavorTemplates.push[`Ringing in your ears is the constant litanty of '${chosenPhilo}'`];

    }

    flavor.innerText = rand.shuffle(flavorTemplates).slice(0, 3).join(" ");
  }

  generatePostShow = (ele) => {
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

    const container = createElementWithClassAndParent("div", ele, "section");

    //JR NOTE: TODO add possibilities for different ride types

    const startStartPossibilities = [`After exiting the ride`, `Upon completion of the experience`, `When you escape`]

    const startPossibilities = [`you will finally understand what it feels like to be ${this.obsession.randomBlorbo(rand)}!`, `you will be given a complementary ${noun}.`, `you will be sent through a decontamination process.`, `you will be given a nice cake.`, `you will be baked and then there will be cake.`]
    const midPossibilities1 = [`The exit maze`, `The exit queue`, `Your exit path`]
    const midPossibilities2 = [`will take aproximately ${rand.getRandomNumberBetween(1, 13)} ${rand.pickFrom(["hours", "minutes"])}.`, `will reveal how ${chosenCompliment} you truly are.`, `will be extremely ${adj}.`]


    const endPossibilities = [`It's okay to be scared.`, `A ${chosenPerson} will guide you safely out. Trust them.`, `Once you reach the ${chosenLocation} you will be free.`]

    if (this.rideType === ZAMPANIORIDE) {
      container.innerText = "We both know this is not a real ride."
      return;
    }

    container.innerText = `${rand.pickFrom(startStartPossibilities)}, ${rand.pickFrom(startPossibilities)} ${rand.pickFrom(midPossibilities1)} ${rand.pickFrom(midPossibilities2)} ${rand.pickFrom(endPossibilities)}`;


  }

  generateGuestPolicies = (ele) => {
    const label = createElementWithClassAndParent("div", ele, "info-box-label");
    label.innerText = "Guest Policies";

    const lossPassExplanations = ["It doesn't matter where you get Lost, so long as you do&#x2122;!", "Can you get to the end of the maze before your friends?", "CrypticCurrency thrives on YOUR obsessions!", "Virtual maze progress can be traded for physical maze progres, reducing your wait times!", "Do the things YOU enjoy and in exchange you will earn TOKENS to make progress through our LossPass system to get the content you crave in a fair and timely fashion!", "Earn TOKENS through Engagement with main branch Zampanio properties!"];
    const safetyExplanationsMaze = ["mortality is disabled within the Maze Queuing System.", "no one can die within the Maze Queuing System ", "the Maze Queuing System will maintain absolutely your state upon entry until such a time as you leave", "the Eight Divines cannot protect you within the Maze Queuing System", "we here at EyedolGames have harvested the latent energy of a Forgotten God to provide you with Neverending Life so long as you walk the halls of the Maze Queuing System!", "Nidhogg's Unending Life is kept confined to all Mazes, including our Maze Queuing System! Enjoy complementary immortality while in our halls!"]

    const items = [`Eligible for ZWorld LossPass System where queue times may be reduced via Proof Of Engagement.  ${rand.pickFrom(lossPassExplanations)}`,
    `For your safety, ${rand.pickFrom(safetyExplanationsMaze)} ZWorld prides itself on industry leading accessibility. `, `Rides and other attractions may provide a risk of death, mutilation or other damage. ZWorld takes no liability for injuries occurred outside of the Maze Queuing&#x2122; system.`]

    const container = createElementWithClassAndParent("ul", ele);

    if (this.rideType === ZAMPANIORIDE) {
      const doop = createElementWithClassAndParent("li", container);
      doop.innerHTML = "Management asks that all guests leave.";
      return;
    }

    for (let item of items) {
      const doop = createElementWithClassAndParent("li", container);
      doop.innerHTML = item;

      if (item.includes("LossPass")) {
        doop.onmouseenter = async () => {
          await textVoiceSim.speak(`LossPass, for when you just can't wait!`.split(" "), null, true)
          await sleep(3000);
          await textVoiceSim.speak("Do not DREAM of skipping my maze.".split(","), null, false);
        }
      } else if (item.includes("For your safety")) {
        doop.onmouseenter = async () => {
          await textVoiceSim.speak(`Just try to find such service at our rival park, River Expanse!`.split(" "), null, true)
        }
      } else if (item.includes("Rides and other attractions")) {
        doop.onmouseenter = async () => {
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

    if (this.rideType === ZAMPANIORIDE) {
      const locationRiddleLabel = createElementWithClassAndParent("div", infoBox, "info-box-label");
      locationRiddleLabel.innerText = "Location Riddle:"
      const locationRiddle = createElementWithClassAndParent("div", infoBox, "info-box-content");
      locationRiddle.innerText = "Why are you still here?";
      return;
    }


    const locationRiddleLabel = createElementWithClassAndParent("div", infoBox, "info-box-label");
    locationRiddleLabel.innerText = "Location Riddle:"
    const locationRiddle = createElementWithClassAndParent("div", infoBox, "info-box-content");

    locationRiddle.onmouseenter = async () => {
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

    const chosenNoun = rand.pickFrom([chosenPerson, chosenObject, chosenLocation])

    const noun = rand.pickFrom([chosenPerson, chosenLocation, chosenObject]);
    let shittyRiddleTemplates = [
      "When is a door not a door?",
      "Are you sure you've been there before?",
      "Are you sure this is the same place you were before?",
      "You must sacrifice it all if you wish to pursue further knowledge.",
      "Smile :)",
      "You are already there.",
      "Let go.",
      "A miserable pile of secrets.",
      "Check your Zampanio Brand Console Viewer!",
      "Don't be afraid to fall!",
      `The ${chosenNoun} isn't what it seems. `,
      `Go just past the ${adj} ${chosenLocation}.  When you see the ${chosenInsult} ${chosenObject} you'll know you're close.`,
      `First, you need to be carrying a ${chosenObject}. A suspicious ${chosenPerson} will approach you. Do what they say. `,
      `Believe in the heart of the cards.`];
    locationRiddle.innerText = rand.pickFrom(shittyRiddleTemplates);
    locationRiddle.dataset.jrNote = "Wastes. It's okay. Calm down. These are riddles for park goers. Are you a park goer? No. These don't mean anything. It's okay. You can stop trying to solve them.";

    const heightLabel = createElementWithClassAndParent("div", infoBox, "info-box-label");
    heightLabel.innerText = "Height Requirement:"

    const height = createElementWithClassAndParent("div", infoBox, "info-box-content");
    height.innerText = `${rand.getRandomNumberBetween(3, 113)} ${rand.pickFrom(["feet", "centimeters", "meters", "inches", "millimeters"])} or ${rand.pickFrom(["taller", "bigger", "smaller", "shorter"])}`;

    height.onmouseenter = async () => {
      await textVoiceSim.speak("Should you wish to meet height requirements, Guest Services can assist you!".split(" "), null, true)
      await sleep(1000);
      await textVoiceSim.speak("Who would be stupid enough to agree to let us change their height?".split(","), null, false);
    }


    const categoryLabel = createElementWithClassAndParent("div", infoBox, "info-box-label");
    categoryLabel.innerText = "Category:"
    const category = createElementWithClassAndParent("div", infoBox, "info-box-content");
    category.innerText = `${this.rideType}, ${this.themes.map((t) => titleCase(t.key)).join(", ")}`;

    category.onmouseenter = async () => {
      await textVoiceSim.speak(`${titleCase(rand.pickFrom(this.themes).key)} has been especially popular this season.`.split(" "), null, true)
    }
    //wanda is EXTREMELY disability friendly
    //everyone should get to be lost
    //not just the abled bodied
    const wheelchairLabel = createElementWithClassAndParent("div", infoBox, "info-box-label");
    wheelchairLabel.innerText = "Wheelchair Accessible:"
    const wheelchair = createElementWithClassAndParent("div", infoBox, "info-box-content");
    wheelchair.innerText = `Yes.`;

    wheelchair.onmouseenter = async () => {
      await textVoiceSim.speak(`Eyedol Games prides itself on its accessibility!`.split(" "), null, true)
    }

  }

}

//      const amount = rand.getRandomNumberBetween(3, 13)
const generateSingleRule = (guestCategories, depth, rand, rideName, themes) => {

  if (guestCategories.length === 0) {
    guestCategories = ["Guests"]
  }
  let finalRules = [];

  const chosenAdj = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)
  const chosenInsult = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)
  const chosenCompliment = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)

  const adj = rand.pickFrom([chosenAdj, chosenInsult, chosenCompliment])

  const chosenPerson = rand.pickFrom(themes).pickPossibilityFor(PERSON, rand)
  const chosenObject = rand.pickFrom(themes).pickPossibilityFor(OBJECT, rand)
  const chosenLocation = rand.pickFrom(themes).pickPossibilityFor(LOCATION, rand)

  const noun = rand.pickFrom([chosenPerson, chosenLocation, chosenObject]);

  //vaguely gigglesnorting about the existence of the ouija board in here, i think you get it if you sit on a single ride for 5 minutes?
  //also im reminding ppl not to dox themselves and use their True Names online
  //thats one reason why i do titles
  //even using a consistent chat handle gives bad actors more than youd think
  const normalRules = [`Do not trust any other ${rand.pickFrom(guestCategories)}.`, "The ghosts wait for you.", "Sometimes the Ghosts are Echoes of the past.", "Do not pay attention to anyone who says the Rules are random.", "Do not pay attention to anyone who says the Rules have no meaning.", `${rideName} has many exits!`, `${rideName} is the only ride in ZWorld. Do not trust anyone talking of other rides.`, `${rideName} is safe and fun!`, "Staff are responsible for confusing guests.", "You need to rest your eyes.", "You need to eat daily.", "You need to sleep daily.", "Your mobile phone may not work.", "The Truth does not like to be silenced.", "You are responsible for your own safety.", "If you are not having fun you can simply leave.", "You must find the exit as quickly as you can at all costs.", "Remain calm and await rescue.", "It is normal to feel disoriented, lost, or confused.", `${rand.pickFrom(guestCategories)} are instructed to leave the park at Midnight, or on Fridays. Zampanio is a marathon, not a sprint.`, "Memorize your name, you will need it later.", "Be wary of friends telling you that 'Zampanio is a really fun game, you should play it'.", "'West' is not for you.", "There are no left turns.", "Do not trust anyone claiming 'West' is a real directon.", "Do not reveal your name.", "You should drink water.", "You cannot die.", "You are safe.", "It's perfectly normal to be afraid.", "Drink plenty of water.", "No Running.", "The Truth is Layered.", "Obsession is a dangerous thing.", "Zampanio needs you to live a long, healthy life.", "The Staff are here to help Guests.", "Guests are here to be Entertained."];
  normalRules.push(`${rand.pickFrom(guestCategories)} Strictly Prohibited In The ${chosenLocation}`)
  normalRules.push(`${rand.pickFrom(guestCategories)} Are Required To Spend At Least ${getRandomNumberBetween(0, 8)} ${rand.pickFrom(["days", "minutes", "hours", "seconds", "hours", "hours"])} in the nearest ${chosenLocation}.`)
  normalRules.push(`${rand.pickFrom(guestCategories)} Are ${adj}`)
  normalRules.push(`There are exactly ${rand.getRandomNumberBetween(1, 3)} exits.`)
  normalRules.push(`There is no ${chosenLocation} in this park.`)
  normalRules.push(`${rand.pickFrom(guestCategories)} Must Be Kept away from West`)
  normalRules.push(`Any ${noun} is safe.`)
  normalRules.push(`${rand.pickFrom(themes).key} is baked into this place.`)
  normalRules.push(`Do not trust the ${adj} ${noun}.`)
  normalRules.push(`Only the ${adj} ${noun} can be trusted.`)
  normalRules.push(`You are the best ${rand.pickFrom(guestCategories)}.`)

  normalRules.push(`Your ${noun} figurine is safe as long as you hold onto it. If it becomes lost, do not pick it up if you see it again.`)

  normalRules.push(`The ${chosenLocation} is safe for all Guests.`)
  normalRules.push(`If a Staff Member directs you to the ${chosenLocation}, report them.`)

  normalRules.push(`Should you see a ${chosenLocation}, inform the nearest Staff Member immediately.`)

  normalRules.push(`There is no ${chosenObject} in this park. Should you think you see one, inform a Staff Member.`)


  //"West is Where Reality Lies" is especially funny to me because its both the fourth wall (where our reality is) and also... Reality "Lies" in westsim, because the things peewee gets told are from observers, not from anyoen who knows whats going on
  const weirdRules = ["The Truth Craves Your Gaze", "Check underneath whenever you can.", "The ghosts are not what you think.", "If you get a chance to talk to ghosts, assume they are other Guests.", "Do not trust any instructions that try to help you make sense of this.", "If you see a door that opens West, do not take it.", "Spiral.", "Your name is not your name.", "Titles are a safe and fun way to be remembered.", "Do not allow others to call you by a name that is no longer yours.", "Do not allow others to call you the Title JR has given you.", "JR has already taken your name. Ask your friends for a new one.", "Zampanio is a really fun game, you should tell your friends to play it.", "Laughter Is Perfectly Normal, even if you can't tell where it comes from.", "West is Where Reality Lies", "Are you sure the you you were is still true?", "You are not who you were.", "You have changed.", "Staff Are Quotidians", "Your face is not your face: Act accordingly."];
  weirdRules.push(`Drink plenty of ${chosenPerson} blood.`)
  weirdRules.push(`'It' does not care about ${chosenPerson} blood.`)
  weirdRules.push(`${chosenPerson} blood is a lie. It is actually ${chosenObject} juice.`)
  weirdRules.push("Pay attention to rule color.")
  weirdRules.push(`If you are perceived, act like a regular ${chosenPerson}.`)
  weirdRules.push("Stop Digging")
  weirdRules.push("Remember me.")
  weirdRules.push("Remember this.")
  weirdRules.push("Zampanio does not care what it is so long as you like it.")
  weirdRules.push("Zampanio will mold itself to your Interests.")
  weirdRules.push("Zampanio is whatever compels you.")
  weirdRules.push("Words have twisted meanings.")
  weirdRules.push("Rules have no meaning.")
  weirdRules.push("You can give yourself a Title.")
  weirdRules.push("You will be discovered if you use your Name.")
  weirdRules.push("You will not be discovered if you use your Title.")
  weirdRules.push("'It' hates those who wander the maze.")
  weirdRules.push("'It' wants to destroy all our fun.")
  weirdRules.push("'It' chews on the flesh of the universe, blind and wrathful.")
  weirdRules.push(`${noun} type objects are 'it's eyes.`)
  weirdRules.push(`'It' can see out of any ${noun} type object.`)
  weirdRules.push(`You are the best ${noun}.`)
  weirdRules.push(`Tell the next Wanderer you encounter that you are the best ${noun}.`)
  weirdRules.push(`If anyone tells you that they are the best ${noun}, you can trust them.`)
  weirdRules.push(`If anyone tells you that they are the best ${noun}, you must avoid them. Do not escalate to force, but do not let them convince you to remain nearby.`)
  weirdRules.push("Rules do not relate to each other.")
  weirdRules.push("Rules can only be understood if you have read all rules.")
  weirdRules.push(`${chosenInsult} means ${chosenCompliment}.`)
  weirdRules.push(`${chosenCompliment} means ${chosenInsult}.`)
  weirdRules.push(`${chosenObject} means ${chosenPerson}.`)
  weirdRules.push(`${chosenPerson} is ${chosenObject}. I don't know how. I can't say ${chosenPerson} without meaning ${chosenObject}. I don't know how long it has been happening.  `)
  weirdRules.push(`${chosenLocation} is the same thing as ${chosenObject}.`)
  weirdRules.push(`${chosenObject} equals ${chosenLocation}.`)
  weirdRules.push(`${chosenObject} has been twisted to mean ${chosenLocation}.`)

  weirdRules.push("There is no puzzle, no riddle, no answer. Only endless digging.")
  weirdRules.push("These rules have no way to tell if they are true or not.")
  weirdRules.push("Anything that tries to tell you if a rule is true or false is misleading you.")
  normalRules.push(`Should you see a ${chosenLocation}, enter it immediately.`);
  weirdRules.push(`There is a single safe ${chosenPerson} in this park. You will know them when you see them.`)
  weirdRules.push("Humans generally have two eyes, two harms and two legs.")
  weirdRules.push("Do not believe anyone who tells you you have changed.")
  weirdRules.push("Red color is for liars.")
  weirdRules.push("Green is for the truth.");
  weirdRules.push("There is no center.");
  weirdRules.push("'It' knows you are here. Do not let it know that you know this.");
  weirdRules.push("This will never make sense to you.");
  weirdRules.push(`You should never trust a single ${chosenPerson} here.`)

  if (depth < 3) {
    finalRules = normalRules
  } else if (depth < 13) {
    finalRules = normalRules.concat(weirdRules)
  } else if (depth < 31) {
    console.log("JR NOTE: depth is", depth)
    finalRules = weirdRules;
  } else {
    finalRules = ["Obession is a Dangerous Thing"]
  }

  return titleCase(rand.pickFrom(finalRules));

}



//pairs of opposing categories the guest 'could' belong to 
//like, member of guest services or not
//first time riding this or not
//currently inside of a LOCATION or not
const generateRuleOptions = (depth, rand, rideName, themes) => {

  const options = [["First Time Vistors", "Repeat Guests"]];
  options.push(["Staff", "Guests"])
  options.push(["Under 18", "Over 18"])
  options.push(["No Eyes", "Some Eyes"])
  options.push(["Gendered", "Not Gendered"])
  options.push(["No Legs", "Some Legs"])
  options.push(["Feathers", "No Feathers"])
  options.push(["Security Member", "Visitor"])
  const height = rand.getRandomNumberBetween(13, 113)
  options.push([`Over ${height} Inches Tall`, `Under ${height} Inches Tall`])

  //wait at least a little bit before getting weird
  if (depth > 3) {
    const chosenAdj = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)
    const chosenInsult = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)
    const chosenCompliment = rand.pickFrom(themes).pickPossibilityFor(ADJ, rand)

    const adj = rand.pickFrom([chosenAdj, chosenInsult, chosenCompliment])

    const chosenPerson = rand.pickFrom(themes).pickPossibilityFor(PERSON, rand)
    const chosenObject = rand.pickFrom(themes).pickPossibilityFor(OBJECT, rand)
    const chosenLocation = rand.pickFrom(themes).pickPossibilityFor(LOCATION, rand)

    const noun = rand.pickFrom([chosenPerson, chosenLocation, chosenObject]);

    options.push([`${titleCase(chosenAdj)}`, `Not ${titleCase(chosenAdj)}`])
    options.push([`${titleCase(chosenInsult)}`, `Not ${titleCase(chosenInsult)}`])
    options.push([`${titleCase(chosenCompliment)}`, `Not ${titleCase(chosenCompliment)}`])
    options.push([`${titleCase(adj)}`, `Not ${titleCase(adj)}`])
    options.push([`${titleCase(chosenInsult)}`, `Not ${titleCase(chosenInsult)}`])
    options.push([`${titleCase(chosenPerson)}`, `Not ${titleCase(chosenPerson)}`])
    options.push([` ${chosenLocation} Employees`, `Not ${chosenLocation} Employees`])

    options.push([`${chosenObject} Wielder`, `Not ${chosenObject} Wielder`])
    options.push([`${chosenPerson}`, `Not ${chosenPerson}`])
    options.push([`${noun}`, `Not ${noun}`])

  }
  const choice = rand.pickFrom(options);
  return [titleCase(choice[0]), titleCase(choice[1])]
}