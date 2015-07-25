// ==========================================================================================
// Entity implementation - screen flash after answer
// ==========================================================================================
function EntityScreenIndicator(canvasContext, width, height) {
    // call base constructor
    BaseEntity.call(this, canvasContext, width, height);
    this.color = "red";
    this.alpha = 0;
    this.styleGrad = null;
    this.hold = 0;
    this.composite = "lighter";

    // ==========================================================================================
    // Update function
    // ==========================================================================================
    this.onupdate = function (elapsedTime) {
        if (this.alpha > 0) {
            if (this.hold > 0) {
                this.hold -= elapsedTime;
            }
            else {
                this.alpha -= elapsedTime;
            }
            if (this.alpha < 0) this.alpha = 0;
        }
    };

    // ==========================================================================================
    // Render function
    // ==========================================================================================
    this.onrender = function (elapsedTime) {
        if (this.styleGrad) {
            this.context.save();
            this.context.fillStyle = this.styleGrad;
            this.context.globalAlpha = this.alpha;
            this.context.globalCompositeOperation = this.composite;
            this.context.fillRect(0, 0, dimensions.clientWidth, dimensions.clientHeight);
            this.context.restore();
        }
    };

    // ==========================================================================================
    // Resize function
    // ==========================================================================================
    this.onresize = function (newWidth, newHeight) {

    };

    // ==========================================================================================
    // Invokes screen flash
    // ==========================================================================================
    this.flash = function (col, full) {
        this.color = col;
        if (!full) {
            this.styleGrad = this.context.createRadialGradient(dimensions.midX, dimensions.midY, 40,
            dimensions.midX, dimensions.midY, dimensions.midX);
            this.styleGrad.addColorStop(0, "black");
            this.styleGrad.addColorStop(1, this.color);
        }
        else {
            this.styleGrad = col;
        }
        this.alpha = 1;
    };
}
