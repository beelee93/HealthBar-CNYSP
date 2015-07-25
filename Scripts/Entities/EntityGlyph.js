// ==========================================================================================
// Entity implementation - magic glyph of curse
// ==========================================================================================
function EntityGlyph(canvasContext, width, height) {
    // call base constructor
    BaseEntity.call(this, canvasContext, width, height);
    this.origImgSize = { 'width': 512, 'height': 444 };
    this.midPoint = { 'x': 256, 'y': 222 };
    this.img = [
        { 'img': document.getElementById("imgGlyphMid"), 'alpha': 0, 'angle': Math.PI / 2 },
        { 'img': document.getElementById("imgGlyphOut"), 'alpha': 0, 'angle': -Math.PI / 2 },
        { 'img': document.getElementById("imgGlyphShock"), 'alpha': 0, 'angle': 0, 'scale' : 0, 'scaleVel' : 8 }
    ];

    this.scale = 1.0;
    this.animationPhase = [0, 0];
    this.attachedGraduate = null;

    // ==========================================================================================
    // Update function
    // ==========================================================================================
    this.onupdate = function (elapsedTime) {
        switch (this.animationPhase[0]) {
            case 0:
                this.img[0].angle = Math.PI / 2;
                this.img[0].alpha = 0;

                this.img[1].angle = -Math.PI / 2;
                this.img[1].alpha = 0;
                this.animationPhase = [0, 0];
                break;
            case 1:
                this.animationPhase[1] += elapsedTime;
                this.img[0].alpha += elapsedTime;
                if (this.img[0].alpha > 1) this.img[0].alpha = 1;
                this.img[0].angle /= Math.pow(8, elapsedTime);

                if (this.animationPhase[1] > 0.5) {
                    this.img[1].alpha += elapsedTime;
                    if (this.img[1].alpha > 1) this.img[1].alpha = 1;
                    this.img[1].angle /= Math.pow(8, elapsedTime);
                }

                if (this.animationPhase[1] > 1 && this.img[1].alpha >= 1) {
                    this.animationPhase = [2, 0];
                    this.attachedGraduate.cursedAnimPhase = 2;
                }
                break;
            case 2:
                this.img[0].angle /= Math.pow(8, elapsedTime);
                this.img[1].angle /= Math.pow(8, elapsedTime);
                this.img[0].alpha -= elapsedTime;
                this.img[1].alpha -= elapsedTime;

                if (this.img[0].alpha < 0) {
                    this.img[0].alpha = 0;
                    this.animationPhase = [3, 0];
                }
                if (this.img[1].alpha < 0) this.img[1].alpha = 0;
                break;
            case 3:
                this.img[0].angle = Math.PI / 2;
                this.img[0].alpha = 0;

                this.img[1].angle = -Math.PI / 2;
                this.img[1].alpha = 0;
                this.animationPhase = [0, 0];
                break;
        }

        if (this.img[2].alpha > 0) {
            var o = this.img[2];
            o.scale += o.scaleVel * elapsedTime;
            o.scaleVel /= Math.pow(16, elapsedTime);

            if (o.scale > 2) {
                o.alpha -= elapsedTime * 2;
                if (o.alpha < 0) {
                    o.alpha = 0;
                }
            }
        } else if (this.img[2].alpha < 0) this.img[2].alpha = 0;

    };

    // ==========================================================================================
    // Render function
    // ==========================================================================================
    this.onrender = function (elapsedTime) {
        var c = this.context;
        var a;

        for (a = 0; a < 2; a++) {
            c.save();
            c.translate(this.position.x, this.position.y);
            c.rotate(this.img[a].angle);
            c.globalAlpha = this.img[a].alpha;
            c.globalCompositeOperation = "lighter";
            c.drawImage(this.img[a].img, -this.midPoint.x*this.scale, -this.midPoint.y*this.scale, 
                this.midPoint.x*this.scale * 2, this.midPoint.y*this.scale * 2);
            c.restore();
        }

        c.save();
        c.translate(this.position.x, this.position.y);
        c.rotate(this.img[2].angle);
        c.globalAlpha = this.img[2].alpha;
        c.globalCompositeOperation = "lighter";
        c.drawImage(this.img[2].img, -128 * this.img[2].scale, -128 * this.img[2].scale, 256 * this.img[2].scale, 256 * this.img[2].scale);
        c.restore();
    };

    // ==========================================================================================
    // Resize function
    // ==========================================================================================
    this.onresize = function (newWidth, newHeight) {
        var scaleFactor = Math.min(newWidth / this.origImgSize.width,
            newHeight / this.origImgSize.height);
        this.scale = scaleFactor;
        this.midPoint.x = this.origImgSize.width * scaleFactor / 2;
        this.midPoint.y = this.origImgSize.height * scaleFactor / 2;
    };

    // ==========================================================================================
    // Invokes glyph animation
    // ==========================================================================================
    this.animate = function () {
        this.img[0].angle = Math.PI / 2;
        this.img[0].alpha = 0;

        this.img[1].angle = -Math.PI / 2;
        this.img[1].alpha = 0;
        this.animationPhase = [1, 0];

        this.img[2].alpha = 1;
        this.img[2].scale = 0;
        this.img[2].scaleVel = 8;
    };
}
