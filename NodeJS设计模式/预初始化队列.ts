//@ts-nocheck



// todo 预初始化队列
// 数据库链接时会有链接延迟,如果还未成功链接数据库就进行了查询,则会报错
// 思路:
// 1. 数据库未链接时就进行了查询,先将查询封装为一个命令存入队列
// 2. 成功链接数据库后,批量执行queue中的所有查询command

//! 这种方案许多数据库驱动和ORM都在使用, 如mongoose, 无需先建立链接即可发送查询请求

import { EventEmitter } from 'events'

class MongoDB extends EventEmitter {
  connected: boolean = false
  commandsQueue = []

  constructor() { }

  // 将查询封装为命令,先存入队列
  inqueueCommand(queryString: string) {
    return new Promise((resolve, reject) => {
      const command = () => {
        this.query(queryString).then(resolve, reject)
      }
      this.commandsQueue.push(command)
    })
  }

  // 进行数据库查询 如果数据库未链接时就进行了查询,先将查询封装为一个命令存入队列
  async query(queryString: string) {
    if (!this.connected) {
      this.inqueueCommand(queryString)
    }
    else {
      console.log("真实进行数据库查询")
    }
  }

  // 进行数据库链接, 模拟网络延迟
  // 成功链接后,批量执行queue中的所有查询command
  connect() {
    setTimeout(() => {
      this.connected = true
      this.emit("connected")
      // 统一执行命令队列中的命令
      this.commandsQueue.forEach(command => command())

    }, 500);
  }
}