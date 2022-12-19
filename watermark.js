function init() {
    window.requestAnimationFrame(draw);
}

class Text {
    constructor(ctx, content) {
        this.ctx = ctx;
        this.ctx.textBaseline = "bottom";
        this.x = 1000000;
        this.y = 1000000;
        this.font = {
            size: 28,
            family: 'sans',
            color: 'red'
        }
        this.content = content;
        this.padding = 5;

        this.setFont(this.font);
        this.textWidth = this.getTextWidth();

        this.boundText();
    }

    setFont(font) {
        this.ctx.fillStyle = font.color;
        this.ctx.font = `${font.size}px ${font.family}`;
    }

    getTextWidth() {
        return this.ctx.measureText(this.content).actualBoundingBoxRight + this.ctx.measureText(this.content).actualBoundingBoxLeft;
    }

    boundText() {
        if (this.y < this.font.size) {
            this.y = this.font.size;
        }
        if (this.y > height) {
            this.y = height - this.padding;
        }
        if (this.x < this.padding) {
            this.x = this.padding;
        }
        if (this.x > 225 - this.textWidth) {
            this.x = width - this.textWidth - this.padding;
        }
    }

    draw() {
        this.ctx.fillText(this.content, this.x, this.y);
    }

    newPos() {
        const x = Math.random() * height;
        const y = Math.random() * width;
    }
}

const ctx = document.getElementById("watermark").getContext("2d");
const width = 225;
const height = 225;
const rawr = new Text(ctx, 'rawr');




function draw() {
    ctx.clearRect(0,0,width,height);
    rawr.draw();

    window.requestAnimationFrame(draw);
}

init();