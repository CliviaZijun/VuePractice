import vnode from './vnode.js';
import createElm from './createElm.js';
import patchVnode from './patchVnode.js';

export default function patch(oldVnode,newVnode){
    // 判断传入的第一个参数是DOM节点还是虚拟节点
    if(oldVnode.sel === '' || oldVnode.sel === undefined){
        // 传入的第一个参数是DOM节点，此时要包装为虚拟节点
        oldVnode = vnode(oldVnode.tagName.toLowerCase(),{},[],undefined,oldVnode);
        console.log(oldVnode,newVnode)
    }

    // 判断oldVnode和newVnode是不是同一个函数
    if(oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel){
        // console.log('是同一个节点，精细比较');
        patchVnode(oldVnode,newVnode);

    }else{
        console.log('不是同一个节点，暴力插入新的，删除旧的');
        // pivot版本👇
        // createElm(newVnode,oldVnode.elm);
        let newVnodeElm = createElm(newVnode);
        // 插入到老节点之前
        //      需要判断newVnodeElm是否存在
        //      if(oldVnode.elm.parentNode && newVnodeElm){
        if(newVnodeElm){
            // 文本节点在这儿上树
            oldVnode.elm.parentNode.insertBefore(newVnodeElm,oldVnode.elm);
        }
        // 删除老节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
       
    }

}
