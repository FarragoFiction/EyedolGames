
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

        let content = createElementWithClassAndParent("div", box,"homepage-content");

        makeGender(content);

    }
}

const makeGender = (box) => {
    let genderSection = createElementWithClassAndParent("div", box, "form-section");
    let genderSelect = makeSelect(genderSection, "Could I ask you your Gender?", ["Female", "Male", "Neither", "Complicated", "I don't know..."])
    genderSelect.oninput = (e) => {
        genderSection.remove();
        let title = createElementWithClassAndParent("div", box, "quip");
        if (e.target.value.includes("don't")) {
            let title = createElementWithClassAndParent("div", box, "quip");
            title.innerHTML = "If you need help figuring out your gender, try <a target='blank' href ='http://eyedolgames.com/Gender/'>here</a>! ";
        }else{
            title.innerText = "Interesting!!! I'll remember that you're " + e.target.value+"!";
        }
        makeOrientation(box);
    }
}

const makeOrientation = (box) => {
    let genderSection = createElementWithClassAndParent("div", box, "form-section");
    let genderSelect = makeSelect(genderSection, "Could I ask you your sexual orientation?", ["Straight", "Gay", "Bi", "Complicated", "I don't know..."])
    genderSelect.oninput = (e) => {
        genderSection.remove();
        let title = createElementWithClassAndParent("div", box, "quip");
        if (e.target.value.includes("don't")) {
            let title = createElementWithClassAndParent("div", box, "quip");
            title.innerHTML = "If you need help figuring out your orientaion, try <a target='blank' href ='http://farragofiction.com/LightAndVoid/?seerOfVoid=true'>here</a>! ";
        }else{
            title.innerText = "Hmmm... I'll remember that you're " + e.target.value+ "!";
        }
        makeLocation(box);
    }
}

const makeLocation = (box) => {
    let genderSection = createElementWithClassAndParent("div", box, "form-section");
    let genderSelect = makeSelect(genderSection, "Could I ask you your location?", ["Westerville, Ohio", "Orlando, Florida", "Naples, Italy", "Somewhere else"])
    genderSelect.oninput = (e) => {
        genderSection.remove();
        let title = createElementWithClassAndParent("div", box, "quip");
        if (e.target.value.includes("else")) {
            let title = createElementWithClassAndParent("div", box, "quip");
            title.innerHTML = "Oh, no... You sound confused! There are only three possible places in the entire Universe. I've gone ahead and picked the one most close to you.";
        }else{
            title.innerText = "Yes. I'll remember that you're in "  + e.target.value + "!";
        }
        //todo button
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



