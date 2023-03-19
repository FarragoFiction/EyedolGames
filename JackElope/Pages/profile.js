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

  constructor(seed, name, image, matchPercent, loc) {
    super();
    this.seed = seed ? seed : 13;
    this.rand = new SeededRandom(this.seed);
    this.age = this.rand.getRandomNumberBetween(18, 99);
    this.name = name ? name : "Shambling Horror With Your Face";
    this.image = image ? baseURL + image : `http://farragofiction.com/ZampanioHotlink/KRsAIExperiments/${pickFrom(horrors)}`;
    this.loc = loc ? loc : "Right Behind You ;)";
    this.matchPercent = matchPercent ? matchPercent : "-216";
    this.lastOnline = this.rand.getRandomNumberBetween(0,30);//days ago, 1 in X chance of being online now to talk to.
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
    matchPercent.innerText = this.matchPercent + "% Match";

    let friendPercent = createElementWithClassAndParent("div", matchBox, "profile-percent friend");
    friendPercent.innerText = this.rand.getRandomNumberBetween(0, 100) + "% Friend"

    let enemyPercent = createElementWithClassAndParent("div", matchBox, "profile-percent enemy");
    enemyPercent.innerText = this.rand.getRandomNumberBetween(this.matchPercent, 100 - this.matchPercent) + "% Enemy"


    let nameEle = createElementWithClassAndParent("div", rightCol, "profile-name");
    nameEle.innerText = this.name;

    let ageEle = createElementWithClassAndParent("div", rightCol, "profile-age");
    ageEle.innerText = this.age;

    let locEle = createElementWithClassAndParent("div", rightCol, "profile-loc");
    locEle.innerText = this.loc;



    let messageButton = createElementWithClassAndParent("button", headerContent, "message-button");
    messageButton.innerText = "Message Them";





    let content = createElementWithClassAndParent("div", target, "profile-content");
    this.setupAbout(content);
    this.setupDetails(content);



  }


  setupAbout = (parent) => {
    let content = createElementWithClassAndParent("div", parent, "profile-about");
    content.innerText = "TODO: list of possible sections all with TODO, eventually obsession engine";

  }

  setupDetails = (parent) => {
    let content = createElementWithClassAndParent("div", parent, "profile-details");

    let header = createElementWithClassAndParent("div", content, "profile-details-header");
    header.innerText = "Their Details";

    const createDetail = (label, text) => {
      let ele = createElementWithClassAndParent("div", content, "profile-details-wrapper");

      let labelEle = createElementWithClassAndParent("div", ele, "profile-details-label");
      labelEle.innerText = label;

      let textEle = createElementWithClassAndParent("div", ele, "profile-details-text");
      textEle.innerText = text;
    }

    createDetail("Last Online",`${this.lastOnline === 0? 'Online Now!':this.lastOnline+" days ago."}`);
    createDetail("Ethnicity",this.rand.pickFrom(["It's a secret ;)","Wouldn't you like to know, weather boy.","N/A","N/A","N/A","N/A","N/A","N/A","N/A","Intentionally Left Blank","Yes","No","Not Disclosed"]));
    createDetail("Height",`${this.rand.getRandomNumberBetween(3,8)}' ${this.rand.getRandomNumberBetween(0,12)}'' (${(this.rand.nextDouble()+1).toFixed(2)}m)`);//the birbs don't know what a reasonable conversion of feet to meters would be, they just know profiles have this format. 
    createDetail("Body Type",this.rand.pickFrom(["Expensive","Colorful","Stable","Vast","Cold","Temperate","Abnormal","Glorious","Warm","Hospitable","Celestial","Super Massive","Clean","Fashionable","Skeletal","Rotting","Pleasant","Angled","Strange","Haunted","Crowded","Cozy","Filled with Natural Light","Plant-Based","Vibrant","Elegant","Controversial","Dramatic","Old-fashioned","Trendy","Classic","Simple","Spacious","Bad","Good","Incorrect","Correct","Snuggly","Soft","Intimidating","Powerful","Curvy","Non-Euclidean","Athletic","Thin","Monstrous","Shambling"]));
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");
    createDetail("","");



  }

}

