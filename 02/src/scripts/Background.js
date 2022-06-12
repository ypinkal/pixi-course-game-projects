import * as PIXI from "pixi.js";

export class Background {
    constructor(resources) {
        this.container = new PIXI.Container();

        this.texture = resources["background"].texture;
        this.sprites = [];

        this.createSprites();
    }

    createSprites() {
        for (let i = 0; i < 3; i++) {
            this.createSprite(i);
        }
    }

    createSprite(i) {
        const sprite = new PIXI.Sprite(this.texture);

        sprite.x = i * sprite.width;
        sprite.y = 0;

        this.container.addChild(sprite);

        this.sprites.push(sprite);
    }
}