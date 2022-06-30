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

    // 用于四种都没命中的情况的存储key的map
    let keyMap = null;

    while(newStartIdx<=newEndIdx && oldStartIdx<=oldEndIdx){
        // 略过已经加了undefined标记的虚拟节点
        if(oldStartVnode === undefined){
            oldStartVnode = oldCh[++oldStartIdx];
        }else if(oldEndVnode === undefined){
            oldEndVnode = oldCh[--oldEndIdx];
        }else if(newStartVnode === undefined){
            newStartVnode = newCh[++newStartIdx];
        }else if(newEndVnode === undefined){
            newEndVnode = newCh[--newEndIdx];
        }else if(isSameVnode(oldStartVnode,newStartVnode)){
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
            // 四种都没命中
            // 制作keyMap一个映射对象，降低复杂度
            if(!keyMap){
                keyMap = {};
                // 从oldStartIdx开始，到oldEndIdx结束，创建keyMap映射对象
                // 是老的没命中，所以从老的开始
                for(let i = oldStartIdx;i<oldEndIdx;i++){
                    const key = oldCh[i].key;
                    if(key){
                        keyMap[key] = i;
                    }
                }
            }
            // 寻找当前这项（newStartIdx）在keyMap中的映射的位置序号
            let curPosInOld = keyMap[newStartVnode.key];
            if(curPosInOld){
                // curPosInOld存在，说明它是原有的节点，只不过移动了位置
                let VnodeToMove = oldCh[curPosInOld];
                // patch一下看看内容是否改变
                patchVnode(VnodeToMove,newStartVnode)
                // 把这项设置为undefined，表示已经处理完了
                oldCh[curPosInOld] = undefined;
                // 移动
                parentElm.insertBefore(VnodeToMove.elm,oldStartVnode.elm);
            }else{
                // curPosInOld是undefined说明它是新增的，直接插入上树
                parentElm.insertBefore(createElm(newStartVnode),oldStartVnode.elm);
            }
            // 指针下移，只移动新前
            newStartVnode = newCh[++newStartIdx];

            console.log(keyMap)
        }
    }

    // while结束后，若新/旧中有剩余节点，处理剩余节点
    if(newStartIdx<=newEndIdx){
        // 新虚拟节点中有剩余未处理的子节点，需要新增
        console.log('待新增');
        // 放在newEndIdx后面的节点的前面（是null或已经上树的节点）

        // 原库可以这样写，阉割版不可以👇 否则before会是undefined
        // const before = newCh[newEndIdx+1]==null?null:newCh[newEndIdx+1].elm;//null不能.elm
        // 改成不用before,且👇

        // 遍历新的newCh，添加到老的没处理的之前
        for(let i=newStartIdx;i<newEndIdx+1;i++){
            // insertBefore可以自动识别null,如果是null会自动排到队尾，与appendChild一致

            // 原库可以这样写，阉割版不可以👇 否则before会是undefined
            // parentElm.insertBefore(createElm(newCh[i]),before);
            // 👇改成
            // parentElm.insertBefore(createElm(newCh[i]),oldStartVnode.elm);
            parentElm.appendChild(createElm(newCh[i]));
        }
    }else if(oldStartIdx<=oldEndIdx){
        console.log('待删除');
        // 老虚拟节点中有剩余未处理的子节点，需要删除
        for(let i=oldStartIdx;i<oldEndIdx+1;i++){
            if(oldCh[i]){//可能设成undefined了
                parentElm.removeChild(oldCh[i].elm);
                oldCh[i] = undefined;//设不设undefined都行，因为会新的虚拟节点覆盖
            }
           
        }
    }

}