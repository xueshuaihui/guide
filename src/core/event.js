const _next = () => {
	guide.nextstep(guide)
}
const _prev = (guide) => {
	guide.prevstep()
}
const _skip = (guide) => {
	guide.skipstep()
}
const _done = (guide) => {
	guide.donestep()
}
export const buttonAddEventListener = (step) => {
	if (!step || !step.guide) return
	console.log(22222)
	const guide = step.guide
	const next = document.querySelector('.guide-next-button')
	const prev = document.querySelector('.guide-prev-button')
	const skip = document.querySelector('.guide-skip-button')
	const done = document.querySelector('.guide-done-button')
	next.addEventListener('click', _next)
	prev.addEventListener('click', _prev)
	skip.addEventListener('click', _skip)
	done.addEventListener('click', _done)
}
export const buttonRemoveEventListener = (step) => {
	if (!step || !step.guide) return
	const guide = step.guide
	const next = document.querySelector('.guide-next-button')
	const prev = document.querySelector('.guide-prev-button')
	const skip = document.querySelector('.guide-skip-button')
	const done = document.querySelector('.guide-done-button')
	next.removeEventListener('click', _nextfun(guide))
	prev.removeEventListener('click', _prev(guide))
	skip.removeEventListener('click', _skip(guide))
	done.removeEventListener('click', _done(guide))
}
