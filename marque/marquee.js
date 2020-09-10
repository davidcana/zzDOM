/*
    CSSMarquee
	Vanilla Javascript Marquee using CSS animations

	var myMarquee = new AnimationMarquee({
		id: 'myMarquee',
        text: 'Game over! player1: 200 points, player2: 150 points, player3: 100 points, player4: 20 points.',
        speed: 20,
        pauseOnMouseEnter: true,
        playOnMouseLeave: false,
        element: document.getElementById( 'aDiv' ),
        animation: 'marquee {0}s ease-in-out infinite'
	});
*/
var CSSMarquee = function ( defaults ) {
    this.options = defaults || {};
    
    // Get configuration options
    this.id = this.options.id;
    this.text = this.options.text;
    this.speed = this.options.speed || 15;
    this.pauseOnMouseEnter = !! this.options.pauseOnMouseEnter;
    this.playOnMouseLeave = !! this.options.playOnMouseLeave;
    this.element = this.options.element;
    this.id = this.options.id;
    this.animation = this.options.animation || 'marquee {0}s linear infinite';
    
    // Check configuration options
    if ( ! this.element && ! this.id ){
        throw 'Error initializing Marquee, element or id must be set!';
    }
    
    this.constructor = function() {
        // Resolve element
        this.element = this.element || document.getElementById( this.id );
        if ( ! this.element ){
            throw 'Error initializing Marquee, element not found: ' + this.id;
        }
        
        // Set text of element if it was set; otherwise get the text from element
        if ( this.text && this.text !== '' ){
            this.element.textContent = this.text;
        } else {
            this.text = this.element.textContent.trim();
        }
        if ( this.text === '' ){
            throw 'Error initializing Marquee, set "text" option to customize your Marquee or type some text in the element!';
        }
        
        // Add listeners for mouseEnter and mouseLeave if needed
        this.addEventListeners();
        
        // Start animation!
        this.start();
    };
    
    this.addEventListeners = function(){
        var self = this;
        if ( this.pauseOnMouseEnter ) {
            this.element.addEventListener( 'mouseenter', function(){ self.pause(); } );
        }
        if ( this.playOnMouseLeave ){
            this.element.addEventListener( 'mouseleave', function(){ self.play(); } );
        }
    };
    
    this.changeCSSVars = function(){
        var em = Math.trunc( this.text.length * .8 );
        //var em = this.text.length;
        //alert( this.text.length + ' : ' + em );
        document.documentElement.style.setProperty( '--marquee-text-indent', -em + 'em' );
    };
    
    this.start = function() {
        this.changeCSSVars();
        this.element.style.animation = this.animation.replaceAll( '{0}', this.speed );
    };
    
    /* Start public methods */
    this.pause = function() {
        this.element.style.animationPlayState = 'paused';
    };
    
    this.play = function() {
        this.element.style.animationPlayState = 'running';
    };
    
    this.updateText = function( newText ) {
        this.text = newText;
        this.element.textContent = newText;
        this.element.style.animation = '';
        this.start();
    };
    
    this.destroy = function( removeText ) {
        this.element.style.animation = '';
        if ( removeText ){
            this.element.textContent = '';
        }
        // Replace element with cloned to remove all listeners
        this.element.replaceWith( 
            this.element.cloneNode( true ) 
        );
    };
    /* End public methods */
    
    // Initialize
    this.constructor();
}
