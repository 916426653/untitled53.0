/**
 * Created by qingyun on 16/8/24.
 */
var ModelUser = require('../model/user');
module.exports.home={
    get:function (req,res,next) {
        res.render('home');
    }
};
//登录
module.exports.login= {
    get: function (req, res, next) {
        res.render('login', {title:'登录'});
    },
    post: function (req, res, next) {
        //得到登录的数据
        console.log(req.body);
        var postData = {
            name:req.body.name,

        };
        var resJson = {
            status:false,
            msg:''
        };
        console.log(req.body.password);
        ModelUser.findOne(postData,function (err,data) {
            if(err){
                console.log(err);
            }
            if(data){
                console.log(data.password);
                if(data.password==req.body.password){

                    req.session.user = data;
                    // '/user/'+data._id  是数据库的用户信息
                    resJson.msg = '登录成功';
                    resJson.status = true;
                    req.session.user = data;
                    res.send(resJson);
                }else {
                    resJson.msg = '密码错误';
                    resJson.status = false;
                    res.send(resJson);
                    
                }
            }else {
                resJson.msg = '没有此用户';
                resJson.status = false;
                res.send(resJson);
            }
        })
    }
};
//注册
module.exports.reg={
     get:function (req, res, next) {
         res.render('reg', {title:'注册'});
     },
    post:function (req, res, next) {
        var postData = {
            name:req.body.name,
            password:req.body.password
        };
        var resJson = {
            status:false,
            msg:''
        };
      
        ModelUser.findOne({
            name:req.body.name
        },function (err, data) {
            if(err){
                console.log(err);
            }
            //如果data 存在说明此用户已经被注册
            if(data){
                resJson.msg = "此用户已经被注册";
                res.send(resJson);
            }else{
                //创建数据
                ModelUser.create(postData, function (err, data) {
                    if(err){
                        resJson.msg = '注册异常';
                        res.send(resJson);
                    }
                    //保存用户信息
                    resJson.msg = '注册成功';
                    resJson.status = true;
                    req.session.user = data;
                    res.send(resJson);
                });
               
            }

        });

    }
};
//退出
module.exports.logout={
    get:function (req, res, next) {
        //删除用户信息
        delete req.session.user;
        //跳转地址
        res.redirect('/');
    },
    
};
//个人信息
module.exports.user={
    get:function (req, res, next) {
        var getData = {
            //req.param(‘paramName’)已经不再适用  但只是警告 还可以运行
            // _id : req.param('_id'),
            //post
            // _id1 : req.body._id,
            //get
            _id2 :req.params._id
        };
        if(getData._id2){
            ModelUser.findById(getData._id2,function (err, data) {
                if(err){
                    console.log(err);
                }
                if(data){
                    res.render('user',{
                        title:data.name+'的个人资料',
                        value:data
                    })

                }else {
                    res.send('查询不到');
                }
            });
        }else {
            res.send('不是用户')
        }
        // res.send('用户中心')
    },
}
//登陆后 才可以访问的yemian
module.exports.loginYes= function (req, res, next) {
        var user = req.session.user;
        if(!user){
            res.redirect('/login');
        }else {
            next();
        }
}
//等路后不能访问的页面
module.exports.loginNo=function (req, res, next) {
        var user = req.session.user;
    if(user){
        //跳转到个人中心
        res.redirect('/user/'+user._id);
    }else{
        next();
    }
};

