

// Song data import
const songData = [
    { id: 1, Name: "qasaman Billah", artist: "Adam Ali", Img: "./public/image/qasamnBillah.webp", song: "./public/songs/QasamanBillah.mp3" },
    { id: 2, Name: "Kun Faya Kun", Img: "./public/image/kun faya kun.jpg", song: "./public/songs/KunFayaKun.mp3" },
    { id: 3, Name: "Humne Ankhon Se Dekha ", artist: " Abu Ubayda", Img: "./public/image/humne ankhon.jpg", song: "./public/songs/HumneAnkhoonSe.mp3" },
    { id: 4, Name: "Allah hu Allah hu", artist: "Atif Aslam", Img: "./public/image/allah hu.jpg", song: "./public/songs/AllahHuAllahHuAtiAslamRamzan2024SarsabzFertilizer.mp3" },
    { id: 5, Name: "Love And Life", artist: "Baraa Masoud", Img: "./public/image/love and life.jpg", song: "./public/songs/LoveandLife.mp3" }
];
// Hero section and template references
const heroSection = document.querySelector(".hero-song--selection---area");
const templateCard = document.querySelector(".template");
let songs = [];
let artistArr = [];
let songName = [];

let audio = new Audio(); // Audio instance

// Function to populate song cards
function songCardData(data) {
   if (!data) {
      return false;
   }

   // Default song play event
   document.querySelector(".fa-play").addEventListener("click", (e) => {
      defaultSong(e, data);
   });

   // Populate data into the UI
   data.forEach((element) => {
      const { id, Name, artist, Img, song } = element;
      let newArtist = artist || "Unknown";

      artistArr.push(newArtist);
      songs.push(song);
      songName.push(Name);

      const cloneCard = document.importNode(templateCard.content, true);
      cloneCard.querySelector(".card").id = `card${id}`;
      cloneCard.querySelector(".card-img").src = Img;
      cloneCard.querySelector(".title-song").innerText = Name;
      cloneCard.querySelector(".artist-details").innerText = newArtist;

      cloneCard.querySelector(`#card${id}`).addEventListener("click", (e) => {
         playSong(e, id, song, Name, newArtist);
      });
      heroSection.append(cloneCard);
   });
}

// Play the default song
function defaultSong(e, data) {
   if (!audio.src) {
      let randomVal = Math.floor(Math.random() * data.length);
      audio.src = data[randomVal].song;

      audio.addEventListener("loadedmetadata", () => {
         getDuration(audio.duration);
         nextPrevious(audio);
      });

      audio.addEventListener("timeupdate", () => {
         getRunTimeDuration(audio.currentTime, audio.duration);
      });

      document.querySelector(".songTitle").innerHTML = `${data[randomVal].Name} | ${data[randomVal].artist || "Unknown"}`;
      controlSeekBar(audio);
   }
}

// Play a selected song
function playSong(e, id, song, Name, artist) {
   audio.src = song;

   nextPrevious(audio);

   audio.addEventListener("loadedmetadata", () => {
      audio.play();
      getDuration(audio.duration);
      document.querySelector(".play-main--controls .fa-play").setAttribute("class", "fa-sharp fa-solid fa-pause");
   });

   audio.addEventListener("timeupdate", () => {
      getRunTimeDuration(audio.currentTime, audio.duration);
   });

   document.querySelector(".songTitle").innerHTML = `${Name} | ${artist}`;
   controlSeekBar(audio);
}

// Next and Previous song functionality
function nextPrevious(audio) {
   const next = document.querySelector(".fa-forward-step");
   const previous = document.querySelector(".fa-backward-step");

   next.addEventListener("click", () => {
      handleSongChange(audio, 1);
   });

   previous.addEventListener("click", () => {
      handleSongChange(audio, -1);
   });
}

function handleSongChange(audio, direction) {
   let songArray = audio.src.split("/").slice(3);
   songArray.unshift(".");
   let songSrc = songArray.join("/");
   let index = songs.indexOf(songSrc);

   let newIndex = index + direction;
   if (newIndex >= 0 && newIndex < songs.length) {
      audio.src = songs[newIndex];
      document.querySelector(".songTitle").innerText = `${songName[newIndex]} | ${artistArr[newIndex]}`;
      audio.play();
   }
}

// Get song duration
function getDuration(duration) {
   let minutes = Math.floor(duration / 60);
   let seconds = Math.floor(duration % 60);
   let formattedTime = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
   document.querySelector(".end-time").innerHTML = formattedTime;
}

// Get runtime duration
function getRunTimeDuration(runTime, duration) {
   let minutes = Math.floor(runTime / 60);
   let seconds = Math.floor(runTime % 60);
   let formattedTime = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
   document.querySelector(".running-time").innerHTML = formattedTime;
   document.querySelector(".circle").style.width = (runTime / duration) * 100 + "%";
}

// Control the seek bar
function controlSeekBar(audio) {
   document.querySelector(".line").addEventListener("click", (e) => {
      let seekValue = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
      document.querySelector(".circle").style.width = seekValue + "%";
      audio.currentTime = (audio.duration * seekValue) / 100;
   });
}

// Volume control
function controlVolume(audio) {
   document.querySelector("#range").addEventListener("change", (e) => {
      let volume = e.target.value === "100" ? "1" : `0.${e.target.value}`;
      audio.volume = volume;
      document.querySelector(".valLabel").innerText = e.target.value;

      if (e.target.value < "1") {
         document.querySelector(".fa-volume-high").setAttribute("class", "fa-solid fa-volume-xmark");
      } else if (e.target.value > "1") {
         document.querySelector(".fa-volume-xmark").setAttribute("class", "fa-solid fa-volume-high");
      }
   });
}

// Play and pause control
document.querySelector(".play-control").addEventListener("click", (e) => {
   if (e.target.classList.contains("fa-pause")) {
      audio.pause();
      e.target.setAttribute("class", "fa-sharp fa-solid fa-play");
   } else if (e.target.classList.contains("fa-play")) {
      audio.play();
      e.target.setAttribute("class", "fa-sharp fa-solid fa-pause");
   }
});

// Initialize volume control
controlVolume(audio);

// Initialize song card data
songCardData(songData);

// export default songData;
