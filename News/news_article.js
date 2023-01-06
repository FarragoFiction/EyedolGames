let how_many_died = 1;
let victim_was_killer = false;
let neighborhood = "Northpoint"
let corner1 = "Main Street"
let corner2 = "First Street"
let victim_name = "an unidentified victim"

let road_endings = ["Lane", "Highway", "Avenue", "Drive", "Road", "Crossing", "Street", "Boulevard"];


const initialize_details = () => {
  how_many_died = rand.getRandomNumberBetween(1, 8);
  victim_was_killer = rand.nextDouble() > 0.75;
  if(victim_was_killer){
    victim_name = "an unidentified assailant"
  }

  if(victim){
    victim_name = `${victim.split(" ")[0]} ${rand.pickFrom(filterMatches(last_names, new RegExp(victim.split(" ")[1])))}`
  }
  corner1 = `${quick(OBJECT, true)} ${rand.pickFrom(road_endings)}`;
  corner2 = `${quick(PERSON, true)} ${rand.pickFrom(road_endings)}`;
  neighborhood = `${quick(ADJ, true)} ${quick(OBJECT,true)}`;


}

const getHeadline = () => {
  const templates = [`Authorities Baffled As ${neighborhood} Neighborhood Grieves`, `${how_many_died} Dead In Suburban Neighborhood`, `Tragedy Strikes At ${corner1}`, `Tragedy Strikes At ${corner2}`];
  return rand.pickFrom(templates);
}

const replaceFirstArticleAndHeader = () => {
  initialize_details();


  const article = document.querySelector(".article");
  fleshOutNewsArticle(article)
}

const fleshOutNewsArticle = (ele) => {
  const headline = document.querySelector(".headline");
  headline.innerText = getHeadline();

  const innerHeadline = ele.querySelector(".headline");
  innerHeadline.innerText = headline.textContent;

  const content = ele.querySelector(".content");
  content.innerText = "";
  content.append(innerHeadline);
  handleFirstSection(content);

  const moreContent = ele.querySelector(".more-content");
  moreContent.innerText = "";

  handleSecondSection(moreContent);

}

const getIntro = () => {
  let templates = [`${capitalizeFirstLetter(victim_name)}, a local resident of the local neighborhood of ${neighborhood} was attacked while accepting a ${details?.restaurant_name} delivery ${corner1} last night.`,
    `Authorities are on the lookout for an unknown assailant that was spotted loitering outside the home of ${victim_name} on the corner of ${corner1} and ${corner2} yesterday evening, shortly before their body${how_many_died>1?` and ${how_many_died-1} others`:""} ${how_many_died>1?"were":"was"} discovered.`,
  ];
  if (victim_was_killer) {
    templates = [`A food delivery driver in the local neighborhood of ${neighborhood} was attacked while making a ${details?.restaurant_name} delivery to a local residence on ${corner1} last night.`,

    ];
  }
  return rand.pickFrom(templates);
}

const getMiddle = () => {

  const hollowReassurances = [`A local parent says that kid's are just taking pranks too far.`,"Authorities say this is likely some form of hazing by local teens.","Local experts reassure the public that this is likely a mass hallucination."]
  let templates = [`According to reports, the monster, which is described as '${quick(MONSTER_DESC)}', was seen lurking in the shadows and peering into the windows of the home. Several neighbors reported feeling threatened by the creature's presence and called the police. It is unclear where it is at present.`,
    `Eye witnesses, describing the assailant, say ${quick(MONSTER_DESC)} Authorities were not available for comment. ${rand.pickFrom(hollowReassurances)}`,
  ];
  if (victim_was_killer) {
    templates = [``,
      ``,
      ``,
      ``
    ];
  }
  return rand.pickFrom(templates);
}

const getOutro = () => {
  let templates = [`${details?.restaurant_name} have released a statement saying that they bear no responsibility.`,
    `Police say that citizens should remain in their homes and they will be safe.`,
    `${details?.restaurant_name} could not be reached for comment.`,
  ];
  if (victim_was_killer) {
    templates = [``,
      ``,
      ``,
      ``
    ];
  }
  return rand.pickFrom(templates);
}

//includes an intro (NEVER dangerously set inner html cuz some of my content is from url)
const handleFirstSection = (ele) => {
  const intro = createElementWithClassAndParent("p",ele);
  intro.innerText = getIntro();
  let amount = rand.getRandomNumberBetween(3,5);
  for(let i = 0; i<amount; i++){
    const paragraph = createElementWithClassAndParent("p",ele);
    paragraph.innerText = getMiddle();
  }
}

//includes a conclusion
const handleSecondSection = (ele) => {

  let amount = rand.getRandomNumberBetween(3,5);
  for(let i = 0; i<amount; i++){
    const paragraph = createElementWithClassAndParent("p",ele);
    paragraph.innerText = getMiddle();
  }
  const outro = createElementWithClassAndParent("p",ele);
  outro.innerText = getOutro();

}