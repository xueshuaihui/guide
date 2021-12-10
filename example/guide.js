const guide = new Guide({
	nextLabel: '我知道了',
	nextclass: 'next',
	jointsClass: 'joints-line',
	mount(name, steps) {
		// console.log(`开启流程名称${name}, 数据`, steps)
	},
	unmount(name, steps) {
		// console.log(`结束流程名称${name}, 数据`, steps)
	},
	steps: {
		create: [
			{
				el: '.create.create-btn',
				content: [
					{
						image: '',
						title: '新建项目',
						text: '分享链接给同事，邀请同事发表意见',
					},
				],
				width: 410,
				height: 198,
			},
		],
		click: [
			{
				content: [
					{
						image: '',
						title: '分享项目',
						text: '分享链接给同事，邀请同事发表意见',
					},
				],
				width: 410,
				height: 198,
			},
			{
				el: '.logo',
				content: [
					{
						image: '',
						title: '分享项目',
						text: '分享链接给同事，邀请同事发表意见',
					},
				],
				width: 410,
				height: 198,
			},
		],
		event: [
			{
				el: '.logo',
				position: 'right',
				content: [
					{
						image: '',
						title: '分享项目',
						text: '按住空格键和鼠标左键拖拽可以移动画布。',
					},
					{
						image: '',
						title: '分享项目',
						text: '按住  ⌘  键，同时滚动鼠标滚轮可以缩放画布大小。',
					},
				],
				mount(name, step) {
					// console.log(`开启流程名称${name}, 数据`, step)
				},
				unmount(name, step) {
					// console.log(`结束流程名称${name}, 数据`, step)
				},
			},
			{
				el: '.inbox-inner',
				content: [
					{
						image: '',
						title: '分享项目',
						text: '按住  ⌘  键，同时滚动鼠标滚轮可以缩放画布大小。',
					},
				],
				position: 'left',
				mount(name, step) {
					// console.log(`开启流程名称${name}, 数据`, step)
				},
				unmount(name, step) {
					// console.log(`结束流程名称${name}, 数据`, step)
				},
			},
			{
				el: '#morris-area-chart',
				content: 'test',
				position: 'left',
			},
			{
				el: '.menu-list.nav-active',
				position: 'right',
				mount(name, step) {
					// console.log(`开启流程名称${name}, 数据`, step)
				},
				unmount(name, step) {
					// console.log(`结束流程名称${name}, 数据`, step)
				},
			},
		],
	},
})
// guide.addsteps()
// guide.start('click')
guide.start('event')
console.log(guide)
