import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
  } from "snabbdom";

  // 创建patch函数   
  const patch = init([classModule,propsModule,styleModule,eventListenersModule]);

  let vnode1 = h('ul',{},[
    h('li',{key:'A'},'A'),
    h('li',{key:'B'},'B'),
    h('li',{key:'C'},'C'),
    h('li',{key:'D'},'D'),
  ]);

  const container = document.getElementById('container');
  patch(container,vnode1);

  let vnode2 = h('ul',{},[
    h('li',{key:'E'},'e'),// 如果不加key 在前面加新节点的话所有的都会被更新,所以v-for一定要加key 否则就会全量更新
    h('li',{key:'A'},'A'),
    h('li',{key:'B'},'B'),
    h('li',{key:'C'},'C'),
    h('li',{key:'D'},'D'),
    h('li',{key:'E'},'e')
  ]);

  const btn = document.getElementById('btn');
  btn.addEventListener('click',()=>{
    patch(vnode1,vnode2);
    vnode1 = vnode2;
  })