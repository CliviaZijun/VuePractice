// 真正创建节点，将vnode创建为DOM，插入到pivot(标杆)元素之前
export default function createElm(vnode,pivot){
    console.log('目的是把虚拟节点',vnode,'插入到',pivot,'前');
    // 该节点当前还是孤儿节点
    let domNode = document.createElement(vnode.sel);
    // 有子节点还是有文本？
    if(vnode.text!=='' && (vnode.children === undefined || vnode.children.length === 0)){
        // text非空且children为空，即内部是文字
        domNode.innerText = vnode.text;
        // 将孤儿节点上树，让标杆节点的父元素调用insertBefore方法，将新的孤儿节点插入到标签节点之前
        pivot.parentNode.insertBefore(domNode,pivot);
    }else if(Array.isArray(vnode.children) && vnode.children.length>0){
        // 内部是子节点，就要递归创建节点
        // 递归终点是当h函数text为文本
        // 而在递归过程中势必要去调用createElm函数，但该createElm函数需要提供标杆pivot，而内部是子节点的情况找不到标杆
        // 因此需要把pivot参数去掉，createElm只需把虚拟节点真正地变成DOM，并且需要添加elm属性
        // 把插入挪到patch中进行
    }
}