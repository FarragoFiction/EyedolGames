/*
everything in here should be generic

more like the themes than anything

themes from zampanios should go into the obsession engine and build themselves from themes. 

(aka procedural obsessions)



*/

//dont want it to work how themes do

const GLITCH = 'GLITCH'; //jr
const HOMESTUCK = 'HOMESTUCK'; //jr
const ZAMPANIO = 'ZAMPANIO'; //jr
const HENCH = 'HENCH'; //kr
const FIVEDARPS = 'FIVEDARPS'; //IC
const TOGITHINGY = 'TOGITHINGY'; //CD
const SUBTLEWARS = 'SUBTLEWARS'; //MI

const THE_MAGNUS_ARCHIVES = 'THE_MAGNUS_ARCHIVES'; //jr



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

  constructor(name, blorbos, minorBlorbos,importantEvents, opinions, commonPhrases, fanGoals, locations,objects,jobs) {
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

  randomLocation =(rand)=>{
    return rand.pickFrom(this.locations);
  }

  randomObject =(rand)=>{
    return rand.pickFrom(this.objects);
  }

  randomJob =(rand)=>{
    return rand.pickFrom(this.jobs);
  }

  randomBlorbo =(rand)=>{
    return rand.pickFrom(this.blorbos);
  }

  randomMinorBlorbo =(rand)=>{
    return rand.pickFrom(this.minorBlorbos);
  }

  randomEvent =(rand)=>{
    return rand.pickFrom(this.importantEvents);
  }

  randomCommonPhrases =(rand)=>{
    return rand.pickFrom(this.commonPhrases);
  }

  randomOpinion =(rand)=>{
    return rand.pickFrom(this.opinions);
  }

  randomGoal =(rand)=>{
    return rand.pickFrom(this.fanGoals);
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



all_obsessions[GLITCH] = new Obsession(
  "[INSERT FANDOM HERE]",
  ["CHARACTER1","CHARACTER2","CHARACTER3"],
  ["MINORCHARACTER1","MINORCHARACTER2","MINORCHARACTER3"],
  ["EVENT1","EVENT2","EVENT3"],
  ["HEADCANON1","HEADCANON2","HEADCANON3"],
  ["your insides are worth as much as your outsides","MEME2","MEME3"],
  ["GOAL1","GOAL2","GOAL2"],
  ["LOCATION1","LOCATION2","LOCATION3"],
  ["OBJECT1","OBJECT2","OBJECT3"],
  ["JOB1","JOB2","JOB3"]

);

all_obsessions[ZAMPANIO] = new Obsession(
  "[INSERT FANDOM HERE]",
  ["CHARACTER1","CHARACTER2","CHARACTER3"],
  ["MINORCHARACTER1","MINORCHARACTER2","MINORCHARACTER3"],
  ["EVENT1","EVENT2","EVENT3"],
  ["HEADCANON1","HEADCANON2","HEADCANON3"],
  ["MEME1","MEME2","MEME3"],
  ["GOAL1","GOAL2","GOAL2"],
  ["LOCATION1","LOCATION2","LOCATION3"],
  ["OBJECT1","OBJECT2","OBJECT3"],
  ["JOB1","JOB2","JOB3"]

);

all_obsessions[HOMESTUCK] = new Obsession(
  "Homestuck",
  ["Jack Noir","Calliope","Caliborn","Lord English","Eridan","Gamzee","Vriska","Equius","Terezi","Kanaya","Feferi","Nepeta","Aradia","Tavros","Sollux","Karkat","Roxy","Jane","Dirk","Jake","Jade","Rose","Dave","John"],
  ["The Mayor","Parcel Mistress","Casey","Meenah","Cronus","Kurloz","Horuss","Aranea","Latula","Porrim","Meulin","Kankri","Mituna","Rufioh","Damara",")(IC","Snowman","Lil Cal","Spades Slick","Doc Scratch"],
  ["when we realized Lord English really HAD been here all along","when jade finally entered the session","when rose and dave realizd they were die to the green sun","when john god tiered","when we realized jade had a copy of her own dead body","when vriska killed all those people","when the trolls realized they were in a single session","when act 7 finally came out","when homosuck happened","when dave and karkat spent all that time on the meteor together","when john realized he actually no longer liked con air","when jade got those dog ears","when vriska chucked all those dead bodies into sprites","when gamzee killed all those people","when terezi and gamzee black dated","when aranea explained leprechaun romance to us","when rose became an alcholic","when rose and kanaya finally kissed","when earth was destroyed","when we realized dirk and roxy lived in a flooded, post apocalyptic earth","when jane went trickster and everything was just peachy","when caliborn was obsessed with SAW just like Bro but unlike Dirk","when johns birthday kept happening","when karkat realized he wasn't a good friend-leader","when aradia died 1001 times off screen"],
  ["it genuinely rewrote my brain on how fiction works","Vriska did nothing wrong","act 1 was the best part","knight classes exploit their aspect"],
  ["this is stupid","what pumpkin","be the other guy","dear sweet precious cassie","flip the fuck out","x2 Facepalm Combo","a hell of a mystery","acrobatic fucking pirouette","addiction is a powerful thing","bluh","boggle vacantly at these shenanigans","don't turn your back on the body","he is already here","ironic proximity to some horses","irons in the fire","it's hard being a kid. Its hard and nobody understand.","legendary piece of shit","federal fucking issue"],
  ["learn how to draw in the symbolic style","write a fan-fiction about that time on the meteor","write a fan comic where everyone lives","rewrite the epilogues to be less depressing","write a story about characters from another series playing sburb","code an elaborate simulation of sburb complete with glitches"],
  ["Incipisphere","Paradox Space","Frog Temple","Ectobiology Lab","Dream Bubble","Brooding Caverns","Skaia","Furthest Ring","Alternia","Beforus","The Meteor","Prospit","Derse","The Battlefield","The Land of Wind and Shade","The Land of Little Cubes and Tea","The Land of Caves and Silence","The Land of Maps and Treasure","The Land of Clockwork and Heat","The Land of Pulse and Haze","The Land of Light and Rain","The Green Sun","The Land of Frost and Frogs"],
  ["juju","tumor","grist","special stardust","squiddle","fenestrated plane","codpiece","pumpkin","painting of a horse attacking a football player","matriorb","lil cal","boondollar","perfectly generic cube","kernel sprite","ring of orbs x fold","cake","shitty sword","bunny","frog"],
  ["ectobiologist","godtier","kernal sprite","carapacian","consort","denizen","player","knight","maid","mage","page","rogue","sylph","seer","thief","prince","bard","heir","witch","grimdark","grimbark","trickster"]
  );

all_obsessions[THE_MAGNUS_ARCHIVES] =new Obsession(
  "The Magnus Archives",
  ["John","Martin","Basira","Daisy","Georgie","Melanie","Elias","Tim","Sasha"],
  ["Jurgen Leitner","Gertrude","Richard","Raymond","Eric","Anthony","Jane","Oliver","Monster Pig","Sasha","The Admiral","Jonah Magnus","Peter Lukas","Nikola","The Eye","The Buried","The Spiral","The Stranger","The Dark","The Hunt","The Flesh","The Slaughter","The Web","The Vast","The Lonely","The End","The Desolation","The Corruption","Jude","Michael","Mikaele","Helen","Tim","Danny","Melanie","Adelard","Annabelle","Breekon and Hope","Mary","Gerry","Jared","Agnes","Daisy","Manuela"],
  ["when it was revealed that JOHN was the Archive and not the Archivist","when the Unknowing started up with clown music","when the Eyepocalypse finally hit right when everything seemed hopeful","when we realized the Archivst had been hunting","when we realized that Gerry really did die in america","when we realized EXACTLY what the tapes were for and who they were aligned with","when basira logicked her way out of the unknowing","when we realized that all cops are bastards"],
  ["smirkes 14 were a really great way to think about horror fiction","smirkes 14 were such stupid colonizer bullshit","helen did nothing wrong","michael was better than helen","helen was better than michael","georgie did nothing wrong","basira did nothing wrong","The Admiral deserves all the love"],
  ["the magnus archives is a  podcast","it is not what it is","i open the door","hello, john","Apologies for the deception","statement ends","statement begins"],
  ["start a podcast","try to write a bunch of horror short stories and voice act them","write a time travel fix it fic where the Distorion helps undo season 5","write a wildly out of character chat fic where everyone is happy","write a fic where jon goes back to his kid self and teams up with joshua gillespie to save the world","write an increasingly unhinged fan simulation of the spiral that consumes more and more of my and everyone around me's lives"],
  ["Sannikov Land","Ny-Ålesund","Millbank Prison","Hilltop Road","The Archives","London","The Panopticon","The Distortion's Hallways"],
  ["web table","'The Seven Lamps of Architecture'","'Ex Altiora'","web lighter","'Catalogue of the Trapped Dead'","'The Boneturner's Tale'","'A Guest For Mister Spider'","Leitner Book","tape recorder","eye"],
  ["archival assistant","avatar","Archivist","entity","Avatar of the Eye","Avatar of the Buried","Avatar of the Spiral","Avatar of the Stranger","Avatar of the Dark","Avatar of the Hunt","Avatar of the Slaughter","Avatar of the Web","Avatar of the Vast","Avatar of the Lonely","Avatar of the End","Avatar of the Desolation","Avatar of the Corruption"]
  );



//////////////////////////////////////////////////////////////////////////////////////////
//                                        HENCH  (submitted by KR)                      //
//////////////////////////////////////////////////////////////////////////////////////////


  const henchCharRaw = `Anna/The Auditor
  Leviathan
  Supercollider
  June
  Quantum Entanglement`

  const henchChar2Raw = `Greg
  Keller
  Vesper
  Darla
  Jav
  Molly
  McKinnon
  Electric Eel`

  const henchImportantEventsRaw =`when Supercollider broke Anna's leg
  when Anna created the Injury Report
  when Anna had to do fieldwork
  when June cut Anna off
  when Quantum did THAT`;

  const henchOpinionsRaw = `Supercollider deserved it
  NO ONE deserves what happened to Supercollider
  Leviathan's compound was a communist utopia
  `;

  const henchMemesRaw = `Frigid Auditor Bitch`

  const henchGoalsRaw = `write some fanfic in this setting
  make a hench OC
  make a supervillain OC`;

  const henchLocationsRaw = `Leviathan's compound
  Dovecote`;

  const henchObjectsRaw = `Anna's cane
  Leviathan's armor`

  const henchJobsRaw= `supervillain
  superhero
  hench`

  all_obsessions[HENCH] = new Obsession(
    "Hench by Natalie Zina Walschots",
    henchCharRaw.split("\n"),
    henchChar2Raw.split("\n"),
    henchImportantEventsRaw.split("\n"),
    henchOpinionsRaw.split("\n"),
    henchMemesRaw.split("\n"),
    henchGoalsRaw.split("\n"),
    henchLocationsRaw.split("\n"),
    henchObjectsRaw.split("\n"),
    henchJobsRaw.split("\n")  
  );


//////////////////////////////////////////////////////////////////////////////////////////
//                                        5Darps  (submitted by IC)                     //
//////////////////////////////////////////////////////////////////////////////////////////

const darpsCharRaw = `Priska, Piper, Riku, Otto`;
const darpsChar2Raw = `Street, Mars, Venus, Tank, Mr. Yurlungur, Giltia, Kohl, Trudie, Hexe Trude, Grace, Marie, Anu, Apollo, Lucius, Phantom Dealer, Beatdown, Officer Lane, Nyan Nyan, Officer Moriard, Brad, Sano, Bob, Decoy Otto, Uria, Sasuke, Ninkendog, Thriller Killer, Serpent Night Terror`;
const darpsImportantEventsRaw=`when Riku killed the Netherworld King, when Maha Vailo broke Otto's criminal mark, when Hexe Trude took over the Satellite`
const darpsOpinionsRaw=``;
const darpsMemesRaw=``;
const darpsGoalsRaw=``;
const darpsLocationsRaw=``;
const darpsObjectsRaw=``;
const darpsJobsRaw=``;

all_obsessions[FIVEDARPS] = new Obsession(
  "5Darps",
  darpsCharRaw.split(","),
  darpsChar2Raw.split(","),
  darpsImportantEventsRaw.split(","),
  darpsOpinionsRaw.split(","),
  darpsMemesRaw.split(","),
  darpsGoalsRaw.split(","),
  darpsLocationsRaw.split(","),
  darpsObjectsRaw.split(","),
  darpsJobsRaw.split(",")  
);


//////////////////////////////////////////////////////////////////////////////////////////
//                                  Togigageta   (submitted by CD)                      //
//////////////////////////////////////////////////////////////////////////////////////////


const togiCharRaw = `Bastonia
Forest
Fiction
Adeff
Esafa`;
const togiChar2Raw = `Fibasie
Tosbab
Fofo
Didaes
Egast
Coddy
Bab
The Mayor`;
const togiImportantEventsRaw = `when the siblings found the terminal
when Bastonia escaped their home
when Bastonia found the first gateway
when Esafa stole the ancient artifact
when Adeff pierced the veil
when the secret temple was uncovered
when the mayor finally appeared`;
const togiOpinionsRaw = `Cube is a better name
Adeff is irredeemable
Forest is the best character in anything ever
Fiction shouldn't have forgiven Forest
Esafa is the cutest
Lagamorph's Alley is terrifying
the projection sequences are pretty cool
the twist about the mayor is cliche`;
const togiMemesRaw = `putting silverware in the bathtub
ripe snow globes
the everything collection
I hope you get shot soon
The Locksmith
crowbars`;
const togiGoalsRaw = `write a fanfic about Didaes' daily schedule
make a remix of Tosbab's song
paint all of Bab's paintings in real life
write a fanfic about the siblings' past
write out how Esafa's sidequest works
make a map of the Rotting Woods
document all of Coddy's dialogue
draw fanart of Fofo at work on a new tool
draw the siblings in the Temple of Above`;
const togiLocationsRaw = `Bas' house
Esafa's lab
the Temple of Above
Somewhat Standard Supermarket
Lagomorph's Alley
The Rotting Woods
The Labyrinth
Breakdown Junction
the siblings' house
the mayor's office
Fibasie's tutorial booth
the playground
the Temple of Identity`;
const togiObjectsRaw = `source mirror
drop decoder
purple key
terminal
liminal lens
eye candy
sandy bottle`;
const togiJobsRaw = `cashier
hunter
painter
reologist
alchuemist`;


all_obsessions[TOGITHINGY] = new Obsession(
  "Togigageta",
  togiCharRaw.split("\n"),
  togiChar2Raw.split("\n"),
  togiImportantEventsRaw.split("\n"),
  togiOpinionsRaw.split("\n"),
  togiMemesRaw.split("\n"),
  togiGoalsRaw.split("\n"),
  togiLocationsRaw.split("\n"),
  togiObjectsRaw.split("\n"),
  togiJobsRaw.split("\n")  
);


//////////////////////////////////////////////////////////////////////////////////////////
//                                  SubtleWArs   (submitted by MI)                      //
//////////////////////////////////////////////////////////////////////////////////////////



//MI NOTE: These are all Gods, so that'll be fun
const swCharRaw = `The Immaculate
The Skinless Forest
The Masked Crown
The Storm-Cord
The Leviathan
The Cyclopean
The Daughter
The Moonson
The Anabasis
The Spider-in-Sharpness
The Imago
The Pageantine
The Old Queen Carnage
The Lady Thorn
The Shackle-Forge
The Gorge Gnash
The Pale Dancer
The Mother Locust
The Undercradle
The Incarnadine
The Mendicant
The Incarnadine
The Other Sun`;
const swChar2Raw = `W. Aster
Sandra Wakelight
The Rapture-Wurm
General Ruin
Wings-of-Tempest
The Splintered
The First Flame
Ruth of Rieche
James “Invincible” Kastanza (Self titled)
Thomson Osgood
Sun-In-Waiting
Lady Sapphire
The Cogwhale
The Knight-in-The-Woods
The Unblivion`;
const swImportantEventsRaw = `when the Second Dawn broke
when the Dawn of Time came
when the Old War was won
when the Farmer's Crime was punished
when the Paracosm came
when the Nine Breath Truth was implemented
when the Splintered ascended 
when the First Flame ascended 
when the First Exodus of Beasts occurred
when the Leviathan drank the Moonson
When the Infant Vendetta ended
when Atlantis fell
when Leviathan, Winter, and the Pale Dancer fought the War of Frost
when the First Luthier committed the Tragedy of the Storm-Cord
when Old Queen Carnage waged the War of Death
when the Red Revel ended the Berlin Convergence
when the Alica bound the Enlaced
when Oliver gazed into the Infestation
when General Ruin died
when the Emergence came
when the Reckoning happened
when the Corpse of the Primordial Dragon hit Detroit
when the New War begins `;
const swOpinionsRaw = `The Moonson did nothing wrong.
The Unplace is a great idea.
Leviathan is responsible for everything.
Fae are overpowered.
Ruth of Reiche is the best author.
C. Ambrose is the best author.
Sandra Wakelight is the best author.
Leila Raines is the worst author.
The Spider-in-Sharpness is the most important God.
The timeline doesn't make sense.
The Farmer's Crime was Cain and Abel.
The Imago is the son of the Other Sun
Plato was right, the world is a supernal reflection
The Mountain is as a gem with 813 facets
Moths are those who Seek
Magic is an extensive kind of Lie
The world created the Gods, not the other way round
The Pageantine's dream is all of our world
The Mountain is a collective hallucination `;
const swMemesRaw = `Almire is a peaceful land
As above so below
TENDON DAMAGE
All my worlds lost
The Wolves Wore Smiling Skin
:) 
Anabased
Who is W. Aster?
ITS NOT THE FUCKING UNPLACE YOU PIECE OF SHIT AZURITE
I will never forgive the Mendicant
JAMES KASTZANA LIVES
Ask me about the Moon`;
const swGoalsRaw = `Dream of the Mountain
Solve a Grimoire
Ascend during a Convergence
Kill an Endless
Kill a God
Remake the Other Mountain
Find a Rite
Build a stronger Cult
Become an Entity
Write a complete guide to the Mountain
Find the Moonson's Secret
Solve the secret of the Exaltation
Wake the Pageantine
Free the Moonson
Become a star-soul
Become Omniscient
Create new Magic`;
const swLocationsRaw = `Almire
The Mountain in Dreams
The Head
The Summit
The Alabaster Library
The Chancery
The Aviary Incandescent
The Watchtowers
The Ivory Maze
Summer's Lodge 
The Innards
Court
House of Traitors
The Gullet
The Workshop
The Pyre
Warrens
The Gallery
Dancer's Hall
Burrows
The Flanks
The Orchestra 
The Forest
Deep Woods
The Heart of the Forest
The Abattoir
Museum of Scars
The Arena 
The Trench
House of Needles
The Swarm
The Unfair Embassy
The Waystone Path
Pillar of Brass
The Depths
Lake Lethe, 
City of Gears
Blackstone Cathedral
Heartbreak Grove
The Abyss
The Spider Door
The Half-jails
Tomb of the Moonson
The Buried
THE Aether
The Observatory
The Titan's Road
The Winding Road
The Other Mountain
Realms Between
Unplace
Impossible Angles
Beyond
Eras' Court`;
const swObjectsRaw = `Skyglass Knife
Altar of Sacrifice
Rite of Reforging
Knowledge of Impossible Edges
Courtly Manners 1934 edition
Dragon Egg
Sliver of Oak
Hadur-Bag
Sword of Loss
The Eclipse Tarot
Madman's Head`;
const swJobsRaw = `Occultist
Endless
Awakened
Azurite
Weaver
Author
Archmage
Entity`;


all_obsessions[SUBTLEWARS] = new Obsession(
  "Subtle Wars",
  swCharRaw.split("\n"),
  swChar2Raw.split("\n"),
  swImportantEventsRaw.split("\n"),
  swOpinionsRaw.split("\n"),
  swMemesRaw.split("\n"),
  swGoalsRaw.split("\n"),
  swLocationsRaw.split("\n"),
  swObjectsRaw.split("\n"),
  swJobsRaw.split("\n")  
);




/*

const togiCharRaw = ``;
const togiChar2Raw = ``;
const togiImportantEventsRaw = ``;
const togiOpinionsRaw = ``;
const togiMemesRaw = ``;
const togiGoalsRaw = ``;
const togiLocationsRaw = ``;
const togiObjectsRaw = ``;
const togiJobsRaw = ``;


all_obsessions[TOGITHINGY] = new Obsession(
  "Togigagetas",
  togiCharRaw.split("\n"),
  togiChar2Raw.split("\n"),
  togiImportantEventsRaw.split("\n"),
  togiOpinionsRaw.split("\n"),
  togiMemesRaw.split("\n"),
  togiGoalsRaw.split("\n"),
  togiLocationsRaw.split("\n"),
  togiObjectsRaw.split("\n"),
  togiJobsRaw.split("\n")  
);*/