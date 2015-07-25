// ==========================================================================================
// Entity implementation - background
// ==========================================================================================
function EntityBackground(canvasContext, width, height) {
    // call base constructor
    BaseEntity.call(this, canvasContext, width, height);
    this.imgBackground = {
        'img': document.getElementById("imgBackground"),
        'imgNoise' : document.getElementById("imgPerlin"),
        'origWidth': 1920,
        'origHeight': 1024,
        'scale': 1.0,
        'alpha': 0
    };

    this.noiseY = 0;
    this.styleBlend = null;

    // ==========================================================================================
    // Update function
    // ==========================================================================================
    this.onupdate = function (elapsedTime) {
        this.imgBackground.alpha += elapsedTime;
        if (this.imgBackground.alpha > 0.85) this.imgBackground.alpha = 0.85;
        this.noiseY += elapsedTime * 30;
        if (this.noiseY > 384) this.noiseY -= 384;
    };

    // ==========================================================================================
    // Render function
    // ==========================================================================================
    this.onrender = function (elapsedTime) {
        var c = this.context;
        c.save();
        c.globalAlpha = this.imgBackground.alpha;
        c.drawImage(this.imgBackground.img, 0, 0, this.imgBackground.origWidth * this.imgBackground.scale,
                            this.imgBackground.origHeight * this.imgBackground.scale);
        c.globalAlpha = 1;

        if (this.styleBlend) {
            c.fillStyle = this.styleBlend;
            c.globalCompositeOperation = "multiply";
            c.fillRect(0, 0, dimensions.clientWidth, dimensions.clientHeight);
            c.globalAlpha = 0.5;
        }

        c.globalCompositeOperation = "multiply";
        c.translate(this.noiseY, this.noiseY);
        c.fillStyle = c.createPattern(this.imgBackground.imgNoise, "repeat");
        c.fillRect(-this.noiseY, -this.noiseY, dimensions.clientWidth, dimensions.clientHeight);
        c.fillRect(-this.noiseY, -this.noiseY, dimensions.clientWidth, dimensions.clientHeight);
        c.restore();
    };

    // ==========================================================================================
    // Resize function
    // ==========================================================================================
    this.onresize = function (newWidth, newHeight) {
        this.imgBackground.scale = Math.max(newWidth / this.imgBackground.origWidth,
            newHeight / this.imgBackground.origHeight);
    };

    
}
