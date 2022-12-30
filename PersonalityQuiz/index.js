
let container;
//look, wanda likes gender, okay?

const tenMore = () => {
  for (let i = 0; i < 10; i++) {
    randomQuestion();
  }
}



//global variables are a sin and i'm sinning on purpose tonight
let question_index = 0;
let number_clicks = 0;

const deployGender = ()=>{
   let form = document.querySelector("#zampanio-personality-form");
   let data = new FormData(form);
   const responses = data.values();
   const themes = {}
  for(let response of responses){
    console.log("JR NOTE: ",response)
    if(response && response !== undecided){
      if(themes.hasOwnProperty(response)){
        themes[response] =  themes[response] + 1;
      }else{
        themes[response] = 1
      }
    }
  }
  
  let array_themes = Object.keys(themes).map((item)=>{
    return ({key:item, value: themes[item] })
  });
  let sortedResults = array_themes.sort((a,b)=> b.value -a.value);
  let antiSortedResults = array_themes.sort((a,b)=> a.value -b.value);

  let results = sortedResults.splice(0,5).map((item)=>item.key);
  //your nemesis
  let antiResults = antiSortedResults.splice(0,5).map((item)=>item.key);
  let seed = Array.from(data.entries()).length + (Object.keys(themes).length * 100000);
  //(`After careful consideration: Your personality is: ${results.join(",")}. Your enemies personality is ${antiResults.join(",")}`);
  updateURLParams(`seed=${seed}&your_themes=${results.join(",")}&your_rivals_themes=${antiResults}`)
  window.location.reload();
}

const answerMode = (seed,your_themes,your_rivals_themes)=>{
  const body = document.querySelector("body");
  body.innerHTML = ""
  const content = createElementWithClassAndParent("div",body, "container");
  if(your_themes && your_rivals_themes){
    generateResult(seed,your_themes,your_rivals_themes,content);
  }else{
    content.innerHTML = `
    <p>...</p>
      <p>Did you really think you could just...</p>
      <p>Do nothing.</p>
      <p>And learn anything about yourself?</p>
      <p>Did you think introspection is unneeded to see your very soul?</p>
      <p>Or did you instead know the creeping truth.</p>
      <p>There is nothing inside.</p>
      <p>It is all reflected light.</p>
      <p>You are just a satellite.</p>
      <button onclick="window.location.href='/PersonalityQuiz'">Try Again.</button>

    `;
  }
}

const generateResult = (seedRaw,your_themes_raw,your_rivals_themes_raw,content)=>{
  console.log("JR NOTE:", {seedRaw})

  const rand = new SeededRandom(parseInt(seedRaw));
  const your_themes = your_themes_raw.split(",");
  const your_rivals_themes = your_themes_raw.split(",");

  const name = pickARandomThemeFromListAndGrabKey(rand,your_themes, PERSON,true);
  const personal_adj = pickARandomThemeFromListAndGrabKey(rand,your_themes, ADJ,true);
  content.innerHTML = `
    <div id ="result">
     <div id="result-title">Your Result: </div>
     <div id="result-name"> ${titleCase(`${personal_adj} ${name}`)}</div>
      <div id ="ramble">${generateRamble(name, personal_adj, rand,your_themes,your_rivals_themes)}</div>
      <div id="result-link"><label>Link To Your Result: <input value="${window.location.href}" type="text"></input></label></div>

      <button onclick="window.location.href='/PersonalityQuiz'">Take Quiz?</button>

    </div>
  `;

}

const generateRamble= (name, personal_adj, rand,your_themes,your_rivals_themes)=>{
  
  const quick = pickARandomThemeFromListAndGrabKey;
  let ret = "";
  const rival_name = pickARandomThemeFromListAndGrabKey(rand,your_rivals_themes, PERSON,true);
  const rival_personal_adj = pickARandomThemeFromListAndGrabKey(rand,your_rivals_themes, ADJ,true);

  
  const intro_templates = [
    `${pickARandomThemeFromListAndGrabKey(rand,your_themes, COMPLIMENT,true)} but never ${pickARandomThemeFromListAndGrabKey(rand,your_themes, INSULT,false)}, you always do what you think is right.`
    ,`${pickARandomThemeFromListAndGrabKey(rand,your_themes, COMPLIMENT,true)} but never ${pickARandomThemeFromListAndGrabKey(rand,your_themes, INSULT,false)}, you strive to improve yourself constantly.`
    ,`${pickARandomThemeFromListAndGrabKey(rand,your_themes, COMPLIMENT,true)} on the outside, you always fear that you might secretly be ${pickARandomThemeFromListAndGrabKey(rand,your_themes, INSULT,false)}.`

    ,`${pickARandomThemeFromListAndGrabKey(rand,your_themes, COMPLIMENT,true)} and ${pickARandomThemeFromListAndGrabKey(rand,your_themes, COMPLIMENT,false)}, you never give up.`
  ];

  const nextPartTemplates  = [
    `You yearn to live in a ${quick(rand,your_themes,LOCATION)} but worry it might be ${quick(rand,your_rivals_themes, INSULT)}.`,
    `You'd be highly compatible with any ${quick(rand,your_themes,PERSON)}, so long as they aren't ${quick(rand,your_rivals_themes, INSULT)}.`,
    `Make sure to avoid going to the ${quick(rand,your_rivals_themes, LOCATION)}.`,
    `You would never be caught going to the ${quick(rand,your_rivals_themes, LOCATION)}.`,

  ]

  const shitGetsWeirdTemplates  = [
      `You are destined to find yourself in a  ${quick(rand,your_themes,LOCATION)}, ${quick(rand,your_rivals_themes, LOC_DESC)}, with only a  ${quick(rand,your_themes,OBJECT)} to defend yourself with. You will be surrounded by creatures, lead by a monstrous ${quick(rand,your_rivals_themes, PERSON)}, ${quick(rand,your_rivals_themes, MONSTER_DESC)}
        Do not worry. Unexpected friends will present themselves in the form of a ${rival_personal_adj} ${rival_name}. At first you will think they are too ${quick(rand, your_rivals_themes, INSULT)}, but in time you will see that they can be ${quick(rand, your_rivals_themes, COMPLIMENT)}, too.
      `,
      `When you find yourself in another world, you won't know what to do with the ${quick(rand,your_themes,OBJECT)} you find in your pocket. Hold onto it. Befriend the local ${quick(rand,your_themes,PERSON)}s and slowly solidify your power base. If you can manage to learn a spell that causes ${quick(rand,your_themes,EFFECTS)}, all the better. Eventually, you will be able to defeat the ${rival_personal_adj} ${rival_name}. Don't celebrate. You will still have a long way to go from being just the ${personal_adj} ${name}  and securing your fate as the Ultimate ${name}.`
  ]

  ret += `${rand.pickFrom(intro_templates)} ${rand.pickFrom(nextPartTemplates)}<hr> ${rand.pickFrom(shitGetsWeirdTemplates)}`;


  return ret;
}

const quizMode=()=>{
  ele = document.querySelector("#infinite-scroll")
  tenMore();
  const gender_button = document.querySelector("#gender-button");
  console.log("JR NOTE: gender button", gender_button)
  gender_button.onclick = () => {
    deployGender();
  }

  
window.onclick = () => {
  const audio = document.querySelector("#audio");
  if(!audio.playing){
    audio.play();
  }
  number_clicks++;
}

  window.onscroll = () => {
    window.requestAnimationFrame(() => {
      randomQuestion();
    });
  };
}

window.onload = () => {
  const audio = document.querySelector("#audio");
  audio.volume = .2;
  container = document.querySelector("#container");
  initThemes();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let your_themes = urlParams.get('your_themes');
  let seed = urlParams.get('seed');

  let your_rivals_themes = urlParams.get('your_rivals_themes');
  console.log("JR NOTE: your_themes", your_themes)
  if(your_themes != null && your_rivals_themes !=null){
    answerMode(seed,your_themes,your_rivals_themes );
  }else{
    quizMode();

  }

  
}



