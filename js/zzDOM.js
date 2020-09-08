/* zzDOM object */
var zzDOM = {};

zzDOM.htmlToElement = function ( html ) {
    var template = document.createElement( 'template' );
    template.innerHTML = html.trim();
    return template.content.firstChild;
};

zzDOM.buildInstance = function ( nodes ) {
    return nodes.length === 1? new SimpleZZDom( nodes[ 0 ] ): new MultipleZZDom( nodes );
};
