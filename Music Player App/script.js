const audio = document.getElementById("audio");

const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const progress = document.getElementById("progress");

const volume = document.getElementById("volume");

const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const songs = [
    {
        title: "Song 1",
        artist: "Artist 1",
        file: "songs/song1.mp3"
    },

    {
        title: "Song 2",
        artist: "Artist 2",
        file: "songs/song2.mp3"
    },

    {
        title: "Song 3",
        artist: "Artist 3",
        file: "songs/song3.mp3"
    }
];

let currentSong = 0;


// Load song
function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    artist.textContent = song.artist;

    audio.src = song.file;

    progress.value = 0;
}


// Play song
function playSong() {

    audio.play();

    playButton.textContent = "⏸";
}


// Pause song
function pauseSong() {

    audio.pause();

    playButton.textContent = "▶";
}


// Play / Pause button
playButton.addEventListener("click", () => {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// Next song
nextButton.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// Previous song
prevButton.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

});


// Update progress
audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const percentage =
            (audio.currentTime / audio.duration) * 100;

        progress.value = percentage;

        currentTime.textContent =
            formatTime(audio.currentTime);

        duration.textContent =
            formatTime(audio.duration);
    }

});


// Change song position
progress.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;

    }

});


// Volume control
volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


// When song finishes
audio.addEventListener("ended", () => {

    nextButton.click();

});


// Song list buttons
const songButtons = document.querySelectorAll(".song");

songButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentSong =
            Number(button.getAttribute("data-index"));

        loadSong(currentSong);

        playSong();

    });

});


// Convert seconds to minutes
function formatTime(seconds) {

    let minutes = Math.floor(seconds / 60);

    let secondsPart =
        Math.floor(seconds % 60);

    if (secondsPart < 10) {

        secondsPart = "0" + secondsPart;

    }

    return minutes + ":" + secondsPart;
}


// Load first song
loadSong(currentSong);