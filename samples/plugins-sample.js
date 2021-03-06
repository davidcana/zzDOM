"use strict";

zzDOM.add( 
    zzDOM.SS.prototype.velocity = function(){

        //    Conventional Velocity call:
        //    Velocity( this.el, options1, options2 );

        // Build args array with this.el as first position and then the arguments of this function
        var args = Array.prototype.slice.call( arguments );
        args.unshift( this.el );

        // Call Velocity using the new array
        Velocity.apply( Velocity, args );

        return this;
    }
);

document.getElementById( 't3' ).addEventListener( 
    'click', 
    function(){ 
        //alert( 'Starting 1!' );
        
        var translate = 200;
        
        zz( '#t3-1' )
            .velocity(
                {
                    'translateX': translate + "px"
                }
            ).velocity(
                {
                    'translateY': translate + "px"
                }
            ).velocity( 
                'reverse', 
                { 
                    'duration': 200 
                }
            ).velocity(
                {
                    'translateX': 0 + "px"
                }
            );
    }
);

document.getElementById( 't4' ).addEventListener( 
    'click', 
    function(){ 
        //alert( 'Starting 2!' );
        
        var translate = 200;

        zz( '.t4-1' )
            .velocity(
                {
                    'translateX': translate + "px"
                }
            ).velocity(
                {
                    'translateY': translate + "px"
                }
            ).velocity( 
                'reverse', 
                { 
                    'duration': 200 
                }
            ).velocity(
                {
                    'translateX': 0 + "px"
                }
            );
    }
);

document.getElementById( 't5' ).addEventListener( 
    'click', 
    function(){ 
        //alert( 'Starting 3!' );

        alert( 'outerWidth 1 zz: ' + zz( '#t5-1' ).outerWidth() );
        alert( 'outerHeight 1 zz: ' + zz( '#t5-1' ).outerHeight() );
        
        //alert( 'outerWidth 2 jq: ' + $( '#t5-2' ).outerWidth() );
        //alert( 'outerHeight 2 jq: ' + $( '#t5-2' ).outerHeight() );
        
        alert( 'outerWidth 2 zz: ' + zz( '#t5-2' ).outerWidth() );
        alert( 'outerHeight 2 zz: ' + zz( '#t5-2' ).outerHeight() );
    }
);

zz( '#', 't6' ).on( 
    'click', 
    function( e ){
        alert( this.id );
    }, 
    {} 
);
