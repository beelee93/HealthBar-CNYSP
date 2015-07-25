// play sound effect on multi channel
soundPlayer = {};
soundPlayer.enabled = true;
soundPlayer.maxChannels = 10;
soundPlayer.audioChannels = [];
soundPlayer.playSound = function (sound) {
    if (this.audioChannels.length <= 0) {
        var i;
        for (i = 0; i < this.maxChannels; i++) {
            this.audioChannels.push( { 'finished' : -1, 'channel' : new Audio() });
        }
    }
    if (this.enabled) {
        var thistime;
        var a;
        for (a = 0; a < this.maxChannels; a++) {
            thistime = new Date();
            if (this.audioChannels[a].finished < thistime.getTime()) {
                // this one is available
                this.audioChannels[a].finished = thistime.getTime() +
                                            document.getElementById(sound).duration * 1000;
                this.audioChannels[a].channel.src = document.getElementById(sound).src;
                this.audioChannels[a].channel.load();
                this.audioChannels[a].channel.play();
                break;
            }
        }
    }
};
