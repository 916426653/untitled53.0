/**
 * Created by qingyun on 16/8/24.
 */
var ModelBlog = require('../model/blog');
module.exports.add={
    get:function (req, res, next) {
        res.render('add',{
            title:'发表'
        })
    },
    post:function (req, res, next) {
        var postData = {
            author:req.session.user._id,
            title:req.body.title,
            content:req.body.content
        };
        ModelBlog.create(postData,function (err, data) {
            if(err){
                console.log(err);
            }else{
                // res.send(data);
                res.redirect('/view/'+data._id);
            }

        });

    }
};
//删除列表
// module.exports.del={
//     get:function (req, res, next) {
//         // var getData = {
//         //     // _id:req.param('_id')
//         //     _id:req.params._id
//         // };
//
//         ModelBlog.findById(req.params._id,function (err,data) {
//             if(!data){
//                 return next('new Not found');
//             }else{
//                 data.remove(function () {
//                     res.redirect('/');
//                 })
//             }
//         })
//     }
// };
//查看微博列表
module.exports.list={
    get:function (req, res, next) {
        ModelBlog.find({},null,{sort:{_id:-1}}).populate('author').exec(function (err, data) {
            if(err){console.log(err);}
            else {
                res.render('list',{
                    title:"微博列表",
                    list:data
                });
            }
        });
    }
};
//查看微博
module.exports.view={
    get:function (req, res, next) {
        var getData = {
            _id:req.params._id
        };
        // console.log(req.params._id);
        ModelBlog.findOne(getData,function (err, data) {
            if(err){
                console.log(err);
            }
            if(data){
                res.render('view', {
                    title: data.title,
                    view: data
                });

            }else{
                res.send("不存在");
            }
        });
    }
}
