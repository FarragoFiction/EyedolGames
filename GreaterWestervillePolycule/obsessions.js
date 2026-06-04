
//dont want it to work how themes do

const GLITCH = 'GLITCH'; //jr
/*
lee hunter each have their own birthday

but now that they are mentally fused they celebrate their birthday on 
a day exactly between their original ones

which makes the greater westerville polycule..... a cancer

this is extremely funny to me because

the greater westerville polycule IS a cancer

growing and growing and growing and consuming all resources

eventually the only way to date is to join it

Flower Chick- 3/10, Pisces
NAM (& Ronin)- 4/29, Taurus
Closer- 1/ 5, Capricorn
Tyrfing- N/A, doesn’t celebrate
Neighbor- N/A, celebrates on 1/1, Capricorn
Eye Killer- N/A, doesn’t remember or care
Innocent- 6/27, Cancer

The End- 12/30, Capricorn
The Solemn- 7/10, Cancer
The Twin Brother- Original birthday is 4/3, Aries. Celebrates birthday with everyone else on, 5/31 Gemini
The Twin Sister- Original birthday is 8/23, Virgo, celebrates birthday with everyone else on 5/31, Gemini
Only the twins celebrate each other’s original birthday. Other people can wish a happy birthday as well, although it’s seen in bad taste. Witherby gets a pass to both once he starts dating Neville (and understands why it works like that)
The Match-10/4, Libra
The Shot- 12/12, Sagittarius
The Reflection- 2/14, Aquarius
K- 7/22, Leo 
Underscore- 11/1, Scorpio

river - 3/10 (pisces) (her birthday isn't special at all, lots of people share it, like flower chick)
hoon - 1/11 (capricorn)
leehunter - lee virgo August 25th, hunter gemini June 20th, shared birthday in between or they fight July 13  (cancer)
*/
const MUSICFANDOM = 'MUSIC'; //leehunter


//if they have a glitch obsession it fucks up their whole page :) :) :)
const containsGlitchObession = (obsessions) => {
  for (let o of obsessions) {
    if (o.name === "[INSERT FANDOM HERE]") {
      return true;
    }
  }
  return false;
}



class Obsession {
  name = "";
  blorbos = []
  minorBlorbos = []
  importantEvents = []
  commonPhrases = []
  opinions = []
  fanGoals = []
  locations = []
  objects = []
  jobs = []

  constructor(name, blorbos, minorBlorbos, importantEvents, opinions, commonPhrases, fanGoals, locations, objects, jobs) {
    this.name = name;
    this.blorbos = blorbos;
    this.minorBlorbos = minorBlorbos;

    this.importantEvents = importantEvents
    this.commonPhrases = commonPhrases;
    this.opinions = opinions;
    this.fanGoals = fanGoals;
    this.locations = locations;
    this.objects = objects;
    this.jobs = jobs;

  }

  randomLocation = (rand) => {
    const arr = this.locations;
    if (arr.length === 1 && arr[0] === "") {
      return rand.pickFrom(["that one place", "the labyrinth", "the spiral"]);
    }
    return rand.pickFrom(arr);
  }

  randomObject = (rand) => {
    const arr = this.objects;
    if (arr.length === 1 && arr[0] === "") {
      return rand.pickFrom(["thingamajig", "spiral", "mask", "book", "tome", "mirror", "sextant", "coin", "blade", "milk bottle", "cloak"]);
    }
    return rand.pickFrom(arr);
  }

  randomJob = (rand) => {
    const arr = this.jobs;
    if (arr.length === 1 && arr[0] === "") {
      return rand.pickFrom(["shambling horror with your face", "minotaur", "horror"]);
    }
    return rand.pickFrom(arr);
  }

  randomBlorbo = (rand) => {
    const arr = this.blorbos;
    if (arr.length === 1 && arr[0] === "") {
      return rand.pickFrom(["that one guy", "shambling horror with your face", "whats-their-face"]);
    }
    return rand.pickFrom(arr);
  }

  randomMinorBlorbo = (rand) => {
    const arr = this.minorBlorbos;
    if (arr.length === 1 && arr[0] === "") {
      return rand.pickFrom(["that one guy", "shambling horror with your face", "whats-their-face"]);
    }
    return rand.pickFrom(arr);
  }

  randomEvent = (rand) => {
    const arr = this.importantEvents;
    if (arr.length === 1 && arr[0] === "") {
      return rand.pickFrom(["when you inevitably succumbed to the endless maze", "when you finally took a break from digging and drank some water", "when you realized the end was never the end"]);
    }
    return rand.pickFrom(arr);
  }

  randomCommonPhrases = (rand) => {
    const arr = this.commonPhrases;
    if (arr.length === 1 && arr[0] === "") {
      return rand.pickFrom(["the end is never the end", "zampanio is a really fun game", "the truth is layered", "your insides are worth as much as your outsides", "the only thing keeping you here is your obsessive need to know more"]);
    }
    return rand.pickFrom(arr);
  }

  randomOpinion = (rand) => {
    const arr = this.opinions;
    if (arr.length === 1 && arr[0] === "") {
      return rand.pickFrom(["I should draw others to the maze", "I should make a fan work of Zampanio", "an endless labyrinth of websites that are not what they are is a really great idea", "the end is never the end", "zampanio is a really fun game", "the truth is layered", "your insides are worth as much as your outsides", "the only thing keeping you here is your obsessive need to know more"]);
    }
    return rand.pickFrom(arr);
  }

  randomGoal = (rand) => {
    const arr = this.fanGoals;
    if (arr.length === 1 && arr[0] === "") {
      return rand.pickFrom(["never forget what I find at https://discord.gg/tZmtKwnbac", "tell all my friends about zampanio", "spread the maze as far possible", "dig and dig and dig and dig", "tell others that zampanio is a really fun game"]);
    }
    return rand.pickFrom(arr);
  }

}


const all_obsessions = {};
//(name, blorbos, importantEvents, controversialMemes, commonPhrases, opinions) {


//  constructor(name, blorbos, importantEvents, opinions, commonPhrases, fanGoals) {

//obessions to do: human centipede (https://www.youtube.com/watch?v=GFokXnCCMf8)
/*
farragnarok
echidna universe
zampanio (mary king)
togigageta 
subtle wars
shadowed lands 
inscryption

*/


//https://www.youtube.com/watch?v=LgmxMuW6Fsc only possible explanation for a printer obsession
//don't call these all at once, instead as you scroll
const createObessionFromTheme = (theme, rand) => {

  let events = [];

  let backstory = theme.getPossibilitiesFor(GENERALBACKSTORY);
  let childbackstory = theme.getPossibilitiesFor(CHILDBACKSTORY);

  for (let b of backstory) {
    events.push(`when The ${theme.pickPossibilityFor(ADJ, rand)} ${theme.pickPossibilityFor(PERSON, rand)} ${b}`);
  }

  for (let b of childbackstory) {
    events.push(`when The ${theme.pickPossibilityFor(ADJ, rand)} ${theme.pickPossibilityFor(PERSON, rand)} ${b}`);
  }


  let loc_desc = theme.getPossibilitiesFor(LOC_DESC);

  let goals = [];
  for (let b of loc_desc) {
    goals.push(`find the place where there is ${b}`);
  }

  all_obsessions[theme.key] = new Obsession(
    `${titleCase(theme.key)}`,
    [...theme.getPossibilitiesFor(PERSON).map((i) => `The ${theme.pickPossibilityFor(ADJ, rand)} ${titleCase(i)}`)],
    [...theme.getPossibilitiesFor(PERSON).map((i) => `The ${rand.pickFrom(["Glitchy", "Little", "Small", "Minor", "Mysterious", "Background", `${theme.pickPossibilityFor(INSULT, rand)}`])} ${titleCase(i)}`)],
    [...events],
    [...theme.getPossibilitiesFor(PHILOSOPHY)],
    [...theme.getPossibilitiesFor(PHILOSOPHY)],
    [...goals],
    [...theme.getPossibilitiesFor(LOCATION)],
    [...theme.getPossibilitiesFor(LOCATION)],
    [...theme.getPossibilitiesFor(PERSON).map((i) => `The ${theme.pickPossibilityFor(COMPLIMENT, rand)} ${titleCase(i)}`)],

  );
}


all_obsessions[GLITCH] = new Obsession(
  "[INSERT FANDOM HERE]",
  ["CHARACTER1", "CHARACTER2", "CHARACTER3"],
  ["MINORCHARACTER1", "MINORCHARACTER2", "MINORCHARACTER3"],
  ["EVENT1", "EVENT2", "EVENT3"],
  ["HEADCANON1", "HEADCANON2", "HEADCANON3"],
  ["your insides are worth as much as your outsides", "MEME2", "MEME3"],
  ["GOAL1", "GOAL2", "GOAL2"],
  ["LOCATION1", "LOCATION2", "LOCATION3"],
  ["OBJECT1", "OBJECT2", "OBJECT3"],
  ["JOB1", "JOB2", "JOB3"]

);



const musicCharRaw = `Lee, Hunter`;
const musicChar2Raw = `Greater Westerville Polycule Member #1,Greater Westerville Polycule Member #2,Greater Westerville Polycule Member #3,Greater Westerville Polycule Member #4`;
const musicImportantEventsRaw = `when the Conductor began to play, when the entire band began to assemble, when leehunter fought, when the trumpet began to signal the end of all things, when the piano began to signal the begining of all things, when a new instrument was introduced`;
const musicOpinionsRaw = `lee is the best band member, hunter is the best band member, leehunter are not toxic yuri, leehunter are toxic yuri, ria is the best conductor, ria is the best conductor, ria is the best conductor`;
const musicMemesRaw = `the end is never the end, the show must go on, and the band begins to play, the trumpet sounds, the piano rings`;
const musicGoalsRaw = `learn how to play an instrument, sit through an entire hunter song without decaying, sit through an entire lee song without becoming a fetus, get ria to notice me`;
const musicLocationsRaw = `concert hall, rehearsal all, parking lot, music shop `;
const musicObjectsRaw = `trumpet, piano, zampiano, violin, conductors baton, band uniform, guitar, drum, flute`;
const musicJobsRaw = `conductor, musician, band member`;


all_obsessions[MUSICFANDOM] = new Obsession(
  "Music Fandom",
  musicCharRaw.split(","),
  musicChar2Raw.split(","),
  musicImportantEventsRaw.split(","),
  musicOpinionsRaw.split(","),
  musicMemesRaw.split(","),
  musicGoalsRaw.split(","),
  musicLocationsRaw.split(","),
  musicObjectsRaw.split(","),
  musicJobsRaw.split(",")
)

/*

const CharRaw = ``;
const togiChar2Raw = ``;
const togiImportantEventsRaw = ``;
const togiOpinionsRaw = ``;
const togiMemesRaw = ``;
const togiGoalsRaw = ``;
const togiLocationsRaw = ``;
const togiObjectsRaw = ``;
const togiJobsRaw = ``;


all_obsessions[TOGITHINGY] = new Obsession(
  "tbd",
  CharRaw.split("\n"),
  Char2Raw.split("\n"),
  ImportantEventsRaw.split("\n"),
  OpinionsRaw.split("\n"),
  MemesRaw.split("\n"),
  GoalsRaw.split("\n"),
  LocationsRaw.split("\n"),
  ObjectsRaw.split("\n"),
  JobsRaw.split("\n")  
);*/