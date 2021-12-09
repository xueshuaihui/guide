import { version } from '../../package.json'
import options from '../options/global'
import { Listen, Trigger, Remove } from '../tools/listener'
import {
	createOverlayer,
	createGuideTargetBox,
	createGuideTipBox,
} from '../core/createElement'
import Step from '../step/index'
import { TypeOf, setStyle } from '../tools/tools'
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
		return this.activeSteps[code]
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
			this._createGuideTargetBox(name)
			this._createGuideTipBox(name)
			this.body.appendChild(this.activeSteps[name].targetElement)
			this.body.appendChild(this.activeSteps[name].tipElement)
			this._switchStepsNumber(name)
			// 开始流程
			this.setStepsNumber(name, 0)
			setStyle(this.overlayer, {
				display: 'block',
			})
			// 触发回调
			if (TypeOf(this.mount) === 'function') {
				this.mount(name, this.activeSteps[name])
			}
		} else {
			// last step 注销回调
			if (
				TypeOf(this.activeSteps[name].currentStep?.unmount) ===
				'function'
			) {
				this.activeSteps[name].currentStep.unmount(
					name,
					this.activeSteps[name].currentStep
				)
			}
			//  steps注销回调
			if (TypeOf(this.unmount) === 'function') {
				this.unmount(name, this.activeSteps[name])
			}
			this.remove(name)
			delete this.activeSteps[name]
		}
	}
	/**
	 * 切换流程步骤的监听
	 */
	_switchStepsNumber(name) {
		Listen(name, (arg) => {
			const name = Array.prototype.shift.call(arg)
			if (!this.activeSteps[name]) return
			const { stepNumber, steps } = this.activeSteps[name]
			const step = new Step(steps[stepNumber])
			this.setStep(step, this.activeSteps[name])

			// 原step 注销回调
			if (
				TypeOf(this.activeSteps[name].currentStep?.unmount) ===
				'function'
			) {
				this.activeSteps[name].currentStep.unmount(
					name,
					this.activeSteps[name].currentStep
				)
			}
			this.activeSteps[name].currentStep = step
			// currentStep 创建回调
			if (TypeOf(step.mount) === 'function') {
				step.mount(name, step)
			}
			this.buttonState(this.activeSteps[name]) // 更新按钮状态
		})
	}
	/**
	 *设置tip的内容和位置
	 */
	setStep(step, stepsDatas) {
		const { tipElement, targetElement } = stepsDatas
		step.setTargetPosition(targetElement)
		step.setTipContent(tipElement)
		step.setTipPosition(tipElement, targetElement)
		step.positionOffset(tipElement)
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
			this.setStepsState(name, false)
		}
	}
	/**
	 * 移除流程dom
	 * @param {string} name 流程名称
	 */
	remove(name) {
		if (name) {
			this._removeGuideTargetBox(name)
			this._removeGuideTipBox(name)
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
	 * 创建引导step的target框
	 * @param {string} name 流程名称
	 */
	_createGuideTargetBox(name) {
		if (!name) {
			console.error('缺少 step name')
			return
		}
		const box = createGuideTargetBox.call(
			this,
			{
				display: 'none',
			},
			name
		)
		this.activeSteps[name].targetElement = box
	}
	/**
	 * 创建引导step的tip框
	 * @param {string} name 流程名称
	 */
	_createGuideTipBox(name) {
		if (!name) {
			console.error('缺少 step name')
			return
		}
		const box = createGuideTipBox.call(this, name)
		this.activeSteps[name].tipElement = box
	}
	/**
	 * 移除step的target框
	 * @param {string} name 流程名称
	 */
	_removeGuideTargetBox(name) {
		if (!name) {
			console.error('缺少 step name')
			return
		}
		this.activeSteps[name]?.targetElement?.remove()
	}
	/**
	 * 移除step的tip框
	 * @param {string} name 流程名称
	 */
	_removeGuideTipBox(name) {
		if (!name) {
			console.error('缺少 step name')
			return
		}
		this.activeSteps[name]?.tipElement?.remove()
	}
	/**
	 * 委托button事件
	 */
	bindEvent() {
		this.body = document.getElementsByTagName('body')[0]
		// 按钮点击事件
		this.body.onclick = (e) => {
			const target = e.target
			if (
				Array.prototype.includes.call(target.classList, 'guide-button')
			) {
				// 进行按钮操作
				const code = target.getAttribute('code')
				const stepsName = target.getAttribute('steps')
				switch (code) {
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
		//
		const updataStep = () => {
			Object.values(this.activeSteps).forEach((item) => {
				if (item.currentStep) {
					const { tipElement, targetElement } = item
					item.currentStep.setTargetPosition(targetElement)
					item.currentStep.setTipPosition(tipElement, targetElement)
				}
			})
		}
		// 页面缩放事件
		window.onresize = () => {
			updataStep()
		}
		// scroll 监听
		window.onscroll = () => {
			updataStep()
		}
	}
	// 按钮事件处理方法
	Next(name) {
		if (!name) return
		this.setStepsNumber(name, '++')
	}
	Prev(name) {
		if (!name) return
		this.setStepsNumber(name, '--')
	}
	Skip(name) {
		if (!name) return
		this.setStepsState(name, false)
	}
	Done(name) {
		if (!name) return
		this.setStepsNumber(name, '++')
	}
	/**
	 *按钮状态处理
	 */
	buttonState(stepsDatas) {
		const activeSteps = this.activeSteps
		Object.values(activeSteps).forEach((item) => {
			const { tipElement } = item
			const next = tipElement.querySelector(
				'.guide-button.guide-next-button'
			)
			const prev = tipElement.querySelector(
				'.guide-button.guide-prev-button'
			)
			const done = tipElement.querySelector(
				'.guide-button.guide-done-button'
			)
			const { stepNumber, steps } = stepsDatas
			const length = steps.length
			if (stepNumber > 0) {
				prev?.classList.remove('hide')
				prev?.classList.add('show')
			} else {
				prev?.classList.remove('show')
				prev?.classList.add('hide')
			}
			if (done && stepNumber === length - 1) {
				next?.classList.remove('show')
				next?.classList.add('hide')
				done?.classList.remove('hide')
				done?.classList.add('show')
			} else {
				done?.classList.remove('show')
				done?.classList.add('hide')
				next?.classList.remove('hide')
				next?.classList.add('show')
			}
		})
	}
}
