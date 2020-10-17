# zzDOM

**zzDOM** is a tiny javascript API that implements only the DOM functions of [Jquery](https://jquery.com/) including chaining. 

* A subset of methods of Jquery implemented. Only main features are supported.
* 2 available versions: a smaller (**zzDOM-closures**) and a bigger with [Google closure compiler](https://developers.google.com/closure/compiler) support (**zzDOM-gcc**).
* Divided into modules, a core and some optional plugins:
    * core. Includes the main components of **zzDOM** and the DOM functions.
    * visible. A plugin that includes methods related to visibility of elements.
    * events. Attach and remove event listeners. It can also trigger events.
    * forms. Basic managing of form elements.
    * center. Makes it easy to center elements in page.
* Small size:
    * Core: -KB minified, -KB gzipped.
    * All: 13.2KB minified, 3.8KB gzipped.

## Browser Support
No support for old browsers. No polyfills. **zzDOM** should work with any browser that supports **document.querySelectorAll()**.

## Using zzDOM
Using standard CSS selectors (it calls to **document.querySelectorAll**):

```javascript
    zz( '#myId' ).text( 'Hello world!' );
    zz( '.myClass .myClass2' ).text( 'Hello world!' );
    zz( 'div:nth-child(even)' ).text( 'Hello world!' );
```

Appending html code:

```javascript
    zz( '<div id="myId">New div</div>' ).appendTo( '#anotherId' );
```

Using array syntax to access an Element:

```javascript
    zz( '#myId' )[0].textContent( 'Hello world!' ); // Set text of element to Hello world!
    zz( '.myClass' )[3].textContent( 'Hello world!' ); // Set text of fourth element to Hello world!

    var $divs = zz( '.myClass' );
    for ( var c = 0; c < $divs.length; ++c ){ // Iterate through elements in zz( '.myClass' )
        var element = $divs[ c ];
        // Do something with element
        ...
    }
```

Using an Element:

```javascript
    zz( document.getElementById( 'myId' ) ).text( 'Hello world!' );
```

Using a HTMLCollection:

```javascript
    zz( document.getElementsByClassName( 'myClass' ) ).text( 'Hello world!' );
```

Using a NodeList:

```javascript
    zz( document.getElementsByTagName( 'div' ) ).text( 'Hello world!' );
```

Using an id (it calls to **document.getElementById**):

```javascript
    zz( '#', 'myId' ).text( 'Hello world!' );
```

Using a class (it calls to **document.getElementsByClassName**):

```javascript
    zz( '.', 'myClass' ).text( 'Hello world!' );
```

Using a tag name (it calls to **document.getElementsByTagName**):

```javascript
    zz( 't', 'div' ).text( 'Hello world!' );
```

Using a name (it calls to **document.getElementsByName**):

```javascript
    zz( 'n', 'myName' ).text( 'Hello world!' );
```

Using a query selector (it calls to **document.querySelector**):

```javascript
    zz( 's', '#myId span' ).text( 'Hello world!' );
```

## Methods

### Core
* addClass = function ( name )
* after = function ( x )
* append = function ( x )
* appendTo = function ( x )
* attr = function ( name, value )
* before = function ( x )
* children = function ( selector )
* clone = function ()
* css = function ()
* empty = function ()
* filter = function ( x )
* find = function ( selector )
* hasClass = function ( name )
* height = function ( value )
* html = function ( value )
* index = function ()
* is = function ( x )
* next = function ()
* offset = function ( c )
* offsetParent = function ()
* outerHeight = function ( withMargin )
* outerWidth = function ( withMargin )
* parent = function ()
* position = function ( relativeToViewport )
* prepend = function ( x )
* prev = function ()
* remove = function ()
* removeAttr = function ( name )
* removeClass = function ( name )
* replaceWith = function ( value )
* siblings = function ( selector )
* text = function ( value )
* toggleClass = function ( name, value )
* width = function ( value )

### Visible plugin
* isVisible = function ()
* hide = function ()
* show = function ()
* toggle = function ( state )

### Events plugin
* off = function ( name, listener, useCapture )
* on = function ( name, listener, useCapture )
* trigger = function ( name )

### Forms plugin
* checked = function ( checked )
* val = function ( value )

### Center plugin
* getXCenteredPosition = function ()
* getYCenteredPosition = function ()
* getCenteredPosition = function ()
* center = function ()
* centerX = function ()
* centerY = function ()

Please, take a look at [the zzDOM web](https://davidcana.github.io/zzDOM) for more information about zzDOM.

## License
[LGPL](http://www.gnu.org/licenses/lgpl.html)
