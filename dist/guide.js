/*!
 * guide v1.0.0
 * author: xuesh
 * Date: Fri, 03 Dec 2021 02:26:28 GMT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Guide = factory());
})(this, (function () { 'use strict';

	var version = "1.0.0";

	var options = {
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
	  var key = Array.prototype.shift.call(arg),
	      fns = list[key];
	  console.log(fns);

	  if (!fns || fns.length === 0) {
	    return false;
	  }

	  for (var i = 0, fn; fn = fns[i++];) {
	    fn.apply(undefined, arguments);
	  }
	};

	/**
	 * 判断数据格式
	 * @param data {object} - 待判断的数据.
	 * @return {boolean}
	 *
	 */
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
	  attr.class = 'guide-step-target';
	  const stepTarget = createElement('div', attr);
	  stepTarget.innerHTML = createGuideTipBox.call(this, name);
	  return stepTarget;
	};
	/**
	 * 创建引导tip dom
	 */

	const createGuideTipBox = function (name) {
	  return `
	<div class="guide-tooltip guide-tooltip-${name}" style="">
	    <div class="guide-joints">
	    </div>
	    <div class="guide-tooltip-main">
	        <div class="guide-container"></div>
	        <div class="guide-button-box">
	            <div class="guide-button guide-next-button ${this.nextclass}">${this.nextLabel}</div>
	            <div class="guide-button guide-prev-button ${this.prevclass}">${this.prevLabel}</div>
	            <div class="guide-button guide-skip-button ${this.skipclass}">${this.skipLabel}</div>
	            <div class="guide-button guide-done-button ${this.doneclass}">${this.doneLabel}</div>
	        </div>
	    </div>
	</div>
	`;
	};

	// 	addWindowResizeListener,
	// 	removeWindowResizeListener,
	// 	stepChange,
	// 	locationRemoveEventListener,
	// 	buttonAddEventListener,
	// 	buttonRemoveEventListener,
	// } from '../core/event'
	// import buttons from '../core/button'
	// import { Warning } from 'postcss'

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
	    this.setOptions(options);
	    this.setOptions(customOptions);
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

	    this.setStepsState(code, true); // 激活后 创建外层dom

	    this._createGuideStepBox(code);

	    this.body.appendChild(this.activeSteps[code].element); // this.goToStepNumber(0)
	    // buttonAddEventListener.apply(this)
	    // addWindowResizeListener.apply(this)

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
	      this.activeSteps[name] = {
	        stepNumber: -1,
	        steps: steps
	      };
	      Listen(name, () => {
	        console.log(111111, arguments);
	      }); // 开始流程

	      this.setStepsNumber(name, 0);
	    } else {
	      this._removeGuideStepBox(name);

	      delete this.activeSteps[name];
	      Listen(name);
	    }
	  }
	  /**
	   * 设置流程步骤
	   * @param {string} name 流程名称
	   * @param {number} number 第几步
	   */


	  setStepsNumber(name, number) {
	    const steps = this.activeSteps[name];
	    if (!steps) return;
	    steps.stepNumber = number || -1;
	    Trigger(name, number);
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

	}

	return Guide;

}));
