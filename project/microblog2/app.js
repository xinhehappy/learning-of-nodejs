
/**
 * Module dependencies.
 */

var util = require('util');
var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration
//通用环境下的参数
app.configure(function(){
  app.set('views', __dirname + '/views');//页面模板的位置
  app.set('view engine', 'ejs');//设置模板引擎为ejs
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

//开发环境下的参数
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//产品环境下的参数
app.configure('production', function(){
  app.use(express.errorHandler());
});

/**
视图助手，静态视图助手通过app.helpers()函数注册，接受一个对象，对象的每个
属性名称为视图助手的名称，属性值对应视图助手的值。动态视图助手则通过app.
dynamicHelpers()注册。方法与静态一样，但每个属性值必须为一个函数，提供req和res

*/
app.helpers({
	inspect:function(obj){
		return util.inspect(obj,true);
	}
});
app.dynamicHelpers({
	headers:function(req,res){
		return req.headers;
	}
});
app.get('/helper',function(req,res){
	res.render('helper',{title:'Helpers'});
});

var users = {
	'xinhe':{
		name:'xinhe',
		website:'home.ustc.edu.cn/~sa615145'
	}
};

// Routes
app.get('/', routes.index);
app.get('/hello',routes.hello);

//路由选择进入新页面
app.get('/list',routes.list);

/**同一路径被多个路由规则匹配的时候，请求总是被前一条路由规则捕获
后面的规则会被忽略。Express提供了路由控制权转移的方法，即回调函数的
第三个参数next，通过调用next()；会将控制权转移给下一条路由规则。
*/
app.all('/user/:username',function(req,res,next){
	//检查用户是否存在
	if(users[req.params.username])
	{
		next();
	}else{
		next(new Error(req.params.username+' does not exist.'));
	}
	
});
app.get('/user/:username',function(req,res){
	//用户一定存在，直接展示
	res.send(JSON.stringify(users[req.params.username]));

});

app.put('/user/:username',function(req,res){
	res.send('Done');
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
