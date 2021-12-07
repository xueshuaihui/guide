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
				jointsClass: 'wcrvtyrb',
				jointsWidth: 15,
				jointsHeight: 15,
			},
			{
				el: '#morris-area-chart',
				content: 'test',
			},
		],
	},
})
// guide.addsteps()
// guide.start('click')
guide.start('event')
console.log(guide)
