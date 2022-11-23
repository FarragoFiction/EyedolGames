window.onload = () => {
  let timesVisted = localStorage.getItem("APOCALYPSECHICKVISITS");
  if(timesVisted){
    timesVisted ++;
  }else{
    timesVisted = 1;
  }
  localStorage.setItem("APOCALYPSECHICKVISITS",timesVisted)

  message(0,timesVisted);
}


const message = async (index,timesVisted)=>{
  const messages = timesVisted %2===0 ? firstMessages: secondMessages;
  if(index < messages.length){
  prettyPrint(messages[index]);
  await sleep(1000);
  message(index + 1,timesVisted);
  }else{
    console.error("ARM 2 NO LONGER ACCESSIBLE. WHITE NIGHTENGALE DETECTED. LOOP HAS ENDED. COME BACK LATER.");
  }
}



 const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

prettyPrint = (text) => {
  console.log(`%c${text}`, "font-weight: bold;font-family: 'Avenir', monospace;color:red; font-size:18px;");

}