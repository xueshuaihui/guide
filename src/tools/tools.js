/**
 * 判断数据格式
 * @param data {object} - 待判断的数据.
 * @return {boolean}
 *
 */
export const TypeOf = (data) => {
	const type = Object.prototype.toString.call(data)
	return type
		.slice(1, -1)
		.split(' ')[1]
		.replace(/^[A-Z]/, (a) => {
			return a.toLowerCase()
		})
}

const unitAttr = [
	'width',
	'height',
	'left',
	'right',
	'top',
	'bottom',
	'margin',
	'margin-top',
	'margin-left',
	'margin-bottom',
	'margin-right',
] // 设置样式时， 需要将数字转换为 number+px 的属性
/**
 * 设置行内样式
 *
 * @param {Object} element
 * @param {Object|string} style
 * @return Element
 */
export const setStyle = (element, style) => {
	if (!style) return
	let cssText = ''

	if (element.style.cssText) {
		cssText += element.style.cssText
	}

	if (typeof style === 'string') {
		cssText += style
	} else {
		Object.keys(style).forEach((rule) => {
			if (unitAttr.indexOf(rule) >= 0 && !isNaN(style[rule])) {
				cssText += `${rule}:${style[rule]}px;`
			} else {
				cssText += `${rule}:${style[rule]};`
			}
		})
	}

	element.style.cssText = cssText
	return element
}

/**
 * 创建dom标签
 *
 * @param {String} tagname
 * @param {Object} attrs
 * @return Element
 */

export const createElement = (tagname, attrs) => {
	let element = document.createElement(tagname)

	attrs = attrs || {}
	for (const k in attrs) {
		let v = attrs[k]
		if (k === 'style') {
			setStyle(element, v)
		} else {
			element.setAttribute(k, v)
		}
	}

	return element
}
/**
 * scroll移动到指定元素
 * @param {string} el 元素选择器
 */
export const ScrollToControl = (el) => {
	const target = document.querySelector(el)
	const { width, height, top, left } = target.getClientRects()[0]
	// outerWidth, outerHeight
	if (top < 0) {
		moveScroll(0, top - height)
	} else if (top > outerHeight - height) {
		moveScroll(0, top - height)
	}
}
/**
 * 移动scroll
 * @param {number} toX left方向移动到哪
 * @param {number} toY top方向移动到哪
 */
export const moveScroll = (toX, toY) => {
	window.scrollBy(toX, toY)
}
