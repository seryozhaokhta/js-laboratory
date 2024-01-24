import { WaveNoise } from "./WaveNoise.js";

export class BezierCurve {
  constructor(canvasWidth, canvasHeight) {
    this.noise = new WaveNoise();
    this.lineWidthNoise = new WaveNoise(3); // Амплитуда колебаний для толщины линии
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.noiseValue = 0;
    this.isGlowing = false;
    this.lastFlickerTime = new Date().getTime(); // Время последнего мелькания свечения
    this.flickerInterval = 5000; // Интервал мелькания в миллисекундах
    this.currentFlickerOpacity = 0.5; // Текущая прозрачность мелькания
    this.updateEndpoints(); // Инициализация конечных точек
  }

  enableGlow() {
    this.isGlowing = true;
  }

  getRandomEdgePoint(opposite = false, lastSide = null) {
    let side = Math.floor(Math.random() * 4);
    if (opposite && lastSide !== null) {
      // С вероятностью 75% выбрать противоположную сторону
      if (Math.random() < 0.75) {
        side = (lastSide + 2) % 4;
      }
    }

    let x, y;
    switch (side) {
      case 0: // верх
        x = Math.random() * this.canvasWidth;
        y = 0;
        break;
      case 1: // право
        x = this.canvasWidth;
        y = Math.random() * this.canvasHeight;
        break;
      case 2: // низ
        x = Math.random() * this.canvasWidth;
        y = this.canvasHeight;
        break;
      case 3: // лево
        x = 0;
        y = Math.random() * this.canvasHeight;
        break;
    }
    return { x, y, side };
  }

  updateEndpoints() {
    // Получаем случайную точку на границе для начала кривой
    const start = this.getRandomEdgePoint();
    this.startX = start.x;
    this.startY = start.y;

    // Получаем случайную или противоположную точку на границе для конца кривой
    const end = this.getRandomEdgePoint(true, start.side);
    this.endX = end.x;
    this.endY = end.y;
  }

  draw(ctx, mouseX, mouseY, isMouseOver) {
    let currentNoiseValue = this.noise.update();
    let targetNoiseValue =
      currentNoiseValue +
      (isMouseOver ? this.calculateMouseEffect(mouseX, mouseY) : 0);
    this.noiseValue = this.lerp(this.noiseValue, targetNoiseValue, 0.05);

    let noiseScale = 100;
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

    // Применение изменения толщины линии
    let lineWidthVariation = this.lineWidthNoise.update() * 5;
    let lineWidth = 2 + lineWidthVariation;
    ctx.lineWidth = Math.max(0.01, Math.min(3, lineWidth));

    // Управление мельканием свечения
    let currentTime = new Date().getTime();
    if (currentTime - this.lastFlickerTime > this.flickerInterval) {
      this.currentFlickerOpacity = Math.random() * 0.5 + 0.5;
      this.lastFlickerTime = currentTime;
    }
    let finalOpacity = Math.min(opacity, this.currentFlickerOpacity);

    if (this.isGlowing) {
      ctx.shadowColor = `rgba(255, 255, 255, ${finalOpacity})`;
      ctx.shadowBlur = 10;
    } else {
      ctx.shadowBlur = 0;
    }

    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = `rgba(255, 255, 255, ${finalOpacity})`;

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
      Math.max(1.1 + ((maxDistance - distance) / maxDistance) * 0.2, 0.5),
      1
    );
  }
}
