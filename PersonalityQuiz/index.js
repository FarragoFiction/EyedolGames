
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
  
  console.log("JR NOTE: themes",themes);
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

const answerMode = (your_themes,your_rivals_themes)=>{
  const body = document.querySelector("body");
  body.innerHTML = ""
  const content = createElementWithClassAndParent("div",body, "container");
  if(your_themes && your_rivals_themes){

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
  let seed = urlParams.get('your_themes');

  let your_rivals_themes = urlParams.get('your_rivals_themes');
  console.log("JR NOTE: your_themes", your_themes)
  if(your_themes != null && your_rivals_themes !=null){
    answerMode(seed,your_themes,your_rivals_themes );
  }else{
    quizMode();

  }

  
}



