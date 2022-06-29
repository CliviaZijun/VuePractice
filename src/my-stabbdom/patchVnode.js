import createElm from "./createElm";
import updateChildren from "./updateChildren";

export default function patchVnode(oldVnode,newVnode){
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
            
            // updateChildren()
            // 此时oldVnode.elm和newVnode.elm是同一个elm
            updateChildren(oldVnode.elm,oldVnode.children,newVnode.children);
           /*  // 首个未处理的节点
            let unvisitied_index = 0;
            for(let i=0; i<newVnode.children.length;i++){
                let new_item = newVnode.children[i];
                let flag = false;//是否遍历过
                // 再次遍历，看oldVnode中有没有节点是跟它一样的
                for(let j=0; j<oldVnode.children.length;j++){
                    let old_item = oldVnode.children[j];
                    if(old_item.sel === new_item.sel && old_item.key === new_item.key){
                        flag = true;
                        unvisitied_index = j+1;
                    }

                }
                if(!flag){
                    console.log(new_item)
                    let dom = createElm(new_item);
                    if(unvisitied_index<oldVnode.children.length){
                        oldVnode.elm.insertBefore(dom,oldVnode.children[unvisitied_index].elm)
                    }else{
                        oldVnode.elm.appendChild(dom);
                    }
                }
                // 但删除、更新、修改顺序之类的就不好处理了，所以这种方法不是最优解。
            
            } */

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
}
