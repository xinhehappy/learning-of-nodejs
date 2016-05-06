var events= require('events');
var emmitter = new events.EventEmitter();
emmitter.on('someEvent',function(arg1,arg2){
	console.log('listener1',arg1,arg2);
});
emmitter.on('someEvent',function(arg1,arg2){
	console.log('listener2',arg1,arg2);
});
emmitter.emit('someEvent','xinhe',1999);