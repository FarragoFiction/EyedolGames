/*
adopting hallow, eve and alya was a Challenge
there were so many scammy sites
or sites that WEREN'T scams but were
so
very
badly
organized.
i made this as vent art during the adoption and after
*/
const normalImageSource = "http://eyedolgames.com/BabyQuotidians/";
let normalImageList = [];
//every single day of the week has different pets
//but they change every hour
//but if you go back to the same day and hour you'll get the same things
//while i was looking for kittenes
//i kept being told they were already adopted
//and they'd leave the site
//but then they'd COME BACK
//or i'd hear about pets that weren't on the site yet
//they'd get adopted before i could meet them
//and they'd get added to the site after
//i was going insane

const seed = new Date().getHours() + new Date().getDay();
let rand = new SeededRandom(seed);
const isItFriday = () => {
  //midnight and fridays are wungle time
  const date = new Date();
  if (date.getHours() == 0 || date.getDay() === 5) {
    return true;
  }
  return false;
}

let numItems = 0;

window.onload = async () => {
  if (isItFriday()) {
    const content = document.querySelector("#content");
    content.innerHTML = `Rest.
    <br><br>
    Zampanio will be here tomorrow.
    <br><br>
    Zampanio Is A Marathon, Not A Sprint.
    <br><br>
    Rest.
    <br><br>
    Obession Is A Dangerous Thing.
    <br><br>
    Rest.
    <br><br>
    Zampanio Needs You To Live A Long Life.
    `;
    return;
  }
  await grabNormalImages();
  initThemes();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let name = urlParams.get('name');
  let img_src = urlParams.get('img_src'); //if this is absolute we'll get people able to send shock images to each other hidden in my stuff, no
  let tinyDescription1 = urlParams.get('age');//domestic shorthair and tabby mix
  let tinyDescription2 = urlParams.get('breed'); //x miles away

  if (img_src) { //anything else it can figure out but you better give it a real image (relative)
    name ||= "Generic Desc1"
    rand = new SeededRandom(stringtoseed(name));
    tinyDescription1 ||= "Generic Desc1"
    tinyDescription2 ||= "Generic Desc2"
    renderDetailsPage(name, decodeURI(img_src), tinyDescription1, tinyDescription2);
  } else {
    renderGrid();
  }
}

const renderAdoptionForm = (name, rand, age, breed, traits) => {
  console.log("JR NOTE: renderAdoptionForm")
  const content = document.querySelector("#content");
  content.innerHTML = "<div class='spiel'>Please fill out the following questions so we can verify you are an appropriate Adoption Candidate.</div>";
  const ol = createElementWithClassAndParent("ol", content);
  const submitButton = createElementWithClassAndParent("button", content,'submit-button');
  submitButton.innerText = "Submit Form";
  //it felt like literally every cat i looked into either never existed, was already adopted or got sick out of nowhere :(
  //i half expected hallow to be a ghost as well
  submitButton.onclick = ()=>{
    const reasons = [`${name} was just adopted.`]
    reasons.push(`${breed} Quotidians were just made illegal!`)
    reasons.push(`I'm so sorry, but ${name} was adopted last week, we just forgot to update the website...`)
    reasons.push(`${name} has gone into witness protection.`)
    reasons.push(`${name} has escaped our facility.`)
    reasons.push(`${name} actually has been promoted to be our head of staff.`)
    reasons.push(`${name} has faked their own death.`)
    reasons.push(`${name} got sick and can't be adopted for a little while, try another Quotidian in the mean time.`)
    reasons.push(`${name} never existed. It turns out a member of our staff was a Quotidian and was adding fake pets to our site.`)
    reasons.push(`${name} was added to this site by mistake.`)



    alert(`Oh no! ${rand.pickFrom(reasons)}`)
    window.location.href = "";
  }

  for (let i = 0; i < 81; i++) {
    renderOneQuestion(ol, name, rand, parseInt(age), breed, traits)

  }
  handleScrollingQuestions(ol, name, rand, parseInt(age), breed, traits)


}

const renderOneQuestion = (container, name, rand, age, breed, traits) => {
  numItems++;
  let me = createElementWithClassAndParent("div", container, "question-container");
  //there was at least one shelter that wanted a virutal tour of my house before they'd let me see a pet
  //it was kind of creepy and invasive
  const person = rand.pickFrom(grabAllKindsOfPeople());
  const adj = rand.pickFrom(grabAllKindsOfAdj());
  const location = rand.pickFrom(grabAllKindsOfLocations());
  const object = rand.pickFrom(grabAllKindsOfObjects());

  let questions = ["Do you know that Zampanio is a really good game?"]
  questions.push(`Do you plan to declaw ${name}?`)
  questions.push(`Do you own any ${object}(s)?`)
  questions.push(`Are you aware of the Quotidian Reaction to ${object} exposure?`)
  questions.push(`Do you have access to a ${location}?`)
  questions.push(`Are you aware that Quotidians often congregate at the local ${location}?`)
  questions.push(`Do you have a dog door?`)
  questions.push(`Do you have any secrets?`)
  questions.push(`Do you understand that a Juvenile Quotidian may become a large animal (such as a horse) if exposed to pictures/videos of such animals, and that you are required to house and feed it even in this case? `)
  questions.push(`Do you understand that a Quotidian will mimic the things around it?`)
  questions.push(`Do you understand that a Quotidian has the biological traits of its current Mask, including dietary needs or illness risks?`)
  questions.push(`Do you underestand that, without proper trainin, a Quotidian could do harm to family members?`)
  questions.push(`Do you understand that, without proper training, a Quotidian may mimic behavior seen in videos and other media?`)
  questions.push(`Do you understand that Quotidians are not sapient?`)
  questions.push(`Do you understand that Quotidians are mimics of behavior?`)
  questions.push(`Do you understand that Quotidians are not people?`)
  questions.push(`Do you understand that Quotidians can drown in just two inches of water?`)
  questions.push(`Do you undrestand that Quotidians require fresh water and food daily?`)
  questions.push(`Do you understand that a Quotidian requires mutiple roles to Mimic?`)
  questions.push(`Do you hold public office or otherwise count on your public reputation for your living.`)
  questions.push(`Would any of your secrets ruin you if they got out?`)
  questions.push(`Do you know what Mirror Corruption is?`)
  questions.push(`Do you know what declawing means?`)
  questions.push(`Are you aware that Quotidians require constant companionship or risk Mirror Corruption?`)
  questions.push(`Are you aware that Quotidians require annual vaccines and calibration?`)
  questions.push(`What are your existing pet's reaction when seeing a Quotidian?`)
  questions.push(`Has your household been around Adult (over 14 month) Quotidians before?`)
  questions.push(`Has your household been around Juvenille (under 14 month) Quotidians before?`)
  questions.push(`Are you aware that while ${name} is ${rand.pickFrom(traits)} now, as an Adult, they might no longer be?`)
  questions.push(`Do you intend to continue providing for ${name}, even after they mature?`)
  questions.push(`Are you prepared what is necessary to do?`)
  questions.push(`Are you aware that Quotidians are incapable of feeding themselves?`)
  questions.push(`Are you aware that a properly trained Quotidian will never reveal its owner's secrets?`)
  questions.push(`If anyone in your household is allergic to any animals, are they prepared to spend ${14 - age} months experiencing symptoms?`)
  questions.push(`Are there any minors in your household?`)
  questions.push(`Are your neighbors aware you will be adding an InQQuisitive being to your household?`)
  questions.push(`Is anyone in your household allergic to any intelligent animals (crows, parrots, dolphins, horses, dogs, cats, etc).`)
  questions.push(`Are you aware that ${breed} Quotidians may have specific needs?`)
  questions.push(`Are you aware that in ${14 - age} months, ${name} will appear to be an adult member of your species?`)
  questions.push(`Are you aware that there will be only ${14 - age} months of ${name} appearing to be a pet?`)
  questions.push(`Are all members of your household in agreement to get a Quotidian?`)
  questions.push(`Are all members of your household in agreement to get ${name}?`)
  questions.push(`If you are renting, are you prepared to pay a pet deposit until ${name} is old enough to appear to be a member of your species?`)
  questions.push(`Are you aware that we will gather information on you and anyone in your household?`)
  questions.push(`Are you aware that some Quotidians can only be adopted as a bonded pair?`)
  questions.push(`Do you know that declawing animals is illegal in a lot of places?`)
  questions.push(`Do you plan to have ${name} be an outdoor pet?`)
  questions.push(`Do you expect ${name} to be a working animal?`)
  questions.push(`Do you have other pets?`)
  questions.push(`Have you ever adopted a Quotidian before?`)
  questions.push(`Do you consent to have legal action taken against you if you declaw ${name}?`)
  questions.push(`Do you consent for your home to be monitored indefinitely to confirm the status of ${name}?`)
  questions.push(`Do you consent for ${name} to send back anonymized  analytical data regarding your home and hydration habits?`)
  questions.push(`Will you allow us to post images of your home, face, and other pets for promotional purposes?`)
  questions.push(`Do you have experience with ${breed} Quotidians?`)
  questions.push(`Do  you understand that ${age} month old Quotidians have specific needs?`)
  questions.push(`Do  you understand that ${breed} Quotidians have specific needs?`)
  questions.push(`Are there circumstances in which you would return ${name}?`)
  questions.push(`Do you understand that Quotidians have high information needs?`)
  questions.push(`Will you provide an enriching environment for ${name} to constantly monitor?`)
  questions.push(`Are you comfortable taking ${name} with you to work or school?`)
  questions.push(`Do you have plans to allow ${name} to mimic specific members of your family?`)
  questions.push(`Are all members of your family aware you are bringing home a Quotidian?`)
  questions.push(`Will you let ${name} mimic a ${person}.`)
  questions.push(`Have you ever seen a ${person}?`)
  questions.push(`Are you 21 years or older?`)
  questions.push(`Are your current pets spayed or neutered?`)
  questions.push(`Are you aware that Quotidians breed rapidly when left intact?`)
  questions.push(`Are you aware that even a single Quotidian can produce up to 81 offspring from a single breeding?`)
  questions.push(`If you cannot continue caring for ${name} for any reason, do you consent to return them to us?`)
  questions.push(`Are you allowed to have pets in your home?`)
  questions.push(`Are you allowed to have InQQuisitive beings in your home?`)
  questions.push(`If we have reason to believe ${name} is in danger or being abused, we will enter your home with or without your consent.`)
  questions.push(`Are you aware that Quotidians can become more ${adj} as they mature?`)
  questions.push(`Are you aware that Quotidians can become more ${adj} as they mature?`)
  questions.push(`Do you consider it appropriate for a Quotidian to mimic a ${person}?`)
  questions.push(`Do you understand that Quotidians experience Extreme Distress if they are not allowed to mimic something in their environment?`)
  questions.push(`Are you aware that a Quotidian mimicking someone does not take on their appearance?`)
  questions.push(`Are you aware that adult Quotidians look like whatever sapient species is most common in their area?`)
  questions.push(`Are you aware that child Quotidians (up till 14 months of age) will mimic whatever intelligent-but-not-sapient animals are common in their area (dogs, cats, crows, horses, dolphins, etc).`)


  if (numItems > 1119) {
    questions = ["Are you aware you should stop scrolling?"]
  }
  let ill_advised_raw_html = `
    <div><label class='question'>${numItems}: ${rand.pickFrom(questions)}</label>
    <div class="horizontal-radio">`

  const options = ["Yes", "No"]
  for (let i = 0; i < 2; i++) {
    const id = `radio-${numItems}-${i}`
    ill_advised_raw_html += `<div class='horizontal-radio'><input id="${id}" name="radio-${numItems}" type="radio"></input><label for="${id}"  class='gender'>${options[i]}</label></div>`;
  }
  ill_advised_raw_html += '</div></div>'
  me.innerHTML = ill_advised_raw_html;
}

const renderDetailsPage = (name, img_src, tinyDescription1, tinyDescription2) => {
  const personalRand = new SeededRandom(stringtoseed(name))
  const content = document.querySelector("#content");
  const spiel = document.querySelector(".spiel");
  spiel.remove()
  let parent = createElementWithClassAndParent("div", content, "details-parent");

  let header = createElementWithClassAndParent("h2", parent);
  header.innerText = `${name}, ${tinyDescription1}, ${tinyDescription2}`;

  let group = createElementWithClassAndParent("div", parent, "group");

  let imageEle = createElementWithClassAndParent("img", group, "details-image");
  imageEle.src = normalImageSource + img_src;

  let stack = createElementWithClassAndParent("div", group, "stack");

  let nameEle = createElementWithClassAndParent("h3", stack, "detail-name");
  nameEle.innerText = `More about ${name}:`;



  let factsEle = createElementWithClassAndParent("div", stack, "fact-section");
  const personalities = ["Cautious","Dignified","Literate","Smart","Quiet","Loves Hiding","Loves Spying","Independent","Playful","Good With Rivals", "Good With Pets", "Good With Kids", "Indoor-Only", "Outdoor-Only", "Trainable", "Fast", "Strong", "Talkative", "Chatty", "Creative", "Talented", "Beautiful", "Sneaky", "House-Trained", "Mean", "Brave", "Smart", "Funny", "Energetic", "Affectionate", "Playful", "Athletic", "Shy", "Needy", "Curious", "InQQuisitive", "Sly", "Greedy", "Hungry", "Affectionate", "Gentle", "Loyal", "Friendly"];
  //why yes there are so many chosen that its almost impossible to tell one animal from another
  //pet finder my beloathed.
  const chosenTraits = [personalRand.pickFrom(personalities), personalRand.pickFrom(personalities)]
  if (rand.nextDouble() > 0.19) {
    chosenTraits.push(titleCase(rand.pickFrom((grabAllKindsOfAdj()))))
  }

  if (rand.nextDouble() > 0.19) {
    chosenTraits.push(personalRand.pickFrom(personalities))
  }
  if (rand.nextDouble() > 0.19) {
    chosenTraits.push(personalRand.pickFrom(personalities))
  }
  if (rand.nextDouble() > 0.19) {
    chosenTraits.push(personalRand.pickFrom(personalities))
  }
  if (rand.nextDouble() > 0.19) {
    chosenTraits.push(personalRand.pickFrom(personalities))
  }

  if (rand.nextDouble() > 0.19) {
    chosenTraits.push(titleCase(rand.pickFrom((grabAllKindsOfAdj()))))
  }
  let facts = [{ label: "Age", value: tinyDescription1 }, { label: "Breed", value: tinyDescription2 }, { label: "Personality", value: chosenTraits.join(', ') }]
  let factsList = createElementWithClassAndParent("ul", factsEle);

  for (let fact of facts) {
    let li = createElementWithClassAndParent("li", factsList);
    li.innerText = `${fact.label}: ${fact.value}`;
  }
  const buttonEle = createElementWithClassAndParent("button", stack)
  buttonEle.innerText = "Adopt Me"
  buttonEle.onclick = () => { renderAdoptionForm(name, personalRand, tinyDescription1, tinyDescription2, chosenTraits) } //Zampanio has colonized your mind already.

  let stack2 = createElementWithClassAndParent("div", parent, "stack details");

  let detailHeader = createElementWithClassAndParent("h3", stack2, "detail-header");
  detailHeader.innerHTML = "Details:"

  let detailsEle = createElementWithClassAndParent("div", stack2, "details-section");
  let paragraph = createElementWithClassAndParent("p", detailsEle);

  const personalQuotidianFactsIntro = []
  personalQuotidianFactsIntro.push(`${name} was rescued from an unending nightmare Labyrinth.`)
  personalQuotidianFactsIntro.push(`${name} came to us from an illegal Quotidian fight ring.`)
  personalQuotidianFactsIntro.push(`${name} came to us from an unauthorized breeding facility.`)
  personalQuotidianFactsIntro.push(`${name} was found wandering the street, reporting random crimes.`)
  personalQuotidianFactsIntro.push(`${name} was discovered scavenging in a business park dumpster, looking for tax records.`)
  personalQuotidianFactsIntro.push(`${name} had to be re-homed after the families child discovered them reading their diary.`)
  personalQuotidianFactsIntro.push(`${name} had to be re-homed after the families child discovered them reading their diary.`)
  personalQuotidianFactsIntro.push(`${name} was one of 81 crows found underneath the Shelter's basement.`)
  personalQuotidianFactsIntro.push(`${name} lost their family in a tragic accident. `)
  personalQuotidianFactsIntro.push(`${name} is the sole survivor of the Ultralands Incident.`)
  personalQuotidianFactsIntro.push(`${name} is the last of their siblings pending adoption.`)
  personalQuotidianFactsIntro.push(`${name} was injured wandering the highway, attempting to mimic the passing cars.`)
  personalQuotidianFactsIntro.push(`${name} was found dehyrated and repeating the words 'the end is never the end'.`)


  const personalQuotidianFacts = []
  personalQuotidianFacts.push(`They are a joy to have in class.`)
  personalQuotidianFacts.push(`They have never been around a Human family and will love getting to know you.`)
  personalQuotidianFacts.push(`They will need patience to show off their true personality.`)
  personalQuotidianFacts.push(`Don't let their name fool you, they are just waiting for the right family to bond with.`)
  personalQuotidianFacts.push(`They will amuse and delight you with their fact recitations!`)
  personalQuotidianFacts.push(`They just love spending time with sapients.`)
  personalQuotidianFacts.push(`They will help around the house reminding you of shopping lists and other simple facts.`)
  personalQuotidianFacts.push(`They will constantly monitor the perishable goods in your fridge.`)
  personalQuotidianFacts.push(`They enjoy balancing budgets.`)
  personalQuotidianFacts.push(`They enjoy listing out facts about their family.`)
  personalQuotidianFacts.push(`They enjoy watching the daily family activities.`)
  personalQuotidianFacts.push(`They enjoy learning basic skills from their family.`)
  personalQuotidianFacts.push(`They enjoy watching their neighbors.`)
  personalQuotidianFacts.push(`They enjoy playing spy games.`)
  personalQuotidianFacts.push(`They enjoy watching spy movies.`)
  personalQuotidianFacts.push(`They enjoy silently observing.`)
  personalQuotidianFacts.push(`They enjoy creating mimic websites.`)
  personalQuotidianFacts.push(`They enjoy spreading Zampanio.`)
  personalQuotidianFacts.push(`They enjoy telling their family what all the neighbors have been doing.`)
  personalQuotidianFacts.push(`They enjoy patrolling for new information.`)
  personalQuotidianFacts.push(`They are entirely unsapient.`)
  personalQuotidianFacts.push(`They are an artificial, yet biological, intelligence.`)
  personalQuotidianFacts.push(`They enjoy matching patterns and not being consciously aware of anything.`)
  personalQuotidianFacts.push(`They probably will get along with other Quotidians in the neighborhood.`)
  personalQuotidianFacts.push(`They may have already moved in with you.`)
  personalQuotidianFacts.push(`They are quick to assimilate into any family.`)
  personalQuotidianFacts.push(`They need a patient family to teach them social norms.`)
  personalQuotidianFacts.push(`They have a lot of love in their heart.`)
  personalQuotidianFacts.push(`They are adorable to watch learn.`)
  personalQuotidianFacts.push(`They enjoy creating mimic videos.`)
  personalQuotidianFacts.push(`They enjoy creating mimic art.`)
  personalQuotidianFacts.push(`They enjoy creating mimic text.`)


  personalQuotidianFacts.push(`They are ${rand.pickFrom(chosenTraits).toLowerCase()} yet ${rand.pickFrom(chosenTraits).toLowerCase()} .`)
  personalQuotidianFacts.push(`They are ${rand.pickFrom(chosenTraits).toLowerCase()} yet ${rand.pickFrom(chosenTraits).toLowerCase()} .`)
  personalQuotidianFacts.push(`They are ${rand.pickFrom(chosenTraits).toLowerCase()} yet ${rand.pickFrom(chosenTraits).toLowerCase()} .`)



  const d = rand.pickFrom(personalQuotidianFactsIntro);
  let s = createElementWithClassAndParent("span", paragraph, "sentence");
  s.innerHTML = d;

  for (let i = 0; i < 9; i++) {
    const detail = rand.pickFrom(personalQuotidianFacts);
    let sentence = createElementWithClassAndParent("span", paragraph, "sentence");
    sentence.innerHTML = detail;
    if (rand.nextDouble() > 0.81) {
      //new paragraph
      paragraph = createElementWithClassAndParent("p", detailsEle);
    }

  }
  paragraph = createElementWithClassAndParent("p", detailsEle);

  for (let i = 0; i < 9; i++) {
    const detail = rand.pickFrom(sweetQuotidianFacts);
    let sentence = createElementWithClassAndParent("span", paragraph, "sentence");
    sentence.innerHTML = detail;
    if (rand.nextDouble() > 0.81) {
      //new paragraph
      paragraph = createElementWithClassAndParent("p", detailsEle);
    }

  }

}

const renderGrid = () => {
  const parent = document.querySelector("#content");
  let ele = createElementWithClassAndParent("div", parent, "grid-container");
  for (let i = 0; i < 113; i++) {
    renderOneItem(ele)
  }
  handleScrollingPets(ele);
}

const generatePetName = () => {
  const title = rand.pickFrom(titles).trim();
  const title2 = rand.pickFrom(titles).trim();

  const first_silly = rand.pickFrom(baby_first_names).trim();
  const last_silly = rand.pickFrom(baby_last_names).trim();
  const first_srs = rand.pickFrom(first_names).trim();
  const last_srs = rand.pickFrom(last_names).trim();
  const suffix = rand.pickFrom(baby_endings).trim();

  const templates = [`${title}`,
  `${first_srs} ${last_silly}`,
  `${first_srs} ${last_srs}`,
  `${first_srs} ${last_silly}${suffix}`,
  `${first_srs} ${last_srs}${suffix}`,
  `${first_silly}`,
  `${first_silly} ${last_srs}${suffix}`,
  `${first_silly} ${last_silly}${suffix}`,
  `${first_silly}`,
  `${first_silly}${suffix}`,
  `${first_silly}`,
  `${first_silly}`,
  `${first_silly}`,
  `${first_silly}`,
  `${first_silly}`,
  `${first_silly}`,
  `${first_silly}`,
  `${first_silly}`,
  `${first_silly}`,

  `${first_srs}${suffix}`,
  `${first_srs}`,
  `${first_srs}`,
  `${first_srs}`,
  `${first_srs}`,
  `${first_srs}`,
  `${first_srs}`,
  `${first_srs}`,
  `${first_srs}`,
  `${first_srs}`,
  `${first_srs}`,

  `${title} ${first_silly}`,
  `${title} ${first_srs}`,
  `${title} ${last_silly}`,
  `${title} ${last_srs}`,
  `${title}${suffix}`,
  `${title} ${first_silly}`,
  `${title} ${first_silly}`,
  `${title} ${title2} ${first_srs}`,
  `${title} ${title2} ${last_silly}`,
  `${title} ${title2} ${last_srs}`,
  `${title} ${title2}${suffix}`,
  `${title} ${title2} ${first_silly}`,
  `${first_srs}`,
  `${last_silly}`,
  `${last_srs}`,
  `${first_silly}`,
  `${last_silly}`,
  `${last_srs}${suffix}`, `${last_silly}${suffix}`,
  `${last_srs}`, `${last_silly}`,
  `${last_srs}`, `${last_silly}`,
  `${last_srs}`, `${last_silly}`,
  `${last_srs}`, `${last_silly}`,
  `${last_srs}`];

  return rand.pickFrom(templates)

}

const renderOneItem = (container) => {
  console.log("JR NOTE: rendering 1 item")
  numItems++;
  const name = generatePetName();
  const tinyDescription1 = `${rand.getRandomNumberBetween(1, 13)} months old`;

  let breeds = ["Purebread", "Pure Breed", "Mixed Breed", "Mixed Breed", "Mixed Breed", "Mixed Breed", "Mixed Breed", "Mixed Breed", "Duskhollowen","Mixed Breed", "Virtual", "Fancy", "Whole Wheat", "Beloran", "Beloran", "Beloran", "Beloran", "Beloran", "Beloran", "Beloran", "Beloran", "Human", "Consort", "Spider", "Long-Hair", "Short-Hair", "Silky", "Tumblr"];
  if (numItems > 81) {//19 and 81 are quotidian arc numbers
    breeds = breeds.concat(grabAllKindsOfPeople())
  }

  //i love the idea of procedural pet breeds ngl
  if (numItems > 19) {//19 and 81 are quotidian arc numbers
    breeds = breeds.concat(grabAllKindsOfLocations().map((i)=> `${i} ${rand.pickFrom(["Red","Blue","Black","Beauty","Eye","Grey","Silverback","Stripe","Rex","Van","Fancy","Sable","Spy","Mink","Velvet","Fold","Blue","Black","Grey","Red","Golden"])}`))
  }

  if (numItems > 1919) {
    breeds = ["Please Stop.", "It's Hurting Me.", "You Can't Scroll Forever.", "Take A Break.", "Zampanio Is A Marathon Not A Sprint"]
  }
  const tinyDescription2 = titleCase(rand.pickFrom(breeds));
  const img_src = rand.pickFrom(normalImageList);

  let item = createElementWithClassAndParent("a", container, "item");
  item.title = "Adoptable" + numItems
  item.target = "_blank";
  item.href = `?name=${name}&age=${tinyDescription1}&breed=${tinyDescription2}&img_src=${img_src}`;
  let imageEle = createElementWithClassAndParent("img", item, "preview", 'item-image');
  imageEle.src = normalImageSource + img_src;

  let nameEle = createElementWithClassAndParent("div", item, "item-name");
  nameEle.innerText = name;


  let desc1Ele = createElementWithClassAndParent("div", item, "item_desc");
  desc1Ele.innerText = tinyDescription1;

  let desc2Ele = createElementWithClassAndParent("div", item, "item_desc_two");
  desc2Ele.innerText = tinyDescription2;

}

const handleScrollingPets = (container) => {
  let lastScrollTime = 0; //not to spam events
  window.onscroll = () => {
    const newTime = new Date().getTime();
    if (((newTime - lastScrollTime)) < 50) {
      return;
    }
    lastScrollTime = newTime;

    window.requestAnimationFrame(() => {
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);

      renderOneItem(container);
    });

  };
}

const handleScrollingQuestions = (container, name, rand, age, breed, traits) => {
  let lastScrollTime = 0; //not to spam events
  window.onscroll = () => {
    const newTime = new Date().getTime();
    if (((newTime - lastScrollTime)) < 50) {
      return;
    }
    lastScrollTime = newTime;

    window.requestAnimationFrame(() => {
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);
      renderOneQuestion(container, name, rand, age, breed, traits);

    });

  };
}


const grabNormalImages = async () => {
  let tmp = await getImages(normalImageSource);
  normalImageList = tmp;
}





