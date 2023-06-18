

let rides = [];
const rand = new SeededRandom(13);

window.onload = async() => {

  initThemes();
  await initCoasters();
  generateRandomRides(10);
  handleScrolling();


}

const generateRandomRides = (num)=>{
  const rideGenerators = [randomCoaster];

  let container = document.querySelector("#content");
  
  for(let i =0; i<num; i++){
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