
/*
 * GET home page.
 */

exports.index = function(req, res){
	/**render函数调用模板引擎(即ejs)并将其产生的页面直接返回给客户端
	，render函数第一个参数为模板名称，即views目录下的模板文件名称
	不包含文件的扩展名，第二个参数是传递给模板的数据，用于翻译模板。
	*/
  	res.render('index', { title: 'Express' })


};

/**
	一个网站可能需要不止一种页面布局，我们可以在页面模板翻译时指定页面布局
	即设置layout属性,下列代码会在翻译userlist页面模板时套用admin.ejs
	作为页面布局
  	*/
exports.userlist = function(req,res){
  		res.render('userlist',{
  			title:'user managerment system',
  			layout:'admin'
  		});
  	}

exports.hello = function(req,res){
	res.send('The time is '+ new Date().toString());
};

/**使用片段视图(partials)，他就是一个页面的片段，通常是重复的内容，
用于迭代显示，可以避免显示的使用for循环.
<ul><%- partial('listitem',items) %></ul>partial是一个可以在视图中使用的函数
，它有两个参数，第一个是片段视图的名称，第二个是一个对象或者数组，如果是
对象，那么片段视图中上下文变量引用的就是这个对象，如果是数组，那么其中的
每一个元素依次被迭代应用到片段视图。片段视图中的上下文变量名就是视图文件名。

*/
exports.list = function(req,res){
	res.render('list',{
		title:'List',
		items:[1991,'xinhe','express','nodejs']
	});
};