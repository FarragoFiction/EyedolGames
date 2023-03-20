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


    const obsessiveParagraph = (obsession,first)=>{
      const introPhrases = [`Hey I am totally obsessed with ${obsession.name}.`];

      const bridgePhrases = [`Oh yeah, and how could I forget about  ${obsession.name}?`,`Another thing I'm obsessed with is  ${obsession.name}.`];

      const favoriteMinorBlorbo = obsession.randomMinorBlorbo(this.rand);
      const leastFavoriteMainBlorbo = obsession.randomBlorbo(this.rand);
      const favoriteMainBlorbo = obsession.randomBlorbo(this.rand);
      const mostTearJerkingEvent = obsession.randomEvent(this.rand);
      const favoriteQuote = obsession.randomCommonPhrases(this.rand);
      const threeHotTakes = [obsession.randomOpinion(this.rand),obsession.randomOpinion(this.rand),obsession.randomOpinion(this.rand)]

      const randomGoal = obsession.randomGoal(this.rand);
      const rambles = [
        `One day, I'm going to ${randomGoal}.`,
        `Look, I'm not going to apologize for believing ${threeHotTakes[0]}.`,
        `I cry every time I think about ${mostTearJerkingEvent}. How did the creators even think to do that?`,
        `My FAVORITE character is ${favoriteMinorBlorbo}. Sure, they aren't the most popular but they're such a great blank slate!  It's EASY to like a character like ${leastFavoriteMainBlorbo} who gets all the screen time, but true fans know it's quality not quantity. `,
        `You know, I don't think people think hard enough about "${favoriteQuote}". Sure on a surface level you might think you understand it, but what about a deeper reading? I feel like every time I meditate on it I learn something new about myself.`,
        `${favoriteMainBlorbo} has so much good fanart! I can't wait to see what the fandom does with them next! Oh, my little blorbo...`,
      ]
      const numberSentences = this.rand.getRandomNumberBetween(1,5);
      let ret = "<p>";
      if(first){
        ret += this.rand.pickFrom(introPhrases);
      }else{
        ret += this.rand.pickFrom(bridgePhrases);
      }
      for(let i = 0; i<numberSentences; i++){
        ret += ` ${this.rand.pickFrom(rambles)}`;
      }
      ret += "</p>"
      return ret;
  
    }

    this.ramble = "";
    let first = true;
    for(let obsession of this.obsessions){
      this.ramble += obsessiveParagraph(obsession, first);
      first = false;
    }
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
