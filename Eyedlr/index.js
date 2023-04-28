


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
  fakeJR = new JRFake();
  camille = new Camille();

  await grabNormalImages();
  await grabWeirdImages();
  characters.push(observer)
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
  characters.push(fakeJR);
  characters.push(camille);


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

//theres something so cathartic in writing stinky html like this
//not elegant at all
showProfile = (character) => {
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

  const tabsHolder = createElementWithClassAndParent("div", container, "tabs-holder");
  const postsTab = createElementWithClassAndParent("div", tabsHolder, "active");
  postsTab.innerText = "Posts";
  const likesTab = createElementWithClassAndParent("div", tabsHolder);
  likesTab.innerText = "Likes"



  const askTab = createElementWithClassAndParent("div", tabsHolder);
  askTab.innerText = "Ask Me Anything"


  const mainContent = createElementWithClassAndParent("div", container, "profile-content");
  const posts = character.posts.reverse();
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
    const posts = character.posts.reverse();
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
    console.log("JR NOTE: likes tab click")
    likesTab.classList.add("active");
    postsTab.classList.remove("active");
    askTab.classList.remove("active");
    mainContent.innerHTML = "";
    const posts = character.liked_posts.reverse();
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



  createPopup(container);
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

const grabBlorboPosts = async () => {
  let loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/Neville/';
  let tmp = await getImages(loc);

  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

  loc = 'http://eyedolgames.com/Eyedlr/images/Secrets/tumblr_screenshots/camille/';
  tmp = await getImages(loc);

  blorboPosts = blorboPosts.concat(tmp.map((item) => `<img src='${loc}${item}'>`));

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