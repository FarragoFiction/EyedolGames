let ele;


//gemini suggest i give users a way to turn background music off, so i said , sure go for it
//and had it make this real quick based on my requirements
//its not worth it for me to make and its not on my radar but i was curious
//copied from laughing.observer in order to help a tumblr user not have to deal with audio 
//(you can mute tabs in some browsers but its not obvious how to do it)
function injectMuteButton(onMuteToggleCallback) {
  // 1. Inject the CSS styles directly into the DOM head
  if (!document.getElementById('obs-mute-styles')) {
    const style = document.createElement('style');
    style.id = 'obs-mute-styles';
    style.textContent = `
            #obs-mute-btn {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                padding: 8px 12px;
                background: #000000;
                color: #00ff00;
                border: 2px solid #00ff00;
                font-family: monospace;
                font-size: 12px;
                cursor: pointer;
                letter-spacing: 1px;
                transition: all 0.2s ease;
            }
            #obs-mute-btn:hover {
                background: #00ff00;
                color: #000000;
            }
            #obs-mute-btn.is-muted {
                color: #ff0000;
                border-color: #ff0000;
            }
        `;
    document.head.appendChild(style);
  }

  // 2. Create the button element
  const btn = document.createElement('button');
  btn.id = 'obs-mute-btn';
  btn.innerText = '🔊 SOUND ON';
  btn.setAttribute('aria-label', 'Toggle ambient audio');

  let isMuted = false;

  // 3. Handle the click event and fire the callback
  btn.addEventListener('click', () => {
    isMuted = !isMuted;

    btn.innerText = isMuted ? '🔇 MUTED' : '🔊 SOUND ON';
    btn.classList.toggle('is-muted', isMuted);

    if (typeof onMuteToggleCallback === 'function') {
      onMuteToggleCallback(isMuted);
    }
  });

  // 4. Append the button directly to the layout body
  if (document.body) {
    document.body.appendChild(btn);
  } else {
    // Fallback if script executes before body finishes parsing
    window.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(btn);
    });
  }
}

const createElementWithClass = (eleName, className) => {
  const ele = document.createElement(eleName);

  if (className) {
    ele.className = className;
  }
  return ele;

}

const titleCase = (input) => {
  const pieces = input.split(" ");
  const ret = [];
  for (let piece of pieces) {
    if (piece[0]) {
      ret.push(replaceStringAt(piece, 0, piece[0].toUpperCase()));
    }
  }
  return ret.join(" ");
}

function replaceStringAt(str, index, character) {
  return str.substr(0, index) + character + str.substr(index + character.length);
}

const sentenceCase = (input) => {
  if (!input.length) {
    return input;
  }
  return replaceStringAt(input, 0, input[0].toUpperCase());
};

const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const pickFrom = (array) => {
  return array[getRandomNumberBetween(0, array.length - 1)];
}

const createElementWithClassAndParent = (eleName, parent, className) => {
  const ele = createElementWithClass(eleName, className);
  parent.append(ele);
  return ele;
}


