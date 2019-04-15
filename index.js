var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: 'myhashsecret' })

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(9999)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
    let {name,ref} = event.payload.repository
    console.log('Received a push event for %s to %s', name, ref)
    runDeployBash(name,ref)
})

handler.on('issues', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})

function runDeployBash(name,ref){
    let exec = require("child_process").exec
    let cmd = `./deploy.sh ${name} ${ref}`
    exec(cmd,(error,stdout,stderr)=>{
        if(error){
            console.log(`执行出错：${cmd}`)
            return
        }
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
    })
}