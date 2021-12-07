const guide = new Guide({
	animation: true,
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
				content: {
					image: '',
					title: '分享项目',
					text: '分享链接给同事，邀请同事发表意见',
				},
				width: 410,
				height: 198,
				jointsWidth: 15,
				jointsHeight: 15,
			},
			{
				el: '.inbox-inner',
				position: 'top',
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
