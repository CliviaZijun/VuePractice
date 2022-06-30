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

    // while结束后，若新/旧中有剩余节点，处理剩余节点
    if(newStartIdx<=newEndIdx){
        // 新虚拟节点中有剩余未处理的子节点，需要新增
        console.log('待新增');
        // 放在newEndIdx后面的节点的前面（是null或已经上树的节点）
        const before = newCh[newEndIdx+1]==null?null:newCh[newEndIdx+1].elm;//null不能.elm
        for(let i=newStartIdx;i<newEndIdx+1;i++){
            // insertBefore可以自动识别null,如果是null会自动排到队尾，与appendChild一致
            parentElm.insertBefore(createElm(newCh[i]),before);
        }
    }else if(oldStartIdx<=oldEndIdx){
        console.log('待删除');
        // 老虚拟节点中有剩余未处理的子节点，需要删除
        for(let i=oldStartIdx;i<oldEndIdx+1;i++){
            parentElm.removeChild(oldCh[i].elm);
            oldCh[i].elm = undefined;//设不设undefined都行，因为会新的虚拟节点覆盖
        }
    }

}