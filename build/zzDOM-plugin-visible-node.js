var zzDOM = require('./zzDOM-closures-core.js');

zzDOM._dd = {};

zzDOM._getDefaultDisplay = function( el ) {
    var nodeName = el.nodeName;
    var display = zzDOM._dd[ nodeName ];

    if ( display ) {
        return display;
    }

    var doc = el.ownerDocument;
    var temp = doc.body.appendChild( doc.createElement( nodeName ) );
    display = getComputedStyle( temp )[ 'display' ];

    temp.parentNode.removeChild( temp );

    if ( display === 'none' ) {
        display = 'block';
    }
    zzDOM._dd[ nodeName ] = display;

    return display;
};
/* End of visible */

zzDOM.SS.prototype.hide = function () {
    if ( this.isVisible() ){
        this.attr( 
            'data-display', 
            getComputedStyle( this.el, null )[ 'display' ]
        );
        this.el.style.display = 'none';
    }
    return this;
};

zzDOM.SS.prototype.isVisible = function () {
    return !! this.el.offsetParent;
    //return getComputedStyle( this.el, null ).getPropertyValue( 'display' ) !== 'none';
};

zzDOM.SS.prototype.show = function () {
    if ( ! this.isVisible() ){
        var display = this.attr( 'data-display' );
        this.el.style.display = display? display: zzDOM._getDefaultDisplay( this.el );
    }
    return this;
};

zzDOM.SS.prototype.toggle = function ( state ) {
    var value = state !== undefined? ! state: this.isVisible();
    return value? this.hide(): this.show();
};

/** @suppress {missingProperties} */
zzDOM.SS.prototype.fadeIn = function ( params = {} ) {
    var { ms, callback } = params;
    ms = ms || 400;
    var finishFadeIn = () => {
        this.el.removeEventListener( 'transitionend', finishFadeIn );
        callback && callback();
    };
    this.el.style.transition = 'opacity 0s';
    this.el.style.display = '';
    this.el.style.opacity = 0;
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            this.el.addEventListener( 'transitionend', finishFadeIn );
            this.el.style.transition = `opacity ${ms/1000}s`;
            this.el.style.opacity = 1;
        });
    });
    return this;
};

/** @suppress {missingProperties} */
zzDOM.SS.prototype.fadeOut = function ( params = {} ) {
    var { ms, callback } = params;
    ms = ms || 400;
    var finishFadeOut = () => {
        this.el.style.display = 'none';
        this.el.removeEventListener( 'transitionend', finishFadeOut );
        callback && callback();
    };
    this.el.style.transition = 'opacity 0s';
    this.el.style.opacity = 1;
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            this.el.style.transition = `opacity ${ms/1000}s`;
            this.el.addEventListener( 'transitionend', finishFadeOut );
            this.el.style.opacity = 0;
        });
    });
    return this;
};
/* End of visible */

zzDOM.add( zzDOM.SS.prototype.fadeIn, zzDOM.MM.constructors.callback );
zzDOM.add( zzDOM.SS.prototype.fadeOut, zzDOM.MM.constructors.callback );
zzDOM.add( zzDOM.SS.prototype.hide );
zzDOM.add( zzDOM.SS.prototype.isVisible, zzDOM.MM.constructors.getVal );
zzDOM.add( zzDOM.SS.prototype.show );
zzDOM.add( zzDOM.SS.prototype.toggle );
