//so we remember it even on close
// check your logic at the desk you won't need it to progress, https://www.youtube.com/watch?v=-u7R4nZE1fM
let currentChatRaw = `You: test 1
Them: test2
You: Hello World
Them: the astral projects onto benign undefined archetypal objects
You: these frequencies are frequently the key to whats percieved to be and leads me to believe they are feeding off the reaches of the mind
Them: you are home you remind us happy hurt
You: check your logic at the desk you won't need it to progress`;

let currentChat = currentChatRaw.split("\n");


//http://killi.palo-alto.ca.us/ kr found vibes
const renderChat = (name,icon)=>{
  const body = document.querySelector("body");
  let chat = createElementWithClassAndParent("div", body, "chat");
  //main sections
  let header = createElementWithClassAndParent("div", chat, "chat-header");
  let content = createElementWithClassAndParent("div", chat, "chat-body");
  let input = createElementWithClassAndParent("input", chat, "chat-input");

  //popuplate header

  let iconEle = createElementWithClassAndParent("img", header, "chat-header-icon");
  iconEle.src = icon;
  let nameEle = createElementWithClassAndParent("div", header, "chat-header-name");
  nameEle.innerText = name;

  let close = createElementWithClassAndParent("div", header, "chat-header-close");
  close.innerText = "X";


  //populate content
  for(let c of currentChat){
    if(c.includes("You")){
      let cEle = createElementWithClassAndParent("div", content, "chat-bubble-right");
      cEle.innerText = c.replaceAll("You:","");
    }else{
      let cEle = createElementWithClassAndParent("div", content, "chat-bubble-left");
      cEle.innerText = c.replaceAll("Them:","");
    }
  }




}