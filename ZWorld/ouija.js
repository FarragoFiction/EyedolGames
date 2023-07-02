/*

if you tell it to spell something out it will move the planchette to do so
(in this mode it will not respond to mouse moves)
*/

class OuijaBoard {
  containerEle;
  boardEle;
  planchetteEle;
  textAreaEle;
  accessibilityEle; //write in text to make it easier for ppl to engage with
  offSet = 50;

  ghostMode = false; //controls if respects mouse moves

  boardObjects = {};//keyed by label

  constructor() {
    this.initBoardObjects();
    this.createElement();
  }

  createElement = () => {
    //body.innerHTML = "<img class='ouija' src ='images/ouija.jpg'>
    //<img id='planchette' src='images/planchette_cursor.png'>
    //<div id='testimonial'>Hello World</div>";
    this.containerEle = createElementWithClass("div", "ouija-container");
    this.boardEle = createElementWithClassAndParent("img", this.containerEle, "ouija");
    this.boardEle.src = "images/ouija.jpg";

    this.planchetteEle = createElementWithClassAndParent("img", this.containerEle, "planchette");
    this.planchetteEle.src = "images/planchette_cursor.png";

    this.accessibilityEle = createElementWithClassAndParent("div", this.containerEle, "accessibility");
    this.accessibilityEle.innerText = "Hello World";

    this.textAreaEle = createElementWithClassAndParent("textarea", this.containerEle, "ouija-input");
    this.textAreaEle.value = "Ouija board loads with last BB entry.   additionally spells out any new BB entry. Users Input Via Text Area. If Input Matches key, ouija spells out something special. Otherwise spells out something random. (passwords from other rabbitholes?) ";



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
    }
  }

  addLetterToText = (letter) => {
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

    const animation_name = bobj.label;
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


  test = async () => {

    const debug_position = true;
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

    const outputs = this.spellWords("z")

    this.applyAnimations(outputs)
    //this.ghostMode = false;
  }

  applyAnimations = (keyframes) => {
    console.log("JR NOTE: keyframes",keyframes)
    //      animation-name, animation-duration, animation-timing-function, animation-delay, animation-iteration-count, animation-direction, animation-fill-mode, and animation-play-state.
    let duration = 3;
    //i am learning so much, i didn't know you could have listeners, and i didn't know you could procedurally create a complex animation
    //this was a good suggestion from clown friend for a mad science break
    this.planchetteEle.addEventListener("animationend", (e) => { this.addLetterToText(e.animationName) }, false);

    this.planchetteEle.style.animation = keyframes.map((item, index) => `${item} ${duration}s ease ${index * duration}s 1`);
    this.planchetteEle.style.animationFillMode = 'forwards';


  }

  //this will only work, quite obviously, if the ouija board is on screen
  spellWords =  (words) => {
    let inputs = [];
    let outputs = [];
    const space = this.boardObjects["_"];
    const parts = words.toUpperCase().split(" ");

    for(let word of parts){
      //first check if any of the words are known
      if(this.boardObjects[word]){
        inputs.push(this.boardObjects[word])
      }else{
        for(let letter of word.split("")){
          if(this.boardObjects[letter]){
            inputs.push(this.boardObjects[letter]);
          }
        }
      }
      //don't add trailing space
      word !== parts[parts.length-1] ?inputs.push(space):null;

      //make sure space after each
    }
    for (let input of inputs) {
      if (outputs.indexOf(input.label) > 0) {
        //its already made, just refer to it.
        outputs.push(input.label);
      } else {
        outputs.push(this.createPlanchetteToBoardObjectAnimation(input));
      }
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