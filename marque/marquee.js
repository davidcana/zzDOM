/*
	Vanilla Javascript Marquee

	new Marquee({
		id: 'myMarquee',
        text: 'Game over! player1: 200 points, player2: 150 points, player3: 100 points, player4: 20 points.',
        speed: 20,
        pauseOnMouseEnter: true,
        playOnMouseLeave: false
	});
*/
var Marquee = function ( defaults ) {
    this.options = defaults === undefined? {}: defaults;
    
    // Get configuration options
    this.id = this.options.id;
    this.text = this.options.text;
    this.speed = this.options.speed || 15;
    this.pauseOnMouseEnter = this.options.pauseOnMouseEnter;
    this.playOnMouseLeave = this.options.playOnMouseLeave;
    
    this.constructor = function() {
        
        // Resolve element
        this.element = document.getElementById( this.id );
        if ( ! this.element ){
            throw 'Error initializing Marquee, element not found: ' + this.id;
        }
        
        // Add listeners for mouseEnter and mouseLeave if needed
        this.addEventListeners();
        
        // Set text
        if ( this.text ){
            this.element.textContent = this.text;
        }
        
        // Insert CSS rule
        this.insertStyleSheetRule( 
            this.buildKeyframesRule() 
        );
        
        // Start animation!
        this.element.style.animation = 'marquee ' + this.speed + 's linear infinite';
    };
    
    this.insertStyleSheetRule = function( ruleText ) {
        var sheets = document.styleSheets;

        if ( sheets.length == 0 ){
            var style = document.createElement( 'style' );
            style.appendChild( 
                document.createTextNode( '' ) 
            );
            document.head.appendChild( style );
        }

        var sheet = sheets[ sheets.length - 1 ];
        sheet.insertRule(
            ruleText, 
            sheet.rules? sheet.rules.length: sheet.cssRules.length
        );
    };
    
    this.buildKeyframesRule = function() {
        //return '@keyframes marquee {0% { text-indent: 60em } 100% { text-indent: -60em }';
        var em = Math.trunc( this.text.length * .66 );
        //alert( this.text.length + ' : ' + em );
        return '@keyframes marquee {0% { text-indent: ' + em + 'em } 100% { text-indent: -' + em + 'em }';
    };

    this.pause = function() {
        this.element.style.animationPlayState = 'paused';
    };
    
    this.play = function() {
        this.element.style.animationPlayState = 'running';
    };

    this.addEventListeners = function(){
        if ( this.pauseOnMouseEnter ) {
            this.element.addEventListener( 'mouseenter', function(){ myMarquee.pause(); } );
        }
        if ( this.playOnMouseLeave ){
            this.element.addEventListener( 'mouseleave', function(){ myMarquee.play(); } );
        }
    };
    
    // Initialize
    this.constructor();
}
