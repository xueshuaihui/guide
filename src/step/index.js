import options from '../options/step'
import { TypeOf, setStyle, ScrollToControl } from '../tools/tools'
// import temp from '../template/template1/tooltip.ejs'
import temp from '../template/temp.js'
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
	 * 设置tip 内容
	 * @param {hTMLDivElement} tipElement dom 对象
	 */
	setTipContent(tipElement) {
		if (!tipElement || TypeOf(tipElement) !== 'hTMLDivElement') return
		const container = tipElement.querySelector('.guide-container')
		container.innerHTML = temp[this.template || 'template1'](this.content)
		setStyle(tipElement.querySelector('.guide-tooltip-main'), {
			width: this.width,
		})
	}
	/**
	 * el target位置
	 *  @param {hTMLDivElement} targetElement dom 对象
	 */
	setTargetPosition(targetElement) {
		const el = document.querySelector(this.el)
		ScrollToControl(this.el)
		document
			.querySelector('.guide-target')
			?.classList.remove('guide-target')
		if (el && el.getClientRects().length) {
			el.classList.add('guide-target')
			const { width, height, top, left } = el.getClientRects()[0]
			setStyle(targetElement, {
				width: width + 20,
				height: height + 20,
				top: top - 10,
				left: left - 10,
				display: 'block',
			})
		} else {
			setStyle(targetElement, {
				width: 0,
				height: 0,
				top: 0,
				left: 0,
				display: 'block',
			})
		}
	}
	/**
	 * 设置tip位置
	 * @param {hTMLDivElement} tipElement dom 对象
	 * @param {hTMLDivElement} targetElement dom 对象
	 */
	setTipPosition(tipElement, targetElement) {
		if (targetElement && tipElement) {
			if (!this.el || !document.querySelector(this.el)) {
				this.position = 'center'
			}
			const { width, height, top, left } =
				targetElement.getClientRects()[0]
			const params = {
				targetWidth: width,
				targetHeight: height,
				targetTop: top,
				targetLeft: left,
			}
			switch (this.position) {
				case 'bottom':
					this._positionBottom(tipElement, params)
					break
				case 'top':
					this._positionTop(tipElement, params)
					break
				case 'left':
					this._positionLeft(tipElement, params)
					break
				case 'right':
					this._positionRight(tipElement, params)
					break

				default:
					this._positionCenter(tipElement)
					break
			}
			tipElement.className = `guide-tooltip guide-tooltip-${this.position}`
		}
	}
	_positionCenter(tipElement) {
		const { width, height } = tipElement.getClientRects()[0]
		setStyle(tipElement, {
			top: window.screen.height / 2 - height / 2,
			left: document.body.clientWidth / 2 - width / 2,
		})
	}
	_positionBottom(
		tipElement,
		{ targetWidth, targetHeight, targetTop, targetLeft }
	) {
		const { width } = tipElement.getClientRects()[0]
		setStyle(tipElement, {
			top: targetTop + targetHeight,
			left: targetLeft + (targetWidth - width) / 2,
		})
	}
	_positionTop(
		tipElement,
		{ targetWidth, targetHeight, targetTop, targetLeft }
	) {
		const { width, height } = tipElement.getClientRects()[0]
		setStyle(tipElement, {
			top: targetTop - height,
			left: targetLeft + (targetWidth - width) / 2,
		})
	}
	_positionLeft(
		tipElement,
		{ targetWidth, targetHeight, targetTop, targetLeft }
	) {
		const { width, height } = tipElement.getClientRects()[0]
		setStyle(tipElement, {
			top: targetTop - (height - targetHeight) / 2,
			left: targetLeft - width,
		})
	}
	_positionRight(
		tipElement,
		{ targetWidth, targetHeight, targetTop, targetLeft }
	) {
		const { height } = tipElement.getClientRects()[0]
		setStyle(tipElement, {
			top: targetTop - (height - targetHeight) / 2,
			left: targetLeft + targetWidth,
		})
	}
	/**
	 * tip、joints偏移量
	 * @param {hTMLDivElement} tipElement dom 对象
	 * */
	positionOffset(tipElement) {
		if (!tipElement || TypeOf(tipElement) !== 'hTMLDivElement') return
		tipElement.style.transform = `translate(${this.offsetX || 0}px, ${
			this.offsetY || 0
		}px)`
		const joints = tipElement.querySelector('.guide-joints')
		joints.style.transform = `translate(${this.jointsX || 0}px, ${
			this.jointsY || 0
		}px)`
	}
}
