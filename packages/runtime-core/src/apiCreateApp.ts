
/**
 * createAppAPI:
 * 产生createApp工厂函数的工厂（高阶函数）。
 * 它的作用是接收 render 函数，然后返回真正的 createApp 函数。
 * * @param render - 由 Renderer 传入的具体渲染函数
 */
export function createAppAPI(
    render
) {
    return function createApp(rootComponent) {
        return {
            // 核心挂载方法 rootContainer 挂载的DOM对象
            mount(rootContainer) {
                // 1. rootComponent 转换为虚拟节点
                // 伪代码
                const vnode = {
                    type: rootComponent
                };
                // 2. 触发渲染核心，将vnode + rootContainer构成
                // vnode树，然后转换为真实DOM，显示在页面上
                render(vnode, rootContainer)
            }
        }
    }
}