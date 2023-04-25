


let normalImageList = [];
let weirdImageList = [];
//quotidians post from here, because i feel like the uninitiated deserve confusion
//as a treat
let zampanioEyes = [];
//in case we lose the server, i do not want to forget
let fadedMemories = [];

let characters = [];

let blorboPosts = [];


//pure string, convert to numerical seed later.
let seedSource = "seed="
let baseURL = `http://eyedolgames.com/JackElope/images/SexySingles/`
let seed = 0;
let rand;
let observer, wanderer, k;
window.onload = () => {

  initThemes();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //updateURLParams(`name=${name}&image=${image}&matchPercent=${matchPercent}&loc=${loc}`);

  let name = urlParams.get('name');
  let image = urlParams.get('image');
  let matchPercent = parseInt(urlParams.get('matchPercent'));
  let seed = parseInt(urlParams.get('seed'));
  if (!seed) {
    seed = 13;
  }
  rand = new SeededRandom(seed);

  let loc = urlParams.get('loc');
  //not awaited, it either loads or it doesn't, its slow
  grabFadedMemories();
  grabZampanioEyes();
  //same
  grabBlorboPosts();
  init();
  handleScrolling();

}

const init = async () => {
  wanderer = new Wanderer();
  observer = new Observer();
  k = new K();
  neville = new Neville();
  neighbor = new TheNeighbor();
  kr = new KarmicRetribution();
  tyrfing = new Tyrfing();
  ria = new Ria();

  await grabNormalImages();
  await grabWeirdImages();
  characters.push(randomPornBot())
  characters.push(randomPornBot());
  characters.push(randomPornBot());
  characters.push(randomPornBot());
  characters.push(randomPornBot());
  characters.push(randomPornBot());
  characters.push(randomPornBot());
  characters.push(randomPornBot());
  characters.push(randomPornBot());
  characters.push(randomPornBot());
  characters.push(randomPornBot());
  characters.push(randomPornBot());
  characters.push(randomPornBot());
  characters.push(randomPornBot());
  characters.push(wanderer);
  characters.push(k);
  characters.push(neville);
  characters.push(kr);
  characters.push(neighbor);
  characters.push(ria);
  characters.push(tyrfing);


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

  

  for (let i = 0; i < 10; i++) {
    await tick();
  }
  collatePremadePosts();
}

showProfile = (character)=>{
  window.alert("!!! " + character.name)
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
  for (let c of characters) {
    await c.tick(parentToRenderTo);
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
  let tmp = await getImages(baseURL + loc);
  normalImageList = tmp.map((item) => loc + item);
}


const grabWeirdImages = async () => {
  const loc = 'BigWeirdPile/';
  let tmp = await getImages(baseURL + loc);
  weirdImageList = tmp.map((item) => loc + item);
}

const grabZampanioEyes = async () => {
  const loc = 'http://www.farragofiction.com/ZampanioEyes2/';
  let tmp = await getImages(loc);
  zampanioEyes = tmp.map((item) => loc + item);
}

const grabFadedMemories = async () => {
  console.log("JR NOTE: grabbing faded memoreis")
  const loc = 'http://www.farragofiction.com/ZampanioEyes2/MemoriesOfThePast/';
  let tmp = await getImages(loc);
  console.log("JR NOTE: tmp for memories was", tmp)
  fadedMemories = tmp.map((item) => loc + item);
}

const grabBlorboPosts = async ()=>{
  let loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/Neville/';
  let tmp = await getImages(loc);
  console.log("JR NOTE: tmp is",tmp)

  blorboPosts =blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

}



const handleScrolling = (rand, container) => {
  //throw("JR NOTE: turn scrolling back on later.")
  let lastScrollTime = 0; //not to spam events
  let parent = document.querySelector("#container");
  window.onscroll = () => {
    const newTime = new Date().getTime();
    if (((newTime - lastScrollTime)) < 5000) {
      return;
    }
    lastScrollTime = newTime;

    window.requestAnimationFrame(() => {
      tick(parent);
    });

  };
}