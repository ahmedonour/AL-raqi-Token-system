export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","icon-192.png","icon-512.png"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.CFOY8tgv.js",app:"_app/immutable/entry/app.BF77ZOsA.js",imports:["_app/immutable/entry/start.CFOY8tgv.js","_app/immutable/chunks/By-VsvpK.js","_app/immutable/chunks/Cx-SMqmV.js","_app/immutable/entry/app.BF77ZOsA.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/Cx-SMqmV.js","_app/immutable/chunks/BRdh1MfX.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/payment/[id]",
				pattern: /^\/payment\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/token/[number]",
				pattern: /^\/token\/([^/]+?)\/?$/,
				params: [{"name":"number","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set(["/","/dashboard","/print-test"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
