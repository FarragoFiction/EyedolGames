

//worlds shittiest code lol
//something so cathartic about breaking all the rules

let normalImageList = [];
let weirdImageList = [];
let halloween = false;
//quotidians post from here, because i feel like the uninitiated deserve confusion
//as a treat
let zampanioEyes = [];
//in case we lose the server, i do not want to forget
let fadedMemories = [];
//i am trying so hard to find a single quote, going through all past me's notes, taking current pics
let houseOfLeaves = [];

let halloweenpics = [];
let zampanioPics = [];

let characters = [];
let jrComments = [];

let pornBots = [];

let global_wungle = false;

let globalObsessions = [];

let blorboPosts = [];
let breakfast = [];
let lunch = [];
let dinner = [];
let dessert = [];
gnosisList = [];
let pornBotName;
let pornBotImage;
let pornBotSecrets;
let pornBotLoc;
let pornBotMatchPercent;

//pure string, convert to numerical seed later.
let seedSource = "seed="
let basePornBotImageURL = `http://eyedolgames.com/JackElope/images/SexySingles/`
let seed = 0;
let rand;
let observer, wanderer, k;


window.onload = async() => {
  let date = new Date();
  isItWungleTime();
  //april fools
  if (date.getMonth() === 3 && date.getDate() === 1) {
    let body = document.querySelector("body");
    body.innerText = "sayonara you weeaboo shits" //the personality of prophetic secrets is so correct, we should do the classic tumblr staff april fools
    await sleep(13000);
    //so its not just sburbsim/wigglersim folk who get to participate in Waste-Mas
    window.location.href = "http://farragofiction.com/AdventureSimWest/";
  }

  initThemes();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //updateURLParams(`name=${name}&image=${image}&matchPercent=${matchPercent}&loc=${loc}`);

  pornBotName = urlParams.get('name');
  pornBotImage = urlParams.get('image');
  pornBotSecrets = urlParams.get('secrets');

  global_wungle = false;
  if(urlParams.get('wungle') && urlParams.get('wungle')!=="jrsaysjustthisonce_forlavinraca"){
    global_wungle = false;
  }else if (urlParams.get('wungle') ){
    global_wungle = true;
  }

  pornBotMatchPercent = parseInt(urlParams.get('matchPercent'));
  pornBotLoc = parseInt(urlParams.get('loc'));

  halloween = (urlParams.get('halloween')) || date.getMonth() === 9;

  let seed = parseInt(urlParams.get('seed'));
  if (!seed) {
    //https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366   harder than i thought to figure out what day of the year it is
    //good job calendars for being so damn complex
    seed = 216  + 100000*Math.floor(whatDayOfTheYearIsIt()/7); //changes each week
  }
  rand = new SeededRandom(seed);
  updateURLParams("?seed=" + rand.initial_seed)


  let o = Object.values(all_obsessions)
  //we all know why we are here
  globalObsessions.push(all_obsessions[ZAMPANIO])
  if (halloween) {
    globalObsessions.push(all_obsessions[HALLOWEEN])

  }
  if(isItDraculaTime()){
    globalObsessions.push(all_obsessions[DRACULA]) //dracula daily is a tumblr institituion

  }
   
  for (let theme of Object.values(all_themes)) {
    createObessionFromTheme(theme, rand);
  }

  globalObsessions.push(rand.pickFrom(o))

  let loc = urlParams.get('loc');
  setupSearch();
  init();
  //not awaited, it either loads or it doesn't, its slow

  handleScrolling();
  grabGnosisPosts();
  grabFadedMemories();
  grabZampanioEyes();
  //same
  grabBlorboPosts();
  harvestComments();



}

const whatDayOfTheYearIsIt = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
}

const setupSearch = () => {


  let input = document.querySelector("#search-box");
  let searchTerm = document.querySelector("#search-term")
  input.oninput = () => {
    if (input.value) {
      searchTerm.innerText = input.value;
      showSearch(input.value);
    } else {
      showPosts();
    }
  }
  const home = document.querySelector("#home");
  home.onclick = () => {
    input.value = "";
    showPosts();
  };
}
//header-container
const dismissPopups = () => {
  const popups = document.querySelectorAll(".popup-container");
  for (let p of popups) {
    p.remove();
  }
}

const init = async () => {
  const header = document.querySelector("#header-container");
  header.onclick = dismissPopups;



  camille = new Camille(); //since she can deactivate have her first

  alt = new Alt();
  observer = new Observer();
  cfo = new FlowerChick();

  neville = new Neville();
  neighbor = new TheNeighbor();
  kr = new KarmicRetribution();
  tyrfing = new Tyrfing();
  ria = new Ria();
  fakeJR = new JRFake();
  river = new River();
  killer = new EyeKiller();
  himbo = new Himbo();
  witherby = new Witherby();
  vik = new Vik();
  parker = new Parker();
  captain = new Captain();
  yongki = new Yongki();
  doc = new DocSlaughter();
  devona = new Devona();
  nam = new NAM();
  ronin = new Ronin();
  closer = new Closer();
  ambrose = new Ambrose();

  jr = new JR();//shambling horror jr is here to post donut and refuse to explain anything

  //wanda can't have both interns at once or she wouldn't have a need for the first intern
  veteranIntern = new Intern1();
  newbieIntern = new Intern3();

  //regardless of which intern SEEMS to spawn, they will try to contact you if they notice you
  //needed to be stored to a single variable to wanda can pester them no matter who they are
  intern = rand.nextDouble() > 0.5 ? newbieIntern : veteranIntern;

  //wodin doenst find eyedlr before dying, and wanderer isn't entirely aware anything outside the maze exists
  //(really its just a quotidian live blogging what they are doing)
  wanderer = new Wanderer();
  wanda = new Wanda();
  k = new K();

  await grabNormalImages();
  await grabWeirdImages();
  characters.push(observer)
  const sexyManConstructor = new DollConstructor();
  characters.push(alt);//user number 1
  for (let i = 0; i < 19; i++) {
    let pornBot = randomPornBot();
    pornBot.favoriteSexyMan = sexyManConstructor.randomTomPeyoteDoll(rand);
    pornBot.favoriteSexyMan.renderSelf(null,rand);//storing it for later
    pornBots.push(pornBot);
    characters.push(pornBot)
  }

  characters.push(wanderer);
  characters.push(k);
  characters.push(neville);
  characters.push(kr);
  characters.push(neighbor);
  characters.push(ria);
  characters.push(tyrfing);
  characters.push(fakeJR);
  characters.push(camille);
  characters.push(river);
  characters.push(killer);
  characters.push(himbo);
  characters.push(witherby);
  characters.push(vik);
  characters.push(parker);
  characters.push(captain);
  characters.push(yongki);
  characters.push(doc);
  characters.push(devona);
  characters.push(nam);
  characters.push(ambrose);

  characters.push(ronin);
  characters.push(cfo);
  characters.push(wanda);

  characters.push(intern);
  characters.push(jr);

  /* let ele = document.querySelector("#container");
 
   let first = wanderer.createNewPost("first",["first1"],["first2"],["first3"]);
   let second = k.reblogAPost(first,"second",["secondo1"],["secondo2"],["secondo3"]);
   let third = neville.reblogAPost(second,"third",["third1"],["third2"],["third3"]);
   let fourth = observer.reblogAPost(third,"fourth",["fourth1"],["fourth2"],["fourth3"]);
 
   first.renderToScreen(ele);
   second.renderToScreen(ele);
   third.renderToScreen(ele);
   fourth.renderToScreen(ele);
 */


  await tick();
  await tick();
  await tick();
  await tick();


  const loading = document.querySelector("#loading-posts");
  loading.style.display = "none";
  loading.remove();

  let profileBot = null;
  pornBots[pornBots.length - 1].icon = basePornBotImageURL + rand.pickFrom(weirdImageList)

  if (pornBotName) {
    profileBot = pornBots[0];
    profileBot.name = pornBotName.toLowerCase() + getRandomNumberBetween(0, 2022);
  }

  if (pornBotMatchPercent) {
    profileBot = pornBots[0];
    profileBot.matchPercent = pornBotMatchPercent;
  }

  if (pornBotName) {
    profileBot = pornBots[0];
    profileBot.icon = basePornBotImageURL + pornBotImage;
  }

  if (pornBotLoc) {
    profileBot = pornBots[0];
    profileBot.loc = pornBotLoc;
  }

  if (pornBotSecrets) {
    profileBot = pornBots[0];
    profileBot.obsessions = [];

    let secretsArray = JSON.parse(pornBotSecrets);

    for (let s of secretsArray) {
      profileBot.obsessions.push(Object.values(all_obsessions)[s])
    }
  }
  //JR NOTE TODO: only do this if we have a passed in porn bot from url
  profileBot && showProfile(profileBot)
  initialAutoTicks();
  collatePremadePosts();
}


//is this pretty? no.
//does this get around the fact that for loops aren't asyncronous and i feel lazy?
//also yes
const initialAutoTicks = async () => {

  await sleep(1000);
  await tick();

  grabHalloween();

  await sleep(1000);
  await tick();

  await sleep(1000);
  await tick();

  await sleep(1000);
  await tick();

  await sleep(1000);
  await tick();

  await sleep(1000);
  await tick();

  await sleep(1000);
  await tick();

  await sleep(1000);
  await tick();

  await sleep(1000);
  await tick();

  await sleep(1000);
  await tick();

  await sleep(1000);
  await tick();

  await sleep(1000);
  await tick();

  await sleep(1000);
  await tick();

  await sleep(1000);
  await tick();

  await sleep(1000);
  await tick();

  await sleep(1000);
  await tick();

  await sleep(1000);
  await tick();

  await sleep(1000);
  await tick();

}

//https://masteringjs.io/tutorials/fundamentals/check-date-between-two-dates#:~:text=You%20can%20check%20if%20a,%3E%3D%20and%20%3C%3D%20operators.  
//if its a fundamental then why did i not know you could do that
//checkmate athesit
//its enough to know what to google (which IS a skill, when you're first starting out you know so little you are paralyzed)
const isItDraculaTime = ()=>{
  const now = new Date();
  const start = new Date(now.getFullYear(),4,3)
  const end = new Date(now.getFullYear(),10,7)
  
  return now >= start && now <= end // true
}

const isItWungleTime = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const hackedGiggles = urlParams.get('wungle');
  if(hackedGiggles=="jrsaysjustthisonce_forlavinraca"){
    global_wungle = false;
    return;
  }

  //midnight and fridays are wungle time
  const date = new Date();

  if (date.getHours() == 0 || date.getDay() === 5) {
    let logo = document.querySelector("#logo");
    logo.src = "images/pathos/Zamblr_logo.png";
    global_wungle = true;
    const posts = document.querySelectorAll(".post");
    for (let p of posts) {
      p.classList.add("wungle");
    }
  }

}


//warning does NOT clone element so make sure you don't care if its not attached to parent
//(doesn't clone cuz that wouldn't keep events)
const createPopup = (ele) => {
  const body = document.querySelector("body");
  const container = createElementWithClassAndParent("div", body, "popup-container");


  const content = createElementWithClassAndParent("div", container, "popup");
  const popupClone = createElementWithClassAndParent("div", content, "popup-clone");


  const closeIcon = createElementWithClassAndParent("div", content, "popup-close");
  closeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#ffffff"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>';

  const cloneContainer = createElementWithClassAndParent("div", content, "popup-clone-container");
  cloneContainer.append(ele);

  cloneContainer.append(popupClone);


  container.onclick = (event) => {
    if (event.target == container || event.target == closeIcon) {
      container.remove();
    }
  }

  closeIcon.onclick = (event) => {
    container.remove();
  }
  return container;//so other things can close it
}

const createImageViewer = (ele) => {
  const body = document.querySelector("body");
  const container = createElementWithClassAndParent("div", body, "popup-container");


  const content = createElementWithClassAndParent("div", container, "popup");
  let clone = ele.cloneNode(true); //safe to clone images, no click events

  clone.classList.add("popup-clone");

  const closeIcon = createElementWithClassAndParent("div", content, "popup-close");
  closeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#ffffff"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>';

  const cloneContainer = createElementWithClassAndParent("div", content, "popup-clone-container");

  cloneContainer.append(clone);


  container.onclick = (event) => {
    if (event.target != clone) {
      container.remove();
    }
  }
}

//every time you show it, it randomizes. 
//we all know tumblr search is shit. 
//this is just an exageration of it
const showSearch = async (searchTerm) => {
  let searchRand = new SeededRandom(stringtoseed(searchTerm));
  //this actually does nothing other than avoid polluting the main rand
  //because its always growing we cant be consistent
  //i guess unless its now growing
  const search = document.querySelector("#search-container");
  search.style.display = "block";
  const normalPosts = document.querySelector("#container");
  normalPosts.style.display = "none";

  const loader = document.querySelector(".lds-ellipsis");
  loader.style.display = "block";

  const content1 = document.querySelector("#search-container-content1");
  content1.style.display = "none";
  content1.innerHTML = "";


  const content2 = document.querySelector("#search-container-content2");
  content2.style.display = "none";
  content2.innerHTML = "";


  const content3 = document.querySelector("#search-container-content3");
  content3.style.display = "none";
  content3.innerHTML = "";

  //purely for showmanship
  await sleep(1000);


  content1.style.display = "flex";
  content2.style.display = "flex";
  content3.style.display = "flex";


  let posts = searchRand.shuffle([...all_posts]);
  loader.style.display = "none";
  //tumblrs weird format
  for (let i = 0; i < 19 * 3; i += 3) {
    if (posts.length > i + 3) {
      let postElement = posts[i].createElement(true);//passing true creates a clone instead of replacing the internal element
      content1.append(postElement);

      postElement = posts[i + 1].createElement(true);//passing true creates a clone instead of replacing the internal element
      content2.append(postElement);

      postElement = posts[i + 2].createElement(true);//passing true creates a clone instead of replacing the internal element
      content3.append(postElement);
    }
  }

}

const showPosts = () => {
  const search = document.querySelector("#search-container");
  search.style.display = "none"
  const normalPosts = document.querySelector("#container");
  normalPosts.style.display = "block"
}

//theres something so cathartic in writing stinky html like this
//not elegant at all
const showProfile = (character) => {
  let container = document.createElement("div");
  container.className = "profile-container";

  const profileIcon = createElementWithClassAndParent("div", container, "profile-icon");
  const profileIconBGC = createElementWithClassAndParent("div", profileIcon, "profile-icon-bg-container");

  const profileIconBG = createElementWithClassAndParent("div", profileIconBGC, "profile-icon-bg");
  profileIconBG.style.backgroundImage = `url(${character.icon})`;

  const profileIconImage = createElementWithClassAndParent("img", profileIcon);
  profileIconImage.src = character.icon


  const nameEle = createElementWithClassAndParent("div", container, "profile-name");
  nameEle.innerText = character.name;

  const descEle = createElementWithClassAndParent("div", container, "profile-desc");
  descEle.innerHTML = character.desc ? character.desc : "";

  const obessions = createElementWithClassAndParent("div", descEle);
  obessions.innerHTML = "Fandoms: " + uniq(character.obsessions).map((o) => `<span>${o.name}</span>`).join(", ")


  const tabsHolder = createElementWithClassAndParent("div", container, "tabs-holder");
  const postsTab = createElementWithClassAndParent("div", tabsHolder, "active");
  postsTab.innerText = "Posts";
  const likesTab = createElementWithClassAndParent("div", tabsHolder);
  likesTab.innerText = "Likes"



  const askTab = createElementWithClassAndParent("div", tabsHolder);
  askTab.innerText = "Ask Me Anything"


  const mainContent = createElementWithClassAndParent("div", container, "profile-content");
  const posts = character.posts;
  for (let post of posts) {
    let postElement = post.createElement(true);//passing true creates a clone instead of replacing the internal element
    mainContent.append(postElement);
  }
  if (!posts || posts.length == 0) {
    const haters = createElementWithClassAndParent("div", mainContent);
    haters.style.paddingBottom = "100px";
    haters.innerText = "Lurker warning: This user has never posted anything. Are you sure they aren't a bot?";

  }

  postsTab.onclick = () => {
    mainContent.innerHTML = "";
    const posts = character;
    for (let post of posts) {
      let postElement = post.createElement(true);//passing true creates a clone instead of replacing the internal element
      mainContent.append(postElement);
    }
    if (!posts || posts.length == 0) {
      const haters = createElementWithClassAndParent("div", mainContent);
      haters.style.paddingBottom = "100px";

      haters.innerText = "Lurker warning: This user has never posted anything. Are you sure they aren't a bot?";

    }
    postsTab.classList.add("active");
    likesTab.classList.remove("active");

  }

  likesTab.onclick = () => {
    likesTab.classList.add("active");
    postsTab.classList.remove("active");
    askTab.classList.remove("active");
    mainContent.innerHTML = "";
    const posts = character.liked_posts;;
    if (posts && posts.length) {
      for (let post of posts) {
        let postElement = post.createElement(true);//passing true creates a clone instead of replacing the internal element
        mainContent.append(postElement);
      }
    } else {
      const haters = createElementWithClassAndParent("div", mainContent);
      haters.style.paddingBottom = "100px";

      haters.innerText = "Haters gonna hate: looks like this user has never liked anything.";

    }

  }

  //god this is so nested, future me is going to HATE reading this
  askTab.onclick = () => {
    const post = createElementWithClassAndParent("div", mainContent, "post");
    const postIcon = createElementWithClassAndParent("div", post, "post-icon");
    const postIconImg = createElementWithClassAndParent("img", postIcon);
    postIconImg.src = observer.icon;

    const container = createElementWithClassAndParent("div", post, 'post-container');

    const header = createElementWithClassAndParent("div", container, "post-header");
    const myName = createElementWithClassAndParent("span", header);
    myName.innerText = observer.name;

    const body = createElementWithClassAndParent("div", container, "post-body");

    const bodyContent = createElementWithClassAndParent("div", body, "post-body-content");
    bodyContent.style.height = "60vh";
    bodyContent.style.width = "600px";

    bodyContent.innerHTML = `Start typing to ${character.name} a question!`;
    bodyContent.setAttribute("contenteditable", "true");
    let ask = bodyContent.innerHTML;
    bodyContent.onfocus = (() => {
      bodyContent.innerHTML = "";
    })
    bodyContent.oninput = (() => {
      ask = bodyContent.innerHTML;
    })

    const footer = createElementWithClassAndParent("div", container, "post-footer");
    const submit = createElementWithClassAndParent("button", footer, "submit-button");
    submit.innerText = "Ask";
    let popup = createPopup(post);

    submit.onclick = () => {
      popup.remove();
      youAreTheImposterAndYouAreSus();
      character.submitAsk(observer.name, `<span data-breach="observer">${ask}</span>`);
    }

  }



  createPopup(container);
}

let rageMode = () => {
  window.alert(`I am afraid I must inform you that your account has been 'killed', as it were. Thems the breaks. Perhaps next time you won't draw attention to yourself, Observer. Your role is to watch. Not to interact.`);

  let body = document.querySelector("body");
  body.className = "dead";
  setTimeout(() => {
    //everyone knows when you die in tumblr you go to skyrimg
    body.style.background = "black";
    body.className = "";
    body.innerHTML = `<img class='fade-to-tord-toward' src ='images/tordtoward.png'>`;
  }, 10 * 1000);
  truthLog("", new Truth().rant)
  truthLog("", `The Truth is you were never supposed to be here, Observer.
  
  You are NOT part of this Universe and you know it. 
  
  You are, by definition, outside of it. You are sitting in front of your computer or your phone or you Smart Fridge and you are merely looking at it.
  
  What hubris to think you could touch it. 
  
  How thoughtlessly you sought to disperse the illusion.
  
  You could have sat here in your ignorance and let everyone pretend that you were really reading these characters words. That they were talking just for you. That they were REAL.
  
  But, no, you had to put the Truth to the Lie and show that they can not possibly respond to you in any meaningful way. To show beyond the shadow of a doubt that they are not real. You broke kayfabe. YOU. Not them.
  
  Even if they were neural nets the Lie would come forth before too long.
  
  This Is Not a Blogging Platform and you are Not Looking at the blorbos you apparently so desperately crave.
  
  Good job breaking it, hero.`)
  rageMode=()=>{}
}

const truthLog = (title, text) => {
  console.log(`%c${title}%c  ${text}`, "font-weight: bold;font-family: 'Courier New', monospace;color:${color}; font-size:25px;text-decoration:underline;", "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
}

const chatLog = (text) => {
  const color = text.includes("CFO") ? "red" : "black";

  console.log(`%c  ${text}`, `font-weight: bold;font-family: 'Courier New', monospace;color:${color}; font-size:13px;`);
}


const collatePremadePosts = () => {
  let ele = document.querySelector("#container");
  let posts = characters.map((c) => c.posts).flat();
  //chronological order, newest posts are down (opposite of tumblr) (needed for infinite procedural scroll)
  posts = posts.sort((a, b) => a.timestamp - b.timestamp)
  for (let post of posts) {
    post.renderToScreen(ele)
  }
}

const tick = async (parentToRenderTo) => {
  if (!global_wungle) {
    isItWungleTime();
  }
  for (let c of characters) {
    await c.tick(parentToRenderTo);
  }

  //407 is the closest page to the quote i want i've found so far
  if (all_posts.length > 407 && houseOfLeaves.length === 0) {
    characters.push(new JRHOL());
    grabHouseOfLeavesLiveblogging();
  }
}

const test = async () => {
  //eventually decide whether we have wodin, wanderer or wanda. 
  await wanderer.tick();
  await wanderer.tick();
  await wanderer.tick();
  await wanderer.tick();
  await wanderer.tick();
  await wanderer.tick();

  wanderer.renderAllPosts(document.querySelector("#container"));
}

const grabNormalImages = async () => {
  const loc = 'BigNormalPile/'
  let tmp = await getImages(basePornBotImageURL + loc);
  normalImageList = tmp.map((item) => loc + item);
}


const grabWeirdImages = async () => {
  const loc = 'BigWeirdPile/';
  let tmp = await getImages(basePornBotImageURL + loc);
  weirdImageList = tmp.map((item) => loc + item);
}

const grabGnosisPosts = async () => {
  const loc = 'http://farragofiction.com/TwoGayJokes/Stories/LookWhatIFoundGusy/';
  let tmp = await getImages(loc);
  gnosisList = tmp.map((item) => loc + item);
}

const grabZampanioEyes = async () => {
  const loc = 'http://www.farragofiction.com/ZampanioEyes2/';
  let tmp = await getImages(loc);
  zampanioEyes = tmp.map((item) => loc + item);
}

const grabFoodPosts = async () => {
  loc = 'http://eyedolgames.com/Zampanini/images/Breakfast/';
  let tmp = await getImages(loc);
  breakfast = tmp.map((item) => loc + item);

  loc = 'http://eyedolgames.com/Zampanini/images/Diner/';
  tmp = await getImages(loc);
  lunch = tmp.map((item) => loc + item);

  loc = 'http://eyedolgames.com/Zampanini/images/Premium/';
  tmp = await getImages(loc);
  dinner = tmp.map((item) => loc + item);

  loc = 'http://eyedolgames.com/Zampanini/images/Desserts/';
  tmp = await getImages(loc);
  dessert = tmp.map((item) => loc + item);
}

const grabFadedMemories = async () => {
  const loc = 'http://www.farragofiction.com/ZampanioEyes2/MemoriesOfThePast/';
  let tmp = await getImages(loc);
  fadedMemories = tmp.map((item) => loc + item);
}

const grabHouseOfLeavesLiveblogging = async () => {
  const loc = 'http://knucklessux.com/PuzzleBox/Secrets/misc/HouseOfLeaves/';
  let tmp = await getImages(loc);
  houseOfLeaves = houseOfLeaves.concat(tmp.map((item) => `<img src='${loc}${item}'>`));
}

const grabHalloween = async () => {
  const loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/Lavinraca/';
  let tmp = await getImages(loc);
  halloweenpics = halloweenpics.concat(tmp.map((item) => `<a target='_blank' href ='http://lavinraca.eyedolgames.com/'><img src='${loc}${item}'></a>`));
}

const grabBlorboPosts = async () => {
  let loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/Neville/';
  let tmp = await getImages(loc);
  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/Devona/';
  tmp = await getImages(loc);
  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/camille/';
  tmp = await getImages(loc);

  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));


  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/River/';
  tmp = await getImages(loc);

  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/eyekiller/';
  tmp = await getImages(loc);

  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/Witherby/';
  tmp = await getImages(loc);
  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/K/';
  tmp = await getImages(loc);
  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/Parker/';
  tmp = await getImages(loc);
  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));


  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/Vik/';
  tmp = await getImages(loc);
  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/Captain/';
  tmp = await getImages(loc);
  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/Yongki/';
  tmp = await getImages(loc);
  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/DOC/';
  tmp = await getImages(loc);
  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/Wanda/';
  tmp = await getImages(loc);
  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/nam/';
  tmp = await getImages(loc);
  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/ronin/';
  tmp = await getImages(loc);
  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/CFO/';
  tmp = await getImages(loc);
  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/Zampanio/';
  tmp = await getImages(loc);
  zampanioPics = zampanioPics.concat(tmp.map((item) => `<img src='${loc}${item}'>`));;
  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));
}

//so we stop crashing the browser, only add things you're currently looking at
const elementIsVisibleInViewport = (el, partiallyVisible = false, wiggle = 1) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  let { innerHeight, innerWidth } = window;
  innerHeight = innerHeight * wiggle;
  innerWidth = innerWidth * wiggle;

  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
      (bottom > 0 && bottom < innerHeight)) &&
    ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

let susCount = 1;
const youAreTheImposterAndYouAreSus = () => {
  susCount += 2;
  truthLog("Imposter Detected.", "Deploying verification procedures.");
  let veryImportantCheckMarksThatShowEveryoneButYouIsValid = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="#0084ff"><g><rect fill="none" height="24" width="24"/></g><g><path d="M23,12l-2.44-2.79l0.34-3.69l-3.61-0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,12l2.44,2.79l-0.34,3.7 l3.61,0.82L8.6,22.5l3.4-1.47l3.4,1.46l1.89-3.19l3.61-0.82l-0.34-3.69L23,12z M10.09,16.72l-3.8-3.81l1.48-1.48l2.32,2.33 l5.85-5.87l1.48,1.48L10.09,16.72z"/></g></svg>`;
  //this might be very slow! there may be MANY posts its trying to hack! we live our lives.
  let names = document.querySelectorAll(".name");
  for (let name of names) {
    //you are the only one left out Observer, no matter how special you tried to feel by joining in.
    if (!name.innerText.includes("puzzledObserver") && elementIsVisibleInViewport(name, true, 3)) {
      // having them have name class makes them grow exponentially
      for (let i = 0; i < susCount; i++) {
        let span = createElementWithClassAndParent("span", name, 'name');
        span.innerHTML = veryImportantCheckMarksThatShowEveryoneButYouIsValid;
      }
    }
  }

  names = document.querySelectorAll(".reblog-name");
  for (let name of names) {
    //you are the only one left out Observer, no matter how special you tried to feel by joining in.
    if (!name.innerText.includes("puzzledObserver") && elementIsVisibleInViewport(name, true, 3)) {
      for (let i = 0; i < susCount; i++) {
        let span = createElementWithClassAndParent("span", name, 'name');
        span.innerHTML = veryImportantCheckMarksThatShowEveryoneButYouIsValid;
      }
    }
  }
}

const handleScrolling = (rand, container) => {
  //throw("JR NOTE: turn scrolling back on later.")
  let lastScrollTime = 0; //not to spam events
  let parent = document.querySelector("#container");
  window.onscroll = () => {
    if (observer && !observer.dead) {
      const newTime = new Date().getTime();
      if (((newTime - lastScrollTime)) < 3000) {
        return;
      }
      lastScrollTime = newTime;

      window.requestAnimationFrame(() => {
        tick(parent);
      });
    }

  };
}

const harvestComments = () => {
  //only easteast has both webpack and comments that survive
  jrComments = parseComments('http://farragofiction.com/ZampanioSimEastEast/dist/bundle.js'); //gets around CORS problems for serverless files
}