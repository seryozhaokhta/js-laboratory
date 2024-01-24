import { BezierCurve } from "./BezierCurve.js";

export class BezierAnimation {
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

  addCurve() {
    let newCurve = new BezierCurve(this.canvas.width, this.canvas.height);
    newCurve.enableGlow(); // Включаем свечение для новой кривой
    this.curves.push(newCurve);
  }
}
