import { version } from '../../package.json'
import options from '../options/global'
import { Listen, Trigger, Remove } from '../tools/listener'
import { createOverlayer, createGuideStepBox } from '../core/createElement'
import Step from '../step/index'
import { TypeOf, setStyle, ScrollToControl } from '../tools/tools'
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
		this.bindEvent()
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
			if (this.activeSteps[name]) return
			this.activeSteps[name] = {
				stepNumber: -1,
				steps: steps,
			}
			// 激活后 创建外层dom
			this._createGuideStepBox(name)
			this.body.appendChild(this.activeSteps[name].element)
			this._switchStepsNumber(name)
			// 开始流程
			this.setStepsNumber(name, 0)
			setStyle(this.overlayer, {
				display: 'block',
			})
		} else {
			this._removeGuideStepBox(name)
			delete this.activeSteps[name]
		}
	}
	/**
	 * 切换流程步骤的监听
	 */
	_switchStepsNumber(name) {
		Listen(name, (arg) => {
			const name = Array.prototype.shift.call(arg)
			const { element, stepNumber, steps } = this.activeSteps[name]
			const step = new Step(steps[stepNumber])
			step.setContainer(element)
			this.activeSteps[name].currentStep = step
			this._setTipPosition(name) // 更新定位
			step.setPosition(element) // 设置position信息
			step.setSize(element, {
				width: this.width,
				height: this.height,
			}) // 设置大小
			step.setJoints(element) // 设置joints信息
		})
	}
	/**
	 * 更新tip 定位
	 * @param {string} name 流程名称
	 */
	_setTipPosition(name) {
		const steps = this.activeSteps[name]
		const { currentStep, element } = steps
		setStyle(element, {
			display: 'block',
		})
		let elTarget = currentStep.elTarget
		if (elTarget) {
			element.classList.remove('guide-step-notarget')
			ScrollToControl(currentStep.el)
			currentStep.setElTarget()
			elTarget = currentStep.elTarget
		} else {
			element.classList.add('guide-step-notarget')
			elTarget = {
				width: 0,
				height: 0,
				top: `50%`,
				left: `50%`,
			}
		}

		const { width, height, top, left } = elTarget
		setStyle(element, {
			width,
			height,
			top,
			left,
		})
	}
	/**
	 * 设置流程步骤
	 * @param {string} name 流程名称
	 * @param {number} number 第几步
	 */
	setStepsNumber(name, number) {
		const steps = this.activeSteps[name]
		if (!steps) return
		if (TypeOf(number) === 'number') {
			steps.stepNumber = number
		} else if (number === '++') {
			steps.stepNumber++
		} else if (number === '--') {
			steps.stepNumber--
		}
		// 判断number是否在范围内
		const length = steps.steps.length
		if (steps.stepNumber >= 0 && steps.stepNumber < length) {
			Trigger(name, steps.stepNumber)
		} else {
			this.remove(name)
		}
	}
	/**
	 * 移除流程
	 * @param {string} name 流程名称
	 */
	remove(name) {
		if (name) {
			this._removeGuideStepBox(name)
			this.setStepsState(name, false)
			setStyle(this.overlayer, {
				display: 'none',
			})
		} else {
			console.error('缺少steps name.')
		}
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
	 * @param {string} name 流程名称
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
	 * @param {string} name 流程名称
	 */
	_removeGuideStepBox(name) {
		if (!name) {
			console.error('缺少 step name')
			return
		}
		this.activeSteps[name]?.element?.remove()
	}
	/**
	 * 委托button事件
	 */
	bindEvent() {
		this.body = document.getElementsByTagName('body')[0]
		this.body.onclick = (e) => {
			const target = e.target
			if (
				Array.prototype.includes.call(target.classList, 'guide-button')
			) {
				// 进行按钮操作
				const code = target.getAttribute('code')
				const stepsName = target.getAttribute('steps')
				switch (code) {
					case 'next':
						this.Next(stepsName)
						break
					case 'prev':
						this.Prev(stepsName)
						break
					case 'skip':
						this.Skip(stepsName)
						break
					case 'done':
						this.Done(stepsName)
						break
					default:
						this.Next(stepsName)
						break
				}
			}
		}
	}
	//
	Next(name) {
		if (!name) return
		const steps = this.activeSteps[name]
		this.setStepsNumber(name, '++')
	}
	Prev(name) {
		if (!name) return
		this.setStepsNumber(name, '--')
	}
	Skip(name) {
		if (!name) return
		this.remove(name)
	}
	Done(name) {
		if (!name) return
		this.setStepsNumber(name, '++')
	}
}
