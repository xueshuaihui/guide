import { createElement, TypeOf } from '../tools/tools'
import { toolTip } from '../template/tooltip'

export const createOverlayer = (style) => {
	let attr = {
		style: style,
	}
	attr.class = 'guide-overlayer'
	const element = createElement('div', attr)
	return element
}
export const createHelperLayer = function (style) {
	let attr = {
		style: style,
	}
	attr.class = 'guide-helperLayer'
	const helperLayer = createElement('div', attr)
	helperLayer.innerHTML = `
    <div class="guide-tooltip ${this.joints} ${this.tipClass}" style="">
        <div class="guide-joints">
        </div>
        <div class="guide-tooltip-main">
            <div class="guide-container"></div>
            <div class="guide-button-box">
                <div class="guide-button guide-next-button ${
					this.nextclass || this.guide.nextclass
				}">${this.nextLabel || this.guide.nextLabel}</div>
                <div class="guide-button guide-prev-button ${
					this.prevclass || this.guide.prevclass
				}">${this.prevLabel || this.guide.prevLabel}</div>
                <div class="guide-button guide-skip-button ${
					this.skipclass || this.guide.skipclass
				}">${this.skipLabel || this.guide.skipLabel}</div>
                <div class="guide-button guide-done-button ${
					this.doneclass || this.guide.doneclass
				}">${this.doneLabel || this.guide.doneLabel}</div>
            </div>
        </div>
    </div>
    `
	return helperLayer
}
const _updateToolTipClass = function () {
	// 更新guide-tooltip class
	this.guide.toolTip.classList.forEach((key) => {
		if (key !== 'guide-tooltip') {
			this.guide.toolTip.classList.remove(key)
		}
	})
	// 添加位置class
	if (this.followType !== 'full') {
		this.guide.toolTip.classList.add(this.joints)
	}
	// 添加动画class
	if (this.guide.animation) {
		this.guide.toolTip.classList.add('animation')
	}
	// 更新tipclass
	if (this.tipClass !== '') {
		this.guide.toolTip.classList.add(this.tipClass)
	}
}

export const setGuideContainer = function () {
	_updateToolTipClass.apply(this)
	// 更新内容
	let htmlString
	const type = TypeOf(this.content)
	if (type === 'string') {
		htmlString = this.content
	} else if (type === 'object') {
		htmlString = toolTip.replace(/{{[\w\W][^{{][^}}]*}}/g, (code) => {
			const key = code.slice(2, -2)
			return this.content[key] || ''
		})
	}
	const container = this.guide.toolTip.querySelector('.guide-container')
	container.innerHTML = htmlString
}
