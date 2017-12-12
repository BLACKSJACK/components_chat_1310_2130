/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(7).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(10);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chat_chat_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__form_form_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_http_service_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_chat_service_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_css__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__app_css__);








const USER_NAME = 'Artsiom';


class App {
    constructor({el}) {
        this.el = el;
        this.chat = new __WEBPACK_IMPORTED_MODULE_0__chat_chat_js__["a" /* Chat */]({
            el: document.createElement('div'),
            data: {
                messages: [],
                user: USER_NAME
            }
        });
        this.form = new __WEBPACK_IMPORTED_MODULE_1__form_form_js__["a" /* Form */]({
            el: document.createElement('div'),
            onSubmit: this._onFormSubmit.bind(this)
        });

        this.el.append(this.chat.el, this.form.el);

        const httpService = new __WEBPACK_IMPORTED_MODULE_2__modules_http_service_js__["a" /* default */]();
        this.chatService = new __WEBPACK_IMPORTED_MODULE_3__modules_chat_service_js__["a" /* default */]({
            baseUrl: 'https://components-1601-1930.firebaseio.com/chat/messages10_13.json',
            http: httpService,
            pollingInterval: 1000
        });

        this.chatService.setUserName(USER_NAME);

        this.chatService.on('messages', (messages) => {
            this.chat.add(messages);
            this.chat.render();
        });

        // this.chatService.startPolling();
        this.render();
    }

    render() {
        this.chat.render();
        this.form.render();
    }

    _onFormSubmit({text}) {
        this.chatService.sendMessage({
            text
        });

        this.chat.setScrollStrategy('bottom');
        this.form.render();
    }
}

new App({
    el: document.querySelector('.js-app')
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_avatar_service_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chat_jade__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chat_jade___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__chat_jade__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_css__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__chat_css__);





class Chat {
    constructor({el, data = {messages: []}}) {
        this.el = el;
        this.data = data;

        this._scrollStrategy = 'bottom';

        this._initEvents();
    }

    _initEvents() { }

    render({scroll} = {}) {
        this._saveScrollTop();
        this.el.innerHTML = this._getHtml(this.data);
        this._restoreScrollTop(scroll);
    }

    _getHtml() {
        return __WEBPACK_IMPORTED_MODULE_1__chat_jade___default()(this.data);
    }

    _saveScrollTop() {
        let chatBox = this.el.querySelector('.chat__box');

        if (chatBox) {
            this._scrollTop = chatBox.scrollTop;
        }
    }

    _restoreScrollTop() {
        let chatBox = this.el.querySelector('.chat__box');

        if (chatBox) {
            switch (this._scrollStrategy) {
                case 'bottom':
                    chatBox.scrollTop = chatBox.scrollHeight;
                    break;
                case 'fixed':
                    chatBox.scrollTop = this._scrollTop;
            }
        }
    }

    _updateMessages() {
        this.data.messages = this.data.messages.sort((message1, message2) => {
            return message2.date - message1.date;
        });
    }

    setMessages(messages = []) {
        this.data.messages.length = 0;
        this.add(messages);
    }

    setScrollStrategy(strategy) {
        this._scrollStrategy = strategy;
    }

    add(messages = []) {
        let addOneMessageMethod = this.addOne.bind(this);
        this.data.messages = [];
        messages.forEach(addOneMessageMethod);
    }

    addOne(data) {
        this.data.messages.push(this._prepareMessage(data));
    }

    _prepareMessage({name, text, date = Date.now(), html}) {
        return {
            name,
            isMine: name === this.data.user,
            avatar: __WEBPACK_IMPORTED_MODULE_0__modules_avatar_service_js__["a" /* avatarService */].getByName(name),
            text,
            date: new Date(date),
            html
        };
    }

    setUserName(name) {
        this.data.user = name;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Chat;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AvatarService {
    constructor() {
        this._users = new Proxy({}, {
            get: this._onNameGet.bind(this),
            set: this._onNameSet.bind(this)
        });
    }

    // TODO: https://semantic-ui.com/images/avatar2/small/${imgName}.png
    getByName(userName) {
        if (!this._users[userName]) {
            this._users[userName] = `https://unsplash.it/200/200/?random=${Math.random() * 1000}`;
        }

        return this._users[userName];
    }

    _onNameGet(target, property, receiver) {
        return localStorage.getItem(property);
    }

    _onNameSet(target, property, value, receiver) {
        localStorage.setItem(property, value);

        return true;
    }
}

const avatarService = new AvatarService();
/* harmony export (immutable) */ __webpack_exports__["a"] = avatarService;



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (messages) {pug_html = pug_html + "\u003Cdiv class=\"chat\"\u003E\u003Cdiv class=\"chat__container\"\u003E\u003Cdiv class=\"header\"\u003E\u003Ch2\u003EYou are logged in as %username%\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"chat__box\"\u003E";
// iterate messages
;(function(){
  var $$obj = messages;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var message = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["message-box " + (message.isMine ? "right-img" : "left-img")], [true]), false, true)) + "\u003E\u003Cdiv class=\"picture\"\u003E\u003Cimg" + (pug.attr("src", message.avatar, true, true)) + "\u003E\u003Cspan class=\"time\"\u003E" + (pug.escape(null == (pug_interp = message.date.getHours() + ':' + message.date.getMinutes()) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"message\"\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = message.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cp\u003E" + (pug.escape(null == (pug_interp = message.text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var message = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["message-box " + (message.isMine ? "right-img" : "left-img")], [true]), false, true)) + "\u003E\u003Cdiv class=\"picture\"\u003E\u003Cimg" + (pug.attr("src", message.avatar, true, true)) + "\u003E\u003Cspan class=\"time\"\u003E" + (pug.escape(null == (pug_interp = message.date.getHours() + ':' + message.date.getMinutes()) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"message\"\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = message.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cp\u003E" + (pug.escape(null == (pug_interp = message.text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"messages" in locals_for_with?locals_for_with.messages:typeof messages!=="undefined"?messages:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./chat.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./chat.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".chat__container {\n    width: 100%;\n    display: block;\n    overflow: hidden;\n}\n\n.form__control-helper {\n    margin-left: 10px;\n}\n\n.header {\n    padding: 20px 20px 18px 20px;\n    background: #9b4dca;\n    color: #fff;\n}\n\n.header h2 {\n    font-size: 16px;\n    line-height: 15px;\n    display: inline-block;\n    letter-spacing: 0.05em;\n    margin-bottom: 0;\n}\n\n.header a {\n    color: whitesmoke;\n    font-size: x-small;\n    display: block;\n}\n\n.chat__box {\n    background: #ECECEC;\n    padding: 0 20px;\n    color: #a1a1a1;\n    overflow-y: auto;\n    height: calc(100vh - 281px);\n}\n\n.chat__box .message-box {\n    padding: 18px 0 10px;\n    clear: both;\n}\n\n.message-box .picture {\n    float: left;\n    width: 50px;\n    display: block;\n    padding-right: 10px;\n}\n\n.picture img {\n    width: 43px;\n    height: 43px;\n    border-radius: 5px;\n}\n\n.picture span {\n    font-weight: bold;\n    font-size: 10px;\n    clear: both;\n    display: block;\n    text-align: center;\n    margin-top: 3px;\n}\n\n.message {\n    background: #fff;\n    display: inline-block;\n    padding: 13px;\n    width: 274px;\n    border-radius: 2px;\n    box-shadow: 0 1px 1px rgba(0, 0, 0, .04);\n    position: relative;\n}\n\n.message:before {\n    content: \"\";\n    position: absolute;\n    display: block;\n    left: 0;\n    border-right: 6px solid #fff;\n    border-top: 6px solid transparent;\n    border-bottom: 6px solid transparent;\n    top: 10px;\n    margin-left: -6px;\n}\n\n.message span {\n    color: #555;\n    font-weight: bold;\n}\n\n.message p {\n    padding-top: 5px;\n}\n\n.message-box.right-img .picture {\n    float: right;\n    padding: 0;\n    padding-left: 10px;\n}\n\n.message-box.right-img .picture img {\n    float: right;\n}\n\n.message-box.right-img .message:before {\n    left: 100%;\n    margin-right: 6px;\n    margin-left: 0;\n    border-right: 6px solid transparent;\n    border-left: 6px solid #fff;\n    border-top: 6px solid transparent;\n    border-bottom: 6px solid transparent;\n}\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__form_jade__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__form_jade___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__form_jade__);


class Form {
    constructor({el, onSubmit}) {
        this.el = el;

        this.el.addEventListener('submit', this._onSubmit.bind(this));
        this.onSubmit = onSubmit;
    }

    render() {
        this.el.innerHTML = __WEBPACK_IMPORTED_MODULE_0__form_jade___default()();
    }

    _onSubmit(event) {
        event.preventDefault();
        this.onSubmit({
            text: event.target.querySelector('textarea').value
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Form;



/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cform\u003E\u003Ctextarea\u003E\u003C\u002Ftextarea\u003E\u003Cinput type=\"submit\" value=\"Отправить\"\u003E\u003C\u002Fform\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Service for making of http requests
 * @module {HttpService} HttpService
 */

/**
 * @class HttpService
 * @alias module:HttpService
 * @mixes Emitter
 */
class HttpService {
    /**
     * @private
     * @constructor
     */
    constructor() {
    }

    /**
     * Setting the base URL for requests
     * @param {string} url
     */
    setBaseUrl(url) {
        this.baseUrl = url;
    }

    /**
     * Setting a JWT token
     * @param {string} token 
     */
    setToken(token) {
        this.token = token;
    }

    /**
     * Making a HTTP request
     * @param {string} type specified a HTTP method
     * @param {Object} data specified a body of request
     * @return {Promise}
     */
    makeRequest(type = 'GET', data = {}) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            let url;
            if (this.token) {
                url = this.baseUrl + `?auth=${this.token}`;
            } else {
                url = this.baseUrl;
            }

            xhr.open(type, url, true);

            xhr.addEventListener('load', () => resolve({
                data: JSON.parse(xhr.responseText),
                xhr
            }));
            xhr.addEventListener('error', reject);
            xhr.addEventListener('abort', reject);

            xhr.send(JSON.stringify(data));
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HttpService;




/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_pure_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_emitter_js__ = __webpack_require__(16);
/**
 * Service of chat functionality. Provide sending and polling of messages.
 * @module {ChatService} ChatService
 */





/**
 * @class ChatService
 * @alias module:ChatService
 * @mixes Emitter
 */
class ChatService {

    constructor({ baseUrl, pollingInterval = 15000, http }) {
        __WEBPACK_IMPORTED_MODULE_1__utils_emitter_js__["a" /* default */].apply(this);

        this.pollingInterval = pollingInterval;
        this.http = http;

        this.http.setBaseUrl(baseUrl);

        this._messages = [];
        this._pollingID = null;
        this._stopped = false;
        this._username = 'anonimus';
    }

    /**
     * @method setUserName
     * @public
     * @param {string} name - set username field
     */
    setUserName(name) {
        this._username = name;
        this.trigger('username:change', {name});
    }


    getUserName() {
        return this._username;
    }

    getMessages() {
        return this.http.makeRequest()
            .then(resp => Object.values(resp.data));
    }

    sendMessage(data) {
        data.date = Date.now();
        data.name = this._username;

        return this.http.makeRequest('POST', data)
            .then(resp => resp.data);
    }

    startPolling() {
        this._stopped = false;

        let doRequest = () => {
            if (this._stopped) {
                return;
            }

            this.getMessages().then((messages) => {
                this.setMessages(messages);
                this._pollingID = setTimeout(doRequest, this.pollingInterval);
            });
        };

        doRequest();
    }

    stopPolling() {
        clearTimeout(this._pollingID);
        this._stopped = true;
    }

    setMessages(messages) {
        if (Object(__WEBPACK_IMPORTED_MODULE_0__utils_pure_js__["a" /* deepEqual */])(this._messages, messages)) {
            return;
        }

        this._messages = messages;
        this.trigger('messages', this._messages);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ChatService;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return deepEqual; });
/* unused harmony export capitalize */
/* unused harmony export isPrimitive */
/**
 * @module utils
 */

/**
 * Returns true if argument belongs to primitive type
 * @param {*} target
 * @return {boolean}
 */
function isPrimitive(target) {
    return typeof target !== 'object' || target === null;
}

/**
 * Compares two objects by value
 * @param {Object} x
 * @param {Object} y
 * @return {boolean}
 */
function deepEqual(x, y) {
    if (!isPrimitive(x) && !isPrimitive(y)) {
        if (Object.keys(x).length !== Object.keys(y).length) {
            return false;
        }

        for (let prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (!deepEqual(x[prop], y[prop])) {
                    return false;
                }
            } else {
                return false;
            }
        }

        return true;
    } else {
        return x === y;
    }
}

/**
 * Transforms the first letter of the string to capital
 * @param {string} str
 * @return {string}
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}




/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Emitter;
/**
 * This provides methods used for event handling. It's not meant to be used directly.
 * @module {Emitter} Emitter
 */

/**
 * @class Emitter
 * @alias module:Emitter
 * @mixin Emitter
 */
function Emitter() {
    /**
     * Fire an event, causing all handlers for that event name to run.
     * @param {string} name event name
     * @param {*} data event payload
     * @lends Emitter
     */
    this.trigger = function(name, data) {
        if (this[Emitter.symbol][name]) {
            this[Emitter.symbol][name].forEach((cb) => cb.call(this, data));
        }
    };

    /**
     * Register a handler function to be called whenever this event is fired.
     * @param {string} name event name
     * @param {function} cb callback
     * @lends Emitter
     */
    this.on = function(name, cb) {
        if (!this[Emitter.symbol][name]) {
            this[Emitter.symbol][name] = [];
        }

        this[Emitter.symbol][name].push(cb);
    };
}

/**
 * Link for symbol for storign callbacks
 * @static
 */
Emitter.symbol = Symbol.for('emitter:callbacks');

/**
 * Method for apply mixin to the recipient
 * @static
 * @param {*} recipient - object to install functionality
 */
Emitter.apply = function(recipient) {
    if (!recipient[Emitter.symbol]) {
        recipient[Emitter.symbol] = {};
    }

    Function.prototype.apply.call(Emitter, recipient);
};




/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./app.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./app.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "* {\n    font-family: 'Helvetica Neue', Helvetica, sans-serif;\n    font-size: 14px;\n    margin: 0;\n}\n\n.app {\n    width: 400px;\n    margin: 0 auto;\n}", ""]);

// exports


/***/ })
/******/ ]);