// ==========================================================================================
// Entity implementation - background
// ==========================================================================================
function EntityBomb(canvasContext, width, height) {
    // call base constructor
    BaseEntity.call(this, canvasContext, width, height);
    this.imgBomb = {
        'img' : document.getElementById("imgBomb"),
        'alpha' : 0,
        'fade' : false
    };

    // ==========================================================================================
    // Update function
    // ==========================================================================================
    this.onupdate = function (elapsedTime) {
        var o = this.imgBomb;
        if (o.fade) {
            if (o.alpha < 1) {
                o.alpha += elapsedTime * 3;
                if (o.alpha > 1) o.alpha = 1;
            }
        }
        else {
            if (o.alpha > 0) {
                o.alpha -= elapsedTime * 3;
                if (o.alpha < 0) o.alpha = 0;
            }
        }
    };

    // ==========================================================================================
    // Render function
    // ==========================================================================================
    this.onrender = function (elapsedTime) {
        if (this.imgBomb.alpha > 0) {
            var c = this.context;
            c.save();
            c.fillStyle = "black"
            c.globalAlpha = this.imgBomb.alpha * 0.85;
            c.fillRect(0, 0, dimensions.clientWidth, dimensions.clientHeight);

            c.globalAlpha = this.imgBomb.alpha;
            c.drawImage(this.imgBomb.img, dimensions.midX - 350, dimensions.midY - 90, 700, 180);
            c.restore();
        }
    };

    // ==========================================================================================
    // Resize function
    // ==========================================================================================
    this.onresize = function (newWidth, newHeight) {
     
    };

    
}
