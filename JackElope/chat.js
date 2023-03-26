//so we remember it even on close
// check your logic at the desk you won't need it to progress, https://www.youtube.com/watch?v=-u7R4nZE1fM
let currentChatRaw = `You: test 1
Them: test2
You: Hello World
Them: the astral projects onto benign undefined archetypal objects
You: these frequencies are frequently the key to whats percieved to be and leads me to believe they are feeding off the reaches of the mind
Them: you are home you remind us happy hurt
You: check your logic at the desk you won't need it to progress
You: actually make sure that if you say multiple things in a row
You: it puts it in the same bubble
Them: yeah okay`;

let currentChat = currentChatRaw.split("\n");

const addToCurrentChat = ()=>{

}


//http://killi.palo-alto.ca.us/ kr found vibes
const renderChat = (name,icon)=>{
  const body = document.querySelector("body");
  let chat = createElementWithClassAndParent("div", body, "chat");
  //main sections
  let header = createElementWithClassAndParent("div", chat, "chat-header");
  let content = createElementWithClassAndParent("div", chat, "chat-body");
  let input = createElementWithClassAndParent("input", chat, "chat-input");
  input.focus();

  //popuplate header

  let iconEle = createElementWithClassAndParent("img", header, "chat-header-icon");
  iconEle.src = icon;
  let nameEle = createElementWithClassAndParent("div", header, "chat-header-name");
  nameEle.innerText = name;

  let close = createElementWithClassAndParent("div", header, "chat-header-close");
  close.innerText = "X";


  //populate content
  let prev;
  for(let c of currentChat){
    if(c.includes("You")){
      if(prev && prev.className.includes("chat-bubble-right")){
        prev.innerHTML += "<div style='padding-top: 10px;'>"+c.replaceAll("You:","") +"</div>";
      }else{
        let cEle = createElementWithClassAndParent("div", content, "chat-bubble-right");
        cEle.innerHTML = "<div>"+c.replaceAll("You:","") +"</div>";
        prev = cEle;
      }
      
    }else{
      if(prev && prev.className.includes("chat-bubble-left")){
        prev.innerHTML += "<div style='padding-top: 10px;'>"+c.replaceAll("Them:","") +"</div>";
      }else{
        let cEle = createElementWithClassAndParent("div", content, "chat-bubble-left");
        cEle.innerHTML = "<div>"+c.replaceAll("Them:","") +"</div>";
        prev = cEle;
      }
    }
  }

  //open already scrolled to bottom
  content.scrollTop = content.scrollHeight;




}