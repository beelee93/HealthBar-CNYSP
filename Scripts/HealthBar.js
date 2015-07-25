// handles the health bar updates and drawing

// ==========================================================================================
// create a new instance of health bar
// ==========================================================================================
function HealthBar(context,width, height) {
    this.HP = 100;                  // the current value of HP
    this.animHP = 0;                // the value to be drawn
    this.greenGrad = new BarGradient(75, 209, 151, 0, 164, 82);
    this.redGrad = new BarGradient(206, 74, 74, 163, 0, 0);
    this.styleGrayGrad = null;
    this.position = { 'x': 0, 'y': 0 };

    this.barOffsetX = 0;
    this.fontSize = 0;
    this.size = { 'width': width, 'height': height };
    this.borderAlpha = 1.0;
    this.barAlpha = 1.0;
    this.globalAlpha = 1.0;
    this.animate = true;

    // ==========================================================================================
    // resizes the health bar
    // ==========================================================================================
    this.resize = function (newWidth, newHeight) {
        this.size.width = newWidth;
        this.size.height = newHeight;
        this.styleGrayGrad = context.createLinearGradient(0, 0, 0, this.size.height-8);
        this.styleGrayGrad.addColorStop(0, "black");
        this.styleGrayGrad.addColorStop(1, "#555555");
        this.fontSize = newHeight - 8;

        context.save();
        context.font = "bold " + this.fontSize.toString() + "px Courier";
        this.barOffsetX = context.measureText("HP").width + 6;
        context.restore();
    };
    this.resize(width, height);

    // ==========================================================================================
    // updates the health bar
    // ==========================================================================================
    this.update = function (elapsedTime) {
        if (this.HP > 100) this.HP = 100;
        if (this.HP < 0) this.HP = 0;
        // animate the bar progress
        var diff;
        if (this.animate) {
            if (this.HP > this.animHP) {
                diff = Math.max(10, this.HP - this.animHP)
                this.animHP += diff * elapsedTime;

                if (this.animHP > this.HP) this.animHP = this.HP;
            }
            else if (this.HP < this.animHP) {
                diff = Math.max(20, this.animHP - this.HP);
                this.animHP -= diff * elapsedTime;

                if (this.animHP < this.HP) this.animHP = this.HP;
            }
        }
    };

    // ==========================================================================================
    // renders the health bar
    // ==========================================================================================
    this.render = function (context, elapsedTime) {
        if (this.globalAlpha > 0) {
            var percentage = this.animHP / 100.0;

            // draw outer rectangle
            context.beginPath();
            context.globalAlpha = this.borderAlpha * this.globalAlpha;
            context.rect(this.position.x, this.position.y, this.size.width, this.size.height);
            context.strokeStyle = "white";
            context.fillStyle = "#403D40";
            context.fill();
            context.stroke();
            context.globalAlpha = 1.0;

            // draw the backing
            context.save();
            context.beginPath();
            context.globalCompositeOperation = "lighter";
            context.translate(this.position.x + this.barOffsetX, this.position.y + 4);
            context.rect(0, 0, this.size.width - this.barOffsetX - 4, this.size.height - 8);
            context.fillStyle = this.styleGrayGrad;
            context.globalAlpha = this.barAlpha * this.globalAlpha;
            context.fill();
            context.globalCompositeOperation = "source-over";
            context.restore();

            // draw inner rectangle
            // -- save transform stack
            context.save();

            // -- set the colors
            var colorLight = lerpColor(this.redGrad.lightr, this.redGrad.lightg, this.redGrad.lightb,
                                this.greenGrad.lightr, this.greenGrad.lightg, this.greenGrad.lightb, percentage);
            var colorDark = lerpColor(this.redGrad.darkr, this.redGrad.darkg, this.redGrad.darkb,
                                this.greenGrad.darkr, this.greenGrad.darkg, this.greenGrad.darkb, percentage);
            var barColorGrad = context.createLinearGradient(0, 0, 0, this.size.height - 8);

            barColorGrad.addColorStop(0, colorLight);
            barColorGrad.addColorStop(1, colorDark);

            // -- draw the rectangle
            context.translate(this.position.x + this.barOffsetX, this.position.y + 4);
            context.beginPath();
            context.globalAlpha = this.barAlpha * this.globalAlpha;
            context.rect(0, 0, (this.size.width - this.barOffsetX - 4) * percentage, this.size.height - 8);
            context.fillStyle = barColorGrad;
            context.fill();
            context.globalAlpha = 1;

            // -- pop transform stack
            context.restore();

            // draw the HP text
            context.save();
            context.globalAlpha = this.barAlpha * this.globalAlpha
            context.font = "bold " + this.fontSize.toString() + "px Courier";
            context.fillStyle = "#FFCC00";
            context.textBaseline = "top";
            context.fillText("HP", this.position.x + 3, this.position.y + 3);

            context.fillStyle = "white";
            context.fillText(Math.floor(this.animHP).toString(), this.position.x + this.barOffsetX + 3, this.position.y + 3);
            context.restore();
        }
    };
}

// ==========================================================================================
// defines the colours for the main health bar gradient
// ==========================================================================================
function BarGradient(r0, g0, b0, r1, g1, b1) {
    this.lightr = r0;
    this.lightg = g0;
    this.lightb = b0;
    this.darkr = r1;
    this.darkg = g1;
    this.darkb = b1;
}

// ==========================================================================================
// lerp between two colors and return the hex code
// ==========================================================================================
function lerpColor(r0, g0, b0, r1, g1, b1, t) {
    // clamp
    if (t < 0) t = 0;
    if (t > 1) t = 1;

    var fac = 1.0 - t;
    var r = Math.floor(t * r1 + fac * r0);
    var g = Math.floor(t * g1 + fac * g0);
    var b = Math.floor(t * b1 + fac * b0);

    return rgbToHex(r, g, b);
}

// ==========================================================================================
// Helper functions to change RGB colour to hex
// ==========================================================================================
function componentToHex(c) {
    var hex = c.toString(16);
    return (hex.length == 1 ? "0" + hex : hex);
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}