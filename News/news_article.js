let how_many_died = 1;
let neighborhood = "Northpoint"
let corner1 = "Main Street"
let corner2 = "First Street"
let customer_name = "an unidentified victim"
const DEAD = "DEAD";
const MISSING = "MISSING";
const INJURED = "INJURED";
let monster_name = "killer";
let victim_name = "victim";
let restaurant_name = "???"
let crimeStatus = MISSING; //certainty is hard to come by

const max_articles = 30;
let num_articles = 0;

let road_endings = ["Lane", "Highway", "Avenue", "Drive", "Road", "Crossing", "Street", "Boulevard"];


const handleScrolling = (container, rand, existing_keys) => {
  let lastScrollTime = 0; //not to spam events

  window.onscroll = () => {
    const newTime = new Date().getTime();
    if (((newTime - lastScrollTime)) < 1050) {
      return;
    }
    lastScrollTime = newTime;

    window.requestAnimationFrame(() => {
      renderOneNewsArticle();

    });

  };
}

const renderOneNewsArticle = ()=>{
  num_articles++;
  //it gets weirder but not like, terribly weirder. its already weird
  chosen_extra_themes.push(rand.pickFrom(Object.keys(all_themes)));
  const parent = document.querySelector("body");

  const article = createElementWithClassAndParent("div",parent,"article");
  article.innerHTML = `
  <div class="article">
  <div class="content"><h2 class="headline">Test</h2>
  <p>In a shocking turn of events, the Baker's Restaurant driver, was in the process of delivering food to Adam Gently, transformed into a monstrous creature and attacked Adam Gently, waiting for a Baker's Restaurant delivery, notably featuring a flavorful Delicious Roll.</p><p>Eye witnesses, describing the Baker's Restaurant driver, say it has a red rubber clown nose. Authorities were not available for comment. Authorities say this is likely some form of hazing by local teens.</p><p>It is currently unclear where Adam Gently or even the Baker's Restaurant driver is. </p><p>When authorities arrived on the scene, the monster had fled the area, but not before causing considerable damage to the exterior of the building. It is currently unknown what the monster was trying to accomplish by its actions or where it has gone.</p><p>Eye witnesses, describing the Baker's Restaurant driver, say it dripped rotten eggs as it walked. Authorities were not available for comment. Authorities say this is likely some form of hazing by local teens.</p></div>

  <a target="blank" href="http://eyedolgames.com/Zampanini?name=Baker%27s+Restaurant&amp;themes=Bakery&amp;feeUnder=21&amp;victim=Adam+G+" class="link3">
    <img class="left" src="http://eyedolgames.com/Zampanini/images/Bakery/00146-img_20230101202953.png" style="object-fit: none;">
    <div class="center" style="background-color: rgb(68, 92, 98);"><div class="logo">😸</div><div class="restaurant_name">Baker's Restaurant</div><div class="slogan">Powered by Zampanini. Funny. Every time.</div></div>
    <img class="right" src="http://eyedolgames.com/Zampanini/images/Bakery/00065-img_20221231212905.png" style="object-fit: none;">
  </a>
  <p>
  </p><div class="more-content"><p>According to witnesses, the Baker's Restaurant driver has not yet been identified suddenly began to grow in size and change in appearance. Within minutes, they had become a terrifying monster, it wore a baker's hat and dragged a long rolling pin behind it embedded with spikes..</p><p>Eye witnesses, describing the assailant, say it wore a baker's hat and dragged a long rolling pin behind it embedded with spikes. Authorities were not available for comment. It is unclear if Adam Gently was on any mind altering substances.</p><p>Eye witnesses, describing the Baker's Restaurant driver, say it wore a baker's hat and dragged a long rolling pin behind it embedded with spikes. Authorities were not available for comment. It is unclear if Adam Gently was on any mind altering substances.</p><p>When authorities arrived on the scene, the monster had fled the area, but not before causing considerable damage to the exterior of the building. It is currently unknown what the monster was trying to accomplish by its actions or where it has gone.</p><p>It is unclear at this time what caused the Baker's Restaurant driver to transform into a monster or how many other potential victims besides Adam Gently there are. The investigation into the incident is ongoing, and authorities are urging residents to be vigilant and to report any unusual activity to the police. Police say that citizens should remain in their homes and they will be safe.</p></div>
</div>`

  fleshOutNewsArticle(article);
  setUpMiddleAD(article.querySelector(".link3"))

}
const initialize_details = () => {
  handleScrolling();
  restaurant_name = details.restaurant_name;
  how_many_died = rand.getRandomNumberBetween(1, 8);
  customer_was_monster = rand.nextDouble() > 0.75;
  crimeStatus = rand.pickFrom([MISSING,MISSING,MISSING,MISSING,DEAD,INJURED]);

  if(reviewer){
    customer_name = `${reviewer.split(" ")[0]} ${rand.pickFrom(filterMatches(last_names, new RegExp(reviewer.split(" ")[1])))}`
  }
  monster_name = pickFrom([customer_name, `the ${restaurant_name} driver`,`the ${restaurant_name} driver`,`the ${restaurant_name} driver`])

  if(monster_name === customer_name){
    victim_name = `the ${restaurant_name} driver`;
  }else{
    victim_name = customer_name;
  }

  corner1 = `${quick(OBJECT, true)} ${rand.pickFrom(road_endings)}`;
  corner2 = `${quick(PERSON, true)} ${rand.pickFrom(road_endings)}`;
  neighborhood = `${quick(ADJ, true)} ${quick(OBJECT,true)}`;
  const headline = document.querySelector(".headline");
  headline.innerText = getHeadline();

}

const getHeadline = () => {
  let templates = [];
  if(num_articles>max_articles){
    return "Zampanio Awaits";
  }
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
  for(let i = 0; i<10; i++){
    renderOneNewsArticle();
  }
}

const fleshOutNewsArticle = (ele) => {


  const innerHeadline = ele.querySelector(".headline");
  innerHeadline.innerText = getHeadline();

  const content = ele.querySelector(".content");
  content.innerText = "";
  content.append(innerHeadline);
  handleFirstSection(content);

  const moreContent = ele.querySelector(".more-content");
  moreContent.innerText = "";

  handleSecondSection(moreContent);

}

const getActions = (monster)=>{

  if(num_articles>10){
    return [`was exposed to the Zampanio memetic hazard`,`heard the word 'Zampanio' somewhere once and mostly forgot about it until now`,`really enjoyed the Goncharov meme a while back`,"thinks the creepy pasta about Polybius is incredible","read house of leaves once and hasn't stopped thinking about it since","wishes they could create a never ending arg of connections and branches","wants to create branches of Zampanio of their own"]
  }

//i'm llking for the victim and the victim is the customer
  if(!monster && (victim_name === customer_name) || (monster && victim_name !== customer_name)) {
    return[`a resident of the local neighborhood of ${neighborhood}`,`waiting for a ${restaurant_name} delivery, notably featuring a flavorful ${details.item_name}`];
  }else{ //i'm looking for the victim and the victim is not the customer
    return  [`has not yet been identified`,`was in the process of delivering food to ${customer_name}`,`on a routine delivery`,`delivering to ${neighborhood}`,`making a ${details?.restaurant_name} delivery to a local residence on ${corner1} last night.`];
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
  if(num_articles >max_articles){
    return "Please Stop."
  }

  let victim_details = detailVictimActions();
  let monster_details = detailMonsterActions();


  let templates = [`${capitalizeFirstLetter(victim_name)}, in the suburban neighborhood of ${neighborhood} was attacked by a monstrous creature believed to be ${monster_name} while ${rand.pickFrom(victim_details)}.  `,`In a shocking turn of events, ${monster_name}, ${rand.pickFrom(monster_details)}, transformed into a monstrous creature and attacked ${victim_name}, ${rand.pickFrom(victim_details)}.`,`${capitalizeFirstLetter(monster_name)}, ${rand.pickFrom(monster_details)}, is alleged to have attacked ${victim_name}, ${rand.pickFrom(victim_details)},  at the corner of ${corner1} and ${corner2} last night.`];
  if(crimeStatus === DEAD){
    templates.push(`${victim_name},${rand.pickFrom(victim_details)}, was tragically killed. Authorities blame ${monster_name}, ${rand.pickFrom(monster_details)}.`);

  }else if (crimeStatus === MISSING){
    templates.push(`Authorities are asking for any information regarding the whereabouts of ${victim_name}, ${rand.pickFrom(victim_details)}, last seen  in the  neighborhood of ${neighborhood} last night.`);


  }else{
    templates.push(`According to ${victim_name},${rand.pickFrom(victim_details)}, when the monster emerged from the darkness and attacked them. ${victim_name} sustained serious injuries in the attack and is currently being treated at a local hospital.`)
    templates.push(`${capitalizeFirstLetter(victim_name)} ${rand.pickFrom(victim_details)} was attacked while ${rand.pickFrom(victim_details)} last night.`);

  }
  return rand.pickFrom(templates)
}




const getMiddle = () => {

  
  let victim_details = detailVictimActions();
  let monster_details = detailMonsterActions();
  const hollowReassurances = [`It is unclear if ${victim_name} was on any mind altering substances.`,"Authorities say this is likely some form of hazing by local teens.","Local experts reassure the public that this is likely a mass hallucination."]

  let templates = [`According to witnesses, ${monster_name}, ${rand.pickFrom(monster_details)}, suddenly began to grow in size and change in appearance. Within minutes, they had become a terrifying monster, ${quick(MONSTER_DESC)}`,`According to reports, ${monster_name} transformed into a monster, which is described as '${quick(MONSTER_DESC)}', was seen lurking in the shadows and peering into the windows of the home. Several neighbors reported feeling threatened by the creature's presence and called the police. It is unclear where it is at present.`];
  templates.push(`Eye witnesses, describing ${monster_name}, say ${quick(MONSTER_DESC)} Authorities were not available for comment. ${rand.pickFrom(hollowReassurances)}`)
  templates.push(`Eye witnesses say there is no possible way a ${details.item_name} could possibly be worth all of this.`)
  num_articles > 2 && templates.push("Observers wonder if you're still going to be scrolling forever.")
  num_articles > 4 && templates.push("Observers wonder if you're still going to be scrolling forever.")
  num_articles > 5 && templates.push("Observers wonder if you're still going to be scrolling forever.")
  num_articles > 6 && templates.push("Observers wonder if you're still going to be scrolling forever.")
  num_articles > 7 && templates.push("Observers wonder if you're still going to be scrolling forever.")
  num_articles > 8 && templates.push("Observers wonder if you're still going to be scrolling forever.")

  num_articles > 13 && templates.push("Local Authorities say that thoughts lie dormant outside a body. Encasing themselves in the hard shells of words to survive the desert of the inert. They wait, ever so patient for a warm and living mind to infect. You've been infected.")
  num_articles > 2 &&templates.push(`${capitalizeFirstLetter(victim_name)} could have been you. You paid your fee. They did not pay their fee.`)
  num_articles > 13 &&templates.push("Local Authorities say that Zampanio is a really fun game and you're already playing it.")


  if(crimeStatus === DEAD){
    templates.push(`According to eyewitnesses, ${victim_name} ${rand.pickFrom(victim_details)} when the monster suddenly appeared and dragged them away. The creature then proceeded to attack and kill the victim before disappearing into the night.`)
    templates.push(`${capitalizeFirstLetter(monster_name)},  before their death, reported that the monster ${monster_name} turned into seemed to have no awareness of its actions and appeared to be in a state of frenzy. Authorities arrived on the scene shortly thereafter and were able to subdue the creature, but not before it caused significant damage to the residence.`)
    num_articles > 2 && templates.push(`${capitalizeFirstLetter(victim_name)} is dead. Maybe they weren't dead before but you're here now and reading these words and the wave form is collapsed. Uncertainties become certainties and all because of you.`)
    num_articles > 3 &&templates.push(`${capitalizeFirstLetter(monster_name)} has become a killer. We will never know why. Not really. They can't talk anymore.`)

  }else if (crimeStatus === MISSING){
    templates.push(`When authorities arrived on the scene, the monster had fled the area, but not before causing considerable damage to the exterior of the building. It is currently unknown what the monster was trying to accomplish by its actions or where it has gone.`)
    templates.push(`Eye witnesses, describing the assailant, say ${quick(MONSTER_DESC)} Authorities were not available for comment. ${rand.pickFrom(hollowReassurances)}`)
    templates.push(`It is currently unclear where ${victim_name} or even ${monster_name} is. `)
    num_articles > 2 &&templates.push(`${capitalizeFirstLetter(victim_name)} could leave any time.`)
    num_articles > 3 &&templates.push(`${capitalizeFirstLetter(victim_name)} wanders Zampanio. They could leave any time. They know this. You know this. Why do they remain? Why do you?`)
    num_articles > 4 &&templates.push(`${capitalizeFirstLetter(victim_name)} wanders Zampanio. They could leave any time. They know this. You know this. Why do they remain? Why do you?`)
    num_articles > 5 &&templates.push(`${capitalizeFirstLetter(victim_name)} wanders Zampanio. They could leave any time. They know this. You know this. Why do they remain? Why do you?`)
    num_articles > 6 &&templates.push(`${capitalizeFirstLetter(victim_name)} wanders Zampanio. They could leave any time. They know this. You know this. Why do they remain? Why do you?`)
    num_articles > 7 &&templates.push(`${capitalizeFirstLetter(victim_name)} wanders Zampanio. They could leave any time. They know this. You know this. Why do they remain? Why do you?`)

  }else{
    templates.push(`${capitalizeFirstLetter(victim_name)},  currently hospitalized, is quoted as saying they never even want to see a ${details.item_name} again.`)
    templates.push(`${capitalizeFirstLetter(victim_name)} got off easy.`)
    num_articles > 2 &&templates.push(`${capitalizeFirstLetter(victim_name)} chose to leave. You could chose to leave too. You could be one of the lucky few.`)
    num_articles > 3 &&templates.push(`${capitalizeFirstLetter(victim_name)} wasn't the right sort of victim for Zampanio to digest.`)
    num_articles > 3 &&templates.push(`${capitalizeFirstLetter(victim_name)} decided to leave. They decided that they no longer wanted to obsess. You could decide this, too.`)

    templates.push(`${capitalizeFirstLetter(victim_name)},  who was able to escape with minor injuries, reported that the monster ${monster_name} had become seemed to have no awareness of its actions and appeared to be in a state of frenzy. Authorities arrived on the scene shortly thereafter and were able to subdue the creature, but not before it caused significant damage to the residence.`)
  }

  if(num_articles>max_articles){
    templates = [`It is ${new Date().toLocaleTimeString()} where you are. It is not too late. Please. Stop.`,"You can leave any time.", "Just leave.","You do not get it yet. The Truth is I hurt people. Just leave. While you still can."]
  }

  return rand.pickFrom(templates);

}


const getOutro = () => {
  if(num_articles >max_articles){
    return "Please Stop."
  }
  let templates= [`The ${restaurant_name} restaurant has been closed indefinitely as a result of the incident, and authorities are advising residents to stay vigilant and report any suspicious activity to the police.`,`Authorities are urging residents to be on the lookout for the monster and to report any sightings to the police immediately. In the meantime, the ${restaurant_name} restaurant has been closed while drivers are retrained and is expected to reopen within the next week.`,`This is the second monster attack to occur in the ${neighborhood} neighborhood in the past month, and residents are understandably on edge. `,`It is unclear at this time what caused ${monster_name} to transform into a monster or how many other potential victims besides ${victim_name} there are. The investigation into the incident is ongoing, and authorities are urging residents to be vigilant and to report any unusual activity to the police.`
  ];

  let templates2= [`Our thoughts and condolences go out to the victims's family and loved ones during this difficult time.`,`Authorities are urging people to be cautious and to report any suspicious activity to the police.`,`The investigation is ongoing.`,`${details?.restaurant_name} have released a statement saying that they bear no responsibility.`,
    `Police say that citizens should remain in their homes and they will be safe.`,
    `${details?.restaurant_name} could not be reached for comment.`,
  ];

  return `${rand.pickFrom(templates)} ${rand.pickFrom(templates2)}`;
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