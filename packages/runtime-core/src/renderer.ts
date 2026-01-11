import { createAppAPI } from "./apiCreateApp"


export function createRenderer(option: any) {
    // render: 渲染入口 调用 patch，处理挂载逻辑
    function render(vnode: any, container: any) {
        patch(null, vnode, container)
    }

    //patch: 核心 Diff 算法入口
    // n1 旧VNode（虚拟节点树）- null 表示挂载
    // 表现形式上是节点但有children变量本质就是VNode树
    // n2 新VNode（虚拟节点树）
    // contianer 容器 - 就是挂载的div
    function patch(n1: any, n2: any, container: any) {
        //等待实现
        console.log("Patch 逻辑被触发, 开始处理 VNode:", n2);
    }

    return {
        createApp: createAppAPI(render)
    }
}