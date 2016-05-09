
/**
 * Module dependencies.
 */
 var fs = require('fs');
 var accessLogfile = fs.createWriteStream('access.log',{flags:'a'});
 var errorLogfile = fs.createWriteStream('error.log',{flags:'a'});

var express = require('express')
  , routes = require('./routes');
var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){

  //访问日志中间件
  app.use(express.logger({stream:accessLogfile}));

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //cookie解析中间件
  app.use(express.cookieParser());
  //将会话信息存储在数据库中
  app.use(express.session({
  	secret:settings.cookieSecret,
  	store:new MongoStore({
  		db:settings.db
  	})
  }));
  
  app.use(express.router(routes));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  // app.use(express.errorHandler());
  //在产品模式下打印出错误日志
  app.error(function(err,req,res,next){
    var meta = '[' + new Date() + ']'+req.url + '\n';
    errorLogfile.write(meta+err.stack+'\n');
    next();
    });
});

app.dynamicHelpers({user:function(req,res){
	return req.session.user;//误将req写成res，导致无法识别user，所以页面未能显示
},error:function(req,res){
	var err=req.flash('error');
	if(err.length){
		return err;
	}else{
		return null;
	}
},
	success:function(req,res){
		var succ=req.flash('success');
		if(succ.length)
			return succ;
		else
			return null;
	},
});
// Routes
//首页
// app.get('/', routes.index);
// //用户首页
// app.get('u/:user',routes.user);
// //发表信息
// app.post('/post',routes.post);
// //注册界面
// //app.get('/reg',routes.reg);
// //发送注册信息界面
// app.post('/reg',routes.doReg);
// //登录界面
// app.get('/login',routes.login);
// //登录进入
// app.post('/login',routes.doLogin);
// //登出界面
// app.get('/logout',routes.logout);

if(!module.parent){
  app.listen(3000);
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

}
