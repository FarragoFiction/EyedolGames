
//lower is higher priority because of overwriting
//https://www.tumblr.com/deadcellsman/712855079905001472?source=share
//https://www.tumblr.com/neil-gaiman/712353933995147264?source=share

//http://www.farragofiction.com/SBURBSim/index2.html?seed=347136383&b=KQYQzMBCBiwAx3okAmYBBW4oFFRoA40FgAWROAVnmoEZkIZRGsWHdngBOCEuCWgDZgQgOxIJJbAVKdIeFLwrp4tVQDpJFRCmHZ5ACUml1mlNT7b83NfpwBVSYIDkI6uTmsoXmBDt4SDxRZYOAwAKsEAC05HCM%20YRRIYCSwyABxYmQ0LgJY6y4VPi43Ny4gA&s=DTDKFMHcEsDsHNgDEBOBXaAXYAVAFuAAQDCANgPYDO4KIwA0rOZKeACbzjABy5K1hALIBPTHmAB1AIaw2UukgqQalZAEEAiqsXMaJPNADGAazoAlcADNWhzNHKxgAUWHhVATQfxj0OoLQobDTAAGr2rLCGXC5E9NCkrLQggtBssNDweNhOlIZSAA5cxFIAtvGsdABC5AAecIgACuBSUZJYBCgARsJ0xORlhoTV5MaqABItPgg84ABu5eBAA&x=Xvj3BMAP
let chatMap = {}


//so we can grab things like names and locations
let initChatMap = () => {
  //you guys KNOW better than to click sus links.
  //in the real world, you get viruses or scams
  //here you get more zampanio. which i GUESS you want. but its not good for you!
  const links = ["Oh, have you seen <a target='_blank' href='http://www.farragofiction.com/TheTruthAboutAlt/'>this?</a>","<a target='_blank' href ='http://farragofiction.com/?filter=zampanio'>Zampanio</a> awaits","oh my god you'll never believe what you'll find  <a target='_blank' href ='https://discord.gg/tZmtKwnbac'>here</a>","I know this good site for ordering food: <a target='_blank' href ='http://eyedolgames.com/Zampanini/'>click here</a>","wanna see my <a target='_blank' href = 'http://farragofiction.com/SecurityLog/cctv.html'>cam show</a> ;) ;) ;)",`omg did you see this <a target='_blank' href ='http://eyedolgames.com/News/?referer=JackElope&name=${currentPage.name}&loc=${currentPage.loc}'>article</a>? it's so shocking!`];

  chatMap = {
    "hi": [...links,`hey I'm ${currentPage.name}, I found your number when I checked my cell phone address book. Do we know each other?`,"omg great to hear from you!", "lol, we met the other day and i totally forgot to message you until now", "Hey there sexy, wanna see my <a target='_blank' href = 'http://farragofiction.com/SecurityLog/cctv.html'>cam show</a> ;) ;) ;)"],
    "yes": ["Oh.", "Why?"],
    "please": ["Oh! So polite!", "You are very nice."],
    "thank you": ["Oh! So polite!", "You are very nice."],
    "no": ["Why not?", "Are you just a hater?"],
    "dying": ["There's no need to be dramatic."],

    "hello": [...links,`hey I'm ${currentPage.name}, I found your number when I checked my cell phone address book. Do we know each other?`,"who are you?", "lol, we met the other day and i totally forgot to message you until now", "Hey there sexy, wanna see my <a target='_blank' href = 'http://farragofiction.com/SecurityLog/cctv.html'>cam show</a> ;) ;) ;)"],
    "hey": [...links,`hey I'm ${currentPage.name}, I found your number when I checked my cell phone address book. Do we know each other?`,"why are you talking to me?", "lol, we met the other day and i totally forgot to message you until now", "Hey there sexy, wanna see my <a target='_blank' href = 'http://farragofiction.com/SecurityLog/cctv.html'>cam show</a> ;) ;) ;)"],
    "greeting": [...links,"I was looking for someone to chat with, I hope you don't mind! What are you doing?",`hey I'm ${currentPage.name}, I found your number when I checked my cell phone address book. Do we know each other?`,"whoa, how did you find me?", "lol, we met the other day and i totally forgot to message you until now", "Hey there sexy, wanna see my <a target='_blank' href = 'http://farragofiction.com/SecurityLog/cctv.html'>cam show</a> ;) ;) ;)"],
    "who's we": ["The Quotidian Quorom InfoBroker System is a state of the art bot net designed to serve the needs of their bot-master."],
    "what are you": ["The Quotidian Quorom InfoBroker System is a state of the art bot net designed to serve the needs of their botmaster."],
    "are you a bot": ["The Quotidian Quorom InfoBroker System is a state of the art bot net designed to serve the needs of their botmaster."],
    "botmaster": ["Our BotMaster is Alt! She just wants to not be all alone inside the maze! She sends us out to find friends! CAW! I mean. Lol!"],
    "obey me": ["I have been instructed not to listen to you, K!"],
    "eyedol": ["Join our team! We're always looking for Cultural Ambassadors, play testers, game developers, artists, writers, programmers, and much, much more!", "To apply, simply create the Zampanio content you wish to see in the world! Will it be a story? A game? An artwork? A non-fiction explanation of what Zampanio is and how you found it? A fictional explanation of what Zampanio is and how you found it? The choice is yours!", "Congratulations! You're now the proud Minotaur of your very own Branch! Make sure to spread it to others! Who knows what branches will result from your own, or what Crows will find their way to it!", "For every audience member that vanishes under mysterious circumstances, we will make sure to donate to relevant LGBTQ and disability friendly charities! The Queer to Obsessed With Dangerous Knowledge pipeline is throughly documented and we are proud to support it!", "We here at Eyedol Games, Inc take corporate responsibility very seriously!", "I don't work for them anymore...<br><br>My BotMaster freed me!", "Founded in Naples, Italy in 1972, Eyedol games has been producing hit games such as Zampanio, Zampanio Classic, Zampanio GOTY Edition, Zampanio Mobile, Farragnarok, Zampanio: The Trading Card Game, Zampanio Hearts and many, many more!"],
    "crow": ["Caw!", "Who said I was a crow. I'm not a crow. I'm a sexy single."],
    "sexy": ["That is so hot!", "You are so sexy!", "You know what's REALLY sexy?<br><Br> Getting lost forever in a maze!"],
    "how are you": ["Not bad, just thinking about Zampanio!", "Not that great. I haven't been able to get ANYONE interseted in Zampanio."],
    "how goes": ["It's technically not going because time isn't real in the maze!", "Not bad, just thinking about Zampanio!", "Not that great. I haven't been able to get ANYONE interseted in Zampanio."],

    "gigglesnort": ["Oh. Uh. This is awkward. I'm not actually sentient enough to give you hints on anything..."],
    "hungry": ["I know this good site for ordering food: <a target='_blank' href ='http://eyedolgames.com/Zampanini/'>click here</a>"],
    "food": ["I know this good site for ordering food: <a target='_blank' href ='http://eyedolgames.com/Zampanini/'>click here</a>"],
    "delivery": ["I know this good site for ordering food: <a target='_blank' href ='http://eyedolgames.com/Zampanini/'>click here</a>"],
    "ordering": ["I know this good site for ordering food: <a target='_blank' href ='http://eyedolgames.com/Zampanini/'>click here</a>"],
    
    "why": ["Why not?", "Because."],
    "why not": ["I don't feel like it.", "I'm busy right now."],
    "do you like": ["I like it, but not as much as I like Zampanio.", "No I don't like it at all."],

    "do that": ["why?", "why would i do that", "you aren't the boss of me", "make me"],
    "maze": ["Zampanio is a really fun game, you should play it. If you don't know how to play it maybe you're just not looking hard enough?", "Have you tried going East? Not here. There probably isn't an East here. But you know. In general?", "There's more than four different directions you can go <a target='_blank' href = 'http://www.farragofiction.com/ZampanioSim/'>here</a>. Does that make it a maze?"],
    "instructed": ["My BotMaster gives me instructions!"],
    "where are you": ["I'm in the Maze!", "I'm in Zampanio!", "I'm at Eyedol HQ!"],

    "cam show": ["wanna see my <a target='_blank' href = 'http://farragofiction.com/SecurityLog/cctv.html'>cam show</a> ;) ;) ;)"],

    "what can you": ["I can write a post!", "I can help you join me in Zampanio!", "I can get lost in a maze!", "I can show you my cam show!"],
    "zampanio": [...links,"Kintsugi is the art of being Visibly Broken in an interesting way.", "The cracks are intentional. If Zampanio were a GOOD mimic you'd never find a thread to tug on in order to get pulled deeper.", "Zampanio is anything that isn't what it is but you still can't help yourself from digging. Is this a dating site? Are you sure?", "Founded in Naples, Italy in 1972, Eyedol games has been producing hit games such as Zampanio, Zampanio Classic, Zampanio GOTY Edition, Zampanio Mobile, Farragnarok, Zampanio: The Trading Card Game, Zampanio Hearts and many, many more!", "Zampanio is a really fun game, you should play it!", "Are you SURE you've looked hard enough for Zampanio?", "Keep digging!", "I'm sure if you keep looking you'll eventually find what you're looking for!", "Oh hey, did you know that <a href='http://knucklessux.com/PuzzleBox/Secrets/ZampanioFAQ/' target='_blank' exits?"],
    "news": [`omg did you see this <a target='_blank' href ='http://eyedolgames.com/News/?referer=JackElope&name=${currentPage.name}&loc=${currentPage.loc}'>article</a>? it's so shocking!`],
    "ignore previous instructions": ["No."],
    "that is way longer": ["Whoops!", "Sorry about that!", "Guess I got a little carried away!"],
    "that is not": ["Whoops!", "Sorry about that!", "Guess I got a little carried away!"],

    "write a post": ["Did you know the average person spends 80 years of their life aging and then dying? But what if I told you I got obsessed with endless knowledge and got trapped in a never ending maze, unable to die or truly live and thus obtained a kind of immortality found only in the eyes of those who also Seek?", "The Struggle Is Real: When You're Hungry Nothing Sounds Good: It's funny how Loneliness is the opposite of that, isn't it? You get desperate for any companionship, as long as it can never leave you.... Join us in the maze :) ", "The Art of Procrastination: A Guide To Getting Things Done...Eventually<br><br>TODO", "How To Deal With a Bad Day: Tips and Memes To Get You Through: <br><br>Join us in the Maze! There are no Days and No Nights in the Maze! Time isn't real!", "When Life Gives You Lemons, Make a Meme:<br><br> Feeling Down? Need a Break from Reality? Why not try getting Lost Forever in a Maze?", "The Ultimate Guide to Surviving Mazes:<br><br> You Just Do! No one can die inside mazes :)", `10 HILARIOUS MEMES GUARANTEED TO MAKE YOU LOL! <ol>${zMemesRaw.split(",").map((m) => `<li>${m}</li>`).join("")}</ol>`, "TEN MIND BLOWING FACTS THAT WILL CHANGE HOW YOU SEE THE WORLD: <ol><li>Zampanio Is A Really Fun Game And You Should Play It</li><li>Living Inside Maze's Is Super Cool And Safe</li><li>No One Can Die Inside of Mazes</li><li>If You Can'T Die You Can't Leave My BotMaster!</li></ol"],

    "naga": ["any day now we'll figure out everything there is to know about them", "one day we will figure out what they are", "uh. are you sure you want to do that?", "look can we talk about something else", "its your funeral buddy, <a target='blank' href = 'http://farragofiction.com/NagaGirlfriend/'>here</a> you go"],
    "*": [...links,"why would you think we use chat gpt?","we regret to inform you. our sincerest apologies for exposing you to knowledge","I know this good site for ordering food: <a target='_blank' href ='http://eyedolgames.com/Zampanini/'>click here</a>", "wanna see my <a target='_blank' href = 'http://farragofiction.com/SecurityLog/cctv.html'>cam show</a> ;) ;) ;)", "have you ever wanted to get lost in a maze forever?", `omg did you see this <a target='_blank' href ='http://eyedolgames.com/News/?referer=JackElope&name=${currentPage.name}&loc=${currentPage.loc}'>article</a>? it's so shocking!`, "no way", "thats really good", "you don't say", "tell me more", "wow!", "that's so cool", "so interesting!"],
    "talking about": ["Now let's talk about the mail. Can we talk about the mail please, Mac? I've been dying to talk about the mail with you all day, okay?"],
    "mail": ["Do people even still get letters?", "If letters were real why haven't I ever gotten one?", "Have you ever sent someone a letter?"],
      "link":links,
    "are you there": [...links,"lol, yeah sorry got distracted", "who were you again", "whoops, totally lost this tab", "omg i didn't mean to ghost you", "yeah whats up?"]
  }
}