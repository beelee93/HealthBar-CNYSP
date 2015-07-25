// ==========================================================================================
// Entity implementation - graduate
// ==========================================================================================
function EntityGraduate(canvasContext, width, height) {
    // call base constructor
    BaseEntity.call(this, canvasContext, width, height);
    this.origImgSize = { 'width': 512, 'height': 512 };

    this.img = document.getElementById("imgGraduate");

    this.imgAlpha = 1.0
    this.scale = 1.0;
    this.animationPhase = [0, 0];
    this.bobPhase = 0;
    this.shakeX = 0;
    this.shakeTime = 0;

    this.cursedAnimPhase = 0;
    this.attachedGlyph = null;
    this.attachedDarken = null;

    this.fade = false;
    this.glow = false;
    this.glowAlpha = 0;
    this.styleGlow = this.context.createRadialGradient(0, 0, 0, 0,0, 400);
    this.styleGlow.addColorStop(0,"white");
    this.styleGlow.addColorStop(0.3,"white");
    this.styleGlow.addColorStop(1.0,"rgba(0,0,0,0");

    this.cursedText = {
        'relY' : 0,
        'alpha' : 0,
        'alphaPhase': 0
    }
    // ==========================================================================================
    // Update function
    // ==========================================================================================
    this.onupdate = function (elapsedTime) {
        switch (this.animationPhase[0]) {
            case 0:
                this.bobPhase += Math.PI / 6 * elapsedTime;
                break;
        }

        switch (this.cursedAnimPhase) {
            case 1:
                if (this.attachedGlyph) {
                    this.attachedGlyph.animate();
                    this.cursedAnimPhase = 1.5;
                }
                else {
                    this.cursedAnimPhase++;
                }
                break;
            case 2:
                this.cursedText = {
                    'relY': 20,
                    'alpha': 1,
                    'alphaPhase': 0
                }
                this.cursedAnimPhase++;
                break;
            case 3:
                this.cursedText.relY -= elapsedTime * 10;
                if (this.cursedText.relY < 10) {
                    this.cursedText.alpha -= elapsedTime;
                    if (this.cursedText.alpha < 0) {
                        this.cursedText.alpha = 0;
                        this.cursedAnimPhase++;
                        if (this.attachedDarken) this.attachedDarken.lighten(null);
                    }
                }
                break;
            case 4:
                this.cursedText.alphaPhase += Math.PI * 2 * elapsedTime;
                this.cursedText.alpha = Math.sin(this.cursedText.alphaPhase) * 0.5 + 0.5;
                this.cursedText.relY = 20;
                break;
            default:
                this.cursedText = {
                    'relY': 0,
                    'alpha': 0,
                    'alphaPhase': 0
                }
                break;
        }


        if (this.shakeTime > 0) {
            this.shakeTime -= elapsedTime;
            this.shakeX = 10 * (Math.random() - 0.5);
        }
        else {
            this.shakeX = 0;
        }

        if (this.fade) {
            this.imgAlpha += elapsedTime;
            if (this.imgAlpha > 1) {
                this.imgAlpha = 1;
                this.fade = false;
            }
        }

        if (this.glow) {
            this.glowAlpha += elapsedTime / 2;
            if (this.glowAlpha > 1) this.glowAlpha = 1;
        }
        else {
            this.glowAlpha -= elapsedTime;
            if (this.glowAlpha < 0) this.glowAlpha = 0;
        }
    };

    // ==========================================================================================
    // Render function
    // ==========================================================================================
    this.onrender = function (elapsedTime) {
        if (this.glowAlpha > 0) {
            this.context.save();
            this.context.globalAlpha = this.glowAlpha;
            this.context.globalCompositeOperation = "lighter";
            this.context.translate(this.position.x + this.origImgSize.width * this.scale / 2, this.position.y + this.origImgSize.height * this.scale / 2);
            this.context.fillStyle = this.styleGlow;
            this.context.fillRect(-400, -400, 800, 800);
            this.context.restore();
        }

        this.context.save();
        this.context.globalAlpha = this.imgAlpha;
        this.context.drawImage(this.img, this.position.x + this.shakeX, this.position.y + Math.sin(this.bobPhase) * 10, this.origImgSize.width * this.scale,
            this.origImgSize.height * this.scale);

        if (this.cursedAnimPhase > 0) {
            this.context.globalAlpha = this.cursedText.alpha;
            this.context.font = "64px Script";
            this.context.fillStyle = "#CC33FF";
            this.context.textAlign = "center";
            this.context.textBaseline = "bottom";
            this.context.fillText("CURSED", this.position.x + this.origImgSize.width * this.scale / 2, this.cursedText.relY + this.position.y);
            this.context.restore();
        }
    };

    // ==========================================================================================
    // Resize function
    // ==========================================================================================
    this.onresize = function (newWidth, newHeight) {
        var scaleFactor = Math.min(newWidth / this.origImgSize.width,
            newHeight / this.origImgSize.height);
        this.scale = scaleFactor;
    };

    // ==========================================================================================
    // Cause character to shake
    // ==========================================================================================
    this.shake = function (time) {
        this.shakeTime = (time ? time : 0.2);
    }

    this.animateShow = function () {
        this.fade = true;
    }

}
