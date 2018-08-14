class T {
  static isIterableArray(obj) { 
    return typeof obj[Symbol.iterator] === 'function' && typeof obj !== 'string';
  }

  static cr(tag, options = null, children = null) {
    const emptyTags = ['area','base','br','col','command','embed','hr','img','input','keygen','link','meta','param','source','track','wbr'];

    if (children === null) {
      children = options; options = null;
    }

    var element = document.createElement(tag);

    if (options) {
      Object.keys(options).map(function(key) {
        var attrName = key;
        if (attrName === 'class') {
          attrName = 'className';
        }
        if (typeof options[key] === 'object') {
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
      for (let child of (T.isIterableArray(children)?children:[children])) {
        if (typeof child === 'object') {
          element.appendChild(child);
        }
        else {
          element.innerText = child;
        }
      };
    }

    return element;
  }
  
  static register(window = null) {
    const tags = ['a','abbr','acronym','address','applet','area','article','aside','audio','b','base','basefont','bdi','bdo','big','blockquote','body','br','button','canvas','caption','center','cite','code','col','colgroup','data','datalist','dd','del','details','dfn','dialog','dir','div','dl','dt','em','embed','fieldset','figcaption','figure','font','footer','form','frame','frameset','h1','head','header','hr','html','i','iframe','img','input','ins','kbd','label','legend','li','link','main','map','mark','meta','meter','nav','noframes','noscript','object','ol','optgroup','option','output','p','param','picture','pre','progress','q','rp','rt','ruby','s','samp','script','section','select','small','source','span','strike','strong','style','sub','summary','sup','svg','table','tbody','td','template','textarea','tfoot','th','thead','time','title','tr','track','tt','u','ul','var','video','wbr'];
    for (let t of tags) {
      T[t] = function(o = null, c = null) {return T.cr(t, o, c);};
      if (window) {
        window[t] = T[t];
      }
    };
  }

  static setChildren(container, children) {
    if (typeof container === 'string') {
      var container = document.getElementById(container);
    }
    for (let element of T.isIterableArray(children)?children:[children]) {
      container.appendChild(element);
    }
  }
}

