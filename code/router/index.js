function historyListener(callback){
    console.log(event)
}

/**
 * 注册路由
 * @param {*} routes 
 * @param {*} mode 
 * @returns 
 */
function createRouter(routes, mode='history'){
    // 保存路由
    const matcherMap = new Map()
    for (let route of routes) {
        matcherMap.set(route.name, route)
    }

    // 添加路由
    function addRoutes(routes){
        for (let route of routes) {
            matcherMap.set(route.name, route)
        }
    }

    // 删除路由
    function removeRoutes(routes){
        for (let route of routes) {
            matcherMap.delete(route.name)
        }
    }

    // 获取路由
    function getRoutes(){
        return matcherMap
    }

    // 获取路由
    function getRoute(name){
        return matcherMap.get(name)
    }

    // 开始监听路由
    function setupListeners(){
        
    }

    const router = {
        addRoutes,
        removeRoutes,
        getRoutes,
        getRoute
    }

    return router
}