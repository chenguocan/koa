const Koa=require("koa")
const Router=require("koa-router")
const mongoose=require("mongoose")
const app=new Koa()
const router=new Router()
const dbUrl=require("./config/mongoUrl").dbUrl
const users=require("./route/users")
const bodyparser=require("koa-bodyparser")
mongoose.connect(dbUrl,
    { useNewUrlParser: true,useUnifiedTopology: true } ).then(()=>{
        console.log("数据库连接成功")
    }).catch((err)=>{
        console.log(err)
    })

app.use(bodyparser());
router.get('/',async ctx=>{
    ctx.body={"msg":'首页'}
})
router.use("/api/users",users);

app.use(router.routes());
app.use(router.allowedMethods())

const port=process.env.port||5000;
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})
