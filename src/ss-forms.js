/* Forms */

// checked only works on radio, checkbox and option
zzDOM.SS.prototype.checked = function ( value ) {
    return this.prop( 'checked', value );
};

// disabled only works on button, fieldset, optgroup, option, select, textarea and input
zzDOM.SS.prototype.disabled = function ( value ) {
    return this.prop( 'disabled', value );
};

// indeterminate only works on checkbox, radio and progress
zzDOM.SS.prototype.indeterminate = function ( value ) {
    return this.prop( 'indeterminate', value );
};

//TODO add support of object and function types in value
zzDOM.SS.prototype.prop = function ( key, value ) {
    
    // get
    if ( value === undefined ){
        return !! this.el[ key ];
    }
    
    // set
    this.el[ key ] = value;
    return this;
};

/**
 * @param {Array<?>|String=} value
 */
zzDOM.SS.prototype.val = function ( value ) {
    // get
    if ( value === undefined ){
        switch ( this.el.nodeName ) {
        case 'INPUT':
        case 'TEXTAREA':
        case 'BUTTON':
            return this.el.value;
        case 'SELECT':
            var values = [];
            for ( var i = 0; i < this.el.length; ++i ) {
                if ( this.el[ i ].selected ) {
                    values.push( this.el[ i ].value );
                }
            }
            return values.length > 1? values: values[ 0 ];
        default:
            throw zzDOM._getError( 'val' );
        }
    }
    
    // set
    switch ( this.el.nodeName ) {
    case 'INPUT':
    case 'TEXTAREA':
    case 'BUTTON':
        this.el.value = value;
        break;
    case 'SELECT':
        if ( typeof value === 'string' || typeof value === 'number' ) {
            value = [ value ];
        }
        for ( i = 0; i < this.el.length; ++i ) {
            for ( var j = 0; j < value.length; ++j ) {
                this.el[ i ].selected = '';
                if ( this.el[ i ].value === value[ j ] ) {
                    this.el[ i ].selected = 'selected';
                    break;
                }
            }
        }
        break;
    default:
        throw zzDOM._getError( 'val' );
    }
    
    return this;
};
/* End of forms */
