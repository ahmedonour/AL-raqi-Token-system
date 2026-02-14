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
		client: {start:"_app/immutable/entry/start.B8vlg7rB.js",app:"_app/immutable/entry/app.YmCkAAw7.js",imports:["_app/immutable/entry/start.B8vlg7rB.js","_app/immutable/chunks/BcLYq_V8.js","_app/immutable/chunks/CCedcCd3.js","_app/immutable/chunks/BtGFON0Z.js","_app/immutable/entry/app.YmCkAAw7.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CCedcCd3.js","_app/immutable/chunks/CcVvRlv2.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/payment/[id]",
				pattern: /^\/payment\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/token/[number]",
				pattern: /^\/token\/([^/]+?)\/?$/,
				params: [{"name":"number","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
