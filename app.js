const moduleAlias = require('module-alias')
moduleAlias.addAliases({
  '@root': __dirname,
  '@controllers': __dirname + '/controllers',
  '@models': __dirname + '/models',
});
const Koa = require("koa");
const render = require('koa-swig');
const app = new Koa();
const { port, viewDir, staticDir } = require("./config");
const co = require('co');
const serve = require("koa-static");
const log4js = require('log4js');
const errorHandler = require("./middlewares/errorHandler");
log4js.configure({
  appenders: { cheese: { type: 'file', filename: './logs/yd.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');
//spa+mpa混用阶段 
//const { historyApiFallback } = require('koa2-connect-history-api-fallback');
app.use(serve(staticDir));
//app.use(historyApiFallback({ index: "/", whiteList: ['/api'] }));
app.context.render = co.wrap(render({
  root: viewDir,
  autoescape: true,
  cache: process.env.NODE_ENV == "development" ? false : 'memory',
  ext: 'html',
  varControls: ["[[", "]]"],
  writeBody: false
}));
errorHandler.error(app, logger);
// 路由注册中心
require("./controllers")(app);
app.listen(port, () => {
  console.log("🍺服务启动成功");
})