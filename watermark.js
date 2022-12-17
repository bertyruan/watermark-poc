function draw() {
    const ctx = document.getElementById('watermark').getContext('2d');
    ctx.fillStyle = "red";
    ctx.font = "28px sans"
    ctx.fillText("Rawr", 0, 50);
}