let ele;

let how_long_well_let_them_explore = 500;

const createElementWithClass = (eleName, className) => {
  const ele = document.createElement(eleName);

  if (className) {
    ele.className = className;
  }
  return ele;

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

function stringtoseed(seed){
  var output = 0;
 for (var i = 0, len = seed.length; i < len; i++) {
    output += seed[i].charCodeAt(0)
  }
  return output
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

//https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

 const uniq  =(a) =>{return a.filter(onlyUnique)};
 
 const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//HELLO WORLD trimmed to four would give you ORLD (useful for running text that can't get bigger than a certai size)
const trimToLengthReverse = (string, length)=>{
  return string.split("").reverse().join('').slice(0,length).split("").reverse().join("")
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

//key, value status
const cachedImages = {}


const imageExtendsions = [
  "png",
  "gif",
  "jpg",
  "jpeg"
];
const filePattern = new RegExp('<a href="([^?]*?)">','g');

const extensionPattern = new RegExp(`\\\.(${imageExtendsions.join("|")})\$`);



//returns a promise which resolves with the content, prevents network spam
const getImages = async(url)=>{
  if(cachedImages[url]){
    return cachedImages[url];
  }

  let promise = new Promise(async (resolve, reject)=>{
    try{
      const rawText = await httpGetAsync(url);
      
      let files= [];
      const match = rawText.matchAll(filePattern);
      const matches = Array.from(match, (res) => res);
      for(let m of matches){
        const item = m[1];
        if(item.match(extensionPattern)){
          files.push(item);
        }
      }
      cachedImages[url] = files;
      console.log("JR NOTE: returned from network for",url)
      resolve(files);
      }catch(e){
        console.log("JR NOTE: error",e)
        reject();
        return [];
      }
  })
  cachedImages[url] = promise;
  return promise;
}

 const getImagesOld = async(url)=>{
  console.log("JR NOTE: trying to get images: ", url);

  try{
  const rawText = await httpGetAsync(url);
  
  let files= [];
  const match = rawText.matchAll(filePattern);
  const matches = Array.from(match, (res) => res);
  for(let m of matches){
    const item = m[1];
    if(item.match(extensionPattern)){
      files.push(item);
    }
  }
  cachedImages[url] = files;
  console.log("JR NOTE: returned from network for",url)
  return files;
  }catch(e){
    console.log("JR NOTE: error",e)
    return [];
  }
}

//async, you'll want to await this.
//since using this will mean you don't have anything on screen yet, you'll want some kinda placeholder
const httpGetAsync = async (theUrl) => {
  return new Promise(function (resolve, reject) {

    let xhr = new XMLHttpRequest();
    try {
      xhr.open("get", theUrl);

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          //window.alert("AN UNKNOWN NETWORK ERROR HAS OCCURED")
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        //window.alert("AN UNKNOWN NETWORK ERROR HAS OCCURED")
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    } catch (e) {
      console.error(e);
      //window.alert("AN UNKNOWN NETWORK ERROR HAS OCCURED")
      return `[]`;
    }
  });
}


