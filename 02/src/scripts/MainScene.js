import * as PIXI from "pixi.js";
import { Background } from "./Background";

export class MainScene {
  constructor(resources) {
    this.container = new PIXI.Container();

    this.createBackground(resources);

    // resources.music.sound.play({
    //   loop: true,
    //   volume: 0.15
    // });
  }

  createBackground(resources) {
    this.bg = new Background(resources);

    this.container.addChild(this.bg.container);
  }
}