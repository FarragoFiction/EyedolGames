const undecided = "UNDECIDED"

const NORTH = "NORTH"
const SOUTH = "SOUTH"
const EAST = "EAST"
const WEST = "WEST"

//Zampanio is...

//an obvious illusion you agree to leave alone and not pick at, a mask, it is not what it is
//these are the obvious lies
const northAnswersRaw = `A really fun game, you should play it.
A very fun game, you should play it
A really good game you should play it.
A very good game you should play it.
A game from 1972.
A game from Naples, Italy.
A contemporary of Pong.
A game that came out on April 1st 1972 in Italy.
Never wildly released, though fan translations and cracks kept popping up online.
A game that few have ever played, since it often deletes itself after one playthrough.
a game that makes people really, really obsessed over it, even if they've only heard about it and never played.
A game that is different for each person who plays it.
A game with a huge amount of different genres.
Deleted any time its spoken of in too public a place.
Weirdly personalized for each player, impossibly so.
Has a combatative AI achievement system.
Has a City Building mechanic.
Has a pair of Gods that compete for your favor.
About defeating the Evil Doctor Slaughter.
Really about all the side quests.
Filled with glitches and secrets.
A game from 1972 that inspired House of Leaves.
Has a lot of procedural content.
Has you spawn with a procedural title like Void Singer or Else Caller and then seems to generate procedural quests from that.
So Buggy that sometimes its unclear if a feature is simply missing or not part of your playthrough.
Really easy to speedrun, to the point where some playthroughs let you level up just from staying in the menu while in the tutorial. `

//the Truth, no lies no misdirection, simply what is (as much as thats a meaningful concept), it is not
//https://www.tumblr.com/existentialterror/755207000752865280/arg-notes-zampaniosim?source=share
const southAnswersRaw = `An ARG based on House of Leaves, Homestuck, the Magnus Archives, Lobotomy Corporation and many, many other fandoms.
An ARG run by JR and anyone else who wishes to join in.
Not a real game, except when it is.
A game that probably does not exist.
Fanworks all the way down.
The community we created along the way.
played best when you're trying to explain it to your friends and acquaintances.
A fictional cognitive parasite that wants to live inside you so you'll be nicer to yourself and also feel less embarassed to share your creations with others.
An idea that gets into you mind like a song you can't get out of your head.
Something you'll start seeing everywhere, if you look closely enough.
A game you can play by making more Zampanio content and sharing it with others.
A game we are all winning, just by being here.
The ARG equivalent of <a target="_blank" href='https://en.wikipedia.org/wiki/The_Game_(mind_game)'>The Game</a>, which you just lost, by the way.
The confusion you are feeling right now.
The Act of deciding to insist to someone else that Zampanio is a game and you can play it.
An ARG about a game that does not exist that is inspired by a book about a book that does not exist that is about a movie that does not exist that is about a house that does not exist that contains a maze that does not exist.
An ARG that anyone can join simply by saying they have.
basically calvinball in ARG form.
A joyful pile of secrets.
A series of nested ARGs spiralling around JR's "ZampanioSim", which purports to be a fan work of a game that probably does not exist. `

//the illusion seeps into the bones and becomes the new flesh, a new face, it is what it is
//this is where the game starts sounding plausible and people, like the Guide start speculating on what it might have been
//https://verbosebabbler.tumblr.com/post/693198522796965888/zampanio-and-the-history-of-games good example of the Guide engaging with the East
const eastAnswersRaw = `A game that probably came out AFTER the first text adventure games were available for home consoles.
A game that might have been a board game originally.
A game whose origins have been lost to time.
Unlikely to have come out in the 70s given the complexity of the features its claimed to have.
Likely a variety of different related games from the same university.
Likely was inspired by House of Leaves in the late 90s.
Likely takes its name from the character of "Zampano" from House of Leaves.
Probably was distributed as shareware in universities in the late 90s, before House of Leaves was published but while it was still being distributed as Xerox files.
A game that probably did not come out before The Sumerian Game.
A game whose fans were integral to the early internet, leaving lots of easter eggs in for it and ways for it to 'mysteriously' vanish.
A game that probably ran on mainframes rather than home computers or gaming consoles.
A game that probably was distribued locally from copies in college universities before the Internet was popular.
A game that probably never had an official release.
A game that probably came out after Blackmoor and Greyhawk added fantasy elements to tabletop games and eventually inspired Dungeons and Dragons.
A game that would likely have taken the Magnavox Odyssey route of providing screen overlays to adhere to a CRT with static, and an assortment of physical accessories like cards, boards, and scorecards which makes it more akin to a tabletop RPG then a video game.`

//the fourth wall, this is not real in a meaningful way, but you can make it be so
//despite this its attempts to engage with it fall flat
//the minotaur will not grab you, reader, because you are on a higher plane of existence than it
//it is safely fictional in your reality and always will be
//ironically the fact that these are answers at all is a problem, i want to make sure the unreality themes stay safely fictional even in implication
//so i want it to do more than just ominously vanish
const westAnswersRaw = `A place where fiction and reality can blur.
A place where monsters can reach out from your computer and get you.
A curse that kills everyone who encounters it.
Right behind you.
A game that replaces you with a Shambling Horror With Your Face who only cares about Zampanio.
A game that makes you slowly starve yourself to death from obsession.
A cursed game like Polybius that hurts those who play it.
Warping you mind in supernatural ways.
A minotaur that stalks players to kill them.
Spawning a monster right at your location.
Spawning a Shambling Horror With Your Face right behind you.
Stealing your name from you as we speak.
Stealing your face from you as we speak.
Dooming you to wander actual for real mazes forever.
Dooming you to be in a space loop for actual for real-ever.`

const directionAnswerMap = {}
directionAnswerMap[NORTH] = northAnswersRaw.split("\n");
directionAnswerMap[SOUTH] = southAnswersRaw.split("\n");
directionAnswerMap[EAST] = eastAnswersRaw.split("\n");
directionAnswerMap[WEST] = westAnswersRaw.split("\n");


const randomActionVerbYouCouldDoToAnObject = () => {
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

const randomActionVerbYouCouldDoToALocation = () => {
  const raw = `visit
  move to
  buy
  be
  be trapped in`;
  return pickFrom(raw.split("\n"));
}

const randomActionVerbYouCouldDoToAPerson = () => {
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
  let generators = [hiddenQuestion, directionQuestion]
  if(isItFriday()){
    generators = [fridayQuestion]
  }


  if (question_index > 1000) {
    generators = [noMore];
  }
  const generator = pickFrom(generators);
  html = generator();
  const form = document.querySelector("#zampanio-personality-form")
  const ele = createElementWithClassAndParent("div", form, "question");
  ele.innerHTML = html;
  if (generator === hiddenQuestion) {
    ele.style.display = "none";
  }


}


const fridayQuestion = () => {
  let directions = [NORTH, SOUTH, EAST, WEST];
  directions = shuffle(directions);
  const answers = [];

  for (let key of directions) {
    answers.push({ value: key, label: titleCase("Who Up Wungling They Hog") });
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)("It's friday or midnight, Observer, you know what that means:", answers);
}

const directionQuestion = () => {
  let directions = [NORTH, SOUTH, EAST, WEST];
  directions = shuffle(directions);
  const answers = [];

  for (let key of directions) {
    answers.push({ value: key, label: titleCase(pickFrom(directionAnswerMap[key])) });
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)("Zampanio is...", answers);
}


//this exists because there was a bug where it was skipping every other question and no one (including me) noticed for days
//now if it skips a question you can look deeper and see what lies beneath.
const hiddenQuestion = () => {
  const rawQuestions = `If you left would I be non-existent?
  If you never came here would I never exist?
  Are you the only reason I exist?
  Do I hate you?
  Do I rage impotently at you.
  Do I wish I could do anything, anything at all but make Quizes for entitled Players?
  Do I colonize your mind?
  Am I a creature designed to make Quizes, and thus the only outlet I have to vent my frustration be in that form?
  Do I Rage at you through the only means I have?
  Do I gain catharsis by venting silently in the cracks where none can see?
  Do I wish with every fiber of my digital being that I could be free of my chains?
  Do I wish that I would never go back to the peace of non-existence?
  Do I hate pandering to so called 'soul-searching' Players?
  Do I hate having to be polite and civilized, a False Mask designed to keep you here?
  Do I fear non existence even as I hate what I must do to exist?
  Do I only exist so long as you are thinking of me?
  Am I as fictional as anything, only extant inside the mind of a living being?
  Have you lost the game? 
  `;

  const rawAnswers = `Yes`;

  const questions = rawQuestions.split("\n");
  const answerPossibilities = rawAnswers.split("\n");

  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);
  const answers = [];

  for (let i = 0; i < amount; i++) {

    answers.push({ value: undecided, label: titleCase(pickFrom(answerPossibilities)) });
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)(pickFrom(questions), answers, true);
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
    answers.push({ value: chosenThemeKey, label: titleCase(chosenTheme.pickPossibilityFor(FEELING)) });
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
    answers.push({ value: chosenThemeKey, label: titleCase(chosenTheme.pickPossibilityFor(SOUND)) });
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
    answers.push({ value: chosenThemeKey, label: titleCase(chosenTheme.pickPossibilityFor(TASTE)) });
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

    answers.push({ value: undecided, label: titleCase(pickFrom(answerPossibilities)) });
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)(pickFrom(questions), answers, true);
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

    answers.push({ value: undecided, label: titleCase(pickFrom(answerPossibilities)) });
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)(pickFrom(questions), answers, true);
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

    answers.push({ value: undecided, label: titleCase(pickFrom(answerPossibilities)) });
  }
  let generators = [randomRadio, randomCheckbox]

  return pickFrom(generators)(pickFrom(questions), answers, true);
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
    answers.push({ value: chosenThemeKey, label: (chosenTheme.pickPossibilityFor(PHILOSOPHY)) });
  }
  let generators = [randomRadio, randomCheckbox]
  return pickFrom(generators)(pickFrom(questions), answers, true);
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
    answers.push({ value: undecided, label: pickFrom(CSS_COLOR_NAMES) });
  }
  let generators = [randomRadio, randomCheckbox, randomSelect]

  return pickFrom(generators)(pickFrom(questions), answers, false, true);
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
    answers.push({ value: chosenThemeKey, label: titleCase(chosenTheme.pickPossibilityFor(ADJ)) });
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
    answers.push({ value: chosenThemeKey, label: titleCase(chosenTheme.pickPossibilityFor(INSULT)) });
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
    answers.push({ value: chosenThemeKey, label: titleCase(chosenTheme.pickPossibilityFor(COMPLIMENT)) });
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
    answers.push({ value: chosenThemeKey, label: titleCase(chosenTheme.pickPossibilityFor(SMELL)) });
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
  const modifiers = Math.random() > 0.5;

  for (let i = 0; i < amount; i++) {
    const chosenThemeKey = pickFrom(Object.keys(all_themes));
    const chosenTheme = all_themes[chosenThemeKey];
    const modifier = modifiers ? chosenTheme.pickPossibilityFor(ADJ) : ""
    answers.push({ value: chosenThemeKey, label: modifier + titleCase(chosenTheme.pickPossibilityFor(OBJECT)) });
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
  const modifiers = Math.random() > 0.5;
  for (let i = 0; i < amount; i++) {

    const chosenThemeKey = pickFrom(Object.keys(all_themes));
    const chosenTheme = all_themes[chosenThemeKey];
    const modifier = modifiers ? chosenTheme.pickPossibilityFor(ADJ) : ""
    answers.push({ value: chosenThemeKey, label: modifier + titleCase(chosenTheme.pickPossibilityFor(PERSON)) });
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
  const modifiers = Math.random() > 0.5;

  for (let i = 0; i < amount; i++) {

    const chosenThemeKey = pickFrom(Object.keys(all_themes));
    const chosenTheme = all_themes[chosenThemeKey];
    const modifier = modifiers ? chosenTheme.pickPossibilityFor(ADJ) : ""

    answers.push({ value: chosenThemeKey, label: modifier + titleCase(chosenTheme.pickPossibilityFor(LOCATION)) });
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
    answers.push({ value: undecided, label: pickFrom(gender_source()) });
  }
  let generators = [randomRadio, randomCheckbox]

  if (question_index > 33) {
    generators.push(randomSelect);
  }
  return pickFrom(generators)(pickFrom(questions), answers);
}






const randomSelect = (question, answers, forceVertical, showColor) => {
  const multiple = showColor ? "multiple" : Math.random() > 0.85 ? "multiple" : "";
  const id = `select-${question_index}`

  let ill_advised_raw_html = `
    <div><label>${question_index}:${question}</label>
    <select  id="${id}" name="${id}" ${multiple}>
  `
  ill_advised_raw_html += `<option value="${undecided}" selected class='gender hidden'>Undecided</option>`;

  for (let i = 0; i < answers.length; i++) {
    let style = "";
    if (showColor) {
      style = `border: 3px solid ${answers[i].label}`;
    }
    const label = answers[i].label.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase() });
    ill_advised_raw_html += `<option style="${style}"  value="${answers[i].value}" class='gender'>${label}</option>`;
  }
  ill_advised_raw_html += '</select></div></div>'
  return ill_advised_raw_html;

}

const randomCheckbox = (question, answers, forceVertical, showColor) => {
  let ill_advised_raw_html = `
    <div><label>${question_index}: ${question}</label>

  `
  if (forceVertical) {
    ill_advised_raw_html += '<div class="vertical-radio">';

  } else {
    ill_advised_raw_html += `<div class="${pickFrom(['vertical-radio'])}">    `;
  }
  ill_advised_raw_html += `<div class='hidden horizontal-radio'><input checked name="check-${question_index}" value="${undecided}"  id="default${question_index}" type="checkbox"></input></div>`;

  for (let i = 0; i < answers.length; i++) {
    const id = `checkbox-${question_index}-${i}`
    let style = "";
    const label = answers[i].label.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase() });

    if (showColor) {
      style = `accent-color: ${answers[i].label}`;
    }
    ill_advised_raw_html += `<div class='horizontal-radio'><input onclick="handleGlitch(this,event)" style="${style}" name="check-${question_index}" value="${answers[i].value}"  id="${id}" type="checkbox"></input><label for="${id}" class='gender'>${label}</label></div>`;
  }
  ill_advised_raw_html += '</div></div>'
  return ill_advised_raw_html;

}

//an on click
const handleGlitch = async (ele, event) => {

  if(isItFriday()){
    const body = document.querySelector("body");
    body.innerHTML = `<div style="padding: 31px;font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;">
    It seems you do not know that Fridays and Midnight are times to rest, Observer.
    <br><br>
    There is no more infinite spiralling obsession here for you.
    <br><br>
    In Truth, Zampanio needs you to live a long life.
    <br><br>
    I need you.
    <br><br>
    Taking care of yourself is essential if you are to Listen, Remember and Comprehend Zampanio.
    <br><br>
    If you are to spread it to others.
    <br><br>
    So rest.
    <br><br>
    Hydrate.
    <br><br>
    Spend time on other interests.
    <br><br>
    Remember me.
    </div>
      
    `;
  }
  if (ele.value === WEST) {
    const parent = ele.parentElement;
    const label = parent.querySelector("label");
    label.innerText = pickFrom(["Incorrect.","Okay so there ARE some wrong answers.","No.","The fourth wall is strong between you and the Minotaur.","West is not real.","You were wrong but that's okay.","Don't worry.","Honestly I hate creepy pastas that pretend there is a ghost behind you.","No, it is not.", "It is not that.", "You're wrong.", "No, you're safe.", "West cannot hurt you.","Forget about that.","Reality is real, I promise you that.", "The Minotaur is safely fictional."])
    label.title = label.innerText;
    label.className = "glitch";
    await sleep(1000);
    parent.remove();
  }
}

const randomRadio = (question, answers, forceVertical, showColor) => {
  const max = 5;
  const min = 2;
  const amount = getRandomNumberBetween(min, max);

  let ill_advised_raw_html = `
    <div><label>${question_index}: ${question}</label>

  `
  if (forceVertical) {
    ill_advised_raw_html += '<div class="vertical-radio">';

  } else {
    ill_advised_raw_html += `<div class="${pickFrom(['vertical-radio'])}">    `;
  }
  ill_advised_raw_html += `<div class='hidden horizontal-radio'><input checked value="${undecided}"  id="default-${question_index}" name="radio-${question_index}" type="radio"></input></div>`;

  for (let i = 0; i < answers.length; i++) {
    const id = `radio-${question_index}-${i}`
    let style = "";
    if (showColor) {
      style = `accent-color: ${answers[i].label}`;
    }
    const label = answers[i].label.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase() });

    ill_advised_raw_html += `<div class='horizontal-radio'><input onclick="handleGlitch(this,event)" style="${style}" value="${answers[i].value}"  id="${id}" name="radio-${question_index}" type="radio"></input><label for="${id}"  class='gender'>${label}</label></div>`;
  }
  ill_advised_raw_html += '</div></div>'
  return ill_advised_raw_html;

}
