let ele;

const createElementWithClass = (eleName, className) => {
  const ele = document.createElement(eleName);

  if (className) {
    ele.className = className;
  }
  return ele;

}

truthLog = (text) => {
  console.log(`Truth: %c${text}`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
}


const isItFriday = ()=>{
  //midnight and fridays are wungle time
  const date = new Date();
  if (date.getHours() == 0 || date.getDay() === 5) {
    return true;
  }
  return false;
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


