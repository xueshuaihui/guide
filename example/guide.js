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
			},
			{
				el: '#morris-area-chart',
				content: 'test',
				width: 410,
				height: 198,
			},
		],
	},
})
// guide.addsteps()
guide.start('click')
// guide.start('click')
// guide.start('event')
console.log(guide)
