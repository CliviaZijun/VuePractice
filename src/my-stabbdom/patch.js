import vnode from './vnode.js';
import createElm from './createElm.js';

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
        // 判断新老虚拟节点是否是内存中的同一个对象
        if(oldVnode === newVnode) {return;}
        // newVnode是否有text属性
        if(newVnode.text && (newVnode.children === undefined||newVnode.children.length === 0)){
            // 若新虚拟节点有text属性，则无children
            if(newVnode.text === oldVnode.text) {
                // 若新老虚拟节点的text相同，则啥也不做
                return;
            }else{
                // 若新老虚拟节点的text不同，则将老虚拟节点的innerText设为新虚拟节点的text
                // 则无论老虚拟节点是否有children，都将被覆盖
                oldVnode.elm.innerText = newVnode.text;
            }
        }else{
            // 若新虚拟节点没有text属性，则说明有children属性
            if(oldVnode.children&&oldVnode.children.length>0){
                // 若老虚拟节点有children属性，则说明无text属性
                // 此时是最复杂的情况，新老虚拟节点都有children

            }else{
                // 若老虚拟节点无children属性，则说明老虚拟节点有text，是文字节点
                // 清空老虚拟节点的text
                oldVnode.elm.innerHTML = '';
                // 遍历新虚拟节点的children，创建DOM，上树
                for(let item of newVnode.children){
                    let dom = createElm(item)
                    oldVnode.elm.appendChild(dom);
                }
            }
        }

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
