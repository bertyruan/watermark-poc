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

    setTextPos() {
        const adjustedWidth = width - this.getTextWidth();
        const x = Math.random() * adjustedWidth;
        const y = Math.random() * height;
        this.x = this.scaleRanges(x, adjustedWidth);
        this.y = this.scaleRanges(y, height);
        this.containTextBoundary();
    }

    scaleRanges(pos, axisLength) {
        pos = Math.floor(pos);
        let newRange;
        const   inMin = Math.floor(40 * axisLength/100), 
                inMax = Math.floor(60 * axisLength/100), 
                outMin = Math.floor(1 * axisLength/3), 
                outMax = Math.floor(2 * axisLength/3);
        
        if (pos < axisLength/3) {
            newRange = scaleToRange(pos, 0, inMin, 0, outMin);
        }
        if (axisLength/3 <= pos && pos < 2*axisLength/3) {
            newRange = scaleToRange(pos, inMin, inMax, outMin, outMax);
        }
        if(2*axisLength/3 <= pos) {
            newRange = scaleToRange(pos, inMax, 1, outMax, 1);
        }

        return Math.floor(newRange);
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
            this.x = Math.floor(width - this.textWidth - this.padding);
        }
    }

    refresh() {
        this.setFont(this.font);
        this.draw();
    }

    draw() {
        this.setTextPos();
        this.ctx.fillText(this.content, this.x, this.y);
    }
}

function scaleToRange (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}