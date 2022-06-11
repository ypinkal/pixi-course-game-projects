import * as PIXI from "pixi.js";
import { PuzzleGrid } from "./PuzzleGrid";

export class MainScene {
  constructor(resources) {
    this.container = new PIXI.Container();

    this.createBackground(resources);
    this.createPuzzleGrid(resources);

    resources.music.sound.play({
      loop: true,
      volume: 0.15
    });
  }

  createBackground(resources) {
    this.bg = new PIXI.Sprite(resources["bg"].texture);

    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;

    this.container.addChild(this.bg);
  }

  createPuzzleGrid(resources) {
    const grid = new PuzzleGrid(resources);

    this.container.addChild(grid.container);
  }
}