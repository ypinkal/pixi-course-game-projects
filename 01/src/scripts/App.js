import * as PIXI from "pixi.js";
import { Loader } from "./Loader";
import { MainScene } from "./MainScene";

export class App {
  run() {
    this.app = new PIXI.Application({ resizeTo: window});
    document.body.append(this.app.view);

    this.loader = new Loader(this.app.loader);
    this.loader.preload().then((resources) => {
      this.start(resources)
    });
  }

  start(resources) {
    console.log("Game Started");
    this.scene = new MainScene(resources);

    console.log(resources);
    console.log(this.app);
    this.app.stage.addChild(this.scene.container);
  }
}