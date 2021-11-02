/*!
 * guide v1.0.0
 * author: xuesh
 * Date: Tue, 02 Nov 2021 04:01:13 GMT
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
	  exitOnEsc: false
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
	  confirmtipPosition: 'bottom',
	  confirmtipClass: '',
	  width: '',
	  height: '',
	  offsetTop: '20',
	  offsetLeft: '0'
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

	const _next = () => {
	  guide.nextstep();
	};

	const _prev = () => {
	  guide.prevstep();
	};

	const _skip = () => {
	  guide.skipstep();
	};

	const _done = () => {
	  guide.donestep();
	};

	let next = null;
	let prev = null;
	let skip = null;
	let done = null;

	const getdom = () => {
	  next = next ? next : document.querySelector('.guide-next-button');
	  prev = prev ? prev : document.querySelector('.guide-prev-button');
	  skip = skip ? skip : document.querySelector('.guide-skip-button');
	  done = done ? done : document.querySelector('.guide-done-button');
	};
	/**
	 * 按钮绑定点击事件
	 * @param {Object} step  当前步骤step 对象
	 */


	const buttonAddEventListener = step => {
	  if (!step || !step.guide) return;
	  step.guide;
	  getdom();
	  next.addEventListener('click', _next);
	  prev.addEventListener('click', _prev);
	  skip.addEventListener('click', _skip);
	  done.addEventListener('click', _done);
	};
	/**
	 * 按钮解除点击事件
	 * @param {Object} step  当前步骤step 对象
	 */

	const buttonRemoveEventListener = step => {
	  if (!step || !step.guide) return;
	  step.guide;
	  getdom();
	  next.removeEventListener('click', _next);
	  prev.removeEventListener('click', _prev);
	  skip.removeEventListener('click', _skip);
	  done.removeEventListener('click', _done);
	};
	/**
	 * 屏幕resize 事件
	 * @param {Object} step  当前步骤step 对象
	 */

	const windowResize = step => {
	  window.onresize = () => {
	    step.create();
	  };
	};

	const _classNameInit = () => {
	  const dom = [next, prev, skip, done];
	  dom.forEach(item => {
	    item && item.classList.remove('hide', 'show');
	  });
	};
	/**
	 * shep 发生改变时触发
	 * @param {Object} guide  guide对象
	 */


	const stepChange = guide => {
	  _classNameInit();

	  const steps = guide.steps;
	  const index = guide.currentStepNumber;
	  const length = steps.length;

	  if (index === 0) {
	    // 起始
	    next.classList.add('show');
	    prev.classList.add('hide');
	    skip.classList.add('hide');
	    done.classList.add('hide');
	  } else if (index === length - 1) {
	    // done
	    next.classList.add('hide');
	    prev.classList.add('show');
	    skip.classList.add('hide');
	    done.classList.add('show');
	  } else {
	    next.classList.add('show');
	    prev.classList.add('show');
	    skip.classList.add('hide');
	    done.classList.add('hide');
	  }
	};

	const _locationEventCB = (...argus) => {
	  console.log(argus);
	};
	/**
	 * 监听前端路由发生改变
	 * @param {function} callback 路由发生改变时的回调
	 */


	const locationAddEventListener = callback => {
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
	  window.addEventListener('hashchange', _locationEventCB);
	  window.addEventListener('popstate', _locationEventCB);
	  window.addEventListener('pushState', _locationEventCB);
	  window.addEventListener('replaceState', _locationEventCB);
	};
	/**
	 * 移除路由监听事件
	 * @param {function} callback 路由发生改变时的回调
	 */

	const locationRemoveEventListener = () => {
	  console.log('移除事件');
	  window.removeEventListener('hashchange', _locationEventCB);
	  window.removeEventListener('popstate', _locationEventCB);
	  window.removeEventListener('pushState', _locationEventCB);
	  window.removeEventListener('replaceState', _locationEventCB);
	};

	const createOverlayer = style => {
	  let attr = {
	    style: style
	  };
	  attr.class = 'guide-overlayer';
	  const element = createElement('div', attr);
	  return element;
	};
	const createHelperLayer = style => {
	  let attr = {
	    style: style
	  };
	  attr.class = 'guide-helperLayer';
	  return createElement('div', attr);
	};
	const createTooltip = style => {
	  let attr = {
	    style: style
	  };
	  attr.class = 'guide-tooltip';
	  const dom = createElement('div', attr);
	  dom.innerHTML = `
    <div class="guide-container">
    <div class="guide-image">
        <img src="" alt="" />
    </div>
    <div class="guide-message">
        <h4>创建批注</h4>
        <p>在设计图上 单击 或 拖拽 绘制 快捷键</p>
    </div>
</div>
<div class="guide-button-box">
    <div class="guide-button guide-next-button">继续探索</div>
    <div class="guide-button guide-prev-button">上一步</div>
    <div class="guide-button guide-skip-button">跳过</div>
    <div class="guide-button guide-done-button">知道啦</div>
</div>
     `;
	  return dom;
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
	    this.content = null;
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

	    this._createHelperLayer();

	    this._createToolTip();

	    buttonAddEventListener(this);
	  }

	  destory() {
	    buttonRemoveEventListener(this);

	    this._removeToolTip();

	    this._removeHelperLayer();
	  }

	  _getDomStyle(type) {
	    this.body = document.getElementsByTagName("body")[0]; // 辅助层

	    const currentStep = this.guide.currentStep;
	    const {
	      width,
	      height,
	      top,
	      left
	    } = currentStep.target.getBoundingClientRect();
	    const offsetTop = Number(currentStep.offsetTop);
	    const offsetLeft = Number(currentStep.offsetLeft);
	    const helperLayerStryle = {
	      width: width + "px",
	      height: height + "px",
	      top: top + "px",
	      left: left + "px"
	    };
	    const toolTipStyle = {
	      width: currentStep.width + "px",
	      height: currentStep.height + "px",
	      top: height + top + offsetTop + "px",
	      left: left + offsetLeft + "px"
	    };

	    switch (type) {
	      case "helperLayerStryle":
	        return helperLayerStryle;

	      case "toolTipStyle":
	        return toolTipStyle;
	    }
	  }

	  _createHelperLayer() {
	    const helperLayerStryle = this._getDomStyle("helperLayerStryle");

	    if (!this.guide.helperLayer) {
	      this.guide.helperLayer = createHelperLayer(helperLayerStryle);
	      this.body.appendChild(this.guide.helperLayer);
	    } else {
	      setStyle(this.guide.helperLayer, helperLayerStryle);
	    }
	  }

	  _removeHelperLayer() {
	    this.guide.helperLayer.remove();
	  }

	  _createToolTip() {
	    const toolTipStyle = this._getDomStyle("toolTipStyle");

	    if (!this.guide.toolTip) {
	      this.guide.toolTip = createTooltip(toolTipStyle);
	      this.body.appendChild(this.guide.toolTip);
	    } else {
	      setStyle(this.guide.toolTip, toolTipStyle);
	    }
	  }

	  _removeToolTip() {
	    this.guide.toolTip.remove();
	  }

	}

	/**
	 * Guide类，代表一个引导流程.
	 * @constructor
	 * @param customOptions {json} 自定义设置
	 */

	class Guide {
	  constructor(customOptions) {
	    // global options
	    this.allSteps = {}; // 所有页面的步骤集合

	    this.steps = []; // 当前页面的步骤集合

	    this.currentStep = null;
	    this.currentStepNumber = -1;
	    this.overlayer = null;
	    this.toolTip = null;
	    this.helperLayer = null;
	    this.setOptions(options$1);
	    this.setOptions(customOptions);
	  }

	  get currentStep() {
	    return this._currentStep;
	  }

	  set currentStep(val) {
	    if (val && this.currentStep !== val) {
	      this._currentStep = val;
	      this.currentStep.create();

	      this._createOverlayer();

	      stepChange(this);
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

	  addAllSteps() {
	    locationAddEventListener();
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
	    this.goToStepNumber(0);
	    windowResize(this.currentStep);
	    return this;
	  }

	  exit() {
	    this._removeOverlayer();

	    this.currentStep?.destory();
	    locationRemoveEventListener();
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
	  }

	}

	Guide.prototype.version = version; // window.Guide = Guide

	return Guide;

}));
