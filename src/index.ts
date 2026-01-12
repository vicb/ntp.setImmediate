export default {
	async fetch(request, env, ctx): Promise<Response> {

		const ntp = require('node:timers/promises');
		ntp.setImmediate = () => console.log('setImmediate called');
		ntp.setImmediate();

		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
