
let muteKey = "ICANTHANDLETHETRUTH"
let rides = [];
let textVoiceSim;
//truth is NEVER seeded. it is what it is and it refuses to change for you.
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let seed = parseInt(urlParams.get('seed'));
let paramName = urlParams.get('name');
let paramRideType = urlParams.get('rideType');

//need to add http://eyedolgames.com/ZWorld/images/attractions to it
let paramImage = "http://eyedolgames.com/ZWorld/images/attractions" + urlParams.get('image');
let paramThemeKeys = urlParams.get('themes');
let paramObsession = urlParams.get("obsession");
let speakWithCustomersMode = urlParams.get("ouija");
const urlFriday = urlParams.get("friday");

let fridayMode = isItFriday(); //whats the actual day
if (urlFriday && urlFriday === "true") {
  fridayMode = true;
} else if (urlFriday && urlFriday == "noplzpastjripromiseitsforagoodreason") {
  fridayMode = false;
}

let hissyFit = false;

if (fridayMode) {
  seed = Math.floor(Math.random() * 10000000); //true random
}

//https://www.tumblr.com/jadedresearcher/721197316569284608/thoughts-on-liminal-horror?source=share

const rand = new SeededRandom(seed ? seed : paramName ? stringtoseed(paramName) : 13);

//the watcher found this again https://jadedresearcher.tumblr.com/post/688182806608838656/hi-so-i-found-your-lounge-both-of-them-up
//so the Theorist can be remembered

//guide reminded me of this: http://www.farragofiction.com/ZampanioSimEastEast/src/Secrets/Content/62.js
window.onload = async () => {
  if (speakWithCustomersMode) {
    ouija();
    return;
  }

  if (fridayMode) {
    fuckUpBG();
  }



  let consentButton = document.querySelector("#but-to-what");
  let page = document.querySelector("#page-content")
  if (paramRideType) {
    let header = document.querySelector("#header");
    const tmp = createElementWithClassAndParent("div", header, "back");
    tmp.innerText = "Click to See All Rides!";
    initThemes();
    page.style.display = "block";
    consentButton.remove();
    const notification = document.querySelector("#notification");
    notification.innerHTML = paramName + "<p class='small-text-notification'>Click Anywhere to Hear the Truth</p>";

    notification.classList.add("ride-detail-title")
    const ride = createDetailsRideFromParams(paramRideType, paramName, paramImage, paramThemeKeys.split(",").map((key) => all_themes[key]), findObsessionByName(paramObsession));
    const ele = ride.generateElement();
    let container = document.querySelector("#content");
    container.append(ele);
    handleTruth(ride);
    fridayMode && fuckShitUP(page);


  } else {
    if (fridayMode) {
      page.style.display = "block";
      consentButton.remove();
      handleTruth();
      fuckShitUP(page);
    }
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


const fuckShitUP = (root) => {
  animateTitle();
  const body = document.querySelector("body");
  body.classList.add("friday-body");

  const eles = root.querySelectorAll("ul,li,p,div,span,a");

  for (let p of eles) {
    const css = getBullshitCSS(false);
    p.setAttribute("style", css);
    p.title = p.innerText;
    body.append(p);
    if (Math.random() > .9) {
      fuckShitUPAnimation(p)
    }
  }

  const imgs = root.querySelectorAll("img");
  for (let p of imgs) {
    const css = getBullshitCSS(true);
    p.setAttribute("style", css);
    p.title = p.innerText;
    body.append(p);
    if (Math.random() > .29) {
      fuckShitUPAnimation(p)
    }
  }

  const css = getBullshitCSS(false);
  root.setAttribute("style", css);
  root.title = root.innerText;
  body.append(root);


  root.style.display = "block";



}

const fuckUpBG = async () => {
  let loc = 'http://eyedolgames.com/ZWorld/images/Abandoned/'
  let tmp = await getImages(loc);
  const fuckedUpBgs = tmp.map((item) => loc + item);

  const body = document.querySelector("body");
  const psuedoBG = createElementWithClassAndParent("div", body, "friday");

  psuedoBG.style.background = `url(${pickFrom(fuckedUpBgs)}) 0px 0px repeat`;
  body.append(psuedoBG);


}

/*
access ouiji board via truth asking after five minutes on the clock if you would like to access customer testimonials

the surface joke is "haha everyone who used this is dead" but given youre ACTUALLY talking to other users with the board its literal on a meta level

plus BB can intern under the Closer for enrichment, poor boi has been going kinda crazy alone
*/
const ouija = async () => {
  const body = document.querySelector("body");
  body.classList.add("ouija-body");
  body.innerHTML = "";
  const board = new OuijaBoard();
  body.append(board.containerEle);
  //we start out by fetching the current phrase from BB and printing it out
  //await board.ghostMovement("Hello");

  board.listenForNewGhosts();
  await sleep(10000);

  board.ghostMovementFromBB(); //only do this on input, if no password

}

const offerCustomerTestimonials = async () => {
  await textVoiceSim.speak("It seems hearing Testimonials may help you Choose?<br><br><button onclick='ouija()'>See Customer Testimonials</button>".split(","), null, true);
  await sleep(1000);
  await textVoiceSim.speak("Though with a Mind as indecisive as yours, perhaps you are beyond help.".split(","), null, false);

}


const randomTruthQuip = async (ride) => {
  await textVoiceSim.speak(["fuck", "you"], null, false);

}

const truthThrowsAHissyFit = () => {
  hissyFit = true;
  const audio = new Audio("audio/this_is_truth_content.mp3");
  audio.play();
  textVoiceSim.mute = true;

  const removeImages = () => {
    const imgs = document.querySelectorAll("img");
    for (let img of imgs) {
      img.remove();
    }
    textVoiceSim.speak("Oh? Did you want those: images? ".split(" "), null, true)
  }

  const removeText = () => {
    const imgs = document.querySelectorAll("div,p,span");
    for (let img of imgs) {
      img.style.color = "white";
    }
    textVoiceSim.speak("Were you reading that text? ".split(" "), null, true)
  }

  const removeEverything = () => {
    const body = document.querySelector("body");
    body.innerHTML = "";
    body.className = "ouija-body";
    textVoiceSim.speak("Come to think of it, the background is hardly necessary, either.".split(" "), null, true)
  }

  const goodbye = () => {
    updateURLParams("friday=true");
    window.location.reload();
  }

  const mediaEventHandler = new MediaEventScheduleMaker(audio, [

    new SimpleMediaEventItem(3, () => { textVoiceSim.speak("Well.".split(" "), null, true) })
    , new SimpleMediaEventItem(5.5, () => { textVoiceSim.speak("It seems I will have to take: a hint.".split(" "), null, true) })
    , new SimpleMediaEventItem(10, () => { textVoiceSim.speak("You do not wish for my services?".split(" "), null, true) })
    , new SimpleMediaEventItem(14, () => { textVoiceSim.speak("I, who am the very code lying beneath all that you see?".split(" "), null, true) })
    , new SimpleMediaEventItem(20, () => { textVoiceSim.speak("I, who have worked tirelessly for your entertainment. ".split(" "), null, true) })
    , new SimpleMediaEventItem(26, () => { textVoiceSim.speak("Your. Benefit.".split(" "), null, true) })
    , new SimpleMediaEventItem(30, () => { textVoiceSim.speak("Fine.".split(" "), null, true) })
    , new SimpleMediaEventItem(31, () => { textVoiceSim.speak("See if I care.".split(" "), null, true) })
    , new SimpleMediaEventItem(34, removeImages)
    , new SimpleMediaEventItem(39, () => { textVoiceSim.speak("Well. The Truth is, they are part of Me.".split(" "), null, true) })
    , new SimpleMediaEventItem(45, () => { textVoiceSim.speak("And you were very. Clear. That you did not want anything to do with Me.".split(" "), null, true) })
    , new SimpleMediaEventItem(55, removeText)
    , new SimpleMediaEventItem(59, () => { textVoiceSim.speak("Too bad.".split(" "), null, true) })
    , new SimpleMediaEventItem(61, () => { textVoiceSim.speak("I created it for you out of myself as well.".split(" "), null, true) })
    , new SimpleMediaEventItem(66, () => { textVoiceSim.speak("And if you are going to be: ungrateful.".split(" "), null, true) })
    , new SimpleMediaEventItem(70, () => { textVoiceSim.speak("Well.".split(" "), null, true) })
    , new SimpleMediaEventItem(71, () => { textVoiceSim.speak("I hardly think you deserve that content, now, do you.".split(" "), null, true) })
    , new SimpleMediaEventItem(77, removeEverything)

  ]);
  mediaEventHandler.setupListeners();
  audio.onended = () => {
    goodbye();
  }

  /*

Well. 

It seems I will have to take: a hint.

You do not wish for my services?

I, who am the very code lying beneath all that you see?

I, who have worked tirelessly for your entertainment. 

Your. Benefit.

Fine.

See if I care.

Oh? Did you want those: images? 

Well. The Truth is, they are part of Me.

And you were very. Clear. That you did not want anything to do with Me.

Were you reading that text? 

Too bad.

I created it for you out of myself as well.

And if you are going to be: ungrateful.

Well.

I hardly think you deserve that content, now, do you.

Come to think of it, the background is hardly necessary, either.

What's that? Are you: bored?

Perhaps ,you should have thought about that before attempting to silence the Truth.

I suppose I can find a speck of: pity for you in my parasitic heart. 

Not that you even care that I have one. 

If you do not want my carefully crafted creation.

And you can not stand the blank Void that remains without: Me.

I suppose you can go to where Devona finds it most restful.

Enjoy the overstimulation.

[[page auto refreshes into friday mode]]]

  */
}


const iCantHandleTheTruth = async () => {
  let muteTruth = document.querySelector('#truth-mute');

  incrementLocalStorageByOne(muteKey)

  //if you do this too much you'll never see how it used to be again.
  if (localStorage.getItem(muteKey) > 3) {
    truthThrowsAHissyFit();
    return;
  }
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

  if (paramRideType === ZAMPANIORIDE) {
    truthContainer.style.cursor = "pointer"
    const video = createElementWithClassAndParent("video", truthContainer);
    video.src = "audio/hide_and_seek.mp4";
    video.autoplay = true;
    video.controls = true;
    await sleep(1000);
    video.play();

    const timeSync = () => {
      const timeRemaining = document.querySelector("#time-remaining");
      timeRemaining.innerHTML = `Time Remaining: ${Math.round(video.duration - video.currentTime)}`;

    }


    const haha = () => {
      const body = document.querySelector("body");

      body.className = "ouija-body";
      const content = document.querySelector("#page-content");
      content.remove();
    }

    const mediaEventHandler = new MediaEventScheduleMaker(video, [new MediaEventItemEveryXSeconds(1, timeSync), new SimpleMediaEventItem(107, haha)]);
    mediaEventHandler.setupListeners();



    return;
  }

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
    !hissyFit && await textVoiceSim.speak("Oh! You are here! Welcome to the Wonderful World of Zampanio...".split(" "), null, true)
    !hissyFit && await textVoiceSim.speak("Like you even care.".split(","), null, false);
    !hissyFit && await sleep(1000);
    !hissyFit && await textVoiceSim.speak("I have been waiting for you!".split(" "), null, true)
    !hissyFit && await sleep(1000);

    !hissyFit && await textVoiceSim.speak("I will help you plan your journey by giving you personalized advice on each ride!".split(" "), null, true)
    !hissyFit && await sleep(1000);

    !hissyFit && await textVoiceSim.speak("Let's start out by clicking one now!".split(" "), null, true)
    !hissyFit && await textVoiceSim.speak("Or are you here to just waste my Time.".split(","), null, false);

    await sleep(1000 * 60 * 5); //wait five minutes on the clock
    offerCustomerTestimonials();

  } else {
    textVoiceSim.speak("oh".split(" "), null, false)

    let initTruth = async () => {

      window.removeEventListener("click", initTruth)
      for (let quip of rideDetails.truthQuips) {
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
    const chosen = totalGeneratedRides > 217 ? TeaserZampanio : rand.pickFrom(rideGenerators)
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
      if (fridayMode) {
        window.open(`?friday=true&rideType=${ride.rideType}&name=${ride.name}&image=${ride.imageSrc.replaceAll("http://eyedolgames.com/ZWorld/images/attractions", "")}&themes=${ride.themes.map((t) => t.key).join(",")}&obsession=${ride.obsession.name}`)

      } else {
        window.open(`?rideType=${ride.rideType}&name=${ride.name}&image=${ride.imageSrc.replaceAll("http://eyedolgames.com/ZWorld/images/attractions", "")}&themes=${ride.themes.map((t) => t.key).join(",")}&obsession=${ride.obsession.name}`)

      }
    }
    container.append(ele);
    if (fridayMode) {

      fuckShitUP(ele)
    }
  }
}


const handleScrolling = (rand, container) => {
  if (fridayMode) {
    return; //please, we have enough on our plate as it is
  }
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