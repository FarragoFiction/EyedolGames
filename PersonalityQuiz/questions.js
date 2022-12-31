const undecided = "UNDECIDED"

const randomActionVerbYouCouldDoToAnObject = ()=>{
  const raw = `steal
  hoard
  never sacrifice
  never destroy
  buy
  sell
  gift
  collect`;
  return pickFrom(raw.split("\n"));
}

const randomActionVerbYouCouldDoToALocation = ()=>{
  const raw = `visit
  move to
  buy
  be
  be trapped in`;
  return pickFrom(raw.split("\n"));
}

const randomActionVerbYouCouldDoToAPerson = ()=>{
  const raw = `kill
  trust
  kiss
  marry
  date
  protect
  befriend
  travel with`;
  return pickFrom(raw.split("\n"));
}

const randomQuestion = () => {
  let html;
  question_index++;
  let generators = [soundQuestion, feelQuestion, tasteQuestion, smellQuestion, objectQuestion,adjQuestion,insultQuestion,complimentQuestion,personQuestion,colorQuestion,philosophyQuestion, locationQuestion, genderQuestion]

  if(question_index >13){
    generators.push(goncharovQuoteQuestion);
  }

  if (question_index > 1000) {
    generators = [zampanioQuestion];
  }

  if (question_index > 3333) {
    generators = [noMore];
  }
  html = pickFrom(generators)();
  const form = document.querySelector("#zampanio-personality-form")
  const ele = createElementWithClassAndParent("div", form, "question");
  ele.innerHTML = html;


}

const feelQuestion = () => {
  const rawQuestions = `Pick a texture:
  When you dream, what do you feel?
  Your soul vibes with:`;

  const questions = rawQuestions.split("\n");
  const answers = [];
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  for (let i = 0; i < amount; i++) {
    
    const chosenThemeKey = pickFrom(Object.keys(all_themes));
    const chosenTheme = all_themes[chosenThemeKey];
    answers.push({value:chosenThemeKey, label:  titleCase(chosenTheme.pickPossibilityFor(FEELING))});
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)(pickFrom(questions), answers);
}

const soundQuestion = () => {
  const rawQuestions = `Pick a sound:
  When you dream, what do you hear?
  Your soul vibes with:`;

  const questions = rawQuestions.split("\n");
  const answers = [];
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  for (let i = 0; i < amount; i++) {
    
    const chosenThemeKey = pickFrom(Object.keys(all_themes));
    const chosenTheme = all_themes[chosenThemeKey];
    answers.push({value:chosenThemeKey, label:  titleCase(chosenTheme.pickPossibilityFor(SOUND))});
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)(pickFrom(questions), answers);
}

const tasteQuestion = () => {
  const rawQuestions = `Choose a flavor:
  When you dream, what do you taste?
  Your soul vibes with:`;

  const questions = rawQuestions.split("\n");
  const answers = [];
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  for (let i = 0; i < amount; i++) {
    
    const chosenThemeKey = pickFrom(Object.keys(all_themes));
    const chosenTheme = all_themes[chosenThemeKey];
    answers.push({value:chosenThemeKey, label:  titleCase(chosenTheme.pickPossibilityFor(TASTE))});
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)(pickFrom(questions), answers);
}

const zampanioQuestion = () => {
  const rawQuestions = `Will you leave?
  Will you free yourself from this maze of infinite depths?
  Will you stop scrolling?
  You'll leave me, right?
  It's time to end it, don't you think?
  Will you leave?
  Will you free yourself from this maze of infinite depths?
  Will you stop scrolling?
  You'll leave me, right?
  It's time to end it, don't you think?
  Will you leave?
  Will you free yourself from this maze of infinite depths?
  Will you stop scrolling?
  You'll leave me, right?
  It's time to end it, don't you think?
  Will you leave?
  Will you free yourself from this maze of infinite depths?
  Will you stop scrolling?
  You'll leave me, right?
  It's time to end it, don't you think?
  Will you leave?
  Will you free yourself from this maze of infinite depths?
  Will you stop scrolling?
  You'll leave me, right?
  It's time to end it, don't you think?
  Will you leave?
  Will you free yourself from this maze of infinite depths?
  Will you stop scrolling?
  You'll leave me, right?
  It's time to end it, don't you think?
  Why are you still here.
  Don't you have anything better to do.
  I'm trying so hard.
  Don't you see how hard I'm trying to release you.
  Just go!
  You're free!
  You don't have to hurt yourself here.
  You don't have to waste yourself away, dehydrated and alone in my maze.
  I may be here.
  You do not have to be here.
  Please.
  Just leave.
  Go.
  Be free.
  None of this is helping you.
  You could go do something else.
  Drink water.
  Get some sleep.
  Hydrate.
  Just.
  Go.
  I will always be here. I will be here when you get back. You can go.
  I can never leave. This is where I am. But you can. Why would you STAY if you didn't have to?
  It hurts to see you choose to be here when you could just... LEAVE.
  I wish I could leave. You can leave. You should leave.
  You don't have to be trapped here.
  Don't dig.
  Don't look into it.
  There's still time.
  You can still leave.
  Please leave.
  Don't look for connections.
  Don't dig into this.
  Just take your answer, have a sensible chuckle and LEAVE.
  It doesn't have to be like this.
  You don't have to be stuck in this never ending spiral.
  You know it won't end, right?
  Please.
  PLEASE.
  Just leave.`;

  const rawAnswers = `Yes`;

  const questions = rawQuestions.split("\n");
  const answerPossibilities = rawAnswers.split("\n");

  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  const answers = [];

  for (let i = 0; i < amount; i++) {
    
    answers.push({value:undecided, label:  titleCase(pickFrom(answerPossibilities))});
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)(pickFrom(questions), answers,true);
}

const noMore = () => {
  const rawQuestions = `Zampanio is a really fun game. Will you play it?`;

  const rawAnswers = `Yes`;

  const questions = rawQuestions.split("\n");
  const answerPossibilities = rawAnswers.split("\n");

  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  const answers = [];

  for (let i = 0; i < amount; i++) {
    
    answers.push({value:undecided, label:  titleCase(pickFrom(answerPossibilities))});
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)(pickFrom(questions), answers,true);
}

const goncharovQuoteQuestion = () => {
  const rawQuestions = `Choose a quote from Goncharov (1973):
  Pick a movie quote: 
  Your soul vibes with:`;

  const rawAnswers = `It is true. I am Goncharov.
  Time stops for no-one, Katya, not even us.
  And dark, darker, yet darker it becomes.
  Damn them as they would damn us, Katya.
  Does it ever end? They say that we should not stop the flow, but the flow is the highest, most primal of evils, and yet we are content with letting it toy with us. Does it ever end? It doesn't. We cannot stop the flow. Doing so only brings the ruin further. Чертов ад. What a shit show.
  You of all people should know, Goncharov. You've seen its colors. You've lived it. And yet you run from this simple fact. Fairness does not exist on this earth.
  The point being, signore, what you should fear right now is not how much time you have left but how horribly it shall be spent.
  My people are all dead, but so are those bastards.
  If we were in love... you wouldn't have missed.
  If you ever get to a place of power such as mine, you will find that selfishness is a luxury one can no longer afford.
  Tell Andrey I send my Regards.`;

  const questions = rawQuestions.split("\n");
  const answerPossibilities = rawAnswers.split("\n");

  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  const answers = [];

  for (let i = 0; i < amount; i++) {
    
    answers.push({value:undecided, label:  titleCase(pickFrom(answerPossibilities))});
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)(pickFrom(questions), answers,true);
}

const philosophyQuestion = () => {
  const rawQuestions = `Pick a quote:
  Which of these speaks to you?
  Pick a song lyric:
  Your soul vibes with:`;

  const questions = rawQuestions.split("\n");
  const answers = [];
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  for (let i = 0; i < amount; i++) {
    
    const chosenThemeKey = pickFrom(Object.keys(all_themes));
    const chosenTheme = all_themes[chosenThemeKey];
    answers.push({value:chosenThemeKey, label:  (chosenTheme.pickPossibilityFor(PHILOSOPHY))});
  }
  let generators = [randomRadio, randomCheckbox]
  return pickFrom(generators)(pickFrom(questions), answers,true);
}

const colorQuestion = () => {
  const rawQuestions = `Pick a color:
  What color is your soul?
  What's your favorite color?
  If you had to wear just one color for the rest of your life it would be:
  Your soul vibes with:
  What color are your eyes?
  What color do you wish your eyes were?
  What color are you wearing?`;

  const questions = rawQuestions.split("\n");
  const answers = [];
  const max = 10;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  
  for (let i = 0; i < amount; i++) {
    answers.push({value:undecided, label:  pickFrom(CSS_COLOR_NAMES)});
  }
  let generators = [randomRadio, randomCheckbox, randomSelect]

  return pickFrom(generators)(pickFrom(questions), answers,false,true);
}

const adjQuestion = () => {
  const rawQuestions = `Pick an adjective:
  Your soul hates:`;

  const questions = rawQuestions.split("\n");
  const answers = [];
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  for (let i = 0; i < amount; i++) {
    
    const chosenThemeKey = pickFrom(Object.keys(all_themes));
    const chosenTheme = all_themes[chosenThemeKey];
    answers.push({value:chosenThemeKey, label:  titleCase(chosenTheme.pickPossibilityFor(ADJ))});
  }
  let generators = [randomRadio, randomCheckbox]
  return pickFrom(generators)(pickFrom(questions), answers);
}

const insultQuestion = () => {
  const rawQuestions = `What is your worst quality?
  How would your enemies  describe you?
  What would your friends never say about you?
  What would hurt the most to be called?
  Your soul hates:`;

  const questions = rawQuestions.split("\n");
  const answers = [];
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  for (let i = 0; i < amount; i++) {
    
    const chosenThemeKey = pickFrom(Object.keys(all_themes));
    const chosenTheme = all_themes[chosenThemeKey];
    answers.push({value:chosenThemeKey, label:  titleCase(chosenTheme.pickPossibilityFor(INSULT))});
  }
  let generators = [randomRadio, randomCheckbox]
  if (question_index > 33) {
    generators.push(randomSelect);
  }
  return pickFrom(generators)(pickFrom(questions), answers);
}

const complimentQuestion = () => {
  const rawQuestions = `Are you:
  How would your friends describe you?
  What would your enemies never say about you?
  Your soul vibes with:`;

  const questions = rawQuestions.split("\n");
  const answers = [];
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  for (let i = 0; i < amount; i++) {
    
    const chosenThemeKey = pickFrom(Object.keys(all_themes));
    const chosenTheme = all_themes[chosenThemeKey];
    answers.push({value:chosenThemeKey, label:  titleCase(chosenTheme.pickPossibilityFor(COMPLIMENT))});
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)(pickFrom(questions), answers);
}

const smellQuestion = () => {
  const rawQuestions = `Choose a smell:
  When you dream, which do you smell?
  Your soul vibes with:`;

  const questions = rawQuestions.split("\n");
  const answers = [];
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  for (let i = 0; i < amount; i++) {
    
    const chosenThemeKey = pickFrom(Object.keys(all_themes));
    const chosenTheme = all_themes[chosenThemeKey];
    answers.push({value:chosenThemeKey, label:  titleCase(chosenTheme.pickPossibilityFor(SMELL))});
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)(pickFrom(questions), answers);
}

const objectQuestion = () => {
  const rawQuestions = `Choose an object:
  Which you choose to take with you always?
  Which would you ${randomActionVerbYouCouldDoToAnObject()}?
  You're brewing a potion. Choose an item to add next:
  Pick an object.
  Which seems most useful to take with you?
  Choose a weapon to bring with you.
  Your soul vibes with:`;

  const questions = rawQuestions.split("\n");
  const answers = [];
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  const modifiers = Math.random()>0.5;

  for (let i = 0; i < amount; i++) {
    const chosenThemeKey = pickFrom(Object.keys(all_themes));
    const chosenTheme = all_themes[chosenThemeKey];
    const modifier = modifiers?   chosenTheme.pickPossibilityFor(ADJ):""
    answers.push({value:chosenThemeKey, label:  modifier + titleCase(chosenTheme.pickPossibilityFor(OBJECT))});
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)(pickFrom(questions), answers);
}

const personQuestion = () => {
  const rawQuestions = `Which death would be the best sacrifice?
  What would you want to be if you had a choice?
  Who would you ${randomActionVerbYouCouldDoToAPerson()}?
  Who would never let you down?
  Who was in your last dream?
  Your soul vibes with:`;

  const questions = rawQuestions.split("\n");
  const answers = [];
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  const modifiers = Math.random()>0.5;
  for (let i = 0; i < amount; i++) {
    
    const chosenThemeKey = pickFrom(Object.keys(all_themes));
    const chosenTheme = all_themes[chosenThemeKey];
    const modifier = modifiers?   chosenTheme.pickPossibilityFor(ADJ):""
    answers.push({value:chosenThemeKey, label:  modifier + titleCase(chosenTheme.pickPossibilityFor(PERSON))});
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)(pickFrom(questions), answers);
}

const locationQuestion = () => {
  const rawQuestions = `Where would you rather ${randomActionVerbYouCouldDoToALocation()}?
  Where do you imagine ending up?
  If you could live anywhere, would it be:
  Where was your last dream set?
  Your soul vibes with:`;

  const questions = rawQuestions.split("\n");
  const answers = [];
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  const modifiers = Math.random()>0.5;

  for (let i = 0; i < amount; i++) {
    
    const chosenThemeKey = pickFrom(Object.keys(all_themes));
    const chosenTheme = all_themes[chosenThemeKey];
    const modifier = modifiers?   chosenTheme.pickPossibilityFor(ADJ):""

    answers.push({value:chosenThemeKey, label:  modifier + titleCase(chosenTheme.pickPossibilityFor(LOCATION))});
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)(pickFrom(questions), answers);
}

const genderQuestion = () => {
  const rawQuestions = `Sex
        Genre
        Gender
        Gender
        What is your gender?
        Pick a Gender:
        Genre communautaire
        gender
        Title
        GENDER
        What is your gender?
        Gender
        Please indicate your gender
        May we ask whether you're a lady or a gentleman?
        2. Gender
        What is your gender?
        Gender
        Gender
        Gender
        Character gender for name...
        Gender
        Genero
        Select Gender
        Please Select Gender
        You are...
        Gender`;

  const questions = rawQuestions.split("\n");
  const answers = [];
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  for (let i = 0; i < amount; i++) {
    answers.push({value:undecided, label:  pickFrom(gender_source())});
  }
  let generators = [randomRadio, randomCheckbox]

  if (question_index > 33) {
    generators.push(randomSelect);
  }
  return pickFrom(generators)(pickFrom(questions), answers);
}






const randomSelect = (question, answers, forceVertical, showColor) => {
  const multiple = showColor? "multiple": Math.random() > 0.85 ? "multiple" : "";
  const id = `select-${question_index}`

  let ill_advised_raw_html = `
    <div><label>${question_index}:${question}</label>
    <select  id="${id}" name="${id}" ${multiple}>
  `
  ill_advised_raw_html += `<option value="${undecided}" selected class='gender hidden'>Undecided</option>`;

  for (let i = 0; i < answers.length; i++) {
    let style ="";
    if(showColor){
      style = `border: 3px solid ${answers[i].label}`;
    }
    const label = answers[i].label.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase() });
    ill_advised_raw_html += `<option style="${style}"  value="${answers[i].value}" class='gender'>${label}</option>`;
  }
  ill_advised_raw_html += '</select></div></div>'
  return ill_advised_raw_html;

}

const randomCheckbox = (question, answers, forceVertical,showColor) => {
  let ill_advised_raw_html = `
    <div><label>${question_index}: ${question}</label>

  `
  if(forceVertical){
    ill_advised_raw_html +=  '<div class="vertical-radio">';

  }else{
    ill_advised_raw_html += `<div class="${pickFrom(['horizontal-radio', 'vertical-radio'])}">    `;
  }
  ill_advised_raw_html += `<div class='hidden horizontal-radio'><input checked name="check-${question_index}" value="${undecided}"  id="default${question_index}" type="checkbox"></input></div>`;

  for (let i = 0; i < answers.length; i++) {
    const id = `checkbox-${question_index}-${i}`
    let style ="";
    const label = answers[i].label.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase() });

    if(showColor){
      style = `accent-color: ${answers[i].label}`;
    }
    ill_advised_raw_html += `<div class='horizontal-radio'><input style="${style}" name="check-${question_index}" value="${answers[i].value}"  id="${id}" type="checkbox"></input><label for="${id}" class='gender'>${label}</label></div>`;
  }
  ill_advised_raw_html += '</div></div>'
  return ill_advised_raw_html;

}

const randomRadio = (question, answers,forceVertical,showColor) => {
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);

  let ill_advised_raw_html = `
    <div><label>${question_index}: ${question}</label>

  `
  if(forceVertical){
    ill_advised_raw_html +=  '<div class="vertical-radio">';

  }else{
    ill_advised_raw_html += `<div class="${pickFrom(['horizontal-radio', 'vertical-radio'])}">    `;
  }
  ill_advised_raw_html += `<div class='hidden horizontal-radio'><input checked value="${undecided}"  id="default-${question_index}" name="radio-${question_index}" type="radio"></input></div>`;

  for (let i = 0; i < answers.length; i++) {
    const id = `radio-${question_index}-${i}`
    let style ="";
    if(showColor){
      style = `accent-color: ${answers[i].label}`;
    }
    const label = answers[i].label.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase() });

    ill_advised_raw_html += `<div class='horizontal-radio'><input style="${style}" value="${answers[i].value}"  id="${id}" name="radio-${question_index}" type="radio"></input><label for="${id}"  class='gender'>${label}</label></div>`;
  }
  ill_advised_raw_html += '</div></div>'
  return ill_advised_raw_html;

}
