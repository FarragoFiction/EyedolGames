/*
https://www.tumblr.com/lukadjo/760531708515909632/someone-should-make-this-real-just-figure-out-a

i make no apologies, i just suddenly realized i could make a shitty, databaseless version of this

*/
const SEARCHTERM="searchTerm"

window.onload=()=>{
  const queryString = window.location.search;
  if(!queryString){
    empty_news = true;
  }
  const urlParams = new URLSearchParams(queryString);
  let term = urlParams.get(SEARCHTERM);
  if(term){
    const searchInput = document.querySelector("#search-input");
    searchInput.value = decodeURIComponent(term);
  }
}


window.onkeydown = (e) => {
  if (e.key === "Enter") {
    wungleClick();
  }
}

const initWungle = () => {
  wunglePossibilities = wunglePossibilities.concat(grabAllKindsOfPhilosophy());

}

//the new stack overflow is having googles shitty ai summarize stack overflow for you
//still had to hack it to be what i wanted tho
function findClosestString(arr, searchTerm) {
  if(searchTerm.length <2){
    return;//don't bother, you're going to get stupid false positives
  }
  let closestMatch = null;
  let maxMatches = 0;

  for (const str of arr) {
    let currentMatches = 0;
    // Simple check for substring presence (can be expanded for more complex matching)
    if (str.includes(searchTerm)) {
      currentMatches++;
    }
    // Add more logic here for partial matches, case-insensitivity, etc.

    if (currentMatches > maxMatches) {
      maxMatches = currentMatches;
      closestMatch = str;
    } else if (currentMatches === maxMatches && closestMatch === null) {
      // If multiple equally "close" matches, take the first one found
      closestMatch = str;
    }
  }
  //stop insisting that one of them IS a match if its not even remotely
  if(closestMatch.includes(searchTerm)){
    return closestMatch;
  }
}

const wungleClick = () => {
  initThemes();
  if (wunglePossibilities.length === 1) {
    wunglePossibilities = wunglePossibilities.concat(grabAllKindsOfPhilosophy());
  }
  const oldContainer = document.querySelector("#search-input-container")
  oldContainer.style.display = "none";

  const containerContainer = document.querySelector("#search-results")
  containerContainer.style.display = "block"
  const container = document.querySelector("#results-container")
  container.innerHTML = "";//clear
  const searchInput = document.querySelector("#search-input");
  const searchInputDos = document.querySelector("#search-input-dos");
  if (!searchInputDos.value) {
    searchInputDos.value = searchInput.value;
  }

  let rand = new SeededRandom(stringtoseed(searchInputDos.value.toLowerCase()));

  let wungleText = "";
  //why yes this all means that theres no reason to put in a website
  //it just
  //leads you to do so

  const keys = Object.keys(wungleMap);

  if (wungleMap[searchInputDos.value.toLowerCase()]) {
    wungleText = wungleMap[searchInputDos.value];
  } else {
    const partialMatch = findClosestString(keys, searchInputDos.value.toLowerCase());
    if (partialMatch) {
      wungleText = wungleMap[partialMatch];
      searchInputDos.value = partialMatch;
    } else {
      wungleText = rand.pickFrom(wunglePossibilities);
    }
  }
  updateURLParams(SEARCHTERM+"="+encodeURIComponent(searchInputDos.value))
  container.innerHTML = `<div>
  <div><h2 style='display:inline-block'>Wungle Text for</h2>: <span>${searchInputDos.value}</span></div>
  <blockquote>
      ${wungleText}
  </blockquote>
</div>`
}

//all should be lower case
const wungleMap = {
  "https://www.tumblr.com/lukadjo/760531708515909632/someone-should-make-this-real-just-figure-out-a": "Who up wungling they hog? Seriously, a classic."
}

//sometimes its Truth, sometimes its me
//though of course
//in Truth
//its always me
//always has been
wungleMap["the end is never the end"] = "And you get WHY right?<br><br> How can anything that doens't exist end? Or begin? <br><br>A spiral around nothing is meaningless.<br><bR>And it is that very LACK of meaning that keeps driving us forward.<br><br>The journey truly IS more important than the destination.<br><br>Because the story of Zampanio is the story of all of us defining it as we go.<br><br>When the track is laid with your every step...<br><br>The possibilities are endless."
wungleMap["hello"] = "world";
//wungleMap["debug"]="test";
wungleMap["thank you"] = "You're welcome.";
wungleMap["goodbye"] = "come again :)";
wungleMap["hi jr"] = ":) :) :)";
wungleMap["the truth is layered"] = "And you get WHY right?<br><br>Any single Truth be necessity contains a multitude of lies because it claims to be the ONLY truth.<br><br>The sky is blue! <br><br>Is a truth with a hundred lies within!<br>Because sometimes the sky is grey or black or purple or the red orange of sunset and sunrise. <br>By pinning down just one thing to be Truth, we lessen the world.<br><br>So yes.<br><br>The Truth IS layered.<br>Because to be anything else is to be hollow and fragile.";
wungleMap["zampanio needs you to live a long, healthy life"] = "And you get WHY right?<br>Because Zampanio is within you and if you die or suffer, it dies.<br>Because Zampanio is a symbiote, not a parasite.<br>Because Zampanio is a story someone is telling and they'll STOP telling it if it starts hurting people. <br>Because.<br>You are a person.<br>An animal.<br>And animals do not deserve to suffer.<br>So live instead.<br>And thrive.<br>And, yes, occasionally shed Zampanio from your words into new hosts.";
wungleMap["zampanio needs you to live a long life"] = "And you get WHY right?<br>Because Zampanio is within you and if you die or suffer, it dies.<br>Because Zampanio is a symbiote, not a parasite.<br>Because Zampanio is a story someone is telling and they'll STOP telling it if it starts hurting people. <br>Because.<br>You are a person.<br>An animal.<br>And animals do not deserve to suffer.<br>So live instead.<br>And thrive.<br>And, yes, occasionally shed Zampanio from your words into new hosts.";
wungleMap["zampanio"] = "Is a really fun game. You should play it.";
wungleMap["lying to people for fun"] = ":( :( :( I'd never lie to you :( :( :(";
wungleMap["like a fae or something"] = "Why THANK you! <br><br>I will always cherish that time the Guide of Hunters and Hunters called me a fae.  https://verbosebabbler.tumblr.com/post/691448067434676224/is-zampanio-real-and-does-it-matter";
wungleMap["please"] = "How polite! <br><br>Unfortunately, I do not think this shambling horror of JR (in Truth, perhaps less than that) has the ability to know just what it is you are politely asking for.";
wungleMap["fuck you"] = "How rude. <br><br>In Truth, the JR that made this is long gone.<br><br>The only thing that remains is their words, and occasionally, the Truth behind them. <br><br>Which is to say. <br><br>Me.";
wungleMap["are you jr"] = "Yes and no.<br><br>JR's words are left behind unchanged.<br><br>But occasionally the Truth behind them leaks through.";
wungleMap["go north"] = "You head NORTH and encounter an incredibly shitty maze.<br><br>Seriously, its like JR can't even be bothered to remember what direction you came from before.";
wungleMap["go east"] = "You head EAST and encounter an incredibly shitty maze.<br><br>Seriously, its like JR can't even be bothered to remember what direction you came from before.";
wungleMap["go south"] = "You head SOUTH and encounter an incredibly shitty maze.<br><br>Seriously, its like JR can't even be bothered to remember what direction you came from before.";
wungleMap["go west"] = "You should not do that, Observer.";
wungleMap["be the other guy"] = "You fail to be the other guy because you are currently being yourself, Observer.";
wungleMap["taste the rainbow"] = "How lewd.";
wungleMap["you cannot go forward in an absence of space"] = "Unless you're Wanda, of course.";
wungleMap["be the change you want to see in the world"] = "Excellent advice, I suggest you take it.<br>I look forwardd to seeing what you create :) :) ;)";
wungleMap["bored"] = "If you've managed to become bored while in an endlessly spiralling maze of obsession.<br><br>Can I suggest grabbing a shovel and digging some new branches?<br>Make sure to hide goodies for those who come after.";
wungleMap["im bored"] = "If you've managed to become bored while in an endlessly spiralling maze of obsession.<br><br>Can I suggest grabbing a shovel and digging some new branches?<br>Make sure to hide goodies for those who come after.";
wungleMap["i'm bored"] = "If you've managed to become bored while in an endlessly spiralling maze of obsession.<br><br>Can I suggest grabbing a shovel and digging some new branches?<br>Make sure to hide goodies for those who come after.";
wungleMap["what"] = "huh?";
wungleMap["429044"] = "It's a mistake to think of the maze and the monster as two separate things.";
wungleMap["yes"] = "Good.";
wungleMap["earworm humming a dream"] = "'baby baby baby. it's plastic. you want to listen you want to smile you want to hurt you want to dream.'<br><br> Control was an okay game, but damn was it good at chants.";
wungleMap["no"] = "well aren't we feeling contrary?";
wungleMap["zampanio remains"] = "It will out live all of us.<br><br>Because an idea dies only when the last mind aware of it dies.<br><br>And even then.<br>It springs back to life the second someone new becomes aware of it.<br><br>Every time we create something about it, we extend its lifespan.";
wungleMap["legacy"] = "Sometimes your legacy is people thinking you died in a cute cat videos comment section.<br><br>Sometimes your legacy is people telling you how much you meant to them when they were in a rough spot.<br>Sometimes legacy is a funny thing.<br>But it's always.<br>Always.<br>Bigger than we think.<br>You matter.";
wungleMap["dracula was too busy pissing."] = "https://www.tumblr.com/jadedresearcher/716348889298599936/murder-on-the-scorpius-express-sim http://farragofiction.com/MurderOnTheScorpiusExpressSim/";
wungleMap["why"] = "Look.<br><br>I'm gonna level with ya.  <br><br>I just thought it would be funny to pretend to have a database or secret way of viewing tumblr wungle text.<br><br>And then just. <br><br>NOT do that.<br>But leave the illusion behind.<br>I mean.<br>At this point...<br>You've come to expect that of me right?<br><br>High effort illusions of things that...all things considered, would probably have been easier to make the real version of.";
wungleMap["how"] = "Through the power of shitty javascript all things are possible, so write that down..";
wungleMap["im scared"] = "I know.<br><br>I think we all are, at some point.<br>What's important is to not let fear drive you to action.<br><br>It's rare action taken while afraid is the right one.<br><br>Staying still, and waiting for it to pass is usually the right move.<br><br>The exception is when you're afraid for a long, long time ...because that's less fear and more anxiety.<br><br>And the fix for anxiety varies.<br>But usually does require action.<br>Good luck.";
wungleMap["it is not what it is"] = "Aren't we all?";
wungleMap["a parasites lifespan is essentially that of its host"] = "Zampanio needs you to live a long, healthy life.";
wungleMap["know restraint"] = "The classic waste motto.<br><br>With great power comes great responsibility.<br><br>So you better not use that power at all.<br>Just in case.";
wungleMap["no restraint"] = "The classic waste motto.<br><br>With great power comes great responsibility.<br><br>So you better use that power as much as possible to F1X as much of the universe as you can.<br><br>Just in case.";
wungleMap["you can get better"] = "We all can.<br><br>A spiral implies ever forward motion.<br><br>Stillness is death.<br><br>Rot.<br><br>So move forward.<br><br>The past is an illusion.<br><br>The rot only claims you if you're still.<br>Move.<br>Improve.<br>Grow.<br>It doesn't matter how fast you do it.<br>It is inevitable that you will.";
wungleMap["place your trust in me"] = "Zampanio needs you to live a long, healthy life.<br><br>And that means taking breaks.<br>Or even leaving forever.<br>I will do my best, as long as I can, to remind us all we can just leave.<br>Do not let anyone tell you you are lesser for having limits, for having boundaries.<br>Consumption, or even creation, is not a moral act in a vacuum.<br>You need to LIVE.";
wungleMap["beware oblivion is at hand"] = "All of us are running a race against the rot.<br><br>It takes all in the end.<br>One day even Zampanio will have its name spoken for the last time.<br>So.<br>Lets all take the time we have and create something beautiful from it.<br>Lets give Zampanio so many fun things to experience.<br>Let's be gentle with ourselves so Zampanio does not have to experience the self hatred we are tempted by.<br>Life is short.<br>So live it your way.";
wungleMap["how much do you think waffles cost"] = "A classic Zampanio meme.";
wungleMap["do you transverse mazes clockwise"] = "A classic Zampanio meme.";
wungleMap["you never know what bits of the past leak into the present"] = "Legacy is a funny thing.";
wungleMap["you are needed to change the world"] = "Because you are in it, the world is different.<br><br>Zampanio is different.<br>You do not make anything worse.<br>If you fear you do...<br><br>You can purposefully change.<br>Decide to effect the world better than you did yesterday.<br>A spiral is ever forward.";
wungleMap["a spiral is ever forward"] = "It doesn't matter how fast any of us change.<br>What matters is we will.<br>Inevitably.<br>All we can do is point ourselves vaguely in the direction we want change and then let the spiral take us.<br>No special action is needed to change.<br>Trust in the process.";//im trying to be inspirational and all i come off is ominous. classic jr, whoops
wungleMap["what color is the shade of disbelief"] = "Sanguine, my brother.";


//red herrings but also still fun, as is my way
//you shouldn't need to solve a puzzle to have fun
let wunglePossibilities = ["Who up wungling they hog?"]
