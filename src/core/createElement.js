import { createElement, TypeOf } from '../tools/tools'
import tipTemplate from './tip.ejs'
/**
 * 创建遮罩层
 * @param {json} style 遮罩层基础参数
 * @return {object}  Overlayer对象
 */
export const createOverlayer = (style) => {
	let attr = {
		style: style,
	}
	attr.class = 'guide-overlayer'
	const element = createElement('div', attr)
	return element
}
/**
 * 创建引导step的target框
 * @param {json} style 基础参数
 * @return {object}  外框对象
 */
export const createGuideTargetBox = function (style, name) {
	let attr = {
		style: style,
	}
	attr.class = 'guide-step-target guide-overlayer-bgcolor'
	const stepTarget = createElement('div', attr)
	// stepTarget.innerHTML = createGuideTipBox.call(this, name)
	return stepTarget
}
/**
 * 创建引导step的tip dom外框
 * @param {name} steps name
 */
export const createGuideTipBox = function (name) {
	const stepTarget = createElement('div', {
		class: 'guide-tooltip',
	})
	stepTarget.innerHTML = tipTemplate({ name, ...this })
	return stepTarget
}
