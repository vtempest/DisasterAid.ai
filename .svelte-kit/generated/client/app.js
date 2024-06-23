export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20')
];

export const server_loads = [0,2];

export const dictionary = {
		"/": [4],
		"/assistants": [~6],
		"/assistant/[assistantId]": [~5],
		"/conversations": [~8],
		"/conversation/[id]": [~7],
		"/login": [~9],
		"/login/callback": [~10],
		"/logout": [~11],
		"/models": [12],
		"/models/[...model]": [~13],
		"/privacy": [14],
		"/r/[id]": [15],
		"/settings/(nav)": [16,[2,3]],
		"/settings/(nav)/assistants/new": [~17,[2]],
		"/settings/(nav)/assistants/[assistantId]": [~18,[2,3]],
		"/settings/(nav)/assistants/[assistantId]/edit": [~19,[2]],
		"/settings/(nav)/[...model]": [20,[2,3]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';