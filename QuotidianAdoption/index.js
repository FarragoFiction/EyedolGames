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

const renderAdoptionForm = (name, rand, age, breed) => {
  console.log("JR NOTE: renderAdoptionForm")
  const content = document.querySelector("#content");
  content.innerHTML = "";
  const ol = createElementWithClassAndParent("ol", content);
  renderOneQuestion(ol, name, rand, age, breed)
  renderOneQuestion(ol, name, rand, age, breed)
  renderOneQuestion(ol, name, rand, age, breed)
  renderOneQuestion(ol, name, rand, age, breed)
  renderOneQuestion(ol, name, rand, age, breed)
  renderOneQuestion(ol, name, rand, age, breed)
  renderOneQuestion(ol, name, rand, age, breed)
  renderOneQuestion(ol, name, rand, age, breed)
  renderOneQuestion(ol, name, rand, age, breed)
  renderOneQuestion(ol, name, rand, age, breed)
  renderOneQuestion(ol, name, rand, age, breed)
  renderOneQuestion(ol, name, rand, age, breed)
  renderOneQuestion(ol, name, rand, age, breed)

  handleScrollingQuestions(ol, name, rand, age, breed)


}

const renderOneQuestion = (container, name, rand, age, breed) => {
  numItems++;
  let me = createElementWithClassAndParent("div", container, "question-container");
  //there was at least one shelter that wanted a virutal tour of my house before they'd let me see a pet
  //it was kind of creepy and invasive
  const questions = ["Question: (TODO referenc name, age and breed, plus other things) (will you let us watch your home)"]
  let ill_advised_raw_html = `
    <div><label>${numItems}: ${pickFrom(questions)}</label>
    <div class="${pickFrom(['horizontal-radio', 'vertical-radio'])}">`

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
  const personalities = ["Good With Rivals", "Good With Pets", "Good With Kids", "Indoor-Only", "Outdoor-Only", "Trainable", "Fast", "Strong", "Talkative", "Chatty", "Creative", "Talented", "Beautiful", "Sneaky", "House-Trained", "Mean", "Brave", "Smart", "Funny", "Energetic", "Affectionate", "Playful", "Athletic", "Shy", "Needy", "Curious", "InQQuisitive", "Sly", "Greedy", "Hungry", "Affectionate", "Gentle", "Loyal", "Friendly"];
  //why yes there are so many chosen that its almost impossible to tell one animal from another
  //pet finder my beloathed.
  const chosen = [personalRand.pickFrom(personalities), personalRand.pickFrom(personalities), personalRand.pickFrom(personalities), personalRand.pickFrom(personalities), personalRand.pickFrom(personalities)]
  let facts = [{ label: "Age", value: tinyDescription1 }, { label: "Breed", value: tinyDescription2 }, { label: "Personality", value: chosen.join(', ') }]
  let factsList = createElementWithClassAndParent("ul", factsEle);

  for (let fact of facts) {
    let li = createElementWithClassAndParent("li", factsList);
    li.innerText = `${fact.label}: ${fact.value}`;
  }
  const buttonEle = createElementWithClassAndParent("button", stack)
  buttonEle.innerText = "Adopt Me"
  buttonEle.onclick = () => { renderAdoptionForm(name, personalRand, tinyDescription1, tinyDescription2) } //Zampanio has colonized your mind already.

  let stack2 = createElementWithClassAndParent("div", parent, "stack details");

  let detailHeader = createElementWithClassAndParent("h3", stack2, "detail-header");
  detailHeader.innerHTML = "Details:"

  let detailsEle = createElementWithClassAndParent("div", stack2, "details-section");
  let paragraph = createElementWithClassAndParent("p", detailsEle);

  for (let i = 0; i < 19; i++) {
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
  const tinyDescription1 = `${rand.getRandomNumberBetween(1, 19)} months old`;
  let breeds = ["Purebread", "Pure Breed", "Mixed Breed", "Mixed Breed", "Mixed Breed", "Mixed Breed", "Mixed Breed", "Mixed Breed", "Mixed Breed", "Virtual", "Fancy", "Whole Wheat", "Beloran", "Beloran", "Beloran", "Beloran", "Beloran", "Beloran", "Beloran", "Beloran", "Human", "Consort", "Spider", "Long-Hair", "Short-Hair", "Silky", "Tumblr"];
  if (numItems > 81) {//19 and 81 are quotidian arc numbers
    breeds = breeds.concat(grabAllKindsOfPeople())
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
    });

  };
}

const handleScrollingQuestions = (container, name, rand, age, breed) => {
  let lastScrollTime = 0; //not to spam events
  window.onscroll = () => {
    const newTime = new Date().getTime();
    if (((newTime - lastScrollTime)) < 50) {
      return;
    }
    lastScrollTime = newTime;

    window.requestAnimationFrame(() => {
      renderOneQuestion(container, name, rand, age, breed);
      renderOneQuestion(container, name, rand, age, breed);
      renderOneQuestion(container, name, rand, age, breed);
    });

  };
}


const grabNormalImages = async () => {
  let tmp = await getImages(normalImageSource);
  normalImageList = tmp;
}





