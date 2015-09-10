var http = require('http');
var mime = require('mime');// npm install mime
var fs = require('fs');
var path = require('path');


deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
//fs.unlink(path[,callback])或者fs.unlinkSync(path)

http.createServer(function(req,res){
    var url = req.url;
    var urls = url.split("?");
    var reqName = urls[0];
    var query = urls[1];
    var queryObj = {};
    if(query){
        var fields  = query.split('&');
        fields.forEach(function(field){
            var vals = field.split('=');//age=3
            queryObj[vals[0]] = vals[1];
        })
    }
    //获取文件的路径
    var filePath = path.resolve();//e:\yuan\21px\homework

    //icon请求忽略
    if (req.url == '/favicon.ico') {
        res.end();
        return;
    }

    if (reqName == '/del') {
        var name  = queryObj['path'].substring(1,queryObj['path'].length);
        fs.exists(name, function (exists) {
            if(exists){
                if(fs.statSync(name).isDirectory()){
                    deleteFolderRecursive(name);
                }else{
                    fs.unlinkSync(name);
                }
                var button = '<link rel="stylesheet" href="/css/style.css"/><a href="javascript:" class="tipbutn" onclick="self.location=document.referrer;">返回上一页并刷新</a>';

                res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
                res.end(button+'删除'+name+'成功');
                return;
            }else{
                res.writeHead(404, {"Content-Type": "text/html"});
                res.end('文件不存在或已被删除');return;
            }
        });
        return;
    }

    //系统份文件分隔符
    //var sep=path.sep;

    //访问请求的文件地址标准化
    var reqPath = path.normalize(req.url);// \
    // var reqPath =req.url;

    //获取当文件的路径
    var pathname = path.join(filePath, reqPath);//e:\yuan\21px\homework\

    //判断文件是否存在
    fs.exists(pathname, function (exists) {

        if(exists){

            var ulTop = '<link rel="stylesheet" href="/css/style.css"/><h1>HomeWork</h1><ul class="wrapper">';

            var addStr = '';

            if (fs.statSync(pathname).isDirectory()) {

                res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});

                fs.readdir(pathname,function(err,file){

                    for(var i = 0;i<file.length;i++) {

                        if (pathname != filePath) {

                            pathname = pathname.replace(filePath, "");

                        }

                        var pathJoin = path.join(pathname, file[i]).replace(/\\/g, "/");

                        if(path.extname(file[i])){
                            addStr += '<li class="file"><a href="'+pathJoin+'">'+file[i]+'</a><span><a href="/del?path='+pathJoin+'">Del</a></span></li>';
                        }else{
                            addStr += '<li class="dir"><a href="'+pathJoin+'">'+file[i]+'</a><span><a href="/del?path='+pathJoin+'">Del</a></span></li>';
                        }

                    }

                    res.end(ulTop+addStr+'</ul>');

                });


            }else{
                res.setHeader('Content-Type',mime.lookup(pathname));

                fs.exists(pathname,function(exists){
                    if(exists){
                        fs.readFile(pathname,{flag: "r"},function(err,data){
                            if(err){
                                res.end(err);
                            }else{
                                res.end(data);
                            }
                        });
                    }else{
                        res.writeHead(404, {"Content-Type": "text/html"});
                        res.end('404你访问的路径不存在');
                    }
                });
            }
        }else{
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end('404你访问的路径不存在');
        }
    });

}).listen(8000);