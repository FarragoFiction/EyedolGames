
class HomePage extends PageObject {

    deploy =()=>{
        const parent = document.querySelector("#container");
        let ele = createElementWithClassAndParent("div",parent, "home-page");
        this.basicPageStructure(ele);

    }
}



