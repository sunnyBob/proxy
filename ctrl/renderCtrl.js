var request = require('request')
var PROXY_URL = "http://"
function parseUrl(url) {
	return PROXY_URL+url
}

function send(req, form) {
	var method = req.method.toLowerCase()
	var url = req.url.slice(1)
	console.log(req.ip)
	var newUrl = parseUrl(url)
	var startTime = new Date().getTime()
	return new Promise(function(resolve, reject) {
		try {
			request[method](newUrl, {form}, function(err,resp, body) {
				if(!err) {
					resolve({body,resp:resp.header})
					console.log("SendUrl:"+newUrl+" time:"+(new Date().getTime() - startTime)+"ms")
				} else {
					reject(err)
				}
			})

		} catch(e) {
			reject(e)
		}

	})
}

exports.proxyStart = async function(ctx){
	var resp = await send(ctx.req,ctx.request.body)
	for(key in resp.header) {
		ctx.set(key, header[key])
	}
	ctx.body = resp.body
}