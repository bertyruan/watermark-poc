function init() {
    window.requestAnimationFrame(draw);
}

class Text {
    constructor(ctx, content) {
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.xv = 1;
        this.yv = 1;
        this.font = {
            size: 28,
            family: 'sans'
        }
        this.color = 'red';
        this.content = content;
        if (this.y < this.font.size) {
            this.y = this.font.size;
        }
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.font = `${this.font.size}px ${this.font.family}`;
        this.ctx.fillText(this.content, this.x, this.y);
        this.moveX();
        this.moveY();
    }

    moveX() {
        if(this.x <= width && this.y <= height) {
            this.x += this.xv;
        } else {
            this.x = 0;//-1 * this.ctx.measureText(this.content).width;
        }
        console.log(this.x);
    }

    moveY() {
        if(this.x <= width && this.y <= height) {
            this.y += this.yv;
        } else {
            this.y = -1 * this.font.size;
        }

    }
}

const ctx = document.getElementById("watermark").getContext("2d");
const rawr = new Text(ctx, 'rawr');
const width = 255;
const height = 255;



function draw() {
    ctx.clearRect(0,0,width,height);
    rawr.draw();

    window.requestAnimationFrame(draw);
}

init();