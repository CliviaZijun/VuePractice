import h from './my-stabbdom/h.js'
import patch from './my-stabbdom/patch.js'

const container = document.getElementById('container');
// 测试文本节点
// let myVnode1 = h('section',{},'你好'); 

// 测试含子节点的虚拟节点

// 新节点，不是同一节点的情况 // 暴力删除、添加
let myVnode1 = h('section',{},[
    h('p',{key:'A'},'A'),
    h('p',{key:'B'},'B'),
    h('p',{key:'C'},'C'),
    h('p',{key:'D'},'D'),
    h('p',{key:'E'},'E'),
    // h('ol',{},[
    //     h('li',{},'D-1'),
    //     h('li',{},'D-2'),
    // ]),
])

// 第一次上树
patch(container,myVnode1);

// 新节点，同一子节点的情况 //精细化比较
// 新节点是text
// let myVnode2 = h('div',{},'gua');
// 新节点有children
let myVnode2 = h('section',{},[
    h('p',{key:'E'},'E'),
    h('p',{key:'D'},'Ddd'),
    h('p',{key:'C'},'C'),
    h('p',{key:'B'},'Bbb'),
    h('p',{key:'A'},'A'),
    // h('ol',{},[
    //     h('li',{},'D1'),
    //     h('li',{},'D-2'),
    // ])
]);

const btn = document.getElementById('btn');
btn.addEventListener('click',()=>{
    patch(myVnode1,myVnode2);
    myVnode1 = myVnode2;
})