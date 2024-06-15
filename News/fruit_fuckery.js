/*
closer gets pissed that alt upset flower chick and vows vengence
uses her political ties (which she only has in SOME universes) to try to stop online fraud and bot nets
alt retalitates with having her quotidian porn bots make a bunch of mocking fruit spam to hound closer online

they hack various pages they find and just. throw these godawful shitty ads in
*/


const sinfulInjectedCSSFruit = `
  <style>

  .fruit{
    position: absolute; 
    border: 3px solid black;
    border-radius: 4px;
  }

  .fruit img{
    width: 300px;
  }

  .footer{
    width: 280px;
    margin: 0px;
    border-bottom: 8px;
    background-color: red;
    color: white;
    font-family: Comic Sans;
    font-size: 24px;
    position: absolute;
    bottom: 0px;
    text-align: center;
    left: 0px;
    padding: 10px;
    letter-spacing: 3px;
  }



  </style>
`;


initFruitFuckery = async ()=>{
  await sleep(getRandomNumberBetween(1500,130000));
  const body = document.querySelector("body");
  const css = document.createElement("div");
  css.innerHTML = sinfulInjectedCSSFruit;
  body.append(css);

  const div = createElementWithClassAndParent("div", body, "fruit");
  div.style.top = getRandomNumberBetween(0,100)+"vh";
  div.style.left = getRandomNumberBetween(0,100)+"vw";

  const anchor = createElementWithClassAndParent("a", div);
  anchor.href = "http://farragofiction.com/FruitSim/";
  anchor.alt = "hey there cool kid is this you?";
  anchor.data = "alt thinks its so damn funny that the closer acts so high and mighty when she's such a mess in the apocalypse"; 
  anchor.target="_blank"
  const img = createElementWithClassAndParent("img", anchor);
  const footer = createElementWithClassAndParent("div", anchor,"footer");
  footer.innerText = pickFrom(["Satisfy Your Craving","Time for Fruit","Fruit?","Fruit Time!","You Can't Resist!","Fruit For You!"])

  footer.style.backgroundColor = `rgb(${getRandomNumberBetween(0, 100)},${getRandomNumberBetween(0, 100)},${getRandomNumberBetween(0, 100)})`;

  const base_url = "http://farragofiction.com/CatalystsBathroomSim/images/froot/";
  let tmp = await getImages(base_url);
  img.src = base_url + pickFrom(tmp);

  await sleep(getRandomNumberBetween(5000,60000));
  const music = await getWeirdMusic("http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/");
  const audio = new Audio();
  audio.src = "http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/" +pickFrom(music);
  audio.play();
}


//key, value status
const cachedAudioFruit = {}

const audioExtensionsFruit = [
  "mp3",
];
const filePatternAudioFruit = new RegExp('<a href="([^?]*?)">', 'g');

const extensionPatternAudioFruit = new RegExp(`\\\.(${audioExtensionsFruit.join("|")})\$`);


const getWeirdMusic = async(url)=>{
  if (cachedAudioFruit[url]) {
    return cachedAudioFruit[url];
  }

  let promise = new Promise(async (resolve, reject) => {
    try {
      const rawText = await httpGetAsync(url);

      let files = [];
      const match = rawText.matchAll(filePatternAudioFruit);
      const matches = Array.from(match, (res) => res);
      for (let m of matches) {
        const item = m[1];
        if (item.match(extensionPatternAudioFruit)) {
          files.push(item);
        }
      }
      cachedAudioFruit[url] = files;
      //console.log("JR NOTE: returned from network for", url)
      resolve(files);
    } catch (e) {
      console.log("JR NOTE: error", e)
      reject();
      return [];
    }
  })
  cachedAudioFruit[url] = promise;
  return promise;
}

window.addEventListener("load",initFruitFuckery)