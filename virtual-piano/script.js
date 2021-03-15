const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const btnContainer = document.querySelector('.btn-container');
const btnLetters = document.querySelector('.btn-letters');
const btnNotes = document.querySelector('.btn-notes');
const btnFullscreen = document.querySelector('.fullscreen');

function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}

let monitorOfEvents = {
    mousedown: false,
};

piano.addEventListener('mousedown', (event) => {
    monitorOfEvents.mousedown = true;
    if (event.target.classList.contains('piano-key')) {
        event.target.classList.add('piano-key-active-pseudo');
        event.target.classList.add('piano-key-active');
        const note = event.target.dataset.note;
        src = `./assets/audio/${note}.mp3`;
        playAudio(src);
    }
})

piano.addEventListener('mouseover', (event) => {
    if (monitorOfEvents.mousedown == true) {
        if (event.target.classList.contains('piano-key')) {
            event.target.classList.add('piano-key-active');
            event.target.classList.add('piano-key-active-pseudo');
            const note = event.target.dataset.note;
            src = `./assets/audio/${note}.mp3`;
            playAudio(src);
        } 
    }  
})

window.addEventListener('mouseup', (event) => {
    monitorOfEvents.mousedown = false;
    if (event.target.classList.contains('piano-key')) {
        event.target.classList.remove('piano-key-active');
        event.target.classList.remove('piano-key-active-pseudo');
    }
})

piano.addEventListener('mouseout', (event) => {
    event.target.classList.remove('piano-key-active');
    event.target.classList.remove('piano-key-active-pseudo');
})

let heldKeys = {};

window.addEventListener('keydown', (event) => {
    if (heldKeys[event.code] == true) {
        return;
    } 
    for (let item of pianoKeys) {
        if (event.code === item.dataset.key) {
            item.classList.add('piano-key-active');
            playAudio(`./assets/audio/${item.dataset.note}.mp3`)
            heldKeys[event.code] = true;
        }
    }
})

window.addEventListener('keyup', (event) => {
    for (let item of pianoKeys) {
        if (event.code === item.dataset.key) {
            item.classList.remove('piano-key-active');
            delete heldKeys[event.code];
        }
    }
})

btnContainer.addEventListener('click', (event) => {
    if (!event.target.classList.contains('btn-active')) {
        btnLetters.classList.toggle('btn-active');
        btnNotes.classList.toggle('btn-active');
        pianoKeys.forEach(item => {
            item.classList.toggle('piano-key-letter');
        })
    }
})

piano.addEventListener('contextmenu', (event) => {
    event.preventDefault();
})

btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
})