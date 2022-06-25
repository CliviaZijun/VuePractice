
import h from './my-stabbdom/h.js'

// 测试用例
// var myErrVNode1 = h('div','doge');
// var myErrVNode2 = h('div',{},{});
// var myErrVNode3 = h('div',{},[h('p',{},'1'),'刺客']);
var myVNode1 = h('div',{},'doge');
var myVNode2 = h('div',{},h('p',{},'2'));
var myVNode3 = h('ul',{},h('li',{},'kitty'));
var myVNode4 = h('div',{},[
    h('p',{},'1'),
    h('p',{},'2'),
    h('p',{},'3'),
    h('p',{},[
        h('span',{},"3-1"),
        h('span',{},[
            h('span',{},"3-1-1"),
            h('span',{},"3-1-2"),
        ]),
        h('span',{},"3-2"),

    ]),
]);
console.log(myVNode1)
console.log(myVNode2)
console.log(myVNode3)
console.log(myVNode4)