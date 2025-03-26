/* Visible */
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
