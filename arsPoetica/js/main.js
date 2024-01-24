import { BezierAnimation } from "./BezierAnimation.js";
import { TextManager } from "./TextManager.js";

window.bezierAnimationInstance = new BezierAnimation("myCanvas", 0);
window.textManager = new TextManager(window.bezierAnimationInstance);
