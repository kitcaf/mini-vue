/**
 * Effect 上下文
 * 依赖收集与派发更新算法
 */

//1. 全局变量
let activatEffect: null | ReactiveEffect //指针

let targetMap = new WeakMap() //依赖图谱

//2.ReactiveEffect类
/**
 * 副作用函数
 */
export class ReactiveEffect {
    private _fn: Function
    private deps: any[] = [] //

    constructor(fn: Function) {
        this._fn = fn
    }

    fun() {
        //记录当前创建的ReactiveEffect对象
        activatEffect = this
        //调用函数 - 里面如果访问了响应式对象收集ReactiveEffect依赖
        this._fn()
        //制空
        activatEffect = null
    }
}

