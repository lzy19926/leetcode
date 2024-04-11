//@ts-nocheck

// 插件就是一种依赖导致原则的实现
// 也可以是一种依赖注入

// 定义一个工具类(上层),  通过注入子模块(下层),给上层提供对应的功能
// 如当前提供Common和Share功能

// 父类只需要关注它的接口如何定义,定义两个功能(Common和Share)

export interface IBasePlugin {
  init: (mode) => void;
  [key: string]: any;
}

interface IToolInterface {
  share?: ModeShare;
  comment?: ModeComment;
}

class SharePlugin implements IBasePlugin {
  init(mode: Mode) {
    mode['share'] = this.shareToWx;
  }
  shareToWx() {
    console.log('分析至微信...');
  }
}

class CommentPlugin implements IBasePlugin {
  init(mode: Mode) {
    mode['comment'] = this.startComment;
  }
  startComment() {
    console.log('评论...');
  }
}

// 初始化时会执行所有子类的init方法,将对应的子类功能注入到父类中
class Tool {
  static deps = {};

  constructor() {
    Object.values(Mode.deps).forEach((item: IBaseMode) => {
      item.init(this);
    })
  }
  static inject<T>(dep: T) {
    Mode.deps[dep.constructor.name] = dep;
  }
}

// 首先给父类注入两个子类实例(依赖)
// 然后实例化父类,父实例中就有了两个子类的方法可调用
// 如果想新增功能,只需要新创建一个子类,修改父类接口即可, 不需要修改父类代码
Tool.inject<ModeShare>(new SharePlugin());
Tool.inject<ModeComment>(new CommentPlugin());
const tool: IToolInterface = new Tool();
tool.startComment();
tool.shareToWx();

export default Mode;