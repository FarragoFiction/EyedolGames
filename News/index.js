
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
    theme_keys = tmp.get("themes").split(',');
  }

  if (tmp_d) {
    details = JSON.parse(decodeURIComponent(tmp_d));
  }
  placeHolderDataAsNeeded();
  console.log("JR NOTE:",{referer, referer_details,details});
  setupLeftAd();
  setUpMiddleADInit();
  setupRightAd();

}

const placeHolderDataAsNeeded = ()=>{
  if(!referer){
    referer = "Zampanini"
  }

  rand = new SeededRandom(stringtoseed(referer));
  details={
    feeUnder:216,
    item_name: "Mysterious Object",
    price: 13,
    restaurant_name: "Piggy's BBQ"
  }
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

const setupLeftAd = ()=>{
  const ele = document.querySelector(".link1");
  Math.random() > 0.5 ? setupShortAd(ele): setupTallAd(ele);

}

const setupRightAd = ()=>{
  const ele = document.querySelector(".link2");
  Math.random() > 0.5 ? setupShortAd(ele): setupTallAd(ele);

}

//don't mess with link
const setupShortAd = (ele)=>{
  //only bottom or top, less tall
  //random words, not clear its a quiz. pick a location or object or adj. i don't care and neither should you 
  //if pleading mode, gif of clock
  console.log("JR NOTE: todo short ad")
}

const setupTallAd = (ele)=>{
  //both bottom and top, slogans like "find a quiz that loves you" and "are you really <COMPLIMENT>?"
  //if pleading mode, gif of clock
  console.log("JR NOTE: todo short ad")

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

  const left = container.querySelector(".left");
  const right = container.querySelector(".right");
  const logo = createElementWithClassAndParent("div",center,"logo");
  logo.innerText = missingEmoji() ;
  const name = createElementWithClassAndParent("div",center,"restaurant_name");
  name.innerText = details?.restaurant_name;
  const slogan = createElementWithClassAndParent("div",center,"slogan");

  const quick = (key, cap) => {
    return pickARandomThemeFromListAndGrabKey(rand, theme_keys, key, cap)
  };
  const refs = [`Powered by ${referer}.`];
  const slogans = [`Now delivering ${quick(OBJECT)}s.`,"What will you order?",'Always local. Always.',`You can almost taste the ${quick(OBJECT)}.`,`${quick(COMPLIMENT,true)}. Every time.`,`So many options. So little time.`,`Reaching the end should not be your goal.`];
  slogan.innerText = `${pickFrom(refs)} ${pickFrom(slogans)}`;

  let images = collateAllThemeImages(theme_keys);
  images.then((results) => {
    if(results.length ===0){
      return;
    }
    //let image = "http://eyedolgames.com/Zampanini/images/Diner/00086-img_20221231213043.png"; //placeholder
    left.src = pickFrom(results);
    if (rand.nextDouble() > .5) {
      left.style.objectFit = "none";
    }

    right.src = pickFrom(results);
    if (rand.nextDouble() > .5) {
      right.style.objectFit = "none";
    }
  })
}



