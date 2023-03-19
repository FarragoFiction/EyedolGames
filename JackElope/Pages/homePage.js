
class HomePage extends PageObject {

    deploy = () => {
        const parent = document.querySelector("#container");
        let ele = createElementWithClassAndParent("div", parent, "home-page");
        let target = this.basicPageStructure(ele);

        let box = createElementWithClassAndParent("div", target, "inner-box");

        let splash = createElementWithClassAndParent("div", box, "splash");
        let title = createElementWithClassAndParent("div", splash, "splash-title");
        title.innerText = "Start Meeting Sexy Local Singles Now!";
        let desc = createElementWithClassAndParent("div", splash, "splash-desc");
        desc.innerText = "We just need to learn a few things about you to get started.";

        let content = createElementWithClassAndParent("div", box, "homepage-content");

        makeGender(content);

    }
}

const makeGender = (box) => {
    let genderSection = createElementWithClassAndParent("div", box, "form-section");
    let genderSelect = makeSelect(genderSection, "Could I ask you your Gender?", ["...", "Female", "Male", "Neither", "Complicated", "I don't know..."])
    genderSelect.onchange = (e) => {
        seedSource += e.target.value;
        genderSection.remove();
        let title = createElementWithClassAndParent("div", box, "quip");
        if (e.target.value.includes("don't")) {
            let title = createElementWithClassAndParent("div", box, "quip");
            title.innerHTML = "If you need help figuring out your gender, try <a target='blank' href ='http://eyedolgames.com/Gender/'>here</a>! ";
        } else {
            title.innerText = "Interesting!!! I'll remember that you're " + e.target.value + "!";
        }
        makeOrientation(box);
    }
}

const makeOrientation = (box) => {
    let genderSection = createElementWithClassAndParent("div", box, "form-section");
    let genderSelect = makeSelect(genderSection, "Could I ask you your sexual orientation?", ["...", "Straight", "Gay", "Bi", "Complicated", "I don't know..."])
    genderSelect.onchange = (e) => {
        seedSource += e.target.value;
        genderSection.remove();
        let title = createElementWithClassAndParent("div", box, "quip");
        if (e.target.value.includes("don't")) {
            let title = createElementWithClassAndParent("div", box, "quip");
            title.innerHTML = "If you need help figuring out your orientaion, try <a target='blank' href ='http://farragofiction.com/LightAndVoid/?seerOfVoid=true'>here</a>! ";
        } else {
            title.innerText = "Hmmm... I'll remember that you're " + e.target.value + "!";
        }
        makeLocation(box);
    }
}

const makeLocation = (box) => {
    let genderSection = createElementWithClassAndParent("div", box, "form-section");
    let genderSelect = makeSelect(genderSection, "Could I ask you your location?", ["...", "Westerville, Ohio", "Orlando, Florida", "Naples, Italy", "Somewhere else"])
    genderSelect.onchange = (e) => {
        yourLocation = e.target.value;
        seedSource += e.target.value;
        genderSection.remove();
        let title = createElementWithClassAndParent("div", box, "quip");
        if (e.target.value.includes("else")) {
            let title = createElementWithClassAndParent("div", box, "quip");
            title.innerHTML = "Oh, no... You sound confused! There are only three possible places in the entire Universe. I've gone ahead and picked the one most close to you.";
            yourLocation = pickFrom(locations);// true random. space is FUCKED up. 
        } else {
            title.innerText = "Yes. I'll remember that you're in " + e.target.value + "!";
        }
        for (let i = 0; i < 100; i++) {
            locations.push(yourLocation); //add your "real" location one hundred times.
        }

        let button = createElementWithClassAndParent("button", box);
        button.innerText = "Click When You Are Ready To Experience The Sexy Singles"
        button.onclick = () => {
            makeSexySingles(box);
        }

    }
}


const makeSelect = (parent, label, options) => {
    let labelEle = createElementWithClassAndParent("label", parent, "section-label");
    labelEle.innerText = label;

    let select = createElementWithClassAndParent("select", parent, "section-select");
    for (let o of options) {
        let option = createElementWithClassAndParent("option", select, "section-option");
        option.value = o;
        option.innerText = o;
        if (o === options[0]) {
            option.select = true;
        }
    }
    return select;
}


let numSingles = 0;

const makeSexySingles = async (parent) => {
    parent.innerHTML = "";
    let loadingAnimation = createElementWithClassAndParent("div", parent);
    loadingAnimation.innerHTML = `<div class="lds-heart"><div></div></div>`;

    seed = stringtoseed(seedSource)
    const rand = new SeededRandom(seed);


    const splashT = document.querySelector(".splash-title")
    splashT.innerText = "Searching for Sexy Singles In Your Area!";

    const splashD = document.querySelector(".splash-desc")
    splashD.innerText = "Please wait...";

    await grabNormalImages();
    await grabWeirdImages();
    loadingAnimation.remove();

    splashT.innerText = "We've Scientifically Calculated These Sexy Singles To Be a Match For You!";
    splashD.innerText = "Why not message one of them today?";
    let container = createElementWithClassAndParent("div", parent, "sexy-singles");

    for (let i = 0; i < 85; i++) {
        renderOneSexySingle(rand, container);
    }

    handleSexySinglesScrolling(rand,container);
}

//http://www.farragofiction.com/SBURBSim/gnosis.html
const renderOneSexySingle = (rand, container) => {
    numSingles++;
    const name = rand.pickFrom(first_names);
    const image = rand.pickFrom(numSingles>50? weirdImageList: normalImageList);
    //match percent gets worse and worse as you go, eventually flipping negative. 
    const matchPercent = rand.getRandomNumberBetween(100 - numSingles, 100);
    //each time we generate a sexy single they are ever so slightly less likely to be local.
    removeItemOnce(locations, yourLocation);
    const loc = rand.pickFrom(locations);
    const seed = rand.internal_seed;


    let single = createElementWithClassAndParent("div", container,"single");
    single.onclick = ()=>{
        updateURLParams(`seed=${seed}&name=${name}&image=${image}&matchPercent=${matchPercent}&loc=${loc.replaceAll(baseURL,"")}`);
        window.location.href = window.location.href;
    }

    let imageEle = createElementWithClassAndParent("img", single,"preview", 'results-image');
    imageEle.src = baseURL+image;

    let nameEle = createElementWithClassAndParent("div", single,"results-name");
    nameEle.innerText = name;

    
    let locationEle = createElementWithClassAndParent("div", single,"results-location");
    locationEle.innerText = loc;

    let matchEle = createElementWithClassAndParent("div", single, "results-match");
    matchEle.innerText = `${matchPercent}%`;






}

const handleSexySinglesScrolling = (rand, container) => {
    console.log("JR NOTE: handleRestaurantScrolling");
    let lastScrollTime = 0; //not to spam events
    window.onscroll = () => {
        const newTime = new Date().getTime();
        if (((newTime - lastScrollTime)) < 50) {
            return;
        }
        lastScrollTime = newTime;

        window.requestAnimationFrame(() => {
            console.log("JR NOTE: scroll");
            renderOneSexySingle(rand, container);
            renderOneSexySingle(rand, container);
            renderOneSexySingle(rand, container);
        });

    };
}




