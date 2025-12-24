import { ReactiveEffect } from "./effect"
import { trackRefValue, triggerRefValue } from "./ref"

/**
 * ComputedRefImp类
 */
class ComputedRefImp {
    private _getter: Function
    private _dirty: Boolean = true
    private _value: any //缓存结果
    private _effct: ReactiveEffect
    //value 就是需要对getter函数结果值进行拦截
    readonly __v_isRef = true //让proxyRefs识别，避免模板中写.value
    readonly dep?: Set<ReactiveEffect>;

    constructor(getter: Function) {
        this.dep = new Set<ReactiveEffect>()

        this._getter = getter
        this._effct = new ReactiveEffect(this._getter, () => {
            if (!this._dirty) this._dirty = true

            //同时相应外层的依赖
            triggerRefValue(this)
        })
    }

    get value() {
        trackRefValue(this) // 让effect(() => computed变量) 收集这个依赖

        if (this._dirty) { //如果是dirty
            this._value = this._effct.run()
            this._dirty = false
        }
        return this._value //否则返回缓存值
    }
}

export function computed(getter: Function) {
    return new ComputedRefImp(getter)
}