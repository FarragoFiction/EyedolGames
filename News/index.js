
/*
death is so scary

the idea that

right now

you and i both

are dutifully recording memories into our brains

until one day

not only will we stop

but no one will ever access those memories again

thats why i create

remember me

and i will do my best

to remember you,too

should i learn of you
*/

let rand;
//string
let referer;
//calback url
let referer_details;
let theme_keys;

//json object 
/*feeUnder: 76
item_name: "Create-your-own Chicken"
price: "1.48"
restaurant_name: "Master  Fries" */
let details;
let victim; //first name and last initial

window.onload = () => {

  initThemes();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let tmp_ref = urlParams.get('referer');
  let tmp_d = urlParams.get('details');

  let tmp_ref_details =urlParams.get('referer_details') && urlParams.get('referer_details').replaceAll('"','');
  if (tmp_ref) {
    referer = tmp_ref;
  }

  if (tmp_ref) {
    referer_details = tmp_ref_details;
    let tmp = new URLSearchParams(referer_details)
    theme_keys = tmp.get("themes")?.split(',');
    victim = tmp.get("victim") //could be undefined
  }

  if (tmp_d) {
    details = JSON.parse(decodeURIComponent(tmp_d));
  }
  placeHolderDataAsNeeded();
  console.log("JR NOTE:",{referer, referer_details,details});
  setupLeftAd();
  setUpMiddleADInit();
  setupRightAd();
  replaceFirstArticleAndHeader();

}

const quick = (key, cap) => {
  return pickARandomThemeFromListAndGrabKey(rand, Object.keys(all_themes), key, cap)
};

const quickButThemed = (key, cap) => {
  return pickARandomThemeFromListAndGrabKey(rand, Object.keys(theme_keys), key, cap)
};

const placeHolderDataAsNeeded = ()=>{
  if(!referer){
    referer = "Zampanini"
  }

  rand = new SeededRandom(stringtoseed(referer));
  if(!details){
    details={
      feeUnder:216,
      item_name: "Mysterious Object",
      price: 13,
      restaurant_name: "Piggy's BBQ"
    }
  }

}

const collateAllQuizImages = async () => {
  const url = "http://eyedolgames.com/News/images/Quizzes/"
    let images = await getImages(url);
  return images.map((item) => `${url}${item}`);
}


const collateAllThemeImages = async (base_keys) => {
  let ret = [];
  let i = 0;
  while (i < base_keys.length) {
    let key = base_keys[i];
    let images = await all_themes[key].getImages();
    ret = ret.concat(images);
    i++
  }

  return ret;
}

//they move around and change height and what not but they are always here
const setupLeftAd = async()=>{
  const ele = document.querySelector(".link1");
  const img = ele.querySelector("img");
  const footer = ele.querySelector(".footer");

  ele.style.width = getRandomNumberBetween(10,30)+"%";
  ele.style.height = getRandomNumberBetween(30,70)+"%";
  img.style.width = "100%";
  img.style.height = "100%";
  ele.style.top = getRandomNumberBetween(10,100-parseInt(ele.style.height))+"%"

  footer.style.backgroundColor = `rgb(${getRandomNumberBetween(0,100)},${getRandomNumberBetween(0,100)},${getRandomNumberBetween(0,100)})`;

  
  let images = collateAllQuizImages();
  images.then((results) => {
    if(results.length ===0){
      return;
    }
    //let image = "http://eyedolgames.com/Zampanini/images/Diner/00086-img_20221231213043.png"; //placeholder
    img.src = pickFrom(results);
    if (Math.random() > .5) {
      img.style.objectFit = "none";
    }
  })



  const textOptions = [`DIG`
  ,`SELF CARE`
  ,`run`
  ,`RUN`
  ,"quiz"
  ,`${quick(COMPLIMENT)}`
  ,`${quick(OBJECT)}`
  ,`${quick(LOCATION)}`
  ,`${quick(PERSON)}`
  ,`${quick(INSULT)}`
  ,`${quick(ICON)}`
  ,`${quick(ADJ)}`
  ,`${quick(SUPERMOVE)}`
  ,`gender`

  ,"spiral"]
  footer.innerText = pickFrom(textOptions) + " QUIZ";
  await sleep(60000);
  setupRightAd();

}

//they move around and change height and what not but they are always here

const setupRightAd = async ()=>{
  const ele = document.querySelector(".link2");
  const img = ele.querySelector("img");
  const header = ele.querySelector(".header");
  const footer = ele.querySelector(".footer");

  ele.style.width = getRandomNumberBetween(10,30)+"%";
  ele.style.height = getRandomNumberBetween(30,70)+"%";
  img.style.width = "100%";
  img.style.height = "100%";
  ele.style.top = getRandomNumberBetween(10,100-parseInt(ele.style.height))+"%"
  header.style.backgroundColor = `rgb(${getRandomNumberBetween(0,100)},${getRandomNumberBetween(0,100)},${getRandomNumberBetween(0,100)})`;
  footer.style.backgroundColor = `rgb(${getRandomNumberBetween(0,100)},${getRandomNumberBetween(0,100)},${getRandomNumberBetween(0,100)})`;


  
  let images = collateAllQuizImages();
  images.then((results) => {
    if(results.length ===0){
      return;
    }
    //let image = "http://eyedolgames.com/Zampanini/images/Diner/00086-img_20221231213043.png"; //placeholder
    img.src = pickFrom(results);
    if (Math.random() > .5) {
      img.style.objectFit = "none";
    }
  })


  const bottomText = [`DIG`
  ,`SELF CARE`
  ,`run`
  ,"bottom text"
  ,`RUN`
  ,"quiz"
  ,`${quick(COMPLIMENT)}`
  ,`${quick(OBJECT)}`
  ,`${quick(LOCATION)}`
  ,`${quick(PERSON)}`
  ,`${quick(INSULT)}`
  ,`${quick(ICON)}`
  ,`${quick(ADJ)}`
  ,`${quick(SUPERMOVE)}`
  ,`personality`

  ,"spiral"]
//DO NOT FORGET: YOU DID NOT KILL HIM.
  const topText = [`FIND A QUIZ THAT LOVES YOU BACK`
  ,`HAVE YOU EVER WONDERED IF YOU'RE ${quick(COMPLIMENT)}?`
  ,`everyone is finding out if they're ${quick(COMPLIMENT)}`

  ,`WHAT KIND OF ${quick(OBJECT)} ARE YOU?`
  ,"I DON'T BLAME YOU"
  ,"IT SHOULD HAVE BEEN YOU"
  ,"WHY ARE YOU STILL HERE?"
  ,"YOU CAN STIL LEAVE"
  ,"YOU CAN LEAVE ANY TIME"
  ,`WOULD YOU DIE IN A ${quick(LOCATION)}?`
  ,`WHICH ${quick(PERSON)} ARE YOU?`
  ,`WHAT IF YOU'RE ${quick(INSULT)}?`
  ,`HEY. MAYBE ${quick(ICON)} ISN'T SO BAD.`
  ,`ARE YOU ${quick(ADJ)}? FIND OUT NOW!`
  ,`WHAT DOCTORS DON'T WANT YOU TO KNOW ABOUT ${quick(SUPERMOVE)}`
  ,`LEARN ABOUT YOUR PERSONALITY HERE`

  ,"ZAMPANIO IS A REALLY FUN GAME AND YOU'RE ALREADY PLAYING IT."]
  footer.innerText = pickFrom(bottomText)+ " QUIZ";
  header.innerText = pickFrom(topText) ;

  await sleep(10000);
  setupLeftAd();
}


//always an ad for the restaurant that killed the person
//this is the only ad that shows up multiple times
const setUpMiddleADInit = ()=>{
  const container = document.querySelector(".link3")


  setUpMiddleAD(container);
}

const setUpMiddleAD = (container)=>{
  container.href = `http://eyedolgames.com/${referer}${referer_details}`;
  const center = container.querySelector(".center");
  center.innerHTML = "";
  center.style.backgroundColor = `rgb(${getRandomNumberBetween(0,100)},${getRandomNumberBetween(0,100)},${getRandomNumberBetween(0,100)})`;

  const left = container.querySelector(".left");
  const right = container.querySelector(".right");
  const logo = createElementWithClassAndParent("div",center,"logo");
  logo.innerText = missingEmoji() ;
  const name = createElementWithClassAndParent("div",center,"restaurant_name");
  name.innerText = details?.restaurant_name;
  const slogan = createElementWithClassAndParent("div",center,"slogan");


  const refs = [`Powered by ${referer}.`];
  const slogans = ["Fees are optional. Living is not.",`Now delivering ${quick(OBJECT)}s.`,"What will you order?",'Always local. Always.',`You can almost taste the ${quick(OBJECT)}.`,`${quick(COMPLIMENT,true)}. Every time.`,`So many options. So little time.`,`Reaching the end should not be your goal.`];
  slogan.innerText = `${pickFrom(refs)} ${pickFrom(slogans)}`;

  let images = collateAllThemeImages(theme_keys);
  images.then((results) => {
    if(results.length ===0){
      return;
    }
    //let image = "http://eyedolgames.com/Zampanini/images/Diner/00086-img_20221231213043.png"; //placeholder
    left.src = pickFrom(results);
    if (Math.random() > .5) {
      left.style.objectFit = "none";
    }

    right.src = pickFrom(results);
    if (Math.random() > .5) {
      right.style.objectFit = "none";
    }
  })
}



