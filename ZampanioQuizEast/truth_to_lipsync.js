//given a syllable, animate yourself to it
//porting Truth from North and then twisting
class TruthToLipSinc {

    width = 500;
    height = 500;
    squareWidth = 10;
    container;
    truthImage;
    falseImage;
    wordContainer;
    constructor(container, wordContainer) {
        this.container = container;
        this.wordContainer = wordContainer;
        this.truthImage = document.createElement("img");
        this.falseImage = document.createElement("img");

        this.truthImage.src = "eye1.png";
        this.falseImage.src = "eye2.png";
    }

    truthLog = (text) => {
        console.log(`Truth: %c${text}`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
    }

    renderText = (text,truth) => {
        truth? this.wordContainer.innerHTML = text :this.truthLog(text);
    }

    renderFrame = (syllable, truth) => {
        const ret = document.createElement("canvas");
        ret.width = this.width;
        ret.height = this.height;

        const canvas = document.createElement("canvas");
        const buffer = document.createElement("canvas");
        //i like flipVertical best
        const flipFunc = this.flipBoth; //JR NOTE: try the other two too
        canvas.width = 600;
        canvas.height = 600;//we'll scale it down later
        buffer.width = canvas.width;
        buffer.height = canvas.height;
        const size = 15;
        let ratio = 1.0;
        //was 0.8
        const ratio_modifier = (syllable.charCodeAt(0) % 2) == 0 ? 0.8 : 0.78;

        const outer_r = Math.min(canvas.height, canvas.width) / 2.1;
        const radius = outer_r;
        for (let i = 0; i < 11; i++) {
            this.drawCircleOfRects(buffer, radius * ratio, size * ratio, i, flipFunc, syllable);
            this.rotateRingTwelveDegrees(canvas, i);

            canvas.getContext("2d").drawImage(buffer, 0, 0);
            canvas.getContext("2d").restore();
            ratio = ratio * ratio_modifier;
        }
        //blur(canvas);
        const eyeSize = 30;
        //future jr, i hacked it so its always truth image
        ret.getContext("2d").drawImage(truth ? this.falseImage : this.falseImage, this.width/2-eyeSize, this.height/2-eyeSize);

        ret.getContext("2d").drawImage(buffer, 0, 0, this.width, this.height);

        if (this.container) {
            this.container.innerHTML = "";
            this.container.append(ret);

        }
        return ret;
    }

    drawCircleOfRects(canvas, radius, size, ring_num, flipFunc, syllable) {
        const context = canvas.getContext("2d");
        const origin_x = canvas.width / 2;
        const origin_y = canvas.height / 2;
        //context.fillRect(origin_x, origin_y, 30, 30);

        const num_rects = syllable.charCodeAt(0);
        //each circle should be upside down compared to the other to make it swirl
        if (ring_num % 2 === 0) {
            flipFunc(canvas);
        }
        for (let i = 0; i < num_rects; i++) {
            const ret = this.addNewSquare(origin_x, origin_y, context, radius, size, i + 1, num_rects, canvas.width);
        }
        if (ring_num % 2 === 0) {
            context.restore();
        }
    }

    addNewSquare(origin_x, origin_y, context, radius, size, num, num_rects, whole_width) {
        var coords = this.pos_func(origin_x, origin_y, radius, num, num_rects);
        const x = coords[0];
        const y = coords[1];
        var color = "#000000";
        this.square(x, y, color, context, size, num, num_rects, whole_width, radius);
        return coords;
    }

    square(x, y, color, context, size, num, num_rects, whole_width, radius) {
        context.fillStyle = color;
        context.save();
        context.translate(x, y);

        //don't question it, its dumb. just played with numbers till it worked
        const theta = 2 * Math.PI * (num) / (num_rects);
        context.rotate(theta);
        const rect_ratio = 1.3;
        //context.fillRect(0,0,size,size*rect_ratio);
        // Create gradient
        //TODO shift gradient center based on whatever
        const choices = x > whole_width ? [size, size / 2, 0] : [0, size / 2, size];
        var grd = context.createRadialGradient(choices[(num) % 3], size, size / 4, 0, size, size * 2);
        if ((num) % 6 < 3) {
            grd.addColorStop(0, "black");
            grd.addColorStop(0.3, "grey");
            grd.addColorStop(1.0, "white");

        } else {
            grd.addColorStop(0, "white");
            grd.addColorStop(0.3, "grey");
            grd.addColorStop(1.0, "black");
        }

        // Fill with gradient
        context.fillStyle = grd;
        context.fillRect(0, 0, size, size * rect_ratio);
        context.restore();
    }

    rotateRingTwelveDegrees(canvas, ringNum) {
        const context = canvas.getContext("2d");
        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(this.toRadians(45 * ringNum));
        context.translate(-canvas.width / 2, -canvas.height / 2);
    }


    flipHorizontal(canvas) {
        const context = canvas.getContext("2d");
        context.save();
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
    }

    flipVertical(canvas) {
        const context = canvas.getContext("2d");
        context.save();
        context.translate(0, canvas.height);
        context.scale(1, -1);

    }

    flipBoth(canvas) {
        const context = canvas.getContext("2d");
        context.save();
        context.translate(canvas.width, canvas.height);
        context.scale(-1, -1);
    }

    toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    pos_func(origin_x, origin_y, radius, num, num_rects) {
        return this.circle(origin_x, origin_y, radius, num, num_rects);
    }

    //position function for drawing distinct objects in a circle
    circle(origin_x, origin_y, radius, num, num_rects) {
        //TODO rip out num rings entirely.
        const angle = 2 * Math.PI * (num) / (num_rects);
        var x = radius * Math.cos((angle)) + origin_x; //0,0 is not center
        var y = radius * Math.sin((angle)) + origin_y;
        return [x, y, angle];
    }

    blur = function (canvas) {
        this.kernel(canvas, [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9]);
    }

    kernel = function (canvas, weights) {
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var side = Math.round(Math.sqrt(weights.length));
        var halfSide = Math.floor(side / 2);
        var src = pixels.data;
        var sw = pixels.width;
        var sh = pixels.height;
        // pad output by the convolution matrix
        var w = sw;
        var h = sh;
        var output = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var dst = output.data;
        // go through the destination image pixels
        for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
                var sy = y;
                var sx = x;
                var dstOff = (y * w + x) * 4;
                // calculate the weighed sum of the source image pixels that
                // fall under the convolution matrix
                var r = 0, g = 0, b = 0, a = 0;
                for (var cy = 0; cy < side; cy++) {
                    for (var cx = 0; cx < side; cx++) {
                        var scy = sy + cy - halfSide;
                        var scx = sx + cx - halfSide;
                        if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                            var srcOff = (scy * sw + scx) * 4;
                            var wt = weights[cy * side + cx];
                            r += src[srcOff] * wt;
                            g += src[srcOff + 1] * wt;
                            b += src[srcOff + 2] * wt;
                            a += src[srcOff + 3] * wt;
                        }
                    }
                }
                dst[dstOff] = r;
                dst[dstOff + 1] = g;
                dst[dstOff + 2] = b;
                dst[dstOff + 3] = a;
            }
        }
        ctx.putImageData(output, 0, 0);
    }






}