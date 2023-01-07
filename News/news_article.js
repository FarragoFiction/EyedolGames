let how_many_died = 1;
let neighborhood = "Northpoint"
let corner1 = "Main Street"
let corner2 = "First Street"
let customer_name = "an unidentified victim"
const DEAD = "DEAD";
const MISSING = "MISSING";
const INJURED = "INJURED";
let monster_name = "killer";
let primary_victim_name = "victim";
let restaurant_name = "???"
let crimeStatus = MISSING; //certainty is hard to come by

let road_endings = ["Lane", "Highway", "Avenue", "Drive", "Road", "Crossing", "Street", "Boulevard"];


const initialize_details = () => {
  restaurant_name = details.restaurant_name;
  how_many_died = rand.getRandomNumberBetween(1, 8);
  customer_was_monster = rand.nextDouble() > 0.75;
  crimeStatus = rand.pickFrom([MISSING,MISSING,MISSING,MISSING,DEAD,INJURED]);

  if(reviewer){
    customer_name = `${reviewer.split(" ")[0]} ${rand.pickFrom(filterMatches(last_names, new RegExp(reviewer.split(" ")[1])))}`
  }
  monster_name = pickFrom([customer_name, `the ${restaurant_name} driver`,`the ${restaurant_name} driver`,`the ${restaurant_name} driver`])

  if(monster_name === customer_name){
    primary_victim_name = `the ${restaurant_name} driver`;
  }else{
    primary_victim_name = customer_name;
  }

  corner1 = `${quick(OBJECT, true)} ${rand.pickFrom(road_endings)}`;
  corner2 = `${quick(PERSON, true)} ${rand.pickFrom(road_endings)}`;
  neighborhood = `${quick(ADJ, true)} ${quick(OBJECT,true)}`;


}

const getHeadline = () => {
  let templates = [];
  if(crimeStatus ===DEAD){
     templates = [`Authorities Baffled As ${neighborhood} Neighborhood Grieves`, `${how_many_died} Dead In Suburban Neighborhood`, `Tragedy Strikes At ${corner1}`, `Tragedy Strikes At ${corner2}`];

  }else if (crimeStatus === MISSING){
    templates = [`Authorities Baffled As ${neighborhood} Neighborhood Fears The Worst`, `${how_many_died} Feared Dead In Suburban Neighborhood`, `${how_many_died} missing from homes at ${corner1}`];

  }else{
    templates = [`Authorities Baffled As ${neighborhood} Neighborhood Prepares Defenses`, `${how_many_died} Injured In Suburban Neighborhood`, `${how_many_died} injured at ${corner1}`];

  }
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

const getActions = (monster)=>{
  if(!monster && (primary_victim_name === customer_name)){
    return[`a resident of the local neighborhood of ${neighborhood}`,`waiting for a ${restaurant_name} delivery, notably featuring a flavorful ${details.item_name}`];
  }else{
    return  [`was in the process of delivering food to ${customer_name}`,`on a routine delivery`,`delivering to ${neighborhood}`,`making a ${details?.restaurant_name} delivery to a local residence on ${corner1} last night.`];
  }
}

//of the form "Brian Johnson, while waiting for a X delivery, was brutally killed"
//or "a X delivery driver, while on a routine delivery, was brutally killed"
const detailVictimActions  = ()=>{
  return getActions(false);
}

//of the form "Brian Johnson, while waiting for a X delivery, was brutally killed"
//or "a X delivery driver, while on a routine delivery, was brutally killed"
const detailMonsterActions  = ()=>{
  return getActions(true)
}


getIntro = ()=>{

  let victim_details = detailVictimActions();
  let monster_details = detailMonsterActions();


  let templates = [`${capitalizeFirstLetter(monster_name)}, ${rand.pickFrom(monster_details)}, is alleged to have attacked ${primary_victim_name}, ${rand.pickFrom(victim_details)},  at the corner of ${corner1} and ${corner2} last night.`];
  if(crimeStatus === DEAD){
    templates.push(`${primary_victim_name},${rand.pickFrom(victim_details)}, was tragically killed. Authorities blame ${monster_name}, ${rand.pickFrom(monster_details)}.`);

  }else if (crimeStatus === MISSING){
    templates.push(`Authorities are asking for any information regarding the whereabouts of ${primary_victim_name}, ${rand.pickFrom(victim_details)}, last seen  in the  neighborhood of ${neighborhood} last night.`);


  }else{
    templates.push(`${primary_victim_name} in the local neighborhood of ${neighborhood} was attacked while ${rand.pickFrom(victim_details)} last night.`);

  }
  return rand.pickFrom(templates)
}




const getMiddle = () => {

  
  let victim_details = detailVictimActions();
  let monster_details = detailMonsterActions();
  const hollowReassurances = [`It is unclear if ${primary_victim_name} was on any mind altering substances.`,"Authorities say this is likely some form of hazing by local teens.","Local experts reassure the public that this is likely a mass hallucination."]

  let templates = [`According to witnesses, ${monster_name} ${monster_details} suddenly began to grow in size and change in appearance. Within minutes, they had become a terrifying monster, ${quick(MONSTER_DESC)}.`,`According to reports, ${monster_name} transformed into a monster, which is described as '${quick(MONSTER_DESC)}', was seen lurking in the shadows and peering into the windows of the home. Several neighbors reported feeling threatened by the creature's presence and called the police. It is unclear where it is at present.`];
  templates.push(`Eye witnesses, describing ${monster_name}, say ${quick(MONSTER_DESC)} Authorities were not available for comment. ${rand.pickFrom(hollowReassurances)}`)
  if(crimeStatus === DEAD){
    templates.push(`${monster_name},  before their death, reported that the monster ${monster_name} turned into seemed to have no awareness of its actions and appeared to be in a state of frenzy. Authorities arrived on the scene shortly thereafter and were able to subdue the creature, but not before it caused significant damage to the residence.`)

  }else if (crimeStatus === MISSING){
    templates.push(`Eye witnesses, describing the assailant, say ${quick(MONSTER_DESC)} Authorities were not available for comment. ${rand.pickFrom(hollowReassurances)}`)

  }else{
    templates.push(`${primary_victim_name},  who was able to escape with minor injuries, reported that the monster ${monster_name} had become seemed to have no awareness of its actions and appeared to be in a state of frenzy. Authorities arrived on the scene shortly thereafter and were able to subdue the creature, but not before it caused significant damage to the residence.`)
  }

  return rand.pickFrom(templates);

}


const getOutro = () => {
  let templates= [`${details?.restaurant_name} have released a statement saying that they bear no responsibility.`,
    `Police say that citizens should remain in their homes and they will be safe.`,
    `${details?.restaurant_name} could not be reached for comment.`,
  ];

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