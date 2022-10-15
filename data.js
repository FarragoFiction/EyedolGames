
//suprise, its me, JR, using code from my zampanio fan game. 
//how are you doing? suprrised to see me here?
//look, this long dead fandom isn't going to revive ITSELF
//now is it

const PERSON = "person";
 const ADJ = "adj";
 const COMPLIMENT = "compliment";
 const INSULT = "insult";
 const SUPERMOVE = "supermove";
 const OBJECT = "object";
 const LOCATION = "location";
 const MEMORIES = "memories";
 const MENU = "menu";
 const CLASS = "CLASS";
 const ASPECT = "ASPECT";
 const CITYNAME = "CITYNAME";
 const CHILDBACKSTORY = "CHILDBACKSTORY";
 const GENERALBACKSTORY = "GENERALBACKSTORY";
 const MIRACLE = "MIRACLE";
 const SONG = "SONG";
 const PHILOSOPHY = "PHILOSOPHY";
 const LOC_DESC = "LOCATION DESCRIPTION";
 const MONSTER_DESC = "MONSTER DESCRIPTION";
 const SMELL = "SMELL";
 const TASTE = "TASTE";
 const FEELING = "FEELING";
 const SOUND = "SOUND";
 const EFFECTS = "EFFECTS";
 const WALL = "WALL";
 const FLOOR = "FLOOR";
 const FILTERS = "FILTERS";
 const THEME_OPINIONS = "THEME_OPINIONS";
 const WALLBACKGROUND = "WALLBACKGROUND";
 const WALLFOREGROUND = "WALLFOREGROUND";
 const FLOORBACKGROUND = "FLOORBACKGROUND";
 const FLOORFOREGROUND = "FLOORFOREGROUND";
 const SPRITES = "SPRITES";//birbs




//themes
 const NULL = "null";
 const ADDICTION = "addiction";
 const SPYING = "spying";
 const HEALING = "healing";
 const DOLLS = "dolls";
 const OBFUSCATION = "obfuscation";
 const CENSORSHIP = "censorship";

 const DARKNESS = "darkness";
 const KILLING = "killing";
 const MUSIC = "music";
 const DEFENSE = "defense";
 const QUESTING = "questing";
 const BUGS = "bugs";
 const LANGUAGE = "language";
 const CRAFTING = "crafting";
 const GUIDING = "guiding";
 const KNOWING = "knowing";
 const ENDINGS = "endings";
 const ROYALTY = "royalty";
 const WEB = "web";
 const ANGER = "anger";
 const SOUL = "soul";
 const LOVE = "love";
 const ZAP = "zap";
 const CHOICES = "choices";
 const DECAY = "decay";
 const PLANTS = "plants";
 const CLOWNS = "clowns";
 const HUNTING = "hunting";
 const ANGELS = "angels";
 const LIGHT = "light";
 const MAGIC = "magic";
 const FAMILY = "family";
 const SERVICE = "service";
 const WASTE = "waste";
 const APOCALYPSE = "apocalypse";
 const DEATH = "death";
 const TWISTING = "twisting";
 const MATH = "math";
 const SCIENCE = "science";
 const FLESH = "flesh";
 const BURIED = "buried";
 const STEALING = "stealing";
 const FREEDOM = "freedom";
 const FIRE = "fire";
 const LONELY = "lonely";
 const OCEAN = "ocean";
 const SPACE = "space";
 const TIME = "time";
 const ART = "art";  //JR NOTE TODO
 const TECHNOLOGY = "technology";  //JR NOTE TODO


 const keys = [NULL, TECHNOLOGY, ART, SPACE, TIME, FLESH, BURIED, STEALING, FREEDOM, FIRE, LONELY, OCEAN, SCIENCE, MATH, TWISTING, DEATH, APOCALYPSE, WASTE, SERVICE, FAMILY, MAGIC, ANGELS, LIGHT, HUNTING, CLOWNS, PLANTS, DECAY, CHOICES, ZAP, LOVE, SOUL, ANGER, WEB, ROYALTY, ENDINGS, KNOWING, GUIDING, CRAFTING, ADDICTION, SPYING, HEALING, DOLLS, OBFUSCATION, CENSORSHIP,DARKNESS, KILLING, MUSIC, DEFENSE, QUESTING, BUGS, LANGUAGE];





//noun_possibility, adj_possibility (glowing, shimmering, walking, ceasing)
 let wall_foregrounds = {}
 let wall_backgrounds = {}
 let floor_backgrounds = {}
 let floor_foregrounds = {}
 let sprite_possibilities = {}

 let stats_map = {};
 let person_posibilities = {};
 let object_possibilities = {};
 let location_possibilities = {};
 let general_backstories = {};
 let child_backstories = {};
 let miracles = {};
 let philosophy = {};
 let loc_desc = {};
 let monster_desc = {};
 let sound_possibilities = {};
 let taste_possibilities = {};
 let feeling_possibilities = {};
 let smell_possibilities = {};
 let effect_possibilities = {};

 let menu_options = {};
 let adj_possibilities = {};
 let insult_possibilities = {};
 let song_possibilities = {};
 let wall_possibilities = {};
 let floor_possibilities = {};
 let theme_opinions = {};
 let filter_possibilities = {};

 let compliment_possibilities = {};
 let memories = {};

 let super_name_possibilities_map = {};


 const checkIfAllKeysPresent = () => {
    for (let key of keys) {
        if (!(key in stats_map)) {
           // console.error("JR NOTE: key", key, "not found in stats_map");
        }

        if (!(key in person_posibilities)) {
        //    console.error("JR NOTE: key", key, "not found in noun_possibilities");
        }

        if (!(key in adj_possibilities)) {
          //  console.error("JR NOTE: key", key, "not found in adj_possibilities");
        }

        if (!(key in super_name_possibilities_map)) {
            //console.error("JR NOTE: key", key, "not found in super_name_possibilities_map");
        }

        if (!(key in insult_possibilities)) {
           // console.error("JR NOTE: key", key, "not found in insult_possibilities");
        }

        if (!(key in compliment_possibilities)) {
            //console.error("JR NOTE: key", key, "not found in compliment_possibilities");
        }

        if (!(key in location_possibilities)) {
        //    console.error("JR NOTE: key", key, "not found in location_possibilities");
        }

        if (!(key in object_possibilities)) {
          //  console.error("JR NOTE: key", key, "not found in object_possibilities");
        }

        if (!(key in child_backstories)) {
            //console.error("JR NOTE: key", key, "not found in child_backstories");
        }

        if (!(key in general_backstories)) {
           // console.error("JR NOTE: key", key, "not found in general_backstories");
        }

        if (!(key in miracles)) {
            //console.error("JR NOTE: key", key, "not found in miracles");
        }

        if (!(key in loc_desc)) {
            //console.error("JR NOTE: key", key, "not found in loc_desc");
        }

        if (!(key in philosophy)) {
            //console.error("JR NOTE: key", key, "not found in your philosophy");
        }

        if (!(key in monster_desc)) {
           // console.error("JR NOTE: key", key, "not found in monster_desc");
        }

        if (!(key in smell_possibilities)) {
           // console.error("JR NOTE: key", key, "not found in smell_possibilities");
        }

        if (!(key in taste_possibilities)) {
           // console.error("JR NOTE: key", key, "not found in taste_possibilities");
        }

        if (!(key in sound_possibilities)) {
           // console.error("JR NOTE: key", key, "not found in sound_possibilities");
        }

        if (!(key in feeling_possibilities)) {
           // console.error("JR NOTE: key", key, "not found in feeling_possibilities");
        }

        if (!(key in effect_possibilities)) {
           // console.error("JR NOTE: key", key, "not found in effect_possibilities");
        }

        if (!(key in wall_possibilities)) {
           // console.error("JR NOTE: key", key, "not found in wall_possibilities");
        }

        if (!(key in floor_possibilities)) {
           // console.error("JR NOTE: key", key, "not found in floor_possibilities");
        }
    }
}


const initPeople = () => {
    person_posibilities[ART] = ["artist", "painter", "sculpter", "curator"];
    person_posibilities[TECHNOLOGY] = ["engineer", "programmer", "hacker", "coder"];
    person_posibilities[SPACE] = ["astronaut", "climber", "mountaineer", "alpinist", "diver", "skydiver"];
    person_posibilities[TIME] = ["conductor", "clockmaker", "drummer", "robot"];
    person_posibilities[STEALING] = ["thief", "burglar", "robber", "mugger", "pick-pocket", "kleptomaniac"];
    person_posibilities[FREEDOM] = ["explorer", "pirate", "pixie", "fairy", "sylph", "traveler"];
    person_posibilities[FIRE] = ["fireman", "pyromaniac", "arsonist", "firebug"];
    person_posibilities[LONELY] = ["widow", "hermit", "dowager"];
    person_posibilities[OCEAN] = ["sailor", "seaman", "mariner", "boatman"];
    person_posibilities[FLESH] = ["butcher", "plastic surgeon", "slaughter man", "meat seller", "farmer"];
    person_posibilities[BURIED] = ["gravedigger", "miner", "loan shark", "digger"];
    person_posibilities[SCIENCE] = ["scientist", "biologist", "chemist", "physicist"];
    person_posibilities[MATH] = ["mathematician", "algebraist ", "math teacher", "engineer"];
    person_posibilities[TWISTING] = ["therapist", "minotaur", "devil", "liar", "madman"];
    person_posibilities[DEATH] = ["reaper", "psychopomp", "shinigami", "grave-digger", "undertaker", "thanatologist", "embalmer"];
    person_posibilities[APOCALYPSE] = ["horseman", "rider", "messiahs", "heisenberg"];
    person_posibilities[SERVICE] = ["butler", "maid", "lackey", "minion", "attendant", "cleaner"];
    person_posibilities[ANGELS] = ["angel", "feather", "guardian", "cherub", "arch-angel", "messenger", "spirit", "blessing"];
    person_posibilities[LIGHT] = ["lamplighter"];
    person_posibilities[FAMILY] = ["ancestor", "father", "mother", "brother", "sister", "aunt", "uncle", "cousin", "family"];
    person_posibilities[MAGIC] = ["wizard", "mage", "sorcerer", "alchemist", "sage"];
    person_posibilities[HUNTING] = ["hunter", "stalker", "predator", "pursuer"];
    person_posibilities[HEALING] = ["doctor", "nurse", "healer"];
    person_posibilities[PLANTS] = ["gardener","druid"];
    person_posibilities[DECAY] = ["gravedigger", "plague bearer"];
    person_posibilities[CHOICES] = ["selector"];
    person_posibilities[ZAP] = ["electrician", "robot"];
    person_posibilities[LOVE] = ["lover", "romantic"];
    person_posibilities[SOUL] = ["self"];
    person_posibilities[ANGER] = ["beserker", "rebel", "hater"];
    person_posibilities[WEB] = ["spider", "weaver", "spider","puppet"];
    person_posibilities[ROYALTY] = ["king", "queen", "lord"];
    person_posibilities[ENDINGS] = ["prince"];
    person_posibilities[KNOWING] = ["scholar", "sage", "proffessor"];
    person_posibilities[GUIDING] = ["guru", "sage", "mentor","guide","sherpa"];
    person_posibilities[CRAFTING] = ["logger","miner","craftsman","blacksmith","smith","seamstress"];
    person_posibilities[LANGUAGE] = ["author", "writer"];
    person_posibilities[BUGS] = ["bug", "worm", "fly", "maggot", "roach", "swarm", "hive", "locusts","entomologist"];
    person_posibilities[ADDICTION] = ["gambler", "dealer","stoner"];
    person_posibilities[SPYING] = ["eye", "watcher", "observer", "listener", "spy"];
    person_posibilities[CLOWNS] = ["clown", "mime", "jester", "acrobat", "performer", "harlequin", "ringmaster"];
    person_posibilities[DOLLS] = ["doll", "mannequin", "dressform", "statue", "dummy", "puppet", "marionette", "figure", "figurine", "toy"];
    person_posibilities[OBFUSCATION] = ["hider", "ninja", "censor", "disguise artist"];
    person_posibilities[CENSORSHIP] = ["hider", "ninja", "censor", "disguise artist"];

    person_posibilities[DARKNESS] = ["edgelord", "ninja", "watchman", "nightclerk"];
    person_posibilities[KILLING] = ["murderer", "assassin", "killer", "soldier"];
    person_posibilities[MUSIC] = ["singer", "dancer", "choir", "bard", "musician", "drummer"];
    person_posibilities[DEFENSE] = ["knight", "paladin", "defender", "protector", "page", "soldier", "warrior"];
    person_posibilities[QUESTING] = ["seeker", "adventurer", "pilgrim"];
}

const initAdjs = () => {
    adj_possibilities[ART] = ["artistic", "aesthetic", "beautiful", "moving", "balanced"];
    adj_possibilities[TECHNOLOGY] = ["technological", "advanced", "smart", "programmatic", "procedural"];
    adj_possibilities[TIME] = ["timely", "measured", "punctual", "clock-work", "steady", "ticking", "beating"];
    adj_possibilities[SPACE] = ["celestial", "otherworldly", "vast", "big", "open", "expansive", "boundless", "immeasurable", "infinite", "limitless", "enormous", "gigantic", "giant", "cosmic", "falling"];
    adj_possibilities[STEALING] = ["stolen", "taken", "yoinked", "missing", "kleptomania", "expensive"];
    adj_possibilities[FREEDOM] = ["free", "unchained", "unbound", "moving", "flying"];
    adj_possibilities[FIRE] = ["flaming", "blazing", "burning", "ashen", "burnt"];
    adj_possibilities[LONELY] = ["lonely", "isolated", "friendless", "forsaken", "sad"];
    adj_possibilities[OCEAN] = ["marine", "foggy", "misty", "cold", "wet", "damp", "chilly", "crying", "weeping"];
    adj_possibilities[FLESH] = ["meaty", "moist", "bloody", "physical", "muscular", "bony", "skinned"];
    adj_possibilities[BURIED] = ["buried", "choked", "covered", "underground", "underneath", "trapped", "compressed", "squeezed"];
    adj_possibilities[SCIENCE] = ["scientific", "callibrated", "measured", "experimental", "hypothetical"];
    adj_possibilities[MATH] = ["algebraic", "mathematical", "geometric", "numeric"];
    adj_possibilities[TWISTING] = ["twisted", "mad", "convoluted", "confusing", "lying", "deceitful", "spiralling", "wrong", "skewed"];
    adj_possibilities[DEATH] = ["deadly", "fatal", "necrotic", "dead"];
    adj_possibilities[APOCALYPSE] = ["apocalyptic", "doomed", "doomsday", "extinct", "threatened"];
    adj_possibilities[SERVICE] = ["service", "serving", "helping", "obedient", "humble", "menial", "servants"];
    adj_possibilities[ANGELS] = ["angelic", "feathery", "holy", "blessed"];
    adj_possibilities[MAGIC] = ["magical", "occult", "enchanted", "glamorous"];
    adj_possibilities[FAMILY] = ["father's", "mothers's", "brother's", "sister's", "aunt's", "uncle's", "family's", "familial", "ancestral", "hereditary"];
    adj_possibilities[LIGHT] = ["glowing", "bright", "shining", "radiating", "illuminating", "gleaming", "flickering", "lusterous"];
    adj_possibilities[HEALING] = ["curative", "medical", "healing", "curing", "medicinal", "restoring", "fixing", "mending", "regenerating"];
    adj_possibilities[PLANTS] = ["growing", "sprouting", "blossoming"];
    adj_possibilities[HUNTING] = ["hunting", "chasing", "following", "stalking"];
    adj_possibilities[DECAY] = ["decaying", "rotting", "crumbling", "decomposing", "festering", "languishing", "corrupting", "gross", "itchy", "sick", "ill", "inflamed", "scabbing"];
    adj_possibilities[CHOICES] = ["choosing", "branching", "selecting"];
    adj_possibilities[ZAP] = ["zapping", "jolting", "shocking", "electrical"];
    adj_possibilities[LOVE] = ["loving", "caring", "embracing", "smitten"];
    adj_possibilities[SOUL] = ["defining", "delineating", "pure"];
    adj_possibilities[ANGER] = ["raging", "hating", "rebelling", "glaring", "stampeding", "furious"];
    adj_possibilities[WEB] = ["controlling", "puppeting", "trapping", "gossamer", "ineluctable", "webbed", "arachnid", "doomed"];
    adj_possibilities[ROYALTY] = ["ruling", "mandating", "decreeing", "royal", "commanding", "gold"];
    adj_possibilities[ENDINGS] = ["ending", "final", "ultimate", "exhausted"];
    adj_possibilities[KNOWING] = ["knowing", "understanding", "learning"];
    adj_possibilities[GUIDING] = ["guiding", "showing", "explaining"];
    adj_possibilities[CRAFTING] = ["crafting", "mining", "logging", "building", "constructing", "carving", "smitting"];
    adj_possibilities[LANGUAGE] = ["reading", "writing", "speaking"];
    adj_possibilities[BUGS] = ["swarming", "buzzing", "squirming"];
    adj_possibilities[ADDICTION] = ["craving", "addicting", "compelling", "high"];
    adj_possibilities[SPYING] = ["spying", "observing", "watching", "voyeuristic", "seeking"];
    adj_possibilities[CLOWNS] = ["honking", "funny", "prancing", "tumbling", "joking", "jeering", "dancing", "performing", "jesting"];
    adj_possibilities[DOLLS] = ["delicate", "beautiful", "unsettling", "playing", "dressing", "plastic", "ceramic"];
    adj_possibilities[OBFUSCATION] = ["hiding", "hidden", "obscured", "confusing", "blinding", "secret", "unknowable", "censored"];
    adj_possibilities[CENSORSHIP] = ["hiding", "hidden", "obscured", "confusing", "blinding", "secret", "unknowable", "censored"];

    adj_possibilities[DARKNESS] = ["darkened", "blackened", "midnight", "blinding"];
    adj_possibilities[KILLING] = ["killing", "murderous", "massacred", "bloody", "savage", "blood-stained", "gory", "brutal"];
    adj_possibilities[MUSIC] = ["singing", "dancing", "playing"];
    adj_possibilities[DEFENSE] = ["defending", "gallant", "protecting"];
    adj_possibilities[QUESTING] = ["questing", "searching", "exploring", "seeking", "hopeful", "faithful"];
}

const initSongs = () => {
    song_possibilities[TWISTING] = ["no_gods_no_master.mp3", "good_luck_w_your_ears_honestly.mp3"];
    song_possibilities[ANGELS] = ["watt_3_but_jr_owns_it.mp3", "get_it_because_pipe_organ.mp3"];
    song_possibilities[LONELY] = ["Finish.mp3"];
    song_possibilities[DARKNESS] = ["turntablist.mp3"];
    song_possibilities[DECAY] = ["dear_god.mp3"];
    song_possibilities[TECHNOLOGY] = ["i_think_its_finished_priska_turbo_time.mp3"];
    song_possibilities[MUSIC] = ["riku_completed_i_think_idefk_anymore.mp3"];
}

const initFilters = () => {
    filter_possibilities[TWISTING] = [`hue-rotate(10deg)`,`hue-rotate(5deg)`,`hue-rotate(5deg)`,`hue-rotate(5deg)`,`hue-rotate(5deg)`,`hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(-5deg)`]; //subtle
    filter_possibilities[CLOWNS] = [`invert(100%)`, `hue-rotate(190deg)`, `hue-rotate(90deg)`]; //whimsy
    filter_possibilities[LIGHT] = [`brightness(300%)`,`contrast(60%)`, `filter: brightness(300%)`, `brightness(200%)`]; //the futures so bright you need to wear shades
    filter_possibilities[ANGER] = [`grayscale(100%) sepia(100%) contrast(454%) saturate(651%) brightness(44%) hue-rotate(681deg) blur(1px)`];// tint it red
    filter_possibilities[TIME] =[`sepia(50%);`, `sepia(75%);`, `sepia(100%);`]; //we all know the past is brown
    filter_possibilities[APOCALYPSE] = [`brightness(300%)`,`contrast(60%)`, `filter: brightness(300%)`, `brightness(200%)`]; //the futures so bright you need to wear shades
    filter_possibilities[FLESH] = [`grayscale(70%) sepia(100%) contrast(100%) saturate(157%) hue-rotate(310deg)`];// tint it pink
    filter_possibilities[OCEAN] = [`grayscale(70%) sepia(100%) contrast(100%) saturate(157%) hue-rotate(178deg)`];// tint it blue
    filter_possibilities[OBFUSCATION] = [`blur(5)`];
    filter_possibilities[CENSORSHIP] = [`blur(5)`];

    filter_possibilities[SPYING] = [`contrast(200%)`];
    filter_possibilities[LONELY] = [`contrast(70%)`,'saturate(30%)','grayscale(70%)','contrast(50%)','grayscale(90%)'];
    filter_possibilities[DARKNESS] = [`brightness(60%)`];



}

const initFloorPossibilities = () => {

    floor_possibilities[LOVE] = ["carpetfloor.png", "fancywoodfloor.png"];
    floor_possibilities[DECAY] = ["geometricfloor.png", "brickfloor3.png", "stonefloor.png"];
    floor_possibilities[BUGS] = ["dirtfloor.png", "dirtfloor.png", "dirtfloor.png"];
    floor_possibilities[TWISTING] = ["yellowwallpaper.jpg", "spiral.png", "static.png"];
    floor_possibilities[BURIED] = ["dirtfloor.png"];
    floor_possibilities[OCEAN] = ["waterfloor2.png", "waterfloor.png", "waterfloor3.png"];
    floor_possibilities[DARKNESS] = ["voidfloor.png"];
    floor_possibilities[ZAP] = ["gratefloor.png", "metaltilefloor.png", "metalfloor2.png", "metalfloor.png", "metalboardfloor.png"];
    floor_possibilities[TECHNOLOGY] = ["stars.png", "gratefloor.png", "metaltilefloor.png", "metalfloor2.png", "metalfloor.png", "metalboardfloor.png"];
    floor_possibilities[SCIENCE] = ["gratefloor.png", "metaltilefloor.png", "metalfloor2.png", "metalfloor.png", "metalboardfloor.png"];
    floor_possibilities[PLANTS] = ["grassfloor.png", "dirtfloor.png", "vines.png"];
    floor_possibilities[HUNTING] = ["grassfloor.png", "dirtfloor.png"];
    floor_possibilities[GUIDING] = ["grassfloor.png", "dirtfloor.png", "icefloor.png", "glassfloor.png", "stonefloor.png"];
    floor_possibilities[LIGHT] = ["lightfloor.png"];
    floor_possibilities[FIRE] = ["lavafloor.png", "firefloor.png"];
    floor_possibilities[ENDINGS] = ["curtains.png"];
    floor_possibilities[OBFUSCATION] = ["static.png", "voidfloor.png", "weirdfloor.png"];
    floor_possibilities[CENSORSHIP] = ["static.png", "voidfloor.png", "weirdfloor.png"];

    floor_possibilities[STEALING] = ["goldwalls.png"];
    floor_possibilities[MAGIC] = ["arcanefloor2.png", "arcanefloor.png"];
    floor_possibilities[ROYALTY] = ["goldwalls.png"];
    floor_possibilities[SPACE] = ["stars.png", "clouds.png"];
    floor_possibilities[FREEDOM] = ["clouds.png"];
    floor_possibilities[WEB] = ["web.png"];
    floor_possibilities[HEALING] = ["tilefloor.png"];
    floor_possibilities[ADDICTION] = ["carpetfloor.png"];
    floor_possibilities[LONELY] = ["snow.png"];
    floor_possibilities[FLESH] = ["flesh.png", "flesh2.png", "flesh3.png"];
    floor_possibilities[APOCALYPSE] = ["dirtfloor.png"];


    /*floor_possibilities[ART] =  ["Perfect Moment"];
    floor_possibilities[TIME] =  ["Stopped Clock"];

    floor_possibilities[MATH] =  ["Calculus Pop Quiz"];
    floor_possibilities[DEATH] =  ["Your Grave"];
    floor_possibilities[APOCALYPSE] =  ["Ragnarok"];
    floor_possibilities[ANGELS] =  ["Judgement Day"];
    floor_possibilities[SERVICE] =  ["Special Service"];
    floor_possibilities[FAMILY] =  ["Sins of the Father"];

    floor_possibilities[CHOICES] =  ["Timeline of Theseus"] ;
    floor_possibilities[SOUL] = ["Know thyself."] ;
    floor_possibilities[ANGER] = ["Dethrone Creation"] ;
    floor_possibilities[CRAFTING] =  ["Legendary Forge"];
    floor_possibilities[SPYING] =["Surveillance State"] ;
    floor_possibilities[CLOWNS] =["Ringmaster"] ;
    floor_possibilities[DOLLS] = ["Automatonophobia "] ;
    floor_possibilities[KILLING] =  ["Bloodbath"];
    floor_possibilities[MUSIC] =  ["Symphonic Synthesia"] ;
    floor_possibilities[DEFENSE] =  ["Excalibur"] ;
    floor_possibilities[QUESTING] = ["Satisfaction"] ;*/
}


const initWallForegrounds = () => {
    wall_foregrounds[DECAY] = [{ src: "deadvines.png", desc: "TODO" }, { src: "rotted_curtains1.png", desc: "TODO" }, { src: "rotted_curtains2.png", desc: "TODO" }, { src: "rotted_curtains3.png", desc: "TODO" }, { src: "decayingwindow.png", desc: "TODO" }];
    wall_foregrounds[BUGS] = [{ src: "waspnest2.png", desc: "TODO" }, { src: "bees4.png", desc: "TODO" }, { src: "bees.png", desc: "TODO" }, { src: "bees3.png", desc: "TODO" }, { src: "bees2.png", desc: "TODO" }, { src: "waspnest.png", desc: "TODO" }];
    wall_foregrounds[WEB] = [{ src: "Web_Object.png", desc: "Ah... An uh... Friend..." },{ src: "webcurtains2.png", desc: "TODO" }, { src: "webcurtains.png", desc: "TODO" }, { src: "webbing5.png", desc: "TODO" }, { src: "webbing4.png", desc: "TODO" }, { src: "webbing3.png", desc: "TODO" }, { src: "webbing2.png", desc: "TODO" }, { src: "webbing.png", desc: "TODO" }];
    wall_foregrounds[KILLING] = [{ src: "drippingblood.png", desc: "TODO" }];
    wall_foregrounds[SPYING] = [{ src: "eye13.png", desc: "IT LOOKS."},{ src: "eye12.png", desc: "IT TREMBLES."},{ src: "eye11.png", desc: "IT GAZES."},{ src: "eye10.png", desc: "IT FOCUSES."},{ src: "eye9.png", desc: "IT WAITS."},{ src: "eye8.png", desc: "IT WATCHES."},{ src: "eye7.png", desc: "IT GLISTENS."},{ src: "eye6.png", desc: "IT SEES."},{ src: "eye5.png", desc: "IT CANNOT BLINK."},{ src: "eye4.png", desc: "IT CRIES."},{ src: "eye3.png", desc: "IT SEES."},{ src: "eye2.png", desc: "IT STARES."},{ src: "eye1.png", desc: "IT WEEPS."}];
    wall_foregrounds[LONELY] = [{ src: "lonely_figure.png", desc: "Alone..." }];

    /*wall_possibilities[LOVE] = ["stonewalls.png","roses.png"];
    wall_foregrounds[BUGS] =  ["dirtwall.png","darkcorruption.png"];
    wall_foregrounds[TWISTING] =  ["spiral.png"];
    wall_foregrounds[ENDINGS] =  ["curtains.png"] ;
    wall_foregrounds[LANGUAGE] = ["books.png"];
    wall_foregrounds[KNOWING] = ["blackboard.png","books.png"];;
    wall_foregrounds[STEALING] =  ["jail.png","goldwalls.png"];
    wall_foregrounds[MATH] =  ["blackboard.png"];
    wall_foregrounds[BURIED] =  ["dirtwall.png"];
    wall_foregrounds[SPACE] = ["stars.png","clouds.png"];
    wall_foregrounds[OCEAN] =  ["waterwall.png"];
    wall_foregrounds[CLOWNS] =["curtains.png"] ;
    wall_foregrounds[HEALING] =  ["tilewall.png"];
    wall_foregrounds[FREEDOM] =  ["clouds.png"];
    wall_foregrounds[FIRE] =  ["lavawall.png"];
    wall_foregrounds[LIGHT] =  ["lightwall.png"];
    wall_foregrounds[ZAP] = ["metalwall1.png","metalwall2.png","metalwall3.png"] ;
    wall_foregrounds[TECHNOLOGY] =  ["metalwall1.png","metalwall2.png","metalwall3.png"] ;
    wall_foregrounds[SCIENCE] = ["metalwall1.png","metalwall2.png","metalwall3.png"]
    wall_foregrounds[PLANTS] = ["leafwalls.png","hedgewall.png","pinetrees.png"];
    wall_foregrounds[HUNTING] = ["leafwalls.png","hedgewall.png","pinetrees.png"];
    wall_foregrounds[GUIDING] = ["pinetrees.png"] ;
    wall_foregrounds[ART] =  ["Perfect Moment"];
    wall_foregrounds[TIME] =  ["Stopped Clock"];


    wall_foregrounds[FLESH] =  ["Physical God"];
    wall_foregrounds[DEATH] =  ["Your Grave"];
    wall_foregrounds[APOCALYPSE] =  ["Ragnarok"];
    wall_foregrounds[ANGELS] =  ["Judgement Day"];
    wall_foregrounds[SERVICE] =  ["Special Service"];
    wall_foregrounds[FAMILY] =  ["Sins of the Father"];
    wall_foregrounds[MAGIC] =  ["Ritual of Ragnarok"];
    wall_foregrounds[CHOICES] =  ["Timeline of Theseus"] ;
    wall_foregrounds[SOUL] = ["Know thyself."] ;
    wall_foregrounds[ANGER] = ["Dethrone Creation"] ;
    wall_foregrounds[ROYALTY] =  ["Excalibur"] ;
    wall_foregrounds[GUIDING] = ["Path To Victory"] ;
    wall_foregrounds[CRAFTING] =  ["Legendary Forge"];
    wall_foregrounds[ADDICTION] = ["Dealer's Delight"];
    wall_foregrounds[SPYING] =["Surveillance State"] ;
    wall_foregrounds[DOLLS] = ["Automatonophobia "] ;
    wall_foregrounds[OBFUSCATION] = ["Knowledge Forever Lost"] ;
    wall_foregrounds[DARKNESS] =  ["Night Eternal"] ;
    wall_foregrounds[MUSIC] =  ["Symphonic Synthesia"] ;
    wall_foregrounds[DEFENSE] =  ["Excalibur"] ;
    wall_foregrounds[QUESTING] = ["Satisfaction"] ;*/
}

//no one said quotidians are locked into only mimicking HUMANS, just sapient things. 
const initSpritePossibilities=()=>{
    //sprite_possibilities[TWISTING] =  [{left_src:"",right_src:"",up_src:"",down_src:""}];
    sprite_possibilities[APOCALYPSE] =  [{left_src:"Apocalypse_Crow2.gif",right_src:"Apocalypse_Crow.gif",up_src:"Apocalypse_Crow2.gif",down_src:"Apocalypse_Crow.gif"}];
    sprite_possibilities[DOLLS] =  [{left_src:"Art_Object_ghoul.gif",right_src:"Art_Object_ghoul.gif",up_src:"Art_Object_ghoul.gif",down_src:"Art_Object_ghoul.gif"}];
    sprite_possibilities[ART] =  [{left_src:"Art_Object_ghoul.gif",right_src:"Art_Object_ghoul.gif",up_src:"Art_Object_ghoul.gif",down_src:"Art_Object_ghoul.gif"}];
    sprite_possibilities[TIME] =  [{left_src:"clockface_walk_left.gif",right_src:"clockface_walk_right.gif",up_src:"clockface_walk_up.gif",down_src:"clockface_walk_down.gif"}];
    sprite_possibilities[PLANTS] =  [{left_src:"flowerkid_walk_left.gif",right_src:"flowerkid_walk_right.gif",up_src:"flowerkid_walk_up.gif",down_src:"flowerkid_walk_down.gif"}];
    //probably too big but *shrug* hunteres are swol, this is now canon (thems the break eye killer)(tho i suppose this is just a single instance of a hunter, so maybe its not universal)
    sprite_possibilities[HUNTING] =  [{left_src:"hunter_walk_left.gif",right_src:"hunter_walk_right.gif",up_src:"hunter_walk_up.gif",down_src:"hunter_walk_down.gif"}];
    sprite_possibilities[SPACE] =  [{left_src:"Space_object_ghoul.gif",right_src:"Space_object_ghoul.gif",up_src:"Space_object_ghoul.gif",down_src:"Space_object_ghoul.gif"}];
    sprite_possibilities[TECHNOLOGY] =  [{left_src:"technology_object_ghoul.gif",right_src:"technology_object_ghoul.gif",up_src:"technology_object_ghoul.gif",down_src:"technology_object_ghoul.gif"}];
    sprite_possibilities[TWISTING] =  [{left_src:"unknown.png",right_src:"unknown.png",up_src:"unknown.png",down_src:"unknown.png"},{left_src:"zampanio_flowerkid_by_hex2.png",right_src:"zampanio_flowerkid_by_hex2.png",up_src:"zampanio_flowerkid_by_hex2.png",down_src:"zampanio_flowerkid_by_hex2.png"},{left_src:"unknown.png",right_src:"zampanio_flowerkid_by_hex2.png",up_src:"Twisting_Crow.gif",down_src:"humanoid_crow.gif"},{left_src:"Twisting_Crow.gif",right_src:"Twisting_Crow.gif",up_src:"Twisting_Crow.gif",down_src:"Twisting_Crow.gif"}];
    sprite_possibilities[OCEAN] =  [{left_src:"plushie_shark_swimmin.gif",right_src:"plushie_shark_swimmin.gif",up_src:"plushie_shark_swimmin.gif",down_src:"plushie_shark_swimmin.gif"}];

}

//don't bothere filling out descs for these yet
const initWallBackgrounds = () => {
    wall_backgrounds[DECAY] = [{ src: "wallhole.png", desc: "TODO" }, { src: "wallholebig.png", desc: "TODO" }, { src: "wallcrack.png", desc: "TODO" }, { src: "decayingwall.png", desc: "TODO" }];
    wall_backgrounds[BUGS] = [{ src: "bees4.png", desc: "TODO" }, { src: "bees.png", desc: "TODO" }, { src: "bees3.png", desc: "TODO" }, { src: "bees2.png", desc: "TODO" }];
    wall_backgrounds[WEB] = [{ src: "webpainting3.png", desc: "TODO" }, { src: "webpainting2.png", desc: "TODO" }, { src: "webpainting.png", desc: "TODO" }, { src: "webmirror.png", desc: "TODO" }, { src: "webclock.png", desc: "TODO" }];
    wall_backgrounds[KILLING] = [{ src: "bloodywall.png", desc: "TODO" }];
    wall_backgrounds[KNOWING] = [{ src: "lockers.png", desc: "TODO" }];

    /*
    wall_backgrounds[LOVE] = ["stonewalls.png","roses.png"];
    wall_backgrounds[TWISTING] =  ["spiral.png"];
    wall_backgrounds[ENDINGS] =  ["curtains.png"] ;
    wall_backgrounds[LANGUAGE] = ["books.png"];
    wall_backgrounds[KNOWING] = ["blackboard.png","books.png"];;
    wall_backgrounds[STEALING] =  ["jail.png","goldwalls.png"];
    wall_backgrounds[MATH] =  ["blackboard.png"];
    wall_backgrounds[BURIED] =  ["dirtwall.png"];
    wall_backgrounds[SPACE] = ["stars.png","clouds.png"];
    wall_backgrounds[OCEAN] =  ["waterwall.png"];
    wall_backgrounds[CLOWNS] =["curtains.png"] ;
    wall_backgrounds[WEB] =  ["web.png"] ;
    wall_backgrounds[HEALING] =  ["tilewall.png"];
    wall_backgrounds[FREEDOM] =  ["clouds.png"];
    wall_backgrounds[FIRE] =  ["lavawall.png"];
    wall_backgrounds[LIGHT] =  ["lightwall.png"];
    wall_backgrounds[ZAP] = ["metalwall1.png","metalwall2.png","metalwall3.png"] ;
    wall_backgrounds[TECHNOLOGY] =  ["metalwall1.png","metalwall2.png","metalwall3.png"] ;
    wall_backgrounds[SCIENCE] = ["metalwall1.png","metalwall2.png","metalwall3.png"]
    wall_backgrounds[PLANTS] = ["leafwalls.png","hedgewall.png","pinetrees.png"];
    wall_backgrounds[HUNTING] = ["leafwalls.png","hedgewall.png","pinetrees.png"];
    wall_backgrounds[GUIDING] = ["pinetrees.png"] ;
    wall_backgrounds[ART] =  ["Perfect Moment"];
    wall_backgrounds[TIME] =  ["Stopped Clock"];


    wall_backgrounds[FLESH] =  ["Physical God"];
    wall_backgrounds[DEATH] =  ["Your Grave"];
    wall_backgrounds[APOCALYPSE] =  ["Ragnarok"];
    wall_backgrounds[ANGELS] =  ["Judgement Day"];
    wall_backgrounds[SERVICE] =  ["Special Service"];
    wall_backgrounds[FAMILY] =  ["Sins of the Father"];
    wall_backgrounds[MAGIC] =  ["Ritual of Ragnarok"];
    wall_backgrounds[CHOICES] =  ["Timeline of Theseus"] ;
    wall_backgrounds[SOUL] = ["Know thyself."] ;
    wall_backgrounds[ANGER] = ["Dethrone Creation"] ;
    wall_backgrounds[ROYALTY] =  ["Excalibur"] ;
    wall_backgrounds[GUIDING] = ["Path To Victory"] ;
    wall_backgrounds[CRAFTING] =  ["Legendary Forge"];
    wall_backgrounds[ADDICTION] = ["Dealer's Delight"];
    wall_backgrounds[SPYING] =["Surveillance State"] ;
    wall_backgrounds[DOLLS] = ["Automatonophobia "] ;
    wall_backgrounds[OBFUSCATION] = ["Knowledge Forever Lost"] ;
    wall_backgrounds[DARKNESS] =  ["Night Eternal"] ;
    wall_backgrounds[MUSIC] =  ["Symphonic Synthesia"] ;
    wall_backgrounds[DEFENSE] =  ["Excalibur"] ;
    wall_backgrounds[QUESTING] = ["Satisfaction"] ;*/
}


const initFloorForegrounds = () => {
    floor_foregrounds[DECAY] = [{name:"Hydration Station", src: "hydration_station.png", desc: "You go to take a sip of the water before realizing it's filled with maggots."},{ src: "Decay_Object.png", desc: "I wonder if they're poisonous?"},{name:"Corpse Blossom", src: "corpse_blossom.png", desc: "It stinks of death and decay." }, {name:"Rotten Shelves", src: "webshelves.png", desc: "These shelves haven't been able to hold anything for a long time." }, {name:"Rotten Table", src: "webtable.png", desc: "What could be trapped in here, you wonder?" }, { name:"Rotten Table",src: "webtable2.png", desc: "You peer into its cracks but see nothing inside." }, { name:"Dead Bush",src: "deadbush.png", desc: "The bush is rotting." }, { name:"Dead Tree",src: "deadtree.png", desc: "What did this look like when it was alive, you wonder." }, { name:"Mushrooms",src: "decay_is_an_extant_form_of_life.png", desc: "In your heart you know decay is an extant form of life." }, {  name:"Rotten Box",src: "decayedwebbox.png", desc: "This rotten box can't be used to hold anything anymore." }, { name:"Rotten Barrel", src: "decayingbarrel.png", desc: "The barrel stinks of fermentation and rot." }, { name:"Grave", src: "grave.png", desc: "You wonder who is buried and rotting here." }, { name:"Stinking Cot", src: "shittycot.png", desc: "The cot stinks of rot." }];
    floor_foregrounds[BUGS] = [{name: "Wasp Nest", src: "waspnest2.png", desc: "There is a wasp nest here." }, { name: "Bees",src: "bees4.png", desc: "The bees are buzzing and crawling and flying everwhere." }, {name: "Swarm", src: "bees.png", desc: "The Swarm is judging you." }, {name: "Swarm", src: "bees3.png", desc: "Incessent buzzing." }, {name: "Swarm", src: "bees2.png", desc: "You skin crawls just looking at these buzzing insects." }, { name: "Wasp Nest",src: "waspnest1.png", desc: "There is a wasp nest here. It is filled with holes." }, {name: "Wasp Nest", src: "waspnest3.png", desc: "If you let the inhabitants of this waspnest love you, you could be a nest, too." }, { name: "Honey",src: "ruined_honey.png", desc: "Someone has already raided this bee hive." }, { name: "Nest",src: "ruined_wasp_nest.png", desc: "Who destroyed this wasp nest?" }, {name: "Wasp Statue", src: "wasp.png", desc: "It seems to be a large statue of a wasp." }];
    floor_foregrounds[LOVE] = [{ src: "Love_Object.png", desc: "Fragile Concept." },{name: "Wine", src: "wine2.png", desc: "If only there was someone to share this with." }, {name: "Wine", src: "wine.png", desc: "Oh to be on a picnic with someone you love." }, {name: "Necklace", src: "necklace.png", desc: "Someone beautiful could wear this." }, {name: "Gift Box", src: "jwelerybox.png", desc: "A cherished gift." }, { name: "Flowers",src: "flowers.png", desc: "A gift for a significant other." }, {name: "Dress", src: "dress.png", desc: "Just looking at this pretty dress makes you wish you could remember going to dances." }, {name: "Angel Statue", src: "angelstatue.png", desc: "Love is war." }, { name: "Stuffed Bear",src: "bear.png", desc: "It feels soft and cuddly." },];
    floor_foregrounds[STEALING] = [{ src: "Stealing_Object.png", desc: "[Right Click, Save Image]"},{ name: "Cooking Pot",src: "cookingpot.png", desc: "Reminds you of being on the run from the law." }, { name: "Treasure Chest",src: "fancychest.png", desc: "You wonder what kind of loot is in here." }, { name: "Gold Ingots",src: "goldingots.png", desc: "There is NO way you're going to be able to carry these out of here." }, { name: "Jewel Box",src: "jwelerybox.png", desc: "A tidy fortune in jewels." }, { name: "Necklace",src: "necklace.png", desc: "You wonder how much this would be worth on the blackmarket." }, {name: "Huge Gold Pile", src: "pileofgold1.png", desc: "You are practically drooling seeing so much gold." }, { name: "Pile of Gold",src: "pileofgold2.png", desc: "You want to bathe in this like Scrooge McDuck." }, { name: "Pile of Gold",src: "pileofgoldsmaller.png", desc: "What could you buy with this?" }, {name: "Small Gold Pile", src: "smallgoldpile.png", desc: "A modest fortune yours for the taking." }];
    floor_foregrounds[LANGUAGE] = [{ name: "Tablet",src: "writingtablet.png", desc: "A forgotten language is perfectly translated here for you." }, { name: "Bookshelf",src: "smallbookshelf.png", desc: "It's all your favorite childhood books." }, {name: "Obelisk", src: "obelisk.png", desc: "It's a rosetta stone for every language reading out 'Zampanio is a really good game. You should play it.'" }, { name: "Books",src: "books.png", desc: "Language is used masterfully in these volumes of poetry." }, { name: "Books",src: "books.png", desc: "Somehow each book claims you are the author." }, {name: "Bookshelf", src: "bigbookshelf.png", desc: "All of the literary classics." }, {name: "Bookshelf", src: "bigbookshelf.png", desc: "Dozens upon dozens of books in every language." }];
    floor_foregrounds[KNOWING] = [{ src: "Knowing_Object.png", desc: "I know something you don't."},{ src: "writingtablet.png", desc: "You need to know more."}, { src: "writingtablet.png", desc: "The thoughts currently in your head are perfectly etched here." }, { name: "Bookshelf",src: "smallbookshelf.png", desc: "The tomes list out the forgotten secrets of every civilization." }, {name: "Scrolls", src: "scrolls.png", desc: "Forbidden knowledge floods your mind and you can't Unknow it." }, {name: "Books", src: "books.png", desc: "Spoilers for all of fiction is somehow contained in these few volumes." }, {name: "Bookshelf", src: "books.png", desc: "The thoughts of everyone you've ever known are detailed here." }, {name: "Bookshelf", src: "bigbookshelf.png", desc: "Everything you would need to perfectly navigate this maze is listed here, if only you could remember it." }, { name: "Bookshelf",src: "bigbookshelf.png", desc: "The identity of the Eye Killer is here, long past the point where you could use it." }];
    floor_foregrounds[ROYALTY] = [{ src: "Royal_Object.png", desc: "Long Live The... The... Is dead."},{ name: "Crown Jewels",src: "jwelerybox.png", desc: "Crown jewels." }, { name: "Huge Pile of Gold",src: "pileofgold2.png", desc: "The wealth of an Empire." }, { name: "Pile of Gold",src: "pileofgold1.png", desc: "The wealth of a kingdom." }, {name: "Fancy Bed", src: "princessbed.png", desc: "A bed fit for royalty." }, {name: "Gold Pile", src: "smallgoldpile.png", desc: "The taxes you are due." }, {name: "Throne", src: "throne.png", desc: "Your rightful place." }];
    floor_foregrounds[SCIENCE] = [{ src: "Science_Object.png",name: "Huge Beaker", desc: "A beaker of perfectly generic fluid."},{name: "Science Textbooks", src: "smallbookshelf.png", desc: "Textbooks organized by scientific discipline line these shelves."}, { name: "Science Equipment",src: "science.png", desc: "Oh, the discoveries you could make with enough patience and equipment." }, { name: "Lab",src: "morewine.png", desc: "You get the distinct urge to do science seeing this well stocked lab." }, {name: "Jars", src: "jars.png", desc: "Specimen jars." }]
    floor_foregrounds[CRAFTING] = [{ src: "Crafting_Object.png", desc: "Just a little bit of tape..."},{name: "Armor", src: "armor3.png", desc: "A master made this armor, you can tell." }, {name: "Armor", src: "armor2.png", desc: "You frown as you study the flaws of this piece of armor." }, { name: "Armor",src: "armor.png", desc: "You appreciate the craftsmanship here." }, {name: "hammer", src: "hammer.png", desc: "The heft of this hammer is just perfect for forging." }, {name: "Ingots", src: "metalingots.png", desc: "Fresh ingots ripe for being turned into more useful materials." }, {name: "Pickax", src: "pickax.png", desc: "You feel the strange urge to craft some mines." }, {name: "Shovel", src: "shovel.png", desc: "You just want to turn the soil with your hands and MAKE something with it." }, {name: "Ax", src: "stumpwithax.png", desc: "You feel a distinct urge to go chop some trees." }, {name: "Well", src: "well.png", desc: "Enough water to cool a thousand forges." }];
    floor_foregrounds[BURIED] = [{ src: "Buried_Object.png", desc: "X Marks the Spot."},{ name: "Grave",src: "grave.png", desc: "You hear faint scratching from underneath." }, { name: "Grave",src: "grave.png", desc: "You could sleep under here forever buried." }, { name: "Pickax",src: "pickax.png", desc: "With this you could dig and dig and dig deep into the earth until no one could ever save you." }, { name: "Pit",src: "pit.png", desc: "The warm embrace of the earth awaits. Why must you cling so to the cold, unforgiving sky?" }, {name: "Hole", src: "pit2.png", desc: "Down and down it goes. You want to jump in." }, { name: "Inviting Well",src: "well.png", desc: "It goes so deep into the earth. You cannot see the bottom. The concept of a bottom is anathema to this well." }, {name: "Shovel", src: "shovel.png", desc: "DIG" }];
    floor_foregrounds[ANGELS] = [{ src: "Angel_Object.png", desc: "Do you hear the tintinnabulation?" },{ name: "Holy Tablet",src: "writingtablet.png", desc: "The words of your gods are written here." }, {name: "Holy Obelisk", src: "obelisk.png", desc: "It lists out the praises of the gods." }, {name: "Jars of Holy Water", src: "jars.png", desc: "Jars of holy water." }, {name: "Holy Crystal", src: "iceglacier.png", desc: "It feels holy." }, {name: "Angel Statue", src: "angelstatue.png", desc: "The angels bless you." }];
    floor_foregrounds[PLANTS] = [{ src: "Plants_Object2.png", desc: "What a terrible place to try and grow..."},{ src: "Plants_Object1.png", desc: "What a terrible place to try and grow..."},{ name: "Yellow Flowers",src: "yellowflowers.png", desc: "Weeds, but pretty ones." }, {name: "Wild Flowers", src: "wildflowers.png", desc: "These flowers grow with no human hand." }, {name: "Tall Potted Plant", src: "tallpottedplant.png", desc: "It seems healthy, though confined." }, {name: "Garden Shovel", src: "shovel.png", desc: "Did someone leave it here after planting something?" }, {name: "Pine Tree", src: "pinetree.png", desc: "You wonder how trees manage to grow inside this labyrinth." }, {name: "Gass", src: "grass.png", desc: "Surprisingly fertile soil produces this clump of grass." }, {name: "Flowers", src: "flowers.png", desc: "Beautiful flowers. Pointless flowers." }, {name: "Fern Creature", src: "fern.png", desc: "For an instant, you think this might be some sort of...creature. But no. Just a fern." }, { name: "Cactus",src: "cactus2.png", desc: "The most tsundere of plants." }, {name: "Cactus", src: "cactus.png", desc: "You don't think it can talk. You aren't sure why this disappoints you." }, {name: "Cabbages", src: "cabbages.png", desc: "These cabbages are well grown." }];
    floor_foregrounds[WEB] = [{name: "Piano", src: "webzampiano.png", desc: "Your body positions itself in front of it and begins playing a jaunty tune on it." }, { name: "Wine",src: "webwine2.png", desc: "Will you choose to give up control of your body?" }, { name: "Wine",src: "webwine.png", desc: "Spiders desperately scrabble for purchase at the surface of the liquid. Some have already drowned and sunk to the bottom of the bottle." }, {name: "Vanity", src: "webvanity.png", desc: "Your hands jerkily go through the motions of putting makeup on." }, {name: "Throne", src: "webthrone.png", desc: "Are even Ruler's immune from the pressures of society?" }, {name: "Table", src: "webtable3.png", desc: "Small bugs are trapped here." }, {name: "Table", src: "webtable2.png", desc: "You see shadows moving inside." }, {name: "Table", src: "webtable.png", desc: "What could this trap?" }, {name: "Sword", src: "websword2.png", desc: "You know for a fact if you picked this up it would control you." },{ name: "Sword",src: "websword1.png", desc: "Bad things will happen if you touch it." },{name: "Sword", src: "webswords.png", desc: "Who laid them here so carefully together?" }, { name: "Shield",src: "webshield.png", desc: "You are frozen in the certainty that if you were to pick this up, threads would bind it forever to your body." }, {name: "Shelves", src: "webshelves.png", desc: "Society puppets you into keeping things maintained." }, {name: "Scrolls", src: "webscrolls.png", desc: "What is knowlege but a means to manipulate others?" }, {name: "Pot", src: "webpot.png", desc: "It's filled with spiders." }, {name: "Organ", src: "weborgan.png", desc: "It plays a haunting melody all on its own, as gossamer threads tug on the keys." }, {name: "Books", src: "webbooks.png", desc: "If you read all these books you will be dancing to the collector tune." }, { name: "Money",src: "webmoney.png", desc: "What is money but chains?" }, { name: "Jars",src: "webjars.png", desc: "Small spiders scuttle inside, endlessly trying to climb up the smooth glass then falling down." }, {name: "Jam", src: "webjam.png", desc: "Evolution has programmed you to prefer dense caloric options." }, {name: "Fortune", src: "webfortune.png", desc: "We are all bound by fate." }, {name: "Flower", src: "webflower.png", desc: "Gifts are classic ways to manipulate others." }, {name: "Eggs", src: "webeggs.png", desc: "You can see shadows moving inside the eggs. Occasionally they twitch." }, {name: "Dragon", src: "webdragon.png", desc: "Even the most powerful among us are powerless in the face of traps and manipulation." }, { name: "Books",src: "webbooks.png", desc: "What are words but a way to control others?" }, {name: "Huge Web", src: "webbing4.png", desc: "What could possibly make such a huge web?" }, { name: "Web",src: "webbing3.png", desc: "It looks like Mr. Spider is not home." }, {name: "Web", src: "webbing.png", desc: "Tiny spiders work tirelessly to spin more of this web." }, {name: "Barrel", src: "webbarrell.png", desc: "More laughs than a barrel of spiders." }, {name: "Scarecrow", src: "scarecrow2.png", desc: "Almost invisible threads jerk and tug it in a variety of directions. It seems to be in pain." }, {name: "Scarecrow", src: "scarecrow.png", desc: "Nearly invisible threads connect to each of its joints. It isn't moving, but you aren't sure it will stay that way." }];
    floor_foregrounds[KILLING] = [{ name: "Knife",src: "knife.png", desc: "Knife goes in. Blood comes out. It's that simple." }, { name: "Violent Bed",src: "violentbed.png", desc: "A fight happened here." }, { name: "Swords",src: "webswords.png", desc: "There is clarity in killing. The why doesn't matter, only the how." }, {name: "Swords", src: "swords.png", desc: "You could kill a lot of people with these." }, {name: "Sword", src: "swordanvil.png", desc: "A weapon has only one purpose: killing." }, { name: "Ax",src: "stumpwithax.png", desc: "You feel the inexplicable urge to write 'All Work And No Play Makes Johnny A Dull Boy' over and over again." }, { name: "Pickax",src: "pickax.png", desc: "You could really do some damage to someone's skull with this." }, {name: "Chopping Block", src: "choppingblock.png", desc: "You almost wish you weren't alone in this maze, just so you could test this knife out." }, {name: "Knives", src: "boxoknives.png", desc: "You could really do some damage to someone with all these knives." }, {name: "Blood Fountain", src: "bloodfountain.png", desc: "You feel the inexplicable urge to bathe in this." }];
    floor_foregrounds[FLESH] = [{ src: "Flesh_Object2.png", desc: "It pulsates gently."},{ src: "Flesh_Object.png", desc: "The beefy arm is waving at you in between flexing."},{ name: "Skeleton",src: "skeleton1.png", desc: "You think you could make a pretty decent bone broth from this." }, {name: "Skeleton", src: "skeleton2.png", desc: "In the end we are all just meat hanging off bones." }, {name: "Ham", src: "ham.png", desc: "Meat is meat." }, {name: "Cooked Turkey", src: "turkey.png", desc: "It smells delicious. It was alive once, as you are now. You'll smell delicious, too, one day." }, {name: "Meat Slabs", src: "meatslabs.png", desc: "Meat is me." }, {name: "Meat Grinder", src: "meatgrinder.png", desc: "You slowly feed your right arm into it and watch the ribbons of flesh pour out the other end." }, {name: "meat Chops", src: "meatchops.png", desc: "They are grown from your own cells, you can feel this in your bones." }, {name: "Meat Chops", src: "meatchops.png", desc: "This doesn't look quite like pork.  Somehow, that unsettles you." }, { name: "Fsh Crate",src: "fishcrate.png", desc: "Your flesh isn't fundamentally different than the flesh of these fish." }, {name: "Cooking Pot", src: "cookingpot.png", desc: "Something savory and meaty wafts out." }, { name: "Chopping Block",src: "choppingblock.png", desc: "It's incredible what a good quality butcher's knife can do to meat." }, { name: "Butchered Meat",src: "butcheredmeat.png", desc: "In the end we are nothing more than meat." }];
    floor_foregrounds[APOCALYPSE] = [{ name: "Ruined House",src: "Apocalypse_Object.png", desc: "This doll house scale ruined building would be cute if it weren't for the smell emanating from it..."},{name: "Fossil", src: "fossil1.png", desc: "As death is a natural and inevitable part of life, extinction is the natural fate of all worlds." }, { name: "Fossil",src: "fossil2.png", desc: "There are entire species consisting solely of the dead." }, { name: "Fossil",src: "fossil3.png", desc: "For ever species we know have vanished, how many thousands extinguished without a sound? " }, {name: "Fossil", src: "fossil4.png", desc: "As Death comes to all beings, Extinction comes to all species." }, { name: "Fossil",src: "fossil5.png", desc: "How impossibly lucky is this creature, for their bones to survive epochs?" }, {name: "Fossil", src: "fossil6.png", desc: "To fear Extinction is to fear inevitability." }, { name: "Fossil",src: "fossil7.png", desc: "What entire ecosystems lived and died before you took your first breath?" }, { name: "Dangerous Knowledge",src: "science.png", desc: "Just enough knowledge to destroy it all." }, { name: "Prideful Books",src: "webooks.png", desc: "How long will the works of man outlast us?" }];
    floor_foregrounds[ENDINGS] = [{name: "Stop Sign", src: "Endings_Object_2.png", desc: "Stop. Please." },{ src: "Ending_Object.png", desc: "The End" },{ name: "Grave",src: "grave.png", desc: "The End." }, {name: "Guide Post", src: "guidepost.png", desc: "All ways lead to dead ends." }, {name: "Lamp Post", src: "lamppost.png", desc: "Why are lampopsts so often signifiers of endings?" }, {name: "Skeleton", src: "skeleton1.png", desc: "There is a serenity in knowing how the story ends." }, {name: "Skeleton", src: "skeletons.png", desc: "Did they know their ends would be so similar?" }, {name: "Skull", src: "skull.png", desc: "The path differes, but the end is always the same." }, {name: "Skull", src: "skull3.png", desc: "We all end the same." }, {name: "Books", src: "webbooks.png", desc: "All the pages are torn out save the last." }, {name: "Books", src: "webooks.png", desc: "Every book within is blank, save the last page." }, {name: "Tablet", src: "writingtablet.png", desc: "It lists out the last thought you and everyone you ever met will ever have." }];
    floor_foregrounds[DEATH] = [{ name: "Statue of Death",src: "Death_Object.png", desc: "This status of Death seems uninterested in your plight."},{ name: "Chess Set",src: "chessset.png", desc: "Do you dare cheat death?"}, {name: "Bone Pile", src: "bonepile.png", desc: "Death is the great equalizer." }, {name: "Grave", src: "grave.png", desc: "This is not your fate. But no one is beyond Death." }, { name: "Skeleton",src: "skeleton1.png", desc: "Meat is meat." }, {name: "Skeleton", src: "skeleton2.png", desc: "Memento mori." }, {name: "Skeletons", src: "skeletons.png", desc: "At least they died together." }, { name: "Skull",src: "skull.png", desc: "It was inevitable they would die." }, {name: "Skull", src: "skull3.png", desc: "Meat is meat." }, {name: "Deathbed", src: "violentbed.png", desc: "Most people die in beds." }, {name: "Hospital Bed", src: "hospitalbed.png", desc: "Someone died here." }, {name: "Grave", src: "grave.png", desc: "It simply says 'everyone' on it." }, { name: "Grave",src: "grave.png", desc: "It is yours." }, {name: "Grave", src: "grave.png", desc: "It's inscription is too worn with age to read." }, {name: "Grave", src: "grave.png", desc: "Somehow you know it has the name of your best friend." }, {name: "Grave", src: "grave.png", desc: "If you had a family, they would be listed here, you're sure of it." }, {name: "Grave", src: "grave.png", desc: "It has your name on it." }, {name: "Barrel", src: "decayingbarrel.png", desc: "Even the works of man eventually die." }, {name: "Dead Tree", src: "deadtree.png", desc: "You wonder what killed it before you remember it doesn't matter." }, {name: "Dead Bush", src: "deadbush.png", desc: "A reminder that death comes to us all." }, {name: "Corpse Blossom", src: "corpse_blossom.png", desc: "It reeks of death." }, { name: "Angel Statue",src: "angelstatue.png", desc: "In your bones you know no beautific afterlife awaits." }];
    floor_foregrounds[CLOWNS] = [{ src: "jwelerybox.png", desc: "Clown jewels."},{ src: "Clown_Object.png", desc: "Honk honk! +u+"},{ src: "toybox.png", desc: "Laughter rings out anytime you touch this box." }, { src: "jackinaboxopen.png", desc: "Sourceless laughter peels out across the room as you jump in surprise when the jack springs out." }, { src: "jackinaboxclosed.png", desc: "It's hilarious how much anxiety the anticipation of a closed jack in the box causes." }, { src: "gift.png", desc: "When you go to open it it explodes into confetti." }, { src: "balloon5.png", desc: "A sign of life." }, { src: "balloon4.png", desc: "Surely someone must have filled these within the past day or two if they're still floating, right?" }, { src: "balloon3.png", desc: "You wonder how they float." }, { src: "balloon2.png", desc: "It feels like it might pop at any moment." }, { src: "balloon1.png", desc: "How whimsical." }];
    floor_foregrounds[DOLLS] = [{ name: "Doll",src: "Dolls_Object.png", desc: "This Doll Recites:"},{name: "JR Doll", src: "jr_doll.png", desc: "There's something cathartic in having power over old JR." }, {name: "Train", src: "toytrain.png", desc: "Choo choo! Jaimie would be proud." }, {name: "Toy Soldier", src: "toysoldiersmall.png", desc: "It's okay. You'll be his friend." }, {name: "Wax Soldier", src: "toysoldierlarge.png", desc: "He seems to be made of wax. His eyes are wrong, though." }, {name: "Toys", src: "toyshelves.png", desc: "So many toys, it almost makes you wish you could be nostalgic." }, {name: "Toy Regiment", src: "toyregiment.png", desc: "Each time you look away they are a single step closer." }, { name: "Drummer Boy",src: "toydummerboy.png", desc: "Any time you look away you hear a single beat of his drum." }, {name: "Toy Box", src: "toybox.png", desc: "All sorts of fun to be had in here." }, {name: "Toy Army", src: "toyarmy.png", desc: "Oh." }, {name: "Teapot", src: "teapot.png", desc: "If only you had some toys, you could host a little teaparty." }, {name: "Dollhouse", src: "teachustheinsides.png", desc: "Screams are coming from inside." }, {name: "Snowman", src: "snowman.png", desc: "You know its heart yearns to look more human. What would it have to steal to get there." }, { name: "Scarecrow",src: "scarecrow2.png", desc: "It waits." }, {name: "Scarecrow", src: "scarecrow.png", desc: "You're suddenly certain it is just choosing not to move." }, { name: "Pretty Bed",src: "princessbed.png", desc: "And adorable bed you just want to cover with stuffed animals and dolls." }, {name: "Jack In A Box", src: "jackinaboxopen.png", desc: "You feel something touching your leg, but when you look down i's just this Jack In a Box." }, {name: "Jack In A Box", src: "jackinaboxclosed.png", desc: "You hear something moving inside." }, { name: "Hobby Horse",src: "hobbyhorse.png", desc: "Its eyes seem alive, and in pain." }, {name: "Gumball Machine", src: "gumballmachine.png", desc: "Delicious sweets." }, {name: "Dress", src: "dress.png", desc: "A dress in need of a doll." }, {name: "Dollhouse", src: "dollhouse.png", desc: "The dolls inside are all missing." }, {name: "Doll", src: "doll.png", desc: "Someone must miss her terribly." }, {name: "Doll", src: "doll.png", desc: "Scrawled on her face is 'will you be my mother?'" }, {name: "Doll", src: "doll.png", desc: "She is watching you." }, { name: "Chess",src: "chessset.png", desc: "It looks like a fun game." }, {name: "Stuffed Bear", src: "bear.png", desc: "Every time you look away it seems to be in a different pose." }, {name: "Balloon", src: "balloon1.png", desc: "There's little people inside, waving at you." }, {name: "Balloon", src: "armor.png", desc: "Did it just move when you weren't looking?" }, {name: "Balloon", src: "angelstatue.png", desc: "Her eyes seem to watch you." }];
    floor_foregrounds[TWISTING] = [{ src: "zampanio_flowerkid_by_hex2.png", desc: "How do sprite sheets work???"},{ src: "Twisting_Object.png", desc: "Hee Hee Hee Hee Hee"},{ name: "JR's Lobstersona",src: "jr_lobstersona.png", desc: "This is not JR."}, { name: "JR's Slugcatsona",src: "jr_slug.png", desc: "This is not JR." }, {name: "Not Reynolds Wrap", src: "aluminum.png", desc: "This is not JR." }, {name: "Not jadedResearcher", src: "JadedResearcher.png", desc: "This is not JR." }, {name: "Not JR Doll", src: "jr_doll.png", desc: "This is not JR." }];
    floor_foregrounds[TECHNOLOGY] =  [{name: "Laundry Machine", src: "laundry.png", desc: "Modern technology sure is convinient!"},{name: "Laptop", src: "laptop.png", desc: "The battery seems to be completely dead."},{name: "Printer", src: "printer.png", desc: "You feel the irrational urge to destroy this flawless piece of technology."}] ;
    floor_foregrounds[SERVICE] = [{name: "Hydration Station", src: "hydration_station.png", desc: "You wonder if anyone around here is thirsty..."},{name: "Cooking Pot", src: "cookingpot.png", desc: "Is it time for you to cook dinner?"},{name: "Plates", src: "plates.png", desc: "Are you supposed to clean these dishes?"},{name: "Laundry Machine", src: "laundry.png", desc: "You can't remember the last time you've done laundry."},{ src: "Service_Object.png", desc: "Ring Bell For Service."}];
    floor_foregrounds[ADDICTION] = [{name: "Old Wine", src: "webwine2.png", desc: "you really don't want to touch it."},{ name: "Old Wine",src: "webwine.png", desc: "Its a good thing this wine looks so gross."},{name: "Wine", src: "wineshelves.png", desc: "You're not tempted by these."},{name: "Beer", src: "beer.png", desc: "Probably shouldn't."},{name: "Wine", src: "morewine.png", desc: "Best not to."},{ name: "Teapot",src: "teapot.png", desc: "Caffeine is bad for you."},{ src: "Addiction_Object.png", desc: "A difficult subject."}];
    floor_foregrounds[LIGHT] = [{ name: "Lamppost",src: "lamppost.png", desc: "It spreads its light over a vast area. It makes you feel safe."},{name: "Lamp", src: "lamp.png", desc: "It's soothing and bright."},{ src: "Light_Object.png", desc: "How enlightening..."}];
    floor_foregrounds[OCEAN] =  [{ name: "Hydration Station",src: "hydrationstation3.png", desc: "Such a tiny bucket of water compared to the vast ocean..."},{ name: "Hydration Station",src: "hydrationstation2.png", desc: "The water looks so cool and refreshing..."},{name: "Hydration Station", src: "hydration_station.png", desc: "The water looks refreshing, you almost didn't realize how thirsty you were."},{name: "Crate of Fish", src: "fishcrate.png", desc: "Fish freshly caught from the ocean."},{name: "Salt Pork Barrel", src: "barrel.png", desc: "Filled with salt pork for a long sea journey."},{ src: "Ocean_Object_2.png", desc: "Why is the Baltic Sea Anomaly an Ocean Object? Don't ask me..."},{name: "Fish", src: "Ocean_Object_1.png", desc: "The fish gasps for breath."}];
    floor_foregrounds[LONELY] = [{name: "Lonely figure", src: "lonely_figure.png", desc: "Alone..." }];

    //JR NOTE: from here down are just ghoul objects, need to go back and add things from sprite sheets as well
    floor_foregrounds[FREEDOM] =  [{ src: "Freedom_Object.png", desc: "Have you seen the freedom object? It seems to have gotten out..." }];
    floor_foregrounds[FIRE] =  [{ src: "Fire_Object.png", desc: "Hmm Interesting..."}];
    floor_foregrounds[OCEAN] =  [{ src: "Ocean_Object_2.png", desc: "Why is the Baltic Sea Anomaly an Ocean Object? Don't ask me..."},{ src: "Ocean_Object_1.png", desc: "The fish gasps for breath."}];
    floor_foregrounds[MATH] =  [{ src: "Math_Object.png", desc: "Don't you hate it when the beads break? Makes math so much harder." }];
    floor_foregrounds[FAMILY] = [{ src: "Family_Object.png", desc: "Family Tree Pruned."}];
    floor_foregrounds[MAGIC] = [{ src: "Magic_Object.png", desc: "Look Inward."}];
    floor_foregrounds[CHOICES] = [{ src: "Choice_Object.png", desc: "Signs like this tend to be more useful when labeled..."}];
    floor_foregrounds[ZAP] = [{ src: "zap_object.png", desc: "zap pow kaboom", name:"Zap Object"}];
    floor_foregrounds[SOUL] = [{ src: "Spirit_Object2.png", desc: "TEAM SPIRIT LETS GO!"},{ src: "Spirit_Object.png", desc: "The wandering dead..."}] ;
    floor_foregrounds[ANGER] = [{ src: "Anger_Object.png", desc: "Seems to have been pushed into the floor pretty hard..."}];
    floor_foregrounds[GUIDING] = [{ src: "Guiding_Object.png", desc: "Do you ever wish somebody else would point the way for you?"}];
    floor_foregrounds[HEALING] = [{ src: "Healing_Object.png", desc: "It's important to know what your innards are doing."}];
    floor_foregrounds[SPYING] = [{ src: "eye13.png", desc: "IT LOOKS."},{ src: "eye12.png", desc: "IT TREMBLES."},{ src: "eye11.png", desc: "IT GAZES."},{ src: "eye10.png", desc: "IT FOCUSES."},{ src: "eye9.png", desc: "IT WAITS."},{ src: "eye8.png", desc: "IT WATCHES."},{ src: "eye7.png", desc: "IT GLISTENS."},{ src: "eye6.png", desc: "IT SEES."},{ src: "eye5.png", desc: "IT CANNOT BLINK."},{ src: "eye4.png", desc: "IT CRIES."},{ src: "eye3.png", desc: "IT SEES."},{ src: "eye2.png", desc: "IT STARES."},{ src: "eye1.png", desc: "IT WEEPS."}];
    //note to future jr doing two at once is p sustainable
    /*
    floor_foregrounds[MATH] =  ["blackboard.png"];
    floor_foregrounds[SPACE] = ["stars.png","clouds.png"];
    floor_foregrounds[HEALING] =  ["tilewall.png"];
    floor_foregrounds[TECHNOLOGY] =  ["metalwall1.png","metalwall2.png","metalwall3.png"] ;
    floor_foregrounds[HUNTING] = ["leafwalls.png","hedgewall.png","pinetrees.png"];
    floor_foregrounds[GUIDING] = ["pinetrees.png"] ;
    floor_foregrounds[ART] =  ["Perfect Moment"];
    floor_foregrounds[TIME] =  ["Stopped Clock"];
    floor_foregrounds[SPYING] =["Surveillance State"] ;
    floor_foregrounds[OBFUSCATION] = ["Knowledge Forever Lost"] ;
    floor_foregrounds[DARKNESS] =  ["Night Eternal"] ;
    floor_foregrounds[MUSIC] =  ["Symphonic Synthesia"] ;
    floor_foregrounds[DEFENSE] =  ["Excalibur"] ;
    floor_foregrounds[QUESTING] = ["Satisfaction"] ;*/
}

//don't bother filling out descs for these yet
const initFloorBackgrounds = () => {
    floor_backgrounds[DECAY] = [{ src: "darkhole.png", desc: "TODO" }];
    floor_backgrounds[BUGS] = [{ src: "bees.png", desc: "TODO" }, { src: "bees2.png", desc: "TODO" }, { src: "bees3.png", desc: "TODO" }, { src: "bees4.png", desc: "TODO" }];
    floor_backgrounds[WEB] = [{ src: "webbing5.png", desc: "TODO" }, { src: "webbing4.png", desc: "TODO" }, { src: "webbing4.png", desc: "TODO" }, { src: "webbing4.png", desc: "TODO" }, { src: "webbing4.png", desc: "TODO" }, { src: "webbing3.png", desc: "TODO" }, { src: "webbing3.png", desc: "TODO" }, { src: "webbing3.png", desc: "TODO" }, { src: "webbing3.png", desc: "TODO" }, { src: "webbing3.png", desc: "TODO" }, { src: "webbing3.png", desc: "TODO" }, { src: "webbing.png", desc: "TODO" }];
    //i think my favorite part of all this being bg is this means the wanderer will never comment on it. nothing noteworthy about it, really
    floor_backgrounds[KILLING] = [{ src: "blood1.png", desc: "TODO" }, { src: "blood2.png", desc: "TODO" }, { src: "blood3.png", desc: "TODO" }, { src: "blood4.png", desc: "TODO" }, { src: "bloodpuddle.png", desc: "TODO" }];
    floor_backgrounds[TWISTING] = [{ src: "Minotaur2.png", desc: "TODO" }, { src: "NotMinotaur.png", desc: "TODO" }];

    /*
    floor_backgrounds[LOVE] = ["stonewalls.png","roses.png"];
    floor_backgrounds[BUGS] =  ["dirtwall.png","darkcorruption.png"];
    floor_backgrounds[ENDINGS] =  ["curtains.png"] ;
    floor_backgrounds[LANGUAGE] = ["books.png"];
    floor_backgrounds[KNOWING] = ["blackboard.png","books.png"];;
    floor_backgrounds[STEALING] =  ["jail.png","goldwalls.png"];
    floor_backgrounds[MATH] =  ["blackboard.png"];
    floor_backgrounds[BURIED] =  ["dirtwall.png"];
    floor_backgrounds[SPACE] = ["stars.png","clouds.png"];
    floor_backgrounds[OCEAN] =  ["waterwall.png"];
    floor_backgrounds[CLOWNS] =["curtains.png"] ;
    floor_backgrounds[WEB] =  ["web.png"] ;
    floor_backgrounds[HEALING] =  ["tilewall.png"];
    floor_backgrounds[FREEDOM] =  ["clouds.png"];
    floor_backgrounds[FIRE] =  ["lavawall.png"];
    floor_backgrounds[LIGHT] =  ["lightwall.png"];
    floor_backgrounds[ZAP] = ["metalwall1.png","metalwall2.png","metalwall3.png"] ;
    floor_backgrounds[TECHNOLOGY] =  ["metalwall1.png","metalwall2.png","metalwall3.png"] ;
    floor_backgrounds[SCIENCE] = ["metalwall1.png","metalwall2.png","metalwall3.png"]
    floor_backgrounds[PLANTS] = ["leafwalls.png","hedgewall.png","pinetrees.png"];
    floor_backgrounds[HUNTING] = ["leafwalls.png","hedgewall.png","pinetrees.png"];
    floor_backgrounds[GUIDING] = ["pinetrees.png"] ;
    floor_backgrounds[ART] =  ["Perfect Moment"];
    floor_backgrounds[TIME] =  ["Stopped Clock"];


    floor_backgrounds[FLESH] =  ["Physical God"];
    floor_backgrounds[DEATH] =  ["Your Grave"];
    floor_backgrounds[APOCALYPSE] =  ["Ragnarok"];
    floor_backgrounds[ANGELS] =  ["Judgement Day"];
    floor_backgrounds[SERVICE] =  ["Special Service"];
    floor_backgrounds[FAMILY] =  ["Sins of the Father"];
    floor_backgrounds[MAGIC] =  ["Ritual of Ragnarok"];
    floor_backgrounds[CHOICES] =  ["Timeline of Theseus"] ;
    floor_backgrounds[SOUL] = ["Know thyself."] ;
    floor_backgrounds[ANGER] = ["Dethrone Creation"] ;
    floor_backgrounds[ROYALTY] =  ["Excalibur"] ;
    floor_backgrounds[GUIDING] = ["Path To Victory"] ;
    floor_backgrounds[CRAFTING] =  ["Legendary Forge"];
    floor_backgrounds[ADDICTION] = ["Dealer's Delight"];
    floor_backgrounds[SPYING] =["Surveillance State"] ;
    floor_backgrounds[DOLLS] = ["Automatonophobia "] ;
    floor_backgrounds[OBFUSCATION] = ["Knowledge Forever Lost"] ;
    floor_backgrounds[DARKNESS] =  ["Night Eternal"] ;
    floor_backgrounds[MUSIC] =  ["Symphonic Synthesia"] ;
    floor_backgrounds[DEFENSE] =  ["Excalibur"] ;
    floor_backgrounds[QUESTING] = ["Satisfaction"] ;*/
}


const initWallPossibilities = () => {
    wall_possibilities[LOVE] = ["stonewalls.png", "roses.png"];
    wall_possibilities[DECAY] = ["tattered_curtains.png", "stonewalls2.png", "thatchwalls.png"];
    wall_possibilities[BUGS] = ["dirtwall.png", "darkcorruption.png"];
    wall_possibilities[TWISTING] = ["yellowwallpaper.jpg", "spiral.png"];
    wall_possibilities[ENDINGS] = ["curtains.png"];
    wall_possibilities[LANGUAGE] = ["books.png"];
    wall_possibilities[KNOWING] = ["blackboard.png", "books.png"];;
    wall_possibilities[STEALING] = ["jail.png", "goldwalls.png"];
    wall_possibilities[MATH] = ["blackboard.png"];
    wall_possibilities[BURIED] = ["dirtwall.png"];
    wall_possibilities[SPACE] = ["stars.png", "clouds.png"];
    wall_possibilities[OCEAN] = ["waterwall.png"];
    wall_possibilities[CLOWNS] = ["curtains.png"];
    wall_possibilities[WEB] = ["web.png"];
    wall_possibilities[HEALING] = ["tilewall.png"];
    wall_possibilities[FREEDOM] = ["clouds.png"];
    wall_possibilities[FIRE] = ["lavawall.png"];
    wall_possibilities[LIGHT] = ["lightwall.png"];
    wall_possibilities[ZAP] = ["metalwall1.png", "metalwall2.png", "metalwall3.png"];
    wall_possibilities[TECHNOLOGY] = ["metalwall1.png", "metalwall2.png", "metalwall3.png"];
    wall_possibilities[SCIENCE] = ["metalwall1.png", "metalwall2.png", "metalwall3.png"]
    wall_possibilities[PLANTS] = ["leafwalls.png", "hedgewall.png", "pinetrees.png"];
    wall_possibilities[HUNTING] = ["leafwalls.png", "hedgewall.png", "pinetrees.png"];
    wall_possibilities[GUIDING] = ["snowyforest.png", "pinetrees.png"];
    wall_possibilities[FLESH] = ["flesh.png", "flesh2.png"];
    wall_possibilities[KILLING] = ["bloodywall.png"];
    wall_possibilities[LONELY] = ["snowyforest.png"];
    wall_possibilities[CLOWNS] = ["circus.png"];


    //todo


    /*wall_possibilities[ART] =  ["Perfect Moment"];
    wall_possibilities[TIME] =  ["Stopped Clock"];


    wall_possibilities[DEATH] =  ["Your Grave"];
    wall_possibilities[APOCALYPSE] =  ["Ragnarok"];
    wall_possibilities[ANGELS] =  ["Judgement Day"];
    wall_possibilities[SERVICE] =  ["Special Service"];
    wall_possibilities[FAMILY] =  ["Sins of the Father"];
    wall_possibilities[MAGIC] =  ["Ritual of Ragnarok"];
    wall_possibilities[CHOICES] =  ["Timeline of Theseus"] ;
    wall_possibilities[SOUL] = ["Know thyself."] ;
    wall_possibilities[ANGER] = ["Dethrone Creation"] ;
    wall_possibilities[ROYALTY] =  ["Excalibur"] ;
    wall_possibilities[GUIDING] = ["Path To Victory"] ;
    wall_possibilities[CRAFTING] =  ["Legendary Forge"];
    wall_possibilities[ADDICTION] = ["Dealer's Delight"];
    wall_possibilities[SPYING] =["Surveillance State"] ;
    wall_possibilities[DOLLS] = ["Automatonophobia "] ;
    wall_possibilities[OBFUSCATION] = ["Knowledge Forever Lost"] ;
    wall_possibilities[DARKNESS] =  ["Night Eternal"] ;
    wall_possibilities[MUSIC] =  ["Symphonic Synthesia"] ;
    wall_possibilities[DEFENSE] =  ["Excalibur"] ;
    wall_possibilities[QUESTING] = ["Satisfaction"] ;*/
}

const initSuperNames = () => {
    super_name_possibilities_map[ART] = ["Perfect Moment"];
    super_name_possibilities_map[TECHNOLOGY] = ["Singularity"];
    super_name_possibilities_map[TIME] = ["Stopped Clock"];
    super_name_possibilities_map[SPACE] = ["Big Bang"];
    super_name_possibilities_map[OCEAN] = ["Ship of Vescillation"];
    super_name_possibilities_map[LONELY] = ["The Silence"];
    super_name_possibilities_map[FIRE] = ["The Scoured Earth"];
    super_name_possibilities_map[FREEDOM] = ["Unending Freedom"];
    super_name_possibilities_map[STEALING] = ["All Mine"];
    super_name_possibilities_map[BURIED] = ["Fallen Sky"];
    super_name_possibilities_map[FLESH] = ["Physical God"];
    super_name_possibilities_map[SCIENCE] = ["E=mc^2"];
    super_name_possibilities_map[MATH] = ["Calculus Pop Quiz"];
    super_name_possibilities_map[TWISTING] = ["This Is Not A Game"];
    super_name_possibilities_map[DEATH] = ["Your Grave"];
    super_name_possibilities_map[APOCALYPSE] = ["Ragnarok"];
    super_name_possibilities_map[ANGELS] = ["Judgement Day"];
    super_name_possibilities_map[SERVICE] = ["Special Service"];
    super_name_possibilities_map[FAMILY] = ["Sins of the Father"];
    super_name_possibilities_map[MAGIC] = ["Ritual of Ragnarok"];
    super_name_possibilities_map[LIGHT] = ["Flash Bang"];
    super_name_possibilities_map[HEALING] = ["Summon Phoenix"];
    super_name_possibilities_map[PLANTS] = ["Forest's March"];
    super_name_possibilities_map[HUNTING] = ["Nimrod's Chase"];
    super_name_possibilities_map[DECAY] = ["Mass Grave"];
    super_name_possibilities_map[CHOICES] = ["Timeline of Theseus"];
    super_name_possibilities_map[ZAP] = ["Thor's Banana"];
    super_name_possibilities_map[LOVE] = ["Mandatory Shipping Grid"];
    super_name_possibilities_map[SOUL] = ["Know thyself."];
    super_name_possibilities_map[ANGER] = ["Dethrone Creation"];
    super_name_possibilities_map[WEB] = ["Puppet Master"];
    super_name_possibilities_map[ROYALTY] = ["Excalibur"];
    super_name_possibilities_map[ENDINGS] = ["The End"];
    super_name_possibilities_map[KNOWING] = ["Omniscience"];
    super_name_possibilities_map[GUIDING] = ["Path To Victory"];
    super_name_possibilities_map[CRAFTING] = ["Legendary Forge"];
    super_name_possibilities_map[LANGUAGE] = ["Topple the Tower"];
    super_name_possibilities_map[BUGS] = ["Hivemother"];
    super_name_possibilities_map[ADDICTION] = ["Dealer's Delight"];
    super_name_possibilities_map[SPYING] = ["Surveillance State"];
    super_name_possibilities_map[CLOWNS] = ["Ringmaster"];
    super_name_possibilities_map[DOLLS] = ["Automatonophobia "];
    super_name_possibilities_map[OBFUSCATION] = ["Knowledge Forever Lost"];
    super_name_possibilities_map[CENSORSHIP] = ["Knowledge Forever Lost"];

    super_name_possibilities_map[DARKNESS] = ["Night Eternal"];
    super_name_possibilities_map[KILLING] = ["Bloodbath"];
    super_name_possibilities_map[MUSIC] = ["Symphonic Synthesia"];
    super_name_possibilities_map[DEFENSE] = ["Excalibur"];
    super_name_possibilities_map[QUESTING] = ["Satisfaction"];
}

const initLocations = () => {
    location_possibilities[ART] = ["museum", "studio", "craft shop", "workshop"];
    location_possibilities[TECHNOLOGY] = ["server farm", "office", "isp"];
    location_possibilities[TIME] = ["clock-tower", "factory", "dateline", "train-station"];
    location_possibilities[SPACE] = ["planet", "rocket", "elevator", "mountain", "tower", "sun", "stairs"];
    location_possibilities[STEALING] = ["market", "jail", "mansion"];
    location_possibilities[FREEDOM] = ["field", "caravan", "market"];
    location_possibilities[FIRE] = ["bonfire", "ashlands", "burning building", "volcano", "kiln", "bbq", "forge"];
    location_possibilities[LONELY] = ["moors", "mansion", "school"];
    location_possibilities[OCEAN] = ["dockyard", "lighthouse", "shipyard", "ship"];
    location_possibilities[FLESH] = ["abattoir", "butcher", "slaughterhouse", "gym"];
    location_possibilities[BURIED] = ["graveyard", "mine", "cave", "tunnel"];
    location_possibilities[SCIENCE] = ["labratory", "classroom", "facility", "lab"];
    location_possibilities[MATH] = ["classroom", "school", "university", "factory"];
    location_possibilities[TWISTING] = ["labyrinth", "maze", "corridors", "backrooms", "asylum"];
    location_possibilities[DEATH] = ["necropolis", "graveyard", "cemetary", "boneyard", "funeral home", "ossuary", "columbaria", "mausoleum", "catacomb", "memorial"];
    location_possibilities[APOCALYPSE] = ["landscape of thorns", "wasteland", "spike field", "menacing earthworks", "not a place of honor"];
    location_possibilities[ANGELS] = ["church", "grotto", "temple", "monastery"];
    location_possibilities[SERVICE] = ["mansion", "manor", "main-house"];
    location_possibilities[FAMILY] = ["home", "hearth", "homestead"];
    location_possibilities[MAGIC] = ["mountain", "school", "tower", "hut"];
    location_possibilities[LIGHT] = ["mountain", "field", "cloud"];
    location_possibilities[HEALING] = ["hospital", "field-hospital", "doctors office"];
    location_possibilities[PLANTS] = ["forest", "meadow", "jungle"];
    location_possibilities[HUNTING] = ["forest", "meadow", "jungle"];
    location_possibilities[DECAY] = ["swamp", "graveyard", "wasteland"];
    location_possibilities[CHOICES] = ["forking-path"];
    location_possibilities[ZAP] = ["field", "cloud", "generator"];
    location_possibilities[LOVE] = ["restaurant", "scenic cliff", "windswept moor"];
    location_possibilities[SOUL] = ["hall of mirrors"];
    location_possibilities[ANGER] = ["battlefield", "bull-pen"];
    location_possibilities[WEB] = ["cave", "theatre", "prison"];
    location_possibilities[ROYALTY] = ["castle", "mansion", "courthouse"];
    location_possibilities[ENDINGS] = ["theatre", "graveyard", "abandoned building"];
    location_possibilities[KNOWING] = ["library", "school", "monastery"];
    location_possibilities[GUIDING] = ["path", "wilderness"];
    location_possibilities[CRAFTING] = ["smithy", "forge", "mill", "mine", "logging camp"];
    location_possibilities[LANGUAGE] = ["library", "printer", "bookshop"];
    location_possibilities[BUGS] = ["hive", "nest"];
    location_possibilities[ADDICTION] = ["casino", "back alley"];
    location_possibilities[SPYING] = ["tavern", "pub", "bar"];
    location_possibilities[CLOWNS] = ["circus", "tent", "carnival"];
    location_possibilities[DOLLS] = ["teahouse", "shop", "toystore"];
    location_possibilities[OBFUSCATION] = ["burning building", "tavern", "park"];
    location_possibilities[CENSORSHIP] = ["burning building", "tavern", "park"];

    location_possibilities[DARKNESS] = ["basement", "attic", "darkroom"];
    location_possibilities[KILLING] = ["battlefield", "slaughterhouse", "butchers", "abattoir"];
    location_possibilities[MUSIC] = ["theatre", "concert hall", "pub"];
    location_possibilities[DEFENSE] = ["fortress", "battlements", "fort"];
    location_possibilities[QUESTING] = ["tavern", "pub", "bar"];
}

const initObjects = () => {
    object_possibilities[ART] = ["chisel", "paint brush", "paint pot", "sponge", "apron", "canvas"];
    object_possibilities[TECHNOLOGY] = ["computer", "lap-top", "phone", "tablet"];
    object_possibilities[SPACE] = ["toy rocket", "globe", "rope", "stardust", "compass", "sextant"];
    object_possibilities[TIME] = ["hourglass", "watch", "sundial", "clock", "gear", "chronometer", "stopwatch", "metronome"];
    object_possibilities[STEALING] = ["lockpick", "shiv", "mask", "blackjack"];
    object_possibilities[FREEDOM] = ["feather", "lockpick", "bird", "permit"];
    object_possibilities[FIRE] = ["match", "lighter", "charcoal", "kindling"];
    object_possibilities[LONELY] = ["diary", "locket", "solitaire deck"];
    object_possibilities[OCEAN] = ["anchor", "ship in a bottle", "captains hat", "raincoat"];
    object_possibilities[FLESH] = ["meat slab", "butcher knife", "bone", "flesh cube", "meat", "sirloin", "ribeye", "steak", "beef", "guts", "intestines", "blood"];
    object_possibilities[BURIED] = ["shovel", "pickax", "minecart", "coffin", "dirt", "mudball", "cave map"];
    object_possibilities[SCIENCE] = ["test tube", "beaker", "lab coat", "microscope"];
    object_possibilities[MATH] = ["calculator", "ruler", "graph paper", "pencil", "compass", "caliper"];
    object_possibilities[TWISTING] = ["clay", "door", "puzzlebox", "fractal pendant", "spiral pendant"];
    object_possibilities[DEATH] = ["skull", "bones", "ossuary", "memento mori", "death note"];
    object_possibilities[APOCALYPSE] = ["nuke", "grey goo", "vial of plague", "skynet", "meteor"];
    object_possibilities[ANGELS] = ["feather", "halo", "scripture"];
    object_possibilities[SERVICE] = ["feather duster", "mop", "broom"];
    object_possibilities[FAMILY] = ["cradle", "rattle", "photo album"];
    object_possibilities[MAGIC] = ["scoll", "potion", "wand", "staff"];
    object_possibilities[LIGHT] = ["lantern", "flashlight", "torch"];
    object_possibilities[HEALING] = ["potion", "bandage", "scalpel"];
    object_possibilities[PLANTS] = ["seed", "sapling", "shovel", "pot", "fertilizer"];
    object_possibilities[HUNTING] = ["pelt", "leather", "gun"];
    object_possibilities[DECAY] = ["cadavar", "gravestone", "rotten food"];
    object_possibilities[CHOICES] = ["todo list", "coin", "adventure book"];
    object_possibilities[ZAP] = ["battery", "lichtenberg figure", "glass", "capaciter"];
    object_possibilities[LOVE] = ["heart", "chocolate", "ring"];
    object_possibilities[SOUL] = ["gem", "mirror", "crystal"];
    object_possibilities[ANGER] = ["matador costume", "red flag", "glove"];
    object_possibilities[WEB] = ["silk", "puppet", "cobweb", "spider"];
    object_possibilities[ROYALTY] = ["crown", "throne", "sceptre"];
    object_possibilities[ENDINGS] = ["curtain", "gravestone", "stop sign"];
    object_possibilities[KNOWING] = ["book", "camera", "datum", "scroll", "tome"];
    object_possibilities[GUIDING] = ["map", "walking stick", "compass", "sextant"];
    object_possibilities[CRAFTING] = ["anvil", "hammer", "ax", "chisel"];
    object_possibilities[LANGUAGE] = ["dictionary", "translator", "thesaurus", "pen", "paper", "book"];
    object_possibilities[BUGS] = ["hive", "pupa", "nest", "egg sack"];
    object_possibilities[ADDICTION] = ["syringe", "vial", "dice", "cigarette", "lighter", "joint"];
    object_possibilities[SPYING] = ["spyglass", "camera", "disguise"];
    object_possibilities[CLOWNS] = ["clown wig", "bicycle horn", "facepaint", "balloon animal", "large pants", "circus tent", "unicycle", "ringmasters jacket"];
    object_possibilities[DOLLS] = ["doll", "mannequin", "statuette"];
    object_possibilities[OBFUSCATION] = ["white-out", "sharpie", "censor bar"];
    object_possibilities[CENSORSHIP] = ["white-out", "sharpie", "censor bar"];

    object_possibilities[DARKNESS] = ["sunglasses", "blinds", "blindfold", "darklight"];
    object_possibilities[KILLING] = ["knife", "machete", "gun", "blood", "bloody bandages", "bayonette"];
    object_possibilities[MUSIC] = ["flute", "guitar", "drum", "piano"];
    object_possibilities[DEFENSE] = ["shield", "armor", "helmet"];
    object_possibilities[QUESTING] = ["map", "rations", "notes"];
    object_possibilities[WASTE] = ["javascript console", "debugging console", "inspect element console"];

}



    //complete:TIME, SPACE, ART, TECHNOLOGY, angels, hunting, service, family, knowing, endings, language, defense, waste, apocalypse

    // const keys = [NULL, FLESH, BURIED, STEALING, FREEDOM, FIRE,LONELY, OCEAN,SCIENCE,MATH,TWISTING,DEATH,APOCALYPSE, WASTE,SERVICE,FAMILY,MAGIC,ANGELS, LIGHT,HUNTING,CLOWNS,PLANTS,DECAY,CHOICES,ZAP,LOVE,SOUL,ANGER,WEB,ROYALTY,ENDINGS,KNOWING,GUIDING,CRAFTING,ADDICTION,SPYING,HEALING,DOLLS,OBFUSCATION,DARKNESS,KILLING,MUSIC,DEFENSE,QUESTING,BUGS,LANGUAGE];
    /*   memories[ANGELS] =  [
new Memory("question","yes response","no response","yes comment","no comment")
,new Memory("question","yes response","no response","yes comment","no comment")
,new Memory("question","yes response","no response","yes comment","no comment")
];
*/



const createOpinion = (baseline = 0, specificOpinions) => {
    const ret = {
        SPYING: baseline,
        LONELY: baseline,
        ART: baseline,
        TECHNOLOGY: baseline,
        SPACE: baseline,
        TIME: baseline,
        STEALING: baseline,
        FREEDOM: baseline,
        FIRE: baseline,
        OCEAN: baseline,
        FLESH: baseline,
        BURIED: baseline,
        SCIENCE: baseline,
        MATH: baseline,
        TWISTING: baseline,
        DEATH: baseline,
        APOCALYPSE: baseline,
        ANGELS: baseline,
        LIGHT: baseline,
        SERVICE: baseline,
        FAMILY: baseline,
        MAGIC: baseline,
        HEALING: baseline,
        PLANTS: baseline,
        HUNTING: baseline,
        DECAY: baseline,
        CHOICES: baseline,
        ZAP: baseline,
        LOVE: baseline,
        SOUL: baseline,
        ANGER: baseline,
        WEB: baseline,
        ROYALTY: baseline,
        ENDINGS: baseline,
        KNOWING: baseline,
        GUIDING: baseline,
        CRAFTING: baseline,
        LANGUAGE: baseline,
        BUGS: baseline,
        ADDICTION: baseline,
        CLOWNS: baseline,
        DOLLS: baseline,
        OBFUSCATION: baseline,
        CENSORSHIP: baseline,

        DARKNESS: baseline,
        KILLING: baseline,
        MUSIC: baseline,
        DEFENSE: baseline,
        QUESTING: baseline
    };
    for(let key of Object.keys(specificOpinions)){
        ret[key] = specificOpinions[key];
    }

    return ret;
}



//can be used for walk about but also really for anything i want going forwards. 
//procedural opinions are v useful
const initThemeOpinions = () => {
    //free press plz (spying is the most pure incarnation of quotidians so i went with their morals)
    theme_opinions[SPYING] = createOpinion(113, { WEB: -113, APOCALYPSE:-113, TWISTING: -113});
    //things are alright, i guess
    theme_opinions[LONELY] = createOpinion(0, {LONELY: 20,LOVE: -113, SERVICE: -113, FAMILY: -113, FREEDOM:20, SPACE: 20, OCEAN:20 });
    //all is art
    theme_opinions[ART] = createOpinion(55, { });
    //technology and science have some pretty strong opinions on a narrow range of topics
    theme_opinions[TECHNOLOGY] = createOpinion(0, {CRAFTING: 113,TECHNOLOGY: 113,SPACE: 113,TIME:113,SCIENCE:113,ZAP:113,FLESH:-113});
    theme_opinions[SCIENCE] = createOpinion(0, {QUESTING: 55,BUGS: 113,OBFUSCATION: -113,KNOWING: 113,PLANTS: 113,MAGIC: -113,MATH: 113,TECHNOLOGY: 113,SPACE: 113,TIME:113,SCIENCE:113,ZAP:113 });
    //nothing really matters much to the vastness of space
    theme_opinions[SPACE] = createOpinion(0, {BURIED: -1,DARKNESS: 1,SPACE: 1,LONELY:1 });
    theme_opinions[TIME] = createOpinion(0, {TIME: 50,ENDINGS: 10, DECAY: 10,FREEDOM: -50,MATH: 10,APOCALYPSE:10,FAMILY: 10 });
    theme_opinions[STEALING] = createOpinion(-10, {ART: 50,SPYING: -113,ROYALTY: 50,STEALING: 113,FREEDOM:10,HUNTING:-30 });
    theme_opinions[FREEDOM] = createOpinion(0, {BURIED: -113, QUESTING: -30, ADDICTION: -113, GUIDING: -50, ROYALTY: -85, WEB: -113, LOVE: -50,CHOICES: 113, HUNTING: -50, FAMILY: -113, SERVICE: -113, ANGELS: 33, TWISTING:10, ART: 50, FREEDOM: 113,SPACE: 100 });
    //everything should be fire when you get right down to it
    theme_opinions[FIRE] = createOpinion(-1000, {KILLING: 20, APOCALYPSE: 10,DEATH: 10,DECAY: 10, ENDINGS: 20, FIRE: 1000, });
    theme_opinions[OCEAN] = createOpinion(10, {TECHNOLOGY: -113,LONELY: 113, DARKNESS: 113,TIME: 30, SPACE: 30, SOUL: 30,OCEAN: 113, MAGIC: 30, PLANTS: 30 });
    theme_opinions[FLESH] = createOpinion(0, {FLESH: 113,KILLING: 13, SOUL: -113, ZAP: -13, DECAY: -13, DEATH: -50, TECHNOLOGY: -113, SCIENCE: -113, FIRE: -113, TWISTING: 13 });
    theme_opinions[BURIED] = createOpinion(0, {BURIED: 113, DARKNESS: 50, ADDICTION: 50, ENDINGS: 10, WEB: 50, PLANTS: 10,DEATH: 50, SPYING: -50, SPACE: -50, FREEDOM: -50 });
    //now we know why faq writer is such a positive person
    theme_opinions[MATH] = createOpinion(85, {MUSIC: 113,OBFUSCATION: 13,KNOWING: 113, WEB: 100, SOUL: -13, MAGIC: -13, TWISTING: 113, TIME: 113, SPACE: 113, SCIENCE: 113, TECHNOLOGY: 113, MATH: 113 });
    //:) :) :) Everything would be in its blind volumes. ... Everything: but for every sensible line or accurate fact there would be millions of meaningless cacophonies, verbal farragoes, and babblings.
    theme_opinions[TWISTING] = createOpinion(1000, { });
    theme_opinions[KNOWING] = createOpinion(113, {TWISTING: -113, OBFUSCATION: -113, DARKNESS: -113 });
    //nothing matters in the face of inevitability
    theme_opinions[DEATH] = createOpinion(0, { });
    //definitely a fan of things humans can use to just fuck their shit right up
    theme_opinions[APOCALYPSE] = createOpinion(0, {APOCALYPSE:113,TECHNOLOGY:113,SCIENCE:113,ENDINGS:113 });
    theme_opinions[ANGELS] = createOpinion(-10, {HEALING: 113,LOVE: 20, STEALING: -50, QUESTING: 113,MUSIC: 55,SOUL: 113,FAMILY: 55,ANGELS: 113,SERVICE: 113,LIGHT: 55,APOCALYPSE:-113,LONELY: -55,FREEDOM:-55,FLESH:-55,GUIDING: 55 });
    theme_opinions[LIGHT] = createOpinion(10, {QUESTING: 20,DARKNESS: -113,OBFUSCATION: -55,SOUL: 45,ZAP: 75,HEALING: 20,MAGIC: 55,BURIED: -50, SCIENCE: 55,TECHNOLOGY: 55, ART: 30,FIRE: 20 });
    theme_opinions[SERVICE] = createOpinion(0, {DEFENSE: 113, QUESTING: 113, GUIDING: 113, ROYALTY: 113,WEB: 85,LOVE: 20, CHOICES: -30, PLANTS: 85, HEALING: 113,FAMILY: 113, SERVICE: 113,APOCALYPSE: -30,TWISTING: -85, FREEDOM: -113, STEALING: -20, LONELY: -20,SPYING: 20 });
    theme_opinions[FAMILY] = createOpinion(10, {DEFENSE: 113,DOLLS: 55,SOUL: 55,LOVE: 113,LONELY:-113,FREEDOM: -113,FLESH: 113,DEATH:-113,SERVICE: 113 });
    theme_opinions[MAGIC] = createOpinion(0, {QUESTING: 55,DARKNESS: 113,LANGUAGE: 55,SOUL: 55,ZAP: 113,PLANTS: 113,HEALING: 113,LIGHT: 113,KNOWING: 55,TWISTING: 55,BURIED: 113,OCEAN: 113, FIRE: 113,SPYING: 55,MAGIC: 113 });
    theme_opinions[HEALING] = createOpinion(0, {QUESTING: -55,DEFENSE: 55,KILLING: -113,ENDINGS: -113,DECAY: -113,HUNTING: -55,MAGIC: 113,SERVICE:55,ANGELS: 113,HEALING: 113,LONELY:-55,TECHNOLOGY:113,SCIENCE: 113,FLESH:113,KNOWING:55,DEATH:-113, APOCALYPSE:-113 });
    theme_opinions[PLANTS] = createOpinion(0, {BUGS: -113,APOCALYSE: -113,TWISTING: -113,PLANTS:113,LONELY:55, TECHNOLOGY:-113,SCIENCE:-55,FREEDOM: 113,FIRE:-113 });
    theme_opinions[HUNTING] = createOpinion(0, {GUIDING: -55,QUESTING: 55,DARKNESS: 55, KILLING: 113,HUNTING: 113,SPYING:113,LONELY:55,FLESH: 113, DEATH: 113});
    //all should rot away and we should be one together. doesnt enjoy being killed with fire
    theme_opinions[DECAY] = createOpinion(-55, {DECAY: 113,ADDICTION:55,BUGS: 55,LONELY: -113,FIRE: -113,DEATH: 55, ANGELS: -113,HEALING:-113});
    //exactly neutral on the web. on the one hand, web can choose for you. on the other, web can let you choose for others. same for freedom
    theme_opinions[CHOICES] = createOpinion(55, {OBFUSCATION: -55,ADDICTION: -113,WEB:0,CHOICES: 113,FREEDOM: 0,BURIED: -113,TWISTING:-113,KNOWING:113});
    //zap!
    theme_opinions[ZAP] = createOpinion(-113, {ZAP: 1000});
    theme_opinions[LOVE] = createOpinion(85, {ENDINGS: -55,DECAY: -113,LONELY:-113, DEATH: -113,APOCALYPSE:-113,ANGELS: 113,SERVICE:113,FAMILY:113,HEALING:113 });
    //what is anything but a calm lake reflecting the self?
    theme_opinions[SOUL] = createOpinion(0, {SOUL: 113});
    theme_opinions[ANGER] = createOpinion(-113, {KILLING: 0, ANGER: 13,MUSIC: 8});
    theme_opinions[WEB] = createOpinion(13, {QUESTING: 55,ADDICTION:113,GUIDING: 113,WEB: 113,SPYING: 55, TECHNOLOGY:55,FREEDOM:-55, FAMILY:55});
    //there really is a window into my soul for you all to peer into just based on what opinions i think themes have
    theme_opinions[ROYALTY] = createOpinion(-13, {FAMILY: 55,SERVICE:113,APOCALYPSE: -55,FREEDOM: -55,STEALING:-113});
    //all should end, much less patient thatn death
    theme_opinions[ENDINGS] = createOpinion(-55, {KILLING: 113,DEATH: 113,HEALING:-113,APOCALYPSE: 113});
    theme_opinions[GUIDING] = createOpinion(30, {QUESTING: 55,LANGUAGE: 55,HUNTING: -55,FAMILY: 55,SERVICE: 55,ANGELS: 55,KNOWING: 55,BURIED: 55,OCEAN: 113,FREEDOM: -55,SCIENCE: 55,LONELY: -55,GUIDING: 55});
    theme_opinions[CRAFTING] = createOpinion(0, {QUEST: 33,ZAP: 55,FIRE: 55,STEALING: -55,TECHNOLOGY: 113,ART: 113,CRAFTING: 113});
    //say no to book worms and censorship
    theme_opinions[LANGUAGE] = createOpinion(13, {MUSIC: 85,OBFUSCATION: -113,BUGS: -113,ART: 85,TECHNOLOGY: 55, SCIENCE:55, KNOWING:113,WEB:33});
    theme_opinions[BUGS] = createOpinion(10, {WEB:-113,DECAY:113,PLANTS:113,FAMILY:113,BURIED:113,FLESH:113,ZAP:-113,FIRE: -113,LONELY: -113,STEALING:113});
    //there is only room for one thing, not exactly healthy now is it, wanderer
    theme_opinions[ADDICTION] = createOpinion(-1000, {ADDICTION: 1000});
    theme_opinions[DOLLS] = createOpinion(85, {MUSIC: 113,CRAFTING: 113,SOUL: 113,DECAY: -113, BUGS: -113,MAGIC: 113,FLESH: -113,ART: 113, ROYALTY: 113, FAMILY: 113, LONELY: -113, CLOWNS: 113, DOLLS: 113});
    theme_opinions[CLOWNS] = createOpinion(113, {ENDINGS: -113,ROYALTY:-113,ANGER:-113,WEB:-113,LONELY: -113});
    //anything could be in the dark
    theme_opinions[DARKNESS] = createOpinion(0, {LIGHT: -113});
    //hide everything
    theme_opinions[CENSORSHIP] = createOpinion(-85, {LIGHT:-113,MATH: 113,KNOWING: -113,SCIENCE: -113,SPYING: 113,DARKNESS: 113,LANGUAGE: -113});

    theme_opinions[OBFUSCATION] = createOpinion(-85, {LIGHT:-113,MATH: 113,KNOWING: -113,SCIENCE: -113,SPYING: 113,DARKNESS: 113,LANGUAGE: -113});
    theme_opinions[KILLING] = createOpinion(-113, {CRAFTING: 33,ANGER: 85,KILLING: 113, FLESH: 113});
    theme_opinions[MUSIC] = createOpinion(33, {LANGUAGE: 85,ANGELS: 85,MATH: 85,FREEDOM: 85,ART: 85,MUSIC: 113});
    theme_opinions[QUESTING] = createOpinion(33, {SERVICE: 113,MAGIC: 85,HUNTING: 113,CHOICES: 113,wEB: 55,ENDINGS:55,GUIDING:85,KILLING: 85,BURIED: 55,FREEDOM: 85,SPYING: 55,QUESTING: 113});
    theme_opinions[DEFENSE] = createOpinion(0, {HEALING:33,CRAFTING:113,KILLING: -113,ROYALTY:55,DEATH: -113,DEFENSE: 113});
}

//i would expect a/n [BLANK] individual such as yourself to come to such a conclusion, yes.
const initCompliments = () => {
    compliment_possibilities[ART] = ["artistic"];
    compliment_possibilities[TECHNOLOGY] = ["technological"];
    compliment_possibilities[SPACE] = ["spacious"];
    compliment_possibilities[TIME] = ["punctual"];
    compliment_possibilities[STEALING] = ["resourceful"];
    compliment_possibilities[FREEDOM] = ["independant"];
    compliment_possibilities[FIRE] = ["warm"];
    compliment_possibilities[LONELY] = ["talented"];
    compliment_possibilities[OCEAN] = ["soothing"];
    compliment_possibilities[FLESH] = ["beautiful"];
    compliment_possibilities[BURIED] = ["steady"];
    compliment_possibilities[SCIENCE] = ["scientific"];
    compliment_possibilities[MATH] = ["logical"];
    compliment_possibilities[TWISTING] = ["creative"];
    compliment_possibilities[DEATH] = ["inevitable"];
    compliment_possibilities[APOCALYPSE] = ["peaceful"];
    compliment_possibilities[ANGELS] = ["righteous"];
    compliment_possibilities[LIGHT] = ["illuminating"];
    compliment_possibilities[SERVICE] = ["helpful"];
    compliment_possibilities[FAMILY] = ["loyal"];
    compliment_possibilities[MAGIC] = ["magical"];
    compliment_possibilities[HEALING] = ["compassionate"];
    compliment_possibilities[PLANTS] = ["nature loving"];
    compliment_possibilities[HUNTING] = ["skilled"];
    compliment_possibilities[DECAY] = ["practical"];
    compliment_possibilities[CHOICES] = ["considerate"];
    compliment_possibilities[ZAP] = ["electifying"];
    compliment_possibilities[LOVE] = ["loving"];
    compliment_possibilities[SOUL] = ["introspective"];
    compliment_possibilities[ANGER] = ["passionate"];
    compliment_possibilities[WEB] = ["strategic"];
    compliment_possibilities[ROYALTY] = ["prestigious"];
    compliment_possibilities[ENDINGS] = ["calm"];
    compliment_possibilities[KNOWING] = ["intelligent"];
    compliment_possibilities[GUIDING] = ["caring"];
    compliment_possibilities[CRAFTING] = ["creative"];
    compliment_possibilities[LANGUAGE] = ["communicative"];
    compliment_possibilities[BUGS] = ["gentle"];
    compliment_possibilities[ADDICTION] = ["compelling"];
    compliment_possibilities[SPYING] = ["observant"];
    compliment_possibilities[CLOWNS] = ["funny"];
    compliment_possibilities[DOLLS] = ["playful "];
    compliment_possibilities[OBFUSCATION] = ["mysterious"];
    compliment_possibilities[CENSORSHIP] = ["censored"];

    compliment_possibilities[DARKNESS] = ["quiet"];
    compliment_possibilities[KILLING] = ["forthright"];
    compliment_possibilities[MUSIC] = ["talented"];
    compliment_possibilities[DEFENSE] = ["protective"];
    compliment_possibilities[QUESTING] = ["goal-oriented"];
}

const initMiracles = () => {
    miracles[ART] = ["become divinely inspired for any one creation", "generate a work of art exactly as it exists in their mind", "resolve any one targets creative block"];
    miracles[TECHNOLOGY] = ["become aware of one hacking exploit in any system", "patch one hacking exploit in any system", "eliminate one item from tech debt", "intuit the true cause of any bug"];
    miracles[TIME] = ["slow time any arbitrary amount", "stop time for everyone but a single target for five relative minutes", "stop time for any single target", "create up to three time clones", "go back in time up to 24 hours"];
    miracles[SPACE] = ["change the size of any target object", "teleport to any target location", "negate any targets fall damage", "remove one square mile of ground"];
    miracles[STEALING] = ["obtain any target object", "own any target object", "hide from the sight of all viewers", "scale any target building"];
    miracles[FREEDOM] = ["undo any chain", "unlock any lock", "walk through any object", "fly for any duration"];
    miracles[FIRE] = ["burn any target object", "destroy any target square mile in flames", "transform their body to pure wax"];
    miracles[LONELY] = ["send any target to an isolated pocket dimension", "obtain a moment of pure peace and quiet", "hide from the view of anyone", "be forgotten by everyone"];
    miracles[OCEAN] = ["gain one insight as to the location of any landmass across an ocean", "see through any amount of water", "manifest a cubic mile of water to any target area"];
    miracles[FLESH] = ["alter any target body in any way desired", "summon up to one metric ton of raw meat to any target location", "remove any bone from any target body"];
    miracles[BURIED] = ["trap any single target deep within the earth", "sink into the earth for as long as they wish", "summon up to one metric ton of earth to any target location"];
    miracles[SCIENCE] = ["reveal one secret of the natural world", "provide one biological sample not of this world", "provide a metalic alloy with properties currently unknown by science", "allow any target to be able to pull any arbitrary consecutive all-nighters so long as they are trying to discover something"];
    miracles[MATH] = ["grant the answer to one currently unsolved mathematical problem", "solve any NP hard problem in linear time", "factor any two numbers in linear time"];
    miracles[TWISTING] = ["let any target realize they are in a simulation of a game", "change the meaning of any word for everyone but a given target", "create an ever shifting fractal labrinth", "trap any target in an infinite realm of false meaning", "create a game that is not a game and trap any target in its endless variations", "afflict a given target with a variety of effects only they can experience", "delete a well known event from all memory besides a given target"];
    miracles[DEATH] = ["speak with any corpse", "learn death date of any single target", "kill any target with no saving throws", "transform any corpse into an undead"];
    miracles[APOCALYPSE] = ["speak one true prophecy of the end of the world", "end the world", "display a clock showing how far off the end of the world is", "set into motion one additional potential apocalypse"]
    miracles[ANGELS] = ["revive the recently dead", "fly with feathered wings", "summon an angelic choir", "summon an angelic companion"];
    miracles[LIGHT] = ["divinely light one room", "divinely banish the darkness", "highlight an important objective"];
    miracles[SERVICE] = ["divinely clean one house", "provide divine assistance to one ally", "divinely buff one ally"];
    miracles[FAMILY] = ["divinely confirm the location of all family members", "teleport to the location of any family member", "teleport any family member to them"];
    miracles[MAGIC] = ["gain one divine insight into the nature of magic", "divinely learn one new spell", "restore all mana to everyone in a radius"];
    miracles[HEALING] = ["divinely heal one ally", "divinely cure any wound, regardless of difficulty", "divinely restore the party to full health", "divinely heal moderate wounds and below for a square mile", "divinely destroy disease"];
    miracles[PLANTS] = ["divinely accelerate the growth of an acre of plants", "divinely gain one rare seed", "divinely multiply the yield of an acre of plants", "access divine awareness on what any particular plant needs"];
    miracles[HUNTING] = ["divinely highlight the footsteps of any prey", "gain an intuitive sense where any prey has gone", "perform an attack which can not miss its target"];
    miracles[DECAY] = ["divinely rot any acre of land", "destroy any object down to its atoms", "corrode any material, regardless of durability", "summon one zombie"];
    miracles[CHOICES] = ["gain a divine intuition on which of two possible choices best meet their goals", "gain a divine sense of how to boil down a complex decision into two main choices", "can have one test of luck result in the optimal result", "gain a divine understanding of the consequences of any pending choices"];
    miracles[ZAP] = ["divinely summon a lightning bolt", "gain a divine aura of ozone that marks enemies as lightning rods", "divinely declare any single object as 'ground'"];
    miracles[LOVE] = ["make any single target fall in love with any other target", "divine whether any single target loves any single other target", "perfectly convey their feelings of love to any other target"];
    miracles[SOUL] = ["divinely gain one single fact of perfect self knowledge", "astral project", "summon forth a mirror of Perfect Revelation"];
    miracles[ANGER] = ["destroy any single target", "activate a divine rage for five minutes", "summon any single target to be attacked"];
    miracles[WEB] = ["tug the strings of fate and weave them anew", "summon one Spiderling familiar", "perfectly control any single target for five minutes", "achive limited control over any group", "attach an invisible web to any target, to cause it to be controlled for up to ten seconds at a time of their choosing"];
    miracles[ROYALTY] = ["gain massive bonuses to leading any armies", "divinely inspire any crowd", "divinely intuit how best to rule a group"];
    miracles[ENDINGS] = ["spoil the ending of any target story", "understand the full consequences of any single potential action", "cause any given target to no longer exist"];
    miracles[KNOWING] = ["learn a random fact", "learn a fact about a given topic", "master a skill at random", "understand literally everything about a target square foot"];
    miracles[GUIDING] = ["gain a divine sense of where best to direct a group", "gain the divine ability to provide perfect advice", "gain an intuitive sense of the easiest way to move through any target environment"];
    miracles[CRAFTING] = ["divine inspiration to make a Legendary Object", "the ability to summon Divine Quality raw materials", "the ability to temporarily upgrade anyone within a 10 foot radius to a Master of any target craft"];
    miracles[LANGUAGE] = ["the abililty to understand any language", "the ability to remove someones understanding of a target language", "the ability to create an entire new language and specify speakers of it (losing previous language skills)"];
    miracles[BUGS] = ["the ability to summon a swarm of any target insect", "the ability to create new species of insects", "the ability to intuitively know what any insect desires"];
    miracles[ADDICTION] = ["the ability to cause addiction in any target", "the ability to permanently cure the addiction of any target", "cause a completely random effect"];
    miracles[SPYING] = ["the temporary ability to view anything within 100 miles", "the ability to divinely mark a target and hear anything through their ears and see anything through their eyes", "the temporary ability to hear any conversation within 10 miles"];
    miracles[CLOWNS] = ["resist any attack so long as they can make a pun about it", "gain Legendary Tier Acrobatics", "become unconditionally immortal", "gain cartoon physics"];
    miracles[DOLLS] = ["control any inanimate object that appears to be something living", "summon one Doll Familiar", "transform themselves into a doll", "transform themselves into a mannequin"];
    miracles[OBFUSCATION] = ["permanently hide any object", "remove knowledge of one concept from any target", "cause amnesia in any one target"];
    miracles[CENSORSHIP] = ["permanently hide any object", "remove knowledge of one concept from any target", "cause amnesia in any one target"];

    miracles[DARKNESS] = ["completely block out the sun for one square mile", "teleport between any shadows", "remove all light from any room"];
    miracles[KILLING] = ["summon a tidal wave of blood", "summon any arbitrary amount of knives for five minutes", "mark any target for senseless violence from any witnesses", "summon invisible sentient knives to cut any target"];
    miracles[MUSIC] = ["gain divine knowledge of how to perform any piece of music", "gain divine inspiration to create any musical performance", "gains the ability to divinely influence any who hear their music"];
    miracles[DEFENSE] = ["mark any target as invulnerable for five minutes", "teleport to take any hit from any ally member", "gain one piece of Legendary Armor"];
    miracles[QUESTING] = ["get a divine hint to complete any quest", "gain a Divine Quest", "get a multiplier for any Quest Completion Bonuses"];
}

const initInsults = () => {
    insult_possibilities[ART] = ["trite"];
    insult_possibilities[TECHNOLOGY] = ["hacky"];
    insult_possibilities[SPACE] = ["stand-offish"];
    insult_possibilities[TIME] = ["hasty"];
    insult_possibilities[STEALING] = ["greedy"];
    insult_possibilities[FREEDOM] = ["narcissistic"];
    insult_possibilities[FIRE] = ["destructive"];
    insult_possibilities[LONELY] = ["lonely"];
    insult_possibilities[OCEAN] = ["drowned"];
    insult_possibilities[FLESH] = ["ugly"];
    insult_possibilities[BURIED] = ["powerless"];
    insult_possibilities[SCIENCE] = ["non-peer-reviewed"];
    insult_possibilities[MATH] = ["stilted"];
    insult_possibilities[TWISTING] = ["mad"];
    insult_possibilities[DEATH] = ["morbid"];
    insult_possibilities[APOCALYPSE] = ["pessimistic"];
    insult_possibilities[ANGELS] = ["self-righteous"];
    insult_possibilities[LIGHT] = ["blinding"];
    insult_possibilities[SERVICE] = ["boot-licking"];
    insult_possibilities[FAMILY] = ["unstable"];
    insult_possibilities[MAGIC] = ["deluded"];
    insult_possibilities[HEALING] = ["self-sacrificing"];
    insult_possibilities[PLANTS] = ["awkward"];
    insult_possibilities[HUNTING] = ["creepy stalker"];
    insult_possibilities[DECAY] = ["corrupted"];
    insult_possibilities[CHOICES] = ["indecisive"];
    insult_possibilities[ZAP] = ["shocking"];
    insult_possibilities[LOVE] = ["suffocating"];
    insult_possibilities[SOUL] = ["self-obsessed"];
    insult_possibilities[ANGER] = ["violent"];
    insult_possibilities[WEB] = ["controlling"];
    insult_possibilities[ROYALTY] = ["pompous"];
    insult_possibilities[ENDINGS] = ["dour"];
    insult_possibilities[KNOWING] = ["paranoid"];
    insult_possibilities[GUIDING] = ["condescending"];
    insult_possibilities[CRAFTING] = ["obsessive"];
    insult_possibilities[LANGUAGE] = ["pendantic"];
    insult_possibilities[BUGS] = ["creepy"];
    insult_possibilities[ADDICTION] = ["addled"];
    insult_possibilities[SPYING] = ["spying"];
    insult_possibilities[CLOWNS] = ["foolish"];
    insult_possibilities[DOLLS] = ["childish"];
    insult_possibilities[OBFUSCATION] = ["mysterious"];
    insult_possibilities[CENSORSHIP] = ["censored"];

    insult_possibilities[DARKNESS] = ["edgy"];
    insult_possibilities[KILLING] = ["murderous"];
    insult_possibilities[MUSIC] = ["tone-deaf"];
    insult_possibilities[DEFENSE] = ["helicoptering"];
    insult_possibilities[QUESTING] = ["obsessive"];
}

const initPhilosophy = () => {
    philosophy[ART] = ["Art is set aside from ordinary life and made a dramatic focus of experience.", "With a few important exceptions like abstract painting, works of art simulate experiences of the world.", "People make a point of judging, appreciating, and interpreting works of art.", "Artistic objects and performances satisfy rules of composition that place them in a recognizable style.", "People enjoy art for art's sake, and do not demand that it keep them warm or put food on the table.", "Humans cultivate, recognize, and admire technical artistic skills.", "Aesthetics is a branch of philosophy that deals with the nature of beauty and taste, as well as the philosophy of art (its own area of philosophy that comes out of aesthetics).", "In considering the nature of beauty, aesthetics intersects with metaphysics; and questions asked about how we know and recognize beauty are epistemological."];
    philosophy[TECHNOLOGY] = ["With Pong having led the way for videogames to their present popularity, it was also the important basis for all that video games have become.", "I really do believe that design is the highest form of creative expression...You know, video games can be truly deep... So time, space, aesthetics, and then, most important, behavior. The real core issue of interaction design is behavior.", "Within this evolution, the debate of whether or not video games could be considered art had arisen. The establishment of the debate came when Roger Ebert, a celebrated and respected film critic, donned video games to not be art despite the growing claims to the contrary. There are sides to the debate of video games and each thoroughly explains how video games definitively are or are not to be classified as art.", "The game developers Atari initially released the arcade game in November of 1972. During the development of the game, coin-operated, arcade, test-versions had been released and the coin-boxes came back overflowing. ", "There is demonstrably no way to prove the 'correctness' of any given computer program, even for 'simple' ones such as 'does this program halt'.", "A technology can be thought of as a neutral entity only when the sociocultural context and issues circulating the specific technology are removed.", "What engineers do is subject to moral evaluation.", "In this sense, engineering can be considered a social as well a technological discipline and judged not just by whether its artifacts work, in a narrow sense, but also by how they influence and serve social values.", "Changes in technology, and specifically productive technology, are the primary influence on human social relations and organizational structure, and that social relations and cultural practices ultimately revolve around the technological and economic base of a given society.", "A society's technology determines the development of its social structure and cultural values."];
    philosophy[SPACE] = ["Many people assume agoraphobia is simply a fear of open spaces, but it's actually a more complex condition.", "Acrophobia is an excessive fear of heights and manifests as severe anxiety. A person could have an attack just walking up stairs or climbing a ladder. Sometimes the fear is so great a person can't move. Acrophobia can create a dangerous situation for someone who has it.", "We are tiny specks in the infinite vastness of the universe; our lives are mere instants even on a geological time scale, let alone a cosmic one; we will all be dead any minute.", "If you traveled at the speed of light, it would still take you ten thousand years to explore just your home planet's arm of the Milky Way. The universe is vast and beyond your capacity to productively engage with.", "The number of uncountable rational numbers is far, far larger than the number of countable integers. In a very real, provable sense there are more numbers between 0 and 1 than there are whole numbers in the universe.", "Focus on a number of basic issues, including whether time and space exist independently of the mind and whether they exist independently of one another.", "While such ideas have been central to philosophy from its inception, the philosophy of space and time was both an inspiration for and a central aspect of early analytic philosophy."];
    philosophy[TIME] = ["If you conceptualize time to be a river, consider the ox bow lake. When a river loops in on itself enough it can pinch off a little circle entirely seperate from the main river. A paradoxical river that creates itself and yet can never escape itself.", "An actual infinite cannot exist. All things end in time.", "One must ask oneself: what accounts for time's apparently unidirectional flow, whether times other than the present moment exist, and questions about the nature of identity (particularly the nature of identity over time).", "Focus on a number of basic issues, including whether time and space exist independently of the mindand whether they exist independently of one another.", "While such ideas have been central to philosophy from its inception, the philosophy of space and time was both an inspiration for and a central aspect of early analytic philosophy."];
    philosophy[STEALING] = ["Could stealing be a virtue?", "Does 'thou shalt not steal' provide the maximum happiness to society when applied equally?", "If the owner of an objects derives happiness X from it, and there is another who would derive happiness 10X from it, is there a moral imperative to give the object to the non-owner? Or is it necessary to add the sadness the owner would have in the loss? If the sadness is less than 10X, does your answer change? More than?", "If the maximum happiness would be obtained for all through theft, is there a moral imperative towards theft?", "Would a society founded on the principal 'Thous must stela' survive long as a society?"];
    philosophy[FREEDOM] = ["'If freedom of speech is taken away, then dumb and silent we may be led, like sheep to the slaughter.'", "For many philosophers, travel is seen as an extension of the journey of life. As George Santayana suggested: 'What is life but a form of motion and a journey through a foreign world?'", "A man chooses. A slave obeys.", "A person who does not succeed in doing what he sets out to do, because his will fails, is in a sense unfree, a slave to his passions. His will is not free because it is subject to momentary impulses which distract him from accomplishing what he had determined to do.", "Steiner begins exploring the nature of human freedom by accepting 'that an action, of which the agent does not know why he performs it, cannot be free,' but asking what happens when a person becomes conscious of his or her motives for acting.", "Examine the basis for freedom in human thinking, gives an account of the relationship between knowledge and perception, and explores the role and reliability of thinking as a means to knowledge.", "Is free will better understood to be the ability to act without the coercion of other sapient creatures? If so, how does the existance of society influence this definition? If you are jailed you are 'free' to eat a meal or to refuse, and yet all choices available to you have been categorically constrained by other sapients.", "Can free will exist along side the deterministic laws of physics?", "Is there a moral imperative towards freedom over security?"];
    philosophy[FIRE] = ["Pyrophobia is a specific phobia characterized by a fear of fire. People with specific phobias feel an extreme, irrational level of anxiety about things that pose little to no real danger. Fire cannot hurt you. Touch it. Let it consume you.", "The anxiety of losing someone we love is called thanatophobia. Another meaning of thanatophobia is the fear of death, that is, when someone is afraid of death or their close one, they have thanatophobia. The Greek word thanto that means death and phobia means fear.", "It seems likely that the universe at large is likely a place of destruction-by-entropy.", "A thoughtful philosophy of destruction is essential to a rich life, at the very least because each of us must grapple with his/her own mortality.", "Somewhere in the back of our minds, we know that creation and growth must be accompanied by destruction and decline.", "Since nature itself is an unpredictable and unstoppable force which destruction knows no bounds, it would be pointless to try and stop it.", "The long and short of destruction is that it is an action undertaken in order to negate something of its purpose, no matter who engages in it."];
    philosophy[LONELY] = ["Autophobia, or monophobia, is the fear of being alone or lonely. Being alone, even in a usually comforting place like home, can result in severe anxiety for people with this condition. People with autophobia feel they need another person or other people around in order to feel safe.", "Loneliness has also been described as social pain — a psychological mechanism meant to alert us to our isolation and motivate us to seek social connections. We are social creatures and throughout most of history we have been dependent on social cooperation and attachment for survival. It makes sense this drive would have evolved in us.", "To feel lonely is to join the rest of humanity in acknowledging the painful reality that we are somehow fundamentally separated from each other, never to be fully understood.", "Nobody can truly understand what it is to be you; not your parents, best friend, therapist or lover. No one can experience the world in the same way you can. No one can fully understand your pain, joy, sorrow, despair, fear, guilt or shame.", "You are the only sapient mind anywhere in this existance. You are singular. Unique. Alone.", "Loneliness is the longing for connection.", "Loneliness is a feeling of being cut off, disconnected and/or alienated from other people.", "Loneliness is more than just wanting company or wanting to do something with another person.", "Loneliness is an emotional state in which a person typically experiences a powerful feeling of emptiness."];
    philosophy[OCEAN] = ["Thalassophobia  is the persistent and intense fear of deep bodies of water such as the sea, oceans, pools, or lakes.", "Water is the cradle of philosophy, and according to Thales of Milet (around 600 BC), water is the cradle of all things. He considered the earth to float on water, and also saw water as the arche, the element and the first principle of existing things—in other words, the origin of all things to which all things must return.", "What do we see when we look out to the sea? What do we mean when we say “ocean”?", "Our human history is closely interwoven with the sea. Human relationships with the sea have been considered from angles as different as philosophy, geography, military studies, navigation and seafaring, natural sciences, political sciences, and social sciences and have featured in the various fields of art, literature, and music for centuries if not millennia.", "There are many other ways of conceptualising the ocean, and different concepts exist concurrently, resulting in a multiplicity of perspectives that are changing over time. Although some scholars are debating whether it is possible to know the ocean at all, the selected concepts—incomplete though they may be—also point to contradictory perceptions of the ocean that may have a bearing on how we do maritime spatial planning.", " From a confrontation with the immanence of ecological breakdown, to the interactions between moving bodies and a liquid medium, each work demonstrates ways of thinking that set adrift our ideas, call into question the solid ground on which we walk and navigate new routes of enquiry and discovery on seas both rich and strange.", "You can never step in the same river twice.", "Imagine you were in a river, floating away. Would it be easier to swim against the tide or just let go and let it carry you smoothly downstream?", "You can't change the ocean or the weather; no matter how hard you try, so it's best to learn how to sail in all conditions."];
    philosophy[FLESH] = ["Since reason is shaped by the body, it is not radically free, because the possible human conceptual systems and the possible forms of reason are limited. In addition, once we have learned a conceptual system, it is neurally instantiated in our brains and we are not free to think just anything. Hence, we have no absolute freedom in Kant's sense, no full autonomy.", "There is no Cartesian dualistic person, with a mind separate from and independent of the body, sharing exactly the same disembodied transcendent reason with everyone else, and capable of knowing everything about his or her mind simply by self-reflection. Rather, the mind is inherently embodied, reason is shaped by the body, and since most thought is unconscious, the mind cannot be known simply by self-reflection. Empirical study is necessary.", "Reason is not, in any way, a transcendent feature of the universe or of disembodied mind. Instead, it is shaped crucially by the peculiarities of our human bodies, by the remarkable details of the neural structure of our brains, and by the specifics of our everyday functioning in the world.", "Meat is meat.", "You are fundamentally made of the same flesh that the animals you eat are.", "Dinosaurs eat meat. You are made of meat. Run!", "Reason is not disembodied, as the tradition has largely held, but arises from the nature of our brains, bodies, and bodily experience.", "You are not your body, you are a ten pound blob of fat and water floating in a hollow cave, interpreting the flickers of shadows as all of reality.", "The mind is inherently embodied."];
    philosophy[BURIED] = ["Claustrophobia is an anxiety disorder that causes an intense fear of enclosed spaces. If you get very nervous or upset when you're in a tight place, like an elevator or crowded room, you might have claustrophobia.", "Taphophobia is an abnormal (psychopathological) fear of being buried alive as a result of being incorrectly pronounced dead. Before the era of modern medicine, the fear was not entirely irrational.", "Ashes to ashes, dust to dust. You will rejoin the earth one day.", "You are penned in from all directions. Your freedom is limited, you are chained by society, by obligation, by the ties that bind.", "For us, dirt is both a real quality of the world and part of a symbolic, culturally relative order.", "What do we mean by “dirt” and is it an actual quality of the world or, as most current theoretical work would have us believe, a subjective idea projected on to reality.", "The distinction between clean and dirty is a universal organising principle in human society, like right and wrong."];
    philosophy[SCIENCE] = ["The philosophies of biology, of psychology, and of the social sciences explore whether the scientific studies of human nature can achieve objectivity or are inevitably shaped by values and by social relations.", "The question of the validity of scientific reasoning is seen in a different guise in the foundations of statistics.", "Philosophies of the particular sciences range from questions about the nature of time raised by Einstein's general relativity, to the implications of economics for public policy. A central theme is whether the terms of one scientific theory can be intra- or intertheoretically reduced to the terms of another. ", "Another approach to thinking about science involves studying how knowledge is created from a sociological perspective, an approach represented by scholars like David Bloor and Barry Barnes.", "Subsequently, the coherentist approach to science, in which a theory is validated if it makes sense of observations as part of a coherent whole, became prominent due to W.V. Quine and others.", "There is no consensus among philosophers about many of the central problems concerned with the philosophy of science, including whether science can reveal the truth about unobservable things and whether scientific reasoning can be justified at all.", "Philosophy of science focuses on metaphysical, epistemic and semantic aspects of science. Ethical issues such as bioethics and scientific misconduct are often considered ethics or science studies rather than philosophy of science.", "Philosophy of science is a branch of philosophy concerned with the foundations, methods, and implications of science. The central questions of this study concern what qualifies as science, the reliability of scientific theories, and the ultimate purpose of science.", "What scientists do is subject to moral evaluation."];
    philosophy[MATH] = ["A perennial issue in the philosophy of mathematics concerns the relationship between logic and mathematics at their joint foundations.", "0.9 repeating is exactly equivalent to 1. You can prove this mathematically.", "There are traditions of mathematical philosophy in both Western philosophy and Eastern philosophy. Western philosophies of mathematics go as far back as Pythagoras, who described the theory 'everything is mathematics'(mathematicism), Plato, who paraphrased Pythagoras, and studied the ontological status of mathematical objects, and Aristotle, who studied logic and issues related to infinity (actual versus potential).", "The origin of mathematics is subject to arguments and disagreements. Whether the birth of mathematics was a random happening or induced by necessity during the development of other subjects, like physics, is still a matter of prolific debates", "The philosophy of mathematics is the branch of philosophy that studies the assumptions, foundations, and implications of mathematics. It aims to understand the nature and methods of mathematics, and find out the place of mathematics in people's lives. The logical and structural nature of mathematics itself makes this study both broad and unique among its philosophical counterparts.", "The first incompleteness theorem states that no consistent system of axioms whose theorems can be listed by an effective procedure (i.e., an algorithm) is capable of proving all truths about the arithmetic of natural numbers. For any such consistent formal system, there will always be statements about natural numbers that are true, but that are unprovable within the system. The second incompleteness theorem, an extension of the first, shows that the system cannot demonstrate its own consistency.", "Gödel's incompleteness theorems are two theorems of mathematical logic that are concerned with the limits of provability in formal axiomatic theories."];
    philosophy[TWISTING] = ["Dementophobia is a type of phobia that involves the fear of madness or insanity. People who have this fear are afraid that they are going insane or losing touch with reality. The fear may be triggered by a family history of mental illness or periods of severe stress.", "Who's on first?", "Let's eat grandmother.", "That that is is that that is not is not is that it it is.", "James while John had had had had had had had had had had had a better effect on the teacher.", "The complex houses married and single soldiers and their families.", "The old man the boat.", "Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo. But why do Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo? ", "The horse faced past the barn fell.", "When is a door not a door? When it is a jar. When is a jar not a jar? When it's a door. When is a door not a door? When it's a jar. When is a jar not a jar? When it's a train. When is a train not a train? When it is a choo-choo. When is a choo-choo not a choo-choo? When Blain the Train is insane."];
    philosophy[DEATH] = ["Thanatophobia is commonly referred to as the fear of death. More specifically, it can be a fear of death or a fear of the dying process. It's natural for someone to worry about their own health as they age. It's also common for someone to worry about their friends and family after they're gone.", "Death is certain given that it will happen to each person, but uncertain in the time at which or manner by which it will occur. ", "Death is one of few conceptions that crosses cultural lines, is gender and racially unbiased, and thus far is out of our control to stop.", "Death is a universal and inescapable phenomenon that cannot be avoided nor delayed in the human experience.", "Controversy concerns whether or not the harmfulness of death can be reduced. It may be that, by adjusting our conception of our well-being, and by altering our attitudes, we can reduce or eliminate the threat death poses us. But there is a case to be made that such efforts backfire if taken to extremes.", "Controversy concerns whether all deaths are misfortunes or only some. Of particular interest here is a dispute between Thomas Nagel, who says that death is always an evil, since continued life always makes good things accessible, and Bernard Williams, who argues that, while premature death is a misfortune, it is a good thing that we are not immortal, since we cannot continue to be who we are now and remain meaningfully attached to life forever.", "Everything dies, even universes.", "In what sense might death or posthumous events harm us?", "What constitutes death? It is clear enough that people die when their lives end, but less clear what constitutes the ending of a person's life."];
    philosophy[APOCALYPSE] = ["Doomsday phobias are a broad category of phobias that can encompass any fear of the end of the world. Some people fear plague, others nuclear holocaust, while other people are afraid of Armageddon. Doomsday phobias are surprisingly common, occurring in some form in virtually every corner of the world.", "Intelligent species beyond a certain point of technological capability will destroy other intelligent species as they appear, perhaps by using self-replicating probes.", "Technological civilizations will either tend to destroy themselves within a century of developing interstellar communicative capability or master their self-destructive tendencies and survive for billion-year timescales.", "Possible annihilation via major global issues, where global interconnectedness actually makes humanity more vulnerable than resilient,[76] are many,[77] including war, accidental environmental contamination or damage, the development of biotechnology,[78] synthetic life like mirror life,[79] resource depletion, climate change,[80] or poorly-designed artificial intelligence.", "The progress of science and technology on Earth was driven by two factors—the struggle for domination and the desire for an easy life. The former potentially leads to complete destruction, while the latter may lead to biological or mental degeneration.", "Technological civilizations may usually or invariably destroy themselves before or shortly after developing radio or spaceflight technology.", "It is the nature of intelligent life to destroy itself.", "It may be the case that such extinction events are common throughout the universe and periodically destroy intelligent life, or at least its civilizations, before the species is able to develop the technology to communicate with other intelligent species.", "A handful of powerful men control whether or not you will die in nuclear flame.", "One day the light of the final star will finally be snuffed and motion will no longer be possible anywhere in the universe.", "One day the earth will be consumed by the sun and nothing you have ever done will ever be accessible ever again.", "It's hard to do philosophy in the face of the apocalypse."];
    philosophy[ANGELS] = ["Philosophy of religion covers alternative beliefs about God (or gods), the varieties of religious experience, the interplay between science and religion, the nature and scope of good and evil, and religious treatments of birth, history, and death.", "The philosophy of religion differs from religious philosophy in that it seeks to discuss questions regarding the nature of religion as a whole, rather than examining the problems brought forth by a particular belief-system. It can be carried out dispassionately by those who identify as believers or non-believers.", "To ask whether God exists is not to ask a theoretical question. If it is to mean anything at all, it is to wonder about praising and praying; it is to wonder whether there is anything in all that. This is why philosophy cannot answer the question “Does God exist?”", "Many theistic philosophers (and their critics) contend that language about God may be used univocally, analogically or equivocally.", "Philosophy of religion also includes the investigation and assessment of worldviews (such as secular naturalism) that are alternatives to religious worldviews. ", "Philosophy of religion is the philosophical examination of the themes and concepts involved in religious traditions as well as the broader philosophical task of reflecting on matters of religious significance including the nature of religion itself, alternative concepts of God or ultimate reality, and the religious significance of general features of the cosmos (e.g., the laws of nature, the emergence of consciousness) and of historical events (e.g., the 1755 Lisbon Earthquake, the Holocaust)."];
    philosophy[LIGHT] = ["you know you used to shine so bright. was that all refelected light? was nothing coming from inside? were you just a satellite?", "Let us first of all consider, my brethren, the value of Light. If Light be in itself good—", "Medieval Christianity viewed light as the perfect physical image for God, being not only pure and clarifying but also a hypostatic unity of multiples.", "From the foundations of Trinitarian doctrine, you arrive at a philosophy of light, which says that it is neither unity nor diversity, neither calcification nor fragmentation, but rather the whole spectrum working in unison, in perfect, sublime harmony and holism.", "Although the average speed over a two-way path can be measured, the one-way speed in one direction or the other is undefined (and not simply unknown), unless one can define what is 'the same time' in two different locations.", "The two-way speed of light is the average speed of light from one point, such as a source, to a mirror and back again. Because the light starts and finishes in the same place only one clock is needed to measure the total time; thus, this speed can be experimentally determined independently of any clock synchronization scheme.", "The 'one-way' speed of light, from a source to a detector, cannot be measured independently of a convention as to how to synchronize the clocks at the source and the detector. What can however be experimentally measured is the round-trip speed (or 'two-way' speed of light) from the source to the detector and back again.", "When using the term 'the speed of light' it is sometimes necessary to make the distinction between its one-way speed and its two-way speed.", "Scientists and thinkers have been fascinated with the speed of light for millennia. Aristotle wrongly contended that the speed of light was infinite, but it was the 17th Century before serious attempts were made to measure its actual velocity – we now know that it's 186,000 miles per second."];
    philosophy[SERVICE] = ["Play the strings of morality and humanity as it draws attention to the mistreatment of maids.", "Servant leadership is a leadership philosophy in which the goal of the leader is to serve. This is different from traditional leadership where the leader's main focus is the thriving of their company or organizations. ... Instead of the people working to serve the leader, the leader exists to serve the people.", "While we, of course, want to make our customers happy, we don't take a “solve every possible issue to delight customers” approach.", "Look – it's tempting to go the easy route here and just throw up some trite statement about “delighting customers” and call it a day.", "Your customer service philosophy is how you approach supporting your customers. And it's what helps you shape specific actions, like creating a knowledge base and a detailed support policy.", "Let me ask you a question: Do you have an actual customer service philosophy? Better yet – have you ever even considered what that is?", "The word service has taken on many meanings in today's societies and has been categorized into various levels. One underling truth remains consistent within its interpretations, and that it is an intangible act rendered and measured by the satisfaction or disaffection of the receiver."];
    philosophy[FAMILY] = ["Children are potentially free and their life directly embodies nothing save potential freedom. Consequently they are not things and cannot be the property either of their parents or others. In respect of his relation to the family, the child's education has the positive aim of instilling ethical principles into him in the form of an immediate feeling for which differences are not yet explicit, so that thus equipped with the foundation of an ethical life, his heart may live its early years in love, trust, and obedience.", "Children have the right to maintenance and education at the expense of the family's common capital. The right of the parents to the service as service of their children is based upon and is restricted by the common task of looking after the family generally.", "Further, marriage results from the free surrender by both sexes of their personality — a personality in every possible way unique in each of the parties. Consequently, it ought not to be entered by two people identical in stock who are already acquainted and perfectly known to one another; for individuals in the same circle of relationship have no special personality of their own in contrast with that of others in the same circle.", "Marriage is in essence an ethical tie. Formerly, especially in most systems of natural law, attention was paid only to the physical side of marriage or to its natural character.", "The right which the individual enjoys on the strength of the family unity and which is in the first place simply the individual's life within this unity, takes on the form of right (as the abstract moment of determinate individuality) only when the family begins to dissolve.", "The family, as the immediate substantiality of mind, is specifically characterised by love, which is mind's feeling of its own unity. Hence in a family, one's frame of mind is to have self-consciousness of one's individuality within this unity as the absolute essence of oneself, with the result that one is in it not as an independent person but as a member."];
    philosophy[MAGIC] = ["Inspired meditative disciplines dedicated to guiding the soul in a dangerous ascent, replete with magical instruments and passwords.", "The fact is that mathematics, natural science, and philosophical thought were bound up with magic and myth at their origin, and never really lost that connection, especially in the tradition that runs from Pythagoras to the Neo-Platonists.", "We will ask whether the magical beliefs and practices of indigenous cultures are irrational,  or if instead they follow standards of rationality appropriate to cultures in which magic is a lived experience.", "We will pay special attention to the relationship between magic, religion, and scientific rationality in the work of these writers.", "Lets examinine the interpretation of magic in so-called 'primitive' societies by three founders of modern anthropology and sociology.", "We will examine and evaluate the magical interpretations of cave art developed by Brueil and Lewis-Williams as a way of beginning to understand magic in its relation to religion, art, and altered states of consciousness.", "A new theory of cave art has emerged rehabilitating the magical interpretation.", "Cave paintings and engravings were the result of magical ceremonies meant to insure the rebirth and return of the great migratory herds, as well as successful kills.", "Is Magic Irrational?", "We will argue that, far from representing irrational or superstitious systems of belief, key esoteric traditions have played a central role in the rise of art  in the Old Stone Age, and of philosophy and science in the ancient, and early modern periods.", "This is a rather unusual course in that it treats magic, witchcraft, and the occult in general as serious topics of philosophical inquiry."];
    philosophy[HEALING] = ["That medicine has no accepted definition of holistic healing is a curiosity. If healing is a core function of medicine, then exploration of its symbolic meaning compels organized research of healing phenomena,18 and an operational definition of healing in a holistic sense is warranted. Such a definition would allow the systematic exploration of healing through identifiable and repeatable operations to determine more precisely its phenomena.", "The confusion concerning healing in medicine is evidenced by the lack of consensus about its meaning. Science values operational definitions. Yet, medicine promotes no operational definition of healing, nor does it provide any explanation of its mechanisms, save those describing narrow physiological processes associated with curing disease.", "Psychological conceptions of healing involve reordering an individual's sense of position in the universe and define healing as “a process in the service of the evolution of the whole person ality towards ever greater and more complex wholeness.", "Other disciplines have continued an active contemplation of holistic healing. Anthropological explorations of healing involve an active response to distress and distinguish categories related to healing, such as diagnosis and treatment, medical (scientific and nonreligious) and nonmedical (unscientific and religious), technological and nontechnological, and Western and non-Western.", "Medicine is traditionally considered a healing profession, and modern medicine claims legitimacy to heal through its scientific approach to medicine.", "Healing may be operationally defined as the personal experience of the transcendence of suffering. Physicians can enhance their abilities as healers by recognizing, diagnosing, minimizing, and relieving suffering, as well as helping patients transcend suffering.", "Healing was associated with themes of wholeness, narrative, and spirituality. Healing is an intensely personal, subjective experience involving a reconciliation of the meaning an individual ascribes to distressing events with his or her perception of wholeness as a person.", "Medicine is traditionally considered a healing profession, but it has neither an operational definition of healing nor an explanation of its mechanisms beyond the physiological processes related to curing."];
    philosophy[PLANTS] = ["The project of plant-thinking, limited as its scope seems, has gradually drawn the philosopher (yours truly), philosophy as such, and the figure of the human into its orbit. Which is why, regardless of what I (or anyone, for that matter) think, we are all plant philosophers. We owe our thinking (all of it without remainder!) to plants—both at its source, at the inception of thought, and at its points of destination.", "“Plant philosopher” may refer to the one who philosophizes about plants. Or, it may be a shorthand for “a philosopher of plants,” an expression that needs further unpacking. On the one hand, its sense overlaps with philosophizing about plants, adding nothing new to the preceding interpretation. On the other hand, it becomes really strange, assuming that “of plants” implies belonging to them, being claimed by and for them.", "Yet, it is a necessary counterweight to the image of plants as colonizers, conquering space and spreading their “selfish genes” over it. The same fact of an exuberant vegetal proliferation may be interpreted in two (or more) drastically dissimilar ways: as an aggressive act of conquest or as an act of love, of an immense and virtually limitless attraction to the outside.", "Hence, one would not need to experience “green love” (or to turn into a “tree hugger,” though there is nothing wrong with that) to be attracted to a way of thinking about and with vegetation. To become preoccupied with plants, it would be sufficient to heed the call of justice that has not yet been rendered to them.", "Identify the existential features of plant behavior and the vegetal heritage of human thought so as to affirm the potential of vegetation to resist the logic of totalization and to exceed the narrow confines of instrumentality.", "The margins of philosophy are populated by non-human, non-animal living beings, including plants. While contemporary philosophers tend to refrain from raising ontological and ethical concerns with vegetal life, Michael Marder puts this life at the forefront of the current deconstruction of metaphysics."];
    philosophy[HUNTING] = ["You mustn't hide too well. You mustn't be too good at the game. The player must never be bigger than the game itself.", "In the end, Rainsford survives the hunt only after fear forces him to jump off the cliff into the ocean, a rasher decision than he would ordinarily make. The animal and human elements work in tandem to ensure his survival.", "There are many other moral questions associated with hunting. Does it matter whether hunters use bullets, arrows or snares? Is preserving a cultural tradition enough to justify hunting? And is it possible to oppose hunting while still eating farm-raised meat?", "In discussions about the morality of hunting, someone inevitably asserts that hunting is a natural activity since all preindustrial human societies engage in it to some degree, and therefore hunting can't be immoral. But the concept of naturalness is unhelpful and ultimately irrelevant.", "The hunters I know don't put much stock in “the objection from character.” First, they point out that one can kill without having hunted and hunt without having killed.", "But if inflicting unwanted harm is necessarily wrong, then the source of the harm is irrelevant. Logically, anyone who commits to this position should also oppose predation among animals. When a lion kills a gazelle, it causes as much unwanted harm to the gazelle as any hunter would – far more, in fact.", "If sound, the objection from harm would require advocates to oppose all three types of hunting, unless it can be shown that greater harm will befall the animal in question if it is not hunted – for example, if it will be doomed to slow winter starvation.", "Critics often argue that hunting is immoral because it requires intentionally inflicting harm on innocent creatures. Even people who are not comfortable extending legal rights to beasts should acknowledge that many animals are sentient – that is, they have the capacity to suffer.", "A hunter who stalks deer because he or she enjoys the experience and wants decorative antlers may also intend to consume the meat, make pants from the hide and help control local deer populations. The distinctions matter because objections to hunting can change depending on the type of hunting.", "Sport hunting refers to intentionally killing wild animals for enjoyment or fulfillment. Hunters who go after deer because they find the experience exhilarating, or because they want antlers to mount on the wall, are sport hunters.", "Subsistence hunting is intentionally killing wild animals to supply nourishment and material resources for humans.", "Therapeutic hunting involves intentionally killing one species in order to conserve another species or an entire ecosystem.", "One central question is why people choose to hunt. Environmental philosopher Gary Varner identifies three types of hunting: therapeutic, subsistence and sport. Each type is distinguished by the purpose it is meant to serve.", "Hunters see the act of stalking and killing deer, ducks, moose and other quarry as humane, necessary and natural, and thus as ethical. Critics respond that hunting is a cruel and useless act that one should be ashamed to carry out."];
    philosophy[DECAY] = ["Septophobia is the fear of decaying matter. The origin of the word sep is Greek (meaning decay) and phobia is Greek (meaning fear).", "Contempt is often described as a combination of anger and disgust, and can be either hot or cold. The cardinal feature of contempt is the denial or rejection of a particular claim to respect or standing on the grounds that it is unjustified, often because the person making the claim has violated some norm or expectation and thereby compromised him- or her-self. Thus understood, contempt is an attempt at invalidating the claims of its object, and, in so doing, reinforcing those of its subject.", "Pharmakon, in philosophy and critical theory, is a composite of three meanings: remedy, poison, and scapegoat.[1] The first and second senses refer to the everyday meaning of pharmacology (and to its sub-field, toxicology), deriving from the Greek source term φάρμακον (phármakon), denoting any drug, while the third sense refers to the pharmakos ritual of human sacrifice.", "Pharmakon was usually a symbolic scapegoat invested with the sum of the corruption of a community. Seen as a poison, it was subsequently excluded from a community in times of crisis as a form of social catharsis, thus becoming a remedy for the city.", "In The Aesthetics of Decay, Dylan Trigg confronts the remnants from the fallout of post-industrialism and postmodernism. Through a considered analysis of memory, place, and nostalgia, Trigg argues that the decline of reason enables a critique of progress to emerge. ", "A person who is in a toxic relationship for too long will lose sight of what a healthy relationship really is. They will forget it and think that what is happening is normal, but nothing is further from the truth. A loving relationship is based on respect and blazing a path together, full of good times that will make both people feel happy.", "Toxic love is hidden behind a curtain of smoke where the partners fool themselves by thinking that the other person “is not bad” and trying to see the positive sides, like for example: s/he is a protective person, s/he loves the other person more than anything else in the world and takes care of them. However, the fact of the matter is that the relationship is only based on uncertainty, anger, need, insecurity, and even suspicion.", "A toxic relationship is like a debilitated spirit that needs another person to be able to feed itself and survive. This type of “love” creates emotional pain that can end up destroying every healthy part of a person until there is nothing left but an empty hollow.", "This theme of a corrupt citizenry, as opposed to a corrupt leadership or institution, is notably absent in contemporary philosophical discussion of the corruption of political institutions.", "For these philosophers corruption consisted in large part in rulers governing in the service of their own individual or collective—or other factional—self-interest, rather than for the common good and in accordance with the law or, at least, in accordance with legally enshrined moral principles.", "The causes and effects of corruption, and how to combat corruption, are issues that have been very much on the national and international agendas of politicians and other policymakers in recent decades."];
    philosophy[CHOICES] = ["The fear of making the wrong decision, or 'decidophobia' — a term coined by Princeton University philosopher Walter Kaufmann in his book Without Guilt and Justice — can affect people even when it comes to the smallest choices, such as what to have for lunch or what to wear.", "Decision theorists typically assume that a person's behaviour can be fully explained in terms of her beliefs and desires. But perhaps more interestingly, some of the most important results of decision theory—the various representation theorems, some of which have discussed here—suggest that if a person satisfies certain rationality requirements, then we can read her beliefs and desires, and how strong these beliefs and desires are, from her choice dispositions (or preferences).", "Decision theory should be of great interest to philosophers of mind and psychology, and others who are interested in how people can understand the behaviour and intentions of others; and, more generally, how we can interpret what goes on in other people's minds.", "Let us nonetheless proceed by first introducing basic candidate properties of (rational) preference over options and only afterwards turning to questions of interpretation. As noted above, preference concerns the comparison of options; it is a relation between options. For a domain of options we speak of an agent's preference ordering, this being the ordering of options that is generated by the agent's preference between any two options in that domain.", "Beyond this, there is room for argument about what preferences over options actually amount to, or in other words, what it is about an agent (perhaps oneself) that concerns us when we talk about his/her preferences over options.", "Decision theory is concerned with the reasoning underlying an agent's choices, whether this is a mundane choice between taking the bus or getting a taxi, or a more far-reaching choice about whether to pursue a demanding political career.", "Free will, in humans, the power or capacity to choose among alternatives or to act in certain situations independently of natural, social, or divine restraints.", "The existential attitude in philosophy emphasizes such freedom of choice as well as the necessity of having to choose.", "Indeterminists insist that human beings, however limited in choices, still are free to choose among alternatives and to put such choices into action. Thus volition (in this view) is, at least partly, independent of the strength of motivation, and itself determines which motive prevails.", "Choice, in philosophy, a corollary of the proposition of free will—i.e., the ability voluntarily to decide to perform one of several possible acts or to avoid action entirely. An ethical choice involves ascribing qualities such as right or wrong, good or bad, better or worse to alternatives."];
    philosophy[ZAP] = ["Lightning is a big spark...static electricity on a giant scale. Machines for creating static electricity were invented...the Leyden jar was like a thermos bottle which stored volts. Friction machines could charge the jars and electricity could be carried around and demonstrated. 'Electric magic' was in great demand at the royal courts of Europe as entertainment. The parlor tricks amused and fascinated people.", "Scandinavian mythology alludes to Thor, the thunderer, who was the foe of all demons. Thor tossed lightning bolts at his enemies. Thor also gave us Thurs-day.", "Early Greeks believed that lightning was a weapon of Zeus. Thunderbolts were invented by Athena, the goddess of wisdom. Since lightning was a manifestation of the gods, any spot struck by lightning was regarded as sacred. Greek and Roman temples often were erected at these sites, where the gods were worshipped in an attempt to appease them.", "There was another earlier time when lightning was the magic fire from the sky which man captured and used to keep warm at night. It kept the savage animals away. As primitive man sought answers about the natural world, lightning became a part of his superstitions, his myths and his early religions.", "In contrast to Galvani, however, Volta didn't believe the animal itself was the source of the electricity. But that presented the tough question of where the electricity could possibly be coming from.", "He also had in his laboratory an electrical machine, which charged up a conductor some distance away, which he was using in some electrical researches. One day (around 1790) one of the people working in the lab noticed that on touching a freshly dissected frog's nerve with a metal scalpel, the frog's leg twitched violently, and this occurred if the electrical machine was sparking at the same time.", "What interests us here is that he also thought that gravitational attraction was electrical in nature, and in place of Gilbert's magnetic little earth (terrella), von Guericke made (in 1663) an electric one, a sphere of sulphur (about the size of a child's head, he says) with a wooden rod through the middle, the ends of the rod resting on supports so that the sphere is easily rotated.", "The most primitive electrical and magnetic phenomena -- the attraction of dry light material such as chaff to rubbed amber, and the attraction of iron to loadstone -- were no doubt observed before recorded history began.", "In Mary Shelley's day, many people regarded the new science of electricity with both wonder and astonishment. In Frankenstein, Shelley used both the new sciences of chemistry and electricity and the older Renaissance tradition of the alchemists' search for the elixir of life to conjure up the Promethean possibility of reanimating the bodies of the dead."];
    philosophy[LOVE] = ["Part of the classificatory problem is that many accounts of love are quasi-reductionistic, understanding love in terms of notions like affection, evaluation, attachment, etc., which themselves never get analyzed. Even when these accounts eschew explicitly reductionistic language, very often little attempt is made to show how one such “aspect” of love is conceptually connected to others.", "Theories of love are tentatively and hesitantly classified into four types: love as union, love as robust concern, love as valuing, and love as an emotion. It should be clear, however, that particular theories classified under one type sometimes also include, without contradiction, ideas central to other types.", "Another common way to distinguish love from other personal attitudes is in terms of a distinctive kind of evaluation, which itself can account for love's “depth.” Again, whether love essentially involves a distinctive kind of evaluation, and if so how to make sense of that evaluation, is hotly disputed.", "It is more common to distinguish loving from liking via the intuition that the “depth” of love is to be explained in terms of a notion of identification: to love someone is somehow to identify yourself with him, whereas no such notion of identification is involved in liking.", "In providing an account of love, philosophical analyses must be careful to distinguish love from other positive attitudes we take towards persons, such as liking. Intuitively, love differs from such attitudes as liking in terms of its “depth,” and the problem is to elucidate the kind of “depth” we intuitively find love to have.", "Maintaining the distinctions among eros, agape, and philia becomes even more difficult when faced with contemporary theories of love (including romantic love) and friendship. For, as discussed below, some theories of romantic love understand it along the lines of the agape tradition as creating value in the beloved (cf. Section 4.2), and other accounts of romantic love treat sexual activity as merely the expression of what otherwise looks very much like friendship.", "Even within personal love, philosophers from the ancient Greeks on have traditionally distinguished three notions that can properly be called “love”: eros, agape, and philia.", "Can love be justified? If so, how? What is the value of personal love? What impact does love have on the autonomy of both the lover and the beloved?", "Part of the philosophical task in understanding personal love is to distinguish the various kinds of personal love."];
    philosophy[SOUL] = ["What is it to be a person, as opposed to a nonperson? What have we people got that nonpeople haven't got? More specifically, we can ask at what point in our development from a fertilized egg there comes to be a person, or what it would take for a chimpanzee or a Martian or an electronic computer to be a person, if they could ever be.", "One's personal identity in this sense is contingent and temporary: the way I define myself as a person might have been different, and can vary from one time to another.", "Outside of philosophy, 'personal identity' usually refers to properties to which we feel a special sense of attachment or ownership. Someone's personal identity in this sense consists of those properties she takes to “define her as a person” or “make her the person she is”, and which distinguish her from others.", "There is no single problem of personal identity, but rather a wide range of questions that are at best loosely connected. Discussions in this area do not always make clear which one is at stake.", "'Self' is sometimes synonymous with 'person', but often means something different: a sort of unchanging, immaterial subject of consciousness, for instance (as in the phrase 'the myth of the self').", "Personal identity deals with philosophical questions that arise about ourselves by virtue of our being people (or, as lawyers and philosophers like to say, persons). This contrasts with questions about ourselves that arise by virtue of our being living things, conscious beings, material objects, or the like.", "The theories of the Hellenistic period, by contrast, are interested more narrowly in the soul as something that is responsible specifically for mental or psychological functions. They either de-emphasize or sever the ordinary-language connection between soul and life in all its functions and aspects.", "Coming to philosophical theory, we first trace a development towards comprehensive articulation of a very broad conception of soul, according to which the soul is not only responsible for mental or psychological functions like thought, perception and desire, and is the bearer of moral qualities, but in some way or other accounts for all the vital functions that any living organism performs.", "Ancient philosophical theories of soul are in many respects sensitive to ways of speaking and thinking about the soul [psuchê] that are not specifically philosophical or theoretical. We therefore begin with what the word 'soul' meant to speakers of Classical Greek, and what it would have been natural to think about and associate with the soul."];
    philosophy[ANGER] = ["The term angrophobia refers specifically to the fear of becoming angry rather than the fear of others becoming angry with you. Like all phobias, angrophobia varies widely in both its symptoms and its severity from one person to the next.", "Suspension of disbelief, sometimes called willing suspension of disbelief, is the intentional avoidance of critical thinking or logic in examining something unreal or impossible in reality, such as a work of speculative fiction, in order to believe it for the sake of enjoyment.", "There is a clear sense in which Aristotle is correct in speaking of such a thing as right or proper anger. Anger can serve a number of useful, even vital, functions. It can put an end to a bodily, emotional, or social threat, or, failing that, it can mobilize mental and physical resources for defensive or restitutive action. If judiciously exercised, it can enable a person to signal high social status, compete for rank and position, ensure that contracts and promises are fulfilled, and even inspire positive feelings such as respect and sympathy. A person who is able to exercise anger judiciously is likely to feel better about himself, more in control, more optimistic, and more prone to the sort of risk-taking that promotes successful outcomes.", "The philosopher Aristotle discusses anger at great length. In the Nicomachean Ethics, he says that a good-tempered person can sometimes get angry, but only as he ought to. Such a person, he continues, might get angry too soon or not enough, yet still be praised for being good-tempered. It is only if he deviates more markedly from the mean with respect to anger that he becomes blameworthy, either 'irascible' at one extreme or 'lacking in spirit' at the other.", "Contempt is often described as a combination of anger and disgust, and can be either hot or cold. The cardinal feature of contempt is the denial or rejection of a particular claim to respect or standing on the grounds that it is unjustified, often because the person making the claim has violated some norm or expectation and thereby compromised him- or her-self. Thus understood, contempt is an attempt at invalidating the claims of its object, and, in so doing, reinforcing those of its subject.", "Anger is an acute response to a concrete or symbolic threat, and aims to avert or defuse that threat. In contrast, resentment is more chronic or long-term and largely internalized. Even so, resentment can give rise to retaliatory action, sometimes violent but often of a subtler nature than that born of anger.", "Anger is perhaps best defined or understood negatively, by comparing and contrasting it with overlapping emotions such as resentment, contempt, irritability, hatred, and loathing.", "Anger is a common and potentially destructive emotion that turns many a human life into a living hell."];
    philosophy[WEB] = ["Arachnophobia refers to the intense fear of spiders, or spider phobia. While it's not uncommon for people to dislike arachnids or insects, phobias of spiders can have a far more significant impact on your life.", "The chief task in life is simply this: to identify and separate matters so that I can say clearly to myself which are externals not under my control, and which have to do with the choices I actually control.", "It is not surprising, therefore, that he explains that the most important task of an individual is to know what is and what is not within their control.", "In a more general sense, a puppet is any person who is controlled by another by reasons of (for instance) undue influence, intellectual deficiency, or lack of character or charisma.", "The word puppet can mean a political leader installed, supported and controlled by powerful external forces, without legitimacy in the country itself. In modern times, this usually implies no democratic mandate from the country's electorate; in earlier times, it could have meant a monarch imposed from outside, who was not a member of a country's established ruling dynasty, or unrecognised by its nobility. 'Puppet government', 'puppet regime' and 'puppet state' are derogatory terms for a government which is in charge of a region or country, but only through being installed, supported and controlled by a more powerful outside government.", "A puppet is an object, often resembling a human, animal or mythical figure, that is animated or manipulated by a person called a puppeteer.", "There's a philosophy out there that we can motivate almost anyone to do their job...no matter what that job is. It's specifically referencing people who are unmotivated or the under-motivated. It insinuates that people are like puppets and we can get them to do or not do whatever we want. This Puppet Philosophy suggests we can not only motivate others but we can also take away their motivation as well.", "An email hoax describes the attacks by the South American Blush Spider in public toilets.", "The widespread urban legend that one swallows a high number of spiders during sleep in one's life has no basis in reality. A sleeping person causes all kinds of noise and vibrations by breathing, the beating heart, snoring etc. all of which warn spiders of danger.", "The spider is also found in modern children's tales. The nursery rhymes 'Itsy Bitsy Spider' and 'Little Miss Muffet' have spiders as focal characters.", "The spider is depicted as hiding the ultimate reality with the veils of illusion.", "The spider, along with its web, is featured in mythological fables, cosmology, artistic spiritual depictions, and in oral traditions throughout the world since ancient times. In Ancient Egypt, the spider was associated with the goddess Neith in her aspect as spinner and weaver of destiny.", "Philosophers often use the spider's web as a metaphor or analogy, and today terms such as the Internet or World Wide Web evoke the inter-connectivity of a spider web.", "The spider has symbolized patience and persistence due to its hunting technique of setting webs and waiting for its prey to become ensnared. Numerous cultures attribute the spider's ability to spin webs with the origin of spinning, textile weaving, basket weaving, knotwork and net making. Spiders are associated with creation myths because they seem to weave their own artistic worlds.", "Throughout history, spiders have been depicted in popular culture, mythology and in symbolism. From Greek mythology to African folklore, the spider has been used to represent a variety of things. It is also a symbol of mischief and malice for its toxic venom and the slow death it causes, which is often seen as a curse.[1] In addition, the spider has inspired creations from an ancient geoglyph to a modern steampunk spectacle. Spiders have been the focus of fears, stories and mythologies of various cultures for centuries."];
    philosophy[ROYALTY] = ["Thus, the key to the notion of the “philosopher king” is that the philosopher is the only person who can be trusted to rule well. Philosophers are both morally and intellectually suited to rule: morally because it is in their nature to love truth and learning so much that they are free from the greed and lust that tempts others to abuse power and intellectually because they alone can gain full knowledge of reality, which in Books V through VII of the Republic is argued to culminate in knowledge of the forms of Virtue, Beauty, and, above all, the Good.", "The ideal of a philosopher king was born in Plato's dialogue Republic as part of the vision of a just city.", "It seems that a monarchy is particularly useful for controlling small (and unremarkable) populations. Aristotle muses after admitting that aristocracy is preferable to monarchy 'provided that it is possible to find a number of people who are similar' : 'Perhaps this too is the reason people were formerly under kingships - because it was rare to find men who were very outstanding in virtue, particularly as the city-states they lived in at that time were small'.", "Monarchy is justifiable if the king has practical wisdom and virtue far superior to his subjects.", "A monarch needs to be a conduit through which reason is expressed and actualized, not a power that might obstruct this process. ", "The divine right of kings, or divine-right theory of kingship, is a political and religious doctrine of royal and political legitimacy. It asserts that a monarch is subject to no earthly authority, deriving his right to rule directly from the will of God."];
    philosophy[ENDINGS] = ["For classical Greek thought the finite was the perfect, which meant the completed, the determinate or well-defined, or the intelligible (since definition itself is delimitation).", "Finitism is a philosophy of mathematics that accepts the existence only of finite mathematical objects. It is best understood in comparison to the mainstream philosophy of mathematics where infinite mathematical objects (e.g., infinite sets) are accepted as legitimate.", "A specific type of Multiple Endings, where the player makes a Last-Second Ending Choice by taking a final stand on the Central Theme of the game, which may be presented as a Driving Question that they must answer with their choice. When done well, it presents to the player a moral dilemma with no clear right answer, ideally preceded by arguments for and against each position they can take on it.", "The question posed in this paper is: Is there an end to some type of activity which is the end of any rational agent? It approaches an answer by a critical examination of one view of human beings that excludes this possibility, that advanced by Harry Frankfurt. It is argued that once we have distinguished, as Frankfurt does not, that which we have good reason to care about from that which we do not have good reason to care about, we are able to identify a conception of a final end for human activity, one that we put to work when wee consider the ways in which a life may have gone wrong and one that we find indispensable for our understanding of narrative.", "As audiences, we expect endings that give us a sense of philosophical victory, and by withholding such endings, postmodern writers like DeLillo can achieve a negative version of the power Arndt describes.", "A great ending, then, according to Arndt is one in which (among other things) the underdog philosophical values triumph over the dominant ones.", "In order for an ending to work, the story has to have from the beginning an effective set of stakes.", "It has been said that, “Life is like a novel with the end ripped out.” We don't know how the ending will be like, and we don't get any sneak peeks. It also means that we don't truly end when we pass away. No matter who we are, what we've done in our lives, we pass on something of ourselves every day of our lives.", "There are different kinds of endings, but they all result in the same thing the close of a story. When a story is really good, we don't want it to end.", "There is no such thing as a happy ending, only happy middles and beginings."];
    philosophy[KNOWING] = ["Loosely speaking, justification is the reason that someone holds a rationally admissible belief, on the assumption that it is a good reason for holding it. Sources of justification might include perceptual experience (the evidence of the senses), reason, and authoritative testimony, among others. Importantly however, a belief being justified does not guarantee that the belief is true, since a person could be justified in forming beliefs based on very convincing evidence that was nonetheless deceiving.", "Truth is the property or state of being in accordance with facts or reality.", "All three senses of 'knowing' can be seen in our ordinary use of the word. In mathematics, you can know that 2 + 2 = 4, but there is also knowing how to add two numbers, and knowing a person (e.g., knowing other persons,[18] or knowing oneself), place (e.g., one's hometown), thing (e.g., cars), or activity (e.g., addition). While these distinctions are not explicit in English, they are explicitly made in other languages, including French, Portuguese, Spanish, Romanian, German and Dutch (although some languages related to English have been said to retain these verbs, such as Scots).[note 1] The theoretical interpretation and significance of these linguistic issues remains controversial.", "Philosophers tend to draw an important distinction between three different senses of 'knowing' something: 'knowing that' (knowing the truth of propositions), 'knowing how' (understanding how to perform certain actions), and 'knowing by acquaintance' (directly perceiving an object, being familiar with it, or otherwise coming into contact with it).", "Nearly all debates in epistemology are in some way related to knowledge. Most generally, 'knowledge' is a familiarity, awareness, or understanding of someone or something, which might include facts (propositional knowledge), skills (procedural knowledge), or objects (acquaintance knowledge).", "Philosophical skepticism, which questions the possibility of knowledge, and related problems, such as whether skepticism poses a threat to our ordinary knowledge claims and whether it is possible to refute skeptical arguments.", "The structure of a body of knowledge or justified belief, including whether all justified beliefs must be derived from justified foundational beliefs or whether justification requires only a coherent set of beliefs.", "The philosophical analysis of the nature of knowledge and the conditions required for a belief to constitute knowledge, such as truth and justification.", "Epistemology is the branch of philosophy concerned with knowledge. Epistemologists study the nature, origin, and scope of knowledge, epistemic justification, the rationality of belief, and various related issues. Epistemology is considered one of the four main branches of philosophy, along with ethics, logic, and metaphysics."];
    philosophy[GUIDING] = ["The Socratic method searches for general, commonly held truths that shape beliefs and scrutinizes them to determine their consistency with other beliefs. The basic form is a series of questions formulated as tests of logic and fact intended to help a person or group discover their beliefs about some topic; exploring definitions, and seeking to characterize general characteristics shared by various particular instances.", "The Socratic method (also known as method of Elenchus, elenctic method, or Socratic debate) is a form of cooperative argumentative dialogue between individuals, based on asking and answering questions to stimulate critical thinking and to draw out ideas and underlying presuppositions.", "How might you learn new skills? How do you know when you've taught effectively?", "How have your attitudes towards teaching and learning changed over time? How will you use student evaluations to improve your teaching?", "How will you continue growing as a teacher? What goals do you have for yourself and how will you reach them?", "What methods will you consider to reach these goals and objectives? What are your beliefs regarding learning theory and specific strategies you would use, such as case studies, group work, simulations, interactive lectures?", "What skills should students obtain as a result of your teaching? Think about your ideal student and what the outcomes of your teaching would be in terms of this student's knowledge or behavior.", "What does a perfect teaching situation look like to you and why? How are the values and beliefs realized in classroom activities?", "What are your values, beliefs, and aspirations as a teacher? Do you wish to encourage mastery, competency, transformational learning, lifelong learning, general transference of skills, critical thinking?", "What do you mean by learning? What happens in a successful learning situation? Note what constitutes 'learning' or 'mastery' in your discipline.", "Your teaching philosophy is a self-reflective statement of your beliefs about teaching and learning. It's a one to two page narrative that conveys your core ideas about being an effective teacher in the context of your discipline.", "The study focuses on key concepts expressed by all of the Pioneers as important and develops recommendations for other instructors beginning to use the Internet for instructional purposes.", "It is the philosophy of early childhood educators to provide an environment in which children are supported and understood. This happens through creating a positive environment, daily interactions and being knowledgeable about children at an early childhood age."];
    philosophy[CRAFTING] = ["Whereas smithing motifs and smithing figures have regularly been approached through archetypal and comparative methodologies, this thesis attempts to broaden our understanding of these motifs in relation to specific literary, social and technical features of metalworking in early medieval Scandinavia.", "Craft is good for us. It feels good, looks good, and according to these Greats, just the very practice of it is good. The problem is, most of us don't know how to do it anymore. We often don't even know where to start.", "Moral behaviour begins with the good practice of a profession, trade or art... it is through these everyday social practices that people develop the virtues necessary to flourish.", "Aristotle was pretty big on having a purpose in life, and thus acting according to your nature.  The 'common sense philosopher' insists that the craftsmanship, not the craftsman, is what matters, so that it is not the wood turner who produces the spindle, but the craft of wood turning within him. ", "Aristotle had a very healthy appreciation of craft and more specifically, craftsmanship and he was not the only philosopher to make links between craft and virtue. It is rather fascinating to uncover that the deep satisfaction that comes from making things is an integral part of human intelligence and endeavour.", "Aristotle made strong links between virtue and craft. This is perhaps not surprising when we consider that the 'Father of Ethics' defined virtue as 'having excellent and well chosen habits.'"];
    philosophy[LANGUAGE] = ["In Humboldt's humanistic understanding of linguistics, each language creates the individual's worldview in its particular way through its lexical and grammatical categories, conceptual organization, and syntactic models.", "In 1820, Wilhelm von Humboldt connected the study of language to the national romanticist program by proposing the view that language is the fabric of thought. Thoughts are produced as a kind of internal dialog using the same grammar as the thinker's native language.", "Roger Bacon held the opinion that language was but a veil covering up eternal truths, hiding them from human experience. For Immanuel Kant, language was but one of several tools used by humans to experience the world.", "Plato held instead that the world consisted of eternal ideas and that language should reflect these ideas as accurately as possible.", "The idea that language and thought are intertwined is ancient. Plato argued against sophist thinkers such as Gorgias of Leontini, who held that the physical world cannot be experienced except through language; this made the question of truth dependent on aesthetic preferences or functional consequences.", "Some effects of linguistic relativity have been shown in several semantic domains, although they are generally weak. Currently, a balanced view of linguistic relativity is espoused by most linguists holding that language influences certain kinds of cognitive processes in non-trivial ways, but that other processes are better seen as arising from connectionist factors. Research is focused on exploring the ways and extent to which language influences thought.", "The principle of linguistic relativity and the relation between language and thought has also received attention in varying academic fields from philosophy to psychology and anthropology, and it has also inspired and colored works of fiction and the invention of constructed languages.", "The weak version says that linguistic categories and usage only influence thought and decisions.[4] Research on weaker forms has produced positive empirical evidence for a relationship.", "The strong version, or linguistic determinism, says that language determines thought and that linguistic categories limit and determine cognitive categories. This version is generally agreed to be false by modern linguists.[3]", "Linguistic relativity has been understood in many different, often contradictory ways throughout its history.[1] The idea is often stated in two forms: the strong hypothesis, now referred to as linguistic determinism, was held by some of the early linguists before World War II,[2] while the weak hypothesis is mostly held by some of the modern linguists.", "The claim that Eskimo languages (specifically, Yupik and Inuit) have an unusually large number of words for 'snow', first loosely attributed to the work of anthropologist Franz Boas and particularly promoted by his disciple Benjamin Lee Whorf,[1][2] has become a cliché often used to support the controversial linguistic-relativity hypothesis (also known as 'Whorfianism'), which posits that a language's vocabulary (among other features) shapes its speakers' view of the world."];
    philosophy[BUGS] = ["Entomophobia is an extreme and persistent fear of insects. It's what's referred to as a specific phobia, which is a phobia that focuses on a particular object. An insect phobia is one of the most common types of specific phobia.", "Invertebrates have long been overlooked in the study of consciousness. The time has come to take them seriously as a scientific and philosophical model for the evolution of subjective experience.", "Studying insects is a powerful way to study basic forms of consciousness. The honeybee brain has less than a million neurons, which is roughly five orders of magnitude fewer than a human. That is a lot easier to study.", "That is strong reason to think that insects and other invertebrates are conscious. Their experience of the world is not as rich or as detailed as our experience – our big neocortex adds something to life! But it still feels like something to be a bee.", "The insect central complex ties together memory, homeostatic needs and perception in the same integrated way. This integration has the same function as well: to enable effective action selection.", "While insect brains are minute – the largest are far smaller than a grain of rice – new research has shown that they perform the same ancient functions as the human midbrain.", "Even if insect behaviour is very unlike our own, there might be important similarities between their brains and ours. On this new approach, we can thus ask whether the insect brain has the structures that could support a basic capacity for any form of consciousness.", "Behavioural analogies become harder when we consider animals such as insects, which don't look or act much like us. We might say that a bee is angry when we disturb its hive. But an angry bee doesn't act much like an angry toddler, so it's easy to remain sceptical. Behaviour alone certainly doesn't prove that any animal is conscious.", "It is worth clarifying what we mean when we talk about insect consciousness, since the term consciousness carries a lot of baggage. Everyone agrees that bees can take in environmental information and perform impressive computations on it.", "Are insects merely tiny robots? Or, in the phrase popularised by the philosopher Thomas Nagel, is there something it is like to be a bee?", "Do bees like the taste of nectar? Does the ant foraging for your crumbs feel better when she finds one?", "Caught between the animal and plant kingdoms, insects force us to confront and reevaluate our notions of gender, family, society, struggle, the division of labor, social organization, and individual and collective intelligence.", "Exploring the questions of what insects are and what scientific, aesthetic, ethical, and historical relationships they have with humanity, he argues that they force us to reconsider our ideas of the animal and the social. ", "Insects confront us with the limits of what is imaginable, while at the same time being essential to the everyday functioning of all terrestrial ecosystems.", "The world of insects is at once beneath our feet and unfathomably alien. Small and innumerable, insects surround and disrupt us even as we scarcely pay them any mind.", "Insects confront us with the limits of what is imaginable, while at the same time being essential to the everyday functioning of all terrestrial ecosystems."];
    philosophy[ADDICTION] = ["It can be fun and equally harmless if you're playing every now and then with very low stakes, but it can also be extremely destructive, just like any addiction. No doubt everyone has heard of or experienced first hand the damage a gambling addiction can cause both financially and personally.", "Some people believe that confronting problem gamblers with the 'reality' of mathematics – a kind of mathematical counselling, often called 'facing the odds' – can help them overcome it.", "What is the difference between investing and gambling that makes one rational and the other not. Barrett says that risk taking is not a sufficient condition for gambling. Investment isn't a zero-sum game, that is, there does not have to be losers if there are winners. Barrett thinks that gambling is irrational if your aim is to improve your well-being by it.", "What is gambling? All forms of gambling involve risk taking, but is risk taking a sufficient condition for gambling? Gambling involves luck, but is luck a coherent concept?", "Rolling the dice in a game you're rigged to lose sounds like a bad idea. So why is it so much fun? Is gambling an exciting pastime, or a vicious addiction?", "Gambling has always been described as a bad habit. ... A gambler enjoys only doing this deed, regardless of the money he or she will win as a result of gambling. Just like the same happiness, a gambler loves the journey itself, not the end of the journey.", "Most of us have been trained to use more forgiving language when talking about addiction. We call it a disease. We say that people with addiction should be helped, not blamed.", "The data shows that we could save many lives by expanding medication-assisted treatments and adopting harm reduction policies like needle exchange programs. Yet neither of these policies has been widely embraced.", "Addiction is a disease that requires a whole person treatment approach.", "Addiction takes a heavy toll on those afflicted and the people who love them."];
    philosophy[SPYING] = ["Ommetaphobia may not be as widely known as other types of phobias. However, its effects may be very significant for those who struggle with it. Avoiding eyes will only get you so far.", "We called it scopophobia — a morbid dread of being seen. In minor degree, it is morbid shamefacedness, and the patient covers the face with his or her hands. In greater degree, the patient will shun the visitor and escape from his or her sight where this is possible.", "Social anxiety disorder (also called social phobia) is a mental health condition. It is an intense, persistent fear of being watched and judged by others. This fear can affect work, school, and your other day-to-day activities. It can even make it hard to make and keep friends.", "Professional standards require intelligence professionals to lie, hide information, or use covert tactics to protect their 'cover,' access, sources, and responsibilities.", "Some of the virtues required for intelligence work, such as discretion, loyalty and tenacity, are also instrumental to professions like diplomacy, the military, law, business and journalism.3 But many of the skills and character traits drawn upon and reinforced by the profession of intelligence are very different from those expected of the average citizen or other professionals.", "This gap in the literature may be due in part to the lingering influence of the idea that ethical principles are not appropriate to apply to 'statecraft' or international politics, as if doing so one makes a kind of 'category mistake.' But an amoralist view of international relations clearly cannot be sustained. ", "The sources and methods of espionage, the goals and tactics of covert action, and the professional conduct of intelligence officers are matters typically hidden from public scrutiny, yet clearly worthy of public debate and philosophical attention.", "Overall, most writers defend the value of privacy protection despite the difficulties inherent in its definition and its potential use to shield abuse.", "Discussion of the concept is complicated by the fact that privacy appears to be something we value to provide a sphere within which we can be free from interference by others, and yet it also appears to function negatively, as the cloak under which one can hide domination, degradation, or physical harm.", "Nevertheless, most theorists take the view that privacy is a meaningful and valuable concept. Philosophical debates concerning definitions of privacy became prominent in the second half of the twentieth century, and are deeply affected by the development of privacy protection in the law.", "There are several skeptical and critical accounts of privacy. According to one well known argument there is no right to privacy and there is nothing special about privacy, because any interest protected as private can be equally well explained and protected by other interests or rights, most notably rights to property and bodily security.", "The term “privacy” is used frequently in ordinary language as well as in philosophical, political and legal discussions, yet there is no single definition or analysis or meaning of the term."];
    philosophy[CLOWNS] = ["exigua replaces the tongue, some feed on the host's blood and many others feed on fish mucus. This is the only known case of a parasite assumed to be functionally replacing a host organ. When a host fish dies, C. exigua, after some time, detaches itself from the tongue stub and leaves the fish's mouth cavity.", "Most clowns aren't hiding anything, except maybe a bunch of fake flowers or a balloon animal.", "Then there's the 1892 Italian opera, Pagliacci (Clowns), in which the cuckolded main character, an actor of the Grimaldian clown mold, murders his cheating wife on stage during a performance. Clowns were unsettling—and a great source for drama.", "That Dickens's version of Grimaldi's memoirs was massively popular meant that this perception, of something dark and troubled masked by humor, would stick.", "Grimaldi made the clown the leading character of the pantomime, changing the way he looked and acted. Before him, a clown may have worn make-up, but it was usually just a bit of rouge on the cheeks to heighten the sense of them being florid, funny drunks or rustic yokels. Grimaldi, however, suited up in bizarre, colorful costumes, stark white face paint punctuated by spots of bright red on his cheeks and topped with a blue mohawk. ", "“Mischief” is one thing; homicidal urges is certainly another. What's changed about clowns is how that darkness is manifest", "Clowns, as pranksters, jesters, jokers, harlequins, and mythologized tricksters have been around for ages.", "Most clowns aren't trying to be odd. They're trying to be silly and sweet, fun personified. ", "Very few children like clowns. They are unfamiliar and come from a different era. They don't look funny, they just look odd.", "You aren't alone in your fear of makeup-clad entertainers; people have been frightened by clowns for centuries", "Clowns are treated as a symbol which means that actual professional clowns are left aside from this analysis.", "Clowns will be treated as an embodiment of humour and champions of the peculiar relationship between violence and humour. The main argument is that clowns reveal the inherent violent nature of humour in various ways. ", "How is it possible that clowns, the epitomes of humour and bringers of joy, can do the most horrible deeds?", "To discuss the relationship between humour and violence from a philosophical perspective, it is necessary to analyze different forms of violence and humour to understand in which ways humour can be violent and violence humorous.", "Clown history is not cement that hardens around our feet holding us in place.  It is a foundation forming a launch pad for our future.  However, if our foundation is slanted by bias or misinformation we will be tilted off course.  That is one reason why accurate clown history is important.", "Tramp clowns were not allowed to juggle because it was inconsistent with the slow movement required of them.", "What philosophy can we derive from this history?  First, that clowning is not bound by rigid rules.  The history of clowning is one of creativity and evolution.    Specific clown characters generally start as the stupid victim, gradually become the clever rogue, transform into the authoritarian, and then fade away.", "The appearance of the Whiteface clown has also evolved.  Joseph Grimaldi's costumes in the early nineteenth century were colorful but not elegant.  The very beautiful style of clothing that we associate with the classic Whiteface clown was developed during the twentieth century as the character became more of an authority figure than a prankster.", "The appearance of the characters evolved in correspondence to the evolution of their status.  Originally Harlequin's costume had randomly placed irregular shaped patches.  By the time he turned into a rogue, the patches were formalized into a diamond pattern covering the costume.  As an authoritarian character, Harlequin wore satin clothing trimmed with ribbons.", "In order to have any movement forward in clowning, you have to have a philosophy of clowning.  In order to have a philosophy of clowning, you have to have a history of clowning.", "A clown rarely became rich and noble but he often got clouts. Dressed up in a cap with bells, he was a little tyrant and at the same time, a victim of the crowd. ... A clown adorning your ornaments symbolizes humor, playfulness, talent, carelessness, volatility of life, acting, luck, etc.", "Clowning is about the freedom that comes from a state of total, unconditional acceptance of our most authentic selves, warts and all. It offers us respite from our self-doubts and fears, and opens the door to joy. And the best part is, we are all already our clowns."];
    philosophy[DOLLS] = ["", "Perceptual tension occurs when an individual perceives conflicting cues to category membership, such as when a humanoid figure moves like a robot, or has other visible robot features. This cognitive conflict is experienced as psychological discomfort (i.e., 'eeriness'), much like the discomfort that is experienced with cognitive dissonance.", "The existence of artificial but humanlike entities is viewed by some as a threat to the concept of human identity.", "If an entity looks sufficiently nonhuman, its human characteristics are noticeable, generating empathy. However, if the entity looks almost human, it elicits our model of a human other and its detailed normative expectations. The nonhuman characteristics are noticeable, giving the human viewer a sense of strangeness.", "Stimuli with human and nonhuman traits undermine our sense of human identity by linking qualitatively different categories, human and nonhuman, by a quantitative metric, degree of human likeness.", "Uncanny stimuli may activate a cognitive mechanism that originally evolved to motivate the avoidance of potential sources of pathogens by eliciting a disgust response. ", "Viewing an 'uncanny' robot elicits an innate fear of death and culturally supported defenses for coping with death's inevitability.... ", "If an object is obviously enough non-human, its human characteristics will stand out and be endearing; however, if that object reaches a certain threshold of human-like appearance, its non-human characteristics will stand out, and be disturbing.", "Uncanny feelings arise when there is an intellectual uncertainty about whether an object is alive or not.", "Lifelike or anatomically correct dolls are used by health professionals, medical schools and social workers to train doctors and nurses in various health procedures.", "Since ancient times, dolls have played a central role in magic and religious rituals and have been used as representations of deities.", "Exposure therapy usually starts off small. While your therapist is present, you may view a photograph of a doll and practice relaxation techniques. Later, with your therapist present, you may watch a short video about dolls, again working on breathing and relaxation. Eventually, you may be in the same room with your therapist with an actual doll as you perform your relaxation exercises.", "The fear experienced is out of proportion to the actual danger posed by the object (dolls). If the phobia becomes severe, a person with pediophobia may even re-organize their entire life just to avoid dolls.", "", "When automatonophobia develops because of a traumatic event related to human-like figures, it's known as an experiential phobia. This traumatic event could be a scary movie with human-like figures or an in-person event involving human-like figures.", "Automatonophobia causes an automatic, uncontrollable fear response to human-like figures. The sight or thought of these human-like figures can trigger anxiety for some people. Pediophobia is a fear of dolls and is a related phobia.", "Automatonophobia is a fear of human-like figures, such as mannequins, wax figures, statues, dummies, animatronics, or robots.", "Can you remember what it was like to play as a child?", "Many people associate dolls with fertility, so depending on how the doll appears, it could symbolize a desire to have children or fear of having children. For other people, dolls symbolize a desire to return to the innocence of childhood.", "Though The Stranger is a work of fiction, it contains a strong resonance of Camus's philosophical notion of absurdity. In his essays, Camus asserts that individual lives and human existence in general have no rational meaning or order."];
    philosophy[OBFUSCATION] = ["The psychological term for fear of the unknown is “xenophobia.” In modern usage, the word has evolved to mean the fear of strangers or foreigners — but its original meaning is much broader. It includes anything or anyone that's unfamiliar or unknown.", "Two can keep a secret if one is dead.", "Plato in The Republic advocates censorship in literature to avoid the corruption of youth.", "Even if noumena are unknowable, they are still needed as a limiting concept,[26] Kant tells us. Without them, there would be only phenomena, and since potentially we have complete knowledge of our phenomena, we would in a sense know everything.", "hese unknown somethings are manifested within the noumenon—although we can never know how or why as our perceptions of these unknown somethings via our physical senses are bound by the limitations of the categories of the understanding and we are therefore never able to fully know the 'thing-in-itself'.", "According to Kant, objects of which we are cognizant via the physical senses are merely representations of unknown somethings—what Kant refers to as the transcendental object—as interpreted through the a priori or categories of the understanding.", "By Kant's Critique, our minds may attempt to correlate in useful ways, perhaps even closely accurate ways, with the structure and order of the various aspects of the universe, but cannot know these 'things-in-themselves' (noumena) directly. ", "Humans can make sense out of phenomena in these various ways, but in doing so can never know the 'things-in-themselves', the actual objects and dynamics of the natural world in their noumenal dimension - this being the negative correlate to phenomena and that which escapes the limits of human understanding.", "Immanuel Kant first developed the notion of the noumenon as part of his transcendental idealism, suggesting that while we know the noumenal world to exist because human sensibility is merely receptive, it is not itself sensible and must therefore remain otherwise unknowable to us.", "The sense of philosophical mystery is an intellec tual reaction to what we do not know. It does not come merely from ignoranceȄthat is, the lack of knowledge or evidenceȄor from simply assuming that there is more to reality than we currently know.", "Can there be meaning in mystery, or is wonder––as a state of being lost for words in the face of mystery––rather antithetical to meaning?", "For Dufourmantelle, the secret is a powerful and dynamic thing: deadly if unheard or misused, perhaps, but equally the source of creativity and of ethics. An ethics of the secret, we can hear her say, means listening hard and sensitively, respecting the secret in its secret essence, unafraid of it and open to what it has to say."];
       philosophy[CENSORSHIP] = ["The psychological term for fear of the unknown is “xenophobia.” In modern usage, the word has evolved to mean the fear of strangers or foreigners — but its original meaning is much broader. It includes anything or anyone that's unfamiliar or unknown.", "Two can keep a secret if one is dead.", "Plato in The Republic advocates censorship in literature to avoid the corruption of youth.", "Even if noumena are unknowable, they are still needed as a limiting concept,[26] Kant tells us. Without them, there would be only phenomena, and since potentially we have complete knowledge of our phenomena, we would in a sense know everything.", "hese unknown somethings are manifested within the noumenon—although we can never know how or why as our perceptions of these unknown somethings via our physical senses are bound by the limitations of the categories of the understanding and we are therefore never able to fully know the 'thing-in-itself'.", "According to Kant, objects of which we are cognizant via the physical senses are merely representations of unknown somethings—what Kant refers to as the transcendental object—as interpreted through the a priori or categories of the understanding.", "By Kant's Critique, our minds may attempt to correlate in useful ways, perhaps even closely accurate ways, with the structure and order of the various aspects of the universe, but cannot know these 'things-in-themselves' (noumena) directly. ", "Humans can make sense out of phenomena in these various ways, but in doing so can never know the 'things-in-themselves', the actual objects and dynamics of the natural world in their noumenal dimension - this being the negative correlate to phenomena and that which escapes the limits of human understanding.", "Immanuel Kant first developed the notion of the noumenon as part of his transcendental idealism, suggesting that while we know the noumenal world to exist because human sensibility is merely receptive, it is not itself sensible and must therefore remain otherwise unknowable to us.", "The sense of philosophical mystery is an intellec tual reaction to what we do not know. It does not come merely from ignoranceȄthat is, the lack of knowledge or evidenceȄor from simply assuming that there is more to reality than we currently know.", "Can there be meaning in mystery, or is wonder––as a state of being lost for words in the face of mystery––rather antithetical to meaning?", "For Dufourmantelle, the secret is a powerful and dynamic thing: deadly if unheard or misused, perhaps, but equally the source of creativity and of ethics. An ethics of the secret, we can hear her say, means listening hard and sensitively, respecting the secret in its secret essence, unafraid of it and open to what it has to say."];

    philosophy[DARKNESS] = ["Scotomaphobia is the irrational fear of blindness. Someone suffering from this condition can expect to experience a very high amount of anxiety from merely thinking of blindness, let alone actually experiencing it.", "Darkness is a symbol of evil or mystery or fear. ... The emotional response to an absence of light has inspired metaphor in literature, symbolism in art, and emphasis. The story of the Light versus the Darkness is one that everyone thinks that they know. The Light is good and the Dark is bad.", "Darkness the absence of light, it obscures objects in its veil. It can hide wonders and dangers that lurk. ", "We need darkness to feed our spirit, protect our health and protect the health of our planet. Light at night may be a sign of life on Earth, but the darkness will proclaim our true intelligence.", "Darkness can encompass a primitive chaos, and the powers of that chaos; it is not essentially evil, yet it is largely associated with death and destruction, captivity and spiritual darkness.", "The philosophy of darkness is very simple, it will not let you go towards light and it loves to keep everyone in darkness and at the end make brother fight brother. For this first you need to understand what is light and where it is available. People think they are in light but in fact they are in dark.", "Nyctophobia is an extreme fear of night or darkness that can cause intense symptoms of anxiety and depression. A fear becomes a phobia when it's excessive, irrational, or impacts your day-to-day life. Being afraid of the dark often starts in childhood and is viewed as a normal part of development.", "Some people pulled the lamp-post down because they wanted an electric light; some because they wanted old iron; some because they wanted darkness, because their deeds were evil."];
    philosophy[KILLING] = ["Hoplophobia, (pronounced [ˌhɔpləˈfoʊbiə]), from the Greek hoplon, or weapon, is defined as the 'fear of firearms' or alternatively, a fear of weapons in general, and describes a specific phobia.", "Aichmophobia is a fear of sharp objects like knives, needles, or pencils. ", "Knife goes in. Blood comes out.", "Should we model justified killing in war on justified killing outside of war? Or, in focusing on the justification of killing in war, might we then discover that there are some non-canonical cases of permissible killing outside of war?", "This masks a deeper methodological disagreement: when thinking about the morality of war, should we start by thinking about war, or by thinking about the permissible use of force outside of war?", "The debate between reductivism and exceptionalism is overblown—the concept of “war” is vague, and while typical wars involve properties that are not instantiated in typical conflicts outside of war, we can always come up with far-fetched hypotheticals that don't involve those properties, which we wouldn't call “wars”. ", "Artificial hypotheticals have their place, but any conclusions they support must be tested against the messy reality of war.", "Any normative theory of war should pay attention both to what the laws of war should be, and to what we morally ought to do. These are two distinct but equally important questions. And they entail the importance of a third: what ought we to do all things considered, for example when law and morality conflict? ", "Some reject the very idea of the “morality of war”.[1] Of those, some deny that morality applies at all once the guns strike up; for others, no plausible moral theory could license the exceptional horrors of war."];
    philosophy[MUSIC] = ["Martial music or military music is a specific genre of music intended for use in military settings performed by professional soldiers called field musicians. Much of the military music has been composed to announce military events as with bugle calls and fanfares, or accompany marching formations with drum cadences, or mark special occasions as by military bands.", "It is often thought that music has the ability to affect our emotions, intellect, and psychology; it can assuage our loneliness or incite our passions. ", "There has been a strong tendency in the aesthetics of music to emphasize the paramount importance of compositional structure; however, other issues concerning the aesthetics of music include lyricism, harmony, hypnotism, emotiveness, temporal dynamics, resonance, playfulness, and color (see also musical development).", "In the pre-modern tradition, the aesthetics of music or musical aesthetics explored the mathematical and cosmological dimensions of rhythmic and harmonic organization. In the eighteenth century, focus shifted to the experience of hearing music, and thus to questions about its beauty and human enjoyment (plaisir and jouissance) of music.", "There was intense debate over absolute music versus program music during the late romantic era in the late 19th century.", "Explications of the concept of music usually begin with the idea that music is organized sound. They go on to note that this characterization is too broad, since there are many examples of organized sound that are not music, such as human speech, and the sounds non-human animals and machines make.", "What is meaning in relation to music?", "What is the connection between music and emotions? (in the 19th century a debate began over whether purely instrumental music could convey emotions and depict imaginary scenes)", "What does music history reveal to us about the world?", "What is the relationship between music and language?", "What is the relationship between music and mind?", "What is the definition of music? (what are the necessary and sufficient conditions for classifying something as music?)", "Philosophy of music is the study of 'fundamental questions about the nature of music and our experience of it'.[1] The philosophical study of music has many connections with philosophical questions in metaphysics and aesthetics. "];
    philosophy[DEFENSE] = ["By understanding of heroism as a universal characteristic of human nature, not as an unusual feature, heroism becomes something that stands in the line of possibilities for everyone, possibly inspiring us to answer that call.", "Historically, heroism has been closely connected with military service, although social heroism also deserves close research.", "Heroism consists of actions that must help others, even if it is a possibility and risk of the helper's injury or even death.", "The French word chevalier originally meant 'a man of aristocratic standing, and probably of noble ancestry, who is capable, if called upon, of equipping himself with a war horse and the arms of heavy cavalryman and who has been through certain rituals that make him what he is'.", "The code of chivalry that developed in medieval Europe had its roots in earlier centuries.", "Chivalry is a complex ethical and philosophical code that includes ideals like honesty, justice, courtesy and enterprise — all of which the world could use a bit more of. But “service to man” is at its core.", "Defending a group is permissible only if the benefits to the non-refusing victims is sufficient to render defense proportionate.", "What is the relationship between the morality of self-defense and the morality of defending others? One natural view is that the two share the same underlying rationale, such that the permissibility of other-defense goes “hand-in-hand” with the permissibility of self-defense.", "It seems unlikely that a defender satisfies necessity if they deliberately deprive themselves of less harmful means of defense, at least if they do so at the time of the attack. ", "If defensive harming is at least sometimes morally permissible, it needs to be explained how the use of force can be consistent with these rights.", "With the exception of strict pacifists, there is broad consensus in morality and law that defensive harm can be permissible in cases like this. However, as we shall see, it is surprisingly difficult to explain the grounds and limits of this permission.", "Killing and harming others are paradigmatic wrongs. And yet there is at least one intuitive exception to this prohibition—namely, killing or harming in self-defense, or in defense of others."];
    philosophy[QUESTING] = ["In narratology and comparative mythology, the hero's journey, or the monomyth, is the common template of stories that involve a hero who goes on an adventure, is victorious in a decisive crisis, and comes home changed or transformed.", "Heroes embody the best qualities in humans, but they almost always start out with nothing. Through the journey, they grow into all these characteristics by facing the challenges along their journey. One can't just tell kids to be kind, compassionate, loving, brave, or smart; these qualities need to be explained through a story.", "Many heroic stories follow the same plot line, outlined by Joseph Campbell, that helps them succeed on their quest and ultimately teach whatever moral or explain whatever concept is intended by the author (5).", "Many Greek myths focus on 'the hero's quest,' often involving challenging or difficult tasks the hero must complete to achieve a goal (4). There is often magical or supernatural forces at work as well (4).", "Unlike Gods, heroes are neither immortal nor all-powerful (4). They are the physical representation of the best attributes of human beings: demonstrating great strength, courage, wisdom, cleverness, or devotion (4). Ancient Greek culture depicts a strong, warrior hero who embarks on quests and faces many hardships (4). ", "A quest is a journey toward a specific mission or a goal. The word serves as a plot device in mythology and fiction: a difficult journey towards a goal, often symbolic or allegorical. Tales of quests figure prominently in the folklore of every nation and ethnic culture.", "The strange creature has the head and neck of a snake, the body of a leopard, the haunches of a lion, and the feet of a hart.", "First, “heroism involves some type of quest, which may range from the preservation of life to the preservation of an ideal”."];
}


//JUST for game mode, don't risk leaning on this too much
///example "You see several math equations floating in the air as you get acclimated to the CLASSROOM.
// There is a model anatomy skeleton in the corner.  There's a huge map of Zampanio on a wall."
//"there is" or "you see",or "there's" is going to be added by the system. don't worry.
const initLocDesc = () => {
    loc_desc[ART] = ["a painting of a sad clown on a wall", "splatters of paint on the floor", "a sculpture of your own face in the center"];
    loc_desc[TECHNOLOGY] = ["blinking and beeping dials and buttons along the walls", "circuitry woven into everything", "shiny chrome all along the walls"];
    loc_desc[SPACE] = ["a hologram that shows an unknown solar system", "a window that inexplicably seems to look out into an infinite sky", "a thick pane of glass behind which the infinite void of the stars is visible"];
    loc_desc[TIME] = ["a clock resolutely ticking on a wall", "a giant sundial in the middle", "a repeating hourglass motif built into the walls", "hundreds of cuckoo clocks along a wall"];
    loc_desc[STEALING] = ["iron bars bisecting the room", "a vault of fake treasure", "bags and bags of what first appears to be money"];
    loc_desc[FREEDOM] = ["open windows looking out to a sunlit plain", "feather motifs worked into the architecture of the room", "keys decorating every available nook and cranny"];
    loc_desc[FIRE] = ["an impossible bonfire in the center of the room", "every cherished childhood toy you have long sense forgotten in a pile in the center of the room, smoldering", "matches scattered around on the floor"];
    loc_desc[LONELY] = ["wall upon wall of portraits of empty faces", "scattered photos of everyone who has ever rejected you", "dozens of uncomfortable chairs and no one to fill them"];
    loc_desc[OCEAN] = ["decorative anchors strewn about", "a rug that almost seems to be the ocean if you look at it out of the corner of your eyes", "an entire scale replica of a tall ship you can climb around in", "a ship in a bottle"];
    loc_desc[FLESH] = ["walls made entirely of glistening raw meat", "a huge pile of animal meat in the center of the room", "steaks and fillets in various states of rotting nailed onto every surface"];
    loc_desc[BURIED] = ["drifts upon drifts of sand", "walls made entirely of dirt", "that the walls are slowly closing in"];
    loc_desc[SCIENCE] = ["beakers and testtubes strewn about", "a lab coat neatly hung up in a corner", "a model anatomy skeleton in the corner"];
    loc_desc[MATH] = ["complex equations hovering in mid air", "mathematical forumals scribbled onto every surface", "numbers worked in as motifs along all the walls"];
    loc_desc[TWISTING] = ["the growing realization in your own eyes that it doesn't make SENSE for all of these places to be rooms", "reflections of your face that are not your face and not reflections", "unending echoing fractals of this room through every mirror and window that are not mirrors or windows", "a laugh that is somehow visible and somehow mocking you", "a spiral that is NotASpiral twisting and changing as it watches you from behind the room", "a mirror endlessly reflecting itself"];
    loc_desc[DEATH] = ["a tombstone bearing your name in the center", "human remains strewn about", "an urn of ashes that clearly had once been human"];
    loc_desc[APOCALYPSE] = ["a fully armed nuclear bomb counting slowly down to oblivion in the center of the room", "piles upon piles of plastic that will never degrade", "a seagull partially fused with a set of plastic rings from a six pack of soda in the center of the room"];
    loc_desc[ANGELS] = ["statues of saints and angels everywhere you look", "stained glass windows depecting religious scenes", "an alter to a nameless god"];
    loc_desc[LIGHT] = ["blinding light in every direction", "lamps upon lamps upon lamps everywhere you look", "a gentle, helpful light"];
    loc_desc[SERVICE] = ["bells to ring for servants every few feet", "cleaning supplies clustered in a corner", "a list of chores that need completing along a wall"];
    loc_desc[FAMILY] = ["collection of family portraits of strangers lining the walls", "a baby's cradle in the center of the room", "a large dining room table with places set for a whole family"];
    loc_desc[MAGIC] = ["magical tomes flying every which way", "a large cauldron brewing something faintly magical", "a mystical rune taking up the entirety of the floor"];
    loc_desc[HEALING] = ["bandages and first aid kits neatly stacked up along a wall", "a large operating table in the center of the room", "healing potions and scrolls in a scattered pile"];
    loc_desc[PLANTS] = ["ferns and grass as far as the eye can see, growing right out of the floor", "potted plants lining the walls", "an entire forest impossibly contained in a single room"];
    loc_desc[HUNTING] = ["a butchered deer carcass laying right on the floor", "a gun rack lining the wall", "the footprints of something mysterious making its way through the room"];
    loc_desc[DECAY] = ["disgusting mold covering every surface", "a rotting corpse lying right on the floor", "a half opened fridge along a wall, lights off, reeking spoiled food"];
    loc_desc[CHOICES] = ["three smaller hallways bisecting the room", "a map of all possible choices impossibly small along a wall", "three small chests and the sinking feeling that only one can be opened"];
    loc_desc[ZAP] = ["a series of electrical pylons along a wall", "a tesla coil arcing bits of electricity at random throughout the room", "an electrified panel sparking dangerously in the center of the room"];
    loc_desc[LOVE] = ["a bed shaped like a heart", "a romantic candleit dinner laid out, complete with roses", "rose petals cutting a path through the room"];
    loc_desc[SOUL] = ["dozens and dozens of mirrors at odd angles", "a diamond the size of a person with each facet reflecting a different part of your soul", "a statue of yourself as the centerpiece of the room"];
    loc_desc[ANGER] = ["strobing lights and you hear the sounds of a riot", "every single thing that has ever pissed you off scrawled along every surface", "absolute bullshit no matter where you look"];
    loc_desc[WEB] = ["stringless puppets lying limply in a pile", "spider webs caked onto every surface", "scuttling spiders hiding everywhere", "gossamer threads connecting tauntly to each of your limbs, tugging you just as you believe you are chosing to move"];
    loc_desc[ROYALTY] = ["an ornate throne along the back of the room", "a small model of a castle, complete with ramparts", "crowns worked into the wallpaper, the furniture, the light fixures"];
    loc_desc[ENDINGS] = ["a velvety red curtain lining the walls", "dozens of books laid out on every surface, each open to their final page", "the final thought you somehow know you will ever have scrawled over and over on every surface"];
    loc_desc[KNOWING] = ["a collection of every possible book that could ever be written somehow squeezed into just a few bookshelves", "the sum of all human knowledge written impossibly small on every surface, if only you could read it", "everything you could ever have wished to know about Zampanio and its Truth"];
    loc_desc[GUIDING] = ["a compass the size of a person, resolutely pointed towards where you have not yet gone", "a map of all of Zampanio as it spirals in on itself, assuring you that nothing makes any geographic sense at all", "a link to a guide to Zampanio at https://zampaniosim.fandom.com/wiki/ZampanioSim_Wiki , with a warning that it is written by liars and madmen and a plea to add to it yourself and cement Truth inside of you"];
    loc_desc[CRAFTING] = ["a forge heated to be white hot along one wall", "an anvil that has broken in two in the center of the room", "an intricate loom that appears to be weaving fate itself"];
    loc_desc[LANGUAGE] = ["a dictionary containing every word in every language that will ever exist", "shelves upon shelves of fine literature", "piles of pens and ink pots and quills and parchment and papers strewn about"];
    loc_desc[BUGS] = ["millions upon millions of crawling insects covering every surface", "a wasp's nest in a corner", "clouds of flies hovering in the air"];
    loc_desc[ADDICTION] = ["slot machines and poker tables lining the walls", "syringes and paper packets strewn about", "bottles of alcohol broken in a pile"];
    loc_desc[SPYING] = ["CCTV displays covering the walls, most focused on you", "cameras swiveling to follow your every movement", "staring disembodied eyes peering out of every surface, watching you"];
    loc_desc[CLOWNS] = ["a lifesized figure of a clown slumped against one wall", "a miniature circus tent barely fitting inside the room", "a book of 1001 jokes that just lists out the last 1001 things you've done in obsessive detail"];
    loc_desc[DOLLS] = ["a tea party set out for a collection of broken dolls", "a faceless mannequin that somehow seems to always be oriented towards you", "eyeless dolls lining the walls"];
    loc_desc[OBFUSCATION] = ["mirrors lining the walls showing only your floating eyeballs and no other part of your body", "books where every word is blacked out", "endless ciphers scribbled onto every surface", "an unnatural blur making it hard to make out the specific details of the room"];
    loc_desc[CENSORSHIP] = ["mirrors lining the walls showing only your floating eyeballs and no other part of your body", "books where every word is blacked out", "endless ciphers scribbled onto every surface", "an unnatural blur making it hard to make out the specific details of the room"];

    loc_desc[DARKNESS] = ["a pool of utter blackness in the center of the room", "every lightbulb in the room has been smashed", "shadows that are darker than seems possible under every object"];
    loc_desc[KILLING] = ["splatters of blood along the wall and floor", "a bloody knife discarded on the floor", "a chalk outline of a figure clearly murdered"];
    loc_desc[MUSIC] = ["an ornate grand piano in the center of the room", "sheet music repurposed as wall paper", ""];
    loc_desc[DEFENSE] = ["suits of armor lining the walls", "a shield the size of a person hung up on one wall", "a single suit of armor waiting patiently in the center of the room"];
    loc_desc[QUESTING] = ["a list detailing the items for a complex scavenger hunt", "every quest you have ever recieved written endlessly along the walls", "brightly decorated easter eggs tucked into every crevice"];
}

//useful for quests, and the longer you're in the ThisIsAGame the more likely they are to spawn and HURT you.
const initMonsterDesc = () => {
    monster_desc[ART] = ["It carries a paintbrush dripping with blood.", "It drags dismembered statue parts behind it.", "It wears an incongrous artist's beret."];
    monster_desc[TECHNOLOGY] = ["Its inflamed flesh badly integrates with sparking circuitry.", "Its eyes are whirring cameras.", "Most of its body is metal and circuits.", "A single glowing red eye whirrs as it focus on you.", "It moves with robotic precision."];
    monster_desc[SPACE] = ["Its head towers over the clouds.", "It is terrifyingly huge.", "You can see the void of space in the depths of its eyes.", "When it breathes a vacuum is created, sucking things in.", "Its flesh is mottled with starscapes."];
    monster_desc[TIME] = ["It moves jerkily, sometimes as if through molasses other times as if fast-forwarded.", "It sometimes teleports backwards over and over as if caught in a time loop.", "Anything it touches decays to dust in seconds.", "It moves like a video streamed with dropped frames.", "Its every motion is like a stop motion film  missing frames."];
    monster_desc[STEALING] = ["Its missing its right hand from a clean cut.", "Gold coins spill from its tattered pockets and mouth.", "It grips a small dagger with white knuckled intensity."];
    monster_desc[FREEDOM] = ["A broken chain trails from its ankle.", "Chains threaded with keys wrap around its entire body.", "Its teeth are the jagged edges of brass keys.", "Its left leg has been chewed off into a ragged stump. Its own bloody mouth leaves no illusions as to what removed it."];
    monster_desc[FIRE] = ["The unsettling smell of delicious cooked meat wafts from its body as it burns.", "It is wracked with the pain of unending burning.", "Its entire body is endlessly on fire.", "It trails flames and destruction in its wake.", "Its flesh is blackened and charred."];
    monster_desc[LONELY] = ["It is achingly alone and unloved and always will be.", "It knows you reject it with your very core.", "The devestating awareness of how alone you are against it racks your body."];
    monster_desc[OCEAN] = ["Its breaths are a wet and sickly gasp as it caughs up bits of water and seaweed.", "It appears to have drowned several days ago and only now shambeled to shore.", "The stench of rotten fish and seaweed surrounds it."];
    monster_desc[FLESH] = ["Partially formed faces scream from all over its body.", "It is covered in eyes.", "It is covered in mouths.", "It has the wrong amount of limbs in all the wrong places.", "Its flesh is bulbous and wrong.", "It very clearly has too many bones in all the wrong places.", "Its skin is flayed, exposing the bare and pulsing muscle fibers.", "Its bloody, living, bones are on the outside of its flayed skin.", "Intestines spill out of its stomach and mouth."];
    monster_desc[BURIED] = ["Part of its body is buried in the dirt and clawing its way out.", "Every time it opens its mouth or eyes dirt pours out.", "Its breaths are strained and gasping with each exhale puffing dust out into the air.", "A cloud of choking dust surrounds it.", "The walls seem to press towards it, straining to crush it and anything near it."];
    monster_desc[SCIENCE] = ["It listlessly carries a beaker of an unknown chemical.", "Its wearing the remains of a lab coat.", "There are goggles over its head. They do nothing."];
    monster_desc[MATH] = ["Numbers circle its head.", "The number of limbs it has is fractal.", "Its head contains pure geometric shapes."];
    monster_desc[TWISTING] = ["Instead of a face it has a spiralling spring.", "Spirals and fractals are tattooed onto its flesh.", "All the bones are in its hands.", "Every time you look at it it is shaped differently.", "Its reflection is distorted and wrong in ways you can not pin down.", "Its eyes swirl with madness.", "It is lines of code in a program that doesn't even care about it very much.", "Its footprints leave behind the smell of madness.", "Every time you count its number of limbs or eyes you get a different number. You cannot bring yourself to stop counting.", "Its hair spirals and swirsl in ways that don't make sense.", "It is elongated and bulbous.", "Its limbs are thin and limp, like noodles.", "Its hands are the size of its torso.", "Its hands are sharp.", "Its laugh echoes in a fractal.", "Its smile stretches past the confines of its face."];
    monster_desc[DEATH] = ["Its head is a grinning skull.", "It drags a scythe behind it.", "You know for a fact that it is your fate to become it when you die."];
    monster_desc[APOCALYPSE] = ["It is covered in radiation burns.", "It rides a pale horse.", "It has old spikes driven through its body, inflamed and painfully healed.", "It drags a can of gasoline behind it."];
    monster_desc[ANGELS] = ["It has tattered and bloody feathered wings.", "You know in your bones that god has forsaken it.", "A razor sharp fallen halo cuts into its head and neck.", "Its wings are as black as sin."];
    monster_desc[LIGHT] = ["A blinding light pulses out of it every minute or so.", "Out of its eyes and mouth pour a blinding light.", "Its entire body pulses with blinding brillance every few seconds.", "Its veins glow dangerously."];
    monster_desc[SERVICE] = ["It constantly repeats 'How can I help you today'? in a brittle, cheerful voice.", "Its smile stretches painfully across its face.", "Its smile is stapled into place.", "Its smile is a rictus of pain and its eyes brim hate.", "Its smile appears genuine until you look into its eyes."];
    monster_desc[FAMILY] = ["It is surrounded by smaller versions of itself.", "It drags a small corpse of something that looks like itself behind it.", "It cradles a small thing that looks like itself in its arms."];
    monster_desc[MAGIC] = ["Anything it touches is magically turned into something else at random.", "It drags a broken wizard's staff behind it.", "It wears an incongrously cheerful wizard's hat with stars."];
    monster_desc[HEALING] = ["Wounds constantly open up on its body and then heal.", "Any weapon that pierces it remains stuck in place as the flesh closes up around it.", "It is dressed like a sexy nurse.", "Its blood appears to be max healing potions."];
    monster_desc[PLANTS] = ["Roots bulge through its veins, occasionally piercing skin to put out some leaves.", "A mushroom fruiting body pierces out from the top of its skull.", "A single blood-red flower blooms from the center of its chest."];
    monster_desc[HUNTING] = ["It waits for you to run.", "There is fur sprouting at random from its body.", "Its hunched and twisted into a parody of a wolf.", "Its fangs are dripping blood and drool in equal measure.", "It lopes on all fours.", "Its eyes glow with a predatory light."];
    monster_desc[DECAY] = ["Maggots are nesting in the empty sockets where its eyes used to be.", "Its body is riddled with holes that maggots crawl in and out of.", "Its flesh is rotting and decayed.", "Anything it touches rots into a congealed mess."];
    monster_desc[CHOICES] = ["You are aware of every motion it can make in the present and only in retrospect know what it actually did.", "When it moves you see every move it could have made at once until suddenly there is only the one it actually did.", "It only moves after several seconds of absolute stillness."];
    monster_desc[ZAP] = ["Electricity arcs out from its body to anything nearby.", "It jerks and twitches with constant, painful, shocks.", "Electricity sparks from its skin."];
    monster_desc[LOVE] = ["It is beautiful, in its own way.", "It wants you to know you never need to be alone again.", "It knows it is the only one who could ever TRULY love you.", "You know it would love you unconditionally.", "It sings of love and desire and you want to embrace it.", "It loves you."];
    monster_desc[SOUL] = ["Its face is yours but wrong.", "You know in your soul that it is you from a different timeline.", "It screams in your voice.", "Mirror shards are stutted throughout its body, some still bleeding and some healing around the glass."];
    monster_desc[ANGER] = ["It indescriminately destroys anything that makes a sound.", "It is smashing everything around it.", "It seems to be in an incoherent rage."];
    monster_desc[WEB] = ["Is wearing a bright red bowler hat.", "It has eight eyes and mandibles.", "Its limbs are connected to gossamer threads leading far away from it, tugging on it. Controlling it. It weeps and struggles but can not break free.", "It has too many limbs and each is spindly and black with small hairs.", "Spiders crawl in and out of a hole in its skull.", "Cobwebs cover it nearly entirely."];
    monster_desc[ROYALTY] = ["The tines of a crown erupt bloodily from its very skull.", "It drags a sceptre behind it.", "A crown appears to have been driven into its skull, down to the bone. Flaps of bloody skin droop down around the crown."];
    monster_desc[ENDINGS] = ["You know it is your end. You know the end is never the end. You cannot be free.", "It moves with a terrifying inevitability.", "It trails a velvet red curtain behind it."];
    monster_desc[KNOWING] = ["It knows your ever secret as well as you do yourself.", "It knows your every secret with unerring accuracy.", "It clutches a stained and rotting book to its chest.", "Somehow you know it used to be someone you knew very well. Yourself."];
    monster_desc[GUIDING] = ["It holds a torch.", "It points towards the nearest door.", "It tries to be telling you something, getting increasingly frustrated that you aren't understanding."];
    monster_desc[CRAFTING] = ["Nails are driven in sporadically across its body.", "It carries a large, blood-spattered hammer.", "It wears an apron covered in blood.", "It drags a large rusty ax behind it."];
    monster_desc[LANGUAGE] = ["It speaks a language you almost understand.", "It speaks in several voices at once.", "It speaks a language you somehow recall from your dreams."];
    monster_desc[BUGS] = ["Parts of its flesh seem to be a shifting mat of ants.", "Maggots and adult flies spill out of its mouth whenever it opens.", "Honey drips out of its empty eye sockets and bees go in and out of them at will."];
    monster_desc[ADDICTION] = ["It holds a broken beer bottle in one hand.", "It trails bloody playing cards behind it.", "Syringes are jabbed into it at random."];
    monster_desc[SPYING] = ["Its unblinking stare never leaves you.", "It is made of eyes.", "Dozens of eyes float behind it.", "Its flesh is riddled with staring eyes.", "There is a single, unblinking eye in the center of its face."];
    monster_desc[CLOWNS] = ["Its smiling like a dare.", "It has a red rubber clown nose.", "It has bright clown make up messily applied to its face.", "It wears a colorful curly wig."];
    monster_desc[DOLLS] = ["It wears a pretty dress and mary-janes.", "Its limbs appear to be ball-jointed.", "It wears a cracked porcelain mask."];
    monster_desc[OBFUSCATION] = ["Parts of it are invisible.", "Its features are blurry.", "It flickers in and out of visibility.", "You sometimes can't hear it at all."];
    monster_desc[DARKNESS] = ["Its shadow is bigger than you would expect.", "Its features are dripping shadows like water.", "Its visible only through its shadow."];
    monster_desc[KILLING] = ["Its foot and hand prints are always fresh blood.", "A tsunami of blood follows in its wake.", "It clutches various weapons in each hand.", "Its dripping with killing intent.", "It drags a fresh corpse behind it."];
    monster_desc[MUSIC] = ["Its teeth are yellowed piano keys.", "It clutches a microphone.", "It carries a broken guitar clutched its chest.", "Countless mouths scattered over its body sing in an endless choir."];
    monster_desc[DEFENSE] = ["It drags a battered and bloody shield behind it.", "Its skin is a hard and shiny carapace in places.", "Full plate armor appears to be welded to its joints."];
    monster_desc[QUESTING] = ["It is wearing the rusted out remains of formerly shining armor.", "It wears the tatters of a once proud cape.", "It drags a sack of items behind it that is leaking blood."];
}


const initSounds = () => {
    sound_possibilities[ART] = ["scribbling pens", "tapping chisels", "hushed silence"];
    sound_possibilities[TECHNOLOGY] = ["clicking keys", "router beeping", "whirring fans"];
    sound_possibilities[SPACE] = ["a backwards countdown", "rocket thrusters", "wind"];
    sound_possibilities[TIME] = ["ticking clocks", "an alarm clock beeping", "a metronome"];
    sound_possibilities[STEALING] = ["a security alarm blaring", "chains rustling", "dropping coins"];
    sound_possibilities[FREEDOM] = ["winds flapping", "locks opening", "hushed silence"];
    sound_possibilities[FIRE] = ["a fire alarm blaring", "a fire roaring", "a match being struck"];
    sound_possibilities[LONELY] = ["hushed silence", "wind", "no one at all"];
    sound_possibilities[OCEAN] = ["gentle waves", "a seagull screeching", "water"];
    sound_possibilities[FLESH] = ["uncomfortable squelching", "slapping meat", "bones grinding"];
    sound_possibilities[BURIED] = ["dirt shifting", "strained rock creaking", "the walls groaning as they get closer to you"];
    sound_possibilities[SCIENCE] = ["instruments beeping", "fans whirring", "a lecture"];
    sound_possibilities[MATH] = ["a note at exactly 261.63 Hz drawn out", "a sine wave", "a voice reciting the digits of pi"];
    sound_possibilities[TWISTING] = ["echoing laughter", "lies", "headache"];
    sound_possibilities[DEATH] = ["a funeral dirge", "a last gasp", "wailing sobs"];
    sound_possibilities[APOCALYPSE] = ["a nuclear warning siren", "instructions to seek shelter against radiation", "hushed silence"];
    sound_possibilities[ANGELS] = ["angelic singing", "a peaceful choir", "the trumpets of judgement"];
    sound_possibilities[LIGHT] = ["the hum of fluorescent bulbs", "a soft hum", "a light switch click on"];
    sound_possibilities[SERVICE] = ["cleaning", "distant servants", "service"];
    sound_possibilities[FAMILY] = ["children laughing", "children playing", "family dinner"];
    sound_possibilities[MAGIC] = ["a chanting ritual", "a summoning circle", "a spell being cast"];
    sound_possibilities[HEALING] = ["ambient hospital work", "a healing spell", "a nurse yelling 'stat'"];
    sound_possibilities[PLANTS] = ["leaves rustling", "branches rustling", "birds singing"];
    sound_possibilities[HUNTING] = ["something running away from you", "something crying out in fear and exhaustion", "growling"];
    sound_possibilities[DECAY] = ["walls collapsing from rot", "floor groaning with decay", "your own body starting to decay"];
    sound_possibilities[CHOICES] = ["hushed silence", "a game show", "a coin landing somewhere"];
    sound_possibilities[ZAP] = ["an electrical hum", "lightning striking", "a tesla coil"];
    sound_possibilities[LOVE] = ["romantic music", "a love ballad", "a happy sigh"];
    sound_possibilities[SOUL] = ["crystals clinking into each other", "a mirror shattering", "your own voice echoing"];
    sound_possibilities[ANGER] = ["an angry mob", "a riot", "nails on a chalkboard"];
    sound_possibilities[WEB] = ["spiders scurrying", "a hushed silence", "puppets clattering"];
    sound_possibilities[ROYALTY] = ["a royal procession", "courtiers murmoring", "a herald speaking"];
    sound_possibilities[ENDINGS] = ["a voice announcing 'The End'", "ending credits music", "goodbye for a world", "someone saying 'the end is never the end'"];
    sound_possibilities[KNOWING] = ["someone narrating everything you're doing as you do it", "all the secrets of the universe whispering themselves to you", "a voice listing out facts about the room in no particular order"];
    sound_possibilities[GUIDING] = ["a tour guide instructing you", "a teacher telling you what to do", "the help text being read aloud to you"];
    sound_possibilities[CRAFTING] = ["anvils being hammered", "wood being chopped", "yarn being spun"];
    sound_possibilities[LANGUAGE] = ["a language you've never heard before", "a story about a mysterious game that ends the world", "a voice reciting synonyms for lies"];
    sound_possibilities[BUGS] = ["a hive singing", "bugs squirming", "insects buzzing"];
    sound_possibilities[ADDICTION] = ["a jackpot being won", "cards being dealt", "a roulette being spun"];
    sound_possibilities[SPYING] = ["a camera shutter going off", "someone whispering", "window blinds being shut"];
    sound_possibilities[CLOWNS] = ["a horn being honked", "a calliope playing", "a circus organ playing"];
    sound_possibilities[DOLLS] = ["a teaparty", "plastic creaking", "ceramic breaking"];
    sound_possibilities[OBFUSCATION] = ["pig latin", "morse code", "tap code"];
    sound_possibilities[CENSORSHIP] = ["pig latin", "morse code", "tap code"];

    sound_possibilities[DARKNESS] = ["hushed silence", "a lightbulb breaking", "deep still water"];
    sound_possibilities[KILLING] = ["a knife plunging into flesh", "a gun going off", "a death gurgle"];
    sound_possibilities[MUSIC] = ["beautiful music", "singing", "a drum beating"];
    sound_possibilities[DEFENSE] = ["metal hitting metal", "a rallying cry", "clanking metal"];
    sound_possibilities[QUESTING] = ["leveling up", "a new quest", "a role playing game", "trumpets"];
}

const initFeelings = () => {
    feeling_possibilities[ART] = ["drying paint", "cold marble", "fresh canvas"];
    feeling_possibilities[TECHNOLOGY] = ["circuit boards", "smooth aluminum", "chrome"];
    feeling_possibilities[SPACE] = ["infinite space", "star stuff", "vacuum"];
    feeling_possibilities[TIME] = ["smooth glass", "petrified wood", "fosils"];
    feeling_possibilities[STEALING] = ["gold", "platinum", "jewels"];
    feeling_possibilities[FREEDOM] = ["feathers", "air", "clouds"];
    feeling_possibilities[FIRE] = ["ash", "charcoal", "embers"];
    feeling_possibilities[LONELY] = ["cold stone", "cold wood", "cold metal"];
    feeling_possibilities[OCEAN] = ["damp rocks", "water", "damp sand"];
    feeling_possibilities[FLESH] = ["meat", "flesh", "bone", "skin"];
    feeling_possibilities[BURIED] = ["dirt", "mud", "rock"];
    feeling_possibilities[SCIENCE] = ["chrome", "glass", "plastic"];
    feeling_possibilities[MATH] = ["raw numbers", "mathematically precise planks", "plastic"];
    feeling_possibilities[TWISTING] = ["angles", "shapes", "flavors"];
    feeling_possibilities[DEATH] = ["bone", "smooth wood", "marble"];
    feeling_possibilities[APOCALYPSE] = ["ash", "radiation", "grey goo"];
    feeling_possibilities[ANGELS] = ["feathers", "holy water", "relics"];
    feeling_possibilities[LIGHT] = ["solid light", "lightbulbs", "lampshades"];
    feeling_possibilities[SERVICE] = ["chains", "feathers", "cravats"];
    feeling_possibilities[FAMILY] = ["photographs", "toys", "gifts"];
    feeling_possibilities[MAGIC] = ["mythril", "mana", "essence"];
    feeling_possibilities[HEALING] = ["bandages", "syringes", "sheets"];
    feeling_possibilities[PLANTS] = ["leaves", "branches", "flowers"];
    feeling_possibilities[HUNTING] = ["fur", "bullets", "arrows"];
    feeling_possibilities[DECAY] = ["rot", "decaying animals", "rotting corpses"];
    feeling_possibilities[CHOICES] = ["paving stones", "wood", "coins"];
    feeling_possibilities[ZAP] = ["electricity", "batteries", "tesla coils"];
    feeling_possibilities[LOVE] = ["roses", "chocolate", "wine"];
    feeling_possibilities[SOUL] = ["gems", "mirrors", "your own skin"];
    feeling_possibilities[ANGER] = ["heat", "capsasin", "tear gas"];
    feeling_possibilities[WEB] = ["spider web", "cobwebs", "spiders"];
    feeling_possibilities[ROYALTY] = ["gold", "velvet", "fur"];
    feeling_possibilities[ENDINGS] = ["velvet", "cold marble", "wood"];
    feeling_possibilities[KNOWING] = ["paper", "ink", "parchment"];
    feeling_possibilities[GUIDING] = ["glass", "dirt", "metal"];
    feeling_possibilities[CRAFTING] = ["metal", "cloth", "wood"];
    feeling_possibilities[LANGUAGE] = ["paper", "parchment", "ink"];
    feeling_possibilities[BUGS] = ["carapaces", "worms", "worm casings"];
    feeling_possibilities[ADDICTION] = ["syringes", "gaming chips", "powder"];
    feeling_possibilities[SPYING] = ["glass", "cameras", "one-way mirros"];
    feeling_possibilities[CLOWNS] = ["rubber", "balloons", "hair"];
    feeling_possibilities[DOLLS] = ["porcelain", "plastic", "rubber"];
    feeling_possibilities[OBFUSCATION] = ["nothing at all", "nothingness", "void"];
    feeling_possibilities[CENSORSHIP] = ["nothing at all", "nothingness", "void"];

    feeling_possibilities[DARKNESS] = ["shadows", "darkness", "vantablack"];
    feeling_possibilities[KILLING] = ["blood", "knives", "bullets"];
    feeling_possibilities[MUSIC] = ["sheet-music", "brass", "wood"];
    feeling_possibilities[DEFENSE] = ["iron", "steel", "bronze", "leather"];
    feeling_possibilities[QUESTING] = ["gold", "platinum", "silver"];
}

const initTastes = () => {
    taste_possibilities[ART] = ["crayons", "paint", "paper"];
    taste_possibilities[TECHNOLOGY] = ["ozone", "metal", "plastic"];
    taste_possibilities[SPACE] = ["stars", "wind", "infinite cosmic power"];
    taste_possibilities[TIME] = ["the future", "the past", "the present"];
    taste_possibilities[STEALING] = ["gold", "silver", "wealth"];
    taste_possibilities[FREEDOM] = ["freedom", "independance", "birds"];
    taste_possibilities[FIRE] = ["ash", "fire", "destruction"];
    taste_possibilities[LONELY] = ["loneliness", "isolation", "depression"];
    taste_possibilities[OCEAN] = ["sea-salt", "the ocean", "water"];
    taste_possibilities[FLESH] = ["raw meat", "flesh", "your own blood"];
    taste_possibilities[BURIED] = ["dirt", "mud", "earth"];
    taste_possibilities[SCIENCE] = ["chemicals", "disinfectant", "acetone"];
    taste_possibilities[MATH] = ["raw math", "numbers", "pie"];
    taste_possibilities[TWISTING] = ["headaches", "corners", "fractals"];
    taste_possibilities[DEATH] = ["death", "mortality", "inevitability"];
    taste_possibilities[APOCALYPSE] = ["radiation", "twinkies", "canned food"];
    taste_possibilities[ANGELS] = ["wafers", "wine", "redemption"];
    taste_possibilities[LIGHT] = ["broken glass", "angel food cake", "foam"];
    taste_possibilities[SERVICE] = ["restaurant food", "feather dusters", "chains"];
    taste_possibilities[FAMILY] = ["soul food", "a home cooked meal", "family dinner"];
    taste_possibilities[MAGIC] = ["mana", "essence", "magic"];
    taste_possibilities[HEALING] = ["a healing potion", "bandaids", "antibiotic"];
    taste_possibilities[PLANTS] = ["leaves", "fruit", "flowers", "spices"];
    taste_possibilities[HUNTING] = ["cooked meat", "gunpowder", "bullets"];
    taste_possibilities[DECAY] = ["rot", "corruption", "decay"];
    taste_possibilities[CHOICES] = ["31 flavors", "options", "choice"];
    taste_possibilities[ZAP] = ["ozone", "electricity", "copper"];
    taste_possibilities[LOVE] = ["chocolate", "a kiss", "perfume"];
    taste_possibilities[SOUL] = ["your own spit", "mirrors", "window cleaner"];
    taste_possibilities[ANGER] = ["capsasin", "pure rage", "hatred"];
    taste_possibilities[WEB] = ["spider webs", "cobwebs", "spiders"];
    taste_possibilities[ROYALTY] = ["crown", "royal jelly", "cake"];
    taste_possibilities[ENDINGS] = ["the ending", "the end", "the finale"];
    taste_possibilities[KNOWING] = ["the knowledge of all things", "an apple", "knowledge"];
    taste_possibilities[GUIDING] = ["potential", "assistance", "nothing at all"];
    taste_possibilities[CRAFTING] = ["raw iron", "copper", "wood"];
    taste_possibilities[LANGUAGE] = ["ink", "a good book", "paper"];
    taste_possibilities[BUGS] = ["bugs", "flies", "bug droppings"];
    taste_possibilities[ADDICTION] = ["powder", "playing cards", "cigarette butts"];
    taste_possibilities[SPYING] = ["paranoia", "paranoia", "paranoia"];
    taste_possibilities[CLOWNS] = ["cake", "candy", "humor"];
    taste_possibilities[DOLLS] = ["plastic", "ceramic", "adj"];
    taste_possibilities[OBFUSCATION] = ["nothing at all"];
    taste_possibilities[CENSORSHIP] = ["nothing at all"];

    taste_possibilities[DARKNESS] = ["darkness"];
    taste_possibilities[KILLING] = ["blood", "murder", "blades"];
    taste_possibilities[MUSIC] = ["song"];
    taste_possibilities[DEFENSE] = ["metal", "leather"];
    taste_possibilities[QUESTING] = ["metal", "adventure"];
}

const initSmells = () => {
    smell_possibilities[ART] = ["paint", "dust", "paper"];
    smell_possibilities[TECHNOLOGY] = ["ozone", "plastic", "dust"];
    smell_possibilities[SPACE] = ["vacuum", "wind", "void"];
    smell_possibilities[TIME] = ["stale air", "the future", "the past"];
    smell_possibilities[STEALING] = ["wealth", "jail", "adventure"];
    smell_possibilities[FREEDOM] = ["freedom", "independance", "power"];
    smell_possibilities[FIRE] = ["smoke", "fire", "ash", "wood burning"];
    smell_possibilities[LONELY] = ["loneliness", "isolation", "depression"];
    smell_possibilities[OCEAN] = ["sea-salt", "an ocean breeze", "seaweed rotting"];
    smell_possibilities[FLESH] = ["sweat", "blood", "meat"];
    smell_possibilities[BURIED] = ["dirt", "dust", "mud"];
    smell_possibilities[SCIENCE] = ["acetone", "acid", "chemicals"];
    smell_possibilities[MATH] = ["raw numbers", "apple pie", "pie"];
    smell_possibilities[TWISTING] = ["headache", "code", "mazes"];
    smell_possibilities[DEATH] = ["death", "bones", "corpses"];
    smell_possibilities[APOCALYPSE] = ["radiation", "dust", "ash"];
    smell_possibilities[ANGELS] = ["incense", "redemption", 'justice'];
    smell_possibilities[LIGHT] = ["ozone"];
    smell_possibilities[SERVICE] = ["food", "cleaning chemicals", "wood polish"];
    smell_possibilities[FAMILY] = ["home cooked food", "family", "home"];
    smell_possibilities[MAGIC] = ["mana", "essence", "reagents"];
    smell_possibilities[HEALING] = ["antiseptic", "antibiotics", "cleaning chemicals"];
    smell_possibilities[PLANTS] = ["fertilizer", "earth", "flowers"];
    smell_possibilities[HUNTING] = ["prey", "blood", "fear"];
    smell_possibilities[DECAY] = ["rot", "decaying bodies", "decay"];
    smell_possibilities[CHOICES] = ["deceit", "justice", "lies"];
    smell_possibilities[ZAP] = ["ozone"];
    smell_possibilities[LOVE] = ["chocolate", "love", "romance"];
    smell_possibilities[SOUL] = ["yourself"];
    smell_possibilities[ANGER] = ["hatred", "anger", "violence"];
    smell_possibilities[WEB] = ["spider webs", "dust", "cob webs"];
    smell_possibilities[ROYALTY] = ["incense", "spices", "gold"];
    smell_possibilities[ENDINGS] = ["endings"];
    smell_possibilities[KNOWING] = ["knowledge"];
    smell_possibilities[GUIDING] = ["help"];
    smell_possibilities[CRAFTING] = ["dye", "a forge", "metal"];
    smell_possibilities[LANGUAGE] = ["ink", "paper", "old books"];
    smell_possibilities[BUGS] = ["honey", "a hive", "worms"];
    smell_possibilities[ADDICTION] = ["drugs", "cards", "money"];
    smell_possibilities[SPYING] = ["powder"];
    smell_possibilities[CLOWNS] = ["sweat", "sugar", "popcorn"];
    smell_possibilities[DOLLS] = ["plastic", "porcelain", "lavendar"];
    smell_possibilities[OBFUSCATION] = ["nothing at all"];
    smell_possibilities[CENSORSHIP] = ["nothing at all"];

    smell_possibilities[DARKNESS] = ["darkness"];
    smell_possibilities[KILLING] = ["death", "blood", "gunpowder"];
    smell_possibilities[MUSIC] = ["oil", "paper", "leather"];
    smell_possibilities[DEFENSE] = ["leather", "metal"];
    smell_possibilities[QUESTING] = ["hope"];
}

//used for skills or flavor text in quests
//things like A shower of healing sparks suffuses the area while a whirlwind of rose petals kicks up.
const initEffectPossibilities = () => {
    effect_possibilities[ART] = ["a torrent of paint oozes up from the ground", "paintbrushes clatter and clack in a swirling circle", "paper swirls in a dizzying whirlwind"];
    effect_possibilities[TECHNOLOGY] = ["sparks jutter and jolt in the air", "circuitry traces itself out in the very air", "numbers and equations swirl in the air"];
    effect_possibilities[SPACE] = ["a field of stars fades into existance", "a vast galaxy spins into view", "you suddenly feel incredibly small as the room grows larger and larger around you"];
    effect_possibilities[TIME] = ["a clock appears, its hands spinning wildly backwards", "melting clocks phase into existence, dripping on every surface", "the sound of steady ticking fills the air"];
    effect_possibilities[STEALING] = ["golden coins start falling from the sky", "a spotlight centers itself on you", "keys begin swirling around you"];
    effect_possibilities[FREEDOM] = ["a refreshing breeze kicks up", "feathers begin swirling in a whirlwind", "you get a strong sense of vertigo, as if you're falling while standing still"];
    effect_possibilities[FIRE] = ["smoke pours out of nowhere", "flames dance around the edges of the room", "the smell of smoke lingers in the air", "wood burning"];
    effect_possibilities[LONELY] = ["fog drifts in the air", "a crowd of indistinct figures press around you", "the weight of how alone you are presses into you"];
    effect_possibilities[OCEAN] = ["the smell of sea-salt is on the breeze", "water begins pooling around your feet", "the sound of seagulls fills the air"];
    effect_possibilities[FLESH] = ["meat begins pulsing from every surface", "blood runs in rivers at your feet", "you are suddenly aware that your body is made of meat and thus is edible"];
    effect_possibilities[BURIED] = ["the walls begin slowly pressing in on you", "dust chokes out the air and cakes every surface", "a hole opens up in front of you that seems to go down forever"];
    effect_possibilities[SCIENCE] = ["beakers fall from the sky and shatter against the ground", "the smell of acetone wafts through the air", "formulas dance and swirl in the air"];
    effect_possibilities[MATH] = ["raw numbers float serenely in the breeze", "you are suddenly aware of the mathematics behind your entire surroundings", "you divide by zero and reality begins to implode"];
    effect_possibilities[TWISTING] = ["everything is nothing and the end is never the end but only a new begining", "you patiently wait for the game to respond to your text input", "the room you are in infinitely lengthens into an unending hallway"];
    effect_possibilities[DEATH] = ["small animal bones fall from the sky", "a grave with your name on it erupts from the ground like a jagged tooth", "you see the date everything around you will die"];
    effect_possibilities[APOCALYPSE] = ["you see the date everything around you will die and it is all the same date and it is not very far away", "a radiation siren blares in the distance", "a swirling vortex of all consuming nanobots scours the room clean"];
    effect_possibilities[ANGELS] = ["feathers and motes of light drift from the heavens", "gentle and serene harp music drifts on the breeze", 'a beam of light from above highlights you in particular'];
    effect_possibilities[LIGHT] = ["light radiates from all directions", "motes of light float in the breeze", "a blinding light seems to radiate from the heavens"];
    effect_possibilities[SERVICE] = ["feather dusters perform a musical number around you", "indistinct figues in maid uniforms bow towards you", "a robotic butler takes a lunch break nearby"];
    effect_possibilities[FAMILY] = ["family photos flutter from the sky", "memories of home flood your senses", "a door leading to your home appears before you"];
    effect_possibilities[MAGIC] = ["mana swirls and flows around your body", "magical runes carve themselves into the very air", "a 9! pointed pattern burns itself indelibly into the ground"];
    effect_possibilities[HEALING] = ["red plus signs swirl around you", "faceless nurses wielding scalpels stand in a ring around you, facing outwards", "a hospital gurney slowly creaks into view"];
    effect_possibilities[PLANTS] = ["flowers bloom and carpet the ground", "vines twist themselves around every surface", "a forest suddenly grows in a hazy ring around you"];
    effect_possibilities[HUNTING] = ["the scene of blood and fear is on the wind", "your teeth sharpen and your eyes glint", "you can not help but stare at the most vital and vulnerable parts of everything around you"];
    effect_possibilities[DECAY] = ["the stench of rot settles itself against the back of your throat", "a long dead corpse bubbles up from the ground, rotten and wet", "a swarm of diseased rats blankets the ground"];
    effect_possibilities[CHOICES] = ["you see the consequences of every action laid bare before you", "double headed coins fall in a cascading pile from the ceiling", "a thousand variations of you stare at you from a circle with you at the center"];
    effect_possibilities[ZAP] = ["lightning strikes from the heavens", "electrical sparks radiate in every direction", "the very floor becomes energized"];
    effect_possibilities[LOVE] = ["rose petals drift gently from the sky", "the sound of soulful violins can be heard in the distance", "cartoon hearts swirl around you faster and faster"];
    effect_possibilities[SOUL] = ["every surface takes on a mirrored finish, endlessly reflecting your own face from every angle", "gemstones pile up around your feet", "a pair of mirrors fade into existence, endlessly reflecting each other"];
    effect_possibilities[ANGER] = ["everything takes on a red tinted haze", "a massive bull charges from the distance", "the sound of gunfire and screaming can be heard in the distance"];
    effect_possibilities[WEB] = ["gossamer spider webs shine from every surface, each attaching themselves to one of your joints", "skittering spiders swarm over every surface", "marionettes on infinite strings fall from the sky and beging dancing a jerky rhythm"];
    effect_possibilities[ROYALTY] = ["a golden throne erupts beneath you, cradling you in your authority", "a golden crown, adorned with jewels, gently rests itself upon your brow", "phantasmal courtiers bow and scrape before you"];
    effect_possibilities[ENDINGS] = ["a red velvet curtain obscures your view", "the words 'THE END' fade into existance above your head", "open books appears and slam themselves shut to their final page"];
    effect_possibilities[KNOWING] = ["books appear out of nowhere, pages flipping rapidly as they float", "the secrets of everyone around you write themselves into the air", "words swirl around you"];
    effect_possibilities[GUIDING] = ["a yellow line guiding you to your next location appears on the ground", "compass arrows spin and whirl around you before suddenly all vibrating to a stop, all pointing in the same direction", "a mountainous vista looms in the distance"];
    effect_possibilities[CRAFTING] = ["the clanging of hammers on anvils rings out from the distance", "magical crafting tools begin creating items in front of you", "you begin the see the blueprints of all the objects around you"];
    effect_possibilities[LANGUAGE] = ["chanting in a language you almost understand comes from nowhere", "paper swirls in a dizzying whirlwind around you", "stacks upon stacks of books wink into existance in a circle around you"];
    effect_possibilities[BUGS] = ["a swarm of flies swirls around you", "the very floor becomes carpeted thickly with swarming ants", "wasps crawl all over your body"];
    effect_possibilities[ADDICTION] = ["syringes and pills rain from the sky", "playing cards scatter to the winds", "a jackpot can be heard being won on a slot machine in the distance", "a slot machine scrolling rapidly through its options winks into existance in front of you"];
    effect_possibilities[SPYING] = ["you get the powerful feeling of being watched", "the hairs on the back of your neck stand up but you can't see anyone watching you", "eyes wink into existanc by the dozens in the very air around you, all looking directly at you"];
    effect_possibilities[CLOWNS] = ["calliope music drifts in on the breeze", "balloons twisted into animal shapes and confetti rain down from the sky", "a clown in the distance stares at you"];
    effect_possibilities[DOLLS] = ["blank eyed plastic dolls dance around you", "mannequins jibber and caper around you", "an ornate childs doll with fluffy hair and a porcelain face hovers in front of you"];
    effect_possibilities[OBFUSCATION] = ["you become briefly invisible", "you briefly become completely blind", "all sounds cut off at once"];
    effect_possibilities[CENSORSHIP] = ["you become briefly invisible", "you briefly become completely blind", "all sounds cut off at once"];

    effect_possibilities[DARKNESS] = ["the light's radius gets smaller and smaller as the dark encroaches", "every lightbulb in the room shatters", "your shadow grows and grows and darkens and darkens"];
    effect_possibilities[KILLING] = ["blood begins lapping at your feet in a shallow crimson tide", "knives swirl around you at an alarming pace", "dozens and dozens of guns swirl around you, firing at random"];
    effect_possibilities[MUSIC] = ["indistinct dancers peform a complex number in a ring around you", "visible musical notes swirl and weave through the air", "ephermeral dancers spin in a circle around you", "beautiful music is played by the very air"];
    effect_possibilities[DEFENSE] = ["a whirlwind of shields swirls around you", "armor appears over your body", "a brick wall slams into place in front of you"];
    effect_possibilities[QUESTING] = ["trumpets blaze in the distance", "a new game plus icon floats from the sky", "a quest marker appears"];
}


const initGeneralBackstories = () => {
    general_backstories[ART] = ["would never stop making sculptures if that was an option", "can sketch incredibly lifelike portraits", "always has a dab of paint behind your ears"];
    general_backstories[TECHNOLOGY] = ["can, will, must and should make a robot", "always seem to be on top of the latest technology", "are annoyed that everyone wants them to fix your computer", "can hack into any system"];
    general_backstories[TIME] = ["are always on time to everything", "are kind of impatient", "seem to always have unlimited energy", "always know what time it is", "have an instinctive understanding of timing"];
    general_backstories[SPACE] = ["seem to always be a mile away when everyone is supposed to meet up", "are a very patient person", "have an amazing spatial sense", "always want to talk about space", "love being as high up as possible", "have absolutely no fear of heights"];
    general_backstories[STEALING] = ["have extremely light fingers", "have never met and object they didn't want to own", "have never been on the right side of the law", "have been in jail a few times"];
    general_backstories[FREEDOM] = ["never let anyone tie them down", "have travel in your soul", "have never been able to settle down anywhere", "prides themself in your freedom"];
    general_backstories[FIRE] = ["are always enthralled by fire", "have a habit of setting everything on fire", "find fire really calming", "think fire is the best solution to most problems", "think that if you add fire to a problem you have a new problem"];
    general_backstories[LONELY] = ["are somehow always alone", "never really bonded with anyone", "feel comfortable on your own", "have social anxiety", "don't feel comfortable in a crowd", "mostly just focus on themself"];
    general_backstories[OCEAN] = ["are married to the sea", "love the ocean with all your heart", "are always surrounded by a thin fog", "can navigate any amount of seas", "feel most comfortable in the water", "can swim like a fish"];
    general_backstories[FLESH] = ["genuinely enjoy working out", "are remarkably beautiful", "have really good bones", "really are comfortable in your own skin"];
    general_backstories[BURIED] = ["are really calm under pressure", "really enjoy digging at the beach", "enjoy spelunking as a hobby"];
    general_backstories[SCIENCE] = ["enjoys learning the 'why' of everything", "treat life like a series of experiments", "always wear a labcoat"];
    general_backstories[MATH] = ["are a very logical person", "can do all sorts of math in your head", "enjoy memorizing mathematical formulas"];
    general_backstories[TWISTING] = ["like things that arent what they seem but also are", "delight in getting someone to believe a lie", "really enjoy fractals", "enjoy needlessly convoluted plots", "constantly play tricks on those around them", "once tricked a friend into believing 'bananas' weren't actually real fruit", "created the game you are currently playing", "resolutely insist that 'fractal' is pronounced 'frack tall'", "lurk behind the options screen", 'hate you in particular', "are watching you", "know what you did", "are smiling just for you", "only want for you to realize the truth", "have never told you a lie", "would never give you up", "are the true reason this game exists", "are waiting for you", "wish you would find them already", "wonder if you've ever heard of the javascript console", "make this expression a lot: :) :) :)", "honestly don't know what you are doing here", "reassure you the menu is supposed to close", "suggest you just keep hitting the escape key"];
    general_backstories[DEATH] = ["think about death a lot", "are more comfortable with the dead than the living", "really are chill about the inevitability of death", "sometimes talk for hours about how nihlism is only logical"];
    general_backstories[APOCALYPSE] = ["constantly spew ominous bullshit", "alway remind everyone of how fragile the world truly is", "are just really a huge fan of apocalyptic explosions"];
    general_backstories[ANGELS] = ["walk the path of the gods", "always are a righteous person", "think deeply about the gods", "are a deeply religious person", "strive to do the will of the gods"];
    general_backstories[LIGHT] = ["shine with light wherever they go", "always look on the bright side of any situation", "always have a light source on hand"];
    general_backstories[SERVICE] = ["do your best to help those in need", "are always there with a helping hand", "keep your room spotless", "clean whenever they are stressed"];
    general_backstories[FAMILY] = ["love your family with all your heart", "do everything for your family", "really loves your found family"];
    general_backstories[MAGIC] = ["have a natural talent for magic", "are one of the skilled mages of this Era", "are a powerful Enchanter"];
    general_backstories[HEALING] = ["have a powerful healing aura", "have extensive medical training", "never ignore suffering"];
    general_backstories[PLANTS] = ["have an enduring love of flowers", "feel more comfortable in a forest than a city", "garden as a hobby"];
    general_backstories[HUNTING] = ["can track any person across any distance", "always seem to be hunting for the next big thing", "are a skilled tracker", "can survive indefinitely in the wild from game and foraging"];
    general_backstories[DECAY] = ["are a toxic person", "feel comfortable around the dead", "are always showing people gross things", "somehow always let food go bad"];
    general_backstories[CHOICES] = ["are always aware that doing nothing is also a choice", "enjoy taunting others with your lack of choices"];
    general_backstories[ZAP] = ["really could stand to lay off with the electricity", "think having an elemental affinity is a subsitute for a personality"];
    general_backstories[LOVE] = ["love everyone they meet", "do everything with love", "never let hate into your heart"];
    general_backstories[SOUL] = ["know themselves quite thoroughly", "have a very stable personality", "are always looking into a mirror", "can see straight to anyones soul"];
    general_backstories[ANGER] = ["have trouble controlling your temper", "aren't shy about letting people know when theres is a problem"];
    general_backstories[WEB] = ["are a smug chess-master", "are manipulative to your core", "really enjoy spiders", "think spiders are very important to the eco-system"];
    general_backstories[ROYALTY] = ["are experienced with ruling", "have full noble training", "have a princely aura"];
    general_backstories[ENDINGS] = ["were always going to end up dead", "will be an existentialist", "will focus more on the ending than the begining", "will keep your thoughts firmly in the future"];
    general_backstories[KNOWING] = ["are an accomplished scholar", "are obsessed with knowing everything", "are an insufferable know-it-all"];
    general_backstories[GUIDING] = ["try to gently lead those who are lost", "never gets lost", "are a soothing mentor"];
    general_backstories[CRAFTING] = ["enjoy wood-working in your spare time", "are quite a skilled craftman", "are always collecting small objects to make things with"];
    general_backstories[LANGUAGE] = ["alway have your nose in a book", "speaks every language of Zampanio", "can curse in a different language for each day of the week"];
    general_backstories[BUGS] = ["does light bee-keeping when at home", "don't find bugs creepy", "always have at least one bug on your body"];
    general_backstories[ADDICTION] = ["enjoy gambling for any stakes", "have an addictive personality", "have never met a vice they didn't like"];
    general_backstories[SPYING] = ["have an extensive information network", "are always on top of the local gossip", "somehow always are aware of what everyone is doing"];
    general_backstories[CLOWNS] = ["are a clown", "have extensive ties to the Circus", "are an accomplished teller of jokes"];
    general_backstories[DOLLS] = ["carry around a small antique doll", "carve faceless wooden figurines in your spare time"];
    general_backstories[CENSORSHIP] = ["speak only in annoying riddles", "can write in any cipher", "never say what they actually mean", "seem to always be in the background"];

    general_backstories[OBFUSCATION] = ["speak only in annoying riddles", "can write in any cipher", "never say what they actually mean", "seem to always be in the background"];
    general_backstories[DARKNESS] = ["wear only black", "prefer moonlight to sunlight", "are more than a little edgy", "can see in the dark"];
    general_backstories[KILLING] = ["once killed a man just to see him die", "are cloaked in killing intent", "seem to always be covered in blood", "have an alarming collection of knives"];
    general_backstories[MUSIC] = ["alway have a song on your lips", "can play any song they hear once by ear", "always has an instrument nearby", "always love being the eye of attention"];
    general_backstories[DEFENSE] = ["always protect the weak", "are always on edge for attack", "are always aware of all the exits", "sleep in full-plate armor"];
    general_backstories[QUESTING] = ["absolutely love helping out the little people", "are always on the lookout for the next great adventure"];
}

const initChildBackstories = () => {
    child_backstories[ART] = ["had the biggest crayon set as a child", "took great pride in your drawings being displayed on the fridge as a child", "loved creating little works of art as a child"];
    child_backstories[TECHNOLOGY] = ["never got tired of screen time as a child", "always loved robots as a child", "always had your nose in a screen as a child"];
    child_backstories[TIME] = ["sometimes talk about your childhood as if it were yesterday", "always woke up before they had to as a child", "never wanted to sleep as a child"];
    child_backstories[SPACE] = ["were a very patient child", "loved high places as a child", "were always tall for your age"];
    child_backstories[STEALING] = ["kept getting into locked places as a child", "were always breaking rules as a child", "somehow ended up with all your friends toys as a child"];
    child_backstories[FREEDOM] = ["could never stay in one place for very long as a child", "moved around a lot as a child", "wandered around constantly as a child"];
    child_backstories[FIRE] = ["burned a lot of your childhood toys", "always snuck matches as a child", "lost your childhood home to a fire"];
    child_backstories[LONELY] = ["were a lonely child", "never had any friends as a child", "were an orphan as a child", "were an only child"];
    child_backstories[OCEAN] = ["learned to swim before they learned to walk", "grew up in a seaside town", "always went with your parents on sea voyages as a child"];
    child_backstories[FLESH] = ["always enjoyed eating meat as a child", "were fascinated that everyone was made of meat as a child", "were always praised for your physical abilities as a child"];
    child_backstories[BURIED] = ["always loved playing in the sandbox as a kid", "really enjoyed weighted blankets as a child", "were always the kid who tattled to teachers"];
    child_backstories[SCIENCE] = ["never stopped asking 'why' as a child", "always loved learning about science as a child", "loved telling people Cool Biology Facts all the time as a child"];
    child_backstories[MATH] = ["were a math prodigy growing up", "always seemed to remember numbers as a child", "took to math easily as a child"];
    child_backstories[TWISTING] = ["are still a child", "were never a child", "were always a child", "were born old and aged backwards", "spent a lot of time lost in the backrooms as a child", "exploded into a flock of crows when they hit puberty"];
    child_backstories[DEATH] = ["were a morbid child", "were an orphan", "wandered around a lot in cemetaries as a child"];
    child_backstories[APOCALYPSE] = ["made ominous proclomations often as a child", "constantly asked adults when the world would end", "were fascinated by the meteors that destroyed the dinosaurs as a child"];
    child_backstories[ANGELS] = ["were raised in a convent", "grew up in a very religious family", "always felt the gods spoke to them growing up"];
    child_backstories[LIGHT] = ["grew up in a sparkling sea-side town", "always looked on the bright side as a child"];
    child_backstories[SERVICE] = ["were always the caretaker of your family", "were born to a family in service to the King", "came from a long line of butlers"];
    child_backstories[FAMILY] = ["grew up knowing the meaning of family", "grew up in a huge family", "were always surrounded by siblings as a child"];
    child_backstories[MAGIC] = ["were a child progidy for magic", "always had a sense of wonder as a child", "loved the idea of magic as a child"];
    child_backstories[HEALING] = ["were a child apprentice to a local doctor", "always knew where the family first aid kit was"];
    child_backstories[PLANTS] = ["had the green thumb of the family", "spent more time with flowers than other children"];
    child_backstories[HUNTING] = ["provided for your family from a young age", "loved tracking the wild animals of the Forest"];
    child_backstories[DECAY] = ["were a sickening cute child", "enjoyed the solitude of graveyards as a child", "found a quiet beauty in decay even as a child"];
    child_backstories[CHOICES] = ["loved mazes as a child", "were a strong-headed child", "were a stubborn child"];
    child_backstories[ZAP] = ["were an electrifying child", "were tied to the element of thunder even as a child"];
    child_backstories[LOVE] = ["grew up in a very loving family", "loved everyone", "never felt unloved growing up"];
    child_backstories[SOUL] = ["were a very self-assured child", "knew exactly what they wanted to be when they grew up"];
    child_backstories[ANGER] = ["were a very violent child", "were a bully as a kid", "had trouble controlling your temper as a child"];
    child_backstories[WEB] = ["were great at convincing your friends and younger siblings what to do", "excelled at using puppy-dog eyes to get your way as a child", "somehow never seemed to be the one to take the fall for your childhood pranks"];
    child_backstories[ROYALTY] = ["grew up in the lap of luxury", "grew up as the scion of a ruling family", "spent your whole life knowing they were heir to the throne"];
    child_backstories[ENDINGS] = ["always enjoyed spoilers as a child", "cried for hours at the ending to your favorite childhood book"];
    child_backstories[KNOWING] = ["were a bookish child", "could not stop asking 'why' as a child", "were a bright child"];
    child_backstories[GUIDING] = ["always knew the best places to play as a child", "lead your small band of childhood friends"];
    child_backstories[CRAFTING] = ["loved to make things as a child", "were always showing teachers and parents your latest creation"];
    child_backstories[LANGUAGE] = ["always had your nose in a book as a child", "were a surprisingly articulate child", "loved to learn the meanings of words", "had your first word be 'Mother', not 'ma'"];
    child_backstories[BUGS] = ["enjoyed collecting beetles as a child", "had a butterfly collection as a child", "were fascinated with bees as a child"];
    child_backstories[ADDICTION] = ["couldn't stay away from the local Faire each year as a child", "always convinced your childhood friends to play 'one more game'"];
    child_backstories[SPYING] = ["grew up always watching others", "seemed to always be lurking in the corners as a child", "spied on adults growing up"];
    child_backstories[CLOWNS] = ["grew up in a traveling circus", "always had a joke for the other children growing up", "were a playful, funny child", "were always the class clown growing up"];
    child_backstories[DOLLS] = ["would hold elaborate teaparties with your dolls as a child", "talked through your dolls as a child", "had a favorite doll as a child"];
    child_backstories[CENSORSHIP] = ["were a mysterious child", "kept a secret diary as a child", "learned to write in ciphers as a child"];

    child_backstories[OBFUSCATION] = ["were a mysterious child", "kept a secret diary as a child", "learned to write in ciphers as a child"];
    child_backstories[DARKNESS] = ["never were afraid of the dark as a child", "were weirdly good at seeing in the dark as a child"];
    child_backstories[KILLING] = ["were adangerous child", "have a dark childhood secret", "unsettled the neighbors as a child"];
    child_backstories[MUSIC] = ["were a musical child", "loved singing as a child", "learned so many songs from your parents"];
    child_backstories[DEFENSE] = ["protected the neighborhood children growing up", "always protected the littler kids growing up"];
    child_backstories[QUESTING] = ["were an obsessive child", "came up with the best games as a child", "loved playing scavenger hunts as a child"];
}

 const initThemeParts = () => {
    initPeople();
    initObjects();
    initLocations();
    initAdjs();
    initSuperNames();
    initInsults();
    initCompliments();
    initChildBackstories();
    initGeneralBackstories();
    initMiracles();
    initSongs();
    initFloorPossibilities();
    initWallPossibilities();
    initWallBackgrounds();
    initWallForegrounds();
    initFloorForegrounds();
    initFloorBackgrounds();

    initLocDesc();
    initPhilosophy();
    initMonsterDesc();
    initSmells();
    initTastes();
    initFeelings();
    initSounds();
    initEffectPossibilities();
    initSpritePossibilities();
    initFilters();
    //console.log("JR NOTE: i inited theme parts and smells are", smell_possibilities)

}



//auto populated by creating themes. 
 const all_themes = {};

 class Theme {
    //TODO refactor solo/first/second/super to instead by parts of speect like
    //TODO ing, 's, ed, etc.
    key;
    stats = {};

    /*will look like this: 
    nouns: [],
    adjs: [],
    insults: [],
    compliments: [],
    etc etc
    */
    string_possibilities;
    memories;
    opinions;

    tier;


    constructor(key, tier, string_possibilities) {
        this.key = key;
        this.tier = tier;
        this.string_possibilities = string_possibilities;

        all_themes[key] = this;
    }


    pickPossibilityFor = (key) => {
        return pickFrom(this.getPossibilitiesFor(key));
    }

    //takes in things like noun, adj, insult etc etc
    getPossibilitiesFor = (key) => {
      //console.log("JR NOTE: picking possibilities for ",key)
        if (!this.string_possibilities) {
            return ["Zampanio"];
        }
        if ((key in this.string_possibilities) && this.string_possibilities[key]) {
            return this.string_possibilities[key];
        } else {
            //console.error(`[ERROR: ${key} NOT FOUND ]`, this.string_possibilities);
            return [`Zampanio`];
        }
    }

    initializeIfNecessary = (tier) => {
        if (!this.tier || this.tier === 0) {
            this.tier = tier;
        }
    }

    debug = () => {
        console.log("debug theme");
    }



}


 const keysToThemes = (theme_keys) => {
    let themes = [];
    for (let theme of theme_keys) {
        themes.push(all_themes[theme]);
    }
    return themes;
}

//tiers of 0 will be initialized when in use 
//(YES this means that if the first player to use "Healing" theme has it high tier it will be high for EVERYONE. deal with tihs. )
function initThemes() {
    //TODO eventually have each of these maps be a separate json file by key
    initThemeParts();
    checkIfAllKeysPresent();
    for (let key of keys) {
        const string_possibilities = {};
        string_possibilities[PERSON] = person_posibilities[key];
        string_possibilities[LOCATION] = location_possibilities[key];
        string_possibilities[OBJECT] = object_possibilities[key];

        string_possibilities[ADJ] = adj_possibilities[key];
        string_possibilities[SUPERMOVE] = super_name_possibilities_map[key];
        string_possibilities[COMPLIMENT] = compliment_possibilities[key];
        string_possibilities[INSULT] = insult_possibilities[key];
        string_possibilities[MENU] = menu_options[key];
        string_possibilities[CHILDBACKSTORY] = child_backstories[key];
        string_possibilities[GENERALBACKSTORY] = general_backstories[key];
        string_possibilities[MIRACLE] = miracles[key];
        string_possibilities[SONG] = song_possibilities[key];
        string_possibilities[MONSTER_DESC] = monster_desc[key];
        string_possibilities[PHILOSOPHY] = philosophy[key];
        string_possibilities[LOC_DESC] = loc_desc[key];
        string_possibilities[SMELL] = smell_possibilities[key];
        string_possibilities[TASTE] = taste_possibilities[key];
        string_possibilities[SOUND] = sound_possibilities[key];
        string_possibilities[FEELING] = feeling_possibilities[key];
        string_possibilities[EFFECTS] = effect_possibilities[key];
        string_possibilities[WALL] = wall_possibilities[key];
        string_possibilities[FLOOR] = floor_possibilities[key];
        string_possibilities[WALLFOREGROUND] = wall_foregrounds[key];
        string_possibilities[WALLBACKGROUND] = wall_backgrounds[key];
        string_possibilities[FLOORBACKGROUND] = floor_backgrounds[key];
        string_possibilities[FLOORFOREGROUND] = floor_foregrounds[key];
        string_possibilities[SPRITES] = sprite_possibilities[key];
        string_possibilities[FILTERS] = filter_possibilities[key];


        new Theme(key, 0, string_possibilities);
    }



}


