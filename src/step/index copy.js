import options from '../options/step'
import { setStyle } from '../tools/tools'
import {
	createHelperLayer,
	// createTooltip,
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
		// body null
		if (el === 'body' || !el) {
			this.target = document.querySelector('body')
			this.followType = 'full'
		} else {
			this.target = document.querySelector(el)
			if (!this.target) {
				console.error(`未找到${this.el}元素`)
				return
			}
		}

		this._createHelperLayer()
	}
	destory() {
		this._removeHelperLayer()
	}
	_createHelperLayer() {
		this.body = document.getElementsByTagName('body')[0]
		// 辅助层
		let Bound = this.target.getBoundingClientRect()
		if (this.followType === 'full') {
			Bound = {
				width: 0,
				height: 0,
				top: '50%',
				left: '50%',
			}
		}
		const { width, height, top, left } = Bound
		const helperLayerStryle = {
			width: width,
			height: height,
			top: top,
			left: left,
		}
		if (!this.guide.helperLayer) {
			// 不存在 创建
			this.guide.helperLayer = createHelperLayer.apply(this, [
				helperLayerStryle,
			])
			this.body.appendChild(this.guide.helperLayer)
			this.guide.toolTip =
				this.guide.helperLayer.querySelector('.guide-tooltip')
		} else {
			// 存在 设置HelperLayer 样式
			setStyle(this.guide.helperLayer, helperLayerStryle)
		}
		// 设置tooltip大小
		setStyle(this.guide.toolTip.querySelector('.guide-tooltip-main'), {
			width: this.width,
			height: this.height,
		})
		// 更新文本
		setGuideContainer.apply(this)
	}
	_removeHelperLayer() {
		if (this.guide.helperLayer) {
			this.guide.helperLayer.remove()
			this.guide.helperLayer = null
			this.guide.toolTip = null
		}
	}
}
