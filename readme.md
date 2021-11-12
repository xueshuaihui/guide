# GUIDE

## 安装

### npm 安装

推荐使用 npm 的方式安装  
目前还未发布，本地 link 调试或者使用 `/example`

```javascript
npm install guide --save
```

### 直接引入

下载压缩包，在页面上直接引入 js 和 css 文件即可开始使用。

```javascript
<link rel="stylesheet" href="./dist/guide.min.css">
<script src="/dist/guide.min.js"></script>
```

## 基本调用

```javascript
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
		content: 'test',
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
```

## 配置项

### guide

```json
{
	// 下一步按钮参数
	"nextLabel": "下一步",
	"nextclass": "",
	// 上一步按钮参数
	"prevLabel": "上一步",
	"prevclass": "",
	// 跳过按钮参数
	"skipLabel": "跳过",
	"skipclass": "",
	// 结束按钮参数
	"doneLabel": "完成",
	"doneclass": "",
	// 提示框弹出位置
	"confirmtipPosition": "bottom",
	// 提示框弹出自定义class
	"confirmtipClass": "",
	// 是否打开遮罩层
	// openoverlayer: 'true',
	// 遮罩层透明度
	"overlayOpacity": ".7",
	// 提示框弹出位置是否自动, 设置true时会对confirmtipPosition 覆盖
	"autoPosition": false,
	// 是否禁止引导dom交互
	"disableInteraction": false,
	// 开启动画
	"animation": false,
	// 触发键盘“esc”时，是否退出引导流程
	"exitOnEsc": false,
	// 宽高
	"width": 200,
	"height": 200
}
```

### step

```json
{
	"nextLabel": "下一步",
	"nextclass": "",
	"prevLabel": "上一步",
	"prevclass": "",
	"skipLabel": "跳过",
	"skipclass": "",
	"doneLabel": "完成",
	"doneclass": "",
	"content": "",
	"confirmtipPosition": "bottom",
	"confirmtipClass": "",
	"width": "",
	"height": "",
	"offsetTop": "20",
	"offsetLeft": "0",
	"followType": "follow", // follow     full
	"joints": "top" // top top-left top-right bottom bottom-left bottom-right left left-top left-bototm right right-top
}
```

## 全局引导

### 全局引导维护

```javascript
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
		...
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
		....
	],
})
guide.start('init')
```

### 触发

```javascript
guide.start('click')
```

## 自定义模版

模态框内容除了提供的基础模版外，可以添加用户自定义的模版。

### 模版示例:

```javascript
const template = `
    <div class="guide-image">
        <img src="{{image}}" alt="" />
    </div>
    <div class="guide-message">
        <h3>{{title}}</h3>
        <p>{{text}}</p>
    </div>
`
```

模版为 html 字符串，占位符字段不固定要求，即`{{image}}`、`{{title}}`、`{{text}}`可以跟俊自己的需求定义，但在`content： {}`设置内容时，需按照模版定义的字符设置。

```javascript
guide.addsteps = [
    ...,
	{
		content: {
			image: '',
			title: '分享项目',
			text: '分享链接给同事，邀请同事发表意见',
		},
		width: 180,
		height: 498,
		joints: 'left',
	},
    ...
]
```

## 样式定制

安装包目录`/dist/guide.scss`提供 guide.css 的 sass 文件，可根据需求进行重构和编译。
