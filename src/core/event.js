const _next = () => {
	guide.nextstep()
}
const _prev = () => {
	guide.prevstep()
}
const _skip = () => {
	guide.skipstep()
}
const _done = () => {
	guide.donestep()
}
let next = null
let prev = null
let skip = null
let done = null
const getdom = () => {
	next = next ? next : document.querySelector('.guide-next-button')
	prev = prev ? prev : document.querySelector('.guide-prev-button')
	skip = skip ? skip : document.querySelector('.guide-skip-button')
	done = done ? done : document.querySelector('.guide-done-button')
}
/**
 * 按钮绑定点击事件
 * @param {Object} step  当前步骤step 对象
 */
export const buttonAddEventListener = (step) => {
	if (!step || !step.guide) return
	const guide = step.guide
	getdom()
	next.addEventListener('click', _next)
	prev.addEventListener('click', _prev)
	skip.addEventListener('click', _skip)
	done.addEventListener('click', _done)
}
/**
 * 按钮解除点击事件
 * @param {Object} step  当前步骤step 对象
 */
export const buttonRemoveEventListener = (step) => {
	if (!step || !step.guide) return
	const guide = step.guide
	getdom()
	next.removeEventListener('click', _next)
	prev.removeEventListener('click', _prev)
	skip.removeEventListener('click', _skip)
	done.removeEventListener('click', _done)
}
/**
 * 屏幕resize 事件
 * @param {Object} step  当前步骤step 对象
 */
export const windowResize = (step) => {
	window.onresize = () => {
		step.create()
	}
}

const _classNameInit = () => {
	const dom = [next, prev, skip, done]
	dom.forEach((item) => {
		item && item.classList.remove('hide', 'show')
	})
}
/**
 * shep 发生改变时触发
 * @param {Object} guide  guide对象
 */
export const stepChange = (guide) => {
	_classNameInit()
	const steps = guide.steps
	const index = guide.currentStepNumber
	const length = steps.length
	if (index === 0) {
		// 起始
		next.classList.add('show')
		prev.classList.add('hide')
		skip.classList.add('hide')
		done.classList.add('hide')
	} else if (index === length - 1) {
		// done
		next.classList.add('hide')
		prev.classList.add('show')
		skip.classList.add('hide')
		done.classList.add('show')
	} else {
		next.classList.add('show')
		prev.classList.add('show')
		skip.classList.add('hide')
		done.classList.add('hide')
	}
}
const _locationEventCB = (...argus) => {
	console.log(argus)
    const arguments = argus[0].arguments
    const path = arguments[2]
}
/**
 * 监听前端路由发生改变
 * @param {function} callback 路由发生改变时的回调
 */
export const locationAddEventListener = (callback) => {
	locationRemoveEventListener()
    const _historyWrap = function (type) {
		const orig = history[type]
		const e = new Event(type)
		return function () {
			const rv = orig.apply(this, arguments)
			e.arguments = arguments
			window.dispatchEvent(e)
			return rv
		}
	}
	history.pushState = _historyWrap('pushState')
	history.replaceState = _historyWrap('replaceState')

	window.addEventListener('hashchange', _locationEventCB)
	window.addEventListener('popstate', _locationEventCB)
	window.addEventListener('pushState', _locationEventCB)
	window.addEventListener('replaceState', _locationEventCB)
}
/**
 * 移除路由监听事件
 * @param {function} callback 路由发生改变时的回调
 */
export const locationRemoveEventListener = () => {
	window.removeEventListener('hashchange', _locationEventCB)
	window.removeEventListener('popstate', _locationEventCB)
	window.removeEventListener('pushState', _locationEventCB)
	window.removeEventListener('replaceState', _locationEventCB)
}
