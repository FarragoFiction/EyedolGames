const ALLCAPS = "ALLCAPS";
const NORMALCAPS = "NORMALCAPS";
const NOCAPS = "NOCAPS";
const NOPUNC = "NOPUNC";
const PERFECTPUNC = "PERFECTPUNC";
const ENDPUNC = "ENDPUNC";
const EXPUNC = "EXPUNC";

class Quirk {
  replacementList
  punctation = NORMALCAPS;
}


//this might get hard on Eyedlr where you can talk to more than on person at atime.
//thats future jr's problem
//have fun future jr
class QuirkMap {
  key
  possibleValues
  chosenValue //chosen later
  constructor(key, possibleValues) {
    this.key = key;
    this.possibleValues = possibleValues
    this.possibleValues.push(key);//you can always just. not replace things.
  }

  chooseValue(rand) {
    //the key is also a possible value
    this.chosenValue = rand.pickFrom(this.possibleValues);
  }

  //only replace WHOLE words
  //https://onecompiler.com/javascript/3x8rumubz
  replace(phrase) {
    const regex = new RegExp(key, 'g'); // correct way
    return phrase.replace(regex, this.chosenValue);
  }
}

//these keys you need to pepper your writing with, just like sburbsim. IC was right this does need to exist again
//NOTE these are WHOLE WORDS
const all_quirk_mappings = [
  new QuirkMap("\\bfuck\\b", ["...great","piss","motherfuck","um","crap","cocks","nope","fiddlesticks","darn", "really","damn","...","dang","oh my god"]),

  new QuirkMap("fuck", ["beep","piss","motherfuck","um","shit","cocks","nope","hella","goddammit", "really","damn","..."]),
  new QuirkMap("\\bwell\\b", ["welp", "good"]),
  new QuirkMap("\\bguess\\b", ["suppose", "estimate"]),
  new QuirkMap("oh my god", ["omg", "omfg"]),
  new QuirkMap("\\blike\\b", ["like", "liek"]),
  new QuirkMap("ing", ["in", "ing"]),
  new QuirkMap("have to", ["hafta", "have to"]),
  new QuirkMap("want to", ["wanta", "want to"]),
  new QuirkMap("need to", ["needta", "need to"]),
  new QuirkMap("going to", ["gonna", "going to"]),
  new QuirkMap("i'm", ["i am"]),
  new QuirkMap("I'm", ["I am"]),

  new QuirkMap("you're", ["you are"]),
  new QuirkMap("we're", ["we are"]),
  new QuirkMap("forever", ["5ever","4evar","4ever","forever"]),
  new QuirkMap("don't know", ["dunno"]),
  new QuirkMap("the", ["teh"]),
  new QuirkMap("aren't", ["ain't","aren't"]),
  new QuirkMap("ie", ["ei"]),
  new QuirkMap("though", ["tho","though"]),
  new QuirkMap("you", ["u","you"]),
  new QuirkMap("right", ["right","right","right","rite"]),
  new QuirkMap("n't", ["n't","n't","n't","not","nt"]),
  new QuirkMap("'m'", ["am","am","'m","m"]),
  new QuirkMap("kind of", ["kinda","kind of"]),
  new QuirkMap("okay", ["ok","okay","OK","O.K.","okey dokey"]),//what kind of beast spells it O.K.
  new QuirkMap("\\band\\b", ["and","and","&"]),
  new QuirkMap("\\bat\\b", ["at","at","at","@"]),
  new QuirkMap("\\bgood\\b", ["sexy","acceptable","very good","amazing","agreeable","marvelous","ace","wonderful","sweet","dope","awesome","great","radical","perfect"]),
  new QuirkMap("\\fucker\\b", ["asshat","dickhead","fucker","radical","bgood","fucknut","pukestain","dirtbag","fuckhead","asshole","dipshit","garbage person","poopyhead","shit sniffer","jerk","douchecanoe","douche","plebian","fuckstain","douchebag","fuckface","fuckass"]),

  new QuirkMap("\\blol\\b", [":)","*giggle*","bwahah","roflcopter","lawl","snrk","hee","...","funny","rofl","lol","haha","ehehe","heh","omg lol"]),

  new QuirkMap("\\hey\\b", ["sup","yo","greetings","hey there","hi","hello"]),
  new QuirkMap("\\sexy\\b", ["sexy","sexy","hot stuff","champ","partner","gorgeous","beautiful"]),
  new QuirkMap("\\dude\\b", ["guy","yo","bro","man","friend","asshole","fella"]),
  new QuirkMap("\\dude\\b", ["guy","yo","bro","man","friend","asshole","fella","partner"]),
  new QuirkMap("\\byes\\b", ["hell yes","okay","sure","certainly","indeed","yes","yeppers","right","yeah","nah"]),
  new QuirkMap("\\no\\b", ["nope","absolutely not","he;l no","absolutely no","no way","hello"]),
  new QuirkMap("friend", ["bro","buddy","pal","friend","compadre","comrade","homey","best friend"]),
  new QuirkMap(":\\)", [":)",":)",":)",":)",":)",":)","=)","=}","=]",":>","8D","XD",":3",":-)","¯\_(ツ)_/¯","uwu","0u0","~_^",";)",":)",":0)",":]",":B","^_^",":o)",">: ]"]),


]



