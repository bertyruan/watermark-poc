function init() {
    window.requestAnimationFrame(draw);
}

class Text {
    constructor(ctx, content) {
        this.content = content;
        this.ctx = ctx;
        this.ctx.textBaseline = "bottom";
        this.x = 0;
        this.y = 0;
        this.font = {
            size: 28,
            family: 'sans',
            color: 'red'
        }
        this.padding = 5;

        this.setFont(this.font);
        this.textWidth = this.getTextWidth();
    }

    setFont(font) {
        this.ctx.fillStyle = font.color;
        this.ctx.font = `${font.size}px ${font.family}`;
    }

    getTextWidth() {
        return this.ctx.measureText(this.content).actualBoundingBoxRight + this.ctx.measureText(this.content).actualBoundingBoxLeft;
    }

    containTextBoundary() {
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
        this.setTextPos();
        this.ctx.fillText(this.content, this.x, this.y);
    }

    setTextPos() {
        this.x = Math.floor(Math.random() * height);
        this.y = Math.floor(Math.random() * width);
        this.containTextBoundary();
    }
}

const ctx = document.getElementById("watermark").getContext("2d");
const width = 225;
const height = 225;
const rawr = new Text(ctx, 'rawrrr!');


const draw = (function() {
    const frameInterval = 2000; //2000miliseconds
    let previousTimestamp = 0;

    const intervalHasElapsed = function(timestamp) {
        return timestamp - previousTimestamp > frameInterval;
    }

    return function(timestamp) {
        if (intervalHasElapsed(timestamp)) {
            previousTimestamp = timestamp;
            ctx.clearRect(0,0,width,height);
            rawr.draw();
        }
        window.requestAnimationFrame(draw);       
    }
})();

init();