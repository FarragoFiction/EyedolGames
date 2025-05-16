
const normalImageSource = "http://eyedolgames.com/BabyQuotidians/";
let normalImageList = [];
let rand = new SeededRandom(13);


let numItems = 0;

window.onload = async () => {
  await grabNormalImages();
  initThemes();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let name = urlParams.get('name');
  let img_src = urlParams.get('img_src'); //if this is absolute we'll get people able to send shock images to each other hidden in my stuff, no
  let tinyDescription1 = urlParams.get('tinyDescription1');//domestic shorthair and tabby mix
  let tinyDescription2 = urlParams.get('tinyDescription2'); //x miles away

  if (img_src) { //anything else it can figure out but you better give it a real image (relative)
    name ||= "Generic Desc1"
    rand = new SeededRandom(stringtoseed(name));
    tinyDescription1 ||= "Generic Desc1"
    tinyDescription2 ||= "Generic Desc2"
    renderDetailsPage(name, decodeURI(img_src), tinyDescription1, tinyDescription2);
  } else {
    renderGrid();
  }
}

const renderDetailsPage = (name, img_src, tinyDescription1, tinyDescription2) => {
  const content = document.querySelector("#content");
  const spiel = document.querySelector(".spiel");
  spiel.remove()
  let parent = createElementWithClassAndParent("div", content, "details-parent");

  let header = createElementWithClassAndParent("h2", parent);
  header.innerText = `${name}, ${tinyDescription1}, ${tinyDescription2}`;

  let group = createElementWithClassAndParent("div", parent, "group");

  let imageEle = createElementWithClassAndParent("img", group, "details-image");
  imageEle.src = normalImageSource + img_src;

  let stack = createElementWithClassAndParent("div", group, "stack");

  let nameEle = createElementWithClassAndParent("h3", stack, "detail-name");
  nameEle.innerText = `More about ${name}:`;

  let factsEle = createElementWithClassAndParent("div", stack, "fact-section");
  let facts = [{ label: "fact1", value: tinyDescription1 }, { label: "fact2", value: tinyDescription2 }, { label: "fact3", value: "Generic Fact" }]
  let factsList = createElementWithClassAndParent("ul", factsEle);

  for (let fact of facts) {
    let li = createElementWithClassAndParent("li", factsList);
    li.innerText = `${fact.label}: ${fact.value}`;
  }

  let stack2 = createElementWithClassAndParent("div", parent, "stack details");

  let detailHeader = createElementWithClassAndParent("h3", stack2, "detail-header");
  detailHeader.innerHTML = "Details:"

  let detailsEle = createElementWithClassAndParent("div", stack2, "details-section");
  let paragraph = createElementWithClassAndParent("p", detailsEle);

  for(let i =0; i<19; i++){
    const detail = rand.pickFrom(sweetQuotidianFacts);
    let sentence = createElementWithClassAndParent("span", paragraph,"sentence");
    sentence.innerHTML = detail;
    if(rand.nextDouble()>0.81){
      //new paragraph
      paragraph = createElementWithClassAndParent("p", detailsEle);
    }

  }

}

const renderGrid = () => {
  const parent = document.querySelector("#content");
  let ele = createElementWithClassAndParent("div", parent, "grid-container");
  for (let i = 0; i < 113; i++) {
    renderOneItem(ele)
  }
  handleScrolling(ele);
}



const renderOneItem = (container) => {
  console.log("JR NOTE: rendering 1 item")
  numItems++;
  const name = "Generic Name " + numItems;
  const tinyDescription1 = "Generic Desc 1"
  const tinyDescription2 = "Generic Desc 2"
  const img_src = rand.pickFrom(normalImageList);

  let item = createElementWithClassAndParent("a", container, "item");
  item.target = "_blank";
  item.href = `?name=${name}&tinyDescription1=${tinyDescription1}&tinyDescription2=${tinyDescription2}&img_src=${img_src}`;
  let imageEle = createElementWithClassAndParent("img", item, "preview", 'item-image');
  imageEle.src = normalImageSource + img_src;

  let nameEle = createElementWithClassAndParent("div", item, "item-name");
  nameEle.innerText = name;


  let desc1Ele = createElementWithClassAndParent("div", item, "item_desc");
  desc1Ele.innerText = tinyDescription1;

  let desc2Ele = createElementWithClassAndParent("div", item, "item_desc_two");
  desc2Ele.innerText = tinyDescription2;

}

const handleScrolling = (container) => {
  let lastScrollTime = 0; //not to spam events
  window.onscroll = () => {
    const newTime = new Date().getTime();
    if (((newTime - lastScrollTime)) < 50) {
      return;
    }
    lastScrollTime = newTime;

    window.requestAnimationFrame(() => {
      renderOneItem(container);
      renderOneItem(container);
      renderOneItem(container);
    });

  };
}


const grabNormalImages = async () => {
  let tmp = await getImages(normalImageSource);
  normalImageList = tmp;
}





