// class BooksController extends Controller{
const  Books = require("@models/Books");
class ApiController {
    constructor() {
        
    }
    async actionIndex(ctx, next) {
        const books = new Books();
        const result = await books.getData();
        ctx.body = {
            result
        }
    }
}
module.exports = ApiController;