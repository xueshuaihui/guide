import options from '../options/step'
import { setStyle } from '../tools/tools'
import {
	createHelperLayer,
	createTooltip,
	setGuideContainer,
} from '../core/createElement'
/**
 * Step类，代表一个步骤.
 * @constructor
 * @param customOptions {json} 自定义设置
 */
export default class Step {
	constructor(customOptions, guide) {
		this.el = null
		this.target = null
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
		if (!this.target) {
			console.error(`未找到${this.el}元素`)
			return
		}

		this._createHelperLayer()
		this._createToolTip()
	}
	destory() {
		this._removeToolTip()
		this._removeHelperLayer()
	}
	_getDomStyle(type) {
		this.body = document.getElementsByTagName('body')[0]
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
		const toolTipStyle = {
			width: currentStep.width + 'px',
			height: currentStep.height + 'px',
			top: height + top + offsetTop + 'px',
			left: left + offsetLeft + 'px',
		}
		switch (type) {
			case 'helperLayerStryle':
				return helperLayerStryle
			case 'toolTipStyle':
				return toolTipStyle
			default:
				break
		}
	}
	_createHelperLayer() {
		const helperLayerStryle = this._getDomStyle('helperLayerStryle')
		if (!this.guide.helperLayer) {
			this.guide.helperLayer = createHelperLayer(helperLayerStryle)
			this.body.appendChild(this.guide.helperLayer)
		} else {
			setStyle(this.guide.helperLayer, helperLayerStryle)
		}
	}
	_removeHelperLayer() {
		this.guide.helperLayer?.remove()
		this.guide.helperLayer = null
	}
	_createToolTip() {
		const toolTipStyle = this._getDomStyle('toolTipStyle')
		if (!this.guide.toolTip) {
			this.guide.toolTip = createTooltip.apply(this, [toolTipStyle])
			this.body.appendChild(this.guide.toolTip)
		} else {
			setStyle(this.guide.toolTip, toolTipStyle)
		}
		setGuideContainer.apply(this)
	}
	_removeToolTip() {
		this.guide.toolTip?.remove()
		this.guide.toolTip = null
	}
}
