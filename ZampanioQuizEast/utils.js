let ele;

const createElementWithClass = (eleName, className) => {
  const ele = document.createElement(eleName);

  if (className) {
    ele.className = className;
  }
  return ele;

}

//true random
const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const fuckShitUPAnimation = (ele) => {
  const mildAmount = getRandomNumberBetween(1, 15 * 5);
  const extremeAmount = getRandomNumberBetween(1, 5);
  const normalWidth = parseInt(ele.style.width);
  const normalHeight = parseInt(ele.style.height);
  const extremeOptions = [`background-position-y: ${getRandomNumberBetween(0, normalHeight)}`,
  `background-position-x: ${getRandomNumberBetween(0, normalWidth)}`,
  `transform: rotate(${Math.random()}turn);`,
  `opacity: ${0.5 + Math.random() * 2}`,
    `filter: grayscale(1);`,
    `filter: sepia(0.2);`,
  `filter: blur(${getRandomNumberBetween(1, 3)}px);`,
  `filter: blur(${getRandomNumberBetween(1, 3)}px);`,

    `filter: brightness(.75);`, `filter: brightness(1.15);`,
    `filter: hue-rotate(180);`, `width: ${normalWidth + mildAmount}px;`,
  `height: ${normalHeight + mildAmount}px;`,
  `height: ${normalHeight - mildAmount}px;`,
  `width: ${normalHeight - mildAmount}px;`,
  `translate(${mildAmount}px, ${mildAmount}px);`,
  `translate(${mildAmount}px);`, `translate(0px, ${mildAmount}px);`];
  const options = extremeOptions;
  const animation_name = "no" + getRandomNumberBetween(0, 999999);
  const inadvisable_hacked_css_keyframe = `
 @keyframes ${animation_name} {
  0% { ${pickFrom(options)} }
  50% { ${pickFrom(options)} }
  100% { ${pickFrom(options)} }

 `
  ele.innerHTML = "";
  const absolute_bullshit = createElementWithClassAndParent("style", ele);
  absolute_bullshit.textContent = inadvisable_hacked_css_keyframe;
  const timing_functions = ["ease", "ease-in", "ease-out", "ease-in-out", "linear", "step-start", "step-end"];
  const animation = `${animation_name} ${getRandomNumberBetween(1, 10) * Math.random()}s ${pickFrom(timing_functions)} ${Math.random() * getRandomNumberBetween(1, 10)}s infinite`;
  ele.style.animation = animation;
}

//from info token reader!
const getBullshitCSS = (allowFilters) => {
  let css = "";
  const filters = ["contrast(2)", "contrast(1.5)", "hue-rotate(45deg)", "hue-rotate(90deg)", "hue-rotate(180deg)", "hue-rotate(270deg)", "blur(1px)", "blur(5px)", "blur(10px)", "blur(15px)", "blur(25px)", "blur(20px)", "blur(30px)", "blur(35px)", "blur(40px)"];

  for (let i = 0; i < 13; i++) {
    filters.push(`contrast(${i / 5})`);
    filters.push(`hue-rotate(${i * 10}deg)`);

  }

  var terribleCSSOptions = [["text-align", "center"], ["text-align", "right"], ["text-align", "left"], ["text-align", "justify"], ["position: ", "fixed"], ["float: ", "left"], ["float: ", "right"], ["width: ", "????"], ["height: ", "????"]];
  var reallyRand = getRandomNumberBetween(1, 10);
  const chosenFilters = [];
  for (var i = 0; i < reallyRand; i++) {
    var indexOfTerribleCSS = getRandomNumberBetween(0, terribleCSSOptions.length - 1)
    if (Math.random() > 0.5) {
      allowFilters && chosenFilters.push(pickFrom(filters));
    }
    var tin = terribleCSSOptions[indexOfTerribleCSS]
    if (tin[1] == "????") {
      tin[1] = getRandomNumberBetween(1, 100) + "%";
    }
    css += tin[0] + tin[1] + ";";
  }
  css += "min-width: 60px; min-height:60px; font-size: " + getRandomNumberBetween(10, 28) + "px;";
  css += `position: absolute; bottom: ${getRandomNumberBetween(1, 100)}vh; right: ${getRandomNumberBetween(1, 100)}vw;`;

  if (chosenFilters.length) {
    css += `filter: ${chosenFilters.join(" ")};`
  } else {
    if (Math.random() > 0.75) {
      css += `background-color: rgb(${getRandomNumberBetween(0, 255)},${getRandomNumberBetween(0, 255)},${getRandomNumberBetween(0, 255)});color:rgb( ${getRandomNumberBetween(0, 255)},${getRandomNumberBetween(0, 255)},${getRandomNumberBetween(0, 255)})`;
    } else {
      css += "background: none";
    }
  }
  return css;
}

const isItFriday = ()=>{
  //midnight and fridays are wungle time
  const date = new Date();
  if (date.getHours() == 0 || date.getDay() === 5) {
    return true;
  }
  return false;
}



const fuckShitUP = (root) => {
  const body = document.querySelector("body");
  body.classList.add("friday-body");

  const eles = root.querySelectorAll("ul,li,p,div,span,a");
  
  for (let p of eles) {
    const css = getBullshitCSS(false);
    p.setAttribute("style", css);
    p.title = p.innerText;
    body.append(p);
    if(Math.random()>.9){
      fuckShitUPAnimation(p)
    }
  }

  const imgs = root.querySelectorAll("img");
  for (let p of imgs) {
    const css = getBullshitCSS(true);
    p.setAttribute("style", css);
    p.title = p.innerText;
    body.append(p);
    if(Math.random()>.29){
      fuckShitUPAnimation(p)
    }
  }

  const css = getBullshitCSS(false);
  root.setAttribute("style", css);
  root.title = root.innerText;
  body.append(root);
  

  root.style.display = "block";



}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}


 const titleCase = (input) => {
  const pieces = input.split(" ");
  const ret = [];
  for (let piece of pieces) {
      if (piece[0]) {
          ret.push(replaceStringAt(piece, 0, piece[0].toUpperCase()));
      }
  }
  return ret.join(" ");
}

 function replaceStringAt(str, index, character) {
  return str.substr(0, index) + character + str.substr(index + character.length);
}

const sentenceCase = (input) => {
  if (!input.length) {
      return input;
  }
  return replaceStringAt(input, 0, input[0].toUpperCase());
};

const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const pickFrom = (array) => {
  return array[getRandomNumberBetween(0, array.length - 1)];
}

const createElementWithClassAndParent = (eleName, parent, className) => {
  const ele = createElementWithClass(eleName, className);
  parent.append(ele);
  return ele;
}


//if you give it new values for existing params it layers them on
const updateURLParams = (params) => {

  //if we're not overwriting we want it to handle 
  const queryString = window.location.search;
  const currentParams = new URLSearchParams(queryString);
  const newParams = new URLSearchParams(params);

  //overwrites original, adds new
  for (let [key, value] of newParams) {
    currentParams.set(key, value);
  }

  //params += `&${urlParams.toString()}`;
  var pageUrl = '?' + `${currentParams.toString()}`;
  window.history.pushState('', '', pageUrl);
}



