// pm2的“生态系统文件”

module.exports = {
    apps: [{
        name: "github-auto-deploy",
        script: __dirname+"/index.js",
        output: __dirname+"/log/out.log",
        error:  __dirname+"/log/error.log"
    }]
}