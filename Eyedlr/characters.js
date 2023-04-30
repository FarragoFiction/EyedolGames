

class Character {
  name;
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

  //just a list of posts
  readied_posts = [];
  delete_readied_reblogs = true;

  constructor() {
    this.createCommonReadiedReblogs();
    if (this.name) {
      this.name = this.name.toLowerCase(); //i keep forgetting
    }
  }

  submitAsk = (characterName,text)=>{
    this.pending_asks.push({characterName, text});
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

  //hmm.  i should probably do the highest odd action first. 
  blorboAI = (parentToRenderTo, oddsReblog, oddsPost, oddsLike) => {
    if (this.secret_name === "River") {
      console.log("JR NOTE: what are the odds river will like?", oddsLike)
    }
    //check your highest priority thing first
    if (oddsLike > oddsPost && oddsLike > oddsReblog) {
      console.log("JR NOTE: like is the highest odds")

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
    this.checkBlorboLike(oddsLike);
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
    for (let key of Object.keys(this.readied_reblogs)) {
      for (let target of possiblities) {
        //if the target post has the key phrase anywhere in it, attack
        if (target.text.toLowerCase().includes(key.toLowerCase())) {
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


    const post = new Post(this, ask+text, null, tags.concat(askerName), suggested_reblogs, suggested_tags,false);
    this.posts.push(post);
    return post;
  }

  createNewPost(text, tags, suggested_reblogs, suggested_tags) {
    const post = new Post(this, text, null, tags, suggested_reblogs, suggested_tags,false);
    this.posts.push(post);
    return post;
  }

  findAPostEvenIfYouHaveInteractedWithIt = () => {
    return rand.pickFrom(all_posts);
  }



  reblogAPost(parent, text, tags, suggested_reblogs, suggested_tags) {
    //  constructor(owner, text, parent, tags, suggested_reblogs, suggested_tags) {
    const post = new Post(this, text, parent, tags, suggested_reblogs, suggested_tags);
    this.posts.push(post);
    this.reblogged_posts.push(post);
    parent.addChild(post);
    parent.chronologicalNotes.push({ post: post });
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
  return rand.pickFrom(first_names) + getRandomNumberBetween(0, 2022);
}

const randomPornBot = () => {
  const bot = new PornBot(randomPornBotName(), "http://eyedolgames.com/JackElope/images/SexySingles/" + randomPornBotIcon());
  bot.desc = rand.pickFrom(links);

  let numberObsessions = rand.getRandomNumberBetween(1, 3);
  let obsessionArray = Object.values(all_obsessions);
  for (let i = 0; i < numberObsessions; i++) {
    let o = rand.pickFrom(obsessionArray);
    bot.obsessions.push(o);
  }
  if (rand.nextDouble() > 0.3) {
    const o = rand.pickFrom(bot.obsessions);
    bot.desc += `<br> I'm totally obsessed with ${o.name}.`;

    bot.desc += ` DNI if you think ${o.randomOpinion(rand)}.`;
  }
  return bot;
}

//https://drive.google.com/drive/folders/1LCxnK5HMkSXscfXtzzv46ysaPRpa4p4u i don't want to forget the guide of hunters


//want at least three of these for every real character. 
//they use the obsession engine to post things, but also 
class PornBot extends Character {
  obsessions = [];
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
    let innaneComments = ["caw!!!", "so true bestie!", "!!!", "i came to have a good time and honestly i'm feeling so attacked right now", "i feel so attacked right now", "i'm in this picture and i don't like it"];
    /*
         `<a target='blank' href =""><img src ='images/Secrets/tumblr_screenshots/savepoint.PNG'></a>`
*/
    let possiblePosts = [...links, ...blorboPosts,
      "@wanderer 20h:14m:36s",
      "@wanderer 5d:23h:17:04s",
      "@wanderer 4d:15h:21m:33s",
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

    return this.createNewPost(rand.pickFrom(possiblePosts), [rand.pickFrom(innaneComments)], innaneComments.concat(links), innaneComments);

  }

  quotidianReblog = (post) => {
    let innaneComments = ["Am I a real boy now?", "look what i found!!!!", "did i do good?", "caw!!!", "so true bestie!", "!!!", "i feel so attacked right now", "i'm in this picture and i don't like it"];
    if (post.suggested_reblogs && rand.nextDouble() > 0.5) {
      let t = [];
      if (post.suggested_tags) {
        t.push(this.quirk.apply(rand.pickFrom(post.suggested_tags)));
      }

      if (post.root && post.root.suggested_tags) {
        t.push(this.quirk.apply(rand.pickFrom(post.root.suggested_tags)));
      }
      return this.reblogAPost(post, this.quirk.apply(rand.pickFrom(post.suggested_reblogs)), t, ["message me for a good time!", "that's so sexy!", "wow! so interesting!", "tell me more!", "what a great idea!"], [...innaneComments, "link", "sexy"]);
    } else {
      return this.reblogAPost(post, this.quirk.apply(rand.pickFrom(innaneComments.concat(links))), [this.quirk.apply(rand.pickFrom(innaneComments))], ["message me for a good time!", "that's so sexy!", "wow! so interesting!", "tell me more!", "what a great idea!"], [...innaneComments, "link", "sexy"]);
    }
  }


  tick = async (parentToRenderTo) => {
    //quotidians prefer to do preprogrammed actions if possible
    if (rand.nextDouble() > 0.5) {
      let post = this.handleReadiedReblog();
      if (post && parentToRenderTo) {
        post.renderToScreen(parentToRenderTo);
      }
      if (post) {
        return;
      }
    }


    let target = this.findAPostEvenIfYouHaveInteractedWithIt();

    if (target && rand.nextDouble() > 0.75) {
      if (rand.nextDouble() > 0.5) {
        this.likePost(target);
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
  }
}

//you should be allowed to follow people
//you can get asks (if you reply, posts), do you traverse mazes clockwise or counterclockwise
//you should get to post, and your posts are treated just like any other (aka they can be reblogged and commented on and etc)
class Observer extends Character {
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
class Wanda extends Character {

  //wanda likes youtube better , have a porn bot post this: https://www.tumblr.com/batastrophe7/714415053266436096/yea-and-it-fucking-kicked-ass-and-it-fucking?source=share

  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
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


//@s intern 2, reblogs and posts memes and shitposts, especially about baby animals
//occasionally reposts things about the eye killer or other conspiracies
//if they post "i think i'm close to figuring out where the eye killer will strike next" they never post again
class Wodin extends Character {

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
  //porn bot posts this, intern reblogs with gigglesnort https://www.tumblr.com/phantomrose96/710087799520509952?source=branch
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}

//interacts with Wodin, reblogging memes and @ing them constantly 
class Intern2 extends Character {
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }

}

//dealing with the grief of losing Wodin. only one or two posts ever, both commentless pictures of ugly baby animals
//https://archiveofourown.org/works/35075182 his origin

class Intern3 extends Character {
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}

//only reblogs, never posts, reblogs can include a gif or image with text in it, or a link that is the reply
//mix of violence and yugioh that she reblogs
class EyeKiller extends Character {
  name="kGL%55Wgyon2$T4V_23497" //no she does not want you to know who she is or generate a user name that has meaning to her. thats how you FIND her.
  secret_name = "eyekiller";
  icon = "images/icons/killer.png";
  desc = `"Never say "who's there?" Don't you watch scary movies? It's a death wish. You might as well come out to investigate a strange noise or something." - Scream(1996)`;
  constructor() {
    super();
    //she is broad AI like river, but responds to the first thing that gets her attention then hides
    this.readied_reblogs['eyekiller/dontknowsource_butitmightliterallybeherbackstory'] = new Post(this, "X", null, ["X"], [], [], true);
    this.readied_reblogs['meow'] = new Post(this, "!", null, ["!"], [], [], true);
    this.readied_reblogs['cards'] = new Post(this, "!", null, ["!"], [], [], true);
    this.readied_reblogs['innocent'] = new Post(this, "?", null, ["?"], [], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }

}

//reblogs eye killer posts and also yugioh posts
class Himbo extends Character {
  name = "maxxcchallenge";
  icon = "images/icons/himbo_right_hand.png";
  constructor() {
    super();
    this.readied_reblogs['cards'] = new Post(this, "LOL!", null, ["lol","so true","thats why you should find a girl","who already plays"], [], [], true);

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
class FlowerChick extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  secret_name = "cfo";

  //should respond to porn bot posts with 'scaredofthunder.png' in them (ats ria and devona)
  //http://knucklessux.com/PuzzleBox/Secrets/Wanda%20Resume.pdf
  //ats the eye killer about this after a porn bot posts it https://www.tumblr.com/mumblesplash/714417492141998081/thank-u-everyone-who-tagged-this-kaz-brekker?source=share 
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}

//chats with everyone she can and directs people to jackElope
//runs the porn bot net so other characters @ her to complain about their spam occasionally
class Alt extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  secret_name = "alt";
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}

//reblogs the things alt posts
//whenever it does reblog, only speaks in the tags
class Truth extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  /*
    posts screenshots of north/south/east secrets and how to get them 
  */
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }

}

//looping closer. eyedol games closer would NEVER get on social media during company hours
//and all hours are company hours. 
//mostly plugs her various consulting services and gets in absolutely stupid petty feuds with witherby. 
//(her type of Lonely does NOT play nice with his.)
class Closer extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  secret_name = "closer";
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
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



  tick = async (parentToRenderTo) => {
    //neville is equally likely to do everything, you learn nothing from him
    //hes just vibin
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
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
  name = "void_soup";
  icon = "images/icons/Neville.png";
  secret_name = "devona";

  // porn bot posts this, devona should reblog and ramble about it https://www.tumblr.com/foone/713863322485850112?source=share

  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
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
  secret_name = "ria";
  icon = "images/icons/Ria.png";

  icon = "asdfsf"

  constructor() {
    super();
    this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.7, 0.7, 0.3);
  }

}

//she reblogs with comments and tags of :3 and other emoji, and she reblogs  *their spelling corrections (its like work!)
class Camille extends Character {
  secret_name = "camille";
  dead = false; //she dies if she posts something other than :3 or a spelling correction
  icon = "images/icons/Camille.png"; //she reassures the Armor this isn't a SOCIAL network, its all business baby. No attachments!
  //she fights that which would stop the coffin
  name = "robitussin-warrior";

  constructor() {
    super();
    this.readied_reblogs['dead'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['fate'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['death'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['doom'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['die'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['killed'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['corpse'] = new Post(this, ":3", null, [":3"], [""], [""], true);
    this.readied_reblogs['headless'] = new Post(this, ":3", null, [":3"], [""], [""], true);

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

  tick = async (parentToRenderTo) => {
    if (this.dead) {
      return;
    }
    this.blorboAI(parentToRenderTo, 0.5, 0.75, 0.5);
    for (let post of this.posts) {
      if (post.text.includes("Zampanio")) {
        this.dead = true; //she will never post again
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
  block_list = []; //lonely boy blocks an awful lot of people. he is NOT willing to put up with bullshit


  //when you post from here, remove
  //      `<a target='blank' href ="tumblrurl"><img src ='images/Secrets/tumblr_screenshots/savepoint.PNG'></a>`
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);
    this.submitAsk("K","What kind of creepy shit are you doing, Witherby? You get off on this shit? Knowing everyones secrets? You think it makes it better that you do it out in the open instead of in your shitty little box?  Stupid Witherby. Stupid little creepy Witherby. You don't even get what this place is for! I feel SORRY for you, really. Get a life!")
  }

  handleAsks = (parentToRenderTo, premadeAsk) =>{
    //just generate an ask rather than deal with a blocked char.
    if(premadeAsk && this.block_list.includes(premadeAsk.characterName)){
      premadeAsk = null;
    }
    const pettyTheftTargets = "a shirt, some chips, some meat, some batteries, a peppermint candy, a bag of chips, some ice, candy, meat, bread, potatoes, vegetables, fruit, an apple, a banana".split(",");
    const starts = ["Forgive me father","Forgive me daddy","One time","When i was a kid","Last week",`About a ${rand.pickFrom(["year","month","day","decade"])} ago`,`Last ${rand.pickFrom("Monday, Tuesday, Wednesday, Thursday, Saturday, Sunday, month, week, year".split(","))}`];
    const sins = ["I killed them all.",`I murdered someone.`,'I killed an animal.', `I've been a bad bad ${rand.pickFrom(["boy","girl"])}`,`I stole ${rand.pickFrom(pettyTheftTargets)} from the grocery store`,"I left my little brother to die",`I shopliffted ${rand.pickFrom(pettyTheftTargets)}`,`I stole ${rand.pickFrom(pettyTheftTargets)} to feed my family`];
    const endings = ["Was I wrong?","Was I an asshole?", "Do you think that's fucked up?","Can I ever be forgiven?","Am I going to be punished?"];
    let question = premadeAsk? premadeAsk.text:`${rand.pickFrom(starts)}, ${rand.pickFrom(sins)}.  ${rand.pickFrom(endings)}`;

    if(!premadeAsk){
      question = randomQuirk(rand).apply(question);
    }
 
    let responses = ["Wow, sounds rough,buddy!","I forgive you.","You are forgiven.","It's okay."];
    if(question.includes("shoplift") || question.includes("steal")  || question.includes("stole")){
      responses = ["It is always morally correct to steal from shops.","You did what you had to do.", "I understand why you had to do that. It's okay."]
    }else if (question.includes("murder") || question.includes("kill") || question.includes("die")){
      responses = ["..."]; //one sin doesn't forgive EVERY sin
    }else if(question.includes("bad")){
      responses = ["For the last time, I am not interested."]
    }

    if(premadeAsk && premadeAsk.characterName === "K"){
      responses = ["Blocked."];
      this.block_list.push(premadeAsk.characterName);
    }

    const tags = ["confession"];
    //witherby doesn't judge but his followers sure do
    const suggested_reblogs = ["wow","what the hell", "who DOES that","you should feel ashamed"]

    const post = this.answerAnAsk(rand.pickFrom(responses), question, premadeAsk?premadeAsk.characterName:"Anonymous", tags, suggested_reblogs, suggested_reblogs);
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
    removeItemOnce(this.pending_asks, premadeAsk);
    this.handleAsks(parentToRenderTo,premadeAsk);
  }

}

//snail posts constantly, anything cute or friendshaped as well
class Yongki extends Character {
  secret_name = "yongki";

  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
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
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
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
  name = "void_soup";
  icon = "images/icons/Neville.png";
  secret_name = "captain";
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
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


  tick = async (parentToRenderTo) => {
    //you are GOING to see more of K than anyone else.

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
  name = "void_soup";
  icon = "images/icons/Neville.png";
  secret_name = "doc";

  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }


}


//ALSO lives blog his day and its always just a bit more normal and a bit more impressive than docs posts
//very popular, ocassionaly advertises his work with the PTA and his bid to run into politics
//reblogs "everyone has a doppelganger" and secret twin type posts all the time
class TheNeighbor extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  name = "statefarmOfficial" //like a good neighbor, statefarm is there
  icon = "";
  constructor() {
    super();
    //gofounditwatcher
    this.readied_reblogs['gofounditwatcher'] = new Post(this, "delete this", null, [""], ["lol", "yeah thats you", "you okay there buddy?"], [""], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
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

    this.readied_reblogs["nidhogg"] = (new Post(this, "THE ALL FATHER APPROVES!!!", null, ["NIDHOGG"], [""], [""], true));
  }

  tick = (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
    //he can not be stopped.
    this.readied_reblogs["nidhogg"] = (new Post(this, "THE ALL FATHER APPROVES!!!", null, ["NIDHOGG"], [""], [""], true));

  }

}

//fucked up glitches happen to their  posts occasionally,
// usually will reblog them normally after and say things like 'sorry about that" , occasionally posts about meals in unsettling ways
// lots of call out and cancel posts on people they don't like (usually people who insulted parker)
//occasionally @s parker pictures of hatsune miku and hydration memes
class Vik extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  secret_name = "vik";

  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}


//reblogs hatsune miku
//reblogs objects with faces (alt hates this)
//reblogs dirt (that fucking cow video i love so much. Claire! It's DIRT!)
//posts and reblogs pictures of holes
//deranged anime takes (people reblog his deranged takes and say mean things, then vik attacks them)
class Parker extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  secret_name = "parker";

  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
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
  name = "void_soup";
  icon = "images/icons/Neville.png";
  secret_name = "nam";

  /*"To the NORTH is ThisIsNotAGame. In it's endless hallways you see countless variations on players and screens and the wistful Might-Have-Beens of a game you wish you could have played. 
To the SOUTH is JustTruth.  In it's endless corridors lurk the bitter ThisIsNotASpiral that has been watching and trying in vain to keep from tormenting you. Only truths are here, no more masks, no more pretence. 
To the EAST is ThisIsAGame. It is a place of lies and madness. It is here. You have brought us here and it is your fault. This was never a game. This STILL isn't a game, no matter how much you insist otherwise. How long will you trap us in these endless corridors?"
*/
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
  }
}


//occasionally jumps in with Vik/Parker on putting "the bad guys" on blast, other times tries to defend them
//reblogs legal advice and adds his own take as well
class Ronin extends Character {
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

//don't actually create JR, isntead store important things here
class JR extends Character {
  name = "void_soup";
  icon = "images/icons/Neville.png";
  //https://www.tumblr.com/hazyscrounger/714681029142691840/i-want-to-like-zampanio-so-bad-i-feel-like-an?source=share
  //https://www.tumblr.com/jadedresearcher/714684745826566144/wait-wait-wait-sorry-to-send-a-second-ask-but?source=share
  constructor() {
    super();
    //this.readied_reblogs['Ria/bugs_conspiracies'] = new Post(this, "No, see? That's just what they *want* you to think. You play by their rules!! and before you know it you're dancing to their tune stepping to their drum and nothing but a soldier marching!! in formation NO you need to set your own beat, need to twist the genre change the story!! you dont dodge you dont SWALLOW!! you DIE!! you make it a tragedy you RUIN !! HIS!! LIFE!!!!!!", null, ["!!!", "you cant out bugs bunny", "the man himself", "but you CAN", "get him arrested"], ["lol", "you okay there buddy?"], [], true);

  }

  tick = async (parentToRenderTo) => {
    this.blorboAI(parentToRenderTo, 0.5, 0.5, 0.5);
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