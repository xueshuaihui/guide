const guide = new Guide({
	nextLabel: '我知道了',
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
			},
			{
				el: '.inbox-inner',
				position: 'bottom',
				jointsX: '30',
				jointsY: '-2',
				offsetX: 40,
				offsetY: -30,
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
			},
		],
	},
})
// guide.addsteps()
// guide.start('click')
guide.start('event')
console.log(guide)
