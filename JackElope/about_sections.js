//create the sections. 
//a dating profile can choose which to have or not to have
//obsessions fill them in but also i want templates. 


const selfSummaryRaw = `My self-summary
Most people that know me would say I'm
Things I am not not
A little about me`;

const selfSummary = selfSummaryRaw.split('\n');


const aspirationsRaw = `What I'm doing with my life
One day, I would like to
I'd like to be known for my
If money were no concern, this is what I'd be doing`

const aspirations = aspirationsRaw.split('\n');


const talentRaw = `I could probably beat you at
I'm really good at
I like to make
I want to be better at`

const talent = talentRaw.split('\n');

const needsRaw = `I value
Some things I could never do without
I couldn't function without
`;

const needs = needsRaw.split('\n');


const hobbiesRaw = `The last media I binged
I spend a lot of time thinking about
I like to create things about
I should spend more time`;

const hobbies = hobbiesRaw.split('\n');


const momentsRaw = `A perfect day is
On a typical Friday night I am
Best day of my life so far
Ideal weekend
When I die, I will
On a typical Wednesday I am`;

const moments = momentsRaw.split('\n');


const secretsRaw = `The most private thing I'm willing to admit
The last time I was embarrased
My biggest regret`

const secrets = secretsRaw.split('\n');


const datingRaw = `What I"m actually looking for
You should message me if
Before I go on a date with someone I need to know that
For our date, let's`;

const dating = datingRaw.split('\n');



class AboutSection {
  constructor(title, rand, obsessions) {
    this.rand = rand;
    this.title = title;
    this.obsessions = obsessions;
  }

  makeRamble = () => {
    this.ramble = "PLZ TODO";
  }
}


class SummarySection extends AboutSection {
  
  makeRamble = () => {
    this.ramble = "PLZ TODO summary";
  }
}

class AspirationSection extends AboutSection {
  makeRamble = ()=>{
    this.ramble = "PLZ TODO aspirations";
  }
}

class TalentSection extends AboutSection {
  makeRamble = ()=>{
    this.ramble = "PLZ TODO talent";
  }
}

class NeedsSection extends AboutSection {
  makeRamble = ()=>{
    this.ramble = "PLZ TODO needs";
  }
}

class HobbiesSection extends AboutSection {
  makeRamble = ()=>{
    console.log("JR NOTE: title",this.title, this.obsessions)
    this.ramble = `PLZ TODO hobbies I really like ${this.obsessions.map((i)=>i.name).join(", ")}`;
  }
}

class MomentsSection extends AboutSection {
  makeRamble = ()=>{
    this.ramble = "PLZ TODO moment";
  }
}

class SecretsSection extends AboutSection {
  makeRamble = ()=>{
    this.ramble = "PLZ TODO secret";
  }
}

class DatingSection extends AboutSection {
  makeRamble = ()=>{
    this.ramble = "PLZ TODO dating";
  }
}

const getPossibleSections = (rand, obsessions) => {
  return [
    new SummarySection(rand.pickFrom(selfSummary), rand, obsessions),
    new AspirationSection(rand.pickFrom(aspirations),rand, obsessions),
    new TalentSection(rand.pickFrom(talent),rand, obsessions),
    new NeedsSection(rand.pickFrom(needs),rand, obsessions),
    new HobbiesSection(rand.pickFrom(hobbies),rand, obsessions),
    new MomentsSection(rand.pickFrom(moments),rand, obsessions),
    new SecretsSection(rand.pickFrom(secrets),rand, obsessions),
    new DatingSection(rand.pickFrom(dating),rand, obsessions),
  ]
}
