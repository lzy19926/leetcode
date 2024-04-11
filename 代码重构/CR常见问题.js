
const getUserInfo = async () => {
  try {
    const userInfo = fetch("api/getUserInfo")
  } catch (err) {
    // 为了避免报错的空白catch
  }
}

// 错误
const getInfo = (name, age, sex) => { }
// 正确
const getInfo2 = (options) => {
  const { name, age, sex } = options
}
// 错误
class User {
  userName = "张三"
  userAge = 18
}
// 正确
class User2 {
  name = "张三"
  age = 18
}




