var http = require('http');
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write('<h1>Node.js</h1>');
	res.end('<p>Hello World changedfghdghg </p>');
}).listen(3000);
console.log("HTTP server is listening at port 3000");

var fs = require('fs');
//异步的方式读取文件，首先输出的是下面的end. fs.readFile调用时
//所作的工作只是将异步式I/O请求发送给了OS。然后立即返回并执行后面
//的语句，执行完以后进入事件循环监听事件。当fs接收到I/O请求完成的事件
//后，事件循环会主动调用函数以完成后续工作
//并不是所有的API都提供了同步和异步版本，nodejs不鼓励使用同步I/O.

/**fs.readFile('file.txt','utf-8',function(err,data){
	if(err)
	{
		console.error(err);
	}else
	{
		console.log(data);
	}
});
console.log('end.');*/

//同步方式读取文件，end.是在文件内容被读取出来后显示的。
var data=fs.readFileSync('file.txt','utf-8');
console.log(data);
console.log('end.');