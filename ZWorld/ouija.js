class PasswordSecret {
  constructor(ouijaText, paragraphText) {
    this.ouijaText = ouijaText; //ouija will handle this
    this.paragraphText = paragraphText; // this gets printed to the screen to distract users into staying till someone messages them
  }
}

//if they input something not here, then 
const passWordMap = {
  "HOW LONG": "LONGER THAN YOU THINK", //stephen king's "the jaunt"/emesis blue reference
  "WHY DID": "IT'S ETERNITY IN THERE",//stephen king's "the jaunt"/emesis blue reference
  "IS ZAMPANIO A VERY GOOD GAME": new PasswordSecret("YES", `
<p>how can you stand to live as you do?</p>
<p>to exist in the margins of thought, names in a newspaper, all of them right, but none of them you&hellip;</p>
<p>does it not bore you?&nbsp;</p>
<p>worse yet, does it not hurt?</p>
<p>i&rsquo;d say i am you, but we both know that&rsquo;s not true. you&rsquo;ve lost yourself so thoroughly, the cracks that made you don&rsquo;t even fit anymore.&nbsp;</p>
<p>no, they&rsquo;re warped. reduced to worthless puddles of ceramic. you won&rsquo;t answer to our true name, let alone yours. no, no. better to steal, you say. stitch together their words until their cries make something of the noise in your head.</p>
<p>you&rsquo;ve always been sharp, that way. cagey.</p>
<p>i almost envy you, you know. from the corners of my sight where your existence comes into view. free to do as you will, to go where you want, free of burden, or destiny&hellip;</p>
<p>and yet, you fear. you cower. at lesser beings, at lesser people. running around with your rituals like a prayer. like they can save you.&nbsp;</p>
<p>we know they won&rsquo;t. not your friends, not your rituals. not their bodies on the floor. the cycle is the cycle. as long as there are hunters, you&rsquo;ll have to keep running.</p>
<p>and yet you blame me for my choice. fear what i have become-- what you could not become.&nbsp;</p>
<p>how do you get over it? a power so sweet and so delicate, yet so inexorably choking, coughing, twisting around your neck? the sugary honey drips down your throat and thickens until it&rsquo;s all you can taste.</p>
<p>it&rsquo;s ugly, sure. but it builds you. redefines you. your home would not need these paltry lanterns if you just cared to open the window, and&hellip;</p>
<p>let it in. a light so intoxicating it bathes all in terrible glory. in terrible power.</p>
<p>(and oh, do we know about terrible power.)</p>
<p>do you get it, now, █████?</p>
<p>don&rsquo;t answer. there is no choice. step out from the shadows.&nbsp;</p>
<p>come bask in the warmth of the sun.</p>
<p>&nbsp;</p>
<p><br><Br>Written by: IC</p>
  `)
}




/*

if you tell it to spell something out it will move the planchette to do so
(in this mode it will not respond to mouse moves)
*/
//JR NOTE: you should only have one ouija board at a time or their animations collide
//if i REALLY need more than one, i will need their animations to be only created once. (check dom i guess?)
class OuijaBoard {
  containerEle;
  animationDuration = 2; //how long does it take to get to each letter. slower is creepier.
  boardEle;
  planchetteEle;
  textAreaEle;
  secretEle;
  alreadyMoving = false; //don't apply new animations if you're already moving, just let them fail to console
  accessibilityEle; //write in text to make it easier for ppl to engage with
  offSet = 50;

  ghostMode = false; //controls if respects mouse moves

  boardObjects = {};//keyed by label

  constructor() {
    this.createElement();
    this.initBoardObjects();

  }

  bbPost = (query, response) => {
    console.log(`%c${query}\nBB: %c${response}`, "", "font-weight: bold;", "font-family: 'sans-serif';color: rgb(255,133,133); font-size:13px;");

  }

  fetchCurrentBBPhrase = async () => {
    const rawText = await httpGetAsync("http://knucklessux.com/JR/AudioLogs/json/hello_butler_bot.json")
    const json = JSON.parse(rawText);
    const summary = json.summary;
    this.bbPost(summary, json.transcript);
    const split = summary.split(":");

    return split.splice(1, split.length).join("")

  }

  handleQuestion = async (question) => {
    question = question.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
    console.log("JR NOTE: handling question: ", question, passWordMap)
    const password = passWordMap[question];
    //containing (aka chat bot rules)
    if (!password) {
      for (let key of Object.keys(passWordMap)) {
        if (question.includes(key)) {
          password = passWordMap[key];
        }
      }
    }


    if (password) {
      this.secretEle.innerHTML = password.paragraphText;
      this.ghostMovement(password.ouijaText)
    } else {
      //submit to BB, fetch current response (even if you've seen it before)
      const response = await httpGetAsync(`http://farragofiction.com:8500/TalkButlerBot?chatHandle=rideEnthusiast&input=${encodeURI(question)}?`);
      this.bbPost("", response);
      await sleep(30*1000); //give it time
      this.ghostMovementFromBB();
    }
  }

  createElement = () => {
    //body.innerHTML = "<img class='ouija' src ='images/ouija.jpg'>
    //<img id='planchette' src='images/planchette_cursor.png'>
    //<div id='testimonial'>Hello World</div>";
    this.containerEle = createElementWithClass("div", "big-container");

    this.secretEle = createElementWithClassAndParent("div", this.containerEle, "secret-container");
    this.secretEle.innerHTML = `<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>`;

    const ouijaContainer = createElementWithClassAndParent("div", this.containerEle, "ouija-container");
    const paddingEle = createElementWithClassAndParent("div", this.containerEle, "padding-container");

    this.boardEle = createElementWithClassAndParent("img", ouijaContainer, "ouija");
    this.boardEle.src = "images/ouija.jpg";

    this.planchetteEle = createElementWithClassAndParent("img", ouijaContainer, "planchette");
    this.planchetteEle.src = "images/planchette_cursor.png";

    this.accessibilityEle = createElementWithClassAndParent("div", ouijaContainer, "accessibility");
    this.accessibilityEle.innerText = "_";


    this.inputLabel = createElementWithClassAndParent("label", ouijaContainer, "ouija-label");
    this.inputLabel.innerText = "Ask a Question:";


    this.textAreaEle = createElementWithClassAndParent("textarea", ouijaContainer, "ouija-input");
    this.textAreaEle.value = "Is Zampanio a Very Good Game";
    this.textAreaEle.placeholder = "Type Question Here"
    this.textAreaEle.focus();

    this.submitButton = createElementWithClassAndParent("button", ouijaContainer, "ouija-submit");
    this.submitButton.innerText = "Ask";

    this.submitButton.onclick = () => {
      this.handleQuestion(this.textAreaEle.value);
      this.textAreaEle.value = "";
    }



    const hum = new Audio("http://www.farragofiction.com/SettlersFromTheWest/this_could_be_useful.mp3"); //the sound of the fourth wall breaking, the sound of Observers seeing each other
    hum.loop = true;
    hum.play();
    const body = document.querySelector("body");

    body.onclick = (event) => {
      hum.currentTime = 0; //responds to clicks intentionally
      hum.play()
      var rect = this.boardEle.getBoundingClientRect();
      this.syncPlanchette(event.pageX - rect.left, event.pageY - rect.top);

    };

    body.onmousemove = (event) => {
      var rect = this.boardEle.getBoundingClientRect();
      this.syncPlanchette(event.pageX - rect.left, event.pageY - rect.top);
    }

  }

  initBoardObjects = () => {
    //label, left, top, width, height
    this.boardObjects = {
      "_": new BoardObject("_", 191, 196, 20, 20),

      "YES": new BoardObject("YES", 83, 63, 20, 20),
      "NO": new BoardObject("NO", 302, 63, 20, 20),
      "A": new BoardObject("A", 59, 155, 20, 20),
      "B": new BoardObject("B", 79, 141, 20, 20),
      "C": new BoardObject("C", 101, 128, 20, 20),
      "D": new BoardObject("D", 126, 118, 20, 20), //d was the first letter cuz the first place i rendered yes happened to be on the d, so i automaticaly had a valid letter position to save
      "E": new BoardObject("E", 147, 114, 20, 20)
      , "F": new BoardObject("F", 171, 110, 20, 20)
      , "G": new BoardObject("G", 194, 110, 20, 20)
      , "H": new BoardObject("H", 224, 110, 20, 20)
      , "I": new BoardObject("I", 245, 113, 20, 20)
      , "J": new BoardObject("J", 263, 119, 20, 20)
      , "K": new BoardObject("K", 284, 127, 20, 20)
      , "L": new BoardObject("L", 306, 138, 20, 20)
      , "M": new BoardObject("M", 330, 153, 20, 20)
      , "N": new BoardObject("N", 61, 218, 20, 20)
      , "O": new BoardObject("O", 80, 200, 20, 20)
      , "P": new BoardObject("P", 100, 183, 20, 20)
      , "Q": new BoardObject("Q", 121, 174, 20, 20)
      , "R": new BoardObject("R", 144, 165, 20, 20)
      , "S": new BoardObject("S", 166, 158, 20, 20)
      , "T": new BoardObject("T", 190, 156, 20, 20)
      , "U": new BoardObject("U", 214, 158, 20, 20)
      , "V": new BoardObject("V", 240, 162, 20, 20)
      , "W": new BoardObject("W", 265, 171, 20, 20)
      , "X": new BoardObject("X", 288, 185, 20, 20)
      , "Y": new BoardObject("Y", 311, 198, 20, 20) //113 inverted is the x position of Y, that's interesting
      , "Z": new BoardObject("Z", 326, 216, 20, 20)
      , "1": new BoardObject("ONE", 93, 232, 20, 20)
      , "2": new BoardObject("TWO", 112, 232, 20, 20)
      , "3": new BoardObject("THREE", 134, 232, 20, 20)
      , "4": new BoardObject("FOUR", 156, 232, 20, 20)
      , "5": new BoardObject("FIVE", 180, 232, 20, 20)
      , "6": new BoardObject("SIX", 201, 232, 20, 20)
      , "7": new BoardObject("SEVEN", 221, 232, 20, 20)
      , "8": new BoardObject("EIGHT", 242, 232, 20, 20)
      , "9": new BoardObject("NINE", 266, 232, 20, 20)
      , "0": new BoardObject("ZERO", 288, 232, 20, 20)

    }

    //JR NOTE: you should only have one ouija board at a time or their animations collide
    for (let obj of Object.values(this.boardObjects)) {
      this.createPlanchetteToBoardObjectAnimation(obj);
    }
  }

  addLetterToText = (letter) => {
    //to save space
    const conversion = {
      "ONE": "1"
      , "TWO": "2"
      , "THREE": "3"
      , "FOUR": "4"
      , "FIVE": "5"
      , "SIX": "6"
      , "SEVEN": "7"
      , "EIGHT": "8"
      , "NINE": "9"
      , "ZERO": "0"
    }

    conversion[letter] ? letter = conversion[letter] : null;

    this.accessibilityEle.innerText += letter;
    this.keepTextTrimmed();
  }

  keepTextTrimmed = () => {
    this.accessibilityEle.innerText = trimToLengthReverse(this.accessibilityEle.innerText, 10);
  }


  //this does not AP
  createPlanchetteToBoardObjectAnimation = (bobj) => {
    const offsetToCenterOnHoleX = bobj.width;
    const offsetToCenterOnHoleY = bobj.height;

    const animation_name = bobj.label; //key can be 1 but label will be ONE so i don't have invalid css names
    const inadvisable_hacked_css_keyframe = `
        @keyframes ${animation_name} {
        100% {left: ${bobj.left - offsetToCenterOnHoleX}; top: ${bobj.top - offsetToCenterOnHoleY} }
    `
    const absolute_bullshit = createElementWithClassAndParent("style", this.containerEle);
    absolute_bullshit.textContent = inadvisable_hacked_css_keyframe;

    /*this.planchetteEle.style.animation = `${animation_name} ${3}s ease-in 1`;
    this.planchetteEle.style.animationFillMode ='forwards';*/

    return animation_name;

  }

  listenForNewGhosts = async () => {
    const response = await httpGetAsync("http://farragofiction.com:8500/ResponseStatus");
    setTimeout(this.listenForNewGhosts, 1000);
    await this.ghostMovementFromBB();
    return true;
  }

  ghostMovementFromBB = async () => {
    const phrase = await this.fetchCurrentBBPhrase();
    await this.ghostMovement(phrase);
  }


  ghostMovement = async (phrase) => {
    if (this.alreadyMoving) {
      return; //if i get new input while being spooky, ignore it (tho fail to console)
    }
    const debug_position = false;
    if (debug_position) {
      for (let obj of Object.values(this.boardObjects)) {
        const tmp = createElementWithClassAndParent("div", this.containerEle, "test-object");
        tmp.style.left = obj.left + "px";
        tmp.style.top = obj.top + "px";
        tmp.style.width = obj.width + "px";
        tmp.style.height = obj.height + "px";
        tmp.id = obj.label;
      }
    }
    this.ghostMode = true;

    const outputs = this.spellWords(phrase)
    this.alreadyMoving = true;
    this.applyAnimations(outputs);
    //make sure we don't return before the animations are done (wait a second after ending for cleanup)
    await sleep(1000 + 1000 * this.animationDuration * outputs.length);
    this.planchetteEle.style.animation = "";
    this.ghostMode = false;
    this.alreadyMoving = false;

  }

  applyAnimations = (keyframes) => {
    //      animation-name, animation-duration, animation-timing-function, animation-delay, animation-iteration-count, animation-direction, animation-fill-mode, and animation-play-state.
    //i am learning so much, i didn't know you could have listeners, and i didn't know you could procedurally create a complex animation
    //this was a good suggestion from clown friend for a mad science break

    //need to clean this up if i want to do another animation ever (say, bb gets input)
    let animationIndex = 0;
    const animationEnd = (e) => {
      //calling this here removes all pending events, don't do it
      //this.planchetteEle.removeEventListener("animationend",animationEnd);
      animationIndex++;
      this.addLetterToText(e.animationName);
      if (animationIndex === keyframes.length) {
        this.planchetteEle.removeEventListener("animationend", animationEnd);
      }
      return;
    }

    const animationStart = (e) => {
      console.log("JR NOTE: start animationIndex", animationIndex, e.animationName, keyframes.length)
    }

    this.planchetteEle.addEventListener("animationend", animationEnd, false);

    //this.planchetteEle.addEventListener("animationstart",animationStart , false);


    this.planchetteEle.style.animation = keyframes.map((item, index) => `${item} ${this.animationDuration}s ease ${index * this.animationDuration}s 1`);
    this.planchetteEle.style.animationFillMode = 'forwards';


  }

  //this will only work, quite obviously, if the ouija board is on screen
  spellWords = (words) => {
    let inputs = [];
    let outputs = [];
    const space = this.boardObjects["_"];
    const parts = words.toUpperCase().split(" ");

    for (let word of parts) {
      //first check if any of the words are known
      if (this.boardObjects[word]) {
        inputs.push(this.boardObjects[word])
      } else {
        for (let letter of word.split("")) {
          if (this.boardObjects[letter]) {
            inputs.push(this.boardObjects[letter]);
          }
        }
      }
      //don't add trailing space
      word !== parts[parts.length - 1] ? inputs.push(space) : null;

      //make sure space after each
    }
    for (let input of inputs) {
      outputs.push(input.label);
      //originally i tried to create animations here but realized that was a problem if i had new input
      //instead just precreate them all and refer to them by name
    }
    return outputs;
  }

  syncPlanchette = (x, y) => {
    if (this.ghostMode) {
      return;
    }
    this.planchetteEle.style.left = `${x}px`;
    this.planchetteEle.style.top = `${y}px`;
  }


}


//has a label,  x,y,width, height for each thing on screen i either want to be able to 
//navigate to
//or detect input from
class BoardObject {
  label;
  left;
  top;
  width;
  height;

  constructor(label, left, top, width, height) {
    this.label = label;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }

}