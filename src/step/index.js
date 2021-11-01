import options from '../options/step'
import { setStyle } from '../tools/tools'
import {
	buttonAddEventListener,
	buttonRemoveEventListener,
} from '../core/event'
import { createHelperLayer, createTooltip } from '../core/createElement'
/**
 * Step类，代表一个步骤.
 * @constructor
 * @param customOptions {json} 自定义设置
 */
export default class Step {
	constructor(customOptions, guide) {
		this.el = null
		this.target = null
		this.content = null
		this.guide = guide
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
	create() {
		const el = this.el
		this.target = document.querySelector(el)
		this._createDom()
		buttonAddEventListener(this)
	}
	destory() {
		buttonRemoveEventListener(this)
	}
	_createDom() {
		if (!this.guide) return
		const body = document.getElementsByTagName('body')[0]
		// 辅助层
		const currentStep = this.guide.currentStep
		const { width, height, top, left } =
			currentStep.target.getBoundingClientRect()
		const offsetTop = Number(currentStep.offsetTop)
		const offsetLeft = Number(currentStep.offsetLeft)

		const helperLayerStryle = {
			width: width + 'px',
			height: height + 'px',
			top: top + 'px',
			left: left + 'px',
		}
		if (!this.guide.helperLayer) {
			this.guide.helperLayer = createHelperLayer(helperLayerStryle)
			body.appendChild(this.guide.helperLayer)
		} else {
			setStyle(this.guide.helperLayer, helperLayerStryle)
		}
		const tooltipStyle = {
			width: currentStep.width + 'px',
			height: currentStep.height + 'px',
			top: height + top + offsetTop + 'px',
			left: left + offsetLeft + 'px',
		}
		if (!this.guide.tooltip) {
			this.guide.tooltip = createTooltip(tooltipStyle)
			body.appendChild(this.guide.tooltip)
		} else {
			setStyle(this.guide.tooltip, tooltipStyle)
		}
	}
}
