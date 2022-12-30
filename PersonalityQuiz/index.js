
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
  /*
   JR NOTE TODO: 
   from their top 5-8 themes:
   give them a few abilities
   a starting area
   an inventory
   their main nemesis (name and a brief backstory)
  */

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

  alert(`After careful consideration: Your personality is: ${results.join(",")}. Your enemies personality is ${antiResults.join(",")}`);

}

window.onload = () => {
  const audio = document.querySelector("#audio");
  audio.volume = .2;
  container = document.querySelector("#container");
  initThemes();
  ele = document.querySelector("#infinite-scroll")
  tenMore();
  const gender_button = document.querySelector("#gender-button");
  console.log("JR NOTE: gender button", gender_button)
  gender_button.onclick = () => {
    deployGender();
  }
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

