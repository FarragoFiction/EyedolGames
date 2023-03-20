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
    const obsessiveParagraph = (obsession,first)=>{
      const introPhrases = [`Hey I am totally obsessed with ${obsession.name}.`];

      const bridgePhrases = [`Oh yeah, and how could I forget about  ${obsession.name}?`,`Another thing I'm obsessed with is  ${obsession.name}.`];

      const favoriteMinorBlorbo = obsession.randomMinorBlorbo(this.rand);
      const leastFavoriteMainBlorbo = obsession.randomBlorbo(this.rand);
      const favoriteMainBlorbo = obsession.randomBlorbo(this.rand);
      const mostTearJerkingEvent = obsession.randomEvent(this.rand);
      const mostAwesomeEvent = obsession.randomEvent(this.rand);
      const favoriteEvent = obsession.randomEvent(this.rand);

      const favoriteQuote = obsession.randomCommonPhrases(this.rand);
      const favoriteQuote2 = obsession.randomCommonPhrases(this.rand);

      const threeHotTakes = [obsession.randomOpinion(this.rand),obsession.randomOpinion(this.rand),obsession.randomOpinion(this.rand)]

      const randomGoal = obsession.randomGoal(this.rand);
      const rambles1 = [
        `I absolutely can not stand ${leastFavoriteMainBlorbo}. ${this.rand.pickFrom(["Completely overrated.","The fandom has shit taste.","There's no nuance at all!","Completely basic, really."])} `,
        `I never can pick whether ${mostAwesomeEvent} or ${favoriteEvent} was my favorite part of ${obsession.name}. `,
        `${leastFavoriteMainBlorbo} is a fucker, don't even get me started. I'd have to go all day.`,
        `${this.rand.pickFrom(["One day, I'm going to","I can't wait to","Me and my friends are going to","Honestly, it inspired me to"])} ${randomGoal}.`,
        `Look, I'm not going to apologize for believing ${threeHotTakes[0]}.`,
        `It was so epic ${mostAwesomeEvent}. ${this.rand.pickFrom(["I don't understand how anyone could see it as tragic.","It's so epic!","The creators really are geniuses, you know?","How did the creators even think to do that?"])}`,

        `I cry every time I think about ${mostTearJerkingEvent}. ${this.rand.pickFrom(["I don't understand how anyone could see it as funny.","It's so cathartic!","The creators really can be jerks, you know?","How did the creators even think to do that?"])}`,
        `My FAVORITE character is ${favoriteMinorBlorbo}. Sure, they aren't the most popular but they're such a great blank slate!  It's EASY to like a character like ${leastFavoriteMainBlorbo} who gets all the screen time, but true fans know it's quality not quantity. `,
        `You know, I don't think people think hard enough about "${favoriteQuote}". Sure on a surface level you might think you understand it, but what about a deeper reading? I feel like every time I meditate on it I learn something new about myself.`,
        `${favoriteMainBlorbo} has so much good fanart! I can't wait to see what the fandom does with them next! Oh, my little blorbo...`,
      ]

      const rambles2 = [
        ` ${leastFavoriteMainBlorbo} ${this.rand.pickFrom(["could go die in a fire for all I care.","is so overrated.",", definitely not my taste.","is a basic bitch."])} `,
        `I can see ${mostAwesomeEvent} in my dreams. `,
        `${leastFavoriteMainBlorbo} is a fucker, full stop.`,
        `${this.rand.pickFrom(["I dream of","My friends and I plan to","I'm so excited to"])} ${randomGoal}.`,
        `DNI if you don't agree that ${threeHotTakes[1]}.`,
        `I couldn't believe it ${mostAwesomeEvent}. ${this.rand.pickFrom(["I don't understand how anyone could see it as tragic.","It's so epic!","The creators really are geniuses, you know?","How did the creators even think to do that?"])}`,

        ` ${mostTearJerkingEvent} was the most sad moment in all of fiction. ${this.rand.pickFrom(["I don't understand how anyone could see it as funny.","It's so cathartic!","The creators really can be jerks, you know?","How did the creators even think to do that?"])}`,
        `I could talk for hours about ${favoriteMinorBlorbo}. They're so scrungly. `,
        `I think all the time about "${favoriteQuote2}". ${this.rand.pickFrom(["Sometimes I just repeat it to myself on a loop","I had never heard anything like it before."])}`,
        `${favoriteMainBlorbo} is probably my favorite main character.`,
      ]

      const rambles3 = [
        `${leastFavoriteMainBlorbo}. ${this.rand.pickFrom(["is so gross.","has way too much fanart.","gets all the ships and they're all shit.","honestly should never have been written."])} `,
        ` ${favoriteEvent} I knew that ${obsession.name} was going to stick with me for a long time. `,
        ` ${threeHotTakes[2]} is just something I believe.`,
        `It was just  ${mostAwesomeEvent}. ${this.rand.pickFrom(["I don't understand how anyone could see it as tragic.","It's so good!","The creators really are geniuses, you know?","How did the creators even think to do that?"])}`,

        `I cry every time I think about ${mostTearJerkingEvent}. ${this.rand.pickFrom(["I don't understand how anyone could see it as funny.","It's so cathartic!","The creators really can be jerks, you know?","How did the creators even think to do that?"])}`,
        `My FAVORITE character is ${favoriteMinorBlorbo}. Sure, they aren't the most popular but they're such a great blank slate!  It's EASY to like a character like ${leastFavoriteMainBlorbo} who gets all the screen time, but true fans know it's quality not quantity. `,
        `You know, I don't think people think hard enough about "${favoriteQuote}". Sure on a surface level you might think you understand it, but what about a deeper reading? I feel like every time I meditate on it I learn something new about myself.`,
        `${favoriteMainBlorbo} has so much good fanart! I can't wait to see what the fandom does with them next! Oh, my little blorbo...`,
      ]

      const rambles4 = [
        `I absolutely do not like ${leastFavoriteMainBlorbo}. ${this.rand.pickFrom(["Completely overrated.","The fandom has shit taste.","There's no nuance at all!","Completely basic, really."])} `,
        `I never can pick whether ${mostAwesomeEvent} or ${favoriteEvent} was my favorite part of ${obsession.name}. `,
        `${leastFavoriteMainBlorbo} is a fucker, don't even get me started.`,
        `${this.rand.pickFrom(["One day, I'm going to","I can't wait to","Me and my friends are going to","Honestly it inspired me to"])} ${randomGoal}.`,
        `The belief that ${threeHotTakes[1]} has definitely divided the fandom`,
        `It was so good when ${mostAwesomeEvent}. ${this.rand.pickFrom(["I don't understand how anyone could see it as tragic.","It's so epic!","The creators really are geniuses, you know?","How did the creators even think to do that?"])}`,

        `I cry every time I think about ${mostTearJerkingEvent}. ${this.rand.pickFrom(["I don't understand how anyone could see it as funny.","It's so cathartic!","The creators really can be jerks, you know?","How did the creators even think to do that?"])}`,
        `Have you ever thought about "${favoriteQuote}". I feel like even non-fans can relate to it.`,
      ]

      const rambles5 = [
        `Wow. Hopefully I got all that out of my system. I promise I'm not so obsessive on real dates :)`,
        `Thanks for listening to my unhinged ramble about ${obsession.name}!`,
        `Anyways, thats just about everything I can think of about ${obsession.name} for now.`
      ]

      const dontrepeatrambles = [rambles1, rambles2, rambles3,rambles4,rambles5]
      const numberSentences = this.rand.getRandomNumberBetween(1,5);
      let ret = " <p> ";
      if(first){
        ret += this.rand.pickFrom(introPhrases);
      }else{
        ret += this.rand.pickFrom(bridgePhrases);
      }
      for(let i = 0; i<numberSentences; i++){
        ret += ` ${this.rand.pickFrom(dontrepeatrambles[i])}`;
      }
      ret += " </p> "
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
    const obsessiveParagraph = (obsession)=>{
      const introPhrases = ["It feels awkward to admit but...","Sure, I'll admit something.",`Okay, I'll admit it.`,`I never told anyone this but...`];


      const favoriteMinorBlorbo = obsession.randomMinorBlorbo(this.rand);
      const leastFavoriteMainBlorbo = obsession.randomBlorbo(this.rand);
      const favoriteMainBlorbo = obsession.randomBlorbo(this.rand);
      const mostTearJerkingEvent = obsession.randomEvent(this.rand);
      const mostAwesomeEvent = obsession.randomEvent(this.rand);
      const favoriteEvent = obsession.randomEvent(this.rand);

      const favoriteQuote = obsession.randomCommonPhrases(this.rand);
      const threeHotTakes = [obsession.randomOpinion(this.rand),obsession.randomOpinion(this.rand),obsession.randomOpinion(this.rand)]

      const randomGoal = obsession.randomGoal(this.rand);
      const rambles = [
        `Full disclosure, I totally wrote '${favoriteQuote}' in my highschool yearbook. ${this.rand.pickFrom(["Nobody got the reference, it was actually really funny. :)","I swear I'm better at keeping my obsessions private these days.","I don't know WHAT past me was thinking of."])}`,
        `I know it's cringe, but I'm ${this.rand.pickFrom(["going to","planning to","trying to","hoping to","aspiring to"])} ${randomGoal}. ${this.rand.pickFrom(["I feel like I could create forever as long as it's about " + obsession.name,"I think I really have a shot to turn it into a career if I work at it!","I see the fandom making such cool things and I think I could make something great if I just tried."])}`,
        `In ${obsession.name}, I honestly forgot that ${mostTearJerkingEvent} even happened... `,
        `I never really liked ${leastFavoriteMainBlorbo} from ${obsession.name}. I couldn't even tell you why! ${this.rand.pickFrom(["Maybe because I had this godawful unpleasant dog with that name as a kid.","Maybe because of the way the fandom always draws them?","Maybe because I knew someone just like them back in middleschool?","Maybe because they remind me a bit of my little sibling..."])}`,
        `I only recently figured out that ${favoriteMinorBlorbo} and ${favoriteMainBlorbo} weren't the same character! I know, I know! I felt like a total non-fan when I figured it out. Hopefully you can forgive me? I promise I'm a much better ${obsession.name} fan these days!`
      ]
      const numberSentences = this.rand.getRandomNumberBetween(1,5);
      let ret = " <p> ";
      ret += this.rand.pickFrom(introPhrases);
      ret += this.rand.pickFrom(rambles);

   
      ret += " </p> "
      return ret;
  
    }

    this.ramble = obsessiveParagraph(this.rand.pickFrom(this.obsessions));

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
