// 两个不同应用提供的接口
var googleMap = {
    show: () => { console.log("渲染谷歌地图") }
}
var baiduMap = {
    display: () => { console.log("渲染百度地图") }
}

// 此时只有一个写好的render函数
function render(map: any) {
    map.show()
}

// 因为我们最好不要修改第三方提供的接口  所以只能编写百度地图适配器
var baiduMapAdapter = {
    show: () => { baiduMap.display() }
}

// 即可使用render函数执行
render(googleMap)
render(baiduMapAdapter)




// 使用适配器模式增强原生fs模块  使其记录所有读取过的文件
import fs from "fs"

type StoredFiles = Set<string>

const files: StoredFiles = new Set<string>()

function createFSAdapter(files: StoredFiles) {
    return {
        readFile(filename: string, options: any, callback: Function) {
            // 记录文件
            files.add(filename)

            // 使用参数判断是否进行函数重载
            if (typeof options === 'function') {
                callback = options
                options = {}
            }

            return fs.readFile(filename, options, callback)
        },

        writeFile(filename: string, content: string, options: any, callback: Function) {
            // 记录文件
            files.add(filename)

            // 使用参数判断是否进行函数重载
            if (typeof options === 'function') {
                callback = options
                options = {}
            } else if (typeof options === 'string') {
                options = { encoding: options }
            }

            return fs.writeFile(filename, content, options, callback)
        }
    }
}


const fs = createFSAdapter(files)