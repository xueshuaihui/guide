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
    <div class="guide-tooltip ${this.joints}" style="">
        <div class="guide-joints">
        </div>
        <div class="guide-tooltip-main">
            <div class="guide-container"></div>
            <div class="guide-button-box">
                <div class="guide-button guide-next-button ${this.guide.nextclass}">${this.guide.nextLabel}</div>
                <div class="guide-button guide-prev-button ${this.guide.prevclass}">${this.guide.prevLabel}</div>
                <div class="guide-button guide-skip-button ${this.guide.skipclass}">${this.guide.skipLabel}</div>
                <div class="guide-button guide-done-button ${this.guide.doneclass}">${this.guide.doneLabel}</div>
            </div>
        </div>
    </div>
    `
	return helperLayer
}
export const setGuideContainer = function () {
	// 更新guide-tooltip class
	console.log(this.guide.toolTip.className.split('guide-tooltip'))
	const removeClassName = this.guide.toolTip.className.split('guide-tooltip')
	removeClassName.forEach((item) => {
		if (item.length > 0) {
			this.guide.toolTip.classList.remove(
				item.replace(/(^\s*)|(\s*$)/g, '')
			)
		}
	})
	this.guide.toolTip.classList.add(this.joints)
	// 更新buttons
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
