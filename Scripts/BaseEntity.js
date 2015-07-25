
// ==========================================================================================
// creates a new screen entity, with default settings
// ==========================================================================================
function BaseEntity(canvasContext, width, height) {
    this.context = canvasContext;
    this.position = { 'x': 0, 'y': 0 };
    this.size = { 'width': width, 'height': height };
    this.origSize = { 'width': width, 'height': height };
    this.moveOrders = [];

    // implement these functions
    this.onresize = function (newWidth, newHeight) { };
    this.onupdate = function (elapsedTime) { };
    this.onrender = function (elapsedTime) { };

    // these are to be called
    this.resize = function (newWidth, newHeight) {
        this.size = { 'width': newWidth, 'height': newHeight };
        this.onresize(newWidth, newHeight);
    };

    this.update = function (elapsedTime) {
        // process move orders
        var a;
        var timeDiff;
        for (a = 0; a < this.moveOrders.length; a++) {
            if (this.moveOrders[a].time > 0) {
                timeDiff = Math.min(this.moveOrders[a].time, elapsedTime);
                this.position.x += this.moveOrders[a].vx * timeDiff;
                this.position.y += this.moveOrders[a].vy * timeDiff;
                this.moveOrders[a].time -= elapsedTime;
            }
            else {
                // get rid of this move order
                this.moveOrders.splice(a, 1);
                a--;
            }
        }

        // call the update event
        this.onupdate(elapsedTime);
    };

    this.render = function (elapsedTime) {
        this.onrender(elapsedTime);
    };
}

// ==========================================================================================
// creates a new move order to move a base entity
// ==========================================================================================
function MoveOrder(invoker, targetX, targetY, duration) {
    this.tx = targetX;
    this.ty = targetY;
    this.time = Math.max(duration,0.01);

    this.vx = (targetX - invoker.position.x) / duration;
    this.vy = (targetY - invoker.position.y) / duration;
}