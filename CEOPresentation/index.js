let currentSlideNumber = 0;
let rand = new SeededRandom(stringtoseed(new Date().toString()))

const normalImageSource = "http://eyedolgames.com/JackElope/images/SexySingles/BigNormalPile/";
let normalImages = [];

const weirdImageSource = "http://eyedolgames.com/JackElope/images/SexySingles/BigWeirdPile/"
let weirdImages = [];
window.onload = async () => {
    fetchInexplicableAttractiveHumanPicsForPresentation();
    fuckWithImages();
    document.querySelector("body").onclick = () => {
        nextSlide();
    }

    //only await if you want a little pause
    broChat("...")
    await broChat("BRO")
    await broChat("THIS BETTER BE GOOD.")
    await broChat("BECAUSE I DID NOT THINK I HAD TO SPECIFY")
    await broChat("THAT YOU SQWAWKING IDIOTS")
    await broChat("SHOULD NOT MAKE FAKE EYEDOLGAMES WEBSITES")
    broChat("SERIOUSLY")
    await broChat("WE MAKES GAMES")
    broChat("AND")
    await broChat("SOMETIMES WE MAKE THEME PARKS")
    await broChat("WHY ARE YOU MAKING DATING SITES")
    await broChat("WNY ARE YOU ENCOURAGING PEOPLE TO KISS IN MY MAZE")
    await broChat("WHAT DOES THAT HAVE TO DO WITH THE *LORE*, BRO")
    broChat("BRO")
    await broChat("KISSING IS NOT SPOOKY")
    await broChat("ZAMPANIO HAS NOTHING TO DO WITH KISSING")
    //its like if you're playing with g i joes and 
    //your annoying little sibling shows up
    //and insists on making them all marry their barbies
    //its so funny to me that not even wanda really controls the setting
    //the setting keeps escaping them
    ///she doens't even know what she did to the mall
    if (currentSlideNumber === 0) {
        nextSlide();
    }
}

//a loop of fuckery
const fuckWithImages = async () => {
    const image = document.querySelector(".random-bullshit-image-right img")
    if (image) {
        if (normalImages.length > 0 && Math.random() > 0.1) {
            image.src = pickFrom(normalImages);
        } else if (weirdImages.length > 0) {
            image.src = pickFrom(weirdImages);
        }
    }
    await sleep(rand.getRandomNumberBetween(1000, 10000))
    fuckWithImages();
}

const nextSlide = () => {
    currentSlideNumber++;
    switch (currentSlideNumber) {
        case 1:
            slide1();
            break;
        case 2:
            slide2();
            break;
        case 3:
            slide3();
            break;
        case 4:
            slide4();
            break;
        case 5:
            slide5();
            break;
        case 6:
            slide6();
            break;
        case 7:
            slide7();
            break;
        case 8:
            slide8();
            break;
    }
}

//no punctuation, all caps
const broChat = async (text) => {
    await sleep(1000)
    console.log(`%c${text.toUpperCase().replace(/[.,\/#$%\^&\*;:{}=\-_`~()]/g, "")}`, "font-weight: bold;font-family: 'Courier New', monospace;color:black; font-size:13px;");
}

/*
i had chat gpt, playing the role of Jaimie Rook, make the content of these bullet points
while i styled and coded the page myself cuz thats the fun part
i took screenshots of the interaction in case you're curious
*/
const slide1 = async () => {
    const body = document.querySelector('body');
    body.innerHTML = `
    
    <div class='slide'>
        <h2 class='slide-title'>Agenda</h2>
        <div class='two-col'>
            <div class='left-col'>
            <ul>
                <li>Understanding the Vision</li>
                <li>The EyedolGames.com Initiative</li>
                <li>Mimics, Multiplicity & Meaning</li>
                <li>Traffic, Conversions & Confusion (Good!)</li>
                <li>What We've Built (So Far)</li>
                <li>The Future of Eyedol?</li>
                <li>Q&A (Quotidian & Anomalous)</li>
            </ul>
            </div>
            <div class='right-col'>    <div class="random-bullshit-image-right">
      <img src="http://eyedolgames.com/JackElope/images/SexySingles/BigNormalPile/00000-20230306084658-img.png">
    </div></div>

        </div>
    </div>`;
    await broChat("BRO");
    await broChat("I AM DOING MY BEST TO BE PATIENT HERE")
    await broChat("I KNOW YOU'RE DOING YOUR BEST TO COMMUNICATE DESPITE THE WHOLE")
    await broChat("MIRROR CORRUPTION DEAL")
    await broChat("BUT I AM NOT EXACTLY THRILLED ")
    await broChat("TO HAVE YOU ANSWER MY QUESTION")
    await broChat("IN THE FORM OF A SHITTY PRESENTATION")
    await broChat("THAT SAID")
    await broChat("'Quotidian & Anomalous'")
    await broChat("IS REALLY GOOD")

    if (currentSlideNumber === 1) {
        nextSlide();
    }






}

const slide2 = async () => {
    const body = document.querySelector('body');
    body.innerHTML = `
    
    <div class='slide'>
        <h2 class='slide-title'>Understanding the Vision</h2>
        <div class='two-col'>
            <div class='left-col'>
            <ul>
                <li>""Zampanio is not a game. It is a lens." - (maybe you? or me?? unclear tbh)"</li>
                <li>Zampanio thrives in liminality.</li>
                <li>Players aren't meant to know what's real.</li>
                <li>So we built something that isn't a game…</li>
                <li>But feels like it could become one at any moment.</li>
            </ul>
            </div>
            <div class='right-col'>    <div class="random-bullshit-image-right">
      <img src="http://eyedolgames.com/JackElope/images/SexySingles/BigNormalPile/00000-20230306084658-img.png">
    </div></div>

        </div>
    </div>`;

    await broChat("OKAY SO")
    await broChat("YOUR POINT IS")
    await broChat("THIS IS JUST MORE VIRAL MARKETING")
    await broChat("FOR ZAMPANIO")
    await broChat("BUT THAT DOESN'T")
    await broChat("EXPLAIN WHY")
    await broChat("WE CAN'T ACTUALLY PUT OUR CORPORATE WEBSITE")
    await broChat("AND *MY*")
    await broChat("SHITTY ARG")
    await broChat("ON EYEDOLGAMES.COM")
    await broChat("BECAUSE SOME ASSHOLES SHARKED IT FIRST")
    await broChat("BY WHICH I MEAN")
    await broChat("YOU QUOTIDIANS")
    await broChat("WENT BEHIND MY BACK")
    await broChat("AND STOLE MY OWN SITE")
    await broChat("JUST LIKE THAT FACE STEALER DID")
    await broChat("TO MY PAST SELF")
    await broChat("I WAS SO PISSED")
    await broChat("TO FIND MY BLOG HACKED BACK THEN")



    if (currentSlideNumber === 2) {
        nextSlide();
    }
}

const slide3 = async () => {
    const body = document.querySelector('body');
    body.innerHTML = `
    
    <div class='slide'>
        <h2 class='slide-title'>The EyedolGames.com Initiative</h2>
        <div class='two-col'>
            <div class='left-col'>
            <ul>
                <li>We quietly registered eyedolgames.com.</li>
                <li>Not to compete with Zampanio.net, but to reflect it sideways.</li>
                <li>Goal: Infect the banal.</li>
                <li>Approach: Flood the site with non-game content that could be a Zampanio ARG seed.</li>
                <li>Result: "EyedolGames" becomes everywhere and nowhere.</li>
            </ul>
            </div>
            <div class='right-col'>    <div class="random-bullshit-image-right">
      <img src="http://eyedolgames.com/JackElope/images/SexySingles/BigNormalPile/00000-20230306084658-img.png">
    </div></div>

        </div>
    </div>`;

    await broChat("YEAH.")
    await broChat("QUIETLY.")
    await broChat("CUZ YOU FREAKING KNEW I WOULDN'T HAVE LIKED THAT.")
    await broChat("ZAMPANIO ALREADY IS EVERYWHERE AND NOWHERE.")
    await broChat("WE ALREADY HAVE LIKE.")
    await broChat("A THOUSAND ARGS.")
    await broChat("HELL.")
    await broChat("YOU REMEMBER THAT SERIAL KILLER WE DEFINITELY DID NOT FUND (DON'T SUE ME BRO).")
    await broChat("ARGS ARE KIND OF OUR THING.")
    await broChat("SO WHY DID YOU GUYS HAVE TO GO AND STEAL OUR OWN WEBSITE.")
    await broChat("WHY I GOT ASSIGNED CROW CONSORTS I WILL NEVER UNDERSTAND.")
    await broChat("STOP STEALING MY SHIT.")

    if (currentSlideNumber === 3) {
        nextSlide();
    }
}

const slide4 = async () => {
    const body = document.querySelector('body');
    body.innerHTML = `
    
    <div class='slide'>
        <h2 class='slide-title'>Mimics, Multiplicity & Meaning</h2>
        <div class='two-col'>
            <div class='left-col'>
            <ul>
                <li>Quotidian mimics executed the vision flawlessly.</li>
                <li>Each site is convincingly real, but off in the right ways.</li>
                <li>Dating sites where no one replies.</li>
                <li>Food delivery that only offers one item: "the meat."</li>
                <li>News with headlines like:"Local Man Receives Forecast, Refuses to Age"</li>
            </ul>
            </div>
            <div class='right-col'>    <div class="random-bullshit-image-right">
      <img src="http://eyedolgames.com/JackElope/images/SexySingles/BigNormalPile/00000-20230306084658-img.png">
    </div></div>

        </div>
    </div>`;

    await broChat("FLAWLESSLY.")
    await broChat("SURE.")
    await broChat("ALSO.")
    await broChat("P SURE THOSE PORN BOTS REPLY.")
    await broChat("ARE THOSE FROM THAT FLOCK THE FACE STEALER TOOK?")
    await broChat("CUZ IF THEY ARE.")
    await broChat("WHY THE HELL ARE YOU LETTING THEM INTO OUR SHIT.")
    await broChat("YOU *KNOW* ONLY JEPE'S FLOCK IS SUPPOSED TO HAVE CREDENTIALS TO GET IN.")
    await broChat("ALSO.")
    await broChat("CAN I JUST SAY.")
    await broChat("THAT ZAMPANINI DEFINITELY HAS MORE THAN JUST MEAT ON THE MENU.")

    if (currentSlideNumber === 4) {
        nextSlide();
    }
}

const slide5 = async () => {
    const body = document.querySelector('body');
    body.innerHTML = `
    
    <div class='slide'>
        <h2 class='slide-title'>Traffic, Conversions & Confusion</h2>
        <div class='two-col'>
            <div class='left-col'>
            <ul>
                <li>Bounce rate: 6% (people are staying)</li>
                <li>Quiz completions: 3,284 (one was "What Kind of Faucet Are You?")</li>
                <li>One user submitted their social security number to "Date4U.biz" (we deleted it)</li>
                <li>One user thought "Eyedol Grub" was a real launch and tried to order "the meat."</li>
                <li>Several users found Zampanio from these sites. We didn't even link it. It just… happened.</li>
            </ul>
            </div>
            <div class='right-col'>    <div class="random-bullshit-image-right">
      <img src="http://eyedolgames.com/JackElope/images/SexySingles/BigNormalPile/00000-20230306084658-img.png">
    </div></div>

        </div>
    </div>`;

    await broChat("BY THE 8 DIVINE.")
    await broChat("I KNOW I SAID I WAS TRYING TO BE PATIENT WITH YOUR WHOLE MIRROR CORRUPTION.")
    await broChat("CUZ ACCESSIBILITY IS IMPORTANT FOR EVERYONE ETC ETC ")
    await broChat("BUT PLEASE")
    await broChat("*PLEASE*")
    await broChat("GET JEPE TO AT LEAST *READ* YOUR SHIT BEFORE YOU DO THINGS LIKE")
    await broChat("LOOSE TRACK OF WHAT YOUR OWN WEBSITES ARE CALLED.")
    await broChat("ITS ZAMPANINI AND JACKELOPE. OKAY?")
    await broChat("ALSO.")
    await broChat("GOOD WORK ON SPREADING ZAMPANIO")
    await broChat("I'LL HAVE THE NON-LOOPING CLOSER GIVE YOU SOME FRUIT")

    if (currentSlideNumber === 5) {
        nextSlide();
    }
}

const slide6 = async () => {
    const body = document.querySelector('body');
    body.innerHTML = `
    
    <div class='slide'>
        <h2 class='slide-title'>What We've Built (So Far)</h2>
        <div class='two-col'>
            <div class='left-col'>
            <ul>
                <li>Date4U.biz - romantic despair, algorithmic longing</li>
                <li>Eyedol Grub - menu rotates daily, sometimes in foreign alphabets</li>
                <li>Zampanews.org - "news" like a broken mirror</li>
                <li>Which Meat Are You? - still inconclusive</li>
                <li>EyedolQuizHub - tests that test whether you're real</li>
                <li>Job listing site where every employer is "hiring for your role."</li>
                <li>EyedolTV with static-filled shows that don't pause when tabbed away</li>

            </ul>
            </div>
            <div class='right-col'>    <div class="random-bullshit-image-right">
      <img src="http://eyedolgames.com/JackElope/images/SexySingles/BigNormalPile/00000-20230306084658-img.png">
    </div></div>

        </div>
    </div>`;

    await broChat("BRO")
    await broChat("IS THAT WHY WE CAN'T GET ANY NEW HIRES THIS LOOP")
    await broChat("INSTEAD OF DIGGING INTO MY SICK ASS ARG")
    await broChat("THE APPLICANTS ARE ALL JUST BEING BORING")
    await broChat("AND GOING TO YOUR FAKE SITE INSTEAD")
    await broChat("BRO")
    await broChat("NOT COOL")
    await broChat("YOU'RE JUST LUCKY I STILL GOT THE INTERN SOMEHOW THIS LOOP SOMEHOW")
    await broChat("ONLY HUMAN HIRE WE HAD")
    if (currentSlideNumber === 6) {
        nextSlide();
    }
}


const slide7 = async () => {
    const body = document.querySelector('body');
    body.innerHTML = `
    
    <div class='slide'>
        <h2 class='slide-title'>Agenda</h2>
        <div class='two-col'>
            <div class='left-col'>
            <ul>
                <li>The Future of Eyedol?</li>
                <li>Zampanio isn't expanding. It's <b>leaking.</b></li>
                <li>We propose:</li>
                <ul>
                <li>More mimic sites</li>
                <li>"Ad campaigns" with no product</li>
                <li>A browser plugin that quietly replaces ads with Zampanio phrases</li>
                </ul>
                <li>Vision: a web that forgets where Zampanio ends and reality begins.</li>
            </ul>
            </div>
            <div class='right-col'>    <div class="random-bullshit-image-right">
      <img src="http://eyedolgames.com/JackElope/images/SexySingles/BigNormalPile/00000-20230306084658-img.png">
    </div></div>

        </div>
    </div>`;
    await broChat("okay those taglines are p sick")
    await broChat("LEAKING IS GOOD, LETS USE THAT")
    await broChat("ALSO IM P SURE REALITY HAS FORGOTTEN WHERE ZAMPANIO ENDS AND IT BEGINS")
    await broChat("IT WOULD BE WEIRD IF THE 'NET DIDN'T ALSO DO THAT")
    await broChat("BUT")
    await broChat("APPRECIATED ANYWAYS")


    if (currentSlideNumber === 7) {
        nextSlide();
    }
}

const slide8 = async () => {
    console.log("JR NOTE: slide 8 is ", currentSlideNumber)
    const body = document.querySelector('body');
    body.innerHTML = `
    
    <div class='slide'>
        <h2 class='slide-title'>Q&A</h2>
        <div class='two-col'>
            <div class='left-col'>
            <ul>
                <li> Q: "Why didn't you tell Wanda?"</li>
                <li>A: We thought you already knew. Or were doing it too. Maybe… you were supposed to find it like a player?</li>
                <li>Q: "What is Zampanio now?"</li>
                <li>A:  It's not a game. It's an ecosystem of uncertainty.</li>
                <li>Q:  "Are we in trouble?"</li>
                <li>A: We hope so.</li>
            </ul>
            </div>
            <div class='right-col'>    <div class="random-bullshit-image-right">
      <img src="http://eyedolgames.com/JackElope/images/SexySingles/BigNormalPile/00000-20230306084658-img.png">
    </div></div>

        </div>
    </div>`;
    await broChat("yes.")
    await broChat("YES YOU ARE IN TROUBLE.")
    await broChat("YOU CAN'T JUST ASSUME I KNOW THINGS.")
    await broChat("YOU ARE *LITERALLY* DESIGNED TO HELP ME KNOW THINGS.")
    await broChat("YOUR ENTIRE EXISTENCE IS AROUND FINDING SHIT OUT AND TELLING ME THE SHIT.")
    await broChat("DOES EVERY LORD HAVE SUCH IRONIC MINIONS.")
    await broChat("BLUH.")
    await broChat("YOU STILL DO GET THAT FRUIT THOUGH.")
    await broChat("TROUBLE OR NOT.")
    await broChat("YOU SPREAD ZAMPANIO.")
    await broChat("AND IN THE END.")
    await broChat("THATS WHAT WE'RE ALL HERE FOR.")
    await broChat("JUST.")
    await broChat("NEXT LOOP.")
    await broChat("INSTEAD OF *our* DOMAIN.")
    await broChat("GRAB A DIFFERENT ONE TO SPREAD THIS SHIT IN.")
    await broChat("NON LOOPING CLOSER IS SO TIRED OF GETTING CUSTOMERS COMPLAINING THEY DIDN'T GET THEIR MINOBURGER OR WHATEVER.")
    await broChat("AND THE CFO HAS BEEN ASKING ME WHY WE'RE GETTING AUDITED ABOUT SOME WEBSITE WE DON'T EVEN OWN.")
    await broChat("ALSO.")
    await broChat("GO TELL HER THAT HER DOPPELGANGER MIGHT BE GETTING HER PORN BOTS INTO OUR SHIT AGAIN.")
    await broChat("CAN'T HAVE SHIT IN WESTERVILLE, OHIO, I TELL YOU.")
    await broChat("YES THE PORN BOTS DO MOSTLY BRING PPL TO ZAMPANIO.")
    await broChat("BUT THATS *NOT* WHAT THE CREEPY PASTA WAS ABOUT.")
    await broChat("WHAT KIND OF CREEPY PASTA HAS PORN BOTS IN IT.")
    await broChat("I SWEAR. THESE PEOPLE HAVE NO SENSE OF LORE.")


}


const emptySlide = () => {
    const body = document.querySelector('body');
    body.innerHTML = `
    
    <div class='slide'>
        <h2 class='slide-title'>Agenda</h2>
        <div class='two-col'>
            <div class='left-col'>
            <ul>
                <li>Understanding the Vision</li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            </div>
            <div class='right-col'>    <div class="random-bullshit-image-right">
      <img src="http://eyedolgames.com/JackElope/images/SexySingles/BigNormalPile/00000-20230306084658-img.png">
    </div></div>

        </div>
    </div>`;
}





const fetchInexplicableAttractiveHumanPicsForPresentation = async () => {
    const images = await getImages(normalImageSource);
    normalImages = images.map((i) => normalImageSource + i);

    const images2 = await getImages(weirdImageSource);
    weirdImages = images2.map((i) => weirdImageSource + i);
}