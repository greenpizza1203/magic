(function() {
    /**
     * Prevent this from being declared multiple times
     */
    if (window._initPendo) {
        return;
    }

    /**
     * Defines a method on `window` to initialize the Pendo.io application
     * @see https://app.pendo.io/admin/settings
     * @param {Object} visitor A subset of the user object
     * @param {Object} account Some school info
     * @param {String} apiKey The provided API key
     */
    window._initPendo = function(visitor, account, apiKey) {
        // Prevent pendo from being initialized multiple times
        if (window._pendoInitialized) {
            return;
        }

        // Pendo engine loading
        (function(p, e, n, d, o) {
            var v, w, x, y, z;
            o = p[d] = p[d] || {};
            o._q = [];
            v = ['initialize', 'identify', 'updateOptions', 'pageLoad'];
            for (w = 0, x = v.length; w < x; ++w)(function(m) {
                o[m] = o[m] || function() {
                    o._q[m === v[0] ? 'unshift' : 'push']([m].concat([].slice.call(arguments, 0)));
                };
            })(v[w]);
            y = e.createElement(n);
            y.async = !0;
            y.src = 'https://ustats-cdn.schoology.com/agent/static/' + apiKey + '/pendo.js';
            z = e.getElementsByTagName(n)[0];
            z.parentNode.insertBefore(y, z);
        })(window, document, 'script', 'pendo');

        // Call this whenever information about your visitors becomes available
        // Please use Strings, Numbers, or Bools for value types.
        pendo.initialize({
            apiKey: apiKey,
            visitor: visitor,
            account: account
        });

        // Prevent initializing pendo multiple times
        // This could occur from AJAX popups
        window._pendoInitialized = true;
    }
})();