# zzDOM

**zzDOM** is a tiny javascript API that implements only the DOM functions of [Jquery](https://jquery.com/) including chaining. 

* A subset of methods of Jquery implemented. Only essential features are supported.
* Small size.
* 2 available versions: a smaller (**zzDOM-closures**) and a bigger with [Google closure compiler](https://developers.google.com/closure/compiler) support (**zzDOM-gcc**).
* No support for old browsers. No polyfills.

## Browser Support


## Using zzDOM


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
* css = function ();
* empty = function ()
* filter = function ( x )
* find = function ( selector )
* hasClass = function ( name )
* height = function ( value )
* html = function ( name )
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
* text = function ( name )
* toggleClass = function ( name, value )
* width = function ( value )

### Show/hide plugin
* isVisible = function ()
* hide = function ()
* show = function ()
* toggle = function ()

### Events plugin
* off = function ( eventName, listener, useCapture )
* on = function ( eventName, listener, useCapture )
* trigger = function ( eventName )

Please, take a look at [the zzDOM web](https://davidcana.github.io/zzDOM) for more information about zzDOM.

## License
[LGPL](http://www.gnu.org/licenses/lgpl.html)
