

let rides = [];
let textVoiceSim;
const rand = new SeededRandom(13);

window.onload = async () => {

  handleTruth();

  initThemes();
  await initCoasters();
  generateRandomRides(10);
  handleScrolling();


}


const randomTruthQuip = async (ride) => {
  await textVoiceSim.speak(["fuck", "you"], null, false);

}


const handleTruth = async () => {
  let truthContainer = document.querySelector('#truth-box');

  let truthWellContainer = document.querySelector('#truths-well');
  let truthWordContainer = document.querySelector('#truths-words');

  let truth = new TruthToLipSinc(truthWellContainer, truthWordContainer);
  truth.renderFrame("oh.");

  textVoiceSim = new TextToSimulatedVoice(truth, 0.81, 1.0);

  //https://github.com/FarragoFiction/LitRPGSim/blob/d5afc4462cdb25524fdd71dfd2b7ccf034de2010/src/Modules/ObserverBot/AchivementStorage.ts#L63
  await textVoiceSim.speak("Oh! You are here! Welcome to the Wonderful World of Zampanio...".split(" "), null, true)
  await textVoiceSim.speak("like you even care".split(","), null, false);
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