import { createElement, TypeOf } from '../tools/tools'

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
 * 创建引导step的dom 外框
 * @param {json} style 基础参数
 * @return {object}  外框对象
 */
export const createGuideStepBox = function (style, name) {
	let attr = {
		style: style,
	}
	attr.class = 'guide-step-target guide-overlayer-bgcolor'
	const stepTarget = createElement('div', attr)
	stepTarget.innerHTML = createGuideTipBox.call(this, name)
	return stepTarget
}
/**
 * 创建引导tip dom
 */
const createGuideTipBox = function (name) {
	const activeSteps = this.activeSteps[name]
	return `
	<div class="guide-tooltip guide-tooltip-${name}" style="">
	    <div class="guide-joints">
	    </div>
	    <div class="guide-tooltip-main" style="width:${this.width}px;height:${this.height}px;">
	        <div class="guide-container"></div>
	        <div class="guide-button-box">
	            <div class="guide-button guide-next-button ${this.nextclass}" code="next" steps="${name}">${this.nextLabel}</div>
	            <div class="guide-button guide-prev-button ${this.prevclass}" code="prev" steps="${name}">${this.prevLabel}</div>
	            <div class="guide-button guide-skip-button ${this.skipclass}" code="skip" steps="${name}">${this.skipLabel}</div>
	            <div class="guide-button guide-done-button ${this.doneclass}" code="done" steps="${name}">${this.doneLabel}</div>
	        </div>
	    </div>
	</div>
	`
}
