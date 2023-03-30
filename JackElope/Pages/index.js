
class PageObject {

    deploy =()=>{
        const parent = document.querySelector("#container");
        let ele = createElementWithClassAndParent("div",parent, "perfectly-generic");
        ele.innerText = "Well. It works. That's something.";

    }

    //all pages should use this tbh. but i don't want it to be REQUIRED so just. object orient it.
    basicPageStructure = (parent)=>{
        //big box, centered on the screen
        let bigbox = createElementWithClassAndParent("div",parent, "fullbox");
        //generous margins
        //logo in upper right corner
        let logo = createElementWithClassAndParent("img",bigbox, "logo");
        if(new Date().getHours() == 0 || new Date().getDay() === 5){
            //midnight and fridays are always special.
            logo.src = "images/pathos/Zamparamour_logo.png"
        }else{
            logo.src = "images/logos/JackElope_logo.png";
        }

       
        logo.onclick=()=>{

            window.location.href = 'index.html'
        }

        //white page content next to logo
        let target = createElementWithClassAndParent("div",bigbox, "target");

        return target;
    }

}





