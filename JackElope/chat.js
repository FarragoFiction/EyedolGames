//so we remember it even on close
// check your logic at the desk you won't need it to progress, https://www.youtube.com/watch?v=-u7R4nZE1fM

let currentChat = []
let preparedToLogOff = false;


const doop = new Audio('264828__cmdrobot__text-message-or-videogame-jump.mp3');

//don't log off right away, instead its eventually
const logOff = async () => {
  console.log("JR NOTE: preparing to log off")
  if (currentOnline) {
    //between 1 and 10 minutes
    await sleep(getRandomNumberBetween(1, 10)*60 * 1000);

    currentChat.push("<i class='offline'>This user is currently offline.</i>");
    let content = document.querySelector(".chat-body");
    if(content){
      let cEle = createElementWithClassAndParent("div", content, "message");
      cEle.innerHTML = "<div>" + "<i class='offline'>This user is currently offline.</i>" + "</div>";
      content.scrollTop = content.scrollHeight;

    }

    currentOnline = false;
  }
}


const handleResponding = async (value) => {
  await sleep(getRandomNumberBetween(1, 5) * 1000);

  if (mirrored) {
    addPornBotToCurrentChat("Zampanio is a really fun game, you should play it!", "Zampanio", currentPage.icon)
  } else {
    if (currentOnline) {
      if (!preparedToLogOff) {
        logOff();
        preparedToLogOff = true;
      }
      const all_keys = Object.keys(chatMap);
      let chosen_possible_responses;
      //we have a system at work that gets upset if you EVER even mention the word key for some damn reason
      //thinks its  aprivate key we shouldn't put in get. look. i'm sorry system. javascript is based on key/value pairs. 
      //thats just how it is.
      for (let key of all_keys) {
        if (value.toLowerCase().includes(key.toLowerCase())) {
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
      prev.innerHTML += "<div style='padding-top: 10px;'>" + currentPage.quir.apply(value.replaceAll("Them:", "")) + "</div>";
    } else {
      let cEle = createElementWithClassAndParent("div", content, "chat-bubble-left");
      cEle.innerHTML = "<div>" + currentPage.quirk.apply(value.replaceAll("Them:", "")) + "</div>";
      if (mirrored) {
        cEle.classList.add("negative_match")
      }
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
      //you arne' tmirrored, they are
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
  if (mirrored) {
    iconEle.classList.add("negative_match")
  }
  let nameEle = createElementWithClassAndParent("div", header, "chat-header-name");
  nameEle.innerText = name;
  if (mirrored) {
    nameEle.classList.add("negative_match")
  }

  let close = createElementWithClassAndParent("button", header, "chat-header-close");
  close.innerText = "X";
  close.onclick = () => {
    chat.remove();//but we didn't forget the text
  }
  if (currentChat.length === 0 && !currentOnline) {
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

    } else if (c.includes("Them")) {
      if (prev && prev.className.includes("chat-bubble-left")) {
        prev.innerHTML += "<div style='padding-top: 10px;'>" + currentPage.quirk.apply(c.replaceAll("Them:", "")) + "</div>";
      } else {
        let cEle = createElementWithClassAndParent("div", content, "chat-bubble-left");
        cEle.innerHTML = "<div>" + currentPage.quirk.apply(c.replaceAll("Them:", "")) + "</div>";
        prev = cEle;
        if (mirrored) {
          cEle.classList.add("negative_match")
        }
      }
    } else {
      let cEle = createElementWithClassAndParent("div", content, "message");
      cEle.innerHTML = "<div>" + c + "</div>";
    }
  }

  //open already scrolled to bottom
  content.scrollTop = content.scrollHeight;




}