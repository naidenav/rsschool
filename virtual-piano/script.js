const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
function playAudio(src) {
    const audio = new Audio();
   // const src = `./assets/audio/${data-note}.mp3`;
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}
piano.addEventListener('click', (event) => {
    if (event.target.classList.contains('piano-key')) {
        pianoKeys.forEach((el) => {
            if (el.classList.contains('piano-key-active')) {
                el.classList.remove('piano-key-active');
            }
        });
        event.target.classList.add('piano-key-active');
        const note = event.target.dataset.note;
        src = `./assets/audio/${note}.mp3`;
        playAudio(src);
    }
})

let heldKeys = {};

window.addEventListener('keydown', (event) => {
    document.querySelector(`div[data-letter=${event.key.toUpperCase()}`).classList.add('piano-key-active');
    if (heldKeys[event.code] == true) {
        return;
    } else if (event.code === 'KeyD') {
        playAudio(`./assets/audio/c.mp3`);
    } else if (event.code === 'KeyF') {
        playAudio(`./assets/audio/d.mp3`);
    } else if (event.code === 'KeyG') {
        playAudio(`./assets/audio/e.mp3`);
    } else if (event.code === 'KeyH') {
        playAudio(`./assets/audio/f.mp3`);
    } else if (event.code === 'KeyJ') {
        playAudio(`./assets/audio/g.mp3`);
    } else if (event.code === 'KeyK') {
        playAudio(`./assets/audio/a.mp3`);
    } else if (event.code === 'KeyL') {
        playAudio(`./assets/audio/b.mp3`);
    } else if (event.code === 'KeyR') {
        playAudio(`./assets/audio/c♯.mp3`);
    } else if (event.code === 'KeyT') {
        playAudio(`./assets/audio/d♯.mp3`);
    } else if (event.code === 'KeyU') {
        playAudio(`./assets/audio/f♯.mp3`);
    } else if (event.code === 'KeyI') {
        playAudio(`./assets/audio/g♯.mp3`);
    } else if (event.code === 'KeyO') {
        playAudio(`./assets/audio/a♯.mp3`);
    }
    heldKeys[event.code] = true;
})

window.addEventListener('keyup', (event) => {
    document.querySelector(`div[data-letter=${event.key.toUpperCase()}`).classList.remove('piano-key-active');
    delete heldKeys[event.code];
})