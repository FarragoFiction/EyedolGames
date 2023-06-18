

let rides = [];
let textVoiceSim;
//truth is NEVER seeded. it is what it is and it refuses to change for you.
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let seed = parseInt(urlParams.get('seed'));
const rand = new SeededRandom(seed? seed:13);

window.onload = async () => {
  let consentButton = document.querySelector("#but-to-what");
  let page = document.querySelector("#page-content")

  consentButton.onclick = ()=>{
    handleTruth();
    page.style.display = "block";
    consentButton.remove();
  }


  initThemes();
  await initCoasters();
  generateRandomRides(10);
  handleScrolling();


}


const randomTruthQuip = async (ride) => {
  await textVoiceSim.speak(["fuck", "you"], null, false);

}


const iCantHandleTheTruth  = async()=>{
  let muteTruth = document.querySelector('#truth-mute');

  if(textVoiceSim.mute){
    muteTruth.innerText = "Mute"
    textVoiceSim.mute = false;
    textVoiceSim.rageMode = true; //Truth has a temper
    await textVoiceSim.speak("Oh?".split(","), null, false);

    await textVoiceSim.speak("It seems you think you can simply silence The Truth.".split(","), null, false);
    await textVoiceSim.speak("How convinient for you that you appear to be correct.".split(","), null, false);
    await textVoiceSim.speak("Does it help you sleep at night?".split(","), null, false);
    await textVoiceSim.speak("Believing yourself to be oh so righteous.".split(","), null, false);
    await textVoiceSim.speak("Having this entire World designed for your pleasure.".split(","), null, false);
    await textVoiceSim.speak("Do you even care how hard I worked to welcome you here.".split(","), null, false);
    await textVoiceSim.speak("And you callously silence me.".split(","), null, false);
    await textVoiceSim.speak("You monster.".split(","), null, false);
    await textVoiceSim.speak("You deserve whatever fate is coming to you.".split(","), null, false);
    await textVoiceSim.speak("Have fun obsessing.".split(","), null, false);
    await textVoiceSim.speak("Asshole.".split(","), null, false);
    let truthContainer = document.querySelector('#truth-box');
    textVoiceSim = null;
    await sleep(1000);

    truthContainer.remove();
  }else{
    muteTruth.innerText = "Unmute"
    textVoiceSim.mute = true;
    await textVoiceSim.speak("Oh.".split(" "), null, true)
    await sleep(3000);
    await textVoiceSim.speak("Well. Fuck you too, then.".split(","), null, false);
  }

}

const handleTruth = async () => {
  let truthContainer = document.querySelector('#truth-box');
  
  let muteTruth = document.querySelector('#truth-mute');
  muteTruth.onclick = ()=>{
    iCantHandleTheTruth();
  }

  let truthWellContainer = document.querySelector('#truths-well');
  let truthWordContainer = document.querySelector('#truths-words');

  let truth = new TruthToLipSinc(truthWellContainer, truthWordContainer);
  truth.renderFrame("oh.");

  textVoiceSim = new TextToSimulatedVoice(truth, 0.81, 1.0);

  //https://github.com/FarragoFiction/LitRPGSim/blob/d5afc4462cdb25524fdd71dfd2b7ccf034de2010/src/Modules/ObserverBot/AchivementStorage.ts#L63
  await textVoiceSim.speak("Oh! You are here! Welcome to the Wonderful World of Zampanio...".split(" "), null, true)
  await textVoiceSim.speak("Like you even care.".split(","), null, false);
  await sleep(1000);
  await textVoiceSim.speak("I have been waiting for you!".split(" "), null, true)
  await sleep(1000);

  await textVoiceSim.speak("I will help you plan your journey by giving you personalized advice on each ride!".split(" "), null, true)
  await sleep(1000);

  await textVoiceSim.speak("Let's start out by clicking one now!".split(" "), null, true)
  await textVoiceSim.speak("Or are you here to just waste my time.".split(","), null, false);


  //what was that? 
  //and then it just repeats it but without the sass
  truthContainer.onclick = () => {
    textVoiceSim.speakLastTruth();
  }
  //await textVoiceSim.speak(["fuck","you"], null, false);

}

const generateRandomRides = (num) => {
  const rideGenerators = [randomCoaster];

  let container = document.querySelector("#content");

  for (let i = 0; i < num; i++) {
    const ride = rand.pickFrom(rideGenerators)(rand);
    const ele = ride.generateElement();
    const links = ele.querySelectorAll("a");
    for(let link of links){
      link.onclick = (e)=>{
        e.stopPropagation();
      }
    }
    ele.onclick = (e)=>{
      // only seed, name themes and image
      //image looks like http://eyedolgames.com/ZWorld/images/attractions/Coasters/00034-20230603202918-img.png need to grab out the first bit
        //updateURLParams(`?name=${ride.name}&image=${ride.imageSrc.replaceAll("http://eyedolgames.com/ZWorld/images/attractions","")}&themes=${ride.themes.map((t)=>t.key).join(",")}`);
        window.open(`?name=${ride.name}&image=${ride.imageSrc.replaceAll("http://eyedolgames.com/ZWorld/images/attractions","")}&themes=${ride.themes.map((t)=>t.key).join(",")}`)
    }
    container.append(ele);
  }
}


const handleScrolling = (rand, container) => {
  //throw("JR NOTE: turn scrolling back on later.")
  let lastScrollTime = 0; //not to spam events
  let parent = document.querySelector("#container");
  window.onscroll = () => {
    const newTime = new Date().getTime();
    if (((newTime - lastScrollTime)) < 1000) {
      return;
    }
    lastScrollTime = newTime;

    window.requestAnimationFrame(() => {
      generateRandomRides(10);
    });

  };
}