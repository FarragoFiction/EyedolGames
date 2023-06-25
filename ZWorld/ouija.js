/*

if you tell it to spell something out it will move the planchette to do so
(in this mode it will not respond to mouse moves)
*/

class OuijaBoard {
  containerEle;
  boardEle;
  planchetteEle;
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

    const hum = new Audio("http://www.farragofiction.com/SettlersFromTheWest/this_could_be_useful.mp3"); //the sound of the fourth wall breaking, the sound of Observers seeing each other
    hum.loop = true;
    hum.play();
    const body = document.querySelector("body");

    body.onclick = (event) => {
      hum.currentTime = 0; //responds to clicks intentionally
      hum.play()
      this.syncPlanchette(event.pageX-rect.left, event.pageY-rect.top);

    };

    body.onmousemove = (event) => {
      var rect = this.boardEle.getBoundingClientRect();
      this.syncPlanchette(event.pageX-rect.left, event.pageY-rect.top);
    }

  }

  initBoardObjects = () => {
    //label, left, top, width, height
    this.boardObjects = {
      "YES": new BoardObject("YES", 63, 63, 50, 30),
      "D": new BoardObject("D", 126, 121, 20, 20)

    }
  }


  movePlanchetteToBoardObject = async (bobj) => {
    const offsetToCenterOnHoleX = 5;
    const offsetToCenterOnHoleY = 20;

    console.log("JR NOTE: moving to", bobj.label, "TODO need to translate this from 'relative to board' to 'relative to screen's")
    const animation_name = "move" + getRandomNumberBetween(0, 999999); //really shitty
    const inadvisable_hacked_css_keyframe = `
        @keyframes ${animation_name} {
        100% {left: ${bobj.left-offsetToCenterOnHoleX}; top: ${bobj.top-offsetToCenterOnHoleY} }
    `
    const absolute_bullshit = createElementWithClassAndParent("style", this.containerEle);
    absolute_bullshit.textContent = inadvisable_hacked_css_keyframe;

    this.planchetteEle.style.animation = `${animation_name} ${3}s ease-in 1`;
    this.planchetteEle.style.animationFillMode ='forwards';



  }

  test = async () => {
    for(let obj of Object.values(this.boardObjects)){
      const tmp = createElementWithClassAndParent("div", this.containerEle,"test-object");
      tmp.style.left =  obj.left +"px";
      tmp.style.top =  obj.top +"px";
      tmp.style.width = obj.width+"px";
      tmp.style.height = obj.height+"px";
      tmp.id =obj.label;
    }
    this.ghostMode = true;

    await this.movePlanchetteToBoardObject(this.boardObjects["YES"]);
    await sleep(3000)
    await this.movePlanchetteToBoardObject(this.boardObjects["D"]);

    //this.ghostMode = false;
  }

  //this will only work, quite obviously, if the ouija board is on screen
  spellWords = async (words) => {
    var rect = this.boardEle.getBoundingClientRect();
    console.log(rect);
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