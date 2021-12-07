import options from '../options/step'
import { TypeOf, setStyle } from '../tools/tools'
import temp from '../template/template1/tooltip.ejs'
/**
 * Step类，代表一个步骤.
 * @constructor
 * @param customOptions {json} 自定义设置
 */
export default class Step {
	constructor(customOptions) {
		this.container = null // 放置tip 的容器
		this.setOptions(options)
		this.setOptions(customOptions)
	}
	/**
	 * 单个设置option
	 * @param {string} key - option key.
	 * @param {object} value - option value.
	 */
	setOption(key, value) {
		// if (!key || !value) return
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
	 * 设置step容器
	 * @param {hTMLDivElement} container dom 对象
	 */
	setContainer(container) {
		if (TypeOf(container) === 'hTMLDivElement') {
			this.container = container.querySelector('.guide-container')
			this.loadTip()
			return this
		}
	}
	/**
	 * 加载tip
	 */
	loadTip() {
		this.setElTarget()
		this.container.innerHTML = temp(this.content) // 加载引导tip
	}
	/**
	 * 更新elTarget
	 */
	setElTarget() {
		const el = document.querySelector(this.el)
		if (el && el.getClientRects().length) {
			const { width, height, top, left } = el.getClientRects()[0]
			this.elTarget = { width, height, top, left }
		}
	}
	/**
	 * 设置tip宽高
	 * @param {hTMLDivElement} element tip dom 对象
	 * @param {json} params 全局step宽高
	 */
	setSize(element, params) {
		if (
			Array.prototype.includes.call(
				element.classList,
				'guide-step-target'
			)
		) {
			const main = element.querySelector('.guide-tooltip-main')
			const width =
				this.width || params.width || parseInt(main.style.width)
			const height =
				this.height || params.height || parseInt(main.style.height)
			setStyle(main, {
				width,
				height,
			})
		}
	}
	/**
	 * 设置joints相关数据
	 * @param {hTMLDivElement} element tip dom 对象
	 *
	 */
	setJoints(element) {
		if (
			Array.prototype.includes.call(
				element.classList,
				'guide-step-target'
			)
		) {
			const joints = element.querySelector('.guide-joints')
			joints.className = 'guide-joints'
			joints.classList.add(this.jointsClass)
			this.jointsWidth && setStyle(joints, { width: this.jointsWidth })
			this.jointsHeight && setStyle(joints, { height: this.jointsHeight })
			setStyle(joints, {
				'margin-top': this.jointsY || 'auto',
				'margin-left': this.jointsX || 'auto',
			})
			console.log({
				'margin-top': this.jointsY,
				'margin-left': this.jointsX,
			})
		}
	}
	/**
	 * 设置位置
	 * @param {hTMLDivElement} element tip dom 对象
	 */
	setPosition(element) {
		const position = this.position
		if (
			Array.prototype.includes.call(
				element.classList,
				'guide-step-target'
			)
		) {
			const tooltip = element.querySelector('.guide-tooltip')
			tooltip.className = 'guide-tooltip'
			tooltip.classList.add(`guide-tooltip-${position}`)
			if (position === 'bottom') {
				setStyle(tooltip, {
					'margin-top': this.offsetY || 'auto',
					'margin-left': this.offsetX || 'auto',
				})
			} else if (position === 'top') {
				setStyle(tooltip, {
					'margin-bottom': -this.offsetY || 'auto',
					'margin-left': this.offsetX || 'auto',
					'margin-top': 'auto',
				})
			} else if (position === 'left') {
				setStyle(tooltip, {
					'margin-top': this.offsetY || 'auto',
					'margin-left': this.offsetX || 'auto',
				})
			} else if (position === 'right') {
				setStyle(tooltip, {
					'margin-top': this.offsetY || 'auto',
					'margin-right': -this.offsetX || 'auto',
					'margin-left': 'auto',
				})
			}
		}
	}
}
