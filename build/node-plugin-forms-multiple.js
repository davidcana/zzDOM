"use strict";

var Qunit = require( 'qunit' );

//var zzDOM = require('../build/zzDOM-closures-full.js');
//var zz = require( '../index.js' );

//var zzDOM = require( '../index.js' );
var zzDOM = require('../build/zzDOM-closures-core.js');
var zz = zzDOM.zz;


QUnit.test( 'plugin disabled/enabled test', function( assert ) {

    assert.notOk( zzDOM.SS.prototype.checked instanceof Function );
    assert.notOk( zzDOM.SS.prototype.disabled instanceof Function );
    assert.notOk( zzDOM.SS.prototype.indeterminate instanceof Function );
    assert.notOk( zzDOM.SS.prototype.prop instanceof Function );
    assert.notOk( zzDOM.SS.prototype.val instanceof Function );

    assert.notOk( zzDOM.MM.prototype.checked instanceof Function );
    assert.notOk( zzDOM.MM.prototype.disabled instanceof Function );
    assert.notOk( zzDOM.MM.prototype.indeterminate instanceof Function );
    assert.notOk( zzDOM.MM.prototype.prop instanceof Function );
    assert.notOk( zzDOM.MM.prototype.val instanceof Function );

    require( '../plugin-forms.js' );

    assert.ok( zzDOM.SS.prototype.checked instanceof Function );
    assert.ok( zzDOM.SS.prototype.disabled instanceof Function );
    assert.ok( zzDOM.SS.prototype.indeterminate instanceof Function );
    assert.ok( zzDOM.SS.prototype.prop instanceof Function );
    assert.ok( zzDOM.SS.prototype.val instanceof Function );

    assert.ok( zzDOM.MM.prototype.checked instanceof Function );
    assert.ok( zzDOM.MM.prototype.disabled instanceof Function );
    assert.ok( zzDOM.MM.prototype.indeterminate instanceof Function );
    assert.ok( zzDOM.MM.prototype.prop instanceof Function );
    assert.ok( zzDOM.MM.prototype.val instanceof Function );
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

QUnit.test( 'val and checked test', function( assert ) {
    var t19_1_1_original = 'test value t19-1-1',
        t19_1_2_original = 'test value t19-1-2',
        t19_1_modified = 'test value t19-1' + ' modified',
        t19_2_1_original = 'test value t19-2-1',
        t19_2_2_original = 'test value t19-2-2',
        t19_2_modified = 'test value t19-2' + ' modified',
        t19_3_1_original = 'test value t19-3-1',
        t19_3_2_original = 'test value t19-3-2',
        t19_3_modified = 'test value t19-3' + ' modified',
        t19_4_1_original = 'mozilla',
        t19_4_2_original = 'linux',
        t19_4_modified = 'fsf',
        t19_5_1_original = [ 'mozilla', 'linux' ],
        t19_5_2_original = [ 'fsf', 'mozilla' ],
        t19_5_modified = [ 'fsf', 'linux' ],
        t19_8_1_original = 'fsf',
        t19_8_1_modified = 'linux',
        t19_9_original = 'test value t19-9',
        t19_9_modified = t19_9_original + ' modified';
        
    assert.equal( zz( '#t19-1-1' ).val(), t19_1_1_original );
    assert.equal( zz( '#t19-1-2' ).val(), t19_1_2_original );
    assert.equal( zz( '#t19-2-1' ).val(), t19_2_1_original );
    assert.equal( zz( '#t19-2-2' ).val(), t19_2_2_original );
    assert.equal( zz( '#t19-3-1' ).val(), t19_3_1_original );
    assert.equal( zz( '#t19-3-2' ).val(), t19_3_2_original );
    assert.equal( zz( '#t19-4-1' ).val(), t19_4_1_original );
    assert.equal( zz( '#t19-4-2' ).val(), t19_4_2_original );
    assert.deepEqual( zz( '#t19-5-1' ).val(), t19_5_1_original );
    assert.deepEqual( zz( '#t19-5-2' ).val(), t19_5_2_original );
    
    zz( '.t19-1' ).val( t19_1_modified );
    assert.equal( zz( '#t19-1-1' ).val(), t19_1_modified );
    assert.equal( zz( '#t19-1-2' ).val(), t19_1_modified );
    
    zz( '.t19-2' ).val( t19_2_modified );
    assert.equal( zz( '#t19-2-1' ).val(), t19_2_modified );
    assert.equal( zz( '#t19-2-2' ).val(), t19_2_modified );
    
    zz( '.t19-3' ).val( t19_3_modified );
    assert.equal( zz( '#t19-3-1' ).val(), t19_3_modified );
    assert.equal( zz( '#t19-3-2' ).val(), t19_3_modified );
    
    zz( '.t19-4' ).val( t19_4_modified );
    assert.equal( zz( '#t19-4-1' ).val(), t19_4_modified );
    assert.equal( zz( '#t19-4-2' ).val(), t19_4_modified );
    
    zz( '.t19-5' ).val( t19_5_modified );
    assert.deepEqual( zz( '#t19-5-1' ).val(), t19_5_modified );
    assert.deepEqual( zz( '#t19-5-2' ).val(), t19_5_modified );
    
    assert.notOk( zz( '#t19-6-1' ).checked() );
    assert.ok( zz( '#t19-6-2' ).checked() );
    zz( '.t19-6' ).checked( true );
    assert.ok( zz( '#t19-6-1' ).checked() );
    assert.ok( zz( '#t19-6-2' ).checked() );
    
    assert.notOk( zz( '#t19-7-1' ).checked() );
    assert.ok( zz( '#t19-7-2' ).checked() );
    zz( '.t19-7' ).checked( false );
    assert.notOk( zz( '#t19-7-1' ).checked() );
    assert.notOk( zz( '#t19-7-2' ).checked() );

    assert.equal( zz( '#t19-8-1-1' ).val(), t19_8_1_original );
    assert.equal( zz( '#t19-8-1-2' ).val(), t19_8_1_original );
    zz( '.t19-8-1' ).val( t19_8_1_modified );
    assert.equal( zz( '#t19-8-1-1' ).val(), t19_8_1_modified );
    assert.equal( zz( '#t19-8-1-2' ).val(), t19_8_1_modified );

    assert.equal( zz( '#t19-9-1' ).val(), t19_9_original );
    assert.equal( zz( '#t19-9-2' ).val(), t19_9_original );
    zz( '.t19-9' ).val( t19_9_modified );
    assert.equal( zz( '#t19-9-1' ).val(), t19_9_modified );
    assert.equal( zz( '#t19-9-2' ).val(), t19_9_modified );
});

QUnit.test( 'disabled test', function( assert ) {
    var t26_1_1 = 'test value t26-1-1',
        t26_1_2 = 'test value t26-1-2';
    assert.equal( zz( '#t26-1-1' ).val(), t26_1_1 );
    assert.equal( zz( '#t26-1-2' ).val(), t26_1_2 );

    assert.notOk( zz( '#t26-1-1' ).disabled() );
    assert.notOk( zz( '#t26-1-2' ).disabled() );

    zz( '.t26-1' ).disabled( true );
    assert.ok( zz( '#t26-1-1' ).disabled() );
    assert.ok( zz( '#t26-1-2' ).disabled() );

    zz( '.t26-1' ).disabled( false );
    assert.notOk( zz( '#t26-1-1' ).disabled() );
    assert.notOk( zz( '#t26-1-2' ).disabled() );

    zz( '.t26-1' ).disabled( true );
    assert.ok( zz( '#t26-1-1' ).disabled() );
    assert.ok( zz( '#t26-1-2' ).disabled() );
});

/*
(From https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate)
Elements targeted by this selector are:

<input type="checkbox"> elements whose indeterminate property is set to true
<input type="radio"> elements, when all radio buttons with the same name value in the form are unchecked
<progress> elements in an indeterminate state
*/
QUnit.test( 'indeterminate checkbox test', function( assert ) {

    assert.notOk( zz( '#t27-1-1' ).indeterminate() );
    assert.notOk( zz( '#t27-1-2' ).indeterminate() );

    zz( '.t27-1' ).indeterminate( true );
    assert.ok( zz( '#t27-1-1' ).indeterminate() );
    assert.ok( zz( '#t27-1-2' ).indeterminate() );

    zz( '.t27-1' ).indeterminate( false );
    assert.notOk( zz( '#t27-1-1' ).indeterminate() );
    assert.notOk( zz( '#t27-1-2' ).indeterminate() );

    zz( '.t27-1' ).indeterminate( true );
    assert.ok( zz( '#t27-1-1' ).indeterminate() );
    assert.ok( zz( '#t27-1-2' ).indeterminate() );
});

QUnit.test( 'prop test', function( assert ) {

    // checked
    assert.notOk( zz( '#t28-1-1' ).prop( 'checked' ) );
    assert.notOk( zz( '#t28-1-2' ).prop( 'checked' ) );

    zz( '.t28-1' ).prop( 'checked', true );
    assert.ok( zz( '#t28-1-1' ).prop( 'checked' ) );
    assert.ok( zz( '#t28-1-2' ).prop( 'checked' ) );

    zz( '.t28-1' ).prop( 'checked', false );
    assert.notOk( zz( '#t28-1-1' ).prop( 'checked' ) );
    assert.notOk( zz( '#t28-1-2' ).prop( 'checked' ) );

    zz( '.t28-1' ).prop( 'checked', true );
    assert.ok( zz( '#t28-1-1' ).prop( 'checked' ) );
    assert.ok( zz( '#t28-1-2' ).prop( 'checked' ) );
    
    // disabled
    assert.notOk( zz( '#t28-2-1' ).prop( 'disabled' ) );
    assert.notOk( zz( '#t28-2-2' ).prop( 'disabled' ) );

    zz( '.t28-2' ).prop( 'disabled', true );
    assert.ok( zz( '#t28-2-1' ).prop( 'disabled' ) );
    assert.ok( zz( '#t28-2-2' ).prop( 'disabled' ) );

    zz( '.t28-2' ).prop( 'disabled', false );
    assert.notOk( zz( '#t28-2-1' ).prop( 'disabled' ) );
    assert.notOk( zz( '#t28-2-2' ).prop( 'disabled' ) );

    zz( '.t28-2' ).prop( 'disabled', true );
    assert.ok( zz( '#t28-2-1' ).prop( 'disabled' ) );
    assert.ok( zz( '#t28-2-2' ).prop( 'disabled' ) );
    
    // indeterminate
    assert.notOk( zz( '#t28-3-1' ).prop( 'indeterminate' ) );
    assert.notOk( zz( '#t28-3-2' ).prop( 'indeterminate' ) );

    zz( '.t28-3' ).prop( 'indeterminate', true );
    assert.ok( zz( '#t28-3-1' ).prop( 'indeterminate' ) );
    assert.ok( zz( '#t28-3-2' ).prop( 'indeterminate' ) );

    zz( '.t28-3' ).prop( 'indeterminate', false );
    assert.notOk( zz( '#t28-3-1' ).prop( 'indeterminate' ) );
    assert.notOk( zz( '#t28-3-2' ).prop( 'indeterminate' ) );
    
    zz( '.t28-3' ).prop( 'indeterminate', true );
    assert.ok( zz( '#t28-3-1' ).prop( 'indeterminate' ) );
    assert.ok( zz( '#t28-3-2' ).prop( 'indeterminate' ) );
});

QUnit.test( 'no nodes forms test', function( assert ) {

    var $notFound = zz( '#notFound' );

    // Some elements must return an empty zzDOM object
    utils.check0Length(
        assert,
        [
            $notFound.checked( true ),
            $notFound.disabled( true ),
            $notFound.indeterminate( true ),
            $notFound.prop( 'checked', true ),
            $notFound.val( 'a' )
        ]
    );
  
    // Some elements must return null
    utils.checkNull(
        assert,
        [
            $notFound.checked(),
            $notFound.disabled(),
            $notFound.indeterminate(),
            $notFound.prop( 'checked' ),
            $notFound.val()
        ]
    );

    // Some elements must return false
    utils.checkFalse(
        assert,
        [

        ]
    );
});

