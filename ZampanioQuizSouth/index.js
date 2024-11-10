
let container;
//look, wanda likes gender, okay?

const tenMore = () => {
  for (let i = 0; i < 10; i++) {
    randomQuestion();
  }
}
let images = [];


//global variables are a sin and i'm sinning on purpose tonight
let question_index = 0;
let answer_index = 0;
let number_clicks = 0;
//https://archiveofourown.org/works/60424984

/*
im playtesting the finished quiz and i think its funny that
at least with my bad memory
i genuinely can scroll forever and not realize for a bit its repeating
classic zampanio experience
*/
const linksRaw = `https://archiveofourown.org/works/41083818
https://archiveofourown.org/works/50380276
https://archiveofourown.org/works/52988767
https://spiralsrest.neocities.org/versions
https://www.youtube.com/watch?v=SB3YZoJjYL4&t=7395s
https://www.tumblr.com/crimsondestroyer/744058914575908864/tell-me-about-zampanio?source=share
http://farragofiction.com/4673
https://lostinzampanio.neocities.org/glossary
http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/dreams.pdf
http://knucklessux.com/PuzzleBox/Secrets/WatcherOfThreads/testimonies_of_the_marked.pdf
https://crimsondestroyer.tumblr.com/post/744058914575908864/tell-me-about-zampanio
https://www.tumblr.com/zampanio/730798476938674176/welcome-in
https://existentialterror.tumblr.com/post/755207000752865280/arg-notes-zampaniosim
https://existentialterror.tumblr.com/post/759672297151987712/arg-notes-zampaniosim-part-2
https://wore-a-fevreer.tumblr.com/post/725131943812923392/i-am-zampanio-it-suckles-on-my-veins-it-sucks
https://discord.com/channels/886249252303556668/1028031618989961258/1028032308554518658
https://tvtropes.org/pmwiki/pmwiki.php/VideoGame/ZampanioSim
http://farragofiction.com/ZampanioEyes4/BookOfX0/
https://crimsondestroyer.tumblr.com/post/722821743842082820/it-has-occurred-to-me-that-ive-never-actually
https://verbosebabbler.tumblr.com/post/693198522796965888/zampanio-and-the-history-of-games
https://discord.com/channels/886249252303556668/901173600764198912/1284021429670776852
https://docs.google.com/document/d/1-H-870XaByD4Ecxu_HTn3udlPa-M1HaKVnWiAkAX0vE/edit?tab=t.0#heading=h.9lrntiht27hd
https://discord.com/channels/886249252303556668/905499066530676767/1262740819354320957
http://knucklessux.com/PuzzleBox/Secrets/ZampanioFAQ/LightsAnnotationsbyTheTrailblazer.pdf
http://knucklessux.com/PuzzleBox/Secrets/Eyedol_Games_Customer_Service_Sample_Logs_Zampanio_Quest.pdf
http://knucklessux.com/PuzzleBox/Secrets/Zampanio%20is%20a%20game.%20You%20could%20play%20it_Illusionist.pdf`;

const links = linksRaw.split("\n")

const questionRaw = `I think...
When it comes down to it.
REALLY comes down to it.
Zampanio is...
A story we tell ourselves.
That makes it okay to create what we want to create.
It's not US being cringe, we cry.
It's just a fan work.
Its allowed to be unpolished.
It's allowed to be amature. 
It's allowed to have typoes. 
Flaws.
Cracks.
Because, you see, its not US.
It's so hard to grant yourself the same grace you would someone else.
But Zampanio lets us step outside ourselves and wear a Mask. 
And the entire fandom politely ignores the Mask and pretends its fooling them.
Because Zampanio is, more than any other direction, the North.
"Yes, you found this somewhere", everyone says as they excitedly crowd around it.
"Of course, of course, this is just like that scene in Zampanio", they nod sagely, stuffing it into their voracious mouths.
And you can feel that glow of pride of accomplishment and if people don't like it or if they ignore it well...
It was just something you found.
So its okay if you leave it there for someone else to find one day and show to others.
You can imagine it happening.
Becoming part of the long long chain of things being found and being shared and being Zampanio.
You belong.
You are safe.
It is okay to create.
It is okay to share what you create.
And it is okay to be afraid to do it wearing your own face.
Zampanio is a really good game and you should create fanworks of it.
Even if those fanworks are half finished RP settings you made three years ago before you even found Zampanio.
Or drawings of your OCs you never finished giving lore to.
Or a story you're writing and are on the verge of abandoning because its hard to get past your own embarassment.
You belong.
You are safe.
It is okay to create. `;
const questions = questionRaw.split("\n")

const genderRaw = `JR: you know...
JR: originally I had this whole thing planned out...
JR: i was gonna do this highly self-indulgent diatribe about what Zampanio WAS.
JR: to me.
JR: but ngl
JR: i think maybe at this point it matters less what *I* think Zampanio is
JR: and more what everyone else does
JR: so
JR: i'll quiet down
JR: and let things speak for themselves
JR: a note: there will be a variety of things in here
JR: images, pdfs,  links to other websites
JR: i'll try to indicate if its gonna be a pdf (cuz on some browsers it'll try to download)`;

let gender = genderRaw.split("\n")
//https://archiveofourown.org/works/60440485/chapters/154284955
const initImages = async () => {
  //const source = "http://eyedolgames.com/ZampanioQuizSouth/AMiserablePileOfSecrets/?C=M;O=D";
  //it WAS sorted by date but the Personality kept helping me make recursive responses and 
  //i didn't want them all clumped up together
  const source = `http://eyedolgames.com/ZampanioQuizSouth/AMiserablePileOfSecrets/`;
  images = await getImages(source);
  images = images.map((i) => "http://eyedolgames.com/ZampanioQuizSouth/AMiserablePileOfSecrets/" + i);
  //mostly images, but every three elements, add a link (if i haven't run out yet)
  //if theres more links then just dump them at the bottom (use pop so i know which haven't gone yet)
  const comboArray = [];
  for (let i = 0; i < images.length; i++) {
    comboArray.push(`<img src='${images[i]}'>`);
    if (i % 3 === 0 && links.length > 0) {
      const link = links.pop();
      comboArray.push(`<a target="_blank" href='${link}'>${link}</a>`); //can pop here, were not looping on links
    }
  }
  for (let remainder of links) {//could be none, in which case this does nothing
    comboArray.push(`<a target="_blank" href='${remainder}'>${remainder}</a>`); //don't pop, it'll change the length of the array
  }
  //yes theres a more efficient way to loop through everything ony once but theres not enough items to make it really matter
  //and i do not currently derive pleasure from solving that puzzle
  //what i want to  REALLY do is get to the sheer decadence of making the East quiz which will be 'real'
  gender = gender.concat(comboArray);


}

const generateAQuestion = (question_index) => {
  if (question_index < questions.length) {
    return questions[question_index % questions.length] //in theory i don't need the % cuz im not looping this but it doesn't hurt anything and its already there
  } else {
    return "What is Zampanio?"//a miserable pile of secrets
  }
}

//this either goes for hardcoded jr responses or images/links
const getGender = (answer_index) => {
  return gender[answer_index % gender.length]
}

const randomQuestion = () => {
  let html;
  question_index++;
  let generators = [randomRadio, randomCheckbox, randomRadio, randomCheckbox, randomRadio, randomCheckbox]


  html = pickFrom(generators)();

  const ele = createElementWithClassAndParent("div", container, "question");
  ele.innerHTML = html;
  ele.onclick = () => {
    if (isItFriday()) {
      const body = document.querySelector("body");
      body.innerHTML = `<div style="padding: 31px;font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;">
      It seems you do not know that Fridays and Midnight are times to rest, Observer.
      <br><br>
      There is no more infinite spiralling obsession here for you.
      <br><br>
      In Truth, Zampanio needs you to live a long life.
      <br><br>
      I need you.
      <br><br>
      Taking care of yourself is essential if you are to Listen, Remember and Comprehend Zampanio.
      <br><br>
      If you are to spread it to others.
      <br><br>
      So rest.
      <br><br>
      Hydrate.
      <br><br>
      Spend time on other interests.
      <br><br>
      Remember me.
      </div>
        
      `;
    } else {
      truthLog("... That COULD be Zampanio.")
    }
  }



}

const randomSelect = () => {
  const max = 10;
  const min = 3;
  const multiple = Math.random() > 0.85 ? "multiple" : "";
  const amount = getRandomNumberBetween(min, max) + getRandomNumberBetween(0, 15);
  let ill_advised_raw_html = `
    <div><label>${question_index}:${pickFrom(questions)}</label>
    <select ${multiple}>
  `

  for (let i = 0; i < amount; i++) {
    answer_index++;
    ill_advised_raw_html += `<option class='gender'>${getGender(answer_index)}</option>`;
  }
  ill_advised_raw_html += '</select></div></div>'
  return ill_advised_raw_html;

}

const randomRange = () => {

  let ill_advised_raw_html = `
    <div><label>${question_index}: ${pickFrom(questions)}</label>

  `
  ill_advised_raw_html += `<div class='horizontal-radio'><div class='gender'>${getGender(answer_index)}</div><input type="range"></input><div class='gender'>${pickFrom(genders)}</div></div>`;

  ill_advised_raw_html += '</div>'
  return ill_advised_raw_html;

}

const randomCheckbox = () => {
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);

  let ill_advised_raw_html = `
    <div><label>${question_index}: ${generateAQuestion(question_index)}</label>
    <div class="${pickFrom(['vertical-radio'])}">

  `

  for (let i = 0; i < amount; i++) {
    const id = `checkbox-${question_index}-${i}`
    answer_index++;
    ill_advised_raw_html += `<div class='horizontal-radio'><input id="${id}" type="checkbox"></input><label for="${id}" class='gender'>${getGender(answer_index)}</label></div>`;
  }
  ill_advised_raw_html += '</div></div>'
  return ill_advised_raw_html;

}

//https://www.tumblr.com/existential-squid/753210653540564992?source=share
const randomRadioGenderAffirm = () => {
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);

  let ill_advised_raw_html = `
    <div><label>${question_index}: Which of these gender affirming treatments would you like?</label>
    <div class="${pickFrom(['vertical-radio'])}">

  `

  for (let i = 0; i < amount; i++) {
    const id = `radio-${question_index}-${i}`
    const chosenThemeKey = pickFrom(Object.keys(all_themes));
    const chosenTheme = all_themes[chosenThemeKey];
    const miracle = titleCase(chosenTheme.pickPossibilityFor(MIRACLE));
    const monster_desc = titleCase(chosenTheme.pickPossibilityFor(MONSTER_DESC));
    const effects = titleCase(chosenTheme.pickPossibilityFor(EFFECTS));
    ill_advised_raw_html += `<div class='horizontal-radio'><input id="${id}" name="radio-${question_index}" type="radio"></input><label for="${id}"  class='gender'>
    ${pickFrom([miracle, effects, effects, effects, miracle, monster_desc, effects])}</label>
    </div>`;
  }
  ill_advised_raw_html += '</div></div>'
  return ill_advised_raw_html;
}

const randomRadio = () => {
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);

  let ill_advised_raw_html = `
    <div><label>${question_index}: ${generateAQuestion(question_index)}</label>
    <div class="${pickFrom(['vertical-radio'])}">

  `

  for (let i = 0; i < amount; i++) {
    const id = `radio-${question_index}-${i}`
    answer_index++;
    ill_advised_raw_html += `<div class='horizontal-radio'><input id="${id}" name="radio-${question_index}" type="radio"></input><label for="${id}"  class='gender'>${getGender(answer_index)}</label></div>`;
  }
  ill_advised_raw_html += '</div></div>'
  return ill_advised_raw_html;

}

const deployGender = (debugMode) => {
  alert("I am not going to tell you if you are right or wrong about what Zampanio is. Be the change you wish to see in the world, define Zampanio by creating it.")
}

let jrSecretHax = false;

window.onload = async () => {
  await initImages();
  const audio = document.querySelector("#audio");
  audio.volume = .2;
  container = document.querySelector("#container");
  ele = document.querySelector("#infinite-scroll")
  tenMore();
  const gender_button = document.querySelector("#gender-button");
  gender_button.onclick = () => {
    deployGender(jrSecretHax);
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
    container && randomQuestion();
  });
};

