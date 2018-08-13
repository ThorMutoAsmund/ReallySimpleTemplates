class T {
  static start(tag, attributes, end=false) {
    return '<' + tag + attributes + (end ? ' />' : '>');
  }

  static end(tag) {
    return '</' + tag + '>';
  }
  
  static attrValue(value) {
    return Array.isArray(value) ?
      value.join(' ') : (
        typeof value === 'object' ?
        Object.keys(value).map(key => 
          key + ':'+ value[key]).join(' ') :
        value
      );
  }

  static attributes(options) {
    return !options ? '' :
    ' ' + Object.keys(options).map(key => 
      key + '="'+ T.attrValue(options[key]) +'"').join(' ');
  }

  static cr(tag, options = null, children = null) {
    const emptyTags = ['area','base','br','col','command','embed','hr','img','input','keygen','link','meta','param','source','track','wbr'];
    
    if (children === null) {
      children = options; options = null;
    }
    return emptyTags.indexOf(tag) == -1 ? 
      T.start(tag, T.attributes(options)) +
      (children === null ? '' : (Array.isArray(children) ?
        children.join('') :
        children)
      ) + T.end(tag) : 
      T.start(tag, T.attributes(options), true);
  }
  
  static register(window = null) {
    const tags = ['a','abbr','acronym','address','applet','area','article','aside','audio','b','base','basefont','bdi','bdo','big','blockquote','body','br','button','canvas','caption','center','cite','code','col','colgroup','data','datalist','dd','del','details','dfn','dialog','dir','div','dl','dt','em','embed','fieldset','figcaption','figure','font','footer','form','frame','frameset','h1','head','header','hr','html','i','iframe','img','input','ins','kbd','label','legend','li','link','main','map','mark','meta','meter','nav','noframes','noscript','object','ol','optgroup','option','output','p','param','picture','pre','progress','q','rp','rt','ruby','s','samp','script','section','select','small','source','span','strike','strong','style','sub','summary','sup','svg','table','tbody','td','template','textarea','tfoot','th','thead','time','title','tr','track','tt','u','ul','var','video','wbr'];
    tags.forEach(function(t) {
      T[t] = function(o = null, c = null) {return T.cr(t, o, c);};
      if (window) {
        window[t] = T[t];
      }
    });
  }
}

function setContent(content) {
  $('#content').html(content);
}

$(document).ready(function() {
  var persons = [{name: 'Adam', car:'Alpha Romeo'},{name: 'Barry', car:'BMW'}];

  T.register(window);

  // var result = T.ul(
  //   persons.map(p => 
  //     T.li({'class':'red', 'style':{'font-weight': 'bold'}}, p.name)
  //   )
  // );
 
  var result = ul(
    persons.map(p => 
      li({'class':'red', 'style':{'font-weight': 'bold'}}, p.name)
    )
  );

  result += div([
    span(['Name:',b(persons[0].name)]),
    br(),
    span(['Car:', b(persons[0].car)])
  ])
  
  setContent(result);
});

