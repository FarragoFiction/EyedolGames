
let container;


const tenMore = () => {
  for (let i = 0; i < 10; i++) {
    randomQuestion();
  }
}

/*
const PERSON = "person";
 const ADJ = "adj";
 const COMPLIMENT = "compliment";
 const INSULT = "insult";
 const SUPERMOVE = "supermove";
 const OBJECT = "object";
 const LOCATION = "location";
 const MEMORIES = "memories";
 const MENU = "menu";
 const CLASS = "CLASS";
 const ASPECT = "ASPECT";
 const CITYNAME = "CITYNAME";
 const CHILDBACKSTORY = "CHILDBACKSTORY";
 const GENERALBACKSTORY = "GENERALBACKSTORY";
 const MIRACLE = "MIRACLE";
 const SONG = "SONG";
 const PHILOSOPHY = "PHILOSOPHY";
 const LOC_DESC = "LOCATION DESCRIPTION";
 const MONSTER_DESC = "MONSTER DESCRIPTION";
 const SMELL = "SMELL";
 const TASTE = "TASTE";
 const FEELING = "FEELING";
 const SOUND = "SOUND";
 const EFFECTS = "EFFECTS";
 const WALL = "WALL";
 const FLOOR = "FLOOR";
 const FILTERS = "FILTERS";
 const THEME_OPINIONS = "THEME_OPINIONS";
 const WALLBACKGROUND = "WALLBACKGROUND";
 const WALLFOREGROUND = "WALLFOREGROUND";
 const FLOORBACKGROUND = "FLOORBACKGROUND";
 const FLOORFOREGROUND = "FLOORFOREGROUND";
 const SPRITES = "SPRITES";//birbs
*/
const randomPhrase = ()=>{
  if(panel_index ===113){
    return "Fine. Alright. You win. Maybe it's not all dead ends. Maybe it's not all pointless. I mean. Well. It is. Ultimately. But you can at least go somewhere new to kill time. <a href ='http://knucklessux.com/HydrationSim/'>Here you go</a>."
  }
  //console.log("JR NOTE: all_themes is", all_themes)
  const chosenThemeKey = pickFrom(Object.keys(all_themes));
  const chosenTheme = all_themes[chosenThemeKey];
  const person = chosenTheme.pickPossibilityFor(PERSON);
  const adj = chosenTheme.pickPossibilityFor(ADJ);
  const compliment = chosenTheme.pickPossibilityFor(COMPLIMENT);
  const insult = chosenTheme.pickPossibilityFor(INSULT);
  const supermove = chosenTheme.pickPossibilityFor(SUPERMOVE);
  const object = chosenTheme.pickPossibilityFor(OBJECT);
  const location = chosenTheme.pickPossibilityFor(LOCATION);

  const childbackstory = chosenTheme.pickPossibilityFor(CHILDBACKSTORY);
  const generalbackstory = chosenTheme.pickPossibilityFor(GENERALBACKSTORY);
  const miracle = chosenTheme.pickPossibilityFor(MIRACLE);
  const philosophy =chosenTheme.pickPossibilityFor(PHILOSOPHY);
  const loc_desc = chosenTheme.pickPossibilityFor(LOC_DESC);
  const monster_desc =chosenTheme.pickPossibilityFor(MONSTER_DESC);
  const smell = chosenTheme.pickPossibilityFor(SMELL);
  const taste = chosenTheme.pickPossibilityFor(TASTE);
  const feeling = chosenTheme.pickPossibilityFor(FEELING);
  const sound = chosenTheme.pickPossibilityFor(SOUND);
  const effects = chosenTheme.pickPossibilityFor(EFFECTS);
  const visualization_exercises = ["Another version of you wanders","Your soul is near","Think about","You are fated to encounter","Close your eyes and imagine","In your dreams you will see"]

 // console.log(`JR NOTE: chosenThemeKey ${chosenThemeKey},chosenTheme ${chosenTheme} smell ${smell}`, )
  const themed_phrases  = [
    `What do you think Zampanio would smell like. Like ${smell}, do you think?`
  , `Did you hear that? Was that the sound of ${sound}?`
  ,`I don't understand why you won't leave. What do you hope to gain? There is no ${object} at the end of this tunnel. No catharsis or secret wisdom. There is no point other than the journey itself. Is that what you crave? The act of travel in and of itself? Do you wish, in your heart of hearts, for Zampanio to never end?`
    ,`Have you tried looking for Zampanio at the ${location}?`
    ,`I bet you ${childbackstory}.`
    ,`Count the ${object} in a tree.`
    ,`${sentenceCase(object)} is a very good game, you should play it.`
    ,`I wonder if you ${generalbackstory}.`
    ,`I suspect you ${generalbackstory}.`
    ,`If I gave you a ${object}, even if it wasn't ${compliment}, would you copy this website and host it somewhere new? So it survives even past my death? I wouldn't mind if you changed it when you did so. Mutations are common in memes and I welcome that. Just let it live. Just let it be Zampanio.`
    ,"You have not truly experienced Zampanio. Oh, sure, you have dug and dug and dug until daylight is a hated  memory.  But no matter how much you dig you will not find Zampanio. Not until you start burying your own secrets down here, to show to others. Leave your Mark."
    ,"I want this, too, you know. For you to keep Zampanio alive in your thoughts. For you to spread it to others. It's not mine. I merely found it. But if I'm the only one aware of it... Isn't that so very lonely? I want to talk about it with you."
 , `Most people say that Zampanio tastes distinctly like ${taste}.`
 , `Would you finally stop if you gained the power to ${miracle}?`
  , `Would a ${person} be better at discovering Zampanio secrets than you? Even if they were ${insult}?`
    , `A ${compliment} person like you would know better than to keep scrolling, you'd think.`
    ,`It's okay. I understand the urge to dig and dig and dig and never stop even as ${effects}.`
    ,`Are you expecting something supernatural to happen? No. All that is happening is that you are making the decision to scroll forever. You are trapping yourself in a hell of your own creation. It's not even a maze. It's just. Here.`
    ,`Does the chair underneath you feel ${feeling}?`
    ,`A wise man once said "${philosophy}"`
    ,"It truly is endless, you know. Not just this page. Everything. Forever. Life has no neat and tidiy ends complete with a moral and the characters all safely returning to the stasis from which they were spawned. Toys returned to their box. No. Life is messy. Life is chaotic. Life is ever spreading. Live your life."
    ,`${pickFrom(visualization_exercises)} a place with ${loc_desc}. It will be a ${location}. You will find a  ${adj} ${object} nearby. Do not touch it.`
    ,`${pickFrom(visualization_exercises)} a place with ${loc_desc}. It will be a ${location}. You will find a ${object} nearby. Eat it.`
    ,`${pickFrom(visualization_exercises)} a place with ${loc_desc}.`
    ,`${pickFrom(visualization_exercises)} a place with ${loc_desc}. ${sentenceCase(effects)}.`
    ,`${pickFrom(visualization_exercises)} a place with ${loc_desc}. Lurking nearby will be a creature with your face. ${monster_desc}`




];
  return pickFrom(themed_phrases)
}



let question_index = 0;

const randomQuestion = () => {
  let html;
  generators = [randomRange,randomRadio, randomCheckbox,randomRadio, randomCheckbox,randomRadio, randomCheckbox, randomSelect]
  html = pickFrom(generators)();
  
  const ele = createElementWithClassAndParent("div", container, "question");
  ele.innerHTML = html;


}

const randomSelect = () => {
  const max = 10;
  const min = 3;
  const multiple = Math.random()>0.85? "multiple":"";
  const amount = getRandomNumberBetween(min, max) +getRandomNumberBetween(0, 15) ;
  let ill_advised_raw_html = `
    <div><label>${pickFrom(questions)}</label>
    <select ${multiple}>
  `

  for(let i =0; i< amount; i++){
    ill_advised_raw_html += `<option>${pickFrom(genders)}</option>`;
  }
  ill_advised_raw_html += '</select></div></div>'
  return ill_advised_raw_html;

}

const randomRange = () => {

  let ill_advised_raw_html = `
    <div><label>${pickFrom(questions)}</label>

  `
  ill_advised_raw_html += `<div class='horizontal-radio'><div>${pickFrom(genders)}</div><input type="range"></input><div>${pickFrom(genders)}</div></div>`;

  ill_advised_raw_html += '</div>'
  return ill_advised_raw_html;

}

const randomCheckbox = () => {
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);

  let ill_advised_raw_html = `
    <div><label>${pickFrom(questions)}</label>
    <div class="${pickFrom(['horizontal-radio','vertical-radio'])}">

  `

  for(let i =0; i< amount; i++){
    ill_advised_raw_html += `<div class='horizontal-radio'><input type="checkbox"></input><div>${pickFrom(genders)}</div></div>`;
  }
  ill_advised_raw_html += '</div></div>'
  return ill_advised_raw_html;

}

const randomRadio = () => {
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);

  let ill_advised_raw_html = `
    <div><label>${pickFrom(questions)}</label>
    <div class="${pickFrom(['horizontal-radio','vertical-radio'])}">

  `

  for(let i =0; i< amount; i++){
    ill_advised_raw_html += `<div class='horizontal-radio'><input type="radio"></input><div>${pickFrom(genders)}</div></div>`;
  }
  ill_advised_raw_html += '</div></div>'
  return ill_advised_raw_html;

}

window.onload = () => {
  container = document.querySelector("#container");
  initThemes();
  ele = document.querySelector("#infinite-scroll")
  tenMore();
}


window.onscroll = () => {
  window.requestAnimationFrame(() => {
    randomQuestion();
  });
};

