

const handleCategories = ()=>{
    const categories = document.querySelector("#categories");
    const container = createElementWithClassAndParent("div",categories, "container");

    if(categories){
      for(let theme in all_themes){
        renderCategoryForTheme(container,theme);
      }
    }
}

const missingEmoji = ()=>{
  return "🎨";
}

const renderCategoryForTheme = (container,themeKey)=>{
  const theme = all_themes[themeKey];
  const ele = createElementWithClassAndParent("div",container, "category");
  let icon = theme.pickPossibilityFor(ICON);
  if(icon === "Zampanio"){
    icon = missingEmoji();
  }
  ele.innerHTML = `
    <div class="icon">
    ${icon}
    </div>
    <div class="label">
    ${titleCase(themeKey)}
    </div>
  `;

}

