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
		if (!key || !value) return
		this[key] = value
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
		if(el){
			const {width, height, top, left} = el.getClientRects()[0]
			this.elTarget = {width, height, top, left}
		}
		this.container.innerHTML = temp(this.content) // 加载引导tip
	}
}
