const loadSearchResults = () => {
  const oldContainer = document.querySelector("#search-input-container")
  oldContainer.style.display = "none";

  const container = document.querySelector("#search-results")
  container.style.display = "block"
  for (let i = 0; i < 113; i++) {
    generateLink(container);
  }
  renderLink(container, "TODO", "JR is going to do this soon, don't you worry, any second now this will be a real link.", "http://www.google.com")
  renderLink(container, "TODO", "JR is going to do this soon, don't you worry, any second now this will be a real link.", "www.google.com")
  renderLink(container, "TODO", "JR is going to do this soon, don't you worry, any second now this will be a real link.", "www.google.com")
  renderLink(container, "TODO", "JR isLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nunc erat, venenatis ut congue feugiat, eleifend vel augue. Maecenas suscipit in libero ac convallis. Proin mattis tempus erat tincidunt vestibulum. Vestibulum pharetra elementum nunc convallis rutrum. Phasellus placerat vehicula tortor vitae finibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cbilia curae; Curabitur tincidunt erat vel magna euismod rhoncus. Quis going to do this soon, don't you worry, any second now this will be a real link.", "www.google.com")
  renderLink(container, "TODO", "JR is going to do this soon, don't you worry, any o this soon, don't you worry, any second now this will be a real link.", "www.google.com")
  renderLink(container, "TODO", "JR is going to do this soon, don't you worry, any secondsecond now this will be a real link.", "www.google.com")
  renderLink(container, "TODO", "JR is going ts soon, don't you wo do this soon, don't you worry, any second now this will be a real link.", "www.google.com")
  renderLink(container, "TODO", "JR is going to do this soon, don't you worry, any second now this will be a real link.", "www.google.com")
  renderLink(container, "TODO", "JR is going to do this soon, don't you worry, any second now this will be a real link.", "www.google.com")

}

const smartClick = () => {
  alert("You get it. The only way to win is not to play.")
}

//pick from generators we know about
//no seeded random, this is intended to give the impression of an unending flood of new results
const generateLink = (parent) => {
  const generators = [zampaniniLink, jackElopeLink, personalityLink, zWorldLink,quotidianAdoption,genericSite]
  pickFrom(generators)(parent);
}


/*
  slightly larger, bold, underlined website title. blue. anchor.
  black regular default font description
  exact same font  in default green for what url you're going to go to in full
*/
const renderLink = (parent, title, description, url) => {
  console.log("JR NOTE: render link", { parent, title, description, url })
  const container = createElementWithClassAndParent("div", parent, "link-container")
  const titleEle = createElementWithClassAndParent("a", container, "title")
  titleEle.innerText = title;
  titleEle.href = url;
  titleEle.target = "_blank"
  const descriptionEle = createElementWithClassAndParent("div", container, "desc");
  descriptionEle.innerText = description;
  const urlEle = createElementWithClassAndParent("div", container, "url")
  urlEle.innerText = url;

}

/*
make a link generator for every page that exists under eyedolgames
yes that means i need to make a new one to have this page expose it
but given nothing was exposed in teh previous home page thats probably fine
*/

//http://eyedolgames.com/Zampanini/?name=Baker's+Restaurant&themes=Bakery&feeUnder=21
const zampaniniLink = (parent) => {
  let title = "Zampanini";
  let description = "It's a perfectly normal food website! Give in to your cravings tonight! (Fees and conditions may apply)";
  let url = "http://eyedolgames.com/Zampanini/?name=Hackedd+Restaurant&themes=waste&feeUnder=113"
  renderLink(parent, title, description, url);
}

//http://eyedolgames.com/JackElope/?seed=1764600067&name=Marcoccio&image=BigNormalPile%2F00000-20230306085907-img.png&matchPercent=99&loc=Naples%2C+Italy&secrets=%5B8%2C13%5D
const jackElopeLink = (parent) => {
  let title = "Jack Elope";
  let description = "It's a perfectly normal dating website! Find true love tonight! (Fees and conditions may apply)";
  let url = "http://eyedolgames.com/JackElope/?seed=1764600067&name=Marcoccio&image=BigNormalPile%2F00000-20230306085907-img.png&matchPercent=99&loc=Naples%2C+Italy&secrets=%5B8%2C13%5D"
  renderLink(parent, title, description, url);
}

const personalityLink = (parent) => {
  let title = "Personality Quiz";
  let description = "It's a perfectly normal personality quiz! Find out who you are tonight! (Fees and conditions may apply)";
  let url = "http://eyedolgames.com/PersonalityQuiz/?seed=600291&your_themes=science%2Cburied%2Cart&your_rivals_themes=freedom%2Ctwisting%2Cwaste"
  renderLink(parent, title, description, url);
}


const zWorldLink = (parent) => {
  let title = "Cool Theme Park Ride";
  let description = "It's a perfectly normal theme park ride! Be thrilled tonight! (Fees and conditions may apply)";
  let url = "http://eyedolgames.com/ZWorld/?rideType=Water%20Park&name=Animorphs:%20The%20Rush&image=/Water_park/00136-20230619123540-img.png&themes=ocean&obsession=Animorphs"
  renderLink(parent, title, description, url);
}

const quotidianAdoption = (parent) => {
  let title = "Find a Pet";
  let description = "It's a perfectly normal pet adoption website! Find a companion tonight! (Fees and conditions may apply)";
  let url = "http://eyedolgames.com/QuotidianAdoption/?name=Jiggy&age=6%20months%20old&breed=Tumblr&img_src=crow_7.png"
  renderLink(parent, title, description, url);
}


const genericSite = (parent) => {
  let title = "This Is A Website";
  let description = "It's a perfectly website! See a website Tonight! (Fees and conditions may apply)";
  let url = "http://eyedolgames.com/GenericMimicSite/?name=Generic%20Name%2088&tinyDescription1=Generic%20Desc%201&tinyDescription2=Generic%20Desc%202&img_src=crow_10.png"
  renderLink(parent, title, description, url);
}

