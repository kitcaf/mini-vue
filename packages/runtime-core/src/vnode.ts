

/**
 * createVNode
 * @param type 
 * @param props 
 * @param children 
 */
export function createVNode(type: any, props?: any, children?: any) {
    const vnode = {
        type, // 组件对象类型 或 HTML 标签名 (如 'div')
        props, // 属性
        children, // 子节点
        el: null // 将来挂载的真实节点
    }
    return vnode
}