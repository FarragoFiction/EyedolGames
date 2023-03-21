const ALLCAPS = "ALLCAPS";
const NORMALCAPS = "NORMALCAPS";
const NOCAPS = "NOCAPS";
const DEVONACAPS = "DEVONACAPS";

const all_cap_types = [ALLCAPS, NORMALCAPS,NORMALCAPS,NORMALCAPS,NORMALCAPS, NOCAPS, NOCAPS,NOCAPS,NOCAPS,DEVONACAPS]

const NOPUNC = "NOPUNC";
const PERFECTPUNC = "PERFECTPUNC";
const ENDPUNC = "ENDPUNC";
const EXPUNC = "EXPUNC";

const all_punc_types = [NOPUNC,PERFECTPUNC,PERFECTPUNC,PERFECTPUNC, PERFECTPUNC,ENDPUNC, ENDPUNC, EXPUNC];


const testQuirk = (rand) => {
  return new Quirk(rand, NORMALCAPS, PERFECTPUNC, all_quirk_mappings, rand.getRandomNumberBetween(1, 10))
}
const randomQuirk = (rand) => {
  return new Quirk(rand, rand.pickFrom(all_cap_types), rand.pickFrom(all_punc_types), all_quirk_mappings, rand.getRandomNumberBetween(1, 10))
}

class Quirk {
  punctation = PERFECTPUNC;
  caps = NORMALCAPS;
  replacementList = [];
  favoriteNumber = 1;
  rand;

  constructor(rand, caps, punctation, replacementListToClone, favoriteNumber) {
    this.rand = rand;
    this.caps = caps;
    this.punctation = punctation;
    this.favoriteNumber = favoriteNumber;
    this.replacementList = replacementListToClone.map((i) => i.clone());
  }

  apply = (phrase) => {
    let ret = phrase;
    ret = this.handleCapitilization(ret);
    ret = this.handlePunctuation(ret);
    ret = this.handleReplacements(ret, this.rand);
    ret = this.handleCapitilization(ret);

    return ret;

  }

  handleReplacements = (input, rand) => {
    let ret = input;
    for (let r of this.replacementList) {
      ret = r.replace(ret, rand);
    }
    return ret;
  }

  handlePunctuation = (input) => {
    let ret = input;
    if (this.punctation == NOPUNC) {
      let punctuationless = ret.replaceAll(/[.?,\/#!;{}=\-_`~]/g, "");
      ret = punctuationless.replaceAll(/"""\s{2,}""/g, " ");
    } else if (this.punctation == ENDPUNC) {
      let punctuationless = ret.replaceAll(/[,\/#;{}=\-_`~]/g, "");
      ret = punctuationless.replaceAll(/"""\s{2,}""/g, " ");
    } else if (this.punctation == PERFECTPUNC) {
      ret = input;
    } else if (this.punctation == EXPUNC) {
      ret = this.multiplyCharacter(ret, "!", this.favoriteNumber);
      ret = this.multiplyCharacter(ret, "?", this.favoriteNumber);
    }
    return ret;
  }

  multiplyCharacter(str, character, times) {
    //querySelector("#debug").append("<Br>Going to multiply: " + character + " this many times: " + times);
    let tmp = "";
    for (let i = 0; i < times; i++) {
      tmp += character;
    }
    return str.replaceAll(character, tmp);
  }

  handleCapitilization = (input) => {
    let ret = input;
    if (this.caps == NOCAPS) {
      ret = ret.toLowerCase();
    } else if (this.caps == DEVONACAPS) {
      ret = titleCase(ret);
    } else if (this.caps == 1) {
      ret = input; //no change
    } else if (this.caps == ALLCAPS) {
      ret = ret.toUpperCase();
    }
    return ret;
  }


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
    if (this.possibleValues.indexOf(key.replace("\\b","")) === -1) { //don't add it if you already had it, the clone system would make clones increasingly normal if we did that, which is def not what we want
      this.possibleValues.push(key.replaceAll("\\b",""));//you can always just. not replace things.
    }
  }

  clone() {
    //version that hasn't made a choice yet
    return new QuirkMap(this.key, this.possibleValues)
  }

  chooseValue(rand) {
    //the key is also a possible value
    this.chosenValue = rand.pickFrom(this.possibleValues);
  }

  //only replace WHOLE words
  //https://onecompiler.com/javascript/3x8rumubz
  replace(phrase, rand) {
    if (!this.choosenValue) {
      this.chooseValue(rand);
    }
    //console.log("JR NOTE: quirk map key of ", this.key, "value of", this.chosenValue)
    const regex = new RegExp(this.key, 'g'); // correct way
    const ret= phrase.toLowerCase().replaceAll(regex, this.chosenValue);
 
    return ret;
  }
}

//these keys you need to pepper your writing with, just like sburbsim. IC was right this does need to exist again
//NOTE these are WHOLE WORDS
//if you want a porn bot to have this COPY Them and choose a value
const all_quirk_mappings = [
  new QuirkMap("\\bfuck\\b", ["...great", "piss", "motherfuck", "um", "crap", "cocks", "nope", "fiddlesticks", "darn", "really", "damn", "...", "dang", "oh my god"]),

  new QuirkMap("fuck", ["beep", "piss", "motherfuck", "um", "shit", "cocks", "nope", "hella", "goddammit", "really", "damn", "..."]),
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
  new QuirkMap("forever", ["5ever", "4evar", "4ever", "forever"]),
  new QuirkMap("don't know", ["dunno"]),
  new QuirkMap("\\bthe\\b", ["teh","the","the","the","the","the","the","the"]),
  new QuirkMap("aren't", ["ain't", "aren't"]),
  new QuirkMap("ie", ["ei"]),
  new QuirkMap("apologize", ["say sorry"]),

  new QuirkMap("though", ["tho", "though"]),
  new QuirkMap("you", ["u", "you"]),
  new QuirkMap("right", ["right", "right", "right", "rite"]),
  new QuirkMap("n't", ["n't", "n't", "n't", "n not", "nt"]),
  new QuirkMap("'m'", ["am", "am", "'m", "m"]),
  new QuirkMap("'d'", ["would", "d","'d"]),

  new QuirkMap("kind of", ["kinda", "kind of"]),
  new QuirkMap("okay", ["ok", "okay", "OK", "O.K.", "okey dokey"]),//what kind of beast spells it O.K.
  new QuirkMap("\\band\\b", ["and", "and", "&"]),
  new QuirkMap("\\bat\\b", ["at", "at", "at", "@"]),
  new QuirkMap("\\bgood\\b", ["sexy", "acceptable", "very good", "amazing", "agreeable", "marvelous", "ace", "wonderful", "sweet", "dope", "awesome", "great", "radical", "perfect"]),
  new QuirkMap("\\bfucker\\b", ["asshat", "dickhead", "fucker", "radical", "bgood", "fucknut", "pukestain", "dirtbag", "fuckhead", "asshole", "dipshit", "garbage person", "poopyhead", "shit sniffer", "jerk","jerk","jerk","jerk","jerk","jerk","jerk","jerk","jerk", "douchecanoe", "douche", "plebian", "fuckstain", "douchebag", "fuckface", "fuckass"]),

  new QuirkMap("\\blol\\b", [":)", "*giggle*", "bwahah", "roflcopter", "lawl", "snrk", "hee", "...", "funny", "rofl", "lol", "haha", "ehehe", "heh", "omg lol"]),

  new QuirkMap("\\bhey\\b", ["sup", "yo", "greetings", "hey there", "hi", "hello"]),
  new QuirkMap("\\bsexy\\b", ["sexy", "sexy", "hot stuff", "champ", "partner", "gorgeous", "beautiful"]),
  new QuirkMap("\\bdude\\b", ["guy", "yo", "bro", "man", "friend", "asshole", "fella"]),
  new QuirkMap("\\bdude\\b", ["guy", "yo", "bro", "man", "friend", "asshole", "fella", "partner"]),
  new QuirkMap("\\byes\\b", ["hell yes", "okay", "sure", "certainly", "indeed", "yes", "yeppers", "right", "yeah", "nah"]),
  new QuirkMap("\\bno\\b", ["nope", "absolutely not", "he;l no", "absolutely no", "no way", "hello"]),
  new QuirkMap("friend", ["bestie","bro", "buddy", "pal", "friend", "compadre", "comrade", "homey", "best friend"]),
  new QuirkMap(":\\)", [":)", ":)", ":)", ":)", ":)", ":)", "=)", "=}", "=]", ":>", "8D", "XD", ":3", ":-)", "¯\_(ツ)_/¯", "uwu", "0u0", "~_^", ";)", ":)", ":0)", ":]", ":B", "^_^", ":o)", ">: ]"]),


]



