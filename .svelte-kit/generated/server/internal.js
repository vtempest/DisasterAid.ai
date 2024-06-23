
import root from '../root.svelte';
import { set_building } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_private_env, set_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: false,
	track_server_fetches: false,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\r\n<html lang=\"en\" class=\"h-full\">\r\n\t<head>\r\n\t\t<meta charset=\"utf-8\" />\r\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=no\" />\r\n\t\t<meta name=\"theme-color\" content=\"rgb(249, 250, 251)\" />\r\n\t\t<script>\r\n\t\t\tif (\r\n\t\t\t\tlocalStorage.theme === \"dark\" ||\r\n\t\t\t\t(!(\"theme\" in localStorage) && window.matchMedia(\"(prefers-color-scheme: dark)\").matches)\r\n\t\t\t) {\r\n\t\t\t\tdocument.documentElement.classList.add(\"dark\");\r\n\t\t\t\tdocument\r\n\t\t\t\t\t.querySelector('meta[name=\"theme-color\"]')\r\n\t\t\t\t\t.setAttribute(\"content\", \"rgb(26, 36, 50)\");\r\n\t\t\t}\r\n\r\n\t\t\t// For some reason, Sveltekit doesn't let us load env variables from .env here, so we load it from hooks.server.ts\r\n\t\t\twindow.gaId = \"%gaId%\";\r\n\t\t</script>\r\n\t\t" + head + "\r\n\t</head>\r\n\t<body data-sveltekit-preload-data=\"hover\" class=\"h-full dark:bg-gray-900\">\r\n\t\t<div id=\"app\" class=\"contents h-full\">" + body + "</div>\r\n\r\n\t\t<!-- Google Tag Manager -->\r\n\t\t<script>\r\n\t\t\tif (window.gaId) {\r\n\t\t\t\tconst script = document.createElement(\"script\");\r\n\t\t\t\tscript.src = \"https://www.googletagmanager.com/gtag/js?id=\" + window.gaId;\r\n\t\t\t\tscript.async = true;\r\n\t\t\t\tdocument.head.appendChild(script);\r\n\r\n\t\t\t\twindow.dataLayer = window.dataLayer || [];\r\n\t\t\t\tfunction gtag() {\r\n\t\t\t\t\tdataLayer.push(arguments);\r\n\t\t\t\t}\r\n\t\t\t\tgtag(\"js\", new Date());\r\n\t\t\t\t/// ^ See https://developers.google.com/tag-platform/gtagjs/install\r\n\t\t\t\tgtag(\"config\", window.gaId);\r\n\t\t\t\tgtag(\"consent\", \"default\", { ad_storage: \"denied\", analytics_storage: \"denied\" });\r\n\t\t\t\t/// ^ See https://developers.google.com/tag-platform/gtagjs/reference#consent\r\n\t\t\t\t/// TODO: ask the user for their consent and update this with gtag('consent', 'update')\r\n\t\t\t}\r\n\t\t</script>\r\n\t</body>\r\n</html>\r\n",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family:\n\t\t\t\t\tsystem-ui,\n\t\t\t\t\t-apple-system,\n\t\t\t\t\tBlinkMacSystemFont,\n\t\t\t\t\t'Segoe UI',\n\t\t\t\t\tRoboto,\n\t\t\t\t\tOxygen,\n\t\t\t\t\tUbuntu,\n\t\t\t\t\tCantarell,\n\t\t\t\t\t'Open Sans',\n\t\t\t\t\t'Helvetica Neue',\n\t\t\t\t\tsans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "s98rci"
};

export function get_hooks() {
	return import("../../../src/hooks.server.ts");
}

export { set_assets, set_building, set_private_env, set_public_env };
