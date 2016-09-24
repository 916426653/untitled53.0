/**
 * Created by qingyun on 16/8/23.
 */
//创建数据
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true//排序方式最新的在上面
        // 名字在数据库里是唯一的(要重新开数据库)
    },
    password:String
})
module.exports = mongoose.model('user',userSchema);