export default class IconToggle {
  constructor(playIconId, pauseIconId) {
    this.playIcon = document.getElementById(playIconId);
    this.pauseIcon = document.getElementById(pauseIconId);
    this.isPlaying = true;
    this.resetFlag = false;
    this.initEventListener();
  }

  initEventListener() {
    document
      .getElementById("icon-container")
      .addEventListener("click", () => this.toggleIcon());
  }

  toggleIcon() {
    if (this.isPlaying) {
      this.fadeOut(this.playIcon, () => {
        this.playIcon.style.display = "none"; // Скрыть иконку воспроизведения
        this.fadeIn(this.pauseIcon);
      });
    } else {
      this.fadeOut(this.pauseIcon, () => {
        this.pauseIcon.style.display = "none"; // Скрыть иконку паузы
        this.fadeIn(this.playIcon);
      });
    }
    this.isPlaying = !this.isPlaying; // Переключаем состояние
  }

  fadeIn(element) {
    element.style.display = "block";
    element.style.animation = "fadeIn 0.3s forwards";
  }

  fadeOut(element, callback) {
    element.style.animation = "fadeOut 0.3s forwards";
    setTimeout(callback, 500); // Устанавливаем задержку, чтобы анимация завершилась
  }

  resetToPlayIcon() {
    this.fadeOut(this.pauseIcon, () => {
      this.pauseIcon.style.display = "none"; // Скрыть иконку паузы
      this.fadeIn(this.playIcon);
      this.isPlaying = true; // Установка состояния воспроизведения
    });
  }
}

new IconToggle("play-icon", "pause-icon");
