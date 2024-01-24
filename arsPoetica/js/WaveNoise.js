export class WaveNoise {
  constructor(numWaves = 1) {
    this.waves = [];
    this.initWaves(numWaves);
  }

  initWaves(numWaves) {
    for (let i = 0; i < numWaves; i++) {
      this.waves.push(Math.random() * 60);
    }
  }

  update() {
    return (
      this.waves.reduce((acc, wave, index) => {
        let newAngle = (wave + 0.5 * (index + 1)) % 360;
        this.waves[index] = newAngle;
        return acc + Math.sin((newAngle * Math.PI) / 60);
      }, 0) / this.waves.length
    );
  }
}
