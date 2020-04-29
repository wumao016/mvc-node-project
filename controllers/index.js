const router = require('koa-simple-router');
const BooksController = require("@controllers/BooksController");
const IndexController = require("@controllers/IndexController");
const ApiController = require("@controllers/ApiController");
const booksController = new BooksController();
const apiController = new ApiController();
const indexController = new IndexController();
module.exports = app => {
    app.use(router(_ => {
        _.get('/', indexController.actionIndex);
         _.get('/index.html', indexController.actionIndex);
         _.get('/books/list', booksController.actionIndex)
		//spa
        // _.get('/api/list', apiController.actionIndex)
    }));
}
