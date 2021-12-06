let list = {}
export const Listen = (key, fun) => {
	if (!list[key]) {
		list[key] = []
	}
	list[key].push(fun)
}
export const Trigger = (...arg) => {
	// var key = Array.prototype.shift.call(arg),
	let key = arg[0]
	const fns = list[key]
	if (!fns || fns.length === 0) {
		return false
	}
	for (var i = 0, fn; (fn = fns[i++]); ) {
		fn(arg)
	}
}
export const Remove = (key, fun) => {
	var fns = list[key]
	if (!fns) {
		return false
	}
	if (!fn) {
		fns && (fns.length = 0)
	} else {
		for (var i = fns.length - 1; i >= 0; i--) {
			var _fn = fns[i]
			if (_fn === fn) {
				fns.splice(i, 1)
			}
		}
	}
}
