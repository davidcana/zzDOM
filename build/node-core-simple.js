"use strict";

var Qunit = require( 'qunit' );

var zzDOM = require( './zzDOM-closures-core.js' );
var zz = zzDOM.zz;

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

"use strict";

// Unit tests
QUnit.test( 'text and html test', function( assert ) {
    var t1_1_original = 'white',
        t1_1_modified = 'yellow';
    assert.equal( document.getElementById( 't1-1' ).textContent, t1_1_original );
    var id = zz( '#t1-1' )
        .text( t1_1_modified )
        .attr( 'id' );
    assert.equal( document.getElementById( 't1-1' ).textContent, t1_1_modified );
    assert.equal( zz( '#t1-1' ).text(), t1_1_modified );
    assert.equal( id, 't1-1' );
    
    var t1_2_original = '<a href="https://www.fsf.org/">FSF</a>',
        t1_2_modified = '<a href="https://www.mozilla.org/">mozilla</a>';
    assert.equal( document.getElementById( 't1-2' ).innerHTML, t1_2_original );
    id = zz( '#t1-2' )
        .html( t1_2_modified )
        .attr( 'id' );
    assert.equal( document.getElementById( 't1-2' ).innerHTML, t1_2_modified );
    assert.equal( zz( '#t1-2' ).html(), t1_2_modified );
    assert.equal( id, 't1-2' );
});

QUnit.test( 'remove and empty test', function( assert ) {
    var t2_1_original = 'To remove';
    assert.equal( document.getElementById( 't2-1' ).textContent, t2_1_original );
    zz( '#t2-1' ).remove();
    assert.equal( document.getElementById( 't2-1' ), null );
    // Can not test zz( '#t2-1' ).attr( 'id' ), element was removed!
    
    var t2_2_original = 'To be empty';
    assert.equal( document.getElementById( 't2-2' ).textContent, t2_2_original );
    var id = zz( '#t2-2' )
        .empty()
        .attr( 'id' );
    assert.equal( document.getElementById( 't2-2' ).textContent, '' );
    assert.equal( id, 't2-2' );
});

QUnit.test( 'replaceWith test', function( assert ) {
    var t3_1_original = '<span id="t3-1-in">To replace</span>',
        t3_1_modified = 'Replaced text';
    assert.equal( document.getElementById( 't3-1' ).innerHTML, t3_1_original );
    var id = zz( '#t3-1-in' )
        .replaceWith( t3_1_modified )
        .attr( 'id' );
    assert.equal( document.getElementById( 't3-1' ).innerHTML, t3_1_modified );
    assert.equal( id, 't3-1-in' );
});

QUnit.test( 'attr and removeAttr test', function( assert ) {
    var t4_1_original = 'https://www.fsf.org/',
        t4_1_modified = 'https://www.mozilla.org/';
    assert.equal( document.getElementById( 't4-1' ).getAttribute( 'href' ), t4_1_original );
    var id = zz( '#t4-1' )
        .attr( 'href', t4_1_modified )
        .attr( 'id' );
    assert.equal( document.getElementById( 't4-1' ).getAttribute( 'href' ), t4_1_modified );
    assert.equal( zz( '#t4-1' ).attr( 'href' ), t4_1_modified );
    assert.equal( id, 't4-1' );
    
    var t4_2_original = 'FSF';
    assert.equal( document.getElementById( 't4-2' ).getAttribute( 'name' ), t4_2_original );
    id = zz( '#t4-2' )
        .removeAttr( 'name' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't4-2' ).getAttribute( 'name' ), null );
    assert.equal( zz( '#t4-2' ).attr( 'name' ), null );
    assert.equal( id, 't4-2' );
    
    var t4_3_href_original = 'https://www.fsf.org/',
        t4_3_href_modified = 'https://www.mozilla.org/',
        t4_3_name_original = 'FSF',
        t4_3_name_modified = 'Mozilla';
    assert.equal( document.getElementById( 't4-3' ).getAttribute( 'href' ), t4_3_href_original );
    assert.equal( document.getElementById( 't4-3' ).getAttribute( 'name' ), t4_3_name_original );
    id = zz( '#t4-3' )
        .attr( 
            {
                'href': t4_3_href_modified,
                'name': t4_3_name_modified
            }
        )
        .attr( 'id' );
    assert.equal( document.getElementById( 't4-3' ).getAttribute( 'href' ), t4_3_href_modified );
    assert.equal( zz( '#t4-3' ).attr( 'href' ), t4_3_href_modified );
    assert.equal( document.getElementById( 't4-3' ).getAttribute( 'name' ), t4_3_name_modified );
    assert.equal( zz( '#t4-3' ).attr( 'name' ), t4_3_name_modified );
    assert.equal( id, 't4-3' );
    
    var t4_4_name_original = 'FSF';
    assert.equal( document.getElementById( 't4-4' ).getAttribute( 'name' ), t4_4_name_original );
    assert.equal( zz( '#t4-4' ).attr( 'name' ), t4_4_name_original );
    assert.ok( document.getElementById( 't4-4' ).hasAttribute( 'name' ) );
    id = zz( '#t4-4' )
        .attr( 'name', null )
        .attr( 'id' );
    assert.equal( document.getElementById( 't4-4' ).getAttribute( 'name' ), null );
    assert.equal( zz( '#t4-4' ).attr( 'name' ), null );
    assert.notOk( document.getElementById( 't4-4' ).hasAttribute( 'name' ) );
    assert.equal( id, 't4-4' );
    
    var t4_5_href_original = 'https://www.fsf.org/',
        t4_5_href_modified = 'https://www.mozilla.org/',
        t4_5_name_original = 'FSF';
    assert.equal( document.getElementById( 't4-5' ).getAttribute( 'href' ), t4_5_href_original );
    assert.equal( document.getElementById( 't4-5' ).getAttribute( 'name' ), t4_5_name_original );
    assert.ok( document.getElementById( 't4-5' ).hasAttribute( 'href' ) );
    assert.ok( document.getElementById( 't4-5' ).hasAttribute( 'name' ) );
    id = zz( '#t4-5' )
        .attr( 
            {
                'href': t4_5_href_modified,
                'name': null
            }
        )
        .attr( 'id' );
    assert.equal( document.getElementById( 't4-5' ).getAttribute( 'href' ), t4_5_href_modified );
    assert.equal( zz( '#t4-5' ).attr( 'href' ), t4_5_href_modified );
    assert.equal( document.getElementById( 't4-5' ).getAttribute( 'name' ), null );
    assert.equal( zz( '#t4-5' ).attr( 'name' ), null );
    assert.ok( document.getElementById( 't4-5' ).hasAttribute( 'href' ) );
    assert.notOk( document.getElementById( 't4-5' ).hasAttribute( 'name' ) );
    assert.equal( id, 't4-5' );
});

QUnit.test( 'addClass, hasClass, removeClass and toggleClass test', function( assert ) {
    var t5_1_class = 'myclass';
    assert.ok( document.getElementById( 't5-1' ).classList.contains( t5_1_class ) );
    assert.ok( zz( '#t5-1' ).hasClass( t5_1_class ) );

    var t5_2_class = 'addedclass';
    assert.notOk( document.getElementById( 't5-2' ).classList.contains( t5_2_class ) );
    var id = zz( '#t5-2' )
        .addClass( t5_2_class )
        .attr( 'id' );
    assert.ok( document.getElementById( 't5-2' ).classList.contains( t5_2_class ) );
    assert.equal( id, 't5-2' );
    
    var t5_3_class = 'otherclass';
    assert.ok( document.getElementById( 't5-3' ).classList.contains( t5_3_class ) );
    id = zz( '#t5-3' )
        .removeClass( t5_3_class )
        .attr( 'id' );
    assert.notOk( document.getElementById( 't5-3' ).classList.contains( t5_3_class ) );
    assert.equal( id, 't5-3' );
    
    var t5_4_class = 'addedclass';
    assert.notOk( document.getElementById( 't5-4' ).classList.contains( t5_4_class ) );
    id = zz( '#t5-4' )
        .toggleClass( t5_4_class )
        .attr( 'id' );
    assert.ok( document.getElementById( 't5-4' ).classList.contains( t5_4_class ) );
    assert.equal( id, 't5-4' );
    
    var t5_5_class = 'otherclass';
    assert.ok( document.getElementById( 't5-5' ).classList.contains( t5_5_class ) );
    id = zz( '#t5-5' )
        .removeClass( t5_5_class )
        .attr( 'id' );
    assert.notOk( document.getElementById( 't5-5' ).classList.contains( t5_5_class ) );
    assert.equal( id, 't5-5' );
    
    var t5_6_initialClass = 'myclass',
        t5_6_addedClass1 = 'addedclass',
        t5_6_addedClass2 = 'otherclass',
        t5_6_classArray = [ t5_6_addedClass1, t5_6_addedClass2 ];
    assert.ok( document.getElementById( 't5-6' ).classList.contains( t5_6_initialClass ) );
    assert.notOk( document.getElementById( 't5-6' ).classList.contains( t5_6_addedClass1 ) );
    assert.notOk( document.getElementById( 't5-6' ).classList.contains( t5_6_addedClass2 ) );
    id = zz( '#t5-6' )
        .addClass( t5_6_classArray )
        .attr( 'id' );
    assert.ok( document.getElementById( 't5-6' ).classList.contains( t5_6_initialClass ) );
    assert.ok( document.getElementById( 't5-6' ).classList.contains( t5_6_addedClass1 ) );
    assert.ok( document.getElementById( 't5-6' ).classList.contains( t5_6_addedClass2 ) );
    assert.equal( id, 't5-6' );
    
    var t5_7_initialClass1 = 'classtoremove1',
        t5_7_initialClass2 = 'myclass',
        t5_7_initialClass3 = 'classtoremove2',
        t5_7_classArray = [ t5_7_initialClass1, t5_7_initialClass3 ];
    assert.ok( document.getElementById( 't5-7' ).classList.contains( t5_7_initialClass1 ) );
    assert.ok( document.getElementById( 't5-7' ).classList.contains( t5_7_initialClass2 ) );
    assert.ok( document.getElementById( 't5-7' ).classList.contains( t5_7_initialClass3 ) );
    id = zz( '#t5-7' )
        .removeClass( t5_7_classArray )
        .attr( 'id' );
    assert.notOk( document.getElementById( 't5-7' ).classList.contains( t5_7_initialClass1 ) );
    assert.ok( document.getElementById( 't5-7' ).classList.contains( t5_7_initialClass2 ) );
    assert.notOk( document.getElementById( 't5-7' ).classList.contains( t5_7_initialClass3 ) );
    assert.equal( id, 't5-7' );
    
    var t5_8_class1 = 'class1',
        t5_8_class2 = 'class2',
        t5_8_class3 = 'class3',
        t5_8_classArray = [ t5_8_class2, t5_8_class3 ];
    assert.ok( document.getElementById( 't5-8' ).classList.contains( t5_8_class1 ) );
    assert.notOk( document.getElementById( 't5-8' ).classList.contains( t5_8_class2 ) );
    assert.ok( document.getElementById( 't5-8' ).classList.contains( t5_8_class3 ) );
    id = zz( '#t5-8' )
        .toggleClass( t5_8_classArray )
        .attr( 'id' );
    assert.ok( document.getElementById( 't5-8' ).classList.contains( t5_8_class1 ) );
    assert.ok( document.getElementById( 't5-8' ).classList.contains( t5_8_class2 ) );
    assert.notOk( document.getElementById( 't5-8' ).classList.contains( t5_8_class3 ) );
    assert.equal( id, 't5-8' );
    
    var t5_9_initialClass1 = 'classtoremove1',
        t5_9_initialClass2 = 'classtoremove2';
    assert.ok( document.getElementById( 't5-9' ).classList.contains( t5_9_initialClass1 ) );
    assert.ok( document.getElementById( 't5-9' ).classList.contains( t5_9_initialClass2 ) );
    id = zz( '#t5-9' )
        .removeClass()
        .attr( 'id' );
    assert.notOk( document.getElementById( 't5-9' ).classList.contains( t5_9_initialClass1 ) );
    assert.notOk( document.getElementById( 't5-9' ).classList.contains( t5_9_initialClass2 ) );
    assert.equal( id, 't5-9' );
    
    var t5_10_class = 'addedclass';
    assert.notOk( document.getElementById( 't5-10' ).classList.contains( t5_10_class ) );
    id = zz( '#t5-10' )
        .toggleClass( t5_10_class, true )
        .attr( 'id' );
    assert.ok( document.getElementById( 't5-10' ).classList.contains( t5_10_class ) );
    assert.equal( id, 't5-10' );
    
    var t5_11_class = 'otherclass';
    assert.ok( document.getElementById( 't5-11' ).classList.contains( t5_11_class ) );
    id = zz( '#t5-11' )
        .toggleClass( t5_11_class, false )
        .attr( 'id' );
    assert.notOk( document.getElementById( 't5-11' ).classList.contains( t5_11_class ) );
    assert.equal( id, 't5-11' );
    
    var t5_12_class1 = 'class1',
        t5_12_class2 = 'class2',
        t5_12_class3 = 'class3',
        t5_12_classArray = [ t5_12_class2, t5_12_class3 ];
    assert.ok( document.getElementById( 't5-12' ).classList.contains( t5_12_class1 ) );
    assert.notOk( document.getElementById( 't5-12' ).classList.contains( t5_12_class2 ) );
    assert.notOk( document.getElementById( 't5-12' ).classList.contains( t5_12_class3 ) );
    id = zz( '#t5-12' )
        .toggleClass( t5_12_classArray, true )
        .attr( 'id' );
    assert.ok( document.getElementById( 't5-12' ).classList.contains( t5_12_class1 ) );
    assert.ok( document.getElementById( 't5-12' ).classList.contains( t5_12_class2 ) );
    assert.ok( document.getElementById( 't5-12' ).classList.contains( t5_12_class3 ) );
    assert.equal( id, 't5-12' );
    
    var t5_13_class1 = 'class1',
        t5_13_class2 = 'class2',
        t5_13_class3 = 'class3',
        t5_13_classArray = [ t5_13_class2, t5_13_class3 ];
    assert.ok( document.getElementById( 't5-13' ).classList.contains( t5_13_class1 ) );
    assert.ok( document.getElementById( 't5-13' ).classList.contains( t5_13_class2 ) );
    assert.ok( document.getElementById( 't5-13' ).classList.contains( t5_13_class3 ) );
    id = zz( '#t5-13' )
        .toggleClass( t5_13_classArray, false )
        .attr( 'id' );
    assert.ok( document.getElementById( 't5-13' ).classList.contains( t5_13_class1 ) );
    assert.notOk( document.getElementById( 't5-13' ).classList.contains( t5_13_class2 ) );
    assert.notOk( document.getElementById( 't5-13' ).classList.contains( t5_13_class3 ) );
    assert.equal( id, 't5-13' );
});

QUnit.test( 'after, before, append and prepend test', function( assert ) {
    var t6_1_original = '<li id=\"t6-1-1\">Text 1</li><li id=\"t6-1-2\">Text 2</li>',
        t6_1_modified = '<li id=\"t6-1-1\">Text 1</li><li>New text</li><li id=\"t6-1-2\">Text 2</li>';
    utils.assertHtml( assert, 't6-1', t6_1_original );
    var id = zz( '#t6-1-1' )
        .after( '<li>New text</li>' )
        .attr( 'id' );
    utils.assertHtml( assert, 't6-1', t6_1_modified );
    assert.equal( id, 't6-1-1' );
    
    var t6_2_original = '<li id=\"t6-2-1\">Text 1</li><li id=\"t6-2-2\">Text 2</li>',
        t6_2_modified = '<li id=\"t6-2-1\">Text 1</li><li>New text</li><li id=\"t6-2-2\">Text 2</li>';
    utils.assertHtml( assert, 't6-2', t6_2_original );
    id = zz( '#t6-2-2' )
        .before( '<li>New text</li>' )
        .attr( 'id' );
    utils.assertHtml( assert, 't6-2', t6_2_modified );
    assert.equal( id, 't6-2-2' );
    
    var t6_3_original = '<li id=\"t6-3-1\">Text 1</li><li id=\"t6-3-2\">Text 2</li>',
        t6_3_modified = '<li id=\"t6-3-1\">Text 1</li><li id=\"t6-3-2\">Text 2</li><li>New text</li>';
    utils.assertHtml( assert, 't6-3', t6_3_original );
    id = zz( '#t6-3' )
        .append( '<li>New text</li>' )
        .attr( 'id' );
    utils.assertHtml( assert, 't6-3', t6_3_modified );
    assert.equal( id, 't6-3' );
    
    var t6_4_original = '<li id=\"t6-4-1\">Text 1</li><li id=\"t6-4-2\">Text 2</li>',
        t6_4_modified = '<li>New text</li><li id=\"t6-4-1\">Text 1</li><li id=\"t6-4-2\">Text 2</li>';
    utils.assertHtml( assert, 't6-4', t6_4_original );
    id = zz( '#t6-4' )
        .prepend( '<li>New text</li>' )
        .attr( 'id' );
    utils.assertHtml( assert, 't6-4', t6_4_modified );
    assert.equal( id, 't6-4' );
});

QUnit.test( 'siblings, prev and next test', function( assert ) {
    var ids = [];
    zz( '#t7-1-2' )
        .siblings()
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't7-1-1', 't7-1-3' ] );
    
    assert.equal( zz( '#t7-2-2' ).prev().attr( 'id' ), 't7-2-1' );
    
    assert.equal( zz( '#t7-2-2' ).next().attr( 'id' ), 't7-2-3' );
    
    ids = [];
    zz( '#t7-4-2' )
        .siblings( '.selected' )
        .each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't7-4-1', 't7-4-4' ] );
});

QUnit.test( 'children, index and parent test', function( assert ) {
    var ids = [];
    zz( '#t8-1' ).children().each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't8-1-1', 't8-1-2', 't8-1-3' ] );
    
    assert.equal( zz( '#t8-2-1' ).index(), 1 );
    assert.equal( zz( '#t8-2-2' ).index(), 2 );
    assert.equal( zz( '#t8-2-3' ).index(), 3 );
    
    assert.equal( zz( '#t8-3-1' ).parent().attr( 'id' ), 't8-3' );
    assert.equal( zz( '#t8-3-2' ).parent().attr( 'id' ), 't8-3' );
    assert.equal( zz( '#t8-3-3' ).parent().attr( 'id' ), 't8-3' );
    
    ids = [];
    zz( '#t8-4' ).children( '.selected' ).each( function( index, ss ){ ids.push( ss.attr( 'id' ) ); } );
    assert.deepEqual( ids, [ 't8-4-1', 't8-4-3' ] );
});

QUnit.test( 'filter and find test', function( assert ) {
    
    var eachFn = function( index, ss ){
        ids.push( ss.attr( 'id' ) ); 
        indexes.push( index );
    };
    
    var ids = [];
    var indexes = [];
    zz( '#t9-1' ).find( '.a' ).each( eachFn );
    assert.deepEqual( ids, [ 't9-1-1', 't9-1-2', 't9-1-3-1' ] );
    assert.deepEqual( indexes, [ 0, 1, 2 ] );
    
    ids = [];
    indexes = [];
    zz( '#t9-1' ).find( '.b' ).each( eachFn );
    assert.deepEqual( ids, [ 't9-1-1', 't9-1-3-2', 't9-1-4', 't9-1-4-2' ] );
    assert.deepEqual( indexes, [ 0, 1, 2, 3 ] );
    
    ids = [];
    indexes = [];
    zz( '#t9-1' ).find( '.a.b' ).each( eachFn );
    assert.deepEqual( ids, [ 't9-1-1' ] );
    assert.deepEqual( indexes, [ 0 ] );
    
    ids = [];
    indexes = [];
    zz( '#t9-1' ).find( '.c' ).each( eachFn );
    assert.deepEqual( ids, [] );
    assert.deepEqual( indexes, [] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-1' ).filter( '.a' ).each( eachFn );
    assert.deepEqual( ids, [ 't9-2-1' ] );
    assert.deepEqual( indexes, [ 0 ] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-1' ).filter( '.b' ).each( eachFn );
    assert.deepEqual( ids, [] );
    assert.deepEqual( indexes, [] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-1' ).filter( '.a.b' ).each( eachFn );
    assert.deepEqual( ids, [] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-2' ).filter( '.a' ).each( eachFn );
    assert.deepEqual( ids, [ 't9-2-2' ] );
    assert.deepEqual( indexes, [ 0 ] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-2' ).filter( '.b' ).each( eachFn );
    assert.deepEqual( ids, [ 't9-2-2' ] );
    assert.deepEqual( indexes, [ 0 ] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-2' ).filter( '.a.b' ).each( eachFn );
    assert.deepEqual( ids, [ 't9-2-2' ] );
    assert.deepEqual( indexes, [ 0 ] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-3' ).filter( '.a' ).each( eachFn );
    assert.deepEqual( ids, [] );
    assert.deepEqual( indexes, [] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-3' ).filter( '.b' ).each( eachFn );
    assert.deepEqual( ids, [] );
    assert.deepEqual( indexes, [] );
    
    ids = [];
    indexes = [];
    zz( '#t9-2-3' ).filter( '.a.b' ).each( eachFn );
    assert.deepEqual( ids, [] );
    assert.deepEqual( indexes, [] );
    
    var fIndexes = [];
    var fIds = [];
    
    var filterFn = function( index, ss ){
        var result = ss.attr( 'class' ) === 'a b';
        if ( result ){
            fIndexes.push( index );
            fIds.push( this.getAttribute( 'id' ) );
        }
        return result;
    };
    
    ids = [];
    indexes = [];
    fIndexes = [];
    zz( '#t9-2-1' )
        .filter( filterFn )
        .each( eachFn );
    assert.deepEqual( ids, [] );
    assert.deepEqual( indexes, [] );
    assert.deepEqual( fIndexes, [] );
    assert.deepEqual( fIds, [] );
    
    ids = [];
    indexes = [];
    fIndexes = [];
    zz( '#t9-2-2' )
        .filter( filterFn )
        .each( eachFn );
    assert.deepEqual( ids, [ 't9-2-2' ] );
    assert.deepEqual( indexes, [ 0 ] );
    assert.deepEqual( fIndexes, [ 0 ] );
    assert.deepEqual( fIds, [ 't9-2-2' ] );
});

QUnit.test( 'clone and is test', function( assert ) {
    var t10_1_original = `
<div class="t10-1-1">
  Hello
</div>

<div id="t10-1-2">
  Goodbye
</div>
`,
        t10_1_modified = `
	
<div class="t10-1-1">
  Hello
</div>

<div id="t10-1-2">
  Goodbye

  <div class="t10-1-1">
    Hello
  </div>
</div>
`;
    utils.assertHtml( assert, 't10-1', t10_1_original );
    var cssClass = zz( '.t10-1-1' )
        .clone()
        .appendTo( '#t10-1-2' )
        .attr( 'class' );
        assert.equal( cssClass, 't10-1-1' );
    utils.assertHtml( assert, 't10-1', t10_1_modified );
    
    assert.notOk( zz( '#t10-2' ).is( null ) );
    
    assert.ok( zz( '#t10-2' ).is( document.getElementById( 't10-2' ) ) );
    assert.notOk( zz( '#t10-2' ).is( document.getElementById( 't10-1' ) ) );
    
    assert.ok( zz( '#t10-2' ).is( zz( '#t10-2' ) ) );
    assert.notOk( zz( '#t10-2' ).is( zz( '#t10-1' ) ) );
    
    assert.ok( zz( '#t10-2' ).is( 'div' ) );
    assert.notOk( zz( '#t10-2' ).is( 'span' ) );
    
    assert.ok( zz( '#t10-3-1' ).is( zz( '.t10-3' ) ) );
    assert.notOk( zz( '#t10-3' ).is( zz( '.t10-3' ) ) );
});

QUnit.test( 'css test', function( assert ) {
    var t11_1_original = null,
        t11_1_modified = 'color: red;';
    assert.equal( document.getElementById( 't11-1' ).getAttribute( 'style' ), t11_1_original );
    var id = zz( '#t11-1' )
        .css( 'color', 'red' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't11-1' ).getAttribute( 'style' ), t11_1_modified );
    assert.equal( zz( '#t11-1' ).css( 'color' ), 'rgb(255, 0, 0)' );
    assert.equal( id, 't11-1' );
    
    var t11_2_original = null,
        t11_2_modified = 'background-color: red;';
    assert.equal( document.getElementById( 't11-2' ).getAttribute( 'style' ), t11_2_original );
    id = zz( '#t11-2' )
        .css( 'background-color', 'red' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't11-2' ).getAttribute( 'style' ), t11_2_modified );
    assert.equal( zz( '#t11-2' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    assert.equal( id, 't11-2' );
    
    var t11_3_original = 'color: green',
        t11_3_modified = 'color: red;';
    assert.equal( document.getElementById( 't11-3' ).getAttribute( 'style' ), t11_3_original );
    id = zz( '#t11-3' )
        .css( 'color', 'red' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't11-3' ).getAttribute( 'style' ), t11_3_modified );
    assert.equal( zz( '#t11-3' ).css( 'color' ), 'rgb(255, 0, 0)' );
    assert.equal( id, 't11-3' );
    
    var t11_4_original = 'color: green',
        t11_4_modified = 'color: green; background-color: red;';
    assert.equal( document.getElementById( 't11-4' ).getAttribute( 'style' ), t11_4_original );
    id = zz( '#t11-4' )
        .css( 'background-color', 'red' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't11-4' ).getAttribute( 'style' ), t11_4_modified );
    assert.equal( zz( '#t11-4' ).css( 'color' ), 'rgb(0, 128, 0)' );
    assert.equal( zz( '#t11-4' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    assert.equal( id, 't11-4' );
    
    var t11_5_original = null,
        t11_5_modified = 'color: white; background-color: red;';
    assert.equal( document.getElementById( 't11-5' ).getAttribute( 'style' ), t11_5_original );
    id = zz( '#t11-5' )
        .css({
            color: 'white',
            'background-color': 'red' 
        }).attr( 'id' );
    assert.equal( document.getElementById( 't11-5' ).getAttribute( 'style' ), t11_5_modified );
    assert.equal( zz( '#t11-5' ).css( 'color' ), 'rgb(255, 255, 255)' );
    assert.equal( zz( '#t11-5' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    assert.equal( id, 't11-5' );
    
    var t11_6_original = null,
        t11_6_modified = 'color: white; background-color: red;';
    assert.equal( document.getElementById( 't11-6' ).getAttribute( 'style' ), t11_6_original );
    id = zz( '#t11-6' )
        .css({
            color: 'white',
            'background-color': 'red' 
        }).attr( 'id' );
    assert.equal( document.getElementById( 't11-6' ).getAttribute( 'style' ), t11_6_modified );
    assert.equal( zz( '#t11-6' ).css( 'color' ), 'rgb(255, 255, 255)' );
    assert.equal( zz( '#t11-6' ).css( 'background-color' ), 'rgb(255, 0, 0)' );
    assert.equal( id, 't11-6' );
    
    var t11_7_original = null,
        t11_7_modified = 'font-size: 30px;';
    assert.equal( document.getElementById( 't11-7' ).getAttribute( 'style' ), t11_7_original );
    id = zz( '#t11-7' )
        .css(
            'font-size', 30 
        ).attr( 'id' );
    assert.equal( document.getElementById( 't11-7' ).getAttribute( 'style' ), t11_7_modified );
    assert.equal( zz( '#t11-7' ).css( 'font-size' ), '30px' );
    assert.equal( id, 't11-7' );
    
    var t11_8_original = null,
        t11_8_modified = 'font-size: 30px;';
    assert.equal( document.getElementById( 't11-8' ).getAttribute( 'style' ), t11_8_original );
    id = zz( '#t11-8' )
        .css(
            'font-size', '30'
        ).attr( 'id' );
    assert.equal( document.getElementById( 't11-8' ).getAttribute( 'style' ), t11_8_modified );
    assert.equal( zz( '#t11-8' ).css( 'font-size' ), '30px' );
    assert.equal( id, 't11-8' );
    
    var t11_9_original = null,
        t11_9_modified = 'font-size: 25px;',
        t11_9_f_id,
        t11_9_f_index,
        t11_9_f_fsize;
    assert.equal( document.getElementById( 't11-9' ).getAttribute( 'style' ), t11_9_original );
    id = zz( '#t11-9' )
        .css(
            'font-size', 
            function( index, ss ){ 
                t11_9_f_index = index;
                t11_9_f_fsize = this.getAttribute( 'data-fsize' );
                return ss.attr( 'data-fsize' );
            }
        ).attr( 'id' );
    assert.equal( document.getElementById( 't11-9' ).getAttribute( 'style' ), t11_9_modified );
    assert.equal( zz( '#t11-9' ).css( 'font-size' ), '25px' );
    assert.equal( id, 't11-9' );
    assert.equal( t11_9_f_index, 0 );
    assert.equal( t11_9_f_fsize, '25px' );
});

QUnit.test( 'height, width, outerHeight and outerWidth test', function( assert ) {
    var id = zz( '#t12-1' )
        .height( '2em' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't12-1' ).getAttribute( 'style' ), 'height: 2em;' );
    assert.equal( zz( '#t12-1' ).height(), 32 );
    assert.equal( id, 't12-1' );
    
    id = zz( '#t12-2' )
        .height( 100 )
        .attr( 'id' );
    assert.equal( document.getElementById( 't12-2' ).getAttribute( 'style' ), 'height: 100px;' );
    assert.equal( zz( '#t12-2' ).height(), 100 );
    assert.equal( id, 't12-2' );
    
    id = zz( '#t12-3' )
        .width( '10em' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't12-3' ).getAttribute( 'style' ), 'width: 10em;' );
    assert.equal( zz( '#t12-3' ).width(), 160 );
    assert.equal( id, 't12-3' );
    
    id = zz( '#t12-4' )
        .height( 800 )
        .attr( 'id' );
    assert.equal( document.getElementById( 't12-4' ).getAttribute( 'style' ), 'height: 800px;' );
    assert.equal( zz( '#t12-4' ).height(), 800 );
    assert.equal( id, 't12-4' );
    
    id = zz( '#t12-5' )
        .height( '2em' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't12-5' ).getAttribute( 'style' ), 'height: 2em;' );
    assert.equal( zz( '#t12-5' ).outerHeight(), 64 );
    assert.equal( zz( '#t12-5' ).outerHeight( true ), 80 );
    assert.equal( id, 't12-5' );
    
    id = zz( '#t12-6' )
        .height( 100 )
        .attr( 'id' );
    assert.equal( document.getElementById( 't12-6' ).getAttribute( 'style' ), 'height: 100px;' );
    assert.equal( zz( '#t12-6' ).outerHeight(), 132 );
    assert.equal( zz( '#t12-6' ).outerHeight( true ), 148 );
    assert.equal( id, 't12-6' );
    
    id = zz( '#t12-7' )
        .height( '10em' )
        .attr( 'id' );
    assert.equal( document.getElementById( 't12-7' ).getAttribute( 'style' ), 'height: 10em;' );
    assert.equal( zz( '#t12-7' ).outerHeight(), 192 );
    assert.equal( zz( '#t12-7' ).outerHeight( true ), 208 );
    assert.equal( id, 't12-7' );
    
    id = zz( '#t12-8' )
        .height( 800 )
        .attr( 'id' );
    assert.equal( document.getElementById( 't12-8' ).getAttribute( 'style' ), 'height: 800px;' );
    assert.equal( zz( '#t12-8' ).outerHeight(), 832 );
    assert.equal( zz( '#t12-8' ).outerHeight( true ), 848 );
    assert.equal( id, 't12-8' );
    
    //assert.notOk( zz( '#t12-9' ).isVisible() );
    assert.notOk( !! zz( '#t12-9' ).el.offsetParent );
    assert.equal( zz( '#t12-9' ).width(), 64 );
    assert.equal( zz( '#t12-9' ).height(), 37 );
    assert.equal( zz( '#t12-9' ).outerWidth(), 64 );
    assert.equal( zz( '#t12-9' ).outerHeight(), 37 );
    
    //assert.notOk( zz( '#t12-10' ).isVisible() );
    assert.notOk( !! zz( '#t12-10' ).el.offsetParent );
    assert.equal( zz( '#t12-10' ).width(), 64 );
    assert.equal( zz( '#t12-10' ).height(), 37 );
    assert.equal( zz( '#t12-10' ).outerWidth(), 74 );
    assert.equal( zz( '#t12-10' ).outerHeight(), 47 );
    assert.equal( zz( '#t12-10' ).outerWidth( true ), 82 );
    assert.equal( zz( '#t12-10' ).outerHeight( true ), 55 );
});

QUnit.test( 'offset, offsetParent and position test', function( assert ) {
    var id = zz( '#t13-1-div' )
        .offset( { top: 25, left: 30 } )
        .attr( 'id' );
    var offset = zz( '#t13-1-div' ).offset();
    assert.equal( document.getElementById( 't13-1-div' ).getAttribute( 'style' ), 'top: 25px; left: 30px;' );
    assert.equal( id, 't13-1-div' );
    
    //TODO Test offset() is hard!
    
    assert.notOk( zz( '#t13-2-1' ).hasClass( 'selected' ) );
    id = zz( '#t13-2-2' )
        .offsetParent()
        .addClass( 'selected' )
        .attr( 'id' );
    assert.ok( zz( '#t13-2-1' ).hasClass( 'selected' ) );
    assert.equal( id, 't13-2-1' );
    
    var position = zz( '#t13-3-div' ).position();
    assert.equal( position.top, 35 );
    assert.equal( position.left, 320 );
});

QUnit.test( 'appendTo test', function( assert ) {
    var t16_1_original = 'This is the container t16-1',
        t16_1_modified = `
This is the container t16-1

<div id="t16-1-1">
  New div 1
</div>
`;
    utils.assertHtml( assert, 't16-1', t16_1_original );
    var id = zz( '<div id="t16-1-1">New div 1</div>' )
        .appendTo( '#t16-1' )
        .attr( 'id' );
    utils.assertHtml( assert, 't16-1', t16_1_modified );
    assert.equal( id, 't16-1-1' );
    
    var t16_2_original = 'This is the container t16-2',
        t16_2_modified = `
This is the container t16-2

<div id="t16-2-1">
  New div 2
</div>
`;
    utils.assertHtml( assert, 't16-2', t16_2_original );
    id = zz( '<div id="t16-2-1">New div 2</div>' )
        .appendTo( document.getElementById( 't16-2' ) )
        .attr( 'id' );
    utils.assertHtml( assert, 't16-2', t16_2_modified );
    assert.equal( id, 't16-2-1' );
    
    var t16_3_original = 'This is the container t16-3',
        t16_3_modified = `
This is the container t16-3

<div id="t16-3-1">
  New div 3
</div>
`;
    utils.assertHtml( assert, 't16-3', t16_3_original );
    id = zz( '<div id="t16-3-1">New div 3</div>' )
        .appendTo( zz( '#t16-3' ) )
        .attr( 'id' );
    utils.assertHtml( assert, 't16-3', t16_3_modified );
    assert.equal( id, 't16-3-1' );
    
    var t16_4_original = `
<div class="container t16-4-class" id="t16-4a">
  This is the container t16-4a
</div>

<div>
  Separator 1
</div>

<div class="container t16-4-class" id="t16-4b">
  This is the container t16-4b
</div>

<div>
  Separator 2
</div>

<div class="container t16-4-class" id="t16-4c">
  This is the container t16-4c
</div>
`,
        t16_4_modified = `
<div class="container t16-4-class" id="t16-4a">
  This is the container t16-4a

  <div id="t16-4-1">
    New div 4
  </div>
</div>

<div>
  Separator 1
</div>

<div class="container t16-4-class" id="t16-4b">
  This is the container t16-4b

  <div id="t16-4-1">
    New div 4
  </div>
</div>

<div>
  Separator 2
</div>

<div class="container t16-4-class" id="t16-4c">
  This is the container t16-4c

  <div id="t16-4-1">
    New div 4
  </div>
</div>
`;
    utils.assertHtml( assert, 't16-4', t16_4_original );
    id = zz( '<div id="t16-4-1">New div 4</div>' )
        .appendTo( zz( '.t16-4-class' ) )
        .attr( 'id' );
    utils.assertHtml( assert, 't16-4', t16_4_modified );
    assert.equal( id, 't16-4-1' );
    
    var t16_5_original = 'This is the container t16-5',
        t16_5_modified = t16_5_original;
    utils.assertHtml( assert, 't16-5', t16_5_original );
    id = zz( '<div id="t16-5-1">New div 5</div>' )
        .appendTo( document.getElementById( 'non-existing-id-DOM' ) )
        .attr( 'id' );
    utils.assertHtml( assert, 't16-5', t16_5_modified );
    assert.equal( id, 't16-5-1' );
});

QUnit.test( 'each test', function( assert ) {
    var currentValues = [];
    var indexes = [];
    var arrays = [];
    var thisValues = [];
    
    zz( '#t17-1' ).each( 
        function( index, currentValue, array ){
            currentValues.push( currentValue );
            indexes.push( index );
            arrays.push( array );
            thisValues.push( this );
        }
    );
    
    assert.equal( currentValues.length, 1 );
    assert.equal( currentValues[ 0 ].attr( 'id' ), 't17-1' );
    assert.deepEqual( indexes, [ 0 ] );
    assert.equal( arrays.length, 1 );
    assert.equal( arrays[ 0 ].length, 1 );
    assert.equal( arrays[ 0 ][ 0 ].getAttribute( 'id' ), 't17-1' );
    assert.equal( thisValues.length, 1 );
    assert.equal( thisValues[ 0 ].getAttribute( 'id' ), 't17-1' );
});

QUnit.test( 'array like syntax test', function( assert ) {    
    assert.equal( zz( '#t18-1' ).length, 1 );
    
    assert.ok( zz( '#t18-1' )[ 0 ] instanceof Element );
    assert.equal( zz( '#t18-1' )[ 0 ].getAttribute( 'id' ), 't18-1' );
    
    assert.ok( zz( '#t18-1' )[ 1 ] === undefined );
    
    assert.ok( zz( '#t18-1' )[ 2 ] === undefined );
    
    var ids = [];
    var $divs = zz( '#t18-1' );
    for ( var c = 0; c < $divs.length; ++c ){
        ids.push( $divs[ c ].getAttribute( 'id' ) );
    }
    assert.deepEqual( ids, [ 't18-1' ] );
});

QUnit.test( 'parents test', function( assert ) {
    var eachFn = function( index, ss ){
        ids.push( ss.attr( 'id' ) ); 
        indexes.push( index );
    };
    
    var ids = [];
    var indexes = [];
    zz( '#t22-1-1-1' )
        .parents()
        .each( eachFn );
    assert.deepEqual( ids, [ 't22-1-1', 't22-1', 't22', 'body', 'html' ] );
    assert.deepEqual( indexes, [ 0, 1, 2, 3, 4 ] );

    ids = [];
    indexes = [];
    zz( '#t22-1-1-2' )
        .parents()
        .each( eachFn );
    assert.deepEqual( ids, [ 't22-1-1', 't22-1', 't22', 'body', 'html' ] );
    assert.deepEqual( indexes, [ 0, 1, 2, 3, 4 ] );

    ids = [];
    indexes = [];
    zz( '#t22-1-2-1' )
        .parents()
        .each( eachFn );
    assert.deepEqual( ids, [ 't22-1-2', 't22-1', 't22', 'body', 'html' ] );
    assert.deepEqual( indexes, [ 0, 1, 2, 3, 4 ] );

    ids = [];
    indexes = [];
    zz( '#t22-1-2-2' )
        .parents()
        .each( eachFn );
    assert.deepEqual( ids, [ 't22-1-2', 't22-1', 't22', 'body', 'html' ] );
    assert.deepEqual( indexes, [ 0, 1, 2, 3, 4 ] );

    ids = [];
    indexes = [];
    zz( '#t22-1-1-1' )
        .parents( '.a' )
        .each( eachFn );
    assert.deepEqual( ids, [ 't22-1-1', 't22' ] );
    assert.deepEqual( indexes, [ 0, 1 ] );

    ids = [];
    indexes = [];
    zz( '#t22-1-1-1' )
        .parents( '.b' )
        .each( eachFn );
    assert.deepEqual( ids, [ 't22-1' ] );
    assert.deepEqual( indexes, [ 0 ] );

    ids = [];
    indexes = [];
    zz( '#t22-1-2-1' )
        .parents( '.a' )
        .each( eachFn );
    assert.deepEqual( ids, [ 't22' ] );
    assert.deepEqual( indexes, [ 0 ] );

    ids = [];
    indexes = [];
    zz( '#t22-1-2-1' )
        .parents( '.b' )
        .each( eachFn );
    assert.deepEqual( ids, [ 't22-1-2', 't22-1' ] );
    assert.deepEqual( indexes, [ 0, 1 ] );
});

QUnit.test( 'first test', function( assert ) {
    var eachFn = function( index, ss ){
        ids.push( ss.attr( 'id' ) ); 
        indexes.push( index );
    };
    
    var ids = [];
    var indexes = [];
    zz( '#t23-1' )
        .first()
        .each( eachFn );
    assert.deepEqual( ids, [ 't23-1' ] );
    assert.deepEqual( indexes, [ 0 ] );
});

QUnit.test( 'get test', function( assert ) {
    
    var eachFn = function( nodes ){
        const result = [];
        for ( const el of nodes ){
            result.push( el.getAttribute( 'id' ) ); 
        }
        return result;
    };
    
    // Test .get()
    var nodes = zz( '#t24-1' ).get();
    var ids = eachFn( nodes );
    assert.deepEqual( ids, [ 't24-1' ] );

    // Test .get( 0 )
    var el = zz( '#t24-1' ).get( 0 );
    var id = el.getAttribute( 'id' );
    assert.deepEqual( id, 't24-1' );

    // Test .get( 1 ) -> Array has just 1 element
    el = zz( '#t24-1' ).get( 1 );
    assert.deepEqual( el, undefined );
});

QUnit.test( 'map test', function( assert ) {
  
    var ids = zz( '.t25' ).map(
        function() {
            return this.id;
        })
    .get()
    .join('|');

    assert.deepEqual( ids, 't25-1' );

    ids = zz( '.t25' ).map(
        function( i, node) {
            return i + ':' + node.id;
        })
    .get()
    .join('|');

    assert.deepEqual( ids, '0:t25-1' );
});

QUnit.test( 'closest test', function( assert ) {

    // Check an element that matches the selector
    var id = zz( '#t30-1-1' )
        .closest( '.a' )
        .attr( 'id' );
    assert.deepEqual( id, 't30-1-1' );

    // Check an element whose parent matches the selector
    id = zz( '#t30-1-1-1' )
        .closest( '.a' )
        .attr( 'id' );
    assert.deepEqual( id, 't30-1-1' );

    // Check another element whose parent matches the selector
    id = zz( '#t30-1-1-2' )
    .closest( '.a' )
    .attr( 'id' );
    assert.deepEqual( id, 't30-1-1' );

    // Check an element whose parent-parent matches the selector
    id = zz( '#t30-1-1-1' )
        .closest( '.b' )
        .attr( 'id' );
    assert.deepEqual( id, 't30-1' );

    // Check an element whose parent-parent-parent matches the selector
    id = zz( '#t30-1-2-2' )
        .closest( '.a' )
        .attr( 'id' );
    assert.deepEqual( id, 't30' );
});
