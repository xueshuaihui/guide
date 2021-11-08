const guide = new Guide({
	animation: true,
})
guide.addsteps([
	{
		el: '.menu-list',
		content: 'test',
		width: 410,
		height: 198,
	},
	{
		el: '.dropdown-toggle',
		content: {
			image: '',
			title: '分享项目',
			text: '分享链接给同事，邀请同事发表意见',
		},
		width: 410,
		height: 198,
	},
	{
		el: '.info-box-main',
		content: 'test',
		width: 410,
		height: 198,
	},
])
guide.start()
