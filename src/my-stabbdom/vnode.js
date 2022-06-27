// 函数的功能非常简单，就是把传入的六个参数组合成对象返回
export default function vnode(sel,data,children,text,elm){
    const key = data.key;
    return {
        sel,data,children,text,elm,key
        /* 
        //其实就是👇
        sel:sel,
        data:data,
        children:children,
        text:text,
        elm:elm,
        */
    };
}
// 不用写key?