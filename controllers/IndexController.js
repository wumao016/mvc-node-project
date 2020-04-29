class IndexController {
    constructor() {

    }
    async actionIndex(ctx, next) {
        ctx.body = await ctx.render('index',{
            data:"首页"
        })
        // vue spa+mpa混用阶段         
        // ctx.body = await ctx.render('index-vue')
    }
}
module.exports = IndexController;

