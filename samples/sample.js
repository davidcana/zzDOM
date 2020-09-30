
document.getElementById( 't1' ).addEventListener( 
    'click', 
    function(){ 
        alert( 'Starting!' );

        var errors = 0;
        var equal = function( v1, v2 ){
            if ( v1 === v2 ){
                return;
            }
            alert( 'No equals: ' + v1 + ' != ' + v2 );
            ++errors;
        };
        
        var t1_1_original = 'white',
            t1_1_modified = 'yellow';
        equal( document.getElementById( 't1-1' ).textContent, t1_1_original );
        var id = zz( '#t1-1' )
            .text( t1_1_modified )
            .attr( 'id' );
        equal( document.getElementById( 't1-1' ).textContent, t1_1_modified );
        equal( zz( '#t1-1' ).text(), t1_1_modified );
        equal( id, 't1-1' );

        if ( errors !== 0 ){
            alert( 'Number of errors: ' + errors );
        } else {
            alert( 'No errors!');
        }
    } 
);
