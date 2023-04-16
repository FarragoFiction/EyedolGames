


let normalImageList = [];
let weirdImageList = [];


let characters = [];


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
  if(!seed){
    seed = 13;
  }
  rand = new SeededRandom(seed);

  let loc = urlParams.get('loc');
  init();
  handleScrolling();

}

const init = async()=>{
   wanderer = new Wanderer();
  observer = new Observer();
  k = new K();
  characters.push(wanderer);
  characters.push(k);

  for(let i = 0; i<10; i++){
    await tick();
  }
  collatePremadePosts();
}

const collatePremadePosts = ()=>{
  let posts = characters.map((c)=>c.posts).flat();
  //chronological order, newest posts are down (opposite of tumblr) (needed for infinite procedural scroll)
  posts = posts.sort((a,b)=>a.timestamp-b.timestamp)
  for(let post of posts){
    post.renderToScreen(document.querySelector("#container"))
  }
}

const tick = async(parentToRenderTo)=>{
  for(let c of characters){
    await c.tick(parentToRenderTo);
  }
}

const test = async()=>{
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
  let tmp = await getImages(baseURL+loc);
  normalImageList = tmp.map((item) => loc  + item);
}


const grabWeirdImages = async () => {
  const loc =   'BigWeirdPile/';
  let tmp = await getImages(baseURL+loc);
  weirdImageList = tmp.map((item) => loc  + item);
}



const handleScrolling = (rand, container) => {
  //throw("JR NOTE: turn scrolling back on later.")
  let lastScrollTime = 0; //not to spam events
  let parent = document.querySelector("#container");
  window.onscroll = () => {
      const newTime = new Date().getTime();
      if (((newTime - lastScrollTime)) < 500) {
          return;
      }
      lastScrollTime = newTime;

      window.requestAnimationFrame(() => {
          tick(parent);
      });

  };
}