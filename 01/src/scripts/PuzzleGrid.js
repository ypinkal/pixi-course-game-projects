import * as PIXI from "pixi.js";
import { PuzzleGridConfig } from "./PuzzleGridConfig";
import { PuzzlePiece } from "./PuzzlePiece";

export class PuzzleGrid {
  constructor(resources) {
    this.container = new PIXI.Container();

    this.container.x = window.innerWidth / 2;
    this.container.y = window.innerHeight / 2;

    this.container.sortableChildren = true;

    this.createPuzzlePeaces(resources);
  }

  createPuzzlePeaces(resources) {
    this.pieces = [];

    let ids = PuzzleGridConfig.map(config => config.id );

    PuzzleGridConfig.forEach(config => {
      const randomIndex = Math.floor(Math.random() * ids.length);
      const id = ids[randomIndex];

      ids = ids.filter(item => item !== id);

      const piece = new PuzzlePiece(resources, id, config);
      piece.on("dragend", () => this.onPieceDragEnd(piece));

      this.pieces.push(piece);

      this.container.addChild(piece.sprite);
    });
  }

  onPieceDragEnd(piece) {
    const pieceToReplace = this.pieces.find((item) => {
      return piece !== item &&
        piece.sprite.x > item.left &&
        piece.sprite.x < item.right &&
        piece.sprite.y > item.top &&
        piece.sprite.y < item.bottom;
    });

    if (pieceToReplace) {
      const replaceConfig = pieceToReplace.config;

      pieceToReplace.setConfig(piece.config);
      piece.setConfig(replaceConfig);
    } else {
      piece.reset();
    }
  }
}