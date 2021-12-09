const guide = new Guide({
	nextLabel: '我知道了',
	mount(name, steps) {
		console.log(`开启流程名称${name}, 数据`, steps)
	},
	unmount(name, steps) {
		console.log(`结束流程名称${name}, 数据`, steps)
	},
	steps: {
		click: [
			{
				content: {
					image: '',
					title: '分享项目',
					text: '分享链接给同事，邀请同事发表意见',
				},
				width: 410,
				height: 198,
			},
			{
				el: '.logo',
				content: {
					image: '',
					title: '分享项目',
					text: '分享链接给同事，邀请同事发表意见',
				},
				width: 410,
				height: 198,
			},
		],
		event: [
			{
				el: '.logo',
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
				width: 410,
				height: 198,
				jointsWidth: 15,
				jointsHeight: 15,
				mount(name, step) {
					console.log(`开启流程名称${name}, 数据`, step)
				},
				unmount(name, step) {
					console.log(`结束流程名称${name}, 数据`, step)
				},
			},
			{
				el: '.inbox-inner',
				position: 'bottom',
				jointsX: '30',
				jointsY: '-2',
				offsetX: 40,
				offsetY: -30,
				mount(name, step) {
					console.log(`开启流程名称${name}, 数据`, step)
				},
				unmount(name, step) {
					console.log(`结束流程名称${name}, 数据`, step)
				},
			},
			{
				el: '#morris-area-chart',
				content: 'test',
				position: 'left',
				offsetX: -40,
				offsetY: 30,
			},
			{
				el: '.menu-list.nav-active',
				position: 'right',
				offsetX: 40,
				offsetY: 30,
				mount(name, step) {
					console.log(`开启流程名称${name}, 数据`, step)
				},
				unmount(name, step) {
					console.log(`结束流程名称${name}, 数据`, step)
				},
			},
		],
	},
})
// guide.addsteps()
// guide.start('click')
guide.start('event')
console.log(guide)
