
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
const REALLYRandomGenders = ()=>{

  const chosenThemeKey = pickFrom(Object.keys(all_themes));
  const chosenTheme = all_themes[chosenThemeKey];
  const person =  titleCase(chosenTheme.pickPossibilityFor(PERSON));
  const adj =  titleCase(chosenTheme.pickPossibilityFor(ADJ));
  const compliment =  titleCase(chosenTheme.pickPossibilityFor(COMPLIMENT));
  const insult =  titleCase(chosenTheme.pickPossibilityFor(INSULT));
  const supermove =  titleCase(chosenTheme.pickPossibilityFor(SUPERMOVE));
  const object =  titleCase(chosenTheme.pickPossibilityFor(OBJECT));
  const location =  titleCase(chosenTheme.pickPossibilityFor(LOCATION));
  const philosophy =  titleCase(chosenTheme.pickPossibilityFor(PHILOSOPHY));

  const childbackstory =  titleCase(chosenTheme.pickPossibilityFor(CHILDBACKSTORY));
  const generalbackstory =  titleCase(chosenTheme.pickPossibilityFor(GENERALBACKSTORY));
  const miracle =  titleCase(chosenTheme.pickPossibilityFor(MIRACLE));
  const loc_desc =  titleCase(chosenTheme.pickPossibilityFor(LOC_DESC));
  const monster_desc = titleCase(chosenTheme.pickPossibilityFor(MONSTER_DESC));
  const smell =  titleCase(chosenTheme.pickPossibilityFor(SMELL));
  const taste =  titleCase(chosenTheme.pickPossibilityFor(TASTE));
  const feeling =  titleCase(chosenTheme.pickPossibilityFor(FEELING));
  const sound =  titleCase(chosenTheme.pickPossibilityFor(SOUND));
  const effects =  titleCase(chosenTheme.pickPossibilityFor(EFFECTS));

  const moreNormal = [supermove,sound,smell,taste,feeling,person,adj,compliment,insult,object,location];
  const lessNormal = [philosophy,childbackstory,generalbackstory,effects,monster_desc,loc_desc,miracle];
  let ret = [];
  //varies up how likely it is to be WEIRD.
  for(let i =0; i< question_index%13; i++){
    if(i===3){
      ret = ret.concat(lessNormal);
    }else{
      ret = ret.concat(moreNormal);

    }
  }
  console.log("JR NOTE: ret is",ret)

  return ret;
}


//global variables are a sin and i'm sinning on purpose tonight
let question_index = 0;

const gender_source = ()=>{
  if(question_index <3){
    return lameGenders;
  }else if (question_index< 35){
    return lameGenders.concat(genders);
  }else if (question_index< 1113){
    return lameGenders.concat(genders).concat(REALLYRandomGenders());
  }else{
    return ["Zampanio","Zampanio","Zampanio","Zampanio","Zampano","Goncharov","Pamzino","Zampanio","Zampanini","Zampiano"]
  }
}


const randomQuestion = () => {
  let html;
  question_index ++;
  let generators = [randomRadio, randomCheckbox,randomRadio, randomCheckbox,randomRadio, randomCheckbox]
  if(question_index > 13){  
    generators.push(randomRange);
  }
  if(question_index > 33){  
    generators.push(randomSelect);
  }
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
    <div><label>${question_index}:${pickFrom(questions)}</label>
    <select ${multiple}>
  `

  for(let i =0; i< amount; i++){
    ill_advised_raw_html += `<option>${pickFrom(gender_source())}</option>`;
  }
  ill_advised_raw_html += '</select></div></div>'
  return ill_advised_raw_html;

}

const randomRange = () => {

  let ill_advised_raw_html = `
    <div><label>${question_index}: ${pickFrom(questions)}</label>

  `
  ill_advised_raw_html += `<div class='horizontal-radio'><div>${pickFrom(gender_source())}</div><input type="range"></input><div>${pickFrom(genders)}</div></div>`;

  ill_advised_raw_html += '</div>'
  return ill_advised_raw_html;

}

const randomCheckbox = () => {
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);

  let ill_advised_raw_html = `
    <div><label>${question_index}: ${pickFrom(questions)}</label>
    <div class="${pickFrom(['horizontal-radio','vertical-radio'])}">

  `

  for(let i =0; i< amount; i++){
    ill_advised_raw_html += `<div class='horizontal-radio'><input type="checkbox"></input><div>${pickFrom(gender_source())}</div></div>`;
  }
  ill_advised_raw_html += '</div></div>'
  return ill_advised_raw_html;

}

const randomRadio = () => {
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);

  let ill_advised_raw_html = `
    <div><label>${question_index}: ${pickFrom(questions)}</label>
    <div class="${pickFrom(['horizontal-radio','vertical-radio'])}">

  `

  for(let i =0; i< amount; i++){
    ill_advised_raw_html += `<div class='horizontal-radio'><input type="radio"></input><div>${pickFrom(gender_source())}</div></div>`;
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

