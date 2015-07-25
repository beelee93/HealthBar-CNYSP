// ==========================================================================================
// Entity implementation - darkens the background for special effects
// ==========================================================================================
function EntityDarken(canvasContext, width, height) {
    // call base constructor
    BaseEntity.call(this, canvasContext, width, height);
    this.imgAlpha = 0;
    this.animationPhase = [0, 0.75];
    this.endCallback = null;

    // ==========================================================================================
    // Update function
    // ==========================================================================================
    this.onupdate = function (elapsedTime) {
        switch (this.animationPhase[0]) {
            case 1:
                this.imgAlpha += elapsedTime;
                if (this.imgAlpha > this.animationPhase[1]) {
                    this.imgAlpha = this.animationPhase[1];
                    if (this.endCallback) {
                        this.endCallback();
                        this.endCallback = null;
                    }

                }
                break;
            case 0:
                this.imgAlpha -= elapsedTime;
                if (this.imgAlpha < 0) {
                    this.imgAlpha = 0;
                    if (this.endCallback) {
                        this.endCallback();
                        this.endCallback = null;
                    }
                }
                break;
        }

    };

    // ==========================================================================================
    // Render function
    // ==========================================================================================
    this.onrender = function (elapsedTime) {
        this.context.save();
        this.context.globalAlpha = this.imgAlpha;
        this.context.fillStyle = "black"
        this.context.fillRect(0, 0, dimensions.clientWidth, dimensions.clientHeight);
        this.context.restore();

    };

    // ==========================================================================================
    // Resize function
    // ==========================================================================================
    this.onresize = function (newWidth, newHeight) {

    };

    this.darken = function (callback) {
        this.animationPhase[0] = 1;
        this.endCallback = callback;
    };

    this.lighten = function (callback) {
        this.animationPhase[0] = 0;
        this.endCallback = callback;
    };

}
