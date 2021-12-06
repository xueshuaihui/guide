const guide = new Guide({
	animation: true,
	steps: {
		click: [
			{
				el: '.test1',
				content: 'test',
				width: 410,
				height: 198,
			},
			{
				el: '.test2',
				content: {
					image: '',
					title: '分享项目',
					text: '分享链接给同事，邀请同事发表意见',
				},
				width: 410,
				height: 198,
			},
			{
				el: '.test3',
				content: 'test',
				width: 410,
				height: 198,
			},
		],
		event: [
			{
				el: '.test2',
				content: {
					image: '',
					title: '分享项目',
					text: '分享链接给同事，邀请同事发表意见',
				},
				width: 410,
				height: 198,
			},
			{
				el: '.test3',
				content: 'test',
				width: 410,
				height: 198,
			},
		],
	},
})
// guide.addsteps()
// guide.start('click')
// guide.start('click')
guide.start('event')
console.log(guide)
