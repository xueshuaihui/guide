const guide = new Guide({
	animation: true,
})
guide.addAllSteps({
	init: [
		{
			el: '.logo img',
			content: '点击此处开启下一个引导',
			width: 410,
			height: 198,
		},
	],
	click: [
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
	],
})
guide.start('init')
