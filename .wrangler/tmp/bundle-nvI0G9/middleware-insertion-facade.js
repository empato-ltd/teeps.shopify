				import worker, * as OTHER_EXPORTS from "/Users/robertomodorcea/Desktop/TeepsMenuCloudflare/teeps.shopify/.wrangler/tmp/pages-XJJGwH/functionsWorker-0.01510449225638788.mjs";
				import * as __MIDDLEWARE_0__ from "/Users/robertomodorcea/Desktop/TeepsMenuCloudflare/teeps.shopify/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts";
import * as __MIDDLEWARE_1__ from "/Users/robertomodorcea/Desktop/TeepsMenuCloudflare/teeps.shopify/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts";
				const envWrappers = [__MIDDLEWARE_0__.wrap,__MIDDLEWARE_1__.wrap].filter(Boolean);
				const facade = {
					...worker,
					envWrappers,
					middleware: [
						__MIDDLEWARE_0__.default,__MIDDLEWARE_1__.default,
            ...(worker.middleware ? worker.middleware : []),
					].filter(Boolean)
				}
				export * from "/Users/robertomodorcea/Desktop/TeepsMenuCloudflare/teeps.shopify/.wrangler/tmp/pages-XJJGwH/functionsWorker-0.01510449225638788.mjs";

				const maskDurableObjectDefinition = (cls) =>
					class extends cls {
						constructor(state, env) {
							let wrappedEnv = env
							for (const wrapFn of envWrappers) {
								wrappedEnv = wrapFn(wrappedEnv)
							}
							super(state, wrappedEnv);
						}
					};
				

				export default facade;