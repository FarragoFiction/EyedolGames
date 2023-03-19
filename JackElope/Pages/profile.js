let horrors = ["protojr1.png",
  , "protojr2.png"
  , "protojr3.png"
  , "protojr4.png"
  , "protojr5.png"
  , "protojr6.png"
  , "protojr7.png"
  , "protojr8.png"
  , "protojr9.png"
  , "protojr10.png"
  , "protojr11.png"
  , "protojr12.png"
  , "protojr13.png"
  , "protojr14.png"
  , "protojr15.png"
  , "protojr16.png"
  , "protojr17.png"
  , "protojr18.png"]
class ProfilePage extends PageObject {


  //  currentPage = profile? new Profile(name,image,matchPercent,loc) : new HomePage();

  constructor(seed,name, image, matchPercent, loc) {
    super();
    this.seed = seed? seed: 13;
    this.rand = new SeededRandom(this.seed);
    this.age = this.rand.getRandomNumberBetween(18,99);
    this.name = name ? name : "Shambling Horror With Your Face";
    this.image = image ? baseURL+image : `http://farragofiction.com/ZampanioHotlink/KRsAIExperiments/${pickFrom(horrors)}`;
    this.loc = loc ? loc : "Right Behind You ;)";
    this.matchPercent = matchPercent ? matchPercent : "-216";
  }

  deploy = () => {
    const parent = document.querySelector("#container");
    let target = this.basicPageStructure(parent);




    let header = createElementWithClassAndParent("div", target, "profile-header");
    let headerContent = createElementWithClassAndParent("div", header, "profile-header-content");

    let imageEle = createElementWithClassAndParent("img", headerContent, "profile-image");
    imageEle.src = this.image;

    let rightCol = createElementWithClassAndParent("div", headerContent, "profile-header-right");

    let matchBox = createElementWithClassAndParent("div", rightCol, "profile-match-box");

    let matchPercent = createElementWithClassAndParent("div", matchBox, "profile-percent match");
    matchPercent.innerText = this.matchPercent+"% Match";

    let friendPercent = createElementWithClassAndParent("div", matchBox, "profile-percent friend");
    friendPercent.innerText = this.rand.getRandomNumberBetween(0,100)+"% Friend"

    let enemyPercent = createElementWithClassAndParent("div", matchBox, "profile-percent enemy");
    enemyPercent.innerText = this.rand.getRandomNumberBetween(this.matchPercent,100-this.matchPercent)+"% Enemy"


    let nameEle = createElementWithClassAndParent("div", rightCol, "profile-name");
    nameEle.innerText = this.name;

    let ageEle = createElementWithClassAndParent("div", rightCol, "profile-age");
    ageEle.innerText = this.age;

    let locEle = createElementWithClassAndParent("div", rightCol, "profile-loc");
    locEle.innerText = this.loc;






    let content = createElementWithClassAndParent("div", target, "profile-content");




  }

}