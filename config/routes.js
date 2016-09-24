/**
 * Created by qingyun on 16/8/23.
 */
var ModelBlog = require('../model/blog');
var mongoose = require('mongoose');
var PluginUser = require('../plugin/user');
var PlugunBlog = require('../plugin/blog');
module.exports=function (app) {
    app.use(function (req, res, next) {
        //user  相当于中间健 (下面无论执行那个路由  都会先执行这个)
        var user = req.session.user;
        if(user){
            //app.locals.user可以传 user到外部
            app.locals.user = user;
        }
        else{
            app.locals.user = user;
        }
        next();
    });
    app.get('/', function (req, res, next) {
        res.render('index', {title:'Express'});
    });
    //首页
    app.get('/home',PluginUser.loginYes,PluginUser.home.get);
    //登录
    app.get('/login', PluginUser.loginNo,PluginUser.login.get);
    app.post('/login',PluginUser.login.post);
    //注册
    app.get('/reg',PluginUser.loginNo,PluginUser.reg.get);
    app.post('/reg',PluginUser.reg.post);
    //退出
    app.get('/logout',PluginUser.loginYes, PluginUser.logout.get);
    //个人信息
    app.get('/user/:_id',PluginUser.user.get);
    //发表微博
    app.get('/add',PluginUser.loginYes,PlugunBlog.add.get);
    app.post('/add',PlugunBlog.add.post);
    //微博列表
    app.get('/list',PlugunBlog.list.get);
    //微博内容
    app.get('/view/:_id',PlugunBlog.view.get);
    // //删除
    // app.get('/del/:_id',PlugunBlog.view.get);
    app.get('/del/:_id',function (req,res) {
    
        var id=mongoose.Types.ObjectId(req.params.id);
        console.log(id+"vvvvvvvvvvvvvvvvvv");
        console.log(req.params._id+"uuuuuuuuuuuuuuuuuuu");
        ModelBlog.findById(req.params._id,function (err,data) {
            if(!data){
                res.redirect('/');
            }else{
                data.remove(function () {
                    res.redirect('/list');
                })
            }
        })
    })
    //错误页面
    app.get('/error',function (req,res) {
        res.render('error', {title:'Error'});
        
    })
    app.get('/regError',function (req,res) {
        res.render('regError', {title:'Error'});

    })
};