export default class AudioController {
  constructor(audioElement) {
    this.audioElement = audioElement;
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.audioSource = this.audioCtx.createMediaElementSource(
      this.audioElement
    );
    this.analyser = this.audioCtx.createAnalyser();
    this.audioSource.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
  }

  play() {
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    this.audioElement.play();
  }

  pause() {
    this.audioElement.pause();
  }

  reset() {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
  }

  isPlaying() {
    return !this.audioElement.paused;
  }

  getCurrentTime() {
    return this.audioElement.currentTime;
  }

  getDuration() {
    return this.audioElement.duration;
  }
}
