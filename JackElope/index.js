

let currentPage;

let normalImageList = [];
let weirdImageList = [];

//pure string, convert to numerical seed later.
let seedSource = "seed="

let seed = 0;

window.onload = () => {

  initThemes();
  currentPage = new HomePage();
  currentPage.deploy();
}

const grabNormalImages = async () => {
  const loc = 'http://eyedolgames.com/JackElope/images/SexySingles/BigNormalPile/'
  let tmp = await getImages(loc);
  normalImageList = tmp.map((item) => loc  + item);
}


const grabWeirdImages = async () => {
  const loc = 'http://eyedolgames.com/JackElope/images/SexySingles/BigNormalPile/'
  let tmp = await getImages(loc);
  weirdImageList = tmp.map((item) => loc  + item);
}


