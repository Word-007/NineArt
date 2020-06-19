
var path = require("path")
var glob = require("glob")

module.exports = {
	mode: "development", //打包为开发模式
	entry: {
		app:glob.sync("./public/script/app/*.js"),
		apps:glob.sync("./public/script/apps/*.js"),
		cart:glob.sync("./public/script/cart/*.js"),
		comm:glob.sync("./public/script/comm/*.js"),
		index:glob.sync("./public/script/index/*.js"),
	},
	output:{
		path:path.resolve(__dirname,"dist"),
		filename:"[name].js"
	}
}