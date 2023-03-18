

let currentPage;

let normalImageList = [];
let weirdImageList = [];

yourLocation = "Westerville, Ohio"

//whichever location you pick we'll add a hundred times to this list
//and each time we render a sexy single we'll remove one of them
const locations = ["Naples, Italy", "Orlando, Florida","Westerville, Ohio"]


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
  const loc = 'http://eyedolgames.com/JackElope/images/SexySingles/BigWeirdPile/'
  let tmp = await getImages(loc);
  weirdImageList = tmp.map((item) => loc  + item);
}


