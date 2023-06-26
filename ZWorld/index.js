

let rides = [];
let textVoiceSim;
//truth is NEVER seeded. it is what it is and it refuses to change for you.
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let seed = parseInt(urlParams.get('seed'));
let paramName = urlParams.get('name');
let paramRideType = urlParams.get('rideType');

//need to add http://eyedolgames.com/ZWorld/images/attractions to it
let paramImage = "http://eyedolgames.com/ZWorld/images/attractions"+urlParams.get('image');
let paramThemeKeys = urlParams.get('themes');
let paramObsession = urlParams.get("obsession");
let speakWithCustomersMode = urlParams.get("ouija");

//https://www.tumblr.com/jadedresearcher/721197316569284608/thoughts-on-liminal-horror?source=share

const rand = new SeededRandom(seed ? seed : paramName? stringtoseed(paramName):13);

window.onload = async () => {
  if(speakWithCustomersMode){
    ouija();
    return;
  }
  let consentButton = document.querySelector("#but-to-what");
  let page = document.querySelector("#page-content")
  if (paramRideType) {
    let header = document.querySelector("#header");
    const tmp = createElementWithClassAndParent("div", header,"back");
    tmp.innerText = "Click to See All Rides!";
    initThemes();
    page.style.display = "block";
    consentButton.remove();
    const notification = document.querySelector("#notification");
    notification.innerHTML = paramName +"<p class='small-text-notification'>Click Anywhere to Hear the Truth</p>";
    
    notification.classList.add("ride-detail-title")
    const ride = createDetailsRideFromParams(paramRideType, paramName, paramImage, paramThemeKeys.split(",").map((key)=>all_themes[key]), findObsessionByName(paramObsession));
    const ele = ride.generateElement();
    let container = document.querySelector("#content");
    container.append(ele);
    handleTruth(ride);


  } else {
    consentButton.onclick = () => {
      handleTruth();
      page.style.display = "block";
      consentButton.remove();
    }

    initThemes();
    await initRides();
    generateRandomRides(10);
    handleScrolling();
  }

}

/*
access ouiji board via truth asking after five minutes on the clock if you would like to access customer testimonials

the surface joke is "haha everyone who used this is dead" but given youre ACTUALLY talking to other users with the board its literal on a meta level

plus BB can intern under the Closer for enrichment, poor boi has been going kinda crazy alone
*/
const ouija = async()=>{
  const body = document.querySelector("body");
  body.classList.add("ouija-body");
  body.innerHTML = "";
  const board = new OuijaBoard();
  body.append(board.containerEle);
  await sleep(1000);
  board.test();

}

const offerCustomerTestimonials = async() => {
  await textVoiceSim.speak("It seems hearing Testimonials may help you Choose?<br><br><button onclick='ouija()'>See Customer Testimonials</button>".split(","), null, true);
  await sleep(1000);
  await textVoiceSim.speak("Though with a Mind as indecisive as yours, perhaps you are beyond help.".split(","), null, false);

}


const randomTruthQuip = async (ride) => {
  await textVoiceSim.speak(["fuck", "you"], null, false);

}


const iCantHandleTheTruth = async () => {
  let muteTruth = document.querySelector('#truth-mute');

  if (textVoiceSim.mute) {
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
  } else {
    muteTruth.innerText = "Unmute"
    textVoiceSim.mute = true;
    await textVoiceSim.speak("Oh.".split(" "), null, true)
    await sleep(3000);
    await textVoiceSim.speak("Well. Fuck you too, then.".split(","), null, false);
  }

}

const handleTruth = async (rideDetails) => {
  let truthContainer = document.querySelector('#truth-box');

  let muteTruth = document.querySelector('#truth-mute');
  muteTruth.onclick = () => {
    iCantHandleTheTruth();
  }

  let truthWellContainer = document.querySelector('#truths-well');
  let truthWordContainer = document.querySelector('#truths-words');

  let truth = new TruthToLipSinc(truthWellContainer, truthWordContainer);
  truth.renderFrame("oh.");

  textVoiceSim = new TextToSimulatedVoice(truth, 0.81, 1.0);

  //https://github.com/FarragoFiction/LitRPGSim/blob/d5afc4462cdb25524fdd71dfd2b7ccf034de2010/src/Modules/ObserverBot/AchivementStorage.ts#L63
  if (!rideDetails) {
    await textVoiceSim.speak("Oh! You are here! Welcome to the Wonderful World of Zampanio...".split(" "), null, true)
    await textVoiceSim.speak("Like you even care.".split(","), null, false);
    await sleep(1000);
    await textVoiceSim.speak("I have been waiting for you!".split(" "), null, true)
    await sleep(1000);

    await textVoiceSim.speak("I will help you plan your journey by giving you personalized advice on each ride!".split(" "), null, true)
    await sleep(1000);

    await textVoiceSim.speak("Let's start out by clicking one now!".split(" "), null, true)
    await textVoiceSim.speak("Or are you here to just waste my Time.".split(","), null, false);

    await sleep(1000*60*5); //wait five minutes on the clock
    offerCustomerTestimonials();

  } else {
    textVoiceSim.speak("oh".split(" "), null, false)

    let initTruth = async () => {

      window.removeEventListener("click", initTruth)
      for(let quip of rideDetails.truthQuips){
        //TODO do i prefer this to be only on hover?
        await textVoiceSim.speak(quip.split(" "), null, true)
        await sleep(1000);
      }
    }
    window.addEventListener("click", initTruth)

  }

  //what was that? 
  //and then it just repeats it but without the sass
  truthContainer.onclick = () => {
    textVoiceSim.speakLastTruth();
  }
  //await textVoiceSim.speak(["fuck","you"], null, false);

}

const generateRandomRides = (num) => {
  const rideGenerators = [TeaserCoaster, TeaserTrain, TeaserLiveshow, TeaserSwing, TeaserMerry, TeaserWheel, TeaserZip, TeaserZip, TeaserWater];

  let container = document.querySelector("#content");

  for (let i = 0; i < num; i++) {
    const chosen = rand.pickFrom(rideGenerators)
    const ride = new chosen(rand);
    const ele = ride.generateElement();
    const links = ele.querySelectorAll("a");
    for (let link of links) {
      link.onclick = (e) => {
        e.stopPropagation();
      }
    }
    ele.onclick = (e) => {
      // only seed, name themes and image
      //image looks like http://eyedolgames.com/ZWorld/images/attractions/Coasters/00034-20230603202918-img.png need to grab out the first bit
      //updateURLParams(`?name=${ride.name}&image=${ride.imageSrc.replaceAll("http://eyedolgames.com/ZWorld/images/attractions","")}&themes=${ride.themes.map((t)=>t.key).join(",")}`);
      window.open(`?rideType=${ride.rideType}&name=${ride.name}&image=${ride.imageSrc.replaceAll("http://eyedolgames.com/ZWorld/images/attractions", "")}&themes=${ride.themes.map((t) => t.key).join(",")}&obsession=${ride.obsession.name}`)
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