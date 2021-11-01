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
export const buttonAddEventListener = (step) => {
	if (!step || !step.guide) return
	const guide = step.guide
	getdom()
	next.addEventListener('click', _next)
	prev.addEventListener('click', _prev)
	skip.addEventListener('click', _skip)
	done.addEventListener('click', _done)
}
export const buttonRemoveEventListener = (step) => {
	if (!step || !step.guide) return
	const guide = step.guide
	getdom()
	next.removeEventListener('click', _next)
	prev.removeEventListener('click', _prev)
	skip.removeEventListener('click', _skip)
	done.removeEventListener('click', _done)
}

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
