import patchVnode from "./patchVnode";
import createElm from "./createElm";

// sameVnode
function isSameVnode(node1,node2){
    return (node1.sel === node2.sel && node1.key === node2.key)
}

export default function updateChildren(parentElm,oldCh,newCh){
    console.log('我是updateChildren');
    console.log(oldCh,newCh);
    // 定义四个指针：旧前、新前、旧后、新后
    let oldStartIdx = 0,newStartIdx = 0,oldEndIdx = oldCh.length-1, newEndIdx = newCh.length-1;
    // 四个指针对应的节点
    let oldStartVnode = oldCh[oldStartIdx],newStartVnode=newCh[newStartIdx],oldEndVnode=oldCh[oldEndIdx],newEndVnode=newCh[newEndIdx];

    while(newStartIdx<=newEndIdx && oldStartIdx<=oldEndIdx){
        if(isSameVnode(oldStartVnode,newStartVnode)){
            // 旧前新前命中
            console.log('1命中');
            patchVnode(oldStartVnode,newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }else if(isSameVnode(oldEndVnode,newEndVnode)){
            // 旧后新后命中
            console.log('2命中');
            patchVnode(oldEndVnode,newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }else if(isSameVnode(oldStartVnode,newEndVnode)){
            // 旧前新后命中
            console.log('3命中');
            patchVnode(oldStartVnode,newEndVnode);
            // 移动节点：插入一个已经在DOM树上的节点，它就会被移动
            parentElm.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];

        }else if(isSameVnode(oldEndVnode,newStartVnode)){
            // 旧后新前命中
            console.log('4命中');
            patchVnode(oldEndVnode,newStartVnode);
            parentElm.insertBefore(oldEndVnode.elm,oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }else{
            // 都没命中
        }
    }
}