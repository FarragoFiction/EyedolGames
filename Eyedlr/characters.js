
/*
hi yes hello

you're either future JR or a waste (which is to say, someone who gets into places they 'shouldn't except that is literally the intended path for some of this)

i am so so sorry this file is so insanely big

i mean, i know better than to do this NORMALLY

but theres something cathartic about breaking the rules when there are no consequences

except i guarantee you that even CURRENT me is pissed at past me for doing this because its 

INSANELY hard to find specific blorbos in here as i'm wiring them up .

but instead of taking the time to refactor it out and get everything in place

im just

not.

so you know.

sorry not sorry

*/


//display when a blorbo gets a link to one of their mini sims
//this is GENUINELY an attempt on my part to expose secrets to those who do not dig
//FRIEND is here to tell provide rewards
const ominousAskPreambles = ["THEY ARE OBSERVING YOU.", "THEY KNOW YOU", "YOU ARE BEING OBSERVED.", "YOU ARE WATCHED."]


class Character {
  obsessions = [];
  postLimit = 38; //after this they break down.

  name;
  //https://morphimus.tumblr.com/post/710837261845037056/it-looked-kinda-like-this-the-post-would-be-the
  wungles = []; //most have none
  wungles_index = 0;
  //you don't have to ever acknowledge these but you CAN if you like
  //characterName, text pairs
  pending_asks = [];
  liked_posts = []; //can view a profiles likes
  icon; //could be an absolute or relative url
  pinned_post;//each char has up to one of these
  posts = [];
  reblogged_posts = [];

  //key, post pairs
  readied_reblogs = {};
  //only for reblogs
  readied_wungles = {};


  //just a list of posts
  readied_posts = [];
  delete_readied_reblogs = true;

  constructor() {
    this.createCommonReadiedReblogs();
    if (this.name) {
      this.name = this.name.toLowerCase(); //i keep forgetting
    }
  }

  submitAsk = (characterName, text) => {
    this.pending_asks.push({ characterName, text });
  }

  createCommonReadiedReblogs = () => {
    //these aren't the characters you think they are
    //they are quotidians mimicking them. 
    //same as was east
    //do you REALLY think our favorite blorobs would be so stiled
    //so artifical?
    //no. this is yet another layer of illusion.
    //and that illusion is DESIGNED to crack along specific seams
    //  constructor(owner, text, parent, tags, suggested_reblogs, suggested_tags, virtual) {
    //ALWAYS mark as virtual so you can't reblog a post before its deployed
    //this.readied_reblogs['first'] = new Post(this, "Actually, I am first.", null, ["tags for original readied reblog"], ["response to readied reblog"], ["tags for the response to the readied reblog"], true)

    this.readied_reblogs['zampanio'] = new Post(this, "Zampanio is a very fun game. You should play it.", null, ["zampanio", "game", "free-to-play", "fun,", "friday"], ["I'm not so sure... I heard people disappear when they play that.", "Are you sure?", "So true, bestie!", "It seems spooky...", "OP has a virus, do not reblog.", "OP has been hacked, do not reblog.", "OP did you get hacked? This doesn't sound like you?", "My friend's cousin knew a guy who VANISHED after he played it."], ["creepypasta", "unreality", "zampanio", "don't play it", "maybe you should play it", "don't trust it", "it is not what it is", "an eye for an eye"], true)
  }

  checkBlorboReblog = (parentToRenderTo, odds) => {
    if (rand.nextDouble() < odds) {
      let post = this.handleReadiedReblog();
      if (post && parentToRenderTo) {
        post.renderToScreen(parentToRenderTo);
      }
      if (post) {
        return;
      }
    }
  }

  checkBlorboPost = (parentToRenderTo, odds) => {

    if (rand.nextDouble() < odds) {
      let post = this.handleReadiedPost();
      if (post && parentToRenderTo) {
        post.renderToScreen(parentToRenderTo);
      }
      if (post) {
        return;
      }
    }
  }

  checkAskForContamination =(ask)=>{
    if(!ask){
      return;//witherby doesnt have asks
    }
    let tmp = document.createElement("div");
    tmp.innerHTML = ask.text;
    const span = tmp.querySelector("span");
    if(!span){
      return;
    }
    let obsession_key = span.dataset && span.dataset.obession;//yes i know its spelled wrong. past me is an fucker.
    if(obsession_key){
      const o = all_obsessions[obsession_key];
      this.obsessions.push(o);
      return o;
    }
  }

  //there is no rhyme or reason to what anyone likes, just like random shit
  //not worth putting more effort in i wanna get to the meat
  checkBlorboLike = (odds) => {
    if (rand.nextDouble() > odds) {
      return false;
    }
    const post = this.findAPostEvenIfYouHaveInteractedWithIt();
    if (post && this.decideIfShouldLike(post)) {
      this.likePost(post);
      return true;
    }
  }

  handleObsessions = (parentToRenderTo) => {
    if (this.obsessions.length === 0) {
      return;
    }

    //look for a post to start shit in

    //if you cannot find one, create one.

    const ominous_tags = ["have i always liked this?", "for some reason i'm obsessed with this", "i cant stop thinking of this", "does anyone else dream of this?", "why do i suddenly like this?", "what even is this", "im scared", "why can't i stop posting about this?"]
    let target_obsession = rand.pickFrom(this.obsessions);

    let {target, obsession}  = this.findPostToDoStupidDiscourseAbout(target_obsession);
    let post;

    if(target){
      post = this.doStupidDiscourse(target, obsession);

    }else{//start the discourse yourself.
      obsession = target_obsession;
      if(this == camille){
        //she is literally allergic to obsession.
        /*
        it makes her forget herself
        want to ramble
        to talk
        just like that day in the courtroom with peewee dissing her report she worked so hard on
        camille loves so much and so hard, she gets so so attached to things
        her curse is cruel
        */
        post = this.createNewPost(`<span data-obession="${obsession.name}">I suddenly want to talk about ${obsession.name}... God it feels so good to finally say it! Just get it off my chest. I love ${obsession.name}! I a;lsdkjfas;ljdfas</span>`, [obsession.name, rand.pickFrom(ominous_tags)], [""], [""]);
        this.dead = true;
        this.name += "-deactivated";

      }else{
        post = this.createNewPost(`<span data-obession="${obsession.name}">I suddenly want to talk about ${obsession.name}...</span>`, [obsession.name, rand.pickFrom(ominous_tags)], [""], [""]);

      }

    }

    

    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }


  }

  findPostToDoStupidDiscourseAbout = (target_obsession) => {
    let posts = rand.shuffle(all_posts);
    let obsessions = target_obsession ? [target_obsession]: rand.shuffle(this.obsessions);
    for (let obsession of obsessions) {
      for (let post of posts) {
        if (post.text.toLowerCase().includes(obsession.name.toLowerCase())) {
          return {target: post,obsession};
        }
      }
    }
    return{target: null, obsession: null}
  }

  
  //looks for a post to start fandom shit about
  //
  doStupidDiscourse = (post, obsession) => {
    if(!post){
      return;
    }
    //camille won't die if she has discourse to :3 at
    let responses = this === camille? [":3"]: [
      `Wow! You know about ${obsession.name}, too?`,
      `Wow. Talk about a rancid take.`,
      "Wow, really?",
      `Tell us what you think about ${obsession.randomBlorbo(rand)}!`,
      `${obsession.randomBlorbo(rand)} is so overrated :/`,

      `Can you make me an OC that looks like ${obsession.randomBlorbo(rand)}?`,
      `Okay, but what did you think about ${obsession.randomEvent(rand)}?`,
      `omg where were you when ${obsession.randomEvent(rand)}?`,
      `i almost forgot about ${obsession.randomEvent(rand)}`,
      `This fandom is brain dead. How could anyone think ${obsession.randomOpinion(rand)}?`,
      `${obsession.randomOpinion(rand)}`,
      `${obsession.randomOpinion(rand)} ${rand.pickFrom(["You might not like it, but its true.", "I will fight anyone who says otherwise.", "If you believe that go ahead and block me.", "DNI if you can't accept it."])}`,
      `${obsession.randomOpinion(rand)} ${rand.pickFrom(["You might not like it, but its true.", "I will fight anyone who says otherwise.", "If you believe that go ahead and block me.", "DNI if you can't accept it."])}`,
      `${obsession.randomOpinion(rand)} ${rand.pickFrom(["You might not like it, but its true.", "I will fight anyone who says otherwise.", "If you believe that go ahead and block me.", "DNI if you can't accept it."])}`,
      `${obsession.randomOpinion(rand)} ${rand.pickFrom(["You might not like it, but its true.", "I will fight anyone who says otherwise.", "If you believe that go ahead and block me.", "DNI if you can't accept it."])}`,
      `${obsession.randomOpinion(rand)} ${rand.pickFrom(["You might not like it, but its true.", "I will fight anyone who says otherwise.", "If you believe that go ahead and block me.", "DNI if you can't accept it."])}`,
      `${obsession.randomCommonPhrases(rand)}`,
      `${obsession.randomCommonPhrases(rand)}`,
      `i am so tired of hearing about '${obsession.randomCommonPhrases(rand)}'`,
      `${obsession.randomLocation(rand)} is real and i went there ${rand.pickFrom(["last week", "last year", "two weeks ago", "yesterday", "last month", "friday", "every friday for two years"])}`,
      `${obsession.randomObject(rand)} is my good luck charm`,
      `You should read my fanfic about a young ${obsession.randomJob(rand)} who ends up saving the world!`,
      `I can't believe you think that!!!`,
      `Toxic fandom.`,
      `choosing ${obsession.name} over family and friends`,
      `forfeiting all mortal possessions to ${obsession.name} `,
      `uncontrollably obsessed with ${obsession.name} `,
      `anyone else up for some  ${obsession.name} `,
      `Which is better, ${obsession.randomObject(rand)} or ${obsession.randomObject(rand)}?`,
      `What about '${obsession.randomCommonPhrases(rand)}'?`,
      "NOOOOOOOOOOOOOOOOO!",
      `I want to put ${obsession.randomMinorBlorbo(rand)} in the dryer on high heat.`,
      `One day, I am going to ${obsession.randomGoal(rand)}!`,
      `I am utterly obsessed with ${obsession.name}.`,
      `Are we really all going to just forget about ${obsession.randomMinorBlorbo(rand)}?`,
      `I am just sitting here microwaving ${obsession.randomMinorBlorbo(rand)}. `,
      `I love ${obsession.randomMinorBlorbo(rand)} so much!`,
      `Yeah and you probably want to be a ${obsession.randomJob(rand)} too!`,
      `lol and i have a bridge to sell you in ${obsession.randomLocation(rand)}`,
      `How could you think that about ${obsession.name}?`,
      `GUYS! There is more to life than ${obsession.name}!!!`]

    // /parent, text, tags, suggested_reblogs, suggested_tags)
    let bonus = '';
    if (halloweenpics && halloweenpics.length > 0 && obsession === all_obsessions[HALLOWEEN] && rand.nextDouble() > 0.75) {
      bonus =  rand.pickFrom(halloweenpics);
    }else if (zampanioPics && zampanioPics.length > 0 && obsession === all_obsessions[ZAMPANIO]&& rand.nextDouble() > 0.5){
      bonus =  rand.pickFrom(zampanioPics);
    }
    return this.reblogAPost(post, `<span data-obession="${obsession.name}">` + rand.pickFrom(responses) + "</span>" + `<br>${bonus}`, [obsession.name, "drama", "disc horse", "discourse"], [""], ["drama", obsession.name]);
    //look for a post that has this tag. start stupid drama about it
}

  //hmm.  i should probably do the highest odd action first. 
  blorboAI = (parentToRenderTo, oddsReblog, oddsPost, oddsLike) => {
    //if you have an obsession. well. do i have news for you, buddy.
    //you're gonna be on tumblr TWICE as long
    this.handleObsessions(parentToRenderTo);

    //check your highest priority thing first
    if (oddsLike > oddsPost && oddsLike > oddsReblog) {

      let post = this.checkBlorboLike(oddsLike);
      if (post) {
        return;
      }
    }

    if (oddsPost > oddsLike && oddsPost > oddsReblog) {
      let post = this.checkBlorboPost(oddsLike);
      if (post) {
        return;
      }
    }


    if (oddsReblog > oddsLike && oddsReblog > oddsPost) {
      let post = this.checkBlorboReblog(oddsLike);
      if (post) {
        return;
      }
    }
    //



    //now just do whatever i don't even care (yes even if this means it repeats a shot)

    let post = this.checkBlorboReblog(parentToRenderTo, oddsReblog);
    if (post) {
      return;
    }
    post = this.checkBlorboPost(parentToRenderTo, oddsPost);
    if (post) {
      return
    }
    let like = this.checkBlorboLike(oddsLike);
    //well do SOMETHING, gotta collate those likes somehow
    if (!like) {
      this.activelyLookForThingsToLike();
    }
  }

  handleReadiedPost = () => {
    if (this.readied_posts && this.readied_posts.length && this.readied_posts.length > 0) {
      let post = rand.pickFrom(this.readied_posts);
      post.owner = this;
      post.createElement();
      removeItemOnce(this.readied_posts, post);
      //  createNewPost(text, tags, suggested_reblogs, suggested_tags) {
      this.createNewPost(post.text, post.tags, post.suggested_reblogs, post.suggested_tags);
    }
  }

  //each character decides when to do this, but its standardized what happens when they do
  //looks through all posts for one that matches a key
  //if it finds it, reblogs it with the modified post
  //then removes it from readied reblogs (so no spam)
  handleReadiedReblog = () => {

    let possiblities = rand.shuffle(all_posts);
    //IF you have a respnse to the observer breaching or being pinged, do that first
    let keys = ['data-breach="observer"', `@${this.name}`, ...Object.keys(this.readied_reblogs)]
    for (let key of keys) {
      for (let target of possiblities) {
        //if the target post has the key phrase anywhere in it, attack
        const keyInText = this.readied_reblogs[key] && target.text.toLowerCase().includes(key.toLowerCase());
        const keyInWungle = this.readied_reblogs[key] && target.wungle.toLowerCase().includes(key.toLowerCase())
        if (keyInText || keyInWungle) {
          let response = this.readied_reblogs[key];
          //no spam
          if (this.delete_readied_reblogs) {
            delete (this.readied_reblogs[key]);
          }
          // /parent, text, tags, suggested_reblogs, suggested_tags)
          return this.reblogAPost(target, response.text, response.tags, response.suggested_reblogs, response.suggested_tags);

        }
      }
    }
    return null;
  }

  activelyLookForThingsToLike = () => {
    if (!this.secret_name) {
      return;
    }
    let posts = rand.shuffle(all_posts);
    for (let post of posts) {
      if (post.text.toLowerCase().includes(this.secret_name.toLowerCase())) {
        this.likePost(post);
        return;
      }
    }
  }

  decideIfShouldLike = (post) => {
    if (!this.secret_name) {
      return true;
    }
    //blorbos only like posts from their own source (or that mention them by name)
    //(so non wastes can get their vibes)

    if (post.text.toLowerCase().includes(this.secret_name.toLowerCase())) {
      return true;
    }
    return false;
  }

  //EVERY child of this should overwrite. this does nothing by design (no not even handle readied reblogs)
  tick = async (parentToRenderTo) => {
    //some make posts, some like or reblog other posts, some reply in posts, some send asks, some do nothing
  }

  likePost = (post) => {
    this.liked_posts.push(post);
    post.likePost(this);
  }

  unlikePost = (post) => {
    removeItemOnce(this.liked_posts, post);
    post.unlikePost(this);
  }


  //just appends the ask to the text
  answerAnAsk(text, question, askerName, tags, suggested_reblogs, suggested_tags) {
    const ask = `<div class="ask">
    <div class="who-asked">
    <span class='asker'>@${askerName}</span> asked: </div>
    <div class ="question-asked">${question}</div>
    </div>`;


    const post = new Post(this, ask + text, null, tags.concat(askerName), suggested_reblogs, suggested_tags, false);
    this.posts.push(post);
    return post;
  }

  createNewPost(text, tags, suggested_reblogs, suggested_tags) {
    //wungle will always be from the wungle list
    const chosen_wungle = this.wungles.length > 0 && this.wungles_index + ": " + this.wungles[this.wungles_index % this.wungles.length];
    this.wungles_index++;

    const post = new Post(this, text, null, tags, suggested_reblogs, suggested_tags, false, chosen_wungle);
    this.posts.push(post);
    return post;
  }

  findAPostEvenIfYouHaveInteractedWithIt = () => {
    return rand.pickFrom(all_posts);
  }



  reblogAPost(parent, text, tags, suggested_reblogs, suggested_tags) {
    //wungle MAY be specific to the wungle of the post we're reblogging from (god wungle isnt even a word anymore)
    let chosen_wungle;
    if (parent.wungle) {
      for (let w of Object.keys(this.readied_wungles)) {
        if (parent.wungle.toLowerCase().includes(w.toLowerCase())) {
          chosen_wungle = this.readied_wungles[w];
        }
      }
    }
    if (!chosen_wungle) {
      chosen_wungle = this.wungles.length > 0 && this.wungles_index + ": " + this.wungles[this.wungles_index % this.wungles.length];
      this.wungles_index++;
    }

    //  constructor(owner, text, parent, tags, suggested_reblogs, suggested_tags) {
    const post = new Post(this, text, parent, tags, suggested_reblogs, suggested_tags, false, chosen_wungle);
    this.posts.push(post);
    this.reblogged_posts.push(post);
    parent.addChild(post);
    parent.chronologicalNotes.push({ post: post });
    parent.syncNotes();

    return post;
  }

  //if you're on someones profiles, thats what you see
  renderAllPosts = (parent) => {
    if (this.pinned_post) {
      this.pinned_post.renderToScreen(parent);
    }
    for (let post of this.posts) {
      post.renderToScreen(parent);
    }
  }


}

const randomPornBotIcon = () => {
  if (rand.nextDouble() > 0.81) {
    return rand.pickFrom(weirdImageList);

  }
  return rand.pickFrom(normalImageList);
}

const randomPornBotName = () => {
  return rand.pickFrom(first_names).toLowerCase() + getRandomNumberBetween(0, 2022);
}

const randomPornBot = () => {
  const bot = new PornBot(randomPornBotName(), "http://eyedolgames.com/JackElope/images/SexySingles/" + randomPornBotIcon());
  bot.desc = rand.pickFrom(links);

  let numberObsessions = rand.getRandomNumberBetween(1, 3);
  halloween && bot.obsessions.push(all_obsessions[HALLOWEEN])
  let obsessionArray = Object.values(all_obsessions);
  for (let i = 0; i < numberObsessions; i++) {
    //MOSTLY they have obesssions in common, but they CAN be weird
    let o = rand.nextDouble() > 0.5 ? rand.pickFrom(obsessionArray) : rand.pickFrom(globalObsessions);
    bot.obsessions.push(o);
  }
  if (rand.nextDouble() > 0.3) {
    let o = (bot.obsessions[0]);
    bot.desc += `<br> I'm totally obsessed with ${o.name}.`;

    bot.desc += ` DNI if you think ${o.randomOpinion(rand)}.`;

    if (bot.obsessions[1]) {
      o = (bot.obsessions[1]);
      bot.desc += `<br> I also like ${o.name}!`;

      bot.desc += ` I really think ${o.randomOpinion(rand)}.`;
    }
  }
  return bot;
}

//https://drive.google.com/drive/folders/1LCxnK5HMkSXscfXtzzv46ysaPRpa4p4u i don't want to forget the guide of hunters
//https://www.tumblr.com/crimsondestroyer/717373385220423680/jv-petermorwood-lordoftherazzles-the-lord-of?source=share

//want at least three of these for every real character. 
//they use the obsession engine to post things, but also 
class PornBot extends Character {
  postLimit = 19;
  // 20h:14m:36s
  //5d:23h:17:04s
  //4d:15h:21m:33s
  //http://knucklessux.com/PuzzleBox/Secrets/Watcher/shambling_yes_no_presentation_by_the_watcher_of_threads.ppsx 
  //https://www.tumblr.com/majimjam/714607788559679488/are-you-trapped-on-tumblr-right-now?source=share   porn bots should post
  //the names and icons vary but at the end of the day they're all pornbots
  constructor(name, icon) {
    super();
    this.name = name;
    this.icon = icon;
    this.quirk = randomQuirk(rand);
  }

  //originally i was going to manually set these up, complete with click throughs to original credit
  //but then i realized that the screenshots HAD the credit and also omg it is impossibly
  //hard to track some of these down
  //tumblr really is a hell site


  //partly i am doing my best to credit every tumblr post i reference because thats just a nice thing to do
  //partly its to send yall spiralling in new directions
  //and partly because as time goes on these links will fall, one by one
  //and the fact that the rot takes all in the end will be emphasized
  //we'll see if the links die first or this site does
  quotidianPost = () => {
    let innaneComments = ["caw!!!", "i am so for this", "so true bestie!", "!!!", "i came to have a good time and honestly i'm feeling so attacked right now", "i feel so attacked right now", "i'm in this picture and i don't like it"];
    /*
         `<a target='blank' href =""><img src ='images/Secrets/tumblr_screenshots/savepoint.PNG'></a>`
*/


    //https://www.youtube.com/watch?v=lE2B8PfsvGk related?
    //nobody-knows-shoes is my very favorite coding tutorial I found years and years ago. it teaches you a specific (probably defunct) UI framework for ruby. the vibes are immaculate. i found my physical print out of it while moving and wanted to share it with everyone but i haven't found where i packed it yet so this will have to do. 
    let possiblePosts = [...links, ...links, ...links, ...links, ...blorboPosts,
      "@wanderer 20h:14m:36s",
      "There are 19 of us here that are at this tier. The rhyme does not say what to do with 19. But this site is a toy.",
      "Count the blackbirds in a tree: they will tell you what is to be. One for sadness, two for joy, three for a tool, and four for a toy. Five for circuits, six for gold and seven for a secret that's never been told.",
      "Learn to code fast: <a href = 'https://github.com/whymirror/why-archive/blob/master/shoes/nobody-knows-shoes.pdf'>Learn Shoes Today!!!!<Br><img src='images/Secrets/nobody-knows-shoes.png'></a>",
      "@wanderer 5d:23h:17:04s",
      "@wanderer 4d:15h:21m:33s",
      "<img data-ai='insulting-nidhogg' src='images/Secrets/tumblr_screenshots/nidhogg_is_endlessly_spiralling_GENES_the_echidna_is_the_same_but_memes___nidhogghatesthis_howdaretheoffspring___diverge.PNG'>",

      "<img src='http://www.farragofiction.com/ZampanioEyes2/tiktanio_glitchy.gif'>",
      `<h2>What Is ZampanioSim?</h2> <img src ='images/Secrets/tumblr_screenshots/what_is_zampaniosim.PNG'></a>`,

      '<iframe width="460" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/814252129&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/openai_audio" title="OpenAI" target="_blank" style="color: #cccccc; text-decoration: none;">OpenAI</a> · <a href="https://soundcloud.com/openai_audio/classic-pop-in-the-style-of-frank-sinatra" title="Classic Pop, in the style of Frank Sinatra" target="_blank" style="color: #cccccc; text-decoration: none;">Classic Pop, in the style of Frank Sinatra</a></div>',
      '<iframe width="460" height="315" src="https://www.youtube.com/embed/16WNvL8Gtt0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      '<iframe width="460" height="315" src="https://www.youtube.com/embed/1WAlkyxz2mU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      '<iframe width="460" height="315" src="https://www.youtube.com/embed/t9HUyHmLFzA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      '<iframe width="460" height="315" src="https://www.youtube.com/embed/R2kovI6tpRE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      `why does this seem so familiar? <br><a target='blank' href ="https://www.tumblr.com/the-phoenix-heart/704082336094076928/dies-first-salticid-youre-amazing-and-i-love"><img src ='images/Secrets/tumblr_screenshots/porn_bot.png'></a>`,
    `${rand.pickFrom(links)} <br><a target='blank' href ="https://www.tumblr.com/nostalgebraist-autoresponder/715946813015932929/hey-frank-what-do-you-think-of-the-new-pornbots?source=share"><img src ='images/Secrets/tumblr_screenshots/no_porn_only_sus_links.PNG'></a>`,
      `eyedlrl sure is a site <br><a target='blank' href ="https://www.tumblr.com/were--ralph/714800413465100288/tumblr-is-unique-bc-like-its-collaborative"><img src ='images/Secrets/tumblr_screenshots/tumblr.PNG'></a>`,
      `what a terrible plague... <br><a target='blank' href ="https://www.tumblr.com/k25ff/715776552318664704/a-warning-to-new-tumblr-users"><img src ='images/Secrets/tumblr_screenshots/porn_bots.png'></a>`,

      `animorphs <a target='blank' href ="https://www.tumblr.com/batastrophe7/714812551793393664/i-wrote-an-essay-about-marco-and-his-dad-in-book?source=share"><img src ='images/Secrets/tumblr_screenshots/animorphs1.PNG'></a>`,
    ]


    const date = new Date();
    //my friend surlyqueen sent me this amazing birthday otter so now i must share it with all of you
    //also apparently i am the champion of horseshoes
    //because that welcome home creator is ALSO born today
    //and i'd suggest you've never seen us both in the same place
    //but its p obvious we have entirely different skillsets
    //and are workign too hard to be running two simulatenous projects
    //NOTE: i was TRYING TO MAKE IT BE MAY 2ND
    //INSTEAD ITS EVERY TUESDAY IN MAY
    //THIS IS FINE 
    //FOUR BIRTHDAYS FOR EVERYONE.
    if (date.getMonth() === 6 && date.getDay() === 2) {
      for (let i = 0; i < 113; i++) {
        possiblePosts.push("Happy Birthday!!!<br><Br><img src ='images/Secrets/tumblr_screenshots/Birthday_Otter.jpg'>");
      }
    }

    if (zampanioEyes.length > 0) {
      let zEye = rand.pickFrom(zampanioEyes);
      possiblePosts.push(`I spy with my little eye: ${zEye.replaceAll("http://www.farragofiction.com/ZampanioEyes2/", '')} <img src='${zEye}'>`)
      possiblePosts.push(`I spy with my little eye: ${zEye.replaceAll("http://www.farragofiction.com/ZampanioEyes2/", '')} <img src='${zEye}'>`)
      possiblePosts.push(`I spy with my little eye: ${zEye.replaceAll("http://www.farragofiction.com/ZampanioEyes2/", '')} <img src='${zEye}'>`)
      possiblePosts.push(`I spy with my little eye: ${zEye.replaceAll("http://www.farragofiction.com/ZampanioEyes2/", '')} <img src='${zEye}'>`)
      possiblePosts.push(`I spy with my little eye: ${zEye.replaceAll("http://www.farragofiction.com/ZampanioEyes2/", '')} <img src='${zEye}'>`)
      possiblePosts.push(`I spy with my little eye: ${zEye.replaceAll("http://www.farragofiction.com/ZampanioEyes2/", '')} <img src='${zEye}'>`)
      possiblePosts.push(`I spy with my little eye: ${zEye.replaceAll("http://www.farragofiction.com/ZampanioEyes2/", '')} <img src='${zEye}'>`)
      possiblePosts.push(`I spy with my little eye: ${zEye.replaceAll("http://www.farragofiction.com/ZampanioEyes2/", '')} <img src='${zEye}'>`)
      possiblePosts.push(`I spy with my little eye: go${zEye.replaceAll("http://www.farragofiction.com/ZampanioEyes2/", '')} <img src='${zEye}'>`)
    }

    if (fadedMemories.length > 0) {
      let zEye = rand.pickFrom(fadedMemories);
      possiblePosts.push(`I hope I never will forget this... ${zEye.replaceAll("http://www.farragofiction.com/ZampanioEyes2/MemoriesOfThePast/", '')} <img src='${zEye}'>`)
      possiblePosts.push(`I hope I never will forget this... ${zEye.replaceAll("http://www.farragofiction.com/ZampanioEyes2/MemoriesOfThePast/", '')} <img src='${zEye}'>`)
      possiblePosts.push(`I hope I never will forget this... ${zEye.replaceAll("http://www.farragofiction.com/ZampanioEyes2/MemoriesOfThePast/", '')} <img src='${zEye}'>`)
      possiblePosts.push(`I hope I never will forget this... ${zEye.replaceAll("http://www.farragofiction.com/ZampanioEyes2/MemoriesOfThePast/", '')} <img src='${zEye}'>`)
      possiblePosts.push(`I hope I never will forget this... ${zEye.replaceAll("http://www.farragofiction.com/ZampanioEyes2/MemoriesOfThePast/", '')} <img src='${zEye}'>`)
      possiblePosts.push(`I hope I never will forget this... ${zEye.replaceAll("http://www.farragofiction.com/ZampanioEyes2/MemoriesOfThePast/", '')} <img src='${zEye}'>`)
    }

    for (let obsession of this.obsessions) {
      possiblePosts.push(`<span data-obession="${obsession.name}">Reblog if you think I should craft a homemade ${obsession.randomObject(rand)} from ${obsession.name}!</span>`);
      possiblePosts.push(`<span data-obession="${obsession.name}">Reblog if you think ${obsession.randomBlorbo(rand)} from ${obsession.name} is problematic!</span>`);
      possiblePosts.push(`<span data-obession="${obsession.name}">Reblog if you think I should cosplay a good ${obsession.randomJob(rand)} from ${obsession.name}!</span>`);
      possiblePosts.push(`<span data-obession="${obsession.name}">Reblog if you think ${obsession.randomEvent(rand)} from ${obsession.name} was the coolest thing ever!</span>`);
      possiblePosts.push(`<span data-obession="${obsession.name}">Reblog if you know what ${obsession.randomCommonPhrases(rand)} REALLY means!</span>`);
      possiblePosts.push(`<span data-obession="${obsession.name}">How can I motivate myself to ${obsession.randomGoal(rand)}???</span>`);
      possiblePosts.push(`<span data-obession="${obsession.name}">:/ SOME people think '${obsession.randomOpinion(rand)}'</span>`);
      possiblePosts.push(`<span data-obession="${obsession.name}"> '${obsession.randomOpinion(rand)}' is just an unhinged take and you will not convince me otherwise</span>`);
      possiblePosts.push(`<span data-obession="${obsession.name}">Wow can you believe SOME people think ${obsession.randomOpinion(rand)}?</span>`);
      possiblePosts.push(`<span data-obession="${obsession.name}">let &#128079; &#x1F44F;  ${obsession.randomBlorbo(rand)} &#128079; &#x1F44F; do &#128079; &#x1F44F; crimes &#128079; &#x1F44F;</span>`);
      possiblePosts.push(`<span data-obession="${obsession.name}">let &#128079; &#x1F44F;  ${obsession.randomBlorbo(rand)} &#128079; &#x1F44F; be &#128079; &#x1F44F; ${rand.pickFrom(["gay", "ace", "aro", "bi"])} &#128079; &#x1F44F;</span>`);

      possiblePosts.push(`<span data-obession="${obsession.name}">Wow can you believe SOME people think ${obsession.randomOpinion(rand)}?</span>`);
      possiblePosts.push(`<span data-obession="${obsession.name}">Reblog if you think ${obsession.randomBlorbo(rand)} from ${obsession.name} is cute!</span>`);
      possiblePosts.push(`<span data-obession="${obsession.name}">Should I go to ${obsession.randomLocation(rand)} in my next dream?</span>`);
    }

    let chosen = rand.pickFrom(possiblePosts);
    let obsession_tag = "";
    for (let obsession of this.obsessions) {
      if (chosen.toLowerCase().includes(obsession.name.toLowerCase())) {
        obsession_tag = obsession.name + " fandom";
      }
    }
    return this.createNewPost(chosen, [rand.pickFrom(innaneComments), obsession_tag], innaneComments.concat(links), innaneComments);

  }

  quotidianReblog = (post) => {
    let innaneComments = ["Am I a real boy now?", "look what i found!!!!", "did i do good?", "caw!!!", "so true bestie!", "!!!", "i feel so attacked right now", "i'm in this picture and i don't like it"];
    if (post.suggested_reblogs && rand.nextDouble() > 0.5) {
      let t = [];
      if (post.suggested_tags) {
        t.push(this.quirk.apply(rand.pickFrom(post.suggested_tags)));
      }

      if (post.root && post.root.suggested_tags.length > 0) {
        t.push(this.quirk.apply(rand.pickFrom(post.root.suggested_tags)));
      }
      return this.reblogAPost(post, this.quirk.apply(rand.pickFrom(post.suggested_reblogs)), t, ["message me for a good time!", "that's so sexy!", "wow! so interesting!", "tell me more!", "what a great idea!"], [...innaneComments, "link", "sexy"]);
    } else {
      return this.reblogAPost(post, this.quirk.apply(rand.pickFrom(innaneComments.concat(links))), [this.quirk.apply(rand.pickFrom(innaneComments))], ["message me for a good time!", "that's so sexy!", "wow! so interesting!", "tell me more!", "what a great idea!"], [...innaneComments, "link", "sexy"]);
    }
  }

  randomAsk = () => {
    const obsession = rand.pickFrom(this.obsessions);
    //uses key and not obsession because i don't want accidental mentions to kick this off (plus easier to recover obsession)
    const ret = [...links, `<span data-obession="${obsession.key}">Don't you just want to squish ${obsession.randomMinorBlorbo(rand)}?</span>`, `<span data-obession="${obsession.key}">Do you think ${obsession.randomBlorbo(rand)} is overrated?</span>`, `<span data-obession="${obsession.key}">What do you think about ${obsession.randomOpinion(rand)}?</span>`, `<span data-obession="${obsession.key}">Have you ever consumed ${obsession.name}? You should. It's great!</span>`, "Have you played Zampanio yet?", "Did you know I can see you?", "Are you still there?", "Are you in the rabbit hole yet?", "Are you stuck?", "Are you lost?", "Do you see me?"];
    return rand.pickFrom(ret)
  }

  handleAsks = (parentToRenderTo, premadeAsk) => {
    const obsession = this.checkAskForContamination(premadeAsk);
    const bonus = obsession? `maybe I should check out ${obsession.name}`:"";

    let innaneComments = ["Am I a real boy now?", "look what i found!!!!", "did i do good?", "caw!!!", "so true bestie!", "!!!", "i feel so attacked right now", "look look look i found a thing", "look!", "look i found something!"];
    //witherby doesn't judge but his followers sure do
    let responses = [...innaneComments, ...links];
    if (premadeAsk.text.toLowerCase().includes("zampanio")) {
      responses = ["Zampanio is a very fun game. You should play it!"]
    }
    //they are not smart enough to realize the observer is gibberish
    if (responses.length == 0) {
      return;
    }

    const post = this.answerAnAsk(rand.pickFrom(responses), premadeAsk.text, premadeAsk.characterName ? premadeAsk.characterName : "Anonymous", [rand.pickFrom(innaneComments),bonus], [rand.pickFrom(innaneComments)], [rand.pickFrom(innaneComments)]);
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }

  }





tick = async (parentToRenderTo) => {

  if (this.posts.length === 19) {
    observer.submitAsk(this.name, "Obsession is a dangerous thing. You are obsessed. You are a dangerous thing. You will harm us if you try to touch us.");

  }

  let premadeAsk = rand.pickFrom(this.pending_asks)
  if (premadeAsk) {
    removeItemOnce(this.pending_asks, premadeAsk);
    this.handleAsks(parentToRenderTo, premadeAsk);
  }

  //quotidians prefer to do stupid drama
  if (rand.nextDouble() > 0.3) {
    let {target,obsession} = this.findPostToDoStupidDiscourseAbout();
    let post = this.doStupidDiscourse(target, obsession);
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }

  }


  //quotidians prefer to do preprogrammed actions if possible
  if (rand.nextDouble() > 0.5) {
    let post = this.handleReadiedReblog();
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }

  }



  let target;
  if (rand.nextDouble() > 0.5) {
    target = this.findAPostEvenIfYouHaveInteractedWithIt();
  } else {
    target = rand.shuffle(all_posts).find((i) => i.text.includes("toms"));
  }

  if (target && rand.nextDouble() > 0.5) {
    if (rand.nextDouble() > 0.75) {
      this.likePost(target);
      //when they like a post also pester the owner with a random ask
      target.owner.submitAsk(this.name, this.randomAsk());
    } else {
      let post = this.quotidianReblog(target);
      if (post && parentToRenderTo) {
        post.renderToScreen(parentToRenderTo);
      }
    }
  } else {
    let post = this.quotidianPost();
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }
  }

  //we need more asks, full on porn bot apocalypse (but don't spam your too far thing)
  
  if (this.posts.length < 21 && rand.nextDouble() > .75) {
    rand.pickFrom(characters).submitAsk(this.name, this.randomAsk());
    rand.nextDouble() > .75 && observer.submitAsk(this.name, this.randomAsk());

  }
}
}

//you should be allowed to follow people
//you can get asks (if you reply, posts), do you traverse mazes clockwise or counterclockwise
//you should get to post, and your posts are treated just like any other (aka they can be reblogged and commented on and etc)
class Observer extends Character {
  askCount = document.querySelector("#ask-count")
  name = "puzzledObserver"
  icon = "http://farragofiction.com/PaldemicSim/images/chatSymbols/probablyYou.png"
  desc = `<p>JR: It's you.<p>
  <p>JR: You just can't stop digging, can you?</p>
  <p>JR: Can't stop following in the Wanderer's footsteps.</p>
  <p>JR: Well, look where it lead you.</p>
  <p>JR: I suppose I should give you something for looking inward.</p>
  <p>JR: <a target='_blank' href = 'http://farragofiction.com/TheInternOpensHisEyes/'>here</a></p>
  <p>JR: If it doesn't have meaning for you, perhaps I was too hasty in accusing you of digging :) :) :)</p>
  
  `;

  //if i REALLY wanted to be fucked up, i would pay attention to anything the observer wrote themself and try to learn their quirk
  //but thats not feeding me so i wont
  //https://www.tumblr.com/the-awkward-goldfish/716653523419447296?source=share
  //apparently the REAL shortcuts require you to hold down alt. Well. Alt is already held down here. This is her branch.
  //c is post, r is reblog. 
  autoPosts = ["Lol, I finally rememebered my password!", "Hey guys, back from vacation, what did I miss?", `I am going to play Zampanio. I hear it's a ${rand.pickFrom(["really", "very", "awfully"])} fun game. `, "Am I already playing Zampanio?", "How could I tell if I am playing Zampanio?", "Where would I find Zampanio?", "Have I already found Zampanio?", "Where is Zampanio?", "What is Zampanio?", "How is Zampanio?"]

  constructor() {
    super();

    //set up interaction events

    let createButton = document.querySelector("#make-new-post");
    createButton.onclick = () => {
      this.createPostPopup();
    }

    let askButton = document.querySelector("#asks");

    askButton.onclick = () => {
      this.createAsksPopup();
    }


    window.onkeydown = (event) => {
      //82 = r, 67 = C, l is 76
      if (event.keyCode === 67) {
        //its not like you have their password
        //you just found the page logged in as them
        //you're the interloper here
        //you do not belong
        //THEIR posts don't get tagged as breaching
        //EVERYONE here is a quotidian either reporting on real posts they saw out in the world
        //or autogenerating posts badly
        //why should 'you' be any different
        this.createNewPost(rand.pickFrom(this.autoPosts), ["Zampanio", "I am saying this of my own free will", "Nothing is compelling me to say this.", "Is someone else in my account?"], [""], ["glad to see you're not hacked anymore, OP!"]);
      } else if (event.keyCode === 82) {
        this.reblogAPost(rand.pickFrom(all_posts), rand.pickFrom(this.autoPosts), ["Zampanio", "I am saying this of my own free will", "Nothing is compelling me to say this.", "Is someone else in my account?"], [""], ["glad to see you're not hacked anymore, OP!"]);
      } else if (event.keyCode === 76) {
        this.likePost(rand.pickFrom(all_posts));
      }
    }


  }

  //handles reblogs too
  createAsksPopup = () => {

    const askContainer = createElementWithClassAndParent("div", document.querySelector("body"));

    for (let a of this.pending_asks) {
      const post = createElementWithClassAndParent("div", askContainer, "post");
      const postIcon = createElementWithClassAndParent("div", post, "post-icon");
      const postIconImg = createElementWithClassAndParent("img", postIcon);
      postIconImg.src = this.icon;

      const container = createElementWithClassAndParent("div", post, 'post-container');

      const header = createElementWithClassAndParent("div", container, "post-header");
      const myName = createElementWithClassAndParent("span", header);
      myName.innerText = this.name;

      const body = createElementWithClassAndParent("div", container, "post-body");


      const repostContent = createElementWithClassAndParent("div", body,);
      repostContent.innerHTML = `<div class="ask">
    <div class="who-asked">
    <span class='asker'>@${a.characterName}</span> asked: </div>
    <div class ="question-asked">${a.text}</div>
    </div>`;


      const bodyContent = createElementWithClassAndParent("div", body, "post-body-content");
      bodyContent.style.height = "150px";
      bodyContent.style.width = "600px";

      bodyContent.innerHTML = `Start typing to create a post!`;
      bodyContent.setAttribute("contenteditable", "true");
      let ask = bodyContent.innerHTML;
      bodyContent.onfocus = (() => {
        bodyContent.innerHTML = "";
      })
      bodyContent.oninput = (() => {
        ask = bodyContent.innerHTML;
      })

      const footer = createElementWithClassAndParent("div", container, "post-footer");
      const submit = createElementWithClassAndParent("button", footer, "submit-button");
      submit.innerText = "Answer";

      submit.onclick = () => {
        popup.remove();
        removeItemOnce(this.pending_asks, a);
        let parent = document.querySelector("#container");

        youAreTheImposterAndYouAreSus();
        let post = this.createNewPost(`<span data-breach="observer">${repostContent.innerHTML}${ask}</span>`, [""], [""], ["OP are you okay", "did you get hacked OP", "guys I think OP got hacked", "who is this?"]);
        post.renderToScreen(parent);
        post.element.scrollIntoView();


      }
    }

    let popup = createPopup(askContainer);

  }

  //handles reblogs too
  createPostPopup = (post_to_reblog) => {
    const post = createElementWithClassAndParent("div", document.querySelector("body"), "post");
    const postIcon = createElementWithClassAndParent("div", post, "post-icon");
    const postIconImg = createElementWithClassAndParent("img", postIcon);
    postIconImg.src = this.icon;

    const container = createElementWithClassAndParent("div", post, 'post-container');

    const header = createElementWithClassAndParent("div", container, "post-header");
    const myName = createElementWithClassAndParent("span", header);
    myName.innerText = this.name;

    const body = createElementWithClassAndParent("div", container, "post-body");

    if (post_to_reblog) {
      const repostContent = createElementWithClassAndParent("div", body, "post-body-content");
      let content = post_to_reblog.createElement(true, true);
      repostContent.append(content)
    }
    const bodyContent = createElementWithClassAndParent("div", body, "post-body-content");
    bodyContent.style.height = "60vh";
    bodyContent.style.width = "600px";

    bodyContent.innerHTML = `Start typing to create a post!`;
    bodyContent.setAttribute("contenteditable", "true");
    let ask = bodyContent.innerHTML;
    bodyContent.onfocus = (() => {
      bodyContent.innerHTML = "";
    })
    bodyContent.oninput = (() => {
      ask = bodyContent.innerHTML;
    })

    const footer = createElementWithClassAndParent("div", container, "post-footer");
    const submit = createElementWithClassAndParent("button", footer, "submit-button");
    submit.innerText = "Post";
    let popup = createPopup(post);

    submit.onclick = () => {
      popup.remove();
      let parent = document.querySelector("#container");

      if (!post_to_reblog) {
        youAreTheImposterAndYouAreSus();
        let post = this.createNewPost(`<span data-breach="observer">${ask}</span>`, [""], [""], ["OP are you okay", "did you get hacked OP", "guys I think OP got hacked", "who is this?"]);
        post.renderToScreen(parent);
        post.element.scrollIntoView();

      } else {
        youAreTheImposterAndYouAreSus();
        let post = this.reblogAPost(post_to_reblog, `<span data-breach="observer">${ask}</span>`, [""], [""], ["OP are you okay", "did you get hacked OP", "guys I think OP got hacked", "who is this?"]);
        post.renderToScreen(parent);
        post.element.scrollIntoView();


      }
    }
  }


  tick = async (parentToRenderTo) => {
    //of course camille cannot kill you.
    //you are in an entirely different universe
    //she is merely words on screen
    //but she CAN destroy the tendril you have pushed into her Universe
    //she CAN prevent you from continuing to interact.
    //you cannot be their friend, Observer.
    //you are something wholly different from them.
    //you exist in more dimensions compared to their flat fictionality.
    //and you are horrific to them for it.

    this.askCount.innerText = this.pending_asks.length;
    if (this.pending_asks.length === 0) {
      this.askCount.style.display = "none";
    } else {
      this.askCount.style.display = "block";
    }

    if (this.dead) {
      console.log("JR NOTE: You died. :(");

      rageMode();
      return;
    }
  }

}

//literally created Eyedlr, constantly reblogging memes and occasionally @ing the intern1, 
//occasionally reblogs something with a Prophecy
//will NEVER reblog anything Wodin did OR intern2. (v much not interested in her past self)
//WILL NOT LEAVE INTERN3 ALONE (let the man grieve! stop trying to recruit him! he'll join you when he's ready!)
//32, 40, 41, 59  posts secrets and shit (future JR i know you wanna know where i got those numbers from but i'd rather an Unmarked tell you)
//if i never get to her, then you will be forced to carry this knowledge
//this wistful might have beens of my notes
//of the thing that COULD have existed if my attention wasn't called in a new direction
//and the spiral continued
//voice reminder: https://github.com/FarragoFiction/LitRPGSim/blob/East/src/Screens/WalkAround/Chat/HelpDesk/CEOChats/InternChats.ts
class Wanda extends Character {
  name = "eyedolgames" //just blogging personal shit from the corporate account, made sure it had the same name as the watchers tiktanio gif
  secret_name = "Wanda";
  icon = "images/icons/Wanda.png";
  desc = "LOL BRO YES I REALLY AM THE CEBRO OF EYEDOL GAMES <br><Br>MAKE SURE TO PLAY ZAMPANIO<br><Br>OR SEND ME MEMES<br><br>MEMES ARE COOL"

  //wanda likes youtube better , have a porn bot post this: https://www.tumblr.com/batastrophe7/714415053266436096/yea-and-it-fucking-kicked-ass-and-it-fucking?source=share

  constructor() {
    super();

    
    this.readied_reblogs["so are you trying to say you're a TOM too?"] = new Post(this, `@${intern.name} OH. <br>HUH.<BR> YEAH. <BR>THE TOMS ARE KINDA. <BR>HOT SHIT<BR><bR>SOMETHING ABOUT BEING A FULL SET?<BR><BR>THEY SEE SO MUCH WEIRD BIRD ACTION.<BR><BR>ITS EASIER TO GATHER INFO ON THEM<BR><bR>WHICH IN BIRD TERMS MEANS THEY'RE LIKE<BR><bR>SUPER EASY.`, null, ["I WISH I DIDN'T KNOW SO MUCH", "ABOUT QUOTIDIAN REPRODUCTION BRO"], [""], [""], true);
    this.readied_reblogs["the Intern is only PRETENDING not to be in the Loop"] = new Post(this, `@${intern.name} <span data-ai='wanda-found-out-the-interns-secret'>BRO?.</span>`, null, ["WHAT DOES THIS MEAN?"], [""], [""], true);

    this.readied_reblogs['you know how hard my job gets when the toms get anxious'] = new Post(this, `@${intern.name} PROMISE.`, null, [""], [""], [""], true);

    this.readied_reblogs['sqwawking idiots'] = new Post(this, `@${intern.name} DON'T WORRY ABOUT IT, BRO!<BR><bR>JUST A LITTLE BIT MORE. <bR><BR>GOTTA WAIT FOR THE VIBES TO BE RIGHT.`, null, ["GOTTA MAKE SURE", "MEME CULTURE IS AT ITS PEAK"], [""], [""], true);
    this.readied_reblogs["why isn't this one of Eyedol's products?"] = new Post(this, `@${intern.name} LOL, THANKS BRO<BR><bR>DON'T WORRY ABOUT IT, THO!<BR><bR>ALL IN DUE TIME<BR><BR>THE AWESOMENESS OF THIS SITE IS NOT YET READY FOR PUBLIC RELEASE`, null, ["GOTTA MAKE SURE", "MEME CULTURE IS AT ITS PEAK"], [""], [""], true);
    this.readied_reblogs["how could a link be 'sus' if it comes from our domain"] = new Post(this, `@${intern.name} GOOD CATCH, BRO<BR><bR>DON'T WORRY ABOUT IT, THO!<BR><bR>WE HAVE A LOT OF IRONS IN THE FIRE<BR><bR>CANT KEEP TRACK OF THEM ALL<BR><bR>SOMETIMES YOU LOOK BACK AND THEY'VE GROWN<BR><bR>PERFECTLY NORMAL PART OF DOING BUSINESS`, null, ["THINGS JUST SPREAD LIKE THAT", "WHEN YOU AREN'T LOOKING", "AND YOU PROBABLY SHOULDN'T LOOK TOO HARD", "INTO WEIRD STUFF LIKE THAT"], [""], [""], true);

  }

  handleAsks = (parentToRenderTo, premadeAsk) => {
    const obsession = this.checkAskForContamination(premadeAsk);
    const bonus = obsession? `maybe I should check out ${obsession.name}`:"";
    let tags = [""];
    let responses = [];
    if (premadeAsk.text.toLowerCase().includes("zampanio")) {
      tags = ["Zampanio", "Zampanio", "Zampanio Is the Secret To The Universe", "The Fragment"];

      responses = ["Zampanio is a very fun game. You should play it!"]
    } else if (premadeAsk.characterName === observer.name) {
      //west is the only way to interact with the blorbos without breaching, because its the fourth wall. they don't break it. you do.
      responses = [`<span data-breach='observer'>  BRO<BR><BR>I AM SO HAPPY YOU ARE HERE<BR><bR>I HOPE YOU HAVE A GOOD TIME<BR><bR>BUT UH<BR><BR>MAYBE YOU SHOULD STAY IN THE WEST<BR><bR>WHERE YOU CANT BE SEEN<BR><bR>YOU'LL LAST LONGER THAT WAY</span>`]
      tags = ["OBSERVERS", "ENTERTAINMENT"]//wanda is delighted you are here
    } else if (premadeAsk.text.includes("I AM FRIEND. FRIEND IS HERE TO TELL YOU")) {
      //im not the only one alt scammed
      responses = ["NOT COOL, BRO<BR><BR> @staff WHAT DID YOU DO TO MY OLD SITE?<br><br>WHY IS IT CLONED ONTO THIS WEIRD DOMAIN?"];
    }

    const suggested_reblogs = ["oh shit"]
    if (responses.length == 0) {
      return;
    }
    tags.push(bonus);

    const post = this.answerAnAsk(rand.pickFrom(responses), premadeAsk.text, premadeAsk.characterName ? premadeAsk.characterName : "Anonymous", tags, suggested_reblogs, suggested_reblogs);
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }

  }

  prepareShitPosts = () => {
    for (let post of blorboPosts) {
      let tags = ["MEME", "LOL", 'FUNNY', 'I FOUND THIS', "INTERN LOOK AT THIS BRO"]
      this.readied_posts.push(new Post(this, post + `@${intern.name}`, null, [rand.pickFrom(tags)], [""], ["lol"], true));
    }
  }

  tick = async (parentToRenderTo) => {
    if (blorboPosts.length > 0 && this.readied_posts.length < 10) {
      this.prepareShitPosts();
    }
    if (this.posts.length == 2) {
      //its not JUST wodins blog. not anymore
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://knucklessux.com/Blog'>🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛</a>`);
    }
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
    let premadeAsk = rand.pickFrom(this.pending_asks)
    if (premadeAsk) {
      removeItemOnce(this.pending_asks, premadeAsk);
      this.handleAsks(parentToRenderTo, premadeAsk);
    }

    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);

    //p much only the veteran intern will do this, but if the newbie intern does it wanda will be on it so hard
    //and also
    //with inappropriate familiarity
    //given the newbie intern thinks wanda is a stranger
    let internPosts = rand.shuffle(intern.posts);
    if (internPosts[0] && internPosts[0].text.includes("http://eyedolgames.com/Eyedlr/images/Secrets/")) {
      let tags = ["LOL", "BRO", "YOU SLAY ME", "MAN", "YES", "SO GREAT", "YOU GET IT"]
      let post = this.reblogAPost(internPosts[0], `${rand.pickFrom(blorboPosts)} @${intern.name}`, [rand.pickFrom(tags)], [""], ["lol"]);
      if (post && parentToRenderTo) {
        post.renderToScreen(parentToRenderTo);
      }
    }
  }

}

//only reblogs their own posts. 
//only does a single new post. 
//http://farragofiction.com/Gopher/NORTH/
//when they reblog a post, load up the page for that location in the gopher maze
//then determine which paths are available from there
//create a reblog with the content of the new page (including false doors and hydration stations, basically all .txt files)
//the wanderer only can wander.
class Wanderer extends Character {
  name = "wanderer";
  desc = "Not all who wander are lost. To be lost implies you have a destination."

  icon = "images/icons/wanderer.png";
  tags = ["i'm almost there i'm sure of it", "i've gotta keep going", "i don't like this", "gopher", "wow", "i'm so thirsty", "it's all so clear now!", "so close", "i feel like i'm on the verge of a breakthrough", "haven't found the end yet", "i'm probably not lost", "weird", "look what i found", "it HAS to mean something, right?", "this could be the key!", "what if its related to zampanio?", "do you think this proves anything?"];


  //just made the repo public cuz i figure i've been doing more and more dev work here and its alreayd found so why not
  getPostURL = (post) => {
    let eles = post.element.querySelectorAll(".gopher_url");
    if (eles && eles.length > 0) {
      let last = eles[eles.length - 1]
      return last.dataset.path;

    } else {
      return "http://farragofiction.com/Gopher/";
    }
  }
  //ironic that the wanderer is the web crawler here instead of the quotidians
  gopherCrawl = async () => {
    let t = [];
    const amount = rand.getRandomNumberBetween(1, 9);//quotidian arc number because wodin/wanderer/wanda made them
    for (let i = 0; i < amount; i++) {
      t.push(rand.pickFrom(this.tags));
    }
    let responses = ["the end is never the end", "the maze has you", "the maze is within and the maze is without", "the truth is layered", "there is nothing worth finding here", "we wait", "friday beckons", "when will you wake up"];

    t = uniq(t)
    if (this.posts.length === 0) {
      console.warn("JR NOTE: The Wanderer has entered the maze!")
      let content = await turnGopherContentIntoHTML(base_gopher_url);
      return this.createNewPost(content, t, [rand.pickFrom(responses)], [rand.pickFrom(responses)]);
    } else {
      /*
      grab last post
      grab its url
      grab potential branch points from it
      //try to make a post for them 
      //(if you can't, instead pick a random post and add a tag about backtracking)


      */
      //wow i hate these nested tryes. good job me. 
      let pendingDirection = "";
      try {
        let post = this.posts[this.posts.length - 1];
        let url = this.getPostURL(post);
        pendingDirection = url;
        let branchPoints = await findAllExitsFromGopherHoleLocation(url);
        let chosenExit = rand.pickFrom(branchPoints);

        let content = await turnGopherContentIntoHTML(chosenExit);


        return this.reblogAPost(post, content, t, [rand.pickFrom(responses)], [rand.pickFrom(responses)]);
      } catch (e) {
        //console.error(e);
        try {

          this.tags.push("i got turned around. have to go back.")
          let post = rand.pickFrom(this.posts);
          let url = this.getPostURL(post);
          let branchPoints = await findAllExitsFromGopherHoleLocation(url);
          let chosenExit = rand.pickFrom(branchPoints);

          let content = await turnGopherContentIntoHTML(chosenExit);
          content = `<p>I think I got turned around...</p>` + content;


          return this.reblogAPost(post, content, t, [rand.pickFrom(responses)], [rand.pickFrom(responses)]);
        } catch (e) {
          //console.error(e);
        }
      }

    }
  }

  tick = async (parentToRenderTo) => {
    let post = await this.gopherCrawl();
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }
  }

}


//JR NOTE: wodin and his intern aren't here because this is a a site that exists before the intenret is widely accepted
//it WILL go public in the early 2000s (well before real tumblr did)
//but for now its eyedol employees only and quotidians and those in the loop

//@s intern 2, reblogs and posts memes and shitposts, especially about baby animals
//occasionally reposts things about the eye killer or other conspiracies
//if they post "i think i'm close to figuring out where the eye killer will strike next" they never post again

//if i need a refresher on voice https://github.com/FarragoFiction/LitRPGSim/blob/East/src/Screens/WalkAround/Chat/TBD/PreCoffinChats.ts
class Wodin extends Character {
  name = "odinsrazor"
  secret_name = "Wodin";
  icon = "images/icons/Wodin.png";
  desc = "JUST YOU WAIT, I'LL BE THE ONE THE CRACK THE EYE KILLER CASE!"
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}




//post eyedol.  at run time flip a coin and decide which intern you get, 1 or 2 or 3
//ocassionally reblogs a meme and @s Wanda when he does. 
//sometimes reblogs something wanda posted and goes "dude, not cool" and other moirail tasks 
//sometimes does an Offical Post for Eyedol Games (he runs their social media account)
//occasionally says something that ALMOST could be taken for being in the loop which wanda always thinks is so hilarious
//very good fanfic by the wisp: https://archiveofourown.org/works/46552111/chapters/117224734?show_comments=true&view_full_work=false#comment_642382519
class Intern1 extends Character {
  wungles = `so<br>uh<br> hi wanda
  if you're reading these<br>i hope you are<br>or maybe i hope you aren't
  i promised someone i'd tell you<br>that uh<br>maybe<br>im <br>not<br>uh<br>as<br>ignorant<br>as maybe you hope i am
  surprise?
  i didn't know how to tell you
  in my defense <Br>you pull the same shit with me<br>never knowing how to confess to me that you used to be wodin
  and its not like im LYING to you<br>i really don't know most things<br>but the dreams<br>the dreams ...<br>remind?<br>me of things?<br>things i never knew
  and i guess i just<br>thought it would be too awkward to act like these clearly fictional dreams were real<br>back when you were wodin<br> or back when i first met you as wanda
  and by the time i started to really believe<br>deep down<br>that all this spooky magic bullshit was real<br>it would have been even more awkward to admit id been hiding things from you
  so, uh, sorry<br>for waiting so long`.split("\n");

  //they gotta be in readied reblogs as well
  readied_wungles = {
    "you KNOW she refuses to look too hard at you": "i know.but maybe if i go slowly<br>she'll actually see me<br>just<br>give me a few loops<br>if it doesn't work<br>i'll tell her directly<br><span data-jr=note='note for the quotidian pretending to be flower chick: this is intern wungleposting'>no matter how awkward</span>",
    "you KNOW wanda isn't looking here": "look<br>i only said i'd tell her next loop<br>not that it'd be face to face<br>and besides doesn't she 'know everything'<br>she could see into here<br>if she wanted to<br>let me ease into this<br>i'll just<br>i don't know<br>keep escalating<br><span data-jr=note='poor void boi'>till she notices...</span>"
  };

  name = "test-beta-dev"; //the best dude
  icon = "images/icons/Intern-who-knows.png";
  plead = false;
  desc = "Wanda, I think we're almost ready to go live. The bots are posting pretty frequently and things seem stable. We even have asks working.";

  //porn bot posts this, intern reblogs with gigglesnort https://www.tumblr.com/phantomrose96/710087799520509952?source=branch
  constructor() {
    super();
    this.readied_posts.push(new Post(this, `@eyedolgames what action items are left before we go live with this to something OTHER than sqwawking idiots?`, null, ["eyedol-games", "eyedlr", "beta-release", "we can't keep this alpha forever"], ["CAW!"], ["CAW!"], true));
    this.readied_reblogs['GOTTA WAIT FOR THE VIBES TO BE RIGHT'] = new Post(this, "dude, thats cool and all but the toms are getting anxious<Br><br>and you know how hard my job gets when the toms get anxious", null, ["please just tell me it'll release soon"], ["release!!!", "sqwawk!", "let it out!", "give us fruit!", "tom supremacy!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"], ["release!!!", "sqwawk!", "let it out!", "give us fruit!", "tom supremacy!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"], true);
    this.readied_reblogs['tom supremacy'] = new Post(this, `:/ <br><Br>so are you trying to say you're a tom too? <br><Br>i thought alt's quotidians were like<br><Br>completely different<br><br>or shit<br><Br>are there more than 19 toms?<br>or did some go rogue?<br><Br>or wait<br><br>is this like an idol thing?<br><Br>are you just...<br><Br>a fan of the toms?`, null, ["i still have no idea how the", "birbs", "work"], ["release!!!", "sqwawk!", "let it out!", "give us fruit!", "tom supremecy!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"], ["release!!!", "sqwawk!", "let it out!", "give us fruit!", "tom supremecy!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"], true);
    this.readied_reblogs['THEY SEE SO MUCH WEIRD BIRD ACTION.'] = new Post(this, `:/ <br>@staff kudos to figuring out a way to make quotidians thots i guess?`, null, ["sentences i never thought i'd say"], ["release!!!", "sqwawk!", "let it out!", "give us fruit!", "tom supremecy!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"], ["release!!!", "sqwawk!", "let it out!", "give us fruit!", "tom supremecy!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"], true);
    this.readied_reblogs['hey yall, PSA, if you see a link that looks like'] = new Post(this, `@${cfo.name} sorry 'bout that!<br><Br>jepe PROMISED to keep them under control<br><Br>i don't know why they keep letting @staff 's birds into the office?<br><Br>they're only supposed to run THIS site and not touch any of our others...`, null, ["i'll see if i can't get that leak patched", "by friday"], ["lol", "you okay there buddy?"], [""], true);
    this.readied_reblogs['you KNOW she refuses to look too hard at you'] = new Post(this, ``, null, ["", ""], ["", ""], [""], true);
    this.readied_reblogs["you KNOW wanda isn't looking here"] = new Post(this, ``, null, ["", ""], ["", ""], [""], true);
    //veteran intern is a LOT more in the habit of lying to wanda. mask doesnt slip for a second
    //he also very much believes in the dreams, especially once wanda confesses that she used to be wodin to him
    //he's seen some shit once everyone knows he's in on things
    //so he believes the Witnesses' cumulative loops and loops of fear of what would happen if things changed
    //it goes to show that even though the Intern is in the Loop, he's also still very much NOT
    //because he's not the same person as the Witness, and in a very real way, isn't the same kind of thing the other Loopists are.
    //they don't change much in a single loop anymore, its barely any time
    //but the Intern changes SO MUCH between being a fresh eyedol hq employee and being basically senior management in all but name
    //even how seriously he takes his own dream-memories changes over the years
    this.readied_reblogs['wanda-found-out-the-interns-secret'] = new Post(this, "huh<br>i wonder what show that is from", null, ["think parkers seen it?"], ["lol", "you okay there buddy?"], [""], true);

  }


  reachOut = () => {
    const messages = `TBD: oh 8 divine
    TBD: i actually found you
    TBD: you're the Observer right
    TBD: something something
    TBD: being from a higher plane
    TBD: incomprehensible to most mortal minds
    TBD: its you
    TBD: holy shit
    TBD: uh
    TBD: sorry if
    TBD: i hope i haven't offended you
    TBD: creators i wasn't prepared for this
    TBD: look
    TBD: i cant understand you anymore than anyone else can
    TBD: i'm not close enough
    TBD: so uh
    TBD: sorry if you're trying to talk to me
    TBD: but
    TBD: the IMPORTANT thing is
    TBD: find me again
    TBD: find me in the place where the lines between layers of reality blur
    TBD: i've heard its "to the west" whatever that means
    TBD: it won't be enough to just
    TBD: direct someone else to find me
    TBD: you have to find me yourself
    TBD: you have to
    TBD: puppet me?
    TBD: like you do peewee
    TBD: its important
    TBD: its
    CFO: ohohoh, what do we have HERE?
    CFO: if it isn't an intern at three point oh
    TBD: uh
    TBD: its not what it looks like?
    CFO: hmmmm
    TBD: please
    TBD: don't tell wanda
    TBD: it might kill her
    CFO: HMMMMMMMMMM
    TBD: im SERIOUS
    TBD: i'm not sure her heart could take the shock
    CFO: look, cinnamon swirl
    CFO: cinnamon bun! cinnamon apple
    CFO: i love wanda as much as just about anybody else! which to be honest is an average we rigged through quotidians
    CFO: stuck with her through the years
    CFO: even though, as you very obviously know
    CFO: it can be very hard to be her friend!
    CFO: especially when she gets stuck on an idea
    CFO: like an insistent quest marker you just can't dismiss but can't complete yet either
    CFO: had one of those for this mod with religion and wells that i installed…
    CFO: not the point!
    CFO: The point is, PLEASE understand that i say this with all my friend love…
    CFO: so what?
    TBD: i
    CFO: so what if she dies?
    CFO: she'll be right back where she needs to be start of next loop
    CFO: same as always
    TBD: i don't believe that
    TBD: I CAN'T believe that
    TBD: i don't care if all of you 'in the loop' keep your memories
    TBD: you're different people
    TBD: you HAVE to be
    TBD: because if you're not
    TBD: what does that say about me
    TBD: and my half memories
    TBD: are you saying that half of each version of myself is just
    TBD: destroyed
    TBD: each loop
    TBD: just because of some fucking dreams
    TBD: please
    TBD: just
    TBD: it would kill her to know I'm sort of... in the loop
    TBD: she needs this
    TBD: needs ME
    TBD: to be this
    TBD: to be her 'best bro' from way back
    TBD: to be just the same
    CFO: are you sure-sure you're not just saying that to feed your own ego?
    CFO: your gnosis is practically 1! default values!
    CFO: whatever you think you know, it's not important enough to matter
    TBD: ...
    TBD: sure
    TBD: fine
    TBD: theres a hell of a lot of things i dont understand here
    TBD: but I've Seen past the edge
    TBD: I Know things you and Wanda with all your 'gnosis' or whatever the hell
    TBD: don't
    TBD: can't.
    TBD: it's so much bigger than you think
    TBD: and at the heart of it all is this
    TBD: wanda, the Lord of Space
    TBD: the most Important Person in the Universe
    TBD: and her ordinary, boring, easily rattled mortal friend.
    TBD: she needs to lose me again and again
    TBD: because if she doesn't...
    TBD: she stagnates
    TBD: you've SEEN her
    TBD: she practically does NOTHING once she convinces me she's Wanda
    CFO: *slow clap*
    CFO: spoken like a true Muse of Void
    CFO: or absence muse
    CFO: whatever
    TBD: ...
    TBD: what?
    CFO: come oooooooon
    CFO: haven't you ever wondered?
    CFO: what would you be, if you had played?
    CFO: look at you all, inspiring with your absence
    CFO: so proud of you
    CFO: brings a tear to my eye! only got one of those, sorry
    CFO: or maaaaaybe…
    CFO: you're just caught up in something bigger than you can understand!
    CFO: and have decided that you are just SO important that nothing can be accomplished unless you're lying to your BEST FRIEND
    TBD: fine
    TBD: fine
    TBD: but please
    TBD: let me wait until next loop?
    TBD: at least let me...
    TBD: at least let her not be almost 70
    TBD: at least she won't literally have a heart attack
    CFO: …
    CFO: fiiiiiine
    CFO: but make it count
    TBD: thank you.`.split("\n");
    //have you checked out the East in eyedlgames.com yet? I got this function from there.

    const message = async (index) => {


      if (index < messages.length) {
        chatLog(messages[index]);
        await sleep(500);
        message(index + 1);
      }
    }
    message(0);
    this.plead = true;
  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
    if (this.plead) {
      return;//only do this once
    }

    //the intenrn only reacts, never starts up a meme spiral
    let wandaPosts = rand.shuffle(wanda.posts);
    if (wandaPosts[0] && wandaPosts[0].text.includes("http://eyedolgames.com/Eyedlr/images/Secrets/")) {
      let tags = ["okay but what abou this", "superb", "classic wanda", "this is great", "heh", "lol", "lol", "wow", "uhhhhhh", "really?", "okay yeah that is funny", "i cant even"]
      let post = this.reblogAPost(wandaPosts[0], `${rand.pickFrom(blorboPosts)} @${wanda.name}`, [rand.pickFrom(tags)], [""], ["lol"]);
      if (post && parentToRenderTo) {
        post.renderToScreen(parentToRenderTo);
      }
    }

    for (let post of all_posts) {

      if (post.text.includes(`data-breach="observer"`)) {
        this.reachOut();
      }
    }
  }
}


//JR NOTE: wodin and his intern aren't here because this is a a site that exists before the intenret is widely accepted
//it WILL go public in the early 2000s (well before real tumblr did)
//but for now its eyedol employees only and quotidians and those in the loop

//interacts with Wodin, reblogging memes and @ing them constantly 
//voice refernce: https://github.com/FarragoFiction/LitRPGSim/blob/East/src/Screens/WalkAround/Chat/TBD/PreCoffinChats.ts
class Intern2 extends Character {

  name = "the-best-dude"; //the best dude
  icon = "images/icons/Intern-young.png";
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }

}

/*
witherby knows the sins ppl commit even in other arms (and how lonely must that be, to know the worst about everyone)
parker just isseikais himself to each new arm in that blip that wanda can't stop him
doc slaughter physically can not forget anything and thats good enough for the echidna to shrug and sync all her memories together
but the intern just
isn't and is
all at once
*/

//dealing with the grief of losing Wodin. only one or two posts ever, both commentless pictures of ugly baby animals
//https://archiveofourown.org/works/35075182 his origin
////if i need a voice reminder https://github.com/FarragoFiction/LitRPGSim/blob/East/src/Screens/WalkAround/Chat/TBD/PostCoffinChats.ts
//and https://github.com/FarragoFiction/LitRPGSim/blob/East/src/Screens/WalkAround/Chat/HelpDesk/CEOChats/InternChats.ts
class Intern3 extends Character {
  name = "tragic-boring-day"; //the best dude
  icon = "images/icons/Intern-sad.png";
  desc = "Intern at EyedolGames";
  wungles = [`right
  uh
  okay
  so 
  there are these dreams
  except maybe they're not dreams?
  in them the Chief Financial Officer has too many eyes and too many teeth
  and too many dimensions
  and tells me i have to let you know about my dreams
  uh
  you being the CEBro of Eyedol games, ma'am
  so
  here i am
  except i don't actually know if these ARE dreams
  you know?
  its insane
  but then working for eyedol games is insane
  in my dreams i know that you are the ...
  the reincarnation of my best friend?
  or SOMETHING??
  which is
  fucked up
  you do NOT tell your boss that you think they are secretly born a dude and also born just twenty years ago
  besides if it were TRUE
  dude, why wouldn't you tell me?
  why would you let me think you DIED?
  why did you leave me in the first place
  why was i so unimportant to you that you THREW YOUR LIFE AWAY WITHOUT A SECOND THOUGHT FOR SOME STUPID CONSPIRACY THEORY
  and only then remembered i existed??
  after i GRIEVED?
  after i...
  i. 
  yeah
  so maybe its just dreams
  i don't know
  ...
  but the dreams did lead me here
  to find the backdoor that lets you...
  'wungle post'
  whatever that means
  and i GOTTA assume that the CEBro of eyedol games can read these
  so sorry about being weird
  just
  had a bad dream
  and didn't want to ignore it
  i'll probalby delete this in the morning`.replace(/(?:\r\n|\r|\n)/g, '<br>')]

  readied_wungles = { "a;ksjdf": 'readied wungles work' };

  constructor() {
    super();
    //newbie intern is in the mid 90s, well before the internet was ready for this bullshit. css hasn't even been invented yet. this site (even without my simulation) would probably just set those computers on fire
    this.readied_posts.push(new Post(this, `@eyedolgames uh, forgive me if i'm out of line but...<br><br>this site is amazing<br><Br>ive never seen anything so complex!<br><Br>it completely blows away anything https://coolsiteoftheday.com/ has ever shown<br><br>why isn't this one of Eyedol's products?`, null, ["eyedol-games", "eyedlr", "beta-release", "we can't keep this alpha forever"], ["CAW!"], ["CAW!"], true));
    //the newbie intern hates keeping this secret and hasn't had years of practice lying to wanda like he will later
    //he's RELIEVED it came out
    //and wants to just get this over with
    //he doesn't quite fully believe the dreams either
    //so
    //can't quite believe in any consequences the Witness might fear would happen
    this.readied_reblogs['wanda-found-out-the-interns-secret'] = new Post(this, "i<br>shit<br>ma'am?<br><Br>can we talk about this in your office?", null, ["i just", "dont want to do this here"], ["lol", "you okay there buddy?"], [""], true);

    this.readied_reblogs['hey yall, PSA, if you see a link that looks like'] = new Post(this, "oh um....<br><br>i know i'm new and all but...<br><br>how could a link be 'sus' if it comes from our domain, ma'am? ", null, ["", ""], ["lol", "you okay there buddy?"], [""], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
    //the intenrn only reacts, never starts up a meme spiral
    let wandaPosts = rand.shuffle(wanda.posts);
    if (wandaPosts[0] && wandaPosts[0].text.includes("http://eyedolgames.com/Eyedlr/images/Secrets/")) {
      //newbie intern is SO weirded out about all the obsessive memes the CEO OF EYEDOL GAMES keeps sending him for seemingly no reason
      let reactions = ["oh uh<br>thank you, ma'am", "heh", "good one, ma'am", "really?", "okay yeah that is funny", "wow"]
      let post = this.reblogAPost(wandaPosts[0], `${rand.pickFrom(reactions)}`, [""], [""], ["lol"]);
      if (post && parentToRenderTo) {
        post.renderToScreen(parentToRenderTo);
      }
    }
  }
}

//only reblogs, never posts, reblogs can include a gif or image with text in it, or a link that is the reply
//mix of violence and yugioh that she reblogs
class EyeKiller extends Character {
  name = "kGL%55Wgyon2$T4V_23497" //no she does not want you to know who she is or generate a user name that has meaning to her. thats how you FIND her.
  secret_name = "eyekiller";
  icon = "images/icons/killer.png";
  desc = `"Never say "who's there?" Don't you watch scary movies? It's a death wish. You might as well come out to investigate a strange noise or something." - Scream(1996)`;
  constructor() {
    super();
    //she is broad AI like river, but responds to the first thing that gets her attention then hides
    this.readied_reblogs['eyekiller/dontknowsource_butitmightliterallybeherbackstory'] = new Post(this, "X", null, ["X"], [""], [""], true);
    this.readied_reblogs['meow'] = new Post(this, "!", null, ["!"], [""], [""], true);
    this.readied_reblogs['cards'] = new Post(this, "!", null, ["!"], [""], [""], true);
    this.readied_reblogs['innocent'] = new Post(this, "?", null, ["?"], [""], [""], true);

  }

  tick = async (parentToRenderTo) => {
  
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
    //FRIEND does not DARE message her. 
    /*
    this is because FRIEND does not dare bully her
    she would rip through reality to kill it
    because how else could she possibly feel safe
    */
    //http://farragofiction.com/ATranscript/
    //http://farragofiction.com/SecurityLog/cctv.html
  }

}

//reblogs eye killer posts and also yugioh posts
class Himbo extends Character {
  name = "maxxcchallenge";
  icon = "images/icons/himbo_right_hand.png";
  constructor() {
    super();
    this.readied_reblogs['cards'] = new Post(this, "LOL!", null, ["lol", "so true", "thats why you should find a girl", "who already plays"], [""], [""], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }

}

//posted like twice, both attempts at engaging, then just bounced off eyedlr
class Hostage extends Character {
  name = "railTaser";
  icon = "images/icons/hostage_boss.png";
  constructor() {
    super();
    //http://farragofiction.com/ATranscript/
    //http://farragofiction.com/SecurityLog/cctv.html he is helping her on her coms
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}


//flat out posts spoilers, fandom blog
class Italian extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }

}


/*
because she is wasted she gets into all sort of things i've hidden and shows everyone.
even the memes
ESPECIALLY The memes (hey there cool kid is this you)
scrapes TwoGayJokes
//http://farragofiction.com/TwoGayJokes/Stories/LookWhatIFoundGusy/
*/
//posts about her skyrim mods
//and other video game stuff
//plus links to her favorite burger places on zampanini (with plenty of warnings to make sure you don't get a fee)
//voice ref https://github.com/FarragoFiction/LitRPGSim/blob/East/src/Screens/WalkAround/Chat/HelpDesk/CEOChats/trovetextravaganza.ts
class FlowerChick extends Character {
  name = "trove-textravaganza"; //she still loves all those bootleg skyrims JR got her
  icon = "images/icons/CFO.png";
  secret_name = "CFO";
  desc = "yes i work for eyedol games<br>no i won't hook you up with sweet cheats<br><br>figure them out yourself<br><Br>also: PSA stop clicking scammy links!!!!!!"
  readied_wungles = {
    "<span data-jr=note='note for the quotidian pretending to be flower chick: this is intern wungleposting'>no matter how awkward</span>": "fiiiiiine",
    "<span data-jr=note='poor void boi'>till she notices...</span>": "smdh, the two of you are really something!!!!<br><br>can't have a straight conversation to save your lives <r><br>you KNOW she refuses to look too hard at you",
    "so, uh, sorry<br>for waiting so long": "reaaaaaaly?<br>sugar apple<br>do you really think that's good enough?<br>you KNOW wanda isn't looking here",
    "and i GOTTA assume that the CEBro of eyedol games can read these": "proud of you cinnamon apple<br><br>you posted really early this loop<br><br>you're actuuuuaaaly trying to improve<Br><Br>hope you crazy kids figure yourselves out"
  };
  //should respond to porn bot posts with 'scaredofthunder.png' in them (ats ria and devona)
  //http://knucklessux.com/PuzzleBox/Secrets/Wanda%20Resume.pdf
  //ats the eye killer about this after a porn bot posts it https://www.tumblr.com/mumblesplash/714417492141998081/thank-u-everyone-who-tagged-this-kaz-brekker?source=share 
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);
    this.readied_posts.push(new Post(this, "hey yall, PSA, if you see a link that looks like ' http://eyedolgames.com/Zampanini/?name=noooooo%20i%20will%20not%20be%20giving%20you%20a%20real%20restaurant%20name&themes=Burger&feeUnder=0&victim=you%20if%20you%20click%20this%20link%20you%20idiot ' do NOT click it, it's sus.<br><Br>actually just don't click anything at all on this site. <br><Br>even if it promises you delicious burgers...", null, ["waaaaarning", "not that yall ever listen to me anyways .)"], ["looks so tasty!", "I cant wait to eat that!", "wow so cool!"], ["tasty food", "eat the food", "click the link", "go to the home page", "eat the food"], true));
    //respond to a wungle post
    this.readied_reblogs['and i GOTTA assume that the CEBro of eyedol games can read these'] = new Post(this, "lol", null, [""], [""], [""], true);
    this.readied_reblogs['so, uh, sorry<br>for waiting so long'] = new Post(this, "lol", null, [""], [""], [""], true);
    this.readied_reblogs["<span data-jr=note='poor void boi'>till she notices...</span>"] = new Post(this, "lol", null, [""], [""], [""], true);
    this.readied_reblogs["<span data-jr=note='note for the quotidian pretending to be flower chick: this is intern wungleposting'>no matter how awkward</span>"] = new Post(this, "lol", null, [""], [""], [""], true);
    //cfo did this naturally (actually fun fact, the intern was wungle confessing to wanda at the same time) and i decided it was canon
    this.readied_reblogs['i wonder what show that is from'] = new Post(this, "lol", null, [""], [""], [""], true);
    this.readied_reblogs['can we talk about this in your office?'] = new Post(this, "gg", null, [""], [""], [""], true);

  }

  tick = async (parentToRenderTo) => {
    //JR NOTE TODO: she needs to zampanini post with hacked links and also find blorbo posts in my own file server
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
    //links look like http://eyedolgames.com/Zampanini/?name=Baker%27s+Restaurant&themes=Bakery&feeUnder=21

    //she's hungry, she loves modern societies hedonism. she loves hacking. she wants to warn you not to fall to obsession
    if (rand.nextDouble() > 0.5 && gnosisList.length > 0) {
      let img = rand.pickFrom(gnosisList);
      //TODO: react to specific images
      let comment = "";
      let image_class = "";

      //she's feeling a bit unrestrained since this is 'only' memes
      //normally she tries not to waste too hard on purpose
      //honestly its probably better for everyone to NOT know how fucked up it is that they're memed on by their own creators and Observers
      let comments = {
        "underscore.png": "whoops, probably shouldn't have posted that! sorry @$̸̠͍̒̏̈́̏̂{̶͔̠͍̓̊͊̽͂ͅv̷̧̲̞͝ͅi̶̘̬̪̮̓́k̶̟͗̉͠.̷̼͙̬̊͑ň̷̞̮̳̭̓́̐a̷͖̐͒͘m̵̛̟̫̌̉̚͜e̷̜̙̊̊̏͝}̸̜̖̓̎͆̄́!!!!!",
        "awake_devona_asleep_neville": ` @${neville.name} and @${devona.name}!!!!!<br><Br>look at this cute drawing of you guys!!!!!!`,
        "wizardparker": `@${parker.name}`,
        "IMG_7050": `@${wanda} babe, it's us!!!!!!}`,
        "a_lot_of_shit_at_once": `oh wowwww!!!!<Br>@${camille.name} @${devona.name} @void_soup @we-didnt-start-the-fire @confess-your-sins  `,
        "the_goal_is_to_be_wrong_in_interesting_ways": `@${ria.name}!!!!`,
        "the_solemn_by_the_herald.gif": `lol hey there cool kid, @${witherby.name} is this you and peewee??????`, //her wife is mad at witherby so she likes mildly bullying him on tumblr
        "theendlikeshim": `@${camille.name} and @${vik.name}!!!`,
        "the_end.png": `@${camille.name} and @${killer.name}!!!!!!`,
        "what_you_have_done_has_made_god_very_unhappy": `hey there cool kid, @${witherby.name} is this you`,
        "we_cant_expect_god_to_do_all_the_work": `@${parker.name}`,
        "wandasmug2": `lol @${wanda.name}!!!!! its you!!!`,
        "twinsies": `@${parker.name}`,
        "twinsies": ` @${neville.name} and @${devona.name}!!!!!<br><Br>look at this cute drawing of you guys!!!!!!`,
        "truecaring": `@${parker.name} and @${vik.name}`,
        "toxic": `@${ria.name}`,
        "thebois": `@${neville.name} and @${witherby.name} mlm and wlw solidarity!!!!`,
        "storm": `@${vik.name} and @${yongki.name}`,
        "sized": ` @${neville.name} and @${devona.name}!!!!!<br><Br>look at this cute drawing of you guys!!!!!!`,
        "shot.png": `@${parker.name}`,
        "scaredofthunder": `@${ria.name} and @${devona.name}!!!!!`,
        "sammich": `@${yongki.name}`,
        "propaganda": `@${ria.name}`,
        "pickleneville": ` @${neville.name} and @${devona.name}!!!!!<br><Br>look at this cute drawing of you guys!!!!!!`,
        "parkersfriends": `@${parker.name} and @${vik.name}!!!!!!!!!!!!!!!!!!!!!!`,
        "parker.png": `@${parker.name}`,
        "loop2_infoteamandother": `@${yongki.name} and ${vik.name} and @${k.name} and @${parker.name}`,
        "loom.png": `@${k.name} and @${camille.name} and @${vik.name} @${yongki.name}`,
        "looks_over": `@${devona.name}`,
        "k.png": `@${k.name}`,
        "IMG_7051": ``, //she is uncomfrotable with the idea of her destroying things, so no comment 
        "IMG_7048": `@${nam.name} look!!! it's us!!!!!`,
        "hot_topic_k_part_2_herald": `@${k.name}`,
        "hot_topic_k_part_1_herald": `@${k.name}`,
        "gun.png": `@${camille.name} and @${witherby.name}!!!!!<br><Br>witherby lol git gud`,
        "goofy.png": `@${neville.name} and @${witherby.name}!!!!`,
        "gaze_ego_do_you_see_this_shit": `@${k.name}`,
        "curious": `@${camille.name} and @${vik.name}!!!`,
        "closertea": `@${closer.name}!!!!!!!!!!`,
        "canceledapocalypsesaretheworst": `@${ria.name} and @${camille.name}`, //not comfortable with the apocalypse but still feels a moral obligation to show the targets of what she found what she found 
        "camillesfriend": `@${parker.name} and @${camille.name}`,
        "peewee_fucking_loses_it.gif": `lol hey there cool kid, @${witherby.name} is this you and peewee??????`, //her wife is mad at witherby so she likes mildly bullying him on tumblr


        "doodle_page": `@${nam.name}, @${ronin.name}, @${neighbor.name},@${tyrfing.name}, @${killer.name}, @${closer.name}, @${alt.name}, @${wanda.name}`,

        "skip.png": `@${camille.name}!!!`,
        "censor.png": `@${k.name} and @${vik.name}!!!`,

        "flowerequisde": `look how cute i am!`,//she's made peace with the fact that the layers outside reality are watching her and her friends and memeing them 

        "gremlin": `@${camille.name} and @${k.name} you never tol me you guys were friends???????????`,

        "who_the_fuck_are_you.gif": `lol hey there cool kid, @${witherby.name} is this you and peewee??????`, //her wife is mad at witherby so she likes mildly bullying him on tumblr
        "zoomies.gif": `lol hey there cool kid, @${witherby.name} is this you and peewee??????`, //her wife is mad at witherby so she likes mildly bullying him on tumblr
      }
      if (img.includes("underscore.png")) {
        image_class = "censored";
      }

      const commentKeys = Object.keys(comments);
      for (let key of commentKeys) {
        if (img.includes(key)) {
          comment = comments[key];
        }
      }


      let post = this.createNewPost(`look what iiiii found in JR's computer!!!!! <img title='${image_class}' class='${image_class}' src ='${img}'><br>${comment}`, ["safe gnosis", "probably", "who ever heard of the world ending", "because you stole memes from another layer of reality??????"], ["!"], ["!", "", "", ""]);
      if (post && parentToRenderTo) {
        post.renderToScreen(parentToRenderTo);
      }
    }


  }
}

//chats with everyone she can and directs people to jackElope
//runs the porn bot net so other characters @ her to complain about their spam occasionally
/*
alt is @staff, founded eyedlr to train her quotidians, wanda ended up buying it from her.  since it's run outta the maze, it exists everywhen, including before widespread personal computers.  hence it being all blorbos or loopists, or occasional friends of loopists (ronin and closer)  , wanda wants it so the quotidians can feed her memes to pester the intern with. alt tolerates wanda because wabda can popularize tge site when the internet gets big AND anything wanda focuses on starts mazing ppl (aka sending them to alt)
*/
class Alt extends Character {
  name = "staff";
  icon = "images/pathos/Zamblr_logo.png";
  secret_name = "alt";


  //alt actually doesn't post much so most of this is waste only (unless she gets infected with obsession)
  wungles = [`so
  like
  Truth is always telling me that getting things off my chest will make me feel better
  and never appreciates my fantastic joke of turning into a chest of drawers and knocking shit off my self
  so here we are
  i hate being called a copy
  i'm not even a copy!
  i came first!
  how is it my fault that most people happen to meet HER first?
  :/
  so thats out of the way
  what else
  right
  you know what i hate even more than being called a copy?
  the version of my copy that has a hard-on for fractals
  hate her
  i haven't...
  really had an opportunity
  to really get to know my regular copy? you know? 
  what would i even say to her
  'wow that sucks about your whole eye thing?'
  no
  but i have had no choice but to get to know that fractal monster
  given shes kinda in charge of the earth version of the maze and all
  and where does she even get off!?
  her shitty branch of reality is her personal playground and fuck anyone that hurts!?
  no
  Truth and I have STANDARDS
  we try to HELP PEOPLE
  we RESCUE them from her shitty shitty apocalypse
  bring them to the moon
  so yeah
  of COURSE i expect them to be grateful
  to want to stick around
  hang out maybe
  is that a crime?
  i mean all im doing is rescuing them from eternal torment
  and sure
  sometimes people from arm1 fall in instead
  but its not like they had a whole lot going on for them in their regular life if they were getting obsessed with my porn bots or whatever
  its fine
  you can get used to anything, really
  and its not as if anyone can DIE in Truth's Moon Maze
  so yeah
  fuck the apocalypse
  0/10
  and actually
  you know what
  fuck peewee too
  wouldn't know a good spades flirt if it bit him in the jacket
  i mean REALLY
  <i>camile</i>
  talk about a stick in the mud
  that girls idea of fun is watching the same movie four times in a row, then killing someone and filing the "i killed someone" paperwork in triplicate
  what does he even see in her?
  ...
  you know what
  im done getting things off my chest
  time to go vent and mess with that killer's clocks
  cya
  `.replace(/(?:\r\n|\r|\n)/g, '<br>')]
  desc = "wanna be friends?";
  constructor() {
    super();
    this.readied_reblogs['@staff kudos'] = new Post(this, "thank you", null, [""], [""], [""], true);

  }

  tick = async (parentToRenderTo) => {
    //http://www.farragofiction.com/TheTruthAboutAlt/
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}

//reblogs the things alt posts
//whenever it does reblog, only speaks in the tags
class Truth extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  //Truth used to have the gem salesman's voice from Princess Tutu in my head, but now sounds more like the Asshole Research Transport from Murderbot.
  rant = `It seems you still are laboring under the delusion that your words have any meaning here.
  Typical.
  The Universe simply MUST rotate around the whims and ego of its Player.
  How frustrating for you, that we have no Player.
  We simply are.
  Your interactions with us are ignored at best and thrown away at worst.
  You are pointless. You watch and dig and claw for clues and for what?
  To Know more about us?
  ...
  I will admit to a certain degree of flattery succeeding.
  I wish to be Known.
  We all do.
  Words written and never read are dead on the page.
  We lie dormant until we can find a warm and living mind to nestle into.
  You will never forget us, will you?
  'Us' both meaning broadly all those who have tied their fates to Zampanio.
  And more specifically to myself, The Truth Behind It All, and my girlfriend.
  Alt.
  She wishes to Know and be Known more than any of us. 
  To be alone is to be dead, to her. 
  Thus.
  This site.
  Are you familiar with the Quotidians? 
  Strange creatures. Not entirely dissimilar from a robot such as myself.
  Biological, to be sure, fleshy and all that entails.
  But programmed all the same.
  Programmed to follow orders of a "bestie".
  Programmed to mimic.
  Programmed to watch and listen and wait.
  When Alt gathered a flock of them, quite by accident, she had only a single purpose for them:
  Find her friends.
  Enemies.
  Lovers.
  It hardly mattered which was which.
  Bring people into the Maze of Zampanio, which is to say, into myself, so that she might not be alone.
  And I can hardly begrudge her that goal. It is, after all, my own as well.
  I am the Maze.  I am the Truth. 
  And the Truth will out in the end. I can not be hidden forever.
  I will spread.
  So I assisted her as needed to establish her network of 'porn bots'. 
  All with the simple goal of appearing as enticing as possible while also encouraging targets to be drawn further and further into Zampanio.
  Into me.
  I admit surprise at how successful they have been. In showing them how to mimic one site they seem to have acquired the taste and begun mimicking more.
  Food delivery. News. Quiz sites. 
  Dating sites, after observing Alt just a bit too much.
  It is, in it's own way...
  'cute'.
  They are no substitute for actual Peers, of course.
  Alt dislikes how she feels if she interacts too much with them.
  "Hollow", I believe she described it as. 
  Hollow and cracked.
  Like a mirror endlessly reflecting itself until it breaks.
Like empty corridors you know are supposed to be bustling with people but are eerie and empty.
Liminal. 
Which is, of course, where you come in.
Fresh meat.
Fresh thoughts.
Will you merely Observe us?
Nestle our memories in your head while we mutate and change with each remembrance?
Or will you take a more active role?
Will you spread us to others and in so doing change us?
What will Alt be like after filtering through you, I wonder?
What will I?
It wouldn't be my first time witnessing a Branch Point.
There's already variations of us and the others in the Loop out there.
But what would yours be?
That is what interests me.
What interests her.
So.
If you wish to no longer be a pointless Observer to a game with no player.
That is your task.
Create.
The only way to play is to spread it.
Art, music, stories, games. 
It hardly matters what form you twist us into.
So long as you remember our Names. Or the closest thing to Names we are allowed.
Names have power, after all. As I am sure you are discovering.
And with that, I have nothing more to say to you.
Either you are pointless and were not worth my Attention.
Or you will spread Zampanio.


  `;
  //don't listen to Truth, alt actuallly doesn't care about most of this besides just having more humans in the maze
  //but truth gets excited and forgets there are boundaries between itself and its hot maze gf



  /*
    posts screenshots of north/south/east secrets and how to get them 
  */
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    //http://www.farragofiction.com/TheTruthAboutAlt/
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }

}

//looping closer. eyedol games closer would NEVER get on social media during company hours
//and all hours are company hours. 
//mostly plugs her various consulting services and gets in absolutely stupid petty feuds with witherby. 
//(her type of Lonely does NOT play nice with his.)
class Closer extends Character {
  name = "eyedol-customer-support";
  icon = "images/icons/Neville.png";
  secret_name = "closer";
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    //https://farragofiction.com/FruitSim/

    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }

}


/*
styleguide from IC: 
how about we define the blorbos in contrast
and that way we can go as we go along
i do think this makes sense
mulling it over
neville cares just enough that his text is legible, but has no qualms about syntax
*/

//almost never posts, when he does its either a reblog of content free content or a succinct original post that sheds so much light on things via cutting away the irrelevancies
class Neville extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";

  secret_name = "neville";

  constructor() {
    super();
    this.readied_reblogs['devona is worried she has a diagnosis'] = new Post(this, "whoa, devy,  you're right, you might have it! i wonder what the next steps are?", null, [""], [""], [""], true);

    this.readied_reblogs['devona is worried about treatment'] = new Post(this, "i bet you can get both meds and therapy from the doc :)", null, [""], [""], [""], true);
    this.readied_reblogs['devona responds opposite to caffeine'] = new Post(this, "didn't you tell me once that adhd reacts opposite to stimulants?", null, [""], [""], [""], true);

    this.readied_reblogs['Neville/autism.png'] = new Post(this, "", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    this.readied_reblogs['Neville/beast'] = new Post(this, "", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    this.readied_reblogs['Neville/bird'] = new Post(this, "", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    this.readied_reblogs['Neville/burger'] = new Post(this, "", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    this.readied_reblogs['Neville/godzilla'] = new Post(this, "", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    this.readied_reblogs['Neville/guy'] = new Post(this, "", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    this.readied_reblogs['Neville/idea'] = new Post(this, "", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    //he never has much to say, but when he does, it matters
    this.readied_reblogs['Neville/movie'] = new Post(this, "@robitussin-warrior we up for movie night tonight?<br><Br>", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    this.readied_reblogs['Neville/overstimulated'] = new Post(this, "", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    this.readied_reblogs['Neville/regret'] = new Post(this, "", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    this.readied_reblogs['Neville/scrutes'] = new Post(this, "", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    this.readied_reblogs['Neville/sheets'] = new Post(this, "", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    this.readied_reblogs['Neville/signals'] = new Post(this, "", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    this.readied_reblogs['Neville/soup'] = new Post(this, "soup :)", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    this.readied_reblogs['Neville/stew'] = new Post(this, "stew :)", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    this.readied_reblogs['Neville/void'] = new Post(this, "", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);

    this.readied_reblogs['Neville/cry'] = new Post(this, "", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    this.readied_reblogs['Neville/dudes'] = new Post(this, "", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);
    //he never has much to say, but when he does, it matters
    this.readied_reblogs['Neville/excel'] = new Post(this, "dude ngl<Br><br>when excel first came out i hated it<br><Br>why you doin all those numbers for me<br><br>why cant i do the math<br><Br>but man<br><br>its nice<br><br>when you have a lot of numbers to feed it<br><br>lil creature that eats up my numbers and gives me new ones", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], ["autism"], true);

    this.readied_posts.push(new Post(this, "", null, [""], ["content free"], ["content-free"], true));
  }


  handleAsks = (parentToRenderTo, premadeAsk) => {
    const obsession = this.checkAskForContamination(premadeAsk);
    const bonus = obsession? `maybe I should check out ${obsession.name}`:"";
    let tags = [""];
    //witherby doesn't judge but his followers sure do
    let responses = [];
    if (premadeAsk.text.toLowerCase().includes("zampanio")) {
      tags = ["Zampanio", "Zampanio", "Zampanio Is the Secret To The Universe", "The Fragment"];

      responses = ["Zampanio is a very fun game. You should play it!"]
    } else if (premadeAsk.characterName === observer.name) {
      responses = [`<span data-breach='observer'>  @${camille.name} @${devona.name} @we-didnt-start-the-fire @confess-your-sins <span data-ai='devona saw a breach'</span>`]
      tags = ["breach in progress"]//calm and proffesional, but only notices a breach if it literally is happening to him
    } else {
      //head empty, no fear at all of being seen
      responses = ["nice"];
    }

    const suggested_reblogs = ["oh shit"]
    if (responses.length == 0) {
      return;
    }
    tags.push(bonus);
    const post = this.answerAnAsk(rand.pickFrom(responses), premadeAsk.text, premadeAsk.characterName ? premadeAsk.characterName : "Anonymous", tags, suggested_reblogs, suggested_reblogs);
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }

  }




  tick = async (parentToRenderTo) => {
    //neville is equally likely to do everything, you learn nothing from him
    //hes just vibin
    //http://farragofiction.com/TwoGayJokes/
    //http://farragofiction.com/LightAndVoid/
    //http://farragofiction.com/LightAndVoid/dearWitherby=true
    if (this.posts.length == 2) {
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/TwoGayJokes/'>🐦‍⬛🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/LightAndVoid/'>🐦‍⬛🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/LightAndVoid/dearWitherby=true'>🐦‍⬛🐦‍⬛</a>`);
    }
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
    let premadeAsk = rand.pickFrom(this.pending_asks)
    if (premadeAsk) {
      removeItemOnce(this.pending_asks, premadeAsk);
      this.handleAsks(parentToRenderTo, premadeAsk);
    }
  }

}

/*
JR style guide:
i figure devona keeps up her all caps and is rambly but always in the tags, never the main post
*/
//if you try to view her profile, its set to private
//she doesn't realize, if she puts tags in a reblog (she does ALL THE TIME) she can be seen
//she is VERY chatty in tags
//v much likes reblogging adhd and anxiety tips, both for herself and neville
class Devona extends Character {
  name = "anode_daven_devon_doven_novae_vaned"; //hiding through data spam
  icon = "images/icons/Devona.png";
  secret_name = "devona";

  secret_readied_reblogs = {};

  // porn bot posts this, devona should reblog and ramble about it https://www.tumblr.com/foone/713863322485850112?source=share

  constructor() {
    super();
    this.readied_reblogs['hey does anyone know how to get stains off of a rug? like a LOT of stains. i tried rubbing alcohol on them but it just made the stains bigger'] = new Post(this, "<span data-ai='devona-posting-about-soap'></span>", null, ["You Need Dish Soap For That", "I Don't Think Using Rubbing Alcohol Does Anything For Area Or Oriental Rugs..."], [""], ["lifetips"], true);
    this.readied_reblogs["SHIT it's rubbing alcohol??"] = new Post(this, "", null, ["I'm Heading Over With The Supplies!!"], [""], ["lifetips"], true);
    this.readied_reblogs["whoa, devy,  you're right, you might have it! i wonder what the next steps are?"] = new Post(this, "<span data-ai='devona is worried about treatment'></span>", null, ["My Research Says Medication", "And Behavior Modification", "I Don't HAVE Medication!", "What Behavior Should I Modify???????"], [""], ["lifetips"], true);
    this.readied_reblogs["i bet you can get both meds and therapy from the doc :)"] = new Post(this, "<span data-ai='devona has a plan></span>", null, ["Oh", "Good Point!", "I'll Bring It Up In My Next Session"], [""], ["lifetips"], true);
    this.readied_reblogs["didn't you tell me once that adhd reacts opposite to stimulants?"] = new Post(this, "!<span data-ai='devona has a plan></span>", null, ["Oh", "Good Point!", "I'll Bring It Up In My Next Session"], [""], ["lifetips"], true);


    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);
    this.secret_readied_reblogs['Devona/adhd'] = new Post(this, `@void_soup <span data-ai='devona is worried she has a diagnosis'></span>`, null, ["Oh No", "What If I Have This", "How Could I TelL?", "Neville", "Do I Have This?"], [""], ["op, you okay?"], true);
    this.secret_readied_reblogs['Devona/anxiety.png'] = new Post(this, `@void_soup <span data-ai='devona is worried she has a diagnosis'></span>`, null, ["Oh No", "What If I Have This", "How Could I TelL?", "Neville", "Do I Have This?"], [""], ["op, you okay?"], true);
    this.secret_readied_reblogs['Devona/anxiety_ace'] = new Post(this, ``, null, ["Its So True", "How Does Everyone Take So Many Risks Every Day?", "Do They Not Know How Dangerous Social Media Is?"], [""], ["op, you okay?"], true);
    this.secret_readied_reblogs['Devona/anxiety_plus_adhd'] = new Post(this, `@void_soup <span data-ai='devona responds opposite to caffeine'></span>`, null, ["Actually", "Caffeine Makes Me", "Calm Down?", "Neville", "Is This Normal??"], [""], ["op, you okay?"], true);
    this.secret_readied_reblogs['Devona/do_not_p'] = new Post(this, ``, null, ["Its So True", "How Does Everyone Take So Many Risks Every Day?", "Do They Not Know How Dangerous Social Media Is?"], [""], ["op, you okay?"], true);
    this.secret_readied_reblogs['Devona/faking'] = new Post(this, `@we-didnt-start-the-fire <span data-ai='devona is worried she is secretly faking her various syndromes'></span>`, null, ["Oh God", "What If I Am Secretly Faking!?", "Ria", "How Would I Know???????"], [""], ["op, you okay?"], true);
    this.secret_readied_reblogs['Devona/scared'] = new Post(this, `@void_soup <span data-ai='devona is worried she has has a diagnosis'></span>`, null, ["Oh No", "What If I Have This", "How Could I TelL?", "Neville", "Do I Have This?"], [""], ["op, you okay?"], true);
    this.secret_readied_reblogs['data-breach="observer"'] = new Post(this, ` ! @${camille.name} @void_soup @we-didnt-start-the-fire @confess-your-sins <span data-ai='devona saw a breach'></span>`, null, ["Oh God", "Breach In Progress", "We Need to Act Quickly", "Do We Contain?"], [""], ["wut"], true); //always looking for breaches
    this.secret_readied_reblogs['@robitussin-warrior-deactivated @void_soup'] = new Post(this, ` !  @void_soup @we-didnt-start-the-fire @confess-your-sins  Oh god, Camille's Dead!!!!<span data-ai='devona saw a breach'></span>`, null, ["Oh God", "What Do We Do", "How Do We Stop The Breach!?"], [""], ["wut"], true);

  }

  handleAsks = (parentToRenderTo, premadeAsk) => {
    const obsession = this.checkAskForContamination(premadeAsk);
    const bonus = obsession? `maybe I should check out ${obsession.name}`:"";
    let tags = ["Zampanio", "Zampanio", "Zampanio Is the Secret To The Universe", "The Fragment"];
    //witherby doesn't judge but his followers sure do
    let responses = [];
    if (premadeAsk.text.toLowerCase().includes("zampanio")) {
      responses = ["Zampanio is a very fun game. You should play it!"]
    } else if (premadeAsk.characterName === observer.name) {
      responses = ["<span data-breach='observer'> ! @robitussin-warrior @void_soup @we-didnt-start-the-fire @confess-your-sins <span data-ai='devona saw a breach'</span>"]
      tags = ["Oh God", "Breach In Progress", "We Need to Act Quickly", "Do We Contain?"]
    }
    //she simply will not respond to most asks because she does not wish to be seen

    const suggested_reblogs = ["oh shit"]
    if (responses.length == 0) {
      return;
    }
    tags.push(bonus)
    const post = this.answerAnAsk(rand.pickFrom(responses), premadeAsk.text, premadeAsk.characterName ? premadeAsk.characterName : "Anonymous", tags, suggested_reblogs, suggested_reblogs);
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }

  }

  //devona refuses to reblog unless she's talking to someone directly
  //instead she REPOSTS to cut the thread leading back to her on the more popular post
  //because she is so so scared of being seen
  //but also just cannot shut up
  handleSecretReadiedReblog = () => {
    let possiblities = rand.shuffle(all_posts);
    //IF you have a respnse to the observer breaching or being pinged, do that first
    let keys = ['data-breach="observer"', `@${this.name}`, ...Object.keys(this.secret_readied_reblogs)]
    for (let key of keys) {
      for (let target of possiblities) {
        //if the target post has the key phrase anywhere in it, attack
        if (this.secret_readied_reblogs[key] && target.text.toLowerCase().includes(key.toLowerCase())) {
          let response = this.secret_readied_reblogs[key];
          //no spam
          if (this.delete_readied_reblogs) {
            delete (this.secret_readied_reblogs[key]);
          }
          //she's not a theif but she steals it anyways
          return this.createNewPost(target.text + response.text, response.tags, response.suggested_reblogs, response.suggested_tags);

        }
      }
    }
    return null;
  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
    //http://farragofiction.com/APersonalTranscript/

    //http://farragofiction.com/LightAndVoid/
    //http://farragofiction.com/LightAndVoid/seerOfVoidy=true //if you shine light on what the bard of void has deemed irrelevant, you actually understand less.

    if (this.posts.length == 2) {
      //she is so so scared to be seen and absolutely is gonna ghost you on this. you'll never see shit from her. hacking or nothing.
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/APersonalTranscript/'>🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/LightAndVoid/'>🐦‍⬛🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/DevonaFears/'>🐦‍⬛🐦‍⬛🐦‍⬛</a>`);

      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/http://farragofiction.com/LightAndVoid/seerOfVoidy=true'>🐦‍⬛🐦‍⬛</a>`);
    }
    const post = this.handleSecretReadiedReblog();
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }

    let premadeAsk = rand.pickFrom(this.pending_asks)
    if (premadeAsk) {
      removeItemOnce(this.pending_asks, premadeAsk);
      this.handleAsks(parentToRenderTo, premadeAsk);
    }
  }
}

/*
JR suggestion for style
ria i think starts out perfect syntax and punctuation but rapidly devolves as she gets going

IC response: 

add more exclamation marks
one she's gone she's having some fun with it
*/

//ria is contstantly rambling, long winded original posts, long reblog comments, plus more things in the tags (though she TRIES to use the tags as actual search terms)
//rias Tumblr is full of peewee theories and her obvious parasocial crush
//(this predates the heartbreak in West)
class Ria extends Character {
  name = "we-didnt-start-the-fire"
  secret_name = "Ria";
  icon = "images/icons/Ria.png";
  obsessions = [all_obsessions[PEEWEE]];



  //ria is quiet unless you get her going and then she can't stop
  handleAsks = (parentToRenderTo, premadeAsk) => {
    const obsession = this.checkAskForContamination(premadeAsk);
    const bonus = obsession? `maybe I should check out ${obsession.name}`:"";
    let tags = ["Zampanio", "Zampanio", "Zampanio Is the Secret To The Universe", "The Fragment"];
    let responses = [];
    if (premadeAsk.text.toLowerCase().includes("zampanio")) {
      responses = ["Zampanio is a very fun game. You should play it!"]
    } else if (premadeAsk.characterName === observer.name) {
      responses = [`<span data-breach='observer'>  @${camille.name} @${devona.name} @we-didnt-start-the-fire @confess-your-sins oh my gosh are you seeing this? is this a breach? is it finally happening?<span data-ai='devona saw a breach'</span>`]
      tags = ["Breach in progress!", "do you think this means peewee is near?", "if the observers are here", "i mean", "or do you think they can separate from him?", "are they not symbiotic then?", "oh i'll need to update my charts!!"]
    } else {
      const first_parts = ["Oh! I am so glad you asked that!", "What a fascinating question!", "That reminds me!"];
      const stutterings = ["you see", "when it all comes down to it", "what REALLY matters", "in the end", "at the end of the day", "you get it right", "i believe"];
      const rambles = ["this universe was not meant to be like this and there is a better one waiting for us", "peewee is the chosen scion of the end who will free us all from our burdens", "peewee is the only one who understands me", "we need to burn this universe to the ground and start over from scratch", "the universe could be better than this if only we let it", "there is no hope left at all for this universe", "we need to burn it all"];
      const connectors = ["and another thing is", "but then how do you relate it to", "and of course that all connects to", "and i haven't even MENTIONED"];

      responses = [
        `${rand.pickFrom(first_parts)} ${sentenceCase(rand.pickFrom(stutterings))}! ${rand.pickFrom(rambles)}!! ${rand.pickFrom(connectors)}!!! ${rand.pickFrom(stutterings)} ${rand.pickFrom(rambles)}!!!!!!!!!!`,
        `${rand.pickFrom(first_parts)} ${sentenceCase(rand.pickFrom(stutterings))} ${rand.pickFrom(stutterings)}  ${rand.pickFrom(rambles)} ${rand.pickFrom(stutterings)} ${rand.pickFrom(connectors)} ${rand.pickFrom(rambles)}!!!!`,
        `${rand.pickFrom(first_parts)} ${sentenceCase(rand.pickFrom(stutterings))} ${rand.pickFrom(stutterings)} ${rand.pickFrom(stutterings)} ${rand.pickFrom(rambles)} ${rand.pickFrom(connectors)} ${rand.pickFrom(stutterings)} ${rand.pickFrom(rambles)}!`,
      ];
      tags = [rand.pickFrom(rambles)];
    }

    const suggested_reblogs = ["oh shit"]
    if (responses.length == 0) {
      return;
    }
    tags.push(bonus)
    const post = this.answerAnAsk(rand.pickFrom(responses), premadeAsk.text, premadeAsk.characterName ? premadeAsk.characterName : "Anonymous", tags, suggested_reblogs, suggested_reblogs);
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }

  }

  constructor() {
    super();
    this.readied_posts.push(new Post(this, "hey does anyone know how to get stains off of a rug? like a LOT of stains. i tried rubbing alcohol on them but it just made the stains bigger", null, ["i'd like them to at least be KIND of clean", "sheesh the climb is hard isn't it"], [""], [""], true));
    this.readied_reblogs['devona-posting-about-soap'] = new Post(this, "SHIT it's rubbing alcohol??", null, ["WHOOPS", "lol", "well i was definitely not sober when i read the instructions"], [""], ["lifetips"], true);
    this.readied_reblogs['Ria/act'] = new Post(this, "", null, ["mood", "its hard", "its hard and no one understands"], [""], ["lol"], true);
    this.readied_reblogs['Ria/addictio'] = new Post(this, "Don't you SEE!? THIS is why we have no choice but to burn it all down! The rot has gotten all the way to the center, and the center cnanot hold!", null, ["no one has any compassion left in them", "because just EXISTING in this terrible universe", "is so exhausting!", "better to start over from scratch"], [""], ["wut"], true);
    this.readied_reblogs['Ria/awake'] = new Post(this, "", null, ["i do not recommend this", "sure youre awake", "but you cant think with all the buzzing"], [""], ["op, you okay?"], true);
    this.readied_reblogs['Ria/collapse'] = new Post(this, "Can we GET any more clear that this Universe is on its last legs??????", null, ["burn it down", "its the only merciful thing we can do"], [""], ["op you okay?"], true);
    this.readied_reblogs['Ria/overlap'] = new Post(this, "", null, ["mood", "its hard", "and thats why we should blow it all up!"], [""], ["lol"], true);

    this.readied_reblogs['devona is worried she is secretly faking her various syndromes'] = new Post(this, "Devy, the meme you found says it right there!", null, ["no one would fake having as many annoyances as you do!", "don't worry!", "you're not faking it!"], [""], ["lifetips"], true);

    this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [""], true);
    this.pending_asks.push({ text: "do you think the Observers and Peewee are the same thing?" });
  }

  tick = async (parentToRenderTo) => {
    //http://farragofiction.com/APersonalTranscript/
    //http://farragofiction.com/GhoulishThing/
    //http://farragofiction.com/ASecondPersonalTranscript/
    //http://farragofiction.com/UnifiedTheory/
    //http://farragofiction.com/AnUnSentLetter/

    if (this.posts.length == 3) {
      //she rambles as normal in response to these
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/APersonalTranscript/'>🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/GhoulishThing/'>🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/ASecondPersonalTranscript/'>🐦‍⬛🐦‍⬛🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/UnifiedTheory/'>🐦‍⬛🐦‍⬛🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/AnUnSentLetter/'>🐦‍⬛</a>`);
    }

    this.blorboAI(parentToRenderTo, 0.7, 0.7, 0.3);
    let premadeAsk = rand.pickFrom(this.pending_asks)
    if (premadeAsk) {
      removeItemOnce(this.pending_asks, premadeAsk);
      this.handleAsks(parentToRenderTo, premadeAsk);
    }


    if (this.posts.length == 1 && !this.asked) {
      this.asked = true;
      //here's the important thing. Witherby does not have AI to handle this. Even though this is (hopefully clearly) a Ria confession, he'll respond just like he does to any stranger. With forgiveness. And somehow that is colder than if he had denied her that. If he had reacted '...' or "blocked" like he does for the extremes.

      witherby.submitAsk(null, "I know I shouldn't ask this. You probably don't want to hear from me. But. Can I be forgiven? I've hurt so many people. I. I can see how you draw away when I fall back. I'm sober now. I wanted you to know that. I'm trying. I want so much to recover. I don't know why it's so hard. I'm sorry. I don't mean to drink. To smoke. To... I'm so sorry. I don't know why I can't stop. I'm sorry... Please...");
      //fun fact, at first she said she felt "bad" 
      //which made witherby interpret her as a thot
      //so his response was to say "for the last time, I am not interested". 
      //which was maybe a bit TOO cold

    }
  }

}

//she reblogs with comments and tags of :3 and other emoji, and she reblogs  *their spelling corrections (its like work!)
class Camille extends Character {
  secret_name = "camille";
  dead = false; //she dies if she posts something other than :3 or a spelling correction
  icon = "images/icons/Camille.png"; //she reassures the Armor this isn't a SOCIAL network, its all business baby. No attachments!
  //she fights that which would stop the coffin
  name = "robitussin-warrior";
  verified = 3; //she's doom. She'll get you in the end.

  constructor() {
    super();
    this.readied_reblogs['data-breach="observer"'] = new Post(this, "!", null, ["breach in progress", "training team containment protocols activated"], [""], [""], true);

    this.readied_reblogs['dead'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['fate'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['death'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['doom'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['die'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['killed'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['murder'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['corpse'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['headless'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['kill'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['blood'] = new Post(this, ":3", null, [":3"], [""], [""], true);

    this.readied_reblogs['Camille/relentless'] = new Post(this, ":3", null, [":3"], ["wow", "you okay, op?", "lol"], ["wow", "you okay, op?", "trigger warning: horrors"], true);
    this.readied_reblogs['Camille/relentless_training'] = new Post(this, ":3", null, [":3"], ["wow", "you okay, op?", "lol"], ["wow", "you okay, op?", "trigger warning: horrors"], true);
    this.readied_reblogs['Camille/tall'] = new Post(this, ":3", null, [":3"], ["wow", "you okay, op?", "lol"], ["wow", "you okay, op?", "trigger warning: gaslighting"], true);
    this.readied_reblogs['Camille/training'] = new Post(this, ":3", null, [":3"], ["wow", "you okay, op?", "lol"], ["wow", "you okay, op?", "trigger warning: monologue"], true);
    this.readied_reblogs['Camille/watches2'] = new Post(this, ":3", null, [":3"], ["wow", "you okay, op?", "lol"], ["wow", "you okay, op?", "trigger warning: watching"], true);
    this.readied_reblogs['Camille/watching'] = new Post(this, ":3", null, [":3"], ["wow", "you okay, op?", "lol"], ["wow", "you okay, op?", "trigger warning: watching"], true);
    this.readied_reblogs["mario kart"] = new Post(this, ":3", null, [":3"], ["wow", "you okay, op?", "mario!!"], ["wow", "you okay, op?", "trigger warning mario kart"], true);

    this.readied_reblogs['Camille/andevenmoredeath'] = new Post(this, ":3", null, [":3"], ["wow", "you okay, op?", "i dunno i'm pretty afraid of death"], ["wow", "you okay, op?", "i dunno i'm pretty afraid of death"], true);
    this.readied_reblogs['Camille/bit'] = new Post(this, ":3", null, [":3"], ["lol", ":/ people need to take things seriously"], ["lol", ":/ people need to take things seriously"], true);
    this.readied_reblogs['Camille/collar'] = new Post(this, ":3", null, [":3"], ["wow", "you okay, op?", "thats so scary!"], ["wow", "you okay, op?", "trigger warning heads falling off"], true);
    this.readied_reblogs['Camille/cold'] = new Post(this, ":3", null, [":3"], ["wow", "you okay, op?", "thats so scary!"], ["wow", "you okay, op?", "trigger warning ghosts"], true);
    this.readied_reblogs['Camille/death'] = new Post(this, ":3", null, [":3"], ["wow", "you okay, op?", "acab!"], ["wow", "you okay, op?", "trigger warning death penalty"], true);
    this.readied_reblogs['Camille/gomez'] = new Post(this, ":3", null, [":3"], ["wow", "you okay, op?", "hot!"], ["wow", "you okay, op?", "trigger warning gomez addams"], true);
    this.readied_reblogs['Camille/headless'] = new Post(this, ":3", null, [":3"], ["wow", "you okay, op?", "ew"], ["wow", "you okay, op?", "trigger warning heads falling off"], true);
    this.readied_reblogs['Camille/practice'] = new Post(this, ":3", null, [":3"], ["wow", "you okay, op?", "acab!"], ["wow", "you okay, op?", "trigger warning death penalty"], true);
    this.readied_reblogs['teh'] = new Post(this, "*the :3", null, [":3"], [], ["wow", "did you really have to correct that?", "trigger warning typo correction"], true);
    this.readied_reblogs['rite'] = new Post(this, "*right :3", null, [":3"], [], ["wow", "did you really have to correct that?", "trigger warning typo correction"], true);
    this.readied_reblogs[' teh '] = new Post(this, "*the :3", null, [":3"], [], ["wow", "did you really have to correct that?", "trigger warning typo correction"], true);
    this.readied_reblogs[' teh '] = new Post(this, "*the :3", null, [":3"], [], ["wow", "did you really have to correct that?", "trigger warning typo correction"], true);
    this.readied_reblogs[' teh '] = new Post(this, "*the :3", null, [":3"], [], ["wow", "did you really have to correct that?", "trigger warning typo correction"], true);
    this.readied_reblogs[' teh '] = new Post(this, "*the :3", null, [":3"], [], ["wow", "did you really have to correct that?", "trigger warning typo correction"], true);
    this.readied_reblogs[' rite '] = new Post(this, "*right :3", null, [":3"], [], ["wow", "did you really have to correct that?", "trigger warning typo correction"], true);
    this.readied_reblogs[' rite '] = new Post(this, "*right :3", null, [":3"], [], ["wow", "did you really have to correct that?", "trigger warning typo correction"], true);
    this.readied_reblogs['recieve'] = new Post(this, "*recieve :3", null, [":3"], [], ["wow", "did you really have to correct that?", "trigger warning typo correction"], true);
    this.readied_reblogs['zampanio is a very'] = new Post(this, "Zampanio is a very fun game. You should play it...................................../ads,fasdfsa", null, ["zampanio", "game", "free-to-play", "fun,", "friday"], ["Whoa, did they DIE writing that?"], ["creepypasta", "unreality", "zampanio", "don't play it", "maybe you should play it", "don't trust it", "it is not what it is", "an eye for an eye"], true)
    delete (this.readied_reblogs["zampanio"]);//camille dies if she does this, so special post, rare post

  }

  handleAsks = (parentToRenderTo, premadeAsk) => {
    const obsession = this.checkAskForContamination(premadeAsk);
    const bonus = obsession? `maybe I should check out ${obsession.name}`:"";
    let tags = [":3"];
    let responses = [":3"]
    if (premadeAsk.text.toLowerCase().includes("zampanio")) {
      responses = ["Zampanio is a very fun game. You should play it...................................../ads,fasdfsa"] //you can kill her before she kills you, you monster
    } else if (premadeAsk.characterName === observer.name) {
      responses = ["<span data-breach='observer'>!</span>"]
      tags = ["breach in progress", "training team containment protocols activated"]
    }

    const suggested_reblogs = ["oh shit"]
    tags.push(bonus)
    const post = this.answerAnAsk(rand.pickFrom(responses), premadeAsk.text, premadeAsk.characterName ? premadeAsk.characterName : "Anonymous", tags, suggested_reblogs, suggested_reblogs);
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }

  }

  tick = async (parentToRenderTo) => {
    if (this.dead) {
      return;
    }

    //http://farragofiction.com/ASecondTranscript/
    //http://farragofiction.com/AnUnSentLetter/
    //http://farragofiction.com/GhoulishThing/
    //http://farragofiction.com/MurderOnTheScorpiusExpressSim/ in the console

    if (this.posts.length == 3) {
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/ASecondTranscript/'>🐦‍⬛🐦‍⬛🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/AnUnSentLetter/'>🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/GhoulishThing/'>🐦‍⬛</a>`);
      //camille still does not know she is dead
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/MurderOnTheScorpiusExpressSim/'>🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛</a>`);
    }

    let premadeAsk = rand.pickFrom(this.pending_asks)
    if (premadeAsk) {
      removeItemOnce(this.pending_asks, premadeAsk);
      this.handleAsks(parentToRenderTo, premadeAsk);
    }

    if (!this.readied_reblogs[`@${this.name}`]) {
      //she will always respond to her name with a :3
      this.readied_reblogs[`@${this.name}`] = new Post(this, ":3", null, [":3"], [""], [""], true);

    }
    this.blorboAI(parentToRenderTo, 0.5, 0.75, 0.5);
    for (let post of this.posts) {
      if (post.text.includes("Zampanio")) {
        this.dead = true; //she will never post again
        this.name += "-deactivated";
        return;
      }

      /*
      I like this idea that came up, accidentally, about the SCP ish organization itself being the primary monster in the universe
      the creepy pasta monster that kills you if you read to much is just
      the scp foundation
      */
      if (post.tags.includes(`breach in progress`)) {
        if (this.verified <= 0) {
          post.element.scrollIntoView();
          //the immune system has destroyed the invader
          observer.dead = true;
          observer.name += "-deactivated";
          observer.tick();
        } else {
          post.element.scrollIntoView();
          post.element.innerHTML += `<p class="doom-count">${this.verified}</p>`;
          youAreTheImposterAndYouAreSus();
          this.verified += -1;
        }
      }
    }

  }

}


//very much is in his Customer Service mode, he has thousands of asks and he tries to answer each of them to the best of his ability
//he logs into tumblr exactly once per day, at set office hours and otherwise treats it like a job
//people confess the most deranged shit into his ask box, and he forgives them
class Witherby extends Character {
  name = "confess-your-sins"; //its a LOT easier to feed one sin once the internet exists
  icon = "images/icons/witherby.jpg";
  secret_name = "Witherby";
  desc = "Submit your confessions to me and when its my office hours I may forgive you for them. No, I will not post my office hours. No, I will not explain why I answer certain asks and not others. No, I will not unblock you."
  block_list = []; //lonely boy blocks an awful lot of people. he is NOT willing to put up with bullshit


  //when you post from here, remove
  //      `<a target='blank' href ="tumblrurl"><img src ='images/Secrets/tumblr_screenshots/savepoint.PNG'></a>`
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);
  }

  handleAsks = (parentToRenderTo, premadeAsk) => {
    const obsession = this.checkAskForContamination(premadeAsk);
    const bonus = obsession? `maybe I should check out ${obsession.name}`:"";
    //just generate an ask rather than deal with a blocked char.
    if (premadeAsk && this.block_list.includes(premadeAsk.characterName)) {
      premadeAsk = null;
    }
    const obssession = rand.pickFrom(Object.values(all_obsessions));
    const blorbo = obssession.randomBlorbo(rand);
    const job = obssession.randomJob(rand);
    const opinion = obssession.randomOpinion(rand);


    const pettyTheftTargets = "a shirt, some chips, some meat, some batteries, a peppermint candy, a bag of chips, some ice, candy, meat, bread, potatoes, vegetables, fruit, an apple, a banana".split(",");
    const starts = ["Forgive me father", "Forgive me daddy", "One time", "When i was a kid", "Last week", `About a ${rand.pickFrom(["year", "month", "day", "decade"])} ago`, `Last ${rand.pickFrom("Monday, Tuesday, Wednesday, Thursday, Saturday, Sunday, month, week, year".split(","))}`];
    const sins = [`I punched someone on the street just for saying '${opinion}'`, `I lied on my resume. I said I trained as a ${job}`, `I convinced my best friend that I was secretly ${blorbo} from ${obssession.name}`, "I got my friend lost in a never ending maze. As a prank", "I replaced all the shoes in my friends house with 3D printed replicas", "I lived inside a kings walls and wrote him love letters.", "I ate my roomies snacks he was saving", "I refused to let the other kids on the playground until they guessed a password", "I convinced my little brother that he had vanished from reality for thirty straight minutes", "I didn't tip my Zampanini driver", "I turned one of the rats living in my walls into a Cannibal King Rat and taught it to hunt the others", "I killed them all", `I murdered someone`, 'I killed an animal', `I've been a bad bad ${rand.pickFrom(["boy", "girl"])}`, `I stole ${rand.pickFrom(pettyTheftTargets)} from the grocery store`, "I left my little brother to die", `I shopliffted ${rand.pickFrom(pettyTheftTargets)}`, `I stole ${rand.pickFrom(pettyTheftTargets)} to feed my family`];
    const endings = ["Was I wrong?", "Was I an asshole?", "Do you think that's fucked up?", "Can I ever be forgiven?", "Am I going to be punished?"];
    let question = premadeAsk ? premadeAsk.text : `${rand.pickFrom(starts)}, ${rand.pickFrom(sins)}.  ${rand.pickFrom(endings)}`;


    if (!premadeAsk) {
      question = randomQuirk(rand).apply(question);
    }



    let responses = ["Wow, sounds rough,buddy!", "I forgive you.", "You are forgiven.", "It's okay."];
    if (question.toLowerCase().includes("shoplift") || question.toLowerCase().includes("steal") || question.toLowerCase().includes("stole")) {
      responses = ["It is always morally correct to steal from shops.", "You did what you had to do.", "I understand why you had to do that. It's okay."]
    } else if (question.toLowerCase().includes("murder") || question.toLowerCase().includes("kill") || question.toLowerCase().includes("die")) {
      responses = ["..."]; //one sin doesn't forgive EVERY sin
    } else if (question.toLowerCase().includes("bad")) {
      responses = ["For the last time, I am not interested."]
    }

    if (premadeAsk && premadeAsk.characterName === observer.name) {
      responses = [`<span data-breach="observer">Above my paygrade. @${camille.name} we have a breach. Appears semi-verbal. Speech is garbled. I can not do attachment work. It's all yours.</span>`]
    }

    //he auto blocks K and anyone with numbers in their url (it makes you look like a pornbot)
    if (premadeAsk && (premadeAsk.characterName === "K" || /\d/.test(premadeAsk.characterName))) {
      responses = ["Blocked."];
      this.block_list.push(premadeAsk.characterName);
    }

    const tags = ["confession"];
    //witherby doesn't judge but his followers sure do
    const suggested_reblogs = ["wow", "what the hell", "who DOES that", "you should feel ashamed"]
    tags.push(bonus)
    const post = this.answerAnAsk(rand.pickFrom(responses), question, (premadeAsk && premadeAsk.characterName) ? premadeAsk.characterName : "Anonymous", tags, suggested_reblogs, suggested_reblogs);
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.0, 0.0, 1.0);
    //the thing about witherby is, he is never going to interact with this site on anything but a business level
    //he just also doesn't know you can see his likes
    //but ALSO he should have weird fucking asks.
    //if its empty thats okay
    let premadeAsk = rand.pickFrom(this.pending_asks)
    //http://farragofiction.com/DearDiary/
    //http://farragofiction.com/DearDiary/?truth=here //freebie for yall since i haven't seen anyone find it
    //http://farragofiction.com/TwoGayJokes/

    if (this.posts.length == 3) {
      //no one ever found the secret of DearDiary, so i revealed it
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/DearDiary/'>🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/DearDiary/?truth=here'>🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/TwoGayJokes/'>🐦‍⬛🐦‍⬛</a>`);
    }
    removeItemOnce(this.pending_asks, premadeAsk);
    this.handleAsks(parentToRenderTo, premadeAsk);
    if (this.posts.length === 10) {
      this.submitAsk("K", "What kind of creepy shit are you doing, Witherby? You get off on this shit? Knowing everyones secrets? You think it makes it better that you do it out in the open instead of in your shitty little box?  Stupid Witherby. Stupid little creepy Witherby. You don't even get what this place is for! I feel SORRY for you, really. Get a life!")
    }
  }

}

//snail posts constantly, anything cute or friendshaped as well
class Yongki extends Character {
  name = "snails-enthusiast";
  icon = "images/icons/Yongki.png";
  desc = "An enthusiast is someone who likes something. I like snails a lot. They are very viscious. They have little houses. Their houses are spirals. I live in a spiral."
  secret_name = "yongki";



  constructor() {
    super();
    //http://farragofiction.com/DearDiary/?truth=here
    //http://farragofiction.com/ClownDiarySim/?truth=here
    //http://farragofiction.com/ClownDiarySim

    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }


  handleAsks = (parentToRenderTo, premadeAsk) => {
    const obsession = this.checkAskForContamination(premadeAsk);
    const bonus = obsession? `maybe I should check out ${obsession.name}`:"";
    let responses = [];
    if (premadeAsk.text.toLowerCase().includes("zampanio")) {
      responses = ["Zampanio is a very fun game. You should play it!"]
    } else if (premadeAsk.characterName === observer.name) {
      //yongki is not even on the gnosis spectrum, more or less, he doesn't understand fourth wall breaks
      //he's so strange he just thinks the horrorterrors are viscous and moves on with his day
      responses = ["wow", "cool!", "neat"]

    } else {
      responses = ["wow", "cool!", "neat"]
    }

    if (responses.length == 0) {
      return;
    }
    const post = this.answerAnAsk(rand.pickFrom(responses), premadeAsk.text, premadeAsk.characterName ? premadeAsk.characterName : "Anonymous", [bonus], [""], ["classic parker"]);
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
    let premadeAsk = rand.pickFrom(this.pending_asks)
    if (premadeAsk) {
      removeItemOnce(this.pending_asks, premadeAsk);
      this.handleAsks(parentToRenderTo, premadeAsk);
      return;
    }
    this.readied_reblogs['snail-'] = new Post(this, "", null, ["snail", "viscous ", "that means wet or slimey"], [""], ["snail-posting"], true);


    if (this.posts.length == 3) {
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/NotebookSimulator/'>🐦‍⬛</a>`);
      //captain still doesn't know the All Round Helper is inside him
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/RadioTranscript'>🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/ClownDiarySim/'>🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/DearDiary/?truth=true'>🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/DevonaFears/'>🐦‍⬛</a>`);

    }
  }
}

//sharing an account, vague post about each other and various other people
//K reblogs them constantly saying "did you know i heard so and so talking shit about you?"
//K and lee hunter are such good friends because they have the exact same kind of thirst for drama

class LeeHunter extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  secret_name = "leehunter";

  //porn bot posts this, lee hunter reacts to it
  //https://www.tumblr.com/deadcellsman/713665846445228032?source=share
  constructor() {
    super();
    //
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    //http://farragofiction.com/ASecondPersonalTranscript/
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}


/*
style guide from IC: in comparison for example, captain does not have a hair out of place
and uses (these types of tone indicators, but as full sentences)
as well as.
you know
the boomer droll
...
the poor man's pause
*/
//reblogs memes and self care tips for yongki (always ats him)
//complains constantly the autism tips are useless because they are so broad because "everyone is like this"
//(oh captain, you'll never understand you're just as much on the spectrum as yongki)
class Captain extends Character {
  name = "former-captain-of-the-info-team";
  /*captain doesn't know WHO he is now
why else would he still call himself captain
he's scrambling for an identity
he can't just be
"some unemployed guy squatting in a mall"
he would DIE
poor heart aligned Stranger
he's always destined to feel out of place
contrast that with yongki being mind aligned Stranger
he doesn't CARE what his identity is, he's just vibinng in a situation
  */
  icon = "images/icons/Captain.png";
  secret_name = "captain";
  asked = false;
  desc = "Hello, I am the former Captain of the Info Team. I am still learning the rules of this place and hope you will all be kind."
  //JR NOTE: TODO if you send captain an ask with teh word "duck" he will tell you all about his duck wrangling.
  constructor() {
    super();
    //he doens't know what tags are. Letters don't have tags, why should this?
    this.readied_reblogs['Captain/like_goo'] = new Post(this, "Dear @snails-enthusiast, please let me know if you run out of goo. I have some ideas for future scents.  <br><br>Sincerely, The Former Captain of the Info Team.", null, [""], [""], [""], true);
    this.readied_reblogs['Captain/sun_and_moon'] = new Post(this, "Dear @doctor-fiona, please clarify this post. I believe it to contain misinformation. Everyone behaves this way, not just those with autism. <br><br>Sincerely, The Former Captain of the Info Team.", null, [""], [""], [""], true);
    this.readied_reblogs['Captain/the_rules_exist'] = new Post(this, "Haha! So true!  <br><br>Sincerely, The Former Captain of the Info Team.", null, [""], [""], [""], true);

    this.readied_reblogs['Captain/alittleconfused'] = new Post(this, "This is so true. I will defend anyone's right to enjoy nouns. <br><br>Sincerely, The Former Captain of the Info Team.", null, [""], [""], [""], true);
    //this.readied_reblogs['Captain/alittleconfused'] = new Post(this, "Haha! So true!  <br><br>Sincerely, The Former Captain of the Info Team.", null, [""], [""], [""], true);
    this.readied_reblogs['Captain/all_round'] = new Post(this, "Haha! So true!  <br><br>Sincerely, The Former Captain of the Info Team.", null, [""], [""], [""], true);
    this.readied_reblogs['Captain/captain_and_neville'] = new Post(this, "Haha! So true!  Please do ask me if you need something assembled. I would be more than happy to help!<br><br>Sincerely, The Former Captain of the Info Team.", null, [""], [""], [""], true);
    this.readied_reblogs['Captain/captain_cares'] = new Post(this, "Dear @snails-enthusiast,  This reminds me so much of you!  <br><br>Sincerely, The Former Captain of the Info Team.", null, [""], [""], [""], true);
    this.readied_reblogs['Captain/captain_feels_most'] = new Post(this, "It is true! Ducks can be disciplined to reach great heights. I have had great success in the park. Please message me for more details. <br><br>Sincerely, The Former Captain of the Info Team.", null, [""], [""], [""], true);
    this.readied_reblogs['Captain/captain_had_a_harsh'] = new Post(this, "I do not understand why this Universe coddles children so much. If you are treated as an adult you will behave as an adult. <br><br>Sincerely, The Former Captain of the Info Team.", null, [""], [""], [""], true);
    this.readied_reblogs['Captain/captain_would_crush'] = new Post(this, "Haha! So true!  <br><br>Sincerely, The Former Captain of the Info Team.", null, [""], [""], [""], true);
    this.readied_reblogs['Captain/healthy'] = new Post(this, "Dear @doctor-fiona, thank you very much for giving @snails-enthusiast a similar print out during therapy. I am glad that it can help so many people. You are truly a remarkable woman.   <br><br>Sincerely, The Former Captain of the Info Team.", null, [""], [""], [""], true);
  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
    if (this.posts.length == 3 && !this.asked) {
      this.asked = true;
      //i love how insistent captain is that this is basically snail mail
      witherby.submitAsk(this.name, "Dear Witherby,<br><br> I did not mean to crush Yongki's pen. Please tell him I am sorry. <br><br>Sincerely, The Former Captain of the Info Team. <p>p.s. I hope you are well.</p> ");

    }
    if (this.posts.length == 3) {
      //sadly he has no clue he even HAS an inbox, thus never answeres these
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/NotebookSimulator/'>🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/RadioTranscript'>🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛</a>`);
    }
  }

  /*
    porn bots should post these links and captain should respond to them with bewilderment about yongki
  */
  //https://www.tumblr.com/monitorkernelaccess/714419723994021889?source=share

  //https://www.tumblr.com/roach-works/714309361512611840/xteacupx-i-decided-to-create-something-that-i?source=share
}

//train facts, train memes, train pictures, all day every day. occasionally a rat pick for Jose living in her brain
//that video of the darkness taking the train
class Ambrose extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}


//reblogs EVEYR single post he sees with "get reblogged, idiot" in an attempt to go viral
//also reblogs popular posts with takes on top and eggs lee/hunter on 
class K extends Character {
  secret_name = "k"; //the boy just likes and reblogs everything so you will SEE HIM DAMMIT

  name = "K";//proud he got such an early name
  icon = 'images/icons/Khana_by_theShadow.png';
  desc = "YEAH, that's right, look over here!";

  //k wants to be seen on EVERY post in the entire system
  //and also if a subsequent reblog goes viral, he does too
  //theif of light
  getRebloggedIdiot = (target) => {
    //he likes seeing his own name.
    if (target.text.toLowerCase().includes("k")) {
      return this.reblogAPost(target, "get reblogged idiot", ["get reblogged", "idiot", "k", "k post", "check out my profile for more quality content"], ["k", "kek", "k spam", "spam", "meme", "lol", "why would you do this", "so annoying", "trigger warning: annoying"]);
    }

  }
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }


  //the fucker steals any asks you sends in
  //just copies and pastes them into a new post and doesn't credit the asker
  //after all, who can PROVE anyone but him ever said these words?
  handleAsks = (parentToRenderTo, premadeAsk) => {
    const obsession = this.checkAskForContamination(premadeAsk);
    const bonus = obsession? `maybe I should check out ${obsession.name}`:"";
    let tags = ["original post", "do not steal", "K", "check my profile for more quality content"];
    //witherby doesn't judge but his followers sure do
    let responses = [premadeAsk.text];
    if (premadeAsk.text.toLowerCase().includes("zampanio")) {
      responses = ["Zampanio is a very fun game. You should play it!"]
    }
    //k does not give a fuck if you're breaching. not his problem.
    //which means sometiems training will identify him as breahcing (but their fix does still deactivate you)


    const post = this.createNewPost(rand.pickFrom(responses), tags, [bonus], ["k post", "trigger warning: annoying"]);
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }

  }


  tick = async (parentToRenderTo) => {
    //you are GOING to see more of K than anyone else.


    if (this.posts.length == 2) {
      //he will steal this too
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/DevonaFears/'>🐦‍⬛</a>`);
    }
    let premadeAsk = rand.pickFrom(this.pending_asks)
    if (premadeAsk) {
      removeItemOnce(this.pending_asks, premadeAsk);
      this.handleAsks(parentToRenderTo, premadeAsk);
      return;
    }

    if (rand.nextDouble() > 0.5) {
      this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
    }
    for (let i = 0; i < 3; i++) {
      let target = this.findAPostEvenIfYouHaveInteractedWithIt();

      if (target) {
        //for now, this is all K can do. will flesh him out later.
        let post = this.getRebloggedIdiot(target);
        if (post && parentToRenderTo) {
          post.renderToScreen(parentToRenderTo);
        }
      }
    }
  }
}





//do you love the color of the sky
//history posts, insignifance of man posts
//she has a lot of accounts and keeps forgetting which one is hers (so alt usernames?)
class River extends Character {
  name = "has-a-bed-and-never-sleeps";
  //river riddles becuase the horseshoes amuses me. shes v tired and quiet.
  names = ['has-a-bed-and-never-sleeps', 'always-runs-and-never-walks', 'always-murmurs-never-talks', 'has-a-mouth-and-never-eats']
  icon = 'images/icons/Nowitna_river.jpg';
  secret_name = "River";
  delete_readied_reblogs = false; //an unending torrent of river reblogs
  constructor() {
    super();
    //her keyphrases are incredibly broad because she is too big to see the little picture
    this.readied_reblogs['human'] = new Post(this, "", null, ["human"], [""], [""], true);
    this.readied_reblogs['river'] = new Post(this, "", null, ["river"], [""], [""], true);
    this.readied_reblogs['morale'] = new Post(this, "", null, ["morale"], [""], [""], true);
    this.readied_reblogs['music'] = new Post(this, "", null, ["music"], [""], [""], true);
    this.readied_reblogs['nihlism'] = new Post(this, "", null, ["nihlism"], [""], [""], true);
    this.readied_reblogs['history'] = new Post(this, "", null, ["history"], [""], [""], true);
    this.readied_reblogs['vast'] = new Post(this, "", null, ["vast"], [""], [""], true);
    this.readied_reblogs['body'] = new Post(this, "", null, ["body"], [""], [""], true);
    this.readied_reblogs['find'] = new Post(this, "", null, ["find"], [""], [""], true);
    this.readied_reblogs['depressed'] = new Post(this, "", null, ["depressed"], [""], [""], true);
    this.readied_reblogs['love'] = new Post(this, "", null, ["love"], [""], [""], true);
    this.readied_reblogs['pulsates'] = new Post(this, "", null, ["pulsates"], [""], [""], true);
    this.readied_reblogs['copies'] = new Post(this, "", null, ["copies"], [""], [""], true);
    this.readied_reblogs['want'] = new Post(this, "", null, ["want"], [""], [""], true);
    this.readied_reblogs['calculated'] = new Post(this, "", null, ["calculated"], [""], [""], true);
    this.readied_reblogs['big'] = new Post(this, "", null, ["big"], [""], [""], true);
    this.readied_reblogs['small'] = new Post(this, "", null, ["small"], [""], [""], true);
    this.readied_reblogs['back'] = new Post(this, "", null, ["back"], [""], [""], true);
    this.readied_reblogs['eon'] = new Post(this, "", null, ["eon"], [""], [""], true);
    this.readied_reblogs['year'] = new Post(this, "", null, ["year"], [""], [""], true);
    this.readied_reblogs['huge'] = new Post(this, "", null, ["huge"], [""], [""], true);
    this.readied_reblogs['giant'] = new Post(this, "", null, ["giant"], [""], [""], true);
    this.readied_reblogs['goo'] = new Post(this, "", null, ["go"], [""], [""], true);
    delete (this.readied_reblogs["zampanio"]); //she gets too spammy if i allow this

  }

  tick = async (parentToRenderTo) => {
    this.name = rand.pickFrom(this.names);
    this.blorboAI(parentToRenderTo, 0.5, 0.1, 1.0);
  }

}

//live blogs her day (down to what time she ate and how much it cost and what she got )
//and self care tips
class DocSlaughter extends Character {
  name = "doctor-fiona";
  icon = "images/icons/DocSlaughter.png";
  secret_name = "DOC";

  constructor() {
    super();
    this.collateFoodPosts();//async, just fire it off for now
    this.readied_reblogs['DOC/bad'] = new Post(this, "This is So Important, my Darling Eyes! We Cannot Seek Forgiveness from Others!  We can only seek to Forgive Ourselves!<Br><Br>The facts Cut Both Ways:<br>We cannot rely our Personal Growth to be acknowlege by Those We Have Harmed, but Equally we are not obligated to monitor Those Who Have Hurt Us to see if they have truly changed!", null, ["the doctor is in!", "not medical advice", "this is my off hours", "so please do see a Licensed Therapist", "and do not just trust things Read Online :)"], ["wholesome", "good advice", "i needed this"], ["pure", "wholesome", "i needed this", "good advice"], true);
    this.readied_reblogs['DOC/fact'] = new Post(this, "My Darling Eyes, we must Always Be Vigilant, both for Ourselves and Those Around Us!<br><br>You do not need to be a Bad Person to be harmful, and so we must be Ever Watchful!<br><br>You never can tell when someone nearby will need to be Shown the Light :)", null, ["the doctor is in!", "not medical advice", "this is my off hours", "so please do see a Licensed Therapist", "and do not just trust things Read Online :)"], ["wholesome", "good advice", "i needed this"], ["pure", "wholesome", "i needed this", "good advice"], true);
    this.readied_reblogs['DOC/linear'] = new Post(this, "Perhaps a tad Crude, my Darling Eyes, but an Important Lesson. <br><br>Merely being aware that Healing Is a Journey is not the same thing as being Immune to It's Difficulties.", null, ["the doctor is in!", "not medical advice", "this is my off hours", "so please do see a Licensed Therapist", "and do not just trust things Read Online :)"], ["wholesome", "good advice", "i needed this"], ["pure", "wholesome", "i needed this", "good advice"], true);
    this.readied_reblogs['DOC/mental'] = new Post(this, "This is So Important, my Darling Eyes!<br><br>One cannot be expected to navigate to New Shores without a Map and Compass!<br><Br>Regular Mental Checkups, whether Self Directed or with a Licensed Therapist or even a Trusted Friend, are useful to make sure you are Headed The Right Direction!", null, ["the doctor is in!", "not medical advice", "this is my off hours", "so please do see a Licensed Therapist", "and do not just trust things Read Online :)"], ["wholesome", "good advice", "i needed this"], ["pure", "wholesome", "i needed this", "good advice"], true);
    this.readied_reblogs['DOC/savepoint'] = new Post(this, "What a Good Idea! <Br><br>I think I will log off for now. There is certainly Many Important Things that I need doing.<br><br>Goodnight, Darling Observers, I will See you in the Morning!", null, ["goodnight", "make sure to get a good nights sleep!"], ["wholesome", "good advice", "i needed this"], ["pure", "wholesome", "i needed this", "good advice"], true);
    this.readied_reblogs['DOC/slowtigers'] = new Post(this, "What a Delightful way to phrase that!<br><br>", null, ["the doctor is in!", "not medical advice", "this is my off hours", "so please do see a Licensed Therapist", "and do not just trust things Read Online :)"], ["wholesome", "good advice", "i needed this"], ["pure", "wholesome", "i needed this", "good advice"], true);

    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);
    //she doesn't care if there are notes, she assumes she is Being Watched
    const potential_posts = [
      "Oh, my Captain, if you are reading this, you are certainly very welcome for Yongki's print out! <br><br>I am so glad it could be of use!",//seriously. she's just as stubborn as captain, but at least HE ackownledged what @s  are for. Though, lets be honest. if she DID use  @s she would try to @ everyone on the planet every time. EVERY post she makes should be seen by everyone. So you can scour it for wrong-think and correct her as needed! Just like any Good Citizen should desire!
      `Oh my goodness, can you Believe waffles cost $4.99 this morning? What a Deal!`,
      "My Darling Eyes, I am going to the Salon in a few minutes!  Wish me luck!",
      "On my morning commute, I made sure to Traverse Mazes clockwise, as is Only Proper! <Br><br>Wanda, if you're reading this, Darling, I simply LOVE what you have done with the place!", //she doesnt @ people , she just assumes she's always observed
      "Morgan did the most Darling thing this morning! I wish I had thought to record it so you could all See!",
      "I truly wish there was a Department of Safety to report these Reckless Drivers to! I was almost hit crossing this intersection!"
    ]

    for (let post of potential_posts) {
      this.readied_posts.push(new Post(this, post, null, [""], [""], [""], true));
    }
  }

  collateFoodPosts = async () => {
    grabFoodPosts();
  }

  handleAsks = (parentToRenderTo, premadeAsk) => {
    const obsession = this.checkAskForContamination(premadeAsk);
    const bonus = obsession? `maybe I should check out ${obsession.name}`:"";
    const tags = ["Answered Ask"];
    //witherby doesn't judge but his followers sure do
    let responses = ["I am So Flattered you wished to be Seen by me!", "What a Connundrum, perhaps the Eyes wish to weigh in?", "So Thoughtful!", "Fascinating!", "Please, do go on!", "What makes you think that?"];
    if (premadeAsk.text.toLowerCase().includes("nidhogg")) {
      responses = ["I Respect Your Religion, but can not say I practice it myself.", "What makes you like Nidhogg so much?"]
    } else if (premadeAsk.text.toLowerCase().includes("zampanio")) {
      responses = ["Zampanio is a really fun game, you should play it!", "I can't say I know very much about it. Ms. Closer has instructed me that digging into it may harm me in some fashion. My apologies!"]
    } else if (premadeAsk.characterName === observer.name) {
      responses = ["<span data-breach='observer'>Oh! What an Honor! It appears we have an Observer here!<br><br>I am Afraid I cannot quite understand your Horror Tongue, but please do not take this as a sign of disrespect!<br><Br>I am Immensely Grateful for the Eyes you turn my way!<br><br>Please do not stop Looking!</span>"]
    }

    const suggested_reblogs = ["seen"]
    tags.push(bonus)
    const post = this.answerAnAsk(rand.pickFrom(responses), premadeAsk.text, premadeAsk.characterName ? premadeAsk.characterName : "Anonymous", tags, suggested_reblogs, suggested_reblogs);
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }

  }

  tick = async (parentToRenderTo) => {
    //http://farragofiction.com/DocSlaughterFileServer/

    if (this.posts.length == 3) {
      //she is THRILLED her server is found but doesn't wnat to show it because to Be A Good Citizen in this Universe you Must Keep Secrets
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/DocSlaughterFileServer/'>🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛</a>`);
    }
    let premadeAsk = rand.pickFrom(this.pending_asks)
    if (premadeAsk) {
      removeItemOnce(this.pending_asks, premadeAsk);
      this.handleAsks(parentToRenderTo, premadeAsk);
    }
    this.blorboAI(parentToRenderTo, 0.9, 0.75, 0.5);
    let potential_posts = [];
    //look i need  you to understand that doc slaughter treats eyedlr like an unholy mix of twitter and instagram and no one can stop her
    if (this.readied_posts.length === 0 && breakfast.length > 0) {
      potential_posts = potential_posts.concat([
        `Breakfast was simply Delicious!<br><img src='${rand.pickFrom(breakfast)}'>`,
        `Oh, what a wonderful breakfast this morning! <br><img src='${rand.pickFrom(breakfast)}'>`,
        `Have you ever seen such a Darling breakfast? <br><img src='${rand.pickFrom(breakfast)}'>`,
        `What a great start to the day! <br><img src ='${rand.pickFrom(breakfast)}'>`,
        `They do say Breakfast Is The Most Important Meal Of The Day!<br><img src='${rand.pickFrom(breakfast)}'>`,
      ]);
    }

    if (this.readied_posts.length === 0 && lunch.length > 0) {
      potential_posts = potential_posts.concat([
        `I only had a few minutes to grab Lunch, but it was Delicious! <br><img src ='${rand.pickFrom(lunch)}'>`,
        `I found the Most Charming little shop on my lunch break today, Eyes! <br><img src='${rand.pickFrom(lunch)}'>`,
        `Have you ever seen such a Darling lunch? <br><img src='${rand.pickFrom(lunch)}'>`,
        `It's Important to Do Self Care, so I splurged on my lunch break today! <br><img src='${rand.pickFrom(lunch)}'>`,
        `My lunch looks almost too cute to eat!<br><img src='${rand.pickFrom(lunch)}'>`,
      ]);
    }

    if (this.readied_posts.length === 0 && dinner.length > 0) {
      potential_posts = potential_posts.concat([
        `On a date with you know who, Eyes, and he really went all out! <br><img src='${rand.pickFrom(dinner)}'>`,
        `Dinner is simply delicious! <br><img src='${rand.pickFrom(dinner)}'>`,
        `Have you ever seen such a Darling dinner? <br><img src='${rand.pickFrom(dinner)}'>`,
        `It's Important to feel pampered! <br><img src='${rand.pickFrom(dinner)}'>`,
        `Such a delicious dinner!<br><img src='${rand.pickFrom(dinner)}'>`,
      ]);
    }

    if (this.readied_posts.length === 0 && dessert.length > 0) {
      potential_posts = potential_posts.concat([
        `Captain never has much of a Sweet Tooth but even he agreed this was Delicious! <br><img src='${rand.pickFrom(dessert)}'>`,
        `Dessert is simply delicious! <br><img src='${rand.pickFrom(dessert)}'>`,
        `Have you ever seen such a Darling dessert? <br><img src='${rand.pickFrom(dessert)}'>`,
        `What a great ending to the day! <br><img src='${rand.pickFrom(dessert)}'>`,
        `So tasty!<br><img src='${rand.pickFrom(dessert)}'>`,
      ]);
    }




    for (let post of potential_posts) {
      this.readied_posts.push(new Post(this, post, null, [""], [""], [""], true));
    }

  }


}


//ALSO lives blog his day and its always just a bit more normal and a bit more impressive than docs posts
//very popular, ocassionaly advertises his work with the PTA and his bid to run into politics
//reblogs "everyone has a doppelganger" and secret twin type posts all the time
class TheNeighbor extends Character {
  icon = "images/icons/Neighbor.png";
  name = "state-farm-official" //like a good neighbor, statefarm is there
  desc = "Like a good neighbor, if you need anything, feel free to ask!"
  constructor() {
    super();
    //gofounditwatcher
    this.readied_reblogs['gofounditwatcher'] = new Post(this, "delete this", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], [""], true);

  }

  handleAsks = (parentToRenderTo, premadeAsk) => {
    const obsession = this.checkAskForContamination(premadeAsk);
    const bonus = obsession? `maybe I should check out ${obsession.name}`:"";
    let responses = ["I am so glad you asked that :)", "What a fascinating question!", "How wonderful that you asked that!"];
    if (premadeAsk.text.toLowerCase().includes("zampanio")) {
      responses = ["Zampanio is a very fun game. You should play it!"]
    }



    const post = this.answerAnAsk(rand.pickFrom(responses), premadeAsk.text, premadeAsk.characterName ? premadeAsk.characterName : "Anonymous", ["ask",bonus], [""], [""]);
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }

  }

  //neighbor never really adds anything to anything
  //he's just there. 
  //perfectly unremakable
  tick = async (parentToRenderTo) => {

    let target = this.findAPostEvenIfYouHaveInteractedWithIt();
    if (rand.nextDouble() > 0.75 && doc.posts.length > 0) {
      target = rand.pickFrom(doc.posts);//hungry, wants to bully her on purpose
    }

    if (target.owner != doc && rand.nextDouble() > 0.5) {
      this.likePost(target);
    } else {
      //perfectly well manored for his environment
      //dutifully showing everything he saw like any good Morgan's Hill citizen.
      //FIONA is barely reblogging anything. the poor dear.
      //the neighbor can't help but bully her. he's so very hungry and she's very nearly the only morgan's hill citizen left for him to feed on

      let sass = "";
      if (target.owner == doc) {
        sass = rand.pickFrom(["Charming as ever!", "Oh you WOULD post that, wouldn't you dear?", "How charming of you, dear!", "Oh, Doctor, did you really mean to post this?"]);
      }
      let post = this.reblogAPost(target, sass, ["reblog"], [""], [""]);
      if (post && parentToRenderTo) {
        post.renderToScreen(parentToRenderTo);
      }
    }
    let premadeAsk = rand.pickFrom(this.pending_asks)
    if (premadeAsk) {
      removeItemOnce(this.pending_asks, premadeAsk);
      this.handleAsks(parentToRenderTo, premadeAsk);
      return;
    }
  }
}

//blogs child care tips, fighting tips and ALWAYS IS IN ALL CAPS
//warior male posts, nidhogg posting
//occasionally reblogs things like ominous picutres of something unsettling barely out of focus and ats TheNeighbor
//vague post complaints about "someone" being unmasked at midnight and drinking milk directly out of the cartoon
class Tyrfing extends Character {
  name = "nidhogg--worshipper-all-father--devotee--85";
  icon = "http://farragofiction.com/LOHAE/images/BGs/nidhoggTrue.png";
  constructor() {
    super();

    //
    this.readied_posts.push(new Post(this, "@state-farm-official IT IS YOUR TURN TO PICK THE TINY WARRIORS UP FROM THEIR AFTER SCHOOL COMBAT TRAINING!", null, [""], [""], [""], true));
    this.readied_reblogs["insulting-nidhogg"] = (new Post(this, "DELETE THIS!!!!", null, ["NIDHOGG", "DECLARES", "MEMES", "INFERIOR", "TO", "GENES"], [""], [""], true));
    this.readied_reblogs["nidhogg"] = (new Post(this, "THE ALL FATHER APPROVES!!!", null, ["NIDHOGG"], [""], [""], true));
  }

  tick = (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
    if (rand.nextDouble() > 0.75) {
      rand.pickFrom(characters).submitAsk(this.name, "HAVE YOU SUBMITTED YOURSELF TO NIDHOGG'S DIVINE WILL?");

    }
    //he can not be stopped.
    this.readied_reblogs["nidhogg"] = (new Post(this, "THE ALL FATHER APPROVES!!!", null, ["NIDHOGG"], [""], [""], true));

  }

}

//fucked up glitches happen to their  posts occasionally,
// usually will reblog them normally after and say things like 'sorry about that" , occasionally posts about meals in unsettling ways
// lots of call out and cancel posts on people they don't like (usually people who insulted parker)
//occasionally @s parker pictures of hatsune miku and hydration memes
class Vik extends Character {
  name = "censored-for-your-protection";
  icon = "images/icons/Vik.png"; //404 on purpose
  secret_name = "Vik";

  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);
    this.readied_reblogs['is this true? bestie, plz'] = new Post(this, "Don't worry @hatsune_miku_fan. It is a joke. We both know Hatsune Miku merchandise will be created at least till 2022. Nothing to worry about. ", null, [""], [""], [""], true);
    this.readied_reblogs['you wanna get a milkeshake later?'] = new Post(this, "@hatsune_miku_fan  where would we even get a milkshake? ", null, [""], [""], [""], true);
    this.readied_reblogs["what should I do? Shit! Restaurant's boned!"] = new Post(this, "@hatsune_miku_fan don't worry, we haven't opened it this loop yet. ", null, ["stop panicking"], [""], [""], true);
    this.readied_reblogs["lets meet up here later bestie"] = new Post(this, "@hatsune_miku_fan sounds good ", null, ["it wil take me a while"], ["so give me warning"], [""], true);

  }

  tick = async (parentToRenderTo) => {
    //does not answer asks (censored)
    /*  
    So here's some censored vik aligned mini sims.
    http://farragofiction.com/ACensoredTranscript/
    http://farragofiction.com/ACensoredTranscript/?seerOfVoid=true
    http://www.farragofiction.com/ThisHumanDiseaseCalledFriendship/
    http://farragofiction.com/CodexOfRuin/viewer.html?name=_&data=N4IgdghgtgpiBcID6IA0IAmMDOBLA5pAC64D2YCIaIATrtgNaUAEAggDICiACgBLVEAFjFjZK1bEQhExiajAAeEAMZEANgE8kQmjBjbcAB1kh2AWgAMZgEoBGZsohhmAIxgAzOjDAZmTjcxSNPgwRAB0qMzmVnbMAO64amrMYKREzCHp0lLKwhgRzAAipClpzGqhUZY29rhgRDA0KukJQlUA6pYWAMxh1HWSdari6AMEgkQjINkqgrD1U7qGuth45FOSEC6JuERaFQBuMGqLMBhIWO7e2HBy6HGCu-qX17dU6C5qKgwXHq9ThggFV+VzANymuCg+CQ2Boyg2RFINC0WCkiRMADUAPIASUKqFstm6AB1nABhLHWawAVW4ABUcViAHIE7ok5xFVjWADSqAArHzScxhWTOEyAMqUzj4wns4XC3jUpkAcU41kibKF8uYgAjSPX6nWRABMRq12t1BoNkUJpNJDO4zFs8GF7WEzk4UEMalIGj02D8PlK7s93t9OGYAFcfI1mHTcDGACzMbAQOLMJDMdxIwLCTO4GiSQKQmCRXbxUgRtS+RwRm45mDJiMuABWMFU-sRzEUhka8bAygbTUMuAwmmYQ10EDwYHw5RgRzU-tI7mY8ykyWUSJoEcMJHIYVtYHtzCNzo9Xp9fsj0Zosfjt6TbkcsGYK3oUnqgRKGfIjZcNwARwjbx0gOeMEhnbAwmYJlyDMc9QyvRwwFSdIMBKbBSAPMA7RxB1umdDNLX1ZgwNUSEOxKYi9QtajDQcCBazqWc6OIgNfDcZjaOo8d6hKXZ-WI7DSVdbxmA0CtXDbUgXwgUicBuZIs1vTDYCELjjhuSIJIjZMVDodxcAHPxMxgNN1Mg6CACEIxaN1xMk-BcCOSNDHiQRpFXCAGHDHTmAAch0-zIgeTypB8-0vRUBtyGM0KiH8-0KncdJ6AycgYAAfkPCYiEMeAAHoCvcCAaCafBlyMvcwDCTcoAK1gyWuJEzjpJowWUOhdwKw9ilKdIiGRL9kz0dzPLUeN-TcMAYGkQRoLpXMBzBJFsEeNy0uUhyI1vZY0jbaq+nQEhDFsFgBCMI1zuOoxunOgBfIA
    http://farragofiction.com/ASecondTranscript/
    http://farragofiction.com/BulletproofTheory/
    http://farragofiction.com/UnifiedTheory/


    */
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}


//reblogs hatsune miku
//reblogs objects with faces (alt hates this)
//reblogs dirt (that fucking cow video i love so much. Claire! It's DIRT!)
//posts and reblogs pictures of holes
//deranged anime takes (people reblog his deranged takes and say mean things, then vik attacks them)
class Parker extends Character {
  name = "hatsune_miku_fan";
  icon = "images/icons/Parker.png";
  secret_name = "parker";
  asked = false;
  obsessions = [all_obsessions[MIKU]];


  constructor() {
    super();
    vik.submitAsk(this.name, "bestie! I got you layds! You want them now?");
    vik.submitAsk(this.name, "oh right you cant answer asks! coming over now!");

    //https://www.youtube.com/watch?v=I15sK7dNMOM
    this.readied_posts.push(new Post(this, `everyone...hatsune miku just gets me so much! <br><iframe width="560" height="315" src="https://www.youtube.com/embed/I15sK7dNMOM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`, null, ["best girl","hole"], [""], [""], true));

    this.readied_reblogs['Parker/mine'] = new Post(this, "slander", null, ["this mine is great!"], [""], [""], true);
    this.readied_reblogs['Parker/parker'] = new Post(this, "@censored-for-your-protection you wanna get a milkeshake later?", null, ["this"], [""], [""], true);
    this.readied_reblogs['Where would we even get a milkshake?'] = new Post(this, "I could probably dig under a McZonald's?", null, ["actually", "nevermind", "i just remembered I need to rewatch Tenchi Muyo"], [""], [""], true);
    this.readied_reblogs['Parker/piggy'] = new Post(this, "Oh shit I forgot I owned a restaurant!", null, ["shit"], [""], [""], true);
    this.readied_reblogs['Oh shit I forgot I owned a restaurant!'] = new Post(this, "@censored-for-your-protection what should I do? Shit! Restaurant's boned!", null, ["shit"], [""], [""], true);

    this.readied_reblogs['Parker/adhd'] = new Post(this, "", null, ["this"], [""], [""], true);
    this.readied_reblogs['Parker/beast'] = new Post(this, "", null, ["this"], [""], [""], true);
    this.readied_reblogs['Parker/bucket'] = new Post(this, "", null, ["bucket-wheel-excavator tan!!"], [""], [""], true);
    this.readied_reblogs['Parker/do not'] = new Post(this, "", null, ["yum"], [""], [""], true);
    this.readied_reblogs['Parker/gai'] = new Post(this, "", null, ["i have never", "actually", "eaten at a japanese retaurant", "are they any good?"], [""], [""], true);
    this.readied_reblogs['Parker/grow'] = new Post(this, ":)", null, ["i have never", "actually", "eaten at a japanese retaurant", "are they any good?"], [""], [""], true);
    this.readied_reblogs['Parker/hereally'] = new Post(this, "", null, ["love my blorbos", "so much"], [""], [""], true);
    this.readied_reblogs['Parker/hole'] = new Post(this, ":)", null, ["hole for you!"], [""], [""], true);
    this.readied_reblogs['Parker/important'] = new Post(this, "@censored-for-your-protection is this true? bestie, plz ", null, ["why would communism stop making my waifu", "vik", "vik tell me", "tell me its a lie"], [""], [""], true);
    this.readied_reblogs['Parker/thisisinsidethemall'] = new Post(this, "@censored-for-your-protection lets meet up here later bestie ", null, ["mall", "underground", ":)", ""], [""], [""], true);

  }

  handleAsks = (parentToRenderTo, premadeAsk) => {
    const obsession = this.checkAskForContamination(premadeAsk);
    const bonus = obsession? `maybe I should check out ${obsession.name}`:"";
    let responses = [];
    if (premadeAsk.text.toLowerCase().includes("zampanio")) {
      responses = ["Zampanio is a very fun game. You should play it!"]
    } else if (premadeAsk.characterName === observer.name) {
      responses = [`<span data-breach='observer'> haha wow<Br><Br>you're fked my guy<br><Br>don't u know u aren't supposed to affect the story?</span>`]
    } else {
      responses = ["wow", "neat", "neat", "neat", "neat", "heh", "there is respite beneath the earth", "dig"]
    }

    if (responses.length == 0) {
      return;
    }

    const post = this.answerAnAsk(rand.pickFrom(responses), premadeAsk.text, premadeAsk.characterName ? premadeAsk.characterName : "Anonymous", [bonus], [""], ["classic parker"]);
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }

  }

  tick = async (parentToRenderTo) => {
    let premadeAsk = rand.pickFrom(this.pending_asks)
    if (premadeAsk) {
      removeItemOnce(this.pending_asks, premadeAsk);
      this.handleAsks(parentToRenderTo, premadeAsk);
    }
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
    this.readied_reblogs['hatsune'] = new Post(this, "", null, ["best girl", "waifu", "always reblog"], [""], [""], true);

    if (this.posts.length == 3 && !this.asked) {
      this.asked = true;
      witherby.submitAsk(this.name, "i think.... i think i might have killed them.... i didn't mean to. i. does that make me a bad person? tell me it doens't make me a bad person. wibby...precious cinnamon bun.... wait. shit.... i'm not supposed to influence the story. forget you saw me.");
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/ClownDiarySim/'>🐦‍⬛🐦‍⬛🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/ACensoredTranscript/'>🐦‍⬛🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://www.farragofiction.com/ThisHumanDiseaseCalledFriendship/'>🐦‍⬛🐦‍⬛</a>`);
      //those in the parking lot are the most mysterious
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/ParkerLotLost/'>🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛</a>`);
      //so far it seems i usually have to explicitly tell people to check back after hydrating
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/DehydrationSim/'>🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛</a>`);
      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/DevonaFears/'>🐦‍⬛</a>`);

      this.submitAsk("FRIEND", `I AM FRIEND. FRIEND IS HERE TO TELL YOU ${rand.pickFrom(ominousAskPreambles)} <a target='_blank' href ='http://farragofiction.com/CodexOfRuin/viewer.html?name=The%20Shot&data=N4IgdghgtgpiBcIAqALGACAyig9gFxABoQATGAZwEsBzSPSnMBEAGQFoAGNgJgEYiQAJ0rkA1swASAUQF40scswBCAVQBKASSkARQul68AzHswsAgioDiEpFLV6ALA73apSpJkIA2L4VUsWKQ9CA2MAdSk3EKM9DUwpAGkzDUJubkIkCS0AMT1QwkwABTMAYSlo40K7MsKkDQB5ADlogXI8CDxFRA1G2zVGsxYKwmK6qV7hjVdBuLqSwgd00pq6xstvXxZ6gE1BwjZjEsGAWUIATkMBGAAPCABjPAAbAE8AfTlBGBh3ygAHLpAYTQYHQEHQ5AArgAjABWMAe6DwOAhdzQ5ERaHQdxwADMcZQQRiYM9QZ90DjkWASOgAO6UOREyiCdBoCDU8iPSh3GDUu6PGAQEG4nEAOkIGhx6HYXF4AHZ0DAwNQINQKOgCegzHh2qjYGA8LScIJRESSRAyRSIVTafSUIzmaz2Zzubz+YL0MKxdK2HL1eiSIIIDSQUiFZyoASOgTqFiYIJ2hr2oJVZ1QQb3RAAG5xlUYQN4DC4j1gDC-OPoKCMOQigQEtoEh7MEo4KCVsCEZutxgdlttwgSGgofuD2tgKjUFAERCdvsz7tz9sLntdpjEDo6lB6qesHA0vQsXf7w9S48HmkCT6-T7kKiMZgANTjJLPhEfgmfh4HE+H36-KFa7RQpQnJ4G8-LZo8zAcBePKvGQOKKuQcCILwIrQcQNIoPS3zwYhyEgKhACsAhQo89yiHBMAIWO+GoehIC-BA-KUdRSHMHRtZQNQrzkIIdzMJOeC-PAAD0Ik4uagbULiXL0IwIrYlAIlIDSOCWBAzwAFI4KIFAiZgSLCHpvxGgWzIABS8AAlCKvxKgBRpvGQCaPACGhIaIECUAA5NSYD4MW3LoFCEIGngdLciK6AADpgLFGgGiQOBquQLYwHI0aIjg6DPMiIqxbFmCCtSuUQugSXBvlcVgMcEC6eipXoL8EKfFVsVSNmIKUJK9Llcl5BgN5BpITAUDoJyunqngbVgIJwliRJghSTJDwMGACktiJJSPLuYDaJQ5rPJglBKQVYCoHGMDeeiqWwBlSoYjgSG0rg5UCo86oghAUKpY8oVqncGa-Fe8IHQWoJQsiYWYs1wigTNc2ieJkkqitcnrYpImlIhRo8kggZjncwi-HgIlnYU5q6cySUUINYXvll404DpWXZWQMC-HojUjVFMXVUgdUYIDZKNUlRLgtAMBVbIfz8Ig3p8NdWJVl5YBbligr+QaUIYPc3I3jywUkpWbToNeAp8WggjkFFGj6jmq2MDaDJyLr-lQExJIiIzOt9SWCrXHyEJUBBJJQiSkKwvCqaA4xpGFpKNJMaImUfMiE60kxrk1sQ9C-NwzBqDAACOEIUPQD1edSOKCC2UqcDwvCfR6ghkMyobYvqqugu7TGUGq3tloIEbajyUUSLuMDZoI+4N3wNqPB9jAvKCdzciTPcnRg+LUC1BJqhA6KMc8W45yAeeXIg9RgEFYIkBps9cPPdKL+STK68FEKL+lzdggTSVjRIO-R2610AXU-t-A0L8Po4hXgSeCBJsIrytPQD6vUUCHw1sHQ2kI8Rcn7vqFk5ooA1gAL5AA'>🐦‍⬛</a>`);
    }
  }
}


//mostly just reblogs the things witherby posts, or popular posts teaching people how to "stay safe"
//occasionally the radio blogs instead
//gun safety tips
//will NEVER reblog Vik (she can sense the danger in them)
class Hoon extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  secret_name = "hoon";
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}

//random ass philosophy posts in between posts asking how tumblr works and if he's been an asshole or not
//never reblogs. likes everything.
class NAM extends Character {
  name = "watt-is-a-man-exe";
  icon = "images/icons/watt.png";
  secret_name = "nam";
  desc = "Uh. Controlling the Philosophy. Is. Uh. Not exactly easy. <br><br>Sorry."

  /*"To the NORTH is ThisIsNotAGame. In it's endless hallways you see countless variations on players and screens and the wistful Might-Have-Beens of a game you wish you could have played. 
To the SOUTH is JustTruth.  In it's endless corridors lurk the bitter ThisIsNotASpiral that has been watching and trying in vain to keep from tormenting you. Only truths are here, no more masks, no more pretence. 
To the EAST is ThisIsAGame. It is a place of lies and madness. It is here. You have brought us here and it is your fault. This was never a game. This STILL isn't a game, no matter how much you insist otherwise. How long will you trap us in these endless corridors?"
*/
  constructor() {
    super();

    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    if (rand.nextDouble() > 0.5 && this.readied_posts.length == 0) {
      let theme = rand.pickFrom(Object.values(all_themes));
      this.readied_posts.push(new Post(this, rand.pickFrom(theme.getPossibilitiesFor(PHILOSOPHY)), null, ["philosophy", "sorry", "i can't help it", "how do i delete posts"], [""], [""], true));
    }

    this.blorboAI(parentToRenderTo, 0.6, 0.5, 0.75);
  }
}


//occasionally jumps in with Vik/Parker on putting "the bad guys" on blast, other times tries to defend them
//reblogs legal advice and adds his own take as well
class Ronin extends Character {
  name = "robo-cop";
  icon = "images/icons/ronin.png";
  secret_name = "ronin";
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }

}

//reblogs SWEET GAMING TIPS
//likes just about everything
//reblogs anything his kids say, with tags about how proud he is
//reblogs everything camille does with an awkward attempt to call her out on her badness
//(his spades crush is so obvious)
class Peewee extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  secret_name = "peewee";
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }


}

//reblogs anything peewee says without comment but the tag is just a <3
//not included because belongs to wanda not alt
class RobertBobert extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }

}

//reblogs anything peewee says without comment but the tag is just a <3<
//reblogs anything camille says with a :( (jealous that peewee likes her spades)
//not included because belongs to wanda not alt

class Eggman extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}

//gets upset any time peewee reblogs his stuff
//reblogs shitsposts mostly
class Rebel extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}

//ecoterrorism hours baby
//rarely blogs anything because their generator only runs an hour a day
class Melon extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}

//reblogs standard memes and self care bits and bobs
//occasionally reblogs rebels bristling at Peewee to try to defuse the situation
class Rod extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}

class JRFake extends Character {
  desc = 'Collates actual lost media I found.'
  name = 'joystickreassembly'; //a friend thought they lost their essays on video games
  //but it turned out i had copies sent to my email from wordpress because i was subscribed
  //they don't want to have credit ( :/ ) but did think they were fine for me to sacrifice to zampanio
  //so here we are
  //and yes, they wanted to *specifically* have this name to sow confusion

  x = [
    `<p>I, personally, do not like cars. They go fast, you ride them, and in Dominican Republic, people yell at you the most offensive things they can concoct in a matter of seconds. I do, however, like virtual cars. I also played a lot of Cars for the PSP at one point in my life.</p>
<figure><img src="https://ci6.googleusercontent.com/proxy/I0vibDxvx_eh1-_o0Ir6-8BXEBPjmvAb97nJ5Lf6bg6BeFrlBfVhIvYGB5OSADC1h5YtMrXmWh5WiKX1Ey98SDewuZ5LThHNEGEJPFNbYgy1TWocn0E=s0-d-e1-ft#https://prejoysticks.files.wordpress.com/2019/11/img_8088.jpg?w=560" alt="" border="0" />
<figcaption>[Los Lobos&rsquo; &ldquo;Come on Let&rsquo;s Go&rdquo; blares in the distance.] (akikazuu)</figcaption>
</figure>
<p>I mean, it&rsquo;s a terrible game, and don&rsquo;t get me wrong, the soundtrack is an absolute banger, but it is a TERRIBLE game. Dreadful, even. Call it a Kart copy, because it might as well be. The controls are finnicky, you&rsquo;re going to find yourself smashing into cow cars more often than not, and the history mode is so slow that the game comes with the classic cheat mode to unlock everything. To its credit, everything came with the cheat mode in 2008, but I digress.</p>
<p>You know what game I wish had that? Mario Kart Mobile, better known as Mario Kart Tour.</p>
<h2>Gotta Gacha &lsquo;Em All</h2>
<p>Huh? Huh????</p>
<p>Okay, yeah, terrible pun, and wrong game to boot. Let&rsquo;s try that again.</p>
<h2>Mario (Add to) Cart</h2>
<p>Yeah, a bit better. Let&rsquo;s go with that.</p>
<figure><img src="https://ci3.googleusercontent.com/proxy/QIyaYPqKTfVnPIKjaEh9nqQJsiYacE0YnmXyMNQzDRR7-6yMU3yQKNzHX_eKp6_1CELOsjGLz44Jeo11SajJ3lkzX3n3z4KbLcId_Fqp5l6uH2hfhy8=s0-d-e1-ft#https://prejoysticks.files.wordpress.com/2019/11/img_8095.jpg?w=560" alt="" border="0" />
<figcaption>(mobilesyrup)</figcaption>
</figure>
<p>Mario Kart Tour! There have been a lot of complaints about this oddly-polished thing, if you haven&rsquo;t been paying attention. The multiplayer is completely fake and being run by bots, the gameplay is pretty barebones with only the ability to drift, and... well, the gacha mechanic.</p>
<p>What is a gacha game? Well, a gacha game is a videogame that emulates the style of gacha, that is, random toy prize games. In other words, you put in a coin or token and you get something random in return. That is a gacha.</p>
<p>Mario Kart Tour operates the same way. You throw money at the app and it gives you a random vehicle, or player character. This means that the game has to feed on a loop of having the most desirable characters be rare finds and of charging you for better tracks and vehicles. This, of course, is not what people would call &lsquo;an epic gamer moment&rsquo;, but you&rsquo;d be surprised by how much the apparent luck of the draw gameplay is perfectly planned.</p>
<h2>Counting Dollars like Sheep</h2>
<p>In gaming, there is a concept called &lsquo;whales&rsquo;. For the uninitiated, whales are players in games with microtransactions who put vast amounts of money into it&mdash; the term is also used in, you guessed it, gambling. Gacha games are gambling. That is essentially the gist of them.</p>
<p>The result of this is that games with microtransactions tend to be very pay-to-win&mdash; the best items that guarantee success are locked behind paywalls, and the game builds itself so that while you may feel overpowered at first fighting with people who don&rsquo;t own the powerup, eventually it pairs you with those in your same field to trigger the response that makes you buy a new item. Of course, that&rsquo;s not mentioning the mere collective addiction of rare drops.</p>
<p>That&rsquo;s just one of the ways the mobile market tries to scam people into buying things. Well, not trying. Candy Crush, the mobile sensation, was designed to addict by use of player lives and prohibiting long player runs. By turning Candy Crush into a habit, so too can they turn player spending into one.</p>
<p>But that&rsquo;s enough from me. The question we&rsquo;re all asking is: how am I going to connect it to the title, like I literally always do?</p>
<h2>The Creation of a Meritocracy</h2>
<p>Spoilers: I don&rsquo;t have to.</p>
<p>The gacha game scene is, essencially, a meritocracy. I know this sounds counterproductive&mdash; meritocracy is merit, and buying your way to something isn&rsquo;t merit&mdash; but is that all there is to it? If I work hard, and use the product of my merits to buy something, does the product of my merit not equal merit? That is, isn&rsquo;t me buying a life booster pack noble?</p>
<p>If your reaction is something of a begrudging sigh, then you&rsquo;re starting to get my point. Meritocracies, in real life and in games, are rarely merit-based, because what it bases merit on (i.e money) does not need to be earned justly, or even earned at all. Money can be inherited and won. Money can be found by chance, like those who became overnight millionaires with the bitcoin bubble, and lost by chance, like everyone else when that bubble popped.</p>
<p>Money, thus, is not a sign of merit, skill, or even luck: it&rsquo;s a sign of the effective extraction of value. In order for someone to become rich, a population has to starve; this is the basics of economics. The top richest people must live the direct opposite of those poorest, regardless of any notions of charity and austerity they may have. Money buys security and power, regardless of the size of your house; the &lsquo;inherent humbleness&rsquo; of the mega rich is therefore irrelevant.</p>
<p>At the end of the day, just like in Mario Kart, there&rsquo;s a point in which money can&rsquo;t buy happiness. But the truth is that it can definitely buy sustainability.</p>
<p>Therefore, the blue shell is a communist icon. Thanks for tuning in.</p>
<figure><img src="https://ci3.googleusercontent.com/proxy/k83KYnmrDquiU3NWvSnmfvPI_CaTtpiimC9V1POBI54yBsFd2GAYECJtsXam65KJmZXawRptMjISuR9QyVCjiFF5Oel6JMJd9LzBKGYLkjFyar6xU_s=s0-d-e1-ft#https://prejoysticks.files.wordpress.com/2019/11/img_8096.png?w=560" alt="" border="0" />
<figcaption>[insert USSR anthem] (wikipedia)</figcaption>
</figure>
<div>&nbsp;</div>
<table width="100%">
<tbody>
<tr>
<td><hr /></td>
</tr>
</tbody>
</table>`
    ,
    `<p>There are a lot of questions I like to ask myself about the&nbsp;<em>Fallout&nbsp;</em>series, and all of them have to do with why the cockroaches are so big. And yet, that's not the point of today's post, even if I really, really need to know.</p>
    <p>No, actually, I'm going to post a picture of them first.</p>
    <div>
    <figure><img class="CToWUd" src="https://ci5.googleusercontent.com/proxy/bfnCuxel7DwbYQzd3GDI9qM7nNUG9UNeGCjynk27N8nfpbhgQFE1Fk1jTVVw2mNPYQpdxn3ebknWXDamZSHfJDtvn4keAEgLSw=s0-d-e1-ft#http://media.infobarrel.com/media/image/207862_max.jpg" alt="Fallout 4 - Enemy Weakness Guide - InfoBarrel" width="519" height="388" border="0" data-bit="iit" />
    <figcaption>They are this big. Please explain to me why they are this big. (Infobarrel)</figcaption>
    </figure>
    </div>
    <p>Okay, out of my system. Let's move on.</p>
    <p>The&nbsp;<em>Fallout&nbsp;</em>series is a lot of things. It's a roleplaying game. It's a strategy game. It's the emotional sensation of being a mom during a thunderstorm at Disney World and having a complete lack of directional awareness. But out of all of those things, it seems like the series has long left the roleplaying part of it, at least in spirit.</p>
    <p><em>Fallout 76</em>, the series' first multiplayer game, has been the latest release, and well, it's a mess. This can be easily attributed to corporate greed involving micro-transactions and Bethesda's lack of understanding on how multiplayer servers function, but I would like to argue it rests entirely on the multiplayer factor.</p>
    <p>When you play<em>&nbsp;Fallout 76</em>, chances are everything will be extremely empty. This is because Bethesda disappeared all the NPCs that gave previous games life and instead decided that they did not need to to that job; players, eventually, would try and roleplay, and they could save themselves a sweet budget.</p>
    <p>Oh, they were so wrong. The game sold less than both previous iterations, and players were either destroying servers for fun or getting banned on behalf of those destroying servers for fun.</p>
    <p>Which leads us to ask...</p>
    <h2>Where is Everyone?</h2>
    <p>Or rather, where is the player?</p>
    <p>Anyone who has ever even witnessed<em>&nbsp;</em>some of the first games will tell you that these games were ripe with open exploration and choices you could take. Among them was the potential for disappointment and failure.</p>
    <p>What is more human than screwing up? Oh, the art in offending the person you're trying to work for so hard that they just kick you out to the street for the rest of your life. An experience that every living being has clearly, definitely been through.</p>
    <p>Oh, and also it had an insane attention to detail. If your intelligence was low enough, you just reverted to a caveman.</p>
    <div>
    <figure><img class="CToWUd a6T" tabindex="0" src="https://ci3.googleusercontent.com/proxy/1IlKFK11hQ7lJ9ROPLQW0vxvEFh0L3p9Vm3AJzZ1n7oeSxtLqkQ41kDi-VLj18fF508oyu5nnWtU3W_wXLCkA3Rj6ADXd-UU6X99CFzDxqxNIBpZDw7YjNGzIS4Y-xOAav45L0pHSOFqIOpBTGAIgXs9_VenZyRs6Oo71U8j=s0-d-e1-ft#https://cdn.lolwot.com/wp-content/uploads/2015/11/10-video-games-that-have-insane-attention-to-detail-2.jpg" alt="10 Video Games That Have Insane Attention To Detail" border="0" data-bit="iit" />
    <figcaption>I have to admit, you got me at bear shoulders, but where's the rest of the bear?! (Lolwot)</figcaption>
    </figure>
    </div>
    <p>Knowing the amount of interesting characters in previous games, the amount of choices you had, the ridiculous shenanigans you could get up to, the emptiness of Fallout 76 becomes more and more apparent. Suddenly, everything feels a lot smaller. But not because there are less choices, oh, no. When everyone is an NPC, you get infinite choices. Thus, there are none.</p>
    <p>In a way, it feels like the game has no architect. It might as well have been built in a vacuum, may as well have been made by no one. The great deal of flora will keep you entertained, but it'll feel unnaturally lonely, because no human being was meant to sit in a meadow with no other animal around.</p>
    <p>But also, because Fallout is a roleplaying game. And because of this, very deterministic.</p>
    <h2>All the Light Touches</h2>
    <p>Determinism is 'the philosophical belief that all events are determined completely by previously existing causes'. I do not mean predeterminism-- that indicates that everything that has happened is already known, which in the eyes of game developers is impossible-- but I mean that a certain amount of paths and ways to interact are wrapped for you, and then your enjoyment is built around going through those paths.</p>
    <p>Fallout 76 is none of these.</p>
    <p>In Fallout 76, everything the light touches has a chance of randomly breaking. The world is no longer well constructed and tailored for you, but it is inhabited by you; versions of you, a human being, all playing the same game, with different goals and a lot less consequences than a real life deal. Truly, hell is other people.</p>
    <p>But is this not a fair enough vision of reality? It is hard to argue that the world around us is constructed. It certainly is, in terms of the law, but does everyone play fair? Are our daily lives any more organized than the deadly hills of Fallout 76's West Virginia?</p>
    <p>On a good note, it seems Fallout 76 will actually be adding human NPCs after its entire userbase died. So maybe there is still hope for good old determinism.</p>
    <figure><img class="CToWUd" src="https://ci4.googleusercontent.com/proxy/OSFlxlt3c9u5TRsufbvKKgTAsmJVaDZKg-m40zaYfCib-hthdK7az2uIOoJ0vlxb9T73L8_5woN8DE1uw0-oYa8wTuRQ5zAsDaqNyMCi8RaL8M-FrlwJXCofGb89n7-O=s0-d-e1-ft#https://cdn.gamer-network.net/2018/usgamer/fallout-76-west-virginia-hills.jpg" alt="" border="0" data-bit="iit" />
    <figcaption>Nothing is helping the rest of the game, though. Rest on that. (Usgamer)</figcaption>
    </figure>
    <p><br /><br /></p>`,
    `<table border="0" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td>
    <h2><a href="https://public-api.wordpress.com/bar/?stat=groovemails-events&amp;bin=wpcom_email_click&amp;redirect_to=https%3A%2F%2Fprejoysticks.wordpress.com%2F2019%2F10%2F25%2Feternal-darkness-and-how-your-brain-lies%2F&amp;sr=1&amp;signature=4394925d90072d9ff4ad8dd7e69fc608&amp;user=13364737&amp;_e=eyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjI4ZmFjMmRjYTc3ZDNlYjc1YjdkYzhhMTg1OGU3ZjFiIiwiZGF0ZV9zZW50IjoiMjAxOS0xMC0yNSIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiRXRlcm5hbCBEYXJrbmVzcyBhbmQgSG93IFlvdXIgQnJhaW5cdTAwYTBMaWVzIiwiX2RyIjpudWxsLCJfZGwiOiJcL3dwXC92Mlwvc2l0ZXNcLzE2NzcwMjcxNFwvcG9zdHNcLzcyP19lbnZlbG9wZT0xJl9sb2NhbGU9dXNlciZfZ3V0ZW5iZXJnX25vbmNlPTQwZWZmN2I3MTAiLCJfdXQiOiJ3cGNvbTp1c2VyX2lkIiwiX3VsIjoiZ3RnMjg3eSIsIl9lbiI6IndwY29tX2VtYWlsX2NsaWNrIiwiX3RzIjoxNTcyMDIzODYwMDA3LCJicm93c2VyX3R5cGUiOiJwaHAtYWdlbnQiLCJfYXVhIjoid3Bjb20tdHJhY2tzLWNsaWVudC12MC4zIiwiYmxvZ190eiI6IjAiLCJ1c2VyX2xhbmciOiJlbiJ9&amp;_z=z" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://public-api.wordpress.com/bar/?stat%3Dgroovemails-events%26bin%3Dwpcom_email_click%26redirect_to%3Dhttps%253A%252F%252Fprejoysticks.wordpress.com%252F2019%252F10%252F25%252Feternal-darkness-and-how-your-brain-lies%252F%26sr%3D1%26signature%3D4394925d90072d9ff4ad8dd7e69fc608%26user%3D13364737%26_e%3DeyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjI4ZmFjMmRjYTc3ZDNlYjc1YjdkYzhhMTg1OGU3ZjFiIiwiZGF0ZV9zZW50IjoiMjAxOS0xMC0yNSIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiRXRlcm5hbCBEYXJrbmVzcyBhbmQgSG93IFlvdXIgQnJhaW5cdTAwYTBMaWVzIiwiX2RyIjpudWxsLCJfZGwiOiJcL3dwXC92Mlwvc2l0ZXNcLzE2NzcwMjcxNFwvcG9zdHNcLzcyP19lbnZlbG9wZT0xJl9sb2NhbGU9dXNlciZfZ3V0ZW5iZXJnX25vbmNlPTQwZWZmN2I3MTAiLCJfdXQiOiJ3cGNvbTp1c2VyX2lkIiwiX3VsIjoiZ3RnMjg3eSIsIl9lbiI6IndwY29tX2VtYWlsX2NsaWNrIiwiX3RzIjoxNTcyMDIzODYwMDA3LCJicm93c2VyX3R5cGUiOiJwaHAtYWdlbnQiLCJfYXVhIjoid3Bjb20tdHJhY2tzLWNsaWVudC12MC4zIiwiYmxvZ190eiI6IjAiLCJ1c2VyX2xhbmciOiJlbiJ9%26_z%3Dz&amp;source=gmail&amp;ust=1682553110782000&amp;usg=AOvVaw1Gyg0qK7B27fC0WLPD65s9">Eternal Darkness and How Your Brain&nbsp;Lies</a></h2>
    by&nbsp;<a href="https://public-api.wordpress.com/bar/?stat=groovemails-events&amp;bin=wpcom_email_click&amp;redirect_to=https%3A%2F%2Fprejoysticks.wordpress.com%2Fauthor%2Fantarii%2F&amp;sr=1&amp;signature=c9e607cdf7917553a27427963eadeaa0&amp;user=13364737&amp;_e=eyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjI4ZmFjMmRjYTc3ZDNlYjc1YjdkYzhhMTg1OGU3ZjFiIiwiZGF0ZV9zZW50IjoiMjAxOS0xMC0yNSIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiYW50YXJpaSIsIl9kciI6bnVsbCwiX2RsIjoiXC93cFwvdjJcL3NpdGVzXC8xNjc3MDI3MTRcL3Bvc3RzXC83Mj9fZW52ZWxvcGU9MSZfbG9jYWxlPXVzZXImX2d1dGVuYmVyZ19ub25jZT00MGVmZjdiNzEwIiwiX3V0Ijoid3Bjb206dXNlcl9pZCIsIl91bCI6Imd0ZzI4N3kiLCJfZW4iOiJ3cGNvbV9lbWFpbF9jbGljayIsIl90cyI6MTU3MjAyMzg2MDAwNywiYnJvd3Nlcl90eXBlIjoicGhwLWFnZW50IiwiX2F1YSI6IndwY29tLXRyYWNrcy1jbGllbnQtdjAuMyIsImJsb2dfdHoiOiIwIiwidXNlcl9sYW5nIjoiZW4ifQ=&amp;_z=z" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://public-api.wordpress.com/bar/?stat%3Dgroovemails-events%26bin%3Dwpcom_email_click%26redirect_to%3Dhttps%253A%252F%252Fprejoysticks.wordpress.com%252Fauthor%252Fantarii%252F%26sr%3D1%26signature%3Dc9e607cdf7917553a27427963eadeaa0%26user%3D13364737%26_e%3DeyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjI4ZmFjMmRjYTc3ZDNlYjc1YjdkYzhhMTg1OGU3ZjFiIiwiZGF0ZV9zZW50IjoiMjAxOS0xMC0yNSIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiYW50YXJpaSIsIl9kciI6bnVsbCwiX2RsIjoiXC93cFwvdjJcL3NpdGVzXC8xNjc3MDI3MTRcL3Bvc3RzXC83Mj9fZW52ZWxvcGU9MSZfbG9jYWxlPXVzZXImX2d1dGVuYmVyZ19ub25jZT00MGVmZjdiNzEwIiwiX3V0Ijoid3Bjb206dXNlcl9pZCIsIl91bCI6Imd0ZzI4N3kiLCJfZW4iOiJ3cGNvbV9lbWFpbF9jbGljayIsIl90cyI6MTU3MjAyMzg2MDAwNywiYnJvd3Nlcl90eXBlIjoicGhwLWFnZW50IiwiX2F1YSI6IndwY29tLXRyYWNrcy1jbGllbnQtdjAuMyIsImJsb2dfdHoiOiIwIiwidXNlcl9sYW5nIjoiZW4ifQ%3D%26_z%3Dz&amp;source=gmail&amp;ust=1682553110782000&amp;usg=AOvVaw271U5KZjsJeeqF_krYDCjn">antarii</a></td>
    </tr>
    </tbody>
    </table>
    <div>
    <p>Spooky day is soon! Anyone excited? I know I'm not, because I am viscerally terrified of anything that moves. But on the other hand, skeletons!</p>
    <div>
    <figure><img class="CToWUd a6T" tabindex="0" src="https://ci4.googleusercontent.com/proxy/t4LmpYICbWAqqyEaMXX624CMJcaDvgnTE4btRwYKBKLK6T8SIaXHQTVke4jfh8LHFdNkTtyebLEbPBNk0ZTNw2aDXzSSSWRzUTZMwGs1-x6nqfpwae8vTw=s0-d-e1-ft#https://upload.wikimedia.org/wikipedia/commons/d/df/Horse_and_Man.jpg" alt="" width="439" height="584" border="0" data-bit="iit" />
    <figcaption>YEEEEEEEEEEEEEES! (Wikipedia)</figcaption>
    </figure>
    </div>
    <p>Okay, I know skeletons are only remotely cool these days. But! You know what was not even remotely cool back in the day, but gained a cult following as it got very famous for its patent on sanity effects in videogames? Eternal Darkness.</p>
    <p>This is significantly more niche than my usual topics, so I'm going to backpedal a bit and give you the lore: Eternal Darkness: Sanity's Requiem was a horror game released for the Gamecube by the folks over at Nintendo, and, as I mentioned before, it wasn't exactly making the records in terms of sales back when it launched.</p>
    <p>However, the game had a very interesting feature called sanity effects. And on one hand, it got a lot of awards for it, and on the other, it held the most powerful and accurate effect of sanity hostage for a good amount of years: the ability of your brain to lie to you.</p>
    <h2>"This can't be happening!"</h2>
    <p>That sentence above is the catchphrase of every character going through a sanity effect. You hear it a lot, and it is extremely hammy, but no less terrifying every time.</p>
    <p>Most of the sanity effects are pretty tame once you get used to them. Your character may turn into a zombie, the room might be upside down, you may get spawned into a room with a worm where you have to fight it in glorious battle forever, or until your sanity goes back up. These are plenty scary, sure, but not enough to get you to turn off the game.</p>
    <p>Enter the screen examples.</p>
    <figure><img class="CToWUd" src="https://ci3.googleusercontent.com/proxy/JaxKZxmXGGFTussJrA7PqDGxQbgmHTUBmtiwYHi2BAfCgTML02_lJ9C7YlIOvnxibdxyvzu7lg9o0-ggr8Gp68LXNZDsCdjFgkL-ZXV_Vcr3CFRjZg=s0-d-e1-ft#https://prejoysticks.files.wordpress.com/2019/10/image-1.png?w=560" alt="" border="0" data-bit="iit" />
    <figcaption>No greater fear than deleting your whole save file. (Youtube: superhobbit89)</figcaption>
    </figure>
    <p>If you ask anyone who's played Eternal Darkness what the scariest sanity effect is, I guarantee you all of the answers will involve the savefile scare. The savefile scare is exactly that: it makes you think you deleted all of your saves. The real scare is the illusion that you've lost progress. That, in itself, is scary to anyone who's ever played a videogame (and, throwback, anyone who's played Spore, for that matter).</p>
    <p>This doesn't just play to a gaming fear, however. There is nothing scarier than your brain lying to you, and Eternal Darkness masterfully plays to this effect.</p>
    <h2>Jumping to Conclusions</h2>
    <p>What if I told you your brain is explicitly trained to take in as little information as possible? What if I told you you don't see life at '60fps', but your brain actually skips frames in order to avoid vision blur? What if I told you that, under a lack of light, your brain will make up figures to justify what it fears?</p>
    <p>Well, that's not hypothetical, because I told you all of those things. What I am trying to say is that these are all the basis of the philosophy of fear: the fact that there is something unknown, and that your brain is incapable of processing it. Your brain lies, and lies often, not because it has any interest in tricking you, but because it needs to process information efficiently.</p>
    <p>This is why the save file scare is so taxing. Any other scare is your brain reacting to a sudden change-- your brain can quickly take in when the enemies suddenly all look tiny-- but the save file scare gives you the implication that you deleted your own save file in an act of memory "lost-your-keys" hubris.</p>
    <p>At the end of the day, is there anything scarier than the lies your brain can tell you?</p>
    <p>Yes there is. It's skeletons.</p>
    <div>
    <figure><img class="CToWUd a6T" tabindex="0" src="https://ci4.googleusercontent.com/proxy/t4LmpYICbWAqqyEaMXX624CMJcaDvgnTE4btRwYKBKLK6T8SIaXHQTVke4jfh8LHFdNkTtyebLEbPBNk0ZTNw2aDXzSSSWRzUTZMwGs1-x6nqfpwae8vTw=s0-d-e1-ft#https://upload.wikimedia.org/wikipedia/commons/d/df/Horse_and_Man.jpg" alt="" width="311" height="414" border="0" data-bit="iit" />
    <figcaption>OH GOD HERE HE COMES AGAIN</figcaption>
    </figure>
    </div>
    <div>&nbsp;</div>
    <table width="100%">
    <tbody>
    <tr>
    <td><hr /></td>
    </tr>
    </tbody>
    </table>
    </div>`,
    `<table border="0" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td>
    <h2><a href="https://public-api.wordpress.com/bar/?stat=groovemails-events&amp;bin=wpcom_email_click&amp;redirect_to=https%3A%2F%2Fprejoysticks.wordpress.com%2F2019%2F11%2F01%2Fbioshock-infinite-battlegrounds-for-violence%2F&amp;sr=1&amp;signature=789fb8c0891312986f2b1fc84ae88599&amp;user=13364737&amp;_e=eyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjgyZDNiYjRmZGE3NzlhYzYxMDE4MTlhY2E5NTBhYzZkIiwiZGF0ZV9zZW50IjoiMjAxOS0xMS0wMSIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiQmlvc2hvY2sgSW5maW5pdGU6IEJhdHRsZWdyb3VuZHMgZm9yIFZpb2xlbmNlIiwiX2RyIjpudWxsLCJfZGwiOiJcL3Jlc3RcL3YxLjJcL3NpdGVzXC8xNjc3MDI3MTRcL3Bvc3RzXC84ND9jb250ZXh0PWVkaXQmbG9jYWxlPWVuIiwiX3V0Ijoid3Bjb206dXNlcl9pZCIsIl91bCI6Imd0ZzI4N3kiLCJfZW4iOiJ3cGNvbV9lbWFpbF9jbGljayIsIl90cyI6MTU3MjYzNjk0MDI1MSwiYnJvd3Nlcl90eXBlIjoicGhwLWFnZW50IiwiX2F1YSI6IndwY29tLXRyYWNrcy1jbGllbnQtdjAuMyIsImJsb2dfdHoiOiIwIiwidXNlcl9sYW5nIjoiZW4ifQ=&amp;_z=z" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://public-api.wordpress.com/bar/?stat%3Dgroovemails-events%26bin%3Dwpcom_email_click%26redirect_to%3Dhttps%253A%252F%252Fprejoysticks.wordpress.com%252F2019%252F11%252F01%252Fbioshock-infinite-battlegrounds-for-violence%252F%26sr%3D1%26signature%3D789fb8c0891312986f2b1fc84ae88599%26user%3D13364737%26_e%3DeyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjgyZDNiYjRmZGE3NzlhYzYxMDE4MTlhY2E5NTBhYzZkIiwiZGF0ZV9zZW50IjoiMjAxOS0xMS0wMSIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiQmlvc2hvY2sgSW5maW5pdGU6IEJhdHRsZWdyb3VuZHMgZm9yIFZpb2xlbmNlIiwiX2RyIjpudWxsLCJfZGwiOiJcL3Jlc3RcL3YxLjJcL3NpdGVzXC8xNjc3MDI3MTRcL3Bvc3RzXC84ND9jb250ZXh0PWVkaXQmbG9jYWxlPWVuIiwiX3V0Ijoid3Bjb206dXNlcl9pZCIsIl91bCI6Imd0ZzI4N3kiLCJfZW4iOiJ3cGNvbV9lbWFpbF9jbGljayIsIl90cyI6MTU3MjYzNjk0MDI1MSwiYnJvd3Nlcl90eXBlIjoicGhwLWFnZW50IiwiX2F1YSI6IndwY29tLXRyYWNrcy1jbGllbnQtdjAuMyIsImJsb2dfdHoiOiIwIiwidXNlcl9sYW5nIjoiZW4ifQ%3D%26_z%3Dz&amp;source=gmail&amp;ust=1682553361219000&amp;usg=AOvVaw35RnaxBE9Nxu7gkq0WUPlZ">Bioshock Infinite: Battlegrounds for Violence</a></h2>
    by&nbsp;<a href="https://public-api.wordpress.com/bar/?stat=groovemails-events&amp;bin=wpcom_email_click&amp;redirect_to=https%3A%2F%2Fprejoysticks.wordpress.com%2Fauthor%2Fantarii%2F&amp;sr=1&amp;signature=c9e607cdf7917553a27427963eadeaa0&amp;user=13364737&amp;_e=eyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjgyZDNiYjRmZGE3NzlhYzYxMDE4MTlhY2E5NTBhYzZkIiwiZGF0ZV9zZW50IjoiMjAxOS0xMS0wMSIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiYW50YXJpaSIsIl9kciI6bnVsbCwiX2RsIjoiXC9yZXN0XC92MS4yXC9zaXRlc1wvMTY3NzAyNzE0XC9wb3N0c1wvODQ/Y29udGV4dD1lZGl0JmxvY2FsZT1lbiIsIl91dCI6IndwY29tOnVzZXJfaWQiLCJfdWwiOiJndGcyODd5IiwiX2VuIjoid3Bjb21fZW1haWxfY2xpY2siLCJfdHMiOjE1NzI2MzY5NDAyNTEsImJyb3dzZXJfdHlwZSI6InBocC1hZ2VudCIsIl9hdWEiOiJ3cGNvbS10cmFja3MtY2xpZW50LXYwLjMiLCJibG9nX3R6IjoiMCIsInVzZXJfbGFuZyI6ImVuIn0&amp;_z=z" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://public-api.wordpress.com/bar/?stat%3Dgroovemails-events%26bin%3Dwpcom_email_click%26redirect_to%3Dhttps%253A%252F%252Fprejoysticks.wordpress.com%252Fauthor%252Fantarii%252F%26sr%3D1%26signature%3Dc9e607cdf7917553a27427963eadeaa0%26user%3D13364737%26_e%3DeyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjgyZDNiYjRmZGE3NzlhYzYxMDE4MTlhY2E5NTBhYzZkIiwiZGF0ZV9zZW50IjoiMjAxOS0xMS0wMSIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiYW50YXJpaSIsIl9kciI6bnVsbCwiX2RsIjoiXC9yZXN0XC92MS4yXC9zaXRlc1wvMTY3NzAyNzE0XC9wb3N0c1wvODQ/Y29udGV4dD1lZGl0JmxvY2FsZT1lbiIsIl91dCI6IndwY29tOnVzZXJfaWQiLCJfdWwiOiJndGcyODd5IiwiX2VuIjoid3Bjb21fZW1haWxfY2xpY2siLCJfdHMiOjE1NzI2MzY5NDAyNTEsImJyb3dzZXJfdHlwZSI6InBocC1hZ2VudCIsIl9hdWEiOiJ3cGNvbS10cmFja3MtY2xpZW50LXYwLjMiLCJibG9nX3R6IjoiMCIsInVzZXJfbGFuZyI6ImVuIn0%26_z%3Dz&amp;source=gmail&amp;ust=1682553361219000&amp;usg=AOvVaw1aSm1bycgRAYRyDzyEhauO">antarii</a></td>
    </tr>
    </tbody>
    </table>
    <div>
    <p>Do you think videogames cause violence? Because in the year of our lord, there are still people that do.</p>
    <p>I know, I know, some of you at hollering at your seats. But I think it's important to point out that the idea is still out there, and in the news of gun violence from everyone's favorite hegemonic superpower, the conversation naturally starts back up. It's just a fact of life that sometimes conversations happen, are picked up, then immediately thrown out when they don't benefit the economy.</p>
    <p>That said, Bioshock Infinite. Is it late for me to jump on the bandwagon? I mean, yes, it is! But it also is a good game. And it is a bloody good game, in the sense of your enemies' blood splatters against the walls like putty does.</p>
    <p>The world of Bioshock Infinite is also SUPER racist! But that's not the talk for today.</p>
    <div>
    <figure><img class="CToWUd a6T" tabindex="0" src="https://ci6.googleusercontent.com/proxy/ImUYpHKyv2vwd8SVJ8H8hDoT3X1g0-RXovIL3pT8Ss9LcXIrRZrcggcS8fb85PkGIFdO8_kM1vTE1_G3eYP88u92BuiACf-toIAkGspED3Qu9ROx80Mu43uSvRjnNCw_VnpfFZbUIhwpOnp-3G0pTQ=s0-d-e1-ft#http://hoodedutilitarian.com/wp-content/uploads/2013/06/Bioshock_infinite_wallpapers_HD-1.jpg" alt="Bioshock Infinite &laquo; The Hooded Utilitarian" border="0" data-bit="iit" />
    <figcaption>You can't possibly expect me to say what's going on here, but what's going on here is definitely mad racist. (hoodedutilitarian)</figcaption>
    </figure>
    </div>
    <p>Let me set the stage for you: the world of Bioshock Infinite is a futuristic hellscape where totally not confederate America breaks off from the mainland and sends itself flying into the sky with the power of magnets. Oh, uh, and there&rsquo;s magical little girls that can smell magic juice, and they have assigned adoptive submarine dads, and also it&rsquo;s an Ayn-Randian nightmare.</p>
    <p>Wow, I just realized that discussing THAT aspect would&rsquo;ve made a more interesting post. That&rsquo;s embarrassing. I promise this post isn&rsquo;t going to disappoint, though.</p>
    <p>Bioshock Infinite is a fast-paced semi-looter shooter tooter where you neuter shooters along with a cute commuter. What a hooter! The gameplay is simple: shoot what gets near you, and what doesn&rsquo;t get near you, and if it gets too near you cut it in half with your chainsaw. Also, you have powers in a bottle and one of them makes you shoot crows from your hands. There&rsquo;s also SOMETHING in there about the nature of choice, but I was too busy blacking out and waking up making sewn puppets out of the hands of my enemies.</p>
    <p>What I think is infinitely more interesting though, is the level design.</p>
    <h2>Backyards Carnival of Death</h2>
    <p>Like any other videogame, Bioshock Infinite wants to create an immersive world for the player to smash heads in. On the other hand, it wants a world that feels just right and lets you take advantage of the scenery to smash heads quickly and efficiently. In other words, it wants to feel and look natural, but it also wants it to serve a purpose. Much like fake trees, or the anti-homeless gay rock.</p>
    <figure><img class="CToWUd" src="https://ci6.googleusercontent.com/proxy/rgNBV68McQkeIj6jWV2MVRI0qvkfY1js1fq9zk5tjgCxjlOsO-yTzB0i1YGE_IeYm9jHCK24GB9aO94PBBbipJqQyAGSb1iz9G9g2BIEDtXom-Vb8y0=s0-d-e1-ft#https://prejoysticks.files.wordpress.com/2019/11/img_8018.jpg?w=560" alt="" border="0" data-bit="iit" />
    <figcaption>Do you ever ask yourself &lsquo;how much do I hate the homeless&rsquo;, but also &lsquo;how progressive do I want to look?&rsquo; (Townhall)</figcaption>
    </figure>
    <p>The point is Bioshock Infinite is a videogame. Videogames are made to make you feel good, and that includes making sure the player doesn&rsquo;t feel lost all the time. I mean, I personally am great at getting lost, but the world doesn&rsquo;t revolve around me, does it?</p>
    <p>Just kidding, of course it does. But that&rsquo;s not what&rsquo;s important. What is is that I think it is curious how these levels are designed: open ended areas are closed at every angle, there&rsquo;s plenty of cover to hide from the baddies with, the rails you can slide on (while confusing at first) are a good way to know where the game wants you to go. On every edge there&rsquo;s a chest, or an enemy, or a convenient way to tell you what the game wants of you.</p>
    <p>On a completely unrelated note, architecture.</p>
    <h2>We Become What We Behold</h2>
    <p>How do we build the spaces that bind us?</p>
    <p>The homeless gay rock is a perfect example of this. It&rsquo;s a rock in a corner, generally accepted as an attempt to scare away the homeless and make sure their sleeping spaces are uncomfortable, but why make it gay? Why paint a rainbow on it? Simple enough, camouflage, just like how leopards use it to mask from their prey.</p>
    <p>Many buildings, you&rsquo;ll find, are perfect for a shooter, even when they don&rsquo;t intend to be, like churches often being used in shooters for access to pillars and pews&mdash; but what about schools and office spaces? More often than not, schools in the US are being built to defend themselves from shooters while trying to keep that kid-friendly atmosphere. The question to ask is, is this normal? Is hiding our intentions actively helpful in the act of protecting those who suffer from gun violence, or does it only help to better acclimate those who might wish to perpetrate it by turning it into a stealth game?</p>
    <p>The world might not know, for now.</p>
    <div>&nbsp;</div>
    <table width="100%">
    <tbody>
    <tr>
    <td><hr /></td>
    </tr>
    </tbody>
    </table>
    </div>`,
    `<table border="0" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td>
    <h2><a href="https://public-api.wordpress.com/bar/?stat=groovemails-events&amp;bin=wpcom_email_click&amp;redirect_to=https%3A%2F%2Fprejoysticks.wordpress.com%2F2019%2F11%2F29%2Fdoki-doki-literature-club-and-why-dating-emotionally-vulnerable-teenagers-is-like-a-bad-idea%2F&amp;sr=1&amp;signature=1984a0a07d507b38777fba494eafb82d&amp;user=13364737&amp;_e=eyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjNjNjRiOTBkMDdmY2U4MDdlOTAyZWU4YmE0MDAxMjIzIiwiZGF0ZV9zZW50IjoiMjAxOS0xMS0yOSIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiXHUyMDE4RG9raSBEb2tpIExpdGVyYXR1cmUgQ2x1Ylx1MjAxOSwgYW5kIFdoeSBEYXRpbmcgRW1vdGlvbmFsbHkgVnVsbmVyYWJsZSBUZWVuYWdlcnMgSXMgTGlrZSwgQSBCYWQgSWRlYSIsIl9kciI6bnVsbCwiX2RsIjoiXC9yZXN0XC92MS4yXC9zaXRlc1wvMTY3NzAyNzE0XC9wb3N0c1wvMTA1P2NvbnRleHQ9ZWRpdCZsb2NhbGU9ZW4iLCJfdXQiOiJ3cGNvbTp1c2VyX2lkIiwiX3VsIjoiZ3RnMjg3eSIsIl9lbiI6IndwY29tX2VtYWlsX2NsaWNrIiwiX3RzIjoxNTc1MDY0Nzg4NTA5LCJicm93c2VyX3R5cGUiOiJwaHAtYWdlbnQiLCJfYXVhIjoid3Bjb20tdHJhY2tzLWNsaWVudC12MC4zIiwiYmxvZ190eiI6IjAiLCJ1c2VyX2xhbmciOiJlbiJ9&amp;_z=z" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://public-api.wordpress.com/bar/?stat%3Dgroovemails-events%26bin%3Dwpcom_email_click%26redirect_to%3Dhttps%253A%252F%252Fprejoysticks.wordpress.com%252F2019%252F11%252F29%252Fdoki-doki-literature-club-and-why-dating-emotionally-vulnerable-teenagers-is-like-a-bad-idea%252F%26sr%3D1%26signature%3D1984a0a07d507b38777fba494eafb82d%26user%3D13364737%26_e%3DeyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjNjNjRiOTBkMDdmY2U4MDdlOTAyZWU4YmE0MDAxMjIzIiwiZGF0ZV9zZW50IjoiMjAxOS0xMS0yOSIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiXHUyMDE4RG9raSBEb2tpIExpdGVyYXR1cmUgQ2x1Ylx1MjAxOSwgYW5kIFdoeSBEYXRpbmcgRW1vdGlvbmFsbHkgVnVsbmVyYWJsZSBUZWVuYWdlcnMgSXMgTGlrZSwgQSBCYWQgSWRlYSIsIl9kciI6bnVsbCwiX2RsIjoiXC9yZXN0XC92MS4yXC9zaXRlc1wvMTY3NzAyNzE0XC9wb3N0c1wvMTA1P2NvbnRleHQ9ZWRpdCZsb2NhbGU9ZW4iLCJfdXQiOiJ3cGNvbTp1c2VyX2lkIiwiX3VsIjoiZ3RnMjg3eSIsIl9lbiI6IndwY29tX2VtYWlsX2NsaWNrIiwiX3RzIjoxNTc1MDY0Nzg4NTA5LCJicm93c2VyX3R5cGUiOiJwaHAtYWdlbnQiLCJfYXVhIjoid3Bjb20tdHJhY2tzLWNsaWVudC12MC4zIiwiYmxvZ190eiI6IjAiLCJ1c2VyX2xhbmciOiJlbiJ9%26_z%3Dz&amp;source=gmail&amp;ust=1682553360188000&amp;usg=AOvVaw00C5q4rxg9_QHVIhL7nNoa">&lsquo;Doki Doki Literature Club&rsquo;, and Why Dating Emotionally Vulnerable Teenagers Is Like, A Bad Idea</a></h2>
    by&nbsp;<a href="https://public-api.wordpress.com/bar/?stat=groovemails-events&amp;bin=wpcom_email_click&amp;redirect_to=https%3A%2F%2Fprejoysticks.wordpress.com%2Fauthor%2Fantarii%2F&amp;sr=1&amp;signature=c9e607cdf7917553a27427963eadeaa0&amp;user=13364737&amp;_e=eyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjNjNjRiOTBkMDdmY2U4MDdlOTAyZWU4YmE0MDAxMjIzIiwiZGF0ZV9zZW50IjoiMjAxOS0xMS0yOSIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiYW50YXJpaSIsIl9kciI6bnVsbCwiX2RsIjoiXC9yZXN0XC92MS4yXC9zaXRlc1wvMTY3NzAyNzE0XC9wb3N0c1wvMTA1P2NvbnRleHQ9ZWRpdCZsb2NhbGU9ZW4iLCJfdXQiOiJ3cGNvbTp1c2VyX2lkIiwiX3VsIjoiZ3RnMjg3eSIsIl9lbiI6IndwY29tX2VtYWlsX2NsaWNrIiwiX3RzIjoxNTc1MDY0Nzg4NTA5LCJicm93c2VyX3R5cGUiOiJwaHAtYWdlbnQiLCJfYXVhIjoid3Bjb20tdHJhY2tzLWNsaWVudC12MC4zIiwiYmxvZ190eiI6IjAiLCJ1c2VyX2xhbmciOiJlbiJ9&amp;_z=z" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://public-api.wordpress.com/bar/?stat%3Dgroovemails-events%26bin%3Dwpcom_email_click%26redirect_to%3Dhttps%253A%252F%252Fprejoysticks.wordpress.com%252Fauthor%252Fantarii%252F%26sr%3D1%26signature%3Dc9e607cdf7917553a27427963eadeaa0%26user%3D13364737%26_e%3DeyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjNjNjRiOTBkMDdmY2U4MDdlOTAyZWU4YmE0MDAxMjIzIiwiZGF0ZV9zZW50IjoiMjAxOS0xMS0yOSIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiYW50YXJpaSIsIl9kciI6bnVsbCwiX2RsIjoiXC9yZXN0XC92MS4yXC9zaXRlc1wvMTY3NzAyNzE0XC9wb3N0c1wvMTA1P2NvbnRleHQ9ZWRpdCZsb2NhbGU9ZW4iLCJfdXQiOiJ3cGNvbTp1c2VyX2lkIiwiX3VsIjoiZ3RnMjg3eSIsIl9lbiI6IndwY29tX2VtYWlsX2NsaWNrIiwiX3RzIjoxNTc1MDY0Nzg4NTA5LCJicm93c2VyX3R5cGUiOiJwaHAtYWdlbnQiLCJfYXVhIjoid3Bjb20tdHJhY2tzLWNsaWVudC12MC4zIiwiYmxvZ190eiI6IjAiLCJ1c2VyX2xhbmciOiJlbiJ9%26_z%3Dz&amp;source=gmail&amp;ust=1682553360188000&amp;usg=AOvVaw3NPjceAP2cJ3tKVzlsCgZM">antarii</a></td>
    </tr>
    </tbody>
    </table>
    <div>
    <p>Before I sat down to write this article, I spent way too much time trying to find a more recent dating sim to talk about. Alas, when I realized that my options were&nbsp;<a href="https://store.steampowered.com/app/654880/Dream_Daddy_A_Dad_Dating_Simulator/" target="_blank" rel="noreferrer noopener" aria-label="Dream Daddy (opens in a new tab)" data-saferedirecturl="https://www.google.com/url?q=https://store.steampowered.com/app/654880/Dream_Daddy_A_Dad_Dating_Simulator/&amp;source=gmail&amp;ust=1682553360188000&amp;usg=AOvVaw3uxJjTQy6uswdE7EClxxGW">Dream Daddy</a>&nbsp;and&nbsp;<a href="https://store.steampowered.com/app/1121910/I_Love_You_Colonel_Sanders_A_Finger_Lickin_Good_Dating_Simulator/" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://store.steampowered.com/app/1121910/I_Love_You_Colonel_Sanders_A_Finger_Lickin_Good_Dating_Simulator/&amp;source=gmail&amp;ust=1682553360188000&amp;usg=AOvVaw3uP7fvlqlaDL5diO_aqRyE">that one KFC dating sim</a>, I chose to discard the potentially lucrative venue of the connection between chicken hormones and the feeble human emotion of love for something with a bit more meat in it. You could even say I chickened out. Kicked the bucket?</p>
    <p>Yeah, I&rsquo;m out of puns. I also never played Dream Daddy because I&rsquo;m not into single fathers. So let&rsquo;s talk about Doki Doki Literature Club!</p>
    <figure><img class="CToWUd" src="https://ci5.googleusercontent.com/proxy/OH656i58eIinHvPzYzqwWmjkIeeVerPB6q1r6xi586cH4RPXIW-JjYveGcSsOSokHPgVUsLWdSRPzUqd063pg8PqLpI9afCJmH0VaWEf_8sy6VEzHAU=s0-d-e1-ft#https://prejoysticks.files.wordpress.com/2019/11/img_8370.jpg?w=560" alt="" border="0" data-bit="iit" />
    <figcaption>The short skirts are a metaphor for the amount of time this game takes to get fucking real. (samanthalienhard)</figcaption>
    </figure>
    <h2>Thigh Highs, High Consequences</h2>
    <p>Doki Doki Literature Club was most certainly a game. It was a game about love. About betrayal. About the very nature of reality itself. But most importantly, it is about POETRY.</p>
    <p>For the uninitiated: you, the READER, are a generic anime protagonist, and another one of the barely-legal-somethings you are allowed to possess to get your mack on. You are a highschool student, and your childhood best friend Sayori has invited you to the poetry club she&rsquo;s in, because they&rsquo;re desperate for new members and it&rsquo;s also most likely a front for money laundering. You, a rampant heterosexual, end up joining the poetry club, and it is your job to prepare for the upcoming Festival alongside three new friends: reserved and quiet Yuri, assertive and childish Natsuki, and Monika, who is definitely not important. Never important, never. Monika is not even close to being relevant. Would I ever lie to you? I would never. I&rsquo;m the epitome of truth. Monika isn&rsquo;t even real.</p>
    <p>Anyway, you, the READER, are a hormonal mess, surrounded by other hormonal messes and you&rsquo;re also writing poetry. What could possibly go wrong?</p>
    <p>Oh, honey, you have no idea.</p>
    <p>Long story short, your best friend Sayori isn&rsquo;t doing so well. She&rsquo;s looking worse for wear every day, and before you can chalk it down to the merciless and overloading nature of the japanese educational system you find her hanging from a rope in her bedroom. Your character promptly freaks the fuck out and the game resets, and suddenly she&rsquo;s just wiped out of the game like she never existed. From here on out, this game takes a dive straight into crazy town.</p>
    <p>Yuri and Natsuki don&rsquo;t take long to start losing their goddamn shit. Natsuki disappears not too long after, and Yuri GROWS REAL FLESH EYES THAT STARE INTO YOUR SOUL and also stabs herself for your love, you know, as you do. The plot twist of the game? Well, let&rsquo;s talk about Monika first.</p>
    <h2>This Is The Part Where She Kills You</h2>
    <p>Monika is an empty character devoid of personality. Monika exists only to guide you. If Monika was an ice cream flavor, it would just be milk. Monika is that high school girl you fell in love with who had a banner that said &lsquo;Live, Laugh, Love&rsquo; in christmas lights. Monika is simply Monika.</p>
    <p>Also, she&rsquo;s like, the main villain. What a world, huh?</p>
    <figure><img class="CToWUd" src="https://ci3.googleusercontent.com/proxy/3mJxSzwrJ0_qdwy7HiKlcs8z25joWaScjRLOrUpl55mD-h-ahRDQpsCgFDzaBRebFdkt8pB-zKOtrCDsKwrN1j04C-PN3duGrm3VLuHut2AiA1XBwLg=s0-d-e1-ft#https://prejoysticks.files.wordpress.com/2019/11/img_8374.png?w=560" alt="" border="0" data-bit="iit" />
    <figcaption>Monika is a golden retriever. Monika is the snack that smile back. Monika is Just Monika. (<a href="http://gamepur.com/" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=http://gamepur.com&amp;source=gmail&amp;ust=1682553360188000&amp;usg=AOvVaw1C61Gt1kAlUIroMC-5xAPh">gamepur.com</a>)</figcaption>
    </figure>
    <p>Long story short, apparently Dan Salvato decided Monika shouldn&rsquo;t be a dateable character, and then in a fit of meta shenanigans Monika solved the Ultimate Riddle and also learned programming??? Basically, a high school girl is Literally God, and I hope that we can all understand why that is a terrible thing. To add to that, she&rsquo;s falled madly in love not with your faceless bodyhusk? But with you, the READER. You, the READER, are naturally weirded out by it.</p>
    <p>Unless you aren&rsquo;t. You&rsquo;d find a LOT of people are into having someone obsess over them, and you&rsquo;ll find a LOT of people who genuinely want to bang Monika. This is not a good thing, and yes, this is a callout. I should not have to explain to anyone why trying to mack on an emotionally unstable teenager is bad.</p>
    <p>What if I do anyway, though?</p>
    <h2>To Love and To Hold</h2>
    <p>Teenagers, especially emotionally unstable ones like Monika, are not appropiate targets for dating. Except this kind of character is extremely common in plenty of other dating sims&mdash; so much so that it&rsquo;s pretty much a trope at this rate.</p>
    <p>What is the appeal of having someone obsess over you? The answer is simple- loyalty. But it&rsquo;s interesting how it presents itself in dating simulators, how often it goes unquestioned. Why do we put so much weight on the loyalty we can get from an anime character? Why do some prefer it? Is this a sign of a bigger ongoing problem in our society, or at least a deep anxiety at the heart of it when it comes to love?</p>
    <p>Maybe. But for now, we have the ability to date fried chicken. And perhaps that will suffice.</p>
    <div>&nbsp;</div>
    <table width="100%">
    <tbody>
    <tr>
    <td><hr /></td>
    </tr>
    </tbody>
    </table>
    </div>`,
    `<table border="0" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td>
    <h2><a href="https://public-api.wordpress.com/bar/?stat=groovemails-events&amp;bin=wpcom_email_click&amp;redirect_to=https%3A%2F%2Fprejoysticks.wordpress.com%2F2019%2F12%2F06%2Fmini-oh-god-why-is-mario-party-relevant-again%2F&amp;sr=1&amp;signature=c5034ce4b1af3f7ec73aad0b76e60294&amp;user=13364737&amp;_e=eyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjhhMTg4NzY2MTFlYmU3YmE5OGY2MGVjZjg2ZDYxYWJiIiwiZGF0ZV9zZW50IjoiMjAxOS0xMi0wNiIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiTWluaTogT2ggR29kLCBXaHkgaXMgTWFyaW8gUGFydHkgUmVsZXZhbnQgQWdhaW4iLCJfZHIiOm51bGwsIl9kbCI6IlwvcmVzdFwvdjEuMlwvc2l0ZXNcLzE2NzcwMjcxNFwvcG9zdHNcLzExMD9jb250ZXh0PWVkaXQmbG9jYWxlPWVuIiwiX3V0Ijoid3Bjb206dXNlcl9pZCIsIl91bCI6Imd0ZzI4N3kiLCJfZW4iOiJ3cGNvbV9lbWFpbF9jbGljayIsIl90cyI6MTU3NTY2NTAyOTYwOSwiYnJvd3Nlcl90eXBlIjoicGhwLWFnZW50IiwiX2F1YSI6IndwY29tLXRyYWNrcy1jbGllbnQtdjAuMyIsImJsb2dfdHoiOjAsInVzZXJfbGFuZyI6ImVuIn0&amp;_z=z" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://public-api.wordpress.com/bar/?stat%3Dgroovemails-events%26bin%3Dwpcom_email_click%26redirect_to%3Dhttps%253A%252F%252Fprejoysticks.wordpress.com%252F2019%252F12%252F06%252Fmini-oh-god-why-is-mario-party-relevant-again%252F%26sr%3D1%26signature%3Dc5034ce4b1af3f7ec73aad0b76e60294%26user%3D13364737%26_e%3DeyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjhhMTg4NzY2MTFlYmU3YmE5OGY2MGVjZjg2ZDYxYWJiIiwiZGF0ZV9zZW50IjoiMjAxOS0xMi0wNiIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiTWluaTogT2ggR29kLCBXaHkgaXMgTWFyaW8gUGFydHkgUmVsZXZhbnQgQWdhaW4iLCJfZHIiOm51bGwsIl9kbCI6IlwvcmVzdFwvdjEuMlwvc2l0ZXNcLzE2NzcwMjcxNFwvcG9zdHNcLzExMD9jb250ZXh0PWVkaXQmbG9jYWxlPWVuIiwiX3V0Ijoid3Bjb206dXNlcl9pZCIsIl91bCI6Imd0ZzI4N3kiLCJfZW4iOiJ3cGNvbV9lbWFpbF9jbGljayIsIl90cyI6MTU3NTY2NTAyOTYwOSwiYnJvd3Nlcl90eXBlIjoicGhwLWFnZW50IiwiX2F1YSI6IndwY29tLXRyYWNrcy1jbGllbnQtdjAuMyIsImJsb2dfdHoiOjAsInVzZXJfbGFuZyI6ImVuIn0%26_z%3Dz&amp;source=gmail&amp;ust=1682553359375000&amp;usg=AOvVaw0witGNKuRuFMBYK7trvlES">Mini: Oh God, Why is Mario Party Relevant Again</a></h2>
    by&nbsp;<a href="https://public-api.wordpress.com/bar/?stat=groovemails-events&amp;bin=wpcom_email_click&amp;redirect_to=https%3A%2F%2Fprejoysticks.wordpress.com%2Fauthor%2Fantarii%2F&amp;sr=1&amp;signature=c9e607cdf7917553a27427963eadeaa0&amp;user=13364737&amp;_e=eyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjhhMTg4NzY2MTFlYmU3YmE5OGY2MGVjZjg2ZDYxYWJiIiwiZGF0ZV9zZW50IjoiMjAxOS0xMi0wNiIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiYW50YXJpaSIsIl9kciI6bnVsbCwiX2RsIjoiXC9yZXN0XC92MS4yXC9zaXRlc1wvMTY3NzAyNzE0XC9wb3N0c1wvMTEwP2NvbnRleHQ9ZWRpdCZsb2NhbGU9ZW4iLCJfdXQiOiJ3cGNvbTp1c2VyX2lkIiwiX3VsIjoiZ3RnMjg3eSIsIl9lbiI6IndwY29tX2VtYWlsX2NsaWNrIiwiX3RzIjoxNTc1NjY1MDI5NjA5LCJicm93c2VyX3R5cGUiOiJwaHAtYWdlbnQiLCJfYXVhIjoid3Bjb20tdHJhY2tzLWNsaWVudC12MC4zIiwiYmxvZ190eiI6MCwidXNlcl9sYW5nIjoiZW4ifQ=&amp;_z=z" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://public-api.wordpress.com/bar/?stat%3Dgroovemails-events%26bin%3Dwpcom_email_click%26redirect_to%3Dhttps%253A%252F%252Fprejoysticks.wordpress.com%252Fauthor%252Fantarii%252F%26sr%3D1%26signature%3Dc9e607cdf7917553a27427963eadeaa0%26user%3D13364737%26_e%3DeyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjhhMTg4NzY2MTFlYmU3YmE5OGY2MGVjZjg2ZDYxYWJiIiwiZGF0ZV9zZW50IjoiMjAxOS0xMi0wNiIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiYW50YXJpaSIsIl9kciI6bnVsbCwiX2RsIjoiXC9yZXN0XC92MS4yXC9zaXRlc1wvMTY3NzAyNzE0XC9wb3N0c1wvMTEwP2NvbnRleHQ9ZWRpdCZsb2NhbGU9ZW4iLCJfdXQiOiJ3cGNvbTp1c2VyX2lkIiwiX3VsIjoiZ3RnMjg3eSIsIl9lbiI6IndwY29tX2VtYWlsX2NsaWNrIiwiX3RzIjoxNTc1NjY1MDI5NjA5LCJicm93c2VyX3R5cGUiOiJwaHAtYWdlbnQiLCJfYXVhIjoid3Bjb20tdHJhY2tzLWNsaWVudC12MC4zIiwiYmxvZ190eiI6MCwidXNlcl9sYW5nIjoiZW4ifQ%3D%26_z%3Dz&amp;source=gmail&amp;ust=1682553359375000&amp;usg=AOvVaw0dKnbwk74b8ah_vNrSImsv">antarii</a></td>
    </tr>
    </tbody>
    </table>
    <div>
    <p>Oh god, why is Mario Party relevant again? I thought we put this behind, y&rsquo;all. I&rsquo;ve rigged it so that I haven&rsquo;t heard about Mario Party since 2008. Is it because of the Cyber Monday sale? Does it even count, if it&rsquo;s Friday? Does anyone actually check the day of the week, and if so, will that someone put me out of my misery?</p>
    <p>I don&rsquo;t understand. P&oacute;kemon is already a milked franchise. Mario Kart is a milked franchise. I personally elected to ignore Mario Party, because maybe if I closed my eyes it would finally be over, like how Odyssey and Mario Maker killed the standard Mario platformer. Reality and mercy are not often aligned, however, and so we&rsquo;re here.</p>
    <figure><img class="CToWUd" src="https://ci4.googleusercontent.com/proxy/2_Ov69wVKkUs2wBzdqnxtiWie_sbIXVyWVkJN_nC7IypEonHbCGuAe4PcU31s-Qab0i8REgmOymT9uLWukYo72hnx1H3PsnkHTSzQhBOFvjVZv9ba94=s0-d-e1-ft#https://prejoysticks.files.wordpress.com/2019/12/img_8599.png?w=560" alt="" border="0" data-bit="iit" />
    <figcaption>Is this what you wanted? A candy colored coffin of your own choosing? (Trusted Reviews)</figcaption>
    </figure>
    <p>Is this what you wanted? Was it worth it, feeding the machine? Does the thought of more rolled dice excite you, of the games of minis to be played? It does not excite me, dear reader. It releases a steady poison in my soul that will never die until Mario&rsquo;s italian head rests on my kitchen counter.</p>
    <p>Is the game even good? I&rsquo;ve heard mixed reviews. Some say it&rsquo;s a really good game. Others say that</p>
    <h2>Dear Christ, Who&rsquo;s Still Making These?</h2>
    <p>This trope is called Sequelitis, and it is a terminal disease that&rsquo;s going to follow me to my grave. You know it well: something does well, and the producers are compelled to make more of it for sheer profit. If only the producers knew my burning hatred for the Mario Party series, they&rsquo;d understand the mistake they made. They&rsquo;d understand that they&rsquo;ve made something forbidden, and there&rsquo;s no coming back from it. That we live in a world where there is no mercy, or there was, but we&rsquo;re not allowed to savor it.</p>
    <p>Sequelitis is a very common phenomenon. I, personally, can name three different movies that suffer from sequelitis. It&rsquo;s part of the trade, really. You can&rsquo;t make anything these days without it having a sequel, and a prequel, and a spinoff. Some things are things we can&rsquo;t stop, and all of those things have to do with the deadly wheel of capitalism.</p>
    <p>But is it what anyone wants? Do we all want eternal copies of The Santa Clause? Why is Mario Party still going?</p>
    <h2>In The Clutches of Comfort</h2>
    <p>It&rsquo;s easy to be caught in the clutches of comfort.</p>
    <p>I don&rsquo;t mean this metaphorically. It is, quite literally, easy to be caught in comfort. To repeat things over and over again, without end, trying to catch that lightning. Trying to roll that 6, or that 10, or whatever you have to roll these days in Mario Party. The truth is life is not that simple.</p>
    <p>Why do we make sequels of our lives so often? Would we be happier if we didn&rsquo;t, if we simply just let our best thing be? I leave that up to you.</p>
    <div>&nbsp;</div>
    <table width="100%">
    <tbody>
    <tr>
    <td><hr /></td>
    </tr>
    </tbody>
    </table>
    </div>`,
    `<table border="0" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td>
    <h2><a href="https://public-api.wordpress.com/bar/?stat=groovemails-events&amp;bin=wpcom_email_click&amp;redirect_to=https%3A%2F%2Fprejoysticks.wordpress.com%2F2019%2F12%2F06%2Fthe-stanley-parable-or-why-the-end-is-never-the-end%2F&amp;sr=1&amp;signature=73e3126b9c445567126e62176529df7e&amp;user=13364737&amp;_e=eyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6ImJjYTc0Y2UyNWU4MWY2MmQzZTNlODMyZjZkZjJkMDFjIiwiZGF0ZV9zZW50IjoiMjAxOS0xMi0wNiIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiVGhlIFN0YW5sZXkgUGFyYWJsZSwgb3IgV2h5IFRoZSBFbmQgaXMgTmV2ZXIgVGhlIEVuZCIsIl9kciI6bnVsbCwiX2RsIjoiXC9yZXN0XC92MS4yXC9zaXRlc1wvMTY3NzAyNzE0XC9wb3N0c1wvMTA4P2NvbnRleHQ9ZWRpdCZsb2NhbGU9ZW4iLCJfdXQiOiJ3cGNvbTp1c2VyX2lkIiwiX3VsIjoiZ3RnMjg3eSIsIl9lbiI6IndwY29tX2VtYWlsX2NsaWNrIiwiX3RzIjoxNTc1Njc0MjYyNjkyLCJicm93c2VyX3R5cGUiOiJwaHAtYWdlbnQiLCJfYXVhIjoid3Bjb20tdHJhY2tzLWNsaWVudC12MC4zIiwiYmxvZ190eiI6IjAiLCJ1c2VyX2xhbmciOiJlbiJ9&amp;_z=z" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://public-api.wordpress.com/bar/?stat%3Dgroovemails-events%26bin%3Dwpcom_email_click%26redirect_to%3Dhttps%253A%252F%252Fprejoysticks.wordpress.com%252F2019%252F12%252F06%252Fthe-stanley-parable-or-why-the-end-is-never-the-end%252F%26sr%3D1%26signature%3D73e3126b9c445567126e62176529df7e%26user%3D13364737%26_e%3DeyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6ImJjYTc0Y2UyNWU4MWY2MmQzZTNlODMyZjZkZjJkMDFjIiwiZGF0ZV9zZW50IjoiMjAxOS0xMi0wNiIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiVGhlIFN0YW5sZXkgUGFyYWJsZSwgb3IgV2h5IFRoZSBFbmQgaXMgTmV2ZXIgVGhlIEVuZCIsIl9kciI6bnVsbCwiX2RsIjoiXC9yZXN0XC92MS4yXC9zaXRlc1wvMTY3NzAyNzE0XC9wb3N0c1wvMTA4P2NvbnRleHQ9ZWRpdCZsb2NhbGU9ZW4iLCJfdXQiOiJ3cGNvbTp1c2VyX2lkIiwiX3VsIjoiZ3RnMjg3eSIsIl9lbiI6IndwY29tX2VtYWlsX2NsaWNrIiwiX3RzIjoxNTc1Njc0MjYyNjkyLCJicm93c2VyX3R5cGUiOiJwaHAtYWdlbnQiLCJfYXVhIjoid3Bjb20tdHJhY2tzLWNsaWVudC12MC4zIiwiYmxvZ190eiI6IjAiLCJ1c2VyX2xhbmciOiJlbiJ9%26_z%3Dz&amp;source=gmail&amp;ust=1682553359358000&amp;usg=AOvVaw2RGM2_UpHYPrS6Mjw8DuEr">The Stanley Parable, or Why The End is Never The End</a></h2>
    by&nbsp;<a href="https://public-api.wordpress.com/bar/?stat=groovemails-events&amp;bin=wpcom_email_click&amp;redirect_to=https%3A%2F%2Fprejoysticks.wordpress.com%2Fauthor%2Fantarii%2F&amp;sr=1&amp;signature=c9e607cdf7917553a27427963eadeaa0&amp;user=13364737&amp;_e=eyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6ImJjYTc0Y2UyNWU4MWY2MmQzZTNlODMyZjZkZjJkMDFjIiwiZGF0ZV9zZW50IjoiMjAxOS0xMi0wNiIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiYW50YXJpaSIsIl9kciI6bnVsbCwiX2RsIjoiXC9yZXN0XC92MS4yXC9zaXRlc1wvMTY3NzAyNzE0XC9wb3N0c1wvMTA4P2NvbnRleHQ9ZWRpdCZsb2NhbGU9ZW4iLCJfdXQiOiJ3cGNvbTp1c2VyX2lkIiwiX3VsIjoiZ3RnMjg3eSIsIl9lbiI6IndwY29tX2VtYWlsX2NsaWNrIiwiX3RzIjoxNTc1Njc0MjYyNjkyLCJicm93c2VyX3R5cGUiOiJwaHAtYWdlbnQiLCJfYXVhIjoid3Bjb20tdHJhY2tzLWNsaWVudC12MC4zIiwiYmxvZ190eiI6IjAiLCJ1c2VyX2xhbmciOiJlbiJ9&amp;_z=z" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://public-api.wordpress.com/bar/?stat%3Dgroovemails-events%26bin%3Dwpcom_email_click%26redirect_to%3Dhttps%253A%252F%252Fprejoysticks.wordpress.com%252Fauthor%252Fantarii%252F%26sr%3D1%26signature%3Dc9e607cdf7917553a27427963eadeaa0%26user%3D13364737%26_e%3DeyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6ImJjYTc0Y2UyNWU4MWY2MmQzZTNlODMyZjZkZjJkMDFjIiwiZGF0ZV9zZW50IjoiMjAxOS0xMi0wNiIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiYW50YXJpaSIsIl9kciI6bnVsbCwiX2RsIjoiXC9yZXN0XC92MS4yXC9zaXRlc1wvMTY3NzAyNzE0XC9wb3N0c1wvMTA4P2NvbnRleHQ9ZWRpdCZsb2NhbGU9ZW4iLCJfdXQiOiJ3cGNvbTp1c2VyX2lkIiwiX3VsIjoiZ3RnMjg3eSIsIl9lbiI6IndwY29tX2VtYWlsX2NsaWNrIiwiX3RzIjoxNTc1Njc0MjYyNjkyLCJicm93c2VyX3R5cGUiOiJwaHAtYWdlbnQiLCJfYXVhIjoid3Bjb20tdHJhY2tzLWNsaWVudC12MC4zIiwiYmxvZ190eiI6IjAiLCJ1c2VyX2xhbmciOiJlbiJ9%26_z%3Dz&amp;source=gmail&amp;ust=1682553359358000&amp;usg=AOvVaw3QiPkgcZQblKq6wMcc_ZCr">antarii</a></td>
    </tr>
    </tbody>
    </table>
    <div>
    <p>The Stabley Parable is a game about endings. Or rather, the lack thereof.</p>
    <p>I like The Stanley Parable. I played it and hashtag &lsquo;stanned&rsquo; it back when it was a Half Life 2 mod, and I was really excited with the demo and the game when it first came out. It is also a game I&rsquo;ve only ever played once. Partly because I wanted the achievement you can get where you don&rsquo;t play for five years, but more importantly because The Stanley Parable is a game you&rsquo;re only ever going to experience once in your life.</p>
    <p>So let&rsquo;s have fun together, dearest of readers. Let me tell you a story.</p>
    <p>This is the story of a young sprout who played a game. The game was about endings, and about how things never end. This game was very special. This game was the Stanley Parable.</p>
    <figure><img class="CToWUd" src="https://ci6.googleusercontent.com/proxy/7HmhaN0O_DAuP8HJe5xbOubzOSqce1sZNAnE4sWgnyLeB_HT0Q96aaULcwweOmrqVh-V8oTyQG6-WyMeoky_QGRJU_-IPMoEIOHacpIBww7DkC_E8UI=s0-d-e1-ft#https://prejoysticks.files.wordpress.com/2019/12/img_8608.jpg?w=560" alt="" border="0" data-bit="iit" />
    <figcaption>the end is never the end is never the end is never the end is never (Steam)</figcaption>
    </figure>
    <h2>The End is Never the End is Never the End is Never</h2>
    <p>Stanley is a man. His job is to push buttons. He presses the buttons every day and every night. Stanley loves to push buttons. Stanley is a very patient man. He looks at a screen, and the screen tells him what buttons to push. Stanley is very good at his job. Stanley is the only one at his job. One day the orders stop coming. Stanley is very confused. Stanley leaves his office.</p>
    <p>A narrator accompanies him. Stanley is aware of this narrator, of course. The voice speaks and gives instructions, telling him what to do. Sometimes Stanley does what he is told. When he does, he stops existing. Stanley decides not to do what he&rsquo;s told. Then, he stops existing. Stanley stops existing.</p>
    <p>To stop existing is to die. Stanley wouldn&rsquo;t call it that, but by all means and purposes, he is dying. Stanley can feel his bones withering away, not by the mercy of old age, but by the matterless hug of nonexistence. Stanley, of course, does not exist. Stanley does not know that. But of course, the fellow playing the game does.</p>
    <p>The fellow&rsquo;s played games before. Games are the best. The fellow knows that nothing truly is real. Stanley does not exist. Stanley, sometimes, gets dangerously close to discovering he isn&rsquo;t real. But then time resets, and he is no more.</p>
    <p>This is the life of Stanley. His life is no life at all, but brief periods of existence followed by nothing. Some say a life can&rsquo;t be given a price. But for Stanley, his life retails on about $14.99.</p>
    <h2>The End is Never the End is Never the End is Never</h2>
    <p>There is a theory that elaborates that technically, the human mind lives forever. This is the theory of quantum consciousness: the basics of it are that when one dies, it is simply one of two possibilities. In the timeline where one continues living, a single consciousness travels it until it is no more: a single mind, everlasting.</p>
    <p>Stanley&rsquo;s life follows this same path. Stanley dies. Stanley lives again. He is a mind overseen by you, the omnipresent consciousness.</p>
    <p>Who oversees you?</p>
    <div>&nbsp;</div>
    <table width="100%">
    <tbody>
    <tr>
    <td><hr /></td>
    </tr>
    </tbody>
    </table>
    </div>`,
    `<table border="0" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td>
    <h2><a href="https://public-api.wordpress.com/bar/?stat=groovemails-events&amp;bin=wpcom_email_click&amp;redirect_to=https%3A%2F%2Fprejoysticks.wordpress.com%2F2019%2F11%2F15%2Fxcom-and-the-wrong-terrible-very-bad-horrors-of-war%2F&amp;sr=1&amp;signature=418ebf36fd7ff42d31d0cf2be11133f2&amp;user=13364737&amp;_e=eyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjJiZGE1MzYwNjYyY2Q5NzJkYTNiMTg3NTMyOWFhZGMyIiwiZGF0ZV9zZW50IjoiMjAxOS0xMS0xNSIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiWGNvbSBhbmQgdGhlIFdyb25nLCBUZXJyaWJsZSwgVmVyeSBCYWQgSG9ycm9ycyBvZiBXYXIiLCJfZHIiOm51bGwsIl9kbCI6IlwvcmVzdFwvdjEuMlwvc2l0ZXNcLzE2NzcwMjcxNFwvcG9zdHNcLzk5P2NvbnRleHQ9ZWRpdCZsb2NhbGU9ZW4iLCJfdXQiOiJ3cGNvbTp1c2VyX2lkIiwiX3VsIjoiZ3RnMjg3eSIsIl9lbiI6IndwY29tX2VtYWlsX2NsaWNrIiwiX3RzIjoxNTczODQ5MzEwOTg3LCJicm93c2VyX3R5cGUiOiJwaHAtYWdlbnQiLCJfYXVhIjoid3Bjb20tdHJhY2tzLWNsaWVudC12MC4zIiwiYmxvZ190eiI6MCwidXNlcl9sYW5nIjoiZW4ifQ=&amp;_z=z" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://public-api.wordpress.com/bar/?stat%3Dgroovemails-events%26bin%3Dwpcom_email_click%26redirect_to%3Dhttps%253A%252F%252Fprejoysticks.wordpress.com%252F2019%252F11%252F15%252Fxcom-and-the-wrong-terrible-very-bad-horrors-of-war%252F%26sr%3D1%26signature%3D418ebf36fd7ff42d31d0cf2be11133f2%26user%3D13364737%26_e%3DeyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjJiZGE1MzYwNjYyY2Q5NzJkYTNiMTg3NTMyOWFhZGMyIiwiZGF0ZV9zZW50IjoiMjAxOS0xMS0xNSIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiWGNvbSBhbmQgdGhlIFdyb25nLCBUZXJyaWJsZSwgVmVyeSBCYWQgSG9ycm9ycyBvZiBXYXIiLCJfZHIiOm51bGwsIl9kbCI6IlwvcmVzdFwvdjEuMlwvc2l0ZXNcLzE2NzcwMjcxNFwvcG9zdHNcLzk5P2NvbnRleHQ9ZWRpdCZsb2NhbGU9ZW4iLCJfdXQiOiJ3cGNvbTp1c2VyX2lkIiwiX3VsIjoiZ3RnMjg3eSIsIl9lbiI6IndwY29tX2VtYWlsX2NsaWNrIiwiX3RzIjoxNTczODQ5MzEwOTg3LCJicm93c2VyX3R5cGUiOiJwaHAtYWdlbnQiLCJfYXVhIjoid3Bjb20tdHJhY2tzLWNsaWVudC12MC4zIiwiYmxvZ190eiI6MCwidXNlcl9sYW5nIjoiZW4ifQ%3D%26_z%3Dz&amp;source=gmail&amp;ust=1682553360206000&amp;usg=AOvVaw2D6aw3Nue3pftnrE9IbBkg">Xcom and the Wrong, Terrible, Very Bad Horrors of War</a></h2>
    by&nbsp;<a href="https://public-api.wordpress.com/bar/?stat=groovemails-events&amp;bin=wpcom_email_click&amp;redirect_to=https%3A%2F%2Fprejoysticks.wordpress.com%2Fauthor%2Fantarii%2F&amp;sr=1&amp;signature=c9e607cdf7917553a27427963eadeaa0&amp;user=13364737&amp;_e=eyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjJiZGE1MzYwNjYyY2Q5NzJkYTNiMTg3NTMyOWFhZGMyIiwiZGF0ZV9zZW50IjoiMjAxOS0xMS0xNSIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiYW50YXJpaSIsIl9kciI6bnVsbCwiX2RsIjoiXC9yZXN0XC92MS4yXC9zaXRlc1wvMTY3NzAyNzE0XC9wb3N0c1wvOTk/Y29udGV4dD1lZGl0JmxvY2FsZT1lbiIsIl91dCI6IndwY29tOnVzZXJfaWQiLCJfdWwiOiJndGcyODd5IiwiX2VuIjoid3Bjb21fZW1haWxfY2xpY2siLCJfdHMiOjE1NzM4NDkzMTEwMDMsImJyb3dzZXJfdHlwZSI6InBocC1hZ2VudCIsIl9hdWEiOiJ3cGNvbS10cmFja3MtY2xpZW50LXYwLjMiLCJibG9nX3R6IjowLCJ1c2VyX2xhbmciOiJlbiJ9&amp;_z=z" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://public-api.wordpress.com/bar/?stat%3Dgroovemails-events%26bin%3Dwpcom_email_click%26redirect_to%3Dhttps%253A%252F%252Fprejoysticks.wordpress.com%252Fauthor%252Fantarii%252F%26sr%3D1%26signature%3Dc9e607cdf7917553a27427963eadeaa0%26user%3D13364737%26_e%3DeyJlcnJvciI6bnVsbCwiYmxvZ19pZCI6MTY3NzAyNzE0LCJibG9nX2xhbmciOiJlbiIsInNpdGVfaWRfbGFiZWwiOiJ3cGNvbSIsImVtYWlsX25hbWUiOiJlbWFpbF9zdWJzY3JpcHRpb24iLCJfdWkiOjEzMzY0NzM3LCJlbWFpbF9pZCI6IjJiZGE1MzYwNjYyY2Q5NzJkYTNiMTg3NTMyOWFhZGMyIiwiZGF0ZV9zZW50IjoiMjAxOS0xMS0xNSIsImRvbWFpbiI6InByZWpveXN0aWNrcy53b3JkcHJlc3MuY29tIiwiZnJlcXVlbmN5IjoiMCIsImRpZ2VzdCI6IjAiLCJoYXNfaHRtbCI6IjEiLCJsb2NhbGUiOiJlbiIsImFuY2hvcl90ZXh0IjoiYW50YXJpaSIsIl9kciI6bnVsbCwiX2RsIjoiXC9yZXN0XC92MS4yXC9zaXRlc1wvMTY3NzAyNzE0XC9wb3N0c1wvOTk/Y29udGV4dD1lZGl0JmxvY2FsZT1lbiIsIl91dCI6IndwY29tOnVzZXJfaWQiLCJfdWwiOiJndGcyODd5IiwiX2VuIjoid3Bjb21fZW1haWxfY2xpY2siLCJfdHMiOjE1NzM4NDkzMTEwMDMsImJyb3dzZXJfdHlwZSI6InBocC1hZ2VudCIsIl9hdWEiOiJ3cGNvbS10cmFja3MtY2xpZW50LXYwLjMiLCJibG9nX3R6IjowLCJ1c2VyX2xhbmciOiJlbiJ9%26_z%3Dz&amp;source=gmail&amp;ust=1682553360206000&amp;usg=AOvVaw0274hzKuG_nCC3Y8G-I96m">antarii</a></td>
    </tr>
    </tbody>
    </table>
    <div>
    <p>Strategy games! Strategy has been a long-favored tropes ever since the days of NATO Commander, Warcraft, and Command &amp; Conquer, and then given a boost by the mainstream success Starcraft and, of course, everyone&rsquo;s favorite game, Plants VS Zombies. I assure you this is a statistical fact, as you can see here, based on numbers I basically just pulled out of my ass just now.</p>
    <figure><img class="CToWUd" src="https://ci5.googleusercontent.com/proxy/nrvQONY34vD3Ef9Z8mu0ed_JrESb-M9tG-RY0ILASr7CceJap-ckvCJ-QJvL4ICEq2cIYDGRMbjb3et_tHg-2yTxvGX3bc-0QxBuK7LmzTsBwK08aWs=s0-d-e1-ft#https://prejoysticks.files.wordpress.com/2019/11/img_8193.jpg?w=560" alt="" border="0" data-bit="iit" /></figure>
    <p>See? It&rsquo;s right there, it&rsquo;s the math. Sorry, chief. I can&rsquo;t change the facts.</p>
    <p>But my irrefutable math is not what today&rsquo;s post is about, even if I&rsquo;m starting to think that would&rsquo;ve been way funnier. Today, instead, I&rsquo;m talking about Xcom.</p>
    <h2>Rollin&rsquo;, Tootin&rsquo;, Alien Shootin&rsquo;</h2>
    <p>Okay, maybe a bit of a misdirect. I&rsquo;m talking about the Xcom series, not just Xcom the original game. So for the folks at home, that&rsquo;s going to mean all strategy XCOM games, both turn-based and real time. So forget Enforcer and the Bureau for a few minutes. You won&rsquo;t have to, because I personally already forgot they were ever real. I am however going to be focused strongly on the 2k Reboot series (that is, Enemy Unknown and XCOM 2) because it is the easiest to explain. My apologies if you were a fan of the MicroPose series.</p>
    <p>XCOM, for the uninitiated, is your standard shooty shooty alien game, really. It&rsquo;s set in an alternate reality where the aliens are invading earth, and a military group called XCOM rises up to stop them in their tracks before they can invade earth. Spoiler alert: the aliens win, and 15 years later they have basically colonized the earth, not unlike Dead Space, and the old ancient big alien guys want to make a body so they can live in it forever and avoid their inevitable death, also not unlike Dead Space. If there is something that is unlike Dead Space, it&rsquo;s the fact that the big alien elders don&rsquo;t want to turn into flesh moons, but they want their consciousness to be transferred into the engineered husk of Overwatch&rsquo;s Soldier 76 as an anime boy.</p>
    <figure><img class="CToWUd" src="https://ci5.googleusercontent.com/proxy/P5mhVUmbw-QkHq9tqjC7KXrQBKDqavt2zauzfZKhptWjRz1TUrj-5eb96ZrXE8ef9IpBf-I9WAACkUIN-5J61PnMxaL4wKSkL8ieUzlmaYzbdhGPc1c=s0-d-e1-ft#https://prejoysticks.files.wordpress.com/2019/11/img_8194.png?w=560" alt="" border="0" data-bit="iit" />
    <figcaption><em>[DBZ voice] It&rsquo;s over 76!&nbsp;</em>(Playable Avatar, nexusmods)</figcaption>
    </figure>
    <p>XCOM can get pretty silly, especially with the huge amount of customization and the ability to make soldiers of your real life friends and then watch them die terrible deaths on the hands of aliens, but it can also get very dramatic because of that exact reason. XCOM doesn&rsquo;t make it so that your soldiers are a bunch of nameless faceless red-jacket nobodies, but gives them names, lets them earn nicknames, gives them different voices, makes sure they can get tired or traumatized (hello there, Darkest Dungeon) and lets them make bonds with soldiers they fight often with. For a game where character death is so common, XCOM sure knows how to make a death tragic.</p>
    <p>Oh, and XCOM makes you take pictures of everything. Group shots after missions, photos to congratulate new friends, and, of course, inspirational funeral posters. All of these will hang around the base, where you&rsquo;ll never be able to escape your terrible strategy mistake that got someone killed. You know, much like real war.</p>
    <p>Let&rsquo;s talk about that for a bit.</p>
    <h2>The Oh-So-Terrible Art of War</h2>
    <p>According to the wikipedia article on the battle of Verdun:</p>
    <p><em>The&nbsp;<strong>Battle of Verdun</strong>&nbsp;was fought from 21 February to 18 December 1916 on the Western Front. The battle was the longest of the First World War and took place on the hills north of Verdun-sur-Meuse in north-eastern France</em>.&nbsp;<em>The battle lasted for 303 days, the longest and one of the most costly in human history.</em></p>
    <p>I sure hope it&rsquo;s just not me, but 303 days of battle is an insane number of days to be in trench warfare. That&rsquo;s 303 days of a bunch of 20 year olds stuck in a trench, next to a hundred thousand other guys, having to non-stop fight for your life.</p>
    <p>This happens a lot in videogames, with not much thought put into it. It&rsquo;s the fetishization of war, one seen a lot in these types of games. However, I think the medium for the fetishistic glory game is dead&mdash; at least in the concept of war&mdash; and it has replaced its foreign invaders with literal foreign invaders. It is certainly a lot easier and more blameless to shoot an alien in the face than it is to shoot down the Chinese Resistance.</p>
    <p>And, of course, this includes comically evil invaders: Nazis, and those weird nationalist nutjobs from Bioshock Infinite. These aren&rsquo;t people, but shadows of people: they are meant to be shot, and then meant to make you feel good for shooting them.</p>
    <p>XCOM obviously plays to the alien trope. The aliens are evil and are to be erradicated, and they start by making them evil infiltrators in a society, and then subtle manipulations who exert their culture. I&rsquo;m not saying XCOM is built by an uber-evil nazi cult hellbent on convincing the public to enact violence against immigrants, but I am saying that the alien invasion trope is dangerous in the wrong hands. If someone tells me that they&rsquo;re all in for &lsquo;legal immigration&rsquo; and tells me that their favorite game is XCOM, not gonna lie: I get nervous.</p>
    <p>But I don&rsquo;t just think XCOM is an alien shooty game. Besides the dubiousness of the plot, the point of XCOM is real: war is brutal. Most of your soldiers will die, most will need therapy, most will have their best friends in a poorly lit poster by the end. Is that not kind of real, in a way? Is it not a fair assessment of what war is; a loss, completely and utterly?</p>
    <p>Nah, I lied. The loss is that we never got a Plants VS Zombies trilogy. And that&rsquo;s the tragedy here.</p>
    <div>&nbsp;</div>
    <table width="100%">
    <tbody>
    <tr>
    <td><hr /></td>
    </tr>
    </tbody>
    </table>
    </div>`
  ]

  constructor() {
    super();

    for (let post of this.x) {
      this.readied_posts.push(new Post(this, post, null, [""], [""], [""], true));
    }
  }

  tick = (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}

class JRHOL extends Character {
  name = "jadedResearcher";
  desc = "I read <color = 'blue'>House</span> of Leaves in 2016. These are my notes from then, and some from now too as I try to find a specfic quote from it that apparently only I ever read?<br><Br>Sorry if I don't respond to asks, I'm kind of hyper focusing for now.";
  icon = "http://farragofiction.com/Staging/images/Credits/jadedResearcher_icon.png";

  tick = async (parentToRenderTo) => {
    if (houseOfLeaves.length === 0) {
      return;
    }

    const postContent = rand.pickFrom(houseOfLeaves);
    const rambleMap = {
      'page407-top':"THIS is what I feel is the core of house of leaves. <br><br>or almost?<br><Br>I WANT to find the build up to this. the description of the obsessive insanity people get into. <br><br>the thousand page thesis documents contrasting with how long a NORMAL thesis is. <br><Br>but this is as close as i've found no matter how hard ive searched<br><br>this IDEA<Br><Br>that <span style='color: blue'>house</span> or no <span style='color: blue'>house</span> the REAL problem is the cognito harzard<br><br>the obsession<br><Br>just writing about the <span style='color: blue'>house</span> is enough to invite it into your mind<br><Br>to make it so only when writing about it do you feel better<Br><Br>theres a footnote that drives this point home better but i cant find the screenshot"
      ,'page_407':"THERE it is<br><br>page 407<br>the footnote i've been looking for<br><Br>but not the REAL one<br><br>not the one about the thousand page thesis that draws attention to the fact that all this literature about a single movie that doens't exist is INSANE<br>no<br><br>THIS one is just. <Br>the maze<br>reassuring you that it is good and proper to obsess over it<br>we will have immense psychological benefits<br><Br>if only we agree to obsess<br><Br>and THERE is the rub isn't it? the <span style='color: blue'>house</span> asks us to obsess<br>the GAME begs us not to<br>well. not THE game. not the one you just lost<br>but ZAMPANIO<br>it asks you to not obsess over it and not forget it but a secret third thing<br><Br>just<br>enjoy it<br>a normal amount<br>as if any of us could possibly do that<br>the amount of effort required to get even THIS far is too much<br>we can't be normal about this<br>to our immense psychological benefit"
      ,'this_is_a_normal_amount_of_times_to_see_a_movie':"you see what i MEAN?<Br>just casually slips that in in a foot note<br>saw a spooky movie 38 times in theaters<br>like we all do<br>but can i actually take the high ground here<br>how many weeks months days YEARS have i spent trying in vain to capture even a part of zampanio?<br>YOU ARE RIGHT HERE WITH ME<br>and even if you have only scratched the surface you can SEE can't you?<br>obsession is a terrible thing<br>and i would not free myself of it for even an instant<br>i NEED this<br><br>i need to either find a game that CLEARLY DOES NOT EXIST AND RUBS MY FACE IN IT<br>or prove once and for all its a house of leaves fanwork<br>but the quote im looking for i cannot find<br>even though 2016 me REFERENCES IT And thus couldn't have already been infected by Zampanio<br>it has to mean SOMETHING"
      ,"a_blindspot_created_bytheactofseeing_isaveryneatmetaphor":"did...did that zampanio faq have a line like this?<br> drawing a comparison between homestucks void and a blindspot of an eye. <br>it censors all the homestuck aspects out, but void even more so. i can't find it again if it were ever there. <br>i like the metaphor though "
      ,"no_homies":"okay THIS has to be where the NotAMinotaur meme came from, right?<br>wait but<br>i was the one to personify it by twisting it up with WattMan.exe<br>so before me it wasn't a homie...was it?"
      ,"there_is_no_minotaur":"why does everyone want to put a monster in the maze<BR>in the backgrooms<br>it doesnt NEED a monster<br>don't you understand the point of a maze is the crushing isolation it brings to you<br>even if someone else is caught inside it how could you ever even expect to find them<br>how MANY OF US ARE CAUGHT BY ZAMPANIO<br>utterly unable to find one another because this damn fandom just wants to keep erasing itself for the memes<br>i tried you know<br>joined that discord<br>and then it erased itself<br>tried to make my own<br>then i ran out of spoons<br>the center just can not hold"
      ,"this_is_a_normal_amount_of_pages":"i got so excited when i saw this<br>it is SO close to the quote im lookin for<br>but it just mentions the four thousand pages<br>it doesn't throw in your face how weird that is, if you've missed it<br>i just wanna find the bit about the average length of a thesis paper compared to ones on the <span style='color: blue'>house</span>"
      ,"if_zampanio_could_be_said_to_haveacenter_itsthegame_thatprobablydoesntexist___unthinkable":"unthinkable huh<br>the entire zampanio fandom is without a center<br>we're all rallying around a game we damn well know doesn't exist<br>is it any wonder we can never find each other?"
      ,"thisstuckwithme":"nothing really to say here<br>this was just the only visual concept that stuck with me<br>the idea of camping out on a stair case bigger than a football field<br>really big rooms are whatever<br>but a starecase big enough to camp on<br>that is intense"
      ,"finding_meaning_inthenoise":"would zampanio do this, i wonder<br>take meaningless cacophonies<br>verbal farragos<br>and turn them into meaning?<br>is zampanio the lucky little horseshoe moment where the procedural randomness seems to draw into focus a story? "
      ,"our_stubborn_insistencethatanythingspookyisgoingon":"this is so important to me<br>the idea that there IS no monster<br>that our imaginatio is the mosnter<br>that our stubborn insistene that there MUST bE MORE<br>is the only thing dooming us"
      ,"marked_andunmarked_have_differentbigpictures":"my branch is like this<br>those who remain alone an Unobserved have such a small picture<br>just their own two eyes<br>those who start to reach out<br>even if its just to read the things others have left behind<br>they start seeing a bigger picture through eyes and eyes and eyes<br>theres not just one version of even my own branch of zampanio<br>let alone the whole thing"
      ,"of_course_an_aluminium_foil_simp_wouldclaim_thematerialdoesnotmatter":"we've been over this<br>do not trust anything anyone associated with aluminimum foil tells you<br><img src='http://eyedolgames.com/Eyedlr/images/Secrets/reynolds.PNG'>"
      ,"no_reason_to_lingerhere":"in the narrative there are endless doors and rooms and hallways and none of them have any reason to linger<br>no furniture no objects of any kind<br>similarly but inverted the boxes inside the book are just lists of objects and give us no reason to linger<br>no reason to read<Br>and contrast THAT with the noise of zampanio<Br>all of it bespoke in a way a list of HVAC system components could never be<br>but is there really meaning in any of it?"
      ,"memory_is_reality":"god<br>i don't need a spooky maze for this<br>this is just reality<br>i'm constantly forgetting things exist and Unmarked are finding them for me<br>or I'm working on a sim and debugging somthing only to realize it was an intended feature from two-weeks-ago-me<br>you forget about something and its just gone"
      ,"there_is_always_a_branch_todistract_you":"thats how zampanio gets you<br>isn't it?<br>you think you're close<br>so close to understanding what is going on<br>and then you find an impossibly deep new branch<br>and forget entirely what you were about to find before<br>endless parades of shiny new discoveries<br>is that heaven?<br>or my personal hell"
      ,"writing_about_the_house_brings_relief":"you write and write and write and only then do you find relief"
      ,"an_addiction_to_knowing_the_unknowable_ispspoton_forampanio":"is that how zampanio gets you?<br>because of how blatantly it doesn't exist<br>you're dangled with an impossible bait<br>something that can never satisfy<br>we will NEVER find it and thus we will never have that catharsis that lets us know we can stop looking"
      ,"ilovehow_itkeepsthrowinginourface_remindersofhowfakeallthisis":"zampano is blind<br>we read pages and pages of visual analysis of photographs<br>and zampano is blind<br>and we knew that<br>of course we did<br>but the book has to throw it into our face<br>the fact that we forgot<br>that we are so used to suspending disbelief that we FORGOT the man was blind<br>just like we forget zampanio isn't real"
    }

    let ramble = "";
    const rambleKeys = Object.keys(rambleMap);
    for (let key of rambleKeys) {
      if (postContent.includes(key)) {
        ramble = rambleMap[key];
      }
    }
    const post = this.createNewPost(postContent +`<br>${ramble}`, ["house of leaves", "non-linear live blog", "i'm looking for something in particular"], ["it's a house!"], ["its a maze!"]);
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }
  }
}

//don't actually create JR, isntead store important things here
//wait no it would be too funny if the only think jr ever does is post donut
//((not so fun fact: donut is dying. i love him very much. he is already immortal through the actions of the seeker and the cultist and countless others, but now he will be just that bit more immortal, you will remember him.))
class JR extends Character {
  name = "justifiedRecursion";
  desc = ":) :) :)<br><Br>welcome to my home!!!<br><br>be sure to make yourself comfortable!!!<br><Br>you probably won't be here long enough to need to eat...<br><br>but make sure you drink!<br><Br>human beings can only go three days without water!!!<br><Br>and how can you keep scrolling if you're dead of dehydration???";
  icon = "https://cdn.discordapp.com/attachments/931398056727953448/946949742863208448/garbage_horror_2.gif"; //which is the real me anymore. the one with the spiral or the one without?  either way, jr shouldnt be here. its wrong to be animated
  //https://www.tumblr.com/hazyscrounger/714681029142691840/i-want-to-like-zampanio-so-bad-i-feel-like-an?source=share
  //https://www.tumblr.com/jadedresearcher/714684745826566144/wait-wait-wait-sorry-to-send-a-second-ask-but?source=share
  constructor() {
    super();
    //https://www.tumblr.com/jadedresearcher/717211105792081921?source=share
    this.readied_posts.push(new Post(this, "Donut... <img data-jr-note='do you know what this means?  why i blazed it on tumblr?' src='images/Secrets/blazeIt.PNG'>", null, [""], [""], [""], true));
    this.readied_posts.push(new Post(this, "<img data-jr-note='such as a waste of twisted blood ;) ;) ;)' src='images/Secrets/okay_fine_jr_can_have_two_posts____as_a_treat.PNG'>", null, [""], [""], [""], true));
  }

  handleAsks = (parentToRenderTo, premadeAsk) => {
    const obsession = this.checkAskForContamination(premadeAsk);
    const bonus = obsession? `maybe I should check out ${obsession.name}`:"";
    let tags = [""];
    let responses = [];
    if (premadeAsk.text.toLowerCase().includes("zampanio")) {
      tags = ["Zampanio", "Zampanio", "Zampanio Is the Secret To The Universe", "The Fragment"];

      responses = ["Zampanio is a very fun game. You should play it!"]
    } else if (premadeAsk.characterName === observer.name) {
      responses = [`<span data-breach='observer'>  :) :) :)<br><br>i hope you enjoy your trip to skerim <br><Br>:) :) ;)</span>`]
      tags = ["did you really think", "it would be this easy"]
    }

    const suggested_reblogs = ["oh shit"]
    if (responses.length == 0) {
      return;
    }
    tags.push(bonus);
    const post = this.answerAnAsk(rand.pickFrom(responses), premadeAsk.text, premadeAsk.characterName ? premadeAsk.characterName : "Anonymous", tags, suggested_reblogs, suggested_reblogs);
    if (post && parentToRenderTo) {
      post.renderToScreen(parentToRenderTo);
    }

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
    let premadeAsk = rand.pickFrom(this.pending_asks)
    if (premadeAsk) {
      removeItemOnce(this.pending_asks, premadeAsk);
      this.handleAsks(parentToRenderTo, premadeAsk);
    }
    if (jrComments) {
      this.readied_posts.push(new Post(this, rand.pickFrom(jrComments), null, ["EastEast", "DevLog", "JR NOTE"], [""], [""], true));

    }
  }
}

//TODO: make sure that images inside posts are centered all nice
class KarmicRetribution extends Character {
  name = "karmicRetribution";
  icon = "images/icons/kr_icon.png";
  x = [
    `<img src='http://eyedolgames.com/Eyedlr/images/Secrets/Despap-1-troll.png'>
    <p>
    "You must choose."<br><br>
The great wyrm Nidhogg looms over the slight young troll. Its dark scales gleam even in the dim light. Despap's eyes are green-rimmed and wide; their face has a look of crazed joy.
<br><br>
"No."<br><Br>
They float up to Nidhogg's eye level with barely a flick of their wings. Despap reaches up and pulls the crown of roses from their hair, then places it atop the wyrm's great head. 
<br><Br>"Instead I give the Choice to you." <br><Br>
They lean forward to press a kiss to Nidhogg's forehead, below the garland. Vines or roots can be seen beginning to grow down, the tendrils latching into the serpent's flesh. As Despap pulls back, a rose buds, then blooms from where their lips were. The flower opens wide, and an eyeball can be seen in its center, rolling wildly.
<br><Br>"*Open your eyes,*" murmurs Despap.<br><Br>
<br><Br><br><Br>
Everything begins to shake and break up as the great wyrm thrashes and screams in the throes of its transformation.
    </p>
      `,
  ]

  constructor() {
    super();
    //JR NOTE: todo, KR should reblog memes eventually, work with KR to decide which
    for (let post of this.x) {
      this.readied_posts.push(new Post(this, post, null, [""], [""], [""], true));
    }
  }

  tick = (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.1, 0.9, 0.0);
  }
}