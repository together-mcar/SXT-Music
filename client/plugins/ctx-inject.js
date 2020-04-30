// 用于asyncData钩子捕捉错误
// 用法：可以catch (err) { ctx.$errorHandler(err) }
export default (ctx, inject) => {
  ctx.$errorHandler = err => {
    try {
      const res = err.response.data
      if (res) {
        ctx.error({ statusCode: 500, message: res.resultInfo })
      } else {
        ctx.error({ statusCode: 500, message: 'Somthing is wrong' })
      }
      console.log('－－－ctx.$errorHandler－－－')
    } catch {
      console.log('＋＋＋ctx.$errorHandler＋＋＋')
      ctx.error({ statusCode: 500, message: 'Somthing is wrong' })
    }
  }
}
