import { Hill } from "./hill.js";
// hi
import { RuemiController } from "./ruemi_controller.js";

import { Sun } from "./sun.js";
class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.sun = new Sun();

    this.hills = [
      new Hill("#FFD3B5", 0.2, 12),
      new Hill("#FFAAA6", 0.5, 8),
      new Hill("#FF8C94", 1.4, 6),
    ];
    const num = 20;
    this.ruemiController = new RuemiController();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

    this.sun.resize(this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.hills.length; i++) {
      this.hills[i].resize(this.stageWidth, this.stageHeight);
    }

    this.ruemiController.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.sun.draw(this.ctx, t);

    let dots;
    for (let i = 0; i < this.hills.length; i++) {
      dots = this.hills[i].draw(this.ctx);
    }

    this.ruemiController.draw(this.ctx, t, dots);
  }
}

window.onload = () => {
  new App();
};
