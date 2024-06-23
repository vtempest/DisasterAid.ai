
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const MONGODB_URL: string;
	export const MONGODB_DB_NAME: string;
	export const MONGODB_DIRECT_CONNECTION: string;
	export const COOKIE_NAME: string;
	export const HF_TOKEN: string;
	export const HF_API_ROOT: string;
	export const OPENAI_API_KEY: string;
	export const ANTHROPIC_API_KEY: string;
	export const CLOUDFLARE_ACCOUNT_ID: string;
	export const CLOUDFLARE_API_TOKEN: string;
	export const COHERE_API_TOKEN: string;
	export const HF_ACCESS_TOKEN: string;
	export const YDC_API_KEY: string;
	export const SERPER_API_KEY: string;
	export const SERPAPI_KEY: string;
	export const SERPSTACK_API_KEY: string;
	export const USE_LOCAL_WEBSEARCH: string;
	export const SEARXNG_QUERY_URL: string;
	export const AWS_BEDROCK_ACCESS_KEY_ID: string;
	export const AWS_BEDROCK_SECRET_ACCESS_KEY: string;
	export const WEBSEARCH_ALLOWLIST: string;
	export const WEBSEARCH_BLOCKLIST: string;
	export const WEBSEARCH_JAVASCRIPT: string;
	export const OPENID_CONFIG: string;
	export const OPENID_CLIENT_ID: string;
	export const OPENID_CLIENT_SECRET: string;
	export const OPENID_SCOPES: string;
	export const OPENID_NAME_CLAIM: string;
	export const OPENID_PROVIDER_URL: string;
	export const OPENID_TOLERANCE: string;
	export const OPENID_RESOURCE: string;
	export const USE_CLIENT_CERTIFICATE: string;
	export const CERT_PATH: string;
	export const KEY_PATH: string;
	export const CA_PATH: string;
	export const CLIENT_KEY_PASSWORD: string;
	export const REJECT_UNAUTHORIZED: string;
	export const TEXT_EMBEDDING_MODELS: string;
	export const MODELS: string;
	export const OLD_MODELS: string;
	export const TASK_MODEL: string;
	export const PARQUET_EXPORT_DATASET: string;
	export const PARQUET_EXPORT_HF_TOKEN: string;
	export const ADMIN_API_SECRET: string;
	export const PARQUET_EXPORT_SECRET: string;
	export const RATE_LIMIT: string;
	export const MESSAGES_BEFORE_LOGIN: string;
	export const APP_BASE: string;
	export const LLM_SUMMERIZATION: string;
	export const EXPOSE_API: string;
	export const ENABLE_ASSISTANTS: string;
	export const ENABLE_ASSISTANTS_RAG: string;
	export const REQUIRE_FEATURED_ASSISTANTS: string;
	export const ENABLE_LOCAL_FETCH: string;
	export const ALTERNATIVE_REDIRECT_URLS: string;
	export const WEBHOOK_URL_REPORT_ASSISTANT: string;
	export const ALLOWED_USER_EMAILS: string;
	export const USAGE_LIMITS: string;
	export const ALLOW_INSECURE_COOKIES: string;
	export const METRICS_PORT: string;
	export const LOG_LEVEL: string;
	export const ALLUSERSPROFILE: string;
	export const APPDATA: string;
	export const CAPACITOR_ANDROID_STUDIO_PATH: string;
	export const ChocolateyInstall: string;
	export const ChocolateyLastPathUpdate: string;
	export const ChocolateyToolsLocation: string;
	export const CHROME_CRASHPAD_PIPE_NAME: string;
	export const CMD_DURATION_MS: string;
	export const COLORTERM: string;
	export const CommonProgramFiles: string;
	export const CommonProgramW6432: string;
	export const COMPUTERNAME: string;
	export const ComSpec: string;
	export const CUDA_PATH: string;
	export const CUDA_PATH_V11_8: string;
	export const CUDA_PATH_V12_5: string;
	export const CURRENT_FILE: string;
	export const DIRS_POSITION: string;
	export const DriverData: string;
	export const EDITOR: string;
	export const EFC_28904: string;
	export const FILE_PWD: string;
	export const GIT_ASKPASS: string;
	export const HOMEDRIVE: string;
	export const HOMEPATH: string;
	export const LANG: string;
	export const LAST_EXIT_CODE: string;
	export const LOCALAPPDATA: string;
	export const LOGONSERVER: string;
	export const NODE: string;
	export const NODE_ENV: string;
	export const npm_config_local_prefix: string;
	export const npm_config_user_agent: string;
	export const npm_execpath: string;
	export const npm_lifecycle_event: string;
	export const npm_node_execpath: string;
	export const npm_package_json: string;
	export const npm_package_name: string;
	export const npm_package_version: string;
	export const NUMBER_OF_PROCESSORS: string;
	export const NU_LOG_DATE_FORMAT: string;
	export const NU_LOG_FORMAT: string;
	export const NU_VERSION: string;
	export const NVTOOLSEXT_PATH: string;
	export const OneDrive: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const OS: string;
	export const Path: string;
	export const PATHEXT: string;
	export const PNPM_HOME: string;
	export const PROCESSOR_ARCHITECTURE: string;
	export const PROCESSOR_IDENTIFIER: string;
	export const PROCESSOR_LEVEL: string;
	export const PROCESSOR_REVISION: string;
	export const ProgramData: string;
	export const ProgramFiles: string;
	export const ProgramW6432: string;
	export const PROMPT_INDICATOR: string;
	export const PROMPT_MULTILINE_INDICATOR: string;
	export const PSModulePath: string;
	export const PUBLIC: string;
	export const PWD: string;
	export const SESSIONNAME: string;
	export const STARSHIP_SESSION_KEY: string;
	export const STARSHIP_SHELL: string;
	export const SystemDrive: string;
	export const SystemRoot: string;
	export const TEMP: string;
	export const TERM_PROGRAM: string;
	export const TERM_PROGRAM_VERSION: string;
	export const TMP: string;
	export const USERDOMAIN: string;
	export const USERDOMAIN_ROAMINGPROFILE: string;
	export const USERNAME: string;
	export const USERPROFILE: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const windir: string;
	export const ZES_ENABLE_SYSMAN: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	export const PUBLIC_ORIGIN: string;
	export const PUBLIC_SHARE_PREFIX: string;
	export const PUBLIC_GOOGLE_ANALYTICS_ID: string;
	export const PUBLIC_PLAUSIBLE_SCRIPT_URL: string;
	export const PUBLIC_ANNOUNCEMENT_BANNERS: string;
	export const PUBLIC_APPLE_APP_ID: string;
	export const PUBLIC_APP_NAME: string;
	export const PUBLIC_APP_ASSETS: string;
	export const PUBLIC_APP_COLOR: string;
	export const PUBLIC_APP_DESCRIPTION: string;
	export const PUBLIC_APP_DATA_SHARING: string;
	export const PUBLIC_APP_DISCLAIMER: string;
	export const PUBLIC_APP_DISCLAIMER_MESSAGE: string;
	export const PUBLIC_VERSION: string;
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		MONGODB_URL: string;
		MONGODB_DB_NAME: string;
		MONGODB_DIRECT_CONNECTION: string;
		COOKIE_NAME: string;
		HF_TOKEN: string;
		HF_API_ROOT: string;
		OPENAI_API_KEY: string;
		ANTHROPIC_API_KEY: string;
		CLOUDFLARE_ACCOUNT_ID: string;
		CLOUDFLARE_API_TOKEN: string;
		COHERE_API_TOKEN: string;
		HF_ACCESS_TOKEN: string;
		YDC_API_KEY: string;
		SERPER_API_KEY: string;
		SERPAPI_KEY: string;
		SERPSTACK_API_KEY: string;
		USE_LOCAL_WEBSEARCH: string;
		SEARXNG_QUERY_URL: string;
		AWS_BEDROCK_ACCESS_KEY_ID: string;
		AWS_BEDROCK_SECRET_ACCESS_KEY: string;
		WEBSEARCH_ALLOWLIST: string;
		WEBSEARCH_BLOCKLIST: string;
		WEBSEARCH_JAVASCRIPT: string;
		OPENID_CONFIG: string;
		OPENID_CLIENT_ID: string;
		OPENID_CLIENT_SECRET: string;
		OPENID_SCOPES: string;
		OPENID_NAME_CLAIM: string;
		OPENID_PROVIDER_URL: string;
		OPENID_TOLERANCE: string;
		OPENID_RESOURCE: string;
		USE_CLIENT_CERTIFICATE: string;
		CERT_PATH: string;
		KEY_PATH: string;
		CA_PATH: string;
		CLIENT_KEY_PASSWORD: string;
		REJECT_UNAUTHORIZED: string;
		TEXT_EMBEDDING_MODELS: string;
		MODELS: string;
		OLD_MODELS: string;
		TASK_MODEL: string;
		PARQUET_EXPORT_DATASET: string;
		PARQUET_EXPORT_HF_TOKEN: string;
		ADMIN_API_SECRET: string;
		PARQUET_EXPORT_SECRET: string;
		RATE_LIMIT: string;
		MESSAGES_BEFORE_LOGIN: string;
		APP_BASE: string;
		LLM_SUMMERIZATION: string;
		EXPOSE_API: string;
		ENABLE_ASSISTANTS: string;
		ENABLE_ASSISTANTS_RAG: string;
		REQUIRE_FEATURED_ASSISTANTS: string;
		ENABLE_LOCAL_FETCH: string;
		ALTERNATIVE_REDIRECT_URLS: string;
		WEBHOOK_URL_REPORT_ASSISTANT: string;
		ALLOWED_USER_EMAILS: string;
		USAGE_LIMITS: string;
		ALLOW_INSECURE_COOKIES: string;
		METRICS_PORT: string;
		LOG_LEVEL: string;
		ALLUSERSPROFILE: string;
		APPDATA: string;
		CAPACITOR_ANDROID_STUDIO_PATH: string;
		ChocolateyInstall: string;
		ChocolateyLastPathUpdate: string;
		ChocolateyToolsLocation: string;
		CHROME_CRASHPAD_PIPE_NAME: string;
		CMD_DURATION_MS: string;
		COLORTERM: string;
		CommonProgramFiles: string;
		CommonProgramW6432: string;
		COMPUTERNAME: string;
		ComSpec: string;
		CUDA_PATH: string;
		CUDA_PATH_V11_8: string;
		CUDA_PATH_V12_5: string;
		CURRENT_FILE: string;
		DIRS_POSITION: string;
		DriverData: string;
		EDITOR: string;
		EFC_28904: string;
		FILE_PWD: string;
		GIT_ASKPASS: string;
		HOMEDRIVE: string;
		HOMEPATH: string;
		LANG: string;
		LAST_EXIT_CODE: string;
		LOCALAPPDATA: string;
		LOGONSERVER: string;
		NODE: string;
		NODE_ENV: string;
		npm_config_local_prefix: string;
		npm_config_user_agent: string;
		npm_execpath: string;
		npm_lifecycle_event: string;
		npm_node_execpath: string;
		npm_package_json: string;
		npm_package_name: string;
		npm_package_version: string;
		NUMBER_OF_PROCESSORS: string;
		NU_LOG_DATE_FORMAT: string;
		NU_LOG_FORMAT: string;
		NU_VERSION: string;
		NVTOOLSEXT_PATH: string;
		OneDrive: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		OS: string;
		Path: string;
		PATHEXT: string;
		PNPM_HOME: string;
		PROCESSOR_ARCHITECTURE: string;
		PROCESSOR_IDENTIFIER: string;
		PROCESSOR_LEVEL: string;
		PROCESSOR_REVISION: string;
		ProgramData: string;
		ProgramFiles: string;
		ProgramW6432: string;
		PROMPT_INDICATOR: string;
		PROMPT_MULTILINE_INDICATOR: string;
		PSModulePath: string;
		PUBLIC: string;
		PWD: string;
		SESSIONNAME: string;
		STARSHIP_SESSION_KEY: string;
		STARSHIP_SHELL: string;
		SystemDrive: string;
		SystemRoot: string;
		TEMP: string;
		TERM_PROGRAM: string;
		TERM_PROGRAM_VERSION: string;
		TMP: string;
		USERDOMAIN: string;
		USERDOMAIN_ROAMINGPROFILE: string;
		USERNAME: string;
		USERPROFILE: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		VSCODE_GIT_IPC_HANDLE: string;
		windir: string;
		ZES_ENABLE_SYSMAN: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		PUBLIC_ORIGIN: string;
		PUBLIC_SHARE_PREFIX: string;
		PUBLIC_GOOGLE_ANALYTICS_ID: string;
		PUBLIC_PLAUSIBLE_SCRIPT_URL: string;
		PUBLIC_ANNOUNCEMENT_BANNERS: string;
		PUBLIC_APPLE_APP_ID: string;
		PUBLIC_APP_NAME: string;
		PUBLIC_APP_ASSETS: string;
		PUBLIC_APP_COLOR: string;
		PUBLIC_APP_DESCRIPTION: string;
		PUBLIC_APP_DATA_SHARING: string;
		PUBLIC_APP_DISCLAIMER: string;
		PUBLIC_APP_DISCLAIMER_MESSAGE: string;
		PUBLIC_VERSION: string;
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
