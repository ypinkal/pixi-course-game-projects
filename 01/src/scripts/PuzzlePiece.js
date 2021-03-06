import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js"

export class PuzzlePiece extends PIXI.utils.EventEmitter {
  constructor(resources, id, config) {
    super();

    this.config = config;
    
    this.sprite = new PIXI.Sprite(resources[`puzzle${id}`].texture);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.5);

    this.sounds = {
      click: resources["click"]
    }
    
    this.reset();    

    this.setInteractivity();
  }

  setInteractivity() {
    this.sprite.interactive = true;

    this.sprite.on("pointerdown", this.onPointerDown, this);
    this.sprite.on("pointermove", this.onPointerMove, this);
    this.sprite.on("pointerup", this.onPointerUp, this);
  }

  onPointerDown(e) {
    this.dragging = true;

    this.sprite.zIndex = 1;

    this.pointerDownPosition = {
      x: e.data.global.x,
      y: e.data.global.y,
    }

    this.sounds.click.sound.play();
  }

  onPointerMove(e) {
    if (!this.dragging) {
      return;
    }

    const offsetX = e.data.global.x - this.pointerDownPosition.x;
    const offsetY = e.data.global.y - this.pointerDownPosition.y;

    this.sprite.x = this.config.x + offsetX;
    this.sprite.y = this.config.y + offsetY;
  }

  onPointerUp(e) {
    this.dragging = false;

    this.emit("dragend");
  }

  reset() {
    const tween = new TWEEN.Tween(this.sprite);

    tween.to({
      x: this.config.x,
      y: this.config.y
    }, 300);

    tween.onStart(() => {
      this.sprite.zIndex = 1;
    });
    tween.onUpdate(() => {});
    tween.onComplete(() => {
      this.sprite.zIndex = 0;
    });
    tween.easing(TWEEN.Easing.Back.Out);
    
    tween.start();
  }

  get top() {
    return this.sprite.y - this.sprite.height / 2;
  }

  get bottom() {
    return this.sprite.y + this.sprite.height / 2;
  }

  get left() {
    return this.sprite.x - this.sprite.width / 2;
  }

  get right() {
    return this.sprite.x + this.sprite.width / 2;
  }

  setConfig(config) {
    this.config = config;
    this.reset();
  }
}