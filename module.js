/**var name;
exports.setName=function(thyname) {
	name=thyname;
};

exports.sayHello=function(){
	console.log('hello'+name);
};*/
function Hello(){
	var name;
	this.setName=function(thyname){
		name=thyname;
	};
	this.sayHello=function(){
		console.log('Hello'+name)
	};
};
module.exports=Hello;//覆盖exports，只想把一个对象封装到模块中。
/**不可以通过对exports直接赋值替代module.exports赋值。*/
