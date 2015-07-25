// ==========================================================================================
// Entity implementation - laser beam
// ==========================================================================================
function EntityLaser(canvasContext, width, height) {
    // call base constructor
    BaseEntity.call(this, canvasContext, width, height);
    this.length = 1024;
    this.imgLaser = [
        { 'img': document.getElementById("imgLaserStart"), 'alpha': 0},
        { 'img': document.getElementById("imgLaser"), 'alpha': 0, 'scale' : 0, 'angle' : 0}
    ];

    this.scale = 0.6;
    this.widthScale = 0.8;
    this.animationPhase = 0;
    this.targetPosition = { 'x': 0, 'y': 0 };
    this.attachedGrandmaster = null;
    this.attachedGraduate = null;
    this.attachedWhiteFlash = null;


    // ==========================================================================================
    // Update function
    // ==========================================================================================
    this.onupdate = function (elapsedTime) {
        var grd = this.attachedGrandmaster;
        if (this.attachedGrandmaster) {
            this.position.x = grd.position.x + grd.scale * this.size.width;
            this.position.y = grd.position.y + grd.bobY[0] + this.size.height * grd.scale;
        }

        var o = this.imgLaser;
        if (this.animationPhase > 0) {
            o[1].angle = Math.atan2(this.targetPosition.y - this.position.y, this.targetPosition.x - this.position.x);
        }

        switch (this.animationPhase) {
            case 1:
                this.scale = 0.6;
                this.widthScale = 0.8;
                o[0].alpha = 0;
                o[1].alpha = 0;
                o[1].scale = 0;
                this.animationPhase++;
                this.createdParticles = false;
                break;
            case 2:
                o[0].alpha += elapsedTime * 10;
                if (o[0].alpha > 1) {
                    o[0].alpha = 1;
                    this.animationPhase++;
                    if (this.attachedGraduate) {
                        this.attachedGraduate.cursedAnimPhase = 1;
                        this.attachedGraduate.shake(0.2);
                    }
                    /*
                    if (this.attachedWhiteFlash) {
                    this.attachedWhiteFlash.composite = "difference";
                    this.attachedWhiteFlash.flash("white", true);
                    }
                    */
                    o[1].alpha = 1;
                    o[1].scale = 0.01;
                }
                break;
            case 3:
                o[1].scale += elapsedTime * 10;
                if (o[1].scale > 5) {
                    o[1].alpha -= elapsedTime;
                    o[0].alpha -= elapsedTime;
                    this.widthScale /= Math.pow(10, elapsedTime);

                    if (o[1].alpha < 0) o[1].alpha = 0;
                    if (o[0].alpha < 0) {
                        o[0].alpha = 0;
                        this.animationPhase++;
                    }
                }
                break;
            case 4:
                o[0].alpha = 0;
                o[1].alpha = 0;
                o[1].scale = 0;
                this.animationPhase = 0;
                break;
        }

    };

    // ==========================================================================================
    // Render function
    // ==========================================================================================
    this.onrender = function (elapsedTime) {
        if (this.animationPhase > 0) {
            var c = this.context;
            var o = this.imgLaser;

            // draw laser
            c.save();
            c.globalCompositeOperation = "lighter";
            c.globalAlpha = o[1].alpha;
            c.translate(this.position.x, this.position.y);
            c.rotate(o[1].angle);
            c.drawImage(o[1].img, 0, -32 * this.widthScale, this.length * o[1].scale, 64 * this.widthScale);
            c.restore();

            // draw laser start
            var mid = this.scale * 48;
            c.save();
            c.globalCompositeOperation = "lighter";
            c.globalAlpha = o[0].alpha;
            c.drawImage(o[0].img, this.position.x - mid, this.position.y - mid, mid * 2, mid * 2);
            c.restore();
        }
    };

    // ==========================================================================================
    // Resize function
    // ==========================================================================================
    this.onresize = function (newWidth, newHeight) {

    };

    // ==========================================================================================
    // Fires the laser towards specified point
    // ==========================================================================================
    this.fireAt = function (x, y) {
        this.targetPosition.x = x;
        this.targetPosition.y = y;
        this.animationPhase = 1;
        soundPlayer.playSound("sndLaser");
    }

}
