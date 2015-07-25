// ==========================================================================================
// Entity implementation - equations
// ==========================================================================================
function Equation(index) {
    if (index < 0) index = 0;
    if (index > 8) index = 8;
    this.index = index;

    this.alpha = 0;
    this.scale = 0.8;
    this.position = { 'x': 0, 'y': 0 }
    this.animPhase = 0;
}

function EntityEquations(canvasContext, width, height) {
    // call base constructor
    BaseEntity.call(this, canvasContext, width, height);
    this.img = document.getElementById("imgEquations");
    this.srcSize = { 'width': 400, 'height': 64 };
    this.equations = [];

    this.streamEnabled = false;
    this.streamTime = -1;
    this.animPhase = 0;
    this.animTime = 2;
    this.finishedAnim = null;

    var a;
    for (a = 0; a < 20; a++) {
        this.equations.push(new Equation(0));
    }

    // ==========================================================================================
    // Update function
    // ==========================================================================================
    this.onupdate = function (elapsedTime) {
        var i;
        for (i = 0; i < 20; i++) {
            if (this.equations[i].animPhase > 0) {
                var o = this.equations[i];
                switch (o.animPhase) {
                    case 1:
                        o.alpha += 3 * elapsedTime;
                        o.scale += 0.1 * elapsedTime;

                        if (o.alpha > 1) {
                            o.alpha = 1;
                            o.animPhase++;
                        }
                        break;
                    case 2:
                        o.alpha -= elapsedTime;
                        o.scale += 0.1 * elapsedTime;
                        if (o.alpha <= 0) {
                            o.alpha = 0;
                            o.scale = 0.8;
                            o.animPhase = 0;
                        }

                        break;
                }
            }
        }

        if (this.streamEnabled) {
            this.streamTime -= elapsedTime;
            if (this.streamTime < 0) {
                this.streamTime = Math.random() * 0.1 + 0.01;
                this.produce();
            }
        }

        switch (this.animPhase) {
            case 0:
                this.animTime = 2.1;
                this.animPhase = 0.5;
                this.streamEnabled = false;
                break;
            case 1:
                this.animTime -= elapsedTime;
                this.streamEnabled = true;
                if (this.animTime <= 0) {
                    this.animPhase = 0;
                    if (this.finishedAnim) this.finishedAnim();
                }
                break;
        }
    };

    // ==========================================================================================
    // Render function
    // ==========================================================================================
    this.onrender = function (elapsedTime) {
        var c = this.context;
        var i, o;
        c.save();
        c.globalCompositeOperation = "lighter"
        for (i = 0; i < 20; i++) {
            if (this.equations[i].animPhase > 0) {
                o = this.equations[i];
                c.globalAlpha = o.alpha;
                c.drawImage(this.img,0,this.srcSize.height*o.index,this.srcSize.width, this.srcSize.height, 
                    o.position.x, o.position.y, this.srcSize.width, this.srcSize.height);
            }

        }
        c.restore();
    };

    // ==========================================================================================
    // Resize function
    // ==========================================================================================
    this.onresize = function (newWidth, newHeight) {

    };

    this.produce = function () {
        var k;
        for (k = 0; k < 20; k++) {
            if (this.equations[k].animPhase < 1) {
                this.equations[k].animPhase = 1;
                this.equations[k].alpha = 0;
                this.equations[k].scale = 0.8;
                this.equations[k].position = {
                    'x': Math.random() * (dimensions.clientWidth - this.srcSize.width),
                    'y': Math.random() * (dimensions.clientHeight - this.srcSize.height)
                };
                this.equations[k].index = Math.floor(Math.random() * 9);
                break;
            }
        }
    };
}
