const Koa = require('koa');
const koaBody = require('koa-body');
const fs = require('fs');
var serve = require('koa-static');
const app = module.exports = new Koa();
const PORT = 3636

app.use(serve('./dist'));
app.use(async function(ctx) {
  const body = ctx.request.body;
  const indexFile = await fs.readFileSync('./dist/index.html','utf-8')
  ctx.body = indexFile;
});

if (!module.parent) app.listen(PORT,()=>{
    console.log( 'Koa 启动成功 http://localhost:' + PORT + '; press Ctrl-C to terminate.' );
});
