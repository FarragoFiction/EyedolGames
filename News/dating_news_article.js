
//tired of global namespace tbh
class DatingArticle {
  sexy_single_name = "UNKNOWN"
  sexy_single_loc = "UNKNOWN"
  rand

  replaceFirstArticleAndHeader = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.sexy_single_name = urlParams.get('name');
    this.rand = new SeededRandom(stringtoseed(this.sexy_single_name));

    this.sexy_single_loc = urlParams.get('loc');
    const article = document.querySelector(".article");
    const headline = document.querySelector(".headline");
    headline.innerText = "Local Single Vanishes";


    this.fleshOutNewsArticle(article)
    for (let i = 0; i < 10; i++) {
      this.renderOneNewsArticle();
    }

  }

  renderOneNewsArticle = () => {
    console.log("JR NOTE: rendering")
    num_articles++;
    //it gets weirder but not like, terribly weirder. its already weird
    const parent = document.querySelector("body");

    const article = createElementWithClassAndParent("div", parent, "article");
    article.innerHTML = `
    <div class="article">
    <div class="content"><h2 class="headline">Test</h2>
    <p>In a shocking turn of events, the Baker's Restaurant driver, was in the process of delivering food to Adam Gently, transformed into a monstrous creature and attacked Adam Gently, waiting for a Baker's Restaurant delivery, notably featuring a flavorful Delicious Roll.</p><p>Eye witnesses, describing the Baker's Restaurant driver, say it has a red rubber clown nose. Authorities were not available for comment. Authorities say this is likely some form of hazing by local teens.</p><p>It is currently unclear where Adam Gently or even the Baker's Restaurant driver is. </p><p>When authorities arrived on the scene, the monster had fled the area, but not before causing considerable damage to the exterior of the building. It is currently unknown what the monster was trying to accomplish by its actions or where it has gone.</p><p>Eye witnesses, describing the Baker's Restaurant driver, say it dripped rotten eggs as it walked. Authorities were not available for comment. Authorities say this is likely some form of hazing by local teens.</p></div>
  
    <a target="blank" href="http://eyedolgames.com/Zampanini?name=Baker%27s+Restaurant&amp;themes=Bakery&amp;feeUnder=21&amp;victim=Adam+G+" class="link3">
      <img class="left" src="http://eyedolgames.com/Zampanini/images/Bakery/00146-img_20230101202953.png" style="object-fit: none;">
      <div class="center" style="background-color: rgb(68, 92, 98);"><div class="logo">😸</div><div class="restaurant_name">Baker's Restaurant</div><div class="slogan">Powered by Zampanini. Funny. Every time.</div></div>
      <img class="right" src="http://eyedolgames.com/Zampanini/images/Bakery/00065-img_20221231212905.png" style="object-fit: none;">
    </a>
    <p>
    </p><div class="more-content"><p>According to witnesses, the Baker's Restaurant driver has not yet been identified suddenly began to grow in size and change in appearance. Within minutes, they had become a terrifying monster, it wore a baker's hat and dragged a long rolling pin behind it embedded with spikes..</p><p>Eye witnesses, describing the assailant, say it wore a baker's hat and dragged a long rolling pin behind it embedded with spikes. Authorities were not available for comment. It is unclear if Adam Gently was on any mind altering substances.</p><p>Eye witnesses, describing the Baker's Restaurant driver, say it wore a baker's hat and dragged a long rolling pin behind it embedded with spikes. Authorities were not available for comment. It is unclear if Adam Gently was on any mind altering substances.</p><p>When authorities arrived on the scene, the monster had fled the area, but not before causing considerable damage to the exterior of the building. It is currently unknown what the monster was trying to accomplish by its actions or where it has gone.</p><p>It is unclear at this time what caused the Baker's Restaurant driver to transform into a monster or how many other potential victims besides Adam Gently there are. The investigation into the incident is ongoing, and authorities are urging residents to be vigilant and to report any unusual activity to the police. Police say that citizens should remain in their homes and they will be safe.</p></div>
  </div>`

    this.fleshOutNewsArticle(article);
    setUpMiddleAD(article.querySelector(".link3"))

  }

  getHeadline = () => {
    const options = [`Authorities Warn Not To Trust Shady Dating Sites`, `${this.sexy_single_loc} Loses Another Resident to Sketch Dating Sites`, "Local Single Disappears Suddenly", `${this.sexy_single_name} never loved you`];
    return this.rand.pickFrom(options)
  }


  handleScrolling = (container, rand, existing_keys) => {
    let lastScrollTime = 0; //not to spam events

    window.onscroll = () => {
      const newTime = new Date().getTime();
      if (((newTime - lastScrollTime)) < 1050) {
        return;
      }
      lastScrollTime = newTime;

      window.requestAnimationFrame(() => {
        this.renderOneNewsArticle();

      });

    };
  }

  handleFirstSection = (ele) => {
    this.handleScrolling();

    const intro = createElementWithClassAndParent("p", ele);

    const explanations = [`A victim is lured to what ${this.rand.pickFrom(["at first glance", "initially", ""])} appears to be a dating site. ${this.rand.pickFrom(["It is unclear how the victims vanish", "Authorities have not released further details", "It is unknown how the criminals gain access to the victims"])}, but logs show nonsensical, spiralling conversations with clear bot accounts.`, `Logs from the victims accounts show spiralling non-sensical conversations with seeming chat bots preceding their disappearnce. `, `Victims often leave cryptic messages behind speaking of '${this.rand.pickFrom(["do you traverse mazes clockwise or counterclockwise","just five more minutes","please let it all end","go to zeus and plead for her life","the truth is layered", "the end is never the end", "needing to dig further"])}'.`, `Victims become increasingly certain that there is deeper meaning in seemingly ordinary websites.`];

    intro.innerHTML = `
      <p>${this.rand.pickFrom(["A", "In breaking news, a", "Tragedy once again befalls our area as a"])} ${this.rand.pickFrom(["local single", "local resident", "local shut in", "person of interest",`recent addition to ${this.sexy_single_loc}`])} has ${this.rand.pickFrom(["gone missing", "last been seen", "not been seen since"])} Friday, after ${this.rand.pickFrom(["friends", "neighbors", "family members", "coworkers", "classmates"])} reported them ${this.rand.pickFrom(["clicking a link to", "spending more and more time on", "becoming increasingly obsesed with"])} a dating site called 'jackElope'. ${this.rand.pickFrom(["They have been missing over 48 hours.", "They are presumed dead.", ""])}</p>
      <p>${this.rand.pickFrom(["Those familiar with the case", "Law Enforcement", "Experts", "Authorities"])} ${this.rand.pickFrom(["report", "testify", "claim", "say"])} this is only the ${this.rand.pickFrom(["latest", "most recent", "most tragic"])} in a string of ${this.rand.pickFrom(["related", "identcal", "similar"])} ${this.rand.pickFrom(["mysteries", "attacks", "incidents"])}.</p>
      <p>${this.rand.pickFrom(explanations)}</p>
      `;

  }

  handleSecondSection = (ele) => {
    const intro = createElementWithClassAndParent("p", ele);

    const explanations = [`A victim is lured to what ${this.rand.pickFrom(["at first glance", "initially", ""])} appears to be a dating site. ${this.rand.pickFrom(["It is unclear how the victims vanish", "Authorities have not released further details", "It is unknown how the criminals gain access to the victims"])}, but logs show nonsensical, spiralling conversations with clear bot accounts.`, `Logs from the victims accounts show spiralling non-sensical conversations with seeming chat bots preceding their disappearnce. `, `Victims often leave cryptic messages behind speaking of '${this.rand.pickFrom(["the truth is layered", "the end is never the end", "needing to dig further"])}'.`];

    intro.innerHTML = `
    <p>${this.rand.pickFrom(["Those familiar with the case", "Law Enforcement", "Experts", "Authorities"])} ${this.rand.pickFrom(["warn", "urge", "caution"])} ${this.rand.pickFrom(["civilians", "citizens", "locals", "residents"])} to avoid clicking suspicious links and to block and report any bot accounts they find.</p>
    <p></p>
    <p></p>
      `;
  }

  fleshOutNewsArticle = (ele) => {



    const innerHeadline = ele.querySelector(".headline");
    innerHeadline.innerText = this.getHeadline();

    const content = ele.querySelector(".content");
    content.innerText = "";
    content.append(innerHeadline);
    this.handleFirstSection(content);

    const moreContent = ele.querySelector(".more-content");
    moreContent.innerText = "";

    this.handleSecondSection(moreContent);

  }
}
