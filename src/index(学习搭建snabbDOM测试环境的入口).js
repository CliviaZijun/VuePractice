import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
  } from "snabbdom";

// 创建patch函数
const patch = init([classModule,propsModule,styleModule,eventListenersModule])
  
// 创建虚拟节点
const myVnode1 = h('a',{props:{
    href:"https://www.baidu.com",
    target:'_blank'
    }
},"度娘");
//h函数并不会在页面上真正地产生a标签，但能输出虚拟节点
// console.log(myVnode1);

// const myVnode2 = h('div',{props:{className:'gua'}},'我是一个盒子');
// const myVnode2 = h('div',{class:{'gua':true}},'我是一个盒子');
const myVnode2 = h('div.gua','我是一个盒子');

const myVnode3 = h('ul',{},[
    h('li',{},'牛奶'),
    h('li','酸奶'),//属性 样式为空时 可以省略{}
    h('li',[
        h('div',[
            h('p','p咖啡'),
            h('p','p咖啡2')
        ])
    ]),
    
    h('li',h('span','小span椰乳'))//如果只有一个子元素，数组可以省略
])

// 让虚拟节点上树
const container = document.getElementById('container');
patch(container,myVnode3)