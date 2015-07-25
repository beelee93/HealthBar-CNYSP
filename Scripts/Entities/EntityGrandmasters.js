// ==========================================================================================
// Entity implementation - grandmasters face
// ==========================================================================================
function EntityGrandmasters(canvasContext, width, height) {
    // call base constructor
    BaseEntity.call(this, canvasContext, width, height);
    this.origImgSize = { 'width': 800, 'height': 552 };

    this.img = [
        document.getElementById("imgProfBorder"),
        document.getElementById("imgTan"),
        document.getElementById("imgShao"),
        document.getElementById("imgSeow"),
        document.getElementById("imgAlex"),
        document.getElementById("imgFelipe"),
    ];

    this.imgAlpha = [0,0,0,0,0,0];
    this.scale = 1.0;
    this.animationPhase = [0, 0];
    this.bobPhase = [0, 0, 0, 0, 0];
    this.bobY = [0, 0, 0, 0, 0];
    this.bobMagnitude = 6;
    this.attachedDarken = null;

    // ==========================================================================================
    // Update function
    // ==========================================================================================
    this.onupdate = function (elapsedTime) {
        var a;
        switch (this.animationPhase[0]) {

            case 0:
                a = 1;
                this.bobPhase[0] += Math.PI / 4 * elapsedTime;
                this.bobY[0] = Math.abs(Math.sin(this.bobPhase[0])) * -this.bobMagnitude;

                for (a = 1; a < 5; a++) {
                    if (this.bobPhase[a - 1] > 1.0) {
                        this.bobPhase[a] += Math.PI / 3 * elapsedTime;
                        this.bobY[a] = Math.abs(Math.sin(this.bobPhase[a])) * -this.bobMagnitude;
                    }

                    if (this.attachedDarken && a >= 2) {
                        this.imgAlpha[a] = 1 - this.attachedDarken.imgAlpha;
                    }
                }
                if (this.attachedDarken) {
                    this.imgAlpha[5] = 1 - this.attachedDarken.imgAlpha;
                }
                break;
            case 1:
                this.animationPhase[1] += 0.5 * elapsedTime;
                for (a = 0; a < 6; a++) {
                    if (this.animationPhase[1] > a * 0.1) {
                        this.imgAlpha[a] += elapsedTime;
                        if (this.imgAlpha[a] > 1.0) this.imgAlpha[a] = 1.0;
                    }
                }
                if (this.imgAlpha[5] >= 1.0) {
                    this.animationPhase = [0, 0]; // go back to idle animation
                    this.bobPhase = [0, 0, 0, 0, 0];
                }

                break;
        }
    };

    // ==========================================================================================
    // Render function
    // ==========================================================================================
    this.onrender = function (elapsedTime) {
        this.context.save();
        var a, b;
        for (a = 0; a < 6; a++) {
            this.context.globalAlpha = this.imgAlpha[a];
            b = (a > 0 ?  this.bobY[a-1] : 0);
            this.context.drawImage(this.img[a], this.position.x, this.position.y + b,
                this.origImgSize.width * this.scale, this.origImgSize.height * this.scale);
        }
        this.context.restore();
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
    // Initial animation
    // ==========================================================================================
    this.animateShow = function () {
        this.animationPhase[0] = 1;
        var a;
        for (a = 0; a < 6; a++) {
            this.imgAlpha[a] = 0;
        }
    }
}
