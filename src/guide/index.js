import { version } from '../../package.json'
import options from '../options/global'
import { Listen, Trigger, Remove } from '../tools/listener'
import Step from '../step/index'
// import { TypeOf } from '../tools/tools'
import { createOverlayer, createGuideStepBox } from '../core/createElement'
// import {
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
export default class Guide {
	constructor(customOptions) {
		this.version = version
		this.steps = null // 所有页面的流程集合
		this.activeSteps = {} // 当前激活状态的流程
		this.overlayer = null
		this.setOptions(options)
		this.setOptions(customOptions)
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
	/**
	 *开启引导流程
     @param {string} code 引导name
	 */
	start(code) {
		if (!this.steps || this.steps?.length === 0) return
		this._createOverlayer()
		this.setStepsState(code, true)
		// 激活后 创建外层dom
		this._createGuideStepBox(code)
		this.body.appendChild(this.activeSteps[code].element)

		// this.goToStepNumber(0)
		// buttonAddEventListener.apply(this)
		// addWindowResizeListener.apply(this)
		return this
	}
	/**
	 * 设置流程状态
	 * @param {string} name 流程名称
	 * @param {boolean} state 流程状态 true/false  true:激活  false:关闭
	 */
	setStepsState(name, state) {
		const steps = this.steps[name]
		if (state) {
			this.activeSteps[name] = {
				stepNumber: -1,
				steps: steps,
			}
			Listen(name, () => {
				console.log(111111, arguments)
			})
			// 开始流程
			this.setStepsNumber(name, 0)
		} else {
			this._removeGuideStepBox(name)
			delete this.activeSteps[name]
			Listen(name)
		}
	}
	/**
	 * 设置流程步骤
	 * @param {string} name 流程名称
	 * @param {number} number 第几步
	 */
	setStepsNumber(name, number) {
		const steps = this.activeSteps[name]
		if (!steps) return
		steps.stepNumber = number || -1
		Trigger(name, number)
	}
	/**
	 * 创建遮罩层：共用
	 */
	_createOverlayer() {
		if (this.overlayer) return
		this.overlayer = createOverlayer({
			display: 'none',
		})
		if (!this.body) {
			this.body = document.getElementsByTagName('body')[0]
		}
		this.body.appendChild(this.overlayer)
	}
	/**
	 * 移除遮罩层
	 */
	_removeOverlayer() {
		this.overlayer?.remove()
		this.overlayer = null
	}
	/**
	 * 创建steps外层dom
	 */
	_createGuideStepBox(name) {
		if (!name) {
			console.error('缺少 step name')
			return
		}
		const box = createGuideStepBox.call(
			this,
			{
				display: 'none',
			},
			name
		)
		this.activeSteps[name].element = box
	}
	/**
	 * 移除steps外层dom
	 */
	_removeGuideStepBox(name) {
		if (!name) {
			console.error('缺少 step name')
			return
		}
		this.activeSteps[name]?.element?.remove()
	}
}
