const progressBar = document.querySelector(".progressBar");
const masterPlay = document.querySelector(".masterPlay");
let hasSong = false;
let audioElement = new Audio("/music/music.mp3");
const song_array = [
  {
    id: crypto.randomUUID(),
    song_name: "La Calin",
    song_path: "/music/music2.mp3",
    cover_path: "/images/cover.jpg",
    song_author: "By Justin Biebir",
  },
  {
    id: crypto.randomUUID(),
    song_name: "Rasma Begum",
    song_path: "/music/music.mp3",
    cover_path: "/images/cover.jpg",
    song_author: "By Justin Biebir",
  },
  {
    id: crypto.randomUUID(),
    song_name: "Ohiduzzaman Siam",
    song_path: "/music/music2.mp3",
    cover_path: "/images/cover.jpg",
    song_author: "By Justin Biebir",
  },
  {
    id: crypto.randomUUID(),
    song_name: "Shelby",
    song_path: "/music/music.mp3",
    cover_path: "/images/cover.jpg",
    song_author: "By Justin Biebir",
  },
];

// Handle play/pause music
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList = "fa-solid fa-pause masterPlay";
  } else {
    audioElement.pause();
    masterPlay.classList = "fa-solid fa-play masterPlay";
    document.querySelector(".gif_image").style.opacity = 0;
  }
});

// Listen events
audioElement.addEventListener("timeupdate", () => {
  // update progress bar
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  progressBar.value = progress;
});

// Updating music current time with progress bar change
progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

// Adding Music to website
song_array.forEach((song) => {
  document.querySelector(".music_player_footer").style.opacity = 0;
  document.querySelector(
    ".song_cards_section"
  ).innerHTML += `<div class="song_card">
          <div class="song_card_content">
            <div class="song_album">
              <img
                src=${song.cover_path}
                alt="AlbumCover"
              />
              <div id="${song.id}" class="song_play_button">
                <i class="fa-solid fa-play"></i>
              </div>
            </div>
            <div class="song_title">
              <span>${song.song_name}</span>
            </div>
            <div class="song_author_name">
              <span>By ${song.song_name}</span>
            </div>
          </div>
        </div>`;
});
song_array.forEach((song) => {
  document.getElementById(song.id).addEventListener("click", () => {
    document.querySelector(".music_player_footer").style.opacity = 1;
    const clickedSong = song_array.filter(
      (allSongs) => song.id === allSongs.id
    )[0];
    let str = `<div class="music_names_footer">
                <h4 id="${clickedSong.id}">${song.song_name}</h4>
                <h5>By ${song.song_name}</h5>
              </div>`;
    document.querySelector(".footer_music_details").innerHTML = str;
    progressBar.value = 0;

    audioElement.pause();
    audioElement = new Audio(`${clickedSong.song_path}`);
    masterPlay.classList = "fa-solid fa-play masterPlay";
    document.querySelector(".gif_image").style.opacity = 0;

    document.querySelector(".gif_image").style.opacity = 1;
  });
});
