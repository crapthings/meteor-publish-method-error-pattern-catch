import fs from 'fs'
import { promisify } from 'util'

import axios from 'axios'

const wrongPath = '/abc/test'
const rightPath = `${process.cwd().split('.meteor')[0]}.files/test`

const props = {
  a: {},
}

const test = async function test() {
  try {

    // 未声明的变量
    // console.log(asd)

    // catch 错误
    // 但是不要用这种 判断模式写 bug 坑多 越写问题越多
    if (props.a.qcd.exc) {
      if (props.a.qcd.exc === 'a') {
        const file = readFileSyncWithPromise('asdasd')
        if (file === 'something') {
          // very bad, like callback hell, you're running logic hell, 从里边往外处理
        }
      }
    }

    //
    if (!props.a.qcd.exc)
      return // dosomething

    if (props.a.qcd.exc !== 'a')
      return //do if not equal 'a'

    //etc

    // 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽
    // 异步 function，如果方法需要 callback 的返回值，用 fiber 包裹, 或 promise
    // 如果方法不需要确定该方法是否执行成功，则可忽略
    // fs.writeFile(wrongPath, 'test', (err, resp) => {
    //   if (!err)
    //   console.log(err, resp)
    // })
    // 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽


    // 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽
    // 由于路径不存在，wrapAsync 处理报错, 被 catch 捕获
    // const filepath = writeFileSyncWithWrapAsync(wrongPath, 'test')
    // 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽


    // 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽
    // promise looks good, but 你仍然需要手动处理错误，如果你用解构的方式
    // 如果遇到这种情况 最好的方法是 封装这个 callback
    // const [err, filepath] = await new Promise(r => {
    //   return fs.writeFile(wrongPath, 'test', (err, resp) => {
    //     return err ? r([err]) : r([null, resp])
    //   })
    // })

    // if (err)
    //   throw new Meteor.Error(err)

    // console.log(err, filepath)
    // 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽


    // 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽
    // 这种 callback api 情况不返回结果，只返回错误，尽量手动用上一个方法封装
    // 你也许想要一个路径，那么这个路径就是 rightPath，你返回这个变量即可
    // 错误始终可以被捕获
    // const writeFileError = await writeFileSyncWithPromise(wrongPath, 'test')

    // if (writeFileError)
    //     throw new Meteor.Error('文件不存在')

    // console.log(rightPath)
    // 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽


    // 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽
    // 一堆 promise 在一个fn里
    // 不检查参数类型，fn 部分原生有检测，但是空内容被漏掉，这种是人为bug，better use flowtype typescript
    // const filepath = await aBunchOfFunctionsWithoutCheck(rightPath)
    // console.log(filepath)
    // 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽


    // 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽
    // 一堆 promise 在一个fn里
    // const filepath = await aBunchOfFunctions(rightPath, 'akaka')
    // console.log(filepath)
    // 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽


    // 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽
    // 如果需要返回值 you should never write this style with meteor method or publish
    const data = Meteor.call('makeUnHandle')
    console.log(data)
    // 👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽


    return 'done'

  } catch (e) {

    console.log('something happend', e)

    throw new Meteor.Error('error')

  }
}

const writeFileSyncWithWrapAsync = Meteor.wrapAsync(function (path, content, callback) {
  fs.writeFile(wrongPath, 'test', callback)
})

const writeFileSyncWithPromise = promisify(fs.writeFile)
const readFileSyncWithPromise = promisify(fs.readFile)
const removeFileSyncWithPromise = promisify(fs.unlink)

const aBunchOfFunctions = async function (filepath, content) {
  if (!filepath || !content)
    throw new Meteor.Error('filepath, content')

  if (fs.existsSync(filepath))
    await removeFileSyncWithPromise(filepath)

  await writeFileSyncWithPromise(filepath, content)
  // return await readFileSyncWithPromise(filepath + '123123123') // 插入个错误
  return await readFileSyncWithPromise(filepath)
}

const aBunchOfFunctionsWithoutCheck = async function (filepath, content) {
  await removeFileSyncWithPromise(filepath)
  await writeFileSyncWithPromise(filepath, content)
  return await readFileSyncWithPromise(filepath)
}

const makeUnHandle = async function () {
  writeFileSyncWithPromise('/eaca/asdasd/.asease/hi.txt', 'asdasd')
    .then(console.log)
    .catch(aaa)
}

process.on('unhandledRejection', console.log)

Meteor.methods({
  test,
  makeUnHandle,
})
