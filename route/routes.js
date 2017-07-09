var ctrl = require('../ctrl/renderCtrl')
module.exports = function(router) {
	router.all('**/*', ctrl.proxyStart)
}