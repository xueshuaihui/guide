/*!
 * guide v1.0.0
 * author: xuesh
 * Date: Thu, 04 Nov 2021 02:19:36 GMT
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
	  autoPosition: false,
	  // 是否禁止引导dom交互
	  disableInteraction: false,
	  // 开启动画
	  animation: false,
	  // 触发键盘“esc”时，是否退出引导流程
	  exitOnEsc: false,
	  // 宽高
	  width: 200,
	  height: 200
	};

	var options = {
	  nextLabel: '下一步',
	  nextclass: '',
	  prevLabel: '上一步',
	  prevclass: '',
	  skipLabel: '跳过',
	  skipclass: '',
	  doneLabel: '完成',
	  doneclass: '',
	  content: '',
	  confirmtipPosition: 'bottom',
	  confirmtipClass: '',
	  width: '',
	  height: '',
	  offsetTop: '20',
	  offsetLeft: '0',
	  joints: 'top' // top top-left top-right bottom bottom-left bottom-right left left-top left-bototm right right-top

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
	      cssText += `${rule}:${style[rule]};`;
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

	const toolTip = `
    <div class="guide-image">
        <img src="{{image}}" alt="" />
    </div>
    <div class="guide-message">
        <h3>{{title}}</h3>
        <p>{{text}}</p>
    </div>
`;

	const createOverlayer = style => {
	  let attr = {
	    style: style
	  };
	  attr.class = 'guide-overlayer';
	  const element = createElement('div', attr);
	  return element;
	};
	const createHelperLayer = function (style) {
	  let attr = {
	    style: style
	  };
	  attr.class = 'guide-helperLayer';
	  const helperLayer = createElement('div', attr);
	  helperLayer.innerHTML = `
    <div class="guide-tooltip  ${this.joints}" style="">
        <div class="guide-joints">
        </div>
        <div class="guide-tooltip-main">
            <div class="guide-container"></div>
            <div class="guide-button-box">
                <div class="guide-button guide-next-button ${this.guide.nextclass}">${this.guide.nextLabel}</div>
                <div class="guide-button guide-prev-button ${this.guide.prevclass}">${this.guide.prevLabel}</div>
                <div class="guide-button guide-skip-button ${this.guide.skipclass}">${this.guide.skipLabel}</div>
                <div class="guide-button guide-done-button ${this.guide.doneclass}">${this.guide.doneLabel}</div>
            </div>
        </div>
    </div>
    `;
	  return helperLayer;
	};
	const setGuideContainer = function () {
	  let htmlString;
	  const type = TypeOf(this.content);

	  if (type === 'string') {
	    htmlString = this.content;
	  } else if (type === 'object') {
	    htmlString = toolTip.replace(/{{[\w\W][^{{][^}}]*}}/g, code => {
	      const key = code.slice(2, -2);
	      return this.content[key] || '';
	    });
	  }

	  const container = this.guide.toolTip.querySelector('.guide-container');
	  container.innerHTML = htmlString;
	};

	/**
	 * Step类，代表一个步骤.
	 * @constructor
	 * @param customOptions {json} 自定义设置
	 */

	class Step {
	  constructor(customOptions, guide) {
	    this.el = null;
	    this.target = null;
	    this.guide = guide;
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

	  create() {
	    const el = this.el;
	    this.target = document.querySelector(el);

	    if (!this.target) {
	      console.error(`未找到${this.el}元素`);
	      return;
	    }

	    this._createHelperLayer();
	  }

	  destory() {
	    this._removeToolTip();

	    this._removeHelperLayer();
	  }

	  _createHelperLayer() {
	    this.body = document.getElementsByTagName('body')[0]; // 辅助层

	    const {
	      width,
	      height,
	      top,
	      left
	    } = this.target.getBoundingClientRect();
	    const helperLayerStryle = {
	      width: width + 'px',
	      height: height + 'px',
	      top: top + 'px',
	      left: left + 'px'
	    };

	    if (!this.guide.helperLayer) {
	      this.guide.helperLayer = createHelperLayer.apply(this, [helperLayerStryle]);
	      this.body.appendChild(this.guide.helperLayer);
	      this.guide.toolTip = this.guide.helperLayer.querySelector('.guide-tooltip');
	    } else {
	      // 设置HelperLayer 样式
	      setStyle(this.guide.helperLayer, helperLayerStryle);
	    } // 设置tooltip大小


	    setStyle(this.guide.toolTip.querySelector('.guide-tooltip-main'), {
	      width: `${this.width}px`,
	      height: `${this.height}px`
	    }); // 更新文本

	    setGuideContainer.apply(this);
	  }

	  _removeHelperLayer() {
	    if (this.guide.helperLayer) {
	      this.guide.helperLayer.remove();
	      this.guide.helperLayer = null;
	      this.guide.toolTip = null;
	    }
	  }

	}

	const _next = function () {
	  this.nextstep();
	};

	const _prev = function () {
	  this.prevstep();
	};

	const _skip = function () {
	  this.skipstep();
	};

	const _done = function () {
	  this.donestep();
	};
	/**
	 * 按钮绑定点击事件
	 */


	const buttonAddEventListener = function () {
	  if (!this.currentStep) return;
	  buttonRemoveEventListener.apply(this);
	  this.button.next?.addEventListener('click', _next.bind(this));
	  this.button.prev?.addEventListener('click', _prev.bind(this));
	  this.button.skip?.addEventListener('click', _skip.bind(this));
	  this.button.done?.addEventListener('click', _done.bind(this));
	};
	/**
	 * 按钮解除点击事件
	 */

	const buttonRemoveEventListener = function () {
	  if (!this.currentStep) return;
	  this.button.next?.removeEventListener('click', _next.bind(this), true);
	  this.button.prev?.removeEventListener('click', _prev.bind(this));
	  this.button.skip?.removeEventListener('click', _skip.bind(this));
	  this.button.done?.removeEventListener('click', _done.bind(this));
	};
	/**
	 * 屏幕resize 事件
	 */

	const _resizeCB = function () {
	  this.currentStep?.create();
	};

	const addWindowResizeListener = function () {
	  window.addEventListener('resize', _resizeCB.bind(this));
	};
	const removeWindowResizeListener = function () {
	  window.removeEventListener('resize', _resizeCB.bind(this));
	};

	const _classNameInit = function () {
	  Object.values(this).forEach(item => {
	    item && item.classList.remove('hide', 'show');
	  });
	};
	/**
	 * shep 发生改变时触发
	 */


	const stepChange = function () {
	  if (!this.currentStep) return;

	  _classNameInit.apply(this.button);

	  const steps = this.steps;
	  const index = this.currentStepNumber;
	  const length = steps.length;
	  const {
	    next,
	    prev,
	    skip,
	    done
	  } = this.button;

	  if (index === 0) {
	    // 起始
	    next?.classList.add('show');
	    prev?.classList.add('hide');
	    skip?.classList.add('hide');
	    done?.classList.add('hide');
	  } else if (index === length - 1) {
	    // done
	    next?.classList.add('hide');
	    prev?.classList.add('show');
	    skip?.classList.add('hide');
	    done?.classList.add('show');
	  } else {
	    next?.classList.add('show');
	    prev?.classList.add('show');
	    skip?.classList.add('hide');
	    done?.classList.add('hide');
	  }
	};

	const resolvePath = location => {
	  let path;
	  const {
	    hash,
	    pathname
	  } = window.location;

	  if (hash) {
	    const lastIndex = hash.indexOf('?');
	    lastIndex > 0 ? path = hash.slice(1, lastIndex) : path = hash.slice(1);
	  } else if (pathname) {
	    const lastIndex = hash.indexOf('?');
	    lastIndex > 0 ? path = pathname.slice(0, lastIndex) : path = pathname.slice(0);
	  } else {
	    path = '';
	  }

	  return path;
	};

	const _locationEventCB = function (...argus) {
	  // const arguments = argus[0].arguments
	  // const path = argus[0].arguments[2]
	  const path = resolvePath();
	  const steps = this.allSteps ? this.allSteps[path] : null;
	  setTimeout(() => {
	    this.setSteps(steps).start();
	  }, 200);
	};
	/**
	 * 监听前端路由发生改变
	 * @param {function} callback 路由发生改变时的回调
	 */


	const locationAddEventListener = function () {
	  locationRemoveEventListener();

	  const _historyWrap = function (type) {
	    const orig = history[type];
	    const e = new Event(type);
	    return function () {
	      const rv = orig.apply(this, arguments);
	      e.arguments = arguments;
	      window.dispatchEvent(e);
	      return rv;
	    };
	  };

	  history.pushState = _historyWrap('pushState');
	  history.replaceState = _historyWrap('replaceState');
	  window.addEventListener('hashchange', _locationEventCB.bind(this));
	  window.addEventListener('popstate', _locationEventCB.bind(this));
	  window.addEventListener('pushState', _locationEventCB.bind(this));
	  window.addEventListener('replaceState', _locationEventCB.bind(this));

	  _locationEventCB.apply(this);
	};
	/**
	 * 移除路由监听事件
	 * @param {function} callback 路由发生改变时的回调
	 */

	const locationRemoveEventListener = function () {
	  window.removeEventListener('hashchange', _locationEventCB.bind(this));
	  window.removeEventListener('popstate', _locationEventCB.bind(this));
	  window.removeEventListener('pushState', _locationEventCB.bind(this));
	  window.removeEventListener('replaceState', _locationEventCB.bind(this));
	};

	var buttons = {
	  next: '.guide-next-button',
	  prev: '.guide-prev-button',
	  skip: '.guide-skip-button',
	  done: '.guide-done-button'
	};

	/**
	 * Guide类，代表一个引导流程.
	 * @constructor
	 * @param customOptions {json} 自定义设置
	 */

	class Guide {
	  constructor(customOptions) {
	    // global options
	    this.allSteps = null; // 所有页面的步骤集合

	    this.steps = []; // 当前页面的步骤集合

	    this.currentStep = null;
	    this.currentStepNumber = -1;
	    this.overlayer = null;
	    this.toolTip = null;
	    this.helperLayer = null;
	    this.container = null;
	    this.button = JSON.parse(JSON.stringify(buttons));
	    this.setOptions(options$1);
	    this.setOptions(customOptions);
	  }

	  get currentStep() {
	    return this._currentStep;
	  }

	  set currentStep(val) {
	    if (this.currentStep !== val) {
	      this._currentStep = val;
	      if (!this._currentStep) return;
	      this.currentStep?.create();

	      this._getButtonDom();

	      this._createOverlayer();

	      stepChange.apply(this);
	    }
	  }
	  /**
	   * 单个设置option
	   * @param {string} key - option key.
	   * @param {object} value - option value.
	   */


	  setOption(key, value) {
	    if (!key || !value) return;
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

	  addstep(stepOptions) {
	    if (!this.steps) {
	      this.steps = [];
	    }

	    this.steps.push(new Step(stepOptions, this));
	    return this;
	  }

	  addsteps(stepDatas) {
	    if (TypeOf(stepDatas) === 'array') {
	      stepDatas.forEach(step => {
	        this.addstep(step);
	      });
	    } else {
	      console.error('stepDatas 格式错误');
	    }

	    return this;
	  }

	  setSteps(stepDatas) {
	    this.steps = null;
	    this.addsteps(stepDatas);
	    return this;
	  }

	  addAllSteps(allSteps) {
	    if (TypeOf(allSteps) !== 'object') return;
	    this.allSteps = allSteps;
	    locationAddEventListener.apply(this);
	    return this;
	  }

	  goToStep(step) {
	    if (this.currentStep !== step) {
	      this.currentStep = step;

	      if (this.steps.indexOf(step) > -1) {
	        this.goToStepNumber(this.steps.indexOf(step));
	      }
	    }

	    return this;
	  }

	  goToStepNumber(number) {
	    if (this.currentStepNumber !== number) {
	      this.currentStepNumber = number;
	      this.goToStep(this.steps[number]);
	    }

	    return this;
	  }

	  nextstep() {
	    const number = this.currentStepNumber;

	    if (number < this.steps.length) {
	      this.goToStepNumber(number + 1);
	    }
	  }

	  prevstep() {
	    const number = this.currentStepNumber;

	    if (number > 0) {
	      this.goToStepNumber(number - 1);
	    }
	  }

	  skipstep() {}

	  donestep() {
	    this.exit();
	  }

	  getcurrentstep() {}

	  start() {
	    if (!this.steps || this.steps?.length === 0) return;
	    this.goToStepNumber(0);
	    buttonAddEventListener.apply(this);
	    addWindowResizeListener.apply(this);
	    return this;
	  }

	  exit() {
	    buttonRemoveEventListener.apply(this);

	    this._removeOverlayer();

	    locationRemoveEventListener();
	    removeWindowResizeListener.apply(this);
	    this.currentStep?.destory();
	    this.goToStepNumber(-1);

	    this._clearButtonDom();

	    this.steps = null;
	    console.log(this);
	    return this;
	  }

	  _createOverlayer() {
	    // 遮罩层
	    if (this.overlayer) return;
	    this.overlayer = createOverlayer({
	      opacity: this.overlayOpacity
	    });
	    this.body = document.getElementsByTagName('body')[0];
	    this.body.appendChild(this.overlayer);
	  }

	  _removeOverlayer() {
	    this.overlayer?.remove();
	    this.overlayer = null;
	  }

	  _getButtonDom() {
	    Object.keys(this.button).forEach(key => {
	      if (TypeOf(this.button[key]) === 'string') {
	        this.button[key] = document.querySelector(this.button[key]);
	      }
	    });
	  }

	  _clearButtonDom() {
	    this.button = JSON.parse(JSON.stringify(buttons));
	  }

	}

	Guide.prototype.version = version; // window.Guide = Guide

	return Guide;

}));
