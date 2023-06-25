/*

if you tell it to spell something out it will move the planchette to do so
(in this mode it will not respond to mouse moves)
*/

class OuijaBoard {
  containerEle;
  boardEle;
  planchetteEle;
  accessibilityEle; //write in text to make it easier for ppl to engage with

  ghostMode = false; //controls if respects mouse moves

  boardObjects = {};//keyed by label

  constructor(){
    this.createElement();
  }

  createElement = ()=>{
    //body.innerHTML = "<img class='ouija' src ='images/ouija.jpg'>
    //<img id='planchette' src='images/planchette_cursor.png'>
    //<div id='testimonial'>Hello World</div>";
    this.containerEle = createElementWithClass("div", "ouija-container");
    this.boardEle = createElementWithClassAndParent("img", this.containerEle,"ouija");
    this.boardEle.src = "images/ouija.jpg";

    this.planchetteEle = createElementWithClassAndParent("img", this.containerEle,"planchette");
    this.planchetteEle.src = "images/planchette_cursor.png";

    this.accessibilityEle = createElementWithClassAndParent("div", this.containerEle,"accessibility");
    this.accessibilityEle.innerText = "Hello World";

    const hum = new Audio("http://www.farragofiction.com/SettlersFromTheWest/this_could_be_useful.mp3"); //the sound of the fourth wall breaking, the sound of Observers seeing each other
    hum.loop = true;
    hum.play();
    const body = document.querySelector("body");

    body.onclick = (event)=>{
      hum.currentTime = 0; //responds to clicks intentionally
      hum.play()
      this.syncPlanchette(event.pageX, event.pageY);
  
    };
  
    body.onmousemove = (event)=>{
      this.syncPlanchette(event.pageX, event.pageY);
    }

  }

  syncPlanchette = (x,y)=>{
    if(this.ghostMode){
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

  
}