//@ts-nocheck
import YAML from 'js-yaml'

// 定义策略对象的标准接口
interface ConfigStrategy {
  deserailize: Function
  serialize: Function
}

// 配置文件读取器 需要提供不同的策略对象  以解析不同类型的配置文件
class ConfigReader {
  configStrategy: ConfigStrategy

  constructor(configStrategy: any) {
    this.configStrategy = configStrategy
  }
  // 读取文件并解析为object
  async read(path: string) {
    return this.configStrategy.deserailize(await fs.readFile(path))
  }
  // 将object写回配置文件
  async writeBack(path: string, configObj: Object) {
    const content = this.configStrategy.serialize(configObj)
    return fs.writeFile(path, content, "utf-8")
  }
}

// 封装不同的策略对象 以解析不同类型的配置文件
class JsonStrategy implements ConfigStrategy {
  deserailize(data: string) {
    return JSON.parse(data)
  }
  serialize(data: any) {
    return JSON.stringify(data)
  }
}

class YamlStrategy implements ConfigStrategy {
  deserailize(data: string) {
    return YAML.safeLoad(data)
  }
  serialize(data: any) {
    return YAML.dump(data)
  }
}


// 通过映射表 根据ext 动态选择策略,定义并保存全局策略单例
const strategyMap = new Map<string, ConfigStrategy>()
strategyMap.set("json", new JsonStrategy())
strategyMap.set("yaml", new YamlStrategy())


// 最终使用
const path = "./config.json"
const ext = "json"

const strategy = strategyMap.get(ext)
const configReader = new ConfigReader(strategy)

let config = await configReader.read(path)







// 策略模式的应用 - 应当将策略算法抽离出来  以便非程序员可读懂


// 最大订单数是货物数量的110%
function makeBooking() {
  let maxBooking = storeCargoSize * 1.1
  if (bookedCargoSize > maxBooking) {
    return false
  }
}


function makeBooking_2() {
  let maxBooking = new BookStrategy().maxBooking()
  if (bookedCargoSize > maxBooking) {
    return false
  }
}

// 这里单独维护一组订单策略算法, 以文档的形式呈现给产品
class BookStrategy {
  //最大订货数量为110%
  maxBooking() {
    return storeCargoSize * 1.1
  }
}