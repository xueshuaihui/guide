import options from '../options/global'
import Step from '../step/index'
import { TypeOf } from '../tools/tools'
import { createOverlayer } from '../core/createElement'
import { windowResize, stepChange } from '../core/event'
/**
 * Guide类，代表一个引导流程.
 * @constructor
 * @param customOptions {json} 自定义设置
 */
export default class Guide {
	constructor(customOptions) {
		// global options
		this.steps = []
		this.currentStep = null
		this.currentStepNumber = -1
		this.setOptions(options)
		this.setOptions(customOptions)
	}
	get currentStep() {
		return this._currentStep
	}
	set currentStep(val) {
		if (val && this.currentStep !== val) {
			this._currentStep = val
			this.currentStep.create()
			this.createDom()
			stepChange(this)
		}
	}

	/**
	 * 单个设置option
	 * @param {string} key - option key.
	 * @param {object} value - option value.
	 */
	setOption(key, value) {
		if (!key || !value) return
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
	goToStep(step) {
		if (this.currentStep !== step) {
			this.currentStep = step
			if (this.steps.indexOf(step) > -1) {
				this.goToStepNumber(this.steps.indexOf(step))
			}
		}
		return this
	}
	goToStepNumber(number) {
		if (this.currentStepNumber !== number) {
			this.currentStepNumber = number
			this.goToStep(this.steps[number])
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
	donestep() {}
	getcurrentstep() {}
	start() {
		this.goToStepNumber(0)
		windowResize(this.currentStep)
		return this
	}
	exit() {}
	createDom() {
		// 遮罩层
		this.overlayer = createOverlayer({
			opacity: this.overlayOpacity,
		})
		const body = document.getElementsByTagName('body')[0]
		body.appendChild(this.overlayer)
	}
}
