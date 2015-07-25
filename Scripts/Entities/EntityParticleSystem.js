// ==========================================================================================
// Entity implementation - particle system
// ==========================================================================================

// ==========================================================================================
// Create a new particle object
// ==========================================================================================
function Particle() {
    this.enabled = false;
    this.velocity = { 'x': 0, 'y': 0 };
    this.position = { 'x': 0, 'y': 0 };
    this.color = "white";
    this.styleColor = null;
    this.alpha = 0;
    this.size = 0;
    this.lifeTime = 0;

    this.update = function (elapsedTime) {
        if (this.enabled) {
            if (this.lifeTime <= 1) {
                this.alpha -= elapsedTime;
                if (this.alpha < 0) this.alpha = 0;
            }
            this.lifeTime -= elapsedTime;
            if (this.lifeTime < 0) this.enabled = false;

            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }

    this.render = function (context, elapsedTime) {
        var c = context;
        if (this.styleColor) {
            c.save();
            c.fillStyle = this.styleColor;
            c.globalAlpha = this.alpha;
            c.globalCompositeOperation = "lighter";
            c.translate(this.position.x, this.position.y);
            c.scale(this.size, this.size);
            c.fillRect(-32, -32, 64, 64);
            c.restore();
        }
    }
}

function EntityParticleSystem(canvasContext, width, height) {
    // call base constructor
    BaseEntity.call(this, canvasContext, width, height);
    this.particles = [];

    // ==========================================================================================
    // Create particles
    // ==========================================================================================
    this.setupSystem = function (partCount) {
        if (this.particles.length > 0)
            this.particles.splice(0, this.particles.length); // clear the list

        var a;
        for (a = 0; a < partCount; a++) {
            this.particles.push(new Particle());
        }
    };
    

    // ==========================================================================================
    // Update function
    // ==========================================================================================
    this.onupdate = function (elapsedTime) {
        var a;
        for (a = 0; a < this.particles.length; a++) {
            this.particles[a].update(elapsedTime);
        }
    };

    // ==========================================================================================
    // Render function
    // ==========================================================================================
    this.onrender = function (elapsedTime) {
        var a;
        for (a = 0; a < this.particles.length; a++) {
            this.particles[a].render(this.context, elapsedTime);
        }
    };

    // ==========================================================================================
    // Resize function
    // ==========================================================================================
    this.onresize = function (newWidth, newHeight) {
        
    };

    // ==========================================================================================
    // Produce a new particle on screen, if available
    // ==========================================================================================
    this.produce = function (boxX, boxY, boxW, boxH, col, alpha, vx, vy, sz, lifeTime) {
        // look for available particle
        var i, o;
        for (i = 0; i < this.particles.length; i++) {
            if (!this.particles[i].enabled) {
                o = this.particles[i];

                if (!col) col = "white";
                if (!alpha) alpha = Math.random() * 0.5 + 0.5;
                if (!sz) sz = Math.random() * 0.3 + 0.1;
                if (!lifeTime) lifeTime = Math.random() * 5 + 2;

                o.position.x = Math.random() * boxW + boxX;
                o.position.y = Math.random() * boxH + boxY;
                o.velocity.x = vx;
                o.velocity.y = vy;

                o.color = col;
                o.styleColor = this.context.createRadialGradient(0, 0, 0, 0, 0, 32);
                o.styleColor.addColorStop(0, col);
                o.styleColor.addColorStop(0.2, col);
                o.styleColor.addColorStop(1, "rgba(0,0,0,0)");

                o.alpha = alpha;
                o.size = sz;
                o.lifeTime = lifeTime;

                o.enabled = true; // begin using it
                return; // done
            }
        }
    }

}
