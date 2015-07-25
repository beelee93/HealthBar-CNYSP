// ==========================================================================================
// Entity implementation - background glyphs
// ==========================================================================================
function EntityGlyphBack(canvasContext, width, height) {
    // call base constructor
    BaseEntity.call(this, canvasContext, width, height);
    this.scale = 1;
    this.imgGlyph = [
        { 'img': document.getElementById("imgGlyphBack1"), 'alpha' : 0, 'angle' : 0 },
        { 'img': document.getElementById("imgGlyphBack2"), 'alpha' : 0, 'angle' : 0 }
    ];

        this.animationPhase = 0;

    // ==========================================================================================
    // Update function
    // ==========================================================================================
        this.onupdate = function (elapsedTime) {
            var o = this.imgGlyph;
            switch (this.animationPhase) {
                case 0:
                    o[0].alpha = 0;
                    o[1].alpha = 0;
                    break;

                case 1:
                    o[0].alpha += elapsedTime/3;
                    if (o[0].alpha > 0.25) {
                        o[1].alpha += elapsedTime/3;
                    }
                    if (o[0].alpha > 0.4) o[0].alpha = 0.4;
                    if (o[1].alpha > 0.7) {
                        o[1].alpha = 0.7;
                        this.animationPhase++;
                    }
                case 2:
                    o[0].angle += Math.PI / 20 * elapsedTime;
                    o[1].angle -= Math.PI / 40 * elapsedTime;
                    break;
            }
        };

    // ==========================================================================================
    // Render function
    // ==========================================================================================
        this.onrender = function (elapsedTime) {
            var o = this.context;
            var img = this.imgGlyph;
            o.save();
            o.translate(this.position.x, this.position.y);
            o.rotate(-Math.PI /8);
            o.scale(1,0.8);
            o.rotate(img[0].angle);

            o.globalAlpha = img[0].alpha;
            o.globalCompositeOperation = "screen";
            o.drawImage(img[0].img, -256 * this.scale, -256 * this.scale, 512 * this.scale, 512 * this.scale);
            o.restore();

            o.save();
            o.translate(this.position.x, this.position.y);
             o.rotate(-Math.PI / 8);
            o.scale(1,0.8);
            o.rotate(img[1].angle);
            o.globalAlpha = img[1].alpha;
            o.globalCompositeOperation = "lighter";
            o.drawImage(img[1].img, -512 * this.scale, -512 * this.scale, 1024 * this.scale, 1024 * this.scale);
            o.restore();
        };

    // ==========================================================================================
    // Resize function
    // ==========================================================================================
    this.onresize = function (newWidth, newHeight) {
        var scaleFactor = Math.min(newWidth / 600,
            newHeight / 600);
        this.scale = scaleFactor*1.2;
    };

}
