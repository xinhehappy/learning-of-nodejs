/**var myModule = require('./module');
myModule.setName('xinhe');


var myModule2=require('./module');
myModule2.setName('  second one');
myModule.sayHello();
// 打印出hello second one。 require不会重复加载模块，无论
// 调用多少次require，获得的模块都是同一个，所以第二次加载出的
// 模块覆盖了第一次的。
*/
var Hello=require('./module');
hello=new Hello();//要先创造出一个对象
hello.setName(' xinhe');
hello.sayHello();