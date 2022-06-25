// 真正创建节点，将vnode创建为DOM，但是是孤儿节点，不进行插入
export default function createElm(vnode){
    console.log('目的是把虚拟节点',vnode,'真正地变为DOM，但是不插入');
    // 该节点当前还是孤儿节点
    let domNode = document.createElement(vnode.sel);
    // 有子节点还是有文本？
    if(vnode.text!=='' && (vnode.children === undefined || vnode.children.length === 0)){
        // text非空且children为空，即内部是文字
        domNode.innerText = vnode.text;
        // 文本节点的上树在patch中 
    }else if(Array.isArray(vnode.children) && vnode.children.length>0){
        // 内部是子节点，就要递归创建节点
        for(let i=0;i<vnode.children.length;i++){
            // 得到当前这个children，创建出它的DOM，一旦调用createElm意味着：
            //      创建出DOM了，并且它的elm属性就指向了创建出的DOM，但是还没有上树，是一个孤儿节点
            let childrenDom = createElm(vnode.children[i]);
            // 上树
            domNode.appendChild(childrenDom)
        }
    }
    // 补充elm属性（真正的DOM节点）
    vnode.elm = domNode;
    return vnode.elm
}