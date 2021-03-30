import {removeToken} from '@/utils/auth'
export class Store {
    constructor(name) {
        this.name = name
    }
    // 设置
    setItem(params) {
        let obj = {
            name: '',
            value: '',
        }
        let options = {}
        Object.assign(options, obj, params)
        // 判断参数中是否包含过期时间
        if (options.expires) {
            localStorage.setItem(options.name, JSON.stringify(options))
        } else {
            // 判断value的类型
            let type = Object.prototype.toString.call(options.value)
            //如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
            if (type == '[object Object]') {
                options.value = JSON.stringify(options.value);
            }
            if (type == '[object Array]') {
                options.value = JSON.stringify(options.value);
            }
            localStorage.setItem(options.name, options.value);
        }
    }
    // 获取
    getItem(name) {
        let item = localStorage.getItem(name) 
        if(!item) {
            return ''
        }
        //先将拿到的试着进行json转为对象的形式
        try {
            item = JSON.parse(item);
        } catch (error) {
            //如果不行就不是json的字符串，就直接返回
            item = item;
        }
        // 判断对象是否有开始时间
        if (item.expires) {
            if (item.expires < new Date().getTime()) {
                // 缓存过期 清除缓存，返回 false
                localStorage.removeItem(name)
                removeToken()
                return false
            } else {
                // 未过期
                return item
            }
        } else {
            // 未设置过期时间，直接返回item
            return item
        }
    }
    // 移除缓存
    removeItem(name) {
        localStorage.removeItem(name)
    }
    // 移除全部缓存
    clear() {
        console.log(11111111)
        localStorage.clear()
    }
}
