import Layout from '@/layout'
// 将返回的路由列表，根据id对应关系生成对应的树形
function formatRouterTree(data) {
    let parents = data.filter((p) => p.pid == 0),
        children = data.filter((c) => c.pid != 0)

    dataToTree(parents, children)

    function dataToTree(parents, children) {
        parents.map((p) => {
            children.map((c, i) => {
                if (c.pid == p.id) {
                    // 深拷贝一份children
                    let _c = JSON.parse(JSON.stringify(children))
                    // 切分子级，splice之后 _c 会变化
                    _c.splice(i, 1);
                    // 由于遍历是一个对象，所以需要加 []将其作为一个数组
                    dataToTree([c], _c)

                    if (p.children) {
                        p.children.push(c)
                    } else {
                        p.children = [c]
                    }
                }
            })
        })
    }
    return parents;
}

// 路由转换

function generateRouter(userRouters) {
    let newRoutes = userRouters.map((r) => {
        var routes = ''
        if (!r.children) {
            routes = {
                path: r.path,
                name: r.name,
                component: (resolve) => require([`@/views/${r.name}/index`], resolve),
                meta: { title: r.title, icon: 'dashboard' }
            }
        }

        if (r.children) {
            routes = {
                path: r.path,
                name: r.name,
                component: Layout,
                meta: { title: r.title, icon: 'dashboard' }
            }
            routes.children = generateRouter(r.children)
        }
        return routes
    });
    return newRoutes
}
export {
    generateRouter,
    formatRouterTree
}
