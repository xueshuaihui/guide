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
export const createHelperLayer = (style) => {
	let attr = {
		style: style,
	}
	attr.class = 'guide-helperLayer'
	return createElement('div', attr)
}
export const createTooltip = function (style) {
	let attr = {
		style: style,
	}
	attr.class = 'guide-tooltip'
	const dom = createElement('div', attr)
	let htmlString = `
    <div class="guide-container"></div>
    <div class="guide-button-box">
        <div class="guide-button guide-next-button">继续探索</div>
        <div class="guide-button guide-prev-button">上一步</div>
        <div class="guide-button guide-skip-button">跳过</div>
        <div class="guide-button guide-done-button">知道啦</div>
    </div>
    `
	dom.innerHTML = htmlString

	return dom
}
export const setGuideContainer = function () {
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
