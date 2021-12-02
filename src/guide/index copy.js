import options from '../options/global'
import Step from '../step/index'
import { TypeOf } from '../tools/tools'
import { createOverlayer, createGuideStepBox } from '../core/createElement'
import {
	addWindowResizeListener,
	removeWindowResizeListener,
	stepChange,
	locationRemoveEventListener,
	buttonAddEventListener,
	buttonRemoveEventListener,
} from '../core/event'

import buttons from '../core/button'
/**
 * Guide类，代表一个引导流程.
 * @constructor
 * @param customOptions {json} 自定义设置
 */
export default class Guide {
	constructor(customOptions) {
		// global options
		this.allSteps = null // 所有页面的流程集合
		this.activeSteps = {} // 当前激活状态的流程
		this.overlayer = null

		// this.steps = [] // 当前页面的步骤集合
		// this.currentStep = null
		// this.currentStepNumber = -1
		// this.toolTip = null
		// this.helperLayer = null
		// this.container = null
		// this.button = JSON.parse(JSON.stringify(buttons))
		this.setOptions(options)
		this.setOptions(customOptions)
	}
	get currentStep() {
		return this._currentStep
	}
	set currentStep(val) {
		if (this.currentStep !== val) {
			this._currentStep = val
			if (!this._currentStep) return
			this.currentStep?.create()
			this._getButtonDom()

			stepChange.apply(this)
		}
	}

	/**
	 * 单个设置option
	 * @param {string} key - option key.
	 * @param {object} value - option value.
	 */
	setOption(key, value) {
		if (!key) return
		this[key] = value
		return this
	}
	/**
	 * 批量设置option
	 * @param {json} options - options 集合{key, value}.
	 */
	setOptions(options) {
		if (!options) return
		Object.keys(options).forEach((key) => {
			this.setOption(key, options[key])
		})
		return this
	}
	addstep(stepOptions) {
		if (!this.steps) {
			this.steps = []
		}
		this.steps.push(new Step(stepOptions, this))
		return this
	}
	addsteps(stepDatas) {
		if (TypeOf(stepDatas) === 'array') {
			stepDatas.forEach((step) => {
				this.addstep(step)
			})
		} else {
			console.error('stepDatas 格式错误')
		}
		return this
	}
	setSteps(stepDatas) {
		this.steps = null
		this.addsteps(stepDatas)
		return this
	}
	addAllSteps(allSteps) {
		if (TypeOf(allSteps) !== 'object') return
		this.allSteps = allSteps
		// locationAddEventListener.apply(this) // 路由监听
		return this
	}
	goToStep(step) {
		if (this.currentStep !== step) {
			this.currentStep = step
			if (this.steps.indexOf(step) > -1) {
				this.goToStepNumber(this.steps.indexOf(step))
			} else {
				this.exit()
			}
		}
		return this
	}
	goToStepNumber(number) {
		if (this.currentStepNumber !== number) {
			if (number >= this.steps.length) {
				this.exit()
			} else {
				this.currentStepNumber = number
				this.goToStep(this.steps[number])
			}
		}
		return this
	}
	nextstep() {
		const number = this.currentStepNumber
		if (number < this.steps.length) {
			this.goToStepNumber(number + 1)
		}
	}
	prevstep() {
		const number = this.currentStepNumber
		if (number > 0) {
			this.goToStepNumber(number - 1)
		}
	}
	skipstep() {}
	donestep() {
		this.exit()
	}
	getcurrentstep() {}
	/**
	 *开启引导流程
     @param {string} code 引导name
	 */
	start(code) {
		if (code) {
			const steps = this.allSteps[code]
			steps && this.setSteps(steps)
		}
		if (!this.steps || this.steps?.length === 0) return
		this._createOverlayer()
		this._createGuideStepBox()
		this.goToStepNumber(0)
		buttonAddEventListener.apply(this)
		addWindowResizeListener.apply(this)
		return this
	}
	exit() {
		buttonRemoveEventListener.apply(this)
		this._removeOverlayer()
		locationRemoveEventListener()
		removeWindowResizeListener.apply(this)
		this.currentStep?.destory()
		this.goToStepNumber(-1)
		this._clearButtonDom()
		this.steps = null
		return this
	}
	_createOverlayer() {
		// 遮罩层
		if (this.overlayer) return
		this.overlayer = createOverlayer({
			opacity: this.overlayOpacity,
			display: 'none',
		})
		if (!this.body) {
			this.body = document.getElementsByTagName('body')[0]
		}
		console.log(1234567890, this.overlayer)
		this.body.appendChild(this.overlayer)
	}
	_removeOverlayer() {
		this.overlayer?.remove()
		this.overlayer = null
	}
	_createGuideStepBox() {
		if (this.guideStepBox) return
		this.guideStepBox = createGuideStepBox({
			display: 'none',
		})
		if (!this.body) {
			this.body = document.getElementsByTagName('body')[0]
		}
		this.body.appendChild(this.guideStepBox)
	}
	_removeGuideStepBox() {
		this.guideStepBox?.remove()
		this.guideStepBox = null
	}
	// 分割线 ---------------------------
	_getButtonDom() {
		Object.keys(this.button).forEach((key) => {
			if (TypeOf(this.button[key]) === 'string') {
				this.button[key] = document.querySelector(this.button[key])
			}
		})
	}
	_clearButtonDom() {
		this.button = JSON.parse(JSON.stringify(buttons))
	}
}
