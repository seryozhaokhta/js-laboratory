import AudioController from "./AudioController.js";
import Visualizer from "./Visualizer.js";
import TextInteractive from "./TextInteractive.js";
import IconToggle from "./icons/playPause/playIcon.js";

document.addEventListener("DOMContentLoaded", function () {
  const audioElement = document.getElementById("audio-player");
  const playPauseBtn = document.getElementById("play-pause-btn");
  const resetBtn = document.getElementById("reset-btn");
  const translationBtn = document.getElementById("translationButton");
  const translationPanel = document.getElementById("translationPanel");
  const closeIcon = document.getElementById("closeIcon");
  const bars = document.querySelectorAll("#audio-wave .bar");
  const diktContainer = document.querySelector(".dikt");
  let iconToggle = new IconToggle("play-icon", "pause-icon");

  translationBtn.addEventListener("click", function () {
    translationPanel.classList.toggle("show");

    const translatedText = `
    Я падаю, всё<br>
    падаю на дно<br>
    шахты<br>
    в себе самом.<br>
    Мимо проносятся<br>
    слой за слоем,<br>
    развалины города,<br>
    где живёт один лишь<br>
    спящий охранник,<br>
    уносятся доязычные<br>
    селения,<br>
    уносится пещера<br>
    со следами первой руки<br>
    на стене: твоей руки.<br>
    Падаю. Падаю.<br>
    Всё-таки я<br>
    не без дна.<br>
    Но дно тоже<br>
    падает. Само падение<br>
    падает. Никто<br>
    не получит<br>
    последнего<br>
    слова<br>
  `;

    translationPanel.innerHTML = `
      <img src="icons/playPause/close.svg" alt="Close" id="closeIcon" class="close-icon">
      <p class="translation-text">${translatedText}</p>
    `;

    const closeIcon = document.getElementById("closeIcon");
    closeIcon.addEventListener("click", function () {
      translationPanel.classList.remove("show");
    });
  });

  closeIcon.addEventListener("click", function () {
    translationPanel.classList.remove("show");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      translationPanel.classList.remove("show");
    }
  });

  const barLines = [
    { bar: bars[0], line: document.getElementById("line1"), time: 0 },
    { bar: bars[0], line: document.getElementById("line1"), time: 0.14 },
    { bar: bars[1], line: document.getElementById("line2"), time: 1.12 },
    { bar: bars[2], line: document.getElementById("line3"), time: 2.3 },
    { bar: bars[3], line: document.getElementById("line4"), time: 3.08 },
    { bar: bars[4], line: document.getElementById("line5"), time: 4.03 },
    { bar: bars[5], line: document.getElementById("line6"), time: 5 },
    { bar: bars[6], line: document.getElementById("line7"), time: 6 },
    { bar: bars[7], line: document.getElementById("line8"), time: 7.3 },
    { bar: bars[8], line: document.getElementById("line9"), time: 9.1 },
    { bar: bars[9], line: document.getElementById("line10"), time: 10.6 },
    { bar: bars[10], line: document.getElementById("line11"), time: 12.09 },
    { bar: bars[11], line: document.getElementById("line12"), time: 14.3 },
    { bar: bars[12], line: document.getElementById("line13"), time: 16.23 },
    { bar: bars[13], line: document.getElementById("line14"), time: 19.21 },
    { bar: bars[14], line: document.getElementById("line15"), time: 21.28 },
    { bar: bars[15], line: document.getElementById("line16"), time: 22.21 },
    { bar: bars[16], line: document.getElementById("line17"), time: 23.15 },
    { bar: bars[17], line: document.getElementById("line18"), time: 24 },
    { bar: bars[18], line: document.getElementById("line19"), time: 25.34 },
    { bar: bars[19], line: document.getElementById("line20"), time: 26.15 },
    { bar: bars[20], line: document.getElementById("line21"), time: 27.7 },
    { bar: bars[21], line: document.getElementById("line22"), time: 28.35 },
    { bar: bars[22], line: document.getElementById("line23"), time: 28.6 },
  ];

  const audioController = new AudioController(audioElement);
  const visualizer = new Visualizer(
    audioController.analyser,
    bars,
    audioController
  );
  const textInteractive = new TextInteractive(barLines, diktContainer);

  playPauseBtn.addEventListener("click", function () {
    if (audioController.isPlaying()) {
      audioController.pause();
    } else {
      audioController.play();
      requestAnimationFrame(updateWave);
    }
  });

  resetBtn.addEventListener("click", function () {
    audioController.reset();
    visualizer.reset();
    textInteractive.reset();
    iconToggle.resetToPlayIcon();
  });

  function updateWave() {
    visualizer.update();
    textInteractive.update(audioController.getCurrentTime());
    if (audioController.isPlaying()) {
      requestAnimationFrame(updateWave);
    }
  }
});
