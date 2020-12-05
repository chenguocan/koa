const Router=require("koa-router")
const router=new Router()
const User=require("../Modules/User")
/**
 * @route GET /api/users/test
 * @desc 接口
 *
 */
router.get("/test",async ctx=>{
    ctx.body={msg:'users......'}
})
router.post("/register",async ctx=>{
    const result=await User.find({username:ctx.request.body.username});
    console.log(result.length);
    if(result.length>0){
        ctx.status=500;
        ctx.body={msg:"用户名已存在"}
    }else{
        const newUser=new User({
            username:ctx.request.body.username,
            password:ctx.request.body.password
        })
        await newUser.save().then(()=>{
            ctx.status=200;
            ctx.body={msg:"操作成功"}
            console.log("操作成功")
        }).catch(()=>{
            ctx.status=200;
            ctx.body={msg:"添加失败"}
        })
    }
})
module.exports=router.routes();