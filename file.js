/**
 * Created by yuan on 2015/9/9.
 */
//创建目录

var fs = require('fs');
makeP('mkf1/mkf2/mkf3');
function makeP(path) {
    var paths = path.split('/');
    for (var i = 1; i <= paths.length; i++) {
        var p = paths.slice(0, i).join('/');
        var exists = fs.existsSync(p);
        if (exists) {
            continue;
        } else {
            fs.mkdirSync(p);
            console.log(p + "目录创建成功")
        }
    }
}

//创建写入文件
fs.exists("./mkf1/mkf2/mkf3/write.txt", function (exists) {
    if (!exists) {
        fs.writeFile("./mkf1/mkf2/mkf3/write.txt", "这是fs.writeFile创建并写入进来的", {
            encoding: 'utf-8',
            flag: 'a+'
        }, function (err) {
            console.log("write.txt创建成功")
        });
    } else {
        fs.writeFile("./mkf1/mkf2/mkf3/write.txt", "----这是追加进来的", {encoding: 'utf-8', flag: 'a+'}, function (err) {
            console.log("write.txt追加内容成功")
        });
    }
});