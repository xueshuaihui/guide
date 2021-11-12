const guide = new Guide({
	// animation: true,
})
guide.addAllSteps({
	init: [
		{
			el: '.logo img',
			content: '点击此处开启下一个引导',
			width: 410,
			height: 198,
			tipClass: 'tipclass1',
		},
	],
	click: [
		{
			el: '.menu-list',
			content: 'test',
			width: 410,
			height: 198,
			nextLabel: '好哒',
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
			tipClass: 'tipclass2',
			nextLabel: '好哒1',
			nextclass: 'test1',
			prevLabel: '上一步',
			prevclass: 'test2',
			skipLabel: '跳过',
			skipclass: 'test3',
			doneLabel: '完成',
			doneclass: 'test4',
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
