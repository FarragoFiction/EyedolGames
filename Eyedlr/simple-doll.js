//this should be all in one with no leakage outside this file.
//actually somewhat do this right

//takes in layers in order
class SimpleDoll {
  element;
  dollLayers = []; //in render order

  
  //no css since this is meant to be stand alone
  renderSelf = (parent)=>{
    const height = "400px"
    let container = document.createElement("div");
    container.style.position = "relative";
    container.style.height = height;
    

    for(let layer of this.dollLayers){
      let layerContainer = document.createElement("img");
      layerContainer.src = layer.url;
      layerContainer.style.position="absolute";
      layerContainer.style.height=height;
      layerContainer.style.objectFit="scale-down";
      container.append(layerContainer);
    }
    this.element = container;
    parent && parent.append(this.element)
  }
}

//has the url of the image for the layer and whether or not its color should be modified in any way
//does not render itself, the doll that renders it will handle that (so it can either be all the same theme or tacky random mode)
class DollLayer {
  url;
  canModify;
  element;
  constructor(url, canModify) {
    this.url = url;
    this.canModify = canModify;
  }

  randomizeElements = (rand)=>{

  }

}


//holds all the shit i'd otherwise use as a global var for
//if this were a more complex doll i could have it all loaded from the index file
//but its simple so i wont
//treat this like a singleton
class DollConstructor {

  baseOptions = ["http://eyedolgames.com/Eyedlr/images/SexyMen/Base/quixotic_nude_tp.png"];
  shirtOptions = ["http://eyedolgames.com/Eyedlr/images/SexyMen/Shirt/quixotic_shirt_1.png"];
  shoeOptions = ["http://eyedolgames.com/Eyedlr/images/SexyMen/Shoes/quixotic_shoes_1.png"];
  pantOptions = ["http://eyedolgames.com/Eyedlr/images/SexyMen/Pants/quixotic_pants_1.png"];
  accesoryOptions = ["http://eyedolgames.com/Eyedlr/images/SexyMen/Accessory/quixotic_hat_1.png"];
  bgOptions = ["http://eyedolgames.com/Eyedlr/images/SexyMen/BG/quixotic_bg.png"];

  /*
  Have you ever wondered where the 19 identical Tom's originally came from?
  
  They actually are from Bellor like the rest of the main Quotidians (besides Robert Bobert). 
  
  It's just the live diplomacy event they were going to represent us in never happened.
  
  My notes:
  
  i could send The Press
  wearing fake stage armor, riding a baby Quotidian as a horse
  trying to diplomat but mostly taking notes in a flip notebook
  and asking questions
  
  yesss
  Tom Peyote will be their name.  Short for The Press, but also a reference to don quixote
  so mostly they chat bot respond to direct input in a vacuum
  
  but when uts time to go on the offensive and ask prying questions i will tap ai dungeon and heavily edit what i get
  
  they wear armor that only looks right from a distance, as if designed for a stage play about purple knights
  
  (then manic suggested there be 19 identical copies of him, which is to say, suggested he be an Egg Quotidian)
  
  yeah okay so tom peyote and his 18 siblings are our main distraction
  then hidden spies and npcs on the peripheries
  tom is the best of the crowd at talking which is why hes front man
  normally its not so obvious they are nineteenuplets cuz they all have diff masks on
  our news asset got a lot weirder
  
  manic: QQ continues to be a sci-fi horror
  
  me: and has no clue about it
  we are PERFECTLY NORMAL by an ACCEPTABLE ERROR OF MARGIN
  one day, generations in the future, our definition of normal will once again be realigned with the Outside World's  and we will go back to being near perfect spies
  */

  randomTomPeyoteDoll = (rand) => {
    const doll = new SimpleDoll();
    doll.dollLayers = [
      new DollLayer(rand.pickFrom(this.bgOptions),true),
      new DollLayer(rand.pickFrom(this.baseOptions),false),
      new DollLayer(rand.pickFrom(this.shoeOptions),true),
      new DollLayer(rand.pickFrom(this.pantOptions),true),
      new DollLayer(rand.pickFrom(this.shirtOptions),true),
      new DollLayer(rand.pickFrom(this.accesoryOptions),true),
    ]
    return doll;
  }

}


/*
me, on quotidians: 

we arent a civilization, we are the tools of a civilization left to rot
do our power lines work? mostly no!

but having powerlines is How Things Are Done so we endlessly go through the motions of "maintaining" them
every other nation built something new from their rubble
we just...make increasingly shitty versions of what our territory had looked like the instant the age of chaos hit

we are a mausoleum dedicated to the dead Old Age 
terrified the current age is on the verge of death as well
desperately trying to prevent it, or, at worst, gather enough data to preserve them, too 
like the short story There Will Come Soft Rains
*/