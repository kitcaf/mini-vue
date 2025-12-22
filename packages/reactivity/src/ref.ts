import { hasChanged, isObject } from "@mini-vue/shared";
import { ReactiveEffect, trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";

//packages/reactivity/src/ref.ts
class RefImpl {
    private _value: any;
    /**
     * _rawValue保留最原始的数据；Proxy 对象不等于被代理的原生对象
     * 如果返回的Proxy 对象，那么rawValue就是被代理的原生对象
     * 
     * 如果不怎么写？
     * const obj = { foo: 1 };
     * const r = ref(obj);
     * r.value = obj; //重新赋值同一个对象，但是set不认为是同一个对象
     * Proxy 对象不等于被代理的原生对象不相同，导致组件重新渲染
     */
    private _rawValue: any;
    public dep?: Set<ReactiveEffect>;

    constructor(value: any) {
        this._rawValue = value

        //直接改引用，get value直接就是指向响应式对象
        this._value = convert(value)
        this.dep = new Set<ReactiveEffect>()
    }

    get value() {
        //收集依赖，不需要全局 targetMap 查找，直接收集到 this.dep
        trackRefValue(this)
        return this._value
    }

    set value(newValue) {
        // 先看看值变了没，变了才触发
        if (hasChanged(newValue, this._rawValue)) {
            this._rawValue = newValue
            this._value = convert(newValue)
            triggerRefValue(this)
        }
    }
}

function trackRefValue(ref: RefImpl) {
    trackEffects(ref.dep!)
}

function triggerRefValue(ref: RefImpl) {
    triggerEffects(ref.dep!);
}

// 如果是对象那么转换为reactive
function convert(value: any) {
    return isObject(value) ? reactive(value) : value;
}

export function ref(value: any) {
    return new RefImpl(value);
}



