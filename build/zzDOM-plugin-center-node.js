var zzDOM = require('./zzDOM-closures-core.js');

zzDOM.SS.prototype.getXCenter = function() {
    return ( document.documentElement.clientWidth - this.outerWidth() ) / 2;
};

zzDOM.SS.prototype.getYCenter = function() {
    return ( document.documentElement.clientHeight - this.outerHeight() ) / 2;
};

zzDOM.SS.prototype.getCenter = function() {
    return {
        left: this.getXCenter(),
        top: this.getYCenter()
    };
};

zzDOM.SS.prototype.center = function() {
    this.offset( 
        this.getCenter() 
    );
    return this;
};

zzDOM.SS.prototype.centerX = function() {
    this.css( 'left', this.getXCenter() );
    return this;
};

zzDOM.SS.prototype.centerY = function() {
    this.css( 'top', this.getYCenter() );
    return this;
};
/* End of center */

zzDOM.add( zzDOM.SS.prototype.getXCenter );
zzDOM.add( zzDOM.SS.prototype.getYCenter );
zzDOM.add( zzDOM.SS.prototype.getCenter );
zzDOM.add( zzDOM.SS.prototype.center );
zzDOM.add( zzDOM.SS.prototype.centerX );
zzDOM.add( zzDOM.SS.prototype.centerY );
