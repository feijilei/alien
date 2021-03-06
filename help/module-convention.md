# 模块约定
约定好的模块书写规范，有助于模块的协同开发和后期维护，这是一个健康的生态。


## 模块路径
模块按照功能来命名文件夹：
- libs 库函数，构造方法
	- Deferred
	- Emitter
	- Pagination
	- Template
	- Validate
	- Filter
- util 工具库，静态方法
	- class
	- data
	- date
	- easing
	- howdo
- core 核心库
	- communication 通信
		- jsonp
		- upload
		- xhr
	- dom dom 操作
		- attribute
		- animation
		- modification
		- selector
	- navigator 浏览器操作
		- compatible
		- hashbang
		- querystring
		- shell
		- ua
	- event 事件
		- base
		- drag
		- ready
		- touch
		- wheel
- ui
	- Drag
	- Dialog
	- Msg
	- Scrollbar
	- Banner
	- Pagination
	- Tips


## 模块命名
* 总规则
	* 必须小写
	* 必须不能出现连字符
	* 必须简明扼要，直观易读
	* 必须是字母
	* 必须是英文名词
* 模块文件夹名称，必须是小写，不能出现连字符（如`-`或`_`等）、驼峰，约定俗成的长名称可以缩写
	* `a-b`，错误，模块文件夹名称不能包含连字符
	* `aB`，错误，模块文件夹名称不能是驼峰形式
	* `dom`，正确
* 静态模块名称，必须是小写，不出现连字符（`-`），命名必须是模块的表现或功能，必须是英文，不能用拼音来命名，模块的命名必须是名词
	* `HelloWorld.js`，错误，静态模块名称不能出现大写字母，不能是驼峰形式
	* `yellow.js`，错误，模块名称偏向形容词，没有表象含义
	* `perfect-responsive-dialog.js`，错误，模块名称多不能包含连字符
* 构造函数模块名称，必须大写第一个字母，其余规则与静态模块命名规则一致
	* `dialog.js`，错误，构造函数模块必须大写第一个字母


## 模块内容
开发环境，使用CMD规范书写，有以下几个约定


### 模块开始
必须指明模块名称、作者、创建时间，其他信息可选，示例如下：
```
/*!
 * querystring.js
 * @author ydr.me
 * @ref https://github.com/joyent/node/blob/master/lib/querystring.js
 * @create 2014-09-19 16:30
 */
```


### 模块开头
必须使用严格模式，指明模块路径，示例如下：
```
define(function (require, exports, module) {
    /**
     * @module util/querystring
     */
    'use strict';
    
    // 模块内容
});
```


### 模块变量
必须使用`var`定义，多个变量必须堆叠在一起，示例如下：
```
function parse(querystring, sep, eq) {
   sep = sep || '&';
   eq = eq || '=';

   var ret = {};
   var type = data.type(querystring);
   var arr;

   if (type !== 'string') {
       return ret;
   }
   
   // ...
});
```


### 模块引用
必须使用相对路径，文件后缀不能省略，示例如下：
```
var data = require('./data.js');
```


### 模块方法
必须使用约定注释规范，每个函数必须命名，示例如下：
```
/**
 * 字符化
 * @param {Object} object query 对象
 * @param {String} [sep] 分隔符，默认&
 * @param {String} [eq] 等于符，默认=
 * @returns {String}
 */
function stringify(object, sep, eq) {
    // ...
}
```


### 模块留白及行注释
* 块状方法的前后都必须空一行，如`if`、`function`、`switch`等。
* 变量声明前后都必须空一行。
* 多行空白，合并成一行。
* 方法之间必须有空行。
* 行注释必须写在变量、方法上一行。


最后更新：2014年9月25日14:05:32

