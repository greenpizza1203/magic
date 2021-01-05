/*! [usage-duration-ui-tracker]  (c) Schoology, version: 0.6.0 - 10/14/2020 5:27:52 PM */ ! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var i = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 5)
}([function(e, t) {
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || Function("return this")() || (0, eval)("this")
    } catch (e) {
        "object" === typeof window && (n = window)
    }
    e.exports = n
}, function(e, t, n) {
    (function(t) {
        var r = n(3),
            i = "undefined" !== typeof window ? window : "undefined" !== typeof t ? t : "undefined" !== typeof self ? self : {};

        function o(e) {
            return void 0 === e
        }

        function a(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        }

        function s(e) {
            return "[object String]" === Object.prototype.toString.call(e)
        }

        function c(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }

        function u() {
            if (!("fetch" in i)) return !1;
            try {
                return new Headers, new Request(""), new Response, !0
            } catch (e) {
                return !1
            }
        }

        function l(e, t) {
            var n, r;
            if (o(e.length))
                for (n in e) h(e, n) && t.call(null, n, e[n]);
            else if (r = e.length)
                for (n = 0; n < r; n++) t.call(null, n, e[n])
        }

        function f(e, t) {
            if ("number" !== typeof t) throw new Error("2nd argument to `truncate` function should be a number");
            return "string" !== typeof e || 0 === t ? e : e.length <= t ? e : e.substr(0, t) + "\u2026"
        }

        function h(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }

        function p(e) {
            for (var t, n = [], r = 0, i = e.length; r < i; r++) s(t = e[r]) ? n.push(t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : t && t.source && n.push(t.source);
            return new RegExp(n.join("|"), "i")
        }

        function d(e) {
            var t, n, r, i, o, a = [];
            if (!e || !e.tagName) return "";
            if (a.push(e.tagName.toLowerCase()), e.id && a.push("#" + e.id), (t = e.className) && s(t))
                for (n = t.split(/\s+/), o = 0; o < n.length; o++) a.push("." + n[o]);
            var c = ["type", "name", "title", "alt"];
            for (o = 0; o < c.length; o++) r = c[o], (i = e.getAttribute(r)) && a.push("[" + r + '="' + i + '"]');
            return a.join("")
        }

        function m(e, t) {
            return !!(!!e ^ !!t)
        }

        function g(e, t) {
            if (m(e, t)) return !1;
            var n, r, i = e.frames,
                o = t.frames;
            if (void 0 === i || void 0 === o) return !1;
            if (i.length !== o.length) return !1;
            for (var a = 0; a < i.length; a++)
                if (n = i[a], r = o[a], n.filename !== r.filename || n.lineno !== r.lineno || n.colno !== r.colno || n.function !== r.function) return !1;
            return !0
        }
        var v = 3,
            y = 51200,
            _ = 40;

        function b(e) {
            return function(e) {
                return ~-encodeURI(e).split(/%..|./).length
            }(JSON.stringify(e))
        }

        function w(e) {
            if ("string" === typeof e) {
                return f(e, 40)
            }
            if ("number" === typeof e || "boolean" === typeof e || "undefined" === typeof e) return e;
            var t = Object.prototype.toString.call(e);
            return "[object Object]" === t ? "[Object]" : "[object Array]" === t ? "[Array]" : "[object Function]" === t ? e.name ? "[Function: " + e.name + "]" : "[Function]" : e
        }
        e.exports = {
            isObject: function(e) {
                return "object" === typeof e && null !== e
            },
            isError: function(e) {
                switch (Object.prototype.toString.call(e)) {
                    case "[object Error]":
                    case "[object Exception]":
                    case "[object DOMException]":
                        return !0;
                    default:
                        return e instanceof Error
                }
            },
            isErrorEvent: function(e) {
                return "[object ErrorEvent]" === Object.prototype.toString.call(e)
            },
            isDOMError: function(e) {
                return "[object DOMError]" === Object.prototype.toString.call(e)
            },
            isDOMException: function(e) {
                return "[object DOMException]" === Object.prototype.toString.call(e)
            },
            isUndefined: o,
            isFunction: function(e) {
                return "function" === typeof e
            },
            isPlainObject: a,
            isString: s,
            isArray: c,
            isEmptyObject: function(e) {
                if (!a(e)) return !1;
                for (var t in e)
                    if (e.hasOwnProperty(t)) return !1;
                return !0
            },
            supportsErrorEvent: function() {
                try {
                    return new ErrorEvent(""), !0
                } catch (e) {
                    return !1
                }
            },
            supportsDOMError: function() {
                try {
                    return new DOMError(""), !0
                } catch (e) {
                    return !1
                }
            },
            supportsDOMException: function() {
                try {
                    return new DOMException(""), !0
                } catch (e) {
                    return !1
                }
            },
            supportsFetch: u,
            supportsReferrerPolicy: function() {
                if (!u()) return !1;
                try {
                    return new Request("pickleRick", {
                        referrerPolicy: "origin"
                    }), !0
                } catch (e) {
                    return !1
                }
            },
            supportsPromiseRejectionEvent: function() {
                return "function" === typeof PromiseRejectionEvent
            },
            wrappedCallback: function(e) {
                return function(t, n) {
                    var r = e(t) || t;
                    return n && n(r) || r
                }
            },
            each: l,
            objectMerge: function(e, t) {
                return t ? (l(t, function(t, n) {
                    e[t] = n
                }), e) : e
            },
            truncate: f,
            objectFrozen: function(e) {
                return !!Object.isFrozen && Object.isFrozen(e)
            },
            hasKey: h,
            joinRegExp: p,
            urlencode: function(e) {
                var t = [];
                return l(e, function(e, n) {
                    t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n))
                }), t.join("&")
            },
            uuid4: function() {
                var e = i.crypto || i.msCrypto;
                if (!o(e) && e.getRandomValues) {
                    var t = new Uint16Array(8);
                    e.getRandomValues(t), t[3] = 4095 & t[3] | 16384, t[4] = 16383 & t[4] | 32768;
                    var n = function(e) {
                        for (var t = e.toString(16); t.length < 4;) t = "0" + t;
                        return t
                    };
                    return n(t[0]) + n(t[1]) + n(t[2]) + n(t[3]) + n(t[4]) + n(t[5]) + n(t[6]) + n(t[7])
                }
                return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                    var t = 16 * Math.random() | 0;
                    return ("x" === e ? t : 3 & t | 8).toString(16)
                })
            },
            htmlTreeAsString: function(e) {
                for (var t, n = [], r = 0, i = 0, o = " > ".length; e && r++ < 5 && !("html" === (t = d(e)) || r > 1 && i + n.length * o + t.length >= 80);) n.push(t), i += t.length, e = e.parentNode;
                return n.reverse().join(" > ")
            },
            htmlElementAsString: d,
            isSameException: function(e, t) {
                return !m(e, t) && (e = e.values[0], t = t.values[0], e.type === t.type && e.value === t.value && (n = e.stacktrace, r = t.stacktrace, (!o(n) || !o(r)) && g(e.stacktrace, t.stacktrace)));
                var n, r
            },
            isSameStacktrace: g,
            parseUrl: function(e) {
                if ("string" !== typeof e) return {};
                var t = e.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/),
                    n = t[6] || "",
                    r = t[8] || "";
                return {
                    protocol: t[2],
                    host: t[4],
                    path: t[5],
                    relative: t[5] + n + r
                }
            },
            fill: function(e, t, n, r) {
                if (null != e) {
                    var i = e[t];
                    e[t] = n(i), e[t].__raven__ = !0, e[t].__orig__ = i, r && r.push([e, t, i])
                }
            },
            safeJoin: function(e, t) {
                if (!c(e)) return "";
                for (var n = [], r = 0; r < e.length; r++) try {
                    n.push(String(e[r]))
                } catch (e) {
                    n.push("[value cannot be serialized]")
                }
                return n.join(t)
            },
            serializeException: function e(t, n, i) {
                if (!a(t)) return t;
                i = "number" !== typeof(n = "number" !== typeof n ? v : n) ? y : i;
                var o = function e(t, n) {
                    return 0 === n ? w(t) : a(t) ? Object.keys(t).reduce(function(r, i) {
                        return r[i] = e(t[i], n - 1), r
                    }, {}) : Array.isArray(t) ? t.map(function(t) {
                        return e(t, n - 1)
                    }) : w(t)
                }(t, n);
                return b(r(o)) > i ? e(t, n - 1) : o
            },
            serializeKeysForMessage: function(e, t) {
                if ("number" === typeof e || "string" === typeof e) return e.toString();
                if (!Array.isArray(e)) return "";
                if (0 === (e = e.filter(function(e) {
                        return "string" === typeof e
                    })).length) return "[object has no keys]";
                if (t = "number" !== typeof t ? _ : t, e[0].length >= t) return e[0];
                for (var n = e.length; n > 0; n--) {
                    var r = e.slice(0, n).join(", ");
                    if (!(r.length > t)) return n === e.length ? r : r + "\u2026"
                }
                return ""
            },
            sanitize: function(e, t) {
                if (!c(t) || c(t) && 0 === t.length) return e;
                var n, i = p(t),
                    o = "********";
                try {
                    n = JSON.parse(r(e))
                } catch (t) {
                    return e
                }
                return function e(t) {
                    return c(t) ? t.map(function(t) {
                        return e(t)
                    }) : a(t) ? Object.keys(t).reduce(function(n, r) {
                        return i.test(r) ? n[r] = o : n[r] = e(t[r]), n
                    }, {}) : t
                }(n)
            }
        }
    }).call(t, n(0))
}, function(e, t, n) {
    (function(t) {
        var r = n(6),
            i = "undefined" !== typeof window ? window : "undefined" !== typeof t ? t : "undefined" !== typeof self ? self : {},
            o = i.Raven,
            a = new r;
        a.noConflict = function() {
            return i.Raven = o, a
        }, a.afterLoad(), e.exports = a, e.exports.Client = r
    }).call(t, n(0))
}, function(e, t) {
    function n(e, t) {
        for (var n = 0; n < e.length; ++n)
            if (e[n] === t) return n;
        return -1
    }

    function r(e, t) {
        var r = [],
            i = [];
        return null == t && (t = function(e, t) {
                return r[0] === t ? "[Circular ~]" : "[Circular ~." + i.slice(0, n(r, t)).join(".") + "]"
            }),
            function(o, a) {
                if (r.length > 0) {
                    var s = n(r, this);
                    ~s ? r.splice(s + 1) : r.push(this), ~s ? i.splice(s, 1 / 0, o) : i.push(o), ~n(r, a) && (a = t.call(this, o, a))
                } else r.push(a);
                return null == e ? a instanceof Error ? function(e) {
                    var t = {
                        stack: e.stack,
                        message: e.message,
                        name: e.name
                    };
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                    return t
                }(a) : a : e.call(this, o, a)
            }
    }(e.exports = function(e, t, n, i) {
        return JSON.stringify(e, r(t, i), n)
    }).getSerialize = r
}, function(e, t) {
    var n, r, i;
    n = this, r = -1, i = {
        onVisible: function(e) {
            var t = i.isSupported();
            if (!t || !i.hidden()) return e(), t;
            var n = i.change(function(t, r) {
                i.hidden() || (i.unbind(n), e())
            });
            return n
        },
        change: function(e) {
            if (!i.isSupported()) return !1;
            var t = r += 1;
            return i._callbacks[t] = e, i._listen(), t
        },
        unbind: function(e) {
            delete i._callbacks[e]
        },
        afterPrerendering: function(e) {
            var t = i.isSupported();
            if (!t || "prerender" != i.state()) return e(), t;
            var n = i.change(function(t, r) {
                "prerender" != r && (i.unbind(n), e())
            });
            return n
        },
        hidden: function() {
            return !(!i._doc.hidden && !i._doc.webkitHidden)
        },
        state: function() {
            return i._doc.visibilityState || i._doc.webkitVisibilityState || "visible"
        },
        isSupported: function() {
            return void 0 !== i._doc.hidden || void 0 !== i._doc.webkitHidden
        },
        _doc: document || {},
        _callbacks: {},
        _change: function(e) {
            var t = i.state();
            for (var n in i._callbacks) i._callbacks[n].call(i._doc, e, t)
        },
        _listen: function() {
            if (!i._init) {
                var e = "visibilitychange";
                i._doc.webkitVisibilityState && (e = "webkit" + e);
                var t = function() {
                    i._change.apply(i, arguments)
                };
                i._doc.addEventListener ? i._doc.addEventListener(e, t) : i._doc.attachEvent(e, t), i._init = !0
            }
        }
    }, "undefined" != typeof e && e.exports ? e.exports = i : n.Visibility = i
}, function(e, t, n) {
    "use strict";
    var r = this && this.__rest || function(e, t) {
        var n = {};
        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
        if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && (n[r[i]] = e[r[i]])
        }
        return n
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(2);
    n(11);
    var o = n(12),
        a = n(13);
    try {
        ! function() {
            var e = window[o.appName],
                t = e.sentry,
                n = r(e, ["sentry"]);
            if (t instanceof Object) {
                var s = t.configUrl,
                    c = t.environment,
                    u = t.sampleRate;
                u > 0 && i.config(s, {
                    environment: c,
                    sampleRate: u,
                    release: Object({
                        NODE_ENV: "production"
                    }).PACKAGE_VERSION
                })
            }
            i.context(function() {
                if (!window[o.appName + "-instance"]) {
                    var e = new a.UsageTracker(n.metrics, {
                        ingestUrl: n.config.ingest_url,
                        jwtToken: n.config.jwt_token,
                        jwtRefreshUrl: n.config.jwt_refresh_url,
                        heartbeatMillis: n.config.heartbeat_interval_millis,
                        minimumTimeSpentMillis: n.config.duration_min_millis,
                        env: n.config.env
                    });
                    e.startTracking(), window[o.appName + "-instance"] = e
                }
            })
        }()
    } catch (e) {
        console.error(e)
    }
}, function(e, t, n) {
    (function(t) {
        var r = n(7),
            i = n(3),
            o = n(8),
            a = n(9),
            s = n(1),
            c = s.isErrorEvent,
            u = s.isDOMError,
            l = s.isDOMException,
            f = s.isError,
            h = s.isObject,
            p = s.isPlainObject,
            d = s.isUndefined,
            m = s.isFunction,
            g = s.isString,
            v = s.isArray,
            y = s.isEmptyObject,
            _ = s.each,
            b = s.objectMerge,
            w = s.truncate,
            E = s.objectFrozen,
            x = s.hasKey,
            O = s.joinRegExp,
            T = s.urlencode,
            k = s.uuid4,
            S = s.htmlTreeAsString,
            j = s.isSameException,
            R = s.isSameStacktrace,
            C = s.parseUrl,
            I = s.fill,
            P = s.supportsFetch,
            A = s.supportsReferrerPolicy,
            F = s.serializeKeysForMessage,
            D = s.serializeException,
            M = s.sanitize,
            U = n(10).wrapMethod,
            B = "source protocol user pass host port path".split(" "),
            L = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;

        function H() {
            return +new Date
        }
        var N = "undefined" !== typeof window ? window : "undefined" !== typeof t ? t : "undefined" !== typeof self ? self : {},
            q = N.document,
            z = N.navigator;

        function V(e, t) {
            return m(t) ? function(n) {
                return t(n, e)
            } : t
        }

        function K() {
            for (var e in this._hasJSON = !("object" !== typeof JSON || !JSON.stringify), this._hasDocument = !d(q), this._hasNavigator = !d(z), this._lastCapturedException = null, this._lastData = null, this._lastEventId = null, this._globalServer = null, this._globalKey = null, this._globalProject = null, this._globalContext = {}, this._globalOptions = {
                    release: N.SENTRY_RELEASE && N.SENTRY_RELEASE.id,
                    logger: "javascript",
                    ignoreErrors: [],
                    ignoreUrls: [],
                    whitelistUrls: [],
                    includePaths: [],
                    headers: null,
                    collectWindowErrors: !0,
                    captureUnhandledRejections: !0,
                    maxMessageLength: 0,
                    maxUrlLength: 250,
                    stackTraceLimit: 50,
                    autoBreadcrumbs: !0,
                    instrument: !0,
                    sampleRate: 1,
                    sanitizeKeys: []
                }, this._fetchDefaults = {
                    method: "POST",
                    keepalive: !0,
                    referrerPolicy: A() ? "origin" : ""
                }, this._ignoreOnError = 0, this._isRavenInstalled = !1, this._originalErrorStackTraceLimit = Error.stackTraceLimit, this._originalConsole = N.console || {}, this._originalConsoleMethods = {}, this._plugins = [], this._startTime = H(), this._wrappedBuiltIns = [], this._breadcrumbs = [], this._lastCapturedEvent = null, this._keypressTimeout, this._location = N.location, this._lastHref = this._location && this._location.href, this._resetBackoff(), this._originalConsole) this._originalConsoleMethods[e] = this._originalConsole[e]
        }
        K.prototype = {
            VERSION: "3.26.4",
            debug: !1,
            TraceKit: r,
            config: function(e, t) {
                var n = this;
                if (n._globalServer) return this._logDebug("error", "Error: Raven has already been configured"), n;
                if (!e) return n;
                var i = n._globalOptions;
                t && _(t, function(e, t) {
                    "tags" === e || "extra" === e || "user" === e ? n._globalContext[e] = t : i[e] = t
                }), n.setDSN(e), i.ignoreErrors.push(/^Script error\.?$/), i.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/), i.ignoreErrors = O(i.ignoreErrors), i.ignoreUrls = !!i.ignoreUrls.length && O(i.ignoreUrls), i.whitelistUrls = !!i.whitelistUrls.length && O(i.whitelistUrls), i.includePaths = O(i.includePaths), i.maxBreadcrumbs = Math.max(0, Math.min(i.maxBreadcrumbs || 100, 100));
                var o = {
                        xhr: !0,
                        console: !0,
                        dom: !0,
                        location: !0,
                        sentry: !0
                    },
                    a = i.autoBreadcrumbs;
                "[object Object]" === {}.toString.call(a) ? a = b(o, a) : !1 !== a && (a = o), i.autoBreadcrumbs = a;
                var s = {
                        tryCatch: !0
                    },
                    c = i.instrument;
                return "[object Object]" === {}.toString.call(c) ? c = b(s, c) : !1 !== c && (c = s), i.instrument = c, r.collectWindowErrors = !!i.collectWindowErrors, n
            },
            install: function() {
                var e = this;
                return e.isSetup() && !e._isRavenInstalled && (r.report.subscribe(function() {
                    e._handleOnErrorStackInfo.apply(e, arguments)
                }), e._globalOptions.captureUnhandledRejections && e._attachPromiseRejectionHandler(), e._patchFunctionToString(), e._globalOptions.instrument && e._globalOptions.instrument.tryCatch && e._instrumentTryCatch(), e._globalOptions.autoBreadcrumbs && e._instrumentBreadcrumbs(), e._drainPlugins(), e._isRavenInstalled = !0), Error.stackTraceLimit = e._globalOptions.stackTraceLimit, this
            },
            setDSN: function(e) {
                var t = this._parseDSN(e),
                    n = t.path.lastIndexOf("/"),
                    r = t.path.substr(1, n);
                this._dsn = e, this._globalKey = t.user, this._globalSecret = t.pass && t.pass.substr(1), this._globalProject = t.path.substr(n + 1), this._globalServer = this._getGlobalServer(t), this._globalEndpoint = this._globalServer + "/" + r + "api/" + this._globalProject + "/store/", this._resetBackoff()
            },
            context: function(e, t, n) {
                return m(e) && (n = t || [], t = e, e = {}), this.wrap(e, t).apply(this, n)
            },
            wrap: function(e, t, n) {
                var r = this;
                if (d(t) && !m(e)) return e;
                if (m(e) && (t = e, e = void 0), !m(t)) return t;
                try {
                    if (t.__raven__) return t;
                    if (t.__raven_wrapper__) return t.__raven_wrapper__
                } catch (e) {
                    return t
                }

                function i() {
                    var i = [],
                        o = arguments.length,
                        a = !e || e && !1 !== e.deep;
                    for (n && m(n) && n.apply(this, arguments); o--;) i[o] = a ? r.wrap(e, arguments[o]) : arguments[o];
                    try {
                        return t.apply(this, i)
                    } catch (t) {
                        throw r._ignoreNextOnError(), r.captureException(t, e), t
                    }
                }
                for (var o in t) x(t, o) && (i[o] = t[o]);
                return i.prototype = t.prototype, t.__raven_wrapper__ = i, i.__raven__ = !0, i.__orig__ = t, i
            },
            uninstall: function() {
                return r.report.uninstall(), this._detachPromiseRejectionHandler(), this._unpatchFunctionToString(), this._restoreBuiltIns(), this._restoreConsole(), Error.stackTraceLimit = this._originalErrorStackTraceLimit, this._isRavenInstalled = !1, this
            },
            _promiseRejectionHandler: function(e) {
                this._logDebug("debug", "Raven caught unhandled promise rejection:", e), this.captureException(e.reason, {
                    mechanism: {
                        type: "onunhandledrejection",
                        handled: !1
                    }
                })
            },
            _attachPromiseRejectionHandler: function() {
                return this._promiseRejectionHandler = this._promiseRejectionHandler.bind(this), N.addEventListener && N.addEventListener("unhandledrejection", this._promiseRejectionHandler), this
            },
            _detachPromiseRejectionHandler: function() {
                return N.removeEventListener && N.removeEventListener("unhandledrejection", this._promiseRejectionHandler), this
            },
            captureException: function(e, t) {
                if (t = b({
                        trimHeadFrames: 0
                    }, t || {}), c(e) && e.error) e = e.error;
                else {
                    if (u(e) || l(e)) {
                        var n = e.name || (u(e) ? "DOMError" : "DOMException"),
                            i = e.message ? n + ": " + e.message : n;
                        return this.captureMessage(i, b(t, {
                            stacktrace: !0,
                            trimHeadFrames: t.trimHeadFrames + 1
                        }))
                    }
                    if (f(e)) e = e;
                    else {
                        if (!p(e)) return this.captureMessage(e, b(t, {
                            stacktrace: !0,
                            trimHeadFrames: t.trimHeadFrames + 1
                        }));
                        t = this._getCaptureExceptionOptionsFromPlainObject(t, e), e = new Error(t.message)
                    }
                }
                this._lastCapturedException = e;
                try {
                    var o = r.computeStackTrace(e);
                    this._handleStackInfo(o, t)
                } catch (t) {
                    if (e !== t) throw t
                }
                return this
            },
            _getCaptureExceptionOptionsFromPlainObject: function(e, t) {
                var n = Object.keys(t).sort(),
                    r = b(e, {
                        message: "Non-Error exception captured with keys: " + F(n),
                        fingerprint: [o(n)],
                        extra: e.extra || {}
                    });
                return r.extra.__serialized__ = D(t), r
            },
            captureMessage: function(e, t) {
                if (!this._globalOptions.ignoreErrors.test || !this._globalOptions.ignoreErrors.test(e)) {
                    var n, i = b({
                        message: e += ""
                    }, t = t || {});
                    try {
                        throw new Error(e)
                    } catch (e) {
                        n = e
                    }
                    n.name = null;
                    var o = r.computeStackTrace(n),
                        a = v(o.stack) && o.stack[1];
                    a && "Raven.captureException" === a.func && (a = o.stack[2]);
                    var s = a && a.url || "";
                    if ((!this._globalOptions.ignoreUrls.test || !this._globalOptions.ignoreUrls.test(s)) && (!this._globalOptions.whitelistUrls.test || this._globalOptions.whitelistUrls.test(s))) {
                        if (this._globalOptions.stacktrace || t.stacktrace || "" === i.message) {
                            i.fingerprint = null == i.fingerprint ? e : i.fingerprint, (t = b({
                                trimHeadFrames: 0
                            }, t)).trimHeadFrames += 1;
                            var c = this._prepareFrames(o, t);
                            i.stacktrace = {
                                frames: c.reverse()
                            }
                        }
                        return i.fingerprint && (i.fingerprint = v(i.fingerprint) ? i.fingerprint : [i.fingerprint]), this._send(i), this
                    }
                }
            },
            captureBreadcrumb: function(e) {
                var t = b({
                    timestamp: H() / 1e3
                }, e);
                if (m(this._globalOptions.breadcrumbCallback)) {
                    var n = this._globalOptions.breadcrumbCallback(t);
                    if (h(n) && !y(n)) t = n;
                    else if (!1 === n) return this
                }
                return this._breadcrumbs.push(t), this._breadcrumbs.length > this._globalOptions.maxBreadcrumbs && this._breadcrumbs.shift(), this
            },
            addPlugin: function(e) {
                var t = [].slice.call(arguments, 1);
                return this._plugins.push([e, t]), this._isRavenInstalled && this._drainPlugins(), this
            },
            setUserContext: function(e) {
                return this._globalContext.user = e, this
            },
            setExtraContext: function(e) {
                return this._mergeContext("extra", e), this
            },
            setTagsContext: function(e) {
                return this._mergeContext("tags", e), this
            },
            clearContext: function() {
                return this._globalContext = {}, this
            },
            getContext: function() {
                return JSON.parse(i(this._globalContext))
            },
            setEnvironment: function(e) {
                return this._globalOptions.environment = e, this
            },
            setRelease: function(e) {
                return this._globalOptions.release = e, this
            },
            setDataCallback: function(e) {
                var t = this._globalOptions.dataCallback;
                return this._globalOptions.dataCallback = V(t, e), this
            },
            setBreadcrumbCallback: function(e) {
                var t = this._globalOptions.breadcrumbCallback;
                return this._globalOptions.breadcrumbCallback = V(t, e), this
            },
            setShouldSendCallback: function(e) {
                var t = this._globalOptions.shouldSendCallback;
                return this._globalOptions.shouldSendCallback = V(t, e), this
            },
            setTransport: function(e) {
                return this._globalOptions.transport = e, this
            },
            lastException: function() {
                return this._lastCapturedException
            },
            lastEventId: function() {
                return this._lastEventId
            },
            isSetup: function() {
                return !!this._hasJSON && (!!this._globalServer || (this.ravenNotConfiguredError || (this.ravenNotConfiguredError = !0, this._logDebug("error", "Error: Raven has not been configured.")), !1))
            },
            afterLoad: function() {
                var e = N.RavenConfig;
                e && this.config(e.dsn, e.config).install()
            },
            showReportDialog: function(e) {
                if (q) {
                    if (!(e = Object.assign({
                            eventId: this.lastEventId(),
                            dsn: this._dsn,
                            user: this._globalContext.user || {}
                        }, e)).eventId) throw new a("Missing eventId");
                    if (!e.dsn) throw new a("Missing DSN");
                    var t = encodeURIComponent,
                        n = [];
                    for (var r in e)
                        if ("user" === r) {
                            var i = e.user;
                            i.name && n.push("name=" + t(i.name)), i.email && n.push("email=" + t(i.email))
                        } else n.push(t(r) + "=" + t(e[r]));
                    var o = this._getGlobalServer(this._parseDSN(e.dsn)),
                        s = q.createElement("script");
                    s.async = !0, s.src = o + "/api/embed/error-page/?" + n.join("&"), (q.head || q.body).appendChild(s)
                }
            },
            _ignoreNextOnError: function() {
                var e = this;
                this._ignoreOnError += 1, setTimeout(function() {
                    e._ignoreOnError -= 1
                })
            },
            _triggerEvent: function(e, t) {
                var n, r;
                if (this._hasDocument) {
                    for (r in t = t || {}, e = "raven" + e.substr(0, 1).toUpperCase() + e.substr(1), q.createEvent ? (n = q.createEvent("HTMLEvents")).initEvent(e, !0, !0) : (n = q.createEventObject()).eventType = e, t) x(t, r) && (n[r] = t[r]);
                    if (q.createEvent) q.dispatchEvent(n);
                    else try {
                        q.fireEvent("on" + n.eventType.toLowerCase(), n)
                    } catch (e) {}
                }
            },
            _breadcrumbEventHandler: function(e) {
                var t = this;
                return function(n) {
                    if (t._keypressTimeout = null, t._lastCapturedEvent !== n) {
                        var r;
                        t._lastCapturedEvent = n;
                        try {
                            r = S(n.target)
                        } catch (e) {
                            r = "<unknown>"
                        }
                        t.captureBreadcrumb({
                            category: "ui." + e,
                            message: r
                        })
                    }
                }
            },
            _keypressEventHandler: function() {
                var e = this;
                return function(t) {
                    var n;
                    try {
                        n = t.target
                    } catch (e) {
                        return
                    }
                    var r = n && n.tagName;
                    if (r && ("INPUT" === r || "TEXTAREA" === r || n.isContentEditable)) {
                        var i = e._keypressTimeout;
                        i || e._breadcrumbEventHandler("input")(t), clearTimeout(i), e._keypressTimeout = setTimeout(function() {
                            e._keypressTimeout = null
                        }, 1e3)
                    }
                }
            },
            _captureUrlChange: function(e, t) {
                var n = C(this._location.href),
                    r = C(t),
                    i = C(e);
                this._lastHref = t, n.protocol === r.protocol && n.host === r.host && (t = r.relative), n.protocol === i.protocol && n.host === i.host && (e = i.relative), this.captureBreadcrumb({
                    category: "navigation",
                    data: {
                        to: t,
                        from: e
                    }
                })
            },
            _patchFunctionToString: function() {
                var e = this;
                e._originalFunctionToString = Function.prototype.toString, Function.prototype.toString = function() {
                    return "function" === typeof this && this.__raven__ ? e._originalFunctionToString.apply(this.__orig__, arguments) : e._originalFunctionToString.apply(this, arguments)
                }
            },
            _unpatchFunctionToString: function() {
                this._originalFunctionToString && (Function.prototype.toString = this._originalFunctionToString)
            },
            _instrumentTryCatch: function() {
                var e = this,
                    t = e._wrappedBuiltIns;

                function n(t) {
                    return function(n, r) {
                        for (var i = new Array(arguments.length), o = 0; o < i.length; ++o) i[o] = arguments[o];
                        var a = i[0];
                        return m(a) && (i[0] = e.wrap({
                            mechanism: {
                                type: "instrument",
                                data: {
                                    function: t.name || "<anonymous>"
                                }
                            }
                        }, a)), t.apply ? t.apply(this, i) : t(i[0], i[1])
                    }
                }
                var r = this._globalOptions.autoBreadcrumbs;

                function i(n) {
                    var i = N[n] && N[n].prototype;
                    i && i.hasOwnProperty && i.hasOwnProperty("addEventListener") && (I(i, "addEventListener", function(t) {
                        return function(i, o, a, s) {
                            try {
                                o && o.handleEvent && (o.handleEvent = e.wrap({
                                    mechanism: {
                                        type: "instrument",
                                        data: {
                                            target: n,
                                            function: "handleEvent",
                                            handler: o && o.name || "<anonymous>"
                                        }
                                    }
                                }, o.handleEvent))
                            } catch (e) {}
                            var c, u, l;
                            return r && r.dom && ("EventTarget" === n || "Node" === n) && (u = e._breadcrumbEventHandler("click"), l = e._keypressEventHandler(), c = function(e) {
                                if (e) {
                                    var t;
                                    try {
                                        t = e.type
                                    } catch (e) {
                                        return
                                    }
                                    return "click" === t ? u(e) : "keypress" === t ? l(e) : void 0
                                }
                            }), t.call(this, i, e.wrap({
                                mechanism: {
                                    type: "instrument",
                                    data: {
                                        target: n,
                                        function: "addEventListener",
                                        handler: o && o.name || "<anonymous>"
                                    }
                                }
                            }, o, c), a, s)
                        }
                    }, t), I(i, "removeEventListener", function(e) {
                        return function(t, n, r, i) {
                            try {
                                n = n && (n.__raven_wrapper__ ? n.__raven_wrapper__ : n)
                            } catch (e) {}
                            return e.call(this, t, n, r, i)
                        }
                    }, t))
                }
                I(N, "setTimeout", n, t), I(N, "setInterval", n, t), N.requestAnimationFrame && I(N, "requestAnimationFrame", function(t) {
                    return function(n) {
                        return t(e.wrap({
                            mechanism: {
                                type: "instrument",
                                data: {
                                    function: "requestAnimationFrame",
                                    handler: t && t.name || "<anonymous>"
                                }
                            }
                        }, n))
                    }
                }, t);
                for (var o = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], a = 0; a < o.length; a++) i(o[a])
            },
            _instrumentBreadcrumbs: function() {
                var e = this,
                    t = this._globalOptions.autoBreadcrumbs,
                    n = e._wrappedBuiltIns;

                function r(t, n) {
                    t in n && m(n[t]) && I(n, t, function(n) {
                        return e.wrap({
                            mechanism: {
                                type: "instrument",
                                data: {
                                    function: t,
                                    handler: n && n.name || "<anonymous>"
                                }
                            }
                        }, n)
                    })
                }
                if (t.xhr && "XMLHttpRequest" in N) {
                    var i = N.XMLHttpRequest && N.XMLHttpRequest.prototype;
                    I(i, "open", function(t) {
                        return function(n, r) {
                            return g(r) && -1 === r.indexOf(e._globalKey) && (this.__raven_xhr = {
                                method: n,
                                url: r,
                                status_code: null
                            }), t.apply(this, arguments)
                        }
                    }, n), I(i, "send", function(t) {
                        return function() {
                            var n = this;

                            function i() {
                                if (n.__raven_xhr && 4 === n.readyState) {
                                    try {
                                        n.__raven_xhr.status_code = n.status
                                    } catch (e) {}
                                    e.captureBreadcrumb({
                                        type: "http",
                                        category: "xhr",
                                        data: n.__raven_xhr
                                    })
                                }
                            }
                            for (var o = ["onload", "onerror", "onprogress"], a = 0; a < o.length; a++) r(o[a], n);
                            return "onreadystatechange" in n && m(n.onreadystatechange) ? I(n, "onreadystatechange", function(t) {
                                return e.wrap({
                                    mechanism: {
                                        type: "instrument",
                                        data: {
                                            function: "onreadystatechange",
                                            handler: t && t.name || "<anonymous>"
                                        }
                                    }
                                }, t, i)
                            }) : n.onreadystatechange = i, t.apply(this, arguments)
                        }
                    }, n)
                }
                t.xhr && P() && I(N, "fetch", function(t) {
                    return function() {
                        for (var n = new Array(arguments.length), r = 0; r < n.length; ++r) n[r] = arguments[r];
                        var i, o = n[0],
                            a = "GET";
                        if ("string" === typeof o ? i = o : "Request" in N && o instanceof N.Request ? (i = o.url, o.method && (a = o.method)) : i = "" + o, -1 !== i.indexOf(e._globalKey)) return t.apply(this, n);
                        n[1] && n[1].method && (a = n[1].method);
                        var s = {
                            method: a,
                            url: i,
                            status_code: null
                        };
                        return t.apply(this, n).then(function(t) {
                            return s.status_code = t.status, e.captureBreadcrumb({
                                type: "http",
                                category: "fetch",
                                data: s
                            }), t
                        }).catch(function(t) {
                            throw e.captureBreadcrumb({
                                type: "http",
                                category: "fetch",
                                data: s,
                                level: "error"
                            }), t
                        })
                    }
                }, n), t.dom && this._hasDocument && (q.addEventListener ? (q.addEventListener("click", e._breadcrumbEventHandler("click"), !1), q.addEventListener("keypress", e._keypressEventHandler(), !1)) : q.attachEvent && (q.attachEvent("onclick", e._breadcrumbEventHandler("click")), q.attachEvent("onkeypress", e._keypressEventHandler())));
                var o = N.chrome,
                    a = !(o && o.app && o.app.runtime) && N.history && N.history.pushState && N.history.replaceState;
                if (t.location && a) {
                    var s = N.onpopstate;
                    N.onpopstate = function() {
                        var t = e._location.href;
                        if (e._captureUrlChange(e._lastHref, t), s) return s.apply(this, arguments)
                    };
                    var c = function(t) {
                        return function() {
                            var n = arguments.length > 2 ? arguments[2] : void 0;
                            return n && e._captureUrlChange(e._lastHref, n + ""), t.apply(this, arguments)
                        }
                    };
                    I(N.history, "pushState", c, n), I(N.history, "replaceState", c, n)
                }
                if (t.console && "console" in N && console.log) {
                    var u = function(t, n) {
                        e.captureBreadcrumb({
                            message: t,
                            level: n.level,
                            category: "console"
                        })
                    };
                    _(["debug", "info", "warn", "error", "log"], function(e, t) {
                        U(console, t, u)
                    })
                }
            },
            _restoreBuiltIns: function() {
                for (var e; this._wrappedBuiltIns.length;) {
                    var t = (e = this._wrappedBuiltIns.shift())[0],
                        n = e[1],
                        r = e[2];
                    t[n] = r
                }
            },
            _restoreConsole: function() {
                for (var e in this._originalConsoleMethods) this._originalConsole[e] = this._originalConsoleMethods[e]
            },
            _drainPlugins: function() {
                var e = this;
                _(this._plugins, function(t, n) {
                    var r = n[0],
                        i = n[1];
                    r.apply(e, [e].concat(i))
                })
            },
            _parseDSN: function(e) {
                var t = L.exec(e),
                    n = {},
                    r = 7;
                try {
                    for (; r--;) n[B[r]] = t[r] || ""
                } catch (t) {
                    throw new a("Invalid DSN: " + e)
                }
                if (n.pass && !this._globalOptions.allowSecretKey) throw new a("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
                return n
            },
            _getGlobalServer: function(e) {
                var t = "//" + e.host + (e.port ? ":" + e.port : "");
                return e.protocol && (t = e.protocol + ":" + t), t
            },
            _handleOnErrorStackInfo: function(e, t) {
                (t = t || {}).mechanism = t.mechanism || {
                    type: "onerror",
                    handled: !1
                }, this._ignoreOnError || this._handleStackInfo(e, t)
            },
            _handleStackInfo: function(e, t) {
                var n = this._prepareFrames(e, t);
                this._triggerEvent("handle", {
                    stackInfo: e,
                    options: t
                }), this._processException(e.name, e.message, e.url, e.lineno, n, t)
            },
            _prepareFrames: function(e, t) {
                var n = this,
                    r = [];
                if (e.stack && e.stack.length && (_(e.stack, function(t, i) {
                        var o = n._normalizeFrame(i, e.url);
                        o && r.push(o)
                    }), t && t.trimHeadFrames))
                    for (var i = 0; i < t.trimHeadFrames && i < r.length; i++) r[i].in_app = !1;
                return r = r.slice(0, this._globalOptions.stackTraceLimit)
            },
            _normalizeFrame: function(e, t) {
                var n = {
                    filename: e.url,
                    lineno: e.line,
                    colno: e.column,
                    function: e.func || "?"
                };
                return e.url || (n.filename = t), n.in_app = !(this._globalOptions.includePaths.test && !this._globalOptions.includePaths.test(n.filename) || /(Raven|TraceKit)\./.test(n.function) || /raven\.(min\.)?js$/.test(n.filename)), n
            },
            _processException: function(e, t, n, r, i, o) {
                var a, s = (e ? e + ": " : "") + (t || "");
                if ((!this._globalOptions.ignoreErrors.test || !this._globalOptions.ignoreErrors.test(t) && !this._globalOptions.ignoreErrors.test(s)) && (i && i.length ? (n = i[0].filename || n, i.reverse(), a = {
                        frames: i
                    }) : n && (a = {
                        frames: [{
                            filename: n,
                            lineno: r,
                            in_app: !0
                        }]
                    }), (!this._globalOptions.ignoreUrls.test || !this._globalOptions.ignoreUrls.test(n)) && (!this._globalOptions.whitelistUrls.test || this._globalOptions.whitelistUrls.test(n)))) {
                    var c = b({
                            exception: {
                                values: [{
                                    type: e,
                                    value: t,
                                    stacktrace: a
                                }]
                            },
                            transaction: n
                        }, o),
                        u = c.exception.values[0];
                    null == u.type && "" === u.value && (u.value = "Unrecoverable error caught"), !c.exception.mechanism && c.mechanism && (c.exception.mechanism = c.mechanism, delete c.mechanism), c.exception.mechanism = b({
                        type: "generic",
                        handled: !0
                    }, c.exception.mechanism || {}), this._send(c)
                }
            },
            _trimPacket: function(e) {
                var t = this._globalOptions.maxMessageLength;
                if (e.message && (e.message = w(e.message, t)), e.exception) {
                    var n = e.exception.values[0];
                    n.value = w(n.value, t)
                }
                var r = e.request;
                return r && (r.url && (r.url = w(r.url, this._globalOptions.maxUrlLength)), r.Referer && (r.Referer = w(r.Referer, this._globalOptions.maxUrlLength))), e.breadcrumbs && e.breadcrumbs.values && this._trimBreadcrumbs(e.breadcrumbs), e
            },
            _trimBreadcrumbs: function(e) {
                for (var t, n, r, i = ["to", "from", "url"], o = 0; o < e.values.length; ++o)
                    if ((n = e.values[o]).hasOwnProperty("data") && h(n.data) && !E(n.data)) {
                        r = b({}, n.data);
                        for (var a = 0; a < i.length; ++a) t = i[a], r.hasOwnProperty(t) && r[t] && (r[t] = w(r[t], this._globalOptions.maxUrlLength));
                        e.values[o].data = r
                    }
            },
            _getHttpData: function() {
                if (this._hasNavigator || this._hasDocument) {
                    var e = {};
                    return this._hasNavigator && z.userAgent && (e.headers = {
                        "User-Agent": z.userAgent
                    }), N.location && N.location.href && (e.url = N.location.href), this._hasDocument && q.referrer && (e.headers || (e.headers = {}), e.headers.Referer = q.referrer), e
                }
            },
            _resetBackoff: function() {
                this._backoffDuration = 0, this._backoffStart = null
            },
            _shouldBackoff: function() {
                return this._backoffDuration && H() - this._backoffStart < this._backoffDuration
            },
            _isRepeatData: function(e) {
                var t = this._lastData;
                return !(!t || e.message !== t.message || e.transaction !== t.transaction) && (e.stacktrace || t.stacktrace ? R(e.stacktrace, t.stacktrace) : !e.exception && !t.exception || j(e.exception, t.exception))
            },
            _setBackoffState: function(e) {
                if (!this._shouldBackoff()) {
                    var t = e.status;
                    if (400 === t || 401 === t || 429 === t) {
                        var n;
                        try {
                            n = P() ? e.headers.get("Retry-After") : e.getResponseHeader("Retry-After"), n = 1e3 * parseInt(n, 10)
                        } catch (e) {}
                        this._backoffDuration = n || (2 * this._backoffDuration || 1e3), this._backoffStart = H()
                    }
                }
            },
            _send: function(e) {
                var t = this._globalOptions,
                    n = {
                        project: this._globalProject,
                        logger: t.logger,
                        platform: "javascript"
                    },
                    r = this._getHttpData();
                r && (n.request = r), e.trimHeadFrames && delete e.trimHeadFrames, (e = b(n, e)).tags = b(b({}, this._globalContext.tags), e.tags), e.extra = b(b({}, this._globalContext.extra), e.extra), e.extra["session:duration"] = H() - this._startTime, this._breadcrumbs && this._breadcrumbs.length > 0 && (e.breadcrumbs = {
                    values: [].slice.call(this._breadcrumbs, 0)
                }), this._globalContext.user && (e.user = this._globalContext.user), t.environment && (e.environment = t.environment), t.release && (e.release = t.release), t.serverName && (e.server_name = t.serverName), e = this._sanitizeData(e), Object.keys(e).forEach(function(t) {
                    (null == e[t] || "" === e[t] || y(e[t])) && delete e[t]
                }), m(t.dataCallback) && (e = t.dataCallback(e) || e), e && !y(e) && (m(t.shouldSendCallback) && !t.shouldSendCallback(e) || (this._shouldBackoff() ? this._logDebug("warn", "Raven dropped error due to backoff: ", e) : "number" === typeof t.sampleRate ? Math.random() < t.sampleRate && this._sendProcessedPayload(e) : this._sendProcessedPayload(e)))
            },
            _sanitizeData: function(e) {
                return M(e, this._globalOptions.sanitizeKeys)
            },
            _getUuid: function() {
                return k()
            },
            _sendProcessedPayload: function(e, t) {
                var n = this,
                    r = this._globalOptions;
                if (this.isSetup())
                    if (e = this._trimPacket(e), this._globalOptions.allowDuplicates || !this._isRepeatData(e)) {
                        this._lastEventId = e.event_id || (e.event_id = this._getUuid()), this._lastData = e, this._logDebug("debug", "Raven about to send:", e);
                        var i = {
                            sentry_version: "7",
                            sentry_client: "raven-js/" + this.VERSION,
                            sentry_key: this._globalKey
                        };
                        this._globalSecret && (i.sentry_secret = this._globalSecret);
                        var o = e.exception && e.exception.values[0];
                        this._globalOptions.autoBreadcrumbs && this._globalOptions.autoBreadcrumbs.sentry && this.captureBreadcrumb({
                            category: "sentry",
                            message: o ? (o.type ? o.type + ": " : "") + o.value : e.message,
                            event_id: e.event_id,
                            level: e.level || "error"
                        });
                        var a = this._globalEndpoint;
                        (r.transport || this._makeRequest).call(this, {
                            url: a,
                            auth: i,
                            data: e,
                            options: r,
                            onSuccess: function() {
                                n._resetBackoff(), n._triggerEvent("success", {
                                    data: e,
                                    src: a
                                }), t && t()
                            },
                            onError: function(r) {
                                n._logDebug("error", "Raven transport failed to send: ", r), r.request && n._setBackoffState(r.request), n._triggerEvent("failure", {
                                    data: e,
                                    src: a
                                }), r = r || new Error("Raven send failed (no additional details provided)"), t && t(r)
                            }
                        })
                    } else this._logDebug("warn", "Raven dropped repeat event: ", e)
            },
            _makeRequest: function(e) {
                var t = e.url + "?" + T(e.auth),
                    n = null,
                    r = {};
                if (e.options.headers && (n = this._evaluateHash(e.options.headers)), e.options.fetchParameters && (r = this._evaluateHash(e.options.fetchParameters)), P()) {
                    r.body = i(e.data);
                    var o = b({}, this._fetchDefaults),
                        a = b(o, r);
                    return n && (a.headers = n), N.fetch(t, a).then(function(t) {
                        if (t.ok) e.onSuccess && e.onSuccess();
                        else {
                            var n = new Error("Sentry error code: " + t.status);
                            n.request = t, e.onError && e.onError(n)
                        }
                    }).catch(function() {
                        e.onError && e.onError(new Error("Sentry error code: network unavailable"))
                    })
                }
                var s = N.XMLHttpRequest && new N.XMLHttpRequest;
                s && (("withCredentials" in s || "undefined" !== typeof XDomainRequest) && ("withCredentials" in s ? s.onreadystatechange = function() {
                    if (4 === s.readyState)
                        if (200 === s.status) e.onSuccess && e.onSuccess();
                        else if (e.onError) {
                        var t = new Error("Sentry error code: " + s.status);
                        t.request = s, e.onError(t)
                    }
                } : (s = new XDomainRequest, t = t.replace(/^https?:/, ""), e.onSuccess && (s.onload = e.onSuccess), e.onError && (s.onerror = function() {
                    var t = new Error("Sentry error code: XDomainRequest");
                    t.request = s, e.onError(t)
                })), s.open("POST", t), n && _(n, function(e, t) {
                    s.setRequestHeader(e, t)
                }), s.send(i(e.data))))
            },
            _evaluateHash: function(e) {
                var t = {};
                for (var n in e)
                    if (e.hasOwnProperty(n)) {
                        var r = e[n];
                        t[n] = "function" === typeof r ? r() : r
                    }
                return t
            },
            _logDebug: function(e) {
                this._originalConsoleMethods[e] && (this.debug || this._globalOptions.debug) && Function.prototype.apply.call(this._originalConsoleMethods[e], this._originalConsole, [].slice.call(arguments, 1))
            },
            _mergeContext: function(e, t) {
                d(t) ? delete this._globalContext[e] : this._globalContext[e] = b(this._globalContext[e] || {}, t)
            }
        }, K.prototype.setUser = K.prototype.setUserContext, K.prototype.setReleaseContext = K.prototype.setRelease, e.exports = K
    }).call(t, n(0))
}, function(e, t, n) {
    (function(t) {
        var r = n(1),
            i = {
                collectWindowErrors: !0,
                debug: !1
            },
            o = "undefined" !== typeof window ? window : "undefined" !== typeof t ? t : "undefined" !== typeof self ? self : {},
            a = [].slice,
            s = "?",
            c = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;

        function u() {
            return "undefined" === typeof document || null == document.location ? "" : document.location.href
        }
        i.report = function() {
            var e, t, n = [],
                l = null,
                f = null,
                h = null;

            function p(e, t) {
                var r = null;
                if (!t || i.collectWindowErrors) {
                    for (var o in n)
                        if (n.hasOwnProperty(o)) try {
                            n[o].apply(null, [e].concat(a.call(arguments, 2)))
                        } catch (e) {
                            r = e
                        }
                    if (r) throw r
                }
            }

            function d(t, n, o, a, l) {
                var f = r.isErrorEvent(l) ? l.error : l,
                    d = r.isErrorEvent(t) ? t.message : t;
                if (h) i.computeStackTrace.augmentStackTraceWithInitialElement(h, n, o, d), m();
                else if (f && r.isError(f)) p(i.computeStackTrace(f), !0);
                else {
                    var g, v = {
                            url: n,
                            line: o,
                            column: a
                        },
                        y = void 0;
                    if ("[object String]" === {}.toString.call(d))(g = d.match(c)) && (y = g[1], d = g[2]);
                    v.func = s, p({
                        name: y,
                        message: d,
                        url: u(),
                        stack: [v]
                    }, !0)
                }
                return !!e && e.apply(this, arguments)
            }

            function m() {
                var e = h,
                    t = l;
                l = null, h = null, f = null, p.apply(null, [e, !1].concat(t))
            }

            function g(e, t) {
                var n = a.call(arguments, 1);
                if (h) {
                    if (f === e) return;
                    m()
                }
                var r = i.computeStackTrace(e);
                if (h = r, f = e, l = n, setTimeout(function() {
                        f === e && m()
                    }, r.incomplete ? 2e3 : 0), !1 !== t) throw e
            }
            return g.subscribe = function(r) {
                t || (e = o.onerror, o.onerror = d, t = !0), n.push(r)
            }, g.unsubscribe = function(e) {
                for (var t = n.length - 1; t >= 0; --t) n[t] === e && n.splice(t, 1)
            }, g.uninstall = function() {
                t && (o.onerror = e, t = !1, e = void 0), n = []
            }, g
        }(), i.computeStackTrace = function() {
            function e(e) {
                if ("undefined" !== typeof e.stack && e.stack) {
                    for (var t, n, r, i = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, o = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx(?:-web)|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, a = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, c = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, l = /\((\S*)(?::(\d+))(?::(\d+))\)/, f = e.stack.split("\n"), h = [], p = (/^(.*) is undefined$/.exec(e.message), 0), d = f.length; p < d; ++p) {
                        if (n = i.exec(f[p])) {
                            var m = n[2] && 0 === n[2].indexOf("native");
                            n[2] && 0 === n[2].indexOf("eval") && (t = l.exec(n[2])) && (n[2] = t[1], n[3] = t[2], n[4] = t[3]), r = {
                                url: m ? null : n[2],
                                func: n[1] || s,
                                args: m ? [n[2]] : [],
                                line: n[3] ? +n[3] : null,
                                column: n[4] ? +n[4] : null
                            }
                        } else if (n = o.exec(f[p])) r = {
                            url: n[2],
                            func: n[1] || s,
                            args: [],
                            line: +n[3],
                            column: n[4] ? +n[4] : null
                        };
                        else {
                            if (!(n = a.exec(f[p]))) continue;
                            n[3] && n[3].indexOf(" > eval") > -1 && (t = c.exec(n[3])) ? (n[3] = t[1], n[4] = t[2], n[5] = null) : 0 !== p || n[5] || "undefined" === typeof e.columnNumber || (h[0].column = e.columnNumber + 1), r = {
                                url: n[3],
                                func: n[1] || s,
                                args: n[2] ? n[2].split(",") : [],
                                line: n[4] ? +n[4] : null,
                                column: n[5] ? +n[5] : null
                            }
                        }
                        if (!r.func && r.line && (r.func = s), r.url && "blob:" === r.url.substr(0, 5)) {
                            var g = new XMLHttpRequest;
                            if (g.open("GET", r.url, !1), g.send(null), 200 === g.status) {
                                var v = g.responseText || "",
                                    y = (v = v.slice(-300)).match(/\/\/# sourceMappingURL=(.*)$/);
                                if (y) {
                                    var _ = y[1];
                                    "~" === _.charAt(0) && (_ = ("undefined" === typeof document || null == document.location ? "" : document.location.origin ? document.location.origin : document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "")) + _.slice(1)), r.url = _.slice(0, -4)
                                }
                            }
                        }
                        h.push(r)
                    }
                    return h.length ? {
                        name: e.name,
                        message: e.message,
                        url: u(),
                        stack: h
                    } : null
                }
            }

            function t(e, t, n, r) {
                var i = {
                    url: t,
                    line: n
                };
                if (i.url && i.line) {
                    if (e.incomplete = !1, i.func || (i.func = s), e.stack.length > 0 && e.stack[0].url === i.url) {
                        if (e.stack[0].line === i.line) return !1;
                        if (!e.stack[0].line && e.stack[0].func === i.func) return e.stack[0].line = i.line, !1
                    }
                    return e.stack.unshift(i), e.partial = !0, !0
                }
                return e.incomplete = !0, !1
            }

            function n(e, o) {
                for (var a, c, l = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, f = [], h = {}, p = !1, d = n.caller; d && !p; d = d.caller)
                    if (d !== r && d !== i.report) {
                        if (c = {
                                url: null,
                                func: s,
                                line: null,
                                column: null
                            }, d.name ? c.func = d.name : (a = l.exec(d.toString())) && (c.func = a[1]), "undefined" === typeof c.func) try {
                            c.func = a.input.substring(0, a.input.indexOf("{"))
                        } catch (e) {}
                        h["" + d] ? p = !0 : h["" + d] = !0, f.push(c)
                    }
                o && f.splice(0, o);
                var m = {
                    name: e.name,
                    message: e.message,
                    url: u(),
                    stack: f
                };
                return t(m, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description), m
            }

            function r(t, r) {
                var o = null;
                r = null == r ? 0 : +r;
                try {
                    if (o = e(t)) return o
                } catch (e) {
                    if (i.debug) throw e
                }
                try {
                    if (o = n(t, r + 1)) return o
                } catch (e) {
                    if (i.debug) throw e
                }
                return {
                    name: t.name,
                    message: t.message,
                    url: u()
                }
            }
            return r.augmentStackTraceWithInitialElement = t, r.computeStackTraceFromStackProp = e, r
        }(), e.exports = i
    }).call(t, n(0))
}, function(e, t) {
    function n(e, t) {
        var n = (65535 & e) + (65535 & t);
        return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
    }

    function r(e, t, r, i, o, a) {
        return n((s = n(n(t, e), n(i, a))) << (c = o) | s >>> 32 - c, r);
        var s, c
    }

    function i(e, t, n, i, o, a, s) {
        return r(t & n | ~t & i, e, t, o, a, s)
    }

    function o(e, t, n, i, o, a, s) {
        return r(t & i | n & ~i, e, t, o, a, s)
    }

    function a(e, t, n, i, o, a, s) {
        return r(t ^ n ^ i, e, t, o, a, s)
    }

    function s(e, t, n, i, o, a, s) {
        return r(n ^ (t | ~i), e, t, o, a, s)
    }

    function c(e, t) {
        var r, c, u, l, f;
        e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;
        var h = 1732584193,
            p = -271733879,
            d = -1732584194,
            m = 271733878;
        for (r = 0; r < e.length; r += 16) c = h, u = p, l = d, f = m, p = s(p = s(p = s(p = s(p = a(p = a(p = a(p = a(p = o(p = o(p = o(p = o(p = i(p = i(p = i(p = i(p, d = i(d, m = i(m, h = i(h, p, d, m, e[r], 7, -680876936), p, d, e[r + 1], 12, -389564586), h, p, e[r + 2], 17, 606105819), m, h, e[r + 3], 22, -1044525330), d = i(d, m = i(m, h = i(h, p, d, m, e[r + 4], 7, -176418897), p, d, e[r + 5], 12, 1200080426), h, p, e[r + 6], 17, -1473231341), m, h, e[r + 7], 22, -45705983), d = i(d, m = i(m, h = i(h, p, d, m, e[r + 8], 7, 1770035416), p, d, e[r + 9], 12, -1958414417), h, p, e[r + 10], 17, -42063), m, h, e[r + 11], 22, -1990404162), d = i(d, m = i(m, h = i(h, p, d, m, e[r + 12], 7, 1804603682), p, d, e[r + 13], 12, -40341101), h, p, e[r + 14], 17, -1502002290), m, h, e[r + 15], 22, 1236535329), d = o(d, m = o(m, h = o(h, p, d, m, e[r + 1], 5, -165796510), p, d, e[r + 6], 9, -1069501632), h, p, e[r + 11], 14, 643717713), m, h, e[r], 20, -373897302), d = o(d, m = o(m, h = o(h, p, d, m, e[r + 5], 5, -701558691), p, d, e[r + 10], 9, 38016083), h, p, e[r + 15], 14, -660478335), m, h, e[r + 4], 20, -405537848), d = o(d, m = o(m, h = o(h, p, d, m, e[r + 9], 5, 568446438), p, d, e[r + 14], 9, -1019803690), h, p, e[r + 3], 14, -187363961), m, h, e[r + 8], 20, 1163531501), d = o(d, m = o(m, h = o(h, p, d, m, e[r + 13], 5, -1444681467), p, d, e[r + 2], 9, -51403784), h, p, e[r + 7], 14, 1735328473), m, h, e[r + 12], 20, -1926607734), d = a(d, m = a(m, h = a(h, p, d, m, e[r + 5], 4, -378558), p, d, e[r + 8], 11, -2022574463), h, p, e[r + 11], 16, 1839030562), m, h, e[r + 14], 23, -35309556), d = a(d, m = a(m, h = a(h, p, d, m, e[r + 1], 4, -1530992060), p, d, e[r + 4], 11, 1272893353), h, p, e[r + 7], 16, -155497632), m, h, e[r + 10], 23, -1094730640), d = a(d, m = a(m, h = a(h, p, d, m, e[r + 13], 4, 681279174), p, d, e[r], 11, -358537222), h, p, e[r + 3], 16, -722521979), m, h, e[r + 6], 23, 76029189), d = a(d, m = a(m, h = a(h, p, d, m, e[r + 9], 4, -640364487), p, d, e[r + 12], 11, -421815835), h, p, e[r + 15], 16, 530742520), m, h, e[r + 2], 23, -995338651), d = s(d, m = s(m, h = s(h, p, d, m, e[r], 6, -198630844), p, d, e[r + 7], 10, 1126891415), h, p, e[r + 14], 15, -1416354905), m, h, e[r + 5], 21, -57434055), d = s(d, m = s(m, h = s(h, p, d, m, e[r + 12], 6, 1700485571), p, d, e[r + 3], 10, -1894986606), h, p, e[r + 10], 15, -1051523), m, h, e[r + 1], 21, -2054922799), d = s(d, m = s(m, h = s(h, p, d, m, e[r + 8], 6, 1873313359), p, d, e[r + 15], 10, -30611744), h, p, e[r + 6], 15, -1560198380), m, h, e[r + 13], 21, 1309151649), d = s(d, m = s(m, h = s(h, p, d, m, e[r + 4], 6, -145523070), p, d, e[r + 11], 10, -1120210379), h, p, e[r + 2], 15, 718787259), m, h, e[r + 9], 21, -343485551), h = n(h, c), p = n(p, u), d = n(d, l), m = n(m, f);
        return [h, p, d, m]
    }

    function u(e) {
        var t, n = "",
            r = 32 * e.length;
        for (t = 0; t < r; t += 8) n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
        return n
    }

    function l(e) {
        var t, n = [];
        for (n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1) n[t] = 0;
        var r = 8 * e.length;
        for (t = 0; t < r; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
        return n
    }

    function f(e) {
        var t, n, r = "";
        for (n = 0; n < e.length; n += 1) t = e.charCodeAt(n), r += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t);
        return r
    }

    function h(e) {
        return unescape(encodeURIComponent(e))
    }

    function p(e) {
        return function(e) {
            return u(c(l(e), 8 * e.length))
        }(h(e))
    }

    function d(e, t) {
        return function(e, t) {
            var n, r, i = l(e),
                o = [],
                a = [];
            for (o[15] = a[15] = void 0, i.length > 16 && (i = c(i, 8 * e.length)), n = 0; n < 16; n += 1) o[n] = 909522486 ^ i[n], a[n] = 1549556828 ^ i[n];
            return r = c(o.concat(l(t)), 512 + 8 * t.length), u(c(a.concat(r), 640))
        }(h(e), h(t))
    }
    e.exports = function(e, t, n) {
        return t ? n ? d(t, e) : f(d(t, e)) : n ? p(e) : f(p(e))
    }
}, function(e, t) {
    function n(e) {
        this.name = "RavenConfigError", this.message = e
    }
    n.prototype = new Error, n.prototype.constructor = n, e.exports = n
}, function(e, t, n) {
    var r = n(1);
    e.exports = {
        wrapMethod: function(e, t, n) {
            var i = e[t],
                o = e;
            if (t in e) {
                var a = "warn" === t ? "warning" : t;
                e[t] = function() {
                    var e = [].slice.call(arguments),
                        s = r.safeJoin(e, " "),
                        c = {
                            level: a,
                            logger: "console",
                            extra: {
                                arguments: e
                            }
                        };
                    "assert" === t ? !1 === e[0] && (s = "Assertion failed: " + (r.safeJoin(e.slice(1), " ") || "console.assert"), c.extra.arguments = e.slice(1), n && n(s, c)) : n && n(s, c), i && Function.prototype.apply.call(i, o, e)
                }
            }
        }
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.Headers = u, t.Request = g, t.Response = y, n.d(t, "DOMException", function() {
        return b
    }), t.fetch = w;
    var r = {
        searchParams: "URLSearchParams" in self,
        iterable: "Symbol" in self && "iterator" in Symbol,
        blob: "FileReader" in self && "Blob" in self && function() {
            try {
                return new Blob, !0
            } catch (e) {
                return !1
            }
        }(),
        formData: "FormData" in self,
        arrayBuffer: "ArrayBuffer" in self
    };
    if (r.arrayBuffer) var i = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
        o = ArrayBuffer.isView || function(e) {
            return e && i.indexOf(Object.prototype.toString.call(e)) > -1
        };

    function a(e) {
        if ("string" !== typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
        return e.toLowerCase()
    }

    function s(e) {
        return "string" !== typeof e && (e = String(e)), e
    }

    function c(e) {
        var t = {
            next: function() {
                var t = e.shift();
                return {
                    done: void 0 === t,
                    value: t
                }
            }
        };
        return r.iterable && (t[Symbol.iterator] = function() {
            return t
        }), t
    }

    function u(e) {
        this.map = {}, e instanceof u ? e.forEach(function(e, t) {
            this.append(t, e)
        }, this) : Array.isArray(e) ? e.forEach(function(e) {
            this.append(e[0], e[1])
        }, this) : e && Object.getOwnPropertyNames(e).forEach(function(t) {
            this.append(t, e[t])
        }, this)
    }

    function l(e) {
        if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
        e.bodyUsed = !0
    }

    function f(e) {
        return new Promise(function(t, n) {
            e.onload = function() {
                t(e.result)
            }, e.onerror = function() {
                n(e.error)
            }
        })
    }

    function h(e) {
        var t = new FileReader,
            n = f(t);
        return t.readAsArrayBuffer(e), n
    }

    function p(e) {
        if (e.slice) return e.slice(0);
        var t = new Uint8Array(e.byteLength);
        return t.set(new Uint8Array(e)), t.buffer
    }

    function d() {
        return this.bodyUsed = !1, this._initBody = function(e) {
            var t;
            this._bodyInit = e, e ? "string" === typeof e ? this._bodyText = e : r.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : r.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : r.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : r.arrayBuffer && r.blob && ((t = e) && DataView.prototype.isPrototypeOf(t)) ? (this._bodyArrayBuffer = p(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : r.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || o(e)) ? this._bodyArrayBuffer = p(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" === typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : r.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
        }, r.blob && (this.blob = function() {
            var e = l(this);
            if (e) return e;
            if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            if (this._bodyFormData) throw new Error("could not read FormData body as blob");
            return Promise.resolve(new Blob([this._bodyText]))
        }, this.arrayBuffer = function() {
            return this._bodyArrayBuffer ? l(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(h)
        }), this.text = function() {
            var e, t, n, r = l(this);
            if (r) return r;
            if (this._bodyBlob) return e = this._bodyBlob, t = new FileReader, n = f(t), t.readAsText(e), n;
            if (this._bodyArrayBuffer) return Promise.resolve(function(e) {
                for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++) n[r] = String.fromCharCode(t[r]);
                return n.join("")
            }(this._bodyArrayBuffer));
            if (this._bodyFormData) throw new Error("could not read FormData body as text");
            return Promise.resolve(this._bodyText)
        }, r.formData && (this.formData = function() {
            return this.text().then(v)
        }), this.json = function() {
            return this.text().then(JSON.parse)
        }, this
    }
    u.prototype.append = function(e, t) {
        e = a(e), t = s(t);
        var n = this.map[e];
        this.map[e] = n ? n + ", " + t : t
    }, u.prototype.delete = function(e) {
        delete this.map[a(e)]
    }, u.prototype.get = function(e) {
        return e = a(e), this.has(e) ? this.map[e] : null
    }, u.prototype.has = function(e) {
        return this.map.hasOwnProperty(a(e))
    }, u.prototype.set = function(e, t) {
        this.map[a(e)] = s(t)
    }, u.prototype.forEach = function(e, t) {
        for (var n in this.map) this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this)
    }, u.prototype.keys = function() {
        var e = [];
        return this.forEach(function(t, n) {
            e.push(n)
        }), c(e)
    }, u.prototype.values = function() {
        var e = [];
        return this.forEach(function(t) {
            e.push(t)
        }), c(e)
    }, u.prototype.entries = function() {
        var e = [];
        return this.forEach(function(t, n) {
            e.push([n, t])
        }), c(e)
    }, r.iterable && (u.prototype[Symbol.iterator] = u.prototype.entries);
    var m = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

    function g(e, t) {
        var n, r, i = (t = t || {}).body;
        if (e instanceof g) {
            if (e.bodyUsed) throw new TypeError("Already read");
            this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new u(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, i || null == e._bodyInit || (i = e._bodyInit, e.bodyUsed = !0)
        } else this.url = String(e);
        if (this.credentials = t.credentials || this.credentials || "same-origin", !t.headers && this.headers || (this.headers = new u(t.headers)), this.method = (n = t.method || this.method || "GET", r = n.toUpperCase(), m.indexOf(r) > -1 ? r : n), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && i) throw new TypeError("Body not allowed for GET or HEAD requests");
        this._initBody(i)
    }

    function v(e) {
        var t = new FormData;
        return e.trim().split("&").forEach(function(e) {
            if (e) {
                var n = e.split("="),
                    r = n.shift().replace(/\+/g, " "),
                    i = n.join("=").replace(/\+/g, " ");
                t.append(decodeURIComponent(r), decodeURIComponent(i))
            }
        }), t
    }

    function y(e, t) {
        t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new u(t.headers), this.url = t.url || "", this._initBody(e)
    }
    g.prototype.clone = function() {
        return new g(this, {
            body: this._bodyInit
        })
    }, d.call(g.prototype), d.call(y.prototype), y.prototype.clone = function() {
        return new y(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new u(this.headers),
            url: this.url
        })
    }, y.error = function() {
        var e = new y(null, {
            status: 0,
            statusText: ""
        });
        return e.type = "error", e
    };
    var _ = [301, 302, 303, 307, 308];
    y.redirect = function(e, t) {
        if (-1 === _.indexOf(t)) throw new RangeError("Invalid status code");
        return new y(null, {
            status: t,
            headers: {
                location: e
            }
        })
    };
    var b = self.DOMException;
    try {
        new b
    } catch (e) {
        (b = function(e, t) {
            this.message = e, this.name = t;
            var n = Error(e);
            this.stack = n.stack
        }).prototype = Object.create(Error.prototype), b.prototype.constructor = b
    }

    function w(e, t) {
        return new Promise(function(n, i) {
            var o = new g(e, t);
            if (o.signal && o.signal.aborted) return i(new b("Aborted", "AbortError"));
            var a = new XMLHttpRequest;

            function s() {
                a.abort()
            }
            a.onload = function() {
                var e, t, r = {
                    status: a.status,
                    statusText: a.statusText,
                    headers: (e = a.getAllResponseHeaders() || "", t = new u, e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(e) {
                        var n = e.split(":"),
                            r = n.shift().trim();
                        if (r) {
                            var i = n.join(":").trim();
                            t.append(r, i)
                        }
                    }), t)
                };
                r.url = "responseURL" in a ? a.responseURL : r.headers.get("X-Request-URL");
                var i = "response" in a ? a.response : a.responseText;
                n(new y(i, r))
            }, a.onerror = function() {
                i(new TypeError("Network request failed"))
            }, a.ontimeout = function() {
                i(new TypeError("Network request failed"))
            }, a.onabort = function() {
                i(new b("Aborted", "AbortError"))
            }, a.open(o.method, o.url, !0), "include" === o.credentials ? a.withCredentials = !0 : "omit" === o.credentials && (a.withCredentials = !1), "responseType" in a && r.blob && (a.responseType = "blob"), o.headers.forEach(function(e, t) {
                a.setRequestHeader(t, e)
            }), o.signal && (o.signal.addEventListener("abort", s), a.onreadystatechange = function() {
                4 === a.readyState && o.signal.removeEventListener("abort", s)
            }), a.send("undefined" === typeof o._bodyInit ? null : o._bodyInit)
        })
    }
    w.polyfill = !0, self.fetch || (self.fetch = w, self.Headers = u, self.Request = g, self.Response = y)
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.appName = "usage-duration-ui-tracker"
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(14),
        i = n(2),
        o = n(19),
        a = n(22),
        s = function() {
            function e(e, t) {
                this.metrics = e, this.config = t, this.unloadListenerFunction = i.wrap(this.emitMetricsIfTimeOverThreshold.bind(this)), this.visibilityListenerHandler = i.wrap(this.emitOnHidden.bind(this))
            }
            return e.prototype.startTracking = function() {
                a.isSupported() && (void 0 === this.lastActionTimestamp && (this.lastActionTimestamp = Date.now()), void 0 === this.heartbeatTimerId && (this.heartbeatTimerId = a.every(this.config.heartbeatMillis, i.wrap(this.emitMetricsIfTimeOverThreshold.bind(this)))), void 0 === this.sessionId && (this.sessionId = o()), void 0 === this.changeListenerId && (this.changeListenerId = a.change(i.wrap(this.handleVisibilityChange.bind(this)))), window.addEventListener("beforeunload", this.unloadListenerFunction), window.addEventListener("visibilitychange", this.visibilityListenerHandler))
            }, e.prototype.stopTracking = function() {
                void 0 !== this.heartbeatTimerId && a.stop(this.heartbeatTimerId), this.heartbeatTimerId = void 0, this.lastActionTimestamp = void 0, this.sessionId = void 0
            }, e.prototype.emitMetrics = function(e) {
                var t = this;
                return this.lastActionTimestamp = Date.now(), void 0 === this.sessionId && (this.sessionId = o()), this.polyfillPromise(), this.metricsFetch(e).then(function(n) {
                    if (401 === n.status) return t.refreshJwtToken().then(function() {
                        t.metricsFetch(e)
                    })
                })
            }, e.prototype.handleVisibilityChange = function(e, t) {
                if (!a.hidden()) return this.startTracking();
                this.emitMetricsIfTimeOverThreshold(), this.stopTracking()
            }, e.prototype.polyfillPromise = function() {
                window.Promise || (window.Promise = r.default)
            }, e.prototype.metricsFetch = function(e) {
                return window.fetch(this.config.ingestUrl, {
                    method: "POST",
                    keepalive: !0,
                    mode: "same-origin",
                    headers: {
                        Authorization: "Bearer " + this.config.jwtToken,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: this.metrics.user_id,
                        school_id: this.metrics.school_id,
                        tz: this.metrics.tz,
                        client_type: this.metrics.client_type,
                        client_version: this.metrics.client_version,
                        env: this.config.env,
                        metrics: [{
                            material_id: this.metrics.material_id,
                            material_type: this.metrics.material_type,
                            course_section_id: this.metrics.course_section_id,
                            duration: e,
                            ref_time: Math.floor(Date.now() / 1e3),
                            trace_id: o(),
                            session_id: this.sessionId
                        }]
                    })
                })
            }, e.prototype.refreshJwtToken = function() {
                var e = this;
                return window.fetch(this.config.jwtRefreshUrl, {
                    method: "POST"
                }).then(function(e) {
                    return e.json()
                }).then(function(t) {
                    return e.config.jwtToken = t.token
                })
            }, e.prototype.getElapsedTimeInMilliseconds = function() {
                return this.lastActionTimestamp ? Date.now() - this.lastActionTimestamp : (console.error("Last Timestamp not initialized"), 0)
            }, e.prototype.emitMetricsIfTimeOverThreshold = function() {
                var e = this.getElapsedTimeInMilliseconds();
                e >= this.config.minimumTimeSpentMillis && this.emitMetrics(e)
            }, e.prototype.emitOnHidden = function() {
                "hidden" === document.visibilityState && this.emitMetricsIfTimeOverThreshold()
            }, e
        }();
    t.UsageTracker = s
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        function(e) {
            var r = n(18),
                i = setTimeout;

            function o(e) {
                return Boolean(e && "undefined" !== typeof e.length)
            }

            function a() {}

            function s(e) {
                if (!(this instanceof s)) throw new TypeError("Promises must be constructed via new");
                if ("function" !== typeof e) throw new TypeError("not a function");
                this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], h(e, this)
            }

            function c(e, t) {
                for (; 3 === e._state;) e = e._value;
                0 !== e._state ? (e._handled = !0, s._immediateFn(function() {
                    var n = 1 === e._state ? t.onFulfilled : t.onRejected;
                    if (null !== n) {
                        var r;
                        try {
                            r = n(e._value)
                        } catch (e) {
                            return void l(t.promise, e)
                        }
                        u(t.promise, r)
                    } else(1 === e._state ? u : l)(t.promise, e._value)
                })) : e._deferreds.push(t)
            }

            function u(e, t) {
                try {
                    if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
                    if (t && ("object" === typeof t || "function" === typeof t)) {
                        var n = t.then;
                        if (t instanceof s) return e._state = 3, e._value = t, void f(e);
                        if ("function" === typeof n) return void h((r = n, i = t, function() {
                            r.apply(i, arguments)
                        }), e)
                    }
                    e._state = 1, e._value = t, f(e)
                } catch (t) {
                    l(e, t)
                }
                var r, i
            }

            function l(e, t) {
                e._state = 2, e._value = t, f(e)
            }

            function f(e) {
                2 === e._state && 0 === e._deferreds.length && s._immediateFn(function() {
                    e._handled || s._unhandledRejectionFn(e._value)
                });
                for (var t = 0, n = e._deferreds.length; t < n; t++) c(e, e._deferreds[t]);
                e._deferreds = null
            }

            function h(e, t) {
                var n = !1;
                try {
                    e(function(e) {
                        n || (n = !0, u(t, e))
                    }, function(e) {
                        n || (n = !0, l(t, e))
                    })
                } catch (e) {
                    if (n) return;
                    n = !0, l(t, e)
                }
            }
            s.prototype.catch = function(e) {
                return this.then(null, e)
            }, s.prototype.then = function(e, t) {
                var n = new this.constructor(a);
                return c(this, new function(e, t, n) {
                    this.onFulfilled = "function" === typeof e ? e : null, this.onRejected = "function" === typeof t ? t : null, this.promise = n
                }(e, t, n)), n
            }, s.prototype.finally = r.a, s.all = function(e) {
                return new s(function(t, n) {
                    if (!o(e)) return n(new TypeError("Promise.all accepts an array"));
                    var r = Array.prototype.slice.call(e);
                    if (0 === r.length) return t([]);
                    var i = r.length;

                    function a(e, o) {
                        try {
                            if (o && ("object" === typeof o || "function" === typeof o)) {
                                var s = o.then;
                                if ("function" === typeof s) return void s.call(o, function(t) {
                                    a(e, t)
                                }, n)
                            }
                            r[e] = o, 0 === --i && t(r)
                        } catch (e) {
                            n(e)
                        }
                    }
                    for (var s = 0; s < r.length; s++) a(s, r[s])
                })
            }, s.resolve = function(e) {
                return e && "object" === typeof e && e.constructor === s ? e : new s(function(t) {
                    t(e)
                })
            }, s.reject = function(e) {
                return new s(function(t, n) {
                    n(e)
                })
            }, s.race = function(e) {
                return new s(function(t, n) {
                    if (!o(e)) return n(new TypeError("Promise.race accepts an array"));
                    for (var r = 0, i = e.length; r < i; r++) s.resolve(e[r]).then(t, n)
                })
            }, s._immediateFn = "function" === typeof e && function(t) {
                e(t)
            } || function(e) {
                i(e, 0)
            }, s._unhandledRejectionFn = function(e) {
                "undefined" !== typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
            }, t.default = s
        }.call(t, n(15).setImmediate)
}, function(e, t, n) {
    (function(e) {
        var r = "undefined" !== typeof e && e || "undefined" !== typeof self && self || window,
            i = Function.prototype.apply;

        function o(e, t) {
            this._id = e, this._clearFn = t
        }
        t.setTimeout = function() {
            return new o(i.call(setTimeout, r, arguments), clearTimeout)
        }, t.setInterval = function() {
            return new o(i.call(setInterval, r, arguments), clearInterval)
        }, t.clearTimeout = t.clearInterval = function(e) {
            e && e.close()
        }, o.prototype.unref = o.prototype.ref = function() {}, o.prototype.close = function() {
            this._clearFn.call(r, this._id)
        }, t.enroll = function(e, t) {
            clearTimeout(e._idleTimeoutId), e._idleTimeout = t
        }, t.unenroll = function(e) {
            clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
        }, t._unrefActive = t.active = function(e) {
            clearTimeout(e._idleTimeoutId);
            var t = e._idleTimeout;
            t >= 0 && (e._idleTimeoutId = setTimeout(function() {
                e._onTimeout && e._onTimeout()
            }, t))
        }, n(16), t.setImmediate = "undefined" !== typeof self && self.setImmediate || "undefined" !== typeof e && e.setImmediate || this && this.setImmediate, t.clearImmediate = "undefined" !== typeof self && self.clearImmediate || "undefined" !== typeof e && e.clearImmediate || this && this.clearImmediate
    }).call(t, n(0))
}, function(e, t, n) {
    (function(e, t) {
        ! function(e, n) {
            "use strict";
            if (!e.setImmediate) {
                var r, i, o, a, s, c = 1,
                    u = {},
                    l = !1,
                    f = e.document,
                    h = Object.getPrototypeOf && Object.getPrototypeOf(e);
                h = h && h.setTimeout ? h : e, "[object process]" === {}.toString.call(e.process) ? r = function(e) {
                    t.nextTick(function() {
                        d(e)
                    })
                } : ! function() {
                    if (e.postMessage && !e.importScripts) {
                        var t = !0,
                            n = e.onmessage;
                        return e.onmessage = function() {
                            t = !1
                        }, e.postMessage("", "*"), e.onmessage = n, t
                    }
                }() ? e.MessageChannel ? ((o = new MessageChannel).port1.onmessage = function(e) {
                    d(e.data)
                }, r = function(e) {
                    o.port2.postMessage(e)
                }) : f && "onreadystatechange" in f.createElement("script") ? (i = f.documentElement, r = function(e) {
                    var t = f.createElement("script");
                    t.onreadystatechange = function() {
                        d(e), t.onreadystatechange = null, i.removeChild(t), t = null
                    }, i.appendChild(t)
                }) : r = function(e) {
                    setTimeout(d, 0, e)
                } : (a = "setImmediate$" + Math.random() + "$", s = function(t) {
                    t.source === e && "string" === typeof t.data && 0 === t.data.indexOf(a) && d(+t.data.slice(a.length))
                }, e.addEventListener ? e.addEventListener("message", s, !1) : e.attachEvent("onmessage", s), r = function(t) {
                    e.postMessage(a + t, "*")
                }), h.setImmediate = function(e) {
                    "function" !== typeof e && (e = new Function("" + e));
                    for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++) t[n] = arguments[n + 1];
                    var i = {
                        callback: e,
                        args: t
                    };
                    return u[c] = i, r(c), c++
                }, h.clearImmediate = p
            }

            function p(e) {
                delete u[e]
            }

            function d(e) {
                if (l) setTimeout(d, 0, e);
                else {
                    var t = u[e];
                    if (t) {
                        l = !0;
                        try {
                            ! function(e) {
                                var t = e.callback,
                                    r = e.args;
                                switch (r.length) {
                                    case 0:
                                        t();
                                        break;
                                    case 1:
                                        t(r[0]);
                                        break;
                                    case 2:
                                        t(r[0], r[1]);
                                        break;
                                    case 3:
                                        t(r[0], r[1], r[2]);
                                        break;
                                    default:
                                        t.apply(n, r)
                                }
                            }(t)
                        } finally {
                            p(e), l = !1
                        }
                    }
                }
            }
        }("undefined" === typeof self ? "undefined" === typeof e ? this : e : self)
    }).call(t, n(0), n(17))
}, function(e, t) {
    var n, r, i = e.exports = {};

    function o() {
        throw new Error("setTimeout has not been defined")
    }

    function a() {
        throw new Error("clearTimeout has not been defined")
    }

    function s(e) {
        if (n === setTimeout) return setTimeout(e, 0);
        if ((n === o || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
        try {
            return n(e, 0)
        } catch (t) {
            try {
                return n.call(null, e, 0)
            } catch (t) {
                return n.call(this, e, 0)
            }
        }
    }! function() {
        try {
            n = "function" === typeof setTimeout ? setTimeout : o
        } catch (e) {
            n = o
        }
        try {
            r = "function" === typeof clearTimeout ? clearTimeout : a
        } catch (e) {
            r = a
        }
    }();
    var c, u = [],
        l = !1,
        f = -1;

    function h() {
        l && c && (l = !1, c.length ? u = c.concat(u) : f = -1, u.length && p())
    }

    function p() {
        if (!l) {
            var e = s(h);
            l = !0;
            for (var t = u.length; t;) {
                for (c = u, u = []; ++f < t;) c && c[f].run();
                f = -1, t = u.length
            }
            c = null, l = !1,
                function(e) {
                    if (r === clearTimeout) return clearTimeout(e);
                    if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
                    try {
                        r(e)
                    } catch (t) {
                        try {
                            return r.call(null, e)
                        } catch (t) {
                            return r.call(this, e)
                        }
                    }
                }(e)
        }
    }

    function d(e, t) {
        this.fun = e, this.array = t
    }

    function m() {}
    i.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        u.push(new d(e, t)), 1 !== u.length || l || s(p)
    }, d.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = m, i.addListener = m, i.once = m, i.off = m, i.removeListener = m, i.removeAllListeners = m, i.emit = m, i.prependListener = m, i.prependOnceListener = m, i.listeners = function(e) {
        return []
    }, i.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, i.cwd = function() {
        return "/"
    }, i.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, i.umask = function() {
        return 0
    }
}, function(e, t, n) {
    "use strict";
    t.a = function(e) {
        var t = this.constructor;
        return this.then(function(n) {
            return t.resolve(e()).then(function() {
                return n
            })
        }, function(n) {
            return t.resolve(e()).then(function() {
                return t.reject(n)
            })
        })
    }
}, function(e, t, n) {
    var r = n(20),
        i = n(21);
    e.exports = function(e, t, n) {
        var o = t && n || 0;
        "string" == typeof e && (t = "binary" === e ? new Array(16) : null, e = null);
        var a = (e = e || {}).random || (e.rng || r)();
        if (a[6] = 15 & a[6] | 64, a[8] = 63 & a[8] | 128, t)
            for (var s = 0; s < 16; ++s) t[o + s] = a[s];
        return t || i(a)
    }
}, function(e, t) {
    var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
    if (n) {
        var r = new Uint8Array(16);
        e.exports = function() {
            return n(r), r
        }
    } else {
        var i = new Array(16);
        e.exports = function() {
            for (var e, t = 0; t < 16; t++) 0 === (3 & t) && (e = 4294967296 * Math.random()), i[t] = e >>> ((3 & t) << 3) & 255;
            return i
        }
    }
}, function(e, t) {
    for (var n = [], r = 0; r < 256; ++r) n[r] = (r + 256).toString(16).substr(1);
    e.exports = function(e, t) {
        var r = t || 0,
            i = n;
        return [i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], "-", i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]], i[e[r++]]].join("")
    }
}, function(e, t, n) {
    e.exports = n(23)
}, function(e, t, n) {
    ! function(t) {
        var r = -1,
            i = function(e) {
                return e.every = function(t, n, i) {
                    e._time(), i || (i = n, n = null);
                    var o = r += 1;
                    return e._timers[o] = {
                        visible: t,
                        hidden: n,
                        callback: i
                    }, e._run(o, !1), e.isSupported() && e._listen(), o
                }, e.stop = function(t) {
                    return !!e._timers[t] && (e._stop(t), delete e._timers[t], !0)
                }, e._timers = {}, e._time = function() {
                    e._timed || (e._timed = !0, e._wasHidden = e.hidden(), e.change(function() {
                        e._stopRun(), e._wasHidden = e.hidden()
                    }))
                }, e._run = function(n, r) {
                    var i, o = e._timers[n];
                    if (e.hidden()) {
                        if (null === o.hidden) return;
                        i = o.hidden
                    } else i = o.visible;
                    var a = function() {
                        o.last = new Date, o.callback.call(t)
                    };
                    if (r) {
                        var s = new Date - o.last;
                        i > s ? o.delay = setTimeout(function() {
                            o.id = setInterval(a, i), a()
                        }, i - s) : (o.id = setInterval(a, i), a())
                    } else o.id = setInterval(a, i)
                }, e._stop = function(t) {
                    var n = e._timers[t];
                    clearInterval(n.id), clearTimeout(n.delay), delete n.id, delete n.delay
                }, e._stopRun = function(t) {
                    var n = e.hidden(),
                        r = e._wasHidden;
                    if (n && !r || !n && r)
                        for (var i in e._timers) e._stop(i), e._run(i, !n)
                }, e
            };
        "undefined" != typeof e && e.exports ? e.exports = i(n(4)) : i(t.Visibility || n(4))
    }(window)
}]);