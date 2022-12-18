function init() {
    window.requestAnimationFrame(draw);
}

class Text {
    constructor(content) {
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
        ctx.fillStyle = this.color;
        ctx.font = `${this.font.size}px ${this.font.family}`;
        ctx.fillText(this.content, this.x, this.y);
        this.move('x');
        this.move('y');
    }

    move(axis) {
        if(this.x <= 255) {
            this[axis] += this.xv;
        } else {
            this[axis] = -1 * ctx.measureText(this.content).width;
        }
    }
}

const ctx = document.getElementById("watermark").getContext("2d");
const rawr = new Text('rawr');

function draw() {
    ctx.clearRect(0,0,225,225);
    rawr.draw();

    window.requestAnimationFrame(draw);
}

init();