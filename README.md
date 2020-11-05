# zzDOM

**zzDOM** is a tiny javascript API that implements only the DOM functions of [Jquery](https://jquery.com/) including chaining. 

* A subset of methods of Jquery implemented. Only main features are supported.
* Low performance penalty over using vanilla javascript: instance one or more simple javascript objects.
* Easy to customize and to extend. Clear and simple code: [KISS](https://en.wikipedia.org/wiki/KISS_principle).
* Two available versions: 
    * A smaller (**zzDOM-closures**).
    * A bigger with [Google closure compiler](https://developers.google.com/closure/compiler) support (**zzDOM-gcc**).
* Divided into modules, a core and some optional plugins:
    * core. Includes the main components of **zzDOM** and the DOM functions.
    * visible. A plugin that includes methods related to visibility of elements.
    * events. Attach and remove event listeners. It can also trigger events.
    * forms. Basic managing of form elements.
    * center. Makes it easy to center elements in page.
    * utils. Includes some utility methods.
* Small size:
    * Core: 9.9KB minified, 2.9KB gzipped.
    * Full (includes all the plugins): 13.4KB minified, 3.9KB gzipped.

## Browser Support
No support for old browsers. No polyfills. **zzDOM** should work with any browser that supports **document.querySelectorAll()**.

## Using zzDOM
Some of them are equivalent to jquery's, but other are valid only in **zzDOM**.

Using standard CSS selectors (it calls to **document.querySelectorAll**):

```javascript
    zz( '#myId' ).text( 'Hello world!' );
    zz( '.myClass .myClass2' ).text( 'Hello world!' );
    zz( 'div:nth-child(even)' ).text( 'Hello world!' );
```

Chaining methods:

```javascript
    zz( '#myId' )
        .text( 'Hello world!' )
        .addClass( 'myClass' )
        .attr( 'name', 'myName');
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

Using **el** to access an Element (only works when there is only 1 element, valid only in **zzDOM**):

```javascript
    zz( '#myId' ).el.textContent( 'Hello world!' ); // Set text of element to Hello world!
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

Using an id (it calls to **document.getElementById**, valid only in **zzDOM**):

```javascript
    zz( '#', 'myId' ).text( 'Hello world!' );
```

Using a class (it calls to **document.getElementsByClassName**, valid only in **zzDOM**):

```javascript
    zz( '.', 'myClass' ).text( 'Hello world!' );
```

Using a tag name (it calls to **document.getElementsByTagName**, valid only in **zzDOM**):

```javascript
    zz( 't', 'div' ).text( 'Hello world!' );
```

Using a name (it calls to **document.getElementsByName**, valid only in **zzDOM**):

```javascript
    zz( 'n', 'myName' ).text( 'Hello world!' );
```

Using a query selector (it calls to **document.querySelector**, valid only in **zzDOM**):

```javascript
    zz( 's', '#myId span' ).text( 'Hello world!' );
```

## Methods
Available methods are divided into the core and some plugins:

### Core
* addClass: Adds the specified class(es) to each element in the set of matched elements.
    * .addClass( className ): One class to be added to the class attribute of each matched element.
    * .addClass( classNames ): An array of classes to be added to the class attribute of each matched element.
* after: Insert content, specified by the parameter, after each element in the set of matched elements.
    * .after( content ): Where content is a HTML string, DOM element or zzDOM object to insert after each element in the set of matched elements.
* append: Insert content, specified by the parameter, to the end of each element in the set of matched elements.
    * .append( content ): Where content is a HTML string, DOM element or zzDOM object to insert at the end of each element in the set of matched elements.
* appendTo: Insert every element in the set of matched elements to the end of the target.
    * .appendTo( target ):  Where target is a selector, DOM element, HTML string or zzDOM object; the matched set of elements will be inserted at the end of the element(s) specified by this parameter.
* attr: Get the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.
    * .attr( attributeName ): Get the value of an attribute for the first element in the set of matched elements.
    * .attr( attributeName, value ): Set one attribute for the set of matched elements. If value is null, the specified attribute will be removed.
    * .attr( attributesObject ): Set some attributes using the specified attribute-value pairs.
* before: Insert content, specified by the parameter, before each element in the set of matched elements.
    * .before( content ): Where content is a HTML string, DOM element or zzDOM object to insert before each element in the set of matched elements.
* children: Get the children of each element in the set of matched elements, optionally filtered by a selector.
    * .children( [selector] )
* clone: Create a deep copy of the set of matched elements.
    * .clone()
* css: Get or set CSS properties.
    * .css( propertyName ): Get the computed style property for the first element in the set of matched elements.
    * .css( propertyName, value ): Set one CSS property for the set of matched elements.
    * .css( propertiesObject ): Set some CSS properties using the specified property-value pairs.
* each: Iterate over a zzDOM object, executing a function for each matched element.
    * .each( function ): Function accepts an index and a zzDOM object as parameters.
* empty: Remove all child nodes of the set of matched elements from the DOM.
    * .empty()
* filter: Reduce the set of matched elements. 
    * .filter( selector ): Reduce the set of matched elements to those that match the selector.
    * .filter( function ): Reduce the set of matched elements to those that pass the function's test.
* find: Get the descendants of each element in the current set of matched elements, filtered by a selector.
    * .find( selector )
* hasClass: Determine whether any of the matched elements are assigned the given class.
    * .hasClass( className )
* height: Get the current computed height for the first element in the set of matched elements or set the height of every matched element.
    * .height(): Get the current computed height for the first element in the set of matched elements.
    * .height( value ): Set the CSS height of every matched element.
* html: Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.
    * .html(): Get the HTML contents of the first element in the set of matched elements.
    * .html( value ): Set the HTML contents of each element in the set of matched elements.
* index: Returns an integer indicating the position of the first element within the zzDOM object relative to its sibling elements.
    * index()
* is: Check the current matched set of elements against a selector, element, or zzDOM object and return true if at least one of these elements matches the given arguments.
    * .is( content ): Where content is a HTML string, DOM element or zzDOM object to check.
* next: Get the immediately following sibling of each element in the set of matched elements.
    * .next()
* offset: Get the current coordinates of the first element, or set the coordinates of every element, in the set of matched elements, relative to the document.
    * .offset(): Get the current coordinates of the first element in the set of matched elements, relative to the document.
    * .offset( coordinates ): Set the current coordinates of every element in the set of matched elements, relative to the document.
* offsetParent: Get the closest ancestor element that is positioned.
    * .offsetParent()
* outerHeight: Get the current computed outer height (including padding, border, and optionally margin) for the first element in the set of matched elements.
    * .outerHeight ( [withMargin] )
* outerWidth: Get the current computed outer width (including padding, border, and optionally margin) for the first element in the set of matched elements.
    * .outerWidth( [withMargin] )
* parent: Get the parent of each element in the current set of matched elements.
    * .parent()
* position: Get the current coordinates of the first element in the set of matched elements, optionally relative to the offset parent.
    * .position ( [relativeToViewport] )
* prepend: Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.
    * .prepend( content ): Where content is a HTML string, DOM element or zzDOM object  to insert at the beginning of each element in the set of matched elements.
* prev: Get the immediately preceding sibling of each element in the set of matched elements.
    * .prev()
* remove: Remove the set of matched elements from the DOM.
    * .remove() 
* removeAttr: Remove an attribute from each element in the set of matched elements.
    * .removeAttr( attributeName )
* removeClass:  Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
    * .removeClass( className ): Remove one class.
    * .removeClass( classNames ): Remove an array of classes.
    * .removeClass(): Remove all classes.
* replaceWith: Replace each element in the set of matched elements with the provided new content.
    * .replaceWith( newContent ):
* siblings: Get the siblings of each element in the set of matched elements, optionally filtered by a selector.
    * .siblings( [selector] )
* text: Get the text contents of the first element in the set of matched elements or set the text contents of every matched element.
    * .text( text ):
* toggleClass: Add or remove one class from each element in the set of matched elements, depending on either the class's presence or the value of the state argument.
    * .toggleClass( className ): Add or remove one class from each element in the set of matched elements, depending on either the class's presence
    * .toggleClass( className, state ): Add or remove one class from each element in the set of matched elements, depending on the value of the state argument.
* width: Get the current computed width for the first element in the set of matched elements or set the width of every matched element.
    * .width(): Get the current computed width for the first element in the set of matched elements.
    * .width( value ): Set the CSS width of every matched element.

### Visible plugin
* isVisible: Returns true if the first element in the set of matched elements is visible, or false otherwise.
    * isVisible(): 
* hide: Hide the matched elements.
    * .hide()
* show: Display the matched elements.
    * .show();
* toggle: Display or hide the matched elements.
    * .toggle():  Display or hide the matched elements, depending on either the element's current display 
    * .toggle( display ): Use true to show the element or false to hide it.
    
### Events plugin
* off: Remove one or more event handlers. If a listener is specified, remove only this; if an event name is specified, remove all listeners for this event; if no event name is specified remove all listeneres.
    * o.ff( [eventName], [listener], [useCapture] )
* on: Attach an event handler function for one event to the selected elements.
    * .on( eventName, listener, [data], [useCapture] )
* trigger: Execute all handlers and behaviors attached to the matched elements for the given event type.
    * .trigger( eventName ):

### Forms plugin
* checked: Get or set checked status of checkbox or radio elements.
    * checked(): Return the checked boolean of the first matching element found.
    * checked( checked ): Set checked status of checkbox or radio elements in the set of matched elements.
* val: Get or set the value of matching form elements.
    * val(): Return the value of the first matching element found.
    * val( value ): Set the value of elements in the set of matched elements.

### Center plugin
* getXCenter: Returns the X coordinate centering the first element in the set of matched elements in the screen. It uses document.documentElement.clientWidth and outerWidth of the element.
    * .getXCenter():
* getYCenter: Returns the Y coordinate centering the first element in the set of matched elements in the screen. It uses document.documentElement.clientHeight and outerHeight of the element.
    * .getYCenter(): 
* getCenter: Returns a plain object with the coordinates centering the first element in the set of matched elements in the screen.
    * .getCenter(): 
* center: Center the first element in the set of matched elements in the screen.
    * .center(): 
* centerX: Center the X coordinate of the first element in the set of matched elements in the screen.
    * .centerX(): 
* centerY: Center the Y coordinate of the first element in the set of matched elements in the screen.
    * .centerY()

### Utils plugin
* param: Create a serialized representation of a plain object, or a ZZDOM object suitable for use in a URL query string or Ajax request.
    * zzDOM.param()

## License
[LGPL](http://www.gnu.org/licenses/lgpl.html)
