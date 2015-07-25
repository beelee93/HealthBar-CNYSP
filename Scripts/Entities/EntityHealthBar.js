// ==========================================================================================
// Entity implementation - health bar entity
// ==========================================================================================
function EntityHealthBar(canvasContext, width, height) {
    // call base constructor
    BaseEntity.call(this, canvasContext, width, height);
    this.text = "The Grandmasters";
    this.barCoverage = 0.45;
    this.font = "bold " +Math.floor((height - 40) * (1-this.barCoverage) ).toString() + "px Courier";
    this.healthBar = new HealthBar(canvasContext, width-6, (height - 6) * this.barCoverage);
    this.globalAlpha = 1.0;
    this.mode = "grandmaster";
    this.texture = document.getElementById("imgTexture");
    this.fade = false;

    this.highlightOffset = {
        'x': -1000,
        'width': 1000
    };

    this.imgGear =
    {
        'img': document.getElementById("imgGear"),
        'scale': 1,
        'mid': 64,
        'angle' : 0,
        'alpha' : 0
    };


    // ==========================================================================================
    // Update function
    // ==========================================================================================
    this.onupdate = function (elapsedTime) {
        this.healthBar.globalAlpha = this.globalAlpha;
        this.healthBar.position = { 'x': this.position.x + 3, 'y': this.position.y + (this.size.height - 7) * (1 - this.barCoverage) + 4 };
        this.healthBar.update(elapsedTime);

        if (this.fade) {
            this.imgGear.alpha += elapsedTime;
            if (this.imgGear.alpha > 1) this.imgGear.alpha = 1;

            this.globalAlpha += elapsedTime;
            if (this.globalAlpha > 1.0) this.globalAlpha = 1.0;

            if (this.globalAlpha == 1 && this.imgGear.alpha == 1)
                this.fade = false;            
        }
        if (this.mode == "grandmaster") {
            this.highlightOffset.x += this.highlightOffset.width / 2 * elapsedTime;
            if (this.highlightOffset.x > this.size.width + this.highlightOffset.width) {
                this.highlightOffset.x = -this.highlightOffset.width;
            }

            this.imgGear.angle += Math.PI / 10 * elapsedTime;
        }
        else {
            this.highlightOffset.x -= this.highlightOffset.width / 2 * elapsedTime;
            if (this.highlightOffset.x < -1000) {
                this.highlightOffset.x = this.size.width + this.highlightOffset.width;
            }

            this.imgGear.angle -= Math.PI / 10 * elapsedTime;
        }
    };

    // ==========================================================================================
    // Render function
    // ==========================================================================================
    this.onrender = function (elapsedTime) {

        // draw the gear
        this.context.save();
        this.context.globalAlpha = this.imgGear.alpha;
        if (this.mode == "grandmaster") {
            this.context.translate(this.position.x + this.imgGear.mid, this.position.y - 3);
        }
        else {
            this.context.translate(this.position.x + this.size.width - this.imgGear.mid, this.position.y - 3);
        }
        this.context.rotate(this.imgGear.angle);
        this.context.drawImage(this.imgGear.img, -this.imgGear.mid, -this.imgGear.mid,
            this.imgGear.mid * 2, this.imgGear.mid * 2);
        this.context.restore();

        this.context.globalAlpha = this.globalAlpha;
        // draw the outer border
        this.context.save();
        this.context.beginPath();
        this.context.translate(this.position.x, this.position.y);
        this.context.rect(0, 0, this.size.width, this.size.height);
        this.context.fillStyle = "#B5DAFF";
        this.context.fill();
        this.context.restore();

        // texture
        this.context.save();
        this.context.translate(this.position.x, this.position.y);
        this.context.rect(0, 0, this.size.width, this.size.height);
        this.context.strokeStyle = "white";
        this.context.globalCompositeOperation = "luminosity";
        this.context.fillStyle = this.context.createPattern(this.texture, "repeat");
        this.context.fill();
        this.context.restore();

        // highlight
        this.context.save();
        var highlightGrad = this.context.createLinearGradient(this.highlightOffset.x + this.position.x, this.position.y,
                    this.position.x + this.highlightOffset.x + this.highlightOffset.width, this.position.y + 40);
        highlightGrad.addColorStop(0, "rgba(0,0,0,0)");
        highlightGrad.addColorStop(0.5, "#888888");
        highlightGrad.addColorStop(1, "rgba(0,0,0,0)");

        this.context.globalCompositeOperation = "lighter";
        this.context.beginPath();
        this.context.fillStyle = highlightGrad;
        this.context.rect(this.position.x, this.position.y, this.size.width, this.size.height);
        this.context.fill();
        this.context.restore();

        // draw the name
        this.context.font = this.font;
        this.context.textBaseline = "top";
        this.context.fillStyle = "black";
        this.context.fillText(this.text, this.position.x + 10, this.position.y + 10);

        this.context.restore();

        if (this.mode == "grandmaster") {

            // draw the health bar
            this.healthBar.render(this.context, elapsedTime);
        }

        this.context.globalAlpha = 1;
    };

    // ==========================================================================================
    // Resize function
    // ==========================================================================================
    this.onresize = function (newWidth, newHeight) {
        this.font = "bold " + Math.floor((newHeight - 40) * (1 - this.barCoverage)).toString() + "px Courier";
        this.healthBar.resize(newWidth - 6, (newHeight - 6) * this.barCoverage);
        this.imgGear.scale = (newHeight - 10) / 128;
        this.imgGear.mid = (newHeight - 10) / 2;
    };

    this.forceResize = function () {
        this.onresize(this.size.width, this.size.height);
    };
}
