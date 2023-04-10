


let normalImageList = [];
let weirdImageList = [];





//pure string, convert to numerical seed later.
let seedSource = "seed="
let baseURL = `http://eyedolgames.com/JackElope/images/SexySingles/`
let seed = 0;

window.onload = () => {

  initThemes();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //updateURLParams(`name=${name}&image=${image}&matchPercent=${matchPercent}&loc=${loc}`);

  let name = urlParams.get('name');
  let image = urlParams.get('image');
  let matchPercent = parseInt(urlParams.get('matchPercent'));
  let seed = parseInt(urlParams.get('seed'));

  let loc = urlParams.get('loc');

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


