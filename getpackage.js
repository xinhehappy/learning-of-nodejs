var somepackage=require('./somepackage');
/**
Node.js在调用某个包的时候，会首先检查包中package.json文件的main字段，
将其作为包的接口模块，如果不存在main字段，会尝试寻找index.js或index.node
作为包的接口
*/
somepackage.hello();