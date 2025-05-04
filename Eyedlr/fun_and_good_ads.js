/*
this only works in eyedlr, not stand alone


ngl i just want a system to make everyone look at gifs of my new kittens

this is for places (unlike the news site)
where disruptive video ads with audio would be annoying
*/

let weird_gifs;
let weird_blurbs;

const gif_url = "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/";
const blurb_url = `http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/WeirdGifs/WeirdTextBlurbs/`;



initSimpleAd = async () => {
  console.warn("JR NOTE: don't forget to remove this from landing bathroom, its just there as a test")
  const body = document.querySelector("body");
  const simpleAd = createElementWithClassAndParent("div", body, 'simple-ad');
  simpleAd.style.cursor="pointer"

  const container = createElementWithClassAndParent("div", simpleAd, 'post-container');

  const header = createElementWithClassAndParent("div", container, "post-header");
  const myName = createElementWithClassAndParent("span", header);
  myName.innerText = "Sponsored by Poob Gaming"

  const postBody = createElementWithClassAndParent("div", container, "post-body");
  const postTitle = createElementWithClassAndParent("div", postBody,);
  postTitle.style.cssText =`font-weight: 600;
    opacity: 0.6;
    font-size: 20px;
    text-transform: capitalize;`;

  weird_blurbs = await getWeirdTextBlurbSimpleAd(blurb_url);
  postTitle.innerHTML = await blurbFromNetwork(blurb_url +pickFrom(weird_blurbs))

  weird_gifs = await getWeirdImageSimpleAd(gif_url);
  const gif = createElementWithClassAndParent("img", postBody);
  gif.src = gif_url + pickFrom(weird_gifs);
  gif.style.width ="222px";

  const postContent = createElementWithClassAndParent("div", postBody,);
  postContent.innerHTML = await blurbFromNetwork(blurb_url +pickFrom(weird_blurbs))
  postContent.style.cssText =`font-weight: 300;
    opacity: 0.6;
    font-size: 12px;`;

    if(isItFriday()){
      postTitle.innerHTML = "You Should Rest"
      postContent.innerHTML = "Zampanio Will Still Be Here Later. Friday's and the Midnight Hour are our reminders that Zampanio needs us to live a long, fullfilling, varied life."
      gif.src = "http://eyedolgames.com/News/images/Quizzes/jr_modified.gif";
    }else{
      simpleAd.onclick = async()=>{
        postTitle.innerHTML = await blurbFromNetwork(blurb_url +pickFrom(weird_blurbs))
        postContent.innerHTML = await blurbFromNetwork(blurb_url +pickFrom(weird_blurbs))
        gif.src = gif_url + pickFrom(weird_gifs);
      }
    }



}

const blurbFromNetwork = async (url) => {
  const rawText = await httpGetAsync(url);
  return rawText;
}

//lazy namespacing for all!

const getRandomNumberBetweenSimpleAd = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const pickFromSimpleAd = (array) => {
  return array[getRandomNumberBetweenSimpleAd(0, array.length - 1)];
}





//key, value status
const cachedImageSimpleAd = {}
const cachedTextBlurbsSimpleAd = {}


const imageExtensionsSimpleAd = [
  "png",
  "PNG",
  "gif",
  "jpg",
  "jpeg"
];

const textExtensionsSimpleAd = [
  "txt"
];

const filePatternImageSimpleAd = new RegExp('<a href="([^?]*?)">', 'g');
const filePatternTextSimpleAd = new RegExp('<a href="([^?]*?)">', 'g');


const extensionPatternImageSimpleAd = new RegExp(`\\\.(${imageExtensionsSimpleAd.join("|")})\$`);
const extensionPatternTextSimpleAd = new RegExp(`\\\.(${textExtensionsSimpleAd.join("|")})\$`);


const getWeirdImageSimpleAd = async (url) => {
  if (cachedImageSimpleAd[url]) {
    return cachedImageSimpleAd[url];
  }

  let promise = new Promise(async (resolve, reject) => {
    try {
      const rawText = await httpGetAsync(url);

      let files = [];
      const match = rawText.matchAll(filePatternImageSimpleAd);
      const matches = Array.from(match, (res) => res);
      for (let m of matches) {
        const item = m[1];
        if (item.match(extensionPatternImageSimpleAd)) {
          files.push(item);
        }
      }
      cachedImageSimpleAd[url] = files;
      //console.log("JR NOTE: returned from network for", url)
      resolve(files);
    } catch (e) {
      console.log("JR NOTE: error", e)
      reject();
      return [];
    }
  })
  cachedImageSimpleAd[url] = promise;
  return promise;
}



const getWeirdTextBlurbSimpleAd = async (url) => {
  if (cachedTextBlurbsSimpleAd[url]) {
    return cachedTextBlurbsSimpleAd[url];
  }

  let promise = new Promise(async (resolve, reject) => {
    try {
      const rawText = await httpGetAsync(url);

      let files = [];
      const match = rawText.matchAll(filePatternTextSimpleAd);
      const matches = Array.from(match, (res) => res);
      for (let m of matches) {
        const item = m[1];
        if (item.match(extensionPatternTextSimpleAd)) {
          files.push(item);
        }
      }
      cachedTextBlurbsSimpleAd[url] = files;
      //console.log("JR NOTE: returned from network for", url)
      resolve(files);
    } catch (e) {
      console.log("JR NOTE: error", e)
      reject();
      return [];
    }
  })
  cachedTextBlurbsSimpleAd[url] = promise;
  return promise;
}





if(Math.random()>0.05){ //just to keep you guessing if this really exists
  console.log("JR NOTE: its time to parody tumblr ads baby")
  window.addEventListener("load", initSimpleAd)
}
