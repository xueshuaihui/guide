/*!
 * guide v1.0.0beta0.0.2
 * author: xuesh
 * Date: Tue, 11 Jan 2022 02:32:16 GMT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Guide = factory());
})(this, (function () { 'use strict';

	var version = "1.0.0beta0.0.2";

	var options$1 = {
	  // 下一步按钮参数
	  nextLabel: '下一步',
	  nextclass: '',
	  // 上一步按钮参数
	  prevLabel: '上一步',
	  prevclass: '',
	  prevEnable: true,
	  // 跳过按钮参数
	  skipLabel: '跳过',
	  skipclass: '',
	  skipEnable: false,
	  // 结束按钮参数
	  doneLabel: '完成',
	  doneclass: '',
	  doneEnable: true,
	  // 提示框弹出位置
	  confirmtipPosition: 'bottom',
	  // 提示框弹出自定义class
	  confirmtipClass: '',
	  // 是否打开遮罩层
	  openoverlayer: false,
	  // 遮罩层透明度
	  overlayOpacity: '.7',
	  // 提示框弹出位置是否自动, 设置true时会对confirmtipPosition 覆盖
	  // autoPosition: false,
	  // 是否禁止引导dom交互
	  // disableInteraction: false,
	  // 开启动画
	  animation: false,
	  // 触发键盘“esc”时，是否退出引导流程
	  // exitOnEsc: false,
	  // 宽高
	  width: 200,
	  height: 200,
	  mount: null,
	  unmount: null,
	  jointsClass: 'joints-triangle'
	};

	let list = {};
	const Listen = (key, fun) => {
	  if (!list[key]) {
	    list[key] = [];
	  }

	  list[key].push(fun);
	};
	const Trigger = (...arg) => {
	  // var key = Array.prototype.shift.call(arg),
	  let key = arg[0];
	  const fns = list[key];

	  if (!fns || fns.length === 0) {
	    return false;
	  }

	  for (var i = 0, fn; fn = fns[i++];) {
	    fn(arg);
	  }
	};

	/**
	 * 判断数据格式
	 * @param data {object} - 待判断的数据.
	 * @return {boolean}
	 *
	 */
	const TypeOf = data => {
	  const type = Object.prototype.toString.call(data);
	  return type.slice(1, -1).split(' ')[1].replace(/^[A-Z]/, a => {
	    return a.toLowerCase();
	  });
	};
	const unitAttr = ['width', 'height', 'left', 'right', 'top', 'bottom', 'margin', 'margin-top', 'margin-left', 'margin-bottom', 'margin-right']; // 设置样式时， 需要将数字转换为 number+px 的属性

	/**
	 * 设置行内样式
	 *
	 * @param {Object} element
	 * @param {Object|string} style
	 * @return Element
	 */

	const setStyle = (element, style) => {
	  if (!style) return;
	  let cssText = '';

	  if (element.style.cssText) {
	    cssText += element.style.cssText;
	  }

	  if (typeof style === 'string') {
	    cssText += style;
	  } else {
	    Object.keys(style).forEach(rule => {
	      if (unitAttr.indexOf(rule) >= 0 && !isNaN(style[rule])) {
	        cssText += `${rule}:${style[rule]}px;`;
	      } else {
	        cssText += `${rule}:${style[rule]};`;
	      }
	    });
	  }

	  element.style.cssText = cssText;
	  return element;
	};
	/**
	 * 创建dom标签
	 *
	 * @param {String} tagname
	 * @param {Object} attrs
	 * @return Element
	 */

	const createElement = (tagname, attrs) => {
	  let element = document.createElement(tagname);
	  attrs = attrs || {};

	  for (const k in attrs) {
	    let v = attrs[k];

	    if (k === 'style') {
	      setStyle(element, v);
	    } else {
	      element.setAttribute(k, v);
	    }
	  }

	  return element;
	};
	/**
	 * scroll移动到指定元素
	 * @param {string} el 元素选择器
	 */

	const ScrollToControl = el => {
	  const target = document.querySelector(el);
	  if (!target || !target.getClientRects().length) return;
	  const {
	    width,
	    height,
	    top,
	    left
	  } = target.getClientRects()[0]; // outerWidth, outerHeight

	  if (top < 0) {
	    moveScroll(0, top - height);
	  } else if (top > outerHeight - height) {
	    moveScroll(0, top - height);
	  }
	};
	/**
	 * 移动scroll
	 * @param {number} toX left方向移动到哪
	 * @param {number} toY top方向移动到哪
	 */

	const moveScroll = (toX, toY) => {
	  window.scrollBy(toX, toY);
	};

	function anonymous$2(locals, escapeFn, include, rethrow
	) {
	rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc){
	  var lines = str.split('\n');
	  var start = Math.max(lineno - 3, 0);
	  var end = Math.min(lines.length, lineno + 3);
	  var filename = esc(flnm); // eslint-disable-line
	  // Error context
	  var context = lines.slice(start, end).map(function (line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? ' >> ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'ejs') + ':'
	    + lineno + '\n'
	    + context + '\n\n'
	    + err.message;

	  throw err;
	};
	escapeFn = escapeFn || function (markup) {
	  return markup == undefined
	    ? ''
	    : String(markup)
	      .replace(_MATCH_HTML, encode_char);
	};
	var _ENCODE_HTML_RULES = {
	      "&": "&amp;"
	    , "<": "&lt;"
	    , ">": "&gt;"
	    , '"': "&#34;"
	    , "'": "&#39;"
	    }
	  , _MATCH_HTML = /[&<>'"]/g;
	function encode_char(c) {
	  return _ENCODE_HTML_RULES[c] || c;
	}var __line = 1
	  , __lines = "<div class=\"guide-joints <%= locals.jointsClass %>\">\n</div>\n<div class=\"guide-tooltip-main\">\n    <div class=\"guide-container\"></div>\n    <div class=\"guide-button-box\">\n        <div class=\"guide-button guide-next-button <%= locals.nextclass %>\" code=\"next\" steps=\"<%= locals.name %>\">\n            <%= locals.nextLabel %>\n        </div>\n\n        <% if(locals.prevEnable){ %>\n            <div class=\"guide-button guide-prev-button <%= locals.prevclass %>\" code=\"prev\" steps=\"<%= locals.name %>\">\n                <%= locals.prevLabel %>\n            </div>\n            <% } %>\n\n                <% if(locals.skipEnable){ %>\n                    <div class=\"guide-button guide-skip-button <%= locals.skipclass %>\" code=\"skip\"\n                        steps=\"<%= locals.name %>\">\n                        <%= locals.skipLabel %>\n                    </div>\n                    <% } %>\n                        <% if(locals.doneEnable){ %>\n                            <div class=\"guide-button guide-done-button <%= locals.doneclass %>\" code=\"done\"\n                                steps=\"<%= locals.name %>\">\n                                <%= locals.doneLabel %>\n                            </div>\n                            <%}%>\n\n    </div>\n</div>"
	  , __filename = undefined;
	try {
	  var __output = "";
	  function __append(s) { if (s !== undefined && s !== null) __output += s; }
	    ; __append("<div class=\"guide-joints ")
	    ; __append(escapeFn( locals.jointsClass ))
	    ; __append("\">\n</div>\n<div class=\"guide-tooltip-main\">\n    <div class=\"guide-container\"></div>\n    <div class=\"guide-button-box\">\n        <div class=\"guide-button guide-next-button ")
	    ; __line = 6
	    ; __append(escapeFn( locals.nextclass ))
	    ; __append("\" code=\"next\" steps=\"")
	    ; __append(escapeFn( locals.name ))
	    ; __append("\">\n            ")
	    ; __line = 7
	    ; __append(escapeFn( locals.nextLabel ))
	    ; __append("\n        </div>\n\n        ")
	    ; __line = 10
	    ;  if(locals.prevEnable){ 
	    ; __append("\n            <div class=\"guide-button guide-prev-button ")
	    ; __line = 11
	    ; __append(escapeFn( locals.prevclass ))
	    ; __append("\" code=\"prev\" steps=\"")
	    ; __append(escapeFn( locals.name ))
	    ; __append("\">\n                ")
	    ; __line = 12
	    ; __append(escapeFn( locals.prevLabel ))
	    ; __append("\n            </div>\n            ")
	    ; __line = 14
	    ;  } 
	    ; __append("\n\n                ")
	    ; __line = 16
	    ;  if(locals.skipEnable){ 
	    ; __append("\n                    <div class=\"guide-button guide-skip-button ")
	    ; __line = 17
	    ; __append(escapeFn( locals.skipclass ))
	    ; __append("\" code=\"skip\"\n                        steps=\"")
	    ; __line = 18
	    ; __append(escapeFn( locals.name ))
	    ; __append("\">\n                        ")
	    ; __line = 19
	    ; __append(escapeFn( locals.skipLabel ))
	    ; __append("\n                    </div>\n                    ")
	    ; __line = 21
	    ;  } 
	    ; __append("\n                        ")
	    ; __line = 22
	    ;  if(locals.doneEnable){ 
	    ; __append("\n                            <div class=\"guide-button guide-done-button ")
	    ; __line = 23
	    ; __append(escapeFn( locals.doneclass ))
	    ; __append("\" code=\"done\"\n                                steps=\"")
	    ; __line = 24
	    ; __append(escapeFn( locals.name ))
	    ; __append("\">\n                                ")
	    ; __line = 25
	    ; __append(escapeFn( locals.doneLabel ))
	    ; __append("\n                            </div>\n                            ")
	    ; __line = 27
	    ; }
	    ; __append("\n\n    </div>\n</div>")
	    ; __line = 30;
	  return __output;
	} catch (e) {
	  rethrow(e, __lines, __filename, __line, escapeFn);
	}

	}

	/**
	 * 创建遮罩层
	 * @param {json} style 遮罩层基础参数
	 * @return {object}  Overlayer对象
	 */

	const createOverlayer = style => {
	  let attr = {
	    style: style
	  };
	  attr.class = 'guide-overlayer';
	  const element = createElement('div', attr);
	  return element;
	};
	/**
	 * 创建引导step的target框
	 * @param {json} style 基础参数
	 * @return {object}  外框对象
	 */

	const createGuideTargetBox = function (style, name) {
	  let attr = {
	    style: style
	  };
	  attr.class = `guide-step-target ${this.openoverlayer ? 'guide-overlayer-bgcolor' : ''}`;
	  const stepTarget = createElement('div', attr); // stepTarget.innerHTML = createGuideTipBox.call(this, name)

	  return stepTarget;
	};
	/**
	 * 创建引导step的tip dom外框
	 * @param {name} steps name
	 */

	const createGuideTipBox = function (name) {
	  const stepTarget = createElement('div', {
	    class: 'guide-tooltip'
	  });
	  stepTarget.innerHTML = anonymous$2({
	    name,
	    ...this
	  });
	  return stepTarget;
	};

	var options = {
	  content: '',
	  // 内容数据
	  width: '',
	  height: '',
	  offsetX: '0',
	  offsetY: '0',
	  position: 'bottom',
	  // top bottom left right
	  tipClass: '',
	  jointsX: '',
	  jointsY: '',
	  mount: null,
	  unmount: null,
	  template: 'template1'
	};

	function anonymous$1(locals, escapeFn, include, rethrow
	) {
	rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc){
	  var lines = str.split('\n');
	  var start = Math.max(lineno - 3, 0);
	  var end = Math.min(lines.length, lineno + 3);
	  var filename = esc(flnm); // eslint-disable-line
	  // Error context
	  var context = lines.slice(start, end).map(function (line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? ' >> ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'ejs') + ':'
	    + lineno + '\n'
	    + context + '\n\n'
	    + err.message;

	  throw err;
	};
	escapeFn = escapeFn || function (markup) {
	  return markup == undefined
	    ? ''
	    : String(markup)
	      .replace(_MATCH_HTML, encode_char);
	};
	var _ENCODE_HTML_RULES = {
	      "&": "&amp;"
	    , "<": "&lt;"
	    , ">": "&gt;"
	    , '"': "&#34;"
	    , "'": "&#39;"
	    }
	  , _MATCH_HTML = /[&<>'"]/g;
	function encode_char(c) {
	  return _ENCODE_HTML_RULES[c] || c;
	}var __line = 1
	  , __lines = "<style>.guide-tip-template1 {\n  width: 100%;\n  height: 100%;\n  font-family: PingFang SC;\n  color: rgba(47, 46, 63, 0.85); }\n  .guide-tip-template1 .guide-message {\n    flex: 1; }\n    .guide-tip-template1 .guide-message h3 {\n      align-items: center;\n      letter-spacing: 1px;\n      font-family: PingFang SC;\n      font-style: normal;\n      font-weight: 600;\n      font-size: 20px;\n      line-height: 28px;\n      color: #2878ff;\n      margin: 0; }\n    .guide-tip-template1 .guide-message p {\n      font-family: PingFang SC;\n      font-style: normal;\n      font-weight: normal;\n      font-size: 14px;\n      line-height: 22px;\n      color: rgba(47, 46, 63, 0.65);\n      margin-top: 8px; }\n</style>\n<div class=\"guide-tip-template1\">\n    <% if(Array.isArray(locals)) { %>\n        <% locals.forEach(function(item){ %>\n            <div>\n                <% if (item.image) { %>\n                    <div class=\"guide-image\">\n                        <img src=\"<%= item.image %>\" alt=\"\" />\n                    </div>\n                    <% } %>\n                        <div class=\"guide-message\">\n                            <h3>\n                                <%= item.title %>\n                            </h3>\n                            <p>\n                                <%= item.text %>\n                            </p>\n                        </div>\n            </div>\n            <% }) %>\n                <% }else{ %>\n                    <div>\n                        <% if (locals.image) { %>\n                            <div class=\"guide-image\">\n                                <img src=\"<%= item.image %>\" alt=\"\" />\n                            </div>\n                            <% } %>\n                                <div class=\"guide-message\">\n                                    <h3>\n                                        <%= locals.title %>\n                                    </h3>\n                                    <p>\n                                        <%= locals.text %>\n                                    </p>\n                                </div>\n                    </div>\n                    <% } %>\n\n</div>"
	  , __filename = undefined;
	try {
	  var __output = "";
	  function __append(s) { if (s !== undefined && s !== null) __output += s; }
	    ; __append("<style>.guide-tip-template1 {\n  width: 100%;\n  height: 100%;\n  font-family: PingFang SC;\n  color: rgba(47, 46, 63, 0.85); }\n  .guide-tip-template1 .guide-message {\n    flex: 1; }\n    .guide-tip-template1 .guide-message h3 {\n      align-items: center;\n      letter-spacing: 1px;\n      font-family: PingFang SC;\n      font-style: normal;\n      font-weight: 600;\n      font-size: 20px;\n      line-height: 28px;\n      color: #2878ff;\n      margin: 0; }\n    .guide-tip-template1 .guide-message p {\n      font-family: PingFang SC;\n      font-style: normal;\n      font-weight: normal;\n      font-size: 14px;\n      line-height: 22px;\n      color: rgba(47, 46, 63, 0.65);\n      margin-top: 8px; }\n</style>\n<div class=\"guide-tip-template1\">\n    ")
	    ; __line = 28
	    ;  if(Array.isArray(locals)) { 
	    ; __append("\n        ")
	    ; __line = 29
	    ;  locals.forEach(function(item){ 
	    ; __append("\n            <div>\n                ")
	    ; __line = 31
	    ;  if (item.image) { 
	    ; __append("\n                    <div class=\"guide-image\">\n                        <img src=\"")
	    ; __line = 33
	    ; __append(escapeFn( item.image ))
	    ; __append("\" alt=\"\" />\n                    </div>\n                    ")
	    ; __line = 35
	    ;  } 
	    ; __append("\n                        <div class=\"guide-message\">\n                            <h3>\n                                ")
	    ; __line = 38
	    ; __append(escapeFn( item.title ))
	    ; __append("\n                            </h3>\n                            <p>\n                                ")
	    ; __line = 41
	    ; __append(escapeFn( item.text ))
	    ; __append("\n                            </p>\n                        </div>\n            </div>\n            ")
	    ; __line = 45
	    ;  }) 
	    ; __append("\n                ")
	    ; __line = 46
	    ;  }else { 
	    ; __append("\n                    <div>\n                        ")
	    ; __line = 48
	    ;  if (locals.image) { 
	    ; __append("\n                            <div class=\"guide-image\">\n                                <img src=\"")
	    ; __line = 50
	    ; __append(escapeFn( item.image ))
	    ; __append("\" alt=\"\" />\n                            </div>\n                            ")
	    ; __line = 52
	    ;  } 
	    ; __append("\n                                <div class=\"guide-message\">\n                                    <h3>\n                                        ")
	    ; __line = 55
	    ; __append(escapeFn( locals.title ))
	    ; __append("\n                                    </h3>\n                                    <p>\n                                        ")
	    ; __line = 58
	    ; __append(escapeFn( locals.text ))
	    ; __append("\n                                    </p>\n                                </div>\n                    </div>\n                    ")
	    ; __line = 62
	    ;  } 
	    ; __append("\n\n</div>")
	    ; __line = 64;
	  return __output;
	} catch (e) {
	  rethrow(e, __lines, __filename, __line, escapeFn);
	}

	}

	function anonymous(locals, escapeFn, include, rethrow
	) {
	rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc){
	  var lines = str.split('\n');
	  var start = Math.max(lineno - 3, 0);
	  var end = Math.min(lines.length, lineno + 3);
	  var filename = esc(flnm); // eslint-disable-line
	  // Error context
	  var context = lines.slice(start, end).map(function (line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? ' >> ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'ejs') + ':'
	    + lineno + '\n'
	    + context + '\n\n'
	    + err.message;

	  throw err;
	};
	escapeFn = escapeFn || function (markup) {
	  return markup == undefined
	    ? ''
	    : String(markup)
	      .replace(_MATCH_HTML, encode_char);
	};
	var _ENCODE_HTML_RULES = {
	      "&": "&amp;"
	    , "<": "&lt;"
	    , ">": "&gt;"
	    , '"': "&#34;"
	    , "'": "&#39;"
	    }
	  , _MATCH_HTML = /[&<>'"]/g;
	function encode_char(c) {
	  return _ENCODE_HTML_RULES[c] || c;
	}var __line = 1
	  , __lines = "<style>.guide-tip-template2 {\n  width: 100%;\n  height: 100%;\n  font-family: PingFang SC;\n  color: rgba(47, 46, 63, 0.85); }\n  .guide-tip-template2 .guide-image {\n    width: 100%;\n    height: auto; }\n    .guide-tip-template2 .guide-image img {\n      width: 100%; }\n  .guide-tip-template2 .guide-message {\n    flex: 1;\n    font-family: PingFang SC;\n    font-style: normal; }\n    .guide-tip-template2 .guide-message h3 {\n      align-items: center;\n      letter-spacing: 1px;\n      font-weight: 600;\n      font-size: 20px;\n      line-height: 28px;\n      color: #2878ff;\n      margin: 0; }\n    .guide-tip-template2 .guide-message p {\n      font-weight: normal;\n      font-size: 14px;\n      line-height: 22px;\n      color: rgba(47, 46, 63, 0.65);\n      margin-top: 8px; }\n    .guide-tip-template2 .guide-message a {\n      font-weight: normal;\n      font-size: 14px;\n      line-height: 22px;\n      color: #2878ff; }\n</style>\n<div class=\"guide-tip-template2\">\n    <div>\n        <% if (locals.image) { %>\n            <div class=\"guide-image\">\n                <img src=\"<%= locals.image %>\" alt=\"\" />\n            </div>\n            <% } %>\n                <div class=\"guide-message\">\n                    <h3>\n                        <% if(locals.title){ %>\n                            <% } %>\n                                <%= locals.title %>\n                    </h3>\n                    <p>\n                        <% if(locals.text){ %>\n                            <% } %>\n                                <%= locals.text %>\n                    </p>\n                    <% if(locals.href){ %>\n                        <a href=\"locals.href\">locals.hrefText</a>\n                        <% } %>\n\n                </div>\n    </div>\n\n</div>"
	  , __filename = undefined;
	try {
	  var __output = "";
	  function __append(s) { if (s !== undefined && s !== null) __output += s; }
	    ; __append("<style>.guide-tip-template2 {\n  width: 100%;\n  height: 100%;\n  font-family: PingFang SC;\n  color: rgba(47, 46, 63, 0.85); }\n  .guide-tip-template2 .guide-image {\n    width: 100%;\n    height: auto; }\n    .guide-tip-template2 .guide-image img {\n      width: 100%; }\n  .guide-tip-template2 .guide-message {\n    flex: 1;\n    font-family: PingFang SC;\n    font-style: normal; }\n    .guide-tip-template2 .guide-message h3 {\n      align-items: center;\n      letter-spacing: 1px;\n      font-weight: 600;\n      font-size: 20px;\n      line-height: 28px;\n      color: #2878ff;\n      margin: 0; }\n    .guide-tip-template2 .guide-message p {\n      font-weight: normal;\n      font-size: 14px;\n      line-height: 22px;\n      color: rgba(47, 46, 63, 0.65);\n      margin-top: 8px; }\n    .guide-tip-template2 .guide-message a {\n      font-weight: normal;\n      font-size: 14px;\n      line-height: 22px;\n      color: #2878ff; }\n</style>\n<div class=\"guide-tip-template2\">\n    <div>\n        ")
	    ; __line = 37
	    ;  if (locals.image) { 
	    ; __append("\n            <div class=\"guide-image\">\n                <img src=\"")
	    ; __line = 39
	    ; __append(escapeFn( locals.image ))
	    ; __append("\" alt=\"\" />\n            </div>\n            ")
	    ; __line = 41
	    ;  } 
	    ; __append("\n                <div class=\"guide-message\">\n                    <h3>\n                        ")
	    ; __line = 44
	    ;  if(locals.title){ 
	    ; __append("\n                            ")
	    ; __line = 45
	    ;  } 
	    ; __append("\n                                ")
	    ; __line = 46
	    ; __append(escapeFn( locals.title ))
	    ; __append("\n                    </h3>\n                    <p>\n                        ")
	    ; __line = 49
	    ;  if(locals.text){ 
	    ; __append("\n                            ")
	    ; __line = 50
	    ;  } 
	    ; __append("\n                                ")
	    ; __line = 51
	    ; __append(escapeFn( locals.text ))
	    ; __append("\n                    </p>\n                    ")
	    ; __line = 53
	    ;  if(locals.href){ 
	    ; __append("\n                        <a href=\"locals.href\">locals.hrefText</a>\n                        ")
	    ; __line = 55
	    ;  } 
	    ; __append("\n\n                </div>\n    </div>\n\n</div>")
	    ; __line = 60;
	  return __output;
	} catch (e) {
	  rethrow(e, __lines, __filename, __line, escapeFn);
	}

	}

	var temp = {
	  template1: anonymous$1,
	  template2: anonymous
	};

	/**
	 * Step类，代表一个步骤.
	 * @constructor
	 * @param customOptions {json} 自定义设置
	 */

	class Step {
	  constructor(customOptions) {
	    this.container = null; // 放置tip 的容器

	    this.setOptions(options);
	    this.setOptions(customOptions);
	  }
	  /**
	   * 单个设置option
	   * @param {string} key - option key.
	   * @param {object} value - option value.
	   */


	  setOption(key, value) {
	    // if (!key || !value) return
	    if (!key) return;
	    this[key] = value;
	    return this;
	  }
	  /**
	   * 批量设置option
	   * @param {json} options - options 集合{key, value}.
	   */


	  setOptions(options) {
	    if (!options) return;
	    Object.keys(options).forEach(key => {
	      this.setOption(key, options[key]);
	    });
	    return this;
	  }
	  /**
	   * 设置tip 内容
	   * @param {hTMLDivElement} tipElement dom 对象
	   */


	  setTipContent(tipElement) {
	    if (!tipElement || TypeOf(tipElement) !== 'hTMLDivElement') return;
	    const container = tipElement.querySelector('.guide-container');
	    container.innerHTML = temp[this.template || 'template1'](this.content);
	    setStyle(tipElement.querySelector('.guide-tooltip-main'), {
	      width: this.width
	    });
	  }
	  /**
	   * el target位置
	   *  @param {hTMLDivElement} targetElement dom 对象
	   */


	  setTargetPosition(targetElement) {
	    var _document$querySelect;

	    const el = document.querySelector(this.el);
	    ScrollToControl(this.el);
	    (_document$querySelect = document.querySelector('.guide-target')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.classList.remove('guide-target');

	    if (el && el.getClientRects().length) {
	      el.classList.add('guide-target');
	      const {
	        width,
	        height,
	        top,
	        left
	      } = el.getClientRects()[0];
	      setStyle(targetElement, {
	        width: width + 20,
	        height: height + 20,
	        top: top - 10,
	        left: left - 10,
	        display: 'block'
	      });
	    } else {
	      setStyle(targetElement, {
	        width: 0,
	        height: 0,
	        top: 0,
	        left: 0,
	        display: 'block'
	      });
	    }
	  }
	  /**
	   * 设置tip位置
	   * @param {hTMLDivElement} tipElement dom 对象
	   * @param {hTMLDivElement} targetElement dom 对象
	   */


	  setTipPosition(tipElement, targetElement) {
	    if (targetElement && tipElement) {
	      if (!this.el || !document.querySelector(this.el)) {
	        this.position = 'center';
	      }

	      const {
	        width,
	        height,
	        top,
	        left
	      } = targetElement.getClientRects()[0];
	      const params = {
	        targetWidth: width,
	        targetHeight: height,
	        targetTop: top,
	        targetLeft: left
	      };

	      switch (this.position) {
	        case 'bottom':
	          this._positionBottom(tipElement, params);

	          break;

	        case 'top':
	          this._positionTop(tipElement, params);

	          break;

	        case 'left':
	          this._positionLeft(tipElement, params);

	          break;

	        case 'right':
	          this._positionRight(tipElement, params);

	          break;

	        default:
	          this._positionCenter(tipElement);

	          break;
	      }

	      tipElement.className = `guide-tooltip guide-tooltip-${this.position}`;
	    }
	  }

	  _positionCenter(tipElement) {
	    const {
	      width,
	      height
	    } = tipElement.getClientRects()[0];
	    setStyle(tipElement, {
	      top: window.screen.height / 2 - height / 2,
	      left: document.body.clientWidth / 2 - width / 2
	    });
	  }

	  _positionBottom(tipElement, {
	    targetWidth,
	    targetHeight,
	    targetTop,
	    targetLeft
	  }) {
	    const {
	      width
	    } = tipElement.getClientRects()[0];
	    setStyle(tipElement, {
	      top: targetTop + targetHeight,
	      left: targetLeft + (targetWidth - width) / 2
	    });
	  }

	  _positionTop(tipElement, {
	    targetWidth,
	    targetHeight,
	    targetTop,
	    targetLeft
	  }) {
	    const {
	      width,
	      height
	    } = tipElement.getClientRects()[0];
	    setStyle(tipElement, {
	      top: targetTop - height,
	      left: targetLeft + (targetWidth - width) / 2
	    });
	  }

	  _positionLeft(tipElement, {
	    targetWidth,
	    targetHeight,
	    targetTop,
	    targetLeft
	  }) {
	    const {
	      width,
	      height
	    } = tipElement.getClientRects()[0];
	    setStyle(tipElement, {
	      top: targetTop - (height - targetHeight) / 2,
	      left: targetLeft - width
	    });
	  }

	  _positionRight(tipElement, {
	    targetWidth,
	    targetHeight,
	    targetTop,
	    targetLeft
	  }) {
	    const {
	      height
	    } = tipElement.getClientRects()[0];
	    setStyle(tipElement, {
	      top: targetTop - (height - targetHeight) / 2,
	      left: targetLeft + targetWidth
	    });
	  }
	  /**
	   * tip、joints偏移量
	   * @param {hTMLDivElement} tipElement dom 对象
	   * */


	  positionOffset(tipElement) {
	    if (!tipElement || TypeOf(tipElement) !== 'hTMLDivElement') return;
	    tipElement.style.transform = `translate(${this.offsetX || 0}px, ${this.offsetY || 0}px)`;
	    const joints = tipElement.querySelector('.guide-joints');
	    joints.style.transform = `translate(${this.jointsX || 0}px, ${this.jointsY || 0}px)`;
	  }

	}

	/**
	 * Guide类，代表一个引导流程.
	 * @constructor
	 * @param customOptions {json} 自定义设置
	 */

	class Guide {
	  constructor(customOptions) {
	    this.version = version;
	    this.steps = null; // 所有页面的流程集合

	    this.activeSteps = {}; // 当前激活状态的流程

	    this.overlayer = null;
	    this.setOptions(options$1);
	    this.setOptions(customOptions);
	    this.bindEvent();
	  }
	  /**
	   * 单个设置option
	   * @param {string} key - option key.
	   * @param {object} value - option value.
	   */


	  setOption(key, value) {
	    if (!key) return;
	    this[key] = value;
	    return this;
	  }
	  /**
	   * 批量设置option
	   * @param {json} options - options 集合{key, value}.
	   */


	  setOptions(options) {
	    if (!options) return;
	    Object.keys(options).forEach(key => {
	      this.setOption(key, options[key]);
	    });
	    return this;
	  }
	  /**
	   *开启引导流程
	      @param {string} code 引导name
	   */


	  start(code) {
	    var _this$steps;

	    if (!this.steps || ((_this$steps = this.steps) === null || _this$steps === void 0 ? void 0 : _this$steps.length) === 0) return;

	    this._createOverlayer();

	    this.setStepsState(code, true);
	    return this.activeSteps[code];
	  }
	  /**
	   * 设置流程状态
	   * @param {string} name 流程名称
	   * @param {boolean} state 流程状态 true/false  true:激活  false:关闭
	   */


	  setStepsState(name, state) {
	    const steps = this.steps[name];

	    if (state) {
	      if (this.activeSteps[name]) return;
	      this.activeSteps[name] = {
	        stepNumber: -1,
	        steps: steps
	      }; // 激活后 创建外层dom

	      this._createGuideTargetBox(name);

	      this._createGuideTipBox(name);

	      this.body.appendChild(this.activeSteps[name].targetElement);
	      this.body.appendChild(this.activeSteps[name].tipElement);

	      this._switchStepsNumber(name); // 开始流程


	      this.setStepsNumber(name, 0);
	      const overlayer = this.openoverlayer ? 'block' : 'none';
	      setStyle(this.overlayer, {
	        display: overlayer
	      }); // 触发回调

	      if (TypeOf(this.mount) === 'function') {
	        this.mount(name, this.activeSteps[name]);
	      }
	    } else {
	      var _this$activeSteps$nam;

	      // last step 注销回调
	      if (TypeOf((_this$activeSteps$nam = this.activeSteps[name].currentStep) === null || _this$activeSteps$nam === void 0 ? void 0 : _this$activeSteps$nam.unmount) === 'function') {
	        this.activeSteps[name].currentStep.unmount(name, this.activeSteps[name].currentStep);
	      } //  steps注销回调


	      if (TypeOf(this.unmount) === 'function') {
	        this.unmount(name, this.activeSteps[name]);
	      }

	      this.remove(name);
	      delete this.activeSteps[name];
	    }
	  }
	  /**
	   * 切换流程步骤的监听
	   */


	  _switchStepsNumber(name) {
	    Listen(name, arg => {
	      var _this$activeSteps$nam2;

	      const name = Array.prototype.shift.call(arg);
	      if (!this.activeSteps[name]) return;
	      const {
	        stepNumber,
	        steps
	      } = this.activeSteps[name];
	      const step = new Step(steps[stepNumber]);
	      this.setStep(step, this.activeSteps[name]); // 原step 注销回调

	      if (TypeOf((_this$activeSteps$nam2 = this.activeSteps[name].currentStep) === null || _this$activeSteps$nam2 === void 0 ? void 0 : _this$activeSteps$nam2.unmount) === 'function') {
	        this.activeSteps[name].currentStep.unmount(name, this.activeSteps[name].currentStep);
	      }

	      this.activeSteps[name].currentStep = step; // currentStep 创建回调

	      if (TypeOf(step.mount) === 'function') {
	        step.mount(name, step);
	      }

	      this.buttonState(this.activeSteps[name]); // 更新按钮状态
	    });
	  }
	  /**
	   *设置tip的内容和位置
	   */


	  setStep(step, stepsDatas) {
	    const {
	      tipElement,
	      targetElement
	    } = stepsDatas;
	    step.setTargetPosition(targetElement);
	    step.setTipContent(tipElement);
	    setTimeout(() => {
	      // 保证页面渲染结束再进行位置计算
	      step.setTipPosition(tipElement, targetElement);
	      step.positionOffset(tipElement);
	    }, 0);
	  }
	  /**
	   * 设置流程步骤
	   * @param {string} name 流程名称
	   * @param {number} number 第几步
	   */


	  setStepsNumber(name, number) {
	    const steps = this.activeSteps[name];
	    if (!steps) return;

	    if (TypeOf(number) === 'number') {
	      steps.stepNumber = number;
	    } else if (number === '++') {
	      steps.stepNumber++;
	    } else if (number === '--') {
	      steps.stepNumber--;
	    } // 判断number是否在范围内


	    const length = steps.steps.length;

	    if (steps.stepNumber >= 0 && steps.stepNumber < length) {
	      Trigger(name, steps.stepNumber);
	    } else {
	      this.setStepsState(name, false);
	    }
	  }
	  /**
	   * 移除流程dom
	   * @param {string} name 流程名称
	   */


	  remove(name) {
	    if (name) {
	      this._removeGuideTargetBox(name);

	      this._removeGuideTipBox(name);

	      setStyle(this.overlayer, {
	        display: 'none'
	      });
	    } else {
	      console.error('缺少steps name.');
	    }
	  }
	  /**
	   * 创建遮罩层：共用
	   */


	  _createOverlayer() {
	    if (this.overlayer) return;
	    this.overlayer = createOverlayer({
	      display: 'none'
	    });

	    if (!this.body) {
	      this.body = document.getElementsByTagName('body')[0];
	    }

	    this.body.appendChild(this.overlayer);
	  }
	  /**
	   * 移除遮罩层
	   */


	  _removeOverlayer() {
	    var _this$overlayer;

	    (_this$overlayer = this.overlayer) === null || _this$overlayer === void 0 ? void 0 : _this$overlayer.remove();
	    this.overlayer = null;
	  }
	  /**
	   * 创建引导step的target框
	   * @param {string} name 流程名称
	   */


	  _createGuideTargetBox(name) {
	    if (!name) {
	      console.error('缺少 step name');
	      return;
	    }

	    const box = createGuideTargetBox.call(this, {
	      display: 'none'
	    }, name);
	    this.activeSteps[name].targetElement = box;
	  }
	  /**
	   * 创建引导step的tip框
	   * @param {string} name 流程名称
	   */


	  _createGuideTipBox(name) {
	    if (!name) {
	      console.error('缺少 step name');
	      return;
	    }

	    const box = createGuideTipBox.call(this, name);
	    this.activeSteps[name].tipElement = box;
	  }
	  /**
	   * 移除step的target框
	   * @param {string} name 流程名称
	   */


	  _removeGuideTargetBox(name) {
	    var _this$activeSteps$nam3, _this$activeSteps$nam4;

	    if (!name) {
	      console.error('缺少 step name');
	      return;
	    }

	    (_this$activeSteps$nam3 = this.activeSteps[name]) === null || _this$activeSteps$nam3 === void 0 ? void 0 : (_this$activeSteps$nam4 = _this$activeSteps$nam3.targetElement) === null || _this$activeSteps$nam4 === void 0 ? void 0 : _this$activeSteps$nam4.remove();
	  }
	  /**
	   * 移除step的tip框
	   * @param {string} name 流程名称
	   */


	  _removeGuideTipBox(name) {
	    var _this$activeSteps$nam5, _this$activeSteps$nam6;

	    if (!name) {
	      console.error('缺少 step name');
	      return;
	    }

	    (_this$activeSteps$nam5 = this.activeSteps[name]) === null || _this$activeSteps$nam5 === void 0 ? void 0 : (_this$activeSteps$nam6 = _this$activeSteps$nam5.tipElement) === null || _this$activeSteps$nam6 === void 0 ? void 0 : _this$activeSteps$nam6.remove();
	  }
	  /**
	   * 委托button事件
	   */


	  bindEvent() {
	    this.body = document.getElementsByTagName('body')[0]; // 按钮点击事件

	    this.body.onclick = e => {
	      const target = e.target;

	      if (Array.prototype.includes.call(target.classList, 'guide-button')) {
	        // 进行按钮操作
	        const code = target.getAttribute('code');
	        const stepsName = target.getAttribute('steps');

	        switch (code) {
	          case 'prev':
	            this.Prev(stepsName);
	            break;

	          case 'skip':
	            this.Skip(stepsName);
	            break;

	          case 'done':
	            this.Done(stepsName);
	            break;

	          default:
	            this.Next(stepsName);
	            break;
	        }
	      }
	    }; //


	    const updataStep = () => {
	      Object.values(this.activeSteps).forEach(item => {
	        if (item.currentStep) {
	          const {
	            tipElement,
	            targetElement
	          } = item;
	          item.currentStep.setTargetPosition(targetElement);
	          item.currentStep.setTipPosition(tipElement, targetElement);
	        }
	      });
	    }; // 页面缩放事件


	    window.onresize = () => {
	      updataStep();
	    }; // scroll 监听


	    window.onscroll = () => {
	      updataStep();
	    };
	  } // 按钮事件处理方法


	  Next(name) {
	    if (!name) return;
	    this.setStepsNumber(name, '++');
	  }

	  Prev(name) {
	    if (!name) return;
	    this.setStepsNumber(name, '--');
	  }

	  Skip(name) {
	    if (!name) return;
	    this.setStepsState(name, false);
	  }

	  Done(name) {
	    if (!name) return;
	    this.setStepsNumber(name, '++');
	  }
	  /**
	   *按钮状态处理
	   */


	  buttonState(stepsDatas) {
	    const activeSteps = this.activeSteps;
	    Object.values(activeSteps).forEach(item => {
	      const {
	        tipElement
	      } = item;
	      const next = tipElement.querySelector('.guide-button.guide-next-button');
	      const prev = tipElement.querySelector('.guide-button.guide-prev-button');
	      const done = tipElement.querySelector('.guide-button.guide-done-button');
	      const {
	        stepNumber,
	        steps
	      } = stepsDatas;
	      const length = steps.length;

	      if (stepNumber > 0) {
	        prev === null || prev === void 0 ? void 0 : prev.classList.remove('hide');
	        prev === null || prev === void 0 ? void 0 : prev.classList.add('show');
	      } else {
	        prev === null || prev === void 0 ? void 0 : prev.classList.remove('show');
	        prev === null || prev === void 0 ? void 0 : prev.classList.add('hide');
	      }

	      if (done && stepNumber === length - 1) {
	        next === null || next === void 0 ? void 0 : next.classList.remove('show');
	        next === null || next === void 0 ? void 0 : next.classList.add('hide');
	        done === null || done === void 0 ? void 0 : done.classList.remove('hide');
	        done === null || done === void 0 ? void 0 : done.classList.add('show');
	      } else {
	        done === null || done === void 0 ? void 0 : done.classList.remove('show');
	        done === null || done === void 0 ? void 0 : done.classList.add('hide');
	        next === null || next === void 0 ? void 0 : next.classList.remove('hide');
	        next === null || next === void 0 ? void 0 : next.classList.add('show');
	      }
	    });
	  }

	}

	return Guide;

}));
