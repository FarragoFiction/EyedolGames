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


const doop = new Audio('264828__cmdrobot__text-message-or-videogame-jump.mp3');

//allowed to be true random. 
const initiateMessage = async (name, icon,mirrored)=>{
  //if mirrored just vomit everything at once in a big spammy pile
  //otherwise, just send a greeting
  await sleep(getRandomNumberBetween(10,60) * 1000);
  if(!mirrored){
    addPornBotToCurrentChat(pickFrom(chatMap["greeting"], name, icon));
  }else{
    //once i really get the chat bot going this is going to be so upsetting
    const all_values = Object.values(chatMap);
    for(let values of all_values){
      for(let v of values){
        await sleep(1000);
        addPornBotToCurrentChat(v, name, icon);
      }
    }
  }
}

const addPornBotToCurrentChat = (value,name,icon) => {
  doop.play();
  currentChat.push("Them:" + value);
  let content = document.querySelector(".chat-body");
  if (content) {
    const prev = content.childNodes[content.childNodes.length - 1];
    if (prev && prev.className.includes("chat-bubble-left")) {
      prev.innerHTML += "<div style='padding-top: 10px;'>" + value.replaceAll("Them:", "") + "</div>";
    } else {
      let cEle = createElementWithClassAndParent("div", content, "chat-bubble-left");
      cEle.innerHTML = "<div>" + value.replaceAll("Them:", "") + "</div>";
    }
    content.scrollTop = content.scrollHeight;

  }else{
    renderChat(name,icon);
  }
}

const addYouToCurrentChat = (value) => {
  currentChat.push("You:" + value);
  let content = document.querySelector(".chat-body");
  if (content) {
    const prev = content.childNodes[content.childNodes.length - 1];
    if (prev && prev.className.includes("chat-bubble-right")) {
      prev.innerHTML += "<div style='padding-top: 10px;'>" + value.replaceAll("You:", "") + "</div>";
    } else {
      let cEle = createElementWithClassAndParent("div", content, "chat-bubble-right");
      cEle.innerHTML = "<div>" + value.replaceAll("You:", "") + "</div>";
    }
    content.scrollTop = content.scrollHeight;

  }
}


//http://killi.palo-alto.ca.us/ kr found vibes
const renderChat = (name, icon) => {
  const body = document.querySelector("body");
  let chat = createElementWithClassAndParent("div", body, "chat");
  //main sections
  let header = createElementWithClassAndParent("div", chat, "chat-header");
  let content = createElementWithClassAndParent("div", chat, "chat-body");
  let form = createElementWithClassAndParent("form", chat);

  let input = createElementWithClassAndParent("input", form, "chat-input");
  input.focus();
  form.onsubmit = (e) => {
    if (input.value.trim()) {
      e.preventDefault();
      addYouToCurrentChat(input.value)
      input.value = "";
    }
    return false;
  }

  //popuplate header

  let iconEle = createElementWithClassAndParent("img", header, "chat-header-icon");
  iconEle.src = icon;
  let nameEle = createElementWithClassAndParent("div", header, "chat-header-name");
  nameEle.innerText = name;

  let close = createElementWithClassAndParent("button", header, "chat-header-close");
  close.innerText = "X";
  close.onclick = () => {
    chat.remove();//but we didn't forget the text
  }


  //populate content
  let prev;
  for (let c of currentChat) {
    if (c.includes("You")) {
      if (prev && prev.className.includes("chat-bubble-right")) {
        prev.innerHTML += "<div style='padding-top: 10px;'>" + c.replaceAll("You:", "") + "</div>";
      } else {
        let cEle = createElementWithClassAndParent("div", content, "chat-bubble-right");
        cEle.innerHTML = "<div>" + c.replaceAll("You:", "") + "</div>";
        prev = cEle;
      }

    } else {
      if (prev && prev.className.includes("chat-bubble-left")) {
        prev.innerHTML += "<div style='padding-top: 10px;'>" + c.replaceAll("Them:", "") + "</div>";
      } else {
        let cEle = createElementWithClassAndParent("div", content, "chat-bubble-left");
        cEle.innerHTML = "<div>" + c.replaceAll("Them:", "") + "</div>";
        prev = cEle;
      }
    }
  }

  //open already scrolled to bottom
  content.scrollTop = content.scrollHeight;




}