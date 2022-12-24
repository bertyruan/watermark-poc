//https://www.vdocipher.com/blog/2014/12/add-text-to-videos-with-watermark/

const ctx = document.getElementById("watermark").getContext("2d");
const width = 225;
const height = 225;
const rawr = new Text(ctx, 'rawrrr!');

function init() {
    window.requestAnimationFrame(draw);
}

const draw = (function() {
    const frameInterval = 2000; //2000miliseconds
    let previousTimestamp = Number.MIN_SAFE_INTEGER;

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