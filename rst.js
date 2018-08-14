class T {
  static cr(tag, options = null, children = null) {
    const emptyTags = ['area','base','br','col','command','embed','hr','img','input','keygen','link','meta','param','source','track','wbr'];
    
    if (children === null) {
      children = options; options = null;
    }

    var element = document.createElement(tag);

    if (options) {
      Object.keys(options).map(function(key) {
        var attrName = key;
        if (key === 'class') {
          attrName = 'className';
        }
        if (typeof options[key]  === 'object') {
          Object.keys(options[key]).map(function(attrKey) {
            element[attrName][attrKey] = options[key][attrKey];
          });
        }
        else {
          element[attrName] = options[key];
        }
      });
    }

    if (children) {
      (Array.isArray(children)?children:[children]).forEach(function(child) {
        if (typeof child === 'object') {
          element.appendChild(child);
        }
        else {
          element.innerText = child;
        }
      });
    }

    return element;
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
  var container = document.getElementById('container');
  if (Array.isArray(content)) {
    content.forEach(function(element) {
      container.appendChild(element);
    });
  }
  else {
    container.appendChild(content);
  }
}

$(document).ready(function() {
  var persons = [{name: 'Adam', car:'Alpha Romeo'},{name: 'Barry', car:'BMW'}];

  T.register(window);

  // var result = T.ul(
  //   persons.map(p => 
  //     T.li({'class':'red', 'style':{'font-weight': 'bold'}}, p.name)
  //   )
  // );
 
  var result1 = ul(
    persons.map(p => 
      li({'class':'red', 'style':{'font-weight': 'bold'}}, span(p.name))
    )
  );

  var result2 = div([
    span(['Name:', b(persons[0].name)]),
    br(),
    span(['Car:', b(persons[0].car)])
  ])
  
  setContent([result1, result2]);
});

