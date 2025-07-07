const plugin = {};

plugin.register = function( zzDOM ){
    this._registerUtils( zzDOM );
    this._registerSS( zzDOM );
    this._registerMM( zzDOM );
};

plugin._registerUtils = function( zzDOM ){
    /* Events */
    zzDOM._events = {};

    zzDOM._addEventListener = function( ss, eventName, listener, useCapture ){
        var el = ss.el;
        var elId = ss._getElId();
        var thisEvents = zzDOM._events[ elId ];
        if ( ! thisEvents ){
            thisEvents = {};
            zzDOM._events[ elId ] = thisEvents;
        }
        var thisListeners = thisEvents[ eventName ];
        if ( ! thisListeners ){
            thisListeners = [];
            thisEvents[ eventName ] = thisListeners;
        }
        thisListeners.push( listener );
        
        // addEventListener
        el.addEventListener( eventName, listener, useCapture );
    };

    //TODO must remove all listeners when an element is removed
    zzDOM._removeEventListener = function( ss, eventName, listener, useCapture ){
        var el = ss.el;
        var elId = ss._getElId();
        var thisEvents = zzDOM._events[ elId ];
        if ( ! thisEvents ){
            return;
        }
        
        if ( ! eventName ){ 
            // Must remove all events
            for ( var currentEventName in thisEvents ){
                var currentListeners = thisEvents[ currentEventName ];
                zzDOM._removeListeners( el, currentListeners, null, useCapture, currentEventName );
            }
            return;
        }
        
        // Must remove listeners of only one event
        var thisListeners = thisEvents[ eventName ];
        zzDOM._removeListeners( el, thisListeners, listener, useCapture, eventName );
    };

    //TODO test all the listeners are removed
    zzDOM._removeListeners = function( el, thisListeners, listener, useCapture, eventName ){
        if ( ! thisListeners ){
            return;
        }
        for ( var i = 0; i < thisListeners.length; ++i ){
            var currentListener = thisListeners[ i ];
            if ( ! listener || currentListener === listener ){
                thisListeners.splice( i, 1 ); // Delete listener at i position
                el.removeEventListener( eventName, currentListener, useCapture );
                if ( listener ){
                    return;
                }
            }
        } 
    };
    /* End of events */
};

plugin._registerSS = function( zzDOM ){
    /* Events */
    zzDOM.SS.prototype.off = function ( eventName, listener, useCapture ) {
        zzDOM._removeEventListener( this, eventName, listener, useCapture );
        return this;
    };

    zzDOM.SS.prototype.on = function ( eventName, listener, data, useCapture ) {
        zzDOM._addEventListener( 
            this, 
            eventName, 
            data? 
                function( e ){
                    e.data = data;
                    return listener.call( e.currentTarget, e );
                }:
                listener, 
            useCapture 
        );
        return this;
    };

    zzDOM.SS.prototype.trigger = function ( eventName, params ) {
        var event = new Event( eventName, { bubbles: true, cancelable: false } );
        if ( params ){
            event.params = params;
        }
        this.el.dispatchEvent( event );
        return this;
    };
    /* End of events */
};

plugin._registerMM = function( zzDOM ){
    zzDOM.add( zzDOM.SS.prototype.off );
    zzDOM.add( zzDOM.SS.prototype.on );
    zzDOM.add( zzDOM.SS.prototype.trigger );
};

