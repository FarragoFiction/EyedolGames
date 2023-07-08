//given an audio/video file, runs specific functions any time the file is at specific timecodes
//can configure if it shoudl be once, or every time


class MediaEventScheduleMaker {

    media;
    //read only encouraged so i use the function to set it
    eventListReadOnly;
    //kept because if i want to allow seeking/scrubbing i should rest the event list up to the new time
    cachedEventList;
    //timecode, functionToCall
    constructor(media, eventList) {
        this.eventListReadOnly = eventList;
        this.cachedEventList = [...eventList];
        this.media = media;
    }

    //important to callthis
    setEventList = (list) => {
        this.eventListReadOnly = list;
        this.cachedEventList = [...list];
    }

    setupListeners = () => {

        const checkForHaHa = () => {
            for (let event of this.eventListReadOnly) {
                //we can't guarantee the EXACT time it goes off because of browser limitations
                if(event.timeToCall(this.media.currentTime)) {
                    event.functionToCall();
                    //IMPORTANT: removing this prevents it from firing constantly AFTER the timecode
                    //but don't remove if its an 'every x seconds' kind of things
                    !event.repeats && removeItemOnce(this.eventListReadOnly, event);
                }
            }
        }
        this.media.addEventListener('timeupdate', checkForHaHa);

    }

}


//JR NOTE: warning, timecodes likely will be approximate. 
class SimpleMediaEventItem {
    timecode; // if ??? assume its supposed to be called constantly
    functionToCall;
    repeats = false;


    constructor(timecode, functionToCall) {
        this.timecode = timecode;
        this.functionToCall = functionToCall;
    }

    timeToCall = (media_time)=>{
        return media_time > this.timecode
    }
}

class MediaEventItemEveryXSeconds {
    x;
    functionToCall;
    repeats = true;


    constructor(x, functionToCall) {
        this.x = x;
        this.functionToCall = functionToCall;
    }

    timeToCall = (media_time)=>{
        
        return Math.round(media_time%this.x) === 0
    }
}



