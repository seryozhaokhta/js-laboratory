class WaveNoise {
  constructor(numWaves = 4) {
    this.waves = [];
    this.initWaves(numWaves);
  }

  initWaves(numWaves) {
    for (let i = 0; i < numWaves; i++) {
      this.waves.push(Math.random() * 760);
    }
  }

  update() {
    return (
      this.waves.reduce((acc, wave, index) => {
        let newAngle = (wave + 0.05 * (index + 1)) % 360;
        this.waves[index] = newAngle;
        return acc + Math.sin((newAngle * Math.PI) / 180);
      }, 0) / this.waves.length
    );
  }
}

class BezierCurve {
  constructor(canvasWidth, canvasHeight) {
    this.noise = new WaveNoise();
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.noiseValue = 0;
    this.updateEndpoints();
  }

  updateEndpoints() {
    this.startX = this.canvasWidth * 0.01;
    this.startY = this.canvasHeight * 0.99;
    this.endX = this.canvasWidth;
    this.endY = this.canvasHeight * 0.005;
  }

  draw(ctx, mouseX, mouseY, isMouseOver) {
    let currentNoiseValue = this.noise.update();
    let targetNoiseValue =
      currentNoiseValue +
      (isMouseOver ? this.calculateMouseEffect(mouseX, mouseY) : 0);
    this.noiseValue = this.lerp(this.noiseValue, targetNoiseValue, 0.03);

    let noiseScale = 400;
    let controlX1 = this.canvasWidth / 2 + this.noiseValue * noiseScale;
    let controlY1 = this.canvasHeight / 2 + this.noiseValue * noiseScale;
    let controlX2 = this.canvasWidth / 2 - this.noiseValue * noiseScale;
    let controlY2 = this.canvasHeight / 2 - this.noiseValue * noiseScale;

    let opacity = this.calculateOpacity(
      mouseX,
      mouseY,
      controlX1,
      controlY1,
      controlX2,
      controlY2
    );

    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.bezierCurveTo(
      controlX1,
      controlY1,
      controlX2,
      controlY2,
      this.endX,
      this.endY
    );
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.stroke();
  }

  lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  calculateMouseEffect(mouseX, mouseY) {
    let dx = mouseX - this.canvasWidth / 1.5;
    let dy = mouseY - this.canvasHeight / 1.5;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return (
      (10 - distance / Math.max(this.canvasWidth, this.canvasHeight)) * 0.13
    );
  }

  calculateOpacity(mouseX, mouseY, controlX1, controlY1, controlX2, controlY2) {
    let dx = mouseX - (controlX1 + controlX2) / 2;
    let dy = mouseY - (controlY1 + controlY2) / 2;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let maxDistance = Math.max(this.canvasWidth, this.canvasHeight);
    return Math.min(
      Math.max(0.2 + ((maxDistance - distance) / maxDistance) * 0.68, 0.5),
      1
    );
  }
}

class BezierAnimation {
  constructor(canvasId, numCurves) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.curves = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.isMouseOver = false;
    this.init(numCurves);
  }

  init(numCurves) {
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());

    for (let i = 0; i < numCurves; i++) {
      this.curves.push(new BezierCurve(this.canvas.width, this.canvas.height));
    }

    this.canvas.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.isMouseOver = true;
    });

    this.canvas.addEventListener("mouseleave", () => {
      this.isMouseOver = false;
    });

    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.curves.forEach((curve) => curve.updateEndpoints());
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.curves.forEach((curve) =>
      curve.draw(this.ctx, this.mouseX, this.mouseY, this.isMouseOver)
    );
  }
}

document.getElementById("numCurves").addEventListener("change", function () {
  let numCurves = parseInt(this.value);
  new BezierAnimation("myCanvas", numCurves);
});

new BezierAnimation("myCanvas", 3);
