"use strict";

function Time(options){
    this.startupTime = 0;
    this.frameCount = 0;
    this.deltaTime = 0;
    this.fixedDeltaTime = 0;
    this.smoothDeltaTime = 0;
    this.maximumDeltaTime = 0;
    this.maximumFixedDeltaTime = 0;
    this.time = this.startupTime;
    this.fixedTime = this.startupTime;
    this.lastUpdateTime = this.startupTime;
    this.lastFixedUpdateTime = this.startupTime;
    this.__construct(options);
    return this;
}

Time.prototype = new JSGamePrimitive();

Time.prototype.update = function(timestamp){
    var self = this;
    var timestamp = timestamp || 0;
    var oldDeltaTime = self.deltaTime;
    timestamp = timestamp / 1000;
    self.time = timestamp;
    if(self.startupTime === 0){
        self.startupTime = self.time;
        self.lastUpdateTime = self.startupTime;
    }
    self.deltaTime = (self.time - self.lastUpdateTime);
    if(self.deltaTime > oldDeltaTime){
        self.maximumDeltaTime = self.deltaTime;
    }
    self.smoothDeltaTime = parseFloat(self.deltaTime.toFixed(2));
    self.lastUpdateTime = self.time;
    self.frameCount++;
}

Time.prototype.fixedUpdate = function(timestamp){
    var self = this;
    var timestamp = timestamp || 0;
    var oldFixedDeltaTime = self.fixedDeltaTime;
    timestamp = timestamp / 1000;
    self.fixedTime = timestamp;
    if(self.startupTime === 0){
        self.startupTime = self.fixedTime;
        self.lastFixedUpdateTime = self.startupTime;
    }
    self.fixedDeltaTime = (self.fixedTime - self.lastFixedUpdateTime);
    if(self.fixedDeltaTime > oldFixedDeltaTime){
        self.maximumFixedDeltaTime = self.fixedDeltaTime;
    }
    self.smoothFixedDeltaTime = parseFloat(self.fixedDeltaTime.toFixed(2));
    self.lastFixedUpdateTime = self.fixedTime;
}

Time.prototype.framerateToTime = function(fps){
    return (1 / fps);
}