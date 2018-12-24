module.exports = function(api) {
	api.cache(false);
	let presets = [
		["@babel/preset-env", {
			targets: {
				esmodules: true
			},
			modules: false,
			loose: true
	 	}],
	 	"@babel/preset-react"
	];
	let plugins = [
		/* ["@babel/plugin-transform-runtime",
	        {
		        "helpers": false,
				"useESModules": true
	        }
	    ], */
		/* "@babel/plugin-proposal-object-rest-spread", */
		/* "@babel/plugin-proposal-decorators", */
		/* "@babel/plugin-proposal-class-properties", */
		//"babel-plugin-dynamic-import-node",
		"@babel/plugin-syntax-dynamic-import"
	];
	return {
	    presets,
	    plugins
	};
};