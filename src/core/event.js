const _next = function () {
	this.nextstep()
}
const _prev = function () {
	this.prevstep()
}
const _skip = function () {
	this.skipstep()
}
const _done = function () {
	this.donestep()
}
/**
 * 按钮绑定点击事件
 */
export const buttonAddEventListener = function () {
	if (!this.currentStep) return
	buttonRemoveEventListener.apply(this)
	this.button.next?.addEventListener('click', _next.bind(this))
	this.button.prev?.addEventListener('click', _prev.bind(this))
	this.button.skip?.addEventListener('click', _skip.bind(this))
	this.button.done?.addEventListener('click', _done.bind(this))
}
/**
 * 按钮解除点击事件
 */
export const buttonRemoveEventListener = function () {
	if (!this.currentStep) return
	this.button.next?.removeEventListener('click', _next.bind(this), true)
	this.button.prev?.removeEventListener('click', _prev.bind(this))
	this.button.skip?.removeEventListener('click', _skip.bind(this))
	this.button.done?.removeEventListener('click', _done.bind(this))
}
/**
 * 屏幕resize 事件
 */
const _resizeCB = function () {
	this.currentStep?.create()
}
export const addWindowResizeListener = function () {
	window.addEventListener('resize', _resizeCB.bind(this))
}
export const removeWindowResizeListener = function () {
	window.removeEventListener('resize', _resizeCB.bind(this))
}

const _classNameInit = function () {
	Object.values(this).forEach((item) => {
		item && item.classList.remove('hide', 'show')
	})
}
/**
 * shep 发生改变时触发
 */
export const stepChange = function () {
	if (!this.currentStep) return
	_classNameInit.apply(this.button)
	const steps = this.steps
	const index = this.currentStepNumber
	const length = steps.length
	const { next, prev, skip, done } = this.button
	console.log(index, length, 0 < index < length - 1)
	if (index === 0 && index === length - 1) {
		// 起始
		next?.classList.add('hide')
		prev?.classList.add('hide')
		skip?.classList.add('hide')
		done?.classList.add('show')
	} else if (index === 0) {
		// 起始
		next?.classList.add('show')
		prev?.classList.add('hide')
		skip?.classList.add('hide')
		done?.classList.add('hide')
	} else if (index === length - 1) {
		// done
		next?.classList.add('hide')
		prev?.classList.add('show')
		skip?.classList.add('hide')
		done?.classList.add('show')
	} else {
		next?.classList.add('show')
		prev?.classList.add('show')
		skip?.classList.add('hide')
		done?.classList.add('hide')
	}
}
const resolvePath = (location) => {
	let path
	const { hash, pathname } = window.location
	if (hash) {
		const lastIndex = hash.indexOf('?')
		lastIndex > 0
			? (path = hash.slice(1, lastIndex))
			: (path = hash.slice(1))
	} else if (pathname) {
		const lastIndex = hash.indexOf('?')
		lastIndex > 0
			? (path = pathname.slice(0, lastIndex))
			: (path = pathname.slice(0))
	} else {
		path = ''
	}
	return path
}
const _locationEventCB = function (...argus) {
	// const arguments = argus[0].arguments
	// const path = argus[0].arguments[2]
	const path = resolvePath()
	const steps = this.allSteps ? this.allSteps[path] : null

	setTimeout(() => {
		this.setSteps(steps).start()
	}, 200)
}
/**
 * 监听前端路由发生改变
 * @param {function} callback 路由发生改变时的回调
 */
export const locationAddEventListener = function () {
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

	window.addEventListener('hashchange', _locationEventCB.bind(this))
	window.addEventListener('popstate', _locationEventCB.bind(this))
	window.addEventListener('pushState', _locationEventCB.bind(this))
	window.addEventListener('replaceState', _locationEventCB.bind(this))

	_locationEventCB.apply(this)
}
/**
 * 移除路由监听事件
 * @param {function} callback 路由发生改变时的回调
 */
export const locationRemoveEventListener = function () {
	window.removeEventListener('hashchange', _locationEventCB.bind(this))
	window.removeEventListener('popstate', _locationEventCB.bind(this))
	window.removeEventListener('pushState', _locationEventCB.bind(this))
	window.removeEventListener('replaceState', _locationEventCB.bind(this))
}
