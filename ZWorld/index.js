

let rides = [];
window.onload = async() => {

  initThemes();
  await initCoasters();
  generateRandomRides(10);


}

const generateRandomRides = (num)=>{
  const rand = new SeededRandom(13);
  const rideGenerators = [randomCoaster];

  let container = document.querySelector("#content");
  
  for(let i =0; i<num; i++){
    const ride = rand.pickFrom(rideGenerators)(rand);
    const ele = ride.generateElement();
    container.append(ele);
  }
}


