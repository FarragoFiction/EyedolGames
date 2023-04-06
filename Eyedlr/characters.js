/*
  NOTE: I can't feasibly write ALL of this on my own. 

  if i take popular tumblr posts, in some way link back to the original (wihout hiding. maybe a read more tag?)
*/


/*
   a post is a doubly linked list chain of reblogs
*/
class Post{
  text;
  tags;
  owner;
  likes; //array of profiles that liked this
  replies; //array of text and owner pairs cluttering up the notes
  parent;
  children;
  //for the porn bots, how should they react
  suggested_reblogs;
  suggested_tags;
}

class Character{
  name;
  icon;
  pinned_posts;//each char has up to one of these
  posts;

  //responds to keyphrases
  readied_reblogs;

  constructor(name,icon,posts,readied_reblogs){
    this.name = name;
    this.icon = icon;
    this.posts = posts;
    this.readied_reblogs = readied_reblogs;
  }


}

//want at least three of these for every real character. 
//they use the obsession engine to post things, but also 
class PornBot extends Character{


}

//you should be allowed to follow people
//you should get to post, and your posts are treated just like any other (aka they can be reblogged and commented on and etc)
class Observer extends Character{


}

//literally created Eyedlr, constantly reblogging memes and occasionally @ing the intern1, 
//occasionally reblogs something with a Prophecy
//will NEVER reblog anything Wodin did OR intern2. (v much not interested in her past self)
//WILL NOT LEAVE INTERN3 ALONE (let the man grieve! stop trying to recruit him! he'll join you when he's ready!)
class Wanda extends Character{

  
}


//@s intern 2, reblogs and posts memes and shitposts, especially about baby animals
//occasionally reposts things about the eye killer or other conspiracies
//if they post "i think i'm close to figuring out where the eye killer will strike next" they never post again
class Wodin extends Character{


}




//post eyedol.  at run time flip a coin and decide which intern you get, 1 or 2 or 3
//ocassionally reblogs a meme and @s Wanda when he does. 
//sometimes reblogs something wanda posted and goes "dude, not cool" and other moirail tasks 
//sometimes does an Offical Post for Eyedol Games (he runs their social media account)
//occasionally says something that ALMOST could be taken for being in the loop which wanda always thinks is so hilarious
class Intern1 extends Character{


}

//interacts with Wodin, reblogging memes and @ing them constantly 
class Intern2 extends Character{


}

//dealing with the grief of losing Wodin. only one or two posts ever, both commentless pictures of ugly baby animals
class Intern3 extends Character{

}

//only reblogs, never posts, reblogs can include a gif or image with text in it, or a link that is the reply
//mix of violence and yugioh that she reblogs
class EyeKiller extends Character{

}

//reblogs eye killer posts and also yugioh posts
class Himbo extends Character{


}

//posted like twice, both attempts at engaging, then just bounced off eyedlr
class Hostage extends Character{

}


//flat out posts spoilers, fandom blog
class Italian extends Character{


}


//posts about her skyrim mods
//and other video game stuff
//plus links to her favorite burger places on zampanini (with plenty of warnings to make sure you don't get a fee)
class FlowerChick extends Character{


}

//chats with everyone she can and directs people to jackElope
//runs the porn bot net so other characters @ her to complain about their spam occasionally
class Alt extends Character{

}

//reblogs the things alt posts
//whenever it does reblog, only speaks in the tags
class Truth extends Character{


}

//looping closer. eyedol games closer would NEVER get on social media during company hours
//and all hours are company hours. 
//mostly plugs her various consulting services and gets in absolutely stupid petty feuds with witherby. 
//(her type of Lonely does NOT play nice with his.)
class Closer extends Character{


}


//almost never posts, when he does its either a reblog of content free content or a succinct original post that sheds so much light on things via cutting away the irrelevancies
class Neville extends Character{


}

//if you try to view her profile, its set to private
//she doesn't realize, if she puts tags in a reblog (she does ALL THE TIME) she can be seen
//she is VERY chatty in tags
//v much likes reblogging adhd and anxiety tips, both for herself and neville
class Devona extends Character{
  //https://www.tumblr.com/foone/713863322485850112?source=share


}


//ria is contstantly rambling, long winded original posts, long reblog comments, plus more things in the tags (though she TRIES to use the tags as actual search terms)
class Ria extends Character{


}

//she reblogs with comments and tags of :3 and other emoji, and she reblogs  *their spelling corrections (its like work!)
class Camille extends Character{


}


//very much is in his Customer Service mode, he has thousands of asks and he tries to answer each of them to the best of his ability
//he logs into tumblr exactly once per day, at set office hours and otherwise treats it like a job
//people confess the most deranged shit into his ask box, and he forgives them
class Witherby extends Character{

}

//snail posts constantly, anything cute or friendshaped as well
class Yongki extends Character{


}


//reblogs memes and self care tips for yongki (always ats him)
//complains constantly the autism tips are useless because they are so broad because "everyone is like this"
//(oh captain, you'll never understand you're just as much on the spectrum as yongki)
class Captain extends Character{

}

//train facts, train memes, train pictures, all day every day. occasionally a rat pick for Jose living in her brain
//that video of the darkness taking the train
class Ambrose extends Character{


}


//reblogs EVEYR single post he sees with "get reblogged, idiot" in an attempt to go viral
//also reblogs popular posts with takes on top and eggs lee/hunter on 
class K extends Character{

}


//sharing an account, vague post about each other and various other people
//K reblogs them constantly saying "did you know i heard so and so talking shit about you?"
//K and lee hunter are such good friends because they have the exact same kind of thirst for drama
class LeeHunter extends Character{


}


//do you love the color of the sky
//history posts, insignifance of man posts
//she has a lot of accounts and keeps forgetting which one is hers (so alt usernames?)
class River extends Character{


}

//live blogs her day (down to what time she ate and how much it cost and what she got )
//and self care tips
class DocSlaughter extends Character{


}


//ALSO lives blog his day and its always just a bit more normal and a bit more impressive than docs posts
//very popular, ocassionaly advertises his work with the PTA and his bid to run into politics
//reblogs "everyone has a doppelganger" and secret twin type posts all the time
class TheNeighbor extends Character{

}

//blogs child care tips, fighting tips and ALWAYS IS IN ALL CAPS
//warior male posts, nidhogg posting
//occasionally reblogs things like ominous picutres of something unsettling barely out of focus and ats TheNeighbor
//vague post complaints about "someone" being unmasked at midnight and drinking milk directly out of the cartoon
class Tyrfing extends Character{


}

//fucked up glitches happen to their  posts occasionally,
// usually will reblog them normally after and say things like 'sorry about that" , occasionally posts about meals in unsettling ways
// lots of call out and cancel posts on people they don't like (usually people who insulted parker)
//occasionally @s parker pictures of hatsune miku and hydration memes
class Vik extends Character{


}


//reblogs hatsune miku
//reblogs objects with faces (alt hates this)
//reblogs dirt (that fucking cow video i love so much. Claire! It's DIRT!)
//posts and reblogs pictures of holes
//deranged anime takes (people reblog his deranged takes and say mean things, then vik attacks them)
class Parker extends Character{


}


//mostly just reblogs the things witherby posts, or popular posts teaching people how to "stay safe"
//occasionally the radio blogs instead
//gun safety tips
//will NEVER reblog Vik (she can sense the danger in them)
class Hoon extends Character{

}

//random ass philosophy posts in between posts asking how tumblr works and if he's been an asshole or not
//never reblogs. likes everything.
class NAM extends Character{

}


//occasionally jumps in with Vik/Parker on putting "the bad guys" on blast, other times tries to defend them
//reblogs legal advice and adds his own take as well
class Ronin extends Character{

}

//reblogs SWEET GAMING TIPS
//likes just about everything
//reblogs anything his kids say, with tags about how proud he is
//reblogs everything camille does with an awkward attempt to call her out on her badness
//(his spades crush is so obvious)
class Peewee extends Character{


}

//reblogs anything peewee says without comment but the tag is just a <3
class RobertBobert extends Character{


}

//reblogs anything peewee says without comment but the tag is just a <3<
//reblogs anything camille says with a :( (jealous that peewee likes her spades)
class Eggman extends Character{
  
}

//gets upset any time peewee reblogs his stuff
//reblogs shitsposts mostly
class Rebel extends Character{

}

//ecoterrorism hours baby
//rarely blogs anything because their generator only runs an hour a day
class Melon extends Character{

}

//reblogs standard memes and self care bits and bobs
//occasionally reblogs rebels bristling at Peewee to try to defuse the situation
class Rod extends Character{

}