/**
 * Created by qingyun on 16/8/24.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// 获得ObjectId的方法
var ObjectId = Schema.Types.ObjectId;


var blogSchema =Schema({
    // 关联 user
    author:{
        //author  的值和  user 的ObjectId 一样
        type:ObjectId,
        ref:'user'
    },
    title:String,
    content:String
});
module.exports = mongoose.model('blog',blogSchema);