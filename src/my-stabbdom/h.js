import vnode from './vnode.js';

// 低配版h函数,这个函数必须接收三个参数，缺一不可
// 相当于它的重载功能较弱
// 即，调用时形态必须是下面三种之一
/* 
  形态1 - h('div',{},'文字')
  形态2 - h('div',{},[])
  形态3 - h('div',{},h())
*/
export default function h(sel,data,c){
    // 检查参数的个数
    if(arguments.length!==3){
        throw new Error('对不起，我太拉了，咱家h函数必须传入3个参数');
    }
    if(typeof c === 'string' || typeof c === 'number'){
        // 基本类型值，说明当前调用h函数是形态1
        return vnode(sel,data,undefined,c,undefined);
    }else if(Array.isArray(c)){
        // 说明当前调用h函数是形态2
        // return vnode(sel,data,c,undefined,undefined)
        // 遍历c
        const children = [];
        for(let item of c){
            // 检查item必须是一个对象（因为返回的Vnode一定是个对象）
            if(!(typeof item === 'object' && item.hasOwnProperty('sel'))){
                throw new Error('Error！传入的数组参数中有不是h函数的刺客！')
            }//这里不用执行item，因为测试语句本身就是h(xxx)，本身已经执行了
            // 此时只需要收集好children就好了
            children.push(item);
            // console.log(children)
        }
        //循环结束了就说明children收集完毕了，此时可以返回了
        return vnode(sel,data,children,undefined,undefined)
    }else if(typeof c === 'object' && c.hasOwnProperty('sel')){
        // 说明当前调用h函数是形态3
        // 即，传入的c是唯一的children
        const children = [];
        children.push(c);
        return vnode(sel,data,children,undefined,undefined);
    }else{
        // 都不是，说明错了
        throw new Error('第三个参数好像哪里不太对？不确定 再看看');
    }
}