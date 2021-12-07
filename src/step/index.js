import options from '../options/step'
import { TypeOf } from '../tools/tools'
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
		}
	}
	/**
	 * 加载tip
	 */
	loadTip() {
		const el = document.querySelector(this.el)
		if (el && el.getClientRects().length) {
			const { width, height, top, left } = el.getClientRects()[0]
			this.elTarget = { width, height, top, left }
		}
		this.container.innerHTML = temp(this.content) // 加载引导tip
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
			console.log(width, height)
			main.style.width = `${width}px`
			main.style.height = `${height}px`
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
			this.jointsWidth && (joints.style.width = `${this.jointsWidth}px`)
			this.jointsHeight &&
				(joints.style.height = `${this.jointsHeight}px`)
		}
	}
}
