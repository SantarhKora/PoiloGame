var GameConfig, console, GameLib, CreateAll, loadRec, GameMenu, GameHelp, GamePlay, ArrayUtil, Point, MouseUtil, MovieUtil, fullscreenHandle, Distance, SlideUtil, TransformUtil, GameOver, languageUI, languageData, GameSound;
(function() {
    function a(c, h, g) {
        if (!c) {
            return
        };
        var d = this.location.href.split("://")[1].split("/")[0].split(":")[0];
        var a = c.split(";");
        for (var f = 0; f < a.length; f++) {
            var b = a[f];
            if (b == d) {
                return
            };
            if (!h) {
                continue
            };
            b = d.split("." + b);
            if (b.length == 2 && !b[1]) {
                return
            }
        };
		return;
        throw (g || "error")
    }

    function b() {
        function b(a, b, c) {
            return a.call.apply(a.bind, arguments)
        }

        function f(a, b, d) {
            if (!a) {
                throw Error()
            };
            if (2 < arguments.length) {
                var c = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var d = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(d, c);
                    return a.apply(b, d)
                }
            };
            return function() {
                return a.apply(b, arguments)
            }
        }

        function P(a, c, d) {
            P = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? b : f;
            return P.apply(null, arguments)
        }
        var S = Date.now || function() {
            return +new Date
        };

        function i(a, b) {
            this.a = a;
            this.m = b || a;
            this.c = this.m.document
        }
        var l = !!window.FontFace;

        function Z(a, b, d, c) {
            b = a.c.createElement(b);
            if (d) {
                for (var f in d) {
                    d.hasOwnProperty(f) && ("style" == f ? b.style.cssText = d[f] : b.setAttribute(f, d[f]))
                }
            };
            c && b.appendChild(a.c.createTextNode(c));
            return b
        }

        function bc(a, b, c) {
            a = a.c.getElementsByTagName(b)[0];
            a || (a = document.documentElement);
            a.insertBefore(c, a.lastChild)
        }

        function bf(a) {
            a.parentNode && a.parentNode.removeChild(a)
        }

        function bi(a, b, d) {
            b = b || [];
            d = d || [];
            for (var c = a.className.split(/\s+/), f = 0; f < b.length; f += 1) {
                for (var g = !1, h = 0; h < c.length; h += 1) {
                    if (b[f] === c[h]) {
                        g = !0;
                        break
                    }
                };
                g || c.push(b[f])
            };
            b = [];
            for (f = 0; f < c.length; f += 1) {
                g = !1;
                for (h = 0; h < d.length; h += 1) {
                    if (c[f] === d[h]) {
                        g = !0;
                        break
                    }
                };
                g || b.push(c[f])
            };
            a.className = b.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")
        }

        function bn(a, b) {
            for (var d = a.className.split(/\s+/), c = 0, f = d.length; c < f; c++) {
                if (d[c] == b) {
                    return !0
                }
            };
            return !1
        }

        function bq(a) {
            if ("string" === typeof a.f) {
                return a.f
            };
            var b = a.m.location.protocol;
            "about:" == b && (b = a.a.location.protocol);
            return "https:" == b ? "https:" : "http:"
        }

        function p(a) {
            return a.m.location.hostname || a.a.location.hostname
        }

        function a(a, b, d) {
            function c() {
                i && f && g && (i(h), i = null)
            }
            b = Z(a, "link", {
                rel: "stylesheet",
                href: b,
                media: "all"
            });
            var f = !1,
                g = !0,
                h = null,
                i = d || null;
            l ? (b.onload = function() {
                f = !0;
                c()
            }, b.onerror = function() {
                f = !0;
                h = Error("Stylesheet failed to load");
                c()
            }) : setTimeout(function() {
                f = !0;
                c()
            }, 0);
            bc(a, "head", b)
        }

        function d(a, b, d, c) {
            var f = a.c.getElementsByTagName("head")[0];
            if (f) {
                var g = Z(a, "script", {
                        src: b
                    }),
                    h = !1;
                g.onload = g.onreadystatechange = function() {
                    h || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (h = !0, d && d(null), g.onload = g.onreadystatechange = null, "HEAD" == g.parentNode.tagName && f.removeChild(g))
                };
                f.appendChild(g);
                setTimeout(function() {
                    h || (h = !0, d && d(Error("Script load timeout")))
                }, c || 5E3);
                return g
            };
            return null
        }

        function h() {
            this.a = 0;
            this.c = null
        }

        function k(a) {
            a.a++;
            return function() {
                a.a--;
                o(a)
            }
        }

        function r(a, b) {
            a.c = b;
            o(a)
        }

        function o(a) {
            0 == a.a && a.c && (a.c(), a.c = null)
        }

        function u(a) {
            this.a = a || "-"
        }
        u.prototype.c = function(a) {
            for (var b = [], c = 0; c < arguments.length; c++) {
                b.push(arguments[c].replace(/[\W_]+/g, "").toLowerCase())
            };
            return b.join(this.a)
        };

        function x(a, b) {
            this.c = a;
            this.f = 4;
            this.a = "n";
            var c = (b || "n4").match(/^([nio])([1-9])$/i);
            c && (this.a = c[1], this.f = parseInt(c[2], 10))
        }

        function s(a) {
            return A(a) + " " + (a.f + "00") + " 300px " + D(a.c)
        }

        function D(a) {
            var b = [];
            a = a.split(/,\s*/);
            for (var d = 0; d < a.length; d++) {
                var c = a[d].replace(/['"]/g, ""); - 1 != c.indexOf(" ") || /^\d/.test(c) ? b.push("\'" + c + "\'") : b.push(c)
            };
            return b.join(",")
        }

        function F(a) {
            return a.a + a.f
        }

        function A(a) {
            var b = "normal";
            "o" === a.a ? b = "oblique" : "i" === a.a && (b = "italic");
            return b
        }

        function v(a) {
            var b = 4,
                d = "n",
                c = null;
            a && ((c = a.match(/(normal|oblique|italic)/i)) && c[1] && (d = c[1].substr(0, 1).toLowerCase()), (c = a.match(/([1-9]00|normal|bold)/i)) && c[1] && (/bold/i.test(c[1]) ? b = 7 : /[1-9]00/.test(c[1]) && (b = parseInt(c[1].substr(0, 1), 10))));
            return d + b
        }

        function y(a, b) {
            this.c = a;
            this.f = a.m.document.documentElement;
            this.h = b;
            this.a = new u("-");
            this.j = !1 !== b.events;
            this.g = !1 !== b.classes
        }

        function B(a) {
            a.g && bi(a.f, [a.a.c("wf", "loading")]);
            H(a, "loading")
        }

        function J(a) {
            if (a.g) {
                var b = bn(a.f, a.a.c("wf", "active")),
                    d = [],
                    c = [a.a.c("wf", "loading")];
                b || d.push(a.a.c("wf", "inactive"));
                bi(a.f, d, c)
            };
            H(a, "inactive")
        }

        function H(a, b, c) {
            if (a.j && a.h[b]) {
                if (c) {
                    a.h[b](c.c, F(c))
                } else {
                    a.h[b]()
                }
            }
        }

        function E() {
            this.c = {}
        }

        function G(a, b, d) {
            var c = [],
                f;
            for (f in b) {
                if (b.hasOwnProperty(f)) {
                    var g = a.c[f];
                    g && c.push(g(b[f], d))
                }
            };
            return c
        }

        function L(a, b) {
            this.c = a;
            this.f = b;
            this.a = Z(this.c, "span", {
                "aria-hidden": "true"
            }, this.f)
        }

        function N(a) {
            bc(a.c, "body", a.a)
        }

        function Q(a) {
            return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + D(a.c) + ";" + ("font-style:" + A(a) + ";font-weight:" + (a.f + "00") + ";")
        }

        function T(a, b, d, c, f, g) {
            this.g = a;
            this.j = b;
            this.a = c;
            this.c = d;
            this.f = f || 3E3;
            this.h = g || void(0)
        }
        T.prototype.start = function() {
            var a = this.c.m.document,
                b = this,
                d = S(),
                c = new Promise(function(c, f) {
                    function g() {
                        S() - d >= b.f ? f() : a.fonts.load(s(b.a), b.h).then(function(a) {
                            1 <= a.length ? c() : setTimeout(g, 25)
                        }, function() {
                            f()
                        })
                    }
                    g()
                }),
                f = new Promise(function(a, c) {
                    setTimeout(c, b.f)
                });
            Promise.race([f, c]).then(function() {
                b.g(b.a)
            }, function() {
                b.j(b.a)
            })
        };

        function V(a, b, f, c, g, h, i) {
            this.v = a;
            this.B = b;
            this.c = f;
            this.a = c;
            this.s = i || "BESbswy";
            this.f = {};
            this.w = g || 3E3;
            this.u = h || null;
            this.o = this.j = this.h = this.g = null;
            this.g = new L(this.c, this.s);
            this.h = new L(this.c, this.s);
            this.j = new L(this.c, this.s);
            this.o = new L(this.c, this.s);
            a = new x(this.a.c + ",serif", F(this.a));
            a = Q(a);
            this.g.a.style.cssText = a;
            a = new x(this.a.c + ",sans-serif", F(this.a));
            a = Q(a);
            this.h.a.style.cssText = a;
            a = new x("serif", F(this.a));
            a = Q(a);
            this.j.a.style.cssText = a;
            a = new x("sans-serif", F(this.a));
            a = Q(a);
            this.o.a.style.cssText = a;
            N(this.g);
            N(this.h);
            N(this.j);
            N(this.o)
        }
        var X = {
                D: "serif",
                C: "sans-serif"
            },
            ba = null;

        function bd() {
            if (null === ba) {
                var a = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
                ba = !!a && (536 > parseInt(a[1], 10) || 536 === parseInt(a[1], 10) && 11 >= parseInt(a[2], 10))
            };
            return ba
        }
        V.prototype.start = function() {
            this.f.serif = this.j.a.offsetWidth;
            this.f["sans-serif"] = this.o.a.offsetWidth;
            this.A = S();
            I(this)
        };

        function K(a, b, d) {
            for (var c in X) {
                if (X.hasOwnProperty(c) && b === a.f[X[c]] && d === a.f[X[c]]) {
                    return !0
                }
            };
            return !1
        }

        function I(b) {
            var c = b.g.a.offsetWidth,
                g = b.h.a.offsetWidth,
                f;
            (f = c === b.f.serif && g === b.f["sans-serif"]) || (f = bd() && K(b, c, g));
            f ? S() - b.A >= b.w ? bd() && K(b, c, g) && (null === b.u || b.u.hasOwnProperty(b.a.c)) ? bg(b, b.v) : bg(b, b.B) : M(b) : bg(b, b.v)
        }

        function M(a) {
            setTimeout(P(function() {
                I(this)
            }, a), 50)
        }

        function bg(a, b) {
            setTimeout(P(function() {
                bf(this.g.a);
                bf(this.h.a);
                bf(this.j.a);
                bf(this.o.a);
                b(this.a)
            }, a), 0)
        }

        function bj(a, b, c) {
            this.c = a;
            this.a = b;
            this.f = 0;
            this.o = this.j = !1;
            this.s = c
        }
        var bl = null;
        bj.prototype.g = function(a) {
            var b = this.a;
            b.g && bi(b.f, [b.a.c("wf", a.c, F(a).toString(), "active")], [b.a.c("wf", a.c, F(a).toString(), "loading"), b.a.c("wf", a.c, F(a).toString(), "inactive")]);
            H(b, "fontactive", a);
            this.o = !0;
            O(this)
        };
        bj.prototype.h = function(a) {
            var b = this.a;
            if (b.g) {
                var d = bn(b.f, b.a.c("wf", a.c, F(a).toString(), "active")),
                    c = [],
                    f = [b.a.c("wf", a.c, F(a).toString(), "loading")];
                d || c.push(b.a.c("wf", a.c, F(a).toString(), "inactive"));
                bi(b.f, c, f)
            };
            H(b, "fontinactive", a);
            O(this)
        };

        function O(a) {
            0 == --a.f && a.j && (a.o ? (a = a.a, a.g && bi(a.f, [a.a.c("wf", "active")], [a.a.c("wf", "loading"), a.a.c("wf", "inactive")]), H(a, "active")) : J(a.a))
        }

        function R(a) {
            this.j = a;
            this.a = new E;
            this.h = 0;
            this.f = this.g = !0
        }
        R.prototype.load = function(a) {
            this.c = new i(this.j, a.context || this.j);
            this.g = !1 !== a.events;
            this.f = !1 !== a.classes;
            U(this, new y(this.c, a), a)
        };

        function W(a, b, d, c, f) {
            var g = 0 == --a.h;
            (a.f || a.g) && setTimeout(function() {
                var a = f || null,
                    i = c || null || {};
                if (0 === d.length && g) {
                    J(b.a)
                } else {
                    b.f += d.length;
                    g && (b.j = g);
                    var h, k = [];
                    for (h = 0; h < d.length; h++) {
                        var j = d[h],
                            l = i[j.c],
                            n = b.a,
                            o = j;
                        n.g && bi(n.f, [n.a.c("wf", o.c, F(o).toString(), "loading")]);
                        H(n, "fontloading", o);
                        n = null;
                        null === bl && (bl = window.FontFace ? (o = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent)) ? 42 < parseInt(o[1], 10) : !0 : !1);
                        bl ? n = new T(P(b.g, b), P(b.h, b), b.c, j, b.s, l) : n = new V(P(b.g, b), P(b.h, b), b.c, j, b.s, a, l);
                        k.push(n)
                    };
                    for (h = 0; h < k.length; h++) {
                        k[h].start()
                    }
                }
            }, 0)
        }

        function U(a, b, d) {
            var c = [],
                f = d.timeout;
            B(b);
            var c = G(a.a, d, a.c),
                g = new bj(a.c, b, f);
            a.h = c.length;
            b = 0;
            for (d = c.length; b < d; b++) {
                c[b].load(function(b, c, d) {
                    W(a, g, b, c, d)
                })
            }
        }

        function Y(a, b) {
            this.c = a;
            this.a = b
        }

        function bb(a, b, d) {
            var c = bq(a.c);
            a = (a.a.api || "fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/, "");
            return c + "//" + a + "/" + b + ".js" + (d ? "?v=" + d : "")
        }
        Y.prototype.load = function(a) {
            function b() {
                if (g["__mti_fntLst" + f]) {
                    var c = g["__mti_fntLst" + f](),
                        d = [],
                        i;
                    if (c) {
                        for (var h = 0; h < c.length; h++) {
                            var j = c[h].fontfamily;
                            void(0) != c[h].fontStyle && void(0) != c[h].fontWeight ? (i = c[h].fontStyle + c[h].fontWeight, d.push(new x(j, i))) : d.push(new x(j))
                        }
                    };
                    a(d)
                } else {
                    setTimeout(function() {
                        b()
                    }, 50)
                }
            }
            var f = this.a.projectId,
                c = this.a.version;
            if (f) {
                var g = this.c.m;
                d(this.c, bb(this, f, c), function(c) {
                    c ? a([]) : b()
                }).id = "__MonotypeAPIScript__" + f
            } else {
                a([])
            }
        };

        function be(a, b) {
            this.c = a;
            this.a = b
        }
        be.prototype.load = function(b) {
            var c, f, d = this.a.urls || [],
                g = this.a.families || [],
                i = this.a.testStrings || {},
                j = new h;
            c = 0;
            for (f = d.length; c < f; c++) {
                a(this.c, d[c], k(j))
            };
            var n = [];
            c = 0;
            for (f = g.length; c < f; c++) {
                if (d = g[c].split(":"), d[1]) {
                    for (var l = d[1].split(","), o = 0; o < l.length; o += 1) {
                        n.push(new x(d[0], l[o]))
                    }
                } else {
                    n.push(new x(d[0]))
                }
            };
            r(j, function() {
                b(n, i)
            })
        };

        function bh(a, b, c) {
            a ? this.c = a : this.c = b + bk;
            this.a = [];
            this.f = [];
            this.g = c || ""
        }
        var bk = "//fonts.googleapis.com/css";

        function bm(a, b) {
            for (var d = b.length, c = 0; c < d; c++) {
                var f = b[c].split(":");
                3 == f.length && a.f.push(f.pop());
                var g = "";
                2 == f.length && "" != f[1] && (g = ":");
                a.a.push(f.join(g))
            }
        }

        function bp(a) {
            if (0 == a.a.length) {
                throw Error("No fonts to load!")
            };
            if (-1 != a.c.indexOf("kit=")) {
                return a.c
            };
            for (var b = a.a.length, d = [], c = 0; c < b; c++) {
                d.push(a.a[c].replace(/ /g, "+"))
            };
            b = a.c + "?family=" + d.join("%7C");
            0 < a.f.length && (b += "&subset=" + a.f.join(","));
            0 < a.g.length && (b += "&text=" + encodeURIComponent(a.g));
            return b
        }

        function bs(a) {
            this.f = a;
            this.a = [];
            this.c = {}
        }
        var c = {
                latin: "BESbswy",
                cyrillic: "йяЖ",
                greek: "αβΣ",
                khmer: "កខគ",
                Hanuman: "កខគ"
            },
            g = {
                thin: "1",
                extralight: "2",
                "extra-light": "2",
                ultralight: "2",
                "ultra-light": "2",
                light: "3",
                regular: "4",
                book: "4",
                medium: "5",
                "semi-bold": "6",
                semibold: "6",
                "demi-bold": "6",
                demibold: "6",
                bold: "7",
                "extra-bold": "8",
                extrabold: "8",
                "ultra-bold": "8",
                ultrabold: "8",
                black: "9",
                heavy: "9",
                l: "3",
                r: "4",
                b: "7"
            },
            j = {
                i: "i",
                italic: "i",
                n: "n",
                normal: "n"
            },
            n = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;

        function q(a) {
            for (var b = a.f.length, f = 0; f < b; f++) {
                var d = a.f[f].split(":"),
                    h = d[0].replace(/\+/g, " "),
                    i = ["n4"];
                if (2 <= d.length) {
                    var k;
                    var o = d[1];
                    k = [];
                    if (o) {
                        for (var o = o.split(","), l = o.length, q = 0; q < l; q++) {
                            var p;
                            p = o[q];
                            if (p.match(/^[\w-]+$/)) {
                                var r = n.exec(p.toLowerCase());
                                if (null == r) {
                                    p = ""
                                } else {
                                    p = r[2];
                                    p = null == p || "" == p ? "n" : j[p];
                                    r = r[1];
                                    if (null == r || "" == r) {
                                        r = "4"
                                    } else {
                                        var s = g[r],
                                            r = s ? s : isNaN(r) ? "4" : r.substr(0, 1)
                                    };
                                    p = [p, r].join("")
                                }
                            } else {
                                p = ""
                            };
                            p && k.push(p)
                        }
                    };
                    0 < k.length && (i = k);
                    3 == d.length && (d = d[2], k = [], d = d ? d.split(",") : k, 0 < d.length && (d = c[d[0]]) && (a.c[h] = d))
                };
                a.c[h] || (d = c[h]) && (a.c[h] = d);
                for (d = 0; d < i.length; d += 1) {
                    a.a.push(new x(h, i[d]))
                }
            }
        }

        function t(a, b) {
            this.c = a;
            this.a = b
        }
        var w = {
            Arimo: !0,
            Cousine: !0,
            Tinos: !0
        };
        t.prototype.load = function(b) {
            var c = new h,
                f = this.c,
                d = new bh(this.a.api, bq(f), this.a.text),
                g = this.a.families;
            bm(d, g);
            var i = new bs(g);
            q(i);
            a(f, bp(d), k(c));
            r(c, function() {
                b(i.a, i.c, w)
            })
        };

        function z(a, b) {
            this.c = a;
            this.a = b
        }
        z.prototype.load = function(a) {
            var b = this.a.id,
                c = this.c.m;
            b ? d(this.c, (this.a.api || "https://use.typekit.net") + "/" + b + ".js", function(b) {
                if (b) {
                    a([])
                } else {
                    if (c.Typekit && c.Typekit.config && c.Typekit.config.fn) {
                        b = c.Typekit.config.fn;
                        for (var d = [], f = 0; f < b.length; f += 2) {
                            for (var g = b[f], i = b[f + 1], h = 0; h < i.length; h++) {
                                d.push(new x(g, i[h]))
                            }
                        };
                        try {
                            c.Typekit.load({
                                events: !1,
                                classes: !1,
                                async: !0
                            })
                        } catch (m) {};
                        a(d)
                    }
                }
            }, 2E3) : a([])
        };

        function C(a, b) {
            this.c = a;
            this.f = b;
            this.a = []
        }
        C.prototype.load = function(a) {
            var b = this.f.id,
                f = this.c.m,
                c = this;
            b ? (f.__webfontfontdeckmodule__ || (f.__webfontfontdeckmodule__ = {}), f.__webfontfontdeckmodule__[b] = function(b, d) {
                for (var f = 0, h = d.fonts.length; f < h; ++f) {
                    var g = d.fonts[f];
                    c.a.push(new x(g.name, v("font-weight:" + g.weight + ";font-style:" + g.style)))
                };
                a(c.a)
            }, d(this.c, bq(this.c) + (this.f.api || "//f.fontdeck.com/s/css/js/") + p(this.c) + "/" + b + ".js", function(b) {
                b && a([])
            })) : a([])
        };
        var bo = new R(window);
        bo.a.c.custom = function(a, b) {
            return new be(b, a)
        };
        bo.a.c.fontdeck = function(a, b) {
            return new C(b, a)
        };
        bo.a.c.monotype = function(a, b) {
            return new Y(b, a)
        };
        bo.a.c.typekit = function(a, b) {
            return new z(b, a)
        };
        bo.a.c.google = function(a, b) {
            return new t(b, a)
        };
        var br = {
            load: P(bo.load, bo)
        };
        "function" === typeof define && define.amd ? define(function() {
            return br
        }) : "undefined" !== typeof module && module.exports ? module.exports = br : (window.WebFont = br, window.WebFontConfig && bo.load(window.WebFontConfig))
    }

    function c() {}

    function d() {}

    function f() {}

    function g() {}

    function h() {}

    function i() {
        var c = 3,
            b = document.createElement("div"),
            a = b.getElementsByTagName("i");
        do {
            b.innerHTML = "<!--[if gt IE " + (++c) + "]><i></i><![endif]-->"
        } while (a[0]);;
        return c > 4 ? c : document.documentMode
    }

    function j() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var a = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [+a[1], +a[2], +(a[3] || 0)]
        };
        return false
    }

    function k() {
        h5api.moreGame()
    }

    function l(b) {
        var a = new RegExp(b + "=([^&#=]*)");
        a = a.exec(location.search);
        if (null === a) {
            return false
        };
        return decodeURIComponent(a[1])
    }

    function n() {
        var b = ",zh,en,nl,es,pt,fr,it,de,ru,in,pl,tr,",
            a = localStorage.getItem("lang");
			//console.log(a);
        /*if (null === a) {
            a = GameLib.getStorage("lang");
            if (!a) {
                a = GameLib.$_GET("lang");
                if (!a || b.indexOf("," + a + ",") == -1) {
                    a = null
                }
            }
        };*/
        if (null === a) {
            a = (navigator.language || navigator.userLanguage).substr(0, 2);
			//console.log(a);
			var test = b.indexOf("," + a + ",") == -1 ? "en" : a;
			//console.log(test);
            return test;
        };
        return a
    }

    function o(b) {
		b=n();
		//console.log(b);
        GameLib.lang = b;
        localStorage.setItem("lang", b);
        try {
            GameHiscore.set("lang", b)
        } catch (e) {};
        /*var a = document.getElementById("cookieBar");
        if (a) {
            a.src = "//cdn.4399.com/cookie/?lang=" + escape(b)
        }*/
    }

    function p() {
        var a = location.hostname,
            b, c = (parent === window) ? null : document.referrer;
        if (c !== null) {
            a = c
        } else {
            if (document.referrer) {
                a = document.referrer
            }
        };
        a = a.replace(/^https?:\/\//i, "").replace(/^(www|dev)\./, "");
        b = a.indexOf("/");
        if (b != -1) {
            a = a.substr(0, b)
        };
        return a
    }

    function q(l, n, o, g, j) {
        this.closePopup();
        o = o || 400;
        g = g || 300;
        if (typeof(j) == "undefined") {
            j = true
        };
        var p = document.createElement("div"),
            f = document.createElement("div"),
            d = document.documentElement.clientWidth,
            a = document.documentElement.clientHeight,
            i = !GameLib.isTouch && (window.devicePixelRatio === undefined || window.devicePixelRatio === 1) && screen.width > 1000,
            h = [],
            c = -15;
        if (!j && !i) {
            o = d - 32;
            g = a - 32;
            c = 0
        };
        f.className = "popup";
        p.className = "popupWrap close";
        p.onclick = function(a) {
            if (/close/.test(a.target.className)) {
                GameLib.closePopup()
            }
        };
        GameLib.popup = p;
        var k = "width:" + o + "px;height:" + g + "px;margin-left:-" + (o / 2) + "px;margin-top:-" + (g / 2) + "px;";
        if (j) {
            k += "transform:scale(" + GameLib.scale + ");-webkit-transform:scale(" + GameLib.scale + ");-ms-transform:scale(" + GameLib.scale + ")"
        };
        f.setAttribute("style", k);
        p.appendChild(f);
        if (l) {
            g -= 32;
            h.push("<div class=\"title\">" + l + "</div>")
        };
        var b = /\.html$/.test(n) || /^https?:\/\//.test(n) ? "<iframe src=\"" + n + "\" style=\"display:block;width:" + o + "px;height:" + g + "px\" frameborder=\"0\"></iframe>" : "<div style=\"padding:5px 10px\">" + n + "</div>";
        //h.push("<div style=\"overflow:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;width:" + o + "px;height:" + g + "px\">" + b + "</div>", "<img src=\"img/close.png\" class=\"close\" style=\"right:" + c + "px;top:" + c + "px\">");
        f.innerHTML = h.join("");
        document.body.appendChild(p);
        return false
    }

    function r() {
        if (this.popup) {
            this.popup.parentNode.removeChild(this.popup);
            this.popup = null
        }
    }

    function s(b, o, f) {
        var j = document.getElementById("rotateHint"),
            n = Math.min(document.documentElement.clientWidth, window.innerWidth),
            l = Math.min(document.documentElement.clientHeight, window.innerHeight),
            g = n > l,
            d = o || n,
            c = f || l;
        if (GameLib.scalable) {
            GameLib.scale = Math.min(d / GameLib.gameWidth, c / GameLib.gameHeight);
            GameLib.containerDiv.style.webkitTransform = GameLib.containerDiv.style.msTransform = GameLib.containerDiv.style.transform = "scale(" + GameLib.scale + ")"
        } else {
            var k = document.querySelector("meta[name=viewport]"),
                a = "width=" + GameLib.gameWidth;
            if (g && GameLib.gameHeight > window.innerHeight && GameLib.gameWidth <= n) {
                a = "height=" + GameLib.gameHeight
            };
            k.setAttribute("content", "minimal-ui,user-scalable=0," + a)
        };
        if (ThirdParty.showRotateHint) {
            var i = GameConfig.orientation || "landscape";
            j.style.display = GameLib.isTouch && ((i == "landscape" && !g) || (i == "portrait" && g)) ? "block" : "none"
        };
        if (ThirdParty.centerHorizontally) {
            var h = GameLib.scale * GameLib.gameWidth < n ? (n - GameLib.scale * GameLib.gameWidth) / 2 : 0;
            GameLib.containerDiv.style.marginLeft = h + "px"
        };
        if (ThirdParty.centerVertically) {
            var h = GameLib.scale * GameLib.gameHeight <= l ? (l - GameLib.scale * GameLib.gameHeight) / 2 : 0;
            GameLib.containerDiv.style.marginTop = h + "px"
        };
        if (GameLib.iOSversion) {
            window.scrollTo(0, -64)
        }
    }

    function t(a) {
        return this.storageJar[a] !== undefined ? this.storageJar[a] : false
    }

    function u(a, b) {
        if (typeof a === "object") {
            for (var c in a) {
                if (null === a[c]) {
                    delete this.storageJar[c]
                } else {
                    this.storageJar[c] = a[c]
                }
            }
        } else {
            if (null === b) {
                delete this.storageJar[a]
            } else {
                this.storageJar[a] = b
            }
        };
        this.saveStorage()
    }

    function v() {
        localStorage.setItem(this.gameName, JSON.stringify(this.storageJar))
    }

    function w(d, k, f) {
        if (/debug/.test(location.search)) {
            window.onerror = function(b, c, a) {
                alert("Error in line " + a + " of " + c + ":\x0A" + b)
            }
        } else {
            document.addEventListener("contextmenu", function(a) {
                a.preventDefault()
            }, false)
        };
        GameLib.gameName = d;
        GameLib.gameWidth = k;
        GameLib.gameHeight = f;
        document.getElementById("rotateHint").addEventListener("click", function() {
            this.style.display = "none"
        });
        var a = GameLib.$_GET("bgcolor");
        if (false !== a) {
            document.documentElement.style.backgroundColor = a;
            document.documentElement.style.backgroundImage = "none"
        } else {
            if (ThirdParty.background) {
                document.documentElement.style.background = /([\.\/])/.test(ThirdParty.background) ? "url(" + ThirdParty.background + ")" : ThirdParty.background
            }
        };
        GameLib.containerDiv = document.getElementById("gameContainer");
        GameLib.containerDiv.style.width = k + "px";
        GameLib.containerDiv.style.height = f + "px";
        if (/noscale/.test(location.search)) {
            GameLib.scalable = false;
            if (GameLib.isIE) {
                var h = document.createElement("style");
                h.appendChild(document.createTextNode("@-ms-viewport{width:" + k + "px; height:" + f + "px}"));
                document.querySelector("head").appendChild(h)
            }
        };
        try {
            var g = "test";
            localStorage.setItem(g, g);
            localStorage.removeItem(g)
        } catch (e) {
            this.showPopup("Private Browsing", "You seem to be browsing in private mode. This game does not work in private mode, while we cannot use local storage for storing your score, progress etc.<br>Please run this game in a regular (non-private) browser window.", 300, 200)
        };
        var j = localStorage.getItem(this.gameName);
        if (null !== j) {
            this.storageJar = JSON.parse(j)
        };
        this.setStorage("gameOver", null);
        if (this.iOSversion && this.iOSversion[0] >= 7 && this.iOSversion[1] >= 1) {
            document.addEventListener("touchmove", function(a) {
                a.preventDefault()
            }, false)
        };
        window.addEventListener("idle", function() {
            GameSound.setIdle(true)
        }, false);
        window.addEventListener("wakeup", function() {
            GameSound.setIdle(false)
        }, false);
        window.addEventListener(GameLib.iOSversion ? "orientationchange" : "resize", GameLib.scaleGame, false);
        var b = document.createEvent("Event");
        b.initEvent("gameready", true, true);
        b.gameName = d;
        document.dispatchEvent(b);
        GameLib.scaleGame();
        gradle.orderInit(1);
        if (GameLib.IEversion && GameLib.IEversion < 10) {

        };
        if (GameLib.iOSversion && GameLib.iOSversion[0] < 6) {
            alert("This game is incompatible with your device. Please upgrade to iOS6 or newer.")
        };
        if (/iP(od|hone)/.test(navigator.userAgent) && !navigator.standalone) {
            GameLib.windowHeight = window.innerHeight;
            setInterval(function() {
                if (window.innerHeight != GameLib.windowHeight) {
                    GameLib.windowHeight = window.innerHeight;
                    GameLib.scaleGame()
                }
            }, 500)
        };
        var i = true;
        
        window.focus()
    }

    function x(f, g, a, d, b) {
        var c = document.createElement("div");
        c.style.position = "absolute";
        c.style.display = "none";
        c.style.left = f + "px";
        c.style.top = g + "px";
        c.className = a;
        d.appendChild(c);
        b.push(c);
        return c
    }

    function y(d, f, c, a) {
        var b = document.createElement("div");
        b.style.position = "absolute";
        b.style.left = d + "px";
        b.style.top = f + "px";
        c.appendChild(b);
        a.push(b);
        return b
    }

    function z(g, i, j, h, c, f, b) {
        var a = document.createElement("img");
        var d = loadRec.resource[g];
        a.style.top = j + "px";
        a.style.left = i + "px";
        a.src = d.src;
        a.width = h;
        a.height = c;
        a.style.position = "absolute";
        b.push(a);
        f.appendChild(a);
        return a
    }

    function A(d, f, b, a) {
        var c = document.createElement("div");
        c.style.left = d + "px";
        c.style.top = f + "px";
        c.className = "number";
        b.appendChild(c);
        a.push(c);
        return c
    }

    function B(d, f, g, c, a) {
        var b = loadRec.resource[d];
        b.style.position = "absolute";
        b.style.left = f + "px";
        b.style.top = g + "px";
        b.draggable = false;
        c.appendChild(b);
        a.push(b);
        return b
    }

    function C(g, h, f, b, d, a) {
        var c = document.createElement("div");
        a.push(c);
        c.className = "lang";
        c.style.left = g + "px";
        c.style.top = h + "px";
        c.style.width = f + "px";
        c.width = f;
        c.style.height = b + "px";
        c.height = b;
        c.draggable = false;
        d.appendChild(c);
        return c
    }

    function D(g, h, i, f, a, b, c) {
        var d;
        if (a) {
            d = document.createElement("div");
            languageUI.getCanVas(g, d, true)
        } else {
            d = loadRec.resource[g]
        };
        b.push(d);
        d.style.position = "absolute";
        d.style.left = h + "px";
        d.style.top = i + "px";
        if (c) {
            d.style.cursor = "pointer"
        };
        d.draggable = false;
        f.appendChild(d);
        return d
    }

    function E(h, i, j, g, a, c) {
        var d = document.createElement("div");
        var f;
        var b;
        if (a) {
            f = document.createElement("div");
            languageUI.getCanVas(h, f, true);
            b = this.CreateImgBg("btbg", 0, 0, +(f.width) + (this.btbgMarginl), +(f.height) + (this.btbgMargint), d, c);
            b.style.left = +(i) - this.btbgMarginl / 2 + "px";
            b.style.top = +(j) - this.btbgMargint / 2 + 3 + "px";
            b.style.cursor = "pointer";
            b.draggable = false
        } else {
            f = loadRec.resource[h];
            d.btn = f
        };
        c.push(f);
        f.style.position = "absolute";
        f.style.left = i + "px";
        f.style.top = j + "px";
        f.style.cursor = "pointer";
        f.draggable = false;
        d.appendChild(f);
        g.appendChild(d);
        f.onmousedown = function(a) {
            f.style.top = (j + 1) + "px";
            f.style.left = (i + 1) + "px";
            if (b) {
                b.style.top = (j - 1 - this.btbgMargint / 2) + "px"
            }
        };
        f.onmouseup = function(a) {
            f.style.top = j + "px";
            f.style.left = i + "px";
            if (b) {
                b.style.top = (j - this.btbgMargint / 2) + "px"
            }
        };
        c.push(d);
        return d
    }

    function F(b) {
        var a = 0,
            c = 0,
            h = 0,
            g = 0,
            i = 0;
        if (loadRec.images && loadRec.images.length > 0) {
            h = loadRec.images.length
        };
        if (loadRec.fonts && loadRec.fonts.length > 0) {
            g = loadRec.fonts.length
        };
        i = h + g;

        function d(b) {
            if (g == 0) {
                if (b) {
                    b()
                };
                return
            };
            WebFont.load({
                custom: {
                    families: loadRec.fonts
                },
                timeout: 1500,
                fontactive: function() {
                    loadRec.loadPerc.style.width = Math.floor(++a * 100 / i) + "%";
                    //h5api.progress(Math.floor(a * 100 / i), Math.floor(a * 100 / i) + "%")
                },
                fontinactive: function(a) {
                    console.log("ERROR: Font not found: " + a)
                },
                active: function() {
                    if (b) {
                        b()
                    }
                }
            })
        }

        function f(b) {
            var d = new Image();
            d.onload = function() {
                loadRec.loadPerc.style.width = Math.floor(++a * 100 / i) + "%";
                //h5api.progress(Math.floor(a * 100 / i), Math.floor(a * 100 / i) + "%");
                if (a < h) {
                    f(b)
                } else {
                    if (b) {
                        b()
                    }
                }
            };
            d.onerror = function(a) {
                alert("ERROR: Image not found: " + a.target.src)
            };
            loadRec.resource[loadRec.images[c].id] = d;
            d.src = loadRec.images[c++].src
        }
        f(function() {
            d(b)
        })
    }

    function G() {
        var a = new Image();
        if (typeof ThirdParty.splashScreen !== "undefined") {
            a.src = ThirdParty.splashScreen
        } else {
            a.src = "img/loading.jpg"
        };
        a.className = "backPos";
        gameContainer.appendChild(a);
        this.data.push(a);
        a.onload = function() {
            var a = document.createElement("div");
            a.className = "progressbar";
            a.innerHTML = "<div id=\"loadPerc\"></div>";
            gameContainer.appendChild(a);
            loadRec.data.push(a);
            loadRec.loadPerc = document.getElementById("loadPerc");
            loadRec.preload(function() {
                gradle.orderInit(2);
                ThirdParty.loadingComplete()
            })
        }
    }

    function H() {
        window.focus();
        ThirdParty.gameStart();
        gradle.orderInit(4);
        GameMenu.remAll()
    }

    function I() {
        var a = this.data;
        GameSound.stopMusic();
        ThirdParty.mainMenu();
        var b = CreateAll.CreatedImg("back_menu", 0, 0, gameContainer, a);
        Hammer(b).on("tap", function(a) {
            languageUI.closeUI()
        });

        /// Button Menu
        b = languageUI.getButton("d_Play", 220, 50, 140, 420, 160, 40, 30, 5, true, gameContainer, a, "button", "center", 21);
        b.onmousedown = function() {
            GameMenu.startGame()
        };
        b = languageUI.getButton("d_Help", 220, 50, 160, 490, 160, 40, 30, 5, true, gameContainer, a, "button", "center", 21);
        Hammer(b).on("tap", function() {
            gradle.orderInit(3);
            GameMenu.remAll()
        });
        if (GameLib.online) {
            b = languageUI.getButton("d_HighScore", 220, 50, 140, 560, 160, 40, 30, 5, true, gameContainer, a, "button", "center", 21);
            Hammer(b).on("tap", function(a) {
                ThirdParty.showLeaderboard()
            })
        };
        this.savePanel = CreateAll.CreatedPanel(0, 0, "panel_bg", gameContainer, a);
        this.createSave();
        languageUI.init(gameContainer);
        if (GameConfig.credits) {}
    }

    function J() {
        im = languageUI.getButton("d_ContinuePreviousGame", 300, 60, 90, 270, 280, 50, 10, 8, true, GameMenu.savePanel, this.data, "button", "center", 20);
        Hammer(im).on("tap", function(a) {
            gradle.orderInit(4);
            GameMenu.savePanel.style = "none";
            GameMenu.remAll()
        });
        im = languageUI.getButton("d_StartNewGame", 300, 60, 90, 360, 280, 50, 10, 8, true, GameMenu.savePanel, this.data, "button", "center", 20);
        Hammer(im).on("tap", function(a) {
            GameLib.setStorage({
                score: 0,
                level: 1
            });
            GameMenu.savePanel.style = "none";
            gradle.orderInit(4);
            GameMenu.remAll()
        })
    }

    function K() {
        if (GameMenu.sheZhiDiv && GameMenu.sheZhiDiv.parentNode) {
            GameMenu.sheZhiDiv.parentNode.removeChild(GameMenu.sheZhiDiv)
        };
        GameMenu.sheZhiDiv = CreateAll.CreatedPanel(0, 0, "panel_bg", gameContainer, this.data);
        var b = languageUI.getButton("d_Reset", 230, 50, 250, 470, 198, 40, 16, 10, true, GameMenu.sheZhiDiv, this.data, "button", "center", 28);
        Hammer(b).on("tap", function(a) {
            GameLib.setStorage({
                score: 0,
                level: 1,
                scoreData: {},
                starData: {}
            });
            GameMenu.sheZhiDiv.style.display = "none"
        });
        b = CreateAll.CreateImgBg("close", 440, 80, 34, 34, GameMenu.sheZhiDiv, this.data);
        Hammer(b).on("tap", function(a) {
            GameMenu.sheZhiDiv.style.display = "none"
        });
        var c = CreateAll.CreatedButton("music1", 160, 400, GameMenu.sheZhiDiv, false, this.data);
        var d = CreateAll.CreatedButton("music2", 160, 400, GameMenu.sheZhiDiv, false, this.data);
        var a = function(a) {
            c.style.display = "";
            d.style.display = "none";
            GameSound.muteSound(true)
        };
        Hammer(d).on("tap", a);
        a = function(a) {
            c.style.display = "none";
            d.style.display = "";
            GameSound.muteSound(false)
        };
        Hammer(c).on("tap", a);
        var f = CreateAll.CreatedButton("sound1", 290, 400, GameMenu.sheZhiDiv, false, this.data);
        var g = CreateAll.CreatedButton("sound2", 290, 400, GameMenu.sheZhiDiv, false, this.data);
        a = function() {
            f.style.display = "";
            g.style.display = "none";
            GameSound.muteMusic(true)
        };
        Hammer(g).on("tap", a);
        a = function() {
            f.style.display = "none";
            g.style.display = "";
            GameSound.muteMusic(false)
        };
        Hammer(f).on("tap", a);
        if (GameSound.musicMuted) {
            f.style.display = "";
            g.style.display = "none"
        } else {
            f.style.display = "none";
            g.style.display = ""
        };
        if (GameSound.soundMuted) {
            c.style.display = "";
            d.style.display = "none"
        } else {
            c.style.display = "none";
            d.style.display = ""
        };
        languageUI.getText("d_ResetClick", 380, 139, 80, 260, GameMenu.sheZhiDiv, this.data);
        GameMenu.sheZhiDiv.style.display = "";
        GameMenu.sheZhiDiv.style.zIndex = 1000
    }

    function L() {
        while (this.data.length > 0) {
            var a = this.data.pop();
            if (a && a.parentNode) {
                a.parentNode.removeChild(a)
            }
        }
    }

    function M() {
        ThirdParty.gameHelp();
        var a = CreateAll.CreatedImg("back_help", 0, 0, gameContainer, this.data);
        a = languageUI.getButton("d_Back", 0, 0, 170, 640, 120, 120, 20, 5, true, gameContainer, this.data, "button", "center", 22);
        Hammer(a).on("tap", function(a) {
            gradle.orderInit(2);
            GameHelp.remAll()
        });
        a = languageUI.getButton("d_Howtoplay", 0, 0, 120, 26, 240, 50, 0, 0, false, gameContainer, this.data, "button", "center", 40);
        a = languageUI.getText("d_HowtoplayText", 360, 100, 60, 170, gameContainer, this.data);
        languageUI.scaleTexts()
    }

    function N() {
        while (this.data.length > 0) {
            var a = this.data.pop();
            if (a && a.parentNode) {
                a.parentNode.removeChild(a)
            }
        }
    }

    function O() {
        var ca = 35;
        var bf = 35;
        var l = 36;
        var bI = 10;
        var j = Math.PI / 180;
        var bG = 180 / Math.PI;
        var bH, bR, bk;
        var bq = 42;
        var bS;
        var bw;
        var h, i;
        var F;
        var G;
        var x, k;
        var bN;
        var bO = 22;
        var bs, n;
        var bt = 30;
        var bF;
        var w;
        var H;
        var br;
        var o;
        var bo, I, bj;

        function A() {
            bq = GameConfig.dataArr.length - 2;
            I = bk = GameLib.getStorage("level");
            if (false === bk || bk <= 0) {
                bk = 1
            };
            bV.innerHTML = bk + (bq == 0 ? "" : "/" + bq);
            GameConfig.scoreData = GameLib.getStorage("scoreData") || {};
            GameConfig.starData = GameLib.getStorage("starData") || {};
            document.body.addEventListener("touchmove", function(a) {
            }, false);
            o = CreateAll.CreateDiv(0, 0, gameContainer, K);
            o.id = "cc";
            var i = CreateAll.CreateDiv(0, 0, o, K);
            i.cur = 0;
            var a = CreateAll.CreateDiv(0, 0, i, K);
            a.className = "mapbg";
            var b = languageUI.getButton("d_Play", 120, 45, 100, 740, 100, 35, 10, 5, true, o, K, "button", "center", 16);
            b.style.zIndex = 99;
            Hammer(b).on("tap", function(a) {
                f()
            });
            b = languageUI.getButton("d_Menu", 120, 45, 250, 740, 100, 35, 10, 5, true, o, K, "button", "center", 16);
            b.style.zIndex = 99;
            Hammer(b).on("tap", function(a) {
                v();
                bC();
                gradle.orderInit(2)
            });
            languageUI.getButton("d_TotalScore", 0, 0, 0, 700, 250, 30, 0, 0, false, o, K, "button", "right", 24);
            var n = CreateAll.CreateText(260, 700, o, K);
            n.className = "txtTotal";
            n.innerHTML = be();
            var j = GameConfig.mapPointer.split("@");
            var c = [];
            var h = j.length;
			console.log("test : "+h);
            for (var d = 0; d < h; d++) {
                c[d] = j[d].split(",");
                var g = CreateAll.CreateDiv(c[d][1], c[d][2], i, K);
                g.level = d + 1;
                g.className = d >= bk ? "map dismap" : "map pointer";
                g.text = CreateAll.CreateText(0, 10, g, K);
                g.text.innerHTML = "" + (d + 1);
                g.text.className = "txtLevel";
                Hammer(g).on("tap", function(a) {
					console.log('click_level');
                    if (a.currentTarget.level > bk) {
                        return
                    };
                    bk = a.currentTarget.level;
                    l();
                    f()
                })
            };

            function l() {
                for (var a = 0; a < j.length; a++) {
                    c[a][2].className = a >= bk ? "map pointer" : "pointer"
                }
            }
            k(-c[bk][2] + 400);
            SlideUtil.init(i, k);

            function k(a) {
                if (a > 0) {
                    if (i.cur + a >= 0) {
                        i.cur = 0
                    } else {
                        i.cur += a
                    }
                } else {
                    if (i.cur + a <= -10268) {
                        i.cur = -10268
                    } else {
                        i.cur += a
                    }
                };
                i.style.top = i.cur + "px"
            }
        }

        function f() {
            bW.innerHTML = bH = 0;
            o.parentNode.removeChild(o);
            bV.innerHTML = bk + (bq == 0 ? "" : "/" + bq);
            bo = bk;
            var d, f;
            x = CreateAll.CreateDiv(0, 0, gameContainer, K);
            x.id = "container";
            bN = D();
            TransformUtil.rotate(bN.miao, -90);
            c.onmousemove = function(d) {
                a = parseInt(d.pageX || (d.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)));
                a = (a - gameContainer.getBoundingClientRect().left) / GameLib.scale;
                b = parseInt(d.pageY || (d.clientY + (document.documentElement.scrollTop || document.body.scrollTop)));
                b = (b - gameContainer.getBoundingClientRect().top) / GameLib.scale;
                if (b > 630) {
                    return
                };
                var c = Math.atan2(b - bN.ty, a - bN.tx);
                if (c > -0.1 && c < 1.55) {
                    c = -0.1
                } else {
                    if (c < -3.04 || c > 1.55) {
                        c = -3.04
                    }
                };
                TransformUtil.rotate(bN.miao, c / Math.PI * 180)
            };
            Hammer(c).on("touch drag tap", function(d) {
                if (bA.style.display == "" || bl.style.display == "" || F || bj) {
                    return
                };
                a = MouseUtil.getMouseX(d);
                b = MouseUtil.getMouseY(d);
                if (b > 630) {
                    return
                };
                var c = Math.atan2(b - bN.ty, a - bN.tx);
                if (c > -0.1 && c < 1.55) {
                    c = -0.1
                } else {
                    if (c < -3.04 || c > 1.55) {
                        c = -3.04
                    }
                };
                TransformUtil.rotate(bN.miao, c / Math.PI * 180);
                /*if (/touch/.test(d.type)) {
                    if (b > 45) {
                        bB(d)
                    }
                }*/
            });
            Hammer(c).on('release', function(d){
                b = MouseUtil.getMouseY(d);
				if (b > 45) {
					bM()
				}

            });

            k = CreateAll.CreateDiv(4, -6, x, K);
            k.l = 4;
            k.zIndex = 1;
            bh();
            bg();
            bj = false;
            n = 0;
            F = null;
            G = new Object();
            G.line = [];
            G.row = 0;
            G.col = 0;
            G.active = false;
            bP();
            bS = setInterval(bz, 1000);
            bw = setInterval(by, 30)
        }
        var a;
        var b;

        function bB(d) {
            if (bA.style.display == "" || bl.style.display == "" || F || bj) {
                return
            };
            d.stopPropagation();
            a = MouseUtil.getMouseX(d);
            b = MouseUtil.getMouseY(d);
            var c = Math.atan2(b - bN.ty, a - bN.tx);
            if (c > -0.1 && c < 1.55) {
                c = -0.1;
                return
            } else {
                if (c < -3.04 || c > 1.55) {
                    c = -3.04;
                    return
                }
            };
            bM()
        }

        function bM() {
            if (bR <= 0 || bN.num <= 0 || bj) {
                return
            };
            bn = ba();
            if (bn != null) {
                M(bn)
            } else {
                return
            };
            if (!G.active) {
                return
            };
            bN.num--;
            bN.txt.innerHTML = bN.num;
            var a = y();
            bJ(a, bN.curballColor);
            a.Row = G.row;
            a.Col = G.col;
            a.LineList = G.line;
            a.endPoint = G.endPoint;
            if (a != null) {
                F = a;
                F.lineList = bn;
                h[a.Row][a.Col] = a;
                i++;
                k.appendChild(F);
                bi();
                GameSound.playSound("SShoot");
                bb();
                G.active = false
            }
        }

        function bh() {
            bs = 0;
            bt = GameConfig.MinMoveSpeed - (bk > 35 ? 30 - bk : bk);
            bt = bt < 60 ? 60 : bt;
            bt = bt > 110 ? 110 : bt
        }

        function Z(f) {
            var g;
            var c = f.split(",");
            var d = [];
            d.push(["i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i", "i"]);
            for (var a = 1; a <= c.length; a++) {
                d[a] = [];
                var h = c[a - 1];
                var b = 0;
                g = h.substr(b, 1);
                while (g != "") {
                    d[a].push(g);
                    b++;
                    g = h.substr(b, 1)
                }
            };
            bF = d.length + 10;
            return d
        }

        function bg() {
            w = [1, 2, 3, 4, 5, 6];
            var j = GameConfig.dataArr[bk].concat();
            var b = j.split("@")[0];
            bR = b.split("_")[0];
            bN.totalNum = bN.num = b.split("_")[1];
            bN.txt.innerHTML = bN.num;
            var c = Z(j.split("@")[1]);
            var f = Z(j.split("@")[2]);
            k.innerText = "";
            var l = CreateAll.CreatedImg("toppic", -k.l, -50, k, K);
            h = [];
            i = 0;
            for (var g = 0; g < bF; g++) {
                h[g] = []
            };
            for (var g = 0; g < c.length; g++) {
                for (var a = 0; a < GameConfig.colMax; a++) {
                    if (!c[g]) {
                        break
                    };
                    if (c[g][a] == 0) {
                        continue
                    };
                    var d = y(f[g][a]);
                    h[g][a] = d;
                    bJ(d, c[g][a] == 8 ? bd() : c[g][a]);
                    d.Row = g;
                    d.Col = a;
                    if (g != 0) {
                        i++
                    };
                    if (g == 0) {
                        d.style.display = "none";
                        d.Lockflag = true
                    };
                    if (g < bF - bO || g == 0) {
                        d.Lockflag = true
                    };
                    if (g % 2 == 0) {
                        d.px = a * GameConfig.Dio + GameConfig.Xo * 2
                    } else {
                        d.px = a * GameConfig.Dio + GameConfig.Xo
                    };
                    d.py = g * GameConfig.Yo + GameConfig.Dio / 2;
                    d.style.left = d.px + "px";
                    d.style.top = d.py + "px";
                    bp(d, h)
                }
            };
            H = bO;
            k.ed = -GameConfig.Yo * (bF - bO);
            if (k.ed > 120) {
                k.ed = 120
            };
            k.style.top = k.ed + "px";
            bE();
            bb()
        }

        function bJ(a, b) {
            var c = loadRec.resource["b" + b];
            a.ima.src = c.src;
            a.ColorID = b
        }

        function bd() {
            return w[Math.floor(Math.random() * w.length)]
        }

        function D() {
            var b = 245,
                d = 732;
            var a = CreateAll.CreateDiv(b, d, c, K);
            a.miao = CreateAll.CreateDiv(0, 0, a, K);
            CreateAll.CreatedImg("shooter", -59, -47, a.miao, K);
            Hammer(a).on("tap", function(b) {
                var a = MouseUtil.getMouseY(b);
                if (a < 630) {
                    bB(b)
                } else {
                    p()
                }
            });
            a.curball = CreateAll.CreateImgBg("b1", -18, -18, l, l, a, K);
            a.curballColor = 1;
            a.nextBall = CreateAll.CreateImgBg("b1", 128, -20, l, l, a, K);
            a.nextBalls = CreateAll.CreateImgBg("b1", 57, -7, 16, 16, a.miao, K);
            a.nextBallColor = 1;
            a.num = 0;
            a.txt = CreateAll.CreateText(127, 25, a, K);
            a.txt.className = "numText";
            a.txt.innerHTML = 30;
            a.tx = b;
            a.ty = d;
            return a
        }

        function p() {
            var a = bN.nextBall.src;
            var b = bN.nextBallColor;
            bN.nextBalls.src = bN.nextBall.src = bN.curball.src;
            bN.nextBallColor = bN.curballColor;
            bN.curball.src = a;
            bN.curballColor = b
        }

        function bp(b, a) {
            var f = GameConfig.Dio;
            var c = b.px;
            var d = b.py;
            if (b.Row % 2 == 0) {
                if (a[b.Row - 1] != null) {
                    if (b.Col + 1 < GameConfig.colMax) {
                        b.WBall[1] = [
                            [Math.sin(150 * j) * f + c, Math.cos(150 * j) * f + d], b.Row - 1, b.Col + 1
                        ]
                    };
                    b.WBall[0] = [
                        [Math.sin(210 * j) * f + c, Math.cos(210 * j) * f + d], b.Row - 1, b.Col
                    ]
                };
                if (a[b.Row + 1] != null) {
                    if (b.Col + 1 < GameConfig.colMax) {
                        b.WBall[3] = [
                            [Math.sin(30 * j) * f + c, Math.cos(30 * j) * f + d], b.Row + 1, b.Col + 1
                        ]
                    };
                    b.WBall[4] = [
                        [Math.sin(330 * j) * f + c, Math.cos(330 * j) * f + d], b.Row + 1, b.Col
                    ]
                }
            } else {
                if (a[b.Row - 1] != null) {
                    b.WBall[1] = [
                        [Math.sin(150 * j) * f + c, Math.cos(150 * j) * f + d], b.Row - 1, b.Col
                    ];
                    if (b.Col - 1 >= 0) {
                        b.WBall[0] = [
                            [Math.sin(210 * j) * f + c, Math.cos(210 * j) * f + d], b.Row - 1, b.Col - 1
                        ]
                    }
                };
                if (a[b.Row + 1] != null) {
                    b.WBall[3] = [
                        [Math.sin(30 * j) * f + c, Math.cos(30 * j) * f + d], b.Row + 1, b.Col
                    ];
                    if (b.Col - 1 >= 0) {
                        b.WBall[4] = [
                            [Math.sin(330 * j) * f + c, Math.cos(330 * j) * f + d], b.Row + 1, b.Col - 1
                        ]
                    }
                }
            };
            if (b.Col - 1 >= 0) {
                b.WBall[5] = [
                    [-f + c, d], b.Row, b.Col - 1
                ]
            };
            if (b.Col + 1 < GameConfig.colMax) {
                b.WBall[2] = [
                    [f + c, d], b.Row, b.Col + 1
                ]
            }
        }

        function d(d) {
            for (var b = 0; b < d; b++) {
                var a = y();
                bJ(a, bd());
                i++;
                var c = X(Math.random() * 400 + k.l + 30);
                M(c);
                if (G.row == undefined || G.col == undefined || h[G.row][G.col]) {
                    a.parentNode.removeChild(a);
                    continue
                };
                a.Row = G.row;
                a.Col = G.col;
                a.LineList = G.line;
                a.endPoint = G.endPoint;
                h[a.Row][a.Col] = a;
                if (a.Row % 2 == 0) {
                    a.px = a.Col * GameConfig.Dio + GameConfig.Xo * 2
                } else {
                    a.px = a.Col * GameConfig.Dio + GameConfig.Xo
                };
                a.py = a.Row * GameConfig.Yo + GameConfig.Dio / 2;
                a.style.left = a.px + "px";
                a.style.top = (-k.ed + 800) + "px";
                bp(a, h);
                Velocity(a, {
                    top: a.py
                })
            };
            U(0)
        }

        function bD(a) {
            if (h[a.Row][a.Col] == a) {
                h[a.Row][a.Col] = null
            };
            if (a.parentNode) {
                a.parentNode.removeChild(a)
            };
            i--
        }

        function R(a) {
            var b = Math.random() * 80 + 520 + (a.ColorID == "i" ? 300 : 0);
            if (h[a.Row][a.Col] == a) {
                h[a.Row][a.Col] = null
            };
            a.py = -k.ed + b;
            Velocity(a, {
                top: -k.ed + b
            }, {
                complete: function(a) {
                    S(a[0])
                }
            })
        }

        function S(a) {
            g(bI * 3);
            bD(a);
            if (a.ColorID != "h" && a.ColorID != "w" && a.ColorID != "i") {
                MovieUtil.explodeBlockH("explosion" + a.ColorID, a.px - 39, a.py - 30, 76, 72, k)
            }
        }

        function P(a) {
            if (a == null || h[a.Row][a.Col] == null) {
                return
            };
            g(bI);
            if (h[a.Row][a.Col] == a) {
                h[a.Row][a.Col] = null
            };
            s(a);
            if (a.fruit != null) {
                k.appendChild(a.inkImg);
                a.inkImg.style.top = a.style.top;
                a.inkImg.style.left = a.style.left;
                a.inkImg.width = 60;
                a.inkImg.height = 60;
                Velocity(a.inkImg, {
                    top: -k.ed + 800
                })
            };
            bD(a);
            if (a.ColorID != "h" && a.ColorID != "w") {
                MovieUtil.explodeBlockH("explosion" + a.ColorID, a.px - 39, a.py - 30, 76, 72, k)
            }
        }

        function Q(b) {
            MovieUtil.explodeBlockV("explodeH", 0, b.py - 16, 480, 34, k);
            for (var c = 0; c < GameConfig.colMax; c++) {
                var a = h[b.Row][c];
                if (a) {
                    g(bI);
                    bD(a)
                }
            }
        }

        function X(b) {
            var a = [
                [b, -k.ed + 800]
            ];
            a.push([b, -500]);
            return a
        }

        function ba() {
            var d = Math.atan2(b - bN.ty, a - bN.tx);
            d = d * 180 / Math.PI;
            d = d < -93 ? d - 3 : d;
            d = d * Math.PI / 180;
            if (d > -0.1 && d < 1.55) {
                d = -0.1
            } else {
                if (d < -3.04 || d > 1.55) {
                    d = -3.04
                }
            };
            var f = 0;
            var g = [];
            var l = bN.tx;
            var n = bN.ty - k.ed;
            var h = Math.cos(d) * 90;
            var i = Math.sin(d) * 90;
            g.push([l + h, n + i]);
            while (true) {
                f++;
                if (f > 50) {
                    break
                };
                var c;
                var j;
                if (d < (-Math.PI / 2)) {
                    c = Math.tan(d) * -l;
                    j = GameConfig.initX
                } else {
                    c = Math.tan(d) * (GameConfig.Width - l);
                    j = GameConfig.Width
                };
                if (n + c > -500) {
                    n += c;
                    l = j
                } else {
                    l += (-500 - n) * (j - l) / c;
                    n = -500
                };
                g.push([l, n]);
                d = -d - Math.PI;
                if (n <= -500) {
                    break
                }
            };
            return g
        }

        function M(l) {
            var r, f, b;
            G.active = false;
            var p = l[0];
            var q;
            for (var i = 1; i < l.length; i++) {
                q = l[i];
                var s = Math.floor((q[1] - GameConfig.Dio / 2) / GameConfig.Yo) - 1;
                var g = Math.floor((p[1] - GameConfig.Dio / 2) / GameConfig.Yo) + 1;
                if (s < 0) {
                    s = 0
                };
                if (g > h.length) {
                    g = h.length
                };
                for (r = g - 1; r >= s; r--) {
                    for (f = 0; f < GameConfig.colMax; f++) {
                        if (p[0] - q[0] < 0) {
                            b = h[r][f]
                        } else {
                            b = h[r][GameConfig.colMax - 1 - f]
                        };
                        if (b != null) {
                            var c = b.px;
                            var d = b.py;
                            var j = Distance.math(p[0], p[1], q[0], q[1], c, d);
                            if (j < GameConfig.Xo * 1.2) {
                                var a = Math.atan2(q[1] - p[1], q[0] - p[0]);
                                var k = Math.sqrt(Math.pow(p[0] - c, 2) + Math.pow(p[1] - d, 2));
                                q[1] = Math.sin(a) * k + p[1];
                                q[0] = Math.cos(a) * k + p[0];
                                if (k > 100) {
                                    var o = Math.sin(a) * (k - 100) + p[1];
                                    var n = Math.cos(a) * (k - 100) + p[0]
                                };
                                T(l, b);
                                return
                            }
                        }
                    }
                };
                p = q
            }
        }

        function T(i, a) {
            var d = false;
            var j;
            var k;
            var l = a.WBall;
            var n;
            var o = [];
            var b;
            var q, p;
            j = i[0];
            for (var f = 1; f < i.length; f++) {
                k = i[f];
                for (var g = 0; g < 6; g++) {
                    b = l[g];
                    if (b != null) {
                        n = b[0];
                        q = b[1];
                        p = b[2];
                        if (h[q][p] == null) {
                            if (Distance.checkCircle(j[0], j[1], k[0], k[1], n[0], n[1], GameConfig.Xo * 1.2)) {
                                var c = new Object();
                                c.distance = Point.distance(j, n);
                                c.data = b;
                                o.push(c)
                            }
                        }
                    }
                };
                o.sort(function(a, b) {
                    return a.distance > b.distance ? 1 : -1
                });
                if (o.length > 0) {
                    b = o[0].data;
                    d = true;
                    G.line = i;
                    G.row = b[1];
                    G.col = b[2];
                    k[0] = b[0][0];
                    k[1] = b[0][1];
                    G.endPoint = [k[0], k[1]];
                    i.splice(f + 1, i.length - 1 - f);
                    break
                };
                j = k
            };
            G.active = d
        }

        function by() {
            if (bA.style.display == "" || bl.style.display == "") {
                return
            };
            bn = ba();
            if (bn != null) {
                M(bn)
            };
            if (F != null) {
                if (!bu()) {
                    bp(F, h);
                    q(F);
                    F = null
                }
            }
        }
        var bn;
        var bQ;
        var N;
        var J = 0;
        var O = 0;

        function bL(c, a, b) {
            c.px = a;
            c.py = b;
            c.style.left = c.px + "px";
            c.style.top = c.py + "px"
        }

        function bu() {
            if (J < O) {
                J++;
                var a = J / O;
                bL(F, (N[0] - bQ[0]) * a + bQ[0], (N[1] - bQ[1]) * a + bQ[1])
            } else {
                if (F.lineList.length > 0) {
                    bQ = N;
                    N = F.lineList.shift();
                    bK()
                } else {
                    bL(F, F.endPoint[0], F.endPoint[1]);
                    return false
                }
            };
            return true
        }

        function bi() {
            bQ = F.lineList.shift();
            bL(F, bQ[0], bQ[1]);
            N = F.lineList.shift();
            bK()
        }

        function bK() {
            var a = Math.sqrt((bQ[0] - N[0]) * (bQ[0] - N[0]) + (bQ[1] - N[1]) * (bQ[1] - N[1]));
            J = 0;
            O = Math.floor(a / 18)
        }

        function u() {
            var a = Y();
            if (a < 340) {
                bv(3)
            } else {
                if (a > 540) {
                    bv(-2)
                }
            }
        }

        function Y() {
            var b = k.ed + GameConfig.Yo;
            for (var d = 1; d < h.length; d++) {
                for (var c = 0; c < GameConfig.colMax; c++) {
                    var a = h[d][c];
                    if (a != null) {
                        b += GameConfig.Yo;
                        break
                    }
                }
            };
            return b
        }

        function q(a) {
            U(V(a));
            bE();
            t();
            if (bN.num <= 0) {
                setTimeout(W, 1500)
            } else {
                u()
            }
        }

        function t() {
            bj = true;
            for (var c = 1; c < h.length; c++) {
                for (var b = 0; b < GameConfig.colMax; b++) {
                    var a = h[c][b];
                    if (a != null && a.fruit != null) {
                        if (a.fruit != null) {
                            bj = false;
                            return
                        }
                    }
                }
            };
            setTimeout(bm, 1500)
        }

        function s(b) {
            var c = bc(b, h);
            for (var d in c) {
                var a = c[d];
                if (a && a.ink > 0) {
                    a.ink--;
                    bJ(a, b.ColorID);
                    if (a.ink == 0) {
                        a.inkImg.parentNode.removeChild(a.inkImg)
                    }
                }
            }
        }

        function r(b) {
            var c = bc(b, h);
            var f = false;
            for (var d in c) {
                var a = c[d];
                if (a) {
                    switch (a.ColorID) {
                        case "e":
                            GameSound.playSound("SBomb");
                            Q(a);
                            f = true;
                            break;
                        case "h":
                            bD(a);
                            f = true;
                            break;
                        case "w":
                            bJ(a, "h");
                            f = true;
                            break
                    }
                }
            };
            return f
        }

        function V(c) {
            var d = r(c);
            for (var i = 0; i < bF; i++) {
                for (var b = 0; b < GameConfig.colMax; b++) {
                    if (h[i][b] != null) {
                        h[i][b].Colorflag = false
                    }
                }
            };
            c.Colorflag = true;
            GameConfig.ColorCount = 1;
            f(c, h);
            if (GameConfig.ColorCount < 3) {
                n = 0;
                return 0
            };
            n++;
            GameSound.playSound("SBomb");
            var j = 0;
            if (n > 1) {
                g(bI * GameConfig.ColorCount * (n - 1) * 0.2)
            };
            if (GameConfig.ColorCount > 3) {
                g(bI * GameConfig.ColorCount * (GameConfig.ColorCount - 3) * 0.1)
            };
            for (i = 0; i < h.length; i++) {
                for (b = 0; b < GameConfig.colMax; b++) {
                    var a = h[i][b];
                    if (a != null && a.Colorflag) {
                        if (a.skull != null) {
                            j++
                        };
                        P(a)
                    }
                }
            };
            return j;

            function f(c, a) {
                var d = bc(c, a);
                for (var b = 0; b < d.length; b++) {
                    if (d[b] != null && !d[b].Lockflag && !d[b].Colorflag && d[b].ColorID == c.ColorID && d[b].ink == 0) {
                        GameConfig.ColorCount++;
                        d[b].Colorflag = true;
                        f(d[b], a)
                    }
                }
            }
        }

        function bv(a) {
            if (bj) {
                return
            };
            k.ed += GameConfig.Yo * a;
            if (k.ed > 120) {
                k.ed = 120
            };
            Velocity(k, {
                top: k.ed
            }, {
                complete: u
            });
            while (a > 0) {
                bZ();
                a--
            }
        }

        function bZ() {
            H++;
            if (bF - H >= 1) {
                for (var b = 0; b < GameConfig.colMax; b++) {
                    var a = h[bF - H][b];
                    if (a != null) {
                        a.Lockflag = false
                    }
                }
            }
        }

        function bc(b, a) {
            var c = [];
            a = h;
            if (b.Row % 2 == 0) {
                if (a[b.Row - 1] != null) {
                    c.push(a[b.Row - 1][b.Col + 1]);
                    c.push(a[b.Row - 1][b.Col])
                };
                if (a[b.Row + 1] != null) {
                    c.push(a[b.Row + 1][b.Col + 1]);
                    c.push(a[b.Row + 1][b.Col])
                }
            } else {
                if (a[b.Row - 1] != null) {
                    c.push(a[b.Row - 1][b.Col]);
                    c.push(a[b.Row - 1][b.Col - 1])
                };
                if (a[b.Row + 1] != null) {
                    c.push(a[b.Row + 1][b.Col]);
                    c.push(a[b.Row + 1][b.Col - 1])
                }
            };
            c.push(a[b.Row] ? a[b.Row][b.Col - 1] : null);
            c.push(a[b.Row] ? a[b.Row][b.Col + 1] : null);
            return c
        }

        function U(g) {
            for (var f = 0; f < h.length; f++) {
                for (var b = 0; b < GameConfig.colMax; b++) {
                    if (h[f][b] != null) {
                        if (f > 1) {
                            h[f][b].Breakflag = false
                        } else {
                            h[f][b].Breakflag = true
                        }
                    }
                }
            };
            for (b = 0; b < GameConfig.colMax; b++) {
                if (h[1][b] != null) {
                    c(h[1][b], h)
                }
            };
            for (f = 1; f < h.length; f++) {
                for (b = 0; b < GameConfig.colMax; b++) {
                    var a = h[f][b];
                    if (a != null && !a.Breakflag) {
                        R(a)
                    }
                }
            };
            if (g > 0) {
                d(g * 2)
            };

            function c(d, a) {
                var f = bc(d, a);
                for (var b = 0; b < f.length; b++) {
                    if (f[b] != null && !f[b].Breakflag) {
                        f[b].Breakflag = true;
                        c(f[b], a)
                    }
                }
            }
        }

        function bE() {
            var d = [];
            for (var c = 1; c < h.length; c++) {
                for (var b = 0; b < GameConfig.colMax; b++) {
                    var a = h[c][b];
                    if (a != null) {
                        if (!ArrayUtil.isInArray(d, a.ColorID) && a.ColorID < 9) {
                            d.push(a.ColorID)
                        }
                    }
                }
            };
            if (d.length == 0) {
                w = [1, 2, 3, 4, 5, 6]
            } else {
                w = d
            };
            if (!ArrayUtil.isInArray(d, bN.curballColor)) {
                bb()
            };
            if (!ArrayUtil.isInArray(d, bN.nextBallColor)) {
                bN.nextBallColor = bd();
                if (bN.nextBallColor) {
                    bN.nextBalls.src = bN.nextBall.src = loadRec.resource["b" + bN.nextBallColor].src
                }
            }
        }

        function bb() {
            var b = bd();
            if (b == null) {
                return
            };
            bN.curball.src = bN.nextBall.src;
            bN.curballColor = bN.nextBallColor;
            var a = loadRec.resource["b" + b];
            bN.nextBalls.src = bN.nextBall.src = a.src;
            bN.nextBallColor = b
        }

        function y(b) {
            var a = CreateAll.CreateDiv(0, 0, k, K);
            a.Lockflag = false;
            a.WBall = [];
            a.ColorID = 1;
            a.fruit = null;
            a.ink = 0;
            a.lineList = [];
            a.px = 0, a.py = 0;
            a.ima = CreateAll.CreateImgBg("b" + 1, -(GameConfig.Dio / 2), -(GameConfig.Dio / 2), GameConfig.Dio, GameConfig.Dio, a, K);
            switch (b) {
                case "1":
                    ;
                case "2":
                    ;
                case "3":
                    ;
                case "4":
                    a.fruit = b;
                    a.inkImg = CreateAll.CreateImgBg("f" + b, -(GameConfig.Dio / 2), -(GameConfig.Dio / 2), GameConfig.Dio, GameConfig.Dio, a, K);
                    break;
                case "8":
                    a.skull = true;
                    a.inkImg = CreateAll.CreateImgBg("bs", -(GameConfig.Dio / 2), -(GameConfig.Dio / 2), GameConfig.Dio, GameConfig.Dio, a, K);
                    break;
                case "9":
                    a.ink = 1;
                    a.inkImg = CreateAll.CreateImgBg("bpi", -(GameConfig.Dio / 2), -(GameConfig.Dio / 2), GameConfig.Dio, GameConfig.Dio, a, K);
                    break
            };
            return a
        }

        function be() {
            var b = 0;
            for (var a = 1; a <= bq; a++) {
                if (GameConfig.scoreData[a]) {
                    b += GameConfig.scoreData[a]
                }
            };
            return b
        }

        function L(b) {
            var a = new Array;
            var c;
            var d;
            while (b.length > 0) {
                c = Math.floor(b.length * Math.random());
                a.push(b[c]);
                b.splice(c, 1)
            };
            return a
        }

        function bm() {
            if (bk != bo) {
                return
            };
            v();
            var a = Math.floor(bR * 5);
            g(a);
            bY.innerHTML = a;
            bl.style.display = "";
            bl.style.zIndex = 10000;
            var b = (bN.totalNum * 0.60 < bN.num ? 3 : (bN.totalNum * 0.30 < bN.num ? 2 : 1));
            if (!GameConfig.starData[bk] || GameConfig.starData[bk] < b) {
                GameConfig.starData[bk] = b
            };
            if (!GameConfig.scoreData[bk] || GameConfig.scoreData[bk] < bH) {
                GameConfig.scoreData[bk] = bH
            };
            ThirdParty.levelComplete(bk);
            bl.next.style.display = "none";
            bl.end.style.display = "none";
            if (bk <= bq) {
                bk++
            };
            if (bq == 0 || bk > bq) {
                ThirdParty.gameComplete();
                bl.next.style.display = "none";
                bl.end.style.display = "";
                bk--
            } else {
                bl.next.style.display = "";
                bl.end.style.display = "none"
            };
            GameLib.setStorage({
                level: I > bk ? I : bk,
                score: be(),
                scoreData: GameConfig.scoreData,
                starData: GameConfig.starData
            })
        }

        function W() {
            GameSound.playSound("SFail");
            GameLib.setStorage({
                level: I > bk ? I : bk,
                score: be(),
                scoreData: GameConfig.scoreData,
                starData: GameConfig.starData
            });
            v();
            bC();
            ThirdParty.gameOver();
            gradle.orderInit(5)
        }

        function v() {
            if (bS) {
                clearInterval(bS)
            };
            if (bw) {
                clearInterval(bw)
            }
        }

        function bz() {
            if (bA.style.display == "" || bl.style.display == "" || bR <= 0) {
                return
            };
            bR--;
            bP();
            if (bR <= 0) {
                bT.style.display = "";
                bT.style.zIndex = 1000;
                ThirdParty.gameOver();
                setTimeout(function() {
                    v();
                    bC();
                    gradle.orderInit(4)
                }, 3000);
                return
            } else {
                if (bR < 10) {
                    GameSound.playSound("STick")
                }
            }
        }

        function g(a) {
            bH += a;
            bW.innerHTML = bH
        }

        function bP() {
            var c = Math.floor(bR);
            var a = "" + Math.floor(c / 60);
            if (a.length == 1) {
                a = "0" + a
            };
            var b = "" + Math.floor(c % 60);
            if (b.length == 1) {
                b = "0" + b
            };
            bX.innerHTML = a + ":" + b
        }

        function L(b) {
            var a = new Array;
            var c;
            var d;
            while (b.length > 0) {
                c = Math.floor(b.length * Math.random());
                a.push(b[c]);
                b.splice(c, 1)
            };
            return a
        }
        this.pauseGame = function() {
            gradle.event("game_pause");
            if (bA.style.display == "" || bl.style.display == "" || (o && o.parentNode)) {
                return
            };
            bA.style.display = "";
            bA.style.zIndex = 10001
        };
        this.showPlay = function() {
            if (!this.idleListenerAdded) {
                window.addEventListener("idle", function() {
                    //setTimeout(gamePlay.pauseGame, 300)
                }, false);
                this.idleListenerAdded = true
            };
            v();
            var b = GameLib.getStorage("level");
            b = b ? ((b - 1) % 4 + 1) : 1;
            CreateAll.CreatedImg("back_game" + b, 0, 0, gameContainer, K);
            c = CreateAll.CreateDiv(0, 0, gameContainer, K);
            c.style.zIndex = 10;
            CreateAll.CreatedImg("bar", 0, 0, c, K);
            GameSound.stopMusic();
            GameSound.playMusic();
            var a;
            languageUI.getButton("d_Score", 0, 0, 120, 11, 100, 30, 0, 0, false, c, K, "button", "center", 20);
            bW = CreateAll.CreateText(120, 39, c, K);
            bW.innerHTML = "0";
            languageUI.getButton("d_Time", 0, 0, 10, 11, 100, 30, 0, 0, false, c, K, "button", "center", 20);
            bX = CreateAll.CreateText(10, 39, c, K);
            languageUI.getButton("d_Level", 0, 0, 230, 11, 100, 30, 0, 0, false, c, K, "button", "center", 20);
            bV = CreateAll.CreateText(230, 39, c, K);
            bV.innerHTML = "0";
            a = CreateAll.CreateImgBg("pause", 405, 14, 70, 65, c, K);
            a.style.cursor = "pointer";
            Hammer(a).on("tap", gamePlay.pauseGame);
            if (ThirdParty.enableFullscreenToggle && screenfull.enabled) {
                //fullscreenHandle.init(425, 750, c, K, 50, 40)
            };
            if (GameConfig.debug) {
                a = CreateAll.CreateImgBg("debug", 410, 700, 70, 27, c, K);
                a.style.cursor = "pointer";
                a.style.zIndex = 10;
                Hammer(a).on("tap", function(a) {
                    bm()
                })
            };
			bA = CreateAll.CreatedPanel(0, 0, "panel_pause", gameContainer, K);
            bl = CreateAll.CreatedPanel(0, 0, "panel_win", gameContainer, K);
            bT = CreateAll.CreatedPanel(0, 0, "panel_Time_Out", gameContainer, K);
            C();
            E();
            z();
            A();
            languageUI.scaleTexts()
        };
        var c;
        var bW, bX, bV, bY, bU;
        var bA, bl, bx, bT;

        function B() {
            languageUI.getButton("d_Shuffle", 0, 0, 40, 180, 400, 55, 0, 0, false, bx, K, "button", "center", 32)
        }

        function E() {
            languageUI.getButton("d_Timeout", 0, 0, 40, 280, 400, 55, 0, 0, false, bT, K, "button", "center", 44)
        }

        function z() {
            var a = languageUI.getButton("d_NextLevel", 240, 55, 120, 460, 220, 45, 10, 4, true, bl, K, "button", "center", 24);
            Hammer(a).on("tap", function(a) {
                bl.style.display = "none";
                v();
                bC();
                gradle.orderInit(4)
            });
            bl.next = a;
            a = languageUI.getButton("d_Endgame", 240, 55, 120, 460, 220, 45, 10, 4, true, bl, K, "button", "center", 24);
            Hammer(a).on("tap", function(a) {
                bl.style.display = "none";
                W()
            });
            bl.end = a;
            a = languageUI.getButton("d_LevelCompleted", 0, 0, 40, 250, 400, 55, 0, 0, false, bl, K, "button", "center", 32);
            languageUI.getButton("d_Bonus", 0, 0, 140, 330, 200, 40, 0, 0, false, bl, K, "button", "center", 26);
            bY = CreateAll.CreateText(190, 370, bl, K)
        }

        function C() {
            im = languageUI.getButton("d_Menu", 240, 55, 120, 390, 220, 45, 10, 4, true, bA, K, "button", "center", 22);
            Hammer(im).on("tap", function(a) {
                v();
                bC();
                gradle.orderInit(2)
            });
            im = languageUI.getButton("d_Continue", 240, 55, 120, 460, 220, 45, 10, 4, true, bA, K, "button", "center", 22);
            Hammer(im).on("tap", function(a) {
                bA.style.display = "none"
            });
            var b = CreateAll.CreatedButton("music1", 260, 550, bA, false, K);
            var f = CreateAll.CreatedButton("music2", 260, 550, bA, false, K);
            var d = CreateAll.CreatedButton("music1_", 80, 720, c, false, K);
            d.btn.width = d.btn.height = 0;
            var g = CreateAll.CreatedButton("music2_", 80, 720, c, false, K);
            g.btn.width = g.btn.height = 0;
            var a = function(a) {
                b.style.display = "";
                f.style.display = "none";
                d.style.display = "";
                g.style.display = "none";
                GameSound.muteSound(true)
            };
            Hammer(f).on("tap", a);
            Hammer(g).on("tap", a);
            a = function(a) {
                b.style.display = "none";
                f.style.display = "";
                d.style.display = "none";
                g.style.display = "";
                GameSound.muteSound(false)
            };
            Hammer(b).on("tap", a);
            Hammer(d).on("tap", a);
            if (GameSound.soundMuted) {
                d.style.display = "";
                g.style.display = "none";
                b.style.display = "";
                f.style.display = "none"
            } else {
                d.style.display = "none";
                g.style.display = "";
                b.style.display = "none";
                f.style.display = ""
            };
            var h = CreateAll.CreatedButton("sound1", 150, 550, bA, false, K);
            var j = CreateAll.CreatedButton("sound2", 150, 550, bA, false, K);
            var i = CreateAll.CreatedButton("sound1_", 20, 720, c, false, K);
            i.btn.width = i.btn.height = 0;
            var k = CreateAll.CreatedButton("sound2_", 20, 720, c, false, K);
            k.btn.width = k.btn.height = 0;
            a = function() {
                h.style.display = "";
                j.style.display = "none";
                i.style.display = "";
                k.style.display = "none";
                GameSound.muteMusic(true)
            };
            Hammer(j).on("tap", a);
            Hammer(k).on("tap", a);
            a = function() {
                h.style.display = "none";
                j.style.display = "";
                i.style.display = "none";
                k.style.display = "";
                GameSound.muteMusic(false)
            };
            Hammer(h).on("tap", a);
            Hammer(i).on("tap", a);
            if (GameSound.musicMuted) {
                i.style.display = "";
                k.style.display = "none";
                h.style.display = "";
                j.style.display = "none"
            } else {
                i.style.display = "none";
                k.style.display = "";
                h.style.display = "none";
                j.style.display = ""
            }
        }
        var K = [];

        function bC() {
            while (K.length > 0) {
                var a = K.pop();
                if (a && a.parentNode) {
                    a.parentNode.removeChild(a)
                }
            }
        }
    }

    function P(a) {
        if (a.length == 0) {
            return null
        };
        var b = a.length - 1;
        while (b > 0) {
            if (a[b]) {
                return a[b]
            };
            b--
        };
        return a[b]
    }

    function Q(a, c) {
        for (var b = 0; b < a.length; b++) {
            if (c == a[b]) {
                a.splice(b, 1);
                break
            }
        }
    }

    function R(a, b) {
        return a.indexOf(b) > -1
    }

    function S(c, d) {
        var a = c[0] - d[0];
        var b = c[1] - d[1];
        return Math.sqrt(a * a + b * b)
    }

    function T(a) {
        var b = gameContainer.getBoundingClientRect();
        return (a.gesture.center.clientX - b.left) / GameLib.scale
    }

    function U(a) {
        var b = gameContainer.getBoundingClientRect();
        return (a.gesture.center.clientY - b.top) / GameLib.scale
    }

    function V(i, a, b, l, f, k, j, h, g, c) {
        var d = document.createElement("div");
        d.positionH = h;
        d.style.backgroundImage = "url(" + loadRec.resource[i].src + ")";
        d.spritewidth = l;
        d.style.position = "absolute";
        d.style.left = a + "px";
        d.style.top = b + "px";
        d.style.width = l + "px";
        d.style.height = f + "px";
        d.style.backgroundPosition = 0 + "px " + d.positionH + "px";
        d.style.backgroundSize = k + "px " + j + "px";
        g.appendChild(d);
        d.currentFrame = 0;
        d.totalframes = Math.ceil(k / l);
        c.push(d);
        return d
    }

    function W(a) {
        a.currentFrame = 0;
        a.style.backgroundPosition = 0 + "px " + a.positionH + "px"
    }

    function X(a, b) {
        b = Math.round(b);
        a.currentFrame = b;
        a.style.backgroundPosition = -b * a.spritewidth + "px " + a.positionH + "px"
    }

    function Y(a) {
        if (a && a.timer) {
            clearInterval(a.timer)
        }
    }

    function Z(b, f, d, c) {
        a();

        function a() {
            b.style.backgroundPosition = -b.currentFrame * b.spritewidth + "px " + b.positionH + "px";
            b.currentFrame++;
            if (b.currentFrame < d) {
                setTimeout(a, f)
            } else {
                if (c) {
                    c(b)
                }
            }
        }
    }

    function ba(a, b) {
        a.timer = setInterval(function() {
            if (a.currentFrame < a.totalframes) {
                a.style.backgroundPosition = -a.currentFrame * a.spritewidth + "px " + a.positionH + "px";
                a.currentFrame++
            } else {
                a.currentFrame = 0
            }
        }, b ? b : 30)
    }

    function bb(j, a, b, o, f, k, i, h, c) {
        var d = document.createElement("div");
        var g = loadRec.resource[j];
        d.style.backgroundImage = "url(" + g.src + ")";
        d.spritewidth = o;
        d.style.position = "absolute";
        d.style.zIndex = 1100;
        d.style.left = a + "px";
        d.style.top = b + "px";
        d.style.width = k + "px";
        d.style.height = i + "px";
        h.appendChild(d);
        var l = 0;
        d.totalframes = Math.ceil(g.width / o);
        d.style.backgroundSize = k * d.totalframes + "px " + i + "px";
        d.spritewidth = k;
        var n = setInterval(function() {
            if (l < d.totalframes) {
                d.style.backgroundPosition = -l * d.spritewidth + "px 0px";
                l++
            } else {
                clearInterval(n);
                if (d.parentNode) {
                    d.parentNode.removeChild(d)
                };
                if (c) {
                    c()
                }
            }
        }, 50);
        return d
    }

    function bc(i, a, b, l, f, h, c) {
        var d = document.createElement("div");
        var g = loadRec.resource[i];
        d.style.backgroundImage = "url(" + g.src + ")";
        d.spritewidth = l;
        d.style.position = "absolute";
        d.style.zIndex = 1100;
        d.style.left = a + "px";
        d.style.top = b + "px";
        d.style.width = l + "px";
        d.style.height = f + "px";
        h.appendChild(d);
        var j = 0;
        d.totalframes = Math.ceil(g.width / l);
        var k = setInterval(function() {
            if (j < d.totalframes) {
                d.style.backgroundPosition = -j * d.spritewidth + "px 0px";
                j++
            } else {
                clearInterval(k);
                if (d.parentNode) {
                    d.parentNode.removeChild(d)
                };
                if (c) {
                    c()
                }
            }
        }, 60)
    }

    function bd(i, a, b, l, f, h, c) {
        var d = document.createElement("div");
        var g = loadRec.resource[i];
        d.style.backgroundImage = "url(" + g.src + ")";
        d.spriteHeight = f;
        d.style.position = "absolute";
        d.style.zIndex = 1100;
        d.style.left = a + "px";
        d.style.top = b + "px";
        d.style.width = l + "px";
        d.style.height = f + "px";
        h.appendChild(d);
        var j = 0;
        d.totalframes = Math.ceil(g.height / f);
        var k = setInterval(function() {
            if (j < d.totalframes) {
                d.style.backgroundPosition = "0px " + (-j * d.spriteHeight) + "px";
                j++
            } else {
                clearInterval(k);
                if (d.parentNode) {
                    d.parentNode.removeChild(d)
                };
                if (c) {
                    c()
                }
            }
        }, 80)
    }

    function be(c, d, g, f, b, a) {
        b = b ? b : 46;
        a = a ? a : 46;
        fullscreenHandle.button = CreateAll.CreateDiv(c, d, g, f);
        fullscreenHandle.button.back = CreateAll.CreateImgBg("fullscreen", 0, 0, b, a, fullscreenHandle.button, f);
        fullscreenHandle.button.on = CreateAll.CreateImgBg("fullscreen_on", fullscreenHandle.innerOffsetW, fullscreenHandle.innerOffsetW, b - fullscreenHandle.innerOffsetW * 2, a - fullscreenHandle.innerOffsetW * 2, fullscreenHandle.button, f);
        fullscreenHandle.button.off = CreateAll.CreateImgBg("fullscreen_off", fullscreenHandle.innerOffsetH, fullscreenHandle.innerOffsetH, b - fullscreenHandle.innerOffsetH * 2, a - fullscreenHandle.innerOffsetH * 2, fullscreenHandle.button, f);
        fullscreenHandle.button.off.style.display = "none";
        fullscreenHandle.button.on.style.cursor = "pointer";
        fullscreenHandle.button.off.style.cursor = "pointer";
        fullscreenHandle.button.onclick = function() {
            screenfull.toggle()
        };
        document.addEventListener(screenfull.raw.fullscreenchange, function() {
            if (screenfull.isFullscreen) {
                fullscreenHandle.button.on.style.display = "none";
                fullscreenHandle.button.off.style.display = ""
            } else {
                fullscreenHandle.button.on.style.display = "";
                fullscreenHandle.button.off.style.display = "none"
            }
        })
    }

    function bf(g, j, h, k, i, l) {
        var f;
        if (g == h && j == k) {
            f = Math.abs(Math.sqrt(Math.pow(g - i, 2) + Math.pow(j - l, 2)))
        } else {
            if (g == h) {
                f = Math.abs(g - i)
            } else {
                if (j == k) {
                    f = Math.abs(j - l)
                } else {
                    var d = (k - j) / (h - g);
                    var a = d;
                    var b = -1;
                    var c = j - d * g;
                    f = Math.abs((a * i) + (b * l) + c) / Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
                }
            }
        };
        return f
    }

    function bg(g, j, h, k, i, l, f) {
        f++;
        var a = Distance.math(g, j, h, k, i, l);
        if (a > f) {
            return false
        };
        var b = [g, j];
        var c = [h, k];
        var d = [i, l];
        if (Point.distance(b, d) > f && Point.distance(c, d) > f) {
            if ((g < i && h < i && j < l && k < l) || (g > i && h > i && j > l && k > l)) {
                return false
            }
        };
        return true
    }

    function bh(b, a) {
        Hammer(b).on("touch", function(a) {
            SlideUtil.dragX = MouseUtil.getMouseX(a);
            SlideUtil.dragY = MouseUtil.getMouseY(a)
        }).on("drag", function(c) {
            var b = SlideUtil.dragY - MouseUtil.getMouseY(c);
            if (b < -3) {
                a(120 * (GameLib.isIOS ? 5 : 1));
                SlideUtil.dragY = MouseUtil.getMouseY(c)
            } else {
                if (b > 3) {
                    a(-120 * (GameLib.isIOS ? 5 : 1));
                    SlideUtil.dragY = MouseUtil.getMouseY(c)
                }
            }
        }).on("release", function(a) {})
    }

    function bi(a, b) {
        if (a) {
            a.style.webkitTransform = "rotate(" + b + "deg)";
            a.style.MozTransform = "rotate(" + b + "deg)";
            a.style.OTransform = "rotate(" + b + "deg)";
            a.style.msTransform = "rotate(" + b + "deg)";
            a.style.transform = "rotate(" + b + "deg)"
        }
    }

    function bj() {
        GameSound.stopMusic();
        var c = GameLib.getStorage("score");
        var b = GameLib.getStorage("level");
        var a = CreateAll.CreatedImg("back_over", 0, 0, gameContainer, this.data);
        a = languageUI.getButton("d_YourScore", 0, 0, 130, 320, 225, 50, 0, 0, false, gameContainer, this.data, "button", "center", 32);
        a = languageUI.getButton("d_PlayAgain", 250, 55, 115, 450, 230, 50, 10, 3, true, gameContainer, this.data, "button", "center", 22);
        Hammer(a).on("tap", function(a) {
            ThirdParty.restartGame();
            gradle.orderInit(2);
            GameOver.remAll()
        });
        if (c > 0) {
            a = languageUI.getButton("d_SubmitScore", 250, 55, 115, 520, 230, 50, 10, 3, true, gameContainer, this.data, "button", "center", 22);
            Hammer(a).on("tap", function(a) {
                ThirdParty.showLeaderboard(c, b)
            })
        };
        var d = CreateAll.CreateText(180, 380, gameContainer, this.data);
        d.innerHTML = c;
        d.className = "number bigscore";
        languageUI.scaleTexts()
    }

    function bk() {
        while (this.data.length > 0) {
            var a = this.data.pop();
            if (a && a.parentNode) {
                a.parentNode.removeChild(a)
            }
        }
    }

    function bl(a, b) {
        var c;
        if (a.currentStyle) {
            c = a.currentStyle[b]
        } else {
            if (window.getComputedStyle) {
                c = window.getComputedStyle(a, null).getPropertyValue(b)
            }
        };
        return c
    }

    function bm(a) {
        this.setXuanZhe(2)
    }

    function bn() {}

    function bo(k, p, f, r, t, q, g, s, u, h, l, b, a, n, d, j) {
        var c = document.createElement("div");
        c.style.position = "absolute";
        c.style.top = t + "px";
        c.style.left = r + "px";
        c.style.width = p + "px";
        c.style.height = f + "px";
        if (n == "left") {
            c.style.textAlign = "left"
        } else {
            if (n == "right") {
                c.style.textAlign = "right"
            } else {
                c.style.textAlign = "center"
            }
        };
        if (h) {
            c.style.cursor = "pointer"
        };
        if (p != 0 && f != 0) {
            var i = document.createElement("img");
            i.style.position = "absolute";
            i.style.top = 0;
            i.style.left = 0;
            i.style.width = p + "px";
            i.style.height = f + "px";
            i.src = loadRec.resource[a].src;
            c.appendChild(i)
        };
        var o = document.createElement("div");
        o.style.top = u + "px";
        o.style.left = s + "px";
        o.style.width = q + "px";
        o.style.height = g + "px";
        o.className = "btnumber langword";
        o.innerHTML = j ? j : languageData[k][languageUI.languageInt];
        o.h2 = g;
        o.yy = u;
        c.appendChild(o);
        l.appendChild(c);
        if (d && d > 10) {
            o.fontSize = d
        } else {
            o.fontSize = languageUI.getStyle(o, "font-size").replace("px", "")
        };
        o.langID = k;
        o.parentWidth = q;
        b.push(c);
        return c
    }

    function bp(f, h, c, i, j, d, a, b) {
        var g = document.createElement("div");
        g.className = "loogText";
        g.innerHTML = languageData[f][languageUI.languageInt];
        g.style.left = i + "px";
        g.style.top = j + "px";
        g.style.width = h + "px";
        if (b && b > 10) {
            g.style.fontSize = b + "px"
        };
        d.appendChild(g);
        a.push(g);
        return g
    }

    function bq() {
        var i = document.querySelectorAll(".langword"),
            d, h, g, a, f, b, c;
        if (i) {
            for (d = 0; d < i.length; d++) {
                h = languageData[i[d].langID][languageUI.languageInt];
                b = i[d].fontSize;
                while (b > 10) {
                    f = document.createElement("div");
                    f.className = i[d].className;
                    f.style.visibility = "hidden";
                    f.style.fontSize = b + "px";
                    f.innerHTML = h;
                    document.body.appendChild(f);
                    g = f.clientWidth;
                    c = f.clientHeight;
                    a = i[d].parentWidth;
                    f.parentNode.removeChild(f);
                    if (g > a) {
                        b--
                    } else {
                        break
                    }
                };
                if (i[d].yy && i[d].h2) {
                    i[d].style.top = (i[d].yy + (i[d].h2 - c) / 2) + "px"
                };
                i[d].style.fontSize = b + "px";
                i[d].innerHTML = h
            }
        }
    }

    function br(a) {
        languageUI.languageInt = this.arr[this.showLanguage[a]][4] - 1;
        GameLib.setLang(this.arr[this.showLanguage[a]][3]);
        this.language = this.arr[this.showLanguage[a]][1];
        languageUI.scaleTexts()
    }

    function bs(bl, bi) {
        "use strict";
        var G = function G(a, b) {
            return new G.Instance(a, b || {})
        };
        G.VERSION = "1.1.3";
        G.defaults = {
            behavior: {
                userSelect: "none",
                touchAction: "pan-y",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        };
        G.DOCUMENT = document;
        G.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled;
        G.HAS_TOUCHEVENTS = ("ontouchstart" in bl);
        G.IS_MOBILE = /mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent);
        G.NO_MOUSEEVENTS = (G.HAS_TOUCHEVENTS && G.IS_MOBILE) || G.HAS_POINTEREVENTS;
        G.CALCULATE_INTERVAL = 25;
        var u = {};
        var f = G.DIRECTION_DOWN = "down";
        var g = G.DIRECTION_LEFT = "left";
        var i = G.DIRECTION_UP = "up";
        var h = G.DIRECTION_RIGHT = "right";
        var R = G.POINTER_MOUSE = "mouse";
        var T = G.POINTER_TOUCH = "touch";
        var S = G.POINTER_PEN = "pen";
        var s = G.EVENT_START = "start";
        var q = G.EVENT_MOVE = "move";
        var p = G.EVENT_END = "end";
        var r = G.EVENT_RELEASE = "release";
        var t = G.EVENT_TOUCH = "touch";
        G.READY = false;
        G.plugins = G.plugins || {};
        G.gestures = G.gestures || {};

        function Z() {
            if (G.READY) {
                return
            };
            o.determineEventTypes();
            bk.each(G.gestures, function(a) {
                c.register(a)
            });
            o.onTouch(G.DOCUMENT, q, c.detect);
            o.onTouch(G.DOCUMENT, p, c.detect);
            G.READY = true
        }
        var bk = G.utils = {
            extend: function v(a, d, c) {
                for (var b in d) {
                    if (!d.hasOwnProperty(b) || (a[b] !== bi && c)) {
                        continue
                    };
                    a[b] = d[b]
                };
                return a
            },
            on: function O(a, d, b) {
                a.addEventListener(d, b, false)
            },
            off: function M(a, d, b) {
                a.removeEventListener(d, b, false)
            },
            each: function l(f, c, a) {
                var b, d;
                if ("forEach" in f) {
                    f.forEach(c, a)
                } else {
                    if (f.length !== bi) {
                        for (b = 0, d = f.length; b < d; b++) {
                            if (c.call(a, f[b], b, f) === false) {
                                return
                            }
                        }
                    } else {
                        for (b in f) {
                            if (f.hasOwnProperty(b) && c.call(a, f[b], b, f) === false) {
                                return
                            }
                        }
                    }
                }
            },
            inStr: function J(b, a) {
                return b.indexOf(a) > -1
            },
            inArray: function I(f, a) {
                if (f.indexOf) {
                    var c = f.indexOf(a);
                    return (c === -1) ? false : c
                } else {
                    for (var b = 0, d = f.length; b < d; b++) {
                        if (f[b] === a) {
                            return b
                        }
                    };
                    return false
                }
            },
            toArray: function bd(a) {
                return Array.prototype.slice.call(a, 0)
            },
            hasParent: function H(a, b) {
                while (a) {
                    if (a == b) {
                        return true
                    };
                    a = a.parentNode
                };
                return false
            },
            getCenter: function z(h) {
                var f = [],
                    g = [],
                    a = [],
                    b = [],
                    d = Math.min,
                    c = Math.max;
                if (h.length === 1) {
                    return {
                        pageX: h[0].pageX,
                        pageY: h[0].pageY,
                        clientX: h[0].clientX,
                        clientY: h[0].clientY
                    }
                };
                bk.each(h, function(c) {
                    f.push(c.pageX);
                    g.push(c.pageY);
                    a.push(c.clientX);
                    b.push(c.clientY)
                });
                return {
                    pageX: (d.apply(Math, f) + c.apply(Math, f)) / 2,
                    pageY: (d.apply(Math, g) + c.apply(Math, g)) / 2,
                    clientX: (d.apply(Math, a) + c.apply(Math, a)) / 2,
                    clientY: (d.apply(Math, b) + c.apply(Math, b)) / 2
                }
            },
            getVelocity: function F(a, b, c) {
                return {
                    x: Math.abs(b / a) || 0,
                    y: Math.abs(c / a) || 0
                }
            },
            getAngle: function x(a, b) {
                var c = b.clientX - a.clientX,
                    d = b.clientY - a.clientY;
                return Math.atan2(d, c) * 180 / Math.PI
            },
            getDirection: function A(a, b) {
                var c = Math.abs(a.clientX - b.clientX),
                    d = Math.abs(a.clientY - b.clientY);
                if (c >= d) {
                    return a.clientX - b.clientX > 0 ? g : h
                };
                return a.clientY - b.clientY > 0 ? i : f
            },
            getDistance: function B(a, b) {
                var c = b.clientX - a.clientX,
                    d = b.clientY - a.clientY;
                return Math.sqrt((c * c) + (d * d))
            },
            getScale: function D(b, a) {
                if (b.length >= 2 && a.length >= 2) {
                    return this.getDistance(a[0], a[1]) / this.getDistance(b[0], b[1])
                };
                return 1
            },
            getRotation: function C(b, a) {
                if (b.length >= 2 && a.length >= 2) {
                    return this.getAngle(a[1], a[0]) - this.getAngle(b[1], b[0])
                };
                return 0
            },
            isVertical: function K(a) {
                return a == i || a == f
            },
            setPrefixedCss: function Y(a, f, h, g) {
                var d = ["", "Webkit", "Moz", "O", "ms"];
                f = bk.toCamelCase(f);
                for (var b = 0; b < d.length; b++) {
                    var c = f;
                    if (d[b]) {
                        c = d[b] + c.slice(0, 1).toUpperCase() + c.slice(1)
                    };
                    if (c in a.style) {
                        a.style[c] = (g == null || g) && h || "";
                        break
                    }
                }
            },
            toggleBehavior: function bf(a, c, d) {
                if (!c || !a || !a.style) {
                    return
                };
                bk.each(c, function(c, b) {
                    bk.setPrefixedCss(a, b, c, d)
                });
                var b = d && function() {
                    return false
                };
                if (c.userSelect == "none") {
                    a.onselectstart = b
                };
                if (c.userDrag == "none") {
                    a.ondragstart = b
                }
            },
            toCamelCase: function be(a) {
                return a.replace(/[_-]([a-z])/g, function(a) {
                    return a[1].toUpperCase()
                })
            }
        };
        var o = G.event = {
            preventMouseEvents: true,
            started: false,
            shouldDetect: true,
            on: function O(a, d, b, c) {
                var f = d.split(" ");
                bk.each(f, function(d) {
                    bk.on(a, d, b);
                    c && c(d)
                })
            },
            off: function M(a, d, b, c) {
                var f = d.split(" ");
                bk.each(f, function(d) {
                    bk.off(a, d, b);
                    c && c(d)
                })
            },
            onTouch: function Q(a, b, c) {
                var f = this;
                var d = function d(d) {
                    var i = d.type.toLowerCase(),
                        h = G.HAS_POINTEREVENTS,
                        g = bk.inStr(i, "mouse"),
                        j;
                    if (g && f.preventMouseEvents) {
                        return
                    } else {
                        if (g && b == s && d.button === 0) {
                            f.preventMouseEvents = false;
                            f.shouldDetect = true
                        } else {
                            if (h && b == s) {
                                f.shouldDetect = (d.buttons === 1 || U.matchType(T, d))
                            } else {
                                if (!g && b == s) {
                                    f.preventMouseEvents = true;
                                    f.shouldDetect = true
                                }
                            }
                        }
                    };
                    if (h && b != p) {
                        U.updatePointer(b, d)
                    };
                    if (f.shouldDetect) {
                        j = f.doDetect.call(f, d, b, a, c)
                    };
                    if (j == p) {
                        f.preventMouseEvents = false;
                        f.shouldDetect = false;
                        U.reset()
                    };
                    if (h && b == p) {
                        U.updatePointer(b, d)
                    }
                };
                this.on(a, u[b], d);
                return d
            },
            doDetect: function k(f, h, d, i) {
                var j = this.getTouchList(f, h);
                var k = j.length;
                var n = h;
                var l = j.trigger;
                var b = k;
                if (h == s) {
                    l = t
                } else {
                    if (h == p) {
                        l = r;
                        b = j.length - ((f.changedTouches) ? f.changedTouches.length : 1)
                    }
                };
                if (b > 0 && this.started) {
                    n = q
                };
                this.started = true;
                var g = this.collectEventData(d, n, j, f);
                if (h != p) {
                    i.call(c, g)
                };
                if (l) {
                    g.changedLength = b;
                    g.eventType = l;
                    i.call(c, g);
                    g.eventType = n;
                    delete g.changedLength
                };
                if (n == p) {
                    i.call(c, g);
                    this.started = false
                };
                return n
            },
            determineEventTypes: function d() {
                var a;
                if (G.HAS_POINTEREVENTS) {
                    if (bl.PointerEvent) {
                        a = ["pointerdown", "pointermove", "pointerup pointercancel lostpointercapture"]
                    } else {
                        a = ["MSPointerDown", "MSPointerMove", "MSPointerUp MSPointerCancel MSLostPointerCapture"]
                    }
                } else {
                    if (G.NO_MOUSEEVENTS) {
                        a = ["touchstart", "touchmove", "touchend touchcancel"]
                    } else {
                        a = ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"]
                    }
                };
                u[s] = a[0];
                u[q] = a[1];
                u[p] = a[2];
                return u
            },
            getTouchList: function E(b, c) {
                if (G.HAS_POINTEREVENTS) {
                    return U.getTouchList()
                };
                if (b.touches) {
                    if (c == q) {
                        return b.touches
                    };
                    var d = [];
                    var a = [].concat(bk.toArray(b.touches), bk.toArray(b.changedTouches));
                    var g = [];
                    bk.each(a, function(a) {
                        if (bk.inArray(d, a.identifier) === false) {
                            g.push(a)
                        };
                        d.push(a.identifier)
                    });
                    return g
                };
                b.identifier = 1;
                return [b]
            },
            collectEventData: function a(a, d, g, b) {
                var f = T;
                if (bk.inStr(b.type, "mouse") || U.matchType(R, b)) {
                    f = R
                } else {
                    if (U.matchType(S, b)) {
                        f = S
                    }
                };
                return {
                    center: bk.getCenter(g),
                    timeStamp: Date.now(),
                    target: b.target,
                    touches: g,
                    eventType: d,
                    pointerType: f,
                    srcEvent: b,
                    preventDefault: function() {
                        var a = this.srcEvent;
                        a.preventManipulation && a.preventManipulation();
                        a.preventDefault && a.preventDefault()
                    },
                    stopPropagation: function() {
                        this.srcEvent.stopPropagation()
                    },
                    stopDetect: function() {
                        return c.stopDetect()
                    }
                }
            }
        };
        var U = G.PointerEvent = {
            pointers: {},
            getTouchList: function E() {
                var f = [];
                bk.each(this.pointers, function(a) {
                    f.push(a)
                });
                return f
            },
            updatePointer: function bj(a, b) {
                if (a == p) {
                    delete this.pointers[b.pointerId]
                } else {
                    b.identifier = b.pointerId;
                    this.pointers[b.pointerId] = b
                }
            },
            matchType: function L(b, a) {
                if (!a.pointerType) {
                    return false
                };
                var c = a.pointerType,
                    d = {};
                d[R] = (c === (a.MSPOINTER_TYPE_MOUSE || R));
                d[T] = (c === (a.MSPOINTER_TYPE_TOUCH || T));
                d[S] = (c === (a.MSPOINTER_TYPE_PEN || S));
                return d[b]
            },
            reset: function X() {
                this.pointers = {}
            }
        };
        var c = G.detection = {
            gestures: [],
            current: null,
            previous: null,
            stopped: false,
            startDetect: function ba(c, a) {
                if (this.current) {
                    return
                };
                this.stopped = false;
                this.current = {
                    inst: c,
                    startEvent: bk.extend({}, a),
                    lastEvent: false,
                    lastCalcEvent: false,
                    futureCalcEvent: false,
                    lastCalcData: {},
                    name: ""
                };
                this.detect(a)
            },
            detect: function b(a) {
                if (!this.current || this.stopped) {
                    return
                };
                a = this.extendEventData(a);
                var b = this.current.inst,
                    c = b.options;
                bk.each(this.gestures, function d(d) {
                    if (!this.stopped && b.enabled && c[d.name]) {
                        d.handler.call(d, a, b)
                    }
                }, this);
                if (this.current) {
                    this.current.lastEvent = a
                };
                if (a.eventType == p) {
                    this.stopDetect()
                };
                return a
            },
            stopDetect: function bb() {
                this.previous = bk.extend({}, this.current);
                this.current = null;
                this.stopped = true
            },
            getCalculatedData: function y(i, c, f, g, h) {
                var d = this.current,
                    j = false,
                    b = d.lastCalcEvent,
                    a = d.lastCalcData;
                if (b && i.timeStamp - b.timeStamp > G.CALCULATE_INTERVAL) {
                    c = b.center;
                    f = i.timeStamp - b.timeStamp;
                    g = i.center.clientX - b.center.clientX;
                    h = i.center.clientY - b.center.clientY;
                    j = true
                };
                if (i.eventType == t || i.eventType == r) {
                    d.futureCalcEvent = i
                };
                if (!d.lastCalcEvent || j) {
                    a.velocity = bk.getVelocity(f, g, h);
                    a.angle = bk.getAngle(c, i.center);
                    a.direction = bk.getDirection(c, i.center);
                    d.lastCalcEvent = d.futureCalcEvent || i;
                    d.futureCalcEvent = i
                };
                i.velocityX = a.velocity.x;
                i.velocityY = a.velocity.y;
                i.interimAngle = a.angle;
                i.interimDirection = a.direction
            },
            extendEventData: function w(f) {
                var a = this.current,
                    h = a.startEvent,
                    g = a.lastEvent || h;
                if (f.eventType == t || f.eventType == r) {
                    h.touches = [];
                    bk.each(f.touches, function(a) {
                        h.touches.push({
                            clientX: a.clientX,
                            clientY: a.clientY
                        })
                    })
                };
                var b = f.timeStamp - h.timeStamp,
                    c = f.center.clientX - h.center.clientX,
                    d = f.center.clientY - h.center.clientY;
                this.getCalculatedData(f, g.center, b, c, d);
                bk.extend(f, {
                    startEvent: h,
                    deltaTime: b,
                    deltaX: c,
                    deltaY: d,
                    distance: bk.getDistance(h.center, f.center),
                    angle: bk.getAngle(h.center, f.center),
                    direction: bk.getDirection(h.center, f.center),
                    scale: bk.getScale(h.touches, f.touches),
                    rotation: bk.getRotation(h.touches, f.touches)
                });
                return f
            },
            register: function V(a) {
                var b = a.defaults || {};
                if (b[a.name] === bi) {
                    b[a.name] = true
                };
                bk.extend(G.defaults, b, true);
                a.index = a.index || 1000;
                this.gestures.push(a);
                this.gestures.sort(function(a, b) {
                    if (a.index < b.index) {
                        return -1
                    };
                    if (a.index > b.index) {
                        return 1
                    };
                    return 0
                });
                return this.gestures
            }
        };
        G.Instance = function(a, d) {
            var f = this;
            Z();
            this.element = a;
            this.enabled = true;
            bk.each(d, function(b, a) {
                delete d[a];
                d[bk.toCamelCase(a)] = b
            });
            this.options = bk.extend(bk.extend({}, G.defaults), d || {});
            if (this.options.behavior) {
                bk.toggleBehavior(this.element, this.options.behavior, true)
            };
            this.eventStartHandler = o.onTouch(a, s, function(a) {
                if (f.enabled && a.eventType == s) {
                    c.startDetect(f, a)
                } else {
                    if (a.eventType == t) {
                        c.detect(a)
                    }
                }
            });
            this.eventHandlers = []
        };
        G.Instance.prototype = {
            on: function P(a, b) {
                var c = this;
                o.on(c.element, a, b, function(a) {
                    c.eventHandlers.push({
                        gesture: a,
                        handler: b
                    })
                });
                return c
            },
            off: function N(a, b) {
                var c = this;
                o.off(c.element, a, b, function(d) {
                    var a = bk.inArray({
                        gesture: d,
                        handler: b
                    });
                    if (a !== false) {
                        c.eventHandlers.splice(a, 1)
                    }
                });
                return c
            },
            trigger: function bh(d, c) {
                if (!c) {
                    c = {}
                };
                var b = G.DOCUMENT.createEvent("Event");
                b.initEvent(d, true, true);
                b.gesture = c;
                var a = this.element;
                if (bk.hasParent(c.target, a)) {
                    a = c.target
                };
                a.dispatchEvent(b);
                return this
            },
            enable: function n(a) {
                this.enabled = a;
                return this
            },
            dispose: function j() {
                var b, a;
                bk.toggleBehavior(this.element, this.options.behavior, false);
                for (b = -1;
                    (a = this.eventHandlers[++b]);) {
                    bk.off(this.element, a.gesture, a.handler)
                };
                this.eventHandlers = [];
                o.off(this.element, u[s], this.eventStartHandler);
                return null
            }
        };
        (function(b) {
            var d = false;

            function a(j, l) {
                var a = c.current;
                if (l.options.dragMaxTouches > 0 && j.touches.length > l.options.dragMaxTouches) {
                    return
                };
                switch (j.eventType) {
                    case s:
                        d = false;
                        break;
                    case q:
                        if (j.distance < l.options.dragMinDistance && a.name != b) {
                            return
                        };
                        var t = a.startEvent.center;
                        if (a.name != b) {
                            a.name = b;
                            if (l.options.dragDistanceCorrection && j.distance > 0) {
                                var k = Math.abs(l.options.dragMinDistance / j.distance);
                                t.pageX += j.deltaX * k;
                                t.pageY += j.deltaY * k;
                                t.clientX += j.deltaX * k;
                                t.clientY += j.deltaY * k;
                                j = c.extendEventData(j)
                            }
                        };
                        if (a.lastEvent.dragLockToAxis || (l.options.dragLockToAxis && l.options.dragLockMinDistance <= j.distance)) {
                            j.dragLockToAxis = true
                        };
                        var o = a.lastEvent.direction;
                        if (j.dragLockToAxis && o !== j.direction) {
                            if (bk.isVertical(o)) {
                                j.direction = (j.deltaY < 0) ? i : f
                            } else {
                                j.direction = (j.deltaX < 0) ? g : h
                            }
                        };
                        if (!d) {
                            l.trigger(b + "start", j);
                            d = true
                        };
                        l.trigger(b, j);
                        l.trigger(b + j.direction, j);
                        var n = bk.isVertical(j.direction);
                        if ((l.options.dragBlockVertical && n) || (l.options.dragBlockHorizontal && !n)) {
                            j.preventDefault()
                        };
                        break;
                    case r:
                        if (d && j.changedLength <= l.options.dragMaxTouches) {
                            l.trigger(b + "end", j);
                            d = false
                        };
                        break;
                    case p:
                        d = false;
                        break
                }
            }
            G.gestures.Drag = {
                name: b,
                index: 50,
                handler: a,
                defaults: {
                    dragMinDistance: 10,
                    dragDistanceCorrection: true,
                    dragMaxTouches: 1,
                    dragBlockHorizontal: false,
                    dragBlockVertical: false,
                    dragLockToAxis: false,
                    dragLockMinDistance: 25
                }
            }
        })("drag");
        G.gestures.Gesture = {
            name: "gesture",
            index: 1337,
            handler: function W(a, b) {
                b.trigger(this.name, a)
            }
        };
        (function(b) {
            var d;

            function a(f, g) {
                var h = g.options,
                    a = c.current;
                switch (f.eventType) {
                    case s:
                        clearTimeout(d);
                        a.name = b;
                        d = setTimeout(function() {
                            if (a && a.name == b) {
                                g.trigger(b, f)
                            }
                        }, h.holdTimeout);
                        break;
                    case q:
                        if (f.distance > h.holdThreshold) {
                            clearTimeout(d)
                        };
                        break;
                    case r:
                        clearTimeout(d);
                        break
                }
            }
            G.gestures.Hold = {
                name: b,
                index: 10,
                defaults: {
                    holdTimeout: 500,
                    holdThreshold: 2
                },
                handler: a
            }
        })("hold");
        G.gestures.Release = {
            name: "release",
            index: Infinity,
            handler: function W(a, b) {
                if (a.eventType == r) {
                    b.trigger(this.name, a)
                }
            }
        };
        G.gestures.Swipe = {
            name: "swipe",
            index: 40,
            defaults: {
                swipeMinTouches: 1,
                swipeMaxTouches: 1,
                swipeVelocityX: 0.6,
                swipeVelocityY: 0.6
            },
            handler: function bc(a, b) {
                if (a.eventType == r) {
                    var d = a.touches.length,
                        c = b.options;
                    if (d < c.swipeMinTouches || d > c.swipeMaxTouches) {
                        return
                    };
                    if (a.velocityX > c.swipeVelocityX || a.velocityY > c.swipeVelocityY) {
                        b.trigger(this.name, a);
                        b.trigger(this.name + a.direction, a)
                    }
                }
            }
        };
        (function(b) {
            var a = false;

            function d(g, h) {
                var i = h.options,
                    d = c.current,
                    j = c.previous,
                    k, f;
                switch (g.eventType) {
                    case s:
                        a = false;
                        break;
                    case q:
                        a = a || (g.distance > i.tapMaxDistance);
                        break;
                    case p:
                        if (!bk.inStr(g.srcEvent.type, "cancel") && g.deltaTime < i.tapMaxTime && !a) {
                            k = j && j.lastEvent && g.timeStamp - j.lastEvent.timeStamp;
                            f = false;
                            if (j && j.name == b && (k && k < i.doubleTapInterval) && g.distance < i.doubleTapDistance) {
                                h.trigger("doubletap", g);
                                f = true
                            };
                            if (!f || i.tapAlways) {
                                d.name = b;
                                h.trigger(d.name, g)
                            }
                        };
                        break
                }
            }
            G.gestures.Tap = {
                name: b,
                index: 100,
                handler: d,
                defaults: {
                    tapMaxTime: 250,
                    tapMaxDistance: 10,
                    tapAlways: true,
                    doubleTapDistance: 20,
                    doubleTapInterval: 300
                }
            }
        })("tap");
        G.gestures.Touch = {
            name: "touch",
            index: -Infinity,
            defaults: {
                preventDefault: true,
                preventMouse: false
            },
            handler: function bg(a, b) {
                if (b.options.preventMouse && a.pointerType == R) {
                    a.stopDetect();
                    return
                };
                if (b.options.preventDefault) {
                    a.preventDefault()
                };
                if (a.eventType == t) {
                    b.trigger("touch", a)
                }
            }
        };
        (function(a) {
            var d = false;

            function b(b, f) {
                switch (b.eventType) {
                    case s:
                        d = false;
                        break;
                    case q:
                        if (b.touches.length < 2) {
                            return
                        };
                        var h = Math.abs(1 - b.scale);
                        var g = Math.abs(b.rotation);
                        if (h < f.options.transformMinScale && g < f.options.transformMinRotation) {
                            return
                        };
                        c.current.name = a;
                        if (!d) {
                            f.trigger(a + "start", b);
                            d = true
                        };
                        f.trigger(a, b);
                        if (g > f.options.transformMinRotation) {
                            f.trigger("rotate", b)
                        };
                        if (h > f.options.transformMinScale) {
                            f.trigger("pinch", b);
                            f.trigger("pinch" + (b.scale < 1 ? "in" : "out"), b)
                        };
                        break;
                    case r:
                        if (d && b.changedLength < 2) {
                            f.trigger(a + "end", b);
                            d = false
                        };
                        break
                }
            }
            G.gestures.Transform = {
                name: a,
                index: 45,
                defaults: {
                    transformMinScale: 0.01,
                    transformMinRotation: 1
                },
                handler: b
            }
        })("transform");
        if (typeof define == "function" && define.amd) {
            define(function() {
                return G
            })
        } else {
            if (typeof module !== "undefined" && module.exports) {
                module.exports = G
            } else {
                bl.Hammer = G
            }
        }
    }

    function bt() {
        "use strict";
        var b = null;
        var p = true;
        var k = false;
        n();
        if (p) {
            var j = (typeof b.createGain === "undefined") ? b.createGainNode() : b.createGain();
            j.gain.value = 1;
            j.connect(b.destination)
        };
        var g = function() {
            this.init()
        };
        g.prototype = {
            init: function() {
                var a = this || f;
                a._codecs = {};
                a._howls = [];
                a._muted = false;
                a._volume = 1;
                a.noAudio = k;
                a.usingWebAudio = p;
                a.ctx = b;
                if (!k) {
                    a._setupCodecs()
                };
                return a
            },
            volume: function(h) {
                var d = this || f;
                h = parseFloat(h);
                if (typeof h !== "undefined" && h >= 0 && h <= 1) {
                    d._volume = h;
                    if (p) {
                        j.gain.value = h
                    };
                    for (var a = 0; a < d._howls.length; a++) {
                        if (!d._howls[a]._webAudio) {
                            var b = d._howls[a]._getSoundIds();
                            for (var c = 0; c < b.length; c++) {
                                var g = d._howls[a]._soundById(b[c]);
                                if (g && g._node) {
                                    g._node.volume = g._volume * h
                                }
                            }
                        }
                    };
                    return d
                };
                return d._volume
            },
            mute: function(d) {
                var g = this || f;
                g._muted = d;
                if (p) {
                    j.gain.value = d ? 0 : g._volume
                };
                for (var a = 0; a < g._howls.length; a++) {
                    if (!g._howls[a]._webAudio) {
                        var b = g._howls[a]._getSoundIds();
                        for (var c = 0; c < b.length; c++) {
                            var h = g._howls[a]._soundById(b[c]);
                            if (h && h._node) {
                                h._node.muted = (d) ? true : h._muted
                            }
                        }
                    }
                };
                return g
            },
            unload: function() {
                var b = this || f;
                for (var a = b._howls.length - 1; a >= 0; a--) {
                    b._howls[a].unload()
                };
                return b
            },
            codecs: function(a) {
                return (this || f)._codecs[a]
            },
            _setupCodecs: function() {
                var d = this || f;
                var a = new Audio();
                var c = a.canPlayType("audio/mpeg;").replace(/^no$/, "");
                var b = /OPR\//.test(navigator.userAgent);
                d._codecs = {
                    mp3: !!(!b && (c || a.canPlayType("audio/mp3;").replace(/^no$/, ""))),
                    mpeg: !!c,
                    opus: !!a.canPlayType("audio/ogg; codecs=\"opus\"").replace(/^no$/, ""),
                    ogg: !!a.canPlayType("audio/ogg; codecs=\"vorbis\"").replace(/^no$/, ""),
                    wav: !!a.canPlayType("audio/wav; codecs=\"1\"").replace(/^no$/, ""),
                    aac: !!a.canPlayType("audio/aac;").replace(/^no$/, ""),
                    m4a: !!(a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    mp4: !!(a.canPlayType("audio/x-mp4;") || a.canPlayType("audio/mp4;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    weba: !!a.canPlayType("audio/webm; codecs=\"vorbis\"").replace(/^no$/, ""),
                    webm: !!a.canPlayType("audio/webm; codecs=\"vorbis\"").replace(/^no$/, "")
                };
                return d
            }
        };
        var f = new g();
        var d = function(a) {
            var b = this;
            if (!a.src || a.src.length === 0) {
                console.error("An array of source files must be passed with any new Howl.");
                return
            };
            b.init(a)
        };
        d.prototype = {
            init: function(a) {
                var b = this;
                b._onends = [];
                b._autoplay = a.autoplay || false;
                b._ext = a.ext || null;
                b._html5 = a.html5 || false;
                b._muted = a.mute || false;
                b._loop = a.loop || false;
                b._pool = a.pool || 5;
                b._preload = (typeof a.preload === "boolean") ? a.preload : true;
                b._rate = a.rate || 1;
                b._sprite = a.sprite || {};
                b._src = (typeof a.src !== "string") ? a.src : [a.src];
                b._volume = a.volume !== undefined ? a.volume : 1;
                b._duration = a.duration || 0;
                b._loaded = false;
                b._sounds = [];
                b._endTimers = {};
                b._onend = a.onend ? [{
                    fn: a.onend
                }] : [];
                b._onfaded = a.onfaded ? [{
                    fn: a.onfaded
                }] : [];
                b._onload = a.onload ? [{
                    fn: a.onload
                }] : [];
                b._onloaderror = a.onloaderror ? [{
                    fn: a.onloaderror
                }] : [];
                b._onpause = a.onpause ? [{
                    fn: a.onpause
                }] : [];
                b._onplay = a.onplay ? [{
                    fn: a.onplay
                }] : [];
                b._onstop = a.onstop ? [{
                    fn: a.onstop
                }] : [];
                b._webAudio = p && !b._html5;
                f._howls.push(b);
                if (b._preload) {
                    b.load()
                };
                return b
            },
            load: function() {
                var c = this;
                var g = null;
                if (k) {
                    c._emit("loaderror");
                    return
                };
                if (typeof c._src === "string") {
                    c._src = [c._src]
                };
                for (var b = 0; b < c._src.length; b++) {
                    var a, d;
                    if (c._ext && c._ext[b]) {
                        a = c._ext[b]
                    } else {
                        d = c._src[b];
                        a = /^data:audio\/([^;,]+);/i.exec(d);
                        if (!a) {
                            a = /\.([^.]+)$/.exec(d.split("?", 1)[0])
                        };
                        if (a) {
                            a = a[1].toLowerCase()
                        }
                    };
                    if (f.codecs(a)) {
                        g = c._src[b];
                        break
                    }
                };
                if (!g) {
                    c._emit("loaderror");
                    return
                };
                c._src = g;
                new o(c);
                if (c._webAudio) {
                    h(c)
                };
                return c
            },
            play: function(r, k) {
                var p = this;
                var a = arguments;
                var g = null;
                if (typeof r === "number") {
                    g = r;
                    r = null
                } else {
                    if (typeof r === "undefined") {
                        r = "__default";
                        var j = 0;
                        for (var d = 0; d < p._sounds.length; d++) {
                            if (p._sounds[d]._paused && !p._sounds[d]._ended) {
                                j++;
                                g = p._sounds[d]._id
                            }
                        };
                        if (j === 1) {
                            r = null
                        } else {
                            g = null
                        }
                    }
                };
                var q = g ? p._soundById(g) : p._inactiveSound();
                if (!q) {
                    return null
                };
                if (g && !r) {
                    r = q._sprite || "__default"
                };
                if (r && k) {
                    p._onends[q._id] = k
                };
                if (!p._loaded && !p._sprite[r]) {
                    p.once("load", function() {
                        p.play(p._soundById(q._id) ? q._id : undefined)
                    });
                    return q._id
                };
                if (g && !q._paused) {
                    return q._id
                };
                var o = q._seek > 0 ? q._seek : p._sprite[r][0] / 1000;
                var c = ((p._sprite[r][0] + p._sprite[r][1]) / 1000) - o;
                var s = (c * 1000) / Math.abs(q._rate);
                p._endTimers[q._id] = setTimeout(p._ended.bind(p, q), s);
                q._paused = false;
                q._ended = false;
                q._sprite = r;
                q._seek = o;
                q._start = p._sprite[r][0] / 1000;
                q._stop = (p._sprite[r][0] + p._sprite[r][1]) / 1000;
                q._loop = !!(q._loop || p._sprite[r][2]);
                var i = q._node;
                if (p._webAudio) {
                    var n = function() {
                        p._refreshBuffer(q);
                        var d = (q._muted || p._muted) ? 0 : q._volume * f.volume();
                        i.gain.setValueAtTime(d, b.currentTime);
                        q._playStart = b.currentTime;
                        if (typeof i.bufferSource.start === "undefined") {
                            q._loop ? i.bufferSource.noteGrainOn(0, o, 86400) : i.bufferSource.noteGrainOn(0, o, c)
                        } else {
                            q._loop ? i.bufferSource.start(0, o, 86400) : i.bufferSource.start(0, o, c)
                        };
                        if (!p._endTimers[q._id]) {
                            p._endTimers[q._id] = setTimeout(p._ended.bind(p, q), s)
                        };
                        if (!a[1]) {
                            setTimeout(function() {
                                p._emit("play", q._id)
                            }, 0)
                        }
                    };
                    if (p._loaded) {
                        n()
                    } else {
                        p.once("load", n);
                        p._clearTimer(q._id)
                    }
                } else {
                    var l = function() {
                        i.currentTime = o;
                        i.muted = q._muted || p._muted || f._muted || i.muted;
                        i.volume = q._volume * f.volume();
                        i.playbackRate = q._rate;
                        setTimeout(function() {
                            i.play();
                            if (!a[1]) {
                                p._emit("play", q._id)
                            }
                        }, 0)
                    };
                    if (i.readyState === 4 || !i.readyState && navigator.isCocoonJS) {
                        l()
                    } else {
                        var h = function() {
                            p._endTimers[q._id] = setTimeout(p._ended.bind(p, q), s);
                            l();
                            i.removeEventListener("canplaythrough", h, false)
                        };
                        i.addEventListener("canplaythrough", h, false);
                        p._clearTimer(q._id)
                    }
                };
                return q._id
            },
            pause: function(b) {
                var d = this;
                if (!d._loaded) {
                    d.once("play", function() {
                        d.pause(b)
                    });
                    return d
                };
                var c = d._getSoundIds(b);
                for (var a = 0; a < c.length; a++) {
                    d._clearTimer(c[a]);
                    var f = d._soundById(c[a]);
                    if (f && !f._paused) {
                        f._seek = d.seek(c[a]);
                        f._paused = true;
                        d._stopFade(c[a]);
                        if (d._webAudio) {
                            if (!f._node.bufferSource) {
                                return d
                            };
                            if (typeof f._node.bufferSource.stop === "undefined") {
                                f._node.bufferSource.noteOff(0)
                            } else {
                                f._node.bufferSource.stop(0)
                            };
                            f._node.bufferSource = null
                        } else {
                            if (!isNaN(f._node.duration)) {
                                f._node.pause()
                            }
                        };
                        if (!arguments[1]) {
                            d._emit("pause", f._id)
                        }
                    }
                };
                return d
            },
            stop: function(b) {
                var d = this;
                if (!d._loaded) {
                    if (typeof d._sounds[0]._sprite !== "undefined") {
                        d.once("play", function() {
                            d.stop(b)
                        })
                    };
                    return d
                };
                var c = d._getSoundIds(b);
                for (var a = 0; a < c.length; a++) {
                    d._clearTimer(c[a]);
                    var f = d._soundById(c[a]);
                    if (f && !f._paused) {
                        f._seek = f._start || 0;
                        f._paused = true;
                        f._ended = true;
                        d._stopFade(c[a]);
                        if (d._webAudio && f._node) {
                            if (!f._node.bufferSource) {
                                return d
                            };
                            if (typeof f._node.bufferSource.stop === "undefined") {
                                f._node.bufferSource.noteOff(0)
                            } else {
                                f._node.bufferSource.stop(0)
                            };
                            f._node.bufferSource = null
                        } else {
                            if (f._node && !isNaN(f._node.duration)) {
                                f._node.pause();
                                f._node.currentTime = f._start || 0
                            }
                        };
                        d._emit("stop", f._id)
                    }
                };
                return d
            },
            mute: function(g, c) {
                var h = this;
                if (!h._loaded) {
                    h.once("play", function() {
                        h.mute(g, c)
                    });
                    return h
                };
                if (typeof c === "undefined") {
                    if (typeof g === "boolean") {
                        h._muted = g
                    } else {
                        return h._muted
                    }
                };
                var d = h._getSoundIds(c);
                for (var a = 0; a < d.length; a++) {
                    var i = h._soundById(d[a]);
                    if (i) {
                        i._muted = g;
                        if (h._webAudio && i._node) {
                            i._node.gain.setValueAtTime(g ? 0 : i._volume * f.volume(), b.currentTime)
                        } else {
                            if (i._node) {
                                i._node.muted = f._muted ? true : g
                            }
                        }
                    }
                };
                return h
            },
            _stopFade: function(a) {
                var c = this;
                var d = c._soundById(a);
                if (d._interval) {
                    clearInterval(d._interval);
                    delete d._interval;
                    c._emit("faded", a)
                } else {
                    if (d._timeout) {
                        clearTimeout(d._timeout);
                        delete d._timeout;
                        d._node.gain.cancelScheduledValues(b.currentTime);
                        c._emit("faded", a)
                    }
                };
                return c
            },
            loop: function() {
                var g = this;
                var a = arguments;
                var f, c, h;
                if (a.length === 0) {
                    return g._loop
                } else {
                    if (a.length === 1) {
                        if (typeof a[0] === "boolean") {
                            f = a[0];
                            g._loop = f
                        } else {
                            h = g._soundById(parseInt(a[0], 10));
                            return h ? h._loop : false
                        }
                    } else {
                        if (a.length === 2) {
                            f = a[0];
                            c = parseInt(a[1], 10)
                        }
                    }
                };
                var d = g._getSoundIds(c);
                for (var b = 0; b < d.length; b++) {
                    h = g._soundById(d[b]);
                    if (h) {
                        h._loop = f;
                        if (g._webAudio && h._node && h._node.bufferSource) {
                            h._node.bufferSource.loop = f
                        }
                    }
                };
                return g
            },
            playing: function(a) {
                var b = this;
                var c = b._soundById(a) || b._sounds[0];
                return c ? !c._paused : false
            },
            duration: function() {
                return this._duration
            },
            unload: function() {
                var d = this;
                var g = d._sounds;
                for (var b = 0; b < g.length; b++) {
                    if (!g[b]._paused) {
                        d.stop(g[b]._id);
                        d._emit("end", g[b]._id)
                    };
                    if (!d._webAudio) {
                        g[b]._node.src = "";
                        g[b]._node.removeEventListener("error", g[b]._errorFn, false);
                        g[b]._node.removeEventListener("canplaythrough", g[b]._loadFn, false)
                    };
                    delete g[b]._node;
                    d._clearTimer(g[b]._id);
                    var c = f._howls.indexOf(d);
                    if (c >= 0) {
                        f._howls.splice(c, 1)
                    }
                };
                if (a) {
                    delete a[d._src]
                };
                d = null;
                return null
            },
            on: function(a, c, d, f) {
                var g = this;
                var b = g["_on" + a];
                if (typeof c === "function") {
                    b.push(f ? {
                        id: d,
                        fn: c,
                        once: f
                    } : {
                        id: d,
                        fn: c
                    })
                };
                return g
            },
            off: function(a, c, f) {
                var g = this;
                var b = g["_on" + a];
                if (c) {
                    for (var d = 0; d < b.length; d++) {
                        if (c === b[d].fn && f === b[d].id) {
                            b.splice(d, 1);
                            break
                        }
                    }
                } else {
                    g["on" + a] = []
                };
                return g
            },
            once: function(a, b, c) {
                var d = this;
                d.on(a, b, c, 1);
                return d
            },
            _emit: function(a, d, f) {
                var g = this;
                var b = g["_on" + a];
                for (var c = 0; c < b.length; c++) {
                    if (!b[c].id || b[c].id === d) {
                        setTimeout(function(a) {
                            a.call(this, d, f)
                        }.bind(g, b[c].fn), 0);
                        if (b[c].once) {
                            g.off(a, b[c].fn, d)
                        }
                    }
                };
                return g
            },
            _ended: function(d) {
                var c = this;
                var f = d._sprite;
                var a = !!(d._loop || c._sprite[f][2]);
                c._emit("end", d._id);
                if (c._onends[d._id]) {
                    c._onends[d._id]();
                    delete c._onends[d._id]
                };
                if (!c._webAudio && a) {
                    c.stop(d._id).play(d._id)
                };
                if (c._webAudio && a) {
                    c._emit("play", d._id);
                    d._seek = d._start || 0;
                    d._playStart = b.currentTime;
                    var g = ((d._stop - d._start) * 1000) / Math.abs(d._rate);
                    c._endTimers[d._id] = setTimeout(c._ended.bind(c, d), g)
                };
                if (c._webAudio && !a) {
                    d._paused = true;
                    d._ended = true;
                    d._seek = d._start || 0;
                    c._clearTimer(d._id);
                    d._node.bufferSource = null
                };
                if (!c._webAudio && !a) {
                    c.stop(d._id)
                };
                return c
            },
            _clearTimer: function(a) {
                var b = this;
                if (b._endTimers[a]) {
                    clearTimeout(b._endTimers[a]);
                    delete b._endTimers[a]
                };
                return b
            },
            _soundById: function(b) {
                var c = this;
                for (var a = 0; a < c._sounds.length; a++) {
                    if (b === c._sounds[a]._id) {
                        return c._sounds[a]
                    }
                };
                return null
            },
            _inactiveSound: function() {
                var b = this;
                b._drain();
                for (var a = 0; a < b._sounds.length; a++) {
                    if (b._sounds[a]._ended) {
                        return b._sounds[a].reset()
                    }
                };
                return new o(b)
            },
            _drain: function() {
                var d = this;
                var c = d._pool;
                var a = 0;
                var b = 0;
                if (d._sounds.length < c) {
                    return
                };
                for (b = 0; b < d._sounds.length; b++) {
                    if (d._sounds[b]._ended) {
                        a++
                    }
                };
                for (b = d._sounds.length - 1; b >= 0; b--) {
                    if (a <= c) {
                        return
                    };
                    if (d._sounds[b]._ended) {
                        if (d._webAudio && d._sounds[b]._node) {
                            d._sounds[b]._node.disconnect(0)
                        };
                        d._sounds.splice(b, 1);
                        a--
                    }
                }
            },
            _getSoundIds: function(b) {
                var d = this;
                if (typeof b === "undefined") {
                    var c = [];
                    for (var a = 0; a < d._sounds.length; a++) {
                        c.push(d._sounds[a]._id)
                    };
                    return c
                } else {
                    return [b]
                }
            },
            _refreshBuffer: function(d) {
                var c = this;
                d._node.bufferSource = b.createBufferSource();
                d._node.bufferSource.buffer = a[c._src];
                if (d._panner) {
                    d._node.bufferSource.connect(d._panner)
                } else {
                    d._node.bufferSource.connect(d._node)
                };
                d._node.bufferSource.loop = d._loop;
                if (d._loop) {
                    d._node.bufferSource.loopStart = d._start || 0;
                    d._node.bufferSource.loopEnd = d._stop
                };
                d._node.bufferSource.playbackRate.value = c._rate;
                return c
            }
        };
        var o = function(a) {
            this._parent = a;
            this.init()
        };
        o.prototype = {
            init: function() {
                var b = this;
                var a = b._parent;
                b._muted = a._muted;
                b._loop = a._loop;
                b._volume = a._volume;
                b._muted = a._muted;
                b._rate = a._rate;
                b._seek = 0;
                b._paused = true;
                b._ended = true;
                b._id = Math.round(Date.now() * Math.random());
                a._sounds.push(b);
                b.create();
                return b
            },
            create: function() {
                var c = this;
                var a = c._parent;
                var d = (f._muted || c._muted || c._parent._muted) ? 0 : c._volume * f.volume();
                if (a._webAudio) {
                    c._node = (typeof b.createGain === "undefined") ? b.createGainNode() : b.createGain();
                    c._node.gain.setValueAtTime(d, b.currentTime);
                    c._node.paused = true;
                    c._node.connect(j)
                } else {
                    c._node = new Audio();
                    c._errorFn = c._errorListener.bind(c);
                    c._node.addEventListener("error", c._errorFn, false);
                    c._loadFn = c._loadListener.bind(c);
                    c._node.addEventListener("canplaythrough", c._loadFn, false);
                    c._node.src = a._src;
                    c._node.preload = "auto";
                    c._node.volume = d;
                    c._node.load()
                };
                return c
            },
            reset: function() {
                var b = this;
                var a = b._parent;
                b._muted = a._muted;
                b._loop = a._loop;
                b._volume = a._volume;
                b._muted = a._muted;
                b._rate = a._rate;
                b._seek = 0;
                b._paused = true;
                b._ended = true;
                b._sprite = null;
                b._id = Math.round(Date.now() * Math.random());
                return b
            },
            _errorListener: function() {
                var a = this;
                if (a._node.error && a._node.error.code === 4) {
                    f.noAudio = true
                };
                a._parent._emit("loaderror", a._id, a._node.error ? a._node.error.code : 0);
                a._node.removeEventListener("error", a._errorListener, false)
            },
            _loadListener: function() {
                var b = this;
                var a = b._parent;
                if (a._duration == 0) {
                    a._duration = Math.ceil(b._node.duration * 10) / 10
                };
                if (Object.keys(a._sprite).length === 0) {
                    a._sprite = {
                        __default: [0, a._duration * 1000]
                    }
                };
                if (!a._loaded) {
                    a._loaded = true;
                    a._emit("load")
                };
                if (a._autoplay) {
                    a.play()
                };
                b._node.removeEventListener("canplaythrough", b._loadFn, false)
            }
        };
        if (p) {
            var a = {};
            var h = function(g) {
                var h = g._src;
                if (a[h]) {
                    g._duration = a[h].duration;
                    i(g);
                    return
                };
                if (/^data:[^;]+;base64,/.test(h)) {
                    window.atob = window.atob || function(g) {
                        var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                        var i = String(g).replace(/=+$/, "");
                        for (var a = 0, b, c, f = 0, h = ""; c = i.charAt(f++); ~c && (b = a % 4 ? b * 64 + c : c, a++ % 4) ? h += String.fromCharCode(255 & b >> (-2 * a & 6)) : 0) {
                            c = d.indexOf(c)
                        };
                        return h
                    };
                    var b = atob(h.split(",")[1]);
                    var d = new Uint8Array(b.length);
                    for (var f = 0; f < b.length; ++f) {
                        d[f] = b.charCodeAt(f)
                    };
                    c(d.buffer, g)
                } else {
                    var j = new XMLHttpRequest();
                    j.open("GET", h, true);
                    j.responseType = "arraybuffer";
                    j.onload = function() {
                        c(j.response, g)
                    };
                    j.onerror = function() {
                        if (g._webAudio) {
                            g._html5 = true;
                            g._webAudio = false;
                            g._sounds = [];
                            delete a[h];
                            g.load()
                        }
                    };
                    l(j)
                }
            };
            var l = function(a) {
                try {
                    a.send()
                } catch (e) {
                    a.onerror()
                }
            };
            var c = function(d, f) {
                b.decodeAudioData(d, function(b) {
                    if (b) {
                        a[f._src] = b;
                        i(f, b)
                    }
                }, function() {
                    f._emit("loaderror")
                })
            };
            var i = function(b, a) {
                if (a && !b._duration) {
                    b._duration = a.duration
                };
                if (Object.keys(b._sprite).length === 0) {
                    b._sprite = {
                        __default: [0, b._duration * 1000]
                    }
                };
                if (!b._loaded) {
                    b._loaded = true;
                    b._emit("load")
                };
                if (b._autoplay) {
                    b.play()
                }
            }
        };

        function n() {
            try {
                if (typeof AudioContext !== "undefined") {
                    b = new AudioContext()
                } else {
                    if (typeof webkitAudioContext !== "undefined") {
                        b = new webkitAudioContext()
                    } else {
                        p = false
                    }
                }
            } catch (e) {
                p = false
            };
            if (!p) {
                if (typeof Audio !== "undefined") {
                    try {
                        new Audio()
                    } catch (e) {
                        k = true
                    }
                } else {
                    k = true
                }
            };
            var a = new Audio();
            if (a.muted) {
                k = true
            }
        }
        if (typeof define === "function" && define.amd) {
            define("howler", function() {
                return {
                    Howler: f,
                    Howl: d
                }
            })
        };
        if (typeof exports !== "undefined") {
            exports.Howler = f;
            exports.Howl = d
        };
        if (typeof window !== "undefined") {
            window.HowlerGlobal = g;
            window.Howler = f;
            window.Howl = d;
            window.Sound = o
        }
    }

    function bu(c) {
        function j(b) {
            var d = b.length,
                c = $.type(b);
            return "function" === c || $.isWindow(b) ? !1 : 1 === b.nodeType && d ? !0 : "array" === c || 0 === d || "number" == typeof d && d > 0 && d - 1 in b
        }
        if (!c.jQuery) {
            var $ = function(b, c) {
                return new $.fn.init(b, c)
            };
            $.isWindow = function(a) {
                return null != a && a == a.window
            }, $.type = function(a) {
                return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? b[g.call(a)] || "object" : typeof a
            }, $.isArray = Array.isArray || function(b) {
                return "array" === $.type(b)
            }, $.isPlainObject = function(b) {
                var c;
                if (!b || "object" !== $.type(b) || b.nodeType || $.isWindow(b)) {
                    return !1
                };
                try {
                    if (b.constructor && !f.call(b, "constructor") && !f.call(b.constructor.prototype, "isPrototypeOf")) {
                        return !1
                    }
                } catch (h) {
                    return !1
                };
                for (c in b) {
                    ;
                };
                return void(0) === c || f.call(b, c)
            }, $.each = function(b, g, a) {
                var d, f = 0,
                    c = b.length,
                    h = j(b);
                if (a) {
                    if (h) {
                        for (; c > f && (d = g.apply(b[f], a), d !== !1); f++) {
                            ;
                        }
                    } else {
                        for (f in b) {
                            if (d = g.apply(b[f], a), d === !1) {
                                break
                            }
                        }
                    }
                } else {
                    if (h) {
                        for (; c > f && (d = g.call(b[f], f, b[f]), d !== !1); f++) {
                            ;
                        }
                    } else {
                        for (f in b) {
                            if (d = g.call(b[f], f, b[f]), d === !1) {
                                break
                            }
                        }
                    }
                };
                return b
            }, $.data = function(c, g, b) {
                if (void(0) === b) {
                    var d = c[$.expando],
                        f = d && h[d];
                    if (void(0) === g) {
                        return f
                    };
                    if (f && g in f) {
                        return f[g]
                    }
                } else {
                    if (void(0) !== g) {
                        var d = c[$.expando] || (c[$.expando] = ++$.uuid);
                        return h[d] = h[d] || {}, h[d][g] = b, b
                    }
                }
            }, $.removeData = function(c, f) {
                var b = c[$.expando],
                    d = b && h[b];
                d && $.each(f, function(a, b) {
                    delete d[b]
                })
            }, $.extend = function() {
                var c, k, i, b, g, h, d = arguments[0] || {},
                    j = 1,
                    f = arguments.length,
                    l = !1;
                for ("boolean" == typeof d && (l = d, d = arguments[j] || {}, j++), "object" != typeof d && "function" !== $.type(d) && (d = {}), j === f && (d = this, j--); f > j; j++) {
                    if (null != (g = arguments[j])) {
                        for (b in g) {
                            c = d[b], i = g[b], d !== i && (l && i && ($.isPlainObject(i) || (k = $.isArray(i))) ? (k ? (k = !1, h = c && $.isArray(c) ? c : []) : h = c && $.isPlainObject(c) ? c : {}, d[b] = $.extend(l, h, i)) : void(0) !== i && (d[b] = i))
                        }
                    }
                };
                return d
            }, $.queue = function(c, g, b) {
                function d(b, c) {
                    var a = c || [];
                    return null != b && (j(Object(b)) ? ! function(b, f) {
                        for (var d = +f.length, a = 0, c = b.length; d > a;) {
                            b[c++] = f[a++]
                        };
                        if (d !== d) {
                            for (; void(0) !== f[a];) {
                                b[c++] = f[a++]
                            }
                        };
                        return b.length = c, b
                    }(a, "string" == typeof b ? [b] : b) : [].push.call(a, b)), a
                }
                if (c) {
                    g = (g || "fx") + "queue";
                    var f = $.data(c, g);
                    return b ? (!f || $.isArray(b) ? f = $.data(c, g, d(b)) : f.push(b), f) : f || []
                }
            }, $.dequeue = function(b, c) {
                $.each(b.nodeType ? [b] : b, function(d, g) {
                    c = c || "fx";
                    var b = $.queue(g, c),
                        f = b.shift();
                    "inprogress" === f && (f = b.shift()), f && ("fx" === c && b.unshift("inprogress"), f.call(g, function() {
                        $.dequeue(g, c)
                    }))
                })
            }, $.fn = $.prototype = {
                init: function(a) {
                    if (a.nodeType) {
                        return this[0] = a, this
                    };
                    throw new Error("Not a DOM node.")
                },
                offset: function() {
                    var a = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                        top: 0,
                        left: 0
                    };
                    return {
                        top: a.top + (c.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                        left: a.left + (c.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                    }
                },
                position: function() {
                    function c() {
                        for (var a = this.offsetParent || document; a && "html" === !a.nodeType.toLowerCase && "static" === a.style.position;) {
                            a = a.offsetParent
                        };
                        return a || document
                    }
                    var f = this[0],
                        c = c.apply(f),
                        d = this.offset(),
                        b = /^(?:body|html)$/i.test(c.nodeName) ? {
                            top: 0,
                            left: 0
                        } : $(c).offset();
                    return d.top -= parseFloat(f.style.marginTop) || 0, d.left -= parseFloat(f.style.marginLeft) || 0, c.style && (b.top += parseFloat(c.style.borderTopWidth) || 0, b.left += parseFloat(c.style.borderLeftWidth) || 0), {
                        top: d.top - b.top,
                        left: d.left - b.left
                    }
                }
            };
            var h = {};
            $.expando = "velocity" + (new Date).getTime(), $.uuid = 0;
            for (var b = {}, f = b.hasOwnProperty, g = b.toString, d = "Boolean Number String Function Array Date RegExp Object Error".split(" "), i = 0; i < d.length; i++) {
                b["[object " + d[i] + "]"] = d[i].toLowerCase()
            };
            $.fn.init.prototype = $.fn, c.Velocity = {
                Utilities: $
            }
        }
    }

    function bw() {
        return function(g, v, s, b) {
            function o(b) {
                for (var f = -1, d = b ? b.length : 0, a = []; ++f < d;) {
                    var c = b[f];
                    c && a.push(c)
                };
                return a
            }

            function p(a) {
                return i.isWrapped(a) ? a = [].slice.call(a) : i.isNode(a) && (a = [a]), a
            }

            function k(c) {
                var d = $.data(c, "velocity");
                return null === d ? b : d
            }

            function t(a) {
                return function(b) {
                    return Math.round(b * a) * (1 / a)
                }
            }

            function l(g, s, a, o) {
                function p(a, b) {
                    return 1 - 3 * b + 3 * a
                }

                function k(a, b) {
                    return 3 * b - 6 * a
                }

                function t(a) {
                    return 3 * a
                }

                function l(a, c, b) {
                    return ((p(c, b) * a + k(c, b)) * a + t(c)) * a
                }

                function x(a, c, b) {
                    return 3 * p(c, b) * a * a + 2 * k(c, b) * a + t(c)
                }

                function c(h, f) {
                    for (var c = 0; n > c; ++c) {
                        var d = x(f, g, a);
                        if (0 === d) {
                            return f
                        };
                        var b = l(f, g, a) - h;
                        f -= b / d
                    };
                    return f
                }

                function q() {
                    for (var c = 0; b > c; ++c) {
                        A[c] = l(c * B, g, a)
                    }
                }

                function h(i, f, c) {
                    var d, b, h = 0;
                    do {
                        b = f + (c - f) / 2, d = l(b, g, a) - i, d > 0 ? c = b : f = b
                    } while (Math.abs(d) > j && ++h < y);;
                    return b
                }

                function f(n) {
                    for (var k = 0, i = 1, j = b - 1; i != j && A[i] <= n; ++i) {
                        k += B
                    };
                    --i;
                    var d = (n - A[i]) / (A[i + 1] - A[i]),
                        l = k + d * B,
                        f = x(l, g, a);
                    return f >= C ? c(n, l) : 0 == f ? l : h(n, k, k + B)
                }

                function i() {
                    z = !0, (g != s || a != o) && q()
                }
                var n = 4,
                    C = 0.001,
                    j = 1e-7,
                    y = 10,
                    b = 11,
                    B = 1 / (b - 1),
                    u = "Float32Array" in v;
                if (4 !== arguments.length) {
                    return !1
                };
                for (var r = 0; 4 > r; ++r) {
                    if ("number" != typeof arguments[r] || isNaN(arguments[r]) || !isFinite(arguments[r])) {
                        return !1
                    }
                };
                g = Math.min(g, 1), a = Math.min(a, 1), g = Math.max(g, 0), a = Math.max(a, 0);
                var A = u ? new Float32Array(b) : new Array(b),
                    z = !1,
                    d = function(b) {
                        return z || i(), g === s && a === o ? b : 0 === b ? 0 : 1 === b ? 1 : l(f(b), s, o)
                    };
                d.getControlPoints = function() {
                    return [{
                        x: g,
                        y: s
                    }, {
                        x: a,
                        y: o
                    }]
                };
                var w = "generateBezier(" + [g, s, a, o] + ")";
                return d.toString = function() {
                    return w
                }, d
            }

            function w(a, d) {
                var b = a;
                return i.isString(a) ? x.Easings[a] || (b = !1) : b = i.isArray(a) && 1 === a.length ? t.apply(null, a) : i.isArray(a) && 2 === a.length ? c.apply(null, a.concat([d])) : i.isArray(a) && 4 === a.length ? l.apply(null, a) : !1, b === !1 && (b = x.Easings[x.defaults.easing] ? x.defaults.easing : j), b
            }

            function d(j) {
                if (j) {
                    var F = (new Date).getTime(),
                        C = x.State.calls.length;
                    C > 1e4 && (x.State.calls = o(x.State.calls));
                    for (var B = 0; C > B; B++) {
                        if (x.State.calls[B]) {
                            var D = x.State.calls[B],
                                w = D[0],
                                H = D[2],
                                n = D[3],
                                h = !!n,
                                z = null;
                            n || (n = x.State.calls[B][3] = F - 16);
                            for (var K = Math.min((F - n) / H.duration, 1), s = 0, f = w.length; f > s; s++) {
                                var E = w[s],
                                    J = E.element;
                                if (k(J)) {
                                    var I = !1;
                                    if (H.display !== b && null !== H.display && "none" !== H.display) {
                                        if ("flex" === H.display) {
                                            var g = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                            $.each(g, function(a, b) {
                                                y.setPropertyValue(J, "display", b)
                                            })
                                        };
                                        y.setPropertyValue(J, "display", H.display)
                                    };
                                    H.visibility !== b && "hidden" !== H.visibility && y.setPropertyValue(J, "visibility", H.visibility);
                                    for (var G in E) {
                                        if ("element" !== G) {
                                            var v = E[G],
                                                c, p = i.isString(v.easing) ? x.Easings[v.easing] : v.easing;
                                            if (1 === K) {
                                                c = v.endValue
                                            } else {
                                                var l = v.endValue - v.startValue;
                                                if (c = v.startValue + l * p(K, H, l), !h && c === v.currentValue) {
                                                    continue
                                                }
                                            };
                                            if (v.currentValue = c, "tween" === G) {
                                                z = c
                                            } else {
                                                if (y.Hooks.registered[G]) {
                                                    var u = y.Hooks.getRoot(G),
                                                        t = k(J).rootPropertyValueCache[u];
                                                    t && (v.rootPropertyValue = t)
                                                };
                                                var A = y.setPropertyValue(J, G, v.currentValue + (0 === parseFloat(c) ? "" : v.unitType), v.rootPropertyValue, v.scrollData);
                                                y.Hooks.registered[G] && (k(J).rootPropertyValueCache[u] = y.Normalizations.registered[u] ? y.Normalizations.registered[u]("extract", null, A[1]) : A[1]), "transform" === A[0] && (I = !0)
                                            }
                                        }
                                    };
                                    H.mobileHA && k(J).transformCache.translate3d === b && (k(J).transformCache.translate3d = "(0px, 0px, 0px)", I = !0), I && y.flushTransformCache(J)
                                }
                            };
                            H.display !== b && "none" !== H.display && (x.State.calls[B][2].display = !1), H.visibility !== b && "hidden" !== H.visibility && (x.State.calls[B][2].visibility = !1), H.progress && H.progress.call(D[1], D[1], K, Math.max(0, n + H.duration - F), n, z), 1 === K && q(B)
                        }
                    }
                };
                x.State.isTicking && r(d)
            }

            function q(d, r) {
                if (!x.State.calls[d]) {
                    return !1
                };
                for (var p = x.State.calls[d][0], l = x.State.calls[d][1], n = x.State.calls[d][2], q = x.State.calls[d][4], i = !1, s = 0, c = p.length; c > s; s++) {
                    var o = p[s].element;
                    if (r || n.loop || ("none" === n.display && y.setPropertyValue(o, "display", n.display), "hidden" === n.visibility && y.setPropertyValue(o, "visibility", n.visibility)), n.loop !== !0 && ($.queue(o)[1] === b || !/\.velocityQueueEntryFlag/i.test($.queue(o)[1])) && k(o)) {
                        k(o).isAnimating = !1, k(o).rootPropertyValueCache = {};
                        var g = !1;
                        $.each(y.Lists.transforms3D, function(a, f) {
                            var d = /^scale/.test(f) ? 1 : 0,
                                c = k(o).transformCache[f];
                            k(o).transformCache[f] !== b && new RegExp("^\\(" + d + "[^.]").test(c) && (g = !0, delete k(o).transformCache[f])
                        }), n.mobileHA && (g = !0, delete k(o).transformCache.translate3d), g && y.flushTransformCache(o), y.Values.removeClass(o, "velocity-animating")
                    };
                    if (!r && n.complete && !n.loop && s === c - 1) {
                        try {
                            n.complete.call(l, l)
                        } catch (f) {
                            setTimeout(function() {
                                throw f
                            }, 1)
                        }
                    };
                    q && n.loop !== !0 && q(l), k(o) && n.loop === !0 && !r && ($.each(k(o).tweensContainer, function(a, b) {
                        /^rotate/.test(a) && 360 === parseFloat(b.endValue) && (b.endValue = 0, b.startValue = 360), /^backgroundPosition/.test(a) && 100 === parseFloat(b.endValue) && "%" === b.unitType && (b.endValue = 0, b.startValue = 100)
                    }), x(o, "reverse", {
                        loop: !0,
                        delay: n.delay
                    })), n.queue !== !1 && $.dequeue(o, n.queue)
                };
                x.State.calls[d] = !1;
                for (var h = 0, j = x.State.calls.length; j > h; h++) {
                    if (x.State.calls[h] !== !1) {
                        i = !0;
                        break
                    }
                };
                i === !1 && (x.State.isTicking = !1, delete x.State.calls, x.State.calls = [])
            }
            var h = function() {
                    if (s.documentMode) {
                        return s.documentMode
                    };
                    for (var a = 7; a > 4; a--) {
                        var c = s.createElement("div");
                        if (c.innerHTML = "<!--[if IE " + a + "]><span></span><![endif]-->", c.getElementsByTagName("span").length) {
                            return c = null, a
                        }
                    };
                    return b
                }(),
                f = function() {
                    var a = 0;
                    return v.webkitRequestAnimationFrame || v.mozRequestAnimationFrame || function(d) {
                        var c = (new Date).getTime(),
                            b;
                        return b = Math.max(0, 16 - (c - a)), a = c + b, setTimeout(function() {
                            d(c + b)
                        }, b)
                    }
                }(),
                i = {
                    isString: function(a) {
                        return "string" == typeof a
                    },
                    isArray: Array.isArray || function(a) {
                        return "[object Array]" === Object.prototype.toString.call(a)
                    },
                    isFunction: function(a) {
                        return "[object Function]" === Object.prototype.toString.call(a)
                    },
                    isNode: function(a) {
                        return a && a.nodeType
                    },
                    isNodeList: function(a) {
                        return "object" == typeof a && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(a)) && a.length !== b && (0 === a.length || "object" == typeof a[0] && a[0].nodeType > 0)
                    },
                    isWrapped: function(a) {
                        return a && (a.jquery || v.Zepto && v.Zepto.zepto.isZ(a))
                    },
                    isSVG: function(a) {
                        return v.SVGElement && a instanceof v.SVGElement
                    },
                    isEmptyObject: function(a) {
                        for (var b in a) {
                            return !1
                        };
                        return !0
                    }
                },
                $, n = !1;
            if (g.fn && g.fn.jquery ? ($ = g, n = !0) : $ = v.Velocity.Utilities, 8 >= h && !n) {
                throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.")
            };
            if (7 >= h) {
                return void((jQuery.fn.velocity = jQuery.fn.animate))
            };
            var z = 400,
                j = "swing",
                x = {
                    State: {
                        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                        isAndroid: /Android/i.test(navigator.userAgent),
                        isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                        isChrome: v.chrome,
                        isFirefox: /Firefox/i.test(navigator.userAgent),
                        prefixElement: s.createElement("div"),
                        prefixMatches: {},
                        scrollAnchor: null,
                        scrollPropertyLeft: null,
                        scrollPropertyTop: null,
                        isTicking: !1,
                        calls: []
                    },
                    CSS: {},
                    Utilities: $,
                    Redirects: {},
                    Easings: {},
                    Promise: v.Promise,
                    defaults: {
                        queue: "",
                        duration: z,
                        easing: j,
                        begin: b,
                        complete: b,
                        progress: b,
                        display: b,
                        visibility: b,
                        loop: !1,
                        delay: !1,
                        mobileHA: !0,
                        _cacheValues: !0
                    },
                    init: function(b) {
                        $.data(b, "velocity", {
                            isSVG: i.isSVG(b),
                            isAnimating: !1,
                            computedStyle: null,
                            tweensContainer: null,
                            rootPropertyValueCache: {},
                            transformCache: {}
                        })
                    },
                    hook: null,
                    mock: !1,
                    version: {
                        major: 1,
                        minor: 2,
                        patch: 2
                    },
                    debug: !1
                };
            v.pageYOffset !== b ? (x.State.scrollAnchor = v, x.State.scrollPropertyLeft = "pageXOffset", x.State.scrollPropertyTop = "pageYOffset") : (x.State.scrollAnchor = s.documentElement || s.body.parentNode || s.body, x.State.scrollPropertyLeft = "scrollLeft", x.State.scrollPropertyTop = "scrollTop");
            var c = function() {
                function b(a) {
                    return -a.tension * a.x - a.friction * a.v
                }

                function d(f, d, a) {
                    var c = {
                        x: f.x + a.dx * d,
                        v: f.v + a.dv * d,
                        tension: f.tension,
                        friction: f.friction
                    };
                    return {
                        dx: c.v,
                        dv: b(c)
                    }
                }

                function c(i, a) {
                    var g = {
                            dx: i.v,
                            dv: b(i)
                        },
                        h = d(i, 0.5 * a, g),
                        c = d(i, 0.5 * a, h),
                        j = d(i, a, c),
                        f = 1 / 6 * (g.dx + 2 * (h.dx + c.dx) + j.dx),
                        k = 1 / 6 * (g.dv + 2 * (h.dv + c.dv) + j.dv);
                    return i.x = i.x + f * a, i.v = i.v + k * a, i
                }
                return function a(d, n, i) {
                    var j = {
                            x: -1,
                            v: 0,
                            tension: null,
                            friction: null
                        },
                        g = [0],
                        l = 0,
                        h = 1e-4,
                        o = 0.016,
                        b, k, f;
                    for (d = parseFloat(d) || 500, n = parseFloat(n) || 20, i = i || null, j.tension = d, j.friction = n, b = null !== i, b ? (l = a(d, n), k = l / i * o) : k = o;;) {
                        if (f = c(f || j, k), g.push(1 + f.x), l += 16, !(Math.abs(f.x) > h && Math.abs(f.v) > h)) {
                            break
                        }
                    };
                    return b ? function(a) {
                        return g[a * (g.length - 1) | 0]
                    } : l
                }
            }();
            x.Easings = {
                linear: function(a) {
                    return a
                },
                swing: function(a) {
                    return 0.5 - Math.cos(a * Math.PI) / 2
                },
                spring: function(a) {
                    return 1 - Math.cos(4.5 * a * Math.PI) * Math.exp(6 * -a)
                }
            }, $.each([
                ["ease", [0.25, 0.1, 0.25, 1]],
                ["ease-in", [0.42, 0, 1, 1]],
                ["ease-out", [0, 0, 0.58, 1]],
                ["ease-in-out", [0.42, 0, 0.58, 1]],
                ["easeInSine", [0.47, 0, 0.745, 0.715]],
                ["easeOutSine", [0.39, 0.575, 0.565, 1]],
                ["easeInOutSine", [0.445, 0.05, 0.55, 0.95]],
                ["easeInQuad", [0.55, 0.085, 0.68, 0.53]],
                ["easeOutQuad", [0.25, 0.46, 0.45, 0.94]],
                ["easeInOutQuad", [0.455, 0.03, 0.515, 0.955]],
                ["easeInCubic", [0.55, 0.055, 0.675, 0.19]],
                ["easeOutCubic", [0.215, 0.61, 0.355, 1]],
                ["easeInOutCubic", [0.645, 0.045, 0.355, 1]],
                ["easeInQuart", [0.895, 0.03, 0.685, 0.22]],
                ["easeOutQuart", [0.165, 0.84, 0.44, 1]],
                ["easeInOutQuart", [0.77, 0, 0.175, 1]],
                ["easeInQuint", [0.755, 0.05, 0.855, 0.06]],
                ["easeOutQuint", [0.23, 1, 0.32, 1]],
                ["easeInOutQuint", [0.86, 0, 0.07, 1]],
                ["easeInExpo", [0.95, 0.05, 0.795, 0.035]],
                ["easeOutExpo", [0.19, 1, 0.22, 1]],
                ["easeInOutExpo", [1, 0, 0, 1]],
                ["easeInCirc", [0.6, 0.04, 0.98, 0.335]],
                ["easeOutCirc", [0.075, 0.82, 0.165, 1]],
                ["easeInOutCirc", [0.785, 0.135, 0.15, 0.86]]
            ], function(a, b) {
                x.Easings[b[0]] = l.apply(null, b[1])
            });
            var y = x.CSS = {
                RegEx: {
                    isHex: /^#([A-f\d]{3}){1,2}$/i,
                    valueUnwrap: /^[A-z]+\((.*)\)$/i,
                    wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                    valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
                },
                Lists: {
                    colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                    transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                    transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
                },
                Hooks: {
                    templates: {
                        textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                        boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                        clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                        backgroundPosition: ["X Y", "0% 0%"],
                        transformOrigin: ["X Y Z", "50% 50% 0px"],
                        perspectiveOrigin: ["X Y", "50% 50%"]
                    },
                    registered: {},
                    register: function() {
                        for (var b = 0; b < y.Lists.colors.length; b++) {
                            var j = "color" === y.Lists.colors[b] ? "0 0 0 1" : "255 255 255 1";
                            y.Hooks.templates[y.Lists.colors[b]] = ["Red Green Blue Alpha", j]
                        };
                        var g, a, d;
                        if (h) {
                            for (g in y.Hooks.templates) {
                                a = y.Hooks.templates[g], d = a[0].split(" ");
                                var f = a[1].match(y.RegEx.valueSplit);
                                "Color" === d[0] && (d.push(d.shift()), f.push(f.shift()), y.Hooks.templates[g] = [d.join(" "), f.join(" ")])
                            }
                        };
                        for (g in y.Hooks.templates) {
                            a = y.Hooks.templates[g], d = a[0].split(" ");
                            for (var b in d) {
                                var c = g + d[b],
                                    i = b;
                                y.Hooks.registered[c] = [g, i]
                            }
                        }
                    },
                    getRoot: function(a) {
                        var b = y.Hooks.registered[a];
                        return b ? b[0] : a
                    },
                    cleanRootPropertyValue: function(a, b) {
                        return y.RegEx.valueUnwrap.test(b) && (b = b.match(y.RegEx.valueUnwrap)[1]), y.Values.isCSSNullValue(b) && (b = y.Hooks.templates[a][1]), b
                    },
                    extractValue: function(b, f) {
                        var d = y.Hooks.registered[b];
                        if (d) {
                            var a = d[0],
                                c = d[1];
                            return f = y.Hooks.cleanRootPropertyValue(a, f), f.toString().match(y.RegEx.valueSplit)[c]
                        };
                        return f
                    },
                    injectValue: function(b, i, g) {
                        var a = y.Hooks.registered[b];
                        if (a) {
                            var d = a[0],
                                f = a[1],
                                c, h;
                            return g = y.Hooks.cleanRootPropertyValue(d, g), c = g.toString().match(y.RegEx.valueSplit), c[f] = i, h = c.join(" ")
                        };
                        return g
                    }
                },
                Normalizations: {
                    registered: {
                        clip: function(b, d, c) {
                            switch (b) {
                                case "name":
                                    return "clip";
                                case "extract":
                                    var a;
                                    return y.RegEx.wrappedValueAlreadyExtracted.test(c) ? a = c : (a = c.toString().match(y.RegEx.valueUnwrap), a = a ? a[1].replace(/,(\s+)?/g, " ") : c), a;
                                case "inject":
                                    return "rect(" + c + ")"
                            }
                        },
                        blur: function(b, f, d) {
                            switch (b) {
                                case "name":
                                    return x.State.isFirefox ? "filter" : "-webkit-filter";
                                case "extract":
                                    var a = parseFloat(d);
                                    if (!a && 0 !== a) {
                                        var c = d.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                        a = c ? c[1] : 0
                                    };
                                    return a;
                                case "inject":
                                    return parseFloat(d) ? "blur(" + d + ")" : "none"
                            }
                        },
                        opacity: function(b, d, c) {
                            if (8 >= h) {
                                switch (b) {
                                    case "name":
                                        return "filter";
                                    case "extract":
                                        var a = c.toString().match(/alpha\(opacity=(.*)\)/i);
                                        return c = a ? a[1] / 100 : 1;
                                    case "inject":
                                        return d.style.zoom = 1, parseFloat(c) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(c), 10) + ")"
                                }
                            } else {
                                switch (b) {
                                    case "name":
                                        return "opacity";
                                    case "extract":
                                        return c;
                                    case "inject":
                                        return c
                                }
                            }
                        }
                    },
                    register: function() {
                        9 >= h || x.State.isGingerbread || (y.Lists.transformsBase = y.Lists.transformsBase.concat(y.Lists.transforms3D));
                        for (var a = 0; a < y.Lists.transformsBase.length; a++) {
                            ! function() {
                                var c = y.Lists.transformsBase[a];
                                y.Normalizations.registered[c] = function(a, g, d) {
                                    switch (a) {
                                        case "name":
                                            return "transform";
                                        case "extract":
                                            return k(g) === b || k(g).transformCache[c] === b ? /^scale/i.test(c) ? 1 : 0 : k(g).transformCache[c].replace(/[()]/g, "");
                                        case "inject":
                                            var f = !1;
                                            switch (c.substr(0, c.length - 1)) {
                                                case "translate":
                                                    f = !/(%|px|em|rem|vw|vh|\d)$/i.test(d);
                                                    break;
                                                case "scal":
                                                    ;
                                                case "scale":
                                                    x.State.isAndroid && k(g).transformCache[c] === b && 1 > d && (d = 1), f = !/(\d)$/i.test(d);
                                                    break;
                                                case "skew":
                                                    f = !/(deg|\d)$/i.test(d);
                                                    break;
                                                case "rotate":
                                                    f = !/(deg|\d)$/i.test(d)
                                            };
                                            return f || (k(g).transformCache[c] = "(" + d + ")"), k(g).transformCache[c]
                                    }
                                }
                            }()
                        };
                        for (var a = 0; a < y.Lists.colors.length; a++) {
                            ! function() {
                                var c = y.Lists.colors[a];
                                y.Normalizations.registered[c] = function(a, i, f) {
                                    switch (a) {
                                        case "name":
                                            return c;
                                        case "extract":
                                            var g;
                                            if (y.RegEx.wrappedValueAlreadyExtracted.test(f)) {
                                                g = f
                                            } else {
                                                var d, j = {
                                                    black: "rgb(0, 0, 0)",
                                                    blue: "rgb(0, 0, 255)",
                                                    gray: "rgb(128, 128, 128)",
                                                    green: "rgb(0, 128, 0)",
                                                    red: "rgb(255, 0, 0)",
                                                    white: "rgb(255, 255, 255)"
                                                };
                                                /^[A-z]+$/i.test(f) ? d = j[f] !== b ? j[f] : j.black : y.RegEx.isHex.test(f) ? d = "rgb(" + y.Values.hexToRgb(f).join(" ") + ")" : /^rgba?\(/i.test(f) || (d = j.black), g = (d || f).toString().match(y.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                            };
                                            return 8 >= h || 3 !== g.split(" ").length || (g += " 1"), g;
                                        case "inject":
                                            return 8 >= h ? 4 === f.split(" ").length && (f = f.split(/\s+/).slice(0, 3).join(" ")) : 3 === f.split(" ").length && (f += " 1"), (8 >= h ? "rgb" : "rgba") + "(" + f.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                                    }
                                }
                            }()
                        }
                    }
                },
                Names: {
                    camelCase: function(a) {
                        return a.replace(/-(\w)/g, function(a, b) {
                            return b.toUpperCase()
                        })
                    },
                    SVGAttribute: function(a) {
                        var b = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                        return (h || x.State.isAndroid && !x.State.isChrome) && (b += "|transform"), new RegExp("^(" + b + ")$", "i").test(a)
                    },
                    prefixCheck: function(b) {
                        if (x.State.prefixMatches[b]) {
                            return [x.State.prefixMatches[b], !0]
                        };
                        for (var f = ["", "Webkit", "Moz", "ms", "O"], d = 0, a = f.length; a > d; d++) {
                            var c;
                            if (c = 0 === d ? b : f[d] + b.replace(/^\w/, function(a) {
                                    return a.toUpperCase()
                                }), i.isString(x.State.prefixElement.style[c])) {
                                return x.State.prefixMatches[b] = c, [c, !0]
                            }
                        };
                        return [b, !1]
                    }
                },
                Values: {
                    hexToRgb: function(b) {
                        var d = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                            c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
                            a;
                        return b = b.replace(d, function(b, d, c, a) {
                            return d + d + c + c + a + a
                        }), a = c.exec(b), a ? [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)] : [0, 0, 0]
                    },
                    isCSSNullValue: function(a) {
                        return 0 == a || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a)
                    },
                    getUnitType: function(a) {
                        return /^(rotate|skew)/i.test(a) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a) ? "" : "px"
                    },
                    getDisplayType: function(a) {
                        var b = a && a.tagName.toString().toLowerCase();
                        return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b) ? "inline" : /^(li)$/i.test(b) ? "list-item" : /^(tr)$/i.test(b) ? "table-row" : /^(table)$/i.test(b) ? "table" : /^(tbody)$/i.test(b) ? "table-row-group" : "block"
                    },
                    addClass: function(a, b) {
                        a.classList ? a.classList.add(b) : a.className += (a.className.length ? " " : "") + b
                    },
                    removeClass: function(a, b) {
                        a.classList ? a.classList.remove(b) : a.className = a.className.toString().replace(new RegExp("(^|\\s)" + b.split(" ").join("|") + "(\\s|$)", "gi"), " ")
                    }
                },
                getPropertyValue: function(f, o, j, l) {
                    function p(f, o) {
                        function j() {
                            q && y.setPropertyValue(f, "display", "none")
                        }
                        var i = 0;
                        if (8 >= h) {
                            i = $.css(f, o)
                        } else {
                            var q = !1;
                            if (/^(width|height)$/.test(o) && 0 === y.getPropertyValue(f, "display") && (q = !0, y.setPropertyValue(f, "display", y.Values.getDisplayType(f))), !l) {
                                if ("height" === o && "border-box" !== y.getPropertyValue(f, "boxSizing").toString().toLowerCase()) {
                                    var c = f.offsetHeight - (parseFloat(y.getPropertyValue(f, "borderTopWidth")) || 0) - (parseFloat(y.getPropertyValue(f, "borderBottomWidth")) || 0) - (parseFloat(y.getPropertyValue(f, "paddingTop")) || 0) - (parseFloat(y.getPropertyValue(f, "paddingBottom")) || 0);
                                    return j(), c
                                };
                                if ("width" === o && "border-box" !== y.getPropertyValue(f, "boxSizing").toString().toLowerCase()) {
                                    var n = f.offsetWidth - (parseFloat(y.getPropertyValue(f, "borderLeftWidth")) || 0) - (parseFloat(y.getPropertyValue(f, "borderRightWidth")) || 0) - (parseFloat(y.getPropertyValue(f, "paddingLeft")) || 0) - (parseFloat(y.getPropertyValue(f, "paddingRight")) || 0);
                                    return j(), n
                                }
                            };
                            var d;
                            d = k(f) === b ? v.getComputedStyle(f, null) : k(f).computedStyle ? k(f).computedStyle : k(f).computedStyle = v.getComputedStyle(f, null), "borderColor" === o && (o = "borderTopColor"), i = 9 === h && "filter" === o ? d.getPropertyValue(o) : d[o], ("" === i || null === i) && (i = f.style[o]), j()
                        };
                        if ("auto" === i && /^(top|right|bottom|left)$/i.test(o)) {
                            var g = p(f, "position");
                            ("fixed" === g || "absolute" === g && /top|left/i.test(o)) && (i = $(f).position()[o] + "px")
                        };
                        return i
                    }
                    var g;
                    if (y.Hooks.registered[o]) {
                        var q = o,
                            c = y.Hooks.getRoot(q);
                        j === b && (j = y.getPropertyValue(f, y.Names.prefixCheck(c)[0])), y.Normalizations.registered[c] && (j = y.Normalizations.registered[c]("extract", f, j)), g = y.Hooks.extractValue(q, j)
                    } else {
                        if (y.Normalizations.registered[o]) {
                            var n, d;
                            n = y.Normalizations.registered[o]("name", f), "transform" !== n && (d = p(f, y.Names.prefixCheck(n)[0]), y.Values.isCSSNullValue(d) && y.Hooks.templates[o] && (d = y.Hooks.templates[o][1])), g = y.Normalizations.registered[o]("extract", f, d)
                        }
                    };
                    if (!/^[\d-]/.test(g)) {
                        if (k(f) && k(f).isSVG && y.Names.SVGAttribute(o)) {
                            if (/^(height|width)$/i.test(o)) {
                                try {
                                    g = f.getBBox()[o]
                                } catch (i) {
                                    g = 0
                                }
                            } else {
                                g = f.getAttribute(o)
                            }
                        } else {
                            g = p(f, y.Names.prefixCheck(o)[0])
                        }
                    };
                    return y.Values.isCSSNullValue(g) && (g = 0), x.debug >= 2 && console.log("Get " + o + ": " + g), g
                },
                setPropertyValue: function(b, i, a, f, g) {
                    var j = i;
                    if ("scroll" === i) {
                        g.container ? g.container["scroll" + g.direction] = a : "Left" === g.direction ? v.scrollTo(a, g.alternateValue) : v.scrollTo(g.alternateValue, a)
                    } else {
                        if (y.Normalizations.registered[i] && "transform" === y.Normalizations.registered[i]("name", b)) {
                            y.Normalizations.registered[i]("inject", b, a), j = "transform", a = k(b).transformCache[i]
                        } else {
                            if (y.Hooks.registered[i]) {
                                var c = i,
                                    l = y.Hooks.getRoot(i);
                                f = f || y.getPropertyValue(b, l), a = y.Hooks.injectValue(c, a, f), i = l
                            };
                            if (y.Normalizations.registered[i] && (a = y.Normalizations.registered[i]("inject", b, a), i = y.Normalizations.registered[i]("name", b)), j = y.Names.prefixCheck(i)[0], 8 >= h) {
                                try {
                                    b.style[j] = a
                                } catch (d) {
                                    x.debug && console.log("Browser does not support [" + a + "] for [" + j + "]")
                                }
                            } else {
                                k(b) && k(b).isSVG && y.Names.SVGAttribute(i) ? b.setAttribute(i, a) : b.style[j] = a
                            };
                            x.debug >= 2 && console.log("Set " + i + " (" + j + "): " + a)
                        }
                    };
                    return [j, a]
                },
                flushTransformCache: function(c) {
                    function i(a) {
                        return parseFloat(y.getPropertyValue(c, a))
                    }
                    var g = "";
                    if ((h || x.State.isAndroid && !x.State.isChrome) && k(c).isSVG) {
                        var b = {
                            translate: [i("translateX"), i("translateY")],
                            skewX: [i("skewX")],
                            skewY: [i("skewY")],
                            scale: 1 !== i("scale") ? [i("scale"), i("scale")] : [i("scaleX"), i("scaleY")],
                            rotate: [i("rotateZ"), 0, 0]
                        };
                        $.each(k(c).transformCache, function(a) {
                            /^translate/i.test(a) ? a = "translate" : /^scale/i.test(a) ? a = "scale" : /^rotate/i.test(a) && (a = "rotate"), b[a] && (g += a + "(" + b[a].join(" ") + ") ", delete b[a])
                        })
                    } else {
                        var d, f;
                        $.each(k(c).transformCache, function(a) {
                            return d = k(c).transformCache[a], "transformPerspective" === a ? (f = d, !0) : (9 === h && "rotateZ" === a && (a = "rotate"), void((g += a + d + " ")))
                        }), f && (g = "perspective" + f + " " + g)
                    };
                    y.setPropertyValue(c, "transform", g)
                }
            };
            y.Hooks.register(), y.Normalizations.register(), x.hook = function(c, g, f) {
                var d = b;
                return c = p(c), $.each(c, function(a, c) {
                    if (k(c) === b && x.init(c), f === b) {
                        d === b && (d = x.CSS.getPropertyValue(c, g))
                    } else {
                        var h = x.CSS.setPropertyValue(c, g, f);
                        "transform" === h[0] && x.CSS.flushTransformCache(c), d = h
                    }
                }), d
            };
            var u = function() {
                function j() {
                    return C ? L.promise || null : n
                }

                function F() {
                    function c(t) {
                        function P(a, g) {
                            var d = b,
                                c = b,
                                f = b;
                            return i.isArray(a) ? (d = a[0], !i.isArray(a[1]) && /^[\d-]/.test(a[1]) || i.isFunction(a[1]) || y.RegEx.isHex.test(a[1]) ? f = a[1] : (i.isString(a[1]) && !y.RegEx.isHex.test(a[1]) || i.isArray(a[1])) && (c = g ? a[1] : w(a[1], j.duration), a[2] !== b && (f = a[2]))) : d = a, g || (c = c || j.easing), i.isFunction(d) && (d = d.call(h, N, I)), i.isFunction(f) && (f = f.call(h, N, I)), [d || 0, c, f]
                        }

                        function A(b, d) {
                            var c, a;
                            return a = (d || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(a) {
                                return c = a, ""
                            }), c || (c = y.Values.getUnitType(b)), [a, c]
                        }

                        function p() {
                            var c = {
                                    myParent: h.parentNode || s.body,
                                    position: y.getPropertyValue(h, "position"),
                                    fontSize: y.getPropertyValue(h, "fontSize")
                                },
                                b = c.position === G.lastPosition && c.myParent === G.lastParent,
                                f = c.fontSize === G.lastFontSize;
                            G.lastParent = c.myParent, G.lastPosition = c.position, G.lastFontSize = c.fontSize;
                            var g = 100,
                                d = {};
                            if (f && b) {
                                d.emToPx = G.lastEmToPx, d.percentToPxWidth = G.lastPercentToPxWidth, d.percentToPxHeight = G.lastPercentToPxHeight
                            } else {
                                var i = k(h).isSVG ? s.createElementNS("http://www.w3.org/2000/svg", "rect") : s.createElement("div");
                                x.init(i), c.myParent.appendChild(i), $.each(["overflow", "overflowX", "overflowY"], function(a, b) {
                                    x.CSS.setPropertyValue(i, b, "hidden")
                                }), x.CSS.setPropertyValue(i, "position", c.position), x.CSS.setPropertyValue(i, "fontSize", c.fontSize), x.CSS.setPropertyValue(i, "boxSizing", "content-box"), $.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(a, b) {
                                    x.CSS.setPropertyValue(i, b, g + "%")
                                }), x.CSS.setPropertyValue(i, "paddingLeft", g + "em"), d.percentToPxWidth = G.lastPercentToPxWidth = (parseFloat(y.getPropertyValue(i, "width", null, !0)) || 1) / g, d.percentToPxHeight = G.lastPercentToPxHeight = (parseFloat(y.getPropertyValue(i, "height", null, !0)) || 1) / g, d.emToPx = G.lastEmToPx = (parseFloat(y.getPropertyValue(i, "paddingLeft")) || 1) / g, c.myParent.removeChild(i)
                            };
                            return null === G.remToPx && (G.remToPx = parseFloat(y.getPropertyValue(s.body, "fontSize")) || 16), null === G.vwToPx && (G.vwToPx = parseFloat(v.innerWidth) / 100, G.vhToPx = parseFloat(v.innerHeight) / 100), d.remToPx = G.remToPx, d.vwToPx = G.vwToPx, d.vhToPx = G.vhToPx, x.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(d), h), d
                        }
                        if (j.begin && 0 === N) {
                            try {
                                j.begin.call(E, E)
                            } catch (z) {
                                setTimeout(function() {
                                    throw z
                                }, 1)
                            }
                        };
                        if ("scroll" === B) {
                            var S = /^x$/i.test(j.axis) ? "Left" : "Top",
                                T = parseFloat(j.offset) || 0,
                                o, c, C;
                            j.container ? i.isWrapped(j.container) || i.isNode(j.container) ? (j.container = j.container[0] || j.container, o = j.container["scroll" + S], C = o + $(h).position()[S.toLowerCase()] + T) : j.container = null : (o = x.State.scrollAnchor[x.State["scrollProperty" + S]], c = x.State.scrollAnchor[x.State["scrollProperty" + ("Left" === S ? "Top" : "Left")]], C = $(h).offset()[S.toLowerCase()] + T), l = {
                                scroll: {
                                    rootPropertyValue: !1,
                                    startValue: o,
                                    currentValue: o,
                                    endValue: C,
                                    unitType: "",
                                    easing: j.easing,
                                    scrollData: {
                                        container: j.container,
                                        direction: S,
                                        alternateValue: c
                                    }
                                },
                                element: h
                            }, x.debug && console.log("tweensContainer (scroll): ", l.scroll, h)
                        } else {
                            if ("reverse" === B) {
                                if (!k(h).tweensContainer) {
                                    return void($).dequeue(h, j.queue)
                                };
                                "none" === k(h).opts.display && (k(h).opts.display = "auto"), "hidden" === k(h).opts.visibility && (k(h).opts.visibility = "visible"), k(h).opts.loop = !1, k(h).opts.begin = null, k(h).opts.complete = null, f.easing || delete j.easing, f.duration || delete j.duration, j = $.extend({}, k(h).opts, j);
                                var u = $.extend(!0, {}, k(h).tweensContainer);
                                for (var K in u) {
                                    if ("element" !== K) {
                                        var H = u[K].startValue;
                                        u[K].startValue = u[K].currentValue = u[K].endValue, u[K].endValue = H, i.isEmptyObject(f) || (u[K].easing = j.easing), x.debug && console.log("reverse tweensContainer (" + K + "): " + JSON.stringify(u[K]), h)
                                    }
                                };
                                l = u
                            } else {
                                if ("start" === B) {
                                    var u;
                                    k(h).tweensContainer && k(h).isAnimating === !0 && (u = k(h).tweensContainer), $.each(r, function(c, l) {
                                        if (RegExp("^" + y.Lists.colors.join("$|^") + "$").test(c)) {
                                            var j = P(l, !0),
                                                h = j[0],
                                                i = j[1],
                                                f = j[2];
                                            if (y.RegEx.isHex.test(h)) {
                                                for (var k = ["Red", "Green", "Blue"], g = y.Values.hexToRgb(h), n = f ? y.Values.hexToRgb(f) : b, a = 0; a < k.length; a++) {
                                                    var d = [g[a]];
                                                    i && d.push(i), n !== b && d.push(n[a]), r[c + k[a]] = d
                                                };
                                                delete r[c]
                                            }
                                        }
                                    });
                                    for (var R in r) {
                                        var O = P(r[R]),
                                            X = O[0],
                                            Q = O[1],
                                            M = O[2];
                                        R = y.Names.camelCase(R);
                                        var J = y.Hooks.getRoot(R),
                                            n = !1;
                                        if (k(h).isSVG || "tween" === J || y.Names.prefixCheck(J)[1] !== !1 || y.Normalizations.registered[J] !== b) {
                                            (j.display !== b && null !== j.display && "none" !== j.display || j.visibility !== b && "hidden" !== j.visibility) && /opacity|filter/.test(R) && !M && 0 !== X && (M = 0), j._cacheValues && u && u[R] ? (M === b && (M = u[R].endValue + u[R].unitType), n = k(h).rootPropertyValueCache[J]) : y.Hooks.registered[R] ? M === b ? (n = y.getPropertyValue(h, J), M = y.getPropertyValue(h, R, n)) : n = y.Hooks.templates[J][1] : M === b && (M = y.getPropertyValue(h, R));
                                            var U, F, q, V = !1;
                                            if (U = A(R, M), M = U[0], q = U[1], U = A(R, X), X = U[0].replace(/^([+-\/*])=/, function(a, b) {
                                                    return V = b, ""
                                                }), F = U[1], M = parseFloat(M) || 0, X = parseFloat(X) || 0, "%" === F && (/^(fontSize|lineHeight)$/.test(R) ? (X /= 100, F = "em") : /^scale/.test(R) ? (X /= 100, F = "") : /(Red|Green|Blue)$/i.test(R) && (X = X / 100 * 255, F = "")), /[\/*]/.test(V)) {
                                                F = q
                                            } else {
                                                if (q !== F && 0 !== M) {
                                                    if (0 === X) {
                                                        F = q
                                                    } else {
                                                        g = g || p();
                                                        var W = /margin|padding|left|right|width|text|word|letter/i.test(R) || /X$/.test(R) || "x" === R ? "x" : "y";
                                                        switch (q) {
                                                            case "%":
                                                                M *= "x" === W ? g.percentToPxWidth : g.percentToPxHeight;
                                                                break;
                                                            case "px":
                                                                break;
                                                            default:
                                                                M *= g[q + "ToPx"]
                                                        };
                                                        switch (F) {
                                                            case "%":
                                                                M *= 1 / ("x" === W ? g.percentToPxWidth : g.percentToPxHeight);
                                                                break;
                                                            case "px":
                                                                break;
                                                            default:
                                                                M *= 1 / g[F + "ToPx"]
                                                        }
                                                    }
                                                }
                                            };
                                            switch (V) {
                                                case "+":
                                                    X = M + X;
                                                    break;
                                                case "-":
                                                    X = M - X;
                                                    break;
                                                case "*":
                                                    X = M * X;
                                                    break;
                                                case "/":
                                                    X = M / X
                                            };
                                            l[R] = {
                                                rootPropertyValue: n,
                                                startValue: M,
                                                currentValue: M,
                                                endValue: X,
                                                unitType: F,
                                                easing: Q
                                            }, x.debug && console.log("tweensContainer (" + R + "): " + JSON.stringify(l[R]), h)
                                        } else {
                                            x.debug && console.log("Skipping [" + J + "] due to a lack of browser support.")
                                        }
                                    };
                                    l.element = h
                                }
                            }
                        };
                        l.element && (y.Values.addClass(h, "velocity-animating"), D.push(l), "" === j.queue && (k(h).tweensContainer = l, k(h).opts = j), k(h).isAnimating = !0, N === I - 1 ? (x.State.calls.push([D, E, j, null, L.resolver]), x.State.isTicking === !1 && (x.State.isTicking = !0, d())) : N++)
                    }
                    var h = this,
                        j = $.extend({}, x.defaults, f),
                        l = {},
                        g;
                    switch (k(h) === b && x.init(h), parseFloat(j.delay) && j.queue !== !1 && $.queue(h, j.queue, function(a) {
                        x.velocityQueueEntryFlag = !0, k(h).delayTimer = {
                            setTimeout: setTimeout(a, parseFloat(j.delay)),
                            next: a
                        }
                    }), j.duration.toString().toLowerCase()) {
                        case "fast":
                            j.duration = 200;
                            break;
                        case "normal":
                            j.duration = z;
                            break;
                        case "slow":
                            j.duration = 600;
                            break;
                        default:
                            j.duration = parseFloat(j.duration) || 1
                    };
                    x.mock !== !1 && (x.mock === !0 ? j.duration = j.delay = 1 : (j.duration *= parseFloat(x.mock) || 1, j.delay *= parseFloat(x.mock) || 1)), j.easing = w(j.easing, j.duration), j.begin && !i.isFunction(j.begin) && (j.begin = null), j.progress && !i.isFunction(j.progress) && (j.progress = null), j.complete && !i.isFunction(j.complete) && (j.complete = null), j.display !== b && null !== j.display && (j.display = j.display.toString().toLowerCase(), "auto" === j.display && (j.display = x.CSS.Values.getDisplayType(h))), j.visibility !== b && null !== j.visibility && (j.visibility = j.visibility.toString().toLowerCase()), j.mobileHA = j.mobileHA && x.State.isMobile && !x.State.isGingerbread, j.queue === !1 ? j.delay ? setTimeout(c, j.delay) : c() : $.queue(h, j.queue, function(b, a) {
                        return a === !0 ? (L.promise && L.resolver(E), !0) : (x.velocityQueueEntryFlag = !0, void(c)(b))
                    }), "" !== j.queue && "fx" !== j.queue || "inprogress" === $.queue(h)[0] || $.dequeue(h)
                }
                var K = arguments[0] && (arguments[0].p || $.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || i.isString(arguments[0].properties)),
                    C, n, h, E, r, f;
                if (i.isWrapped(this) ? (C = !1, h = 0, E = this, n = this) : (C = !0, h = 1, E = K ? arguments[0].elements || arguments[0].e : arguments[0]), E = p(E)) {
                    K ? (r = arguments[0].properties || arguments[0].p, f = arguments[0].options || arguments[0].o) : (r = arguments[h], f = arguments[h + 1]);
                    var I = E.length,
                        N = 0;
                    if (!/^(stop|finish)$/i.test(r) && !$.isPlainObject(f)) {
                        var M = h + 1;
                        f = {};
                        for (var g = M; g < arguments.length; g++) {
                            i.isArray(arguments[g]) || !/^(fast|normal|slow)$/i.test(arguments[g]) && !/^\d/.test(arguments[g]) ? i.isString(arguments[g]) || i.isArray(arguments[g]) ? f.easing = arguments[g] : i.isFunction(arguments[g]) && (f.complete = arguments[g]) : f.duration = arguments[g]
                        }
                    };
                    var L = {
                        promise: null,
                        resolver: null,
                        rejecter: null
                    };
                    C && x.Promise && (L.promise = new x.Promise(function(a, b) {
                        L.resolver = a, L.rejecter = b
                    }));
                    var B;
                    switch (r) {
                        case "scroll":
                            B = "scroll";
                            break;
                        case "reverse":
                            B = "reverse";
                            break;
                        case "finish":
                            ;
                        case "stop":
                            $.each(E, function(a, b) {
                                k(b) && k(b).delayTimer && (clearTimeout(k(b).delayTimer.setTimeout), k(b).delayTimer.next && k(b).delayTimer.next(), delete k(b).delayTimer)
                            });
                            var c = [];
                            return $.each(x.State.calls, function(d, g) {
                                g && $.each(g[1], function(l, h) {
                                    var j = f === b ? "" : f;
                                    return j === !0 || g[2].queue === j || f === b && g[2].queue === !1 ? void($).each(E, function(l, b) {
                                        b === h && ((f === !0 || i.isString(f)) && ($.each($.queue(b, i.isString(f) ? f : ""), function(a, b) {
                                            i.isFunction(b) && b(null, !0)
                                        }), $.queue(b, i.isString(f) ? f : "", [])), "stop" === r ? (k(b) && k(b).tweensContainer && j !== !1 && $.each(k(b).tweensContainer, function(a, b) {
                                            b.endValue = b.currentValue
                                        }), c.push(d)) : "finish" === r && (g[2].duration = 1))
                                    }) : !0
                                })
                            }), "stop" === r && ($.each(c, function(a, b) {
                                q(b, !0)
                            }), L.promise && L.resolver(E)), j();
                        default:
                            if (!$.isPlainObject(r) || i.isEmptyObject(r)) {
                                if (i.isString(r) && x.Redirects[r]) {
                                    var o = $.extend({}, f),
                                        l = o.duration,
                                        A = o.delay || 0;
                                    return o.backwards === !0 && (E = $.extend(!0, [], E).reverse()), $.each(E, function(a, c) {
                                        parseFloat(o.stagger) ? o.delay = A + parseFloat(o.stagger) * a : i.isFunction(o.stagger) && (o.delay = A + o.stagger.call(c, a, I)), o.drag && (o.duration = parseFloat(l) || (/^(callout|transition)/.test(r) ? 1e3 : z), o.duration = Math.max(o.duration * (o.backwards ? 1 - a / I : (a + 1) / I), 0.75 * o.duration, 200)), x.Redirects[r].call(c, c, o || {}, a, I, E, L.promise ? L : b)
                                    }), j()
                                };
                                var t = "Velocity: First argument (" + r + ") was not a property map, a known action, or a registered redirect. Aborting.";
                                return L.promise ? L.rejecter(new Error(t)) : console.log(t), j()
                            };
                            B = "start"
                    };
                    var G = {
                            lastParent: null,
                            lastPosition: null,
                            lastFontSize: null,
                            lastPercentToPxWidth: null,
                            lastPercentToPxHeight: null,
                            lastEmToPx: null,
                            remToPx: null,
                            vwToPx: null,
                            vhToPx: null
                        },
                        D = [];
                    $.each(E, function(a, b) {
                        i.isNode(b) && F.call(b)
                    });
                    var o = $.extend({}, x.defaults, f),
                        J;
                    if (o.loop = parseInt(o.loop, 10), J = 2 * o.loop - 1, o.loop) {
                        for (var H = 0; J > H; H++) {
                            var O = {
                                delay: o.delay,
                                progress: o.progress
                            };
                            H === J - 1 && (O.display = o.display, O.visibility = o.visibility, O.complete = o.complete), u(E, "reverse", O)
                        }
                    };
                    return j()
                }
            };
            x = $.extend(u, x), x.animate = u;
            var r = v.requestAnimationFrame || f;
            return x.State.isMobile || s.hidden === b || s.addEventListener("visibilitychange", function() {
                s.hidden ? (r = function(a) {
                    return setTimeout(function() {
                        a(!0)
                    }, 16)
                }, d()) : r = v.requestAnimationFrame || f
            }), g.Velocity = x, g !== v && (g.fn.velocity = u, g.fn.velocity.defaults = x.defaults), $.each(["Down", "Up"], function(c, d) {
                x.Redirects["slide" + d] = function(f, n, j, k, h, o) {
                    var i = $.extend({}, n),
                        p = i.begin,
                        c = i.complete,
                        l = {
                            height: "",
                            marginTop: "",
                            marginBottom: "",
                            paddingTop: "",
                            paddingBottom: ""
                        },
                        g = {};
                    i.display === b && (i.display = "Down" === d ? "inline" === x.CSS.Values.getDisplayType(f) ? "inline-block" : "block" : "none"), i.begin = function() {
                        p && p.call(h, h);
                        for (var b in l) {
                            g[b] = f.style[b];
                            var a = x.CSS.getPropertyValue(f, b);
                            l[b] = "Down" === d ? [a, 0] : [0, a]
                        };
                        g.overflow = f.style.overflow, f.style.overflow = "hidden"
                    }, i.complete = function() {
                        for (var a in g) {
                            f.style[a] = g[a]
                        };
                        c && c.call(h, h), o && o.resolver(h)
                    }, x(f, l, i)
                }
            }), $.each(["In", "Out"], function(c, d) {
                x.Redirects["fade" + d] = function(f, k, i, j, g, l) {
                    var h = $.extend({}, k),
                        n = {
                            opacity: "In" === d ? 1 : 0
                        },
                        c = h.complete;
                    h.complete = i !== j - 1 ? h.begin = null : function() {
                        c && c.call(g, g), l && l.resolver(g)
                    }, h.display === b && (h.display = "In" === d ? "auto" : "none"), x(this, n, h)
                }
            }), x
        }(window.jQuery || window.Zepto || window, window, document)
    }

    function bv(a) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = a() : "function" == typeof define && define.amd ? define(a) : a()
    }

    function bx(l, a) {
        var h = GameConfig.idleTimeout ? GameConfig.idleTimeout : 60,
            k, d = false,
            j, b, f = {
                hidden: "visibilitychange",
                webkitHidden: "webkitvisibilitychange",
                mozHidden: "mozvisibilitychange",
                msHidden: "msvisibilitychange"
            };

        function c(c, f) {
            if ((!d && c == "wakeup") || (d && c == "idle")) {
                return
            };
            d = c == "idle";
            f = f || l;
            var b = a.createEvent("Events");
            b.initEvent(c, true, true);
            f.dispatchEvent(b)
        }

        function i() {
            k = l.setTimeout(function() {
                c("idle")
            }, h * 1000)
        }

        function g() {
            l.clearTimeout(k);
            c("wakeup");
            i()
        }
        l.addEventListener("mousemove", g, false);
        l.addEventListener("mousedown", g, false);
        l.addEventListener("click", g, false);
        l.addEventListener("keydown", g, false);
        l.addEventListener("DOMMouseScroll", g, false);
        l.addEventListener("mousewheel", g, false);
        l.addEventListener("touchstart", g, false);
        l.addEventListener("MSPointerMove", g, false);
        l.addEventListener("pagehide", function() {
            l.clearTimeout(k);
            c("idle")
        }, false);
        l.addEventListener("pageshow", g, false);
        for (j in f) {
            if (j in a) {
                b = f[j];
                break
            }
        };
        a.addEventListener(b, function() {
            if (a[j]) {
                l.clearTimeout(k)
            } else {
                i()
            };
            c(a[j] ? "idle" : "wakeup")
        });
        i()
    }

    function by() {
        "use strict";
        var b = typeof module !== "undefined" && module.exports;
        var c = typeof Element !== "undefined" && "ALLOW_KEYBOARD_INPUT" in Element;
        var a = (function() {
            var f;
            var g;
            var a = [
                ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
            ];
            var b = 0;
            var c = a.length;
            var d = {};
            for (; b < c; b++) {
                f = a[b];
                if (f && f[1] in document) {
                    for (b = 0, g = f.length; b < g; b++) {
                        d[a[0][b]] = f[b]
                    };
                    return d
                }
            };
            return false
        })();
        var d = {
            request: function(b) {
                var d = a.requestFullscreen;
                b = b || document.documentElement;
                if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
                    b[d]()
                } else {
                    b[d](c && Element.ALLOW_KEYBOARD_INPUT)
                }
            },
            exit: function() {
                document[a.exitFullscreen]()
            },
            toggle: function(a) {
                if (this.isFullscreen) {
                    this.exit()
                } else {
                    this.request(a)
                }
            },
            onchange: function() {},
            onerror: function() {},
            raw: a
        };
        if (!a) {
            if (b) {
                module.exports = false
            } else {
                window.screenfull = false
            };
            return
        };
        Object.defineProperties(d, {
            isFullscreen: {
                get: function() {
                    return !!document[a.fullscreenElement]
                }
            },
            element: {
                enumerable: true,
                get: function() {
                    return document[a.fullscreenElement]
                }
            },
            enabled: {
                enumerable: true,
                get: function() {
                    var b = navigator.userAgent;
                    return !!document[a.fullscreenEnabled] && b.indexOf("SAMSUNG GT-I9505") == -1 && b.indexOf("Silk/") == -1
                }
            }
        });
        document.addEventListener(a.fullscreenchange, function(a) {
            d.onchange.call(d, a)
        });
        document.addEventListener(a.fullscreenerror, function(a) {
            d.onerror.call(d, a)
        });
        if (b) {
            module.exports = d
        } else {
            window.screenfull = d
        }
    }

    function bz(q, n) {
        var c = "addEventListener" in q;
        var b = false;
        if (n.readyState === "complete") {
            b = true
        } else {
            if (c) {
                q.addEventListener("load", p, false)
            }
        };

        function p() {
            q.removeEventListener("load", p, false);
            b = true
        }
        var j = /\/ath(\/)?$/;
        var i = /([\?&]ath=[^&]*$|&ath=[^&]*(&))/;
        var f;

        function l(a) {
            f = f || new l.Class(a);
            return f
        }
        l.intl = {
            de_de: {
                ios: "\x55\x6D\x20\x64\x69\x65\x73\x65\x20\x57\x65\x62\x2D\x41\x70\x70\x20\x7A\x75\x6D\x20\x48\x6F\x6D\x65\x2D\x42\x69\x6C\x64\x73\x63\x68\x69\x72\x6D\x20\x68\x69\x6E\x7A\x75\x7A\x75\x66\xFC\x67\x65\x6E\x2C\x20\x74\x69\x70\x70\x65\x6E\x20\x53\x69\x65\x20\x61\x75\x66\x20\x25\x69\x63\x6F\x6E\x20\x75\x6E\x64\x20\x64\x61\x6E\x6E\x20\x3C\x73\x74\x72\x6F\x6E\x67\x3E\x5A\x75\x6D\x20\x48\x6F\x6D\x65\x2D\x42\x69\x6C\x64\x73\x63\x68\x69\x72\x6D\x3C\x2F\x73\x74\x72\x6F\x6E\x67\x3E\x2E",
                android: "To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class=\"ath-action-icon\">icon</span>.</small>"
            },
            en_us: {
                ios: "To add this web app to the home screen: tap %icon and then <strong>Add to Home Screen</strong>.",
                android: "To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class=\"ath-action-icon\">icon</span>.</small>"
            },
            es_es: {
                ios: "\x50\x61\x72\x61\x20\x61\xF1\x61\x64\x69\x72\x20\x65\x73\x74\x61\x20\x61\x70\x6C\x69\x63\x61\x63\x69\xF3\x6E\x20\x77\x65\x62\x20\x61\x20\x6C\x61\x20\x70\x61\x6E\x74\x61\x6C\x6C\x61\x20\x64\x65\x20\x69\x6E\x69\x63\x69\x6F\x3A\x20\x70\x75\x6C\x73\x61\x20\x25\x69\x63\x6F\x6E\x20\x79\x20\x73\x65\x6C\x65\x63\x63\x69\x6F\x6E\x61\x20\x3C\x73\x74\x72\x6F\x6E\x67\x3E\x41\xF1\x61\x64\x69\x72\x20\x61\x20\x70\x61\x6E\x74\x61\x6C\x6C\x61\x20\x64\x65\x20\x69\x6E\x69\x63\x69\x6F\x3C\x2F\x73\x74\x72\x6F\x6E\x67\x3E\x2E",
                android: "To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class=\"ath-action-icon\">icon</span>.</small>"
            },
            fr_fr: {
                ios: "\x50\x6F\x75\x72\x20\x61\x6A\x6F\x75\x74\x65\x72\x20\x63\x65\x74\x74\x65\x20\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x20\x77\x65\x62\x20\x73\x75\x72\x20\x6C\x27\xE9\x63\x72\x61\x6E\x20\x64\x27\x61\x63\x63\x75\x65\x69\x6C\x20\x3A\x20\x41\x70\x70\x75\x79\x65\x7A\x20\x25\x69\x63\x6F\x6E\x20\x65\x74\x20\x73\xE9\x6C\x65\x63\x74\x69\x6F\x6E\x6E\x65\x7A\x20\x3C\x73\x74\x72\x6F\x6E\x67\x3E\x41\x6A\x6F\x75\x74\x65\x72\x20\x73\x75\x72\x20\x6C\x27\xE9\x63\x72\x61\x6E\x20\x64\x27\x61\x63\x63\x75\x65\x69\x6C\x3C\x2F\x73\x74\x72\x6F\x6E\x67\x3E\x2E",
                android: "To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class=\"ath-action-icon\">icon</span>.</small>"
            },
            he_il: {
                ios: "<span dir=\"rtl\">להוספת האפליקציה למסך הבית: ללחוץ על %icon ואז <strong>הוסף למסך הבית</strong>.</span>",
                android: "To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class=\"ath-action-icon\">icon</span>.</small>"
            },
            it_it: {
                ios: "Per aggiungere questa web app alla schermata iniziale: premi %icon e poi <strong>Aggiungi a Home</strong>.",
                android: "Per aggiungere questa web app alla schermata iniziale, apri il menu opzioni del browser e premi su <strong>Aggiungi alla homescreen</strong>. <small>Puoi accedere al menu premendo il pulsante hardware delle opzioni se la tua device ne ha uno, oppure premendo l\'icona <span class=\"ath-action-icon\">icon</span> in alto a destra.</small>"
            },
            nb_no: {
                ios: "\x46\x6F\x72\x20\xE5\x20\x69\x6E\x73\x74\x61\x6C\x6C\x65\x72\x65\x20\x64\x65\x6E\x6E\x65\x20\x61\x70\x70\x65\x6E\x20\x70\xE5\x20\x68\x6A\x65\x6D\x2D\x73\x6B\x6A\x65\x72\x6D\x65\x6E\x3A\x20\x74\x72\x79\x6B\x6B\x20\x70\xE5\x20\x25\x69\x63\x6F\x6E\x20\x6F\x67\x20\x64\x65\x72\x65\x74\x74\x65\x72\x20\x3C\x73\x74\x72\x6F\x6E\x67\x3E\x4C\x65\x67\x67\x20\x74\x69\x6C\x20\x70\xE5\x20\x48\x6A\x65\x6D\x2D\x73\x6B\x6A\x65\x72\x6D\x3C\x2F\x73\x74\x72\x6F\x6E\x67\x3E\x2E",
                android: "To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class=\"ath-action-icon\">icon</span>.</small>"
            },
            pt_br: {
                ios: "\x50\x61\x72\x61\x20\x61\x64\x69\x63\x69\x6F\x6E\x61\x72\x20\x65\x73\x74\x65\x20\x61\x70\x70\x20\xE0\x20\x74\x65\x6C\x61\x20\x64\x65\x20\x69\x6E\xED\x63\x69\x6F\x3A\x20\x63\x6C\x69\x71\x75\x65\x20\x25\x69\x63\x6F\x6E\x20\x65\x20\x65\x6E\x74\xE3\x6F\x20\x3C\x73\x74\x72\x6F\x6E\x67\x3E\x54\x65\x6C\x61\x20\x64\x65\x20\x69\x6E\xED\x63\x69\x6F\x3C\x2F\x73\x74\x72\x6F\x6E\x67\x3E\x2E",
                android: "To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class=\"ath-action-icon\">icon</span>.</small>"
            },
            pt_pt: {
                ios: "\x50\x61\x72\x61\x20\x61\x64\x69\x63\x69\x6F\x6E\x61\x72\x20\x65\x73\x74\x61\x20\x61\x70\x70\x20\x61\x6F\x20\x65\x63\x72\xE3\x20\x70\x72\x69\x6E\x63\x69\x70\x61\x6C\x3A\x20\x63\x6C\x69\x71\x75\x65\x20\x25\x69\x63\x6F\x6E\x20\x65\x20\x64\x65\x70\x6F\x69\x73\x20\x3C\x73\x74\x72\x6F\x6E\x67\x3E\x45\x63\x72\xE3\x20\x70\x72\x69\x6E\x63\x69\x70\x61\x6C\x3C\x2F\x73\x74\x72\x6F\x6E\x67\x3E\x2E",
                android: "To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class=\"ath-action-icon\">icon</span>.</small>"
            },
            nl_nl: {
                ios: "Om deze webapp op je telefoon te installeren, klik op %icon en dan <strong>Zet in beginscherm</strong>.",
                android: "To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class=\"ath-action-icon\">icon</span>.</small>"
            },
            sv_se: {
                ios: "\x46\xF6\x72\x20\x61\x74\x74\x20\x6C\xE4\x67\x67\x61\x20\x74\x69\x6C\x6C\x20\x64\x65\x6E\x6E\x61\x20\x77\x65\x62\x62\x61\x70\x70\x6C\x69\x6B\x61\x74\x69\x6F\x6E\x20\x70\xE5\x20\x68\x65\x6D\x73\x6B\xE4\x72\x6D\x65\x6E\x3A\x20\x74\x72\x79\x63\x6B\x20\x70\xE5\x20\x25\x69\x63\x6F\x6E\x20\x6F\x63\x68\x20\x64\xE4\x72\x65\x66\x74\x65\x72\x20\x3C\x73\x74\x72\x6F\x6E\x67\x3E\x4C\xE4\x67\x67\x20\x74\x69\x6C\x6C\x20\x70\xE5\x20\x68\x65\x6D\x73\x6B\xE4\x72\x6D\x65\x6E\x3C\x2F\x73\x74\x72\x6F\x6E\x67\x3E\x2E",
                android: "To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class=\"ath-action-icon\">icon</span>.</small>"
            },
            zh_cn: {
                ios: "如要把应用程式加至主屏幕,请点击%icon, 然后<strong>加至主屏幕</strong>",
                android: "To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class=\"ath-action-icon\">icon</span>.</small>"
            },
            zh_tw: {
                ios: "如要把應用程式加至主屏幕, 請點擊%icon, 然後<strong>加至主屏幕</strong>.",
                android: "To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class=\"ath-action-icon\">icon</span>.</small>"
            }
        };
        for (var o in l.intl) {
            l.intl[o.substr(0, 2)] = l.intl[o]
        };
        l.defaults = {
            appID: "org.cubiq.addtohome",
            fontSize: 15,
            debug: false,
            modal: false,
            mandatory: false,
            autostart: true,
            skipFirstVisit: false,
            startDelay: 1,
            lifespan: 15,
            displayPace: 1440,
            maxDisplayCount: 0,
            icon: true,
            message: "",
            validLocation: [],
            onInit: null,
            onShow: null,
            onRemove: null,
            onAdd: null,
            onPrivate: null,
            privateModeOverride: false,
            detectHomescreen: false
        };
        var k = q.navigator.userAgent;
        var g = q.navigator;
        d(l, {
            hasToken: n.location.hash == "#ath" || j.test(n.location.href) || i.test(n.location.search),
            isRetina: q.devicePixelRatio && q.devicePixelRatio > 1,
            isIDevice: /iphone|ipod|ipad/i.test(k),
            isMobileChrome: k.indexOf("Android") > -1 && /Chrome\/[.0-9]*/.test(k),
            isMobileIE: k.indexOf("Windows Phone") > -1,
            language: g.language && g.language.toLowerCase().replace("-", "_") || ""
        });
        l.language = l.language && l.language in l.intl ? l.language : "en_us";
        l.isMobileSafari = l.isIDevice && k.indexOf("Safari") > -1 && k.indexOf("CriOS") < 0;
        l.OS = l.isIDevice ? "ios" : l.isMobileChrome ? "android" : l.isMobileIE ? "windows" : "unsupported";
        l.OSVersion = k.match(/(OS|Android) (\d+[_\.]\d+)/);
        l.OSVersion = l.OSVersion && l.OSVersion[2] ? +l.OSVersion[2].replace("_", ".") : 0;
        l.isStandalone = q.navigator.standalone || l.isMobileChrome && screen.height - n.documentElement.clientHeight < 40;
        l.isTablet = l.isMobileSafari && k.indexOf("iPad") > -1 || l.isMobileChrome && k.indexOf("Mobile") < 0;
        l.isCompatible = l.isMobileSafari && l.OSVersion >= 6 || l.isMobileChrome;
        var a = {
            lastDisplayTime: 0,
            returningVisitor: false,
            displayCount: 0,
            optedout: false,
            added: false
        };
        l.removeSession = function(a) {
            try {
                localStorage.removeItem(a || l.defaults.appID)
            } catch (e) {}
        };
        l.Class = function(g) {
            this.options = d({}, l.defaults);
            d(this.options, g);
            if (!c) {
                return
            };
            this.options.mandatory = this.options.mandatory && ("standalone" in q.navigator || this.options.debug);
            this.options.modal = this.options.modal || this.options.mandatory;
            if (this.options.mandatory) {
                this.options.startDelay = -0.5
            };
            this.options.detectHomescreen = this.options.detectHomescreen === true ? "hash" : this.options.detectHomescreen;
            if (this.options.debug) {
                l.isCompatible = true;
                l.OS = typeof this.options.debug == "string" ? this.options.debug : l.OS == "unsupported" ? "android" : l.OS;
                l.OSVersion = l.OS == "ios" ? "8" : "4"
            };
            this.container = n.documentElement;
            this.session = localStorage.getItem(this.options.appID);
            this.session = this.session ? JSON.parse(this.session) : undefined;
            if (l.hasToken && (!l.isCompatible || !this.session)) {
                l.hasToken = false;
                h()
            };
            if (!l.isCompatible) {
                return
            };
            this.session = this.session || a;
            try {
                localStorage.setItem(this.options.appID, JSON.stringify(this.session));
                l.hasLocalStorage = true
            } catch (e) {
                l.hasLocalStorage = false;
                if (this.options.onPrivate) {
                    this.options.onPrivate.call(this)
                }
            };
            var f = !this.options.validLocation.length;
            for (var b = this.options.validLocation.length; b--;) {
                if (this.options.validLocation[b].test(n.location.href)) {
                    f = true;
                    break
                }
            };
            if (localStorage.getItem("addToHome")) {
                this.optOut()
            };
            if (this.session.optedout || this.session.added || !f) {
                return
            };
            if (l.isStandalone) {
                if (!this.session.added) {
                    this.session.added = true;
                    this.updateSession();
                    if (this.options.onAdd && l.hasLocalStorage) {
                        this.options.onAdd.call(this)
                    }
                };
                return
            };
            if (this.options.detectHomescreen) {
                if (l.hasToken) {
                    h();
                    if (!this.session.added) {
                        this.session.added = true;
                        this.updateSession();
                        if (this.options.onAdd && l.hasLocalStorage) {
                            this.options.onAdd.call(this)
                        }
                    };
                    return
                };
                if (this.options.detectHomescreen == "hash") {
                    history.replaceState("", q.document.title, n.location.href + "#ath")
                } else {
                    if (this.options.detectHomescreen == "smartURL") {
                        history.replaceState("", q.document.title, n.location.href.replace(/(\/)?$/, "/ath$1"))
                    } else {
                        history.replaceState("", q.document.title, n.location.href + (n.location.search ? "&" : "?") + "ath=")
                    }
                }
            };
            if (!this.session.returningVisitor) {
                this.session.returningVisitor = true;
                this.updateSession();
                if (this.options.skipFirstVisit) {
                    return
                }
            };
            if (!this.options.privateModeOverride && !l.hasLocalStorage) {
                return
            };
            this.ready = true;
            if (this.options.onInit) {
                this.options.onInit.call(this)
            };
            if (this.options.autostart) {
                this.show()
            }
        };
        l.Class.prototype = {
            events: {
                load: "_delayedShow",
                error: "_delayedShow",
                orientationchange: "resize",
                resize: "resize",
                scroll: "resize",
                click: "remove",
                touchmove: "_preventDefault",
                transitionend: "_removeElements",
                webkitTransitionEnd: "_removeElements",
                MSTransitionEnd: "_removeElements"
            },
            handleEvent: function(a) {
                var b = this.events[a.type];
                if (b) {
                    this[b](a)
                }
            },
            show: function(a) {
                if (this.options.autostart && !b) {
                    setTimeout(this.show.bind(this), 50);
                    return
                };
                if (this.shown) {
                    return
                };
                var f = Date.now();
                var c = this.session.lastDisplayTime;
                if (a !== true) {
                    if (!this.ready) {
                        return
                    };
                    if (f - c < this.options.displayPace * 6e4) {
                        return
                    };
                    if (this.options.maxDisplayCount && this.session.displayCount >= this.options.maxDisplayCount) {
                        return
                    }
                };
                this.shown = true;
                this.session.lastDisplayTime = f;
                this.session.displayCount++;
                this.updateSession();
                if (!this.applicationIcon) {
                    if (l.OS == "ios") {
                        this.applicationIcon = n.querySelector("head link[rel^=apple-touch-icon][sizes=\"152x152\"],head link[rel^=apple-touch-icon][sizes=\"144x144\"],head link[rel^=apple-touch-icon][sizes=\"120x120\"],head link[rel^=apple-touch-icon][sizes=\"114x114\"],head link[rel^=apple-touch-icon]")
                    } else {
                        this.applicationIcon = n.querySelector("head link[rel^=\"shortcut icon\"][sizes=\"196x196\"],head link[rel^=apple-touch-icon]")
                    }
                };
                var d = "";
                if (this.options.message in l.intl) {
                    d = l.intl[this.options.message][l.OS]
                } else {
                    if (this.options.message !== "") {
                        d = this.options.message
                    } else {
                        d = l.intl[l.language][l.OS]
                    }
                };
                d = "<p>" + d.replace("%icon", "<span class=\"ath-action-icon\">icon</span>") + "</p>";
                this.viewport = n.createElement("div");
                this.viewport.className = "ath-viewport";
                if (this.options.modal) {
                    this.viewport.className += " ath-modal"
                };
                if (this.options.mandatory) {
                    this.viewport.className += " ath-mandatory"
                };
                this.viewport.style.position = "absolute";
                this.element = n.createElement("div");
                this.element.className = "ath-container ath-" + l.OS + " ath-" + l.OS + (l.OSVersion + "").substr(0, 1) + " ath-" + (l.isTablet ? "tablet" : "phone");
                this.element.style.cssText = "-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0s;-webkit-transition-timing-function:ease-out;transition-property:transform,opacity;transition-duration:0s;transition-timing-function:ease-out;";
                this.element.style.webkitTransform = "translate3d(0,-" + q.innerHeight + "px,0)";
                this.element.style.transform = "translate3d(0,-" + q.innerHeight + "px,0)";
                if (this.options.icon && this.applicationIcon) {
                    this.element.className += " ath-icon";
                    this.img = n.createElement("img");
                    this.img.className = "ath-application-icon";
                    this.img.addEventListener("load", this, false);
                    this.img.addEventListener("error", this, false);
                    this.img.src = this.applicationIcon.href;
                    this.element.appendChild(this.img)
                };
                this.element.innerHTML += d;
                this.viewport.style.left = "-99999em";
                this.viewport.appendChild(this.element);
                this.container.appendChild(this.viewport);
                if (!this.img) {
                    this._delayedShow()
                }
            },
            _delayedShow: function(a) {
                setTimeout(this._show.bind(this), this.options.startDelay * 1e3 + 500)
            },
            _show: function() {
                var a = this;
                this.updateViewport();
                q.addEventListener("resize", this, false);
                q.addEventListener("scroll", this, false);
                q.addEventListener("orientationchange", this, false);
                if (this.options.modal) {
                    n.addEventListener("touchmove", this, true)
                };
                if (!this.options.mandatory) {
                    setTimeout(function() {
                        a.element.addEventListener("click", a, true)
                    }, 1e3)
                };
                setTimeout(function() {
                    a.element.style.webkitTransitionDuration = "1.2s";
                    a.element.style.transitionDuration = "1.2s";
                    a.element.style.webkitTransform = "translate3d(0,0,0)";
                    a.element.style.transform = "translate3d(0,0,0)"
                }, 0);
                if (this.options.lifespan) {
                    this.removeTimer = setTimeout(this.remove.bind(this), this.options.lifespan * 1e3)
                };
                if (this.options.onShow) {
                    this.options.onShow.call(this)
                }
            },
            remove: function() {
                clearTimeout(this.removeTimer);
                if (this.img) {
                    this.img.removeEventListener("load", this, false);
                    this.img.removeEventListener("error", this, false)
                };
                q.removeEventListener("resize", this, false);
                q.removeEventListener("scroll", this, false);
                q.removeEventListener("orientationchange", this, false);
                n.removeEventListener("touchmove", this, true);
                this.element.removeEventListener("click", this, true);
                this.element.addEventListener("transitionend", this, false);
                this.element.addEventListener("webkitTransitionEnd", this, false);
                this.element.addEventListener("MSTransitionEnd", this, false);
                this.element.style.webkitTransitionDuration = "0.3s";
                this.element.style.opacity = "0"
            },
            _removeElements: function() {
                this.element.removeEventListener("transitionend", this, false);
                this.element.removeEventListener("webkitTransitionEnd", this, false);
                this.element.removeEventListener("MSTransitionEnd", this, false);
                this.container.removeChild(this.viewport);
                this.shown = false;
                if (this.options.onRemove) {
                    this.options.onRemove.call(this)
                }
            },
            updateViewport: function() {
                if (!this.shown) {
                    return
                };
                this.viewport.style.width = q.innerWidth + "px";
                this.viewport.style.height = q.innerHeight + "px";
                this.viewport.style.left = q.scrollX + "px";
                this.viewport.style.top = q.scrollY + "px";
                var a = n.documentElement.clientWidth;
                this.orientation = a > n.documentElement.clientHeight ? "landscape" : "portrait";
                var b = l.OS == "ios" ? this.orientation == "portrait" ? screen.width : screen.height : screen.width;
                this.scale = screen.width > a ? 1 : b / q.innerWidth;
                this.element.style.fontSize = this.options.fontSize / this.scale + "px"
            },
            resize: function() {
                clearTimeout(this.resizeTimer);
                this.resizeTimer = setTimeout(this.updateViewport.bind(this), 100)
            },
            updateSession: function() {
                if (l.hasLocalStorage === false) {
                    return
                };
                localStorage.setItem(this.options.appID, JSON.stringify(this.session))
            },
            clearSession: function() {
                this.session = a;
                this.updateSession()
            },
            optOut: function() {
                this.session.optedout = true;
                this.updateSession()
            },
            optIn: function() {
                this.session.optedout = false;
                this.updateSession()
            },
            clearDisplayCount: function() {
                this.session.displayCount = 0;
                this.updateSession()
            },
            _preventDefault: function(a) {
                a.preventDefault();
                a.stopPropagation()
            }
        };

        function d(c, b) {
            for (var a in b) {
                c[a] = b[a]
            };
            return c
        }

        function h() {
            if (n.location.hash == "#ath") {
                history.replaceState("", q.document.title, n.location.href.split("#")[0])
            };
            if (j.test(n.location.href)) {
                history.replaceState("", q.document.title, n.location.href.replace(j, "$1"))
            };
            if (i.test(n.location.search)) {
                history.replaceState("", q.document.title, n.location.href.replace(i, "$2"))
            }
        }
        q.addToHomescreen = l
    }

    function bA(a) {
        addToHomescreen({
            appID: "nl.zygomatic." + a.gameName,
            maxDisplayCount: 1,
            skipFirstVisit: true
        })
    }

    function bB(d, b) {
        var c, a = document.getElementsByTagName("script")[0];
        c = document.createElement("script");
        if (b) {
            c.addEventListener("load", b, false)
        };
        c.src = d;
        a.parentNode.insertBefore(c, a)
    }

    function bC(b) {
        this.soundMuted = GameLib.getStorage("soundMuted") === true;
        this.musicMuted = GameLib.getStorage("musicMuted") === true;
        this.sprite = b;
        var a = /http/.test(location.protocol);
        if (!a || /(Trident|MSIE|IEMobile|Silk)/.test(this.ua) || (/Android/.test(this.ua) && !/(Chrome|Firefox|Opera)/.test(this.ua))) {
            this.useWebAudioBGM = false
        };
        if (/Silk/.test(this.ua) || (/Android/.test(this.ua) && !/(Chrome|Firefox|Opera)/.test(this.ua))) {
            this.playSoundFX = false
        };
        this.musicHowl = new Howl({
            src: ["sounds/base.mp3", "sounds/Game.m4a"],
            loop: true,
            duration: GameConfig.BGMduration || 0
        });
        if (this.playSoundFX) {
            if (Howler.usingWebAudio) {
                GameSound.soundHowl = new Howl({
                    src: ["sounds/sprite.ogg", "sounds/sprite.m4a"],
                    sprite: b
                })
            } else {
                this.loadScript("sounds/sprite.js", function() {
                    GameSound.soundHowl = new Howl({
                        src: [soundSprite, "sounds/sprite.m4a", "sounds/sprite.ogg"],
                        sprite: b
                    })
                })
            }
        }
    }

    function bD() {
        if (!Howler.usingWebAudio) {
            return
        };
        var b = Howler.ctx,
            a = b.createBuffer(1, 1, 22050),
            c = b.createBufferSource();
        c.buffer = a;
        c.connect(b.destination);
        if (typeof c.start === "undefined") {
            c.noteOn(0)
        } else {
            c.start(0)
        }
    }

    function bE(f, a, b) {
        var c = this;
        if (a && this.loopPlaying) {
            this.soundHowl.stop(this.loopPlaying);
            this.loopPlaying = null
        };
        if (!this.sprite[f] || !this.playSoundFX || this.soundMuted) {
            if (!a && b) {
                b(false)
            };
            return
        };
        var d = this.soundHowl.play(f, b);
        if (a) {
            c.loopPlaying = d
        }
    }

    function bF() {
        if (this.musicPlaying) {
            return
        };
        this.musicHowl.play();
        if (this.musicMuted) {
            this.musicHowl.mute(true)
        };
        this.musicPlaying = true
    }

    function bG() {
        if (this.musicPlaying) {
            this.musicHowl.stop();
            this.musicPlaying = false
        }
    }

    function bH(a) {
        this.musicMuted = a;
        this.musicHowl.mute(a);
        GameLib.setStorage("musicMuted", a)
    }

    function bI(a) {
        this.soundMuted = a;
        if (a) {
            this.soundHowl.mute(true)
        } else {
            this.soundHowl.mute(false)
        };
        GameLib.setStorage("soundMuted", a)
    }

    function bJ(a) {
        Howler.mute(a)
    }

    function bK(a) {
        GameSound.init(GameConfig.soundSprite)
    }
    GamePlay = O;
    (a)("localhost", 1, "This game is not allowed to run here!");
    (b());;;
    GameConfig = {
        orientation: "portrait",
        credits: false,
        debug: false,
        soundSprite: {
            SHit: [80, 150],
            SBomb: [1100, 1100],
            SShoot: [5000, 200],
            SLevelUp: [5000, 2000],
            STick: [5200, 800]
        },
        StartColor: 3,
        PlusColor: 2,
        MoveSpeed: 90,
        PlusMoveSpeed: 10,
        MinMoveSpeed: 100,
        StartRow: 15,
        PlusRow: 1,
        MaxRow: 30,
        ClearScore: 5,
        Dio: 38,
        Yo: Math.cos(30 / 180 * Math.PI) * 38,
        Xo: 36 / 2,
        colMax: 12,
        Width: 458,
        initX: 12,
        ColorCount: 0,
        scoreData: {},
        starData: {},
        mapPointer: gradle.map_position,
        dataArr: ["", "90_20@044555554000,044455544000,004444444000,004444400000@000000000000,000020000000,000000000000,000000000000", "60_30@033555554000,033355544000,003333444000,116666633300,011113333300,011111550000,000055550000,005555000000,000555000000@000000000000,000020000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "60_20@000011100000,000111100000,044440000000,044440000000,000066666000,000066666000,000066660000,022222000000,002222000000@000000000000,000000300000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "60_30@555511133333,555111133333,044440000000,044440000000,333366666555,333366666555,000066660000,022222000000,002222000000,111333333300,111333333300,000000044444,000000044444@000000000000,000000300000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "60_30@000111110000,001111110000,000000444440,000000444440,000666666600,000666660000,333330033300,333300033300,000002222000,000000222000@000000040000,000020000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "60_30@000111110000,001111110000,000000444440,000000444440,000666666600,000666660000,333330033300,333300033300,000002222000,000055222000,000055003333,005550003333,111100000333,111333355500,003333555550,000033555500,666666600000,666666600000,000000111111,000000111111@000000040000,000020000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "60_30@003333333000,000222220000,006666660000,000555555000,001111110000,000033333330,000221133330,011111100000,000000222000@000000040000,000004000000,000000000000,000000200000,000000000000,000000000000,000000000000,000000000000,000000000000", "60_40@111111133333,000225555500,006666661111,444555555000,001111114444,000033333330,000221133330,011111100000,444444222000,333333330000,000111111111,555555500222,000003333333,555555000000@000000040000,000004000000,000000000000,000000200000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "60_40@004444444000,034444444400,033411111110,033333111110,666600055555,666600055550,005444441110,005544441110,005555000022,000550000022,000066600000,000066600000@000220030000,000000000000,000002200000,000000000010,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "90_60@004444444000,334444444400,033411111110,033333666660,555511155555,555511155550,005411111110,002224441110,002222000022,222551111022,222066600000,000066600000,004444000000,044443333300,000333333333@000220030000,999999999900,000002200000,000000000010,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000999000000", "60_40@444033301114,444333311114,444000011110,444000011155,000666660255,006666662200,033666660200,033322200000,044440000000,000055550000,000055555000,000110055000,001110000000,001100000000@222000004442,000044000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "90_50@444033304444,444333344444,444003004444,444033004444,111106661111,111166661111,444006660044,444433333444,444443333444,000055550000,000055555000,000111333000,000111333300,000111333000,000011333000,000011330000,000011333000@222000004442,000044000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "90_30@021111111200,022225522200,000055550000,004455554400,003333333330,002333333000,002220004440,002220004440,000000033000,000003330000,111111100000,001111000000,000002220000,000000220000@002200000200,000000000000,000000000000,000300003000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "90_50@601111111206,602225522206,444455550006,604455554444,603333333336,602333333006,442220004446,602220004446,600111133006,600003330006,600111100006,441111000006,600002224446,600000220006@002200000200,000000000000,000000000000,000300003000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "95_40@001110001110,555550055550,001111001110,002204440000,111104444000,003334445555,003333022200,003330000000,222006660000,220066660000,333306663330,002220033330,002222003330,002220110000,044040044400,004400000000,001100000000@000220003300,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "95_40@001110001110,055550055550,001111001110,002204440000,111104444000,003334445555,003333022200,003330222220,222006660000,220066660000,333306663330,002220033330,002222003330,002221110000,000001111100,000001111000@000220003300,000000000000,000000009990,000000000000,000000000000,000000000000,000000000000,009990000000,000000000000,000000990000,000009990000,000000000000,000000000000,009990000000,000000000000,000009999000", "95_40@411445512221,411145512221,411145511221,444445511221,444115501110,131115500224,113115514224,113111114224,223311114224,223331304444,444433300313,422551003113,442251111331,422553333311,422253334411,112133224411,113552224413,033455444113,331144443333,333111530000,333443550000,011443355000,001111335000,000000115000,000000015000,000001110000@222222222222,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,003300000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "95_40@400440010001,400040010001,400040011001,400440011011,444115501111,001110000224,000110004224,000110004224,220011114224,221111004444,444444400000,000004444000,000004444000,000003333311,422233334411,111133004411,113000004413,033000444113,330000443333,333000530000,333440550000,000440055000,000000005000@200220020002,000000000000,000000000000,000000000000,999999900000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000099999,999900000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "100_50@555111111555,333355503333,333355553333,001155551100,001110001110,001100001100,005533333550,055533335550,005501110550,333001100333,333001110333,005550055500,000550005500,333011110333,333001110333,006663366600,000663336600,002200002200,032200000223,331112211133,555112221155,550002200555,113003300311,133533353311,000550055000,000011100000,000001100000@222222222222,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "135_70@055111111550,333300003330,333300003333,441144441144,001110401110,001104401100,005533333550,055533335550,005501110550,000001100000,000001110000,005553355500,000553335500,333044440333,333004440333,006663366600,000663336600,002203302200,032203330223,330000000033,111000000011,110000000111,111000000111,133000003311@022222222220,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,090900009090,009900000990,000000000000,000000000000,000000000000,000990009900,000000000000,000000000000,000000000000,000009990000,000909909000,009909990990,000000000000,000000000000,000000000000,000000000000,999000009999", "135_60@000000444000,001124444600,001154402660,011550020660,001055220660,012004422640,012044000040,440044004440,400010004410,220110021110,244110221110,440333301100,410033001440,110033002400,111004422000,111042224000,012442044100,442021141100,442011442110,455014402000,055504002200,055040022000,000004420000@000000222000,000200000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999990999990,000999900000,000000000000,000000000000,000000000000,000009999000,099999000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "125_50@001100444002,011124444622,011154402662,211550020660,021555220660,012554422644,012544020040,442444204440,422410004410,224110021110,244115221110,440055501100,410555001440,115544002444,111044422044,111042224004,012442044100,442021141100,442011442110,455014402011,055544002200,555040022220,550044421022,550000411000,500000411000,000000410000,000000010000@002200222000,000200000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "125_50@011555555110,050011100500,111151151111,115550555011,000101101000,001155511000,022250052220,001110111000,005550055500,055011105500,555005500555,111005001110,001105501100,001001001000,000011110000@000229922000,000099900000,000009900000,990000000099,000000000000,000000000000,099900009990,000000000000,000000000000,099099909900,000000000000,000000000000,009909909900,009000009000,000000000000", "165_80@000555555000,000011100000,111151151111,666660666066,000101101000,001155511000,022250052220,333330333333,005550055500,055011105500,222225522222,111005001110,001105501100,001001001000,555511113333,111111111111@000229922000,000099900000,000009900000,990000000099,000000000000,000000000000,099900009990,000000000000,000000000000,099099909900,000000000000,000000000000,009909909900,009000009000,000000000000,999999999999", "165_70@205511115502,000555555000,002221112220,222200002222,000444444400,033355553330,044330303344,002203302200,002111311120,444013310444,050220102205,055331133550,040533133504,044015510440,003050305030,003553355300,000030503000,000022220000@100033330001,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "165_80@005511115500,000555555000,001114441110,111104401111,000444444400,011155551110,111110001111,002200002200,002111011120,444010010444,050220002205,333330033333,040533033504,044015510440,003000300030,003003300300,333333333333@000033330000,000000000000,000000000000,000000000000,000999999900,000000000000,000000000000,000000000000,009999099990,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999", "165_60@155551335222,115511335522,511113335220,553333555200,255555522240,222222224441,111211444111,331114411555,333444115553,533355555133,555333311330,022551113300,002211333500,044222445500,004444455000,000055550000@220902222222,000990000000,009999999900,009000099900,009000990000,009999900000,009900900000,009000999990,099000000000,000990000000,000099900000,000000000000,000000000000,000000000000,000000000000,000000000000", "165_80@115551335000,111511335000,011113335200,053333555200,005555522240,002223334440,001211444111,031114411555,033444115553,533355555130,055333311330,022551113300,002211333500,004222445000,000444455000,000655550000,000066660000,000044400000,000004400000,000004000000@444442222000,000000000000,000000000000,000000000000,009999999990,000000000000,009999999999,000000000000,000000000000,999999999990,090099990090,090000000900,009000000900,009999999000,000000000000,000999990000,000000000000,000000000000,000000000000,000000000000", "165_60@011155555111,003333300030,000033000330,000030003330,000222223333,000222223330,000000111100,000001111100,000000111100,555555222220,555533022220,000333333000,000033330000,011110666000,111110066600,000555006666,000055500006,000555002222,000006666222,000006666222,001111555000,001110066660,333322220003,333300033330,100200003333,101222220000,111100001111,111000111111,000222220030,003000033333,033000000100,330000000100,330000000100,666660000100,000066666666@022244444222,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000999999000,000099990000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000999990000,000000000000,000000000000,000999990000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "165_80@000055555000,003333344430,000033444330,000034443330,000222223333,000222223330,111100111100,111101111100,111100111100,555555222220,555555522220,000033330000,000033330000,011110666000,111110066600,000555006666,000055500006,333555002222,333306666222,333306666222,001111555000,001110066660,333322220000,888888888888,888888888888@000044444000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999900999900,000000000000,000000000000,000099990000,000099990000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999", "165_60@222111111222,222111111222,220011110022,111444333555,111444333555,111444333555,005550011100,005500011000,022244442220,000442440000,000044440000,041113111400,044455554440,444400044444,444441144444,203333333302,200011110002,200011100002,200001100002,200011100002,200001100002,333335333333,200005000002,200005000002,200005000002,200005000002,200005000002,200005000002,111113311111,200033300002,200003300002,444113110444,444111111444@222333333222,222000000222,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000999990000,000099990000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "175_80@000111111000,000111111000,000011110000,111444333555,001000000500,111444333555,005550011100,005500011000,022244442220,000442440000,000044440000,041113111400,044455554440,444400044444,444441144444,003333333300,000011110000,000011100000,000222222200,000011100000,000001100000,333335333333,003334333000,111115111111,000003000000,000005000000,000003000000,000005000000,111113311111,000033300000,000003300000,000003000000@000333333000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000999990000,000099990000,000000000000,099999999990,000000000000,000099990000,009999999900,000000000000,000000000000,000000000000,000000000000,000000000000,999990999999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999990099999,000000000000,000000000000,000000000000", "155_60@013401520153,113411551553,103411521523,103441521523,053445521523,113405021522,155435123322,105331103325,105301233025,105341203135,153341203135,155442233133,055432041113,551432441033,551030441033,511331144413,113501333441,033501433511,031541433511,031544431501,031034411501,331134010501,330130010000,030130010000,000000001000@022200000110,000200000010,000000000010,000000000000,000000000000,000000000000,000000000000,000000000000,000000009000,000000009900,000900000900,009900009900,009000009000,099000009000,090000000000,090000999000,090000900000,000000900000,000009900000,000099000000,000000000000,000000000000,000000000000,000000000000,000000000000", "145_90@003401550103,003411551003,003411551023,003441501023,053445501023,113405001022,155435103322,105331103325,105301203325,105341233135,888888888888,888888888888,055030041113,551030441033,551030441033,511331144413,113501333441,033501433511,031501433511,031544430501,031004400501,300004000501@002200000100,000200000000,000000000010,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,999999999999,009000009000,099000009000,090000000000,090000999000,090000900000,000000900000,000009900000,000099000000,000000000000,000000000000", "145_80@000133300000,001133300000,001113110000,005111100000,005550440000,055500440000,055500444000,355110444000,111111441111,222110111222,133553333444,443333334444,000055000000,000555000000,000555500000,663300111166,665500111666,000533500000,000053500000,044400444000,011166611100,011166111100,000003000000,000033000000,000555550000@000333300000,000990000000,000090000000,000099000000,000000000000,000000000000,009000999000,009000000000,330011110000,000000333000,999990000000,999900000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,099900999000,000000000000,099900999900,000000000000,000000000000,000000000000", "175_80@000133300000,001133300000,001113113000,000111101110,000550400011,005500440011,005500444011,355110444011,330011440011,135500111331,133551133000,443333330000,011050001000,000550004100,060500001460,663300111166,665500111666,400533500000,400053560000,444400663300,111166600300,011166000300,550033331311,500100500033,551105500010,011335331110,110000000000@000333300000,000990000000,000090000000,000099000000,000000000000,000000000000,009000999099,009000000000,330011110033,090900333000,099990000000,009900000000,000000000000,000000000000,090900009000,909900009900,999900099900,000099000000,000099000000,090000000000,099000900000,009009000000,000000099900,000000900090,990000000090,000000000090,000000000000", "125_60@555533335555,005533355500,111113311111,111100001111,110000000011,522222222225,500300003005,500300003005,400300003004,500300003005,500300003005,111100011111,503334433305,502244402205,522222222225,500400004005,500400004005,500400004005,122233332221,100600060001,100600006001,100600006001,500600006005,511133311115,500322223005,500333330005,311111111113,333111111133,000333110330,000000100000@222244442222,000000000000,000000000000,000000000000,000000000000,900000000009,900000000009,900000000009,900000000009,900000000009,900000000009,999900099999,000009900000,000000000000,000000000000,000000000000,000000000000,000000000000,000990099000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "175_80@000533335000,000533350000,001113311100,444440444440,110000000011,522222222225,500002200005,500022200005,400555555004,500555555005,500022220005,111100011111,003334433300,002244402200,222222222222,000400004000,000400004000,000400004000,022233332220,011100011100,004400004400,003300003300,011100001110,511133311115,000111111000,000333330000,000444444000,000111110000@000044440000,000000000000,000000000000,000000000000,000000000000,099999999990,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,000000000000,000000000000,000000000000,000999999000,000000000000,000000000000,000000000000,000000000000,999999999999,000000000000,000000000000,000000000000,000000000000", "175_80@555333335555,111033011111,111033301111,111333331111,055503330550,011006601110,055500300550,055003305550,333111111333,333111113330,033001100330,033001003300,003301103300,003301033000,555555555555,333222223333,111133335555,333333333333,555533331111,333333333333,003333333300@333222223333,333099033333,000099900000,000999990000,000000000000,000000000000,000000000000,000000000000,900000000009,900000000090,099000000990,099000009900,000000000000,000000000000,999999999999,999000009999,000000000000,999999999999,000000000000,999999999999,009990009900", "125_60@111333331111,111033011111,111033301111,111333333111,055555555550,055555555550,055555555550,555555555550,333111111333,300111110003,300020020003,300020020003,300020020003,300020020003,555555555555,333333333333,111133335555,333333333333,333333333333,333333333333,333333333333,111144445555,102223322201,111003000111,000003300000,000003000000,000003300000,000003000000@222222222222,333000033333,000000000000,000000000000,099999999990,099999999990,099999999990,999999999990,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,999999999999,000000000000,999999999999,999999999999,999999999999,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "120_60@044400001110,444400001111,444400001111,444400000111,444000000011,333333444444,wwwwwwwwwwww,011100001110,001100000110,011100001110,333w2222w333,33ww222ww330,333000000333,501111111155,55wwww2wwww5,500001100055,550000100005,500001100055,054444w44440,0ww00ww00ww0,333311113333,040001100400,044433334440,000003300000@011100004440,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000099990000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "170_80@011003300550,111033305550,011001100550,444444444444,444444444444,333300003333,011100000111,555544445555,333888888333,333333333333,333888888333,333333333333,441105501144,411155511140,441155551144,wwwwwwwwwwww,ww00www000ww,033311133300,003301103300,033311133300@033003300330,333033303330,033003300330,009900099900,999999999999,000000000000,000000000000,000000000000,000000000000,999999999999,000000000000,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,099999999900", "170_100@111003300555,111033305555,111033330555,333333333333,333333333333,333333333333,011114411110,011114411110,088888888880,111144411110,011104401110,552224222255,www333333www,031000005130,031000005133,031000005133,031551155113,311011100113,331004400113,331011100113,331001100011,114433344111,111400000411,wwwwwwwwwwww@333002200333,222000003333,000000000000,999999999999,999990099999,000999999000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "170_80@033344443330,033344443330,0w55522255w0,0www111www00,000003300000,000011100000,000003300000,555511155555,000ww33ww000,00w11w11w000,00w11ww11w00,00w11w11ww00,000555055500,000550055000,335552225533,003300033000,003330033300,663322233666,001110011100,001100011000,000100001000,111111111111,111111111111,111111111111@033322223330,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,999900009999,999999999999", "180_80@110333300550,110333005550,112222225555,112222225555,w3331111333w,w333111113w0,0wwwwwwwwww0,00wwwwwww000,000033333000,000011110000,000003330000,111166666111,w0000333000w,w000111100w0,0ww0333300w0,00wwwwwwww00,000wwwwww000,005553555000,000553355000,000533350000,000111111000,000533350000,000553355000,005553555000,022222222220,033335555111,333335555111,004444333300,000444333300,000444333000@110000000220,110000002220,110000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,009999999900,000099999000,000000000000", "190_70@444444444444,444444444444,444444441144,444400411144,444444441144,445544444444,445554110000,445544444444,444444422444,444400222444,444444422444,004444444444,444334440000,443334400444,444334444444,444444444444,444444446644,333344466644,444444446644,444444444444,wwwwwwwwwwww@333300000222,999999999999,999999990099,000000900099,999999990099,990099999999,990009000000,990099999999,999999900999,000000000999,999999900999,000009999999,990000990000,900000900000,990000999999,990009900099,999999900009,000099000009,999999900009,999999999999,000000000000", "190_80@333000000111,333000000111,333000000111,330000000111,111000003333,111000003333,111000003333,111000011111,444444444444,444444444444,444444444444,444444444444,000110001100,000w0000w000,000330003300,000ww000w000,0w111111111w,0wwwwwwwwww0,00w3333333w0,00wwwwwwww00,33333ww33333,wwwwwwwwwwww@222000000222,022000000222,222000000222,220000000222,444000000000,444000000000,444000000000,444000000000,000000000000,999999999999,999999999999,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "190_90@001115511110,001115511110,044443344440,333300003333,000555555000,wwwwwwwwwwww,wwwwwwwwwwww,001103011000,000103301000,001103011000,555555555555,555555555555,555555555555,450006200031,111111111111,111111111111,0ww0ww0ww0ww@000333333000,000333330000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,900099900099,999999999999,000000000000,999999999999,999900009999,000000000000", "170_90@400000000003,300000000003,100000000003,100000000003,100000000004,100000000003,100000000003,100000000003,100000000003,333355551111,055000400550,555004405550,222200402222,555004405550,055000400550,wwwwwww33111,wwwwwwww3311,000000011000,wwwwwwww3311,wwwwwww44444,666666644444,666666222222,666222222222,666222222222,888888888888@300000000000,300000000003,300000000003,300000000003,300000000003,300000000003,300000000003,300000000003,300000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,999999999999,999999999999,999999999999,000000000000", "200_100@111133332222,000030002000,000030002000,wwwwwwwwwwww,000030002000,wwwwwwwwwwww,000030002000,wwwwwwwwwwww,000030002000,000030002000,000030002000,000030002000,000030002000,444444444444,444444444444,444444444444,444444444444,011055501100,001005500100,011044401100,001004400100,011033301100,666666666666,666666666666,666666666666@100020004003,000020004000,000020004000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,999999999999,999999999999,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,999999999999,999999999999", "120_60@444455551111,444455551111,444455551111,444455555111,444555555511,533333544445,wwwwwwwwwwww,011100001110,001100000110,011100001110,333w2222w333,33ww222ww330,333000000333,501111111155,550000200005,500001100055,550000100005,500001100055,554444w44445,0w000ww000w0,333311113333,040001100400,444433334444,www00330www0,111113331111@111133334444,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000099990000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "150_60@000033300000,000333300000,000011100000,444444444444,444444444444,333355553333,011105550111,555544445555,333333333333,333333333333,333333333333,333333333333,441105501144,411155511140,441155551144,wwwwwwwwwwww,wwwwwwwwwwww,033311133300,003301103300,033311133300@000033300000,000333300000,000033300000,999999999999,999999999999,000000000000,000000000000,000000000000,000000000000,999999999999,000000000000,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "180_100@111103305555,1111www55555,1111www55555,333333333333,333333333333,333333333333,011114411110,011114411110,011114411110,111144411110,011104401110,552224222255,www333333www,031050455130,031050455133,031050405133,031555455113,311000400113,331000400113,331000400113,331000400011,111444444111,111400000411,444400000444,003300000330,003000000300,003000000300,003000000300,222220022222,300111100003,301100010003,311000011103,310000000113,100000000011@333302203333,000000003333,000000000000,999999999999,999999999999,000999999000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "180_80@333344443333,333344443333,ww55553555ww,wwwww33wwwww,000003300000,000003300000,000003300000,000003300000,000ww33ww000,00w11w11w000,00w11ww11w00,00w11w11ww00,000wwwwww000,000300030000,000300003000,003300033000,003330033300,663366633666,005556655500,005506055000,000006600000,111111111111,111111111111,111111111111,003333333300,044445444400,000005500000@333300003333,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,999999999999,999999999999,000000000000,000000000000,000000000000", "180_80@110000005555,110000055555,112222225555,112222225555,333311113333,033311111333,wwwwwwwwwwww,wwwwwwwwwwww,000033333000,000033330000,000003330000,000033330000,ww00033300ww,www03333wwww,0www0333www0,00wwwwwwww00,000wwwwww000,000001000000,000001000000,000001000000,000001000000,000001000000,000001000000,000001000000,000001000000,033335555111,333335555111,044444333330,044444333330,044444333330,000666666000,000666660000@110000002222,110000022222,110000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,009999999900,000099999000,000000000000,000000000000,000000000000", "180_80@444444444444,444444444444,444444441144,444444411144,444444441144,444444444444,444444444444,444444444444,444444444444,444444444444,444444444444,444444444444,444444444444,444444444444,444444444444,444444444444,444444446644,444444466644,444444446644,444444444444,122335155516@333399999222,999999999999,999999990099,999999900099,999999990099,990099999999,990009999999,990099999999,999999900999,999999000999,999999900999,999999999999,999009999999,990009999999,999009999999,999999999999,999999990099,999999900099,999999990099,999999999999,000000000000", "180_80@333000000000,333000000000,333000000000,330000000000,111000000000,111000000000,111000000000,111000011111,444444444444,444444444444,444444444444,444444444444,111110000005,wwww00000001,333330000004,wwwww0000003,0000w1111111,0000wwwwwwww,00w3333333w0,00wwwwwwwww0,33333ww00000,wwwwww000000,0000w5555555,000wwwwwwwww,11111w000000,wwwwww000000@222000000000,022000000000,222000000000,220000000000,444000000000,444000000000,444000000000,444000000000,000000000000,999999999999,999999999999,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "180_90@000555555000,000555550000,001111011110,333300003333,000555555000,wwwwwwwwwwww,wwwwwwwwwwww,401033010400,040103301040,040103301040,555555555555,555555555555,555555555555,450006200031,111111111111,111111111111,300300300300@000333333000,000333330000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,999999999999,999999999999,000000000000,999999999999,999999999999,000000000000", "140_70@400000000000,300000000000,100000000000,100000000000,100000000000,100000000000,100000000000,100000000000,100000000000,100000000000,100000000000,100000000000,100000000000,100000000000,100000000000,wwwwwww33111,wwwwwwww3311,wwwwwwww3311,wwwwwwww3311,wwwwwww44444,666666644444,666666222222,666222222222,666222222222,662222222000,000000011111,000000000001,000000000001,000000000001,000000000001,000000000001,000000000001,000000000001,000000000001,000000000001,000000000001,000000000001,000000000001,000000000001,000000000001,555555333333,555555333333,444666666111,444666666111@300000000000,300000000000,300000000000,300000000000,300000000000,300000000000,300000000000,300000000000,300000000000,300000000000,300000000000,300000000000,300000000000,300000000000,300000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,000999999999,000999999999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000003,000000000003,000000000003,000000000003,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "180_90@100030002006,100030002006,100030002006,wwwwwwwwwwww,100030002006,wwwwwwwwwwww,100030002006,wwwwwwwwwwww,100030002006,100030002006,100030002006,100030002006,100030002006,444444444444,444444444444,444444444444,444444444444,100030020004,100030002004,100030020004,100030002004,100030020004,666666666666,666666666666,666666666666@100020004003,100020004003,100020004003,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,999999999999,999999999999,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,999999999999,999999999999", "180_90@000031130000,3333333e3333,333333333333,33e333333333,333333333333,333555444333,030103010301,333311e13333,333333333333,444666555333,010401040100,444444444444,44e444444444,444444444444,wwwwwwwwwwww@000033330000,999999909999,999999999999,990990000999,999999999999,000000000000,000000000000,990000099999,999999999999,000000000000,000000000000,999000999999,990999999999,999999999999,000000000000", "190_100@001055501000,001055501000,001055501000,wwwwwwwwwwww,0000000e0000,wwwwwwwwwwww,00500e000010,111033302222,111033302222,111033302222,wwwwwwwwwwww,00000e000000,wwwwwwwwwwww,050001000500,111155554444,111555554444,002220033300,022220333300,111111111111,1e1011110011,111001e11011,550055550055@002033301000,002033301000,002033301000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,909099990099,999009099099,990099990099", "180_80@00ww1335ww00,00wwwwwwww00,00wwwwewww00,0wwwwwwwww00,00wwwwewww00,00wwwwwww000,33333333e333,3331e3333333,333333333333,100000000001,444444444444,444444444444,100000000001,100000000001,100000000001,444444444444,0444444e4444,04e444444440,021111444460@000022220000,000000000000,000000000000,000000000000,000000000000,000000000000,999999990999,999909999999,999999999999,000000000000,999999999999,999999999999,000000000000,000000000000,000000000000,999999999999,099999909999,090999999990,000000000000", "180_90@111111555555,66666w333333,w1111ww5555w,w2220e0222ww,wwwwwwwwwwww,wwwwwewwwwww,wwwwwwwwwwww,333311113333,000004440000,wwwww11wwwww,000000100000,333355551111,003000500010,044404404440,www3333333ww,003333333300,003333333330@444444333333,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000999999900,009999999900,009999999990", "180_90@022110111220,222111111222,220011e10022,111444333555,111444333555,11144e333555,005550011100,005500011000,222244442222,22244ee42222,222222222222,041113111400,044455554440,44440e044444,444441144444,00333e333300,006051150600,006011106000,000601106000,000611160000,111161161111,333333333333@022330333220,999999999999,000000000000,999999999999,000000000000,000000000000,000000000000,000000000000,999999999999,999990099999,999999999999,000000000000,000000000000,000000000000,999999999999,009990999900,000000000000,000000000000,000000000000,000000000000,999900009999,999999999999", "160_100@555533331111,111111111111,001111e11100,111111111111,110055055015,110550055011,122111111111,100200006001,100020006001,100200006001,1111111111e1,111055001110,111055001110,254235414212,111111111111,033000003300,033300003330,wwwwwwwwwwww,111144444333,888888888888@222222222222,999999999999,009999099900,999999999999,000000000000,000000000000,999999999999,000000000000,000000000000,000000000000,999999999909,000000000000,000000000000,999999999999,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000", "210_120@004442244400,222222222222,222222e22222,111222222111,111111e11111,111111111111,111111e11111,111111111111,111111e11111,www111111www,wwww11e11www,00ww1111ww00,005ww1e1ww10,055www1ww110,0555ww1ww111,5555wwww1111,55555www1111,11111ww55555,333333w33333@002222222200,999999999999,999999099999,999999999999,999999099999,999999999999,999999099999,999999999999,999999099999,000999999000,000099099000,000099990000,000009090000,000000900000,000000900000,000000000000,000000000000,000000000000,000000000000", "210_90@000055555111,000033300030,000033000330,000030003330,000022223333,0002e2223330,wwwwww1111ww,0000011ee100,000000111100,555555222220,555533022220,wwww3e333www,000033330000,011110666000,111110066600,000555006666,000055e00006,000555002222,000006666222,000006666222,001111555000,001100066660,333322000000@000044444222,000000000000,000000000000,000000000000,000000000000,000000000000,000000999900,000009900900,000000999900,000000000000,000000000000,000090999000,000099990000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000009999999,009999999000,009900099990,999999000000", "210_120@001110001110,55555ww5555w,ww1111ww111w,ww22w444wwww,1111w4444www,ww3334445555,0w3333e222ww,ww333wwwww00,222ww666ww00,2eww6666www0,3333w666333w,ww222ww3333w,0w2222ww333w,ww222wwewww0,w4444ww444w0,004400000000@000220003300,000000000000,009999000000,000000000000,000000000000,000009990000,000000000000,009990000000,000000000000,000000000000,000009990000,000000000000,000000009990,009990000000,000000000000,000000000000", "210_90@555111111555,33335e553333,333355553333,0w11555511w0,0w111wew111w,0w11wwww11w0,0w553333355w,w55533335550,0w55w1e1w55w,333ww11ww333,333ww111w333,11111e111111,111144444111,333011110333,333001110333,00666e366600,000wwwwwww00,002200002200,032200e00223,331112211133,wwwwwwwwwwww@222222222222,999990999999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999990099999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "100_60@111111113331,3333333e3333,333333333333,33e333333333,333333333333,555555111111,333333333333,33333ee13333,333333333333,444444555555,4444444e4444,444444444444,44e444444444,444444444444@333333333333,999999909999,999999999999,990999999999,999999999999,000000000000,999999999999,999990999999,999999999999,000000000000,999999909999,999999999999,990999999999,999999999999", "210_90@111055501111,111055501111,111055501111,wwwwwwwwwwww,wwwwwwwewwww,wwwwwwwwwwww,00500e000010,111033302222,111033302222,111033302222,wwwwwwwwwwww,wwwwwewwwwww,wwwwwwwwwwww,050001000500,111155554444,111555554444,002220033300,022220333300,111111111111,1e1111111111,111111e11111,555555555555,555555111555@222033301111,222033301111,222033301111,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,909999999999,999999099999,999999999999,999999000000", "210_80@55ww3333ww11,55wwwwweww11,55wwwwewww11,5wwewwwwww11,55wwwwewww11,55wwwwwwww11,33333333e333,333ee3333333,333333333333,100400300401,100400300401,200200200202,100400300401,100400300401,100400300401,444444444444,4444444e4444,44e444444444,444444444444@330022220044,330000000044,330000000044,300000000044,330000000044,330000000044,999999990999,999099999999,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,999999909999,990999999999,999999999999", "150_90@111111555555,33333w33333w,w1111ww5555w,w222wew222ww,wwwwwwwwwwww,wwwwwewwwwww,wwwwwwwwwwww,333311113333,w222w444w555,w22ww11ww55w,ww2www1www5w,333355551111,003000500010,444404404444,000333333300,333333333333,333333333333@444444333333,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000999999900,999999999999,999999999999", "210_90@222111111222,222111111222,220011e10022,111444333555,111444333555,11144e333555,005550011100,005500011000,222244442222,22244ee42222,222222222222,041113111400,044455554440,44440e044444,444441144444,20333ee23302,200051150002,200011100002,200001100002,200011100002,200001100002,3333333e3333,2wwww5wwwww2,2wwww5wwwww2,200005000002,200005000002,200005000002@222333333222,999999999999,000000000000,999999999999,000000000000,000000000000,000000000000,000000000000,999999999999,999990999999,999999999999,000000000000,000000000000,000000000000,999999999999,009990999900,000000000000,000000000000,000000000000,000000000000,000000000000,999999909999,000000000000,000000000000,000000000000,000000000000,000000000000", "210_100@555533331111,111111111111,111111e11111,111111111111,111155351115,111553351111,122111111111,11e111111111,111111e11111,111111111111,1111111111e1,111155331114,211155331116,254235414212,111111111111@222222222222,999999999999,999999099999,999999999999,000000000000,000000000000,999999999999,990999999999,999999099999,999999999999,999999999909,000000000000,000000000000,999999999999,999999999999", "210_100@222222222222,222222222222,222222e22222,111222222111,111111e11111,111111111111,111111e11111,111111111111,111111e11111,www111111www,wwww11e11www,00ww1111ww00,000ww1e1ww00,000www1ww000,0000ww1ww000,0000wwww0000,00000www0000,00000ww00000,000000w00000,000011110000,003333033330,000055550000,222222022222,000666666000,111110001111,004444444400@222222222222,999999999999,999999099999,999999999999,999999099999,999999999999,999999099999,999999999999,999999099999,000999999000,000099099000,000099990000,000009090000,000009900000,000000900000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "210_90@w11155555111,ww3e33300030,00ww33000330,00ww30003330,000222223333,0002e2223330,wwwwww1111ww,0000011ee100,000000111100,555555222220,555533022220,wwww3e333www,000033330000,011110666000,111110066600,000555006666,000055e00006,000555002222,000006666222,000006666222,001111555000,0011e0066660,333322ee0003,333303333330,100200333333,101222220000,111100001111,111000111111@022244444222,000000000000,000000000000,000000000000,000000000000,000000000000,000000999900,000009909900,000000999900,000000000000,000000000000,000990999000,000099990000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000009999999,009999999000,009900099990,999999900000,000000000000,000000000000,000999990000,000000000000,000000000000", "210_100@ww111www111w,55555ww5555w,ww1111ww111w,ww22w444wwww,1111w4444www,ww3334445555,ww3333e222ww,ww333wwwwwww,222ww666wwww,2eww6666wwww,3333w666333w,ww222ww3333w,ww2222ww333w,ww222wwewwww,w4444ww444ww,ww44wwwwwww0,ww1www000000,0www00000000@000220003300,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "150_90@555111111555,33335e553333,333355553333,ww11555511ww,ww111wew111w,ww11wwww11ww,ww553333355w,w5553333555w,ww55w1e1w55w,333ww11ww333,333ww111w333,11111e111111,111144444111,333011110333,333001110333,00666e366600,000wwwwwww00,002200002200,032200e00223,331112211133,ww0www0www0w,wwwwwewwwwww,113003300311,133533353311,000550055000,000011100000,000001100000@222222222222,999990999999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999990099999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "210_80@008888888880,555554455555,0111iiii1110,00222444iii0,1111i6666000,0033i5555555,00111i522200,003333iii000,22222ww66666,5555i4444444,3333i6663333,2222w4444444,00333i333333,00222i111100@002220003330,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000009999999,000000000000,000000000000,000000000000,000000000000", "210_90@555111111555,333355533333,222244442222,001155551100,00444iii4440,001100001100,004533333550,044433334440,0055iiiii550,000001100000,000001110000,iii533335iii,000553335500,000011110000,000001110000,iii663366iii,000663336600,002200002200,0322iiiii223,331112211133,555112221155@222222222222,000000000000,000000000000,000000000000,000000000000,000000000000,009999999990,000000000000,000000000000,000000000000,000000000000,000999999000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,099999999999,999999999999", "210_90@660553355066,660011100666,111151151111,115550555011,000101101000,00115e511000,02225ww52220,ii111w111iii,00555ww55500,055i1e1i5500,5550i55i0555,1110i0i01110,ii11wwww11ii,00100e001000,00ii1111ii00,04444i444400,00011ii11000,0033iii33000@330223322033,330099900333,000009900000,990000000099,000000000000,000000000000,099900009990,000000000000,000000000000,099090909900,000000000000,000000000000,009900009900,009000009000,000000000000,000000000000,000000000000,000000000000", "210_100@001100444002,011124440622,011154440662,01155ii20660,0015e5220660,012554422644,wwww0000wwww,442444244440,42241iii4410,224e10021110,244115221110,44ii55501100,41e111i05550,115544ii4444,wwwwwwwwwwww,111e42224i00,012442i441i0,44ei211411i0,442i1144211i,455i44422011,0555wwww2200,555w000w2220,wwww0000wwww@002200222002,000200000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999990,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "210_100@411445512221,411145512221,011145511220,044445511200,00011iii1100,0011e55iiii0,000115514224,iii111114224,223i1e114224,2233313i4444,4444333ii313,422551ie3113,442251111331,422553333311,422253334411,iiii33224411,003552224413,0334e5444113,331144443iii,33311153i000,3330035ii000,011003i00000,001111300000,00iiii000000@222222222222,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,003300000000,999999999999,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "180_100@2i55111155i2,www555555www,002221112220,0000iiii0000,wwwww444wwww,033355553330,04433iii3344,ii22iiii22ii,002111311120,444013310444,wwwwwwwwwwww,111114441111,i4i5331335i4,044015510440,ii3i5i3i5i3i,003553355300@100033330001,000000000000,000000000000,000000000000,000000000000,099999999990,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "150_100@611155555111,600000000030,060000000330,060000003330,006222223333,00622222iiii,iiiiiie11100,000001111100,000000111100,555555222220,555533022220,000333333000,000033330000,011110666000,111110066600,44i555004444,44ii55500444,44i555002222,00ii06666222,iiiii6666iii,001111555www,001110066660,333322220003,33330e033330,144444443333,10122222iiii,111144441111,111444111111,iii222220000@322244444222,300000000000,030000000000,030000000000,003000000000,003000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000999999000,000099990000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,000999990000,000000000000,000000000000,000999990000", "210_100@222111111222,wwwwwwwwwwww,220011110022,111444333555,666222666222,111444333555,005550011100,wwwwwwwwwwww,022244442220,iiii1111iiii,000044440000,041113111400,044455554440,4444e0044444,iiiii11iiiii,203333333302,200011110002,200011100002,200001100002,200011100002,200001100002,0iiii5iiiii0,2220e5003222,223305033322,223305003322,223305033222,222205002222,iiii55iiiiii,111113311111@222333333222,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999", "210_80@111133300066,331133300666,331113113666,iiii44421110,0005504e0011,00550044iiii,005500333011,355000444011,iiiii0440011,135500111331,133550eiiiii,446666000000,011000000000,iiiiii000000,060500001460,663300111166,66550011i666,iiii33eiiiii,400053560000,444411113300,111166611300,011166000300,iiiiii335555,500100500005,551105500000,011335331155@333333300000,222222200000,222222222000,000000000000,000000000000,000000000000,000000000000,000000000000,000000110033,000000333000,000000000000,000000000000,000000000000,000000000000,090900000000,909900000000,999900000000,000099000000,000099000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "160_90@555533335555,055511155500,111333333111,1110w00w0111,wwwwwwwwwwww,iii000000iii,500300003005,500300003005,400300003004,500300003005,500311113005,11110e011111,iiiii44iiiii,500044400005,500022224005,50040e004005,500400004005,500400004005,iiiii33iiiii,10060e060001,100600006001,100600006001,5006wwww6005,5iiii0iiiii5,500322223005,500333330005@222244442222,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999900099999,000009900000,000099900000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000999999000,000999990000", "210_70@001110001110,555554455555,0111iiii1110,00222444iii0,1111i4444000,0033i4445555,00333i522200,003333iiii00,22222i666666,2222i6666666,3333i6663333,0022wii33333,00222i113333,00222i115555,044443344411,004411111000,001133344000@002220003330,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "210_90@555111111555,333355503333,333355553333,001155551100,00111iii1110,001100001100,005533333550,055533335550,0055iiiii550,333001100333,333001110333,iii550055iii,000550005500,333011110333,333001110333,iii663366iii,000663336600,002200002200,0322iiiii223,331112211133,555112221155,iii002200iii,113003300311,133533353311,000550055000,000011100000,000001100000@222222222222,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "210_90@011555555110,050011100500,111151151111,11555e555011,000101101000,00115e511000,02225ii52220,ii111i111iii,00555ii55500,055i1e1i5500,555wi55iw555,111wieiw1110,0011w55w1100,001wweww1000,iiii1111iiii,04444i444400,00011ii11000,0033iii33000,00033ii33000@000229922000,000099900000,000009900000,990000000099,000000000000,000000000000,099900009990,000000000000,000000000000,099090909900,000000000000,000000000000,009909909900,009000009000,000000000000,000000000000,000000000000,000000000000,000000000000", "210_100@001100444002,011124444622,01115440e662,21155ii20660,0215e5220660,012554422644,wwwwwwiwiiww,4424442e4440,42241iii4410,224e10021110,244115221110,44ii55501100,41e555i01440,115544ii2444,wwwwwwwwwwww,111e42224i04,012442i441i0,44ei211411i0,442i1144211i,455ie4422011,055544002200,55504ii22220,wwwwwwwwwwww@002200222002,000200000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999990,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "210_100@411445512221,411145512221,411145511221,444445511221,44411iii1110,1311e55ii224,113115514224,iii111114224,223i1e114224,2233313i4444,4444333ii313,422551ie3113,442251111331,422553333311,422253334411,iiii33224411,113552224413,0334e5444113,331144443i33,33311153i000,3334435ii000,011443i55000,001111335000,00iiii115000,000000015000,000001110000@222222222222,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,003300000000,999999999999,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "210_90@2i55111155i2,www555555www,002221112220,1112iiii2111,000004440000,033355553330,04433iii3344,ii22iiii22ii,002111311120,444013310444,444444444444,444444444444,i4i5331335i4,044015510440,ii3i5i3i5i3i,003553355300,000030503000,000022220000@100033330001,000000000000,000000000000,000000000000,000000000000,099999999990,000000000000,000000000000,000000000000,000000000000,999999999999,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "210_90@011155555111,003333300030,000033000330,000030003330,000222223333,000222223330,iiiiiie11100,000001111100,000000111100,555555222220,555533022220,000333333000,000033330000,011110666000,111110066600,44i555004444,44ii55500444,44i555002222,00ii06666222,iiiii6666iii,ww1111555www,001110066660,333322220003,33330e033330,144444443333,10122222iiii,111144441111,111444111111,iii222220030,00300e033333,033000000111,33wwwwwww111,33wwwwwww111,666664444111,000066666666@022244444222,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000999999000,000099990000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,000999990000,000000000000,000000000000,000999990000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "150_90@222111111222,222111111222,220011110022,111444333555,111444333555,111444333555,005550011100,wwwwwwwwwwww,022244442220,iiii1144iiii,000044440000,041113111400,044455554440,4444e0044444,iiiii11iiiii,203333333302,200011110002,200011100002,200001100002,200011100002,200001100002,0iiii5iiiii0,2000e5000002,200005000002,200005000002,200005000002,200005000002,iiiii5iiiiii,111113311111,200033300002,200003300002,440013110444,440011110044@222333333222,222000000222,000000000000,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,000099990000,000099990000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,000000000000,000000000000,000000000000,000000000000", "210_90@000133300000,001133300000,001113113000,iiii44421110,0005504e0011,00550044iiii,005500444011,355110444011,iiiii1440011,135500111331,133550eiiiii,443333000000,011050001000,iiiiii004100,060500001460,663300111166,66550011i666,iiii33eiiiii,400053560000,444411113300,111166611300,011166000300,iiiiii331311,500100500033,551105500010,011335331110,110000000000@000333300000,002222200000,002222222000,000000000000,000000000000,000000000000,009000999099,009000000000,330011110033,090900333000,099990000000,009900000000,000000000000,000000000000,090900009000,909900009900,999900099900,000099000000,000099000000,090000000000,099000000000,009000000000,000000099900,000000900090,990000000090,000000000090,000000000000", "210_90@555533335555,005533355500,111113311111,111000000111,wwwwwwwwwwww,iii000000iii,500300003005,500300003005,400300003004,500300003005,500311113005,11110e011111,iiiii44iiiii,502244402205,522222222225,50040e004005,500400004005,500400004005,iiiii33iiiii,10060e060001,100600006001,100600006001,500600006005,5iiii0iiiii5,500322223005,500333330005,311111111113,333111111133,000333110330,000000100000@222244442222,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999900099999,000009900000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "210_90@111055550111,404030304001,404003300404,111003000111,888888888888,808888880888,iiii4444iiii,444444444444,888888888888,444444444444,001105501100,001105501100,222244442222,222444442222,wwwwwwwwwwww,088800008880,008800000880@444033330444,404000004004,404000000404,444000000444,000000000000,000000000000,000099990000,999999999999,000000000000,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "210_90@333444441111,088088088088,wwwwwwwwwwww,004410114400,ww44111144ww,00401e104400,004411114400,004410114400,888888888888,444411144444,888888888888,113311133311,8888iiii8888,iii000000iii@222222222222,000000000000,000000000000,009990999900,009999999900,009090909900,009999999900,009990999900,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "210_90@310008800013,310088800130,310008800013,ww0ww0ww0ww0,333333333333,00000e000000,330333333033,888888888888,011001100110,033022203300,033002200330,11114e441111,111144441111,iiii888iiiii,33331e113333,222555555222,222wwwwww222,iii00ii00iii,010011110010,010033300100,004440044400,555000005550@300000000002,300004000020,300000000002,000000000000,999999999999,000000000000,990999999099,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "210_100@888888888888,888808088888,333344441111,wwwwwwwwwwww,111111111111,333311113333,111888811111,888888888888,880008800088,880008800088,880008800088,880008000088,444444e44444,444444444444,444444444444,888008800888,001111011110,222000000222,004444044440,000033330000@000303303000,030000000300,000000000000,000000000000,999999999999,000000000000,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,999999099999,000900099000,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000", "210_100@881111444488,888081180888,111888888111,888808808888,333881118333,880880880888,338888888833,iiii0000iiii,000333333000,333330033333,001100000110,011000000110,033300000333,000400004000,000040004000,111133331111@000033330000,220002200022,000000000000,999909909999,000000000000,000000000000,000000000000,000000000000,000999999000,999990099999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "210_90@880888888088,808888888088,108803308801,108803088011,110880088011,ii0888880iii,222231113222,333555555333,002666666200,002400042000,000240042000,333344433333,044401100444,iii331333iii,666665556666,001110011100,001110001110,333300003333,033300000333,888888888888,000888888000@330000000033,300000000033,000003300000,000003000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,000000000000", "210_100@080080080008,080880880008,080080080008,111110111111,ii11100411ii,888888888888,ii11055504ii,011005500440,011105550444,ii33300222ii,00i3300022i0,0i33300222i0,00iii666iii0,000333633000,000006660000@020020020002,020220220002,020020020002,000990999090,009990099900,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000009990000,000999999000,000009990000", "210_90@800033333008,800111111008,800033333008,88iii00iii88,8888i888i888,888i8888i888,ww333www333w,001100001100,000666066600,005550055500,000001110000,wwwwwwwwwwww,000088888000,008888888800,033300000333,111110011111@200033333002,200333333002,000033333000,000000000000,999909990999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000099999000,009999999900,000000000000,000000000000", "210_90@888888888888,888888888808,800888888008,800088800008,800030030008,iii030300iii,800030030008,808880888008,888880088888,88888e888888,iii888888iii,088888888880,888800008888,000888880000,008888088880,088880088880,000030030000,000030300000,000003300000@000022220000,000022200000,000002200000,000002000000,000000000000,000000000000,000000000000,000020200000,999920029999,000220222000,000999999000,099999999990,000000000000,000000000000,009999099990,000000000000,000000000000,000000000000,000000000000", "210_90@888e00008888,88880000e888,888e00008888,800000000008,88880000e888,800000000008,888e00008888,0iii0000iii0,33wwwwwwww33,030000000300,033000000330,030000000300,033000000330,333300033333,033000000330,030000000300,033003300330,888888888888,888888888888@300000000003,300000000003,300000000003,300000000003,300000000003,300000000003,300000000003,000000000000,000000000000,090000000900,099000000990,090000000900,099000000990,009900099900,099000000990,090000000900,099000000990,000000000000,000000000000", "210_80@111055550111,111000001111,111000000111,111000000111,888888888888,888888888888,iiii4444iiii,444444444444,444444444444,444444444444,001105501100,001105501100,222244442222,222444442222,wwwwwwwwwwww@444033330444,444000004444,444000000444,444000000444,000000000000,000000000000,000099990000,999999999999,999999999999,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000", "150_90@333444441111,888888888888,wwwwwwwwwwww,000411114400,000411114400,00041e114400,000411114400,000411114400,888888888888,444411144444,888888888888,113311133311,0000iiii0000,004441444000,000441144000,111011101110,011000000110@222222222222,000000000000,000000000000,000999999900,000999999900,000990999900,000999999900,000999999900,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "230_90@888008800888,888088808888,888008800888,333333333333,333333333333,33333e333333,333333333333,888888888888,033002200330,033022203300,033002200330,11114e441111,111144441111,iiii111iiiii,33331e113333,222555555222,222wwwwww222,iii00ii00iii,000111011100,001114411100@333000000222,333004002222,333000000222,999999999999,999999999999,999990999999,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "230_90@888888888888,888888888888,333344441111,wwwwwwwwwwww,111111111111,333311113333,111888811111,888888888888,880008800088,880008800088,880008800088,880008000088,444444e44444,444444444444,444444444444,888888888888@000303303000,030000000300,000000000000,000000000000,999999999999,000000000000,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,999999099999,000999999000,999999999999,000000000000", "230_80@888888888888,888881188888,111888888111,888888888888,333888888333,888888888888,338888888833,iiii0000iiii@000000000000,220002200022,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "230_90@880888888088,808888888088,108883388801,108883888011,110888888011,ii0888880iii,222231113222,333555555333,000888888000,000811180000,000081180000,000081800000,wwwww88wwwww,iii338333iii,000005550000,00111ww11100,00111www1110,333300003333,033300000333,888888888888,000888888000@330000000033,300000000033,000003300000,000003000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "230_90@880088880088,880888880888,880088880088,111111111111,111111111111,111111111111,011105550444,011005500440,011105550444,ii33300222ii,0ei3300022i0,wi33300222i0,wwiii666iii0,000006600000,000006660000,wwwwwwwwwwww@220022220022,220222220222,220022220022,999999999999,999999999999,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "140_80@000033333000,000111111000,000033333000,88iii88iii88,8888i888i888,888i8888i888,003330003330,001100001100,000666066600,005550055500,000001110000,wwwwwwwwwwww,000i0000i000,00ii000ii000,000i0000i000,00ii000ii000,wwwwwwwwwwww@000033333000,000333333000,000033333000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "230_90@888888888888,088888888800,000888888000,000088800000,000008800000,000088800000,000088880000,008888888000,088888888880,888888888888,iii888888iii,088888888880,888800008888,000888880000,008888088880,888880088888@000022220000,000022200000,000002200000,000002000000,000000000000,000002000000,000002200000,000022200000,000022220000,000222222000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "230_90@888e00008888,88880000e888,888e00008888,888800008888,88880000e888,888800008888,888e00008888,0iii0000iii0,33wwwwwwww33,03000e000300,033003300330,030003000300,033003300330,33333e333333,033003300330,030003000300,033003300330,888888888888,888888888888@300000000003,300000000003,300000000003,300000000003,300000000003,300000000003,300000000003,000000000000,000000000000,090000000900,099009900990,090009000900,099009900990,009990999900,099009900990,090009000900,099000000990,000000000000,000000000000", "230_80@888880088888,888880088888,33333ii11111,88888ii88888,11111ii55555,8888iii88888,011003300110,010001000100,011003300110,iiii0e00iiii,00iii44iii00,000ii1iii000,000011110000@000330033000,000330033000,000000000000,000000000000,000000000000,999900099999,000000000000,000000000000,000000000000,000000000000,000000000000,000008000000,000088880000", "230_90@000666660000,006666660000,33333333iiii,wwwwwwwwwwww,000111110000,iii88888wwww,003333333000,wwwwwwwwwiii,000033330000,ww3333333www,000011110000,iiiwwwwwwwww,000044440000,www55555iiii,000011110000@000222220000,002222220000,000888880000,000000000000,000000000000,000000000000,008888888000,000000000000,000000000000,009999999000,000088880000,000000000000,000000000000,000999990000,000088880000", "230_80@000008880000,555511133333,222551113322,555511113330,000wwwwww000,333330033333,111114411111,13330e033333,00iii44iii00,0ww04440ww00,0ww004400ww0,ww3334333ww0,111134431111,055511155500,000001100000,000011100000,www333333www,004400004400,004400000440,044000000440@000002220000,000000000000,999990009999,000000000000,000000000000,008880088800,000000000000,999900099999,000000000000,000088800000,000000000000,000000000000,000000000000,000000000000,000000000000,000088800000,000888888000,000000000000,000000000000,000000000000", "170_90@003311113300,444422225555,333311113333,ww0ww0ww0www,ii330iie33ii,00330i003300,00330ii03300,0033iii03300,00333iii3330,www0wwww0www,033305550333,888888888888,333305550333,333005500333,044440022660,112222222111,110000000011,100000000001@001100001100,008800008800,000008800000,000000000000,000000000000,000000000000,009900009900,000000000000,000000000000,000000000000,000000000000,000000000000,880000000088,000000000000,088000000880,009999999000,000000000000,000000000000", "230_90@000066600000,000333300000,000i11111100,00iiiiiie000,000000004444,000000044444,0000001111ww,0000011111ww,ww55555wwwww,ww55555weww0,333333wwwww0,333333w00000,0we111110000,0w1111110000,0iwww3333300,0i00w3333300,0i000ww11111,0i0000w11111,0i0003333ew0,0i0033333w00,0i44444www00,0i44www00000@000000000000,000033000000,000000000000,000000000000,000000000000,000000088000,000000000000,000008000000,000000000000,008800000000,000000000000,880000000000,000000000000,008800000000,000000000000,000000008800,000000000000,000000000088,000000000000,000000088000,000000000000,000000000000", "230_90@000000333300,00ii55555500,000i55555500,000i11111333,00ei11111333,wwwi0000iiii,wwwi0000iiii,00000000iiii,00000000iiii,55555555i000,55555555i000,ewi333333333,wwi888888811,wwi444000011,00i444000001,00iwwwwe0011,00iwwwwwi111,11111000i111,00000333iwww,00444000iwww,e3330000iwww,44440000iwww,044i5555iwww,444055553000,444055553000,000000030000@000000222200,000000000000,000088888800,000099999888,000080008888,000000000000,000000000000,000000000000,000000000000,000000000000,088888880000,000999999999,000000000000,000000000000,000000000000,000000000000,000000000000,888880000888,000000000000,000000000000,000000000000,888800000000,000099990000,000000000000,000088000000,000000000000", "230_90@000888888000,008030338000,008303030800,083333303800,080083383380,083333300800,008303033800,008033038000,00e888888e00,ei000i000i00,0iii0ii00ii0,00iiii00ii00,0000iiiiiie0,00000iii0000,44400ii00044,44444i444444,444444444444,444444444444@000000000000,000090990000,000909090000,009933309000,000033339900,009933300000,000909099000,000099090000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999000000099,999990999999,999999999999,999999999999", "230_90@000555003300,005555033300,00000iiiii00,000444406666,004444466666,004446666333,iiiii5555333,330222200330,33022222i33e,10022222i000,11055555i000,1101111i0000,0000111i3333,0001111i3333,0004444455e0,004444455500,004444405550,0444400055i0,11100000iii0,1110000i5555,1e10000i1111,333000i11110,333300i11110,11111i000000,111111000000,004444433333,iiii33300ie0,000i1100i000,0000i110i000,0000i0004444,000000000444,0000000iiiii@000222002200,002222022200,000000000000,000888808888,000000000888,000000000000,000000000888,000888800880,000000000000,200000000000,220000000000,880888800000,000000008888,000000000000,000000008800,000000088800,008888800000,000000000000,888000000000,000000000000,000000000000,888000000000,000000000000,000000000000,000000000000,000088800888,000000000000,000088000000,000000000000,000000000000,000000000000,000000000000", "230_90@0ww088880ww0,0ww55555ww00,00ww5555ww00,00wwwwwww000,000088880000,000008000000,000888888800,111111111111,003338833300,iiii444iiii0,000i4444i000,00i44444i000,00i444444i00,ii4444444iii,222200002222,111444441111,333330033333,011111111100@000033330000,000222220000,000044440000,000000000000,000000000000,000000000000,000000000000,999999999999,008880088800,000099900000,000099990000,000999990000,000999999000,009999999000,008800008800,000088800000,880000000088,000000000000", "230_90@00i888888i00,00i88888i000,iiii8888iiii,888i888i8888,888800008888,888800008888,888800008888,444e4444e444,iiii44444iii,00i111111i00,00i5555555i0,0i44444444i0,0i000000000i@000222222000,000222220000,000022220000,000022200000,888800008888,000000000000,888800008888,999099990999,000000000000,000888888000,000000000000,008888888800,000000000000", "230_80@888888888888,888888888888,33333ii11111,88888ii88888,11111ii55555,8888iii88888,011003300110,010001000100,011003300110,wwwwwewwwwww,00000ww00000,000001000000,00000ww00000@000333333000,000333333000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000008000000,000000000000", "120_70@000666660000,006666660000,000333330000,wwwwwwwwwwww,000111110000,000111110000,003333333000,wwwwwwwwwwww,000033330000,003333333000,000011110000,wwwwwwwwwwww,000044440000,000555550000,000011110000,wwwwwwwwwwww@000222220000,002222220000,000888880000,000000000000,000000000000,000000000000,008888888000,000000000000,000000000000,000000000000,000088880000,000000000000,000000000000,000000000000,000088880000,000000000000", "230_80@888888888888,555511133333,222551113322,555511113330,000wwwwww000,333330033333,111114411111,13330e033333,00iii44iii00,0ww04440ww00,0ww004400ww0,ww0004000ww0,ww00044000ww,055511155500,000001100000,000011100000,wwwwwwwwwwww,004400004400,004400000440,044000000440,000111111100,000011110000,000001110000@222222222222,000000000000,000000000000,000000000000,000000000000,008880088800,000000000000,999900099999,000000000000,000088800000,000000000000,000000000000,000000000000,000000000000,000000000000,000088800000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000008880000", "230_90@333311113333,444422225555,333311113333,wwwwwwwwwwww,00w0000000w0,00w000000w00,000w00000w00,00w000000w00,00w0000000w0,wwwwwwwwwwww,033305550333,888888888888,333305550333,333005500333,044440066660,010033300100,010033330010,100iiiii0010,333300003333,444000000444@111100001111,888800008888,000088880000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,888800000888,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "230_90@000088800000,000888800000,000i88888800,00iiiiiie000,000000004444,000000044444,0000001111ww,0000011111ww,ww55555wwwww,ww55555wewww,333333wwwwww,333333wwwwww,wwe111110000,ww1111110000,0wwww3333300,00www3333300,0000www11111,0000www11111,000003333eww,000033333www,w444444wwwww,w444wwwwww00,www555550000,www555550000@000000000000,000033000000,000000000000,000000000000,000000000000,000000088800,000000000000,000008800000,000000000000,008800000000,000000000000,880000000000,000000000000,008800000000,000000000000,000000008800,000000000000,000000000088,000000000000,000000088000,000000000000,000000000000,000000000000,000000000000", "230_90@003333333300,iiii55555500,000i55555500,000i11111333,00ei11111333,wwwi0000i333,wwwi0000i333,00000000i333,00000000i333,55555555i000,55555555i000,ewi333333333,wwi888888888,wwi444000011,00i444000001,00iwwwwe0011,00iwwwwwi111,11111000i111,11111000iwww,00444444iwww,e3330000iwww,44440000iwww,444i5555iwww,444i55553300,444i55553300,000i00033333,000i00003333,000i44444000,000i44444000@002222222200,000000000000,000088888800,000000000888,000088888888,000000000888,000000000888,000000000888,000000000888,000000000000,088888880000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,888880000888,888880000000,000000000000,000000000000,888800000000,888000000000,888000000000,888088880000,000000000000,000000000000,000000000000,000000000000", "230_90@000888888000,008333338000,008333333800,083333333800,083383383380,083333333800,008333333800,008333338000,00e888888e00,www00i000ww0,0wwwwii0www0,0www0i0wwww0,000wwiiwwww0,0000wiwww000,00000ii00000,00444i444000,444444444444,444444444444@000000000000,000999990000,000999999000,009933399000,009933339900,009933399000,000999999000,000999990000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,009990999000,999999999999,999999999999", "230_90@000555000000,005555000000,00000iiiii00,000444406666,004444466666,004446660333,iiiii0000333,330222200330,33022222i33e,10022222i000,11000000i000,1101111i0000,00ii111i3333,00i1111i3333,00i0000055e0,0i0000055500,0i0000005550,0i00000055i0,11100000iii0,1110000i0000,1e10000i0000,333000i00000,333300i00000,11111i000000,111111000000,004444433333,iiii00000ie0,000i1100i000,0000i110i000,0000i0004444,000000000444,0000000iiiii,666666660000,0000iiii0000,000111111000,000444440000@000222000000,002222000000,000000000000,000888808888,000000000888,000000000000,000000000888,000888800880,000000000000,200000000000,220000000000,880888800000,000000008888,000000000000,000000008800,000000088800,000000000000,000000000000,888000000000,000000000000,000000000000,888000000000,000000000000,000000000000,000000000000,000088800888,000000000000,000088000000,000000000000,000000000000,000000000000,000000000000,000088880000,000000000000,000000000000,000000000000", "230_90@0www8888www0,0wwwwwwwww00,00wwwwwwww00,00wwwwwww000,000088880000,000008000000,000008800000,000008000000,003338833300,iiiii0iiiii0,0000i00i0000,000i000i0000,000i0000i000,iii00000iiii,222200002222,111444441111,333330033333,011111111100,333300003333,333300003333@000033330000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,008880088800,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,880000000088,000000000000,000000000000,888800008888", "230_60@00i888888i00,00i88888i000,000i8888i000,888i888i8888,888800008888,888800008888,888800008888@000222222000,000222220000,000022220000,888022208888,888800008888,888800008888,888800008888", "250_120@00ww88800000,0w1w88880000,00ww88888000,111111www000,000000wwww00,00000ww3ww00,000000wwww00,0ww555www555,0wew00888888,0ww08e888888,888888888888,055000www888,033300w11w88,05500w444w00,000000w11w00,000000www000,666666666666,888888883388,00www0003430,0w44w0003300,0w111w000000,0w33w0000000,00www0000000,222222222222@000000000000,002000000000,000000000000,999999000000,000000000000,000000030000,000000000000,000999000999,000000000000,000000000000,999999999999,000000000000,000000033000,000000333000,000000033000,000000000000,999999999999,000000000000,000000000000,002200008800,002220000000,002200000000,000000000000,999999999999", "250_100@660000000066,888000008888,888000008888,8e8000008888,444000004444,wwwwwwwwwwww,wwwwewwwwwww,wwwwwwwwewww,000088880000,000884880000,000884488000,000884880000,000088880000,0000iii00000,00008ii80000,00088i880000,88888ii88888,8888iii88888,888800008888,888000008888,888000000888@000000000000,000000000000,020000000020,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000003000000,000003300000,000003000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,030000000030,000000000000,000000000000", "250_90@111130033111,118880888811,088044440880,550466640555,088006600880,666004006660,888804408888,33330i033333,55533ii33555,33333i333333,33333ii33333,088800088800,008800008800,008000008000@333330033333,300000000003,000088880000,000000000000,000008800000,000000000000,088000000880,999900099999,000990099000,908990998099,999990099999,000000000000,008800008800,008000008000", "250_100@00088ii00000,00838iww0000,0008eiww3300,00000ww33300,00000ww03300,0000www00000,0880www00000,83ewww000000,088w0ww00880,0ww00ww08880,ww0111www880,001111wwww00,0001110wwwww,000000ww000w,000000ww000w,0088eww00222,00838ww00222,0088www00222,00wwwwww0000,000000www000,0000000www00,0000088ww000,00000838w000,0000088w0000@000000000000,003300000000,000000000000,000000004000,000000000000,000000000000,000000000000,030000000000,000000000000,000000000200,000000000000,000000000000,000888000000,000000000000,000000000000,000000000000,000300000000,000000000888,000000000000,000000000000,000000000000,000000000000,000000300000,000000000000", "250_90@00000i888000,00000i888800,00000i555500,0088ei333000,00888i000000,00444i000000,00011i000000,00000i000000,00000ie88000,00000i888000,00000i666000,00000ii00000,0008ei0ii222,00888i002222,00011i000222,0000ii000000,0444iie88000,44440i666000,04440i888800,00000i444000,0008eii00000,00888iii0000,00444i00ii00,00333i000ii0,00000i000333,00000ie80333,00000i111000,00000i880000@000000000000,000000044000,000000000000,000000000000,000440000000,000000000000,000000000000,000000000000,000000000000,000000440000,000000000000,000000000000,000000000000,000440000000,000000000888,000000000000,000000000000,088000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000888,000000000000,000000000000", "250_120@055500005550,055000005500,055500005550,055000005500,iiiiiiie5550,000066666666,000066666666,000000066000,000000066600,0000eiiiiiii,666666333000,555554444000,111111122000,444455555000,333331111100,iiiiiiie3333,000000333333,004444444000,000011111100,555555555000,000666666660,0000eiiiiiii,555566611100,000444000000,000044000000,000010000000,000011000000,005555550000,iiiiiiie0000,000008888888,000003333333,000088888888,000088888888,000088888888,iiiiie000000,0000eiiiiiii,008888888888,001111111110,ii1111iiiiii@000000000000,022000002200,022200002220,000000000000,000000000000,000000000000,000099999999,000000000000,000000088800,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000009999,000000000888,000000000000,000000000000,000000000000,000000000000,000000000000,888888888800,000000000000,000000000000,000000000000,000000000000,008888880000,000000000000,000000000000,000009999999,000099999999,000099999999,000000000000,000000000000,000000000000,000000000000,009999999990,009999000000", "220_120@000105501000,i0101110100i,0i100440010i,0i000e0000i0,00iii88iiii0,001111111100,001111111100,001111111100,000088880000,000088800000,000008800000,i0000e00000i,0i044444440i,0iii888iiii0,000888888000,000888880000,000088880000,888888888888,888888888888,004433344000,004433334400,044066604400,044066660440,440111110440@000202202000,002000002000,002000000200,000000000000,000009900000,009999999900,009999999900,009999999900,000088880000,000088800000,000008800000,000000000000,000999999900,000099900000,000999999000,000999990000,000099990000,000000000000,888880088888,009999999000,009999999900,099000009900,099000000990,990000000990", "220_140@000088800000,000888800000,000088800000,iieiiiiiiiii,ii88iiiiiiii,iiieiiiiiiii,iiii88iiiiii,iiiiieiiiiii,iiiiii88iiii,iiiiiiieiiii,iiiiiiii88ii,iiiiiiiiieii,iiiiiiiii88i,iiiiiiiieiii,iiiiiii88iii,iiiiiieiiiii,iiiii88iiiii,iiiieiiiiiii,iii88iiiiiii,iieiiiiiiiii,i88iiiiiiiii@000033300000,000333300000,000033300000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "220_100@888888888888,888888888888,005544444500,001155551100,003366663300,002211112200,004433334400,111110001111,003333333330,444400004444,000055555000,333300003333,000055555000,666600006666,000044444000,333300003333,000011111000@222222222222,222222222222,008888888800,008888888800,008888888800,008888888800,008888888800,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "270_120@001110033300,008800088000,001110033300,wwwwwwwwwwww,wwwwwwwwwwww,00i00000i000,00ii0000ii00,00i00000i000,00ii0000ii00,333333333333,333333333333,888888888888,000011110000,03333w333300,wwwwwwwwwwww,165111115618,816555555618,816666666188,881111111188,888888888880,088888888880@000000000000,002200022000,008880088800,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,999999999999,999999999999,088880888800,000000000000,000000000000,000000000000,000008000000,000008800000,000008000000,808888888808,800000000080,080088880080", "220_90@0iww0000i000,iw1w0000i000,0iww0000ii00,i00000wwwi00,i00000wwwwi0,i0000ww3wwi0,i00000wwwwi0,iww000wwwi00,iw3w000000i0,iww000000ei0,i000000000i0,i00000wwwii0,i00000w11w0i,i0000w444w0i,i00000w11w0i,i00000www0i0,ie000000000i,i0000000000i,i0www000000i,iw44w000000i,iw111w00ww0i,iw33w00w6wii,i0www000ww0i,i0000000000i,ie000000000i,i0000000000i,i0ww00000000,iw4w00000000,0iww00000000@000000000000,002000000000,000000000000,000000000000,000000000000,000000030000,000000000000,000000000000,003000000000,000000000000,000000000000,000000000000,000000033000,000000333000,000000033000,000000000000,000000000000,000000000000,000000000000,002200000000,002220000000,002200003000,000000000000,000000000000,000000000000,000000000000,000000000000,002000000000,000000000000", "220_90@888800008888,888000008888,888000008888,8e8000008888,888000008888,i0000000000i,0i000000000i,i0000000000i,0i008888000i,0i08888800i0,00i888888ii0,000888880000,00ii8888ii00,0ii00000iii0,ii00000000ii,i000000000ii,888800008888,888800088888,888800008e88,8e8000008888,888000008888,i0000000000i,i0008888000i,i0088888000i,iii888888iii,000088800000@000000000000,000000000000,020000000020,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000003000000,000003300000,000003000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,030000000030,000000000000,000000000000,000000000000,000000000000,000003000000,000003300000,000000000000", "220_90@111133333111,118888888811,088000000880,080000000800,088000000880,888000008880,888800008888,333333333333,333333333333,333333333333,333333333333,08880i088800,00880ii08800,0080iii08000,00880ii08800,888888888888,888888888888@333333333333,300000000003,000000000000,000000000000,000000000000,000000000000,088000000880,999999999999,000999999000,999999999999,999999999999,000000000000,000000000000,000000000000,000000000000,000000000000,088800008880", "220_100@08888w000000,83338www0000,0888ewwww000,0000www00000,00wwwww00000,8800www00000,8380www00888,33ewww008338,88ww0ww08338,0ww00ww08888,ww0000www880,000000wwww00,0000000wwwww,000000ww000w,000000ww000w,8888eww00000,83338ww00000,8888www00000,00wwwwww0000,www000www000,0000000wwwww,0000888e000w,0000833ww00w,0000833ww000,0000088ww000,000000www000,00000wwe8880,0000www33380,0000ww883380,00wwww888800@000000000000,033300000000,000000000000,000000000000,000000000000,000000000000,030000000000,330000000330,000000000330,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,033300000000,000000000000,000000000000,000000000000,000000000000,000000000000,000003300000,000003300000,000000000000,000000000000,000000000000,000000033300,000000003300,000000000000", "220_90@00000i888000,00000i888800,00000i888800,0088ei888000,00888i000000,00888i000000,00088i000000,00000i000000,00000ie88000,00000i888000,00000i888000,00000i000000,0008ei000000,00888i000000,00088i000000,00000i000000,00000ie88000,00000i888000,00000i888800,00000i888000,0008ei000000,00888i000000,00888i000000,00888i000000,00000i000000,00000ie80000,00000i888000,00000i888000,00000i888000,00000i888000,00000i880000@000000000000,000000044000,000000000000,000000000000,000440000000,000000000000,000000000000,000000000000,000000000000,000000440000,000000000000,000000000000,000000000000,000440000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "250_140@000000400000,000001000000,000000500000,000004000000,iiiiiiie0000,000066666666,000066666666,000000066000,000000066600,0000eiiiiiii,666666333000,555554444000,111111122000,444455555000,333331111100,iiiiiiie3333,000000333333,000000wwwwww,000000w00000,000000w00000,000000w00000,0000eiiiiiii,888888888800,000080000000,000088000000,000080000000,000088000000,008888880000,iiiiiiie0000,000008888888,000003333333,000088888888,000088888888,000088888888,iiiiie000000,0000eiiiiiii,008888888888,001111111110,001111111111,001111111111,001111111111,001111111111,000888888888,iiiiiiiiiiie@000000200000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000088800,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000009999,000000888888,000000000000,000000000000,000000000000,000000000000,000000000000,888888888800,000000000000,000000000000,000000000000,000000000000,008888880000,000000000000,000000000000,000009999999,000099999999,000099999999,000000000000,000000000000,000000000000,000000000000,009999999990,009999000000,009999999999,009999990000,009999999999,000000000000,000000000000", "250_120@000008800000,000088800000,000008800000,00000e000000,00iii88iiii0,0i00888000i0,0i008888000i,i0088888000i,000088880000,000088800000,000008800000,00000e000000,000008800000,0iii888iiii0,0i088888800i,i0088888000i,i00088880000,888888888888,888888888888,000888880000,000008800000,000008000000,000008800000,0ii88888ii00,0i00000000i0,i000000000i0@000002200000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000088880000,000088800000,000008800000,000008000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,888880088888,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "220_140@888088800888,880888808888,888088800888,iieiii8ii8ii,ii88ii8ii8ii,ii8eiiii8ii8,ii8i88ii8ii8,i8i8ieiiii8i,i8i8ii88ii8i,8i8i8i8eiiii,ii8i8i8i88ii,i8i8i8iiieii,i8i8i8iii88i,8i8i8iiieiii,8i8i8ii88ii0,i8i8iieiii00,i8i8i88iii00,8iiieiiii000,iii88i8ii000,iieii8ii0000,i88ii8ii0000@222033300222,220333302222,222033300222,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000,000000000000", "220_100@888888888888,888888888888,555544444555,111155551111,333366663333,222211112222,444433334444@222222222222,222222222222,888888888888,888888888888,888888888888,888888888888,888888888888", "280_140@000003000000,000003000000,000003000000,000033330000,000333033000,033303883333,330003888800,000003888800,000003888800,000033300000,000330330000,033300333000,330000303330,000000300033,000000300000,000888330000,000888333000,008888303300,000888300333,000003000033,000003000000,000033000000,000333000000,000303300000,033300300888,330000338888,300000338888,000000333888,000003303300,000003000330,000033000033,000338800003,003338880000,033038800000,330003000000,000003000000,000003300000,000000300000,000000330000,000888333000,000888303300,000883300333,000033000003,000330000000,000300000000,033300000000,330000000000@000009000000,000009000000,000009000000,000099990000,000999099000,009909009900,000009022000,000009222000,000009000000,000099900000,000990900000,009900990000,000000909990,000000900000,000000900000,000000900000,000020990000,000220900900,000000900990,000009000000,000009000000,000000000000,000999000000,000909900000,009900900000,090000900220,000000990020,000000990000,000000909900,000009000900,000099000000,000090000000,009990300000,009090000000,000009000000,000009000000,000009000000,000000900000,000000990000,000000999000,000020909900,000009900999,000099000000,000900000000,000900000000,009000000000,000000000000", ""]
    };
    if (!(window.console && console.log)) {
        console = {
            log: c,
            debug: d,
            info: f,
            warn: g,
            error: h
        }
    };
    GameLib = {
        gameWidth: 800,
        gameHeight: 480,
        containerDiv: null,
        storageJar: {},
        scale: 1,
        scalable: true,
        gameName: "",
        lang: "en",
        isTouch: "ontouchstart" in window || navigator.msMaxTouchPoints,
        isAndroid: /Android/.test(navigator.userAgent),
        isIE: /IEMobile/.test(navigator.userAgent),
        online: true,
        popup: null,
        IEversion: (i()),
        iOSversion: (j()),
        moreGames: k,
        $_GET: l,
        getLang: n,
        setLang: o,
        getHostDomain: p,
        showPopup: q,
        closePopup: r,
        scaleGame: s,
        getStorage: t,
        setStorage: u,
        saveStorage: v,
        init: w
    };;;
    CreateAll = {
        CreatedPanel: x,
        CreateDiv: y,
        CreateImgBg: z,
        CreateText: A,
        CreatedImg: B,
        CreateLanUI: C,
        CreatedTxtImg: D,
        btbgMarginl: 30,
        btbgMargint: 16,
        CreatedButton: E
    };;;
    loadRec = {
        images: [{
            src: "img/bubble/fruit0001.png",
            id: "f1"
        }, {
            src: "img/bubble/fruit0002.png",
            id: "f2"
        }, {
            src: "img/bubble/fruit0003.png",
            id: "f3"
        }, {
            src: "img/bubble/fruit0004.png",
            id: "f4"
        }, {
            src: "img/bubble/bubble0001.png",
            id: "b1"
        }, {
            src: "img/bubble/bubble0002.png",
            id: "b2"
        }, {
            src: "img/bubble/bubble0003.png",
            id: "b3"
        }, {
            src: "img/bubble/bubble0004.png",
            id: "b4"
        }, {
            src: "img/bubble/bubble0005.png",
            id: "b5"
        }, {
            src: "img/bubble/bubble0006.png",
            id: "b6"
        }, {
            src: "img/bubble/bubbleBomb.png",
            id: "be"
        }, {
            src: "img/bubble/ironball.png",
            id: "bi"
        }, {
            src: "img/bubble/skullbubble.png",
            id: "bs"
        }, {
            src: "img/bubble/woodenbarrel.png",
            id: "bw"
        }, {
            src: "img/bubble/woodenbarrelhalf.png",
            id: "bh"
        }, {
            src: "img/bubble/printingink.png",
            id: "bpi"
        }, {
            src: "img/bubble/explosion1.png",
            id: "explosion1"
        }, {
            src: "img/bubble/explosion2.png",
            id: "explosion2"
        }, {
            src: "img/bubble/explosion3.png",
            id: "explosion3"
        }, {
            src: "img/bubble/explosion4.png",
            id: "explosion4"
        }, {
            src: "img/bubble/explosion5.png",
            id: "explosion5"
        }, {
            src: "img/bubble/explosion6.png",
            id: "explosion6"
        }, {
            src: "img/bubble/explosion.png",
            id: "explosione"
        }, {
            src: "img/bubble/explodeH.png",
            id: "explodeH"
        }, {
            src: "img/bubble/map.png",
            id: "map"
        }, {
            src: "img/bubble/top.png",
            id: "toppic"
        }, {
            src: "img/bubble/shooter.png",
            id: "shooter"
        }, {
            src: "img/game_back01.jpg",
            id: "back_game1"
        }, {
            src: "img/game_back02.jpg",
            id: "back_game2"
        }, {
            src: "img/game_back03.jpg",
            id: "back_game3"
        }, {
            src: "img/game_back04.jpg",
            id: "back_game4"
        }, {
            src: "img/help_back.jpg",
            id: "back_help"
        }, {
            src: "img/menu_back.jpg",
            id: "back_menu"
        }, {
            src: "img/over_back.jpg",
            id: "back_over"
        }, {
            src: "img/pause.png",
            id: "pause"
        }, {
            src: "img/bar.png",
            id: "bar"
        }, {
            src: "img/close.png",
            id: "close"
        }, {
            src: "img/deBug.png",
            id: "debug"
        }, {
            src: "img/fullscreen.png",
            id: "fullscreen"
        }, {
            src: "img/fullscreen-off.png",
            id: "fullscreen_off"
        }, {
            src: "img/fullscreen-on.png",
            id: "fullscreen_on"
        }, {
            src: "img/button.png",
            id: "button"
        }, {
            src: "img/music1.png",
            id: "music2"
        }, {
            src: "img/music2.png",
            id: "music1"
        }, {
            src: "img/sound1.png",
            id: "sound2"
        }, {
            src: "img/sound2.png",
            id: "sound1"
        }, {
            src: "img/music1.png",
            id: "music2_"
        }, {
            src: "img/music2.png",
            id: "music1_"
        }, {
            src: "img/sound1.png",
            id: "sound2_"
        }, {
            src: "img/sound2.png",
            id: "sound1_"
        }],
        fonts: ["Chatte_Mama"],
        loadPerc: null,
        resource: {},
        data: [],
        preload: F,
        creatloading: G
    };
    GameMenu = {
        startGame: H,
        showMenu: I,
        createSave: J,
        savePanel: null,
        sheZhiDiv: null,
        showSheZhi: K,
        data: [],
        remAll: L
    };
    GameHelp = {
        showHelp: M,
        data: [],
        remAll: N
    };
    ArrayUtil = {
        getLastItem: P,
        removeItem: Q,
        isInArray: R
    };
    Point = {
        distance: S
    };
    MouseUtil = {
        getMouseX: T,
        getMouseY: U
    };
    MovieUtil = {
        createMovieClip: V,
        reset: W,
        gotoAndStop: X,
        stop: Y,
        playTo: Z,
        play: ba,
        explodeBlockSizeH: bb,
        explodeBlockH: bc,
        explodeBlockV: bd
    };
    fullscreenHandle = {
        button: null,
        innerOffsetW: 4,
        innerOffsetH: 4,
        init: be
    };
    Distance = {
        math: bf,
        checkCircle: bg
    };
    SlideUtil = {
        dragX: 0,
        dragY: 0,
        init: bh
    };
    TransformUtil = {
        rotate: bi
    };
    GameOver = {
        showOver: bj,
        data: [],
        remAll: bk
    };
    languageUI = {
        uiDiv: null,
        buDiv: null,
        canGuoQi: null,
        canWenZi: null,
        showLanguage: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        arr: [
            ["US", "en_us", 12, "en", 1],
            ["NL", "nl", 2, "nl", 4],
            ["EN", "en_us", 11, "en", 2],
            ["ES", "es_spain", 5, "es", 6],
            ["PT", "pt_portugal", 9, "pt", 9],
            ["BR", "br_portugal", 1, "pt", 10],
            ["FR", "fr_france", 6, "fr", 11],
            ["IT", "it_italy", 8, "it", 12],
            ["DE", "de_germany", 4, "de", 13],
            ["RU", "ru_russian", 10, "ru", 14],
            ["MX", "es_spain", 13, "es", 7],
            ["ARG", "es_spain", 14, "es", 8],
            ["IN", "in_india", 7, "in", 3],
            ["POL", "pol_polish", 15, "pl", 15],
            ["TUR", "tur_turkish", 16, "tr", 16]
        ],
        remData: [],
        getStyle: bl,
        init: bm,
        closeUI: bn,
        getButton: bo,
        getText: bp,
        scaleTexts: bq,
        setXuanZhe: br,
        language: "en_us",
        languageInt: 0
    };;;
    (bs)(window);;;
    (bt)();;;
    !bu(window), bv(bw);;;
    (bx)(window, document);;;
    (by)();;;
    (bz)(window, document);
    document.addEventListener("gameready", bA, false);;;
    languageData = {
        d_ContinuePreviousGame: ["Continue Previous Game", "Continue Previous Game", "Pichhala game jari", "Ga Door Met Vorig Spel", "继续玩", "Continuar juego anterior", "Continuar juego anterior", "Continuar juego anterior", "Continuar o jogo anterior", "Continuar o jogo anterior", "Continuer la partie", "Continua la partita precedente", "Vorheriges Spiel fortsetzen", "Продолжить игру", "Kontynuuj poprzednią grę", "\xD6\x6E\x63\x65\x6B\x69\x20\x6F\x79\x75\x6E\x61\x20\x64\x65\x76\x61\x6D"],
        d_StartNewGame: ["Start New Game", "Start New Game", "Naya game Shuru", "Start Nieuw Spel", "重新开始", "Inicia nuevo juego", "Inicia nuevo juego", "Inicia nuevo juego", "Novo Jogo", "Novo Jogo", "Commencer une nouvelle", "Inizia una nuova partita", "Neues Spiel starten", "Новая игра", "Rozpocznij nową grę", "Yeni oyuna başla"],
        d_Play: ["Play", "Play", "Play", "Spelen", "开始游戏", "Jugar", "Jugar", "Jugar", "Jogar", "Jogar", "Jouer", "Gioca", "Spielen", "Играть", "Graj", "Oyna"],
        d_Help: ["Help", "Help", "Sahayata", "Help", "帮助", "Ayuda", "Ayuda", "Ayuda", "Ajuda", "Ajuda", "Aide", "Guida", "Hilfe", "Справка", "Pomoc", "Yardım"],
        d_HighScore: ["More Games", "More Games", "Ucha score", "Highscore", "More Games", "More Games", "More Games", "More Games", "More Games", "More Games", "Haut score", "Punteggio", "Bestenliste", "Результаты", "Najwyższe wyniki", "More Games"],
        d_More: ["More Games", "More Games", "Anya games", "Meer spellen", "更多游戏", "\x4D\xE1\x73\x20\x6A\x75\x65\x67\x6F\x73", "\x4D\xE1\x73\x20\x6A\x75\x65\x67\x6F\x73", "\x4D\xE1\x73\x20\x6A\x75\x65\x67\x6F\x73", "Mais Jogos", "Mais Jogos", "Plus de jeux", "Altri giochi", "Mehr Spiele", "Еще игры", "Więcej gier", "Daha Fazla Oyun"],
        d_Howtoplay: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        d_HowtoplayText: ["Shoot bubbles up and create groups of 3 or more of the same bubbles to remove them from the game. Collect all the fruit to advance to the next level.", "Shoot bubbles up and create groups of 3 or more of the same bubbles to remove them from the game. Collect all the fruit to advance to the next level."],
        d_Back: ["Back", "Back", "Wapas", "Terug", "返回", "\x41\x74\x72\xE1\x73", "\x41\x74\x72\xE1\x73", "\x41\x74\x72\xE1\x73", "Voltar", "Voltar", "Retour", "Indietro", "\x5A\x75\x72\xFC\x63\x6B", "Вернуться", "\x50\x6F\x77\x72\xF3\x74", "Geri"],
        d_Endgame: ["End Game", "End Game", "Game Samapti", "Stop spel", "结束", "Terminar el juego", "Terminar el juego", "Terminar el juego", "Terminar jogo", "Terminar jogo", "\x41\x72\x72\xEA\x74\x65\x72\x20\x6C\x65\x20\x6A\x65\x75", "Termina gioco", "Spiel beenden", "Завершить", "Zakończ grę", "Oyunu Bitir"],
        d_Timeout: ["Time out", "Time out", "Samaya Samapta", "Tijd voorbij", "时间到", "Tiempo agotado", "Tiempo agotado", "Tiempo agotado", "Acabou o tempo!", "Acabou o tempo!", "\x54\x65\x6D\x70\x73\x20\xE9\x63\x6F\x75\x6C\xE9", "Tempo scaduto", "Zeit zu Ende", "Время вышло", "Koniec czasu", "\x53\xFC\x72\x65\x20\x62\x69\x74\x74\x69"],
        d_LevelCompleted: ["Level Completed", "Level Completed", "Stara Complete Hua", "Level Gereed", "恭喜过关", "Nivel completado", "Nivel completado", "Nivel completado", "\x4E\xED\x76\x65\x6C\x20\x63\x6F\x6E\x63\x6C\x75\xED\x64\x6F", "\x4E\xED\x76\x65\x6C\x20\x63\x6F\x6E\x63\x6C\x75\xED\x64\x6F", "\x4E\x69\x76\x65\x61\x75\x20\x74\x65\x72\x6D\x69\x6E\xE9", "Livello completato", "Level abgeschlossen", "Уровень завершен", "Poziom ukończony", "Seviye Tamamlandı"],
        d_Bonus: ["Bonus", "Bonus", "Bonus", "Bonus", "奖励", "Bono", "Bono", "Bono", "\x42\xF3\x6E\x75\x73", "\x42\xF4\x6E\x75\x73", "Bonus", "Bonus", "Bonus", "Бонус", "Premia", "Bonus"],
        d_TimeBonus: ["Time Bonus:", "Time Bonus:", "Samaya Bonus:", "Tijdbonus:", "时间奖励:", "Bono de tiempo:", "Bono de tiempo:", "Bono de tiempo:", "\x42\xF3\x6E\x75\x73\x20\x64\x65\x20\x74\x65\x6D\x70\x6F\x3A", "\x42\xF4\x6E\x75\x73\x20\x64\x65\x20\x74\x65\x6D\x70\x6F\x3A", "Bonus temps:", "Bonus a tempo:", "Zeitbonus:", "Бонус за время:", "Premia za czas:", "\x53\xFC\x72\x65\x20\x42\x6F\x6E\x75\x73\x75\x3A"],
        d_NextLevel: ["Next Level", "Next Level", "Agala Stara", "Volgend Level", "下一关", "Siguiente nivel", "Siguiente nivel", "Siguiente nivel", "\x4E\xED\x76\x65\x6C\x20\x73\x65\x67\x75\x69\x6E\x74\x65", "\x4E\xED\x76\x65\x6C\x20\x73\x65\x67\x75\x69\x6E\x74\x65", "Niveau suivant", "Livello successivo", "\x4E\xE4\x63\x68\x73\x74\x65\x72\x20\x4C\x65\x76\x65\x6C", "Следующий уровень", "Następny poziom", "Sonraki seviye"],
        d_Score: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        d_Time: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        d_Level: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        d_Hint: ["Hint", "Hint", "Sanketa", "Hint", "提示", "Sugerencia", "Sugerencia", "Sugerencia", "Dica", "Dica", "Astuce", "Suggerimento", "Tipp", "Подсказка", "Podpowiedź", "İpucu"],
        d_Shuffle: ["Shuffle", "Shuffle", "Ghasitana", "Schudden", "刷新", "Barajar", "Barajar", "Barajar", "Baralhar", "Embaralhar", "Battre", "Mescola", "Mischen", "Перемешать", "Tasuj", "Karıştır"],
        d_Pause: ["Pause", "Pause", "Viaram", "Pauze", "暂停", "Pausa", "Pausa", "Pausa", "Pausa", "Pausa", "Pause", "Pausa", "Pause", "Пауза", "Pauza", "Duraklat"],
        d_Goal: ["Goal:", "Goal:", "Lakṣya:", "Doel:", "目标:", "Meta:", "Meta:", "Meta:", "Objetivo:", "Objetivo:", "But:", "Obiettivo:", "Ziel:", "Цель:", "Cel:", "\x41\x6D\x61\xE7\x3A"],
        d_Continue: ["Continue", "Continue", "Jari", "Ga door", "继续", "Continuar", "Continuar", "Continuar", "Continuar", "Continuar", "Continuer", "Continua", "Fortfahren", "Продолжить", "Kontynuuj", "Devam"],
        d_Menu: ["Menu", "Menu", "Menu", "Menu", "菜单", "\x4D\x65\x6E\xFA", "\x4D\x65\x6E\xFA", "\x4D\x65\x6E\xFA", "Menu", "Menu", "Menu", "Menu", "\x4D\x65\x6E\xFC", "Меню", "Menu", "\x4D\x65\x6E\xFC"],
        d_SubmitScore: ["More Games", "More Games", "Anya games", "Meer spellen", "更多游戏", "\x4D\xE1\x73\x20\x6A\x75\x65\x67\x6F\x73", "\x4D\xE1\x73\x20\x6A\x75\x65\x67\x6F\x73", "\x4D\xE1\x73\x20\x6A\x75\x65\x67\x6F\x73", "Mais Jogos", "Mais Jogos", "Plus de jeux", "Altri giochi", "Mehr Spiele", "Еще игры", "Więcej gier", "Daha Fazla Oyun"],
        d_PlayAgain: ["Try Again", "Try Again", "Fir se khelen", "Nog een keer", "再试一次", "Jugar otra vez", "Jugar otra vez", "Jugar otra vez", "Jogar de novo", "Jogar de novo", "Jouer encore", "Gioca di nuovo", "Noch mal spielen", "Играть снова", "Graj ponownie", "Tekrar Oyna"],
        d_YourScore: ["Your Score", "Your Score", "Aapka Score", "Jouw Score", "你的分数：", "\x54\x75\x20\x70\x75\x6E\x74\x75\x61\x63\x69\xF3\x6E", "\x54\x75\x20\x70\x75\x6E\x74\x75\x61\x63\x69\xF3\x6E", "\x54\x75\x20\x70\x75\x6E\x74\x75\x61\x63\x69\xF3\x6E", "\x41\x20\x73\x75\x61\x20\x70\x6F\x6E\x74\x75\x61\xE7\xE3\x6F", "\x53\x75\x61\x20\x70\x6F\x6E\x74\x75\x61\xE7\xE3\x6F", "Votre score", "Il tuo punteggio", "Dein Spielstand", "Твои очки", "\x54\x77\xF3\x6A\x20\x77\x79\x6E\x69\x6B", "Puanın"],
        d_Reset: ["Reset", "Reset", "Reset kare", "Reset", "重置", "Resetear", "Resetear", "Resetear", "Reiniciar", "Reiniciar", "\x52\xE9\x69\x6E\x69\x74\x69\x61\x6C\x69\x73\x65\x72", "Ripristina", "\x5A\x75\x72\xFC\x63\x6B\x73\x65\x74\x7A\x65\x6E", "Сброс", "Resetuj", "Sıfırla"],
        d_TotalScore: ["Total Score:", "Total Score:", "Dil:", "Totale Score:", "总分：", "\x50\x75\x6E\x74\x75\x61\x63\x69\xF3\x6E\x20\x74\x6F\x74\x61\x6C\x3A", "\x50\x75\x6E\x74\x75\x61\x63\x69\xF3\x6E\x20\x74\x6F\x74\x61\x6C\x3A", "\x50\x75\x6E\x74\x75\x61\x63\x69\xF3\x6E\x20\x74\x6F\x74\x61\x6C\x3A", "\x50\x6F\x6E\x74\x75\x61\xE7\xE3\x6F\x20\x54\x6F\x74\x61\x6C\x3A", "\x50\x6F\x6E\x74\x75\x61\xE7\xE3\x6F\x20\x54\x6F\x74\x61\x6C\x3A", "Score total:", "Punteggio totale:", "Gesamtpunktzahl:", "Общие очки:", "Punktacja końcowa:", "Toplam Puan:"],
        d_ResetClick: ["Click on the reset button to completely reset your progress in the game.", "Click on the reset button to completely reset your progress in the game.", "Puri tarah se is khel me apni pragati ko punrthapit karne ke liye reset batan per click kare.", "Klik op de reset-knop om in dit spel helemaal opnieuw te beginnen.", "点击重置按钮可完全重置游戏进度。", "\x48\x61\x7A\x20\x63\x6C\x69\x63\x20\x65\x6E\x20\x65\x6C\x20\x62\x6F\x74\xF3\x6E\x20\x52\x65\x69\x6E\x69\x63\x69\x61\x72\x20\x70\x61\x72\x61\x20\x72\x65\x69\x6E\x69\x63\x69\x61\x72\x20\x6C\x61\x20\x70\x61\x72\x74\x69\x64\x61\x2E", "\x48\x61\x7A\x20\x63\x6C\x69\x63\x20\x65\x6E\x20\x65\x6C\x20\x62\x6F\x74\xF3\x6E\x20\x52\x65\x69\x6E\x69\x63\x69\x61\x72\x20\x70\x61\x72\x61\x20\x72\x65\x69\x6E\x69\x63\x69\x61\x72\x20\x6C\x61\x20\x70\x61\x72\x74\x69\x64\x61\x2E", "\x48\x61\x7A\x20\x63\x6C\x69\x63\x20\x65\x6E\x20\x65\x6C\x20\x62\x6F\x74\xF3\x6E\x20\x52\x65\x69\x6E\x69\x63\x69\x61\x72\x20\x70\x61\x72\x61\x20\x72\x65\x69\x6E\x69\x63\x69\x61\x72\x20\x6C\x61\x20\x70\x61\x72\x74\x69\x64\x61\x2E", "\x43\x6C\x69\x63\x61\x20\x6E\x6F\x20\x62\x6F\x74\xE3\x6F\x20\x72\x65\x69\x6E\x69\x63\x69\x61\x72\x20\x70\x61\x72\x61\x20\x72\x65\x69\x6E\x69\x63\x69\x61\x72\x20\x70\x6F\x72\x20\x63\x6F\x6D\x70\x6C\x65\x74\x6F\x20\x6F\x20\x74\x65\x75\x20\x70\x72\x6F\x67\x72\x65\x73\x73\x6F\x20\x6E\x6F\x20\x6A\x6F\x67\x6F\x2E", "\x43\x6C\x69\x71\x75\x65\x20\x6E\x6F\x20\x62\x6F\x74\xE3\x6F\x20\x72\x65\x69\x6E\x69\x63\x69\x61\x72\x20\x70\x61\x72\x61\x20\x72\x65\x63\x6F\x6D\x65\xE7\x61\x72\x20\x64\x6F\x20\x7A\x65\x72\x6F\x20\x73\x65\x75\x20\x70\x72\x6F\x67\x72\x65\x73\x73\x6F\x20\x6E\x6F\x20\x6A\x6F\x67\x6F\x2E", "\x43\x6C\x69\x71\x75\x65\x7A\x20\x73\x75\x72\x20\x6C\x65\x20\x62\x6F\x75\x74\x6F\x6E\x20\x64\x65\x20\x72\xE9\x69\x6E\x69\x74\x69\x61\x6C\x69\x73\x61\x74\x69\x6F\x6E\x20\x70\x6F\x75\x72\x20\x72\xE9\x69\x6E\x69\x74\x69\x61\x6C\x69\x73\x65\x72\x20\x76\x6F\x74\x72\x65\x20\x70\x72\x6F\x67\x72\x65\x73\x73\x69\x6F\x6E\x20\x64\x61\x6E\x73\x20\x6C\x65\x20\x6A\x65\x75\x2E", "Fai clic sul pulsante di reset per azzerare completamente il tuo livello di progressione nel gioco.", "Klicke auf die Reset-Taste, um dieses Spiel wieder ganz von vorne zu beginnen.", "Щелкни по кнопке сброса, чтобы полностью сбросить набранное количество очков.", "Kliknij przycisk Resetuj, aby skasować całkowity postęp w grze.", "\x4F\x79\x75\x6E\x64\x61\x6B\x69\x20\x69\x6C\x65\x72\x6C\x65\x79\x69\u015F\x69\x6E\x69\x20\x74\x61\x6D\x61\x6D\x65\x6E\x20\x73\u0131\x66\u0131\x72\x6C\x61\x6D\x61\x6B\x20\x69\xE7\x69\x6E\x20\x73\u0131\x66\u0131\x72\x6C\x61\x6D\x61\x20\x64\xFC\u011F\x6D\x65\x73\x69\x6E\x65\x20\x74\u0131\x6B\x6C\x61\x2E"]
    };
    GameSound = {
        ua: navigator.userAgent,
        useWebAudioBGM: true,
        playSoundFX: true,
        soundHowl: null,
        musicHowl: null,
        musicMuted: false,
        soundMuted: false,
        loopSoundId: null,
        musicPlaying: false,
        loopPlaying: null,
        sprite: null,
        loadScript: bB,
        init: bC,
        ping: bD,
        playSound: bE,
        playMusic: bF,
        stopMusic: bG,
        muteMusic: bH,
        muteSound: bI,
        setIdle: bJ
    };
    document.addEventListener("gameready", bK, false);;
})()
