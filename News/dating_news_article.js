
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

  getHeadline = () => {
    const options = [`Authorities Warn Not To Trust Shady Dating Sites`,`${this.sexy_single_loc} Loses Another Resident to Sketch Dating Sites`, "Local Single Disappears Suddenly", `${this.sexy_single_name} never loved you`];
    return this.rand.pickFrom(options)
  }

  renderOneNewsArticle = ()=>{
    
  }

  handleFirstSection = ()=>{

  }

  handleSecondSection = ()=>{
    
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
