//https://stackoverflow.com/questions/49403285/splitting-word-into-syllables-in-javascript
const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;

function syllabify(words) {
    return words.match(syllableRegex);
}

//sounds that are consistent given the same input
//a sort of language
class TextToSimulatedVoice {
    audioCtx = new AudioContext();
    truth
    lastTruth = "";
    mute = false;
    rageMode = false; //how DARE you mute it

    freq_multiplier;
    speed_multiplier;
    constructor(truth, freq_multiplier, speed_multiplier) {
        this.freq_multiplier = freq_multiplier;
        this.speed_multiplier = speed_multiplier;
        this.truth = truth;
    }

    speakLastTruth = async () => {
        this.speak(this.lastTruth, null, true);
    }

    //words is array of words, with pauses in between
    speak = async (words, rand, truthQuotient) => {

        if (words.length === 0) {
            //always end with your False Face firmly back in place
            if (this.truth) {
                this.truth.renderFrame("_", true);
            }
            return;
        }
        const word = words[0];
        if (!rand) {
            rand = new SeededRandom(13);
            this.truth.renderText(words.join(" "), truthQuotient||this.rageMode);
            if (truthQuotient) {
                this.lastTruth = words;
            }
        }
        let word_parts = syllabify(word); //can return null for things like JR
        word_parts = word_parts ? word_parts : word;

        //forEach allows async within
        for (let syllable of word_parts) {
            const duration = rand.getRandomNumberBetween(50, 100) * this.speed_multiplier;
            const frequency = syllable.charCodeAt(0) * this.freq_multiplier;
            let real = [];
            let imag = [];
            for (let i = 0; i < syllable.length; i++) {
                real.push(syllable.charCodeAt(i))
                imag.push(syllable.charCodeAt(i))
                real.push(217 * 1000)
                imag.push(217 * 1000)
            }


            await this.note(duration, frequency, real, imag);
            if (this.truth) {
                this.truth.renderFrame(syllable, truthQuotient);
            }
            await sleep(rand.getRandomNumberBetween(10, 50)) //small pause between syllables

        }
        await sleep(rand.getRandomNumberBetween(20, 150)); //pause bewteen words
       !this.clear && await this.speak(words.slice(1), rand, truthQuotient);

    }

    note = async (duration, frequency, real, imag) => {
        if(this.mute){
            return;
        }
        const osc = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(this.audioCtx.destination)
        gainNode.gain.value = 0.5;

        gainNode.gain.setValueAtTime(gainNode.gain.value, this.audioCtx.currentTime);

        const wave = this.audioCtx.createPeriodicWave(real, imag);

        osc.setPeriodicWave(wave);
        osc.frequency.value = frequency;
        //osc.connect(this.audioCtx.destination);
        osc.start();
        await sleep(duration)
        gainNode.gain.setValueAtTime(gainNode.gain.value, this.audioCtx.currentTime);

        !this.rageMode && gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.03);
        await sleep(3)
        !this.rageMode && osc.stop(); //stopping abruptly causes a clicking sound
    }




}