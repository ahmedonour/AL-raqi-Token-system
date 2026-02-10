export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","icon-192.png","icon-192.svg","icon-512.svg","manifest.json","manifest.webmanifest","sw.js"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png",".json":"application/json",".webmanifest":"application/manifest+json",".js":"text/javascript"},
	_: {
		client: {start:"_app/immutable/entry/start.LR4gT-fO.js",app:"_app/immutable/entry/app.DOihs_01.js",imports:["_app/immutable/entry/start.LR4gT-fO.js","_app/immutable/chunks/B_lgM0Zy.js","_app/immutable/chunks/CBAgXpWv.js","_app/immutable/chunks/DL4xa8HJ.js","_app/immutable/entry/app.DOihs_01.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CBAgXpWv.js","_app/immutable/chunks/B5JCov3p.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
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
		prerendered_routes: new Set(["/","/dashboard"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
