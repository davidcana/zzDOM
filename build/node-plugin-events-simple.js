"use strict";

var Qunit = require( 'qunit' );

//var zzDOM = require('../build/zzDOM-closures-full.js');
//var zz = require( '../index.js' );

//var zzDOM = require( '../index.js' );
var zzDOM = require('../build/zzDOM-closures-core.js');
var zz = zzDOM.zz;

QUnit.test( 'plugin disabled/enabled test', function( assert ) {

    assert.notOk( zzDOM.SS.prototype.off instanceof Function );
    assert.notOk( zzDOM.SS.prototype.on instanceof Function );
    assert.notOk( zzDOM.SS.prototype.trigger instanceof Function );

    assert.notOk( zzDOM.MM.prototype.off instanceof Function );
    assert.notOk( zzDOM.MM.prototype.on instanceof Function );
    assert.notOk( zzDOM.MM.prototype.trigger instanceof Function );

    require( '../plugin-events.js' );

    assert.ok( zzDOM.SS.prototype.off instanceof Function );
    assert.ok( zzDOM.SS.prototype.on instanceof Function );
    assert.ok( zzDOM.SS.prototype.trigger instanceof Function );

    assert.ok( zzDOM.MM.prototype.off instanceof Function );
    assert.ok( zzDOM.MM.prototype.on instanceof Function );
    assert.ok( zzDOM.MM.prototype.trigger instanceof Function );
});

"use strict";

var htmlComparator = (function() {
    /**
     * Find an appropriate `Assert` context to `push` results to.
     */
    
    function _getPushContext(context) {
      var pushContext;

      if (context && typeof context.push === "function") {
        // `context` is an `Assert` context
        pushContext = context;
      }
      else if (context && context.assert && typeof context.assert.push === "function") {
        // `context` is a `Test` context
        pushContext = context.assert;
      }
      else if (
        QUnit && QUnit.config && QUnit.config.current && QUnit.config.current.assert &&
        typeof QUnit.config.current.assert.push === "function"
      ) {
        // `context` is an unknown context but we can find the `Assert` context via QUnit
        pushContext = QUnit.config.current.assert;
      }
      else if (QUnit && typeof QUnit.push === "function") {
        pushContext = QUnit.push;
      }
      else {
        throw new Error("Could not find the QUnit `Assert` context to push results");
      }

      return pushContext;
    };
    
    var trim = function( s ) {
      if ( !s ) {
        return "";
      }
      return typeof s.trim === "function" ? s.trim() : s.replace( /^\s+|\s+$/g, "" );
    };

    var normalizeWhitespace = function( s ) {
      if ( !s ) {
        return "";
      }
      return trim( s.replace( /\s+/g, " " ) );
    };

    var dedupeFlatDict = function( dictToDedupe, parentDict ) {
      var key, val;
      if ( parentDict ) {
        for ( key in dictToDedupe ) {
          val = dictToDedupe[key];
          if ( val && ( val === parentDict[key] ) ) {
            delete dictToDedupe[key];
          }
        }
      }
      return dictToDedupe;
    };

    var objectKeys = Object.keys || (function() {
      var hasOwn = function( obj, propName ) {
        return Object.prototype.hasOwnProperty.call( obj, propName );
      };
      return function( obj ) {
        var keys = [],
          key;
        for ( key in obj ) {
          if ( hasOwn( obj, key ) ) {
            keys.push( key );
          }
        }
        return keys;
      };
    })();
    
    /**
     * Calculate based on `currentStyle`/`getComputedStyle` styles instead
     */
    var getElementStyles = (function() {

      // Memoized
      var camelCase = (function() {
        var camelCaseFn = (function() {
          // Matches dashed string for camelizing
          var rmsPrefix = /^-ms-/,
            msPrefixFix = "ms-",
            rdashAlpha = /-([\da-z])/gi,
            camelCaseReplacerFn = function( all, letter ) {
              return ( letter + "" ).toUpperCase();
            };

          return function( s ) {
            return s.replace(rmsPrefix, msPrefixFix).replace(rdashAlpha, camelCaseReplacerFn);
          };
        })();

        var camelCaseMemoizer = {};

        return function( s ) {
          var temp = camelCaseMemoizer[s];
          if ( temp ) {
            return temp;
          }

          temp = camelCaseFn( s );
          camelCaseMemoizer[s] = temp;
          return temp;
        };
      })();

      var styleKeySortingFn = function( a, b ) {
        return camelCase( a ) < camelCase( b );
      };

      return function( elem ) {
        var styleCount, i, key,
          styles = {},
          styleKeys = [],
          style = elem.ownerDocument.defaultView ?
            elem.ownerDocument.defaultView.getComputedStyle( elem, null ) :
            elem.currentStyle;

        // `getComputedStyle`
        if ( style && style.length && style[0] && style[style[0]] ) {
          styleCount = style.length;
          while ( styleCount-- ) {
            styleKeys.push( style[styleCount] );
          }
          styleKeys.sort( styleKeySortingFn );

          for ( i = 0, styleCount = styleKeys.length ; i < styleCount ; i++ ) {
            key = styleKeys[i];
            if ( typeof style[key] === "string" && style[key] ) {
              if ( key === "cssFloat" || key === "styleFloat" ) {
                styles["float"] = style[key];
              }
              else if ( key !== "cssText" ) {
                styles[camelCase( key )] = style[key];
              }
            }
          }
        }
        // `currentStyle` support: IE < 9.0, Opera < 10.6
        else {
          for ( key in style ) {
            styleKeys.push( key );
          }
          styleKeys.sort();

          for ( i = 0, styleCount = styleKeys.length ; i < styleCount ; i++ ) {
            key = styleKeys[i];
            if ( typeof style[key] === "string" && style[key] ) {
              if ( key === "cssFloat" || key === "styleFloat" ) {
                styles["float"] = style[key];
              }
              else if ( key !== "cssText" ) {
                styles[key] = style[key];
              }
            }
          }
        }

        return styles;
      };
    })();

    
    var serializeElementNode = function( elementNode, rootNodeStyles ) {
      var subNodes, i, len, styles, attrName,
        serializedNode = {
          NodeType: elementNode.nodeType,
          NodeName: elementNode.nodeName.toLowerCase(),
          Attributes: {},
          ChildNodes: []
        };

      subNodes = elementNode.attributes;
      for ( i = 0, len = subNodes.length ; i < len ; i++ ) {
        attrName = subNodes[i].name.toLowerCase();
        serializedNode.Attributes[attrName] = normalizeWhitespace( subNodes[i].value );
      }

      // Only add the style attribute if there is 1+ pertinent rules
      styles = dedupeFlatDict( getElementStyles( elementNode ), rootNodeStyles );
      if ( styles && objectKeys( styles ).length ) {
        serializedNode.Attributes["style"] = styles;
      }

      subNodes = elementNode.childNodes;
      for ( i = 0, len = subNodes.length; i < len; i++ ) {
          var serializedSubnode = serializeNode( subNodes[i], rootNodeStyles );
          if ( serializedSubnode ){
              serializedNode.ChildNodes.push( serializedSubnode );
          }
      }

      return serializedNode;
    };

    var serializeNode = function( node, rootNodeStyles ) {
      var serializedNode;

      switch ( node.nodeType ) {
        case 1:   // Node.ELEMENT_NODE
          serializedNode = serializeElementNode( node, rootNodeStyles );
          break;
        case 3:   // Node.TEXT_NODE
          var text = node.nodeValue.trim();
          if ( text ){
              serializedNode = {
                NodeType: node.nodeType,
                NodeName: node.nodeName.toLowerCase(),
                NodeValue: text
              };
          }
          break;
        case 4:   // Node.CDATA_SECTION_NODE
        case 7:   // Node.PROCESSING_INSTRUCTION_NODE
        case 8:   // Node.COMMENT_NODE
          serializedNode = {
            NodeType: node.nodeType,
            NodeName: node.nodeName.toLowerCase(),
            NodeValue: trim( node.nodeValue )
          };
          break;
        case 5:   // Node.ENTITY_REFERENCE_NODE
        case 9:   // Node.DOCUMENT_NODE
        case 10:  // Node.DOCUMENT_TYPE_NODE
        case 11:  // Node.DOCUMENT_FRAGMENT_NODE
          serializedNode = {
            NodeType: node.nodeType,
            NodeName: node.nodeName
          };
          break;
        case 2:   // Node.ATTRIBUTE_NODE
          throw new Error( "`node.nodeType` was `Node.ATTRIBUTE_NODE` (2), which is not supported by this method" );
        case 6:   // Node.ENTITY_NODE
          throw new Error( "`node.nodeType` was `Node.ENTITY_NODE` (6), which is not supported by this method" );
        case 12:  // Node.NOTATION_NODE
          throw new Error( "`node.nodeType` was `Node.NOTATION_NODE` (12), which is not supported by this method" );
        default:
          throw new Error( "`node.nodeType` was not recognized: " + node.nodeType );
      }

      return serializedNode;
    };
    
    var serializeHtml = function( html ) {
      var rootNode = window.document.createElement( 'div' ),
        rootNodeStyles = getElementStyles( rootNode ),
        serializedHtml = [],
        kids, i, len;
      rootNode.innerHTML = trim( html );

      kids = rootNode.childNodes;
      for ( i = 0, len = kids.length; i < len; i++ ) {
          var serializedSubnode = serializeNode( kids[i], rootNodeStyles );
          if ( serializedSubnode ){
            serializedHtml.push( serializedSubnode );
          }
      }

      return serializedHtml;
    };
    
    var singletonElements = " " + [
          "area", "base", "br", "col", "command", "embed", "hr", "img", "input",
          "keygen", "link", "meta", "param", "source", "track", "wbr"
        ].join( " " ) + " ";
    var isEmptyElement = function( serializedElementNode ) {
      return (
        serializedElementNode.ChildNodes.length === 0 &&
        (
          singletonElements.indexOf( serializedElementNode.NodeName ) >= 0 ||
          (
            serializedElementNode.NodeName === "colgroup" &&
            serializedElementNode.Attributes.hasOwnProperty( "span" )
          )
        )
      );
    };

    var dashify = (function() {
      var dashifyFn = function( s ) {
        return s
          .replace( /([\da-z])([\dA-Z])/, function( all, letter1, letter2 ) {
            return letter1 + "-" + ( letter2 + "" ).toLowerCase();
          })
          .replace( /^ms-/, "-ms-" );
      };

      var dashifyMemoizer = {};

      return function( s ) {
        var temp = dashifyMemoizer[s];
        if ( temp ) {
          return temp;
        }

        temp = dashifyFn( s );
        dashifyMemoizer[s] = temp;
        return temp;
      };
    })();

    var deserializeElementNode = function( serializedElementNode, depth ) {
      var deserializedElementNodeHtml = "";

      deserializedElementNodeHtml += "<" + serializedElementNode.NodeName;

      var attrNames = objectKeys( serializedElementNode.Attributes ).sort();
      for ( var i = 0, len = attrNames.length; i < len; i++ ) {
        if ( attrNames[i] !== "style" ) {
          deserializedElementNodeHtml +=
            " " + attrNames[i] + '="' +
            serializedElementNode.Attributes[attrNames[i]] + '"';
        }
        else {
          var styles = serializedElementNode.Attributes[attrNames[i]];
          var styleKeys = objectKeys( styles ).sort();

          if ( styleKeys.length > 0 ) {
            deserializedElementNodeHtml += " " + attrNames[i] + '="';

            var stylesArr = [];
            for ( var j = 0, count = styleKeys.length; j < count; j++ ) {
              stylesArr.push(
                dashify( styleKeys[j] ) + ":" + styles[styleKeys[j]] + ";"
              );
            }
            deserializedElementNodeHtml += stylesArr.join( " " );
            deserializedElementNodeHtml += '"';
          }
        }
      }

      if ( isEmptyElement( serializedElementNode ) ) {
        deserializedElementNodeHtml += " />";
      }
      else {
        deserializedElementNodeHtml +=
          ">" +
          deserializeHtml( serializedElementNode.ChildNodes, depth ) +
          buildSpaces( --depth ) +
          "</" + serializedElementNode.NodeName + ">";
      }

      return deserializedElementNodeHtml;
    };

    var buildSpaces = function( depth ){
        var result = "";
        for ( var i = 0; i < depth; ++i ){
            result += "  ";
        }
        return result;
    };
    
    var deserializeNode = function( serializedNode, depth ) {
      var deserializedNodeHtml = "\n" + buildSpaces( depth );

      switch ( serializedNode.NodeType ) {
        case 1:   // Node.ELEMENT_NODE
          deserializedNodeHtml += deserializeElementNode( serializedNode, ++depth );
          break;
        case 3:   // Node.TEXT_NODE
          deserializedNodeHtml += serializedNode.NodeValue;
          break;
        case 4:   // Node.CDATA_SECTION_NODE
          deserializedNodeHtml += "<![CDATA[" + serializedNode.NodeValue + "]]>";
          break;
        case 7:   // Node.PROCESSING_INSTRUCTION_NODE
          deserializedNodeHtml += "<?" + serializedNode.NodeName + " " + serializedNode.NodeValue + "?>";
          break;
        case 8:   // Node.COMMENT_NODE
          deserializedNodeHtml += "<!-- " + serializedNode.NodeValue + " -->";
          break;
        case 5:   // Node.ENTITY_REFERENCE_NODE
          deserializedNodeHtml += "&" + serializedNode.NodeName + ";";
          break;
        case 10:  // Node.DOCUMENT_TYPE_NODE
          deserializedNodeHtml += "<!DOCTYPE " + serializedNode.NodeName + ">";
          break;
        case 9:   // Node.DOCUMENT_NODE
        case 11:  // Node.DOCUMENT_FRAGMENT_NODE
          deserializedNodeHtml += "";
          break;
        case 2:   // Node.ATTRIBUTE_NODE
          throw new Error( "`serializedNode.NodeType` was `Node.ATTRIBUTE_NODE` (2), which is not supported by this method" );
        case 6:   // Node.ENTITY_NODE
          throw new Error( "`serializedNode.NodeType` was `Node.ENTITY_NODE` (6), which is not supported by this method" );
        case 12:  // Node.NOTATION_NODE
          throw new Error( "`serializedNode.NodeType` was `Node.NOTATION_NODE` (12), which is not supported by this method" );
        default:
          throw new Error( "`serializedNode.NodeType` was not recognized: " + serializedNode.NodeType );
      }

      deserializedNodeHtml += "\n";
      
      return deserializedNodeHtml;
    };
    
    /**
     * @param {string} serializedHtmlNodes
     * @param {number=} _depth
     */
    var deserializeHtml = function( serializedHtmlNodes, _depth ) {
      var i, len,
          deserializedHtml = "",
          depth = _depth? _depth: 0;
      for ( i = 0, len = serializedHtmlNodes.length; i < len; i++ ) {
        deserializedHtml += deserializeNode( serializedHtmlNodes[i], depth );
      }
      return deserializedHtml;
    };

    var genericEqual = function( actual, expected, message, mustBeEquals ){
        
        var serializedActual, serializedExpected,
            pushContext = _getPushContext( this );

        message = message || mustBeEquals? "HTML should be equal": "HTML should not be equal";
        serializedActual = serializeHtml( actual );
        serializedExpected = serializeHtml( expected );

        // Don't escape quotes!
        QUnit.dump.setParser(
            'string',
            function( str ){
                return str;
            }
        );
        
        var isEquiv = QUnit.equiv( serializedActual, serializedExpected );
        pushContext.push(
          mustBeEquals? isEquiv: !isEquiv,
          deserializeHtml( serializedActual ),
          deserializeHtml( serializedExpected ),
          message
        );
    };
    
    var api = {
      compare: function( actual, expected ) {
          
        // Serialize
        var serializedActual = serializeHtml( actual );
        var serializedExpected = serializeHtml( expected );

        // Deserialize
        var deserializedActual = deserializeHtml( serializedActual );
        var deserializedExpected = deserializeHtml( serializedExpected );
          
        return {
            equals: deserializedActual === deserializedExpected,
            actual: deserializedActual,
            expected: deserializedExpected
        };
      },
        
      /**
       * Compare two snippets of HTML for equality after normalization.
       */
      htmlEqual: function( actual, expected, message ) {
        return genericEqual( actual, expected, message, true );
      },

      /**
       * Compare two snippets of HTML for inequality after normalization.
       */
      notHtmlEqual: function( actual, expected, message ) {
        return genericEqual( actual, expected, message, false );
      },
        
      /**
       * Normalize and serialize an HTML snippet. Primarily only exposed for unit testing purposes.
       */
      _serializeHtml: serializeHtml

    };

    return api;
})();

if ( typeof module === 'object' && module.exports ) {
    module.exports = htmlComparator;
}

// utils singleton class
"use strict";

var utils = {};

utils.assertHtml = function ( assert, id, expectedHtml ){

    var actualElement = window.document.getElementById( id );
    var compare = htmlComparator.compare( 
        actualElement.innerHTML,
        expectedHtml 
    );
    if ( compare.equals ){
        assert.ok( true );
    } else {
        QUnit.dump.setParser(
            'string',
            function( str ){
                return str;
            }
        );
        assert.pushResult({
            result: false,
            actual: compare.actual,
            expected: compare.expected,
            message: 'HTML should be equal!',
            negative: false
        });
    }
};

utils.check0Length = function( assert, $items ){

    for ( const $el of $items ) {
        assert.ok(
            $el instanceof zzDOM.MM
        );
        assert.equal(
            $el.length,
            0
        );
    }
};

utils.checkNull = function( assert, items ){

    for ( const el of items ) {
        assert.ok(
            el == null
        );
    }
};

utils.checkFalse = function( assert, items ){

    for ( const el of items ) {
        assert.ok(
            el === false
        );
    }
};

QUnit.test( 'trigger, on and off test', function( assert ) {
    // Test trigger, event using vanilla addEventListener
    // Use t14-1c as a counter of clicks
    zz( '#t14-1b' ).el.addEventListener( 
        'click', 
        function(){ 
            var current = parseInt( zz( '#t14-1c' ).text(), 10 );
            zz( '#t14-1c' ).text( ++current );
        } 
    );
    
    assert.equal( zz( '#t14-1c' ).text(), '0' );
    var id = zz( '#t14-1b' )
        .trigger( 'click' )
        .attr( 'id' );
    assert.equal( zz( '#t14-1c' ).text(), '1' );
    assert.equal( id, 't14-1b' );
    
    id = zz( '#t14-1b' )
        .trigger( 'click' )
        .attr( 'id' );
    assert.equal( zz( '#t14-1c' ).text(), '2' );
    assert.equal( id, 't14-1b' );
    
    // Test on/off using event name
    // Use t14-2c as a counter of clicks
    zz( '#t14-2b' ).on( 
        'click', 
        function(){ 
            var current = parseInt( zz( '#t14-2c' ).text(), 10 );
            zz( '#t14-2c' ).text( ++current );
        } 
    );
    
    assert.equal( zz( '#t14-2c' ).text(), '0' );
    zz( '#t14-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-2c' ).text(), '1' );
    
    zz( '#t14-2b' ).off( 'click' );
    zz( '#t14-2b' ).trigger( 'click' );
    assert.equal( zz( '#t14-2c' ).text(), '1' );
    
    // Test on/off using NO event name
    // Use t14-3c as a counter of clicks
    zz( '#t14-3b' ).on( 
        'click', 
        function(){ 
            var current = parseInt( zz( '#t14-3c' ).text(), 10 );
            zz( '#t14-3c' ).text( ++current );
        } 
    );
    
    assert.equal( zz( '#t14-3c' ).text(), '0' );
    zz( '#t14-3b' ).trigger( 'click' );
    assert.equal( zz( '#t14-3c' ).text(), '1' );
    
    zz( '#t14-3b' ).off();
    zz( '#t14-3b' ).trigger( 'click' );
    assert.equal( zz( '#t14-3c' ).text(), '1' );
    
    // Test on/off using event name and listener
    // Use t14-4c as a counter of clicks
    var t4Listener = function(){ 
        var current = parseInt( zz( '#t14-4c' ).text(), 10 );
        zz( '#t14-4c' ).text( ++current );
    };
    zz( '#t14-4b' ).on( 'click', t4Listener );
    
    assert.equal( zz( '#t14-4c' ).text(), '0' );
    zz( '#t14-4b' ).trigger( 'click' );
    assert.equal( zz( '#t14-4c' ).text(), '1' );
    
    zz( '#t14-4b' ).off( 'click', t4Listener );
    zz( '#t14-4b' ).trigger( 'click' );
    assert.equal( zz( '#t14-4c' ).text(), '1' );
    
    // Test on/off using event name and listener: 2 listeners
    // Use t14-5c as a counter of clicks
    var t5Listener1 = function(){ 
        var current = parseInt( zz( '#t14-5c' ).text(), 10 );
        zz( '#t14-5c' ).text( ++current );
    };
    zz( '#t14-5b' ).on( 'click', t5Listener1 );
    var t5Listener2 = function(){ 
        var current = parseInt( zz( '#t14-5c' ).text(), 10 );
        zz( '#t14-5c' ).text( 10 + current );
    };
    zz( '#t14-5b' ).on( 'click', t5Listener2 );
    
    assert.equal( zz( '#t14-5c' ).text(), '0' );
    zz( '#t14-5b' ).trigger( 'click' );
    assert.equal( zz( '#t14-5c' ).text(), '11' );
    
    zz( '#t14-5b' ).off( 'click', t5Listener2 );
    zz( '#t14-5b' ).trigger( 'click' );
    assert.equal( zz( '#t14-5c' ).text(), '12' );
    
    // Test on/off using event name and listener: 2 listeners from 2 different events
    // Use t14-6c as a counter of clicks
    var t6Listener1 = function(){ 
        var current = parseInt( zz( '#t14-6c' ).text(), 10 );
        zz( '#t14-6c' ).text( ++current );
    };
    zz( '#t14-6b' ).on( 'click', t6Listener1 );
    var t6Listener2 = function(){ 
        var current = parseInt( zz( '#t14-6c' ).text(), 10 );
        zz( '#t14-6c' ).text( 10 + current );
    };
    zz( '#t14-6b' ).on( 'focus', t6Listener2 );
    
    assert.equal( zz( '#t14-6c' ).text(), '0' );
    zz( '#t14-6b' ).trigger( 'click' );
    assert.equal( zz( '#t14-6c' ).text(), '1' );
    zz( '#t14-6b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-6c' ).text(), '11' );
    
    zz( '#t14-6b' ).off( 'focus', t6Listener2 );
    zz( '#t14-6b' ).trigger( 'click' );
    assert.equal( zz( '#t14-6c' ).text(), '12' );
    zz( '#t14-6b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-6c' ).text(), '12' );
    
    // Test on/off using event name: 2 listeners from 2 different events
    // Use t14-7c as a counter of clicks
    var t7Listener1 = function(){ 
        var current = parseInt( zz( '#t14-7c' ).text(), 10 );
        zz( '#t14-7c' ).text( ++current );
    };
    zz( '#t14-7b' ).on( 'click', t7Listener1 );
    var t7Listener2 = function(){ 
        var current = parseInt( zz( '#t14-7c' ).text(), 10 );
        zz( '#t14-7c' ).text( 10 + current );
    };
    zz( '#t14-7b' ).on( 'focus', t7Listener2 );
    
    assert.equal( zz( '#t14-7c' ).text(), '0' );
    zz( '#t14-7b' ).trigger( 'click' );
    assert.equal( zz( '#t14-7c' ).text(), '1' );
    zz( '#t14-7b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-7c' ).text(), '11' );
    
    zz( '#t14-7b' ).off( 'focus' );
    zz( '#t14-7b' ).trigger( 'click' );
    assert.equal( zz( '#t14-7c' ).text(), '12' );
    zz( '#t14-7b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-7c' ).text(), '12' );
    
    // Test on/off using NO event name: 2 listeners from 2 different events
    // Use t14-8c as a counter of clicks
    var t8Listener1 = function(){ 
        var current = parseInt( zz( '#t14-8c' ).text(), 10 );
        zz( '#t14-8c' ).text( ++current );
    };
    zz( '#t14-8b' ).on( 'click', t8Listener1 );
    var t8Listener2 = function(){ 
        var current = parseInt( zz( '#t14-8c' ).text(), 10 );
        zz( '#t14-8c' ).text( 10 + current );
    };
    zz( '#t14-8b' ).on( 'focus', t8Listener2 );
    
    assert.equal( zz( '#t14-8c' ).text(), '0' );
    zz( '#t14-8b' ).trigger( 'click' );
    assert.equal( zz( '#t14-8c' ).text(), '1' );
    zz( '#t14-8b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-8c' ).text(), '11' );
    
    zz( '#t14-8b' ).off();
    zz( '#t14-8b' ).trigger( 'click' );
    assert.equal( zz( '#t14-8c' ).text(), '11' );
    zz( '#t14-8b' ).trigger( 'focus' );
    assert.equal( zz( '#t14-8c' ).text(), '11' );
    
    // Test on using data
    // Use t14-9c as a counter of clicks
    var t9Listener = function( e ){ 
        var current = parseInt( zz( '#t14-9c' ).text(), 10 );
        zz( '#t14-9c' ).text( current + e.data.delta );
    };
    zz( '#t14-9b' ).on( 
        'click', 
        t9Listener, 
        {
            delta: 42
        } 
    );
    
    assert.equal( zz( '#t14-9c' ).text(), '0' );
    zz( '#t14-9b' ).trigger( 'click' );
    assert.equal( zz( '#t14-9c' ).text(), '42' );
    zz( '#t14-9b' ).trigger( 'click' );
    assert.equal( zz( '#t14-9c' ).text(), '84' );

    // Test on using trigger params
    // Use t14-10c as a counter of clicks
    var t10Listener = function( e ){ 
        var current = parseInt( zz( '#t14-10c' ).text(), 10 );
        zz( '#t14-10c' ).text( current + e.params.delta );
    };
    zz( '#t14-10b' ).on( 'click', t10Listener );

    zz( '#t14-10b' ).trigger(
        'click',
        {
            delta: 15
        }
    );
    assert.equal( zz( '#t14-10c' ).text(), '15' );

    zz( '#t14-10b' ).trigger(
        'click',
        {
            delta: 10
        }
    );
    assert.equal( zz( '#t14-10c' ).text(), '25' );

    // Test on using data and trigger params
    // Use t14-11c as a counter of clicks
    var t11Listener = function( e ){ 
        var current = parseInt( zz( '#t14-11c' ).text(), 10 );
        zz( '#t14-11c' ).text( current + e.data.delta + e.params.delta );
    };
    zz( '#t14-11b' ).on( 
        'click', 
        t11Listener, 
        {
            delta: 2
        }
    );
    zz( '#t14-11b' ).trigger(
        'click',
        {
            delta: 5
        }
    );
    assert.equal( zz( '#t14-11c' ).text(), '7' );

    zz( '#t14-11b' ).trigger(
        'click',
        {
            delta: 3
        }
    );
    assert.equal( zz( '#t14-11c' ).text(), '12' );
});
