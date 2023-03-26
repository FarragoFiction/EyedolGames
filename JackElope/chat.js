//so we remember it even on close
// check your logic at the desk you won't need it to progress, https://www.youtube.com/watch?v=-u7R4nZE1fM

let currentChat = []


const doop = new Audio('264828__cmdrobot__text-message-or-videogame-jump.mp3');


const handleResponding = async (value) => {
  console.log("JR NOTE: handle responding")
  await sleep(getRandomNumberBetween(1, 10) * 1000);

  if (mirrored) {
    addPornBotToCurrentChat("Zampanio is a really fun game, you should play it!", name, icon)
  } else {
    if (currentOnline) {
      const all_keys = Object.values(chatMap);
      let chosen_possible_responses;
      //we have a system at work that gets upset if you EVER even mention the word key for some damn reason
      //thinks its  aprivate key we shouldn't put in get. look. i'm sorry system. javascript is based on key/value pairs. 
      //thats just how it is.
      for (let key of all_keys) {
        if (value.includes(key)) {
          chosen_possible_responses = chatMap[key];//yeah they can overwrite each other.
        }
      }
      if (!chosen_possible_responses) {
        chosen_possible_responses = chatMap["*"];//answer to life, the universe, and everything in it
      }
      addPornBotToCurrentChat(pickFrom(chosen_possible_responses, currentPage.name, currentPage.icon));

    }
  }

}

//allowed to be true random. 
const initiateMessage = async (name, icon, mirrored) => {
  //if mirrored just vomit everything at once in a big spammy pile
  //otherwise, just send a greeting
  await sleep(getRandomNumberBetween(10, 60) * 1000);
  if (!mirrored) {
    addPornBotToCurrentChat(pickFrom(chatMap["greeting"], name, icon));
  } else {
    //once i really get the chat bot going this is going to be so upsetting
    const all_values = Object.values(chatMap);
    for (let values of all_values) {
      for (let v of values) {
        await sleep(1000);
        addPornBotToCurrentChat(v, name, icon);
      }
    }
  }
}

const addPornBotToCurrentChat = (value, name, icon) => {
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

  } else {
    renderChat(name, icon);
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
    handleResponding(value);
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
  if(currentChat.length === 0 && !currentOnline){
    currentChat.push("<i class='offline'>This user is currently offline.</i>")
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

    } else if(c.includes("Them")) {
      if (prev && prev.className.includes("chat-bubble-left")) {
        prev.innerHTML += "<div style='padding-top: 10px;'>" + c.replaceAll("Them:", "") + "</div>";
      } else {
        let cEle = createElementWithClassAndParent("div", content, "chat-bubble-left");
        cEle.innerHTML = "<div>" + c.replaceAll("Them:", "") + "</div>";
        prev = cEle;
      }
    }else{
      let cEle = createElementWithClassAndParent("div", content, "message");
        cEle.innerHTML = "<div>"+c + "</div>";
    }
  }

  //open already scrolled to bottom
  content.scrollTop = content.scrollHeight;




}