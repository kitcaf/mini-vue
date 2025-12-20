import { mutableHandlers, readonlyHandlers } from "./baseHandlers"
import { track, trigger } from "./effect"
/**
 * ReactiveObject：
 * （1）劫持读取 (GET) - 存储依赖
 * （2）劫持修改 (SET) - 查找依赖
 */

/**
 * reactive 核心就是返回对对象的Proxy
 * @param raw 
 */
export function reactive(raw: any) {
    return createActiveObject(raw, mutableHandlers)
}

/**
 * readonlyReactive 返回readonlyReactive对象
 * @param raw 
 */
export function readonly(raw: any) {
    return createActiveObject(raw, readonlyHandlers)
}

// 抽离通用的 Proxy 创建逻辑
function createActiveObject(raw: any, baseHandlers: any) {
    return new Proxy(raw, baseHandlers);
}