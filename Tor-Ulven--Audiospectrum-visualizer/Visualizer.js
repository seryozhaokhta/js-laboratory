export default class Visualizer {
  constructor(analyser, bars, audioController) {
    this.analyser = analyser;
    this.bars = bars;
    this.audioController = audioController;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
  }

  update() {
    this.analyser.getByteFrequencyData(this.dataArray);
    this.bars.forEach((bar, index) => {
      var value = this.dataArray[index];
      var normalizedValue = this.normalize(0, 128, value);
      var barHeight = normalizedValue * 24;
      bar.style.height = barHeight + "px";
    });
  }

  normalize(min, max, value) {
    return Math.pow((value - min) / (max - min), 3);
  }

  reset() {
    this.bars.forEach((bar) => {
      bar.style.height = "0px";
    });
  }
}
