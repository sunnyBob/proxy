var koa = require('koa')
, Router = require('koa-router')
, server = require('koa-static')
, bodyParser = require('koa-bodyparser')
, views = require('koa-views')
, convert = require('koa-convert')
, routes = require('../route/routes')
, path = require('path')

var app = new koa()
var router = new Router()


app.use(convert(server('static')))
app.use(bodyParser())
app.use(views("view", {
	map: {
		html: 'nunjucks'
	}
}))

routes(router)
app.use(router.routes())

app.listen('8088', function() {
	console.log("server start at 127.0.0.1:8088")
})
