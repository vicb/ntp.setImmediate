Repro for <https://github.com/cloudflare/workerd/issues/5844>

You need a local build of workerd with <https://github.com/cloudflare/workerd/pull/5847> to test this with:

```
MINIFLARE_WORKERD_PATH=/path/to/bazel-bin/src/workerd/server/workerd wrangler dev
```

Sending a request to the worker errors with:

```
[wrangler:error] TypeError: Cannot assign to read only property 'setImmediate' of object '[object Module]'
    at Object.fetch (file:///Users/vberchet/code/work/immediate/src/index.ts:18:7)
```

Noe that the code comes from Next 16.1

```ts
  const ntp = require('node:timers/promises');
  ntp.setImmediate = () => console.log('setImmediate called');
  ntp.setImmediate();
```

The `require` is transpiled by ESBuild to:

```ts
// node-built-in-modules:node:timers/promises
import libDefault from "node:timers/promises";
var require_promises = __commonJS({
  "node-built-in-modules:node:timers/promises"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_performance2();
    module.exports = libDefault;
  }
});

// src/index.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_performance2();
var index_default = {
  async fetch(request, env2, ctx) {
    const ntp = require_promises();
    ntp.setImmediate = () => console.log("setImmediate called");
    ntp.setImmediate();
    return new Response("Hello World!");
  }
};
export {
  index_default as default
};
```
