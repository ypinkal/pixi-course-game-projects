import * as PIXI from "pixi.js";

export class PuzzlePiece extends PIXI.utils.EventEmitter {
  constructor(resources, id, config) {
    super();

    this.config = config;
    
    this.sprite = new PIXI.Sprite(resources[`puzzle${id}`].texture);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.5);
    
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

    this.reset();
    this.emit("dragend");
  }

  reset() {
    this.sprite.x = this.config.x;
    this.sprite.y = this.config.y;

    this.sprite.zIndex = 0;
  }
}