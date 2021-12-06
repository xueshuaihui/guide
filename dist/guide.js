/*!
 * guide v1.0.0
 * author: xuesh
 * Date: Mon, 06 Dec 2021 12:00:22 GMT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Guide = factory());
})(this, (function () { 'use strict';

	var version = "1.0.0";

	var options$1 = {
	  // 下一步按钮参数
	  nextLabel: '下一步',
	  nextclass: '',
	  // 上一步按钮参数
	  prevLabel: '上一步',
	  prevclass: '',
	  // 跳过按钮参数
	  skipLabel: '跳过',
	  skipclass: '',
	  // 结束按钮参数
	  doneLabel: '完成',
	  doneclass: '',
	  // 提示框弹出位置
	  confirmtipPosition: 'bottom',
	  // 提示框弹出自定义class
	  confirmtipClass: '',
	  // 是否打开遮罩层
	  // openoverlayer: 'true',
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
	  height: 200
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
	const unitAttr = ['width', 'height', 'left', 'right', 'top', 'bottom']; // 设置样式时， 需要将数字转换为 number+px 的属性

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
	 * 创建引导step的dom 外框
	 * @param {json} style 基础参数
	 * @return {object}  外框对象
	 */

	const createGuideStepBox = function (style, name) {
	  let attr = {
	    style: style
	  };
	  attr.class = 'guide-step-target guide-overlayer-bgcolor';
	  const stepTarget = createElement('div', attr);
	  stepTarget.innerHTML = createGuideTipBox.call(this, name);
	  return stepTarget;
	};
	/**
	 * 创建引导tip dom
	 */

	const createGuideTipBox = function (name) {
	  console.log(name);
	  return `
	<div class="guide-tooltip guide-tooltip-${name}" style="">
	    <div class="guide-joints">
	    </div>
	    <div class="guide-tooltip-main">
	        <div class="guide-container"></div>
	        <div class="guide-button-box">
	            <div class="guide-button guide-next-button ${this.nextclass}" code="next" steps="${name}">${this.nextLabel}</div>
	            <div class="guide-button guide-prev-button ${this.prevclass}" code="prev" steps="${name}">${this.prevLabel}</div>
	            <div class="guide-button guide-skip-button ${this.skipclass}" code="skip" steps="${name}">${this.skipLabel}</div>
	            <div class="guide-button guide-done-button ${this.doneclass}" code="done" steps="${name}">${this.doneLabel}</div>
	        </div>
	    </div>
	</div>
	`;
	};

	var options = {
	  // nextLabel: '下一步',
	  // nextclass: '',
	  // prevLabel: '上一步',
	  // prevclass: '',
	  // skipLabel: '跳过',
	  // skipclass: '',
	  // doneLabel: '完成',
	  // doneclass: '',
	  content: '',
	  width: '',
	  height: '',
	  // offsetTop: '20',
	  // offsetLeft: '0',
	  followType: 'follow',
	  // follow     full
	  joints: 'top',
	  // top top-left top-right bottom bottom-left bottom-right left left-top left-bototm right right-top
	  tipClass: ''
	};

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
	  , __lines = "<style>.guide-tip-template {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  font-family: PingFang SC;\n  color: rgba(47, 46, 63, 0.85); }\n  .guide-tip-template .guide-message {\n    flex: 1; }\n    .guide-tip-template .guide-message h3 {\n      font-weight: 500;\n      font-size: 16px;\n      line-height: 24px;\n      letter-spacing: 1px;\n      color: #2f2e3f; }\n    .guide-tip-template .guide-message p {\n      font-size: 13px;\n      line-height: 22px;\n      letter-spacing: 1px;\n      color: rgba(47, 46, 63, 0.85); }\n</style>\n<div class=\"guide-tip-template\">\n    <% if (locals.image) { %>\n        <div class=\"guide-image guide-image-template1\">\n            <img src=\"<%= locals.image %>\" alt=\"\" />\n        </div>\n        <% } %>\n\n            <div class=\"guide-message guide-message-template1\">\n                <h3>\n                    <%= locals.title %>\n                </h3>\n                <p>\n                    <%= locals.text %>\n                </p>\n            </div>\n</div>"
	  , __filename = undefined;
	try {
	  var __output = "";
	  function __append(s) { if (s !== undefined && s !== null) __output += s; }
	    ; __append("<style>.guide-tip-template {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  font-family: PingFang SC;\n  color: rgba(47, 46, 63, 0.85); }\n  .guide-tip-template .guide-message {\n    flex: 1; }\n    .guide-tip-template .guide-message h3 {\n      font-weight: 500;\n      font-size: 16px;\n      line-height: 24px;\n      letter-spacing: 1px;\n      color: #2f2e3f; }\n    .guide-tip-template .guide-message p {\n      font-size: 13px;\n      line-height: 22px;\n      letter-spacing: 1px;\n      color: rgba(47, 46, 63, 0.85); }\n</style>\n<div class=\"guide-tip-template\">\n    ")
	    ; __line = 22
	    ;  if (locals.image) { 
	    ; __append("\n        <div class=\"guide-image guide-image-template1\">\n            <img src=\"")
	    ; __line = 24
	    ; __append(escapeFn( locals.image ))
	    ; __append("\" alt=\"\" />\n        </div>\n        ")
	    ; __line = 26
	    ;  } 
	    ; __append("\n\n            <div class=\"guide-message guide-message-template1\">\n                <h3>\n                    ")
	    ; __line = 30
	    ; __append(escapeFn( locals.title ))
	    ; __append("\n                </h3>\n                <p>\n                    ")
	    ; __line = 33
	    ; __append(escapeFn( locals.text ))
	    ; __append("\n                </p>\n            </div>\n</div>")
	    ; __line = 36;
	  return __output;
	} catch (e) {
	  rethrow(e, __lines, __filename, __line, escapeFn);
	}

	}

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
	    if (!key || !value) return;
	    this[key] = value;
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
	  }
	  /**
	   * 设置step容器
	   * @param {hTMLDivElement} container dom 对象
	   */


	  setContainer(container) {
	    if (TypeOf(container) === 'hTMLDivElement') {
	      this.container = container.querySelector('.guide-container');
	      this.loadTip();
	    }
	  }
	  /**
	   * 加载tip
	   */


	  loadTip() {
	    this.container.innerHTML = anonymous(this.content); // 加载引导tip
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
	    if (!this.steps || this.steps?.length === 0) return;

	    this._createOverlayer();

	    this.setStepsState(code, true);
	    return this;
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

	      this._createGuideStepBox(name);

	      this.body.appendChild(this.activeSteps[name].element);

	      this._switchStepsNumber(name); // 开始流程


	      this.setStepsNumber(name, 0);
	    } else {
	      this._removeGuideStepBox(name);

	      delete this.activeSteps[name];
	    }
	  }
	  /**
	   * 切换流程步骤的监听
	   */


	  _switchStepsNumber(name) {
	    Listen(name, arg => {
	      const name = Array.prototype.shift.call(arg);
	      const {
	        element,
	        stepNumber,
	        steps
	      } = this.activeSteps[name];
	      const step = new Step(steps[stepNumber]);
	      step.setContainer(element);
	      element.style.display = 'block';
	    });
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
	    } // 判断number是否在范围内


	    const length = steps.steps.length;

	    if (steps.stepNumber >= 0 && steps.stepNumber < length) {
	      Trigger(name, steps.stepNumber);
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
	    this.overlayer?.remove();
	    this.overlayer = null;
	  }
	  /**
	   * 创建steps外层dom
	   */


	  _createGuideStepBox(name) {
	    if (!name) {
	      console.error('缺少 step name');
	      return;
	    }

	    const box = createGuideStepBox.call(this, {
	      display: 'none'
	    }, name);
	    this.activeSteps[name].element = box;
	  }
	  /**
	   * 移除steps外层dom
	   */


	  _removeGuideStepBox(name) {
	    if (!name) {
	      console.error('缺少 step name');
	      return;
	    }

	    this.activeSteps[name]?.element?.remove();
	  }
	  /**
	   * 委托button事件
	   */


	  bindEvent() {
	    this.body = document.getElementsByTagName('body')[0];

	    this.body.onclick = e => {
	      const target = e.target;

	      if (Array.prototype.includes.call(target.classList, 'guide-button')) {
	        // 进行按钮操作
	        const code = target.getAttribute('code');
	        const stepsName = target.getAttribute('steps');
	        console.log(code, stepsName);

	        switch (code) {
	          case 'next':
	            this.Next(stepsName);
	            break;

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
	    };
	  } //


	  Next(name) {
	    if (!name) return;
	    this.activeSteps[name];
	    this.setStepsNumber(name, '++');
	  }

	  Prev(name) {
	    if (!name) return;
	    this.setStepsNumber(name, '--');
	  }

	  Skip(name) {
	    if (!name) return;
	  }

	  Done(name) {
	    if (!name) return;
	    this.setStepsNumber(name, '++');
	  }

	}

	return Guide;

}));
