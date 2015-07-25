// ==========================================================================================
// Entity implementation - corner border
// ==========================================================================================
function EntityCornerBorder(canvasContext, width, height) {
    // call base constructor
    BaseEntity.call(this, canvasContext, width, height);
    this.origImgSize = { 'width': 128, 'height': 128 };

    this.img = document.getElementById("imgCornerBorder");

    this.imgAlpha = 0;
    this.scale = 1.0;
    this.animationPhase = [0, 0];

    // ==========================================================================================
    // Update function
    // ==========================================================================================
    this.onupdate = function (elapsedTime) {
        switch (this.animationPhase[0]) {
            case 0:
                this.imgAlpha += elapsedTime;
                if (this.imgAlpha > 0.75) this.imgAlpha = 0.75;
                break;
        }

    };

    // ==========================================================================================
    // Render function
    // ==========================================================================================
    this.onrender = function (elapsedTime) {
        this.context.globalAlpha = this.imgAlpha;
        this.context.drawImage(this.img, 0, 0, this.origImgSize.width * this.scale,
            this.origImgSize.height * this.scale);


        this.context.save();
        this.context.translate(dimensions.clientWidth, 0);
        this.context.rotate(Math.PI / 2);
        this.context.drawImage(this.img, 0, 0, this.origImgSize.width * this.scale,
            this.origImgSize.height * this.scale);
        this.context.restore();

        this.context.save();
        this.context.translate(dimensions.clientWidth, dimensions.clientHeight);
        this.context.rotate(Math.PI);
        this.context.drawImage(this.img, 0, 0, this.origImgSize.width * this.scale,
            this.origImgSize.height * this.scale);
        this.context.restore();

        this.context.save();
        this.context.translate(0, dimensions.clientHeight);
        this.context.rotate(-Math.PI / 2);
        this.context.drawImage(this.img, 0, 0, this.origImgSize.width * this.scale,
            this.origImgSize.height * this.scale);
        this.context.restore();

        this.context.globalAlpha = 1.0;
    };

    // ==========================================================================================
    // Resize function
    // ==========================================================================================
    this.onresize = function (newWidth, newHeight) {
        var scaleFactor = Math.min(newWidth / this.origImgSize.width,
            newHeight / this.origImgSize.height);
        this.scale = scaleFactor;
    };

}
