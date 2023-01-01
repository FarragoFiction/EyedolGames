

const handleCategories = ()=>{
    const categories = document.querySelector("#categories");
    const container = createElementWithClassAndParent("div",categories, "container");

    if(categories){
      for(let theme in all_themes){
        renderCategoryForTheme(container,theme);
      }
    }
    handleScrolling(container);
}

const handleScrolling = (container)=>{
  let lastScrollTime = 0; //not to spam events
  container.onscroll = () => {
    const newTime = new Date().getTime();
    if (((newTime - lastScrollTime)) < 50) {
      return;
    }
    lastScrollTime = newTime;

    window.requestAnimationFrame(() => {
      renderCategoryForTheme(container, pickFrom(Object.keys(all_themes)),true);
    });

  };
}

const missingEmoji = ()=>{
  return "🎨";
}

const fakeLabelForTheme = (theme)=>{
  return pickFrom([theme.pickPossibilityFor(ADJ),theme.pickPossibilityFor(LOCATION),theme.pickPossibilityFor(COMPLIMENT),theme.pickPossibilityFor(INSULT),theme.pickPossibilityFor(PERSON),theme.pickPossibilityFor(OBJECT)]);
}

const renderCategoryForTheme = (container,themeKey, fakeView)=>{
  const theme = all_themes[themeKey];
  const ele = createElementWithClassAndParent("div",container, "category");
  let icon = theme.pickPossibilityFor(ICON);
  if(icon === "Zampanio" || fakeView){
    icon = missingEmoji();
  }
  const label = fakeView ? fakeLabelForTheme(theme): themeKey;
  ele.innerHTML = `
    <div class="icon">
    ${icon}
    </div>
    <div class="label">
    ${titleCase(label)}
    </div>
  `;

}

