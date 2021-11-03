import { createElement } from '../tools/tools'

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
export const createTooltip = (style) => {
	let attr = {
		style: style,
	}
	attr.class = 'guide-tooltip'
	const dom = createElement('div', attr)
	dom.innerHTML = `
    <div class="guide-container">
        <div class="guide-image">
            <img src="" alt="" />
        </div>
        <div class="guide-message">
            <h4>创建批注</h4>
            <p>在设计图上 单击 或 拖拽 绘制 快捷键</p>
        </div>
    </div>
    <div class="guide-button-box">
        <div class="guide-button guide-skip-button">跳过</div>
        <div class="guide-button guide-prev-button">上一步</div>
        <div class="guide-button guide-next-button">继续探索</div>
        <div class="guide-button guide-done-button">知道啦</div>
    </div>
     `
	return dom
}
