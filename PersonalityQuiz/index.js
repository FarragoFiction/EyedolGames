
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

const deployGender = () => {
  let form = document.querySelector("#zampanio-personality-form");
  let data = new FormData(form);
  const responses = data.values();
  const themes = {}
  for (let response of responses) {
    console.log("JR NOTE: ", response)
    if (response && response !== undecided) {
      if (themes.hasOwnProperty(response)) {
        themes[response] = themes[response] + 1;
      } else {
        themes[response] = 1
      }
    }
  }

  let array_themes = Object.keys(themes).map((item) => {
    return ({ key: item, value: themes[item] })
  });
  let sortedResults = array_themes.sort((a, b) => b.value - a.value);
  let antiSortedResults = array_themes.sort((a, b) => a.value - b.value);

  let results = sortedResults.splice(0, 3).map((item) => item.key);
  //your nemesis
  let antiResults = antiSortedResults.splice(0, 3).map((item) => item.key);
  let seed = Array.from(data.entries()).length + (Object.keys(themes).length * 100000);
  //(`After careful consideration: Your personality is: ${results.join(",")}. Your enemies personality is ${antiResults.join(",")}`);
  updateURLParams(`seed=${seed}&your_themes=${results.join(",")}&your_rivals_themes=${antiResults}`)
  window.location.reload();
}

const answerMode = (seed, your_themes, your_rivals_themes) => {
  const body = document.querySelector("body");
  body.innerHTML = ""
  const content = createElementWithClassAndParent("div", body, "container");
  if (your_themes && your_rivals_themes) {
    generateResult(seed, your_themes, your_rivals_themes, content);
  } else {
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



const generateResult = (seedRaw, your_themes_raw, your_rivals_themes_raw, content) => {

  const rand = new SeededRandom(parseInt(seedRaw));
  const your_themes = your_themes_raw.split(",");
  const your_rivals_themes = your_rivals_themes_raw.split(",");

  const name = pickARandomThemeFromListAndGrabKey(rand, your_themes, PERSON, true);
  const personal_adj = pickARandomThemeFromListAndGrabKey(rand, your_themes, ADJ, true);
  content.innerHTML = `
    <div id ="result">
     <div id="result-title">Your Result: </div>
     <div id="result-name"> ${titleCase(`${personal_adj} ${name}`)}</div>
      <div id ="ramble">${generateRamble(name, personal_adj, rand, your_themes, your_rivals_themes)}</div>
      
      <div><a href='http://farragofiction.com/CatalystsBathroomSim/NORTH/NORTH/NORTH/NORTH/NORTH/bathroom.html${window.location.search}'>Play</a> Your Game?</div>
      <div id="result-link"><label>Link To Your Result: <input id="share-link" value="${window.location.href}" type="text"></input></label>
      </div>

      <button onclick="window.location.href='/PersonalityQuiz'">Take Quiz?</button>

    </div>
  `;

}

const generateRamble = (name, personal_adj, rand, your_themes, your_rivals_themes) => {
  console.log("JR NOTE: generateRamble", name, personal_adj, your_themes, your_rivals_themes)
  const quick = pickARandomThemeFromListAndGrabKey;
  const youQ = (key, cap) => quick(rand, your_themes, key, cap)
  const rivalQ = (key, cap) => quick(rand, your_rivals_themes, key, cap)

  let ret = "";
  const rival_name = pickARandomThemeFromListAndGrabKey(rand, your_rivals_themes, PERSON, true);
  const rival_personal_adj = pickARandomThemeFromListAndGrabKey(rand, your_rivals_themes, ADJ, true);

  const you = `${personal_adj} ${name}`;
  const rival = `${rival_personal_adj} ${rival_name}`;

  const intro_templates = [
    `${pickARandomThemeFromListAndGrabKey(rand, your_themes, COMPLIMENT, true)} but never ${pickARandomThemeFromListAndGrabKey(rand, your_themes, INSULT, false)}, you always do what you think is right.`
    , `${pickARandomThemeFromListAndGrabKey(rand, your_themes, COMPLIMENT, true)} but never ${pickARandomThemeFromListAndGrabKey(rand, your_themes, INSULT, false)}, you strive to improve yourself constantly.`
    , `${pickARandomThemeFromListAndGrabKey(rand, your_themes, COMPLIMENT, true)} on the outside, you always fear that you might secretly be ${pickARandomThemeFromListAndGrabKey(rand, your_themes, INSULT, false)}.`

    , `${pickARandomThemeFromListAndGrabKey(rand, your_themes, COMPLIMENT, true)} yet somehow never ${pickARandomThemeFromListAndGrabKey(rand, your_rivals_themes, INSULT, false)}, you never give up.`
  ];

  const nextPartTemplates = [
    `You yearn to live in a ${quick(rand, your_themes, LOCATION)} but worry it might be ${quick(rand, your_rivals_themes, INSULT)}.`,
    `You'd be highly compatible with any ${quick(rand, your_themes, PERSON)}, so long as they aren't ${quick(rand, your_rivals_themes, INSULT)}.`,
    `Make sure to avoid going to the ${quick(rand, your_rivals_themes, LOCATION)}.`,
    `You would never be caught going to the ${quick(rand, your_rivals_themes, LOCATION)}.`,

  ]

  const fortune = [
    `Your lucky location is the ${quick(rand, your_themes, LOCATION)}.`,
    `Avoid being around any ${quick(rand, your_rivals_themes, PERSON)}s.`,
    `You might find it useful to collect ${quick(rand, your_themes, OBJECT)}s. `,
    `An unexpected ${quick(rand, your_themes, OBJECT)} will prove useful to you. `,
    `An unlucky ${quick(rand, your_rivals_themes, OBJECT)} will be your downfall if you're not careful.`,
  ]

  const shitGetsWeirdTemplates = [
    `You are destined to find yourself in a  ${quick(rand, your_themes, LOCATION)}, ${quick(rand, your_rivals_themes, LOC_DESC)}, with only a  ${quick(rand, your_themes, OBJECT)} to defend yourself with. You will be surrounded by creatures, lead by a monstrous ${quick(rand, your_rivals_themes, PERSON)}, ${quick(rand, your_rivals_themes, MONSTER_DESC)}
        Do not worry. Unexpected friends will present themselves in the form of a ${rival_personal_adj} ${rival_name}. At first you will think they are too ${quick(rand, your_rivals_themes, INSULT)}, but in time you will see that they can be ${quick(rand, your_rivals_themes, COMPLIMENT)}, too.
      `
      ,`Look. I'm not gonna tell you how to handle your business. But you should at least CONSIDER making up with the ${rival}. I know they annoy you. I know they are ${rivalQ(INSULT)}, even. But you're going to need them if you want to make it all the way to the ${youQ(LOCATION)}, that's just how it is.`
      ,`I can not emphasize enough that you should, under no circumstances, trust the ${rival}. Look. They are literally built from all the traits you LEAST like. How could that possibly be trustworthy? It'd be like trusting a ${rivalQ(OBJECT)}. Don't do it. Take your ${youQ(OBJECT)} and go as far away as you can to protect it.  Maybe look for the ${youQ(LOCATION)}.`
      ,`There will be a gentle rain outside the ${youQ(OBJECT)}... It will be alright, you'll think to yourself. After everything that happened with the ${rival}, maybe you can bring yourself to trust again. You'll clutch the ${rivalQ(OBJECT)} close to your chest and think of better times as the rain pours down your face. `
      ,`Did you know that underneath the ${youQ(OBJECT)} you can find a ${rivalQ(OBJECT)}? If you destroy it, the ${rival} activates rage mode and you get a MUCH easier boss fight.`
      ,`I'm so sorry. You're soft-locked here. You won't be able to progress without restarting. If only you had picked up the ${youQ(OBJECT)} back at the ${youQ(LOCATION)}... It's okay though. The friends you made will always remember you, even the ${rival}. You can stop playing, now.`
      ,`There will be ${youQ(OBJECT)} hidden in the ${youQ(LOCATION)}. Don't let yourself accidentally pick up the ${rivalQ(OBJECT)}, that one's a trap. Once you've got it, you need to make your way to the ${rivalQ(LOCATION)} and do everything in your power to destroy it. Yes, the ${rival} is going to try to stop you. The ${youQ(PERSON)} should be able to help, if you did all their side-quests.`
    , `You will meet the ${rival}. They ${rivalQ(GENERALBACKSTORY)}. You'll hate it. Try to ignore it for now. You'll need to work with them long enough to placate the ${youQ(PERSON)}s. My suggestion is try using any ${youQ(OBJECT)} you find a way, especially if its ${youQ(ADJ)}.`
    , `You're right not to trust the ${rival}. Their shadow is dangerous, ${rivalQ(MONSTER_DESC)} Don't be fooled. That is only the start of the problems. Find a ${youQ(OBJECT)} and do what it takes to make it ${youQ(ADJ)} and you might have a chance.`
    , `As the ${you}, some might say you are less ${personal_adj} and more ${youQ(INSULT)}. You'll need to fix this. Find the ${rival}. Yes, they're annoying. Deal with it. They'll require a worthy ${rivalQ(OBJECT)} to join your party. It's worth it. They're easy to find in the ${youQ(LOCATION)}, but only after you've defeated the terrifying ${rivalQ(PERSON)}, be careful, ${rivalQ(MONSTER_DESC)} Once the ${rival}'s curse is broken, everything falls into place.`
    , `When the old ${youQ(PERSON)} whispers to you that '${youQ(PHILOSOPHY)}', you'll know it's started. Don't resist it. Let yourself feel the fact that ${youQ(EFFECTS)}. It will be okay. You need to find the ${youQ(OBJECT)}. It will all make sense from there.`
    , `You'll find it in a  ${quick(rand, your_rivals_themes, LOCATION)}. I know, I know, you've never even been to one. Don't worry about it. Focus on putting one foot in front of the other. Inside you will find the  ${quick(rand, your_themes, OBJECT)}. Make sure you don't lose it. The ${rival} will be searching for you at that point, and will stop at nothing to find it. You're going to need to learn  ${quick(rand, your_themes, SUPERMOVE, true)}, if only so you can cancel the ${rival}'s ${quick(rand, your_rivals_themes, SUPERMOVE, true)}. I know you can do this. Good luck.`
    , `Be still. Listen carefully. You need to go North, untill you reach the ${quick(rand, your_themes, LOCATION)}. No, don't ask questions. Listen. There you will meet a ${quick(rand, your_themes, PERSON)}. Do NOT kill them. Instead listen to what they have to say and agree to whatever they want. This will lead you to the ${rival_personal_adj} ${name}. Do what you have to do become the Last ${name}.`
    , `You will find yourself able to ${quick(rand, your_rivals_themes, MIRACLE)}. Do not be fooled. This is a curse. You will need to find the ${quick(rand, your_themes, PERSON, true)} of the ${quick(rand, your_themes, LOCATION, true)} and win their favor in order to gain your true power:  ${quick(rand, your_themes, MIRACLE)}. You will need this to defeat the ${rival_personal_adj} ${rival_name}.`
    , `When you find yourself in another world, you won't know what to do with the ${quick(rand, your_themes, OBJECT)} you find in your pocket. Hold onto it. Befriend the local ${quick(rand, your_themes, PERSON)}s and slowly solidify your power base. If you can manage to learn a spell that causes ${quick(rand, your_themes, EFFECTS)}, all the better. Eventually, you will be able to defeat the ${rival_personal_adj} ${rival_name}. Don't celebrate. You will still have a long way to go from being just the ${personal_adj} ${name}  and securing your fate as the Ultimate ${name}.`
  ]

  ret += `${rand.pickFrom(intro_templates)} ${rand.pickFrom(nextPartTemplates)} ${rand.pickFrom(fortune)}<hr> ${rand.pickFrom(shitGetsWeirdTemplates)}`;


  return ret;
}

//very shitty hax
const haxMode = ()=>{
  //let form = document.querySelector("#zampanio-personality-form");
  //let data = new FormData(form);
  let inputs = document.querySelectorAll("input");
  for(let input of inputs){
    if(Math.random() > 0.75){
      input.selected = !input.selected;
      input.checked = !input.checked;
    }
  }
}

const quizMode = () => {
  ele = document.querySelector("#infinite-scroll")
  hax = document.querySelector("#hax");
  tenMore();
  const gender_button = document.querySelector("#gender-button");
  console.log("JR NOTE: gender button", gender_button)
  gender_button.onclick = () => {
    deployGender();
  }

  if(hax){
    hax.onclick = ()=>{
      haxMode();
    }
  }

  window.onclick = () => {
    const audio = document.querySelector("#audio");
    if (!audio.playing) {
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
  if (your_themes != null && your_rivals_themes != null) {
    answerMode(seed, your_themes, your_rivals_themes);
  } else {
    quizMode();

  }


}



