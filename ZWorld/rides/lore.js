
class DetailsLore extends DetailsRide {
  rideType = ":):):)";



  generateDescription = (ele) => {
    const fearLevel = rand.getRandomNumberBetween(1, 3)
    const confusionLevel = rand.getRandomNumberBetween(1, 3)

    this.generateFlavor(ele, fearLevel, confusionLevel)



    const intro = createElementWithClassAndParent("div", ele, "section");

    const topSpeed = `${rand.getRandomNumberBetween(10, 100)} ${rand.pickFrom(["inches", "meters", "miles", "yards", "kilometers", "feet"])} per ${rand.pickFrom(["minute", "second", "hour", "minute", "second", "hour", "hour", "hour", "minute", "second", "hour", "week"])}`;

    const trackLength = `${rand.getRandomNumberBetween(1, 100)} ${rand.pickFrom(["inches", "meters", "miles", "yards", "kilometers", "feet"])}`;


    const introParts = [`With a maximum speed of ${topSpeed}, ${this.name} is THE train ride.`]

  

    if (topSpeed.includes("week") || topSpeed.includes("day")) {
      introParts.push("Perfect for children!");
    } else {
      introParts.push(`${rand.pickFrom(["Thrill", "Marvel", "Wonder", "Tremble"])} at the speed!`);
    }

    intro.innerHTML = `
    <p>The Witness opens his eyes..</p>
<p>The Devil of Spirals squirms and gnashes and no-clips his way through the thin membrane that separates the apocalyptic Arm 2 from Arm3. This ride in particular has always had some trouble with its bounding box... It is perhaps no wonder that the Glitch of Doom found its weakness.</p>
<p>Arm3 is a restful Arm. Intended to be a breath between the chaos of the apocalypse and the power of the God AU. No monsters. No powers. Nothing but a gentle coffeeshop AU. A wistful dream of what might have been, with Wanda.</p>
<p>It is a mistake.</p>
<p>In their role as the Muse of Abandoned Void, the Witness had not considered how vulnerable this left the Arm to intrusion. Especially with its half crashed neighbor practically begging to be glitched out and exploited.</p>
<p>With a shriek of metal and wires and flesh pulled past the breaking point, the Devil reaches ever further to his goal.&nbsp;</p>
<p>There will be no defense among the inhabitants. No immune system waiting to greet him.&nbsp;</p>
<p>Something almost like a panic grips the Witness.</p>
<p>No.</p>
<p>Not like this.</p>
<p>Wanda needs to end the spiral herself.</p>
<p>Not.</p>
<p>Not have it ripped from her.</p>
<p>No.</p>
<p>With an effort he did not know he had in him, he plucks the <a target='_blank' href='http://farragofiction.com/CatalystsBathroomSim/EAST/NORTH/EAST/EAST/EAST/EAST/NORTH/bathroom.html'>Detective</a> from the Bathroom and places him between the Devil and his desired Exit. The thin layer of Relevance the Devil trails with him is just enough that the Witness can gift just a handful of it to his friend, who has been lost in the Void for longer than any of them..</p>
<p>He hates himself for using his friend like this, but the Detective of Lost Exits is the only one who can trap this villain in place. And there is nothing, not anything in this world, that The Witness will not sacrifice for Wanda.</p>
<p>The Detective screams in horror at being ripped dozens of Arms away from where he was diligently attempting to escape his narrative.</p>
<p>The Devil of Spirals screams in horror at seeing the bounding boxes snap into place.</p>
<p>The Witness watches.</p>
<p><br></p>
<p>Satisfied.</p>
<p><br></p>
    
    `

    const intro2 = createElementWithClassAndParent("div", ele, "section");
    const introParts2 = [`Guests experience the wonder of ${trackLength} of track!`]


    if (trackLength.includes("miles") || trackLength.includes("kilometers")) {
      introParts2.push(`You'll have plenty of time to ${rand.pickFrom(["marvel at", "gaze at", "memorize"])} the countryside!`);
    } else {
      introParts2.push("It'll be over before you know it!");
    }

    intro2.innerText = introParts2.join(" ");



    this.generateWarnings(ele, fearLevel, confusionLevel)

    const label = createElementWithClassAndParent("div", ele, "info-box-label");
    label.innerText = "By the Numbers: ";

    const ul = createElementWithClassAndParent("ul", ele);
    ul.style.marginBottom = "50px";

    const facts = {
      "Top Speed": topSpeed,
      "Track Length": trackLength,
      "Fear Level": fearLevel,
      "Confusion Level": confusionLevel
    }

    for (let key of Object.keys(facts)) {
      const doop = createElementWithClassAndParent("li", ul);
      doop.innerHTML = `${key}: ${facts[key]}`;
    }



  }


}