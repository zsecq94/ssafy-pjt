import {
    Ruemi
} from "./ruemi.js";

export class RuemiController {
    constructor() {
        this.img = new Image();
        this.img.onload = () => {
            this.loaded();
        };
        this.img.src = 'css_sprites.png';

        this.items = [];

        this.cur = 0;
        this.isLoaded = false;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    loaded() {
        this.isLoaded = true;
        this.addRuemi();
    }

    addRuemi() {
        this.items.push(
            new Ruemi(this.img, this.stageWidth),
        );
    }

    draw(ctx, t, dots) {
        if (this.isLoaded) {
            this.cur += 1;
            if (this.cur > 200) {
                this.cur = 0;
                this.addRuemi();
            }

            for (let i = this.items.length - 1; i >= 0; i--) {
                const item = this.items[i];
                if (item.x < -item.ruemiWidth) {
                    this.items.splice(i, 1);
                } else {
                    item.draw(ctx, t, dots);
                }
            }
        }
    }

}