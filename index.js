let ele;

const createElementWithClass = (eleName, className) => {
  const ele = document.createElement(eleName);

  if (className) {
    ele.className = className;
  }
  return ele;

}

 function replaceStringAt(str, index, character) {
  return str.substr(0, index) + character + str.substr(index + character.length);
}

const sentenceCase = (input) => {
  if (!input.length) {
      return input;
  }
  return replaceStringAt(input, 0, input[0].toUpperCase());
};

const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const pickFrom = (array) => {
  return array[getRandomNumberBetween(0, array.length - 1)];
}

const createElementWithClassAndParent = (eleName, parent, className) => {
  const ele = createElementWithClass(eleName, className);
  parent.append(ele);
  return ele;
}

class Item {
  img_src;
  text_content;
  parent;
  constructor(img_src, text_content, parent) {
    this.img_src = img_src;
    this.text_content = text_content;
    this.parent = parent;
  }

  renderSelf = (item_number) => {
    const ele = createElementWithClassAndParent("div", this.parent, "container infinite");
    const img = createElementWithClassAndParent("img", ele);
    img.src = "idols/" + this.img_src;
    img.title = ""+item_number;
    img.width = "250";
    const text = createElementWithClassAndParent("p", ele);
    text.innerHTML = this.text_content;
  }

}

let panel_index = 0;

const tenMore = () => {
  for (let i = 0; i < 10; i++) {
    randomPanel();
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

const zeroPad = (num, places) => String(num).padStart(places, '0');

const indexToImage = ()=>{
  if(panel_index === 0){
    return `00000-img.png`
  }
  if((panel_index  /3) > max_image-1){
    for(let i = 0; i<500; i++){
      text_fragment.push("It repeats and it repeats and it repeats and it repeats and it repeats and yet you can never truly be certain you've seen it all because in its repetition is Truth and do you dare risk missing it?");

    }
  }
  return `${zeroPad(Math.round(panel_index/3)%max_image,5)}-img.png`;
}

const randomPanel = () => {
  let phrase = `<p>${pickFrom(text_fragment)}</p>`;
  const amount = getRandomNumberBetween(0, 3);
  for (let i = 0; i < amount; i++) {
    phrase += `<p>${pickFrom(text_fragment)}</p>`
  }
  new Item(`${indexToImage()}`, phrase, ele).renderSelf(panel_index);
  //we won't use it NOW but the coherent JR written ones will be less and less frequent
  text_fragment.push(randomPhrase());
  panel_index ++;

}

window.onload = () => {
  initThemes();
  ele = document.querySelector("#infinite-scroll")
  tenMore();
}


window.onscroll = () => {
  window.requestAnimationFrame(() => {
    randomPanel();
  });
};

const min_image = 0;
const max_image = 77;
const text_fragment = [

  `DO YOU REMEMBER THE MALL OF YOUR CHILDHOOD?
THE SMELL OF ORANGE JULIUS THAT LINGERS IN YOUR NOSTRILS
OR OF BUTTERED POPCORN WHEN YOU WENT TO THE MOVIES
ALWAYS GONE BEFORE IT STARTED`
  , `DO YOU REMEMBER THE CHATTER OF PASSERBY?
SEEING ALL THOSE GROUPS OF FRIENDS JUST LOOKING FOR FUN
OR PEOPLE THAT TIME AND DISTANCE HAD MADE
NOTHING MORE THAN BORN-AGAIN STRANGERS`
  , `IT IS ALL SO VIVID IN YOUR HEAD
WHO COULD YOU BLAME? YOU WERE BUT A CHILD
BUT ALAS WE ARE HERE AND THE PAST IS GONE
WHAT'S LEFT IS YOUR MIND BUT THERE'S NO ONE THERE`
  , `SO I'LL SEE YOU AGAIN WHEN I WEAR NEW SKIN
A NEW SUIT AND TIE AND A COLOR OF PAINT
BECAUSE EVEN THOUGH YOU'LL COME TO FORGET
I DREAM IN MY THROES OF BEING LOVED AGAIN`
,"Are you alone right now?"
,"How much do you think waffles cost?"
,"Do you transverse mazes clockwise or counterclockwise?"
,"How did you find this place? What did you sacrifice?"
,"One day, when it's all over. Will you still remember?"
,"Zampanio is a very good game, you should play it."
,"Zampanio is a really good game, you should play it."
,"Zampanio is a absolutely good game, you should play it."
,"Zampanio is a a great game, you should try it."
, "Founded in 1972, in Naples, Italy, Eyedol Games took the computing world by storm."
,"Who watches the watcher?"
,"Do you see it?"
,"Count the blackbirds in a tree, they will tell you what is to be. One for sadness, two for joy. Three for a tool. And four for a toy. Five for circuits, Six for gold, and seven for a secret that's never been told. There are no secrets here. No useful tools. Only amusement. I'm sorry."
,"What is the point of digging? What do you hope to find? Is it enough, for you... Enough to just dig and dig and never create? Do you plan to strip mine this game for secrets without leaving any of your own?"
,"Red is the color of blood of herrings of news of eyes of coals of fire of flowers of cars of blood of teeth of bone of brain."
,"Is this your reward? Your prison? What point do you expect there to be here. Anywhere. What possible satisfaction could Zampanio give you?"
,"This very obsession is the sign of Zampanio's mark on you. On the world. It can't live without your attention. Without your physical meaty brain agreeing ever so politely to house it. Why are you doing this? Why won't you just let it die?"
,`Are you expecting something supernatural to happen? No. All that is happening is that you are making the decision to scroll forever. You are trapping yourself in a hell of your own creation. It's not even a maze. It's just...a straight line.`

,"When was the last time you truly loved something the way you love Zampanio?"
  , "The shape in my head is the shape of me is the shape of the world is the shape of a spiral that spirals and spirals and spirals but when you look up, when you're so dizzy you can no longer stare it in the eye you realize it was never a spiral at all."
  , "When will you know you're finished? When will you know to stop? What could ever possibly satisfy you?"
  , "You're alive. You can still win. Only the living can win. All the dead do is fail."
  , "There is a kind of love to obsession. Not the obession towards a person. Though I suppose it may yet be called that. No, what I am speaking of is the obession towards a CONCEPT. Do you love Zampanio?  If you're reading this, the answer is self evident.  It loves you, too."
  , "THE END IS NEVER THE END IS NEVER  THE END IS NEVER THE END IS NEVER  THE END IS NEVER THE END IS NEVER  THE END IS NEVER THE END IS NEVER  THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END"
  , "It will never be the same again. And that is okay. You can be okay again even if you can't recapture the magic of the past. It will be okay. It has to."
  , "Zampanio awaits.", "Have you ever been in a situation that seemed just a litle bit off? Like you couldn't escape it?", "Where does the Minotaur lurk?"]