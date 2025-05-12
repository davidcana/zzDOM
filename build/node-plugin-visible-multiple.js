"use strict";

var Qunit = require( 'qunit' );

//var zzDOM = require('../build/zzDOM-closures-full.js');
//var zz = require( '../index.js' );

//var zzDOM = require( '../index.js' );
var zzDOM = require('../build/zzDOM-closures-core.js');
var zz = zzDOM.zz;

QUnit.test( 'plugin disabled/enabled test', function( assert ) {

    assert.notOk( zzDOM.SS.prototype.fadeIn instanceof Function );
    assert.notOk( zzDOM.SS.prototype.fadeOut instanceof Function );
    assert.notOk( zzDOM.SS.prototype.hide instanceof Function );
    assert.notOk( zzDOM.SS.prototype.isVisible instanceof Function );
    assert.notOk( zzDOM.SS.prototype.show instanceof Function );
    assert.notOk( zzDOM.SS.prototype.toggle instanceof Function );

    assert.notOk( zzDOM.MM.prototype.checked instanceof Function );
    assert.notOk( zzDOM.MM.prototype.fadeOut instanceof Function );
    assert.notOk( zzDOM.MM.prototype.hide instanceof Function );
    assert.notOk( zzDOM.MM.prototype.isVisible instanceof Function );
    assert.notOk( zzDOM.MM.prototype.show instanceof Function );
    assert.notOk( zzDOM.MM.prototype.toggle instanceof Function );

    require( '../plugin-visible.js' );

    assert.ok( zzDOM.SS.prototype.fadeIn instanceof Function );
    assert.ok( zzDOM.SS.prototype.fadeOut instanceof Function );
    assert.ok( zzDOM.SS.prototype.hide instanceof Function );
    assert.ok( zzDOM.SS.prototype.isVisible instanceof Function );
    assert.ok( zzDOM.SS.prototype.show instanceof Function );
    assert.ok( zzDOM.SS.prototype.toggle instanceof Function );

    assert.ok( zzDOM.MM.prototype.fadeIn instanceof Function );
    assert.ok( zzDOM.MM.prototype.fadeOut instanceof Function );
    assert.ok( zzDOM.MM.prototype.hide instanceof Function );
    assert.ok( zzDOM.MM.prototype.isVisible instanceof Function );
    assert.ok( zzDOM.MM.prototype.show instanceof Function );
    assert.ok( zzDOM.MM.prototype.toggle instanceof Function );
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

QUnit.test( 'hide, show, toggle and isVisible test', function( assert ) {
    // .t15-1 is visible
    assert.notEqual( zz( '#t15-1-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-1-2' ).el.offsetParent, null );
    var ids = [];
    zz( '.t15-1' )
        .hide()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-1-1', 't15-1-2' ] );
    assert.equal( zz( '#t15-1-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-1-2' ).el.offsetParent, null );
    ids = [];
    zz( '.t15-1' )
        .show()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-1-1', 't15-1-2' ] );
    assert.notEqual( zz( '#t15-1-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-1-2' ).el.offsetParent, null );
    ids = [];
    zz( '.t15-1' )
        .hide()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-1-1', 't15-1-2' ] );
    assert.equal( zz( '#t15-1-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-1-2' ).el.offsetParent, null );
    
    // .t15-2 is NOT visible
    assert.equal( zz( '#t15-2-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-2-2' ).el.offsetParent, null );
    zz( '.t15-2' ).show();
    assert.notEqual( zz( '#t15-2-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-2-2' ).el.offsetParent, null );
    zz( '.t15-2' ).hide();
    assert.equal( zz( '#t15-2-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-2-2' ).el.offsetParent, null );
    zz( '.t15-2' ).show();
    assert.notEqual( zz( '#t15-2-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-2-2' ).el.offsetParent, null );
    
    // .t15-3 is visible
    assert.notEqual( zz( '#t15-3-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-3-2' ).el.offsetParent, null );
    ids = [];
    zz( '.t15-3' )
        .toggle()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-3-1', 't15-3-2' ] );
    assert.equal( zz( '#t15-3-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-3-2' ).el.offsetParent, null );
    ids = [];
    zz( '.t15-3' )
        .toggle()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-3-1', 't15-3-2' ] );
    assert.notEqual( zz( '#t15-3-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-3-2' ).el.offsetParent, null );
    ids = [];
    zz( '.t15-3' )
        .toggle()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't15-3-1', 't15-3-2' ] );
    assert.equal( zz( '#t15-3-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-3-2' ).el.offsetParent, null );
    
    // .t15-4 is NOT visible
    assert.equal( zz( '#t15-4-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-4-2' ).el.offsetParent, null );
    zz( '.t15-4' ).toggle();
    assert.notEqual( zz( '#t15-4-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-4-2' ).el.offsetParent, null );
    zz( '.t15-4' ).toggle();
    assert.equal( zz( '#t15-4-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-4-2' ).el.offsetParent, null );
    zz( '.t15-4' ).toggle();
    assert.notEqual( zz( '#t15-4-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-4-2' ).el.offsetParent, null );
    
    // .t15-5 is visible
    assert.notEqual( zz( '#t15-5-1' ).el.offsetParent, null );
    assert.notEqual( zz( '#t15-5-2' ).el.offsetParent, null );
    assert.ok( zz( '#t15-5-1' ).isVisible() );
    assert.ok( zz( '#t15-5-2' ).isVisible() );
    zz( '.t15-5' ).hide();
    assert.notOk( zz( '#t15-5-1' ).isVisible() );
    assert.notOk( zz( '#t15-5-2' ).isVisible() );
    zz( '.t15-5' ).show();
    assert.ok( zz( '#t15-5-1' ).isVisible() );
    assert.ok( zz( '#t15-5-2' ).isVisible() );
    
    // .t15-6 is NOT visible
    assert.equal( zz( '#t15-6-1' ).el.offsetParent, null );
    assert.equal( zz( '#t15-6-2' ).el.offsetParent, null );
    assert.notOk( zz( '#t15-6-1' ).isVisible() );
    assert.notOk( zz( '#t15-6-2' ).isVisible() );
    zz( '.t15-6' ).show();
    assert.ok(  zz( '#t15-6-1' ).isVisible() );
    assert.ok(  zz( '#t15-6-2' ).isVisible() );
    zz( '.t15-6' ).hide();
    assert.notOk(  zz( '#t15-6-1' ).isVisible() );
    assert.notOk(  zz( '#t15-6-2' ).isVisible() );
    
    // #t15-7-1 is visible and #t15-7-2 is NOT visible
    assert.ok( zz( '#t15-7-1' ).isVisible() );
    assert.notOk( zz( '#t15-7-2' ).isVisible() );
    zz( '.t15-7' ).toggle();
    assert.notOk( zz( '#t15-7-1' ).isVisible() );
    assert.ok( zz( '#t15-7-2' ).isVisible() );
    zz( '.t15-7' ).toggle();
    assert.ok( zz( '#t15-7-1' ).isVisible() );
    assert.notOk( zz( '#t15-7-2' ).isVisible() );
});

QUnit.test( 'fadeIn and fadeOut test', function( assert ) {
    
    // fadeOut
    assert.ok( zz( '#t29-1-1' ).isVisible() );
    assert.ok( zz( '#t29-1-2' ).isVisible() );
    const done1 = assert.async();
    zz( '.t29-1' ).fadeOut(
        {
            callback: function(){
                assert.notOk( zz( '#t29-1-1' ).isVisible() );
                assert.notOk( zz( '#t29-1-2' ).isVisible() );
                done1();
            }
        }
    );
    assert.ok( zz( '#t29-1-1' ).isVisible() ); // Still visible
    assert.ok( zz( '#t29-1-2' ).isVisible() ); // Still visible
    
    // fadeIn
    assert.notOk( zz( '#t29-2-1' ).isVisible() );
    assert.notOk( zz( '#t29-2-2' ).isVisible() );
    const done2 = assert.async();
    zz( '.t29-2' ).fadeIn(
        {
            callback: function(){
                assert.ok( zz( '#t29-2-1' ).isVisible() );
                assert.ok( zz( '#t29-2-2' ).isVisible() );
                done2();
            }
        }
    );

    // fadeOut nor arguments
    assert.ok( zz( '#t29-3-1' ).isVisible() );
    assert.ok( zz( '#t29-3-2' ).isVisible() );
    zz( '.t29-3' ).fadeOut();
    assert.ok( zz( '#t29-3-1' ).isVisible() ); // Still visible
    assert.ok( zz( '#t29-3-2' ).isVisible() ); // Still visible
    const done3 = assert.async();
    setTimeout(
        function () {
            assert.notOk( zz( '#t29-3-1' ).isVisible() ); // Must not be visible yet
            assert.notOk( zz( '#t29-3-2' ).isVisible() ); // Must not be visible yet
            done3();
        },
        500
    );
});

QUnit.test( 'no nodes visible test', function( assert ) {

    var $notFound = zz( '#notFound' );

    // Some elements must return an empty zzDOM object
    utils.check0Length(
        assert,
        [
            $notFound.fadeIn(),
            $notFound.fadeOut(),
            $notFound.hide(),
            $notFound.show(),
            $notFound.toggle()
        ]
    );
    
    // Some elements must return null
    utils.checkNull(
        assert,
        [
            $notFound.isVisible()
        ]
    );

    // Some elements must return false
    utils.checkFalse(
        assert,
        [

        ]
    );
});
