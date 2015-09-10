/**
 * Created by yuan on 2015/9/9.
 */
function Del(name){
    this.name = name;
}
Del.prototype.setName = function(name){
    console.log(name);
}
module.exports = Del;
//return exports;