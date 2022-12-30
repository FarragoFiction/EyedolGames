const undecided = "UNDECIDED"



const randomQuestion = () => {
  let html;
  question_index++;
  let generators = [colorQuestion, locationQuestion, genderQuestion]
  if (question_index > 3333) {
    generators.push(zampanioQuestion);
  }
  html = pickFrom(generators)();
  const form = document.querySelector("#zampanio-personality-form")
  const ele = createElementWithClassAndParent("div", form, "question");
  ele.innerHTML = html;


}

const zampanioQuestion = () => {

}

const goncharovQuoteQuestion = () => {

}

const philosophyQuestion = () => {

}

const colorQuestion = () => {
  const rawQuestions = `Pick a color:
  What color is your soul?
  What's your favorite color?
  If you had to wear just one color for the rest of your life it would be:
  Your soul vibes with:`;

  const questions = rawQuestions.split("\n");
  const answers = [];
  const max = 10;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  
  for (let i = 0; i < amount; i++) {
    answers.push({value:undecided, label:  pickFrom(CSS_COLOR_NAMES).replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase() })});
  }
  question_index++;
  let generators = [randomRadio, randomCheckbox]
  if (question_index > 33) {
    generators.push(randomSelect);
  }
  return pickFrom(generators)(pickFrom(questions), answers);
}

const locationQuestion = () => {
  const rawQuestions = `Where would you rather be?
  Where do you imagine ending up?
  If you could live anywhere, would it be:
  Where was your last dream set?
  Your soul vibes with:`;

  const questions = rawQuestions.split("\n");
  const answers = [];
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  for (let i = 0; i < amount; i++) {
    
    const chosenThemeKey = pickFrom(Object.keys(all_themes));
    const chosenTheme = all_themes[chosenThemeKey];
    answers.push({value:chosenThemeKey, label:  titleCase(chosenTheme.pickPossibilityFor(LOCATION))});
  }
  question_index++;
  let generators = [randomRadio, randomCheckbox]
  if (question_index > 33) {
    generators.push(randomSelect);
  }
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
  question_index++;
  let generators = [randomRadio, randomCheckbox]

  if (question_index > 33) {
    generators.push(randomSelect);
  }
  return pickFrom(generators)(pickFrom(questions), answers);
}






const randomSelect = (question, answers) => {
  const multiple = Math.random() > 0.85 ? "multiple" : "";
  const id = `select-${question_index}`

  let ill_advised_raw_html = `
    <div><label>${question_index}:${question}</label>
    <select  id="${id}" name="${id}" ${multiple}>
  `
  ill_advised_raw_html += `<option value="${undecided}" selected class='gender'>Undecided</option>`;

  for (let i = 0; i < answers.length; i++) {
    ill_advised_raw_html += `<option value="${answers[i].value}" class='gender'>${answers[i].label}</option>`;
  }
  ill_advised_raw_html += '</select></div></div>'
  return ill_advised_raw_html;

}

const randomCheckbox = (question, answers) => {
  let ill_advised_raw_html = `
    <div><label>${question_index}: ${question}</label>
    <div class="${pickFrom(['horizontal-radio', 'vertical-radio'])}">

  `
  ill_advised_raw_html += `<div class='hidden horizontal-radio'><input checked name="check-${question_index}" value="${undecided}"  id="default${question_index}" type="checkbox"></input></div>`;

  for (let i = 0; i < answers.length; i++) {
    const id = `checkbox-${question_index}-${i}`
    ill_advised_raw_html += `<div class='horizontal-radio'><input name="check-${question_index}" value="${answers[i].value}"  id="${id}" type="checkbox"></input><label for="${id}" class='gender'>${answers[i].label}</label></div>`;
  }
  ill_advised_raw_html += '</div></div>'
  return ill_advised_raw_html;

}

const randomRadio = (question, answers) => {
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);

  let ill_advised_raw_html = `
    <div><label>${question_index}: ${question}</label>
    <div class="${pickFrom(['horizontal-radio', 'vertical-radio'])}">

  `
  ill_advised_raw_html += `<div class='hidden horizontal-radio'><input checked value="${undecided}"  id="default-${question_index}" name="radio-${question_index}" type="radio"></input></div>`;

  for (let i = 0; i < answers.length; i++) {
    const id = `radio-${question_index}-${i}`
    ill_advised_raw_html += `<div class='horizontal-radio'><input value="${answers[i].value}"  id="${id}" name="radio-${question_index}" type="radio"></input><label for="${id}"  class='gender'>${answers[i].label}</label></div>`;
  }
  ill_advised_raw_html += '</div></div>'
  return ill_advised_raw_html;

}
